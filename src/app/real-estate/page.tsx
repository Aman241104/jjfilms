import type { Metadata } from "next";
import { PageWrapper }          from "@/components/ui/PageWrapper";

export const metadata: Metadata = {
  title: "Real Estate Photography",
  description: "Professional real estate photography for residential and commercial properties. Delivering stunning architectural visuals within 48 hours.",
  openGraph: { title: "Real Estate Photography | JJFILMS", images: [{ url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80" }] },
};
import { HeroEditorial }        from "@/components/sections/HeroEditorial";
import { ServicePageIntro }     from "@/components/sections/ServicePageIntro";
import { HorizontalFilmstrip }  from "@/components/sections/HorizontalFilmstrip";
import { ServicesPricingList }  from "@/components/sections/ServicesPricingList";
import { EditorialTestimonial } from "@/components/sections/EditorialTestimonial";
import { CTASection }           from "@/components/sections/CTASection";

export default function RealEstate() {
  return (
    <PageWrapper>
      <HeroEditorial
        image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=90"
        tagline="Real Estate Photography"
        location="RESIDENTIAL · COMMERCIAL"
      />

      <ServicePageIntro
        label="REAL ESTATE PHOTOGRAPHY"
        accentColor="var(--accent-re)"
        headline="Architectural photography that elevates every listing."
        body="We combine precision composition with expert post-processing to present your property at its absolute best. From intimate apartments to sprawling estates, every square metre deserves to shine."
        stats={[
          { val: "500+", label: "Properties Shot"     },
          { val: "10+",  label: "Years Experience"    },
          { val: "48h",  label: "Delivery Guarantee"  },
        ]}
        images={[
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80",
        ]}
      />

      <HorizontalFilmstrip />

      <ServicesPricingList />

      <EditorialTestimonial />

      <CTASection
        image="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=85"
        headline="Ready to showcase your property?"
        linkText="REQUEST A QUOTE"
      />
    </PageWrapper>
  );
}
