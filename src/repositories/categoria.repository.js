const pool = require("../config/db");

async function obtenerTodas() {
  const resultado = await pool.query(
    "SELECT c.id, c.nombre, c.descripcion, c.parent_id, padre.nombre AS parent_nombre FROM categorias c LEFT JOIN categorias padre ON padre.id = c.parent_id ORDER BY COALESCE(c.parent_id, c.id), c.parent_id NULLS FIRST, c.nombre ASC"
  );
  return resultado.rows;
}

async function obtenerPorId(id) {
  const resultado = await pool.query(
    "SELECT c.id, c.nombre, c.descripcion, c.parent_id, padre.nombre AS parent_nombre FROM categorias c LEFT JOIN categorias padre ON padre.id = c.parent_id WHERE c.id = $1",
    [id]
  );
  return resultado.rows[0] || null;
}

async function existePorNombre(nombre, excludeId = null) {
  const consulta = excludeId
    ? "SELECT id FROM categorias WHERE nombre = $1 AND id <> $2"
    : "SELECT id FROM categorias WHERE nombre = $1";
  const valores = excludeId ? [nombre, excludeId] : [nombre];

  const resultado = await pool.query(consulta, valores);
  return resultado.rows.length > 0;
}

async function crear({ nombre, descripcion, parent_id = null }) {
  const resultado = await pool.query(
    `INSERT INTO categorias (nombre, descripcion, parent_id)
     VALUES ($1, $2, $3)
     RETURNING id, nombre, descripcion, parent_id`,
    [nombre.trim(), descripcion || null, parent_id || null]
  );
  return resultado.rows[0];
}

async function actualizar(id, campos) {
  const claves = Object.keys(campos);
  if (claves.length === 0) return obtenerPorId(id);

  const permitidas = new Set(["nombre", "descripcion", "parent_id"]);
  const camposValidos = claves.filter((clave) => permitidas.has(clave));
  if (!camposValidos.length) return obtenerPorId(id);
  const asignaciones = camposValidos.map((clave, indice) => `${clave} = ${indice + 1}`);
  const valores = camposValidos.map((clave) => campos[clave]);

  const consulta = `
    UPDATE categorias
    SET ${asignaciones.join(", ")}
    WHERE id = $${claves.length + 1}
    RETURNING id, nombre, descripcion, parent_id
  `;

  const resultado = await pool.query(consulta, [...valores, id]);
  return resultado.rows[0] || null;
}

async function eliminar(id) {
  const resultado = await pool.query("DELETE FROM categorias WHERE id = $1 RETURNING id", [id]);
  return resultado.rows.length > 0;
}

async function contarSubcategorias(id) {
  const resultado = await pool.query("SELECT COUNT(*)::int AS total FROM categorias WHERE parent_id = $1", [id]);
  return resultado.rows[0].total;
}

async function contarProductosAsociados(id) {
  const resultado = await pool.query(
    "SELECT COUNT(*)::int AS total FROM productos WHERE categoria_id = $1",
    [id]
  );
  return resultado.rows[0].total;
}

module.exports = {
  obtenerTodas,
  obtenerPorId,
  existePorNombre,
  crear,
  actualizar,
  eliminar,
  contarProductosAsociados,
  contarSubcategorias,
};
