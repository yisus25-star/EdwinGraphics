const fs = require("fs");
const path = require("path");
const multer = require("multer");
const envConfig = require("../config/env");

const uploadDir = path.join(process.cwd(), envConfig.uploads.dir);

// Garantiza que la carpeta de subida exista antes de recibir archivos.
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/**
 * Estrategia de almacenamiento local. Si en el futuro se conecta
 * Cloudinary, solo debe reemplazarse este `storage` (por ejemplo con
 * multer-storage-cloudinary) sin tocar el resto de la capa de
 * imágenes, ya que Service/Repository solo trabajan con la URL final.
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const sufijoUnico = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = path.extname(file.originalname);
    cb(null, `${sufijoUnico}${extension}`);
  },
});

const filtroImagenes = (req, file, cb) => {
  const tiposPermitidos = /jpeg|jpg|png|webp|gif/;
  const extensionValida = tiposPermitidos.test(path.extname(file.originalname).toLowerCase());
  const mimeValido = tiposPermitidos.test(file.mimetype);

  if (extensionValida && mimeValido) {
    return cb(null, true);
  }
  return cb(new Error("Solo se permiten archivos de imagen (jpg, jpeg, png, webp, gif)"));
};

const upload = multer({
  storage,
  fileFilter: filtroImagenes,
  limits: { fileSize: envConfig.uploads.maxFileSizeMb * 1024 * 1024 },
});

module.exports = upload;
