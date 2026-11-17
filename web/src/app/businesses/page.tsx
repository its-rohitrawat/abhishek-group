import { media } from "@/data/media";
import { PageHero } from "@/components/sections/PageHero";
import { LifecycleProgress } from "@/components/animations/LifecycleProgress";
import { BusinessStageCard } from "@/components/home/BusinessStageCard";
import { businesses } from "@/data/businesses";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Businesses",
  description:
    "Safety systems, registration plates, seat comfort and vehicle recycling: four Abhishek Group businesses, each serving a stage of the vehicle lifecycle.",
  path: "/businesses",
});

export default function BusinessesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Our Businesses" }]}
        eyebrow="Our Businesses"
        title="Four businesses. One vehicle lifecycle."
        aside={media.factoryLine}
        intro="Built, registered, driven and reborn. Each Abhishek Group business serves one stage of a vehicle's life, and together they form one continuous journey."
      >
        <ol className="flex flex-wrap gap-x-8 gap-y-3">
          {businesses.map((b) => (
            <li key={b.slug} className="flex items-center gap-2 text-[0.9375rem]">
              <span aria-hidden="true" className="size-2" style={{ background: b.accent }} />
              <span className="text-muted tabular-nums">{b.stageNo}</span>
              <span className="font-medium">{b.stage}</span>
            </li>
          ))}
        </ol>
      </PageHero>

      <section aria-label="Business divisions" className="section-y bg-offwhite">
        <div className="container-x">
          <LifecycleProgress>
            {businesses.map((b) => (
              <BusinessStageCard key={b.slug} business={b} />
            ))}
          </LifecycleProgress>
        </div>
      </section>
    </>
  );
}
