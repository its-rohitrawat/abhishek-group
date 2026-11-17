import { Reveal } from "@/components/animations/Reveal";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { company } from "@/data/company";
import { BrandMark } from "@/components/brand/BrandMark";

export function GroupIntro() {
  return (
    <Reveal as="section" aria-labelledby="intro-title" className="section-y">
      <div className="container-x grid gap-y-10 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
        <div className="lg:col-span-7">
          <p data-reveal className="eyebrow mb-8 flex items-center gap-2.5">
            <BrandMark />
            About Abhishek Group
          </p>
          <h2 id="intro-title" data-reveal className="display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] text-balance">
            Engineering trust across the automotive lifecycle.
          </h2>
        </div>

        <div className="flex flex-col justify-end gap-6 text-[1.0625rem] leading-relaxed text-muted lg:col-span-5 lg:pb-3">
          <p data-reveal>
            Abhishek Group has been part of India&apos;s automotive industry since {company.founded}. Today the group brings
            together four businesses, each serving a different stage in the life of a vehicle.
          </p>
          <p data-reveal>
            Together they cover how a vehicle is built, how it is identified, how it is experienced on the road and how it
            is responsibly retired, supported by 21 sites across 7 states and joint ventures in the USA, Japan and Germany.
          </p>
          <div data-reveal>
            <AnimatedLink href="/about">Our Story</AnimatedLink>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
