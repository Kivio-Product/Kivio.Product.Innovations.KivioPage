import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import type { Dictionary, Locale } from "@/i18n";
import { href, routes, social } from "@/lib/utils";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const colA = [
    { label: dict.nav.home, to: routes.home },
    { label: dict.nav.portfolio, to: routes.portfolio },
    { label: dict.nav.cms, to: routes.cms },
    { label: dict.nav.ecommerce, to: routes.ecommerce },
    { label: dict.nav.bidmax, to: routes.bidmax },
  ];
  const colB = [
    { label: dict.nav.ai, to: routes.ai },
    { label: dict.nav.kivi, to: routes.kivi },
    { label: dict.nav.about, to: routes.about },
    { label: dict.nav.services, to: routes.services },
    { label: dict.nav.contact, to: routes.contact },
    { label: dict.nav.careers, to: routes.careers },
  ];

  return (
    <footer className="border-t border-border bg-bg-soft">
      <div className="mx-auto grid w-full max-w-[1180px] gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href={href(lang)} className="inline-flex items-center gap-2">
            <Image src="/brand/logo-mark.png" alt="KIVIO" width={32} height={35} />
            <span className="font-display text-lg text-fg">KIVIO</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted">{dict.footer.tagline}</p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold text-fg">{dict.common.navigation}</h3>
          <ul className="space-y-2 text-sm text-muted">
            {colA.map((l) => (
              <li key={l.to}>
                <Link href={href(lang, l.to)} className="hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold text-fg">{dict.nav.about}</h3>
          <ul className="space-y-2 text-sm text-muted">
            {colB.map((l) => (
              <li key={l.to}>
                <Link href={href(lang, l.to)} className="hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold text-fg">{dict.footer.contactTitle}</h3>
          <a href={`mailto:${social.email}`} className="text-sm text-muted hover:text-accent">
            {social.email}
          </a>
          <p className="mt-6 mb-3 text-xs font-semibold uppercase tracking-widest text-muted-2">
            {dict.common.follow}
          </p>
          <div className="flex gap-3">
            <a href={social.linkedin} target="_blank" rel="noreferrer" className="text-muted hover:text-accent" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href={social.facebook} target="_blank" rel="noreferrer" className="text-muted hover:text-accent" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href={social.instagram} target="_blank" rel="noreferrer" className="text-muted hover:text-accent" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href={social.tiktok} target="_blank" rel="noreferrer" className="text-muted hover:text-accent" aria-label="TikTok">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.83 2.83 0 0 1-2.83 2.5 2.8 2.8 0 0 1-2.83-2.83 2.8 2.8 0 0 1 2.83-2.83c.28 0 .56.04.82.13V9.08a6.27 6.27 0 0 0-.82-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.73a8.18 8.18 0 0 0 4.78 1.52V6.84a4.84 4.84 0 0 1-1.06-.15Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-2 px-5 py-5 text-xs text-muted-2 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link href={href(lang, routes.privacy)} className="hover:text-accent">
            {dict.nav.privacy}
          </Link>
          <p>
            © {new Date().getFullYear()} KIVIO SAS. {dict.common.rights}.
          </p>
        </div>
      </div>
    </footer>
  );
}
