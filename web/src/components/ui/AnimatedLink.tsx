import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/** Text link with an expanding underline and a nudging arrow. Underline uses --accent when set. */
export function AnimatedLink({
  href,
  children,
  className,
  tone = "dark",
  "aria-label": ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
  "aria-label"?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        "group relative inline-flex items-center gap-2 py-1 text-[0.9375rem] font-semibold",
        tone === "light" ? "text-paper" : "text-ink",
        className,
      )}
    >
      <span>{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-200 ease-out-quint group-hover:translate-x-1"
        strokeWidth={1.75}
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-[0.35] bg-[var(--accent,currentColor)] transition-transform duration-300 ease-out-quint group-hover:scale-x-100"
      />
    </Link>
  );
}
