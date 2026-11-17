import { NextResponse, type NextRequest } from "next/server";
import { enquiryCategories } from "@/data/navigation";
import { normalise, validate } from "@/lib/contact";

/**
 * Contact enquiries. Delivery is via Resend's REST API when configured.
 * Server-only env vars: RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL.
 * Without them the route answers 503 `not_configured`, and the UI never claims success.
 */

const MAX_BODY_BYTES = 16 * 1024;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Best-effort, per-instance limiter. Use a shared store (e.g. Upstash/KV) for multi-instance production.
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function sameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

const json = (status: number, body: Record<string, unknown>) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return json(403, { ok: false, code: "forbidden", message: "Request not allowed." });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return json(429, { ok: false, code: "rate_limited", message: "Too many requests. Please try again later." });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return json(413, { ok: false, code: "too_large", message: "Your message is too long." });

  let input: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("invalid");
    input = parsed as Record<string, unknown>;
  } catch {
    return json(400, { ok: false, code: "invalid", message: "Invalid request." });
  }

  const payload = normalise(input);
  // Honeypot filled: quietly accept without sending.
  if (payload.website) return json(200, { ok: true });

  const errors = validate(payload);
  if (Object.keys(errors).length) {
    return json(400, { ok: false, code: "validation", message: "Please check the highlighted fields.", errors });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return json(503, { ok: false, code: "not_configured", message: "Online enquiries are not connected yet." });
  }

  const categoryLabel = enquiryCategories.find((c) => c.id === payload.category)?.label ?? "General Enquiry";
  const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").slice(0, 120);
  const text = [
    `Category: ${categoryLabel}`,
    `Name: ${payload.name}`,
    `Organisation: ${payload.organisation || "-"}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "-"}`,
    "",
    payload.message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: payload.email,
        subject: oneLine(`Website enquiry: ${categoryLabel} (${payload.name})`),
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[contact] delivery failed with status", res.status);
      return json(502, { ok: false, code: "delivery_failed", message: "We couldn't send your message. Please try again later." });
    }
  } catch {
    console.error("[contact] delivery request error");
    return json(502, { ok: false, code: "delivery_failed", message: "We couldn't send your message. Please try again later." });
  }

  return json(200, { ok: true });
}
