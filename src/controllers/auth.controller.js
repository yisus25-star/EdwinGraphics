const authService = require("../services/auth.service");
const { sendSuccess } = require("../utils/apiResponse");
const handleControllerError = require("../utils/handleControllerError");

async function login(req, res) {
  try {
    const resultado = await authService.login(req.body);
    return sendSuccess(res, { message: "Inicio de sesión exitoso", data: resultado });
  } catch (error) {
    return handleControllerError(res, error);
  }
}

module.exports = { login };
