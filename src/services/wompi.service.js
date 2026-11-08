const crypto = require("crypto");
const pool = require("../config/db");
const env = require("../config/env");
const ApiError = require("../utils/ApiError");

function validarConfiguracionCheckout(cfg) {
  if (!cfg.wompiPublicKey || !cfg.wompiIntegritySecret) {
    throw ApiError.badRequest("Faltan WOMPI_PUBLIC_KEY y WOMPI_INTEGRITY_SECRET en el backend.");
  }

  const prefijoEsperado = cfg.wompiEnvironment === "production" ? "pub_prod_" : "pub_test_";
  if (!cfg.wompiPublicKey.startsWith(prefijoEsperado)) {
    throw ApiError.badRequest(
      `La llave pública de Wompi no coincide con WOMPI_ENVIRONMENT=${cfg.wompiEnvironment}. Usa una llave ${prefijoEsperado}...`
    );
  }

  let baseUrl;
  try {
    baseUrl = new URL(cfg.baseUrl);
  } catch {
    throw ApiError.badRequest("PUBLIC_BASE_URL debe ser una URL válida del frontend.");
  }
  if (cfg.wompiEnvironment === "production" && baseUrl.protocol !== "https:") {
    throw ApiError.badRequest("En producción, PUBLIC_BASE_URL debe usar HTTPS.");
  }
}

function crearCheckout(pedido) {
  const cfg = env.payments;
  validarConfiguracionCheckout(cfg);

  const amount = Math.round(Number(pedido.total) * 100);
  if (!Number.isSafeInteger(amount) || amount <= 0) {
    throw ApiError.badRequest("El total del pedido no es válido para generar el pago.");
  }

  const reference = pedido.wompi_reference ||
    ("EG-" + pedido.id + "-" + crypto.randomBytes(6).toString("hex").toUpperCase());
  const signature = crypto.createHash("sha256")
    .update(reference + amount + "COP" + cfg.wompiIntegritySecret)
    .digest("hex");

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
  if (!tx || !Array.isArray(properties) || !checksum || evento.timestamp == null) {
    throw new Error("Evento Wompi incompleto.");
  }

  const data = properties
    .map((property) => String(getPath(evento.data, property) ?? ""))
    .join("") + String(evento.timestamp) + cfg.wompiEventsSecret;
  const expected = crypto.createHash("sha256").update(data).digest("hex").toUpperCase();
  const received = String(checksum).toUpperCase();
  if (!/^[A-F0-9]{64}$/.test(received) ||
      !crypto.timingSafeEqual(Buffer.from(expected, "ascii"), Buffer.from(received, "ascii"))) {
    throw new Error("Firma del evento Wompi inválida.");
  }

  if (!tx.reference || !tx.id || !tx.status) {
    throw new Error("La transacción de Wompi no contiene referencia, id o estado.");
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(
      "SELECT pagos.*, pedidos.stock_reserva_activa, pedidos.stock_reserva_expira_en, pedidos.estado AS pedido_estado, pedidos.payment_status AS pedido_payment_status FROM pagos JOIN pedidos ON pedidos.id = pagos.pedido_id WHERE pagos.referencia = $1 FOR UPDATE OF pagos, pedidos",
      [tx.reference]
    );
    const payment = result.rows[0];
    if (!payment) {
      await client.query("ROLLBACK");
      return { ignored: true };
    }

    if (Number(tx.amount_in_cents) !== Math.round(Number(payment.monto_cop) * 100) ||
        tx.currency !== "COP") {
      throw new Error("Monto o moneda del evento no coincide con el pago registrado.");
    }

    // Conserva el estado del evento y su payload para auditoría e idempotencia.
    await client.query(
      "UPDATE pagos SET transaccion_id=$1, estado=$2, metodo=$3, payload=$4::jsonb, actualizado_en=NOW() WHERE id=$5",
      [tx.id, tx.status, tx.payment_method_type || null, JSON.stringify(evento), payment.id]
    );

    if (tx.status === "APPROVED") {
      // Un enlace antiguo puede aprobarse después de liberar/cancelar la reserva.
      // En ese caso no confirmamos una venta sin stock: queda para conciliación manual.
      const reservaVigente =
        payment.stock_reserva_activa === true &&
        payment.pedido_estado === "Pendiente" &&
        ["pendiente", "fallido"].includes(payment.pedido_payment_status) &&
        payment.stock_reserva_expira_en &&
        new Date(payment.stock_reserva_expira_en).getTime() > Date.now();

      if (!reservaVigente) {
        await client.query(
          "UPDATE pagos SET desembolso_estado='requiere_revision' WHERE id=$1",
          [payment.id]
        );
      } else {
        await client.query(
          "UPDATE pedidos SET estado='Pagado', payment_status='pagado', wompi_transaction_id=$1, payment_method_type=$2, payment_updated_at=NOW(), stock_reserva_activa=FALSE, stock_reserva_expira_en=NULL WHERE id=$3 AND payment_status <> 'pagado'",
          [tx.id, tx.payment_method_type || null, payment.pedido_id]
        );
        await client.query(
          "UPDATE pagos SET desembolso_estado='por_liquidar' WHERE id=$1",
          [payment.id]
        );
      }
    } else if (["DECLINED", "ERROR", "VOIDED"].includes(tx.status)) {
      await client.query(
        "UPDATE pedidos SET payment_status='fallido', payment_updated_at=NOW() WHERE id=$1 AND payment_status <> 'pagado'",
        [payment.pedido_id]
      );
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
