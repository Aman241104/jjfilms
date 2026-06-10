import type { Metadata } from "next";
import { PageWrapper }          from "@/components/ui/PageWrapper";

export const metadata: Metadata = {
  title: "Product Photography",
  description: "Clean, compelling product photography for brands and e-commerce. Studio and on-location. 48-hour turnaround available.",
  openGraph: { title: "Product Photography | JJFILMS", images: [{ url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80" }] },
};
import { HeroEditorial }        from "@/components/sections/HeroEditorial";
import { ServicePageIntro }     from "@/components/sections/ServicePageIntro";
import { VideoShowreel }        from "@/components/ui/VideoShowreel";
import { ProcessSection }       from "@/components/sections/ProcessSection";
import { WhyChooseUs }          from "@/components/sections/WhyChooseUs";
import { BeforeAfterSlider }    from "@/components/sections/BeforeAfterSlider";
import { StatsCounter }         from "@/components/sections/StatsCounter";
import { PricingPackages }      from "@/components/sections/PricingPackages";
import { HorizontalFilmstrip }  from "@/components/sections/HorizontalFilmstrip";
import { EditorialTestimonial } from "@/components/sections/EditorialTestimonial";
import { ClientStrip }          from "@/components/sections/ClientStrip";
import { FAQAccordion }         from "@/components/sections/FAQAccordion";
import { CTASection }           from "@/components/sections/CTASection";

export default function ProductPhotography() {
  return (
    <PageWrapper>
      <HeroEditorial
        image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1920&q=90"
        tagline="Product Photography"
        location="STUDIO · ON LOCATION"
      />

      <ServicePageIntro
        label="PRODUCT PHOTOGRAPHY"
        accentColor="var(--accent-pr)"
        headline="Clean, compelling visuals for brands that refuse to be ordinary."
        body="From e-commerce catalogues to campaign hero shots, we collaborate with brands of every scale to create imagery that sells. Every object has a story — our job is to tell it beautifully."
        stats={[
          { val: "200+", label: "Brands Worked With"    },
          { val: "10K+", label: "Products Photographed" },
          { val: "25+",  label: "Years of Experience"   },
        ]}
        images={[
          "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80",
          "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",
        ]}
      />

      <VideoShowreel title="Product Campaign Reel" label="COMMERCIAL" />

      <BeforeAfterSlider
        label="THE PRODUCT DIFFERENCE"
        beforeSrc="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1400&q=80"
        afterSrc="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=1400&q=80"
      />

      <ProcessSection label="HOW A PRODUCT SHOOT WORKS" />

      <WhyChooseUs />

      <HorizontalFilmstrip />

      <StatsCounter />

      <PricingPackages defaultTab="product" />

      <EditorialTestimonial />

      <ClientStrip />

      <FAQAccordion />

      <CTASection
        image="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1920&q=85"
        headline="Let's make your product unforgettable."
        linkText="BOOK A STUDIO SESSION"
      />
    </PageWrapper>
  );
}
