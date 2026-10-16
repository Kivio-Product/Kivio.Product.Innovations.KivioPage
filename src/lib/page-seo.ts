import type { Metadata } from "next";
import { getDictionary, type Dictionary } from "@/i18n";
import { buildMetadata } from "@/lib/seo";

type PageSeo = { title: string; description: string; path: string; socialImage?: { path: string; alt: string } };

/** Compact per-page metadata helper: reads dict values and builds canonical/hreflang/OG. */
export async function pageMetadata(
  params: Promise<{ lang: string }>,
  page: (dict: Dictionary) => PageSeo,
): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return buildMetadata({ lang, ...page(dict) });
}
