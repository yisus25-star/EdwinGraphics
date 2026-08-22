const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const adminRepository = require("../repositories/admin.repository");
const ApiError = require("../utils/ApiError");
const envConfig = require("../config/env");

async function login({ correo, password }) {
  const administrador = await adminRepository.obtenerPorCorreo(correo);

  if (!administrador) {
    throw ApiError.unauthorized("Correo o contraseña incorrectos");
  }

  const passwordValido = await bcrypt.compare(password, administrador.password_hash);
  if (!passwordValido) {
    throw ApiError.unauthorized("Correo o contraseña incorrectos");
  }

  const token = jwt.sign(
    { id: administrador.id, correo: administrador.correo, rol: "admin" },
    envConfig.jwt.secret,
    { expiresIn: envConfig.jwt.expiresIn }
  );

  return {
    token,
    admin: {
      id: administrador.id,
      nombre: administrador.nombre,
      correo: administrador.correo,
    },
  };
}

module.exports = { login };
