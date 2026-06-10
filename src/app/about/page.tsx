import type { Metadata } from "next";
import { PageWrapper }          from "@/components/ui/PageWrapper";

export const metadata: Metadata = {
  title: "About",
  description: "JJ Films was founded in 1999 by brothers Jignesh and Jay Shah. 25 years, 500+ projects, three continents.",
  openGraph: { title: "About | JJFILMS", images: [{ url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80" }] },
};
import { FloatingPhotoCollage } from "@/components/sections/FloatingPhotoCollage";
import { StatsCounter }         from "@/components/sections/StatsCounter";
import { AboutStory }           from "@/components/sections/AboutStory";
import { VideoShowreel }        from "@/components/ui/VideoShowreel";
import { WhyChooseUs }          from "@/components/sections/WhyChooseUs";
import { HorizontalFilmstrip }  from "@/components/sections/HorizontalFilmstrip";
import { TeamSection }          from "@/components/sections/TeamSection";
import { ClientStrip }          from "@/components/sections/ClientStrip";
import { PressStrip }           from "@/components/sections/PressStrip";
import { AwardsStrip }          from "@/components/sections/AwardsStrip";
import { InstagramFeed }        from "@/components/sections/InstagramFeed";
import { FAQAccordion }         from "@/components/sections/FAQAccordion";
import { CTASection }           from "@/components/sections/CTASection";

export default function About() {
  return (
    <PageWrapper>
      <FloatingPhotoCollage title="Our Story" subtitle="JJFILMS · EST. 1999" />

      <StatsCounter />

      <AboutStory />

      <WhyChooseUs />

      <VideoShowreel title="25 Years in Motion" label="OUR STORY" />

      <HorizontalFilmstrip />

      <TeamSection />

      <ClientStrip />

      <PressStrip />

      <AwardsStrip />

      <InstagramFeed />

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
