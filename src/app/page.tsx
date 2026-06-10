import type { Metadata } from "next";
import { SplitIntro } from "@/components/ui/SplitIntro";

export const metadata: Metadata = {
  title: "JJFILMS | Premium Photography Studio",
  description: "Photography studio specialising in real estate, events and weddings. We photograph what matters.",
  openGraph: {
    title: "JJFILMS | Premium Photography Studio",
    images: [{ url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80" }],
  },
};

export default function Home() {
  return (
    <>
      {/* Visually hidden h1 for SEO — visual heading is inside SplitIntro */}
      <h1 className="sr-only">JJFILMS — Premium Photography Studio · Real Estate, Weddings & Product Photography</h1>
      <SplitIntro />
    </>
  );
}
