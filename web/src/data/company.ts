/**
 * Company facts. Only approved / client-published information belongs here.
 * Anything not yet confirmed is `null` and listed in `pendingContent`.
 */
export const company = {
  name: "Abhishek Group",
  wordmark: "ABHISHEK",
  tagline: "For every stage of the vehicle.",
  founded: 1984,
  siteUrl: "https://www.abhishekgroup.co.in",
  // City-level corporate office, as published on the current abhishekgroup.co.in
  headquarters: { city: "Gurugram", region: "Haryana", country: "India", countryCode: "IN" },
  contact: {
    email: null as string | null, // PENDING: public enquiries email
    phone: null as string | null, // PENDING: public phone number
  },
  legal: {
    privacyPolicyHref: null as string | null, // PENDING: publish policy, then set "/privacy"
    termsHref: null as string | null, // PENDING
  },
} as const;

/** Approved figures only. Do not add statistics that have not been supplied. */
export const stats = [
  { id: "established", value: 1984, display: "1984", label: "Year established", countUp: false },
  { id: "sites", value: 21, display: "21", label: "Sites across India", countUp: true },
  { id: "states", value: 7, display: "7", label: "States of operation", countUp: true },
  { id: "vehicles", value: 1800, display: "1,800", label: "Vehicles per month", sub: "Recycling capacity", countUp: true },
  { id: "plates", value: 3, display: "3", suffix: " Million", label: "Registration plates per month", sub: "Production capacity", countUp: true },
] as const;

/** Content the client still needs to supply or confirm. Surfaced in the README. */
export const pendingContent = [
  "Master logo artwork as SVG (current symbol is a vector trace of the approved PNG)",
  "Photography for each business, the facilities and careers",
  "Public contact email and phone number",
  "Joint-venture partner names and approved partner logos (USA, Japan, Germany)",
  "Dated history milestones beyond 1984",
  "Full site addresses for the location explorer (city and state are published)",
  "Privacy policy and terms of use",
  "Open positions for the careers page",
] as const;
