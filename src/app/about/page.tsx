import type { Metadata } from "next";
import { PageWrapper }          from "@/components/ui/PageWrapper";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the JJFILMS team — 15 years of professional photography across real estate, product and events.",
  openGraph: { title: "About | JJFILMS" },
};
import { FloatingPhotoCollage } from "@/components/sections/FloatingPhotoCollage";
import { EditorialStatement }   from "@/components/sections/EditorialStatement";
import { HorizontalFilmstrip }  from "@/components/sections/HorizontalFilmstrip";
import { FAQAccordion }         from "@/components/sections/FAQAccordion";
import { CTASection }           from "@/components/sections/CTASection";
import { TeamSection }          from "@/components/sections/TeamSection";

export default function About() {
  return (
    <PageWrapper>
      <FloatingPhotoCollage title="Our Story" subtitle="About JJFILMS" />

      <EditorialStatement />

      <HorizontalFilmstrip />

      <TeamSection />

      <FAQAccordion />

      <CTASection
        image="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=85"
        headline="Let's work together."
        linkHref="/contact"
        linkText="GET IN TOUCH"
      />
    </PageWrapper>
  );
}
