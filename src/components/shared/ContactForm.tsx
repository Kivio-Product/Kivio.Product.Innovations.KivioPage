"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/motion/motion";
import { AmbientVideo } from "@/components/shared/AmbientVideo";
import { social } from "@/lib/utils";

type ContactFormOptions = {
  context?: { service: string };
  submitLabel?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
};

export function ContactForm({
  dict,
  id = "contacto",
  context,
  submitLabel,
  messageLabel,
  messagePlaceholder,
}: { dict: Dictionary; id?: string } & ContactFormOptions) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const sourcePath = window.location.pathname;
    const organization = String(data.get("organizationName") ?? "").trim();
    const message = context
      ? [
          `${dict.form.service}: ${context.service}`,
          ...(organization ? [`${dict.form.organization}: ${organization}`] : []),
          "",
          String(data.get("message") ?? ""),
        ].join("\n")
      : String(data.get("message") ?? "");
    setStatus("sending");
    setFallbackUrl(null);
    try {
      const body = {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        phone: data.get("phone"),
        email: data.get("email"),
        message,
        sourcePath,
        company: data.get("company"),
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("sent");
      form.reset();
    } catch {
      setFallbackUrl(`mailto:${social.email}?subject=${encodeURIComponent(`[${sourcePath}] ${context?.service ?? "Contacto KIVIO"}`)}&body=${encodeURIComponent(
        `${data.get("firstName")} ${data.get("lastName")}\n${data.get("phone")}\n${data.get("email")}\n${dict.form.source}: ${sourcePath}\n\n${message}`,
      )}`);
      setStatus("error");
    }
  }

  return (
    <form id={id} onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-muted">
          {dict.form.firstName} *
        </span>
        <input required name="firstName" autoComplete="given-name" maxLength={80} className="form-control" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-muted">
          {dict.form.lastName} *
        </span>
        <input required name="lastName" autoComplete="family-name" maxLength={80} className="form-control" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-muted">
          {dict.form.phone} *
        </span>
        <input required name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={30} className="form-control" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-muted">
          {dict.form.email} *
        </span>
        <input required name="email" type="email" autoComplete="email" maxLength={254} className="form-control" />
      </label>
      {context && (
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-muted">
            {dict.form.organization} <span className="font-normal">({dict.form.optional})</span>
          </span>
          <input name="organizationName" autoComplete="organization" maxLength={160} className="form-control" />
        </label>
      )}
      <label className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <span>Company</span>
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-sm font-medium text-muted">
          {messageLabel ?? dict.form.message} *
        </span>
        <textarea
          required
          name="message"
          rows={5}
          minLength={5}
          maxLength={context ? 2400 : 3000}
          placeholder={messagePlaceholder}
          className="form-control resize-y min-h-[140px]"
        />
      </label>
      <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === "sending"} className="h-auto min-h-[52px] py-3 text-center">
          {status === "sending" ? dict.common.sending : (submitLabel ?? dict.common.send)}
        </Button>
        <p role="status" aria-live="polite" className="text-sm">
          {status === "sent" && <span className="text-accent">{dict.common.sent}</span>}
          {status === "error" && (
            <span className="text-muted">
              {dict.common.sendError}{" "}
              {fallbackUrl && <a href={fallbackUrl} className="font-medium text-accent-ink underline underline-offset-4">{social.email}</a>}
            </span>
          )}
        </p>
      </div>
    </form>
  );
}

export function ContactBlock({
  dict,
  video,
  title,
  lead,
  note,
  formOptions,
}: {
  dict: Dictionary;
  video?: { lg: string; md: string; poster: string };
  title?: string;
  lead?: string;
  note?: string;
  formOptions?: ContactFormOptions;
}) {
  return (
    <section id="contacto" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24">
      {video && <AmbientVideo lg={video.lg} md={video.md} poster={video.poster} intensity="section" />}
      <div className="pointer-events-none absolute inset-0 hero-glow" />
      <div className="mx-auto grid w-full max-w-[1180px] gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
        <FadeUp>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            {dict.common.contactUs}
          </p>
          <h2 className="font-display text-4xl leading-tight text-fg sm:text-5xl">{title ?? dict.home.contactTitle}</h2>
          <p className="mt-4 max-w-md leading-relaxed text-muted">{lead ?? dict.home.contactLead}</p>
          {note && <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">{note}</p>}
        </FadeUp>
        <FadeUp delay={100}>
          <div className="glass rounded-[25px] p-6 shadow-(--card-shadow) sm:p-8">
            <ContactForm dict={dict} id="contacto-form" {...formOptions} />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
