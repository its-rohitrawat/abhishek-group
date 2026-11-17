import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { CountryPanels } from "@/components/sections/CountryPanels";

export function PartnershipsSection() {
  return (
    <Reveal as="section" aria-labelledby="partners-title" className="section-y bg-offwhite">
      <div className="container-x">
        <SectionHeading
          id="partners-title"
          eyebrow="Global partnerships"
          title="Indian roots. Global perspectives."
          intro="Abhishek Group's international joint ventures connect local execution with global knowledge and industry expertise."
          className="mb-12 lg:mb-16"
        />
        <CountryPanels />
        <div data-reveal className="mt-10">
          <AnimatedLink href="/partnerships">Explore Our Partnerships</AnimatedLink>
        </div>
      </div>
    </Reveal>
  );
}
