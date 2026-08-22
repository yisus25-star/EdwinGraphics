const clienteRepository = require("../repositories/cliente.repository");
const ApiError = require("../utils/ApiError");
const { getPagination, buildPaginationMeta } = require("../utils/pagination");

async function listar(query) {
  const { page, limit, offset } = getPagination(query);

  const [clientes, total] = await Promise.all([
    clienteRepository.obtenerTodos({ limit, offset }),
    clienteRepository.contarTodos(),
  ]);

  return { clientes, meta: buildPaginationMeta({ page, limit, total }) };
}

async function obtenerPorId(id) {
  const cliente = await clienteRepository.obtenerPorId(id);
  if (!cliente) {
    throw ApiError.notFound("Cliente no encontrado");
  }
  return cliente;
}

async function crear(datos) {
  const existente = await clienteRepository.obtenerPorCorreo(datos.correo);
  if (existente) {
    throw ApiError.conflict("Ya existe un cliente registrado con ese correo");
  }

  return clienteRepository.crear(datos);
}

async function actualizar(id, datos) {
  await obtenerPorId(id);

  if (datos.correo !== undefined) {
    const existente = await clienteRepository.obtenerPorCorreo(datos.correo);
    if (existente && existente.id !== Number(id)) {
      throw ApiError.conflict("Ya existe un cliente registrado con ese correo");
    }
  }

  return clienteRepository.actualizar(id, datos);
}

async function eliminar(id) {
  await obtenerPorId(id);
  await clienteRepository.eliminar(id);
}

module.exports = {
  listar,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
};
