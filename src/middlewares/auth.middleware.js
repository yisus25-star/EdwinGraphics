const jwt = require("jsonwebtoken");
const envConfig = require("../config/env");
const { sendError } = require("../utils/apiResponse");

/**
 * Verifica que la petición incluya un token JWT válido en el header
 * Authorization: Bearer <token>. Si es válido, adjunta el payload
 * decodificado en req.admin para que los siguientes middlewares o
 * controllers puedan usarlo.
 */
function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return sendError(res, { statusCode: 401, message: "Token de autenticación no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, envConfig.jwt.secret);
    req.admin = payload;
    return next();
  } catch (error) {
    return sendError(res, { statusCode: 401, message: "Token inválido o expirado" });
  }
}

module.exports = verificarToken;
