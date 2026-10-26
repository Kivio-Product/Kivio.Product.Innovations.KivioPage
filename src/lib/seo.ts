import type { Metadata } from "next";
import { social } from "@/lib/utils";

export const SITE_URL = "https://www.kivio.com.co";
export const SITE_NAME = "KIVIO SAS";

export function absoluteUrl(lang: string, path = "") {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `${SITE_URL}/${lang}/${clean}` : `${SITE_URL}/${lang}`;
}

/** Per-page metadata: canonical, hreflang (es/en/x-default), OpenGraph and Twitter. */
export function buildMetadata({
  lang,
  path = "",
  title,
  description,
  socialImage,
  type = "website",
}: {
  lang: string;
  path?: string;
  title: string;
  description: string;
  socialImage?: { path: string; alt: string };
  type?: "website" | "article";
}): Metadata {
  const clean = path.replace(/^\/+|\/+$/g, "");
  const esUrl = absoluteUrl("es", clean);
  const enUrl = absoluteUrl("en", clean);
  const url = lang === "en" ? enUrl : esUrl;
  /* the generated card lives in the [lang] segment (see app/[lang]/opengraph-image.tsx);
     it must be referenced explicitly or Next omits it when openGraph is defined here */
  const imageUrl = absoluteUrl(lang, socialImage?.path ?? "opengraph-image");
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { es: esUrl, en: enUrl, "x-default": esUrl },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: lang === "en" ? "en_US" : "es_CO",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: socialImage?.alt ?? SITE_NAME }],
    },
    twitter: { card: "summary_large_image", title, description, images: [imageUrl] },
  };
}

/* ── JSON-LD builders (schema.org) ── */

/**
 * Last meaningful content change per route (YYYY-MM-DD). Feeds JSON-LD dateModified and the
 * sitemap lastmod: bump the entry when the page's content really changes.
 */
export const PAGE_MODIFIED: Record<string, string> = {
  "": "2026-10-23",
  ia: "2026-10-23",
  servicios: "2026-10-23",
  "soporte-a-aerolineas": "2026-10-23",
  "productos/kivio-cms": "2026-10-23",
  "productos/kivio-ecommerce": "2026-10-23",
  "productos/kivio-bidmax": "2026-10-23",
  "productos/kivi-ia": "2026-10-23",
  portafolio: "2026-09-16",
  "portafolio/flyr": "2026-10-23",
  "portafolio/merkko": "2026-10-23",
  "portafolio/nutrir": "2026-10-23",
  "sobre-nosotros": "2026-10-23",
  contacto: "2026-09-16",
  carreras: "2026-10-23",
  "politicas-de-privacidad": "2026-09-16",
};

const orgCopy = {
  es: {
    knowsAbout: [
      "Continuidad operacional",
      "Sistemas críticos",
      "Alta disponibilidad",
      "Sistemas PSS e IBE para aerolíneas",
      "Integración de plataformas",
      "Consultoría en inteligencia artificial y automatización",
      "Comercio electrónico",
      "Gestores de contenido (CMS)",
    ],
    award: "Finalista Premios Ingenio 2026 (Fedesoft): Empresa Revelación Tecnológica del Año",
    slogan: "Sistemas críticos, siempre en operación",
    description:
      "KIVIO SAS sostiene sistemas críticos para compañías que no pueden detenerse: continuidad operacional, equipos dedicados, integración de plataformas y modernización, con experiencia en aviación, comercio digital y otros sectores de alta exigencia.",
    areaServed: ["Colombia", "Latinoamérica"],
  },
  en: {
    knowsAbout: [
      "Operational continuity",
      "Critical systems",
      "High availability",
      "PSS and IBE systems for airlines",
      "Platform integration",
      "AI consulting and process automation",
      "E-commerce",
      "Content management systems (CMS)",
    ],
    award: "Finalist, Premios Ingenio 2026 (Fedesoft): Breakthrough Technology Company of the Year",
    slogan: "Critical systems, always running",
    description:
      "KIVIO SAS keeps critical systems running for companies that cannot stop: operational continuity, dedicated teams, platform integration and modernization, with experience in aviation, digital commerce and other demanding sectors.",
    areaServed: ["Colombia", "Latin America"],
  },
} as const;

export function organizationSchema(lang = "es") {
  const copy = lang === "en" ? orgCopy.en : orgCopy.es;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: "KIVIO SAS",
    alternateName: ["KIVIO", "Kivio"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/brand/logo-mark.png`,
      width: 240,
      height: 260,
    },
    email: social.email,
    telephone: "+573012839049",
    foundingDate: "2023",
    foundingLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: "Manizales", addressRegion: "Caldas", addressCountry: "CO" },
    },
    slogan: copy.slogan,
    description: copy.description,
    award: copy.award,
    knowsAbout: copy.knowsAbout,
    areaServed: copy.areaServed.map((name, i) => ({ "@type": i === 0 ? "Country" : "Place", name })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: social.email,
        telephone: "+573012839049",
        availableLanguage: ["es", "en"],
        areaServed: "CO",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Manizales",
      addressRegion: "Caldas",
      addressCountry: "CO",
    },
    sameAs: [social.linkedin, social.facebook, social.instagram, social.tiktok],
  };
}

export function websiteSchema(lang: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: lang === "en" ? "en" : "es-CO",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbSchema(lang: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(lang, item.path),
    })),
  };
}

export function webPageSchema({
  lang,
  path,
  name,
  description,
}: {
  lang: string;
  path: string;
  name: string;
  description?: string;
}) {
  const url = absoluteUrl(lang, path);
  const dateModified = PAGE_MODIFIED[path.replace(/^\/+|\/+$/g, "")];
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    ...(description ? { description } : {}),
    inLanguage: lang === "en" ? "en" : "es-CO",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    ...(dateModified ? { dateModified } : {}),
  };
}

export function softwareAppSchema({
  name,
  description,
  path,
  lang = "es",
}: {
  name: string;
  description: string;
  path: string;
  lang?: "es" | "en";
}) {
  const url = absoluteUrl(lang, path);
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}#software`,
    name,
    description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url,
    inLanguage: lang === "en" ? "en" : "es-CO",
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function serviceSchema({
  name,
  description,
  path,
  serviceType,
  lang = "es",
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  lang?: "es" | "en";
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: absoluteUrl(lang, path),
    inLanguage: lang === "en" ? "en" : "es-CO",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "Country", name: "Colombia" },
      { "@type": "Place", name: lang === "en" ? "Latin America" : "Latinoamérica" },
    ],
  };
}
