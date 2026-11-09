const dotenv = require("dotenv");

const resultado = dotenv.config();

if (resultado.error) console.warn("No se pudo cargar .env desde el directorio actual:", resultado.error.message);

const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = pool;