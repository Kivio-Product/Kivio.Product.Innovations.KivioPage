"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import type { Dictionary, Locale } from "@/i18n";
import { cn, href, routes } from "@/lib/utils";
import { LangSwitcher } from "./LangSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [prodOpen, setProdOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setProdOpen(false);
  }, [pathname]);

  const isActive = (to: string) => (to ? pathname.includes(to) : pathname === `/${lang}`);

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
    { label: dict.nav.portfolio, to: routes.portfolio, wide: true },
    { label: dict.nav.careers, to: routes.careers, wide: true },
    { label: dict.nav.contact, to: routes.contact },
  ];

  return (
    <header
      className={cn(
        "glass-nav sticky top-0 z-50 transition-shadow duration-300",
        scrolled && "shadow-[0_12px_32px_-20px_rgba(0,0,0,0.5)]",
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between gap-4 px-5 sm:px-8">
        <Link href={href(lang)} className="group flex items-center gap-2.5 shrink-0">
          <Image
            src="/brand/logo-mark.png"
            alt="KIVIO"
            width={36}
            height={39}
            className="h-9 w-auto transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2"
          />
          <span className="font-display text-lg tracking-wide text-fg">KIVIO</span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {links.slice(0, 2).map((l) => (
            <Link
              key={l.to}
              href={href(lang, l.to)}
              className={cn(
                "relative rounded-full px-2.5 py-2 text-[13px] font-medium transition hover:text-accent 2xl:px-3",
                isActive(l.to) ? "text-accent" : "text-muted",
              )}
            >
              {l.label}
              {isActive(l.to) && (
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-linear-to-r from-accent to-accent-2" />
              )}
            </Link>
          ))}
          <div
            className="relative"
            onMouseEnter={() => setProdOpen(true)}
            onMouseLeave={() => setProdOpen(false)}
          >
            <button
              type="button"
              onClick={() => setProdOpen((v) => !v)}
              aria-expanded={prodOpen}
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-medium transition hover:text-accent",
                prodOpen ? "text-accent" : "text-muted",
              )}
            >
              {dict.nav.products}
              <ChevronDown size={14} className={cn("transition-transform duration-200", prodOpen && "rotate-180")} />
            </button>
            <div
              className={cn(
                "absolute left-0 top-full pt-2 transition-all duration-200",
                prodOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0",
              )}
            >
              <div className="glass min-w-[240px] overflow-hidden rounded-2xl py-2 shadow-(--card-shadow)">
                {products.map((p) => (
                  <Link
                    key={p.to}
                    href={href(lang, p.to)}
                    className="group/item flex items-center justify-between px-4 py-2.5 text-sm text-fg transition hover:bg-accent-soft hover:text-accent-ink"
                  >
                    {p.label}
                    <span className="text-accent opacity-0 transition-opacity group-hover/item:opacity-100">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {links.slice(2).map((l) => (
            <Link
              key={l.to}
              href={href(lang, l.to)}
              className={cn(
                "relative rounded-full px-2.5 py-2 text-[13px] font-medium transition hover:text-accent 2xl:px-3",
                l.wide && "hidden min-[1360px]:inline-flex",
                isActive(l.to) ? "text-accent" : "text-muted",
              )}
            >
              {l.label}
              {isActive(l.to) && (
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-linear-to-r from-accent to-accent-2" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitcher lang={lang} />
          <ThemeToggle light={dict.common.light} dark={dict.common.dark} />
          <Link
            href={href(lang, routes.contact)}
            className="hidden h-11 items-center rounded-full bg-linear-to-r from-accent to-accent-2 px-5 text-[13px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(255,87,34,0.6)] transition hover:-translate-y-0.5 hover:brightness-110 lg:inline-flex"
          >
            {dict.common.contactUs}
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? dict.common.closeMenu : dict.common.openMenu}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-border bg-bg xl:hidden">
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
