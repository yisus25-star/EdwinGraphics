const ApiError = require("./ApiError");
const { sendError } = require("./apiResponse");

/**
 * Traduce cualquier error capturado en un Controller a una respuesta HTTP
 * amigable. Nunca expone detalles internos de PostgreSQL ni stack traces
 * al cliente; esos detalles solo se registran en el log del servidor.
 */
function handleControllerError(res, error) {
  if (error instanceof ApiError) {
    return sendError(res, { statusCode: error.statusCode, message: error.message });
  }

  console.error("Error inesperado:", error);
  return sendError(res, {
    statusCode: 500,
    message: "Ocurrió un error inesperado. Intenta nuevamente más tarde.",
  });
}

module.exports = handleControllerError;
