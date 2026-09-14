"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import type { Dictionary, Locale } from "@/i18n";
import { href, routes } from "@/lib/utils";
import { LangSwitcher } from "./LangSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [prodOpen, setProdOpen] = useState(false);

  const products = [
    { label: dict.nav.cms, to: routes.cms },
    { label: dict.nav.ecommerce, to: routes.ecommerce },
    { label: dict.nav.bidmax, to: routes.bidmax },
    { label: dict.nav.kivi, to: routes.kivi },
  ];

  const links = [
    { label: dict.nav.home, to: routes.home },
    { label: dict.nav.ai, to: routes.ai },
    { label: dict.nav.services, to: routes.services },
    { label: dict.nav.airlines, to: routes.airlines },
    { label: dict.nav.about, to: routes.about },
    { label: dict.nav.portfolio, to: routes.portfolio },
    { label: dict.nav.careers, to: routes.careers },
    { label: dict.nav.contact, to: routes.contact },
  ];

  return (
    <header className="glass-nav sticky top-0 z-50">
      <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between gap-4 px-5 sm:px-8">
        <Link href={href(lang)} className="flex items-center gap-2.5 shrink-0">
          <Image src="/brand/logo-mark.png" alt="KIVIO" width={36} height={39} className="h-9 w-auto" />
          <span className="font-display text-lg tracking-wide text-fg">KIVIO</span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {links.slice(0, 2).map((l) => (
            <Link
              key={l.to}
              href={href(lang, l.to)}
              className="rounded-full px-3 py-2 text-[13px] font-medium text-muted transition hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
          <div
            className="relative"
            onMouseEnter={() => setProdOpen(true)}
            onMouseLeave={() => setProdOpen(false)}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-medium text-muted transition hover:text-accent"
            >
              {dict.nav.products}
              <ChevronDown size={14} />
            </button>
            {prodOpen && (
              <div className="absolute left-0 top-full pt-2">
                <div className="min-w-[220px] overflow-hidden rounded-2xl border border-border bg-surface py-2 shadow-(--card-shadow)">
                  {products.map((p) => (
                    <Link
                      key={p.to}
                      href={href(lang, p.to)}
                      className="block px-4 py-2.5 text-sm text-fg hover:bg-accent-soft hover:text-accent-ink"
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {links.slice(2).map((l) => (
            <Link
              key={l.to}
              href={href(lang, l.to)}
              className="rounded-full px-3 py-2 text-[13px] font-medium text-muted transition hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitcher lang={lang} />
          <ThemeToggle light={dict.common.light} dark={dict.common.dark} />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? dict.common.closeMenu : dict.common.openMenu}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-bg xl:hidden">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-1 px-5 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                href={href(lang, l.to)}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-fg hover:bg-surface-2"
              >
                {l.label}
              </Link>
            ))}
            <p className="mt-2 px-3 text-xs font-semibold uppercase tracking-widest text-muted-2">
              {dict.nav.products}
            </p>
            {products.map((p) => (
              <Link
                key={p.to}
                href={href(lang, p.to)}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm text-muted hover:bg-surface-2 hover:text-fg"
              >
                {p.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
