const { sendError } = require("../utils/apiResponse");

/**
 * Se ejecuta cuando ninguna ruta registrada coincide con la petición.
 */
function notFound(req, res) {
  return sendError(res, { statusCode: 404, message: "Ruta no encontrada" });
}

module.exports = notFound;
