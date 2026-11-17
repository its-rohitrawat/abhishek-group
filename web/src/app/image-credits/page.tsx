import { PageHero } from "@/components/sections/PageHero";
import { media } from "@/data/media";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Image Credits",
  description: "Attribution for the openly licensed photography used on this website.",
  path: "/image-credits",
});

export default function ImageCreditsPage() {
  const items = Object.values(media).filter((m) => m.credit);
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Image Credits" }]}
        eyebrow="Image credits"
        title="Photography credits."
        intro="This website uses openly licensed photography to illustrate the automotive lifecycle. These are representative images, not photographs of Abhishek Group facilities. Images have been resized and cropped for layout."
      />
      <section aria-label="Credits" className="pb-[clamp(4.5rem,9vw,8rem)]">
        <div className="container-x">
          <ul className="grid gap-4 md:grid-cols-2">
            {items.map((m) => (
              <li key={m.src} className="flex gap-5 rounded-[20px] bg-paper p-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.src} alt="" width={120} height={80} loading="lazy" className="h-20 w-30 shrink-0 rounded-[10px] object-cover" />
                <div className="min-w-0 text-[0.9375rem]">
                  <p className="font-semibold">
                    <a href={m.credit!.source} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                      {m.credit!.title}
                    </a>
                  </p>
                  <p className="text-muted">by {m.credit!.creator}</p>
                  <p className="text-muted">
                    {m.credit!.licenseUrl ? (
                      <a href={m.credit!.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                        {m.credit!.license}
                      </a>
                    ) : (
                      m.credit!.license
                    )}
                    , resized and cropped
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
