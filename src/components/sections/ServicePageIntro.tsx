"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface Stat {
  val:   string;
  label: string;
}

interface ServicePageIntroProps {
  label:       string;
  accentColor: string;
  headline:    string;
  body:        string;
  stats:       Stat[];
  images:      string[];
}

export const ServicePageIntro = ({
  label,
  accentColor,
  headline,
  body,
  stats,
  images,
}: ServicePageIntroProps) => {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headlineRef.current) return;
    const split = new SplitText(headlineRef.current, { type: "words" });
    const ctx = gsap.context(() => {
      gsap.from(split.words, {
        opacity: 0, y: 30, stagger: 0.05, duration: 0.7, ease: "power3.out",
        clearProps: "opacity,transform",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });
      gsap.from(".spi-body", {
        opacity: 0, y: 20, duration: 0.8, ease: "power3.out",
        clearProps: "opacity,transform",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true },
      });
      gsap.from(".spi-stat", {
        opacity: 0, y: 15, stagger: 0.1, duration: 0.6, ease: "power3.out",
        clearProps: "opacity,transform",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%", once: true },
      });
      gsap.from(".spi-img", {
        clipPath: "inset(100% 0 0 0)", stagger: 0.15, duration: 0.9, ease: "power4.out",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true },
      });
    }, sectionRef);
    return () => { ctx.revert(); gsap.set(split.words, { clearProps: "opacity,transform" }); split.revert(); };
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream-50 py-24 md:py-32 px-8 md:px-14">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-[3fr_2fr] gap-16 items-start">
        <div>
          <p className="text-label mb-4" style={{ color: accentColor }}>{label}</p>
          <h2
            ref={headlineRef}
            className="font-display font-bold text-ink-900 mb-8 leading-[1.05]"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", letterSpacing: "-0.02em" }}
          >
            {headline}
          </h2>
          <p className="spi-body text-ink-500 text-base md:text-lg leading-relaxed max-w-xl mb-12">
            {body}
          </p>
          <div className="flex flex-wrap gap-10">
            {stats.map(({ val, label: statLabel }) => (
              <div key={statLabel} className="spi-stat">
                <p className="font-display font-bold text-3xl text-ink-900">{val}</p>
                <p className="text-label text-ink-400 mt-1">{statLabel}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {images.map((src, i) => (
            <div
              key={i}
              className={`spi-img relative rounded-sm overflow-hidden ${i === 0 ? "col-span-2 aspect-video" : "aspect-square"}`}
            >
              <Image src={src} alt="" fill sizes="40vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
