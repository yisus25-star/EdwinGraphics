const { body, param } = require("express-validator");

const ESTADOS_VALIDOS = ["Pendiente", "Pagado", "Preparando", "Enviado", "Entregado", "Cancelado"];

const reglasCrearPedido = [
  body("cliente")
    .notEmpty().withMessage("Los datos del cliente son obligatorios")
    .isObject().withMessage("Los datos del cliente deben ser un objeto"),

  body("cliente.nombre").notEmpty().withMessage("El nombre del cliente es obligatorio"),
  body("cliente.apellido").notEmpty().withMessage("El apellido del cliente es obligatorio"),
  body("cliente.correo").isEmail().withMessage("El correo del cliente no es válido"),
  body("cliente.telefono").optional().isString(),

  body("direccion")
    .notEmpty().withMessage("La dirección de envío es obligatoria")
    .isObject().withMessage("La dirección debe ser un objeto"),

  body("direccion.departamento").notEmpty().withMessage("El departamento es obligatorio"),
  body("direccion.ciudad").notEmpty().withMessage("La ciudad es obligatoria"),
  body("direccion.direccion").notEmpty().withMessage("La dirección es obligatoria"),
  body("direccion.referencia").optional().isString(),

  body("metodo_pago")
    .notEmpty().withMessage("El método de pago es obligatorio")
    .isString().withMessage("El método de pago debe ser un texto"),

  body("envio")
    .optional()
    .isFloat({ min: 0 }).withMessage("El costo de envío debe ser un número mayor o igual a cero"),

  body("items")
    .isArray({ min: 1 }).withMessage("El pedido debe incluir al menos un producto"),

  body("items.*.producto_id")
    .isInt({ min: 1 }).withMessage("El id del producto en el detalle no es válido"),

  body("items.*.cantidad")
    .isInt({ min: 1 }).withMessage("La cantidad de cada producto debe ser mayor a cero"),
];

const reglasIdPedido = [
  param("id").isInt({ min: 1 }).withMessage("El id del pedido no es válido"),
];

const reglasActualizarPedido = [
  param("id").isInt({ min: 1 }).withMessage("El id del pedido no es válido"),

  body("metodo_pago").optional().isString().withMessage("El método de pago debe ser un texto"),

  body("envio")
    .optional()
    .isFloat({ min: 0 }).withMessage("El costo de envío debe ser un número mayor o igual a cero"),
];

const reglasCambiarEstado = [
  param("id").isInt({ min: 1 }).withMessage("El id del pedido no es válido"),

  body("estado")
    .notEmpty().withMessage("El estado es obligatorio")
    .isIn(ESTADOS_VALIDOS).withMessage(`El estado debe ser uno de: ${ESTADOS_VALIDOS.join(", ")}`),
];

module.exports = {
  ESTADOS_VALIDOS,
  reglasCrearPedido,
  reglasIdPedido,
  reglasActualizarPedido,
  reglasCambiarEstado,
};
