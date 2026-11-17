import { media } from "@/data/media";
import { Reveal } from "@/components/animations/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { NumberedList } from "@/components/sections/NumberedList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Button } from "@/components/ui/Button";
import { businesses, getBusiness } from "@/data/businesses";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sustainability",
  description:
    "How Abhishek Group's government-registered vehicle recycling closes the loop on the vehicle lifecycle, from end-of-life processing to material recovery.",
  path: "/sustainability",
});

const principles = [
  {
    title: "Registered, not informal",
    body: "End-of-life vehicles are processed through a government-registered facility, giving owners a legitimate and documented route.",
  },
  {
    title: "Recover before discarding",
    body: "Materials and reusable parts are recovered so they can return to industry rather than going to waste.",
  },
  {
    title: "Older vehicles off the road",
    body: "Responsible scrapping gives owners a clear way to retire vehicles that have reached the end of their useful life.",
  },
];

export default function SustainabilityPage() {
  const recycling = getBusiness("vehicle-recycling")!;
  return (
    <>
      <PageHero
        accent={recycling.accent}
        crumbs={[{ label: "Home", href: "/" }, { label: "Sustainability" }]}
        eyebrow="Sustainability"
        title="Responsibility doesn't end at the end of the road."
        intro="Abhishek Group's view of responsibility runs across the whole vehicle lifecycle, and the recycling business is where that loop closes."
        image={{ ...media.heroReborn, overlay: recycling.hero.overlay, tone: recycling.hero.tone }}
      />

      {/* The loop */}
      <Reveal as="section" aria-labelledby="loop-title" className="section-y">
        <div className="container-x">
          <SectionHeading
            id="loop-title"
            eyebrow="The lifecycle loop"
            title="Built, registered, driven, reborn."
            intro="Materials recovered at the end of one vehicle's life can become part of the next. That is where the lifecycle begins again."
            className="mb-12 lg:mb-16"
          />
          <ol className="grid border-t border-ink sm:grid-cols-2 xl:grid-cols-4">
            {businesses.map((b, i) => (
              <li
                key={b.slug}
                data-reveal
                className="relative flex flex-col gap-3 border-b border-line py-8 sm:pr-8 xl:[&:not(:first-child)]:border-l xl:[&:not(:first-child)]:pl-8"
              >
                <span aria-hidden="true" className={`absolute -top-px left-0 h-[3px] w-10 ${i > 0 ? "xl:left-8" : ""}`} style={{ background: b.accent }} />
                <span className="eyebrow text-muted">
                  {b.stageNo} · {b.stage}
                </span>
                <span className="display text-[1.5rem]">{b.name}</span>
                <span className="text-[0.9375rem] leading-relaxed text-muted">
                  {i === businesses.length - 1 ? "Materials are recovered, and the loop begins again." : b.summary}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      {/* Recycling feature */}
      <Reveal as="section" aria-labelledby="recycling-title" className="section-y bg-offwhite">
        <div className="container-x grid items-center gap-y-10 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
          <div className="lg:col-span-6">
            <p data-reveal className="eyebrow mb-6 flex items-center gap-3">
              <span aria-hidden="true" className="h-[3px] w-8" style={{ background: recycling.accent }} />
              Vehicle recycling
            </p>
            <h2 id="recycling-title" data-reveal className="display mb-6 text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1] text-balance">
              Giving vehicles a responsible new beginning.
            </h2>
            {recycling.overview.map((p) => (
              <p key={p.slice(0, 24)} data-reveal className="mb-4 max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted">
                {p}
              </p>
            ))}
            <div data-reveal className="mt-8 flex flex-wrap gap-3">
              <Button href="/scrap-a-vehicle" accent={recycling.accent}>
                Scrap a Vehicle
              </Button>
              <Button href={`/businesses/${recycling.slug}`} variant="secondary">
                About Vehicle Recycling
              </Button>
            </div>
          </div>
          <div data-reveal className="group lg:col-span-5 lg:col-start-8">
            <MediaFrame media={recycling.detailImage} accent={recycling.accent} tone="dark" className="aspect-[4/5] w-full rounded-bl-[110px]" />
          </div>
        </div>
      </Reveal>

      <NumberedList id="principles-title" eyebrow="Principles" title="What responsible recycling means." items={principles} />
    </>
  );
}
