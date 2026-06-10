import Link from "next/link";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/ui/PageWrapper";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
};

export default function NotFound() {
  return (
    <PageWrapper>
      <section className="bg-cream-50 min-h-screen flex items-center px-8 md:px-14 pt-28">
        <div className="max-w-screen-xl mx-auto w-full">
          <p className="text-label text-ink-300 tracking-widest mb-6">404</p>
          <h1
            className="font-display font-bold text-ink-900 leading-[0.9] mb-8"
            style={{ fontSize: "clamp(4rem, 14vw, 14rem)", letterSpacing: "-0.04em" }}
          >
            Lost<br />
            <em className="font-serif italic font-normal text-ink-300">in frame.</em>
          </h1>
          <p className="font-serif italic text-ink-400 text-base md:text-lg mb-12 max-w-sm">
            This page doesn&apos;t exist — but great photography does. Let&apos;s get you back.
          </p>
          <div className="flex flex-wrap gap-8 items-center">
            <Link
              href="/"
              className="flex items-center gap-3 text-label text-ink-900 hover:text-accent-ev transition-colors group"
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
              HOME
            </Link>
            <Link
              href="/gallery"
              className="flex items-center gap-3 text-label text-ink-500 hover:text-ink-900 transition-colors"
            >
              VIEW GALLERY
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-3 text-label text-ink-500 hover:text-ink-900 transition-colors"
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
