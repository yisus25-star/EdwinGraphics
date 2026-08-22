const categoriaService = require("../services/categoria.service");
const { sendSuccess } = require("../utils/apiResponse");
const handleControllerError = require("../utils/handleControllerError");

async function obtenerTodas(req, res) {
  try {
    const categorias = await categoriaService.listar();
    return sendSuccess(res, { message: "Categorías obtenidas correctamente", data: categorias });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function obtenerPorId(req, res) {
  try {
    const categoria = await categoriaService.obtenerPorId(req.params.id);
    return sendSuccess(res, { message: "Categoría obtenida correctamente", data: categoria });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function crear(req, res) {
  try {
    const categoria = await categoriaService.crear(req.body);
    return sendSuccess(res, {
      statusCode: 201,
      message: "Categoría creada correctamente",
      data: categoria,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function actualizar(req, res) {
  try {
    const categoria = await categoriaService.actualizar(req.params.id, req.body);
    return sendSuccess(res, { message: "Categoría actualizada correctamente", data: categoria });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function eliminar(req, res) {
  try {
    await categoriaService.eliminar(req.params.id);
    return sendSuccess(res, { message: "Categoría eliminada correctamente", data: {} });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

module.exports = {
  obtenerTodas,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
};
