import type { Metadata } from "next";
import { PageWrapper }          from "@/components/ui/PageWrapper";

export const metadata: Metadata = {
  title: "Events & Wedding Photography",
  description: "Discreet, cinematic photography for weddings, corporate events and celebrations. Capturing every genuine moment.",
  openGraph: { title: "Events & Weddings | JJFILMS", images: [{ url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80" }] },
};
import { HeroEditorial }        from "@/components/sections/HeroEditorial";
import { ServicePageIntro }     from "@/components/sections/ServicePageIntro";
import { HorizontalFilmstrip }  from "@/components/sections/HorizontalFilmstrip";
import { ServicesPricingList }  from "@/components/sections/ServicesPricingList";
import { EditorialTestimonial } from "@/components/sections/EditorialTestimonial";
import { FAQAccordion }         from "@/components/sections/FAQAccordion";
import { CTASection }           from "@/components/sections/CTASection";

export default function EventsWeddings() {
  return (
    <PageWrapper>
      <HeroEditorial
        image="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=90"
        tagline="Events & Weddings"
        location="WEDDINGS · CORPORATE · CELEBRATIONS"
      />

      <ServicePageIntro
        label="EVENTS & WEDDINGS"
        accentColor="var(--accent-ev)"
        headline="Discreet, cinematic photography for life's most meaningful moments."
        body="We believe the best photography is invisible. We blend into your day, watching and waiting for the moments that cannot be staged — the laughter, the tears, the stolen glances. Then we give them to you forever."
        stats={[
          { val: "300+", label: "Weddings Covered"     },
          { val: "98%",  label: "Client Satisfaction"  },
          { val: "4wks", label: "Gallery Delivery"     },
        ]}
        images={[
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
        ]}
      />

      <HorizontalFilmstrip />

      <ServicesPricingList />

      <EditorialTestimonial />

      <FAQAccordion />

      <CTASection
        image="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=1920&q=85"
        headline="Your day deserves to last forever."
        linkText="CHECK AVAILABILITY"
      />
    </PageWrapper>
  );
}
