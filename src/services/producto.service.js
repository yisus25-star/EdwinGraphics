const productoRepository = require("../repositories/producto.repository");
const categoriaRepository = require("../repositories/categoria.repository");
const ApiError = require("../utils/ApiError");
const { getPagination, buildPaginationMeta } = require("../utils/pagination");
const { getSorting } = require("../utils/sorting");
const { generarSlug } = require("../utils/slugify");

const CAMPOS_ORDENABLES = ["nombre", "created_at", "stock", "precio"];

/**
 * Genera un slug único para el producto, agregando un sufijo numérico
 * si ya existe otro producto con el mismo slug.
 */
async function generarSlugUnico(nombre, excludeId = null) {
  const base = generarSlug(nombre);
  let slugCandidato = base;
  let contador = 2;

  while (await productoRepository.existePorSlug(slugCandidato, excludeId)) {
    slugCandidato = `${base}-${contador}`;
    contador += 1;
  }

  return slugCandidato;
}

async function validarCategoriaExistente(categoriaId) {
  const categoria = await categoriaRepository.obtenerPorId(categoriaId);
  if (!categoria) {
    throw ApiError.badRequest("La categoría indicada no existe");
  }
  return categoria;
}

async function listar(query) {
  const { page, limit, offset } = getPagination(query);
  const { sort, order } = getSorting(query, CAMPOS_ORDENABLES, "created_at");

  const filtros = {
    categoriaId: query.categoria_id ? parseInt(query.categoria_id, 10) : undefined,
    estado: query.estado !== undefined ? query.estado === "true" : undefined,
    q: query.q ? query.q.trim() : undefined,
  };

  const [productos, total] = await Promise.all([
    productoRepository.obtenerTodos({ ...filtros, sort, order, limit, offset }),
    productoRepository.contarTodos(filtros),
  ]);

  return {
    productos,
    meta: buildPaginationMeta({ page, limit, total }),
  };
}

async function obtenerPorId(id) {
  const producto = await productoRepository.obtenerPorId(id);
  if (!producto) {
    throw ApiError.notFound("Producto no encontrado");
  }
  return producto;
}

async function obtenerPorSlug(slug) {
  const producto = await productoRepository.obtenerPorSlug(slug);
  if (!producto) {
    throw ApiError.notFound("Producto no encontrado");
  }
  return producto;
}

async function crear(datos) {
  await validarCategoriaExistente(datos.categoria_id);

  const slug = await generarSlugUnico(datos.nombre);

  return productoRepository.crear({
    nombre: datos.nombre,
    slug,
    descripcion: datos.descripcion,
    precio: datos.precio,
    stock: datos.stock,
    categoriaId: datos.categoria_id,
    estado: datos.estado !== undefined ? datos.estado : true,
    shopifyProductId: datos.shopify_product_id || null,
    shopifyVariantId: datos.shopify_variant_id || null,
  });
}

async function actualizar(id, datos) {
  const productoExistente = await obtenerPorId(id);

  if (datos.categoria_id !== undefined) {
    await validarCategoriaExistente(datos.categoria_id);
  }

  const campos = {};

  if (datos.nombre !== undefined && datos.nombre !== productoExistente.nombre) {
    campos.nombre = datos.nombre;
    campos.slug = await generarSlugUnico(datos.nombre, id);
  }

  if (datos.descripcion !== undefined) campos.descripcion = datos.descripcion;
  if (datos.precio !== undefined) campos.precio = datos.precio;
  if (datos.stock !== undefined) campos.stock = datos.stock;
  if (datos.categoria_id !== undefined) campos.categoria_id = datos.categoria_id;
  if (datos.estado !== undefined) campos.estado = datos.estado;
  if (datos.shopify_product_id !== undefined) campos.shopify_product_id = datos.shopify_product_id;
  if (datos.shopify_variant_id !== undefined) campos.shopify_variant_id = datos.shopify_variant_id;

  return productoRepository.actualizar(id, campos);
}

async function eliminar(id) {
  await obtenerPorId(id);
  await productoRepository.eliminar(id);
}

module.exports = {
  listar,
  obtenerPorId,
  obtenerPorSlug,
  crear,
  actualizar,
  eliminar,
};
