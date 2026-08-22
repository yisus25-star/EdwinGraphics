const { body, param } = require("express-validator");

const reglasCrearProducto = [
  body("nombre")
    .notEmpty().withMessage("El nombre del producto es obligatorio")
    .isString().withMessage("El nombre debe ser un texto")
    .isLength({ min: 3, max: 150 }).withMessage("El nombre debe tener entre 3 y 150 caracteres"),

  body("descripcion")
    .notEmpty().withMessage("La descripción es obligatoria")
    .isString().withMessage("La descripción debe ser un texto")
    .isLength({ min: 10 }).withMessage("La descripción debe tener al menos 10 caracteres"),

  body("precio")
    .notEmpty().withMessage("El precio es obligatorio")
    .isFloat({ gt: 0 }).withMessage("El precio debe ser un número mayor que cero"),

  body("stock")
    .notEmpty().withMessage("El stock es obligatorio")
    .isInt({ min: 0 }).withMessage("El stock debe ser un número entero mayor o igual a cero"),

  body("categoria_id")
    .notEmpty().withMessage("La categoría es obligatoria")
    .isInt({ min: 1 }).withMessage("La categoría debe ser un identificador válido"),

  body("estado")
    .optional()
    .isBoolean().withMessage("El estado debe ser verdadero o falso"),

  body("shopify_product_id")
    .optional({ nullable: true })
    .isString().withMessage("El id de producto de Shopify debe ser un texto"),

  body("shopify_variant_id")
    .optional({ nullable: true })
    .isString().withMessage("El id de variante de Shopify debe ser un texto"),
];

const reglasActualizarProducto = [
  param("id").isInt({ min: 1 }).withMessage("El id del producto no es válido"),

  body("nombre")
    .optional()
    .isString().withMessage("El nombre debe ser un texto")
    .isLength({ min: 3, max: 150 }).withMessage("El nombre debe tener entre 3 y 150 caracteres"),

  body("descripcion")
    .optional()
    .isString().withMessage("La descripción debe ser un texto")
    .isLength({ min: 10 }).withMessage("La descripción debe tener al menos 10 caracteres"),

  body("precio")
    .optional()
    .isFloat({ gt: 0 }).withMessage("El precio debe ser un número mayor que cero"),

  body("stock")
    .optional()
    .isInt({ min: 0 }).withMessage("El stock debe ser un número entero mayor o igual a cero"),

  body("categoria_id")
    .optional()
    .isInt({ min: 1 }).withMessage("La categoría debe ser un identificador válido"),

  body("estado")
    .optional()
    .isBoolean().withMessage("El estado debe ser verdadero o falso"),

  body("shopify_product_id")
    .optional({ nullable: true })
    .isString().withMessage("El id de producto de Shopify debe ser un texto"),

  body("shopify_variant_id")
    .optional({ nullable: true })
    .isString().withMessage("El id de variante de Shopify debe ser un texto"),
];

const reglasIdProducto = [
  param("id").isInt({ min: 1 }).withMessage("El id del producto no es válido"),
];

module.exports = {
  reglasCrearProducto,
  reglasActualizarProducto,
  reglasIdProducto,
};
