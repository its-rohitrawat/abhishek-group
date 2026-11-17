import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { IntroReveal } from "@/components/animations/IntroReveal";
import { BrandMark } from "@/components/brand/BrandMark";
import { Breadcrumb, type Crumb } from "@/components/ui/Breadcrumb";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs: Crumb[];
  accent?: string;
  children?: ReactNode;
  /** Cream variant: optional photo on the right with the oversized rounded corner. */
  aside?: { src: string; alt: string };
  /** Image variant: full-bleed photo with a colour wash, like the homepage slides. */
  image?: { src: string; alt: string; overlay: string; tone: "light" | "dark" };
}

const wash = (c: string) =>
  `linear-gradient(90deg, ${c} 0%, ${c} 30%, color-mix(in srgb, ${c} 75%, transparent) 50%, color-mix(in srgb, ${c} 15%, transparent) 74%, transparent 90%)`;
const washMobile = (c: string) =>
  `linear-gradient(180deg, color-mix(in srgb, ${c} 45%, transparent) 0%, color-mix(in srgb, ${c} 88%, transparent) 45%, ${c} 80%)`;

export function PageHero({ eyebrow, title, intro, crumbs, accent, children, aside, image }: PageHeroProps) {
  const style = accent ? ({ "--accent": accent } as CSSProperties) : undefined;

  if (image) {
    const light = image.tone === "light";
    return (
      <section aria-labelledby="page-title" style={style} className="relative isolate overflow-hidden bg-ink">
        <Image src={image.src} alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 hidden lg:block" style={{ background: wash(image.overlay) }} />
        <div aria-hidden="true" className="absolute inset-0 -z-10 lg:hidden" style={{ background: washMobile(image.overlay) }} />
        <IntroReveal
          className={cn(
            "container-x flex min-h-[620px] flex-col pt-[var(--header-offset)] pb-14 lg:min-h-[700px] lg:pb-20",
            light ? "text-paper" : "text-ink",
          )}
        >
          <div data-hero-reveal>
            <Breadcrumb items={crumbs} tone={light ? "light" : "dark"} />
          </div>
          <div className="mt-auto max-w-[640px] pt-16">
            <p data-hero-reveal className="eyebrow mb-5 flex items-center gap-2.5">
              {accent ? <span aria-hidden="true" className={cn("size-3 rounded-[2px]", light ? "bg-paper" : "bg-ink")} /> : <BrandMark />}
              {eyebrow}
            </p>
            <h1
              id="page-title"
              data-hero-reveal
              className="mb-6 font-display text-[clamp(2.6rem,5.6vw,5rem)] leading-[0.98] font-medium tracking-[-0.02em] text-balance uppercase"
            >
              {title}
            </h1>
            {intro && (
              <div data-hero-reveal className="max-w-[48ch] text-[1.0625rem] leading-relaxed opacity-90 lg:text-lg">
                {intro}
              </div>
            )}
            {children && (
              <div data-hero-reveal className="mt-8">
                {children}
              </div>
            )}
          </div>
        </IntroReveal>
      </section>
    );
  }

  return (
    <section aria-labelledby="page-title" style={style}>
      <IntroReveal className="container-x grid gap-y-12 pt-[var(--header-offset)] pb-16 lg:grid-cols-12 lg:gap-x-[var(--gutter)] lg:pb-20">
        <div className={cn("flex flex-col", aside ? "lg:col-span-6" : "lg:col-span-9")}>
          <div data-hero-reveal className="mb-12 lg:mb-20">
            <Breadcrumb items={crumbs} />
          </div>
          <p data-hero-reveal className="eyebrow mb-5 flex items-center gap-2.5">
            {accent ? <span aria-hidden="true" className="accent-bg size-3 rounded-[2px]" /> : <BrandMark />}
            {eyebrow}
          </p>
          <h1 id="page-title" data-hero-reveal className="display mb-7 text-[clamp(2.75rem,5.8vw,5.25rem)] leading-[0.98] text-balance">
            {title}
          </h1>
          {intro && (
            <div data-hero-reveal className="max-w-[54ch] text-[1.0625rem] leading-relaxed text-muted lg:text-lg">
              {intro}
            </div>
          )}
          {children && (
            <div data-hero-reveal className="mt-9">
              {children}
            </div>
          )}
        </div>
        {aside && (
          <div data-hero-reveal="clip" className="relative aspect-[4/3] overflow-hidden rounded-br-[110px] lg:col-span-6 lg:aspect-auto lg:min-h-[460px]">
            <Image src={aside.src} alt={aside.alt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        )}
      </IntroReveal>
    </section>
  );
}
