/**
 * International joint-venture relationships.
 * Approved: relationships exist in the USA, Japan and Germany.
 * PENDING: partner company names, approved logos and the business each venture serves.
 * Keep `partnerName` / `logo` / `focus` null until the client confirms them.
 */
export interface Partnership {
  code: string;
  country: string;
  region: string;
  partnerName: string | null;
  logo: string | null;
  focus: string | null;
}

export const partnerships: Partnership[] = [
  { code: "US", country: "United States", region: "North America", partnerName: null, logo: null, focus: null },
  { code: "JP", country: "Japan", region: "Asia", partnerName: null, logo: null, focus: null },
  { code: "DE", country: "Germany", region: "Europe", partnerName: null, logo: null, focus: null },
];
