"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

interface HeroEditorialProps {
  image: string;
  tagline: string;
  location?: string;
}

export const HeroEditorial = ({
  image,
  tagline,
  location = "STUDIO · WORLDWIDE",
}: HeroEditorialProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const taglineRef   = useRef<HTMLParagraphElement>(null);
  const scriptRef    = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!titleRef.current || !taglineRef.current || !scriptRef.current) return;

    const split = new SplitText(titleRef.current, { type: "words,chars" });
    // jjf_intro is set by IntroLoader (higher in tree, so its effect runs after ours)
    // On first ever load: jjf_intro not yet set → full delay to sync with intro
    // On subsequent navigations: jjf_intro already in storage → short delay
    const alreadySeen = !!sessionStorage.getItem("jjf_intro");
    const delay = alreadySeen ? 0.6 : 2.8;

    const tl = gsap.timeline({ delay });

    tl.from(split.chars, {
      opacity: 0,
      y: 60,
      rotationX: -40,
      stagger: 0.018,
      duration: 0.9,
      ease: "power4.out",
    })
      .from(
        taglineRef.current,
        { opacity: 0, y: 20, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      )
      .from(
        scriptRef.current,
        { opacity: 0, y: 15, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

    return () => {
      tl.kill();
      gsap.set([split.chars, taglineRef.current, scriptRef.current], { clearProps: "all" });
      split.revert();
    };
  }, []);

  // Ken Burns on the bg image
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-bg-img",
        { scale: 1.08 },
        { scale: 1, duration: 12, ease: "none", delay: 0 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-end pb-20 md:pb-28"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt="Hero"
          fill
          priority
          sizes="100vw"
          className="object-cover hero-bg-img"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-void/80 via-dark-void/30 to-dark-void/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-void/50 to-transparent" />
      </div>

      {/* Location tag – top left */}
      <span className="absolute top-8 left-8 md:top-10 md:left-10 text-label text-white/50 z-10">
        {location}
      </span>

      {/* Main content */}
      <div className="relative z-10 px-8 md:px-14 w-full max-w-5xl">
        <h1
          ref={titleRef}
          className="font-display font-bold text-white leading-[0.9] mb-6"
          style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)", letterSpacing: "-0.02em" }}
        >
          {tagline}
        </h1>

        <p
          ref={taglineRef}
          className="font-serif italic text-white/70 text-lg md:text-xl mb-10"
        >
          Photography that tells the story of your finest moments.
        </p>

        {/* Scroll hint – bottom right */}
        <p
          ref={scriptRef}
          className="font-script text-white/50 text-2xl"
          style={{ fontFamily: "var(--font-script)" }}
        >
          scroll to explore ↓
        </p>
      </div>
    </section>
  );
};
