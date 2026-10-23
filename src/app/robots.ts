import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/* Search and generative-AI crawlers (retrieval, answer engines and training) are explicitly welcome.
   A named user-agent group replaces the "*" group, so it repeats the /api/ exclusion.
   To opt out of model training only, move the training bots (GPTBot, ClaudeBot, Google-Extended,
   Applebot-Extended, CCBot) to a disallow rule and keep the retrieval bots allowed. */
const aiAndSearchBots = [
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: aiAndSearchBots, allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

export const dynamic = "force-static";
