import { media } from "@/data/media";
import { Reveal } from "@/components/animations/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { NumberedList } from "@/components/sections/NumberedList";
import { BusinessGrid } from "@/components/sections/BusinessGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatisticsSection } from "@/components/home/StatisticsSection";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Founded in 1984, Abhishek Group is an Indian automotive group with four businesses across the vehicle lifecycle: safety systems, registration plates, seat comfort and vehicle recycling.",
  path: "/about",
});

const philosophy = [
  {
    title: "Safety comes first",
    body: "Every business in the group exists to make vehicles safer, more accountable or more responsible, for the people who use them and the roads they share.",
  },
  {
    title: "Global knowledge, local execution",
    body: "International joint ventures bring proven expertise into the group. Execution, manufacturing and service happen here, across India.",
  },
  {
    title: "Compliance by design",
    body: "Registration and registered recycling are regulated activities. Working within those frameworks is part of how the group operates, not an afterthought.",
  },
  {
    title: "Responsibility across the lifecycle",
    body: "A vehicle's story does not end when it leaves the road. The group's view of responsibility runs from the first component to the last.",
  },
];

const timeline = [
  {
    year: String(company.founded),
    title: "Abhishek Group is established",
    body: "The group begins its journey in the Indian automotive industry.",
  },
  {
    year: "Today",
    title: "Four businesses, one lifecycle",
    body: "Safety systems, registration plates, seat comfort and vehicle recycling, operating from 21 sites across 7 states with joint ventures in the USA, Japan and Germany.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        eyebrow="About Us"
        title="Four decades inside the Indian vehicle."
        intro="Since 1984, Abhishek Group has grown into a group of four businesses, each serving a different stage in the life of a vehicle."
        aside={media.factoryFloor}
      />

      <Reveal as="section" aria-labelledby="who-title" className="section-y">
        <div className="container-x grid gap-y-10 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
          <h2 id="who-title" data-reveal className="display text-[clamp(2rem,3.8vw,3.25rem)] leading-[1.02] text-balance lg:col-span-6">
            One group, present at every stage of a vehicle&apos;s life.
          </h2>
          <div className="space-y-6 text-[1.0625rem] leading-relaxed text-muted lg:col-span-5 lg:col-start-8">
            <p data-reveal>
              A vehicle is built with safety systems, registered through secure identification, driven with enhanced
              comfort and, eventually, responsibly recycled. Abhishek Group has a business at each of those stages.
            </p>
            <p data-reveal>
              Each business brings its own expertise and partners. All four share the same group and the same
              long-term view of the automotive industry.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" aria-labelledby="history-title" className="section-y bg-offwhite">
        <div className="container-x">
          <SectionHeading id="history-title" eyebrow="History" title="From 1984 to today." className="mb-12 lg:mb-16" />
          <ol className="relative border-l border-ink/20 lg:ml-2">
            {timeline.map((t) => (
              <li key={t.year} data-reveal className="relative grid gap-3 pb-14 pl-8 last:pb-0 md:grid-cols-[200px_1fr] md:gap-10 md:pl-12">
                <span aria-hidden="true" className="absolute top-2 -left-[7px] size-[13px] rounded-full border-2 border-ink bg-offwhite" />
                <span className="display text-[clamp(2.5rem,4vw,3.5rem)] leading-none">{t.year}</span>
                <div>
                  <h3 className="display mb-2 text-[1.5rem]">{t.title}</h3>
                  <p className="max-w-[56ch] leading-relaxed text-muted">{t.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <NumberedList
        id="philosophy-title"
        eyebrow="Business philosophy"
        title="How the group works."
        items={philosophy}
      />

      <Reveal as="section" aria-labelledby="capabilities-title" className="section-y bg-offwhite">
        <div className="container-x">
          <SectionHeading
            id="capabilities-title"
            eyebrow="Capabilities"
            title="Four businesses. One connected journey."
            intro="Each division owns a stage of the vehicle lifecycle and carries its own colour across the group."
            className="mb-12 lg:mb-16"
          />
          <BusinessGrid />
        </div>
      </Reveal>

      <StatisticsSection />
    </>
  );
}
