"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num:   "01",
    title: "Brief & Discovery",
    body:  "We start with a conversation — understanding the property, the brand, or the moment. No shoot begins without a clear creative direction agreed on between us.",
  },
  {
    num:   "02",
    title: "The Shoot",
    body:  "On the day, we work methodically and quietly. Our team arrives early, scouts light, and executes with precision — respecting your space and your schedule.",
  },
  {
    num:   "03",
    title: "Edit & Delivery",
    body:  "Every image is individually retouched — colour-calibrated, perspective-corrected and sky-optimised where needed. Delivered to your inbox within 48 working hours.",
  },
];

interface ProcessSectionProps {
  label?: string;
}

export const ProcessSection = ({ label = "HOW WE WORK" }: ProcessSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".proc-step", {
        opacity: 0, y: 30, stagger: 0.15, duration: 0.9, ease: "power3.out",
        clearProps: "opacity,transform",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream-100 py-24 md:py-32 px-8 md:px-14">
      <div className="max-w-screen-xl mx-auto">

        <div className="mb-14">
          <p className="text-label text-ink-300 tracking-widest mb-3">{label}</p>
          <h2
            className="font-display font-bold text-ink-900 leading-[0.95]"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", letterSpacing: "-0.025em" }}
          >
            Three steps.{" "}
            <em className="font-serif italic font-normal text-ink-500">Zero surprises.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-ink-200/30">
          {steps.map(({ num, title, body }) => (
            <div key={num} className="proc-step bg-cream-100 p-10 md:p-12">
              <span
                className="font-display font-bold text-ink-200 leading-none select-none block mb-8"
                style={{ fontSize: "clamp(3rem, 6vw, 5rem)", letterSpacing: "-0.04em" }}
              >
                {num}
              </span>
              <h3
                className="font-display font-semibold text-ink-900 mb-4 leading-tight"
                style={{ fontSize: "clamp(1rem, 1.6vw, 1.3rem)", letterSpacing: "-0.01em" }}
              >
                {title}
              </h3>
              <p className="text-ink-500 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
