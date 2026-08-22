const pool = require("../config/db");

async function obtenerTodas() {
  const resultado = await pool.query(
    "SELECT id, nombre, descripcion FROM categorias ORDER BY nombre ASC"
  );
  return resultado.rows;
}

async function obtenerPorId(id) {
  const resultado = await pool.query(
    "SELECT id, nombre, descripcion FROM categorias WHERE id = $1",
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

async function crear({ nombre, descripcion }) {
  const resultado = await pool.query(
    `INSERT INTO categorias (nombre, descripcion)
     VALUES ($1, $2)
     RETURNING id, nombre, descripcion`,
    [nombre, descripcion || null]
  );
  return resultado.rows[0];
}

async function actualizar(id, campos) {
  const claves = Object.keys(campos);
  if (claves.length === 0) return obtenerPorId(id);

  const asignaciones = claves.map((clave, indice) => `${clave} = $${indice + 1}`);
  const valores = claves.map((clave) => campos[clave]);

  const consulta = `
    UPDATE categorias
    SET ${asignaciones.join(", ")}
    WHERE id = $${claves.length + 1}
    RETURNING id, nombre, descripcion
  `;

  const resultado = await pool.query(consulta, [...valores, id]);
  return resultado.rows[0] || null;
}

async function eliminar(id) {
  const resultado = await pool.query("DELETE FROM categorias WHERE id = $1 RETURNING id", [id]);
  return resultado.rows.length > 0;
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
};
