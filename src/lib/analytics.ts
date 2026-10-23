export const ctaIds = [
  "ai_hero_contact",
  "ai_hero_guide",
  "ai_journey_contact",
  "ai_guide_contact",
  "ai_related_product",
  "ai_experience",
] as const;

export type CtaId = (typeof ctaIds)[number];
type AnalyticsEvent = "ai_cta_click" | "ai_form_start" | "generate_lead";

/** Only fixed identifiers and the canonical path enter the data layer, never form values. */
export function trackEvent(event: AnalyticsEvent, ctaId?: CtaId) {
  if (typeof window === "undefined") return;
  const pagePath = window.location.pathname.replace(/\/$/, "");
  const match = /^\/(es|en)(?:\/[a-z0-9-]+)*$/.exec(pagePath);
  if (!match) return;
  const isAi = /^\/(es|en)\/ia$/.test(pagePath);
  if (event !== "generate_lead" && !isAi) return;
  const analyticsWindow = window as Window & { dataLayer?: Record<string, unknown>[] };
  analyticsWindow.dataLayer ??= [];
  analyticsWindow.dataLayer.push({
    event,
    page_path: pagePath,
    content_language: match[1],
    service_name: isAi ? "ai_consulting" : "general_contact",
    form_id: isAi ? "ai_consulting_contact" : "contact",
    // Explicitly clear this value so a later lead cannot inherit the preceding CTA.
    cta_id: ctaId ?? "not_applicable",
  });
}
