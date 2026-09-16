import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KIVIO SAS — Sistemas críticos, siempre en operación",
    short_name: "KIVIO",
    description:
      "Continuidad operacional, equipos dedicados, integración y modernización de sistemas críticos. Experiencia en aerolíneas, turismo, logística y comercio digital.",
    start_url: "/es",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#f66e4c",
    lang: "es-CO",
    icons: [
      { src: "/brand/favicon.png", sizes: "500x500", type: "image/png", purpose: "any" },
      { src: "/brand/logo-mark.png", sizes: "240x260", type: "image/png", purpose: "any" },
    ],
  };
}

export const dynamic = "force-static";
