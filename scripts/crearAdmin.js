/**
 * Script de línea de comandos para crear un administrador inicial.
 * Uso:
 *   node scripts/crearAdmin.js "Nombre Admin" admin@correo.com claveSegura123
 */
const bcrypt = require("bcryptjs");
const pool = require("../src/config/db");
const envConfig = require("../src/config/env");

async function crearAdmin() {
  const [, , nombre, correo, password] = process.argv;

  if (!nombre || !correo || !password) {
    console.error("Uso: node scripts/crearAdmin.js <nombre> <correo> <password>");
    process.exit(1);
  }

  try {
    const passwordHash = await bcrypt.hash(password, envConfig.bcrypt.saltRounds);

    const resultado = await pool.query(
      `INSERT INTO administradores (nombre, correo, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, nombre, correo`,
      [nombre, correo, passwordHash]
    );

    console.log("✅ Administrador creado:", resultado.rows[0]);
  } catch (error) {
    console.error("❌ Error creando administrador:", error.message);
  } finally {
    await pool.end();
  }
}

crearAdmin();
