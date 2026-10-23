"use client";

import { useEffect } from "react";
import { ctaIds, trackEvent, type CtaId } from "@/lib/analytics";

export function InteractionTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>("[data-analytics-cta]");
      const id = element?.dataset.analyticsCta;
      if (id && ctaIds.includes(id as CtaId)) trackEvent("ai_cta_click", id as CtaId);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
