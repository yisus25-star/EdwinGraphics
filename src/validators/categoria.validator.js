const { body, param } = require("express-validator");

const reglasCrearCategoria = [
  body("nombre")
    .notEmpty().withMessage("El nombre de la categoría es obligatorio")
    .isString().withMessage("El nombre debe ser un texto")
    .isLength({ min: 2, max: 120 }).withMessage("El nombre debe tener entre 2 y 120 caracteres"),

  body("descripcion")
    .optional()
    .isString().withMessage("La descripción debe ser un texto"),
  body("parent_id").optional({ nullable: true }).custom((valor) => valor === null || valor === "" || (Number.isInteger(Number(valor)) && Number(valor) > 0))
    .withMessage("La categoría padre no es válida"),
  body("parent_id").optional({ nullable: true }).isInt({ min: 1 })
    .withMessage("La categoría padre no es válida"),
];

const reglasActualizarCategoria = [
  param("id").isInt({ min: 1 }).withMessage("El id de la categoría no es válido"),

  body("nombre")
    .optional()
    .isString().withMessage("El nombre debe ser un texto")
    .isLength({ min: 2, max: 120 }).withMessage("El nombre debe tener entre 2 y 120 caracteres"),

  body("descripcion")
    .optional()
    .isString().withMessage("La descripción debe ser un texto"),
];

const reglasIdCategoria = [
  param("id").isInt({ min: 1 }).withMessage("El id de la categoría no es válido"),
];

module.exports = {
  reglasCrearCategoria,
  reglasActualizarCategoria,
  reglasIdCategoria,
};
