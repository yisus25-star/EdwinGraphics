const express = require("express");

const pedidoController = require("../controllers/pedido.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const validateRequest = require("../middlewares/validateRequest");

const {
  reglasCrearPedido,
  reglasIdPedido,
  reglasActualizarPedido,
  reglasCambiarEstado,
} = require("../validators/pedido.validator");

const router = express.Router();

// Creación pública: el cliente compra sin necesidad de autenticarse.
router.post("/", reglasCrearPedido, validateRequest, pedidoController.crear);

// Consulta pública por id: permite hacer seguimiento del pedido con
// el número recibido tras la compra (los clientes no tienen sesión).
router.get("/:id", reglasIdPedido, validateRequest, pedidoController.obtenerPorId);

// Genera (o reutiliza) el enlace de pago de Shopify para el pedido.
// Es pública porque el cliente todavía no tiene sesión cuando paga.
router.post(
  "/:id/checkout",
  reglasIdPedido,
  validateRequest,
  pedidoController.crearCheckout
);

// Listado y gestión: solo administrador.
router.get("/", authMiddleware, adminMiddleware, pedidoController.obtenerTodos);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  reglasActualizarPedido,
  validateRequest,
  pedidoController.actualizar
);

router.patch(
  "/:id/estado",
  authMiddleware,
  adminMiddleware,
  reglasCambiarEstado,
  validateRequest,
  pedidoController.cambiarEstado
);

router.put(
  "/:id/cancelar",
  authMiddleware,
  adminMiddleware,
  reglasIdPedido,
  validateRequest,
  pedidoController.cancelar
);

module.exports = router;
