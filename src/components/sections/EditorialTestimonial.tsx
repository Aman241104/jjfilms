"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  num:      string;
  quote:    string;
  author:   string;
  role:     string;
  mainImg:  string;
  thumbImg: string;
}

const testimonials: Testimonial[] = [
  {
    num:  "001",
    quote:
      "The photographs captured our home in a way we never imagined possible. Every frame tells a story — we had three offers within 48 hours.",
    author:   "SARAH K.",
    role:     "Homeowner, Malibu",
    mainImg:  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80",
    thumbImg: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&q=80",
  },
  {
    num:  "002",
    quote:
      "Working with the team was effortless. They understood exactly what our brand needed — the product shots exceeded every expectation.",
    author:   "MARCO V.",
    role:     "Creative Director, Milan",
    mainImg:  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=80",
    thumbImg: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&q=80",
  },
  {
    num:  "003",
    quote:
      "They were invisible on our wedding day yet somehow captured every stolen glance and joyful tear. These photos are our greatest treasure.",
    author:   "ELENA & JAMES",
    role:     "Couple, Tuscany Wedding",
    mainImg:  "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80",
    thumbImg: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80",
  },
];

export const EditorialTestimonial = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef            = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tes-reveal", {
        opacity: 0, y: 30, stagger: 0.1, duration: 0.85, ease: "power3.out",
        clearProps: "opacity,transform",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const t    = testimonials[current];
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((current + 1) % testimonials.length);

  return (
    <section ref={sectionRef} className="bg-dark-void py-20 md:py-32 px-8 md:px-14 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">

        {/* ── Top bar ──────────────────────────────── */}
        <div className="tes-reveal flex items-center justify-between mb-14 md:mb-20">
          <p className="text-label text-white/25 tracking-widest">CLIENT STORIES</p>
          <p className="text-label text-white/15">
            {String(testimonials.length).padStart(2, "0")} VOICES
          </p>
        </div>

        {/* ── Main grid ────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-20 items-center">

          {/* Left — large image with number overlay */}
          <div className="tes-reveal relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`main-${current}`}
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.38 } }}
                transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-sm overflow-hidden"
                style={{ aspectRatio: "4/5" }}
              >
                <Image
                  src={t.mainImg}
                  alt={t.author}
                  fill
                  sizes="(max-width:768px) 90vw, 48vw"
                  className="object-cover"
                />
                {/* Subtle bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-void/50 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Decorative index number — bottom left corner */}
            <span
              className="absolute bottom-4 left-5 font-display font-bold text-white/10 select-none pointer-events-none"
              style={{ fontSize: "clamp(4rem, 7vw, 7rem)", lineHeight: 1, letterSpacing: "-0.04em" }}
            >
              {t.num}
            </span>
          </div>

          {/* Right — quote panel */}
          <div className="flex flex-col justify-between gap-10">

            {/* Opening mark */}
            <p
              className="tes-reveal font-serif text-white/10 leading-none select-none"
              style={{ fontSize: "clamp(5rem, 9vw, 10rem)", lineHeight: 0.7 }}
            >
              &ldquo;
            </p>

            {/* Quote */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`quote-${current}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1"
              >
                <blockquote
                  className="font-serif italic text-white leading-relaxed"
                  style={{ fontSize: "clamp(1.15rem, 1.9vw, 1.6rem)" }}
                >
                  {t.quote}
                </blockquote>
              </motion.div>
            </AnimatePresence>

            {/* Author row */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`author-${current}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="flex items-center gap-4"
              >
                {/* Thumb — circular portrait */}
                <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-white/10">
                  <Image src={t.thumbImg} alt="" fill sizes="44px" className="object-cover" />
                </div>
                <div>
                  <p className="text-label text-white/80 mb-0.5">{t.author}</p>
                  <p className="text-label text-white/35">{t.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="tes-reveal flex items-center justify-between pt-6 border-t border-white/8">
              {/* Dot indicators */}
              <div className="flex gap-2 items-center">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={cn(
                      "h-px transition-all duration-400 interactive",
                      current === i ? "w-10 bg-white/70" : "w-4 bg-white/20 hover:bg-white/40"
                    )}
                  />
                ))}
              </div>
              {/* Prev / Next */}
              <div className="flex items-center gap-6">
                <button
                  onClick={prev}
                  className="text-label text-white/30 hover:text-white/80 transition-colors duration-300 interactive"
                >
                  ← PREV
                </button>
                <span className="text-label text-white/10">|</span>
                <button
                  onClick={next}
                  className="text-label text-white/30 hover:text-white/80 transition-colors duration-300 interactive"
                >
                  NEXT →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
