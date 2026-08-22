const pool = require("../config/db");

async function crear({ pedidoId, productoId, cantidad, precioUnitario }, clienteDb = pool) {
  const resultado = await clienteDb.query(
    `INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, precio_unitario)
     VALUES ($1, $2, $3, $4)
     RETURNING id, pedido_id, producto_id, cantidad, precio_unitario`,
    [pedidoId, productoId, cantidad, precioUnitario]
  );
  return resultado.rows[0];
}

async function obtenerPorPedido(pedidoId) {
  const resultado = await pool.query(
    `SELECT dp.id, dp.pedido_id, dp.producto_id, dp.cantidad, dp.precio_unitario,
            p.nombre AS producto_nombre
     FROM detalle_pedido dp
     JOIN productos p ON p.id = dp.producto_id
     WHERE dp.pedido_id = $1
     ORDER BY dp.id ASC`,
    [pedidoId]
  );
  return resultado.rows;
}

module.exports = {
  crear,
  obtenerPorPedido,
};
