import Image from "next/image";
import { ArrowUpRight } from "@/components/ui/icons";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { media } from "@/data/media";
import { news } from "@/data/news";

/** Press coverage: one featured story with a photo, the rest as a typographic list. Links open the original article. */
export function NewsSection() {
  const [featured, ...rest] = news;
  const img = media[featured.image];

  return (
    <Reveal as="section" aria-labelledby="news-title" className="section-y">
      <div className="container-x">
        <SectionHeading
          id="news-title"
          eyebrow="In the news"
          title="Making headlines."
          intro="Coverage of the launch of our registered vehicle scrapping facility with Kaiho Sangyo, Japan."
          className="mb-12 lg:mb-16"
        />

        <div className="grid gap-4 lg:grid-cols-12">
          <a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
            className="group flex flex-col overflow-hidden rounded-[28px] bg-paper lg:col-span-7"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={img.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out-quint group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-1 flex-col gap-4 p-8 md:p-10">
              <p className="eyebrow text-[0.6875rem] text-muted">
                {featured.outlet} · {featured.date}
              </p>
              <h3 className="font-display text-[clamp(1.375rem,2.2vw,1.875rem)] leading-snug font-medium tracking-[-0.02em]">
                {featured.title}
              </h3>
              <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold">
                Read on {featured.outlet}
                <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="sr-only">(opens in a new tab)</span>
              </span>
            </div>
          </a>

          <ul className="flex flex-col gap-4 lg:col-span-5">
            {rest.map((n) => (
              <li key={n.id} data-reveal className="flex-1">
                <a
                  href={n.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col gap-3 rounded-[24px] bg-paper p-7 transition-colors duration-300 hover:bg-white/70"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="eyebrow text-[0.6875rem] text-muted">
                      {n.outlet} · {n.date}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={1.75}
                      className="size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                  <span className="font-display text-[1.1875rem] leading-snug font-medium tracking-[-0.015em]">{n.title}</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
