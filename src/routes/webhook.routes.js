const express = require("express");

const webhookController = require("../controllers/webhook.controller");

const router = express.Router();

/**
 * IMPORTANTE: Shopify firma el webhook sobre el cuerpo CRUDO de la
 * petición. Por eso esta ruta usa su propio express.raw() en vez del
 * express.json() global de la app: si el cuerpo ya pasó por
 * express.json(), el stream se pierde y no se puede verificar la
 * firma. Ver app.js para el orden de montaje de middlewares.
 */
router.post(
  "/shopify",
  express.raw({ type: "application/json", limit: "2mb" }),
  webhookController.recibirWebhookShopify
);

module.exports = router;
