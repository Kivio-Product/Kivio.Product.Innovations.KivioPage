"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

export type JourneyStep = {
  label: string;
  title: string;
  body: string;
};

/*
 * True 3D Staircase Math (Desktop):
 * Each step tier is 30px tall (24px slab + 6px gap).
 * Step 01: 90px top offset + Card + 1 tier  (30px) = Card + 120px
 * Step 02: 60px top offset + Card + 2 tiers (60px) = Card + 120px
 * Step 03: 30px top offset + Card + 3 tiers (90px) = Card + 120px
 * Step 04:  0px top offset + Card + 4 tiers (120px) = Card + 120px
 * -> Tops ascend diagonally (01 -> 04) AND all 4 pedestals rest on the exact same floor line!
 */
const STEP_TOP_OFFSETS = [
  "lg:pt-[90px]",
  "lg:pt-[60px]",
  "lg:pt-[30px]",
  "lg:pt-0",
];

function StepBlock3D({
  step,
  index,
  isActive,
  isReached,
  onActivate,
}: {
  step: JourneyStep;
  index: number;
  isActive: boolean;
  isReached: boolean;
  onActivate: () => void;
}) {
  const blockRef = useRef<HTMLDivElement>(null);
  const tierCount = index + 1; // 01 -> 1 escalón, 02 -> 2 escalones, 03 -> 3 escalones, 04 -> 4 escalones

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = blockRef.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rx = py * -10 + 5;
    const ry = px * 10 - 6;
    el.style.transform = `perspective(1200px) translate3d(-4px, -10px, 24px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    el.style.setProperty("--spot-x", `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--spot-y", `${((py + 0.5) * 100).toFixed(1)}%`);
  }

  function handlePointerLeave() {
    const el = blockRef.current;
    if (!el) return;
    el.style.transform = "";
  }

  return (
    <li
      className={cn(
        "relative flex h-full select-none flex-col perspective-stage",
        STEP_TOP_OFFSETS[index] ?? "",
      )}
    >
      {/* ── 3D Stepped Riser Connector to Next Step (Desktop) ── */}
      {index < 3 && (
        <div
          className="pointer-events-none absolute -right-6 z-30 hidden h-12 w-8 lg:block"
          style={{ top: `${(3 - index) * 30 + 22}px` }}
          aria-hidden
        >
          <svg viewBox="0 0 40 52" fill="none" className="h-full w-full overflow-visible">
            <path
              d="M 0 38 L 18 38 L 18 8 L 40 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(
                "transition-colors duration-500",
                isReached ? "text-accent" : "text-border-strong",
              )}
            />
            <circle
              cx="18"
              cy="8"
              r="3.5"
              className={cn(
                "transition-all duration-500",
                isReached
                  ? "fill-accent drop-shadow-[0_0_6px_rgba(246,110,76,0.8)]"
                  : "fill-border-strong",
              )}
            />
          </svg>
        </div>
      )}

      {/* ── Interactive 3D Escalón Column (Card + Stacked 3D Pedestal Tiers) ── */}
      <div
        ref={blockRef}
        role="button"
        tabIndex={0}
        aria-pressed={isActive}
        onPointerEnter={onActivate}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={onActivate}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onActivate();
          }
        }}
        style={
          isActive
            ? {
                transform:
                  "perspective(1200px) translate3d(-4px, -9px, 22px) rotateX(5deg) rotateY(-6deg)",
              }
            : {
                transform:
                  "perspective(1200px) translate3d(0px, 0px, 0px) rotateX(3deg) rotateY(-4deg)",
              }
        }
        className="group relative flex flex-1 cursor-pointer flex-col pr-2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] preserve-3d focus-visible:outline-2 focus-visible:outline-accent"
      >
        {/* ── 1. TOP SURFACE OF THE 3D STEP (Huella principal) ── */}
        <div
          data-active={isActive}
          className="step-card-3d relative z-20 flex flex-1 flex-col justify-between rounded-[22px] p-6 sm:p-7"
        >
          {/* Specular pointer light on top surface */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[22px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(320px circle at var(--spot-x, 50%) var(--spot-y, 25%), rgba(246, 110, 76, 0.16), transparent 68%)",
            }}
            aria-hidden
          />

          <div>
            {/* Glowing 3D Step Nosing (Nariz del escalón) */}
            <div className="relative mb-5 h-1.5 w-full overflow-hidden rounded-full bg-border" aria-hidden>
              <div
                className={cn(
                  "h-full origin-left rounded-full bg-linear-to-r from-accent via-accent-2 to-accent-3 transition-transform duration-500",
                  isActive
                    ? "scale-x-100"
                    : isReached
                      ? "scale-x-65 opacity-80"
                      : "scale-x-25 opacity-40",
                )}
              />
            </div>

            {/* 3D Floating Step Number + Ascending Step Bars */}
            <div
              className="relative flex items-center justify-between preserve-3d"
              style={{ transform: "translateZ(18px)" }}
            >
              <div className="relative">
                <span
                  className="pointer-events-none absolute left-[3px] top-[3px] select-none font-display text-4xl text-accent/20 sm:text-[2.6rem]"
                  aria-hidden
                >
                  0{index + 1}
                </span>
                <span
                  className={cn(
                    "relative block font-display text-4xl transition-colors duration-300 sm:text-[2.6rem]",
                    isActive ? "text-accent" : isReached ? "text-fg" : "text-muted",
                  )}
                >
                  0{index + 1}
                </span>
              </div>

              {/* Mini 3D Staircase Level Indicator (1..4 steps) */}
              <div className="flex items-end gap-1" aria-hidden>
                {[0, 1, 2, 3].map((bar) => (
                  <span
                    key={bar}
                    style={{ height: `${8 + bar * 4}px` }}
                    className={cn(
                      "w-1.5 rounded-sm transition-all duration-300",
                      bar <= index
                        ? isActive
                          ? "bg-accent shadow-[0_0_8px_rgba(246,110,76,0.65)]"
                          : "bg-accent/55"
                        : "bg-border-strong/50",
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Label, Title, Body */}
            <div className="relative mt-4 preserve-3d" style={{ transform: "translateZ(12px)" }}>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent-ink">
                {step.label}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-fg sm:text-xl">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </div>
          </div>
        </div>

        {/* ── 2. STACKED 3D ARCHITECTURAL STEP TIERS TO THE FLOOR (1, 2, 3, 4 Escalones 3D) ── */}
        <div className="relative z-10 flex flex-col preserve-3d" aria-hidden>
          {Array.from({ length: tierCount }).map((_, tIdx) => {
            const tierNum = tIdx + 1;
            const shiftX = tierNum * 3;
            const shiftZ = -tierNum * 8;
            return (
              <div
                key={tierNum}
                data-tier={tierNum}
                data-active={isActive || (isReached && tierNum === 1)}
                style={{
                  marginTop: "6px",
                  marginLeft: `${tIdx * 3}px`,
                  marginRight: `-${tIdx * 2}px`,
                  transform: isActive
                    ? `translate3d(${shiftX + 2}px, 0px, ${shiftZ}px)`
                    : `translate3d(${shiftX}px, 0px, ${shiftZ}px)`,
                }}
                className="step-tier-3d flex h-[24px] items-center px-4"
              >
                {/* Lit step riser light bar */}
                <div
                  className={cn(
                    "h-[2px] w-full rounded-full transition-all duration-500",
                    isActive
                      ? "bg-linear-to-r from-accent via-accent-3 to-transparent opacity-90"
                      : isReached
                        ? "bg-accent/45 opacity-60"
                        : "bg-border-strong/60 opacity-40",
                  )}
                />
              </div>
            );
          })}
        </div>
      </div>
    </li>
  );
}

export function AiJourney3D({
  title,
  lead,
  steps,
  ctaLabel,
  ctaHref = "#contacto",
}: {
  title: string;
  lead: string;
  steps: JourneyStep[];
  ctaLabel: string;
  ctaHref?: string;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [paused, setPaused] = useState(false);

  // Automatic wave climbing up the 3D steps (01 -> 02 -> 03 -> 04)
  useEffect(() => {
    if (paused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3400);
    return () => window.clearInterval(id);
  }, [paused, steps.length]);

  return (
    <div
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      className="relative isolate"
    >
      {/* Subtle 3D Perspective Grid Floor behind the steps (calibrated for both light & dark themes) */}
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-6 -z-10 h-72 overflow-hidden rounded-[32px]"
        aria-hidden
      >
        <div className="grid-plane-3d h-full w-full opacity-85" />
      </div>

      {/* Header */}
      <div className="mb-12 flex flex-col justify-between gap-6 lg:mb-14 lg:flex-row lg:items-end">
        <SectionHeading title={title} lead={lead} className="max-w-3xl" />

        {/* Interactive Step Selector Pills (01 -> 02 -> 03 -> 04) */}
        <div
          className="inline-flex items-center gap-1.5 self-start rounded-full border border-border bg-surface/90 p-1.5 shadow-(--card-shadow) backdrop-blur-md lg:self-end"
          role="tablist"
          aria-label={title}
        >
          {steps.map((s, i) => {
            const isCurrent = i === activeStep;
            return (
              <button
                key={s.title}
                type="button"
                role="tab"
                aria-selected={isCurrent}
                onClick={() => setActiveStep(i)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 font-mono text-xs font-semibold transition-all duration-300",
                  isCurrent
                    ? "bg-linear-to-r from-accent to-accent-2 text-white shadow-[0_6px_18px_-4px_rgba(246,110,76,0.65)]"
                    : i < activeStep
                      ? "text-accent-ink hover:bg-surface-2"
                      : "text-muted hover:text-fg",
                )}
              >
                0{i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 3D Ascending Staircase (Escalones 3D: 01 low -> 04 high, grounded on a unified base) ── */}
      <ol className="relative grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {steps.map((step, i) => (
          <StepBlock3D
            key={step.title}
            step={step}
            index={i}
            isActive={i === activeStep}
            isReached={i <= activeStep}
            onActivate={() => setActiveStep(i)}
          />
        ))}
      </ol>

      {/* ── CTA Button & Ascending Progress Bar ── */}
      <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8">
        <Button href={ctaHref} className="h-auto min-h-[52px] py-3 text-center">
          {ctaLabel}
          <ArrowUpRight size={17} className="shrink-0" aria-hidden />
        </Button>

        {/* Visual Stepped Progress Indicator */}
        <div className="flex items-center gap-2" aria-hidden>
          {steps.map((s, idx) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={cn(
                "h-2 rounded-full transition-all duration-500",
                idx === activeStep
                  ? "w-10 bg-accent"
                  : idx < activeStep
                    ? "w-4 bg-accent/55"
                    : "w-3 bg-border-strong",
              )}
              tabIndex={-1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
