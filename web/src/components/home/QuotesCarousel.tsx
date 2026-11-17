"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { businesses } from "@/data/businesses";
import { quotes, quoteSource } from "@/data/quotes";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const accentFor = (slug: string | null) => businesses.find((b) => b.slug === slug)?.accent ?? "#0A0A0A";
const initials = (name: string) => {
  const parts = name.split(" ").filter(Boolean);
  return `${parts[0]?.[0] ?? ""}${parts.length > 1 ? parts[parts.length - 1][0] : ""}`;
};

/** Two slanted blocks: the reference's quote mark, drawn in the speaker's accent. */
function QuoteMark({ color }: { color: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 52 22" className="h-[22px] w-[52px]" fill={color}>
      <path d="M0 0h22l-6 22H0z" />
      <path d="M28 0h24l-6 22H28z" />
    </svg>
  );
}

export function QuotesCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const t = trackRef.current;
    const thumb = thumbRef.current;
    if (!t || !thumb) return;
    const max = t.scrollWidth - t.clientWidth;
    const visible = t.clientWidth / t.scrollWidth;
    const progress = max > 0 ? t.scrollLeft / max : 0;
    // Thumb width = visible share of the track; position = scroll progress.
    gsap.to(thumb, { width: `${Math.max(visible, 0.12) * 100}%`, left: `${progress * (1 - Math.max(visible, 0.12)) * 100}%`, duration: 0.25, ease: "power2.out", overwrite: true });
    setEdges({ start: t.scrollLeft < 4, end: t.scrollLeft > max - 4 });
  }, []);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    update();
    t.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      t.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const go = (dir: 1 | -1) => {
    const t = trackRef.current;
    if (!t) return;
    const card = t.querySelector<HTMLElement>("li");
    const step = card ? card.offsetWidth + 16 : t.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    t.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  const controls = (
    <div className="flex items-center gap-6">
      <span aria-hidden="true" className="relative hidden h-px w-56 bg-ink/20 sm:block">
        <span ref={thumbRef} className="absolute top-1/2 left-0 h-[2px] w-1/4 -translate-y-1/2 bg-ink" />
      </span>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={edges.start}
          aria-label="Previous statements"
          className="flex size-11 items-center justify-center rounded-full transition-colors hover:bg-ink/5 disabled:opacity-30"
        >
          <ArrowLeft aria-hidden="true" className="size-6" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={edges.end}
          aria-label="Next statements"
          className="flex size-11 items-center justify-center rounded-full transition-colors hover:bg-ink/5 disabled:opacity-30"
        >
          <ArrowRight aria-hidden="true" className="size-6" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );

  return (
    <Reveal as="section" aria-labelledby="quotes-title" className="section-y overflow-hidden">
      <div className="container-x">
        <SectionHeading id="quotes-title" eyebrow="In their own words" title="What drives the group." action={controls} className="mb-10 lg:mb-14" />
      </div>

      <ul
        ref={trackRef}
        data-reveal
        aria-label="Leadership statements"
        tabIndex={0}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[max(var(--gutter),calc((100vw-1440px)/2+var(--gutter)))] scroll-pl-[max(var(--gutter),calc((100vw-1440px)/2+var(--gutter)))] pb-2 focus-visible:outline-offset-[-2px]"
      >
        {quotes.map((q) => {
          const color = accentFor(q.business);
          return (
            <li key={q.id} className="w-[86vw] shrink-0 snap-start sm:w-[520px] lg:w-[600px]">
              <figure className="flex h-full min-h-[340px] flex-col rounded-[22px] bg-paper p-8 md:p-10">
                <QuoteMark color={color} />
                <blockquote className="mt-8 font-display text-[clamp(1.25rem,1.9vw,1.625rem)] leading-snug font-normal tracking-[-0.015em]">
                  <p>{q.text}</p>
                </blockquote>
                <figcaption className="mt-auto flex items-end justify-between gap-6 pt-10">
                  <span>
                    <span className="block font-semibold">{q.name}</span>
                    <span className="block text-[0.9375rem] text-muted">{q.role}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn("flex size-16 shrink-0 items-center justify-center rounded-full font-display text-lg font-semibold text-paper")}
                    style={{ background: color }}
                  >
                    {initials(q.name)}
                  </span>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>

      <div className="container-x mt-8">
        <p className="text-[0.8125rem] text-muted">
          {quoteSource.label}.{" "}
          <a href={quoteSource.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ink">
            Read the announcement
          </a>
        </p>
      </div>
    </Reveal>
  );
}
