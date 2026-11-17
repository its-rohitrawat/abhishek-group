import Image from "next/image";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { accentStyle, getBusiness } from "@/data/businesses";
import { media } from "@/data/media";

export function RecyclingFeature() {
  const recycling = getBusiness("vehicle-recycling")!;
  const img = media.recyclingYard;
  return (
    <Reveal as="section" aria-labelledby="recycling-title" className="section-y bg-offwhite" style={accentStyle(recycling.accent)}>
      <div className="container-x grid items-center gap-y-12 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <p data-reveal className="eyebrow mb-5 flex items-center gap-2.5">
            <span aria-hidden="true" className="accent-bg size-3 rounded-[2px]" />
            Vehicle recycling
          </p>
          <h2 id="recycling-title" data-reveal className="display mb-6 text-[clamp(2.125rem,4.2vw,3.5rem)] text-balance">
            Giving vehicles a responsible new beginning.
          </h2>
          <p data-reveal className="mb-4 text-[1.0625rem] leading-relaxed text-muted">
            Our government-registered vehicle scrapping operation gives owners a legitimate way to retire an end-of-life
            vehicle. Each vehicle is processed responsibly, and recovered materials can return to industry.
          </p>
          <p data-reveal className="mb-10 text-[1.0625rem] leading-relaxed text-muted">
            With capacity for up to 1,800 vehicles a month, the facility serves individual owners and fleets alike.
          </p>
          <div data-reveal className="flex flex-wrap gap-3">
            <Button href="/scrap-a-vehicle" accent={recycling.accent}>
              Scrap a Vehicle
            </Button>
            <Button href="/businesses/vehicle-recycling" variant="secondary">
              About Vehicle Recycling
            </Button>
          </div>
        </div>
        <div data-reveal className="relative order-1 aspect-[4/3] overflow-hidden rounded-bl-[120px] lg:order-2 lg:col-span-6 lg:col-start-7 lg:aspect-[5/4]">
          <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
        </div>
      </div>
    </Reveal>
  );
}
