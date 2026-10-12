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
 * Cloudinary, solo debe reemplazarse este storage.
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const sufijoUnico = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, `${sufijoUnico}${extension}`);
  },
});

// Extensiones de imagen raster compatibles con los navegadores modernos.
// Se validan por separado para evitar que una coincidencia parcial acepte
// extensiones que no sean realmente imágenes.
const mimePorExtension = {
  ".jpg": ["image/jpeg", "image/pjpeg"],
  ".jpeg": ["image/jpeg", "image/pjpeg"],
  ".jfif": ["image/jpeg", "image/pjpeg"],
  ".png": ["image/png", "image/x-png"],
  ".webp": ["image/webp"],
  ".gif": ["image/gif"],
  ".avif": ["image/avif"],
  ".bmp": ["image/bmp", "image/x-ms-bmp"],
};

const filtroImagenes = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();
  const mimesPermitidos = mimePorExtension[extension];

  // Algunos navegadores/sistemas operativos no identifican el MIME y envían
  // application/octet-stream. En ese caso se acepta solo una extensión
  // incluida explícitamente en la lista permitida.
  const mime = String(file.mimetype || "").toLowerCase();
  const mimeValido = mimesPermitidos?.includes(mime) || mime === "application/octet-stream";

  if (mimesPermitidos && mimeValido) {
    return cb(null, true);
  }

  return cb(new Error(
    "Formato de imagen no compatible. Usa JPG, JPEG, JFIF, PNG, WEBP, GIF, AVIF o BMP."
  ));
};

const upload = multer({
  storage,
  fileFilter: filtroImagenes,
  limits: { fileSize: envConfig.uploads.maxFileSizeMb * 1024 * 1024 },
});

module.exports = upload;
