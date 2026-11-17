import type { ReactNode } from "react";
import { BrandMark } from "@/components/brand/BrandMark";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "dark" | "light";
  id?: string;
  as?: "h1" | "h2";
  className?: string;
  /** Layout: title and intro side by side (split) or stacked. */
  layout?: "split" | "stacked";
  /** Optional element aligned to the right of the title (e.g. carousel controls). */
  action?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "dark",
  id,
  as: Tag = "h2",
  className,
  layout = "split",
  action,
}: SectionHeadingProps) {
  const light = tone === "light";
  return (
    <header
      className={cn(
        "grid gap-x-[var(--gutter)] gap-y-5",
        layout === "split" ? "lg:grid-cols-12 lg:items-end" : "",
        className,
      )}
    >
      <p data-reveal className={cn("eyebrow flex items-center gap-2.5", layout === "split" && "lg:col-span-12", light ? "text-paper" : "text-ink")}>
        <BrandMark />
        {eyebrow}
      </p>
      <Tag
        id={id}
        data-reveal
        className={cn(
          "display text-[clamp(2.125rem,4.2vw,3.5rem)] text-balance",
          layout === "split" ? (action ? "lg:col-span-8" : "lg:col-span-7") : "max-w-[20ch]",
        )}
      >
        {title}
      </Tag>
      {action ? (
        <div data-reveal className="lg:col-span-4 lg:justify-self-end">
          {action}
        </div>
      ) : (
        intro && (
          <div
            data-reveal
            className={cn(
              "max-w-[42ch] text-[1.0625rem] leading-relaxed",
              light ? "text-white/70" : "text-muted",
              layout === "split" ? "lg:col-span-5 lg:pb-1.5" : "",
            )}
          >
            {intro}
          </div>
        )
      )}
    </header>
  );
}
