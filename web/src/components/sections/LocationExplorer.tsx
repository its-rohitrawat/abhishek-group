"use client";

import { useMemo, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { sites, states, locationTypes, type LocationType } from "@/data/locations";
import { businesses } from "@/data/businesses";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const businessBySlug = Object.fromEntries(businesses.map((b) => [b.slug, b]));
const typeLabel = Object.fromEntries(locationTypes.map((t) => [t.id, t.label])) as Record<LocationType, string>;

type StateFilter = "all" | string;
type TypeFilter = "all" | LocationType;

export function LocationExplorer({
  headingLevel = "h3",
  initialState = "all",
}: {
  headingLevel?: "h2" | "h3";
  initialState?: StateFilter;
}) {
  const [state, setState] = useState<StateFilter>(initialState);
  const [type, setType] = useState<TypeFilter>("all");
  const listRef = useRef<HTMLDivElement>(null);
  const Heading = headingLevel;

  const filtered = useMemo(
    () => sites.filter((s) => (state === "all" || s.state === state) && (type === "all" || s.type === type)),
    [state, type],
  );

  const countFor = (st: StateFilter, ty: TypeFilter) =>
    sites.filter((s) => (st === "all" || s.state === st) && (ty === "all" || s.type === ty)).length;

  useGSAP(
    () => {
      if (!listRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        listRef.current.querySelectorAll("[data-site]"),
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.025, ease: "power2.out", overwrite: true },
      );
    },
    { dependencies: [state, type], scope: listRef },
  );

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
      {/* Filters */}
      <div className="flex flex-col gap-8 lg:col-span-4">
        <fieldset>
          <legend className="eyebrow mb-4 text-muted">State</legend>
          <div className="flex flex-wrap gap-2 lg:flex-col lg:flex-nowrap lg:gap-0 lg:border-t lg:border-line">
            {(["all", ...states] as StateFilter[]).map((st) => {
              const on = state === st;
              return (
                <button
                  key={st}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setState(st)}
                  className={cn(
                    "flex items-center justify-between gap-4 rounded-full border px-4 py-2 text-left text-[0.9375rem] transition-colors",
                    "lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:px-0 lg:py-3",
                    on ? "border-ink bg-ink text-paper lg:bg-transparent lg:text-ink" : "border-line text-ink/75 hover:text-ink",
                  )}
                >
                  <span className={cn("flex items-center gap-3", on && "lg:font-semibold")}>
                    <span aria-hidden="true" className={cn("hidden size-1.5 rounded-full lg:inline-block", on ? "bg-ink" : "bg-transparent")} />
                    {st === "all" ? "All states" : st}
                  </span>
                  <span className={cn("text-[0.8125rem] tabular-nums", on ? "opacity-80" : "text-muted")}>{countFor(st, "all")}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="eyebrow mb-4 text-muted">Location type</legend>
          <div className="flex flex-wrap gap-2">
            {([{ id: "all", plural: "All types" }, ...locationTypes] as { id: TypeFilter; plural: string }[]).map((t) => {
              const on = type === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setType(t.id)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-[0.875rem] transition-colors",
                    on ? "border-ink bg-ink text-paper" : "border-line text-ink/75 hover:border-ink/40 hover:text-ink",
                  )}
                >
                  {t.plural}
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      {/* Results */}
      <div className="lg:col-span-8">
        <div className="flex items-baseline justify-between gap-4 border-b border-ink pb-4">
          <Heading className="display text-[clamp(1.5rem,2.4vw,2.25rem)]">{state === "all" ? "All of India" : state}</Heading>
          <p className="text-[0.9375rem] text-muted" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "site" : "sites"}
          </p>
        </div>

        <div ref={listRef}>
          {filtered.length === 0 ? (
            <div className="py-16 text-muted">
              <p className="font-medium text-ink">No sites match these filters.</p>
              <p className="mt-1 text-[0.9375rem]">Try another state or location type.</p>
            </div>
          ) : (
            <ul className="grid sm:grid-cols-2">
              {filtered.map((s) => {
                const biz = s.business ? businessBySlug[s.business] : null;
                return (
                  <li
                    key={s.id}
                    data-site
                    className="flex gap-4 border-b border-line py-5 sm:odd:pr-6 sm:even:border-l sm:even:pl-6"
                  >
                    <MapPin aria-hidden="true" strokeWidth={1.5} className="mt-1 size-4 shrink-0 text-muted" />
                    <div className="min-w-0">
                      <p className="font-display text-lg font-semibold tracking-[-0.01em]">
                        {s.city}
                        <span className="font-sans text-[0.875rem] font-normal text-muted">, {s.state}</span>
                      </p>
                      <p className="text-[0.875rem] text-ink/80">{typeLabel[s.type]}</p>
                      {biz && (
                        <p className="mt-2 flex items-center gap-2 text-[0.8125rem] text-muted">
                          <span aria-hidden="true" className="size-1.5" style={{ background: biz.accent }} />
                          {biz.name}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <p className="mt-6 text-[0.8125rem] text-muted">
          City-level locations as published by Abhishek Group. Full site addresses will be added once confirmed.
        </p>
      </div>
    </div>
  );
}
