const pool = require("../config/db");

/**
 * Intenta registrar un evento de webhook. Gracias al UNIQUE sobre
 * webhook_id + ON CONFLICT DO NOTHING, esta operación es atómica: si
 * dos entregas del mismo webhook llegan casi al mismo tiempo (algo que
 * Shopify sí puede hacer), solo una consigue insertar la fila.
 *
 * @returns {boolean} true si el evento era nuevo (se insertó), false
 * si ya existía (ya se había procesado antes).
 */
async function registrarSiEsNuevo({ webhookId, topic, pedidoId }, clienteDb = pool) {
  const resultado = await clienteDb.query(
    `INSERT INTO shopify_webhook_events (webhook_id, topic, pedido_id)
     VALUES ($1, $2, $3)
     ON CONFLICT (webhook_id) DO NOTHING
     RETURNING id`,
    [webhookId, topic, pedidoId]
  );
  return resultado.rows.length > 0;
}

module.exports = { registrarSiEsNuevo };
