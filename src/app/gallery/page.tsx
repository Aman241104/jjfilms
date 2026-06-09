import type { Metadata } from "next";
import { PageWrapper }           from "@/components/ui/PageWrapper";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse the JJFILMS portfolio — real estate, product and event photography selected from our best work.",
  openGraph: { title: "Gallery | JJFILMS", images: [{ url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80" }] },
};
import { FloatingPhotoCollage }  from "@/components/sections/FloatingPhotoCollage";
import { DarkArchiveGallery }    from "@/components/sections/DarkArchiveGallery";
import { PhotoDeck3D }           from "@/components/sections/PhotoDeck3D";
import { CTASection }            from "@/components/sections/CTASection";

export default function Gallery() {
  return (
    <PageWrapper>
      <FloatingPhotoCollage title="The Portfolio" subtitle="JJFILMS Studio" />
      <DarkArchiveGallery />
      <PhotoDeck3D />
      <CTASection
        image="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=85"
        headline="Ready to create something beautiful?"
        linkText="BOOK A SESSION"
      />
    </PageWrapper>
  );
}
