const { param, body } = require("express-validator");

const reglasProductoId = [
  param("productoId").isInt({ min: 1 }).withMessage("El id del producto no es válido"),
];

const reglasImagenId = [
  param("id").isInt({ min: 1 }).withMessage("El id de la imagen no es válido"),
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
  reglasActualizarOrden,
  reglasMarcarPrincipal,
};
