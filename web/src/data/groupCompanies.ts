import type { BusinessSlug } from "./businesses";

/**
 * Group companies as published on abhishekgroup.co.in/group-companies (reviewed November 2026).
 * Descriptions are lightly copy-edited from the published text. Logos are the client's published assets.
 */
export interface GroupCompany {
  id: string;
  name: string;
  description: string;
  logo: { src: string; width: number; height: number };
  /** Lifecycle business this company operates, if any. */
  business: BusinessSlug | null;
  sector: string;
}

export const groupCompanies: GroupCompany[] = [
  {
    id: "joyson-anand-abhishek",
    name: "Joyson Anand Abhishek Safety Systems",
    description: "Safety-critical components and systems.",
    logo: { src: "/images/companies/joyson-anand-abhishek.png", width: 480, height: 146 },
    business: "safety-systems",
    sector: "Safety systems",
  },
  {
    id: "abhishek-k-road-system",
    name: "Abhishek K Road System",
    description: "Manufacturing of high-security registration plates.",
    logo: { src: "/images/companies/abhishek-k-road-system.png", width: 190, height: 57 },
    business: "registration-plates",
    sector: "Registration plates",
  },
  {
    id: "abhishek-elektrosil",
    name: "Abhishek Elektrosil Auto Components",
    description: "Manufacturing of seat ventilation systems.",
    logo: { src: "/images/companies/abhishek-elektrosil.png", width: 480, height: 125 },
    business: "seat-comfort",
    sector: "Seat comfort",
  },
  {
    id: "abhishek-k-kaiho",
    name: "Abhishek K Kaiho Recyclers",
    description: "End-of-life vehicle dismantling and scrapping.",
    logo: { src: "/images/companies/abhishek-k-kaiho.png", width: 199, height: 119 },
    business: "vehicle-recycling",
    sector: "Vehicle recycling",
  },
  {
    id: "luster-automotive",
    name: "Luster Automotive",
    description: "Manufacturing and trading of accessories for OEMs.",
    logo: { src: "/images/companies/luster-automotive.png", width: 435, height: 113 },
    business: null,
    sector: "Automotive accessories",
  },
  {
    id: "multi-code-abhishek-k",
    name: "Multi-Code Abhishek K Auto Components",
    description: "Manufacturing and trading of electronic products.",
    logo: { src: "/images/companies/multi-code-abhishek-k.png", width: 222, height: 121 },
    business: null,
    sector: "Automotive electronics",
  },
  {
    id: "tek-abhishek-k",
    name: "TEK Abhishek K Auto Components",
    description: "Manufacturing of tyre repair kits and tyre mobility kits.",
    logo: { src: "/images/companies/tek-abhishek-k.png", width: 311, height: 271 },
    business: null,
    sector: "Tyre mobility",
  },
  {
    id: "abhishek-world-logistics",
    name: "Abhishek World Logistics",
    description: "Tailor-made freight forwarding services.",
    logo: { src: "/images/companies/abhishek-world-logistics.png", width: 480, height: 220 },
    business: null,
    sector: "Logistics",
  },
];
