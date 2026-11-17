import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { BusinessGrid } from "@/components/sections/BusinessGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Button } from "@/components/ui/Button";
import { businesses, getBusiness, accentStyle } from "@/data/businesses";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return businesses.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/businesses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const b = getBusiness(slug);
  if (!b) return {};
  return pageMetadata({ title: b.name, description: b.summary, path: `/businesses/${b.slug}` });
}

export default async function BusinessPage({ params }: PageProps<"/businesses/[slug]">) {
  const { slug } = await params;
  const b = getBusiness(slug);
  if (!b) notFound();

  const index = businesses.indexOf(b);
  const prev = businesses[(index - 1 + businesses.length) % businesses.length];
  const next = businesses[(index + 1) % businesses.length];

  return (
    <div style={accentStyle(b.accent)}>
      <PageHero
        accent={b.accent}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Our Businesses", href: "/businesses" },
          { label: b.name },
        ]}
        eyebrow={`Stage ${b.stageNo} · ${b.stage}`}
        title={b.name}
        intro={b.summary}
        image={{ src: b.hero.image.src ?? "", alt: b.hero.image.alt, overlay: b.hero.overlay, tone: b.hero.tone }}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={`/contact?category=${b.contactCategory}`}>Contact the {b.name} team</Button>
          {b.slug === "vehicle-recycling" && (
            <Button href="/scrap-a-vehicle" variant="secondary" accent={b.accent}>
              Scrap a Vehicle
            </Button>
          )}
        </div>
      </PageHero>

      {/* Overview */}
      <Reveal as="section" aria-labelledby="overview-title" className="section-y">
        <div className="container-x grid gap-y-10 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
          <div className="lg:col-span-6">
            <p data-reveal className="eyebrow mb-6 flex items-center gap-3 text-muted">
              <span aria-hidden="true" className="accent-bg h-[3px] w-8" />
              Overview
            </p>
            <h2 id="overview-title" data-reveal className="display text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1] text-balance">
              {b.headline}
            </h2>
          </div>
          <div className="space-y-6 text-[1.0625rem] leading-relaxed text-muted lg:col-span-5 lg:col-start-8">
            {b.overview.map((p) => (
              <p key={p.slice(0, 24)} data-reveal>
                {p}
              </p>
            ))}
            <div data-reveal className="pt-2">
              <p className="eyebrow mb-3 text-ink">Who we work with</p>
              <ul className="flex flex-wrap gap-2">
                {b.audiences.map((a) => (
                  <li key={a} className="rounded-full border border-line px-3 py-1 text-[0.875rem] text-ink/80">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Products & capabilities */}
      <Reveal as="section" aria-labelledby="products-title" className="section-y bg-offwhite">
        <div className="container-x">
          <SectionHeading
            id="products-title"
            eyebrow="Products and capabilities"
            title="What we deliver."
            className="mb-12 lg:mb-16"
          />
          <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {b.products.map((p, i) => (
              <li key={p.name} data-reveal className="relative flex flex-col gap-4 overflow-hidden rounded-[24px] bg-paper p-8 lg:p-10">
                <span aria-hidden="true" className="accent-bg absolute inset-x-0 top-0 h-[3px]" />
                <span className="eyebrow text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display text-[1.625rem] leading-tight">{p.name}</h3>
                <p className="leading-relaxed text-muted">{p.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Imagery */}
      <Reveal as="section" aria-label={`${b.name} imagery`} className="section-y">
        <div className="container-x grid gap-[var(--gutter)] md:grid-cols-12">
          <div data-reveal className="group md:col-span-7">
            <MediaFrame media={b.detailImage} accent={b.accent} className="aspect-[4/3] w-full rounded-br-[100px]" />
          </div>
          <div data-reveal className="group md:col-span-5 md:mt-24">
            <MediaFrame media={b.image} accent={b.accent} tone="dark" className="aspect-[4/5] w-full rounded-[24px]" />
          </div>
        </div>
      </Reveal>

      {/* Group connection */}
      <Reveal as="section" aria-labelledby="connection-title" className="section-y bg-ink text-paper">
        <div className="container-x">
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
            <div className="lg:col-span-6">
              <p data-reveal className="eyebrow mb-6 flex items-center gap-3 text-white/60">
                <span aria-hidden="true" className="accent-bg h-[3px] w-8" />
                Part of the lifecycle
              </p>
              <h2 id="connection-title" data-reveal className="display text-[clamp(2rem,3.8vw,3.25rem)] leading-[1.02] text-balance">
                Stage {b.stageNo} of one connected journey.
              </h2>
            </div>
            <p data-reveal className="text-[1.0625rem] leading-relaxed text-white/65 lg:col-span-5 lg:col-start-8 lg:self-end">
              {b.connection}
            </p>
          </div>

          <nav aria-label="Lifecycle stages" className="mt-14 grid gap-4 md:grid-cols-2">
            {[
              { item: prev, label: "Previous stage", icon: "prev" as const },
              { item: next, label: "Next stage", icon: "next" as const },
            ].map(({ item, label, icon }) => (
              <Link
                key={label}
                href={`/businesses/${item.slug}`}
                data-reveal
                style={accentStyle(item.accent)}
                className="group flex items-center justify-between gap-6 rounded-[20px] border border-white/15 bg-ink p-8 transition-colors hover:bg-[#151515]"
              >
                {icon === "prev" && (
                  <ArrowLeft aria-hidden="true" strokeWidth={1.75} className="accent-text size-5 shrink-0 transition-transform group-hover:-translate-x-1" />
                )}
                <span className={icon === "next" ? "mr-auto" : "ml-auto text-right"}>
                  <span className="eyebrow block text-white/50">
                    {label} · {item.stageNo} {item.stage}
                  </span>
                  <span className="display mt-2 block text-[1.5rem]">{item.name}</span>
                </span>
                {icon === "next" && (
                  <ArrowRight aria-hidden="true" strokeWidth={1.75} className="accent-text size-5 shrink-0 transition-transform group-hover:translate-x-1" />
                )}
              </Link>
            ))}
          </nav>
        </div>
      </Reveal>

      {/* Contact CTA */}
      <Reveal as="section" aria-labelledby="business-cta-title" className="section-y">
        <div className="container-x grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-[var(--gutter)]">
          <h2 id="business-cta-title" data-reveal className="display text-[clamp(2.25rem,4.8vw,4.25rem)] leading-[1] text-balance lg:col-span-8">
            Talk to the {b.name} team.
          </h2>
          <div data-reveal className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <Button href={`/contact?category=${b.contactCategory}`} accent={b.accent}>
              Contact us
            </Button>
          </div>
        </div>
        <div className="container-x mt-16">
          <p data-reveal className="eyebrow mb-6 text-muted">All businesses</p>
          <BusinessGrid current={b.slug} />
        </div>
      </Reveal>
    </div>
  );
}
