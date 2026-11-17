import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="pt-[var(--header-offset)] pb-[clamp(4.5rem,9vw,8rem)]">
      <div className="container-x max-w-4xl">
        <p className="eyebrow mb-6 text-muted">404 · Page not found</p>
        <h1 id="nf-title" className="display mb-6 text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.98]">
          This road doesn&apos;t lead anywhere.
        </h1>
        <p className="mb-10 max-w-[48ch] text-lg text-muted">
          The page you&apos;re looking for may have moved. Start again from the homepage or explore our businesses.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/businesses" variant="secondary">
            Our Businesses
          </Button>
        </div>
      </div>
    </section>
  );
}
