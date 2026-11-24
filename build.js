import { copyFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const output = resolve("dist");
mkdirSync(output, { recursive: true });

for (const file of ["index.html", "styles.css", "app.js"]) {
  copyFileSync(resolve(file), resolve(output, file));
}

console.log("Monster Burguer pronto para publicação em dist/.");
