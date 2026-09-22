"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Ambient background video (Shopify pattern), performance-first:
 * - SSR paints only the poster image (LCP-safe, zero video bytes on first render)
 * - src attaches after window `load` + idle, and only when the block is ~600px away
 * - Skips entirely on prefers-reduced-motion, saveData or low-memory devices
 * - Pauses offscreen and on hidden tabs; fades in once playing
 * - Optional per-theme variant: light themes play `lightLg/lightMd` with `lightPoster`
 */
export function AmbientVideo({
  lg,
  md,
  poster,
  lightLg,
  lightMd,
  lightPoster,
  intensity = "hero",
  priority = false,
  mediaClassName,
  veil,
  blend = true,
  videoOpacity = 1,
}: {
  lg: string;
  md: string;
  poster: string;
  lightLg?: string;
  lightMd?: string;
  lightPoster?: string;
  intensity?: "hero" | "section";
  priority?: boolean;
  mediaClassName?: string;
  /** overlay strength; defaults to `intensity`. Use "none" for card visuals */
  veil?: "hero" | "section" | "none";
  /** fade the bottom edge into the page background (disable inside framed cards) */
  blend?: boolean;
  /** final video opacity once playing (intermediate values keep copy readable) */
  videoOpacity?: number;
}) {
  const veilClass =
    (veil ?? intensity) === "none"
      ? null
      : (veil ?? intensity) === "hero"
        ? "bg-white/70 dark:bg-black/35"
        : "bg-white/88 dark:bg-black/65";
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wantedRef = useRef(false);
  const readyRef = useRef(false);
  const srcRef = useRef("");
  const [playing, setPlaying] = useState(false);
  const [isLight, setIsLight] = useState(false);

  /* follow the site theme (the class is set before paint by ThemeScript) */
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsLight(!root.classList.contains("dark"));
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  const activeLg = isLight && lightLg ? lightLg : lg;
  const activeMd = isLight && lightMd ? lightMd : md;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !wrapRef.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
    if (nav.connection?.saveData) return;
    if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 2) return;

    /* keep the active source in a ref so late callbacks always use the current one */
    srcRef.current = window.innerWidth < 768 ? activeMd : activeLg;

    /* theme switched → drop the previous source; maybeStart() below re-attaches */
    if (video.src && !video.src.endsWith(srcRef.current)) {
      video.removeAttribute("src");
      video.load();
      setPlaying(false);
    }

    const maybeStart = () => {
      const next = srcRef.current;
      if (!wantedRef.current || !readyRef.current || !next) return;
      if (video.src && video.src.endsWith(next)) {
        video.play().catch(() => {});
        return;
      }
      video.src = next;
      video.load();
      video.play().catch(() => {});
    };

    const markReady = () => {
      readyRef.current = true;
      maybeStart();
    };
    const kickoff = () => {
      const idle =
        "requestIdleCallback" in window
          ? (cb: () => void) => (window as Window & typeof globalThis).requestIdleCallback(cb, { timeout: 2500 })
          : (cb: () => void) => window.setTimeout(cb, 1200);
      idle(markReady);
    };
    if (document.readyState === "complete") kickoff();
    else window.addEventListener("load", kickoff, { once: true });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          wantedRef.current = true;
          maybeStart();
          if (video.src) video.play().catch(() => {});
        } else {
          wantedRef.current = false;
          if (video.src) video.pause();
        }
      },
      { rootMargin: "600px 0px", threshold: 0 },
    );
    io.observe(wrapRef.current);

    const onVisibility = () => {
      if (!video.src) return;
      if (document.hidden) video.pause();
      else if (wantedRef.current) video.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);

    /* iOS (Low Power Mode / Low Data Mode) blocks muted autoplay until the first user
       gesture: retry on the first touch, scroll or key press, then stop listening. */
    const gestureEvents: (keyof WindowEventMap)[] = ["touchstart", "pointerdown", "click", "scroll", "keydown"];
    const removeGestureListeners = () => {
      gestureEvents.forEach((event) => window.removeEventListener(event, onGesture));
    };
    const onGesture = () => {
      if (!wantedRef.current || !video.src) return;
      video
        .play()
        .then(() => removeGestureListeners())
        .catch(() => {});
    };
    gestureEvents.forEach((event) => window.addEventListener(event, onGesture, { passive: true }));

    /* covers the theme-swap re-run: attaches the new source if the block is already wanted */
    maybeStart();

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("load", kickoff);
      removeGestureListeners();
    };
  }, [activeLg, activeMd]);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* poster for the active theme (theme script runs before paint) */}
      <Image
        src={poster}
        alt=""
        fill
        priority={priority && !lightPoster}
        sizes="100vw"
        className={cn("object-cover", mediaClassName, lightPoster && "hidden dark:block")}
      />
      {lightPoster && (
        <Image
          src={lightPoster}
          alt=""
          fill
          sizes="100vw"
          className={cn("block object-cover dark:hidden", mediaClassName)}
        />
      )}

      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        controlsList="nofollow nofullscreen nodownload noplaybackrate noremoteplayback"
        onPlaying={() => setPlaying(true)}
        style={{ opacity: playing ? videoOpacity : 0 }}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-out motion-reduce:transition-none",
          mediaClassName,
        )}
      />

      {/* theme-aware veil: keeps copy readable and the surface aligned with the active theme */}
      {veilClass && <div className={cn("absolute inset-0", veilClass)} />}

      {/* seamless blend into the page background */}
      {blend && <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-b from-transparent to-bg" />}
    </div>
  );
}
