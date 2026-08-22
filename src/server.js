require("dotenv").config();

const app = require("./app");
const pool = require("./config/db");
const pedidoService = require("./services/pedido.service");

const PORT = process.env.PORT || 3000;
const INTERVALO_LIMPIEZA_RESERVAS_MS = 5 * 60 * 1000;

async function iniciarServidor() {
  try {
    const respuesta = await pool.query("SELECT NOW()");

    console.log("Conexión a PostgreSQL exitosa");
    console.log(
      "Fecha del servidor:",
      respuesta.rows[0].now
    );

    app.listen(PORT, () => {
      console.log(
        `Servidor ejecutándose en http://localhost:${PORT}`
      );
    });

    const limpiarReservas = async () => {
      try {
        const cantidad =
          await pedidoService.liberarReservasExpiradas();

        if (cantidad > 0) {
          console.log(
            `Reservas de stock liberadas: ${cantidad}`
          );
        }
      } catch (error) {
        console.error(
          "Error en limpieza de reservas:",
          error.message
        );
      }
    };

    await limpiarReservas();

    setInterval(
      limpiarReservas,
      INTERVALO_LIMPIEZA_RESERVAS_MS
    );
  } catch (error) {
    console.error(
      "Error iniciando servidor:",
      error
    );

    process.exit(1);
  }
}

iniciarServidor();