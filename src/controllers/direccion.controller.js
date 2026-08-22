const direccionService = require("../services/direccion.service");
const { sendSuccess } = require("../utils/apiResponse");
const handleControllerError = require("../utils/handleControllerError");

async function obtenerPorCliente(req, res) {
  try {
    const direcciones = await direccionService.listarPorCliente(req.params.clienteId);
    return sendSuccess(res, { message: "Direcciones obtenidas correctamente", data: direcciones });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function crear(req, res) {
  try {
    const direccion = await direccionService.crear(req.params.clienteId, req.body);
    return sendSuccess(res, {
      statusCode: 201,
      message: "Dirección creada correctamente",
      data: direccion,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function actualizar(req, res) {
  try {
    const direccion = await direccionService.actualizar(req.params.id, req.body);
    return sendSuccess(res, { message: "Dirección actualizada correctamente", data: direccion });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function eliminar(req, res) {
  try {
    await direccionService.eliminar(req.params.id);
    return sendSuccess(res, { message: "Dirección eliminada correctamente", data: {} });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

module.exports = {
  obtenerPorCliente,
  crear,
  actualizar,
  eliminar,
};
