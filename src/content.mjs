// Todo el contenido del sitio. Todo es de EJEMPLO: no son datos reales de
// El Plomazo. Sustituir por el material que entregue el restaurante
// (precios, direcciones, teléfonos, historia, fotos) y correr `npm run build`.

export const SITE = {
  name: "El Plomazo",
  phone: "8100000000",
  phoneLabel: "(81) 0000-0000 (ejemplo)",
  whatsapp: "528100000000",
  email: "hola@ejemplo.mx",
  instagramUrl: "",
  facebookUrl: "",
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

// `tone` (1-6) elige el degradado del marcador de foto. Cuando haya fotos
// reales: pon el archivo en images/ y agrega `image: "images/archivo.jpg"`.
export const CATEGORIES = [
  { slug: "tacos", name: "Tacos", tone: 1 },
  { slug: "especialidades", name: "Especialidades", tone: 2 },
  { slug: "bebidas", name: "Bebidas", tone: 3 },
  { slug: "postres", name: "Postres", tone: 4 },
];

export const PRODUCTS = [
  { cat: "tacos", name: "Taco al pastor", price: 28, featured: true, description: "Piña asada, cilantro y cebolla (ejemplo).", tone: 1 },
  { cat: "tacos", name: "Taco de bistec", price: 30, featured: true, description: "Carne al carbón con cebollitas cambray (ejemplo).", tone: 2 },
  { cat: "tacos", name: "Taco de tripa", price: 32, description: "Crujiente, con limón y salsa de la casa (ejemplo).", tone: 5 },
  { cat: "tacos", name: "Taco de lengua", price: 38, description: "Suave, con cilantro y cebolla (ejemplo).", tone: 3 },
  { cat: "especialidades", name: "Gringa", price: 65, featured: true, description: "Tortilla de harina, queso derretido y trompo (ejemplo).", tone: 4 },
  { cat: "especialidades", name: "Quesabirria", price: 42, description: "Con consomé para acompañar (ejemplo).", tone: 2 },
  { cat: "especialidades", name: "Campechano", price: 58, description: "Bistec y chorizo sobre tortilla de maíz (ejemplo).", tone: 6 },
  { cat: "especialidades", name: "Costra de queso", price: 70, unavailable: true, description: "Queso gratinado con carne a elegir (ejemplo).", tone: 1 },
  { cat: "bebidas", name: "Agua de horchata", price: 25, description: "Hecha en casa todos los días (ejemplo).", tone: 3 },
  { cat: "bebidas", name: "Agua de jamaica", price: 25, description: "Fresca y sin exceso de azúcar (ejemplo).", tone: 5 },
  { cat: "bebidas", name: "Refresco de botella", price: 28, description: "Variedad según disponibilidad (ejemplo).", tone: 6 },
  { cat: "postres", name: "Flan casero", price: 35, description: "Receta de la casa (ejemplo).", tone: 4 },
  { cat: "postres", name: "Arroz con leche", price: 30, description: "Con canela espolvoreada (ejemplo).", tone: 2 },
];

export const PROMOTIONS = [
  { title: "2×1 en tacos al pastor", description: "Todos los martes en sucursales participantes (ejemplo).", until: "31 de diciembre (ejemplo)", tone: 1 },
  { title: "Combo familiar", description: "Doce tacos surtidos y dos aguas grandes a precio especial (ejemplo).", until: "30 de noviembre (ejemplo)", tone: 4 },
  { title: "Postre gratis en tu cumpleaños", description: "Presenta una identificación el día de tu cumpleaños (ejemplo).", until: "Todo el año (ejemplo)", tone: 3 },
];

const WEEK = [
  ["Lunes", "13:00 – 23:00"],
  ["Martes", "13:00 – 23:00"],
  ["Miércoles", "13:00 – 23:00"],
  ["Jueves", "13:00 – 23:00"],
  ["Viernes", "13:00 – 00:00"],
  ["Sábado", "13:00 – 00:00"],
  ["Domingo", "13:00 – 20:00"],
];

export const BRANCHES = [
  { slug: "centro", name: "Sucursal Centro", address: "Av. Ejemplo 123, Col. Centro, Monterrey (dirección de ejemplo)", phone: "8100000000", whatsapp: "528100000000", mapsUrl: "https://www.google.com/maps", schedule: WEEK },
  { slug: "poniente", name: "Sucursal Poniente", address: "Av. Otro Ejemplo 456, Col. Poniente, Monterrey (dirección de ejemplo)", phone: "8100000000", whatsapp: "528100000000", mapsUrl: "https://www.google.com/maps", schedule: WEEK },
  { slug: "norte", name: "Sucursal Norte", address: "Calle Muestra 789, Col. Norte, Monterrey (dirección de ejemplo)", phone: "8100000000", whatsapp: "", mapsUrl: "https://www.google.com/maps", schedule: WEEK.map(([d, h]) => [d, d === "Domingo" ? "Cerrado" : h]) },
];

export const GALLERY = [
  { category: "Platillos", alt: "Orden de tacos al pastor (foto pendiente)", tone: 1 },
  { category: "Platillos", alt: "Gringa con queso derretido (foto pendiente)", tone: 4 },
  { category: "Ambiente", alt: "Interior de la taquería (foto pendiente)", tone: 3 },
  { category: "Platillos", alt: "Quesabirria con consomé (foto pendiente)", tone: 2 },
  { category: "Sucursales", alt: "Fachada de la sucursal Centro (foto pendiente)", tone: 5 },
  { category: "Ambiente", alt: "Trompo al pastor girando (foto pendiente)", tone: 6 },
  { category: "Platillos", alt: "Aguas frescas de la casa (foto pendiente)", tone: 3 },
  { category: "Sucursales", alt: "Terraza de la sucursal Poniente (foto pendiente)", tone: 2 },
];

export const HISTORY = [
  "El Plomazo nació de una parrilla familiar y un nombre que se quedó. Este texto es un marcador de posición.",
  "La historia real, con fechas, lugares y la voz del restaurante, se redactará con el material que entregue el negocio.",
];
