import { Reveal } from "@/components/animations/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { customers, customersFootnote } from "@/data/customers";
import { media } from "@/data/media";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Customers",
  description:
    "Abhishek Group works with leading vehicle manufacturers and suppliers across the Indian automotive industry.",
  path: "/customers",
});

export default function CustomersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Customers" }]}
        eyebrow="Customers"
        title="Trusted across the automotive industry."
        intro="An obsession with securing the highest quality and compliance for our customers has made Abhishek Group a partner to leading vehicle manufacturers and suppliers."
        aside={media.safetySteering}
      />

      <Reveal as="section" aria-labelledby="customers-title" className="section-y">
        <div className="container-x">
          <SectionHeading
            id="customers-title"
            eyebrow="Our customers"
            title="Who we work with."
            intro="Vehicle manufacturers, component makers and industry leaders across India."
            className="mb-12 lg:mb-16"
          />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {customers.map((c) => (
              <li
                key={c.name}
                data-reveal
                className="flex min-h-[112px] items-center justify-center rounded-[20px] bg-paper px-5 py-6 text-center font-display text-[1.125rem] leading-tight font-medium tracking-[-0.015em] transition-transform duration-500 ease-out-quint hover:-translate-y-1 sm:text-[1.25rem]"
              >
                {c.name}
              </li>
            ))}
            <li data-reveal className="flex min-h-[112px] items-center justify-center rounded-[20px] border border-dashed border-ink/20 px-5 py-6 text-center text-[1.0625rem] text-muted italic">
              {customersFootnote}
            </li>
          </ul>
        </div>
      </Reveal>
    </>
  );
}
