const pool = require("../config/db");

// Columnas base del producto + su imagen principal (o, si no tiene
// ninguna marcada como principal, la de menor "orden") traída con un
// LEFT JOIN LATERAL. Así el listado y el detalle de producto siempre
// pueden mostrar una portada con UNA sola consulta, sin necesidad de
// traer el arreglo completo de imágenes (eso se pide aparte, solo
// cuando hace falta la galería completa).
const SELECT_PRODUCTO_CON_IMAGEN = `
  SELECT
    p.id, p.nombre, p.slug, p.descripcion, p.precio, p.stock,
    p.categoria_id, p.estado, p.created_at, p.updated_at,
    p.shopify_product_id, p.shopify_variant_id,
    COALESCE(p.compatibilidad_moto, ARRAY[]::TEXT[]) AS compatibilidad_moto,
    COALESCE(p.variantes, '[]'::jsonb) AS variantes,
    COALESCE(imagen.url_medium, imagen.url) AS imagen_principal,
    COALESCE(imagen.url_thumbnail, imagen.url) AS imagen_principal_thumbnail,
    COALESCE(imagen.url_large, imagen.url) AS imagen_principal_large
  FROM productos p
  LEFT JOIN LATERAL (
    SELECT url, url_thumbnail, url_medium, url_large
    FROM producto_imagenes pi
    WHERE pi.producto_id = p.id
    ORDER BY pi.es_principal DESC, pi.orden ASC, pi.id ASC
    LIMIT 1
  ) imagen ON TRUE
`;

/**
 * Construye dinámicamente la cláusula WHERE para el listado de productos
 * según los filtros recibidos, siempre usando parámetros ($1, $2, ...)
 * para evitar concatenar SQL directamente.
 */
function construirFiltros({ categoriaId, estado, q }) {
  const condiciones = [];
  const valores = [];

  if (categoriaId !== undefined) {
    valores.push(categoriaId);
    condiciones.push(`p.categoria_id = $${valores.length}`);
  }

  if (estado !== undefined) {
    valores.push(estado);
    condiciones.push(`p.estado = $${valores.length}`);
  }

  if (q) {
    valores.push(`%${q}%`);
    const parametro = "$" + valores.length;
    condiciones.push(`(p.nombre ILIKE ${parametro} OR p.descripcion ILIKE ${parametro} OR array_to_string(COALESCE(p.compatibilidad_moto, ARRAY[]::TEXT[]), ' ') ILIKE ${parametro} OR EXISTS (SELECT 1 FROM categorias c WHERE c.id = p.categoria_id AND c.nombre ILIKE ${parametro}))`);
  }

  const clausula = condiciones.length ? `WHERE ${condiciones.join(" AND ")}` : "";
  return { clausula, valores };
}

async function obtenerTodos({ categoriaId, estado, q, sort, order, limit, offset }) {
  const { clausula, valores } = construirFiltros({ categoriaId, estado, q });

  const consulta = `
    ${SELECT_PRODUCTO_CON_IMAGEN}
    ${clausula}
    ORDER BY p.${sort} ${order}
    LIMIT $${valores.length + 1} OFFSET $${valores.length + 2}
  `;

  const resultado = await pool.query(consulta, [...valores, limit, offset]);
  return resultado.rows;
}

async function contarTodos({ categoriaId, estado, q }) {
  const { clausula, valores } = construirFiltros({ categoriaId, estado, q });

  const consulta = `SELECT COUNT(*)::int AS total FROM productos p ${clausula}`;
  const resultado = await pool.query(consulta, valores);
  return resultado.rows[0].total;
}

async function obtenerPorId(id) {
  const resultado = await pool.query(
    `${SELECT_PRODUCTO_CON_IMAGEN} WHERE p.id = $1`,
    [id]
  );
  return resultado.rows[0] || null;
}

async function obtenerPorSlug(slug) {
  const resultado = await pool.query(
    `${SELECT_PRODUCTO_CON_IMAGEN} WHERE p.slug = $1`,
    [slug]
  );
  return resultado.rows[0] || null;
}

async function existePorSlug(slug, excludeId = null) {
  const consulta = excludeId
    ? "SELECT id FROM productos WHERE slug = $1 AND id <> $2"
    : "SELECT id FROM productos WHERE slug = $1";
  const valores = excludeId ? [slug, excludeId] : [slug];

  const resultado = await pool.query(consulta, valores);
  return resultado.rows.length > 0;
}

async function crear({
  nombre,
  slug,
  descripcion,
  precio,
  stock,
  categoriaId,
  estado,
  shopifyProductId = null,
  shopifyVariantId = null,
  compatibilidadMoto = [],
  variantes = [],
}) {
  const resultado = await pool.query(
    `INSERT INTO productos (nombre, slug, descripcion, precio, stock, categoria_id, estado, shopify_product_id, shopify_variant_id, compatibilidad_moto, variantes)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::jsonb)
     RETURNING id, nombre, slug, descripcion, precio, stock, categoria_id, estado, created_at, updated_at, shopify_product_id, shopify_variant_id, compatibilidad_moto, variantes`,
    [nombre, slug, descripcion, precio, stock, categoriaId, estado, shopifyProductId, shopifyVariantId, compatibilidadMoto, JSON.stringify(variantes)]
  );
  return resultado.rows[0];
}

async function actualizar(id, campos) {
  const permitidas = new Set(["nombre", "slug", "descripcion", "precio", "stock", "categoria_id", "estado", "shopify_product_id", "shopify_variant_id", "compatibilidad_moto", "variantes"]);
  const claves = Object.keys(campos).filter((clave) => permitidas.has(clave));
  if (claves.length === 0) return obtenerPorId(id);

  const asignaciones = claves.map((clave, indice) => clave === "variantes" ? `${clave} = $${indice + 1}::jsonb` : `${clave} = $${indice + 1}`);
  const valores = claves.map((clave) => clave === "variantes" ? JSON.stringify(campos[clave]) : campos[clave]);

  const consulta = `
    UPDATE productos
    SET ${asignaciones.join(", ")}, updated_at = NOW()
    WHERE id = $${claves.length + 1}
    RETURNING id, nombre, slug, descripcion, precio, stock, categoria_id, estado, created_at, updated_at, shopify_product_id, shopify_variant_id, compatibilidad_moto, variantes
  `;

  const resultado = await pool.query(consulta, [...valores, id]);
  return resultado.rows[0] || null;
}

async function eliminar(id) {
  const resultado = await pool.query("DELETE FROM productos WHERE id = $1 RETURNING id", [id]);
  return resultado.rows.length > 0;
}

/**
 * Descuenta stock de forma atómica: solo actualiza si hay suficiente
 * stock disponible, evitando condiciones de carrera entre pedidos
 * concurrentes. Acepta opcionalmente un cliente de transacción.
 */
async function descontarStock(id, cantidad, clienteDb = pool) {
  const resultado = await clienteDb.query(
    `UPDATE productos
     SET stock = stock - $1, updated_at = NOW()
     WHERE id = $2 AND stock >= $1
     RETURNING id, stock`,
    [cantidad, id]
  );
  return resultado.rows[0] || null;
}

async function restaurarStock(id, cantidad, clienteDb = pool) {
  const resultado = await clienteDb.query(
    `UPDATE productos
     SET stock = stock + $1, updated_at = NOW()
     WHERE id = $2
     RETURNING id, stock`,
    [cantidad, id]
  );
  return resultado.rows[0] || null;
}

async function obtenerMasVendidos({ limit = 8 } = {}) {
  const resultado = await pool.query(
    `SELECT p.id, p.nombre, p.slug, p.descripcion, p.precio, p.stock, p.categoria_id,
            p.estado, p.created_at, p.updated_at, p.shopify_product_id, p.shopify_variant_id,
            p.compatibilidad_moto, p.variantes,
            COALESCE(imagen.url_medium, imagen.url) AS imagen_principal,
            COALESCE(imagen.url_thumbnail, imagen.url) AS imagen_principal_thumbnail,
            COALESCE(imagen.url_large, imagen.url) AS imagen_principal_large,
            SUM(dp.cantidad)::int AS unidades_vendidas
     FROM productos p
     LEFT JOIN LATERAL (
       SELECT url, url_thumbnail, url_medium, url_large
       FROM producto_imagenes pi WHERE pi.producto_id = p.id
       ORDER BY pi.es_principal DESC, pi.orden ASC, pi.id ASC LIMIT 1
     ) imagen ON TRUE
     JOIN detalle_pedido dp ON dp.producto_id = p.id
     JOIN pedidos pe ON pe.id = dp.pedido_id
     WHERE p.estado = TRUE AND pe.payment_status = 'pagado'
     GROUP BY p.id, imagen.url, imagen.url_thumbnail, imagen.url_medium, imagen.url_large
     ORDER BY unidades_vendidas DESC, p.nombre ASC
     LIMIT $1`,
    [Math.min(Math.max(Number(limit) || 8, 1), 20)]
  );
  return resultado.rows;
}

async function obtenerPorIdParaActualizar(id, clienteDb = pool) {
  const resultado = await clienteDb.query(
    "SELECT id, nombre, precio, stock FROM productos WHERE id = $1 FOR UPDATE",
    [id]
  );
  return resultado.rows[0] || null;
}

module.exports = {
  obtenerTodos,
  contarTodos,
  obtenerPorId,
  obtenerPorSlug,
  existePorSlug,
  crear,
  actualizar,
  eliminar,
  descontarStock,
  restaurarStock,
  obtenerPorIdParaActualizar,
  obtenerMasVendidos,
};
