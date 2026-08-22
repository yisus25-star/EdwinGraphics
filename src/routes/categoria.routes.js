const express = require("express");

const categoriaController = require("../controllers/categoria.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const validateRequest = require("../middlewares/validateRequest");

const {
  reglasCrearCategoria,
  reglasActualizarCategoria,
  reglasIdCategoria,
} = require("../validators/categoria.validator");

const router = express.Router();

router.get("/", categoriaController.obtenerTodas);
router.get("/:id", reglasIdCategoria, validateRequest, categoriaController.obtenerPorId);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  reglasCrearCategoria,
  validateRequest,
  categoriaController.crear
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  reglasActualizarCategoria,
  validateRequest,
  categoriaController.actualizar
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  reglasIdCategoria,
  validateRequest,
  categoriaController.eliminar
);

module.exports = router;
