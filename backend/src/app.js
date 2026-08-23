const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("Bienvenido a la API de EdwinGraphics 🚀");
});

console.log("exportando app.....");
module.exports = app;