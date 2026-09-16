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
  type = "website",
}: {
  lang: string;
  path?: string;
  title: string;
  description: string;
  type?: "website" | "article";
}): Metadata {
  const clean = path.replace(/^\/+|\/+$/g, "");
  const esUrl = absoluteUrl("es", clean);
  const enUrl = absoluteUrl("en", clean);
  const url = lang === "en" ? enUrl : esUrl;
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
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/* ── JSON-LD builders (schema.org) ── */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: "KIVIO SAS",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/brand/logo-mark.png`,
      width: 240,
      height: 260,
    },
    email: social.email,
    telephone: "+573012839049",
    foundingDate: "2022",
    slogan: "Transformamos ideas en Software",
    description:
      "Empresa colombiana de desarrollo de software a la medida: inteligencia artificial, eCommerce, soluciones para aerolíneas (PSS/IBE) y productos propios.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Cl. 7b #12",
      addressLocality: "Villamaría",
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

export function softwareAppSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: absoluteUrl("es", path),
    inLanguage: ["es", "en"],
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function serviceSchema({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: absoluteUrl("es", path),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "Country", name: "Colombia" },
      { "@type": "Place", name: "Latinoamérica" },
    ],
  };
}

export function jobPostingSchema({
  title,
  description,
  city,
  datePosted,
}: {
  title: string;
  description: string;
  city: string;
  datePosted: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description,
    datePosted,
    employmentType: "FULL_TIME",
    hiringOrganization: { "@id": `${SITE_URL}/#organization` },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: city,
        addressCountry: "CO",
      },
    },
  };
}
