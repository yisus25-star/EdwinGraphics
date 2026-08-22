const clienteService = require("../services/cliente.service");
const { sendSuccess } = require("../utils/apiResponse");
const handleControllerError = require("../utils/handleControllerError");

async function obtenerTodos(req, res) {
  try {
    const { clientes, meta } = await clienteService.listar(req.query);
    return sendSuccess(res, {
      message: "Clientes obtenidos correctamente",
      data: { clientes, meta },
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function obtenerPorId(req, res) {
  try {
    const cliente = await clienteService.obtenerPorId(req.params.id);
    return sendSuccess(res, { message: "Cliente obtenido correctamente", data: cliente });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function crear(req, res) {
  try {
    const cliente = await clienteService.crear(req.body);
    return sendSuccess(res, {
      statusCode: 201,
      message: "Cliente creado correctamente",
      data: cliente,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function actualizar(req, res) {
  try {
    const cliente = await clienteService.actualizar(req.params.id, req.body);
    return sendSuccess(res, { message: "Cliente actualizado correctamente", data: cliente });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function eliminar(req, res) {
  try {
    await clienteService.eliminar(req.params.id);
    return sendSuccess(res, { message: "Cliente eliminado correctamente", data: {} });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
};
