import { enquiryCategories, type EnquiryCategory } from "@/data/navigation";

/** Shared by the client form and the server route so both validate identically. */
export interface ContactPayload {
  name: string;
  organisation: string;
  email: string;
  phone: string;
  category: EnquiryCategory;
  message: string;
  /** Honeypot: must stay empty. */
  website?: string;
}

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

export const LIMITS = { name: 100, organisation: 150, email: 254, phone: 20, message: 4000 } as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+]?[\d\s()-]{7,20}$/;
const categoryIds = new Set<string>(enquiryCategories.map((c) => c.id));

export function isCategory(value: unknown): value is EnquiryCategory {
  return typeof value === "string" && categoryIds.has(value);
}

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export function normalise(input: Record<string, unknown>): ContactPayload {
  return {
    name: str(input.name),
    organisation: str(input.organisation),
    email: str(input.email).toLowerCase(),
    phone: str(input.phone),
    category: isCategory(input.category) ? input.category : "general",
    message: str(input.message),
    website: str(input.website),
  };
}

export function validate(p: ContactPayload): ContactErrors {
  const e: ContactErrors = {};
  if (!p.name) e.name = "Please enter your full name.";
  else if (p.name.length > LIMITS.name) e.name = `Please keep your name under ${LIMITS.name} characters.`;

  if (p.organisation.length > LIMITS.organisation) e.organisation = `Please keep this under ${LIMITS.organisation} characters.`;

  if (!p.email) e.email = "Please enter your email address.";
  else if (p.email.length > LIMITS.email || !EMAIL_RE.test(p.email)) e.email = "Please enter a valid email address.";

  if (p.phone && !PHONE_RE.test(p.phone)) e.phone = "Please enter a valid phone number, or leave it blank.";

  if (!p.message) e.message = "Please tell us how we can help.";
  else if (p.message.length < 10) e.message = "Please add a little more detail (at least 10 characters).";
  else if (p.message.length > LIMITS.message) e.message = `Please keep your message under ${LIMITS.message} characters.`;

  return e;
}
