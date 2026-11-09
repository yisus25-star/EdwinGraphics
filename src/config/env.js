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
  payments: {
    provider: (process.env.PAYMENT_PROVIDER || "wompi").toLowerCase(),
    wompiPublicKey: process.env.WOMPI_PUBLIC_KEY || "",
    wompiIntegritySecret: process.env.WOMPI_INTEGRITY_SECRET || "",
    wompiEventsSecret: process.env.WOMPI_EVENTS_SECRET || "",
    wompiEnvironment: (process.env.WOMPI_ENVIRONMENT || "sandbox").toLowerCase(),
    baseUrl: process.env.PUBLIC_BASE_URL || "http://localhost:3000",
    estimatedFeePercent: Number(process.env.PAYMENT_ESTIMATED_FEE_PERCENT || 0),
    reservationMinutes: parseInt(process.env.PAYMENT_RESERVATION_MINUTES, 10) || 30,
  },
};
