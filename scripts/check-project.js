const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const checked = [];
const skipped = new Set(["node_modules", ".git"]);

function walk(directory) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (skipped.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(absolute);
    else if (entry.isFile() && entry.name.endsWith(".js")) {
      const source = fs.readFileSync(absolute, "utf8");
      new vm.Script(source, { filename: path.relative(root, absolute) });
      checked.push(path.relative(root, absolute));
    }
  }
}

walk(path.join(root, "src"));
walk(path.join(root, "scripts"));

const frontendDir = path.join(root, "frontend");
const frontendScripts = [];
function walkFrontend(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === "node_modules") continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walkFrontend(absolute);
    else if (entry.isFile() && entry.name.endsWith(".js")) {
      const source = fs.readFileSync(absolute, "utf8");
      new vm.Script(source, { filename: path.relative(root, absolute) });
      frontendScripts.push(path.relative(root, absolute));
    }
  }
}
walkFrontend(frontendDir);
if (!frontendScripts.length) throw new Error("No se encontró JavaScript en frontend");
checked.push(...frontendScripts);

for (const page of ["index.html", "catalogo.html", "admin.html"]) {
  const pagePath = path.join(frontendDir, page);
  if (!fs.existsSync(pagePath)) throw new Error("Falta la página frontend/" + page);
  const html = fs.readFileSync(pagePath, "utf8");
  if (!html.includes('assets/css/store.css')) throw new Error(page + " no enlaza el CSS compartido");
  if (!html.includes('assets/js/store.js')) throw new Error(page + " no enlaza el JavaScript compartido");
}
const migrationDir = path.join(root, "database", "migrations");
if (!fs.existsSync(migrationDir)) throw new Error("No existe database/migrations");
const migrations = fs.readdirSync(migrationDir).filter(name => name.endsWith(".sql"));
if (!migrations.length) throw new Error("No hay migraciones SQL");
console.log("Sintaxis correcta en " + checked.length + " archivos JavaScript.");
console.log("Migraciones encontradas: " + migrations.join(", "));
