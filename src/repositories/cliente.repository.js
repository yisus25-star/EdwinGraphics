const pool = require("../config/db");

async function obtenerTodos({ limit, offset }) {
  const resultado = await pool.query(
    `SELECT id, nombre, apellido, correo, telefono
     FROM clientes
     ORDER BY id DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  return resultado.rows;
}

async function contarTodos() {
  const resultado = await pool.query("SELECT COUNT(*)::int AS total FROM clientes");
  return resultado.rows[0].total;
}

async function obtenerPorId(id) {
  const resultado = await pool.query(
    "SELECT id, nombre, apellido, correo, telefono FROM clientes WHERE id = $1",
    [id]
  );
  return resultado.rows[0] || null;
}

async function obtenerPorCorreo(correo, clienteDb = pool) {
  const resultado = await clienteDb.query(
    "SELECT id, nombre, apellido, correo, telefono FROM clientes WHERE correo = $1",
    [correo]
  );
  return resultado.rows[0] || null;
}

async function crear({ nombre, apellido, correo, telefono }, clienteDb = pool) {
  const resultado = await clienteDb.query(
    `INSERT INTO clientes (nombre, apellido, correo, telefono)
     VALUES ($1, $2, $3, $4)
     RETURNING id, nombre, apellido, correo, telefono`,
    [nombre, apellido, correo, telefono || null]
  );
  return resultado.rows[0];
}

async function actualizar(id, campos) {
  const claves = Object.keys(campos);
  if (claves.length === 0) return obtenerPorId(id);

  const asignaciones = claves.map((clave, indice) => `${clave} = $${indice + 1}`);
  const valores = claves.map((clave) => campos[clave]);

  const consulta = `
    UPDATE clientes
    SET ${asignaciones.join(", ")}
    WHERE id = $${claves.length + 1}
    RETURNING id, nombre, apellido, correo, telefono
  `;

  const resultado = await pool.query(consulta, [...valores, id]);
  return resultado.rows[0] || null;
}

async function eliminar(id) {
  const resultado = await pool.query("DELETE FROM clientes WHERE id = $1 RETURNING id", [id]);
  return resultado.rows.length > 0;
}

module.exports = {
  obtenerTodos,
  contarTodos,
  obtenerPorId,
  obtenerPorCorreo,
  crear,
  actualizar,
  eliminar,
};
