"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

interface PhotoCell {
  area:   string;
  src:    string;
  label:  string;
  num:    string;
  href:   string;
  accent: string;
}

const cells: PhotoCell[] = [
  {
    area:   "re",
    src:    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=90",
    label:  "Real Estate",
    num:    "001",
    href:   "/real-estate",
    accent: "var(--accent-re)",
  },
  {
    area:   "weddings",
    src:    "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=85",
    label:  "Events & Weddings",
    num:    "003",
    href:   "/wedding-films",
    accent: "var(--accent-ev)",
  },
  {
    area:   "product",
    src:    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=85",
    label:  "Product",
    num:    "002",
    href:   "/product-photography",
    accent: "var(--accent-pr)",
  },
];

export const BentoHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const alreadySeen = !!sessionStorage.getItem("jjf_intro");
    const base = alreadySeen ? 0.55 : 2.85;

    const ctx = gsap.context(() => {
      // Cells reveal with stagger
      gsap.from(".bento-cell", {
        opacity: 0,
        duration: 1.1,
        stagger: { amount: 0.5, from: "start" },
        ease: "power2.out",
        delay: base,
        clearProps: "opacity",
      });
      // Brand lines slide up
      gsap.from(".bento-brand-line", {
        y: 28,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        delay: base + 0.3,
        ease: "power3.out",
        clearProps: "all",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // RE is the centre hero, brand left, weddings+product right stack
  const desktopGrid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "0.95fr 1.85fr 1.15fr",
    gridTemplateRows: "1fr 1fr",
    gridTemplateAreas: '"brand re weddings" "brand re product"',
    gap: "2px",
    height: "100svh",
    minHeight: "620px",
  };

  const mobileGrid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "44vw 56vw 54vw",
    gridTemplateAreas: '"weddings product" "re re" "brand brand"',
    gap: "2px",
  };

  return (
    <div ref={containerRef} style={isMobile ? mobileGrid : desktopGrid}>

      {/* ── Brand cell ─────────────────────────────────────────── */}
      <div
        className="bento-cell relative bg-dark-void flex flex-col justify-between overflow-hidden"
        style={{ gridArea: "brand" }}
      >
        {/* Subtle vertical rule */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-white/5" />

        {/* Top */}
        <div className="p-7 md:p-9">
          <p className="bento-brand-line text-label text-white/25 mb-8">STUDIO · WORLDWIDE</p>

          {/* Logo */}
          <h1
            className="bento-brand-line font-display font-bold text-white leading-[0.88]"
            style={{ fontSize: "clamp(4rem, 7.5vw, 9rem)", letterSpacing: "-0.03em" }}
          >
            JJ<br />FILMS<span style={{ color: "var(--accent-ev)" }}>.</span>
          </h1>
          <p className="bento-brand-line font-serif italic text-white/35 mt-4 text-sm md:text-base leading-relaxed">
            We photograph<br className="hidden md:block" /> what matters.
          </p>
        </div>

        {/* Service list — numbered */}
        <div className="px-7 md:px-9 pb-1">
          {cells.map((cell, i) => (
            <div
              key={cell.area}
              className="bento-brand-line flex items-center gap-3 py-3 border-t border-white/5 first:border-t-0"
            >
              <span className="text-label text-white/20 w-7 flex-shrink-0" style={{ fontSize: "0.55rem" }}>
                {cell.num}
              </span>
              <span className="text-label text-white/50 hover:text-white/80 transition-colors" style={{ fontSize: "0.62rem", letterSpacing: "0.16em" }}>
                {cell.label.toUpperCase()}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-7 md:p-9">
          <Link
            href="/contact"
            className="bento-brand-line group inline-flex items-center gap-3 text-label text-white/45 hover:text-white transition-all duration-400 interactive"
            style={{ fontSize: "0.62rem", letterSpacing: "0.2em" }}
          >
            <span className="w-6 h-px bg-white/30 group-hover:w-10 group-hover:bg-white transition-all duration-400" />
            INQUIRE
          </Link>
        </div>
      </div>

      {/* ── Photo cells ────────────────────────────────────────── */}
      {cells.map((cell) => (
        <Link
          key={cell.area}
          href={cell.href}
          className="bento-cell relative overflow-hidden group block"
          style={{ gridArea: cell.area }}
          data-cursor-image={cell.src}
        >
          <Image
            src={cell.src}
            alt={cell.label}
            fill
            sizes={cell.area === "re" ? "50vw" : "(max-width:768px) 100vw, 28vw"}
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
            priority
          />

          {/* Vignette — always present, deepens on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-void/80 via-dark-void/15 to-transparent transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-void/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Number — top left */}
          <span
            className="absolute top-4 left-5 text-white/30 font-sans"
            style={{ fontSize: "0.55rem", letterSpacing: "0.2em" }}
          >
            ({cell.num})
          </span>

          {/* Service label — bottom left, animates up */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <div className="flex items-end justify-between">
              <div>
                <p
                  className="font-sans mb-1.5 transition-colors duration-300"
                  style={{ color: cell.accent, fontSize: "0.55rem", letterSpacing: "0.2em" }}
                >
                  {cell.num} /
                </p>
                <p className="font-display font-semibold text-white leading-none"
                  style={{ fontSize: cell.area === "re" ? "clamp(1.4rem, 2.5vw, 2.2rem)" : "clamp(1rem, 1.8vw, 1.5rem)", letterSpacing: "-0.01em" }}
                >
                  {cell.label}
                </p>
              </div>
              <span
                className="text-label text-white/40 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-400 pb-0.5 hidden md:block"
                style={{ fontSize: "0.55rem" }}
              >
                VIEW →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
