import type { BusinessSlug } from "./businesses";

/**
 * Verbatim statements from Abhishek Group's public launch announcement (May 2022, syndicated by ANI,
 * e.g. theprint.in). These are leadership statements, NOT customer testimonials. Add genuine client
 * testimonials here only once they are supplied and approved.
 */
export interface Quote {
  id: string;
  text: string;
  name: string;
  role: string;
  business: BusinessSlug | null;
}

export const quoteSource = {
  label: "Statements from the Abhishek Group launch announcement, May 2022",
  url: "https://theprint.in/ani-press-releases/nitin-gadkari-minister-of-road-transport-highways-inaugurates-new-vehicle-scrapping-facility-by-abhishek-group-and-kaiho-sangyo-japan/953231/",
};

export const quotes: Quote[] = [
  {
    id: "chairman",
    text: "As a group, we believe in a Customer First approach that is delivered through honest and ethical business processes, whilst adhering to the highest quality standards.",
    name: "Dhiraj Dhar Gupta",
    role: "Group Chairman",
    business: null,
  },
  {
    id: "md-hsrp",
    text: "The HSRP venture will secure our country's vehicle fleet … This will also make the identification of vehicles easier thereby easing governance processes.",
    name: "Shreedhar Gupta",
    role: "Managing Director, Abhishek Group",
    business: "registration-plates",
  },
  {
    id: "md-seat",
    text: "The Seat Ventilation Systems is a first of a kind designed for very hot and humid climate we experience in India and will ensure a safe, cool and comfortable experience for passengers.",
    name: "Shreedhar Gupta",
    role: "Managing Director, Abhishek Group",
    business: "seat-comfort",
  },
  {
    id: "chairman-sustain",
    text: "We also believe in serving society at large by implementing sustainable practices and creating a safe and clean world for the generations to come.",
    name: "Dhiraj Dhar Gupta",
    role: "Group Chairman",
    business: null,
  },
  {
    id: "kaiho",
    text: "We believe in changing Waste to Treasure.",
    name: "Yuki Miyagawa",
    role: "Director, Kaiho Japan (stationed in India)",
    business: "vehicle-recycling",
  },
];
