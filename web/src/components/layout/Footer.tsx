import Link from "next/link";
import { cacheLife } from "next/cache";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Reveal } from "@/components/animations/Reveal";
import { company } from "@/data/company";
import { businesses, accentStyle } from "@/data/businesses";
import { sites } from "@/data/locations";

/** Cached so the static shell can prerender (reading the clock directly is not allowed). */
async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

/** Office columns built from the published site list (city and state only). */
function officeColumns() {
  const cityState = (type: string) =>
    Array.from(new Set(sites.filter((s) => s.type === type).map((s) => `${s.city}, ${s.state}`)));
  const stationStates = Array.from(
    sites
      .filter((s) => s.type === "plate-station")
      .reduce((m, s) => m.set(s.state, (m.get(s.state) ?? 0) + 1), new Map<string, number>()),
  ).map(([state, n]) => `${state} (${n})`);
  return [
    { title: "Corporate Office", lines: [`${company.headquarters.city}`, `${company.headquarters.region}`, company.headquarters.country] },
    { title: "Offices", lines: cityState("office").filter((l) => !l.startsWith(company.headquarters.city)) },
    { title: "Manufacturing & Recycling", lines: [...cityState("plant"), ...cityState("recycling")] },
    { title: "Plate Stations", lines: stationStates },
  ];
}

export async function Footer() {
  const year = await getCurrentYear();
  const columns = officeColumns();

  return (
    <footer data-site-footer>
      {/* Warm call-to-action panel */}
      <Reveal className="container-x pb-14">
        <div
          data-reveal
          className="grid gap-10 overflow-hidden rounded-[28px] px-8 py-14 text-paper md:px-14 md:py-20 lg:grid-cols-2 lg:items-center lg:gap-16"
          style={{ background: "var(--cta-gradient)" }}
        >
          <h2 className="font-display text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1.02] font-medium tracking-[-0.035em] text-balance">
            Let&apos;s build what comes next, together.
          </h2>
          <div className="flex flex-col items-start gap-8">
            <p className="max-w-[46ch] text-lg leading-relaxed text-white/95">
              Explore opportunities to collaborate with Abhishek Group. From safety systems to responsible recycling, our
              teams will point you to the right business.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 rounded-[6px] bg-paper py-1.5 pr-5 pl-1.5 text-ink shadow-[0_10px_30px_-12px_rgb(0_0_0/0.35)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="flex size-11 items-center justify-center rounded-[4px] bg-ink text-paper">
                <ArrowRight aria-hidden="true" className="size-5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.75} />
              </span>
              <span className="text-lg font-medium tracking-[-0.01em]">Get In Touch</span>
            </Link>
          </div>
        </div>
      </Reveal>

      <div className="bg-paper">
        <div className="container-x">
          {/* Brand row */}
          <div className="grid gap-10 border-b border-line py-14 md:grid-cols-3 md:items-center">
            <div>
              <Link href="/" aria-label="Abhishek Group home" className="inline-block">
                <Logo />
              </Link>
              <p className="mt-5 text-lg leading-snug">
                For <strong className="font-semibold">every stage</strong>
                <br />
                of the <strong className="font-semibold">vehicle.</strong>
              </p>
            </div>
            <div>
              {company.contact.email ? (
                <a href={`mailto:${company.contact.email}`} className="text-xl underline-offset-4 hover:underline">
                  {company.contact.email}
                </a>
              ) : (
                <Link href="/contact" className="group inline-flex items-center gap-2 text-xl">
                  Contact our team
                  <ArrowRight aria-hidden="true" className="size-5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                </Link>
              )}
            </div>
            <nav aria-label="Businesses" className="md:justify-self-end">
              <ul className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
                {businesses.map((b) => (
                  <li key={b.slug} style={accentStyle(b.accent)}>
                    <Link href={`/businesses/${b.slug}`} className="inline-flex items-center gap-2 text-[0.9375rem] hover:underline hover:underline-offset-4">
                      <span aria-hidden="true" className="accent-bg size-2 rounded-[2px]" />
                      {b.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Offices */}
          <div className="grid gap-10 border-b border-line py-14 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((c) => (
              <div key={c.title}>
                <h2 className="mb-5 text-xl font-semibold tracking-[-0.01em]">{c.title}</h2>
                <ul className="space-y-1.5 text-[1.0625rem] text-ink/80">
                  {c.lines.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Site links */}
          <nav aria-label="Footer" className="border-b border-line py-8">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[0.9375rem]">
              {[
                ["About Us", "/about"],
                ["Our Businesses", "/businesses"],
                ["Global Partnerships", "/partnerships"],
                ["Locations", "/locations"],
                ["Sustainability", "/sustainability"],
                ["Careers", "/careers"],
                ["Contact", "/contact"],
                ["Scrap a Vehicle", "/scrap-a-vehicle"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:underline hover:underline-offset-4">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom line */}
          <div className="flex flex-col gap-3 py-7 text-[0.9375rem] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {company.legal.privacyPolicyHref && (
                <Link href={company.legal.privacyPolicyHref} className="hover:underline">
                  Privacy Policy
                </Link>
              )}
              {company.legal.termsHref && (
                <Link href={company.legal.termsHref} className="hover:underline">
                  Terms
                </Link>
              )}
              <Link href="/image-credits" className="hover:underline">
                Image credits
              </Link>
            </div>
            <p className="text-muted">
              © {year} {company.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
