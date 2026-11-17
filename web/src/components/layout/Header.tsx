"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, ChevronDown, Mail, Menu, X } from "@/components/ui/icons";
import { Logo } from "@/components/brand/Logo";
import { businesses, accentStyle } from "@/data/businesses";
import { media } from "@/data/media";
import { mainNav } from "@/data/navigation";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Floating header in the spirit of the reference: Menu on the left, logo centred, actions on the right.
 * The Menu opens a dropdown panel (all breakpoints) with an inline "Our Businesses" sub-list.
 */
export function Header() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [bizOpen, setBizOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const close = useCallback(() => {
    setOpen(false);
    setBizOpen(false);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Escape closes; focus the first item when opening.
  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  // First-load intro for the bar.
  useGSAP(() => {
    const bar = barRef.current;
    if (!bar || !document.documentElement.classList.contains("js-motion")) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.fromTo(bar, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", clearProps: "transform" });
    });
    return () => mm.revert();
  });

  // Panel open animation.
  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!open || !panel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(panel, { opacity: 0, y: -8, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.32, ease: "power3.out" });
      gsap.fromTo(
        panel.querySelectorAll("[data-menu-item]"),
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.035, ease: "power3.out", delay: 0.05 },
      );
    },
    { dependencies: [open] },
  );

  const featured = media.heroReborn;

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-[var(--header-top)]">
        {/* Full-width glass bar: frosted white tint + strong backdrop blur over whatever scrolls beneath. */}
        <div className="px-3 sm:px-4 lg:px-5">
          <div
            ref={barRef}
            data-hero-reveal
            className={cn(
              "pointer-events-auto relative flex h-[var(--header-h)] items-center rounded-[22px] border px-3 sm:px-6 lg:px-8",
              "backdrop-blur-[40px] backdrop-saturate-[1.8] transition-[background-color,border-color,box-shadow] duration-300",
              scrolled || open
                ? "border-white/70 bg-white/60 shadow-[0_14px_44px_-18px_rgb(10_10_10/0.38),inset_0_1px_0_rgb(255_255_255/0.75)]"
                : "border-white/50 bg-white/45 shadow-[0_10px_34px_-20px_rgb(10_10_10/0.32),inset_0_1px_0_rgb(255_255_255/0.65)]",
            )}
          >
            {/* Menu */}
            <button
              ref={buttonRef}
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => (open ? close() : setOpen(true))}
              className="group flex h-11 items-center gap-2.5 rounded-xl px-2 text-[1rem] font-medium"
            >
              {open ? (
                <X aria-hidden="true" className="size-5" strokeWidth={1.75} />
              ) : (
                <Menu aria-hidden="true" className="size-5" strokeWidth={1.75} />
              )}
              <span className="sr-only sm:not-sr-only">Menu</span>
            </button>

            {/* Logo */}
            <Link
              href="/"
              aria-label="Abhishek Group home"
              onClick={close}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <Logo className="scale-[0.86] sm:scale-100" />
            </Link>

            {/* Actions */}
            <div className="ml-auto flex items-center gap-1 sm:gap-2">
              <Link
                href="/contact"
                className={cn(
                  "hidden h-11 items-center gap-2 rounded-xl px-3 text-[1rem] font-medium transition-colors hover:bg-ink/5 lg:flex",
                  isActive("/contact") && "underline underline-offset-8",
                )}
              >
                <Mail aria-hidden="true" className="size-5" strokeWidth={1.6} />
                Contact
              </Link>
              <Link
                href="/scrap-a-vehicle"
                style={accentStyle("#2E9E5B")}
                className="hidden h-10 items-center gap-2 rounded-[4px] bg-ink px-4 text-sm font-semibold whitespace-nowrap text-paper transition-colors hover:bg-[#262626] md:flex"
              >
                <span aria-hidden="true" className="accent-bg size-2 rounded-full" />
                Scrap a Vehicle
              </Link>
              <Link href="/contact" aria-label="Contact" className="flex size-11 items-center justify-center rounded-xl md:hidden">
                <Mail aria-hidden="true" className="size-5" strokeWidth={1.6} />
              </Link>
            </div>

            {/* Dropdown panel */}
            {open && (
              <div
                id="site-menu"
                ref={panelRef}
                className="absolute top-[calc(100%+10px)] left-0 w-full origin-top-left overflow-hidden rounded-[24px] border border-white/70 bg-cream/95 p-3 shadow-[0_30px_80px_-30px_rgb(10_10_10/0.45)] sm:w-[360px]"
              >
                <nav aria-label="Main">
                  <ul className="max-h-[min(62vh,560px)] overflow-y-auto">
                    {mainNav.map((item) =>
                      item.mega ? (
                        <li key={item.href} data-menu-item>
                          <button
                            type="button"
                            aria-expanded={bizOpen}
                            aria-controls="menu-businesses"
                            onClick={() => setBizOpen((o) => !o)}
                            className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left text-[1.0625rem] transition-colors hover:bg-ink/5"
                          >
                            {item.label}
                            <ChevronDown aria-hidden="true" strokeWidth={1.75} className={cn("size-5 transition-transform", bizOpen && "rotate-180")} />
                          </button>
                          {bizOpen && (
                            <ul id="menu-businesses" className="mb-2 ml-4 border-l border-line pl-2">
                              {businesses.map((b) => (
                                <li key={b.slug} style={accentStyle(b.accent)}>
                                  <Link
                                    href={`/businesses/${b.slug}`}
                                    onClick={close}
                                    aria-current={isActive(`/businesses/${b.slug}`) ? "page" : undefined}
                                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.9375rem] transition-colors hover:bg-ink/5"
                                  >
                                    <span aria-hidden="true" className="accent-bg size-2.5 rounded-[2px]" />
                                    <span className="text-muted tabular-nums">{b.stageNo}</span>
                                    {b.name}
                                  </Link>
                                </li>
                              ))}
                              <li>
                                <Link href="/businesses" onClick={close} className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-[0.9375rem] font-semibold hover:bg-ink/5">
                                  All businesses <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
                                </Link>
                              </li>
                            </ul>
                          )}
                        </li>
                      ) : (
                        <li key={item.href} data-menu-item>
                          <Link
                            href={item.href}
                            onClick={close}
                            aria-current={isActive(item.href) ? "page" : undefined}
                            className={cn(
                              "flex items-center justify-between rounded-2xl px-4 py-3.5 text-[1.0625rem] transition-colors hover:bg-ink/5",
                              isActive(item.href) && "font-semibold",
                            )}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ),
                    )}
                    <li data-menu-item>
                      <Link href="/sustainability" onClick={close} className="flex rounded-2xl px-4 py-3.5 text-[1.0625rem] hover:bg-ink/5">
                        Sustainability
                      </Link>
                    </li>
                  </ul>
                </nav>
                <Link href="/scrap-a-vehicle" onClick={close} data-menu-item className="group mt-2 block overflow-hidden rounded-[18px] bg-paper">
                  <div className="relative aspect-[16/7] overflow-hidden">
                    <Image src={featured.src} alt="" fill sizes="340px" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  </div>
                  <span className="flex items-center gap-2 px-4 py-3 font-semibold">
                    Scrap a Vehicle
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} />
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {mounted &&
        open &&
        createPortal(
          <div aria-hidden="true" onClick={close} className="fixed inset-0 z-40 bg-ink/25 backdrop-blur-[6px]" />,
          document.body,
        )}
    </>
  );
}
