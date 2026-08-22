const { validationResult } = require("express-validator");
const { sendError } = require("../utils/apiResponse");

/**
 * Revisa si las reglas de express-validator definidas en la ruta
 * encontraron errores. Si es así, responde 400 con un mensaje amigable
 * (el primero encontrado) en lugar de dejar pasar la petición al
 * Controller.
 */
function validateRequest(req, res, next) {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    const primerError = errores.array()[0];
    return sendError(res, { statusCode: 400, message: primerError.msg });
  }

  return next();
}

module.exports = validateRequest;
