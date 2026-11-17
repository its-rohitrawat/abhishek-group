import type { BusinessSlug } from "./businesses";

export type LocationType = "plant" | "office" | "plate-station" | "recycling";

export const locationTypes: { id: LocationType; label: string; plural: string }[] = [
  { id: "plant", label: "Manufacturing plant", plural: "Manufacturing plants" },
  { id: "office", label: "Office", plural: "Offices" },
  { id: "plate-station", label: "Registration plate station", plural: "Plate stations" },
  { id: "recycling", label: "Vehicle recycling facility", plural: "Recycling facilities" },
];

export interface Site {
  id: string;
  city: string;
  state: string;
  type: LocationType;
  /** Label exactly as published by the client (e.g. "Head Office", "Mother Plant"). */
  listedAs: string;
  business: BusinessSlug | null;
  /** Full street address. PENDING until supplied; never fabricate. */
  address: string | null;
}

/**
 * Source: location records published on the client's current website (abhishekgroup.co.in),
 * reviewed November 2026. City and state only; street addresses are pending.
 */
export const sites: Site[] = [
  { id: "ggn-ho", city: "Gurugram", state: "Haryana", type: "office", listedAs: "Head Office", business: null, address: null },
  { id: "ggn-mother", city: "Gurugram", state: "Haryana", type: "plant", listedAs: "Mother Plant", business: "registration-plates", address: null },
  { id: "ggn-seat", city: "Gurugram", state: "Haryana", type: "plant", listedAs: "Plant", business: "seat-comfort", address: null },
  { id: "ggn-safety", city: "Gurugram", state: "Haryana", type: "plant", listedAs: "Plant", business: "safety-systems", address: null },
  { id: "ggn-auto", city: "Gurugram", state: "Haryana", type: "plant", listedAs: "Plant", business: null, address: null },
  { id: "fatehpur", city: "Fatehpur", state: "Haryana", type: "recycling", listedAs: "Plant", business: "vehicle-recycling", address: null },
  { id: "new-delhi", city: "New Delhi", state: "Delhi", type: "office", listedAs: "Office", business: null, address: null },
  { id: "majrakath", city: "Majrakath", state: "Rajasthan", type: "plant", listedAs: "Plant", business: "safety-systems", address: null },
  { id: "kancheepuram", city: "Kancheepuram", state: "Tamil Nadu", type: "plant", listedAs: "Plant", business: "safety-systems", address: null },
  { id: "bharuch", city: "Bharuch", state: "Gujarat", type: "plate-station", listedAs: "Embossing Station", business: "registration-plates", address: null },
  { id: "vadodara", city: "Vadodara", state: "Gujarat", type: "plate-station", listedAs: "Embossing Station", business: "registration-plates", address: null },
  { id: "valsad", city: "Valsad", state: "Gujarat", type: "plate-station", listedAs: "Embossing Station", business: "registration-plates", address: null },
  { id: "kidgaon", city: "Kidgaon", state: "Maharashtra", type: "plate-station", listedAs: "Embossing Station", business: "registration-plates", address: null },
  { id: "nagaon", city: "Nagaon", state: "Maharashtra", type: "plate-station", listedAs: "Embossing Station", business: "registration-plates", address: null },
  { id: "nashik", city: "Nashik", state: "Maharashtra", type: "plate-station", listedAs: "Embossing Station", business: "registration-plates", address: null },
  { id: "bhubaneshwar", city: "Bhubaneshwar", state: "Odisha", type: "plate-station", listedAs: "Embossing Station", business: "registration-plates", address: null },
  { id: "brahmapur", city: "Brahmapur", state: "Odisha", type: "plate-station", listedAs: "Embossing Station", business: "registration-plates", address: null },
  { id: "jalda", city: "Jalda", state: "Odisha", type: "plate-station", listedAs: "Embossing Station", business: "registration-plates", address: null },
  { id: "jeypore", city: "Jeypore", state: "Odisha", type: "plate-station", listedAs: "Embossing Station", business: "registration-plates", address: null },
  { id: "rourkela", city: "Rourkela", state: "Odisha", type: "plate-station", listedAs: "Embossing Station", business: "registration-plates", address: null },
  { id: "sambalpur", city: "Sambalpur", state: "Odisha", type: "plate-station", listedAs: "Embossing Station", business: "registration-plates", address: null },
];

export const states = Array.from(new Set(sites.map((s) => s.state)));
