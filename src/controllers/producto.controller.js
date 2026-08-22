const productoService = require("../services/producto.service");
const { sendSuccess } = require("../utils/apiResponse");
const handleControllerError = require("../utils/handleControllerError");

async function obtenerTodos(req, res) {
  try {
    const { productos, meta } = await productoService.listar(req.query);
    return sendSuccess(res, {
      message: "Productos obtenidos correctamente",
      data: { productos, meta },
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function obtenerPorId(req, res) {
  try {
    const producto = await productoService.obtenerPorId(req.params.id);
    return sendSuccess(res, { message: "Producto obtenido correctamente", data: producto });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function obtenerPorSlug(req, res) {
  try {
    const producto = await productoService.obtenerPorSlug(req.params.slug);
    return sendSuccess(res, { message: "Producto obtenido correctamente", data: producto });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function crear(req, res) {
  try {
    const producto = await productoService.crear(req.body);
    return sendSuccess(res, {
      statusCode: 201,
      message: "Producto creado correctamente",
      data: producto,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function actualizar(req, res) {
  try {
    const producto = await productoService.actualizar(req.params.id, req.body);
    return sendSuccess(res, { message: "Producto actualizado correctamente", data: producto });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function eliminar(req, res) {
  try {
    await productoService.eliminar(req.params.id);
    return sendSuccess(res, { message: "Producto eliminado correctamente", data: {} });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

module.exports = {
  obtenerTodos,
  obtenerPorId,
  obtenerPorSlug,
  crear,
  actualizar,
  eliminar,
};
