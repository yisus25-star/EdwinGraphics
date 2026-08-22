const { body } = require("express-validator");

const reglasLogin = [
  body("correo")
    .notEmpty().withMessage("El correo es obligatorio")
    .isEmail().withMessage("El correo no tiene un formato válido"),

  body("password")
    .notEmpty().withMessage("La contraseña es obligatoria")
    .isString().withMessage("La contraseña debe ser un texto"),
];

module.exports = { reglasLogin };
