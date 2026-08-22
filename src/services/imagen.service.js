const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const sharp = require("sharp");

const imagenRepository = require("../repositories/imagen.repository");
const productoRepository = require("../repositories/producto.repository");
const ApiError = require("../utils/ApiError");
const envConfig = require("../config/env");
const withTransaction = require("../utils/withTransaction");

const MAX_IMAGENES_POR_PRODUCTO = 15;
const TAMANOS = {
  thumbnail: 400,
  medium: 1000,
  large: 1800,
};

async function asegurarProductoExiste(productoId) {
  const producto = await productoRepository.obtenerPorId(productoId);
  if (!producto) throw ApiError.notFound("Producto no encontrado");
  return producto;
}

async function listarPorProducto(productoId) {
  await asegurarProductoExiste(productoId);
  return imagenRepository.obtenerPorProducto(productoId);
}

function construirRutasImagen(productoId, archivo) {
  const carpetaRelativa = path.join(envConfig.uploads.dir, "productos", String(productoId));
  const carpetaUrl = `${envConfig.uploads.baseUrl}/productos/${productoId}`.replace(/\\/g, "/");
  const base = crypto.randomBytes(8).toString("hex");
  return {
    carpeta: path.join(process.cwd(), carpetaRelativa),
    originalPath: path.join(process.cwd(), envConfig.uploads.dir, archivo.filename),
    urls: {
      original: `${envConfig.uploads.baseUrl}/${archivo.filename}`,
      thumbnail: `${carpetaUrl}/${base}-thumb.webp`,
      medium: `${carpetaUrl}/${base}-medium.webp`,
      large: `${carpetaUrl}/${base}-large.webp`,
    },
    paths: {
      thumbnail: path.join(process.cwd(), carpetaRelativa, `${base}-thumb.webp`),
      medium: path.join(process.cwd(), carpetaRelativa, `${base}-medium.webp`),
      large: path.join(process.cwd(), carpetaRelativa, `${base}-large.webp`),
    },
  };
}

async function optimizarImagen(productoId, archivo) {
  const rutas = construirRutasImagen(productoId, archivo);
  await fs.mkdir(rutas.carpeta, { recursive: true });

  try {
    const metadata = await sharp(rutas.originalPath).metadata();

    await Promise.all([
      sharp(rutas.originalPath).rotate().resize({ width: TAMANOS.thumbnail, withoutEnlargement: true }).webp({ quality: 78 }).toFile(rutas.paths.thumbnail),
      sharp(rutas.originalPath).rotate().resize({ width: TAMANOS.medium, withoutEnlargement: true }).webp({ quality: 82 }).toFile(rutas.paths.medium),
      sharp(rutas.originalPath).rotate().resize({ width: TAMANOS.large, withoutEnlargement: true }).webp({ quality: 85 }).toFile(rutas.paths.large),
    ]);

    const stat = await fs.stat(rutas.originalPath);
    return {
      ...rutas,
      mimeType: metadata.format ? `image/${metadata.format}` : archivo.mimetype,
      ancho: metadata.width || null,
      alto: metadata.height || null,
      tamanoBytes: stat.size,
    };
  } catch (error) {
    await Promise.allSettled([
      fs.unlink(rutas.originalPath),
      fs.unlink(rutas.paths.thumbnail),
      fs.unlink(rutas.paths.medium),
      fs.unlink(rutas.paths.large),
    ]);
    throw error;
  }
}

async function subirImagenes(productoId, archivos) {
  await asegurarProductoExiste(productoId);

  if (!archivos || archivos.length === 0) {
    throw ApiError.badRequest("Debes adjuntar al menos una imagen");
  }

  const totalExistente = await imagenRepository.contarPorProducto(productoId);
  if (totalExistente + archivos.length > MAX_IMAGENES_POR_PRODUCTO) {
    throw ApiError.badRequest(
      `Un producto admite máximo ${MAX_IMAGENES_POR_PRODUCTO} imágenes (tiene ${totalExistente} y se intentaron agregar ${archivos.length})`
    );
  }

  const yaTienePrincipal = await imagenRepository.existePrincipalParaProducto(productoId);
  const procesadas = [];

  try {
    for (let indice = 0; indice < archivos.length; indice += 1) {
      // eslint-disable-next-line no-await-in-loop
      const imagen = await optimizarImagen(productoId, archivos[indice]);
      procesadas.push(imagen);
    }

    const imagenesCreadas = [];
    for (let indice = 0; indice < procesadas.length; indice += 1) {
      const imagen = procesadas[indice];
      // eslint-disable-next-line no-await-in-loop
      const creada = await imagenRepository.crear({
        productoId,
        url: imagen.urls.original,
        urlThumbnail: imagen.urls.thumbnail,
        urlMedium: imagen.urls.medium,
        urlLarge: imagen.urls.large,
        orden: totalExistente + indice,
        esPrincipal: !yaTienePrincipal && indice === 0,
        mimeType: imagen.mimeType,
        ancho: imagen.ancho,
        alto: imagen.alto,
        tamanoBytes: imagen.tamanoBytes,
      });
      imagenesCreadas.push(creada);
    }

    return imagenesCreadas;
  } catch (error) {
    await Promise.allSettled(
      procesadas.flatMap((imagen) => [
        fs.unlink(imagen.originalPath),
        fs.unlink(imagen.paths.thumbnail),
        fs.unlink(imagen.paths.medium),
        fs.unlink(imagen.paths.large),
      ])
    );
    throw error;
  }
}

async function actualizarOrden(id, orden) {
  const imagen = await imagenRepository.obtenerPorId(id);
  if (!imagen) throw ApiError.notFound("Imagen no encontrada");
  return imagenRepository.actualizarOrden(id, orden);
}

async function marcarComoPrincipal(id) {
  const imagen = await imagenRepository.obtenerPorId(id);
  if (!imagen) throw ApiError.notFound("Imagen no encontrada");
  if (imagen.es_principal) return imagen;

  return withTransaction(async (client) => {
    await client.query("SELECT id FROM productos WHERE id = $1 FOR UPDATE", [imagen.producto_id]);
    await imagenRepository.quitarPrincipalDeProducto(imagen.producto_id, client);
    return imagenRepository.marcarComoPrincipal(id, client);
  });
}

async function eliminar(id) {
  const imagen = await imagenRepository.obtenerPorId(id);
  if (!imagen) throw ApiError.notFound("Imagen no encontrada");

  await withTransaction(async (client) => {
    await imagenRepository.eliminar(id, client);

    if (imagen.es_principal) {
      const siguiente = await imagenRepository.obtenerSiguienteCandidataAPrincipal(
        imagen.producto_id,
        id,
        client
      );
      if (siguiente) await imagenRepository.marcarComoPrincipal(siguiente.id, client);
    }
  });

  await eliminarArchivosImagen(imagen);
}

async function eliminarArchivosImagen(imagen) {
  const urls = [imagen.url, imagen.url_thumbnail, imagen.url_medium, imagen.url_large].filter(Boolean);
  await Promise.allSettled(urls.map((url) => {
    if (!url.startsWith(envConfig.uploads.baseUrl)) return Promise.resolve();
    const nombre = url.slice(envConfig.uploads.baseUrl.length).replace(/^\//, "");
    return fs.unlink(path.join(process.cwd(), envConfig.uploads.dir, nombre));
  }));
}

module.exports = {
  listarPorProducto,
  subirImagenes,
  actualizarOrden,
  marcarComoPrincipal,
  eliminar,
};
