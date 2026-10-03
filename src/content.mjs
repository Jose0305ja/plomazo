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
  email: "",
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

export const PRODUCTS = JSON.parse(readFileSync(new URL("./products.json", import.meta.url), "utf8")).map(
  (p) => ({ ...p, featured: FEATURED.has(p.name) }),
);

// Sin promociones propias confirmadas todavía.
export const PROMOTIONS = [];

export const SERVICES = [
  { title: "Taquizas para eventos", description: "Llevamos el trompo y la parrilla a bodas, cumpleaños y reuniones. Pregunta por tu cotización." },
];

const BRANCH_HOURS = "Horario por confirmar con el restaurante.";
const gmaps = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const BRANCHES = [
  {
    slug: "primo-de-verdad",
    name: "Primo de Verdad",
    address: "Primo de Verdad 601, Valle del Sur, 34136 Durango, Dgo.",
    phone: "6181534075",
    whatsapp: "",
    mapsUrl: gmaps("Taquería El Plomazo, Primo de Verdad 601, Durango"),
    schedule: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((d) => [d, "17:00 – 23:30"]),
    scheduleNote: "Horario publicado en Rappi; confirmar con el restaurante.",
  },
  {
    slug: "francisco-villa",
    name: "Blvd. Francisco Villa",
    address: "Blvd. Francisco Villa esq. Calle Lima 101, Durango, Dgo.",
    phone: "6181534075",
    whatsapp: "",
    mapsUrl: gmaps("Taquería El Plomazo, Blvd. Francisco Villa 101, Durango"),
    schedule: null,
    scheduleNote: BRANCH_HOURS,
  },
  {
    slug: "guadiana",
    name: "Blvd. Guadiana",
    address: "Blvd. Guadiana esq. Calle 17 de Septiembre, Durango, Dgo.",
    phone: "6181534075",
    whatsapp: "",
    mapsUrl: gmaps("Taquería El Plomazo, Blvd. Guadiana y 17 de Septiembre, Durango"),
    schedule: null,
    scheduleNote: BRANCH_HOURS,
  },
];

// Galería: fotos reales del restaurante (portada) y de su menú.
export const GALLERY = [
  { category: "Local", alt: "Trompo de pastor y platillos de Taquería El Plomazo", image: "images/portada.webp" },
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
