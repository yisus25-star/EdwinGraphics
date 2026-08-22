/**
 * Helpers para responder siempre con la misma estructura JSON,
 * tal como lo exige la especificación del backend.
 */

function sendSuccess(res, { statusCode = 200, message = "Operación exitosa", data = {} } = {}) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

function sendError(res, { statusCode = 500, message = "Ha ocurrido un error" } = {}) {
  return res.status(statusCode).json({
    success: false,
    message,
  });
}

module.exports = { sendSuccess, sendError };
