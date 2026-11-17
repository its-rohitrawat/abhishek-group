import { businesses } from "@/data/businesses";
import { media } from "@/data/media";
import { HeroSlider, type HeroSlide } from "./HeroSlider";

export function HeroSection() {
  const slides: HeroSlide[] = [
    {
      id: "group",
      cardLabel: "Abhishek Group",
      cardTitle: "Since 1984",
      eyebrow: "Since 1984 · Gurugram, India",
      headline: ["For every stage", "of the vehicle."],
      text: "Since 1984, Abhishek Group has supported the automotive journey through safety systems, registration solutions, seat comfort technologies and responsible vehicle recycling.",
      cta: { label: "Explore Our Businesses", href: "/businesses" },
      image: { src: media.factoryLine.src, alt: media.factoryLine.alt },
      overlay: "#0A0A0A",
      tone: "light",
    },
    ...businesses.map<HeroSlide>((b) => ({
      id: b.slug,
      cardLabel: `${b.stageNo} · ${b.stage}`,
      cardTitle: b.name,
      eyebrow: `Stage ${b.stageNo} · ${b.stage}`,
      headline: b.name.split(" "),
      text: b.summary,
      cta: { label: "Learn more", href: `/businesses/${b.slug}` },
      image: { src: b.hero.image.src ?? media.factoryLine.src, alt: b.hero.image.alt },
      overlay: b.hero.overlay,
      tone: b.hero.tone,
    })),
  ];

  return <HeroSlider slides={slides} />;
}
