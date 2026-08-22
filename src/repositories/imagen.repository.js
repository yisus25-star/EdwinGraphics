const pool = require("../config/db");

const COLUMNAS = `id, producto_id, url, url_thumbnail, url_medium, url_large,
  orden, es_principal, mime_type, ancho, alto, tamano_bytes`;

async function obtenerPorProducto(productoId) {
  const resultado = await pool.query(
    `SELECT ${COLUMNAS}
     FROM producto_imagenes
     WHERE producto_id = $1
     ORDER BY orden ASC, id ASC`,
    [productoId]
  );
  return resultado.rows;
}

async function obtenerPorId(id, clienteDb = pool) {
  const resultado = await clienteDb.query(
    `SELECT ${COLUMNAS} FROM producto_imagenes WHERE id = $1`,
    [id]
  );
  return resultado.rows[0] || null;
}

async function contarPorProducto(productoId) {
  const resultado = await pool.query(
    "SELECT COUNT(*)::int AS total FROM producto_imagenes WHERE producto_id = $1",
    [productoId]
  );
  return resultado.rows[0].total;
}

async function existePrincipalParaProducto(productoId, clienteDb = pool) {
  const resultado = await clienteDb.query(
    "SELECT id FROM producto_imagenes WHERE producto_id = $1 AND es_principal = TRUE",
    [productoId]
  );
  return resultado.rows.length > 0;
}

async function crear(
  { productoId, url, urlThumbnail, urlMedium, urlLarge, orden, esPrincipal = false, mimeType, ancho, alto, tamanoBytes },
  clienteDb = pool
) {
  const resultado = await clienteDb.query(
    `INSERT INTO producto_imagenes
      (producto_id, url, url_thumbnail, url_medium, url_large, orden, es_principal, mime_type, ancho, alto, tamano_bytes)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
     RETURNING ${COLUMNAS}`,
    [productoId, url, urlThumbnail, urlMedium, urlLarge, orden, esPrincipal, mimeType, ancho, alto, tamanoBytes]
  );
  return resultado.rows[0];
}

async function actualizarOrden(id, orden) {
  const resultado = await pool.query(
    `UPDATE producto_imagenes SET orden = $1 WHERE id = $2
     RETURNING ${COLUMNAS}`,
    [orden, id]
  );
  return resultado.rows[0] || null;
}

async function quitarPrincipalDeProducto(productoId, clienteDb = pool) {
  await clienteDb.query(
    "UPDATE producto_imagenes SET es_principal = FALSE WHERE producto_id = $1 AND es_principal = TRUE",
    [productoId]
  );
}

async function marcarComoPrincipal(id, clienteDb = pool) {
  const resultado = await clienteDb.query(
    `UPDATE producto_imagenes SET es_principal = TRUE WHERE id = $1
     RETURNING ${COLUMNAS}`,
    [id]
  );
  return resultado.rows[0] || null;
}

async function obtenerSiguienteCandidataAPrincipal(productoId, idExcluido, clienteDb = pool) {
  const resultado = await clienteDb.query(
    `SELECT ${COLUMNAS} FROM producto_imagenes
     WHERE producto_id = $1 AND id <> $2
     ORDER BY orden ASC, id ASC
     LIMIT 1`,
    [productoId, idExcluido]
  );
  return resultado.rows[0] || null;
}

async function eliminar(id, clienteDb = pool) {
  const resultado = await clienteDb.query(
    `DELETE FROM producto_imagenes WHERE id = $1 RETURNING ${COLUMNAS}`,
    [id]
  );
  return resultado.rows[0] || null;
}

module.exports = {
  obtenerPorProducto,
  obtenerPorId,
  contarPorProducto,
  existePrincipalParaProducto,
  crear,
  actualizarOrden,
  quitarPrincipalDeProducto,
  marcarComoPrincipal,
  obtenerSiguienteCandidataAPrincipal,
  eliminar,
};
