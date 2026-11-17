import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { businesses } from "@/data/businesses";

const routes = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/businesses", priority: 0.9 },
  ...businesses.map((b) => ({ path: `/businesses/${b.slug}`, priority: 0.8 })),
  { path: "/partnerships", priority: 0.6 },
  { path: "/locations", priority: 0.6 },
  { path: "/sustainability", priority: 0.6 },
  { path: "/careers", priority: 0.5 },
  { path: "/contact", priority: 0.7 },
  { path: "/scrap-a-vehicle", priority: 0.8 },
  { path: "/image-credits", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({ url: new URL(r.path, company.siteUrl).toString(), priority: r.priority }));
}
