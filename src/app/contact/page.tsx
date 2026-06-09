import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with JJFILMS to book a photography session for real estate, product or events.",
};

export default function Contact() {
  return <ContactForm />;
}
