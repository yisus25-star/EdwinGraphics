const express = require("express");

const clienteController = require("../controllers/cliente.controller");
const direccionController = require("../controllers/direccion.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const validateRequest = require("../middlewares/validateRequest");

const {
  reglasCrearCliente,
  reglasActualizarCliente,
  reglasIdCliente,
} = require("../validators/cliente.validator");

const {
  reglasClienteId,
  reglasCrearDireccion,
  reglasActualizarDireccion,
  reglasIdDireccion,
} = require("../validators/direccion.validator");

const router = express.Router();

// Los clientes no tienen autenticación propia; estas rutas son de
// administración (gestión del catálogo de clientes ya registrados).
router.get("/", authMiddleware, adminMiddleware, clienteController.obtenerTodos);
router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  reglasIdCliente,
  validateRequest,
  clienteController.obtenerPorId
);
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  reglasCrearCliente,
  validateRequest,
  clienteController.crear
);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  reglasActualizarCliente,
  validateRequest,
  clienteController.actualizar
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  reglasIdCliente,
  validateRequest,
  clienteController.eliminar
);

// ==========================
// Direcciones del cliente (sub-recurso)
// ==========================
router.get(
  "/:clienteId/direcciones",
  authMiddleware,
  adminMiddleware,
  reglasClienteId,
  validateRequest,
  direccionController.obtenerPorCliente
);

router.post(
  "/:clienteId/direcciones",
  authMiddleware,
  adminMiddleware,
  reglasCrearDireccion,
  validateRequest,
  direccionController.crear
);

router.put(
  "/direcciones/:id",
  authMiddleware,
  adminMiddleware,
  reglasActualizarDireccion,
  validateRequest,
  direccionController.actualizar
);

router.delete(
  "/direcciones/:id",
  authMiddleware,
  adminMiddleware,
  reglasIdDireccion,
  validateRequest,
  direccionController.eliminar
);

module.exports = router;
