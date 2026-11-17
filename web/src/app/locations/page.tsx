import { media } from "@/data/media";
import { PageHero } from "@/components/sections/PageHero";
import { LocationExplorer } from "@/components/sections/LocationExplorer";
import { locationTypes, sites, states } from "@/data/locations";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Locations",
  description:
    "Abhishek Group operates 21 sites across 7 Indian states, including manufacturing plants, offices, registration plate stations and vehicle recycling.",
  path: "/locations",
});

export default function LocationsPage() {
  const facts = [
    { value: sites.length, label: "Sites" },
    { value: states.length, label: "States" },
    { value: locationTypes.length, label: "Location types" },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Locations" }]}
        eyebrow="Locations"
        title="Connected across India."
        aside={media.indiaExpressway}
        intro="Explore Abhishek Group's manufacturing plants, offices, registration plate stations and vehicle recycling operations by state and location type."
      >
        <dl className="flex flex-wrap gap-x-12 gap-y-6">
          {facts.map((f) => (
            <div key={f.label} className="flex flex-col-reverse">
              <dt className="eyebrow mt-2 text-muted">{f.label}</dt>
              <dd className="display text-5xl leading-none tabular-nums">{f.value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <section aria-label="Location explorer" className="section-y">
        <div className="container-x">
          <LocationExplorer headingLevel="h2" />
        </div>
      </section>
    </>
  );
}
