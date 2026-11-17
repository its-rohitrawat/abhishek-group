"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Desktop lifecycle rail. A thin line fills as the visitor moves through the four stages,
 * and each stage marker adopts its accent colour while active. No pinning, no scroll-jacking.
 * Panels inside must carry `data-stage-panel` and set `--accent` inline.
 */
export function LifecycleProgress({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;
      const fill = el.querySelector<HTMLElement>("[data-rail-fill]");
      const panels = Array.from(el.querySelectorAll<HTMLElement>("[data-stage-panel]"));
      const mm = gsap.matchMedia();

      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        if (fill) {
          gsap.fromTo(
            fill,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 65%", end: "bottom 65%", scrub: 0.4 },
            },
          );
        }
        const triggers = panels.map((panel) =>
          ScrollTrigger.create({
            trigger: panel,
            start: "top 65%",
            end: "bottom 65%",
            onToggle: (self) => {
              panel.dataset.active = String(self.isActive);
              if (self.isActive) el.style.setProperty("--rail-accent", getComputedStyle(panel).getPropertyValue("--accent"));
            },
          }),
        );
        return () => {
          triggers.forEach((t) => t.kill());
          panels.forEach((p) => delete p.dataset.active);
          el.style.removeProperty("--rail-accent");
        };
      });

      // Reduced motion: show the full rail, every stage in its colour.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: reduce)", () => {
        if (fill) gsap.set(fill, { scaleY: 1 });
        panels.forEach((p) => (p.dataset.active = "true"));
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <div ref={scope} className="relative">
      <div aria-hidden="true" className="pointer-events-none absolute top-0 bottom-0 left-[11px] hidden w-px bg-line lg:block">
        <div
          data-rail-fill
          style={{ transform: "scaleY(0)", transformOrigin: "top" }}
          className="absolute inset-0 bg-[var(--rail-accent,var(--ink))] transition-colors duration-500"
        />
      </div>
      {children}
    </div>
  );
}
