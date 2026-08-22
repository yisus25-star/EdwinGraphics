const imagenService = require("../services/imagen.service");
const { sendSuccess } = require("../utils/apiResponse");
const handleControllerError = require("../utils/handleControllerError");

async function obtenerPorProducto(req, res) {
  try {
    const imagenes = await imagenService.listarPorProducto(req.params.productoId);
    return sendSuccess(res, { message: "Imágenes obtenidas correctamente", data: imagenes });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function subir(req, res) {
  try {
    const imagenes = await imagenService.subirImagenes(req.params.productoId, req.files);
    return sendSuccess(res, {
      statusCode: 201,
      message: "Imágenes subidas correctamente",
      data: imagenes,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function actualizarOrden(req, res) {
  try {
    const imagen = await imagenService.actualizarOrden(req.params.id, req.body.orden);
    return sendSuccess(res, { message: "Orden actualizado correctamente", data: imagen });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function marcarComoPrincipal(req, res) {
  try {
    const imagen = await imagenService.marcarComoPrincipal(req.params.id);
    return sendSuccess(res, {
      message: "Imagen marcada como principal correctamente",
      data: imagen,
    });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function eliminar(req, res) {
  try {
    await imagenService.eliminar(req.params.id);
    return sendSuccess(res, { message: "Imagen eliminada correctamente", data: {} });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

module.exports = {
  obtenerPorProducto,
  subir,
  actualizarOrden,
  marcarComoPrincipal,
  eliminar,
};
