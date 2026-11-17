import { Reveal } from "@/components/animations/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { NumberedList } from "@/components/sections/NumberedList";
import { BusinessGrid } from "@/components/sections/BusinessGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { media } from "@/data/media";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Careers",
  description:
    "Build your career with Abhishek Group, an established Indian automotive group with opportunities across safety systems, registration plates, seat comfort and vehicle recycling.",
  path: "/careers",
});

const culture = [
  {
    title: "Purposeful work",
    body: "Every business in the group plays a real part in how vehicles are built, identified, used and retired.",
  },
  {
    title: "Breadth of experience",
    body: "Four businesses mean exposure to manufacturing, regulated services and operations within one group.",
  },
  {
    title: "International exposure",
    body: "Joint ventures with partners in the USA, Japan and Germany bring global practice into everyday work.",
  },
  {
    title: "An established foundation",
    body: "Four decades in the Indian automotive industry provide stability to build a long-term career on.",
  },
];

/** PENDING: replace with live vacancies when the client supplies them. Never invent roles. */
const openPositions: { title: string; business: string; location: string }[] = [];

export default function CareersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
        eyebrow="Careers"
        title="Build what moves us forward."
        intro="Abhishek Group is an established industrial organisation with opportunities across four businesses, from engineering and manufacturing to operations and corporate functions."
        aside={media.factoryTeam}
      >
        <Button href="/contact?category=careers">Send a career enquiry</Button>
      </PageHero>

      <NumberedList id="culture-title" eyebrow="Working here" title="Why join Abhishek Group." items={culture} columns={4} />

      <Reveal as="section" aria-labelledby="areas-title" className="section-y bg-offwhite">
        <div className="container-x">
          <SectionHeading
            id="areas-title"
            eyebrow="Where you could work"
            title="Four businesses to grow in."
            className="mb-12 lg:mb-16"
          />
          <BusinessGrid />
        </div>
      </Reveal>

      <Reveal as="section" aria-labelledby="vacancies-title" className="section-y">
        <div className="container-x">
          <SectionHeading id="vacancies-title" eyebrow="Open positions" title="Current vacancies." className="mb-10" />
          {openPositions.length > 0 ? (
            <ul className="border-t border-ink">
              {openPositions.map((job) => (
                <li key={job.title} data-reveal className="grid gap-2 border-b border-line py-6 md:grid-cols-3">
                  <span className="display text-xl">{job.title}</span>
                  <span className="text-muted">{job.business}</span>
                  <span className="text-muted">{job.location}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div data-reveal className="flex flex-col gap-6 border border-line p-8 md:flex-row md:items-center md:justify-between md:p-12">
              <div>
                <p className="display mb-2 text-[1.5rem]">No positions are listed right now.</p>
                <p className="max-w-[56ch] text-muted">
                  We still welcome career enquiries. Tell us about your experience and the business you&apos;re interested in.
                </p>
              </div>
              <Button href="/contact?category=careers" variant="secondary" className="shrink-0">
                Career enquiry
              </Button>
            </div>
          )}
        </div>
      </Reveal>
    </>
  );
}
