/**
 * Valida los parámetros ?sort= y ?order= contra una lista blanca de
 * columnas permitidas. Esto evita inyección SQL en la cláusula ORDER BY,
 * ya que los nombres de columna no pueden parametrizarse con pg.
 *
 * @param {object} query - req.query
 * @param {string[]} allowedFields - columnas permitidas para ese recurso
 * @param {string} defaultField - columna usada si no llega "sort" o es inválida
 */
function getSorting(query = {}, allowedFields = [], defaultField = "created_at") {
  const sort = allowedFields.includes(query.sort) ? query.sort : defaultField;
  const order = String(query.order).toLowerCase() === "asc" ? "ASC" : "DESC";
  return { sort, order };
}

module.exports = { getSorting };
