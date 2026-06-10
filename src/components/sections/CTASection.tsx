"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CTASectionProps {
  image:     string;
  headline?: string;
  subline?:  string;
  linkHref?: string;
  linkText?: string;
}

export const CTASection = ({
  image,
  headline = "Let's tell\nyour story.",
  subline  = "Every frame, intentional. Every moment, yours.",
  linkHref = "/contact",
  linkText = "BOOK A CONSULTATION",
}: CTASectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Parallax on BG */
      gsap.to(".cta-bg", {
        y: "18%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      /* Content reveals */
      gsap.from(".cta-line", {
        opacity: 0,
        y: 28,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        clearProps: "opacity,transform",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-between overflow-hidden"
      style={{ minHeight: "80vh" }}
    >
      {/* ── Background image + overlays ─────────────── */}
      <div className="absolute inset-0 scale-110">
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="cta-bg object-cover"
          priority
        />
      </div>
      {/* Gradient: dense dark on left, lightens toward right */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-void/95 via-dark-void/70 to-dark-void/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-void/80 via-transparent to-dark-void/20" />

      {/* ── Top rule ────────────────────────────────── */}
      <div className="relative z-10 border-b border-white/8 px-8 md:px-14 py-5 flex items-center justify-between">
        <p className="text-label text-white/25">JJFILMS · STUDIO</p>
        <p className="text-label text-white/20 hidden sm:block">WORLDWIDE AVAILABILITY</p>
      </div>

      {/* ── Main content ────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center px-8 md:px-14 py-20">
        <div className="max-w-2xl">
          {/* Label */}
          <p className="cta-line text-label text-white/35 mb-6 tracking-widest">
            READY TO BEGIN
          </p>

          {/* Display headline — Cormorant Garamond italic */}
          <h2
            className="cta-line font-display italic text-white leading-[0.95] mb-8"
            style={{
              fontSize: "clamp(3.5rem, 7vw, 7.5rem)",
              letterSpacing: "-0.02em",
              whiteSpace: "pre-line",
            }}
          >
            {headline}
          </h2>

          {/* Subline */}
          <p className="cta-line font-serif italic text-white/50 mb-12 text-base md:text-lg leading-relaxed">
            {subline}
          </p>

          {/* CTA */}
          <div className="cta-line flex flex-wrap items-center gap-6">
            <Link
              href={linkHref}
              className="group inline-flex items-center gap-4 px-8 py-4 border border-white/30 hover:border-white/80 text-label text-white/70 hover:text-white transition-all duration-400 interactive"
              style={{ letterSpacing: "0.2em" }}
            >
              {linkText}
              <span className="w-5 h-px bg-white/40 group-hover:w-10 group-hover:bg-white transition-all duration-400" />
            </Link>
            <Link
              href="/gallery"
              className="text-label text-white/30 hover:text-white/70 transition-colors duration-300 interactive hover-underline"
              style={{ letterSpacing: "0.15em" }}
            >
              VIEW GALLERY →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom info bar ─────────────────────────── */}
      <div className="relative z-10 border-t border-white/8 px-8 md:px-14 py-5 flex flex-wrap items-center gap-6 justify-between">
        <div className="flex flex-wrap gap-8">
          <div>
            <p className="text-label text-white/20 mb-0.5">EMAIL</p>
            <p className="text-label text-white/50" style={{ letterSpacing: "0.08em" }}>
              hello@jjfilms.studio
            </p>
          </div>
          <div>
            <p className="text-label text-white/20 mb-0.5">BASED</p>
            <p className="text-label text-white/50" style={{ letterSpacing: "0.08em" }}>
              Mumbai · Worldwide
            </p>
          </div>
        </div>
        <p className="font-serif italic text-white/15 text-sm hidden md:block">
          Inquiries responded within 24 hours.
        </p>
      </div>
    </section>
  );
};
