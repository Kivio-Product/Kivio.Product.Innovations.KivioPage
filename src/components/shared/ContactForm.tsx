"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n";
import { Button } from "@/components/ui/Button";
import { social } from "@/lib/utils";

export function ContactForm({ dict, id = "contacto" }: { dict: Dictionary; id?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const body = {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        phone: data.get("phone"),
        email: data.get("email"),
        message: data.get("message"),
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
      window.location.href = `mailto:${social.email}?subject=Contacto KIVIO&body=${encodeURIComponent(
        `${data.get("firstName")} ${data.get("lastName")}\n${data.get("phone")}\n${data.get("email")}\n\n${data.get("message")}`,
      )}`;
      setStatus("error");
    }
  }

  return (
    <form id={id} onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-muted">
          {dict.form.firstName} *
        </span>
        <input required name="firstName" className="form-control" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-muted">
          {dict.form.lastName} *
        </span>
        <input required name="lastName" className="form-control" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-muted">
          {dict.form.phone} *
        </span>
        <input required name="phone" type="tel" className="form-control" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-muted">
          {dict.form.email} *
        </span>
        <input required name="email" type="email" className="form-control" />
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-sm font-medium text-muted">
          {dict.form.message} *
        </span>
        <textarea required name="message" rows={5} className="form-control resize-y min-h-[140px]" />
      </label>
      <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? dict.common.sending : dict.common.send}
        </Button>
        {status === "sent" && <p className="text-sm text-accent">{dict.common.sent}</p>}
        {status === "error" && <p className="text-sm text-muted">{dict.common.sendError}</p>}
      </div>
    </form>
  );
}

export function ContactBlock({ dict }: { dict: Dictionary }) {
  return (
    <section id="contacto" className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 hero-glow" />
      <div className="mx-auto grid w-full max-w-[1180px] gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            {dict.common.contactUs}
          </p>
          <h2 className="font-display text-4xl leading-tight text-fg sm:text-5xl">{dict.home.contactTitle}</h2>
          <p className="mt-4 max-w-md text-muted">{dict.home.contactLead}</p>
        </div>
        <div className="rounded-[25px] border border-border bg-surface p-6 shadow-(--card-shadow) sm:p-8">
          <ContactForm dict={dict} />
        </div>
      </div>
    </section>
  );
}
