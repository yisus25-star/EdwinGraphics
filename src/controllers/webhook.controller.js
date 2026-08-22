const shopifyService = require("../services/shopify.service");
const pedidoService = require("../services/pedido.service");
const webhookEventRepository = require("../repositories/shopifyWebhookEvent.repository");
const withTransaction = require("../utils/withTransaction");
const { sendSuccess, sendError } = require("../utils/apiResponse");

/**
 * Recibe y procesa los webhooks de Shopify.
 *
 * Shopify firma el cuerpo CRUDO de la petición, por eso esta ruta
 * utiliza express.raw() y la firma se valida antes de interpretar
 * el JSON.
 *
 * El evento y el cambio de negocio se procesan dentro de la misma
 * transacción. Si el procesamiento falla, también se revierte el
 * registro del webhook para permitir que Shopify pueda reintentarlo.
 */
async function recibirWebhookShopify(req, res) {
  const firmaRecibida = req.headers["x-shopify-hmac-sha256"];
  const topic = req.headers["x-shopify-topic"] || "desconocido";
  const webhookId = req.headers["x-shopify-webhook-id"];
  const cuerpoCrudo = req.body;

  // Shopify debe enviarnos el cuerpo como Buffer para poder verificar
  // correctamente la firma HMAC.
  if (!Buffer.isBuffer(cuerpoCrudo)) {
    return sendError(res, {
      statusCode: 400,
      message: "No se recibió el cuerpo crudo del webhook",
    });
  }

  // Validar la firma antes de procesar cualquier dato recibido.
  if (
    !shopifyService.verificarFirmaWebhook(
      cuerpoCrudo,
      firmaRecibida
    )
  ) {
    console.warn(
      `Webhook de Shopify rechazado por firma inválida (topic: ${topic})`
    );

    return sendError(res, {
      statusCode: 401,
      message: "Firma de webhook inválida",
    });
  }

  let payload;

  try {
    payload = JSON.parse(
      cuerpoCrudo.toString("utf8")
    );
  } catch (error) {
    return sendError(res, {
      statusCode: 400,
      message: "El cuerpo del webhook no es un JSON válido",
    });
  }

  /*
   * Shopify proporciona un ID único para cada webhook.
   * Si por alguna razón no viene, construimos una referencia
   * alternativa para mantener la idempotencia.
   */
  const idEvento =
    webhookId ||
    `${topic}:${payload.id || "sin-id"}:${
      req.headers["x-shopify-triggered-at"] || ""
    }`;

  try {
    let duplicado = false;

    await withTransaction(async (client) => {
      /*
       * Registramos el webhook dentro de la misma transacción
       * que modifica el pedido.
       *
       * Si ya existe, significa que Shopify está reintentando
       * un evento que ya procesamos.
       */
      const esEventoNuevo =
        await webhookEventRepository.registrarSiEsNuevo(
          {
            webhookId: idEvento,
            topic,
            pedidoId: null,
          },
          client
        );

      if (!esEventoNuevo) {
        duplicado = true;
        return;
      }

      /*
       * Procesar el evento de negocio:
       * - orders/paid
       * - orders/cancelled
       * - refunds/create
       */
      await pedidoService.procesarWebhookShopify(
        topic,
        payload,
        client
      );
    });

    if (duplicado) {
      return sendSuccess(res, {
        message:
          "Webhook ya procesado previamente (idempotente)",
        data: {},
      });
    }

    return sendSuccess(res, {
      message: "Webhook procesado correctamente",
      data: {},
    });
  } catch (error) {
    console.error(
      `Error procesando webhook de Shopify (topic: ${topic}):`,
      error
    );

    /*
     * NO devolvemos 200 si el procesamiento falló.
     * La transacción hizo rollback y Shopify podrá reintentar
     * el webhook.
     */
    return sendError(res, {
      statusCode: 500,
      message: "No se pudo procesar el webhook",
    });
  }
}

module.exports = {
  recibirWebhookShopify,
};