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

const htmlPath = path.join(root, "frontend", "index.html");
const html = fs.readFileSync(htmlPath, "utf8");
const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)]
  .map(match => match[1])
  .filter(source => source.trim());
if (!scripts.length) throw new Error("No se encontró JavaScript inline en frontend/index.html");
scripts.forEach((source, index) => {
  new vm.Script(source, { filename: "frontend/index.html:inline-script-" + (index + 1) });
});
checked.push("frontend/index.html (JavaScript inline)");

const migrationDir = path.join(root, "database", "migrations");
if (!fs.existsSync(migrationDir)) throw new Error("No existe database/migrations");
const migrations = fs.readdirSync(migrationDir).filter(name => name.endsWith(".sql"));
if (!migrations.length) throw new Error("No hay migraciones SQL");
console.log("Sintaxis correcta en " + checked.length + " archivos JavaScript.");
console.log("Migraciones encontradas: " + migrations.join(", "));
