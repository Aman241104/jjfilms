"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const publications = [
  "Architectural Digest",
  "Vogue India",
  "Harper's Bazaar",
  "Condé Nast Traveller",
  "Elle Décor",
  "GQ India",
  "Better Homes & Gardens",
];

export const PressStrip = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".press-item", {
        opacity: 0, y: 12, stagger: 0.07, duration: 0.6, ease: "power3.out",
        clearProps: "opacity,transform",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream-50 py-14 md:py-20 px-8 md:px-14 border-t border-ink-100">
      <div className="max-w-screen-xl mx-auto">
        <p className="text-label text-ink-300 tracking-widest mb-8">AS FEATURED IN</p>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
          {publications.map((pub, i) => (
            <React.Fragment key={pub}>
              <span
                className="press-item font-serif italic text-ink-300 transition-colors duration-300 hover:text-ink-600"
                style={{ fontSize: "clamp(1rem, 1.6vw, 1.4rem)", letterSpacing: "-0.01em" }}
              >
                {pub}
              </span>
              {i < publications.length - 1 && (
                <span className="press-item text-ink-200 text-xs select-none">·</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
