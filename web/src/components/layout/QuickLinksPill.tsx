"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/components/ui/icons";
import { businesses } from "@/data/businesses";
import { gsap, useGSAP } from "@/lib/gsap";

const short: Record<string, string> = {
  "safety-systems": "Safety",
  "registration-plates": "Plates",
  "seat-comfort": "Comfort",
  "vehicle-recycling": "Recycling",
};

/**
 * Floating quick-links pill (bottom centre). Appears once the visitor scrolls past the first screen
 * and hides again when the footer comes into view.
 */
export function QuickLinksPill() {
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let footerVisible = false;
    const evaluate = () => setShow(window.scrollY > window.innerHeight * 0.7 && !footerVisible);
    const footer = document.querySelector("[data-site-footer]");
    const io = footer
      ? new IntersectionObserver(([entry]) => {
          footerVisible = entry.isIntersecting;
          evaluate();
        })
      : null;
    if (footer && io) io.observe(footer);
    evaluate();
    window.addEventListener("scroll", evaluate, { passive: true });
    return () => {
      window.removeEventListener("scroll", evaluate);
      io?.disconnect();
    };
  }, [pathname]);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.to(el, {
        autoAlpha: show ? 1 : 0,
        y: show ? 0 : 24,
        duration: reduce ? 0 : show ? 0.45 : 0.25,
        ease: show ? "power3.out" : "power2.in",
        overwrite: true,
      });
    },
    { dependencies: [show] },
  );

  return (
    <nav
      ref={ref}
      aria-label="Business quick links"
      style={{ opacity: 0, visibility: "hidden", transform: "translateY(24px)" }}
      className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2"
    >
      <ul className="flex max-w-[calc(100vw-24px)] items-center rounded-[12px] bg-paper p-1 shadow-[0_18px_50px_-18px_rgb(10_10_10/0.45)] sm:p-1.5">
        {businesses.map((b, i) => (
          <Fragment key={b.slug}>
            {i > 0 && <li aria-hidden="true" className="h-5 w-px bg-line" />}
            <li>
              <Link
                href={`/businesses/${b.slug}`}
                className="group flex items-center gap-1.5 rounded-[8px] px-2 py-2.5 text-[0.6875rem] font-bold tracking-[0.02em] whitespace-nowrap uppercase transition-colors hover:bg-cream sm:gap-2 sm:px-4 sm:text-[0.8125rem] sm:tracking-[0.04em]"
              >
                <span aria-hidden="true" className="size-2 rounded-[2px]" style={{ background: b.accent }} />
                {short[b.slug]}
                <ArrowRight aria-hidden="true" className="hidden size-3.5 transition-transform group-hover:translate-x-0.5 sm:block" strokeWidth={2} />
              </Link>
            </li>
          </Fragment>
        ))}
      </ul>
    </nav>
  );
}
