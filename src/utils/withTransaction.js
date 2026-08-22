const pool = require("../config/db");

/**
 * Ejecuta el callback recibido dentro de una transacción de PostgreSQL.
 * Se usa en flujos que tocan varias tablas a la vez (por ejemplo, crear
 * un pedido implica crear/buscar cliente, dirección, pedido y detalle,
 * además de descontar stock), garantizando que all se confirme o se
 * revierta en conjunto.
 *
 * @param {(client: import('pg').PoolClient) => Promise<any>} callback
 */
async function withTransaction(callback) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const resultado = await callback(client);
    await client.query("COMMIT");
    return resultado;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

module.exports = withTransaction;
