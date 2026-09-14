"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

export function LangSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: Locale) {
    const parts = pathname.split("/");
    parts[1] = next;
    document.cookie = `kivio-lang=${next}; path=/; max-age=31536000`;
    router.push(parts.join("/") || `/${next}`);
  }

  return (
    <div className="inline-flex overflow-hidden rounded-full border border-border text-xs font-semibold">
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          className={`px-3 py-2 uppercase tracking-wide transition ${
            lang === l ? "bg-accent text-white" : "text-muted hover:text-fg"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
