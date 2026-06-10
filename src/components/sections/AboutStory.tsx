"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: "1999", event: "Founded in Mumbai by brothers Jignesh and Jay Shah with a single Nikon F5 and a rented studio barely large enough for a backdrop stand." },
  { year: "2004", event: "First major commercial campaign for a national real estate developer. Architectural photography becomes the studio's defining signature." },
  { year: "2008", event: "Studio expands internationally. First shoots in Dubai and Singapore. A London property developer becomes the first international retainer client." },
  { year: "2013", event: "Wedding division formally launched after years of word-of-mouth event work. 50th wedding covered in Udaipur." },
  { year: "2019", event: "20th anniversary. 400+ projects delivered across three continents. Elena Rossi joins as Head of Commercial & Product." },
  { year: "2024", event: "500+ projects. 25 years. Still the same two brothers behind every brief, every shoot, every frame." },
];

export const AboutStory = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".story-reveal", {
        opacity: 0, y: 30, stagger: 0.09, duration: 0.9, ease: "power3.out",
        clearProps: "opacity,transform",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      });
      gsap.from(".milestone-item", {
        opacity: 0, x: -16, stagger: 0.09, duration: 0.7, ease: "power3.out",
        clearProps: "opacity,transform",
        immediateRender: false,
        scrollTrigger: { trigger: ".as-milestones", start: "top 74%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream-50 py-24 md:py-36 px-8 md:px-14">
      <div className="max-w-screen-xl mx-auto">

        {/* ── Founding narrative ─────────────────────────── */}
        <div className="grid lg:grid-cols-[auto_1fr] gap-12 lg:gap-20 items-start mb-24 md:mb-32">
          {/* Giant year — decorative */}
          <div className="story-reveal hidden md:block">
            <span
              className="font-display font-bold leading-none select-none"
              style={{
                fontSize: "clamp(7rem, 16vw, 18rem)",
                letterSpacing: "-0.06em",
                color: "rgba(0,0,0,0.055)",
              }}
            >
              1999
            </span>
          </div>

          {/* Text */}
          <div className="pt-0 lg:pt-10">
            <p className="story-reveal text-label text-ink-300 tracking-widest mb-6">THE STORY</p>
            <h2
              className="story-reveal font-display font-bold text-ink-900 mb-8 leading-[1.05]"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", letterSpacing: "-0.025em" }}
            >
              Two brothers, one camera,{" "}
              <em className="font-serif italic font-normal text-ink-400">
                and an obsession with light.
              </em>
            </h2>

            <div className="space-y-5 text-ink-500 text-sm md:text-base leading-relaxed max-w-2xl">
              <p className="story-reveal">
                Jignesh and Jay Shah grew up in Mumbai watching their father — a devoted amateur photographer —
                develop film rolls in a makeshift darkroom built behind the kitchen. By the time Jignesh was
                twenty and Jay eighteen, they had sold their motorcycles, pooled their savings and rented a
                studio space barely large enough to fit a light stand and a backdrop roll.
              </p>
              <p className="story-reveal">
                That was 1999. What began as portrait sessions for neighbours and small local businesses evolved,
                project by project, into something neither brother had planned: one of the most trusted
                photography practices in the country — sought out by property developers, global product brands
                and couples on the most important days of their lives.
              </p>
              <p className="story-reveal">
                Twenty-five years later the studio has delivered over 500 projects across three continents.
                The equipment has changed. The team has grown. But the belief behind every frame has stayed
                exactly the same as it was in that first rented studio: every decision matters, and every
                photograph should earn its place.
              </p>
            </div>
          </div>
        </div>

        {/* ── Timeline ───────────────────────────────────── */}
        <div className="as-milestones border-t border-ink-100 pt-16">
          <p className="text-label text-ink-300 tracking-widest mb-12">MILESTONES</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-14">
            {milestones.map(({ year, event }) => (
              <div key={year} className="milestone-item flex gap-5 py-7 border-b border-ink-100/70">
                <span
                  className="font-display font-bold text-ink-200 flex-shrink-0 leading-snug"
                  style={{ fontSize: "1.35rem", letterSpacing: "-0.02em", minWidth: "3.5rem" }}
                >
                  {year}
                </span>
                <p className="text-ink-500 text-sm leading-relaxed">{event}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
