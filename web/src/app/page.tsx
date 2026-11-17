import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { GroupIntro } from "@/components/home/GroupIntro";
import { BusinessCards } from "@/components/home/BusinessCards";
import { StatisticsSection } from "@/components/home/StatisticsSection";
import { QuotesCarousel } from "@/components/home/QuotesCarousel";
import { PartnershipsSection } from "@/components/home/PartnershipsSection";
import { LocationsPreview } from "@/components/home/LocationsPreview";
import { RecyclingFeature } from "@/components/home/RecyclingFeature";
import { NewsSection } from "@/components/home/NewsSection";
import { CareersFeature } from "@/components/home/CareersFeature";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <GroupIntro />
      <BusinessCards />
      <StatisticsSection />
      <QuotesCarousel />
      <PartnershipsSection />
      <LocationsPreview />
      <RecyclingFeature />
      <NewsSection />
      <CareersFeature />
    </>
  );
}
