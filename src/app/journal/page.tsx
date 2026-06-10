import type { Metadata } from "next";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { CTASection }  from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Journal",
  description: "Behind-the-scenes stories, photography tips and notes from the JJ Films studio. Mumbai, 1999–present.",
  openGraph: { title: "Journal | JJFILMS", images: [{ url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80" }] },
};

const posts = [
  {
    date:     "12 May 2026",
    category: "REAL ESTATE",
    title:    "How golden-hour light transforms a listing — and why we always wait for it",
    excerpt:  "Most agents want the shoot done by noon. We push for 5 PM. Here's exactly why that one hour makes the difference between a listing that sits and one that sells.",
  },
  {
    date:     "28 Apr 2026",
    category: "WEDDINGS",
    title:    "The invisible photographer: our approach to documentary wedding coverage",
    excerpt:  "We were once asked why we don't use flash at weddings. The answer shaped everything about how we shoot — and what our couples remember about having us there.",
  },
  {
    date:     "10 Apr 2026",
    category: "PRODUCT",
    title:    "Shooting for Forest Essentials: light, texture and the art of restraint",
    excerpt:  "When a brand's identity is built on handcrafted purity, your set design has to earn that trust. A behind-the-scenes look at our three-day Forest Essentials campaign.",
  },
  {
    date:     "22 Mar 2026",
    category: "BEHIND THE SCENES",
    title:    "From a rented studio in Bandra to 500+ projects — what 25 years taught us",
    excerpt:  "Jignesh and Jay Shah reflect on the projects that shaped them, the clients who pushed them, and the one rule they've never broken in 25 years of shooting.",
  },
];

export default function Journal() {
  return (
    <PageWrapper>
      {/* Header */}
      <section className="bg-cream-50 pt-40 pb-16 px-8 md:px-14">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-label text-ink-300 tracking-widest mb-4">JOURNAL</p>
          <h1
            className="font-display font-bold text-ink-900 leading-[0.95]"
            style={{ fontSize: "clamp(3rem, 8vw, 8rem)", letterSpacing: "-0.03em" }}
          >
            Notes from{" "}
            <em className="font-serif italic font-normal text-ink-400">the studio.</em>
          </h1>
        </div>
      </section>

      {/* Posts */}
      <section className="bg-cream-50 pb-28 px-8 md:px-14">
        <div className="max-w-screen-xl mx-auto divide-y divide-ink-100">
          {posts.map((post) => (
            <article
              key={post.title}
              className="group py-10 md:py-12 grid md:grid-cols-[180px_1fr] gap-6 cursor-pointer hover:bg-cream-100 -mx-4 px-4 transition-colors duration-300 rounded-sm"
            >
              <div>
                <p className="text-label text-ink-300 mb-1">{post.date}</p>
                <span
                  className="text-label text-ink-400 border border-ink-200 px-2 py-1 rounded-[2px]"
                  style={{ fontSize: "0.56rem", letterSpacing: "0.14em" }}
                >
                  {post.category}
                </span>
              </div>
              <div>
                <h2
                  className="font-display font-semibold text-ink-900 mb-3 group-hover:translate-x-1 transition-transform duration-300 leading-tight"
                  style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)", letterSpacing: "-0.01em" }}
                >
                  {post.title}
                </h2>
                <p className="text-ink-500 text-sm leading-relaxed">{post.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-label text-ink-400 group-hover:text-ink-700 transition-colors duration-300"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.12em" }}
                >
                  READ MORE <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=85"
        headline="Ready to work together?"
        linkHref="/contact"
        linkText="GET IN TOUCH"
      />
    </PageWrapper>
  );
}
