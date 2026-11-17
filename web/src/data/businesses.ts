import type { CSSProperties } from "react";
import { media, type MediaKey } from "./media";

export type BusinessSlug = "safety-systems" | "registration-plates" | "seat-comfort" | "vehicle-recycling";

export interface MediaAsset {
  /** Path under /public once client photography is supplied. `null` renders a labelled placeholder. */
  src: string | null;
  alt: string;
  /** Shown on the placeholder so nobody mistakes it for a real facility photo. */
  placeholder: string;
}

/** Build a MediaAsset from the image registry. */
const asset = (key: MediaKey, placeholder: string): MediaAsset => ({ src: media[key].src, alt: media[key].alt, placeholder });

export interface Business {
  slug: BusinessSlug;
  stageNo: "01" | "02" | "03" | "04";
  stage: "BUILT" | "REGISTERED" | "DRIVEN" | "REBORN";
  name: string;
  accent: string;
  /** Short line used on cards and the lifecycle section. */
  summary: string;
  /** Hero headline on the division page. */
  headline: string;
  overview: string[];
  products: { name: string; description: string }[];
  audiences: string[];
  connection: string;
  image: MediaAsset;
  detailImage: MediaAsset;
  /** Hero slide styling: colour wash over the photo and the text tone that stays readable on it. */
  hero: { image: MediaAsset; overlay: string; tone: "light" | "dark" };
  icon: "shield" | "plate" | "wind" | "cycle";
  contactCategory: string;
}

export const businesses: Business[] = [
  {
    slug: "safety-systems",
    stageNo: "01",
    stage: "BUILT",
    name: "Safety Systems",
    accent: "#E5432D",
    summary: "Engineering essential safety systems for the vehicles of today and tomorrow.",
    headline: "Safety, engineered in from the start.",
    overview: [
      "A vehicle's first stage is the factory floor. Our safety systems business supplies the components that are engineered into a vehicle before it ever reaches the road.",
      "Seatbelts, airbags and steering wheels work together as one system. Each is built to protect the people inside the vehicle, from the first journey onwards.",
    ],
    products: [
      { name: "Seatbelts", description: "Occupant restraint systems that hold drivers and passengers securely in place." },
      { name: "Airbags", description: "Supplemental restraint systems that work alongside seatbelts to reduce injury." },
      { name: "Steering wheels", description: "The driver's primary point of control, designed to integrate with in-vehicle safety systems." },
    ],
    audiences: ["Automotive OEMs", "Vehicle manufacturers"],
    connection:
      "The safety a vehicle is built with stays with it for life. It is the first stage of the lifecycle Abhishek Group supports, before registration, everyday driving and responsible recycling.",
    image: asset("safetyWebbing", "Seatbelt webbing"),
    detailImage: asset("safetySteering", "Steering wheel and airbag module"),
    hero: { image: asset("heroBuilt", "Vehicle assembly line"), overlay: "#C8351F", tone: "light" },
    icon: "shield",
    contactCategory: "safety-systems",
  },
  {
    slug: "registration-plates",
    stageNo: "02",
    stage: "REGISTERED",
    name: "Registration Plates",
    accent: "#1D4ED8",
    summary: "Supporting secure vehicle identification through high-security registration plate solutions.",
    headline: "A secure identity for every vehicle.",
    overview: [
      "Once a vehicle is built it needs an identity. Our registration plate business produces high-security registration plates, the tamper-resistant plates that link every vehicle to its official record.",
      "With production capacity of up to 3 million plates a month, the business supports secure vehicle identification at national scale, through a network of registration plate stations.",
    ],
    products: [
      { name: "High-security registration plates", description: "Tamper-resistant plates that support reliable vehicle identification." },
      { name: "Vehicle identification solutions", description: "Related solutions that connect a vehicle to its registration record." },
      { name: "Registration plate stations", description: "Locations where plates are processed for vehicles across several states." },
    ],
    audiences: ["Government and transport authorities", "Vehicle owners"],
    connection:
      "Registration is the moment a vehicle becomes part of the system. It connects the safety it was built with to the years of driving ahead.",
    image: asset("heroRegistered", "Indian registration plate"),
    detailImage: asset("platesDetail", "Registration plate close-up"),
    hero: { image: asset("heroRegistered", "Indian registration plate"), overlay: "#1D4ED8", tone: "light" },
    icon: "plate",
    contactCategory: "registration-plates",
  },
  {
    slug: "seat-comfort",
    stageNo: "03",
    stage: "DRIVEN",
    name: "Seat Comfort",
    accent: "#22B8CF",
    summary: "Enhancing the driving experience through advanced seating ventilation and cooling technologies.",
    headline: "Comfort for every mile in between.",
    overview: [
      "Most of a vehicle's life is spent on the road. Our seat comfort business develops seat ventilation and cooling technologies that keep drivers and passengers comfortable.",
      "Climate inside the cabin matters, particularly in demanding conditions. Ventilated and cooled seating makes every journey easier on the people making it.",
    ],
    products: [
      { name: "Seat ventilation", description: "Airflow through the seat surface to reduce heat and moisture build-up." },
      { name: "Seat cooling", description: "Active cooling technologies integrated into automotive seating." },
    ],
    audiences: ["Automotive OEMs", "Seating manufacturers"],
    connection:
      "Driving is the longest stage of a vehicle's life. Seat comfort is how the group stays part of the everyday experience, between registration and recycling.",
    image: asset("comfortDetail", "Leather car seats"),
    detailImage: asset("heroDriven", "Car interior"),
    hero: { image: asset("heroDriven", "Car interior"), overlay: "#22B8CF", tone: "dark" },
    icon: "wind",
    contactCategory: "seat-comfort",
  },
  {
    slug: "vehicle-recycling",
    stageNo: "04",
    stage: "REBORN",
    name: "Vehicle Recycling",
    accent: "#2E9E5B",
    summary: "Enabling responsible end-of-life vehicle processing and material recovery.",
    headline: "A responsible new beginning.",
    overview: [
      "Every vehicle eventually reaches the end of the road. Our government-registered vehicle scrapping operation processes end-of-life vehicles responsibly and recovers materials so they can return to industry.",
      "With capacity to process up to 1,800 vehicles a month, the business gives vehicle and fleet owners a legitimate, documented way to retire a vehicle.",
    ],
    products: [
      { name: "Government-registered scrapping", description: "End-of-life vehicle processing through a registered facility." },
      { name: "Material recovery", description: "Recovery of reusable materials so they can re-enter the supply chain." },
      { name: "Fleet and owner support", description: "Guidance for individual and fleet owners retiring vehicles." },
    ],
    audiences: ["Vehicle owners", "Fleet operators", "Government and transport authorities"],
    connection:
      "Recycling closes the loop. Materials recovered at the end of one vehicle's life can become part of the next, which is where the lifecycle begins again.",
    image: asset("heroReborn", "Vehicles stacked for recycling"),
    detailImage: asset("recyclingYard", "Salvage yard"),
    hero: { image: asset("heroReborn", "Vehicles stacked for recycling"), overlay: "#2E9E5B", tone: "dark" },
    icon: "cycle",
    contactCategory: "vehicle-recycling",
  },
];

export const getBusiness = (slug: string) => businesses.find((b) => b.slug === slug);

export const accentStyle = (accent: string) => ({ "--accent": accent }) as CSSProperties;
