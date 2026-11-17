import type { Metadata } from "next";
import { company } from "@/data/company";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
}

/** Per-page metadata with canonical URL and Open Graph. `metadataBase` is set in the root layout. */
export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${company.name}`,
      description,
      url: path,
      siteName: company.name,
      type: "website",
      locale: "en_IN",
    },
    twitter: { card: "summary", title: `${title} | ${company.name}`, description },
  };
}

/** Organization structured data using verified facts only. */
export function organizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: company.siteUrl,
    logo: `${company.siteUrl}/logo/abhishek-symbol.svg`,
    foundingDate: String(company.founded),
    slogan: company.tagline,
    address: {
      "@type": "PostalAddress",
      addressLocality: company.headquarters.city,
      addressRegion: company.headquarters.region,
      addressCountry: company.headquarters.countryCode,
    },
  };
  // Escape "<" so the JSON can never close the surrounding <script> tag.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
