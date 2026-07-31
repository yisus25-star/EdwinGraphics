const app = require("./app");
const pool = require("./config/db");

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
    try {

        const respuesta = await pool.query("SELECT NOW()");

        console.log("✅ Conexión a PostgreSQL exitosa");
        console.log("Fecha del servidor:", respuesta.rows[0].now);

        app.listen(PORT, () => {
            console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
        });

    } catch (error) {

        console.error("❌ Error conectando con PostgreSQL");
        console.error(error);

    }
}

iniciarServidor();