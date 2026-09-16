import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KIVIO SAS — Transformamos ideas en Software",
    short_name: "KIVIO",
    description:
      "Software a la medida, inteligencia artificial, eCommerce y soluciones para aerolíneas.",
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
