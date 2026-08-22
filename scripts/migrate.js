/**
 * Ejecuta las migraciones SQL de database/migrations en orden
 * alfabético/numérico, dentro de una transacción cada una, y deja
 * constancia de las ya aplicadas en la tabla migraciones_aplicadas
 * para no volver a correrlas.
 *
 * Uso:
 *   node scripts/migrate.js
 */
const fs = require("fs");
const path = require("path");
const pool = require("../src/config/db");

const CARPETA_MIGRACIONES = path.join(__dirname, "..", "..", "database", "migrations");

async function asegurarTablaControl(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS migraciones_aplicadas (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(255) NOT NULL UNIQUE,
      aplicada_en TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `);
}

async function obtenerMigracionesAplicadas(client) {
  const resultado = await client.query("SELECT nombre FROM migraciones_aplicadas");
  return new Set(resultado.rows.map((fila) => fila.nombre));
}

function listarArchivosMigracion() {
  if (!fs.existsSync(CARPETA_MIGRACIONES)) {
    throw new Error(`No se encontró la carpeta de migraciones: ${CARPETA_MIGRACIONES}`);
  }

  return fs
    .readdirSync(CARPETA_MIGRACIONES)
    .filter((archivo) => archivo.endsWith(".sql"))
    .sort();
}

async function aplicarMigracion(client, nombreArchivo) {
  const rutaCompleta = path.join(CARPETA_MIGRACIONES, nombreArchivo);
  const contenidoSql = fs.readFileSync(rutaCompleta, "utf8");

  await client.query("BEGIN");
  try {
    await client.query(contenidoSql);
    await client.query("INSERT INTO migraciones_aplicadas (nombre) VALUES ($1)", [nombreArchivo]);
    await client.query("COMMIT");
    console.log(`✅ Migración aplicada: ${nombreArchivo}`);
  } catch (error) {
    await client.query("ROLLBACK");
    throw new Error(`❌ Falló la migración ${nombreArchivo}: ${error.message}`);
  }
}

async function ejecutarMigraciones() {
  const client = await pool.connect();

  try {
    await asegurarTablaControl(client);
    const aplicadas = await obtenerMigracionesAplicadas(client);
    const archivos = listarArchivosMigracion();

    const pendientes = archivos.filter((archivo) => !aplicadas.has(archivo));

    if (pendientes.length === 0) {
      console.log("✔ No hay migraciones pendientes. La base de datos ya está al día.");
      return;
    }

    console.log(`Aplicando ${pendientes.length} migración(es) pendiente(s)...`);
    for (const archivo of pendientes) {
      // Se aplican en orden estricto, una por una.
      // eslint-disable-next-line no-await-in-loop
      await aplicarMigracion(client, archivo);
    }

    console.log("🎉 Todas las migraciones se aplicaron correctamente.");
  } finally {
    client.release();
    await pool.end();
  }
}

ejecutarMigraciones().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
