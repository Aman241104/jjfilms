"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const awards = [
  { year: "2024", title: "Best Real Estate Photographer", body: "Asia Property Awards" },
  { year: "2023", title: "Gold — Commercial Photography", body: "The Photography Show, India" },
  { year: "2022", title: "Wedding Photographer of the Year", body: "WedMeGood Excellence Awards" },
  { year: "2021", title: "Outstanding Product Campaign", body: "Cannes Lions — Shortlist" },
  { year: "2019", title: "25-Year Legacy Award", body: "Photographers' Guild of India" },
];

export const AwardsStrip = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".award-row", {
        opacity: 0, x: -20, stagger: 0.1, duration: 0.8, ease: "power3.out",
        clearProps: "opacity,transform",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream-50 py-20 md:py-28 px-8 md:px-14">
      <div className="max-w-screen-xl mx-auto">

        <div className="border-t border-ink-200 mb-2 flex items-baseline justify-between pt-6 mb-10">
          <p className="text-label text-ink-300 tracking-widest">RECOGNITION</p>
          <p className="font-serif italic text-ink-400 text-sm">awards & accolades</p>
        </div>

        <div className="divide-y divide-ink-100">
          {awards.map(({ year, title, body }) => (
            <div
              key={year + title}
              className="award-row flex items-baseline gap-6 py-5 group"
            >
              <span className="text-label text-ink-300 w-12 flex-shrink-0">{year}</span>
              <div className="flex-1 min-w-0">
                <p
                  className="font-display font-semibold text-ink-900 group-hover:translate-x-1 transition-transform duration-300"
                  style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", letterSpacing: "-0.01em" }}
                >
                  {title}
                </p>
              </div>
              <p className="font-serif italic text-ink-400 text-sm hidden md:block flex-shrink-0">{body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
