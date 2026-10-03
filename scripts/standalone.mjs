// Genera el sitio estático editable a mano a partir de `next build` (out/):
// index.html + styles.css + script.js + images/. Rutas relativas, así abre
// con doble clic (file://) y también en GitHub Pages.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";

const html = readFileSync("out/index.html", "utf8");
const cssDir = "out/_next/static/css";
const css = readdirSync(cssDir)
  .filter((f) => f.endsWith(".css"))
  .map((f) => readFileSync(`${cssDir}/${f}`, "utf8"))
  .join("\n");

const links = [
  ["Inicio", "#inicio"],
  ["Menú", "#menu"],
  ["Promociones", "#promociones"],
  ["Sucursales", "#sucursales"],
  ["Nosotros", "#nosotros"],
  ["Contacto", "#contacto"],
];
const mobileNav = `<div id="mobile-nav" hidden class="absolute inset-x-0 top-full z-40 flex flex-col bg-carbon-raised px-4 py-3 min-[900px]:hidden">${links
  .map(
    ([l, h]) =>
      `<a href="${h}" class="border-b border-white/10 py-3 font-semibold text-on-carbon last:border-b-0">${l}</a>`,
  )
  .join("")}</div>`;

const script = `// Menú móvil: abre/cierra la navegación en pantallas angostas.
(function () {
  var b = document.querySelector('header button[aria-controls="mobile-nav"]');
  var n = document.getElementById("mobile-nav");
  if (!b || !n) return;
  function set(open) {
    n.hidden = !open;
    b.setAttribute("aria-expanded", String(open));
    b.querySelector(".sr-only").textContent = open ? "Cerrar menú" : "Abrir menú";
    b.querySelector("path").setAttribute(
      "d",
      open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16",
    );
  }
  b.addEventListener("click", function () { set(n.hidden); });
  n.addEventListener("click", function (e) { if (e.target.tagName === "A") set(false); });
})();
`;

const out = html
  .replace(/<link[^>]*rel="stylesheet"[^>]*href="\/_next[^>]*>/g, "")
  .replace(/<link[^>]*as="script"[^>]*>/g, "")
  .replace(/<script[\s\S]*?<\/script>/g, "")
  .replace("</head>", `<link rel="stylesheet" href="./styles.css"></head>`)
  .replace("</button>", `</button>${mobileNav}`)
  .replace("</body>", `<script src="./script.js" defer></script></body>`);

writeFileSync("index.html", out);
writeFileSync("styles.css", css);
writeFileSync("script.js", script);
if (!existsSync("images")) mkdirSync("images");
if (!existsSync("images/.gitkeep")) writeFileSync("images/.gitkeep", "");
console.log("Generado: index.html, styles.css, script.js, images/");
