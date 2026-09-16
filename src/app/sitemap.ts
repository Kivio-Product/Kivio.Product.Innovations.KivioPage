import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "ia", priority: 0.9, changeFrequency: "weekly" },
  { path: "servicios", priority: 0.9, changeFrequency: "monthly" },
  { path: "soporte-a-aerolineas", priority: 0.8, changeFrequency: "monthly" },
  { path: "productos/kivio-cms", priority: 0.8, changeFrequency: "monthly" },
  { path: "productos/kivio-ecommerce", priority: 0.8, changeFrequency: "monthly" },
  { path: "productos/kivio-bidmax", priority: 0.8, changeFrequency: "monthly" },
  { path: "productos/kivi-ia", priority: 0.9, changeFrequency: "weekly" },
  { path: "portafolio", priority: 0.7, changeFrequency: "monthly" },
  { path: "portafolio/flyr", priority: 0.6, changeFrequency: "monthly" },
  { path: "portafolio/merkko", priority: 0.6, changeFrequency: "monthly" },
  { path: "portafolio/nutrir", priority: 0.6, changeFrequency: "monthly" },
  { path: "sobre-nosotros", priority: 0.7, changeFrequency: "monthly" },
  { path: "contacto", priority: 0.7, changeFrequency: "yearly" },
  { path: "carreras", priority: 0.6, changeFrequency: "weekly" },
  { path: "politicas-de-privacidad", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return locales.flatMap((lang) =>
    routes.map((route) => ({
      url: absoluteUrl(lang, route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          es: absoluteUrl("es", route.path),
          en: absoluteUrl("en", route.path),
        },
      },
    })),
  );
}

export const dynamic = "force-static";

/* keep SITE_URL referenced for future search-console annotations */
void SITE_URL;
