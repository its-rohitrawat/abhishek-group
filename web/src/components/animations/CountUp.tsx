"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

const fmt = new Intl.NumberFormat("en-IN");

/**
 * Renders the final value on the server. After hydration, if the number is still below
 * the fold, it counts up once when it enters the viewport. Numbers already on screen are left alone.
 */
export function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
        const counter = { v: 0 };
        el.textContent = fmt.format(0);
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(counter, {
              v: value,
              duration: value > 100 ? 1.2 : 0.8,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = fmt.format(Math.round(counter.v));
              },
            });
          },
        });
        return () => {
          st.kill();
          el.textContent = fmt.format(value);
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {fmt.format(value)}
    </span>
  );
}
