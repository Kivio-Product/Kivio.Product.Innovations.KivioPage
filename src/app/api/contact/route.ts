import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16_384;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9+()\-.\s]{5,30}$/;

type Lead = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
};

function respond(data: Record<string, unknown>, status: number, headers?: HeadersInit) {
  return NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

function clientIp(req: Request) {
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",").at(-1)?.trim() ?? "unknown";
  return "unknown";
}

async function readLimited(req: Request, max: number) {
  const declared = Number(req.headers.get("content-length") ?? "");
  if (Number.isFinite(declared) && declared > max) return null;
  if (!req.body) return "";

  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > max) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }

  const merged = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(merged);
}

function cleanLine(value: unknown, max: number) {
  if (typeof value !== "string") return null;
  const clean = value
    .replace(/[\r\n\t]+/g, " ")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim();
  if (!clean || clean.length > max) return null;
  return clean;
}

function cleanMessage(value: unknown, max: number) {
  if (typeof value !== "string") return null;
  const clean = value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .trim();
  if (clean.length < 5 || clean.length > max) return null;
  return clean;
}

function validate(body: unknown): Lead | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const raw = body as Record<string, unknown>;

  const firstName = cleanLine(raw.firstName, 80);
  const lastName = cleanLine(raw.lastName, 80);
  const phone = cleanLine(raw.phone, 30);
  const email = cleanLine(raw.email, 254)?.toLowerCase() ?? null;
  const message = cleanMessage(raw.message, 3000);

  if (!firstName || !lastName || !phone || !email || !message) return null;
  if (!EMAIL_RE.test(email)) return null;
  if (!PHONE_RE.test(phone)) return null;

  return { firstName, lastName, phone, email, message };
}

async function deliver(lead: Lead) {
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "KIVIO Web <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO ?? "admin@kivio.com.co"],
        reply_to: lead.email,
        subject: `Nuevo contacto web — ${lead.firstName} ${lead.lastName}`,
        text: [
          `Nombre: ${lead.firstName} ${lead.lastName}`,
          `Teléfono: ${lead.phone}`,
          `Correo: ${lead.email}`,
          "",
          lead.message,
        ].join("\n"),
      }),
    });
    if (!res.ok) throw new Error(`resend ${res.status}`);
    return true;
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return true;
  }

  return false;
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  const limit = rateLimit(`contact:${ip}`);
  if (!limit.ok) {
    return respond({ ok: false, error: "rate_limited" }, 429, {
      "Retry-After": String(limit.retryAfter),
    });
  }

  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return respond({ ok: false, error: "unsupported_media_type" }, 415);
  }

  const raw = await readLimited(req, MAX_BODY_BYTES);
  if (raw === null) return respond({ ok: false, error: "payload_too_large" }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return respond({ ok: false, error: "invalid_json" }, 400);
  }

  if (body && typeof body === "object" && !Array.isArray(body)) {
    const honeypot = (body as Record<string, unknown>).company;
    if (typeof honeypot === "string" && honeypot.trim() !== "") {
      return respond({ ok: true }, 200);
    }
  }

  const lead = validate(body);
  if (!lead) return respond({ ok: false, error: "invalid_fields" }, 400);

  try {
    const delivered = await deliver(lead);
    if (!delivered) return respond({ ok: false, error: "not_configured" }, 503);
    return respond({ ok: true }, 200);
  } catch {
    return respond({ ok: false, error: "delivery_failed" }, 502);
  }
}
