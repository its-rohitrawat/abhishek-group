import Image from "next/image";
import { Reveal } from "@/components/animations/Reveal";
import { IntroReveal } from "@/components/animations/IntroReveal";
import { BrandMark } from "@/components/brand/BrandMark";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { chairman } from "@/data/leadership";
import { media } from "@/data/media";
import { quotes, quoteSource } from "@/data/quotes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Chairman",
  description:
    "Mr. Dhiraj Dhar Gupta, Chairman of Abhishek Group, among the first in India to manufacture automotive safety products for passenger vehicles.",
  path: "/chairman",
});

export default function ChairmanPage() {
  const portrait = media.chairman;
  const chairmanQuotes = quotes.filter((q) => q.name === "Dhiraj Dhar Gupta");

  return (
    <>
      <section aria-labelledby="page-title">
        <IntroReveal className="container-x grid gap-y-12 pt-[var(--header-offset)] pb-16 lg:grid-cols-12 lg:items-end lg:gap-x-[var(--gutter)] lg:pb-24">
          <div className="lg:col-span-5">
            <div data-hero-reveal className="mb-12 lg:mb-20">
              <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About Us", href: "/about" }, { label: "Chairman" }]} />
            </div>
            <p data-hero-reveal className="eyebrow mb-5 flex items-center gap-2.5">
              <BrandMark />
              {chairman.title}
            </p>
            <h1 id="page-title" data-hero-reveal className="display mb-8 text-[clamp(2.75rem,5.4vw,5rem)] leading-[0.98] text-balance">
              {chairman.name}
            </h1>
            <p data-hero-reveal className="max-w-[48ch] text-[1.0625rem] leading-relaxed text-muted lg:text-lg">
              {chairman.bio[0]}
            </p>
          </div>
          <div data-hero-reveal="clip" className="relative aspect-[3/2] overflow-hidden rounded-br-[120px] bg-surface lg:col-span-7">
            <Image src={portrait.src} alt={portrait.alt} fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover object-[50%_30%]" />
          </div>
        </IntroReveal>
      </section>

      <Reveal as="section" aria-labelledby="profile-title" className="section-y bg-offwhite">
        <div className="container-x grid gap-y-10 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
          <div className="lg:col-span-5">
            <p data-reveal className="eyebrow mb-5 flex items-center gap-2.5">
              <BrandMark />
              Profile
            </p>
            <h2 id="profile-title" data-reveal className="display text-[clamp(2rem,3.6vw,3rem)] text-balance">
              Business with a social purpose.
            </h2>
          </div>
          <div className="space-y-6 text-[1.0625rem] leading-relaxed text-muted lg:col-span-6 lg:col-start-7">
            {chairman.bio.slice(1).map((p) => (
              <p key={p.slice(0, 24)} data-reveal>
                {p}
              </p>
            ))}
            <div data-reveal className="flex flex-wrap gap-x-8 gap-y-3 pt-2">
              <AnimatedLink href="/about">About the group</AnimatedLink>
              <AnimatedLink href="/group-companies">Group companies</AnimatedLink>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" aria-labelledby="words-title" className="section-y">
        <div className="container-x">
          <p data-reveal className="eyebrow mb-5 flex items-center gap-2.5">
            <BrandMark />
            In his words
          </p>
          <h2 id="words-title" data-reveal className="display mb-12 text-[clamp(2rem,3.6vw,3rem)] lg:mb-16">
            What the group stands for.
          </h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {chairmanQuotes.map((q) => (
              <li key={q.id} data-reveal>
                <figure className="flex h-full flex-col rounded-[22px] bg-paper p-8 md:p-10">
                  <svg aria-hidden="true" viewBox="0 0 52 22" className="h-[22px] w-[52px]" fill="#0a0a0a">
                    <path d="M0 0h22l-6 22H0z" />
                    <path d="M28 0h24l-6 22H28z" />
                  </svg>
                  <blockquote className="mt-8 font-display text-[clamp(1.25rem,1.9vw,1.625rem)] leading-snug font-normal tracking-[-0.015em]">
                    <p>{q.text}</p>
                  </blockquote>
                  <figcaption className="mt-auto pt-8 text-[0.9375rem] text-muted">
                    {q.name}, {q.role}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[0.8125rem] text-muted">
            {quoteSource.label}.{" "}
            <a href={quoteSource.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ink">
              Read the announcement
            </a>
          </p>
        </div>
      </Reveal>
    </>
  );
}
