const categoriaRepository = require("../repositories/categoria.repository");
const ApiError = require("../utils/ApiError");

async function listar() {
  return categoriaRepository.obtenerTodas();
}

async function obtenerPorId(id) {
  const categoria = await categoriaRepository.obtenerPorId(id);
  if (!categoria) {
    throw ApiError.notFound("Categoría no encontrada");
  }
  return categoria;
}

async function crear(datos) {
  const yaExiste = await categoriaRepository.existePorNombre(datos.nombre);
  if (yaExiste) {
    throw ApiError.conflict("Ya existe una categoría con ese nombre");
  }

  return categoriaRepository.crear(datos);
}

async function actualizar(id, datos) {
  await obtenerPorId(id);

  if (datos.nombre !== undefined) {
    const yaExiste = await categoriaRepository.existePorNombre(datos.nombre, id);
    if (yaExiste) {
      throw ApiError.conflict("Ya existe una categoría con ese nombre");
    }
  }

  return categoriaRepository.actualizar(id, datos);
}

async function eliminar(id) {
  await obtenerPorId(id);

  const productosAsociados = await categoriaRepository.contarProductosAsociados(id);
  if (productosAsociados > 0) {
    throw ApiError.conflict(
      "No se puede eliminar la categoría porque tiene productos asociados"
    );
  }

  await categoriaRepository.eliminar(id);
}

module.exports = {
  listar,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
};
