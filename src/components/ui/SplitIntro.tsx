"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";

const LEFT_IMG  = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=90";
const RIGHT_IMG = "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=90";

export const SplitIntro = () => {
  const router   = useRouter();
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const leftImgRef  = useRef<HTMLDivElement>(null);
  const rightImgRef = useRef<HTMLDivElement>(null);

  // Read BEFORE IntroLoader's useEffect sets the key — captures true first-visit state
  const isFirstSession = useRef(
    typeof window !== "undefined" && !sessionStorage.getItem("jjf_intro")
  );

  const [hovered,   setHovered]   = useState<"left" | "right" | null>(null);
  const [ready,     setReady]     = useState(false);
  const [selecting, setSelecting] = useState(false);
  const [isMobile,  setIsMobile]  = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Entrance animation ──────────────────────────────────────────────────
  useEffect(() => {
    const left  = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return;

    // Initial states — panels clipped to nothing from center outward
    gsap.set(left,  { clipPath: "inset(0 100% 0 0)" });
    gsap.set(right, { clipPath: "inset(0 0 0 100%)" });
    gsap.set(".si-num",     { opacity: 0, y: 16 });
    gsap.set(".si-label",   { opacity: 0, y: 10 });
    gsap.set(".si-eyebrow", { opacity: 0 });
    gsap.set(".si-headline",{ opacity: 0, y: 28 });
    gsap.set(".si-sub",     { opacity: 0 });
    gsap.set(".si-cta",     { opacity: 0, x: -12 });
    gsap.set(".si-cta-r",   { opacity: 0, x: 12 });
    gsap.set(".si-badge",   { opacity: 0, scale: 0.85 });
    gsap.set(".si-divider", { scaleY: 0, transformOrigin: "center center" });

    // If IntroLoader is showing, wait for it to finish before our entrance
    const entranceDelay = isFirstSession.current ? 2.9 : 0.2;

    const tl = gsap.timeline({
      delay: entranceDelay,
      onComplete: () => setReady(true),
    });

    tl
      // Curtain reveal — both panels pull outward simultaneously
      .to(left,  { clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "expo.inOut" })
      .to(right, { clipPath: "inset(0 0 0 0%)", duration: 1.5, ease: "expo.inOut" }, "<")
      .to(".si-divider", { scaleY: 1, duration: 0.7, ease: "power3.out" }, "-=0.6")
      .to(".si-badge",   { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.4)" }, "-=0.4")
      .to(".si-num",     { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "power3.out" }, "-=0.4")
      .to(".si-label",   { opacity: 1, y: 0, stagger: 0.1,  duration: 0.7, ease: "power3.out" }, "-=0.6")
      .to(".si-eyebrow", { opacity: 1, stagger: 0.08, duration: 0.5, ease: "power2.out" }, "-=0.4")
      .to(".si-headline",{ opacity: 1, y: 0, stagger: 0.1,  duration: 0.9, ease: "power3.out" }, "-=0.4")
      .to(".si-sub",     { opacity: 1, stagger: 0.08, duration: 0.6, ease: "power2.out" }, "-=0.4")
      .to(".si-cta",     { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, "-=0.2")
      .to(".si-cta-r",   { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, "<");

    // Ken Burns — slow drift on both images
    const kb = gsap.to([leftImgRef.current, rightImgRef.current], {
      scale: 1.07,
      duration: 16,
      ease: "none",
      yoyo: true,
      repeat: -1,
      stagger: 4, // offset so they're not in sync
    });

    return () => {
      tl.kill();
      kb.kill();
    };
  }, []);

  // ── Hover expansion ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!ready || selecting || isMobile) return;

    const left  = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return;

    const opts = { duration: 0.8, ease: "power3.out" };

    if (hovered === "left") {
      gsap.to(left,  { width: "63%", ...opts });
      gsap.to(right, { width: "37%", ...opts });
    } else if (hovered === "right") {
      gsap.to(left,  { width: "37%", ...opts });
      gsap.to(right, { width: "63%", ...opts });
    } else {
      gsap.to(left,  { width: "50%", ...opts });
      gsap.to(right, { width: "50%", ...opts });
    }
  }, [hovered, ready, selecting, isMobile]);

  // ── Panel selection + exit ───────────────────────────────────────────────
  const handleSelect = (side: "left" | "right") => {
    if (!ready || selecting) return;
    setSelecting(true);

    const left  = leftRef.current;
    const right = rightRef.current;
    const href  = side === "left" ? "/real-estate" : "/wedding-films";

    const propExpand = isMobile ? "height" : "width";
    const propShrink = isMobile ? "height" : "width";

    const tl = gsap.timeline({ onComplete: () => router.push(href) });

    if (side === "left") {
      tl
        .to(right, { [propShrink]: "0%", opacity: 0, duration: 0.9, ease: "expo.inOut" })
        .to(left,  { [propExpand]: "100%", duration: 0.9, ease: "expo.inOut" }, "<")
        .to(".si-divider", { opacity: 0, duration: 0.25 }, "<");
    } else {
      tl
        .to(left,  { [propShrink]: "0%", opacity: 0, duration: 0.9, ease: "expo.inOut" })
        .to(right, { [propExpand]: "100%", duration: 0.9, ease: "expo.inOut" }, "<")
        .to(".si-divider", { opacity: 0, duration: 0.25 }, "<");
    }
  };

  const dimLeft  = hovered === "right" || (selecting && hovered !== "left");
  const dimRight = hovered === "left"  || (selecting && hovered !== "right");

  return (
    <div
      className="fixed inset-0 z-[200] flex overflow-hidden bg-black"
      style={{ flexDirection: isMobile ? "column" : "row" }}
    >
      {/* ═══ LEFT PANEL — Real Estate ════════════════════════════════════ */}
      <div
        ref={leftRef}
        className="relative overflow-hidden cursor-pointer"
        style={isMobile ? { width: "100%", height: "50%" } : { width: "50%", height: "100%" }}
        onMouseEnter={() => { if (!selecting) setHovered("left"); }}
        onMouseLeave={() => { if (!selecting) setHovered(null);  }}
        onClick={() => handleSelect("left")}
      >
        {/* Background image */}
        <div ref={leftImgRef} className="absolute inset-0 scale-[1.02]">
          <Image src={LEFT_IMG} alt="" fill priority sizes="65vw" className="object-cover" />
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        {/* Dim veil when right panel is active */}
        <div
          className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-500"
          style={{ opacity: dimLeft ? 0.52 : 0 }}
        />

        {/* ── Content layout ── */}
        <div className="absolute inset-0 flex flex-col justify-between p-10 md:p-14">

          {/* Top row: giant number + category label */}
          <div className="flex items-start justify-between">
            <span
              className="si-num font-display font-bold select-none leading-none"
              style={{
                fontSize: "clamp(5rem,10vw,11rem)",
                letterSpacing: "-0.05em",
                color: "rgba(255,255,255,0.06)",
              }}
            >
              01
            </span>
            <span className="si-label text-label text-white/40 tracking-[0.22em] mt-3">
              REAL ESTATE
            </span>
          </div>

          {/* Center: headline */}
          <div>
            <p className="si-eyebrow text-label text-white/25 tracking-[0.28em] mb-5">
              PHOTOGRAPHY
            </p>
            <h2
              className="si-headline font-display italic text-white leading-[0.88]"
              style={{
                fontSize: "clamp(3rem, 5.2vw, 6.5rem)",
                letterSpacing: "-0.025em",
                whiteSpace: "pre-line",
              }}
            >
              {"Architecture\n& Spaces"}
            </h2>
            <p className="si-sub font-serif italic text-white/35 mt-6 text-sm md:text-base max-w-[22ch]">
              From intimate apartments to sprawling estates — every frame tells a story.
            </p>
          </div>

          {/* Bottom row: stat + CTA */}
          <div className="flex items-end justify-between">
            <span className="si-eyebrow text-label text-white/18 tracking-widest hidden md:block" style={{ color: "rgba(255,255,255,0.18)" }}>
              500+ Properties Shot
            </span>
            <div className="si-cta flex items-center gap-4 group ml-auto">
              <span
                className="h-px bg-white/30 transition-all duration-700 group-hover:w-14"
                style={{ width: "2rem" }}
              />
              <span className="text-label text-white/55 tracking-[0.22em] group-hover:text-white transition-colors duration-400">
                EXPLORE
              </span>
              <span className="text-white/35 group-hover:text-white/80 transition-colors duration-400">
                →
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ VERTICAL DIVIDER ════════════════════════════════════════════ */}
      <div
        className="si-divider absolute z-10 pointer-events-none"
        style={
          isMobile
            ? { left: 0, right: 0, top: "50%", height: "1px", background: "linear-gradient(to right, transparent, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.2) 70%, transparent)" }
            : { top: 0, bottom: 0, left: "50%", width: "1px",  background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.15) 80%, transparent)" }
        }
      />

      {/* ═══ RIGHT PANEL — Weddings ══════════════════════════════════════ */}
      <div
        ref={rightRef}
        className="relative overflow-hidden cursor-pointer"
        style={isMobile ? { width: "100%", height: "50%" } : { width: "50%", height: "100%" }}
        onMouseEnter={() => { if (!selecting) setHovered("right"); }}
        onMouseLeave={() => { if (!selecting) setHovered(null);   }}
        onClick={() => handleSelect("right")}
      >
        <div ref={rightImgRef} className="absolute inset-0 scale-[1.02]">
          <Image src={RIGHT_IMG} alt="" fill priority sizes="65vw" className="object-cover" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        <div
          className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-500"
          style={{ opacity: dimRight ? 0.52 : 0 }}
        />

        {/* ── Content layout ── */}
        <div className="absolute inset-0 flex flex-col justify-between p-10 md:p-14">

          {/* Top row */}
          <div className="flex items-start justify-between">
            <span className="si-label text-label text-white/40 tracking-[0.22em] mt-3">
              EVENTS & WEDDINGS
            </span>
            <span
              className="si-num font-display font-bold select-none leading-none text-right"
              style={{
                fontSize: "clamp(5rem,10vw,11rem)",
                letterSpacing: "-0.05em",
                color: "rgba(255,255,255,0.06)",
              }}
            >
              02
            </span>
          </div>

          {/* Center: headline */}
          <div className="text-right">
            <p className="si-eyebrow text-label text-white/25 tracking-[0.28em] mb-5">
              PHOTOGRAPHY
            </p>
            <h2
              className="si-headline font-display italic text-white leading-[0.88]"
              style={{
                fontSize: "clamp(3rem, 5.2vw, 6.5rem)",
                letterSpacing: "-0.025em",
                whiteSpace: "pre-line",
              }}
            >
              {"Love &\nCelebration"}
            </h2>
            <p className="si-sub font-serif italic text-white/35 mt-6 text-sm md:text-base ml-auto max-w-[22ch]">
              Every stolen glance, every joyful tear — yours forever.
            </p>
          </div>

          {/* Bottom row */}
          <div className="flex items-end justify-between">
            <div className="si-cta-r flex items-center gap-4 group">
              <span className="text-white/35 group-hover:text-white/80 transition-colors duration-400">
                ←
              </span>
              <span className="text-label text-white/55 tracking-[0.22em] group-hover:text-white transition-colors duration-400">
                EXPLORE
              </span>
              <span
                className="h-px bg-white/30 transition-all duration-700 group-hover:w-14"
                style={{ width: "2rem" }}
              />
            </div>
            <span className="si-eyebrow text-label tracking-widest hidden md:block" style={{ color: "rgba(255,255,255,0.18)" }}>
              300+ Weddings
            </span>
          </div>
        </div>
      </div>

      {/* ═══ CENTER BADGE ════════════════════════════════════════════════ */}
      <div className="si-badge absolute z-20 pointer-events-none"
        style={{
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="flex flex-col items-center gap-2"
        >
          {/* Logo pill */}
          <div
            className="px-5 py-2.5 rounded-[2px] border border-white/12"
            style={{
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <span className="font-display font-bold text-white tracking-[0.18em] text-sm whitespace-nowrap">
              JJFILMS<span style={{ color: "var(--accent-ev)" }}>.</span>
            </span>
          </div>
          {/* "Choose your story" hint */}
          <p className="text-label text-white/25 tracking-[0.15em] text-[0.5rem] whitespace-nowrap">
            CHOOSE YOUR STORY
          </p>
        </div>
      </div>
    </div>
  );
};
