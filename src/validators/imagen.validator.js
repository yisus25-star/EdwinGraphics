const { param, body } = require("express-validator");

const reglasProductoId = [
  param("productoId").isInt({ min: 1 }).withMessage("El id del producto no es válido"),
];

const reglasImagenId = [
  param("id").isInt({ min: 1 }).withMessage("El id de la imagen no es válido"),
];

const reglasActualizarColorNombre = [
  param("id").isInt({ min: 1 }).withMessage("El id de la imagen no es válido"),
  body("color_nombre").optional({ nullable: true }).isString().isLength({ max: 60 })
    .withMessage("El nombre del color debe tener máximo 60 caracteres"),
];

const reglasActualizarOrden = [
  param("id").isInt({ min: 1 }).withMessage("El id de la imagen no es válido"),
  body("orden")
    .notEmpty().withMessage("El orden es obligatorio")
    .isInt({ min: 0 }).withMessage("El orden debe ser un número entero mayor o igual a cero"),
];

const reglasMarcarPrincipal = [
  param("id").isInt({ min: 1 }).withMessage("El id de la imagen no es válido"),
];

module.exports = {
  reglasProductoId,
  reglasImagenId,
  reglasActualizarColorNombre,
  reglasActualizarOrden,
  reglasMarcarPrincipal,
};
