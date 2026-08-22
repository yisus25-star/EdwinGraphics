/**
 * Genera un slug URL-friendly a partir de un texto.
 * Ejemplo: "Guitarra Yamaha F310" -> "guitarra-yamaha-f310"
 */
function generarSlug(texto) {
  return texto
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // elimina tildes
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

module.exports = { generarSlug };
