import type { Metadata } from "next";
import { PageWrapper }          from "@/components/ui/PageWrapper";

export const metadata: Metadata = {
  title: "JJFILMS | Premium Photography Studio",
  description: "Photography studio specialising in real estate, product, events and weddings. We photograph what matters.",
  openGraph: { title: "JJFILMS | Premium Photography Studio", images: [{ url: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=80" }] },
};
import { BentoHero }            from "@/components/sections/BentoHero";
import { ServiceSelector }      from "@/components/sections/ServiceSelector";
import { HorizontalFilmstrip }  from "@/components/sections/HorizontalFilmstrip";
import { EditorialStatement }   from "@/components/sections/EditorialStatement";
import { ServicesPricingList }  from "@/components/sections/ServicesPricingList";
import { EditorialTestimonial } from "@/components/sections/EditorialTestimonial";
import { CTASection }           from "@/components/sections/CTASection";

export default function Home() {
  return (
    <PageWrapper>
      <BentoHero />

      <ServiceSelector />

      <HorizontalFilmstrip />

      <EditorialStatement />

      <ServicesPricingList />

      <EditorialTestimonial />

      <CTASection
        image="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=85"
        headline="Let's tell your story."
      />
    </PageWrapper>
  );
}
