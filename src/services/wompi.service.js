const crypto = require("crypto");
const pool = require("../config/db");
const env = require("../config/env");
const ApiError = require("../utils/ApiError");

function crearCheckout(pedido) {
  const cfg = env.payments;
  if (!cfg.wompiPublicKey || !cfg.wompiIntegritySecret) {
    throw ApiError.badRequest("Faltan WOMPI_PUBLIC_KEY y WOMPI_INTEGRITY_SECRET en el backend.");
  }
  const reference = pedido.wompi_reference || ("EG-" + pedido.id + "-" + crypto.randomBytes(6).toString("hex").toUpperCase());
  const amount = Math.round(Number(pedido.total) * 100);
  const signature = crypto.createHash("sha256")
    .update(reference + amount + "COP" + cfg.wompiIntegritySecret).digest("hex");
  const url = new URL("https://checkout.wompi.co/p/");
  url.searchParams.set("public-key", cfg.wompiPublicKey);
  url.searchParams.set("currency", "COP");
  url.searchParams.set("amount-in-cents", String(amount));
  url.searchParams.set("reference", reference);
  url.searchParams.set("signature:integrity", signature);
  url.searchParams.set("redirect-url", cfg.baseUrl.replace(/\/$/, "") + "/pago-resultado.html");
  return { checkoutUrl: url.toString(), reference, amount };
}

function getPath(obj, path) {
  return path.split(".").reduce((value, key) => value == null ? undefined : value[key], obj);
}

async function procesarEvento(evento) {
  const cfg = env.payments;
  if (!cfg.wompiEventsSecret) throw new Error("Falta WOMPI_EVENTS_SECRET.");
  if (evento.event !== "transaction.updated") return { ignored: true };
  const tx = evento.data && evento.data.transaction;
  const properties = evento.signature && evento.signature.properties;
  const checksum = evento.signature && evento.signature.checksum;
  if (!tx || !Array.isArray(properties) || !checksum || !evento.timestamp) throw new Error("Evento Wompi incompleto.");
  const data = properties.map((p) => String(getPath(evento.data, p) ?? "")).join("") + String(evento.timestamp) + cfg.wompiEventsSecret;
  const expected = crypto.createHash("sha256").update(data).digest("hex").toUpperCase();
  const received = String(checksum).toUpperCase();
  if (expected.length !== received.length || !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(received))) {
    throw new Error("Firma del evento Wompi inválida.");
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query("SELECT * FROM pagos WHERE referencia = $1 FOR UPDATE", [tx.reference]);
    const payment = result.rows[0];
    if (!payment) { await client.query("ROLLBACK"); return { ignored: true }; }
    if (Number(tx.amount_in_cents) !== Math.round(Number(payment.monto_cop) * 100) || tx.currency !== "COP") {
      throw new Error("Monto o moneda del evento no coincide con el pago registrado.");
    }
    await client.query("UPDATE pagos SET transaccion_id=$1, estado=$2, metodo=$3, payload=$4::jsonb, actualizado_en=NOW() WHERE id=$5",
      [tx.id || null, tx.status, tx.payment_method_type || null, JSON.stringify(evento), payment.id]);
    if (tx.status === "APPROVED") {
      await client.query("UPDATE pedidos SET estado='Pagado', payment_status='pagado', wompi_transaction_id=$1, payment_method_type=$2, payment_updated_at=NOW(), stock_reserva_activa=FALSE, stock_reserva_expira_en=NULL WHERE id=$3 AND payment_status <> 'pagado'",
        [tx.id || null, tx.payment_method_type || null, payment.pedido_id]);
      await client.query("UPDATE pagos SET desembolso_estado='por_liquidar' WHERE id=$1", [payment.id]);
    } else if (["DECLINED", "ERROR", "VOIDED"].includes(tx.status)) {
      await client.query("UPDATE pedidos SET payment_status='fallido', payment_updated_at=NOW() WHERE id=$1 AND payment_status <> 'pagado'", [payment.pedido_id]);
    }
    await client.query("COMMIT");
    return { processed: true };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

module.exports = { crearCheckout, procesarEvento };
