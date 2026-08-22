const express = require("express");

const productoController = require("../controllers/producto.controller");
const imagenController = require("../controllers/imagen.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const validateRequest = require("../middlewares/validateRequest");
const upload = require("../middlewares/upload.middleware");

const {
  reglasCrearProducto,
  reglasActualizarProducto,
  reglasIdProducto,
} = require("../validators/producto.validator");

const {
  reglasProductoId,
  reglasImagenId,
  reglasActualizarOrden,
  reglasMarcarPrincipal,
} = require("../validators/imagen.validator");

const router = express.Router();

// ==========================
// Productos (públicos)
// ==========================
router.get("/", productoController.obtenerTodos);
router.get("/slug/:slug", productoController.obtenerPorSlug);
router.get("/:id", reglasIdProducto, validateRequest, productoController.obtenerPorId);

// ==========================
// Productos (protegidos - administrador)
// ==========================
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  reglasCrearProducto,
  validateRequest,
  productoController.crear
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  reglasActualizarProducto,
  validateRequest,
  productoController.actualizar
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  reglasIdProducto,
  validateRequest,
  productoController.eliminar
);

// ==========================
// Imágenes del producto (sub-recurso)
// ==========================
router.get(
  "/:productoId/imagenes",
  reglasProductoId,
  validateRequest,
  imagenController.obtenerPorProducto
);

router.post(
  "/:productoId/imagenes",
  authMiddleware,
  adminMiddleware,
  reglasProductoId,
  validateRequest,
  upload.array("imagenes", 10),
  imagenController.subir
);

router.put(
  "/imagenes/:id/orden",
  authMiddleware,
  adminMiddleware,
  reglasActualizarOrden,
  validateRequest,
  imagenController.actualizarOrden
);

router.put(
  "/imagenes/:id/principal",
  authMiddleware,
  adminMiddleware,
  reglasMarcarPrincipal,
  validateRequest,
  imagenController.marcarComoPrincipal
);

router.delete(
  "/imagenes/:id",
  authMiddleware,
  adminMiddleware,
  reglasImagenId,
  validateRequest,
  imagenController.eliminar
);

module.exports = router;
