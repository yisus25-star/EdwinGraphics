const { body, param } = require("express-validator");

const reglasCrearCliente = [
  body("nombre")
    .notEmpty().withMessage("El nombre es obligatorio")
    .isString().withMessage("El nombre debe ser un texto"),

  body("apellido")
    .notEmpty().withMessage("El apellido es obligatorio")
    .isString().withMessage("El apellido debe ser un texto"),

  body("correo")
    .notEmpty().withMessage("El correo es obligatorio")
    .isEmail().withMessage("El correo no tiene un formato válido"),

  body("telefono")
    .optional()
    .isString().withMessage("El teléfono debe ser un texto"),
];

const reglasActualizarCliente = [
  param("id").isInt({ min: 1 }).withMessage("El id del cliente no es válido"),

  body("nombre").optional().isString().withMessage("El nombre debe ser un texto"),
  body("apellido").optional().isString().withMessage("El apellido debe ser un texto"),
  body("correo").optional().isEmail().withMessage("El correo no tiene un formato válido"),
  body("telefono").optional().isString().withMessage("El teléfono debe ser un texto"),
];

const reglasIdCliente = [
  param("id").isInt({ min: 1 }).withMessage("El id del cliente no es válido"),
];

module.exports = {
  reglasCrearCliente,
  reglasActualizarCliente,
  reglasIdCliente,
};
