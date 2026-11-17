import { media } from "@/data/media";
import { Reveal } from "@/components/animations/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { CountryPanels } from "@/components/sections/CountryPanels";
import { NumberedList } from "@/components/sections/NumberedList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Global Partnerships",
  description:
    "Abhishek Group's international joint ventures in the USA, Japan and Germany connect global knowledge with local execution in India.",
  path: "/partnerships",
});

const principles = [
  {
    title: "Global knowledge",
    body: "Joint ventures give each business access to international expertise in its field.",
  },
  {
    title: "Local execution",
    body: "Manufacturing, operations and service are delivered in India, close to the customers and authorities the group serves.",
  },
  {
    title: "Shared standards",
    body: "Working alongside international partners keeps quality and process expectations aligned with global practice.",
  },
  {
    title: "Long-term outlook",
    body: "Joint ventures are built as lasting relationships that grow with the Indian automotive industry.",
  },
];

export default function PartnershipsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Global Partnerships" }]}
        eyebrow="Global Partnerships"
        title="Indian roots. Global perspectives."
        intro="Abhishek Group's international joint ventures connect local execution with global knowledge and industry expertise."
        aside={media.heroBuilt}
      />

      <Reveal as="section" aria-labelledby="countries-title" className="section-y">
        <div className="container-x">
          <SectionHeading
            id="countries-title"
            eyebrow="Joint-venture relationships"
            title="Three countries. One group."
            intro="The group holds international joint-venture relationships in the United States, Japan and Germany."
            className="mb-12 lg:mb-16"
          />
          <CountryPanels />
        </div>
      </Reveal>

      <NumberedList
        id="outlook-title"
        eyebrow="International outlook"
        title="What partnership means to the group."
        items={principles}
        tone="offwhite"
        columns={4}
      />
    </>
  );
}
