"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import type { Dictionary } from "@/i18n";
import { cn, href, routes } from "@/lib/utils";

type Slide = Dictionary["home"]["showcase"]["slides"][number];

/* ── framed product capture ── */
function ShotPlate({
  src,
  alt,
  w,
  h,
  maxW,
  secondary,
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
  maxW: string;
  secondary?: { src: string; w: number; h: number };
}) {
  return (
    <div className={cn("relative mx-auto w-full", maxW)}>
      <div className="overflow-hidden rounded-[20px] border border-border bg-white p-2 shadow-(--card-shadow) dark:border-white/10">
        <Image
          src={src}
          alt={alt}
          width={w}
          height={h}
          sizes="(max-width: 1024px) 90vw, 520px"
          className="h-auto w-full rounded-[14px]"
        />
      </div>
      {secondary && (
        <div className="float-card absolute -bottom-8 -right-2 hidden w-[46%] overflow-hidden rounded-2xl border border-border bg-white p-1.5 shadow-(--card-shadow) sm:block dark:border-white/10">
          <Image
            src={secondary.src}
            alt=""
            width={secondary.w}
            height={secondary.h}
            sizes="260px"
            className="h-auto w-full rounded-xl"
          />
        </div>
      )}
    </div>
  );
}

const slideVisual = (slide: Slide) => {
  switch (slide.kind) {
    case "kivi-orders":
      return (
        <ShotPlate
          src="/images/showcase/kivi-ai-pedidos.jpg"
          alt="KIVI AI respondiendo el estado de un pedido por WhatsApp"
          w={448}
          h={714}
          maxW="max-w-[320px]"
        />
      );
    case "kivi-hr":
      return (
        <ShotPlate
          src="/images/showcase/kivi-ai-rrhh.jpg"
          alt="KIVI AI respondiendo una consulta de Recursos Humanos por WhatsApp"
          w={424}
          h={740}
          maxW="max-w-[312px]"
        />
      );
    case "cms":
      return (
        <ShotPlate
          src="/images/showcase/cms-nutrir-mockup.jpg"
          alt="Sitio de Fundación Nutrir construido con Kivio CMS"
          w={1584}
          h={1600}
          maxW="max-w-[470px]"
          secondary={{ src: "/images/showcase/cms-nutrir-web.jpg", w: 1600, h: 723 }}
        />
      );
    case "ecommerce":
      return (
        <ShotPlate
          src="/images/showcase/ecommerce-merkko-mockup.jpg"
          alt="Tienda Merkko construida con Kivio eCommerce"
          w={1600}
          h={1600}
          maxW="max-w-[470px]"
          secondary={{ src: "/images/showcase/ecommerce-kivio-admin.jpg", w: 1114, h: 708 }}
        />
      );
    default:
      return (
        <ShotPlate
          src="/images/showcase/bidmax-panel.jpg"
          alt="Panel de Kivio BidMax"
          w={977}
          h={617}
          maxW="max-w-[520px]"
          secondary={{ src: "/images/products/bidmax-demo.png", w: 977, h: 617 }}
        />
      );
  }
};

const slideRoute: Record<string, string> = {
  "kivi-orders": routes.kivi,
  "kivi-hr": routes.kivi,
  cms: routes.cms,
  ecommerce: routes.ecommerce,
  bidmax: routes.bidmax,
};

export function ShowcaseCarousel({ dict, lang }: { dict: Dictionary; lang: string }) {
  const s = dict.home.showcase;
  const slides = s.slides;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(true);
  const [hidden, setHidden] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number | null }>({ x: null });

  const go = useCallback(
    (next: number) => setIndex(((next % slides.length) + slides.length) % slides.length),
    [slides.length],
  );

  /* pause when offscreen / tab hidden (motion #17) */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  /* auto-advance — stops on hover, focus, offscreen, hidden tab or reduced motion */
  useEffect(() => {
    if (!playing || hovered || focused || !inView || hidden) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [playing, hovered, focused, inView, hidden, slides.length]);

  return (
    <div
      ref={rootRef}
      className="relative"
      role="group"
      aria-roledescription="carousel"
      aria-label={s.title}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={() => setFocused(false)}
    >
      {/* track */}
      <div
        className="overflow-hidden rounded-[25px] border border-border bg-surface shadow-(--card-shadow)"
        onPointerDown={(e) => (drag.current.x = e.clientX)}
        onPointerUp={(e) => {
          if (drag.current.x === null) return;
          const dx = e.clientX - drag.current.x;
          if (Math.abs(dx) > 48) go(index + (dx < 0 ? 1 : -1));
          drag.current.x = null;
        }}
      >
        <div
          className="flex transition-transform duration-[550ms] ease-[cubic-bezier(.22,.68,.28,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <article
              key={slide.kind}
              className="w-full shrink-0 px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${slides.length}`}
              aria-hidden={i !== index}
            >
              <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
                <div className="order-2 lg:order-1">{slideVisual(slide)}</div>
                <div className="order-1 lg:order-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
                    {slide.tag}
                  </span>
                  <h3 className="mt-4 font-display text-2xl leading-tight text-fg sm:text-3xl lg:text-4xl">
                    {slide.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{slide.body}</p>
                  <ul className="mt-5 space-y-2">
                    {slide.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2.5 text-sm text-fg">
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500/12 text-emerald-600 dark:text-emerald-400">
                          <Check size={11} aria-hidden />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={href(lang, slideRoute[slide.kind])}
                    className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition hover:gap-2.5"
                    tabIndex={i === index ? 0 : -1}
                  >
                    {slide.cta} <ArrowUpRight size={16} aria-hidden />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* controls */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label={s.prev}
          className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-fg transition hover:border-accent hover:text-accent"
        >
          <ChevronLeft size={18} aria-hidden />
        </button>

        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? s.pause : s.play}
          className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-fg transition hover:border-accent hover:text-accent"
        >
          {playing ? <Pause size={16} aria-hidden /> : <Play size={16} aria-hidden />}
        </button>

        <div className="flex items-center gap-2 px-1">
          {slides.map((slide, i) => (
            <button
              key={slide.kind}
              type="button"
              onClick={() => go(i)}
              aria-label={`${s.goTo} ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                i === index ? "w-7 bg-linear-to-r from-accent to-accent-2" : "w-2.5 bg-border-strong hover:bg-muted-2",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label={s.next}
          className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-fg transition hover:border-accent hover:text-accent"
        >
          <ChevronRight size={18} aria-hidden />
        </button>
      </div>

      {/* live region for screen readers */}
      <p className="sr-only" aria-live="polite">
        {`${index + 1} / ${slides.length} · ${slides[index].title}`}
      </p>

      <p className="mt-3 flex items-center justify-center gap-2 text-[11px] text-muted-2 md:hidden">
        <ArrowRight size={12} aria-hidden /> Desliza para ver más
      </p>
    </div>
  );
}
