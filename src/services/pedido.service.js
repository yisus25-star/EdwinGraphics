const pedidoRepository = require("../repositories/pedido.repository");
const detallePedidoRepository = require("../repositories/detallePedido.repository");
const productoRepository = require("../repositories/producto.repository");
const clienteRepository = require("../repositories/cliente.repository");
const direccionRepository = require("../repositories/direccion.repository");
const shopifyService = require("./shopify.service");

const ApiError = require("../utils/ApiError");
const withTransaction = require("../utils/withTransaction");
const { getPagination, buildPaginationMeta } = require("../utils/pagination");
const { ESTADOS_VALIDOS } = require("../validators/pedido.validator");
const envConfig = require("../config/env");
const wompiService = require("./wompi.service");
const pool = require("../config/db");

const ESTADOS_NO_CANCELABLES = ["Entregado", "Cancelado"];

async function buscarOCrearCliente(datosCliente, client) {
  const clienteExistente = await clienteRepository.obtenerPorCorreo(datosCliente.correo, client);
  if (clienteExistente) return clienteExistente;
  return clienteRepository.crear(datosCliente, client);
}

async function procesarItemsPedido(items, client) {
  let subtotal = 0;
  const detalles = [];

  for (const item of items) {
    // eslint-disable-next-line no-await-in-loop
    const producto = await productoRepository.obtenerPorIdParaActualizar(item.producto_id, client);
    if (!producto) {
      throw ApiError.badRequest(`El producto con id ${item.producto_id} no existe`);
    }
    if (producto.stock < item.cantidad) {
      throw ApiError.conflict(
        `Stock insuficiente para el producto "${producto.nombre}". Disponible: ${producto.stock}`
      );
    }

    // El stock se reserva inmediatamente en EdwinGraphics. La columna
    // stock_reserva_activa permite liberarlo automáticamente si el pago
    // no llega antes del vencimiento.
    // eslint-disable-next-line no-await-in-loop
    await productoRepository.descontarStock(item.producto_id, item.cantidad, client);

    const precioUnitario = Number(producto.precio);
    subtotal += precioUnitario * item.cantidad;
    detalles.push({
      productoId: item.producto_id,
      cantidad: item.cantidad,
      precioUnitario,
    });
  }

  return { subtotal, detalles };
}

function calcularExpiracionReserva() {
  const fecha = new Date(Date.now() + envConfig.shopify.reservationMinutes * 60 * 1000);
  return fecha;
}

async function crear(datosPedido) {
  await liberarReservasExpiradas();

  const { cliente, direccion, metodo_pago: metodoPago, envio = 0, items, observaciones = null } = datosPedido;
  const pedidoCreado = await withTransaction(async (client) => {
    const clienteRegistrado = await buscarOCrearCliente(cliente, client);
    const direccionRegistrada = await direccionRepository.crear(
      { clienteId: clienteRegistrado.id, ...direccion },
      client
    );
    const { subtotal, detalles } = await procesarItemsPedido(items, client);
    const total = subtotal + Number(envio);

    const nuevoPedido = await pedidoRepository.crear(
      {
        clienteId: clienteRegistrado.id,
        direccionId: direccionRegistrada.id,
        subtotal,
        envio,
        total,
        metodoPago,
        reservaExpiraEn: calcularExpiracionReserva(),
        observaciones,
      },
      client
    );

    for (const detalle of detalles) {
      // eslint-disable-next-line no-await-in-loop
      await detallePedidoRepository.crear(
        {
          pedidoId: nuevoPedido.id,
          productoId: detalle.productoId,
          cantidad: detalle.cantidad,
          precioUnitario: detalle.precioUnitario,
        },
        client
      );
    }
    return nuevoPedido;
  });

  return obtenerPorId(pedidoCreado.id);
}

async function listar(query) {
  await liberarReservasExpiradas();
  const { page, limit, offset } = getPagination(query);
  const estado = query.estado && ESTADOS_VALIDOS.includes(query.estado) ? query.estado : undefined;
  const [pedidos, total] = await Promise.all([
    pedidoRepository.obtenerTodos({ estado, limit, offset }),
    pedidoRepository.contarTodos({ estado }),
  ]);
  return { pedidos, meta: buildPaginationMeta({ page, limit, total }) };
}

async function obtenerPorId(id) {
  const pedido = await pedidoRepository.obtenerPorId(id);
  if (!pedido) throw ApiError.notFound("Pedido no encontrado");
  const detalle = await detallePedidoRepository.obtenerPorPedido(id);
  return { ...pedido, detalle };
}

async function actualizar(id, datos) {
  const pedido = await obtenerPorIdSinDetalle(id);
  const campos = {};
  if (datos.metodo_pago !== undefined) campos.metodo_pago = datos.metodo_pago;
  if (datos.envio !== undefined) {
    if (pedido.payment_status === "pagado") {
      throw ApiError.conflict("No se puede modificar el envío de un pedido ya pagado");
    }
    campos.envio = datos.envio;
    campos.total = Number(pedido.subtotal) + Number(datos.envio);
  }
  await pedidoRepository.actualizarCampos(id, campos);
  return obtenerPorId(id);
}

async function obtenerPorIdSinDetalle(id) {
  const pedido = await pedidoRepository.obtenerPorId(id);
  if (!pedido) throw ApiError.notFound("Pedido no encontrado");
  return pedido;
}

async function cambiarEstado(id, nuevoEstado) {
  const pedido = await obtenerPorIdSinDetalle(id);
  if (ESTADOS_NO_CANCELABLES.includes(pedido.estado) && nuevoEstado !== pedido.estado) {
    throw ApiError.conflict(`No se puede cambiar el estado de un pedido que ya está "${pedido.estado}"`);
  }
  await pedidoRepository.actualizarEstado(id, nuevoEstado);
  return obtenerPorId(id);
}

async function cancelarEnTransaccion(id, client) {
  const pedido = await pedidoRepository.obtenerPorIdParaActualizar(id, client);
  if (!pedido) throw ApiError.notFound("Pedido no encontrado");
  if (ESTADOS_NO_CANCELABLES.includes(pedido.estado)) {
    throw ApiError.conflict(`El pedido ya está "${pedido.estado}" y no puede cancelarse`);
  }

  // Solo se restaura stock si la reserva sigue activa. Un pedido ya
  // pagado no debe sumar stock de nuevo al cancelarse manualmente.
  if (pedido.stock_reserva_activa) {
    const detalle = await detallePedidoRepository.obtenerPorPedido(id);
    for (const item of detalle) {
      // eslint-disable-next-line no-await-in-loop
      await productoRepository.restaurarStock(item.producto_id, item.cantidad, client);
    }
  }

  await pedidoRepository.marcarReservaLiberada(id, client);
  await pedidoRepository.actualizarEstado(id, "Cancelado", client);
  return pedidoRepository.obtenerPorId(id, client);
}

async function cancelar(id) {
  await withTransaction((client) => cancelarEnTransaccion(id, client));
  return obtenerPorId(id);
}

async function obtenerBalance(query = {}) {
  const desde = query.desde || null;
  const hasta = query.hasta || null;
  const resumen = await pool.query(
    `SELECT
      COALESCE(SUM(total) FILTER (WHERE payment_status = 'pagado'), 0)::numeric AS ventas_pagadas,
      COUNT(*) FILTER (WHERE payment_status = 'pagado')::int AS pedidos_pagados,
      COALESCE(SUM(total) FILTER (WHERE payment_status = 'pendiente'), 0)::numeric AS pagos_pendientes,
      COUNT(*) FILTER (WHERE payment_status = 'pendiente')::int AS pedidos_pendientes,
      COALESCE(SUM(total) FILTER (WHERE payment_status IN ('fallido','reembolsado')), 0)::numeric AS fallidos_y_reembolsados
     FROM pedidos
     WHERE ($1::date IS NULL OR fecha >= $1::date)
       AND ($2::date IS NULL OR fecha < ($2::date + INTERVAL '1 day'))`,
    [desde, hasta]
  );
  const pagos = await pool.query(
    `SELECT COALESCE(SUM(comision_estimada_cop) FILTER (WHERE estado = 'APPROVED'),0)::numeric AS comisiones_estimadas,
      COALESCE(SUM(monto_cop) FILTER (WHERE estado = 'APPROVED' AND desembolso_estado = 'desembolsado'),0)::numeric AS desembolsado,
      COALESCE(SUM(monto_cop) FILTER (WHERE estado = 'APPROVED' AND desembolso_estado <> 'desembolsado'),0)::numeric AS por_liquidar
     FROM pagos
     WHERE ($1::date IS NULL OR creado_en >= $1::date)
       AND ($2::date IS NULL OR creado_en < ($2::date + INTERVAL '1 day'))`,
    [desde, hasta]
  );
  const totals = resumen.rows[0];
  const paymentTotals = pagos.rows[0];
  const ventas = Number(totals.ventas_pagadas);
  const comisiones = Number(paymentTotals.comisiones_estimadas);
  return {
    desde, hasta,
    ventasPagadas: ventas,
    pedidosPagados: totals.pedidos_pagados,
    pagosPendientes: Number(totals.pagos_pendientes),
    pedidosPendientes: totals.pedidos_pendientes,
    comisionesEstimadas: comisiones,
    netoEstimado: ventas - comisiones,
    desembolsadoRegistrado: Number(paymentTotals.desembolsado),
    porLiquidar: Number(paymentTotals.por_liquidar),
    nota: "Las comisiones son estimadas según PAYMENT_ESTIMATED_FEE_PERCENT. El desembolso real debe conciliarse con los reportes de Wompi."
  };
}

async function crearCheckout(id) {
  await liberarReservasExpiradas();
  const pedido = await obtenerPorIdSinDetalle(id);

  if (ESTADOS_NO_CANCELABLES.includes(pedido.estado)) {
    throw ApiError.conflict(`No se puede iniciar el pago de un pedido "${pedido.estado}"`);
  }
  if (pedido.payment_status === "pagado") {
    throw ApiError.conflict("Este pedido ya fue pagado");
  }
  if (!pedido.stock_reserva_activa) {
    throw ApiError.conflict("La reserva de stock de este pedido ya expiró. Crea un nuevo pedido para continuar.");
  }

  if (envConfig.payments.provider === "wompi") {
    const checkout = wompiService.crearCheckout(pedido);
    if (!pedido.wompi_reference) await pedidoRepository.actualizarCampos(id, { wompi_reference: checkout.reference });
    await pool.query(
      "INSERT INTO pagos (pedido_id, proveedor, referencia, estado, monto_cop, comision_estimada_cop) VALUES ($1, 'wompi', $2, 'PENDING', $3, $4) ON CONFLICT (referencia) DO NOTHING",
      [id, checkout.reference, Number(pedido.total), Number(pedido.total) * (envConfig.payments.estimatedFeePercent / 100)]
    );
    return { checkoutUrl: checkout.checkoutUrl, referencia: checkout.reference, proveedor: "wompi" };
  }

  if (pedido.shopify_checkout_url) {
    return {
      checkoutUrl: pedido.shopify_checkout_url,
      shopifyCheckoutId: pedido.shopify_checkout_id,
    };
  }

  const [detalle, cliente, direccion] = await Promise.all([
    detallePedidoRepository.obtenerPorPedido(id),
    clienteRepository.obtenerPorId(pedido.cliente_id),
    pedido.direccion_id ? direccionRepository.obtenerPorId(pedido.direccion_id) : null,
  ]);

  const pedidoParaShopify = { ...pedido, cliente, direccion };
  const { shopifyCheckoutId, checkoutUrl } = await shopifyService.crearCheckout(pedidoParaShopify, detalle);

  await pedidoRepository.actualizarCampos(id, {
    shopify_checkout_id: shopifyCheckoutId,
    shopify_checkout_url: checkoutUrl,
    stock_reserva_expira_en: calcularExpiracionReserva(),
  });

  return { checkoutUrl, shopifyCheckoutId };
}

function extraerAtributos(payloadShopify) {
  return payloadShopify.note_attributes || payloadShopify.custom_attributes || payloadShopify.customAttributes || [];
}

function extraerPedidoIdDesdeNotas(payloadShopify) {
  const atributos = extraerAtributos(payloadShopify);
  const atributoPedido = atributos.find(
    (atributo) => atributo.name === "edwingraphics_pedido_id" || atributo.key === "edwingraphics_pedido_id"
  );
  if (!atributoPedido) return null;
  const pedidoId = parseInt(atributoPedido.value, 10);
  return Number.isInteger(pedidoId) ? pedidoId : null;
}

async function confirmarPagoDesdeShopify(pedidoId, payloadShopify, client) {
  const pedido = await pedidoRepository.obtenerPorId(pedidoId, client);
  if (!pedido) {
    console.warn(`Webhook de pago de Shopify referencia un pedido inexistente: ${pedidoId}`);
    return;
  }
  if (pedido.payment_status === "pagado") return;
  if (pedido.estado === "Cancelado") {
    throw new Error(`Shopify confirmó pago para un pedido cancelado: ${pedidoId}`);
  }

  await pedidoRepository.confirmarPago(pedidoId, {
    shopifyOrderId: String(payloadShopify.id || payloadShopify.admin_graphql_api_id || ""),
    shopifyOrderNumber: String(payloadShopify.order_number || payloadShopify.name || ""),
  }, client);
}

async function marcarReembolsoDesdeShopify(pedidoId, client) {
  const pedido = await pedidoRepository.obtenerPorId(pedidoId, client);
  if (!pedido) return;
  if (pedido.payment_status === "reembolsado") return;
  await pedidoRepository.marcarReembolso(pedidoId, client);
}

async function procesarWebhookShopify(topic, payloadShopify, client) {
  const pedidoId = extraerPedidoIdDesdeNotas(payloadShopify);
  if (!pedidoId) {
    console.warn(`Webhook de Shopify (${topic}) sin referencia a un pedido de EdwinGraphics; se ignora.`);
    return { pedidoId: null };
  }

  if (topic === "orders/paid") {
    await confirmarPagoDesdeShopify(pedidoId, payloadShopify, client);
  } else if (topic === "orders/cancelled") {
    await cancelarEnTransaccion(pedidoId, client);
  } else if (topic === "refunds/create") {
    await marcarReembolsoDesdeShopify(pedidoId, client);
  }

  return { pedidoId };
}

/**
 * Libera reservas vencidas solo después de poder invalidar el Draft Order
 * correspondiente en Shopify. Esto evita que un enlace antiguo siga siendo
 * válido después de que el stock vuelva al inventario de EdwinGraphics.
 */
async function liberarReservasExpiradas() {
  let procesadas = 0;

  while (true) {
    let huboUna = false;
    try {
      await withTransaction(async (client) => {
        const reservas = await pedidoRepository.obtenerReservasExpiradas(10, client);
        if (!reservas.length) return;
        huboUna = true;

        for (const pedido of reservas) {
          if (pedido.shopify_checkout_id) {
            // eslint-disable-next-line no-await-in-loop
            await shopifyService.eliminarDraftOrder(pedido.shopify_checkout_id);
          }

          const detalle = await detallePedidoRepository.obtenerPorPedido(pedido.id);
          for (const item of detalle) {
            // eslint-disable-next-line no-await-in-loop
            await productoRepository.restaurarStock(item.producto_id, item.cantidad, client);
          }

          await pedidoRepository.marcarReservaLiberada(pedido.id, client);
          procesadas += 1;
        }
      });
    } catch (error) {
      console.error("No se pudo liberar una reserva de stock vencida:", error.message);
      break;
    }

    if (!huboUna) break;
  }

  return procesadas;
}

module.exports = {
  crear,
  listar,
  obtenerPorId,
  actualizar,
  cambiarEstado,
  cancelar,
  crearCheckout,
  obtenerBalance,
  procesarWebhookShopify,
  procesarWebhookWompi: wompiService.procesarEvento,
  liberarReservasExpiradas,
};
