const { body, param } = require("express-validator");

const reglasClienteId = [
  param("clienteId").isInt({ min: 1 }).withMessage("El id del cliente no es válido"),
];

const reglasCrearDireccion = [
  param("clienteId").isInt({ min: 1 }).withMessage("El id del cliente no es válido"),

  body("departamento")
    .notEmpty().withMessage("El departamento es obligatorio")
    .isString().withMessage("El departamento debe ser un texto"),

  body("ciudad")
    .notEmpty().withMessage("La ciudad es obligatoria")
    .isString().withMessage("La ciudad debe ser un texto"),

  body("direccion")
    .notEmpty().withMessage("La dirección es obligatoria")
    .isString().withMessage("La dirección debe ser un texto"),

  body("referencia")
    .optional()
    .isString().withMessage("La referencia debe ser un texto"),
];

const reglasActualizarDireccion = [
  param("id").isInt({ min: 1 }).withMessage("El id de la dirección no es válido"),

  body("departamento").optional().isString().withMessage("El departamento debe ser un texto"),
  body("ciudad").optional().isString().withMessage("La ciudad debe ser un texto"),
  body("direccion").optional().isString().withMessage("La dirección debe ser un texto"),
  body("referencia").optional().isString().withMessage("La referencia debe ser un texto"),
];

const reglasIdDireccion = [
  param("id").isInt({ min: 1 }).withMessage("El id de la dirección no es válido"),
];

module.exports = {
  reglasClienteId,
  reglasCrearDireccion,
  reglasActualizarDireccion,
  reglasIdDireccion,
};
