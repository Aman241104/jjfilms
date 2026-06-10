"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    num:   "01",
    title: "Founded by family, run by passion",
    body:  "JJ Films is not a marketplace or a booking platform. Jignesh and Jay Shah personally oversee every project — the same two brothers who started in a rented Mumbai studio in 1999.",
  },
  {
    num:   "02",
    title: "25 years of consistent craft",
    body:  "Half a century of combined experience means we've seen every light, every location, every brief. We don't experiment on your project — we bring proven technique to every frame.",
  },
  {
    num:   "03",
    title: "48-hour delivery guarantee",
    body:  "Real estate clients receive fully retouched images within 48 working hours — guaranteed. We know your listing can't wait, and neither should you.",
  },
  {
    num:   "04",
    title: "Mumbai-based. Worldwide capability.",
    body:  "Our team has shot across India, the Middle East, Europe and South East Asia. International projects are quoted transparently — no hidden travel markups, no surprises.",
  },
];

export const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".wcu-card", {
        opacity: 0, y: 35, stagger: 0.13, duration: 0.9, ease: "power3.out",
        clearProps: "opacity,transform",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-dark-void py-24 md:py-36 px-8 md:px-14">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20 gap-6">
          <div>
            <p className="text-label text-white/25 tracking-widest mb-4">WHY JJ FILMS</p>
            <h2
              className="font-display font-bold text-white leading-[0.95]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", letterSpacing: "-0.025em" }}
            >
              What sets us apart<br />
              <em className="font-serif italic font-normal text-white/40">from the rest.</em>
            </h2>
          </div>
          <p className="font-serif italic text-white/30 text-sm md:text-base max-w-xs text-left md:text-right">
            25 years. 500+ projects. The same two brothers behind every brief.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-px bg-white/5">
          {reasons.map(({ num, title, body }) => (
            <div key={num} className="wcu-card bg-dark-void p-10 md:p-12 group hover:bg-white/[0.03] transition-colors duration-500">
              <span
                className="font-display font-bold text-white/8 leading-none select-none block mb-8"
                style={{ fontSize: "clamp(3rem,6vw,5rem)", letterSpacing: "-0.04em" }}
              >
                {num}
              </span>
              <h3
                className="font-display font-semibold text-white mb-4 leading-tight"
                style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)", letterSpacing: "-0.01em" }}
              >
                {title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
