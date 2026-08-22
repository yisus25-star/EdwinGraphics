const pool = require("../config/db");

async function obtenerPorCorreo(correo) {
  const resultado = await pool.query(
    "SELECT id, nombre, correo, password_hash FROM administradores WHERE correo = $1",
    [correo]
  );
  return resultado.rows[0] || null;
}

module.exports = { obtenerPorCorreo };
