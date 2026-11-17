import { Reveal } from "@/components/animations/Reveal";
import { CountUp } from "@/components/animations/CountUp";
import { BrandMark } from "@/components/brand/BrandMark";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { stats } from "@/data/company";

/** Full-width band in the reference's "proven track record" layout, in Abhishek black. */
export function StatisticsSection() {
  return (
    <section aria-labelledby="stats-title" className="bg-ink text-paper">
      <Reveal className="container-x grid gap-y-12 py-[clamp(4.5rem,9vw,8rem)] lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
        <div className="lg:col-span-4">
          <p data-reveal className="eyebrow mb-6 flex items-center gap-2.5">
            <BrandMark />
            Our scale
          </p>
          <h2 id="stats-title" data-reveal className="display mb-6 text-[clamp(2.125rem,3.8vw,3.25rem)]">
            Built on decades of experience.
          </h2>
          <p data-reveal className="mb-8 max-w-[36ch] leading-relaxed text-white/70">
            Four decades in the Indian automotive industry, operating at national scale across four businesses.
          </p>
          <div data-reveal>
            <AnimatedLink href="/about" tone="light">
              About the group
            </AnimatedLink>
          </div>
        </div>

        <dl className="lg:col-span-7 lg:col-start-6">
          {stats.map((s) => (
            <div key={s.id} data-reveal className="flex flex-wrap items-baseline gap-x-5 gap-y-1 border-b border-white/20 py-6 first:pt-0">
              <dt className="order-2 text-[0.9375rem] text-white/70">
                {s.label}
                {"sub" in s && s.sub && <span className="text-white/45"> · {s.sub}</span>}
              </dt>
              <dd className="order-1 font-display text-[clamp(3rem,6vw,5.25rem)] leading-none font-normal tracking-[-0.03em] tabular-nums">
                {s.countUp ? <CountUp value={s.value} /> : s.display}
                {"suffix" in s && s.suffix && <span className="ml-2 text-[0.42em] tracking-[-0.01em]">{s.suffix.trim()}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
