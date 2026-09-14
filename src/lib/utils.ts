export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const routes = {
  home: "",
  about: "sobre-nosotros",
  services: "servicios",
  contact: "contacto",
  careers: "carreras",
  ai: "ia",
  airlines: "soporte-a-aerolineas",
  privacy: "politicas-de-privacidad",
  cms: "productos/kivio-cms",
  ecommerce: "productos/kivio-ecommerce",
  bidmax: "productos/kivio-bidmax",
  kivi: "productos/kivi-ia",
  portfolio: "portafolio",
  flyr: "portafolio/flyr",
  merkko: "portafolio/merkko",
  nutrir: "portafolio/nutrir",
} as const;

export function href(lang: string, path = "") {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `/${lang}/${clean}` : `/${lang}`;
}

export const social = {
  email: "admin@kivio.com.co",
  emailAlt: "kivio@kivio.com.co",
  whatsapp: "573012839049",
  whatsappLink: "https://wa.me/573012839049",
  linkedin: "https://www.linkedin.com/company/kivio-sas/",
  facebook: "https://www.facebook.com/share/16cZaZYDQa/",
  instagram: "https://www.instagram.com/kivio.co",
  tiktok: "https://www.tiktok.com/@kivio.co",
  address: "Cl. 7b #12, Villamaría, Caldas, Colombia",
  city: "Manizales — Caldas — Colombia",
  kiviExternal: "https://kivi-ai.kivio.com.co/",
};

export const clients = [
  { name: "FLYR", href: "flyr", dark: "/images/clients/flyr-dark.png", color: "/images/clients/flyr-color.png" },
  { name: "BidMax", href: "bidmax", dark: "/images/clients/bidmax-dark.png", color: "/images/clients/bidmax-color.png" },
  { name: "Merkko", href: "merkko", dark: "/images/clients/merkko-dark.png", color: "/images/clients/merkko-color.png" },
  { name: "Nutrir", href: "nutrir", dark: "/images/clients/nutrir-dark.png", color: "/images/clients/nutrir-color.png" },
] as const;
