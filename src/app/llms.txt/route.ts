import { getDictionary, locales, type Locale } from "@/i18n";
import { SITE_URL, absoluteUrl } from "@/lib/seo";
import { routes, social } from "@/lib/utils";

export const dynamic = "force-static";

type Dict = ReturnType<typeof getDictionary>;
type Entry = { title: string; description: string; path: string };

const headings: Record<Locale, { language: string; sections: [string, string[]][] }> = {
  es: {
    language: "Español",
    sections: [
      ["Servicios", ["services", "airlines", "ai"]],
      ["Productos", ["kivi", "cms", "ecommerce", "bidmax"]],
      ["Casos de éxito", ["portfolio", "flyr", "merkko", "nutrir"]],
      ["Empresa", ["about", "contact", "careers"]],
    ],
  },
  en: {
    language: "English",
    sections: [
      ["Services", ["services", "airlines", "ai"]],
      ["Products", ["kivi", "cms", "ecommerce", "bidmax"]],
      ["Case studies", ["portfolio", "flyr", "merkko", "nutrir"]],
      ["Company", ["about", "contact", "careers"]],
    ],
  },
};

function entryFor(d: Dict, key: string): Entry {
  switch (key) {
    case "services": return { ...d.services.seo, path: routes.services };
    case "airlines": return { ...d.airlines.seo, path: routes.airlines };
    case "ai": return { title: d.ai.seoTitle, description: d.ai.seoDescription, path: routes.ai };
    case "kivi": return { ...d.kivi.seo, path: routes.kivi };
    case "cms": return { ...d.cms.seo, path: routes.cms };
    case "ecommerce": return { ...d.ecommerce.seo, path: routes.ecommerce };
    case "bidmax": return { ...d.bidmax.seo, path: routes.bidmax };
    case "portfolio": return { title: d.portfolio.title, description: d.portfolio.lead, path: routes.portfolio };
    case "flyr": return { ...d.flyr.seo, path: routes.flyr };
    case "merkko": return { ...d.merkko.seo, path: routes.merkko };
    case "nutrir": return { ...d.nutrir.seo, path: routes.nutrir };
    case "about": return { ...d.about.seo, path: routes.about };
    case "careers": return { ...d.careers.seo, path: routes.careers };
    default: return { title: d.nav.contact, description: d.contact.lead, path: routes.contact };
  }
}

/** /llms.txt: curated, machine-readable site map for LLM-based assistants (https://llmstxt.org). */
export function GET() {
  const lines: string[] = [
    "# KIVIO SAS",
    "",
    `> ${getDictionary("en").meta.description}`,
    `> ${getDictionary("es").meta.description}`,
    "",
    "KIVIO SAS is a Colombian technology company founded in 2023 in Manizales (Caldas), with a fully remote senior team. It keeps critical systems running for companies that cannot stop: operational continuity, dedicated teams, platform integration, modernization, AI consulting and its own products (KIVI, Kivio CMS, Kivio eCommerce and Kivio BidMax).",
    "",
    "KIVIO SAS es una empresa colombiana de tecnología fundada en 2023 en Manizales (Caldas), con un equipo senior 100 % remoto. Sostiene sistemas críticos de compañías que no pueden detenerse y desarrolla productos propios (KIVI, Kivio CMS, Kivio eCommerce y Kivio BidMax).",
    "",
    `- Website: ${SITE_URL}`,
    `- Languages: Spanish (${absoluteUrl("es")}) and English (${absoluteUrl("en")})`,
    `- Email: ${social.email}`,
    `- WhatsApp: ${social.whatsappLink}`,
    `- LinkedIn: ${social.linkedin}`,
    `- Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ];

  for (const lang of locales) {
    const dict = getDictionary(lang);
    const { language, sections } = headings[lang];
    lines.push(`## ${language}`, "");
    for (const [section, keys] of sections) {
      lines.push(`### ${section}`, "");
      for (const key of keys) {
        const { title, description, path } = entryFor(dict, key);
        lines.push(`- [${title}](${absoluteUrl(lang, path)}): ${description}`);
      }
      lines.push("");
    }
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
