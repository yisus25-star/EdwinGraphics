const pool = require("../config/db");

const COLUMNAS = `
  id, cliente_id, direccion_id, fecha, estado, subtotal, envio, total, metodo_pago,
  shopify_checkout_id, shopify_checkout_url, shopify_order_id, shopify_order_number,
  payment_status, stock_reserva_activa, stock_reserva_expira_en
`;

async function crear(
  { clienteId, direccionId, subtotal, envio, total, metodoPago, reservaExpiraEn },
  clienteDb = pool
) {
  const resultado = await clienteDb.query(
    `INSERT INTO pedidos
      (cliente_id, direccion_id, subtotal, envio, total, metodo_pago,
       stock_reserva_activa, stock_reserva_expira_en)
     VALUES ($1, $2, $3, $4, $5, $6, TRUE, $7)
     RETURNING ${COLUMNAS}`,
    [clienteId, direccionId, subtotal, envio, total, metodoPago, reservaExpiraEn]
  );
  return resultado.rows[0];
}

async function obtenerPorId(id, clienteDb = pool) {
  const resultado = await clienteDb.query(`SELECT ${COLUMNAS} FROM pedidos WHERE id = $1`, [id]);
  return resultado.rows[0] || null;
}

async function obtenerPorIdParaActualizar(id, clienteDb = pool) {
  const resultado = await clienteDb.query(
    `SELECT ${COLUMNAS} FROM pedidos WHERE id = $1 FOR UPDATE`,
    [id]
  );
  return resultado.rows[0] || null;
}

async function obtenerTodos({ estado, limit, offset }) {
  const condiciones = [];
  const valores = [];
  if (estado) {
    valores.push(estado);
    condiciones.push(`estado = $${valores.length}`);
  }
  const clausula = condiciones.length ? `WHERE ${condiciones.join(" AND ")}` : "";
  const consulta = `
    SELECT ${COLUMNAS} FROM pedidos ${clausula}
    ORDER BY fecha DESC
    LIMIT $${valores.length + 1} OFFSET $${valores.length + 2}
  `;
  const resultado = await pool.query(consulta, [...valores, limit, offset]);
  return resultado.rows;
}

async function contarTodos({ estado }) {
  const condiciones = [];
  const valores = [];
  if (estado) {
    valores.push(estado);
    condiciones.push(`estado = $${valores.length}`);
  }
  const clausula = condiciones.length ? `WHERE ${condiciones.join(" AND ")}` : "";
  const resultado = await pool.query(`SELECT COUNT(*)::int AS total FROM pedidos ${clausula}`, valores);
  return resultado.rows[0].total;
}

async function actualizarEstado(id, estado, clienteDb = pool) {
  const resultado = await clienteDb.query(
    `UPDATE pedidos SET estado = $1 WHERE id = $2 RETURNING ${COLUMNAS}`,
    [estado, id]
  );
  return resultado.rows[0] || null;
}

async function actualizarCampos(id, campos, clienteDb = pool) {
  const claves = Object.keys(campos);
  if (claves.length === 0) return obtenerPorId(id, clienteDb);

  const asignaciones = claves.map((clave, indice) => `${clave} = $${indice + 1}`);
  const valores = claves.map((clave) => campos[clave]);
  const consulta = `
    UPDATE pedidos SET ${asignaciones.join(", ")}
    WHERE id = $${claves.length + 1}
    RETURNING ${COLUMNAS}
  `;
  const resultado = await clienteDb.query(consulta, [...valores, id]);
  return resultado.rows[0] || null;
}

async function confirmarPago(id, { shopifyOrderId, shopifyOrderNumber }, clienteDb = pool) {
  const resultado = await clienteDb.query(
    `UPDATE pedidos
     SET estado = 'Pagado',
         payment_status = 'pagado',
         shopify_order_id = $1,
         shopify_order_number = $2,
         stock_reserva_activa = FALSE,
         stock_reserva_expira_en = NULL
     WHERE id = $3
     RETURNING ${COLUMNAS}`,
    [shopifyOrderId, shopifyOrderNumber, id]
  );
  return resultado.rows[0] || null;
}

async function marcarReembolso(id, clienteDb = pool) {
  const resultado = await clienteDb.query(
    `UPDATE pedidos
     SET payment_status = 'reembolsado'
     WHERE id = $1
     RETURNING ${COLUMNAS}`,
    [id]
  );
  return resultado.rows[0] || null;
}

async function marcarReservaLiberada(id, clienteDb = pool) {
  const resultado = await clienteDb.query(
    `UPDATE pedidos
     SET stock_reserva_activa = FALSE,
         stock_reserva_expira_en = NULL,
         payment_status = CASE WHEN payment_status = 'pendiente' THEN 'fallido' ELSE payment_status END,
         estado = CASE WHEN estado = 'Pendiente' THEN 'Cancelado' ELSE estado END
     WHERE id = $1
     RETURNING ${COLUMNAS}`,
    [id]
  );
  return resultado.rows[0] || null;
}

async function obtenerReservasExpiradas(limit = 25, clienteDb = pool) {
  const resultado = await clienteDb.query(
    `SELECT ${COLUMNAS}
     FROM pedidos
     WHERE stock_reserva_activa = TRUE
       AND payment_status = 'pendiente'
       AND estado = 'Pendiente'
       AND stock_reserva_expira_en IS NOT NULL
       AND stock_reserva_expira_en <= NOW()
     ORDER BY stock_reserva_expira_en ASC
     LIMIT $1
     FOR UPDATE SKIP LOCKED`,
    [limit]
  );
  return resultado.rows;
}

module.exports = {
  crear,
  obtenerPorId,
  obtenerPorIdParaActualizar,
  obtenerTodos,
  contarTodos,
  actualizarEstado,
  actualizarCampos,
  confirmarPago,
  marcarReembolso,
  marcarReservaLiberada,
  obtenerReservasExpiradas,
};
