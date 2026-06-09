"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  num:    string;
  label:  string;
  desc:   string;
  href:   string;
  image:  string;
  accent: string;
}

const services: Service[] = [
  {
    num:   "001",
    label: "Real Estate",
    desc:  "Architectural photography that elevates every listing — from intimate apartments to sprawling estates.",
    href:  "/real-estate",
    accent: "var(--accent-re)",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85",
  },
  {
    num:   "002",
    label: "Product",
    desc:  "Clean, compelling visuals for brands and e-commerce. Every object has a story — we tell it beautifully.",
    href:  "/product-photography",
    accent: "var(--accent-pr)",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=85",
  },
  {
    num:   "003",
    label: "Events & Weddings",
    desc:  "Discreet, cinematic storytelling for life's biggest moments. Invisible on the day, unforgettable forever.",
    href:  "/wedding-films",
    accent: "var(--accent-ev)",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=85",
  },
];

export const ServiceSelector = () => {
  const [active, setActive]         = useState(0);
  const [displayed, setDisplayed]   = useState(0); // image trails active by one transition
  const sectionRef                  = useRef<HTMLDivElement>(null);
  const imgWrapRef                  = useRef<HTMLDivElement>(null);
  const isAnimating                 = useRef(false);

  // Section entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".svc-row", {
        x: -24, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
        clearProps: "all",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      });
      gsap.from(".svc-panel", {
        x: 40, opacity: 0, duration: 1, ease: "power3.out",
        clearProps: "all",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (idx: number) => {
    if (idx === active || isAnimating.current) return;
    isAnimating.current = true;
    setActive(idx);

    const wrap = imgWrapRef.current;
    if (!wrap) { isAnimating.current = false; return; }

    gsap.to(wrap, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.38,
      ease: "power3.in",
      onComplete: () => {
        setDisplayed(idx);
        gsap.fromTo(wrap,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.55,
            ease: "power4.out",
            onComplete: () => { isAnimating.current = false; },
          }
        );
      },
    });
  };

  const svc = services[active];
  const img = services[displayed];

  return (
    <section ref={sectionRef} className="bg-cream-50 py-24 md:py-32 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-8 md:px-14 flex flex-col md:grid md:grid-cols-[1fr_1px_1fr] gap-0 md:gap-0 items-stretch min-h-[60vh]">

        {/* ── Left: service list ─────────────────────────── */}
        <div className="flex flex-col justify-between pr-0 md:pr-12 pb-12 md:pb-0">
          <div>
            <p className="text-label text-ink-300 mb-10 md:mb-14">CHOOSE YOUR SPECIALTY</p>

            <ul className="space-y-0">
              {services.map((s, i) => (
                <li
                  key={s.num}
                  className="svc-row group"
                  onMouseEnter={() => handleChange(i)}
                >
                  <button
                    onClick={() => handleChange(i)}
                    className={cn(
                      "w-full text-left py-6 border-b border-ink-100/60 transition-all duration-500",
                      active === i ? "opacity-100" : "opacity-30 hover:opacity-70"
                    )}
                  >
                    <div className="flex items-baseline gap-4 mb-1">
                      <span
                        className="text-label flex-shrink-0 transition-colors duration-300"
                        style={{ color: active === i ? s.accent : undefined }}
                      >
                        {s.num}
                      </span>
                      <span
                        className={cn(
                          "font-display font-semibold leading-none transition-all duration-400",
                          active === i ? "translate-x-1" : ""
                        )}
                        style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)", letterSpacing: "-0.02em" }}
                      >
                        {s.label}
                      </span>
                    </div>

                    {/* Description slides in under active */}
                    <AnimatePresence>
                      {active === i && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden text-ink-400 text-sm leading-relaxed pl-[calc(1.5rem+1rem)] mt-2"
                        >
                          {s.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Counter + CTA */}
          <div className="flex items-center justify-between mt-10 md:mt-0">
            <p className="text-label text-ink-300">
              <span className="font-display text-2xl text-ink-900 mr-2">{String(active + 1).padStart(2, "0")}</span>
              / {String(services.length).padStart(2, "0")}
            </p>
            <Link
              href={svc.href}
              className="text-label text-ink-500 hover:text-ink-900 hover-underline transition-colors interactive"
              style={{ fontSize: "0.62rem" }}
            >
              VIEW ALL {svc.label.toUpperCase()} →
            </Link>
          </div>
        </div>

        {/* ── Divider ────────────────────────────────────── */}
        <div className="hidden md:block bg-ink-100/40 mx-12" />

        {/* ── Right: image panel ─────────────────────────── */}
        <div className="svc-panel flex flex-col gap-3 pl-0 md:pl-12">
          {/* Main image */}
          <div
            ref={imgWrapRef}
            className="relative flex-1 rounded-sm overflow-hidden"
            style={{ minHeight: "360px", clipPath: "inset(0 0 0% 0)" }}
          >
            <Image
              src={img.image}
              alt={img.label}
              fill
              sizes="(max-width:768px) 90vw, 45vw"
              className="object-cover"
              priority
            />
            {/* Bottom info bar */}
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-dark-void/70 to-transparent flex items-end justify-between">
              <div>
                <p className="text-label text-white/50 mb-1" style={{ color: img.accent, fontSize: "0.55rem" }}>
                  {img.num} /
                </p>
                <p className="font-display font-semibold text-white text-xl leading-tight">
                  {img.label}
                </p>
              </div>
              <Link
                href={img.href}
                className="text-label text-white/60 hover:text-white transition-colors interactive"
                style={{ fontSize: "0.58rem" }}
              >
                EXPLORE →
              </Link>
            </div>
          </div>

          {/* Thumbnail strip — the other two services */}
          <div className="grid grid-cols-2 gap-3">
            {services
              .filter((_, i) => i !== displayed)
              .map((s) => (
                <button
                  key={s.num}
                  onClick={() => handleChange(services.indexOf(s))}
                  onMouseEnter={() => handleChange(services.indexOf(s))}
                  className="relative aspect-[4/3] rounded-sm overflow-hidden group interactive"
                >
                  <Image
                    src={s.image}
                    alt={s.label}
                    fill
                    sizes="22vw"
                    className="object-cover scale-105 group-hover:scale-100 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-dark-void/40 group-hover:bg-dark-void/10 transition-colors duration-400" />
                  <p className="absolute bottom-3 left-3 text-label text-white/70" style={{ fontSize: "0.55rem" }}>
                    {s.num} / {s.label.toUpperCase()}
                  </p>
                </button>
              ))}
          </div>
        </div>

      </div>
    </section>
  );
};
