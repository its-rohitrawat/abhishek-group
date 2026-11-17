"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Above-the-fold intro for page heroes (~1s total).
 * - `[data-hero-reveal]`        fades and rises 20px
 * - `[data-hero-reveal="clip"]` reveals with a clip-path wipe
 * On first load these start hidden via `html.js-motion` (set before paint, with a failsafe).
 */
export function IntroReveal({ children, className }: { children: ReactNode; className?: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;
      const root = document.documentElement;
      const release = () => root.classList.remove("js-motion");

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const fades = el.querySelectorAll<HTMLElement>('[data-hero-reveal]:not([data-hero-reveal="clip"])');
        const clips = el.querySelectorAll<HTMLElement>('[data-hero-reveal="clip"]');

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            release();
            gsap.set([...fades, ...clips], { clearProps: "opacity,transform,clipPath" });
          },
        });
        tl.fromTo(fades, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.07 }, 0);
        if (clips.length) {
          tl.fromTo(
            clips,
            { opacity: 1, clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.inOut" },
            0.1,
          );
        }
      });
      // Reduced motion (or matchMedia unsupported): show everything immediately.
      mm.add("(prefers-reduced-motion: reduce)", release);
      return () => {
        mm.revert();
        release();
      };
    },
    { scope },
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
