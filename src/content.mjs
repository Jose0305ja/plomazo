// Contenido del sitio. Fuente: perfil público de Taquería "El Plomazo"
// (Durango, Dgo.) en Rappi y su ficha en Restaurant Guru. Lo marcado como
// "por confirmar" debe validarse con el restaurante antes de publicar.
import { readFileSync } from "node:fs";

export const SITE = {
  name: "El Plomazo",
  city: "Durango, Dgo.",
  phone: "6181534075",
  phoneLabel: "618 153 4075",
  whatsapp: "", // por confirmar: aún no hay WhatsApp oficial
  email: "taqueriaelplomazo@gmail.com", // publicado en su página de Facebook
  instagramUrl: "https://www.instagram.com/taqueriaelplomazo/",
  facebookUrl: "https://www.facebook.com/taqueriaelplomazo/",
};

export const NAV = [
  { href: "index.html", label: "Inicio", key: "inicio" },
  { href: "menu.html", label: "Menú", key: "menu" },
  { href: "sucursales.html", label: "Sucursales", key: "sucursales" },
  { href: "promociones.html", label: "Promociones", key: "promociones" },
  { href: "galeria.html", label: "Galería", key: "galeria" },
  { href: "nosotros.html", label: "Nosotros", key: "nosotros" },
  { href: "contacto.html", label: "Contacto", key: "contacto" },
];

// Categorías tal como están en el menú del restaurante; `image` es la foto del tile.
export const CATEGORIES = [
  { slug: "tacos", name: "Tacos", image: "images/menu/taco-al-pastor.webp" },
  { slug: "tradicionales", name: "Los tradicionales", image: "images/menu/tacos-asada.webp" },
  { slug: "combinaciones-con-queso", name: "Combinaciones con queso", image: "images/menu/la-partida.webp" },
  { slug: "cortes", name: "Cortes", image: "images/menu/arrachera-marinada.webp" },
  { slug: "mas-queso-y-otras-delicias", name: "Más queso y otras delicias", image: "images/menu/sincronizada.webp" },
  { slug: "hamburguesas", name: "Hamburguesas", image: "images/menu/hamburguesa-tradicional.webp" },
];

// Platillos destacados: fotos que sí parecen reales del local.
const FEATURED = new Set([
  "La partida", "Chuleta con queso", "Arrachera marinada", "Fua",
  "El pionero", "Hamburguesa tradicional",
]);

const RAW = JSON.parse(readFileSync(new URL("./products.json", import.meta.url), "utf8"));
const norm = (t) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const dupes = new Set(
  RAW.map((p) => norm(p.name)).filter((n, i, a) => a.indexOf(n) !== i),
);
// Misma receta en dos presentaciones (taco o porción personal): se distingue en el nombre.
export const PRODUCTS = RAW.map((p) => {
  const suffix = dupes.has(norm(p.name))
    ? /porci[oó]n personal/i.test(p.description) ? " (porción personal)" : " (taco)"
    : "";
  return { ...p, name: p.name + suffix, featured: FEATURED.has(p.name) };
});

// Sin promociones propias confirmadas todavía.
export const PROMOTIONS = [];

export const SERVICES = [
  { title: "Taquizas para eventos", description: "Llevamos el trompo y la parrilla a bodas, cumpleaños y reuniones. Pregunta por tu cotización." },
];

const BRANCH_HOURS = "Horario por confirmar con el restaurante.";
const gmaps = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const EVERY_DAY = (h) => ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((d) => [d, h]);

// `photo`: pon aquí la foto real de la fachada/local (images/sucursales/<slug>.jpg).
// Mientras tanto se muestra una foto de platillos del restaurante.
export const BRANCHES = [
  {
    slug: "primo-de-verdad",
    name: "Primo de Verdad",
    zone: "Valle del Sur",
    address: "Primo de Verdad 601, Valle del Sur, 34136 Durango, Dgo.",
    phone: "6181534075",
    whatsapp: "",
    mapQuery: "Taquería El Plomazo, Primo de Verdad 601, Valle del Sur, Durango",
    mapsUrl: gmaps("Taquería El Plomazo, Primo de Verdad 601, Valle del Sur, Durango"),
    photo: "images/menu/arrachera-marinada.webp",
    photoAlt: "Arrachera marinada de Taquería El Plomazo",
    schedule: EVERY_DAY("17:00 – 23:30"),
    scheduleNote: "Horario publicado en Rappi; confirmar con el restaurante.",
  },
  {
    slug: "francisco-villa",
    name: "Blvd. Francisco Villa",
    zone: "Esq. Calle Lima",
    address: "Blvd. Francisco Villa esq. Calle Lima 101, Durango, Dgo.",
    phone: "6181534075",
    whatsapp: "",
    mapQuery: "Taquería El Plomazo, Blvd. Francisco Villa y Calle Lima 101, Durango",
    mapsUrl: gmaps("Taquería El Plomazo, Blvd. Francisco Villa y Calle Lima 101, Durango"),
    photo: "images/menu/fua.webp",
    photoAlt: "Fua de Taquería El Plomazo",
    schedule: null,
    scheduleNote: BRANCH_HOURS,
  },
  {
    slug: "guadiana",
    name: "Blvd. Guadiana",
    zone: "Tierra y Libertad",
    address: "Calle 17 de Septiembre 150, Tierra y Libertad, 34127 Durango, Dgo. (esq. Blvd. Guadiana)",
    phone: "6181534075",
    whatsapp: "",
    mapQuery: "Taquería El Plomazo, Calle 17 de Septiembre 150, Tierra y Libertad, Durango",
    mapsUrl: gmaps("Taquería El Plomazo, Calle 17 de Septiembre 150, Tierra y Libertad, Durango"),
    photo: "images/menu/la-partida.webp",
    photoAlt: "La partida de Taquería El Plomazo",
    schedule: EVERY_DAY("17:00 – 23:59"),
    scheduleNote: "Horario publicado en Rappi; confirmar con el restaurante.",
  },
];

// Galería: fotos reales del restaurante (portada) y de su menú.
export const GALLERY = [
  { category: "Local", alt: "Trompo de pastor y platillos de Taquería El Plomazo", image: "images/portada.webp" },
  // Fotos publicadas en la página de Facebook del restaurante.
  { category: "Pastor", alt: "Pastor hecho al carbón", image: "images/galeria/pastor-al-carbon.webp" },
  { category: "Pastor", alt: "Taco al pastor con piña, cebolla y cilantro", image: "images/galeria/taco-al-pastor-con-pina.webp" },
  { category: "Pastor", alt: "Tacos al pastor y de asada", image: "images/galeria/pastor-y-asada.webp" },
  { category: "Pastor", alt: "Tacos al pastor con cebolla, cilantro y salsa", image: "images/galeria/tacos-pastor-cebolla-cilantro.webp" },
  { category: "Con queso", alt: "Pastor con queso en tortilla de maíz", image: "images/galeria/pastor-con-queso.webp" },
  { category: "Con queso", alt: "Pastor y asada sobre queso fundido", image: "images/galeria/pastor-asada-queso.webp" },
  { category: "Tacos", alt: "Carne asada con tortillas y tomate", image: "images/galeria/asada-con-tortillas.webp" },
  { category: "Local", alt: "Taco al pastor con bebida en la mesa", image: "images/galeria/taco-y-bebida.webp" },
  { category: "Cortes", alt: "Arrachera marinada", image: "images/menu/arrachera-marinada.webp" },
  { category: "Cortes", alt: "Fua: pastor, asada, jamón y aguacate", image: "images/menu/fua.webp" },
  { category: "Con queso", alt: "La partida: pastor con queso fundido en tortilla de harina", image: "images/menu/la-partida.webp" },
  { category: "Con queso", alt: "Chuleta con queso", image: "images/menu/chuleta-con-queso.webp" },
  { category: "Tacos", alt: "El pionero: bistek, tocino y champiñones con queso", image: "images/menu/el-pionero.webp" },
  { category: "Tacos", alt: "Bistek a la mexicana", image: "images/menu/bistek-a-la-mexicana.webp" },
  { category: "Antojitos", alt: "Burrito de carne asada", image: "images/menu/burrito-carne-asada.webp" },
  { category: "Antojitos", alt: "Burrito de pastor", image: "images/menu/burrito-pastor.webp" },
  { category: "Hamburguesas", alt: "Hamburguesa tradicional de res", image: "images/menu/hamburguesa-tradicional.webp" },
  { category: "Hamburguesas", alt: "Hamburguesa al pastor", image: "images/menu/hamburguesa-al-pastor.webp" },
  { category: "Cortes", alt: "Arrachera marinada con queso", image: "images/menu/arrachera-marinada-con-queso.webp" },
];

export const HISTORY = [
  "Taquería El Plomazo es una taquería de Durango, Dgo., con tres sucursales. Su especialidad son los tacos al pastor y de asada, los alambres, la arrachera marinada, las gringas, los burritos y las hamburguesas.",
  "También preparamos taquizas para eventos. La historia completa del negocio se agregará con el material que entregue el restaurante.",
];

// Personajes del Plomazo (recortes con fondo transparente en images/plomazo/). Medidas en px
// del archivo para reservar el espacio y evitar saltos de diseño.
export const MASCOTS = {
  "trompo-taquero": { w: 683, h: 800 },
  "trompo-poncho": { w: 616, h: 800 },
  "taquero-carrito": { w: 799, h: 783 },
  multibrazo: { w: 800, h: 706 },
  plancha: { w: 800, h: 656 },
  queso: { w: 783, h: 607 },
  veloz: { w: 785, h: 746 },
  pulgar: { w: 800, h: 522 },
  chef: { w: 587, h: 770 },
  pirata: { w: 637, h: 692 },
  luchador: { w: 563, h: 723 },
  serenata: { w: 636, h: 793 },
  tejano: { w: 501, h: 800 },
  tejanos: { w: 647, h: 793 },
  crudo: { w: 759, h: 731 },
  "taco-cama": { w: 677, h: 547 },
  alacran: { w: 646, h: 717 },
};

// Personaje junto al título de cada categoría del menú.
export const CATEGORY_MASCOT = {
  tacos: "trompo-poncho",
  tradicionales: "multibrazo",
  "combinaciones-con-queso": "queso",
  cortes: "plancha",
  "mas-queso-y-otras-delicias": "veloz",
  hamburguesas: "pulgar",
};

// "La pandilla del Plomazo": tarjetas de personajes en el inicio.
export const CREW = [
  { key: "pirata", name: "El Pirata", line: "Pide unos piratas con queso.", href: "menu.html#combinaciones-con-queso" },
  { key: "luchador", name: "El Luchador", line: "La lucha por el sabor, de dos de tres.", href: "menu.html#cortes" },
  { key: "serenata", name: "El Mariachi", line: "Serenata de pastor para la mesa.", href: "menu.html#tacos" },
  { key: "tejano", name: "El Tejano", line: "Estilo de Durango, sombrero y poncho.", href: "nosotros.html" },
  { key: "crudo", name: "El Crudo", line: "La cura del domingo: unos de asada.", href: "menu.html#tradicionales" },
  { key: "taco-cama", name: "El Relax", line: "Cama de tacos, nada de prisas.", href: "menu.html#tacos" },
];
