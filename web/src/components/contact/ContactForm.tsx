"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Info } from "@/components/ui/icons";
import { enquiryCategories, type EnquiryCategory } from "@/data/navigation";
import { LIMITS, normalise, validate, type ContactErrors, type ContactPayload } from "@/lib/contact";
import { cn } from "@/lib/utils";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

interface ContactFormProps {
  initialCategory?: EnquiryCategory;
  deliveryConfigured: boolean;
  fallbackEmail: string | null;
}

const FIELD_ORDER: (keyof ContactPayload)[] = ["name", "organisation", "email", "phone", "category", "message"];

export function ContactForm({ initialCategory = "general", deliveryConfigured, fallbackEmail }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const fieldId = (name: string) => `${uid}-${name}`;
  const errorId = (name: string) => `${uid}-${name}-error`;

  const focusFirstError = (errs: ContactErrors) => {
    const first = FIELD_ORDER.find((f) => errs[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!deliveryConfigured || status.kind === "submitting") return;

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const payload = normalise(data);
    const errs = validate(payload);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus({ kind: "error", message: "Please check the highlighted fields." });
      focusFirstError(errs);
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; errors?: ContactErrors };
      if (res.ok && body.ok) {
        setStatus({ kind: "success" });
        formRef.current?.reset();
        return;
      }
      if (body.errors) {
        setErrors(body.errors);
        focusFirstError(body.errors);
      }
      setStatus({ kind: "error", message: body.message ?? "We couldn't send your message. Please try again later." });
    } catch {
      setStatus({ kind: "error", message: "We couldn't reach the server. Please check your connection and try again." });
    }
  }

  if (status.kind === "success") {
    return (
      <div role="status" className="flex flex-col gap-4 border border-ink p-8 md:p-10">
        <CheckCircle2 aria-hidden="true" className="size-8 text-recycling" strokeWidth={1.5} />
        <p className="display text-[1.75rem]">Thank you. Your message has been sent.</p>
        <p className="text-muted">Our team will review your enquiry and get back to you.</p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-2 w-fit text-sm font-semibold underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputBase =
    "w-full rounded-[2px] border bg-paper px-4 py-3 text-[1rem] text-ink transition-colors placeholder:text-muted/70 focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-identity disabled:bg-offwhite";
  const border = (name: keyof ContactPayload) => (errors[name] ? "border-safety" : "border-line hover:border-ink/40");

  const describe = (name: keyof ContactPayload, hintId?: string) =>
    [errors[name] ? errorId(name) : null, hintId].filter(Boolean).join(" ") || undefined;

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby={`${uid}-status`} className="flex flex-col gap-6">
      {!deliveryConfigured && (
        <div role="note" className="flex gap-3 border border-line bg-offwhite p-5 text-[0.9375rem]">
          <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0" strokeWidth={1.75} />
          <div>
            <p className="font-semibold">Online enquiries are not connected yet.</p>
            <p className="mt-1 text-muted">
              {fallbackEmail ? (
                <>
                  Please email us at{" "}
                  <a href={`mailto:${fallbackEmail}`} className="font-medium text-ink underline underline-offset-4">
                    {fallbackEmail}
                  </a>{" "}
                  and we&apos;ll route your enquiry to the right team.
                </>
              ) : (
                "This form will be enabled shortly. Until then, please contact our corporate office in Gurugram, Haryana."
              )}
            </p>
          </div>
        </div>
      )}

      <fieldset disabled={!deliveryConfigured} className="grid gap-6 sm:grid-cols-2">
        <legend className="sr-only">Your details</legend>

        <Field label="Full name" htmlFor={fieldId("name")} required error={errors.name} errorId={errorId("name")}>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describe("name")}
            className={cn(inputBase, border("name"))}
          />
        </Field>

        <Field label="Company / organisation" htmlFor={fieldId("organisation")} error={errors.organisation} errorId={errorId("organisation")}>
          <input
            id={fieldId("organisation")}
            name="organisation"
            type="text"
            autoComplete="organization"
            maxLength={LIMITS.organisation}
            aria-invalid={Boolean(errors.organisation)}
            aria-describedby={describe("organisation")}
            className={cn(inputBase, border("organisation"))}
          />
        </Field>

        <Field label="Email" htmlFor={fieldId("email")} required error={errors.email} errorId={errorId("email")}>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={LIMITS.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describe("email")}
            className={cn(inputBase, border("email"))}
          />
        </Field>

        <Field label="Phone" htmlFor={fieldId("phone")} error={errors.phone} errorId={errorId("phone")}>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={LIMITS.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describe("phone")}
            className={cn(inputBase, border("phone"))}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Enquiry category" htmlFor={fieldId("category")} required error={errors.category} errorId={errorId("category")}>
            <select
              id={fieldId("category")}
              name="category"
              defaultValue={initialCategory}
              required
              aria-invalid={Boolean(errors.category)}
              aria-describedby={describe("category")}
              className={cn(inputBase, border("category"), "appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10")}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230a0a0a' stroke-width='1.75'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
              }}
            >
              {enquiryCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Message" htmlFor={fieldId("message")} required error={errors.message} errorId={errorId("message")}>
            <textarea
              id={fieldId("message")}
              name="message"
              rows={6}
              required
              maxLength={LIMITS.message}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={describe("message")}
              className={cn(inputBase, border("message"), "resize-y")}
            />
          </Field>
        </div>

        {/* Honeypot: hidden from people and assistive tech. */}
        <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
          <label htmlFor={fieldId("website")}>Website</label>
          <input id={fieldId("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </fieldset>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.8125rem] text-muted">Fields marked * are required.</p>
        <button
          type="submit"
          disabled={!deliveryConfigured || status.kind === "submitting"}
          className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-[2px] border border-ink bg-ink px-7 text-[0.9375rem] font-semibold text-paper transition-[background-color,transform] duration-200 hover:bg-[#262626] active:scale-[0.97] disabled:cursor-not-allowed disabled:border-line disabled:bg-surface disabled:text-muted disabled:active:scale-100"
        >
          {!deliveryConfigured ? "Online enquiries coming soon" : status.kind === "submitting" ? "Sending…" : "Send enquiry"}
          {deliveryConfigured && status.kind !== "submitting" && (
            <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-4 transition-transform group-hover:translate-x-1" />
          )}
        </button>
      </div>

      <div id={`${uid}-status`} aria-live="polite" role="status">
        {status.kind === "error" && (
          <p className="flex items-start gap-2 border-l-2 border-safety pl-3 text-[0.9375rem]">
            <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-safety" strokeWidth={1.75} />
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  error,
  errorId,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  errorId: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-[0.875rem] font-medium">
        {label}
        {required && (
          <span aria-hidden="true" className="text-muted">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={errorId} className="text-[0.8125rem] text-[#b42318]">
          {error}
        </p>
      )}
    </div>
  );
}
