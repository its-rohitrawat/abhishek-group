import Image from "next/image";
import { Reveal } from "@/components/animations/Reveal";
import { BrandMark } from "@/components/brand/BrandMark";
import { Button } from "@/components/ui/Button";
import { media } from "@/data/media";
import { sites, states } from "@/data/locations";

/** Split section: photo with the reference's oversized rounded corner, state summary on the right. */
export function LocationsPreview() {
  const counts = states.map((st) => ({ state: st, n: sites.filter((s) => s.state === st).length }));
  const img = media.indiaExpressway;

  return (
    <Reveal as="section" aria-labelledby="locations-title" className="section-y">
      <div className="container-x grid items-center gap-y-12 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
        <div data-reveal className="relative aspect-[4/3] overflow-hidden rounded-br-[120px] lg:col-span-6 lg:aspect-[5/4]">
          <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <p data-reveal className="eyebrow mb-5 flex items-center gap-2.5">
            <BrandMark />
            Industrial footprint
          </p>
          <h2 id="locations-title" data-reveal className="display mb-5 text-[clamp(2.125rem,4.2vw,3.5rem)]">
            Connected across India.
          </h2>
          <p data-reveal className="mb-8 text-[1.0625rem] leading-relaxed text-muted">
            <strong className="font-semibold text-ink">21 sites across 7 states</strong>, from manufacturing plants and offices
            to registration plate stations and vehicle recycling.
          </p>
          <ul data-reveal className="mb-10 grid grid-cols-2 gap-x-8 border-t border-line">
            {counts.map((c) => (
              <li key={c.state} className="flex items-baseline justify-between border-b border-line py-3">
                <span>{c.state}</span>
                <span className="text-sm text-muted tabular-nums">{c.n}</span>
              </li>
            ))}
          </ul>
          <div data-reveal>
            <Button href="/locations">Explore Locations</Button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
