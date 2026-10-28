const path = require("path");
const express = require("express");
const cors = require("cors");

const productoRoutes = require("./routes/producto.routes");
const categoriaRoutes = require("./routes/categoria.routes");
const clienteRoutes = require("./routes/cliente.routes");
const pedidoRoutes = require("./routes/pedido.routes");
const authRoutes = require("./routes/auth.routes");
const webhookRoutes = require("./routes/webhook.routes");

const notFound = require("./middlewares/notFound.middleware");
const errorHandler = require("./middlewares/errorHandler.middleware");
const envConfig = require("./config/env");
const pedidoService = require("./services/pedido.service");

const app = express();

// ==========================
// Middlewares
// ==========================
app.use(cors());

// Los webhooks de Shopify se montan ANTES de express.json() a
// propósito: necesitan el cuerpo crudo (sin parsear) para poder
// verificar la firma HMAC. Esta ruta trae su propio express.raw()
// (ver routes/webhook.routes.js), así que debe registrarse antes de
// que el parser JSON global consuma el stream de la petición.
app.use("/webhooks", webhookRoutes);

app.use(express.json());

// Wompi envía eventos firmados; el servicio valida el checksum antes de actualizar un pedido.
app.post("/webhooks/wompi", async (req, res) => {
  try {
    await pedidoService.procesarWebhookWompi(req.body);
    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook Wompi rechazado:", error.message);
    return res.status(400).json({ received: false });
  }
});

// Archivos de imágenes subidos localmente (Multer). Si en el futuro se
// usa Cloudinary, esta línea deja de ser necesaria pero no afecta nada.
app.use(envConfig.uploads.baseUrl, express.static(path.join(process.cwd(), envConfig.uploads.dir), { maxAge: "7d", immutable: true }));

// ==========================
// Rutas
// ==========================
app.use("/productos", productoRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/clientes", clienteRoutes);
app.use("/pedidos", pedidoRoutes);
app.use("/auth", authRoutes);

// ==========================
// Ruta principal
// ==========================
app.get("/", (req, res) => {
    res.send("PRUEBA 123456");
});

// ==========================
// Manejo de rutas no encontradas y errores globales
// ==========================
app.use(notFound);
app.use(errorHandler);

console.log("exportando app.....");

module.exports = app;