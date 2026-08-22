const pedidoService = require("../services/pedido.service");
const { sendSuccess } = require("../utils/apiResponse");
const handleControllerError = require("../utils/handleControllerError");

async function crear(req, res) {
  try {
    const pedido = await pedidoService.crear(req.body);
    return sendSuccess(res, {
      statusCode: 201,
      message: "Pedido creado correctamente",
      data: pedido,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function obtenerTodos(req, res) {
  try {
    const { pedidos, meta } = await pedidoService.listar(req.query);
    return sendSuccess(res, { message: "Pedidos obtenidos correctamente", data: { pedidos, meta } });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function obtenerPorId(req, res) {
  try {
    const pedido = await pedidoService.obtenerPorId(req.params.id);
    return sendSuccess(res, { message: "Pedido obtenido correctamente", data: pedido });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function actualizar(req, res) {
  try {
    const pedido = await pedidoService.actualizar(req.params.id, req.body);
    return sendSuccess(res, { message: "Pedido actualizado correctamente", data: pedido });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function cambiarEstado(req, res) {
  try {
    const pedido = await pedidoService.cambiarEstado(req.params.id, req.body.estado);
    return sendSuccess(res, { message: "Estado del pedido actualizado correctamente", data: pedido });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function cancelar(req, res) {
  try {
    const pedido = await pedidoService.cancelar(req.params.id);
    return sendSuccess(res, { message: "Pedido cancelado correctamente", data: pedido });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function crearCheckout(req, res) {
  try {
    const checkout = await pedidoService.crearCheckout(req.params.id);
    return sendSuccess(res, {
      statusCode: 201,
      message: "Checkout de pago generado correctamente",
      data: checkout,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

module.exports = {
  crear,
  obtenerTodos,
  obtenerPorId,
  actualizar,
  cambiarEstado,
  cancelar,
  crearCheckout,
};
