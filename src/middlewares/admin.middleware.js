const { sendError } = require("../utils/apiResponse");

/**
 * Verifica que el usuario autenticado (req.admin, adjuntado por
 * auth.middleware) tenga el rol de administrador. Se mantiene como
 * middleware independiente para respetar la separación de
 * responsabilidades pedida en la especificación, aunque hoy el único
 * actor autenticado del sistema sea el administrador.
 */
function verificarAdmin(req, res, next) {
  if (!req.admin || req.admin.rol !== "admin") {
    return sendError(res, { statusCode: 403, message: "No tienes permisos de administrador" });
  }
  return next();
}

module.exports = verificarAdmin;
