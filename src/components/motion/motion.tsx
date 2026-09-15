"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* IntersectionObserver once-per-element reveal */
function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -48px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/** Fade-up reveal — motion.csv #4 (300–400ms, y: 12–24px) */
export function FadeUp({
  children,
  className,
  delay = 0,
  y = 20,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn("motion-reduce:transition-none", className)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity .45s cubic-bezier(.215,.61,.355,1) ${delay}ms, transform .45s cubic-bezier(.215,.61,.355,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/** Staggered children reveal — motion.csv #5 (400–600ms, stagger 0.08) */
export function Stagger({
  children,
  className,
  step = 80,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  step?: number;
  y?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <FadeUp key={i} delay={Math.min(i, 8) * step} y={y}>
              {child}
            </FadeUp>
          ))
        : children}
    </div>
  );
}

/** Count-up metric — pattern from Trust & Authority + counters preset */
export function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 1400,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced()) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/** Magnetic hover — motion.csv #3 (max 1–2 per view, offset ×0.3) */
export function Magnetic({
  children,
  className,
  strength = 0.25,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) * strength;
      ty = (e.clientY - (r.top + r.height / 2)) * strength;
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
    };
    const loop = () => {
      cx += (tx - cx) * 0.14;
      cy += (ty - cy) * 0.14;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}

/** Spotlight card — pointer-tracking radial highlight (leaves final state under reduced motion) */
export function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={cn(
        "group/spot relative overflow-hidden",
        "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 motion-reduce:before:hidden",
        "before:bg-[radial-gradient(420px_circle_at_var(--spot-x,50%)_var(--spot-y,50%),rgba(246,110,76,0.14),transparent_65%)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Ambient tilt — subtle 3D card tilt, disabled on reduced motion / touch */
export function Tilt({
  children,
  className,
  max = 6,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || reduced() || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -2 * max;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 2 * max;
    el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
  }
  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("transition-transform duration-300 ease-out will-change-transform motion-reduce:transform-none", className)}
    >
      {children}
    </div>
  );
}

/** Scroll progress bar (top of viewport) */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setProgress(max > 0 ? h.scrollTop / max : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent" aria-hidden>
      <div
        className="h-full origin-left bg-linear-to-r from-accent to-accent-2"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

/** Typing / streaming text — AI-Native UI effect (reduced-motion → full text) */
export function Typewriter({
  text,
  className,
  speed = 42,
  startDelay = 350,
  cursor = true,
}: {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
  cursor?: boolean;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.3);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced()) {
      setCount(text.length);
      return;
    }
    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const start = setTimeout(() => {
      const tick = () => {
        i += 1;
        setCount(i);
        if (i < text.length) timeout = setTimeout(tick, speed);
      };
      tick();
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearTimeout(timeout);
    };
  }, [inView, text, speed, startDelay]);

  const done = count >= text.length;
  return (
    <span ref={ref} className={className}>
      {text.slice(0, count)}
      {cursor && !done && (
        <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-accent motion-reduce:hidden" />
      )}
    </span>
  );
}

/**
 * Rotating headline word — vertical roll inside a clipped window.
 * Words never overlap: the column slides like a slot machine (motion.csv #5 timing).
 */
export function RotatingWord({
  words,
  interval = 3000,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2 || reduced()) return;
    const id = setInterval(() => setIndex((v) => (v + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className={cn("relative inline-block h-[1.16em] overflow-hidden align-bottom", className)}>
      <span
        className="block transition-transform duration-[650ms] ease-[cubic-bezier(.22,.68,.28,1)]"
        style={{ transform: `translate3d(0, -${(index * 100) / words.length}%, 0)` }}
      >
        {words.map((word, i) => (
          <span
            key={word}
            aria-hidden={i !== index}
            className="block h-[1.16em] overflow-hidden leading-[1.16em] whitespace-nowrap"
          >
            {word}
          </span>
        ))}
      </span>
    </span>
  );
}

/**
 * Scroll-scrubbed progressive text (motion.csv #6/#9: scrub-driven, words reveal with scroll).
 * Words light up as the block travels through the viewport. Reads + writes via rAF, no re-renders.
 */
export function ScrollText({
  text,
  className,
  from = 0.16,
  startAt = 0.9,
  endAt = 0.4,
}: {
  text: string;
  className?: string;
  from?: number;
  startAt?: number;
  endAt?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-w]"));
    if (!spans.length) return;

    if (reduced()) {
      spans.forEach((s) => {
        s.style.opacity = "1";
        s.style.filter = "none";
        s.style.transform = "none";
      });
      return;
    }

    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const start = vh * startAt;
      const end = vh * endAt;
      const p = Math.min(1, Math.max(0, (start - r.top) / Math.max(1, start - end)));
      const total = spans.length;
      for (let i = 0; i < total; i++) {
        const t = Math.min(1, Math.max(0, p * (total + 2) - i));
        const s = spans[i];
        s.style.opacity = String(from + (1 - from) * t);
        if (t >= 1) {
          if (s.style.filter !== "none") {
            s.style.filter = "none";
            s.style.transform = "none";
          }
        } else {
          s.style.filter = `blur(${((1 - t) * 4).toFixed(2)}px)`;
          s.style.transform = `translateY(${((1 - t) * 5).toFixed(2)}px)`;
        }
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [from, startAt, endAt]);

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          <span data-w className="inline-block will-change-[opacity,transform,filter]" style={{ opacity: from }}>
            {w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

/** Scroll cue — animated chevron for the end of the hero (static under reduced motion). */
export function ScrollCue({ label }: { label: string }) {
  return (
    <div className="pointer-events-none mt-14 hidden justify-center lg:flex" aria-hidden>
      <div className="flex flex-col items-center gap-2 text-muted-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em]">{label}</span>
        <span className="flex h-9 w-6 items-start justify-center rounded-full border border-border-strong p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-accent motion-reduce:animate-none" />
        </span>
      </div>
    </div>
  );
}

/** Scroll-active step card (motion.csv #4 + #119: state stays correct, animation is decorative). */
export function ActiveCard({
  children,
  className,
  activeClassName = "border-accent/60 shadow-[0_20px_44px_-20px_rgba(246,110,76,0.45)]",
  band = "-32% 0px -32% 0px",
}: {
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  band?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      rootMargin: band,
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [band]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[border-color,background-color,transform,box-shadow] duration-500 ease-out motion-reduce:transition-none",
        className,
        active && activeClassName,
      )}
    >
      {children}
    </div>
  );
}

/** Numbered scroll steps: the card in the viewport band lights up as you scroll (scrollytelling light). */
export function ScrollSteps({
  items,
  activeClassName,
}: {
  items: { title: string; body: string }[];
  activeClassName?: string;
}) {
  return (
    <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <ActiveCard
          key={item.title}
          activeClassName={activeClassName}
          className="card-lift h-full rounded-[20px] border border-border bg-surface p-6"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-accent to-accent-2 text-sm font-bold text-white shadow-[0_8px_18px_-8px_rgba(255,87,34,0.6)]">
              {i + 1}
            </span>
            <span className="h-px flex-1 bg-linear-to-r from-accent/40 to-transparent" aria-hidden />
          </div>
          <h3 className="mt-4 text-base font-semibold text-fg">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
        </ActiveCard>
      ))}
    </div>
  );
}

/** Parallax layer — motion.csv #13/#14 (decorative layers only, yPercent 5–15) */
export function Parallax({
  children,
  className,
  speed = 0.12,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    // motion.csv #13/#14 + ux: parallax is desktop/decorative only (mobile not-recommended)
    if (window.matchMedia("(max-width: 1023px)").matches) return;
    let raf = 0;
    const update = () => {
      const r = el.parentElement?.getBoundingClientRect();
      if (!r) return;
      const mid = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-mid * speed).toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [speed]);

  return (
    <div ref={ref} className={cn("will-change-transform motion-reduce:transform-none", className)}>
      {children}
    </div>
  );
}
