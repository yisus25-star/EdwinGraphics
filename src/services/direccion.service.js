const direccionRepository = require("../repositories/direccion.repository");
const clienteRepository = require("../repositories/cliente.repository");
const ApiError = require("../utils/ApiError");

async function asegurarClienteExiste(clienteId) {
  const cliente = await clienteRepository.obtenerPorId(clienteId);
  if (!cliente) {
    throw ApiError.notFound("Cliente no encontrado");
  }
  return cliente;
}

async function listarPorCliente(clienteId) {
  await asegurarClienteExiste(clienteId);
  return direccionRepository.obtenerPorCliente(clienteId);
}

async function obtenerPorId(id) {
  const direccion = await direccionRepository.obtenerPorId(id);
  if (!direccion) {
    throw ApiError.notFound("Dirección no encontrada");
  }
  return direccion;
}

async function crear(clienteId, datos) {
  await asegurarClienteExiste(clienteId);
  return direccionRepository.crear({ clienteId, ...datos });
}

async function actualizar(id, datos) {
  await obtenerPorId(id);
  return direccionRepository.actualizar(id, datos);
}

async function eliminar(id) {
  await obtenerPorId(id);
  await direccionRepository.eliminar(id);
}

module.exports = {
  listarPorCliente,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
};
