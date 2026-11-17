import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { accentStyle, type Business } from "@/data/businesses";

/** One lifecycle stage. Desktop shows a rail marker (driven by LifecycleProgress); mobile is a stacked card. */
export function BusinessStageCard({ business: b }: { business: Business }) {
  return (
    <Reveal
      as="article"
      data-stage-panel=""
      aria-labelledby={`stage-${b.slug}`}
      style={accentStyle(b.accent)}
      className="group/panel relative grid gap-8 border-t border-line py-10 first:border-t-0 lg:grid-cols-[24px_minmax(0,5fr)_minmax(0,6fr)] lg:gap-x-[var(--gutter)] lg:py-16"
    >
      {/* Rail marker (desktop) */}
      <div aria-hidden="true" className="relative hidden lg:block">
        <span className="absolute top-3 left-[5px] size-[13px] rounded-full border-2 border-line bg-paper transition-[background-color,border-color,transform] duration-300 group-data-[active=true]/panel:scale-110 group-data-[active=true]/panel:border-[var(--accent)] group-data-[active=true]/panel:bg-[var(--accent)]" />
      </div>

      {/* Mobile accent bar */}
      <span aria-hidden="true" className="accent-bg absolute top-0 left-0 h-[3px] w-12 lg:hidden" />

      <div className="flex flex-col">
        <div data-reveal className="mb-6 flex items-baseline gap-4">
          <span className="display text-[clamp(3.5rem,6vw,5.5rem)] leading-none tabular-nums transition-colors duration-500 group-data-[active=true]/panel:text-[var(--accent)]">
            {b.stageNo}
          </span>
          <span className="eyebrow flex items-center gap-2 text-muted">
            <span aria-hidden="true" className="accent-bg size-2" />
            {b.stage}
          </span>
        </div>
        <h3 id={`stage-${b.slug}`} data-reveal className="display mb-4 text-[clamp(1.75rem,2.6vw,2.5rem)]">
          {b.name}
        </h3>
        <p data-reveal className="mb-6 max-w-[44ch] text-[1.0625rem] leading-relaxed text-muted">
          {b.summary}
        </p>
        <ul data-reveal className="mb-8 flex flex-wrap gap-2">
          {b.products.map((p) => (
            <li key={p.name} className="rounded-full border border-line px-3 py-1 text-[0.8125rem] text-ink/80">
              {p.name}
            </li>
          ))}
        </ul>
        <div data-reveal className="mt-auto">
          <Link
            href={`/businesses/${b.slug}`}
            className="group/link relative inline-flex items-center gap-2 py-1 text-[0.9375rem] font-semibold"
          >
            Explore {b.name}
            <ArrowRight aria-hidden="true" strokeWidth={1.75} className="accent-text size-4 transition-transform duration-200 group-hover/link:translate-x-1" />
            <span aria-hidden="true" className="accent-bg absolute inset-x-0 bottom-0 h-[1.5px] origin-left scale-x-[0.3] transition-transform duration-300 ease-out-quint group-hover/link:scale-x-100" />
          </Link>
        </div>
      </div>

      <div data-reveal className="group overflow-hidden">
        <MediaFrame
          media={b.image}
          accent={b.accent}
          tag={`${b.stageNo} · ${b.stage}`}
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="aspect-[16/11] w-full rounded-[24px]"
        />
      </div>
    </Reveal>
  );
}
