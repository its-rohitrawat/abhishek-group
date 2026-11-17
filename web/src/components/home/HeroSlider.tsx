"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { IntroReveal } from "@/components/animations/IntroReveal";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export interface HeroSlide {
  id: string;
  cardLabel: string;
  cardTitle: string;
  eyebrow: string;
  headline: string[];
  text: string;
  cta: { label: string; href: string };
  image: { src: string; alt: string };
  overlay: string;
  tone: "light" | "dark";
}

const DURATION = 7;

const wash = (c: string, dir: "x" | "y") =>
  dir === "x"
    ? `linear-gradient(90deg, ${c} 0%, ${c} 26%, color-mix(in srgb, ${c} 78%, transparent) 44%, color-mix(in srgb, ${c} 20%, transparent) 66%, transparent 82%)`
    : `linear-gradient(180deg, color-mix(in srgb, ${c} 30%, transparent) 0%, color-mix(in srgb, ${c} 82%, transparent) 38%, ${c} 70%)`;

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const prevRef = useRef(0);
  const holdRef = useRef({ hover: false, focus: false, hidden: false });
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const syncPlayback = () => {
    const t = tweenRef.current;
    if (!t) return;
    const h = holdRef.current;
    if (userPaused || h.hover || h.focus || h.hidden) t.pause();
    else t.resume();
  };

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const bgs = root.querySelectorAll<HTMLElement>("[data-slide-bg]");
      const panels = root.querySelectorAll<HTMLElement>("[data-slide-text]");
      const fills = root.querySelectorAll<HTMLElement>("[data-progress]");
      const prev = prevRef.current;

      if (prev !== active) {
        bgs.forEach((bg, i) => gsap.to(bg, { opacity: i === active ? 1 : 0, duration: reduce ? 0 : 0.9, ease: "power2.inOut", overwrite: true }));
        const out = panels[prev];
        const inn = panels[active];
        gsap.to(out, { opacity: 0, duration: reduce ? 0 : 0.25, overwrite: true, onComplete: () => gsap.set(out, { visibility: "hidden" }) });
        gsap.set(inn, { visibility: "visible", opacity: 1 });
        if (!reduce) {
          gsap.fromTo(inn.querySelectorAll("[data-line]"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, delay: 0.2, ease: "power3.out", overwrite: true });
        }
        prevRef.current = active;
      }

      tweenRef.current?.kill();
      gsap.set(fills, { scaleX: 0 });
      if (reduce) {
        gsap.set(fills[active], { scaleX: 1 });
        tweenRef.current = null;
        return;
      }
      tweenRef.current = gsap.fromTo(
        fills[active],
        { scaleX: 0 },
        { scaleX: 1, duration: DURATION, ease: "none", onComplete: () => setActive((a) => (a + 1) % slides.length) },
      );
      syncPlayback();
    },
    { dependencies: [active], scope: rootRef },
  );

  useEffect(() => {
    syncPlayback();
    const onVis = () => {
      holdRef.current.hidden = document.hidden;
      syncPlayback();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPaused]);

  const hold = (key: "hover" | "focus", value: boolean) => {
    holdRef.current[key] = value;
    syncPlayback();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % slides.length;
    if (e.key === "ArrowLeft") next = (i - 1 + slides.length) % slides.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = slides.length - 1;
    if (next >= 0) {
      e.preventDefault();
      setActive(next);
      tabsRef.current[next]?.focus();
    }
  };

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label="Abhishek Group at every stage of the vehicle"
      onFocus={() => hold("focus", true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && hold("focus", false)}
      className="relative isolate h-[100svh] min-h-[700px] overflow-hidden bg-ink lg:max-h-[980px]"
    >
      <h1 className="sr-only">Abhishek Group. For every stage of the vehicle.</h1>

      {/* Backgrounds */}
      {slides.map((s, i) => (
        <div key={s.id} data-slide-bg aria-hidden="true" className="absolute inset-0 -z-10" style={{ opacity: i === 0 ? 1 : 0 }}>
          <Image src={s.image.src} alt="" fill priority={i === 0} sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 hidden lg:block" style={{ background: wash(s.overlay, "x") }} />
          <div className="absolute inset-0 lg:hidden" style={{ background: wash(s.overlay, "y") }} />
        </div>
      ))}

      <IntroReveal className="container-x flex h-full flex-col pt-[var(--header-offset)] pb-5 lg:pb-8">
        {/* Slide text */}
        <div className="grid flex-1 items-end pb-8 lg:items-center lg:pb-0">
          {/* Hovering the text or the cards pauses autoplay; hovering the photo does not. */}
          {slides.map((s, i) => (
            <div
              key={s.id}
              data-slide-text
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}: ${s.cardTitle}`}
              inert={i !== active}
              style={i === 0 ? undefined : { opacity: 0, visibility: "hidden" }}
              onPointerEnter={(e) => e.pointerType === "mouse" && hold("hover", true)}
              onPointerLeave={(e) => e.pointerType === "mouse" && hold("hover", false)}
              className={cn("[grid-area:1/1] max-w-[640px]", s.tone === "light" ? "text-paper" : "text-ink")}
            >
              <p data-line data-hero-reveal={i === 0 ? "" : undefined} className="eyebrow mb-5 opacity-90">
                {s.eyebrow}
              </p>
              <h2
                data-line
                data-hero-reveal={i === 0 ? "" : undefined}
                className="mb-6 font-display text-[clamp(2.6rem,5.6vw,5.25rem)] leading-[0.96] font-medium tracking-[-0.02em] uppercase"
              >
                {s.headline.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <p data-line data-hero-reveal={i === 0 ? "" : undefined} className="mb-8 max-w-[46ch] text-[1.0625rem] leading-relaxed opacity-90 lg:text-lg">
                {s.text}
              </p>
              <div data-line data-hero-reveal={i === 0 ? "" : undefined}>
                <Link
                  href={s.cta.href}
                  className={cn(
                    "group inline-flex min-h-11 items-center gap-2.5 rounded-[4px] px-5 text-[0.9375rem] font-semibold transition-colors",
                    s.tone === "light" ? "bg-paper text-ink hover:bg-cream" : "bg-ink text-paper hover:bg-[#262626]",
                  )}
                >
                  {s.cta.label}
                  <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Selector cards */}
        <div
          data-hero-reveal
          onPointerEnter={(e) => e.pointerType === "mouse" && hold("hover", true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && hold("hover", false)}
          className="flex items-stretch gap-3"
        >
          <div role="tablist" aria-label="Choose a slide" className="no-scrollbar -mx-[var(--gutter)] flex flex-1 snap-x gap-3 overflow-x-auto px-[var(--gutter)] lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
            {slides.map((s, i) => {
              const on = i === active;
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabsRef.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-label={s.cardTitle}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cn(
                    "relative min-w-[190px] snap-start overflow-hidden rounded-[10px] px-4 pt-4 pb-5 text-left text-ink backdrop-blur-md transition-colors duration-300 lg:min-w-0",
                    on ? "bg-cream" : "bg-cream/70 hover:bg-cream/90",
                  )}
                >
                  <span className="eyebrow block text-[0.6875rem]">{s.cardLabel}</span>
                  <span className={cn("mt-3 block text-[0.9375rem] leading-snug font-medium", !on && "text-ink/60")}>{s.cardTitle}</span>
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-ink/10">
                    <span data-progress className="block h-full origin-left" style={{ background: s.overlay, transform: "scaleX(0)" }} />
                  </span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
            className="hidden w-11 shrink-0 items-center justify-center rounded-[10px] bg-cream/70 text-ink backdrop-blur-md transition-colors hover:bg-cream sm:flex"
          >
            {userPaused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
          </button>
        </div>
      </IntroReveal>
    </section>
  );
}
