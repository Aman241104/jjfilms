"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(SplitText, ScrollTrigger);

export const EditorialStatement = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const split = new SplitText(textRef.current, { type: "words" });

    const ctx = gsap.context(() => {
      gsap.from(split.words, {
        opacity: 0,
        y: 20,
        stagger: 0.03,
        duration: 0.6,
        ease: "power3.out",
        clearProps: "all",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      });

      gsap.from(".stmt-img", {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        clearProps: "all",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 68%", once: true },
      });

      gsap.from(".stmt-stat", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        clearProps: "all",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%", once: true },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      gsap.set(split.words, { clearProps: "all" });
      split.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream-50 py-24 md:py-36 px-8 md:px-14">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-20 items-start">

        {/* ── Left: text + stats ─────────────────────── */}
        <div>
          <p
            ref={textRef}
            className="font-display font-bold text-ink-900 leading-[1.12]"
            style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.6rem)", letterSpacing: "-0.015em" }}
          >
            EVERY FRAME IS A{" "}
            <em className="not-italic font-display font-bold text-accent-ev underline decoration-accent-ev/40 underline-offset-4">
              DECISION
            </em>
            . EVERY MOMENT PRESERVED{" "}
            <em className="not-italic font-serif italic text-ink-700">FOREVER</em>. WE
            PHOTOGRAPH WHAT MATTERS — ARCHITECTURE, OBJECTS AND THE STORIES OF PEOPLE IN LOVE.
          </p>

          <div className="mt-12 flex flex-wrap gap-12">
            {[
              { val: "500+", label: "Properties Photographed" },
              { val: "12+",  label: "Years of Experience" },
              { val: "98%",  label: "Client Satisfaction" },
            ].map(({ val, label }) => (
              <div key={label} className="stmt-stat">
                <p className="font-display font-bold text-3xl text-ink-900">{val}</p>
                <p className="text-label text-ink-400 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: floating photo stack ─────────────── */}
        <div className="hidden lg:flex flex-col gap-4 pt-4">
          <div
            className="stmt-img relative rounded-sm overflow-hidden shadow-xl cursor-pointer interactive"
            style={{ width: "220px", height: "293px", transform: "rotate(3deg)" }}
            data-cursor-image="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80"
          >
            <Image
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80"
              alt=""
              fill
              sizes="220px"
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div
            className="stmt-img relative rounded-sm overflow-hidden shadow-lg cursor-pointer interactive self-end"
            style={{ width: "170px", height: "213px", transform: "rotate(-2deg)", marginTop: "-40px" }}
            data-cursor-image="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80"
          >
            <Image
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80"
              alt=""
              fill
              sizes="170px"
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
