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

async function validarPadre(parentId, idActual = null) {
  if (parentId === undefined || parentId === null || parentId === "") return null;
  const idPadre = Number(parentId);
  if (!Number.isInteger(idPadre) || idPadre < 1 || idPadre === Number(idActual)) {
    throw ApiError.badRequest("La categoría padre no es válida");
  }
  const padre = await obtenerPorId(idPadre);
  if (padre.parent_id) throw ApiError.badRequest("Solo se permite un nivel de subcategorías");
  if (idActual !== null && await categoriaRepository.contarSubcategorias(idActual) > 0) {
    throw ApiError.conflict("Una categoría con subcategorías no puede convertirse en subcategoría");
  }
  return idPadre;
}

async function crear(datos) {
  const yaExiste = await categoriaRepository.existePorNombre(datos.nombre);
  if (yaExiste) throw ApiError.conflict("Ya existe una categoría con ese nombre");
  const parent_id = await validarPadre(datos.parent_id);
  return categoriaRepository.crear({ ...datos, parent_id });
}

async function actualizar(id, datos) {
  await obtenerPorId(id);

  if (datos.nombre !== undefined) {
    const yaExiste = await categoriaRepository.existePorNombre(datos.nombre, id);
    if (yaExiste) {
      throw ApiError.conflict("Ya existe una categoría con ese nombre");
    }
  }

  const campos = { ...datos };
  if (datos.parent_id !== undefined) campos.parent_id = await validarPadre(datos.parent_id, id);
  return categoriaRepository.actualizar(id, campos);
}

async function eliminar(id) {
  await obtenerPorId(id);

  const [productosAsociados, subcategorias] = await Promise.all([
    categoriaRepository.contarProductosAsociados(id), categoriaRepository.contarSubcategorias(id),
  ]);
  if (productosAsociados > 0) {
    throw ApiError.conflict(
      "No se puede eliminar la categoría porque tiene productos asociados"
    );
  }

  if (subcategorias > 0) throw ApiError.conflict("Mueve o elimina las subcategorías antes de eliminar esta categoría");
  await categoriaRepository.eliminar(id);
}

module.exports = {
  listar,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
};
