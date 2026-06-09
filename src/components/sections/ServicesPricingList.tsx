"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num:     "01",
    name:    "Real Estate Photography",
    desc:    "Architectural excellence for residential & commercial properties.",
    from:    "FROM $350",
    href:    "/real-estate",
    accent:  "var(--accent-re)",
  },
  {
    num:     "02",
    name:    "Product Photography",
    desc:    "Clean, compelling visuals for brands and e-commerce.",
    from:    "FROM $280",
    href:    "/product-photography",
    accent:  "var(--accent-pr)",
  },
  {
    num:     "03",
    name:    "Events & Weddings",
    desc:    "Discreet, cinematic storytelling for life's biggest moments.",
    from:    "FROM $1,200",
    href:    "/wedding-films",
    accent:  "var(--accent-ev)",
  },
];

export const ServicesPricingList = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pricing-row", {
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        clearProps: "all",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream-50 px-8 md:px-14 py-20 md:py-28">
      <div className="max-w-screen-lg mx-auto">
        <div className="border-t border-ink-200 mb-2 flex items-baseline justify-between pt-6">
          <p className="text-label text-ink-300">OUR SERVICES</p>
          <p className="font-serif italic text-ink-400 text-sm">starting prices</p>
        </div>

        {services.map((svc) => (
          <Link
            key={svc.num}
            href={svc.href}
            className="pricing-row group flex items-center gap-5 py-6 border-b border-ink-100 hover:bg-cream-100 -mx-4 px-4 transition-colors duration-300 rounded-sm"
          >
            <span className="text-label text-ink-300 w-8 flex-shrink-0">{svc.num}</span>

            <div className="flex-1 min-w-0">
              <p
                className="font-display font-semibold text-xl md:text-2xl text-ink-900 group-hover:translate-x-1 transition-transform duration-300"
                style={{ letterSpacing: "-0.01em" }}
              >
                {svc.name}
              </p>
              <p className="text-ink-400 text-sm mt-0.5 hidden md:block">{svc.desc}</p>
            </div>

            <span className="text-label text-ink-400 flex-shrink-0 hidden md:block">{svc.from}</span>

            <span
              className="text-label flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:translate-x-0 translate-x-2"
              style={{ color: svc.accent }}
            >
              EXPLORE →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};
