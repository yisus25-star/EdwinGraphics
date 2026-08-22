/**
 * Configuración centralizada de variables de entorno.
 */
module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET || "dev_secret_change_me",
    expiresIn: process.env.JWT_EXPIRES_IN || "8h",
  },
  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10,
  },
  uploads: {
    dir: process.env.UPLOAD_DIR || "uploads",
    baseUrl: process.env.UPLOAD_BASE_URL || "/uploads",
    maxFileSizeMb: parseInt(process.env.UPLOAD_MAX_FILE_SIZE_MB, 10) || 5,
  },
  shopify: {
    storeDomain: process.env.SHOPIFY_STORE_DOMAIN || "",
    adminApiToken: process.env.SHOPIFY_ADMIN_API_TOKEN || "",
    apiVersion: process.env.SHOPIFY_API_VERSION || "2026-07",
    clientSecret: process.env.SHOPIFY_CLIENT_SECRET || "",
    currency: process.env.SHOPIFY_CURRENCY || "COP",
    webhookSecret: process.env.SHOPIFY_WEBHOOK_SECRET || process.env.SHOPIFY_CLIENT_SECRET || "",
    reservationMinutes: parseInt(process.env.SHOPIFY_RESERVATION_MINUTES, 10) || 30,
    mock: process.env.SHOPIFY_MOCK === "true",
  },
};
