import { Reveal } from "@/components/animations/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { NumberedList } from "@/components/sections/NumberedList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Button } from "@/components/ui/Button";
import { accentStyle, getBusiness } from "@/data/businesses";
import { media } from "@/data/media";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Scrap a Vehicle",
  description:
    "Retire an end-of-life vehicle responsibly through Abhishek Group's government-registered vehicle scrapping and recycling operation.",
  path: "/scrap-a-vehicle",
});

const steps = [
  {
    title: "Get in touch",
    body: "Contact our recycling team with basic details about the vehicle and where it is.",
  },
  {
    title: "Documentation",
    body: "The team explains which ownership and registration documents are needed for a registered scrapping process.",
  },
  {
    title: "Processing",
    body: "The vehicle is processed at a registered facility, with materials and reusable parts recovered.",
  },
  {
    title: "Completion",
    body: "You receive the records issued through the registered process, so the vehicle's retirement is documented.",
  },
];

const audiences = [
  { title: "Vehicle owners", body: "Individuals retiring a vehicle that has reached the end of its road." },
  { title: "Fleet operators", body: "Businesses retiring multiple vehicles that need a consistent, documented process." },
  { title: "Organisations", body: "Institutions and authorities managing end-of-life vehicles responsibly." },
];

export default function ScrapAVehiclePage() {
  const recycling = getBusiness("vehicle-recycling")!;
  return (
    <div style={accentStyle(recycling.accent)}>
      <PageHero
        accent={recycling.accent}
        crumbs={[{ label: "Home", href: "/" }, { label: "Scrap a Vehicle" }]}
        eyebrow="Vehicle recycling"
        title="Scrap a vehicle, responsibly."
        intro="Abhishek Group's government-registered vehicle scrapping operation gives owners a legitimate, documented way to retire an end-of-life vehicle."
        image={{ ...media.heroReborn, overlay: recycling.hero.overlay, tone: recycling.hero.tone }}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact?category=vehicle-recycling" accent={recycling.accent}>
            Contact the recycling team
          </Button>
          <Button href="#how-it-works" variant="secondary" arrow={false}>
            How it works
          </Button>
        </div>
      </PageHero>

      <Reveal as="section" aria-labelledby="why-title" className="section-y">
        <div className="container-x grid gap-y-10 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
          <div className="lg:col-span-6">
            <SectionHeading id="why-title" eyebrow="Why registered scrapping" title="The right way to retire a vehicle." layout="stacked" />
          </div>
          <div className="space-y-6 text-[1.0625rem] leading-relaxed text-muted lg:col-span-5 lg:col-start-8 lg:self-end">
            <p data-reveal>
              Scrapping through a government-registered facility means the vehicle is processed responsibly and its
              retirement is properly documented.
            </p>
            <p data-reveal>
              Materials are recovered so they can return to industry, and an older vehicle is taken off the road for good.
              With capacity for up to 1,800 vehicles a month, the operation serves individual owners and fleets alike.
            </p>
          </div>
        </div>
      </Reveal>

      <div id="how-it-works">
        <NumberedList id="steps-title" eyebrow="How it works" title="Four simple stages." items={steps} tone="offwhite" columns={4} />
      </div>

      <NumberedList id="audience-title" eyebrow="Who it's for" title="For owners, fleets and organisations." items={audiences} />

      {/* Future request form slot: Phase 2 adds an online scrap request here without restructuring the page. */}
      <Reveal as="section" id="request" aria-labelledby="request-title" className="pb-[clamp(5rem,10vw,9rem)]">
        <div className="container-x">
          <div className="grid gap-10 rounded-[28px] bg-ink p-8 text-paper md:p-14 lg:grid-cols-12 lg:items-center lg:gap-x-[var(--gutter)] lg:p-20">
            <div className="lg:col-span-7">
              <p data-reveal className="eyebrow mb-6 flex items-center gap-3 text-white/60">
                <span aria-hidden="true" className="accent-bg h-[3px] w-8" />
                Start here
              </p>
              <h2 id="request-title" data-reveal className="display mb-6 text-[clamp(2.25rem,4.6vw,4rem)] leading-[1] text-balance">
                Speak to our recycling team.
              </h2>
              <p data-reveal className="max-w-[52ch] text-lg text-white/65">
                Online scrap requests are coming soon. For now, send us an enquiry and the recycling team will guide you
                through the process.
              </p>
            </div>
            <div data-reveal className="group lg:col-span-5">
              <Button href="/contact?category=vehicle-recycling" variant="light" accent={recycling.accent}>
                Send an enquiry
              </Button>
              <MediaFrame media={recycling.detailImage} accent={recycling.accent} tone="dark" className="mt-8 hidden aspect-[16/9] w-full rounded-[18px] lg:block" />
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
