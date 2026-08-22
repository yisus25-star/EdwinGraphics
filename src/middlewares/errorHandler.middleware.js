const multer = require("multer");
const { sendError } = require("../utils/apiResponse");

/**
 * Red de seguridad final: captura cualquier error que no haya sido
 * manejado dentro de un Controller (por ejemplo, errores lanzados por
 * Multer o por JSON mal formado en el body). Nunca expone detalles
 * internos al cliente.
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  if (error instanceof multer.MulterError) {
    return sendError(res, { statusCode: 400, message: `Error al subir el archivo: ${error.message}` });
  }

  if (error && error.type === "entity.parse.failed") {
    return sendError(res, { statusCode: 400, message: "El cuerpo de la petición no es un JSON válido" });
  }

  console.error("Error no controlado:", error);
  return sendError(res, { statusCode: 500, message: "Ocurrió un error inesperado en el servidor" });
}

module.exports = errorHandler;
