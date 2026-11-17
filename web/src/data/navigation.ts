export interface NavItem {
  label: string;
  href: string;
  mega?: boolean;
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Chairman", href: "/chairman" },
  { label: "Our Businesses", href: "/businesses", mega: true },
  { label: "Group Companies", href: "/group-companies" },
  { label: "Global Partnerships", href: "/partnerships" },
  { label: "Customers", href: "/customers" },
  { label: "Locations", href: "/locations" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Chairman", href: "/chairman" },
    { label: "Group Companies", href: "/group-companies" },
    { label: "Global Partnerships", href: "/partnerships" },
    { label: "Customers", href: "/customers" },
    { label: "Locations", href: "/locations" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Careers", href: "/careers" },
  ],
  connect: [
    { label: "Contact", href: "/contact" },
    { label: "Scrap a Vehicle", href: "/scrap-a-vehicle" },
    { label: "Career enquiries", href: "/contact?category=careers" },
  ],
};

export const enquiryCategories = [
  { id: "general", label: "General Enquiry" },
  { id: "safety-systems", label: "Safety Systems" },
  { id: "registration-plates", label: "Registration Plates" },
  { id: "seat-comfort", label: "Seat Comfort" },
  { id: "vehicle-recycling", label: "Vehicle Recycling" },
  { id: "partnership", label: "Partnership" },
  { id: "careers", label: "Careers" },
] as const;

export type EnquiryCategory = (typeof enquiryCategories)[number]["id"];
