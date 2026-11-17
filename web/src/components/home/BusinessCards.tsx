import Link from "next/link";
import { ArrowRight, IdCard, RotateCcw, ShieldCheck, Wind } from "@/components/ui/icons";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { businesses, accentStyle, type Business } from "@/data/businesses";

const icons: Record<Business["icon"], typeof ShieldCheck> = {
  shield: ShieldCheck,
  plate: IdCard,
  wind: Wind,
  cycle: RotateCcw,
};

/** Two-tone icon: a solid accent block behind a thin accent outline icon. */
export function StageIcon({ icon }: { icon: Business["icon"] }) {
  const Icon = icons[icon];
  return (
    <span aria-hidden="true" className="relative inline-flex size-[88px] items-end">
      <span className="accent-bg absolute bottom-1 left-1 h-9 w-12 rounded-[6px]" />
      <Icon className="accent-text relative size-[76px]" strokeWidth={1.1} />
    </span>
  );
}

export function BusinessCards() {
  return (
    <Reveal as="section" aria-labelledby="businesses-title" className="section-y">
      <div className="container-x">
        <SectionHeading
          id="businesses-title"
          eyebrow="Our businesses"
          title="Four businesses. One connected journey."
          intro="From the first safety component to a responsible new beginning, each business serves one stage of a vehicle's life."
          className="mb-12 lg:mb-16"
        />
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {businesses.map((b) => (
            <li key={b.slug} data-reveal style={accentStyle(b.accent)}>
              <Link
                href={`/businesses/${b.slug}`}
                className="group relative flex h-full min-h-[380px] flex-col rounded-t-[40px] bg-paper p-8 transition-transform duration-500 ease-out-quint hover:-translate-y-1.5"
              >
                <StageIcon icon={b.icon} />
                <span className="eyebrow mt-auto pt-14 text-[0.6875rem] text-muted">
                  {b.stageNo} · {b.stage}
                </span>
                <span className="mt-3 font-display text-[1.5rem] leading-tight font-medium tracking-[-0.02em]">{b.name}</span>
                <span className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{b.summary}</span>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                  Explore
                  <ArrowRight aria-hidden="true" strokeWidth={1.75} className="accent-text size-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span aria-hidden="true" className="accent-bg absolute inset-x-8 bottom-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 ease-out-quint group-hover:scale-x-100" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
