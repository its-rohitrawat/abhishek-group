import { Suspense } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactFormWithParams } from "@/components/contact/ContactFormWithParams";
import { businesses, accentStyle } from "@/data/businesses";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Abhishek Group about safety systems, registration plates, seat comfort, vehicle recycling, partnerships or careers.",
  path: "/contact",
});

export default function ContactPage() {
  // Only a boolean leaves the server; the credentials themselves are never exposed.
  const deliveryConfigured = Boolean(
    process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL,
  );
  const formProps = { deliveryConfigured, fallbackEmail: company.contact.email };

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        eyebrow="Contact"
        title="Contact our team."
        intro="Tell us what you need and we'll route your enquiry to the right business."
      />

      <section aria-label="Contact form and details" className="section-y">
        <div className="container-x grid gap-y-14 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
          <aside className="flex flex-col gap-10 lg:col-span-4">
            <div>
              <h2 className="eyebrow mb-4 text-muted">Corporate office</h2>
              <address className="text-lg not-italic">
                {company.headquarters.city}, {company.headquarters.region}
                <br />
                {company.headquarters.country}
              </address>
              {company.contact.email && (
                <a href={`mailto:${company.contact.email}`} className="mt-3 block font-medium underline underline-offset-4">
                  {company.contact.email}
                </a>
              )}
              {company.contact.phone && <p className="mt-1">{company.contact.phone}</p>}
            </div>

            <div>
              <h2 className="eyebrow mb-4 text-muted">Enquiries by business</h2>
              <ul className="border-t border-line">
                {businesses.map((b) => (
                  <li key={b.slug} style={accentStyle(b.accent)} className="flex items-center gap-3 border-b border-line py-3 text-[0.9375rem]">
                    <span aria-hidden="true" className="accent-bg size-2" />
                    <span className="text-muted tabular-nums">{b.stageNo}</span>
                    {b.name}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.875rem] text-muted">
                Choose the matching enquiry category and your message goes to the right team.
              </p>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <Suspense fallback={<ContactForm {...formProps} />}>
              <ContactFormWithParams {...formProps} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
