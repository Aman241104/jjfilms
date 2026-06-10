"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";

const LEFT_IMG  = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=90";
const RIGHT_IMG = "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=90";

export const SplitIntro = () => {
  const router      = useRouter();
  const leftRef     = useRef<HTMLDivElement>(null);
  const rightRef    = useRef<HTMLDivElement>(null);
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

    gsap.set(left,  { clipPath: "inset(0 100% 0 0)" });
    gsap.set(right, { clipPath: "inset(0 0 0 100%)" });
    gsap.set(".si-num",      { opacity: 0 });
    gsap.set(".si-service",  { opacity: 0, y: 20 });
    gsap.set(".si-headline", { opacity: 0, y: 32 });
    gsap.set(".si-sub",      { opacity: 0 });

    const entranceDelay = isFirstSession.current ? 2.9 : 0.2;

    const tl = gsap.timeline({
      delay: entranceDelay,
      onComplete: () => setReady(true),
    });

    tl
      .to(left,  { clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "expo.inOut" })
      .to(right, { clipPath: "inset(0 0 0 0%)", duration: 1.5, ease: "expo.inOut" }, "<")
      .to(".si-num",      { opacity: 1, stagger: 0.1, duration: 0.8, ease: "power2.out" }, "-=0.5")
      .to(".si-service",  { opacity: 1, y: 0, stagger: 0.08, duration: 0.9, ease: "power3.out" }, "-=0.6")
      .to(".si-headline", { opacity: 1, y: 0, stagger: 0.1,  duration: 1.0, ease: "power3.out" }, "-=0.6")
      .to(".si-sub",      { opacity: 1, stagger: 0.08, duration: 0.6, ease: "power2.out" }, "-=0.4");

    // Ken Burns
    const kb = gsap.to([leftImgRef.current, rightImgRef.current], {
      scale: 1.07,
      duration: 16,
      ease: "none",
      yoyo: true,
      repeat: -1,
      stagger: 4,
    });

    return () => { tl.kill(); kb.kill(); };
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

  // ── Select + exit ────────────────────────────────────────────────────────
  const handleSelect = (side: "left" | "right") => {
    if (!ready || selecting) return;
    setSelecting(true);

    const left  = leftRef.current;
    const right = rightRef.current;
    const href  = side === "left" ? "/real-estate" : "/wedding-films";
    const prop  = isMobile ? "height" : "width";

    const tl = gsap.timeline({ onComplete: () => router.push(href) });

    if (side === "left") {
      tl
        .to(right, { [prop]: "0%", opacity: 0, duration: 0.9, ease: "expo.inOut" })
        .to(left,  { [prop]: "100%",             duration: 0.9, ease: "expo.inOut" }, "<");
    } else {
      tl
        .to(left,  { [prop]: "0%", opacity: 0, duration: 0.9, ease: "expo.inOut" })
        .to(right, { [prop]: "100%",             duration: 0.9, ease: "expo.inOut" }, "<");
    }
  };

  const dimLeft  = hovered === "right";
  const dimRight = hovered === "left";

  return (
    <div
      className="fixed inset-0 z-[200] flex overflow-hidden bg-black"
      style={{ flexDirection: isMobile ? "column" : "row" }}
    >
      {/* ═══ LEFT — Real Estate Photography ═════════════════════════════ */}
      <div
        ref={leftRef}
        className="relative overflow-hidden cursor-pointer"
        style={isMobile ? { width: "100%", height: "50%" } : { width: "50%", height: "100%" }}
        onMouseEnter={() => { if (!selecting) setHovered("left"); }}
        onMouseLeave={() => { if (!selecting) setHovered(null);  }}
        onClick={() => handleSelect("left")}
      >
        <div ref={leftImgRef} className="absolute inset-0 scale-[1.02]">
          <Image src={LEFT_IMG} alt="" fill priority sizes="65vw" className="object-cover" />
        </div>

        {/* Gradient — heavier on left + bottom so text is always legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        {/* Dim veil */}
        <div
          className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-500"
          style={{ opacity: dimLeft ? 0.5 : 0 }}
        />

        <div className="absolute inset-0 flex flex-col justify-between p-10 md:p-14">
          {/* Top: subtle number */}
          <div>
            <span
              className="si-num font-display font-bold select-none leading-none"
              style={{ fontSize: "clamp(4rem,8vw,9rem)", letterSpacing: "-0.05em", color: "rgba(255,255,255,0.05)" }}
            >
              01
            </span>
          </div>

          {/* Bottom: the service name is the hero */}
          <div>
            <p className="si-service text-label text-white/40 tracking-[0.28em] mb-4">
              PHOTOGRAPHY
            </p>
            <h2
              className="si-headline font-display italic text-white leading-[0.88]"
              style={{ fontSize: "clamp(2.6rem, 4.8vw, 6rem)", letterSpacing: "-0.02em" }}
            >
              Real Estate
            </h2>
            <p className="si-sub font-serif italic text-white/40 mt-5 text-sm md:text-base max-w-[26ch]">
              Architectural spaces, elevated. Every property at its absolute best.
            </p>
          </div>
        </div>
      </div>

      {/* ═══ RIGHT — Wedding Films ═══════════════════════════════════════ */}
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />

        <div
          className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-500"
          style={{ opacity: dimRight ? 0.5 : 0 }}
        />

        <div className="absolute inset-0 flex flex-col justify-between p-10 md:p-14">
          {/* Top: number — right aligned */}
          <div className="flex justify-end">
            <span
              className="si-num font-display font-bold select-none leading-none text-right"
              style={{ fontSize: "clamp(4rem,8vw,9rem)", letterSpacing: "-0.05em", color: "rgba(255,255,255,0.05)" }}
            >
              02
            </span>
          </div>

          {/* Bottom: service name */}
          <div className="text-right">
            <p className="si-service text-label text-white/40 tracking-[0.28em] mb-4">
              EVENTS & FILMS
            </p>
            <h2
              className="si-headline font-display italic text-white leading-[0.88]"
              style={{ fontSize: "clamp(2.6rem, 4.8vw, 6rem)", letterSpacing: "-0.02em" }}
            >
              Wedding Films
            </h2>
            <p className="si-sub font-serif italic text-white/40 mt-5 text-sm md:text-base ml-auto max-w-[26ch]">
              Every stolen glance, every joyful tear — yours forever.
            </p>
          </div>
        </div>
      </div>
      {/* ═══ PRODUCT PHOTOGRAPHY — subtle bottom link ═══════════════════ */}
      {!selecting && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
          <Link
            href="/product-photography"
            className="flex items-center gap-3 group"
          >
            <span className="w-4 h-px bg-white/20 group-hover:w-8 group-hover:bg-white/40 transition-all duration-500" />
            <span className="text-label text-white/28 group-hover:text-white/60 transition-colors duration-400 tracking-[0.18em]"
              style={{ fontSize: "0.55rem" }}>
              ALSO: PRODUCT PHOTOGRAPHY
            </span>
            <span className="w-4 h-px bg-white/20 group-hover:w-8 group-hover:bg-white/40 transition-all duration-500" />
          </Link>
        </div>
      )}
    </div>
  );
};
