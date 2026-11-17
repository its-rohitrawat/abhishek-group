"use client";

import { useSearchParams } from "next/navigation";
import { isCategory } from "@/lib/contact";
import { ContactForm } from "./ContactForm";

/** Reads ?category= so links like /contact?category=careers preselect the enquiry type. */
export function ContactFormWithParams(props: { deliveryConfigured: boolean; fallbackEmail: string | null }) {
  const params = useSearchParams();
  const category = params.get("category");
  return <ContactForm key={category ?? "general"} initialCategory={isCategory(category) ? category : "general"} {...props} />;
}
