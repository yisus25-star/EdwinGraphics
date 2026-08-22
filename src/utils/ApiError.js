/**
 * Error controlado de la aplicación.
 * Los Services lanzan este tipo de error cuando detectan una condición
 * de negocio inválida (recurso no encontrado, dato duplicado, etc).
 * Los Controllers lo capturan y usan su statusCode/message para responder.
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }

  static badRequest(message) {
    return new ApiError(400, message);
  }

  static unauthorized(message = "No autorizado") {
    return new ApiError(401, message);
  }

  static forbidden(message = "Acceso prohibido") {
    return new ApiError(403, message);
  }

  static notFound(message = "Recurso no encontrado") {
    return new ApiError(404, message);
  }

  static conflict(message) {
    return new ApiError(409, message);
  }
}

module.exports = ApiError;
