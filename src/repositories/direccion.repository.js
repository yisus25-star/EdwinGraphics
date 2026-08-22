const pool = require("../config/db");

async function obtenerPorCliente(clienteId) {
  const resultado = await pool.query(
    `SELECT id, cliente_id, departamento, ciudad, direccion, referencia
     FROM direcciones WHERE cliente_id = $1 ORDER BY id DESC`,
    [clienteId]
  );
  return resultado.rows;
}

async function obtenerPorId(id) {
  const resultado = await pool.query(
    "SELECT id, cliente_id, departamento, ciudad, direccion, referencia FROM direcciones WHERE id = $1",
    [id]
  );
  return resultado.rows[0] || null;
}

async function crear({ clienteId, departamento, ciudad, direccion, referencia }, clienteDb = pool) {
  const resultado = await clienteDb.query(
    `INSERT INTO direcciones (cliente_id, departamento, ciudad, direccion, referencia)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, cliente_id, departamento, ciudad, direccion, referencia`,
    [clienteId, departamento, ciudad, direccion, referencia || null]
  );
  return resultado.rows[0];
}

async function actualizar(id, campos) {
  const claves = Object.keys(campos);
  if (claves.length === 0) return obtenerPorId(id);

  const asignaciones = claves.map((clave, indice) => `${clave} = $${indice + 1}`);
  const valores = claves.map((clave) => campos[clave]);

  const consulta = `
    UPDATE direcciones
    SET ${asignaciones.join(", ")}
    WHERE id = $${claves.length + 1}
    RETURNING id, cliente_id, departamento, ciudad, direccion, referencia
  `;

  const resultado = await pool.query(consulta, [...valores, id]);
  return resultado.rows[0] || null;
}

async function eliminar(id) {
  const resultado = await pool.query("DELETE FROM direcciones WHERE id = $1 RETURNING id", [id]);
  return resultado.rows.length > 0;
}

module.exports = {
  obtenerPorCliente,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
};
