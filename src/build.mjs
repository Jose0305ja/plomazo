// Genera las páginas HTML del sitio a partir de src/content.mjs.
// Uso: npm run build   (no requiere dependencias, solo Node).
import { writeFileSync } from "node:fs";
import {
  SITE, NAV, CATEGORIES, PRODUCTS, PROMOTIONS, SERVICES, BRANCHES, GALLERY, HISTORY,
} from "./content.mjs";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const money = (n) => `$${Number.isInteger(n) ? n : n.toFixed(2)}`;
const waLink = (n) => `https://wa.me/${String(n).replace(/\D/g, "")}`;
const empty = (title, text) => `<div class="empty reveal"><p class="empty__title">${title}</p><p class="muted">${text}</p></div>`;

// Foto: si hay `image` usa <img>; si no, marcador con degradado.
function photo({ image, label, tone = 1, className = "" }) {
  if (image) {
    return `<img class="photo ${className}" src="${esc(image)}" alt="${esc(label)}" loading="lazy">`;
  }
  return `<div class="ph tone-${tone} ${className}" role="img" aria-label="${esc(label)}"><span class="ph__label">${esc(label)}</span></div>`;
}

function header(current) {
  const links = NAV.map(
    (l) =>
      `<a href="${l.href}"${l.key === current ? ' aria-current="page"' : ""}>${l.label}</a>`,
  ).join("");
  return `<a href="#main-content" class="skip-link">Saltar al contenido principal</a>
<header class="site-header" data-surface="carbon">
  <div class="container site-header__bar">
    <a href="index.html" class="brand"><img class="brand__logo" src="images/logo.webp" alt="" width="40" height="40">${SITE.name}</a>
    <nav class="nav" aria-label="Principal">${links}</nav>
    <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="mobile-nav">
      <span class="sr-only">Abrir menú</span>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
    </button>
  </div>
  <nav id="mobile-nav" class="mobile-nav" aria-label="Principal (móvil)" hidden>${links}</nav>
</header>`;
}

function footer() {
  const navLinks = NAV.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join("");
  return `<footer class="site-footer">
  <div class="container site-footer__grid">
    <div><h2>${SITE.name}</h2><ul>${navLinks}</ul></div>
    <div><h2>Contacto</h2><ul>
      <li><a href="tel:${SITE.phone}">${SITE.phoneLabel}</a></li>
      ${SITE.whatsapp ? `<li><a href="${waLink(SITE.whatsapp)}" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>` : ""}
      ${SITE.instagramUrl ? `<li><a href="${SITE.instagramUrl}">Instagram</a></li>` : ""}
      ${SITE.facebookUrl ? `<li><a href="${SITE.facebookUrl}">Facebook</a></li>` : ""}
    </ul></div>
    <div><h2>Legal</h2><ul><li><a href="privacidad.html">Aviso de privacidad</a></li></ul></div>
  </div>
  <div class="container site-footer__legal"><p>© <span id="year">2026</span> Taquerías El Plomazo · ${SITE.city}</p></div>
</footer>`;
}

function page({ file, title, description, current, body }) {
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<script>document.documentElement.classList.add("js")</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;600;700;800&display=swap">
<link rel="stylesheet" href="styles.css">
</head>
<body>
${header(current)}
<main id="main-content">
${body}
</main>
${footer()}
<script src="script.js" defer></script>
</body>
</html>
`;
  writeFileSync(file, html);
}

const eyebrow = (t) => `<p class="eyebrow"><span aria-hidden="true"></span>${t}</p>`;
const titleBlock = (t, extra = "") => `<h1 class="page-title anim-up">${t}</h1>${extra}`;

function productRow(p) {
  return `<div class="product-row reveal${p.unavailable ? " is-unavailable" : ""}">
  ${photo({ image: p.image, label: p.name, className: "product-row__photo" })}
  <div class="product-row__body">
    <div class="product-row__head"><p class="product-row__name">${esc(p.name)}</p><span class="price">${money(p.price)}</span></div>
    <p class="product-row__desc">${esc(p.description)}</p>
    ${p.unavailable ? '<span class="badge">Agotado</span>' : ""}
  </div>
</div>`;
}

function productFeature(p) {
  return `<div class="feature reveal">
  ${photo({ image: p.image, label: p.name, className: "feature__photo" })}
  <div class="feature__shade"></div>
  <div class="feature__text"><p class="feature__name">${esc(p.name)}</p><span class="price price--lg">${money(p.price)}</span></div>
</div>`;
}

function branchRow(b, level = 2) {
  const h = `h${level}`;
  return `<div class="branch-row reveal" data-search="${esc((b.name + " " + b.address).toLowerCase())}">
  <div><${h} class="branch-row__name"><a href="sucursal-${b.slug}.html">${esc(b.name)}</a></${h}><p class="muted">${esc(b.address)}</p></div>
  <div class="actions">
    <a class="btn btn--call btn--sm" href="tel:${b.phone}">Llamar</a>
    ${b.whatsapp ? `<a class="btn btn--wa btn--sm" href="${waLink(b.whatsapp)}" target="_blank" rel="noopener noreferrer">WhatsApp</a>` : ""}
    <a class="btn btn--outline btn--sm" href="${b.mapsUrl}" target="_blank" rel="noopener noreferrer">Cómo llegar</a>
  </div>
</div>`;
}

const mapEmbed = (b, height = 220) =>
  `<iframe class="map" style="height:${height}px" title="Mapa de la sucursal ${esc(b.name)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${encodeURIComponent(b.mapQuery)}&hl=es&z=16&output=embed"></iframe>`;

function branchCard(b) {
  const hours = b.schedule ? b.schedule[0][1] : null;
  return `<article class="branch-card reveal" data-search="${esc((b.name + " " + b.zone + " " + b.address).toLowerCase())}">
  <a class="branch-card__photo" href="sucursal-${b.slug}.html" tabindex="-1" aria-hidden="true">${photo({ image: b.photo, label: b.photoAlt, className: "branch-card__img" })}</a>
  <div class="branch-card__body">
    <p class="branch-card__zone">${esc(b.zone)}</p>
    <h2 class="branch-card__name"><a href="sucursal-${b.slug}.html">${esc(b.name)}</a></h2>
    <p class="muted branch-card__addr">${esc(b.address)}</p>
    <p class="branch-card__hours">${hours ? `Todos los días · ${hours}` : "Horario por confirmar"}</p>
  </div>
  ${mapEmbed(b, 200)}
  <div class="actions branch-card__actions">
    <a class="btn btn--call btn--sm" href="tel:${b.phone}">Llamar</a>
    ${b.whatsapp ? `<a class="btn btn--wa btn--sm" href="${waLink(b.whatsapp)}" target="_blank" rel="noopener noreferrer">WhatsApp</a>` : ""}
    <a class="btn btn--outline btn--sm" href="${b.mapsUrl}" target="_blank" rel="noopener noreferrer">Cómo llegar</a>
  </div>
</article>`;
}

function promoCard(p, level = 2) {
  const h = `h${level}`;
  return `<article class="promo reveal">
  ${photo({ label: "Foto de la promoción pendiente", tone: p.tone, className: "promo__photo" })}
  <div class="promo__body"><${h} class="promo__title">${esc(p.title)}</${h}><p class="muted">${esc(p.description)}</p><p class="promo__until">Vigente hasta: ${esc(p.until)}</p></div>
</article>`;
}

const featured = PRODUCTS.filter((p) => p.featured);

/* ---------- Inicio ---------- */
page({
  file: "index.html",
  title: "El Plomazo — Taquería",
  description: "Taquerías El Plomazo: tacos y antojitos norteños. Consulta el menú, encuentra tu sucursal más cercana y descubre las promociones activas.",
  current: "inicio",
  body: `<section class="hero" data-surface="carbon">
  <img class="hero__bg" src="images/portada.webp" alt="" aria-hidden="true">
  <div class="hero__glow" aria-hidden="true"></div>
  <div class="container hero__inner">
    <div class="anim-up" style="--d:0ms">${eyebrow(`Taquería · ${SITE.city}`)}</div>
    <h1 class="hero__title anim-up" style="--d:90ms">Tacos que se ganan el barrio a la parrilla</h1>
    <p class="hero__lead anim-up" style="--d:180ms">Tacos al pastor y de asada, alambres, arrachera, gringas y hamburguesas. Pasa a cualquiera de nuestras tres sucursales en Durango.</p>
    <div class="actions anim-up" style="--d:270ms">
      <a class="btn" href="menu.html">Ver el menú</a>
      <a class="btn btn--outline-light" href="sucursales.html">Encontrar sucursal</a>
    </div>
  </div>
</section>

<div class="marquee" aria-hidden="true" data-surface="carbon"><div class="marquee__track">${Array(2).fill("<span>Al pastor</span><span>Asada</span><span>Alambre</span><span>Arrachera</span><span>Gringas</span><span>Burritos</span><span>Hamburguesas</span><span>Papa asada</span>").join("")}</div></div>

<div class="container section-stack">
  <section aria-labelledby="cat-h">
    <div class="section-head reveal"><h2 id="cat-h">Categorías</h2><a href="menu.html">Ver menú completo</a></div>
    <div class="grid grid--4">
      ${CATEGORIES.map((c) => `<a class="tile reveal" href="menu.html#${c.slug}">${photo({ image: c.image, label: c.name, className: "tile__photo" })}<div class="tile__shade"></div><p class="tile__name">${c.name}</p></a>`).join("")}
    </div>
  </section>

  <section aria-labelledby="dest-h">
    <div class="section-head reveal"><h2 id="dest-h">Destacados</h2><a href="menu.html">Ver menú completo</a></div>
    <div class="grid grid--2">${featured.slice(0, 4).map(productFeature).join("")}</div>
  </section>

  <section aria-labelledby="serv-h">
    <div class="section-head reveal"><h2 id="serv-h">Taquizas para eventos</h2><a href="contacto.html">Cotizar</a></div>
    ${SERVICES.map((s) => `<div class="service reveal"><p>${esc(s.description)}</p><a class="btn" href="contacto.html">Pedir cotización</a></div>`).join("")}
  </section>

  <section aria-labelledby="suc-h">
    <div class="section-head reveal"><h2 id="suc-h">Sucursales</h2><a href="sucursales.html">Ver todas</a></div>
    <div>${BRANCHES.map((b) => branchRow(b, 3)).join("")}</div>
  </section>

  <section class="about-strip reveal" aria-labelledby="nos-h">
    <h2 id="nos-h">Taquería de Durango</h2>
    <p>${esc(HISTORY[0])}</p>
    <a class="btn btn--outline" href="nosotros.html">Conocer más</a>
  </section>
</div>`,
});

/* ---------- Menú ---------- */
page({
  file: "menu.html",
  title: "Menú — El Plomazo",
  description: "Consulta el menú completo de Taquerías El Plomazo por categoría.",
  current: "menu",
  body: `<div class="container page">
  ${titleBlock("Menú")}
  <p class="notice anim-up" style="--d:80ms">Precios de referencia tomados de la carta publicada en Rappi (pueden variar en el local). Pendientes de confirmar con el restaurante.</p>
  <nav class="pills pills--sticky" aria-label="Categorías del menú" data-filter-group="menu">
    <button type="button" class="pill is-active" data-filter="all">Todas</button>
    ${CATEGORIES.map((c) => `<button type="button" class="pill" data-filter="${c.slug}">${c.name}</button>`).join("")}
  </nav>
  ${CATEGORIES.map((c) => {
    const items = PRODUCTS.filter((p) => p.cat === c.slug);
    const feat = items.filter((p) => p.featured);
    const rest = items.filter((p) => !p.featured);
    return `<section class="menu-cat" id="${c.slug}" data-category="${c.slug}" aria-labelledby="h-${c.slug}">
    <div class="menu-cat__head reveal"><h2 id="h-${c.slug}">${c.name}</h2><div class="rule"></div></div>
    ${feat.length ? `<div class="grid grid--2 mb">${feat.map(productFeature).join("")}</div>` : ""}
    ${rest.map(productRow).join("")}
  </section>`;
  }).join("\n  ")}
</div>`,
});

/* ---------- Sucursales ---------- */
page({
  file: "sucursales.html",
  title: "Sucursales — El Plomazo",
  description: "Encuentra la sucursal de Taquerías El Plomazo más cercana a ti: dirección, teléfono, WhatsApp y cómo llegar.",
  current: "sucursales",
  body: `<div class="container page">
  ${titleBlock("Sucursales")}
  <div class="search anim-up" style="--d:100ms">
    <label for="branch-search" class="sr-only">Buscar sucursal</label>
    <input id="branch-search" type="search" placeholder="Buscar por nombre, calle o colonia" autocomplete="off">
  </div>
  <div id="branch-list" class="grid grid--3">${BRANCHES.map(branchCard).join("")}</div>
  <p id="branch-empty" class="muted" hidden>No encontramos sucursales con esa búsqueda.</p>
</div>`,
});

for (const b of BRANCHES) {
  page({
    file: `sucursal-${b.slug}.html`,
    title: `${b.name} — Sucursales — El Plomazo`,
    description: `Dirección, horario y teléfono de la sucursal ${b.name} de Taquerías El Plomazo en Durango.`,
    current: "sucursales",
    body: `<div class="container page">
  <p class="crumb"><a href="sucursales.html">← Todas las sucursales</a></p>
  ${titleBlock(esc(b.name))}
  <p class="lead muted anim-up" style="--d:80ms">${esc(b.address)}</p>
  <div class="detail-photo anim-up" style="--d:120ms">${photo({ image: b.photo, label: b.photoAlt, className: "detail-photo__img" })}</div>
  <div class="grid grid--split">
    <div class="actions anim-up" style="--d:160ms;align-content:flex-start">
      <a class="btn btn--call" href="tel:${b.phone}">Llamar</a>
      ${b.whatsapp ? `<a class="btn btn--wa" href="${waLink(b.whatsapp)}" target="_blank" rel="noopener noreferrer">WhatsApp</a>` : ""}
      <a class="btn btn--outline" href="${b.mapsUrl}" target="_blank" rel="noopener noreferrer">Cómo llegar</a>
    </div>
    <div class="anim-up" style="--d:240ms">
      <h2 class="h-sm">Horario</h2>
      ${b.schedule ? `<table class="schedule"><caption class="sr-only">Horario de atención de ${esc(b.name)}</caption><tbody>
        ${b.schedule.map(([d, h]) => `<tr><th scope="row">${d}</th><td>${h}</td></tr>`).join("")}
      </tbody></table>` : ""}
      <p class="muted">${esc(b.scheduleNote)}</p>
    </div>
  </div>
  <div class="detail-map anim-up" style="--d:300ms">${mapEmbed(b, 380)}</div>
</div>`,
  });
}

/* ---------- Promociones ---------- */
page({
  file: "promociones.html",
  title: "Promociones — El Plomazo",
  description: "Promociones vigentes en Taquerías El Plomazo.",
  current: "promociones",
  body: `<div class="container page">
  ${titleBlock("Promociones")}
  ${PROMOTIONS.length ? `<div class="grid grid--3">${PROMOTIONS.map((p) => promoCard(p, 2)).join("")}</div>` : empty("Por ahora no hay promociones publicadas", "Síguenos en Facebook e Instagram para enterarte de las nuevas promociones.")}
  <div class="actions" style="margin-top:24px"><a class="btn" href="${SITE.facebookUrl}" target="_blank" rel="noopener noreferrer">Facebook</a><a class="btn btn--outline" href="${SITE.instagramUrl}" target="_blank" rel="noopener noreferrer">Instagram</a></div>
</div>`,
});

/* ---------- Galería ---------- */
const galCats = [...new Set(GALLERY.map((g) => g.category))];
page({
  file: "galeria.html",
  title: "Galería — El Plomazo",
  description: "Fotografías de platillos, ambiente y sucursales de Taquerías El Plomazo.",
  current: "galeria",
  body: `<div class="container page">
  ${titleBlock("Galería")}
  <nav class="pills" aria-label="Categorías de la galería" data-filter-group="gallery">
    <button type="button" class="pill is-active" data-filter="all">Todas</button>
    ${galCats.map((c) => `<button type="button" class="pill" data-filter="${esc(c)}">${c}</button>`).join("")}
  </nav>
  <div class="grid grid--gallery" id="gallery">
    ${GALLERY.map((g) => `<button type="button" class="gallery-item reveal" data-category="${esc(g.category)}" data-alt="${esc(g.alt)}" aria-label="Ampliar: ${esc(g.alt)}">${photo({ image: g.image, label: g.alt, tone: g.tone, className: "gallery-item__photo" })}</button>`).join("\n    ")}
  </div>
</div>
<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Foto ampliada" hidden>
  <button type="button" class="lightbox__close" aria-label="Cerrar">×</button>
  <div class="lightbox__stage" id="lightbox-stage"></div>
</div>`,
});

/* ---------- Nosotros ---------- */
page({
  file: "nosotros.html",
  title: "Nosotros — El Plomazo",
  description: "La historia de Taquerías El Plomazo.",
  current: "nosotros",
  body: `<section class="hero hero--short" data-surface="carbon">
  <div class="hero__glow" aria-hidden="true"></div>
  <div class="container hero__inner">
    <div class="anim-up">${eyebrow("Quiénes somos")}</div>
    <h1 class="hero__title anim-up" style="--d:90ms">Tacos de Durango, a la parrilla y al trompo</h1>
  </div>
</section>
<div class="container section-stack">
  <div class="grid grid--about">
    <div class="prose reveal">${HISTORY.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
    <div class="reveal">${photo({ image: "images/portada.webp", label: "Trompo de pastor y platillos de Taquería El Plomazo", className: "about-photo" })}</div>
  </div>
  <div class="actions reveal"><a class="btn" href="menu.html">Ver el menú</a><a class="btn btn--outline" href="sucursales.html">Encontrar sucursal</a></div>
</div>`,
});

/* ---------- Contacto ---------- */
page({
  file: "contacto.html",
  title: "Contacto — El Plomazo",
  description: "Llama, escribe por WhatsApp o encuentra tu sucursal de Taquerías El Plomazo más cercana.",
  current: "contacto",
  body: `<div class="container page">
  ${titleBlock("Contacto")}
  <p class="lead muted anim-up" style="--d:80ms">La forma más rápida de contactarnos es directo: llama, escríbenos por redes o encuentra la sucursal más cercana. También cotizamos taquizas para eventos.</p>
  <div class="actions anim-up" style="--d:160ms">
    <a class="btn btn--call" href="tel:${SITE.phone}">Llamar</a>
    ${SITE.whatsapp ? `<a class="btn btn--wa" href="${waLink(SITE.whatsapp)}" target="_blank" rel="noopener noreferrer">WhatsApp</a>` : ""}
    <a class="btn btn--outline" href="sucursales.html">Ver sucursales</a>
    <a class="btn btn--ghost" href="${SITE.facebookUrl}" target="_blank" rel="noopener noreferrer">Facebook</a>
    <a class="btn btn--ghost" href="${SITE.instagramUrl}" target="_blank" rel="noopener noreferrer">Instagram</a>
  </div>
</div>`,
});

/* ---------- Privacidad ---------- */
page({
  file: "privacidad.html",
  title: "Aviso de privacidad — El Plomazo",
  description: "Aviso de privacidad de Taquerías El Plomazo.",
  current: "",
  body: `<div class="container page page--narrow">
  ${titleBlock("Aviso de privacidad")}
  <div class="notice">Este texto es un marcador de posición: el aviso de privacidad definitivo está pendiente de redacción legal.</div>
  <div class="prose">
    <p>Taquerías El Plomazo ("nosotros") respeta tu privacidad. Este aviso describirá, cuando esté completo, qué datos personales recabamos a través de este sitio, para qué los usamos y cómo puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición.</p>
    <p>Mientras el texto definitivo no esté disponible, cualquier duda sobre el manejo de tus datos puede dirigirse a nuestro equipo desde la página de <a href="contacto.html">Contacto</a>.</p>
  </div>
</div>`,
});

/* ---------- 404 (GitHub Pages) ---------- */
page({
  file: "404.html",
  title: "Página no encontrada — El Plomazo",
  description: "La página que buscas no existe.",
  current: "",
  body: `<div class="container page page--narrow">
  ${titleBlock("Página no encontrada")}
  <p class="lead muted">La página que buscas no existe o cambió de lugar.</p>
  <div class="actions"><a class="btn" href="index.html">Volver al inicio</a><a class="btn btn--outline" href="menu.html">Ver el menú</a></div>
</div>`,
});

console.log("Sitio generado: index, menu, sucursales (+3 detalles), promociones, galeria, nosotros, contacto, privacidad, 404.");
