import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { Reveal } from "@/components/animations/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { businesses, accentStyle } from "@/data/businesses";
import { groupCompanies, type GroupCompany } from "@/data/groupCompanies";
import { media } from "@/data/media";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Group Companies",
  description:
    "The companies of Abhishek Group: safety systems, registration plates, seat ventilation, vehicle recycling, automotive accessories, electronics, tyre mobility and logistics.",
  path: "/group-companies",
});

function CompanyCard({ company }: { company: GroupCompany }) {
  const biz = company.business ? businesses.find((b) => b.slug === company.business) : null;
  const body = (
    <>
      <div className="relative flex h-24 items-center">
        <Image
          src={company.logo.src}
          alt={`${company.name} logo`}
          width={company.logo.width}
          height={company.logo.height}
          className="h-auto max-h-20 w-auto max-w-[220px] object-contain"
        />
      </div>
      <span className="eyebrow mt-10 flex items-center gap-2 text-[0.6875rem] text-muted">
        <span aria-hidden="true" className={biz ? "accent-bg size-2.5 rounded-[2px]" : "size-2.5 rounded-[2px] bg-ink/25"} />
        {biz ? `${biz.stageNo} · ${biz.stage} · ${company.sector}` : company.sector}
      </span>
      <h3 className="mt-3 font-display text-[1.375rem] leading-tight font-medium tracking-[-0.02em]">{company.name}</h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{company.description}</p>
      {biz && (
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold">
          Explore {biz.name}
          <ArrowRight aria-hidden="true" strokeWidth={1.75} className="accent-text size-4 transition-transform group-hover:translate-x-1" />
        </span>
      )}
    </>
  );
  const cls = "group flex h-full min-h-[340px] flex-col rounded-t-[36px] bg-paper p-8";
  return (
    <li data-reveal style={biz ? accentStyle(biz.accent) : undefined}>
      {biz ? (
        <Link href={`/businesses/${biz.slug}`} className={`${cls} transition-transform duration-500 ease-out-quint hover:-translate-y-1.5`}>
          {body}
        </Link>
      ) : (
        <div className={cls}>{body}</div>
      )}
    </li>
  );
}

export default function GroupCompaniesPage() {
  const lifecycle = groupCompanies.filter((c) => c.business);
  const others = groupCompanies.filter((c) => !c.business);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Group Companies" }]}
        eyebrow="Group companies"
        title="Group companies bound by a common vision."
        intro="Eight companies make up Abhishek Group. Four of them serve a stage of the vehicle lifecycle; four more extend the group into accessories, electronics, tyre mobility and logistics."
        aside={media.factoryLine}
      >
        <p className="font-display text-5xl leading-none font-medium tracking-[-0.03em]">
          {groupCompanies.length}
          <span className="eyebrow ml-3 align-middle text-muted">Group companies</span>
        </p>
      </PageHero>

      <Reveal as="section" aria-labelledby="lifecycle-companies" className="section-y">
        <div className="container-x">
          <SectionHeading
            id="lifecycle-companies"
            eyebrow="Across the lifecycle"
            title="One company for every stage."
            intro="Built, registered, driven and reborn: the companies behind each of the group's four businesses."
            className="mb-12 lg:mb-16"
          />
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {lifecycle.map((c) => (
              <CompanyCard key={c.id} company={c} />
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal as="section" aria-labelledby="more-companies" className="section-y bg-offwhite">
        <div className="container-x">
          <SectionHeading
            id="more-companies"
            eyebrow="Beyond the lifecycle"
            title="More of the group."
            intro="Accessories, electronics, tyre mobility and freight forwarding, serving vehicle manufacturers and the wider industry."
            className="mb-12 lg:mb-16"
          />
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {others.map((c) => (
              <CompanyCard key={c.id} company={c} />
            ))}
          </ul>
        </div>
      </Reveal>
    </>
  );
}
