"use client";

import { useRef, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

interface RevealProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  stagger?: number;
}

/**
 * Scroll reveal for a section. Animates every `[data-reveal]` descendant once, when the
 * element reaches ~85% of the viewport. Content is server-rendered visible; it is only
 * offset after hydration, and never when reduced motion is requested.
 */
export function Reveal({ children, as: Tag = "div", stagger = 0.08, ...rest }: RevealProps) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const targets = el.querySelectorAll<HTMLElement>("[data-reveal]");
        if (!targets.length) return;
        gsap.from(targets, {
          y: 24,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger,
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <Tag ref={scope} {...rest}>
      {children}
    </Tag>
  );
}
