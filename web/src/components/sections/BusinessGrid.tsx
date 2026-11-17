import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LogoSymbol } from "@/components/brand/Logo";
import { businesses, accentStyle, type BusinessSlug } from "@/data/businesses";
import { cn } from "@/lib/utils";

/** Compact four-up grid of the divisions. Optionally highlights the current one. */
export function BusinessGrid({ current }: { current?: BusinessSlug }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {businesses.map((b) => {
        const isCurrent = b.slug === current;
        return (
          <li key={b.slug} data-reveal style={accentStyle(b.accent)} className="overflow-hidden rounded-t-[32px] bg-paper">
            <Link
              href={`/businesses/${b.slug}`}
              aria-current={isCurrent ? "page" : undefined}
              className={cn("group relative flex h-full flex-col gap-4 p-7 transition-colors duration-300 hover:bg-cream", isCurrent && "bg-cream")}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "accent-bg absolute inset-x-0 top-0 transition-[height] duration-300 ease-out-quint",
                  isCurrent ? "h-1.5" : "h-[3px] group-hover:h-1.5",
                )}
              />
              <span className="flex items-start justify-between">
                <span className="eyebrow text-[0.6875rem] text-muted">
                  {b.stageNo} · {b.stage}
                </span>
                <LogoSymbol className="accent-text h-6 w-auto" />
              </span>
              <span className="display mt-6 text-[1.5rem] leading-tight">{b.name}</span>
              <span className="text-[0.9375rem] leading-relaxed text-muted">{b.summary}</span>
              <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold">
                {isCurrent ? "You are here" : "Explore"}
                {!isCurrent && (
                  <ArrowRight aria-hidden="true" strokeWidth={1.75} className="accent-text size-4 transition-transform group-hover:translate-x-1" />
                )}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
