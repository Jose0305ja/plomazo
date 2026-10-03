/**
 * Contenido de ejemplo. Todo está marcado "(ejemplo)": no son datos reales de
 * El Plomazo. Sustituir por el material que entregue el restaurante
 * (precios, direcciones, teléfonos, historia, fotos) antes de publicar.
 */
export const SITE = {
  name: "El Plomazo",
  phone: "8100000000",
  phoneLabel: "(81) 0000-0000 (ejemplo)",
  whatsapp: "528100000000",
  instagramUrl: "",
  facebookUrl: "",
} as const;

export const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#menu", label: "Menú" },
  { href: "#promociones", label: "Promociones" },
  { href: "#sucursales", label: "Sucursales" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
] as const;

export const CATEGORIES = ["Tacos", "Especialidades", "Bebidas", "Extras"];

export const FEATURED = [
  { name: "Taco al pastor", price: 28, note: "Piña asada, cilantro y cebolla (ejemplo)." },
  { name: "Gringa", price: 65, note: "Tortilla de harina, queso y trompo (ejemplo)." },
  { name: "Quesabirria", price: 42, note: "Con consomé para acompañar (ejemplo)." },
  { name: "Agua de horchata", price: 25, note: "Hecha en casa (ejemplo)." },
];

export const PROMOTIONS = [
  {
    title: "2×1 en tacos al pastor — martes (ejemplo)",
    description:
      "Promoción ilustrativa. Vigencia y condiciones reales pendientes de confirmar con el restaurante.",
  },
];

export const BRANCHES = [
  {
    name: "Sucursal Centro (ejemplo)",
    address: "Av. Ejemplo 123, Monterrey (dirección de ejemplo)",
    phone: "8100000000",
    whatsapp: "528100000000",
    mapsUrl: "https://www.google.com/maps",
  },
  {
    name: "Sucursal Poniente (ejemplo)",
    address: "Av. Otro Ejemplo 456, Monterrey (dirección de ejemplo)",
    phone: "8100000000",
    whatsapp: "528100000000",
    mapsUrl: "https://www.google.com/maps",
  },
];

const PRICE = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export const formatPrice = (value: number): string => PRICE.format(value);
