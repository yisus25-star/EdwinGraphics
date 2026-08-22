const crypto = require("crypto");

const envConfig = require("../config/env");
const ApiError = require("../utils/ApiError");

/**
 * Construye la URL de Shopify Admin GraphQL.
 */
function construirUrlGraphQL() {
  return `https://${envConfig.shopify.storeDomain}/admin/api/${envConfig.shopify.apiVersion}/graphql.json`;
}

/**
 * Ejecuta una consulta GraphQL contra Shopify.
 */
async function llamarShopifyGraphQL(query, variables = {}) {
  if (
    !envConfig.shopify.storeDomain ||
    !envConfig.shopify.adminApiToken
  ) {
    throw ApiError.badRequest(
      "Shopify no está configurado todavía. Completa SHOPIFY_STORE_DOMAIN y SHOPIFY_ADMIN_API_TOKEN, o usa SHOPIFY_MOCK=true para pruebas locales."
    );
  }

  const respuesta = await fetch(
    construirUrlGraphQL(),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token":
          envConfig.shopify.adminApiToken,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    }
  );

  const datos = await respuesta
    .json()
    .catch(() => ({}));

  if (!respuesta.ok || datos.errors?.length) {
    console.error(
      "Error respondido por Shopify GraphQL:",
      respuesta.status,
      datos
    );

    throw ApiError.badRequest(
      "No se pudo completar la operación de pago en Shopify. Intenta nuevamente más tarde."
    );
  }

  return datos.data;
}

/**
 * Convierte la dirección de EdwinGraphics
 * al formato utilizado por Shopify.
 */
function construirDireccionShopify(pedido) {
  if (!pedido.direccion) {
    return undefined;
  }

  return {
    firstName: pedido.cliente?.nombre,
    lastName: pedido.cliente?.apellido,
    phone: pedido.cliente?.telefono || undefined,
    address1: pedido.direccion.direccion,
    city: pedido.direccion.ciudad,
    province: pedido.direccion.departamento,
    countryCode: "CO",
  };
}

/**
 * Genera el checkout de Shopify para un pedido.
 *
 * En modo MOCK no se conecta a Shopify.
 *
 * En modo REAL crea un Draft Order con los productos
 * y valores calculados por EdwinGraphics.
 */
async function crearCheckout(pedido, detalle) {
  /*
   * ============================================================
   * MODO MOCK
   * ============================================================
   *
   * Permite probar el flujo de checkout sin utilizar
   * una tienda Shopify real.
   */
  if (envConfig.shopify.mock) {
    const idSimulado =
      `mock_${pedido.id}_${Date.now()}`;

    return {
      shopifyCheckoutId: idSimulado,
      checkoutUrl:
        `https://checkout.simulado.local/pay/${idSimulado}`,
    };
  }

  /*
   * ============================================================
   * SHOPIFY REAL
   * ============================================================
   *
   * EdwinGraphics mantiene:
   *
   * - productos
   * - precios
   * - stock
   * - pedidos
   * - registro de ventas
   *
   * Shopify solamente interviene en el checkout/pago.
   */

  const lineItems = detalle.map((item) => ({
    title: item.producto_nombre,
    quantity: item.cantidad,

    originalUnitPriceWithCurrency: {
      amount: Number(
        item.precio_unitario
      ).toFixed(2),

      currencyCode:
        envConfig.shopify.currency,
    },

    requiresShipping: true,
    taxable: false,

    customAttributes: [
      {
        key: "edwingraphics_producto_id",
        value: String(item.producto_id),
      },
    ],
  }));

  const variables = {
    input: {
      email: pedido.cliente?.correo,

      phone:
        pedido.cliente?.telefono ||
        undefined,

      note:
        `Pedido EdwinGraphics #${pedido.id}`,

      tags: [
        "edwingraphics",
      ],

      presentmentCurrencyCode:
        envConfig.shopify.currency,

      customAttributes: [
        {
          key: "edwingraphics_pedido_id",
          value: String(pedido.id),
        },
      ],

      lineItems,

      shippingAddress:
        construirDireccionShopify(pedido),

      ...(Number(pedido.envio) > 0
        ? {
            shippingLine: {
              title: "Envío",

              priceWithCurrency: {
                amount: Number(
                  pedido.envio
                ).toFixed(2),

                currencyCode:
                  envConfig.shopify.currency,
              },
            },
          }
        : {}),
    },
  };

  const query = `
    mutation DraftOrderCreate($input: DraftOrderInput!) {
      draftOrderCreate(input: $input) {
        draftOrder {
          id
          legacyResourceId
          invoiceUrl
          status
        }

        userErrors {
          field
          message
        }
      }
    }
  `;

  const data =
    await llamarShopifyGraphQL(
      query,
      variables
    );

  const payload =
    data?.draftOrderCreate;

  if (
    !payload ||
    payload.userErrors?.length
  ) {
    console.error(
      "Errores de draftOrderCreate:",
      payload?.userErrors
    );

    throw ApiError.badRequest(
      "Shopify no pudo generar el checkout de pago."
    );
  }

  if (!payload.draftOrder?.invoiceUrl) {
    throw ApiError.badRequest(
      "Shopify creó el pedido, pero no devolvió una URL de checkout."
    );
  }

  return {
    shopifyCheckoutId: String(
      payload.draftOrder
        .legacyResourceId ||
        payload.draftOrder.id
    ),

    checkoutUrl:
      payload.draftOrder.invoiceUrl,
  };
}

/**
 * Elimina un Draft Order de Shopify.
 *
 * En modo MOCK no existe un Draft Order real,
 * por lo tanto simplemente devuelve true.
 */
async function eliminarDraftOrder(
  shopifyCheckoutId
) {
  if (
    !shopifyCheckoutId ||
    envConfig.shopify.mock
  ) {
    return true;
  }

  const id = String(
    shopifyCheckoutId
  ).startsWith("gid://")
    ? String(shopifyCheckoutId)
    : `gid://shopify/DraftOrder/${shopifyCheckoutId}`;

  const query = `
    mutation DraftOrderDelete($input: DraftOrderDeleteInput!) {
      draftOrderDelete(input: $input) {
        deletedId

        userErrors {
          field
          message
        }
      }
    }
  `;

  const data =
    await llamarShopifyGraphQL(
      query,
      {
        input: {
          id,
        },
      }
    );

  const payload =
    data?.draftOrderDelete;

  if (
    payload?.userErrors?.length
  ) {
    const mensaje =
      payload.userErrors
        .map(
          (error) =>
            error.message
        )
        .join("; ");

    throw new Error(
      `No se pudo eliminar Draft Order ${id}: ${mensaje}`
    );
  }

  return Boolean(
    payload?.deletedId
  );
}

/**
 * Verifica la firma HMAC enviada por Shopify.
 *
 * Shopify firma el BODY CRUDO de la petición.
 * Por eso esta función recibe un Buffer.
 */
function verificarFirmaWebhook(
  cuerpoCrudo,
  firmaRecibida
) {
  console.log(
    "========== HMAC DEBUG =========="
  );

  console.log(
    "Secret configurado:",
    Boolean(
      envConfig.shopify.webhookSecret
    )
  );

  console.log(
    "Firma recibida:",
    firmaRecibida
  );

  console.log(
    "Body es Buffer:",
    Buffer.isBuffer(cuerpoCrudo)
  );

  if (
    !envConfig.shopify.webhookSecret ||
    !firmaRecibida ||
    !cuerpoCrudo
  ) {
    console.log(
      "HMAC DEBUG: faltan datos para verificar la firma."
    );

    console.log(
      "================================="
    );

    return false;
  }

  const firmaCalculada =
    crypto
      .createHmac(
        "sha256",
        envConfig.shopify.webhookSecret
      )
      .update(cuerpoCrudo)
      .digest("base64");

  console.log(
    "Body recibido:"
  );

  console.log(
    cuerpoCrudo.toString("utf8")
  );

  console.log(
    "Firma recibida:",
    String(firmaRecibida)
  );

  console.log(
    "Firma calculada:",
    firmaCalculada
  );

  console.log(
    "¿Coinciden?:",
    firmaCalculada ===
      String(firmaRecibida)
  );

  console.log(
    "================================="
  );

  const calculada =
    Buffer.from(
      firmaCalculada,
      "utf8"
    );

  const recibida =
    Buffer.from(
      String(firmaRecibida),
      "utf8"
    );

  if (
    calculada.length !==
    recibida.length
  ) {
    return false;
  }

  return crypto.timingSafeEqual(
    calculada,
    recibida
  );
}

module.exports = {
  crearCheckout,
  eliminarDraftOrder,
  verificarFirmaWebhook,
};