import Image from "next/image";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { media } from "@/data/media";

export function CareersFeature() {
  const img = media.factoryTeam;
  return (
    <Reveal as="section" aria-labelledby="careers-title" className="section-y">
      <div className="container-x">
        <div className="grid overflow-hidden rounded-[28px] bg-paper md:grid-cols-2">
          <div data-reveal className="relative aspect-[16/10] md:aspect-auto md:min-h-[420px]">
            <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center gap-6 p-8 md:p-12 lg:p-16">
            <p data-reveal className="eyebrow text-muted">Careers</p>
            <h2 id="careers-title" data-reveal className="display text-[clamp(2rem,3.4vw,3rem)] text-balance">
              Build what moves us forward.
            </h2>
            <p data-reveal className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted">
              An established industrial organisation with opportunities across four businesses, from engineering and
              manufacturing to operations and corporate functions.
            </p>
            <div data-reveal>
              <Button href="/careers" variant="secondary">
                Explore Careers
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
