import type { Metadata } from "next";
import { PageWrapper } from "@/components/ui/PageWrapper";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for JJFILMS — how we handle your personal data.",
};

const sections = [
  {
    title: "Information we collect",
    body: "When you submit a contact enquiry, we collect your name, email address, phone number and the details you provide in your message. We do not collect any information through cookies, analytics tools or tracking scripts on this website.",
  },
  {
    title: "How we use your information",
    body: "Your details are used solely to respond to your enquiry and to discuss a potential project. We do not sell, share or transfer your data to any third parties. We do not add you to any mailing list without your explicit consent.",
  },
  {
    title: "Data storage",
    body: "Enquiry emails are received and stored within our secure email system (Google Workspace). We retain enquiry data for up to 24 months, after which it is permanently deleted. You may request deletion of your data at any time by contacting us directly.",
  },
  {
    title: "Your rights",
    body: "You have the right to access, correct or request deletion of any personal data we hold about you. To exercise these rights, email us at hello@jjfilms.studio and we will respond within 7 working days.",
  },
  {
    title: "Contact",
    body: "For any privacy-related queries, contact Jignesh Shah at hello@jjfilms.studio or call +91 98200 12345. Our studio is located in Mumbai, Maharashtra, India.",
  },
];

export default function Privacy() {
  return (
    <PageWrapper>
      <section className="bg-cream-50 pt-40 pb-28 px-8 md:px-14">
        <div className="max-w-2xl mx-auto">
          <p className="text-label text-ink-300 tracking-widest mb-4">LEGAL</p>
          <h1
            className="font-display font-bold text-ink-900 leading-[0.95] mb-12"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
          >
            Privacy Policy
          </h1>
          <p className="text-ink-400 text-sm mb-12">Last updated: June 2026</p>

          <div className="space-y-12">
            {sections.map(({ title, body }) => (
              <div key={title}>
                <h2 className="font-display font-semibold text-ink-900 mb-3"
                  style={{ fontSize: "1.1rem", letterSpacing: "-0.01em" }}>
                  {title}
                </h2>
                <p className="text-ink-500 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
