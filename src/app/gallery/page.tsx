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
      <section className="bg-cream-50 pt-40 pb-12 px-8 md:px-14">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-label text-ink-300 tracking-widest mb-4">THE PORTFOLIO</p>
          <h1
            className="font-display font-bold text-ink-900 leading-[0.95] mb-6"
            style={{ fontSize: "clamp(3rem, 8vw, 8rem)", letterSpacing: "-0.03em" }}
          >
            25 years.{" "}
            <em className="font-serif italic font-normal text-ink-400">500+ projects.</em>
            <br className="hidden md:block" />A selection.
          </h1>
          <p className="font-serif italic text-ink-400 text-sm md:text-base">
            Real estate · Product · Weddings & Events — Mumbai to worldwide.
          </p>
        </div>
      </section>

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
