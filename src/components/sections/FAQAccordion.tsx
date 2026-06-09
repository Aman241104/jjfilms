"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { q: "When will I receive my finished photos?",       a: "Delivery timelines depend on the project scope. Real estate shoots are typically returned within 48 hours. Event and wedding galleries are delivered within 3–4 weeks. Product campaigns are discussed during brief." },
  { q: "How many edited photos will I receive?",        a: "For real estate, expect 30–80 fully retouched images depending on property size. Product packages include agreed quantities. Wedding/event coverage delivers 400–800+ curated images." },
  { q: "Can you shoot in any location?",                a: "Yes — we travel worldwide. Our team has shot in Europe, North America and Asia. Travel costs for international projects are quoted separately." },
  { q: "Do you offer videography alongside photography?", a: "For events and weddings, yes — we offer combined photo + video packages. For real estate we provide aerial drone footage as an add-on. Product video campaigns are handled case by case." },
  { q: "How far in advance should I book?",             a: "For weddings and large events, 6–12 months ahead is ideal. Real estate and product shoots can often be accommodated within 1–2 weeks." },
];

const floatingImgs = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=300&q=70", top: "0%",  left: "0%",  rotate: 4 },
  { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=70", top: "35%", left: "8%",  rotate: -6 },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&q=70", top: "68%", left: "2%",  rotate: 3 },
];

export const FAQAccordion = () => {
  const [open, setOpen]   = useState<number | null>(0);
  const sectionRef        = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-row", {
        opacity: 0, y: 20, stagger: 0.08, duration: 0.7, ease: "power3.out",
        clearProps: "all",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream-50 py-24 md:py-36 px-8 md:px-14">
      <div className="max-w-screen-xl mx-auto">
        <p className="text-label text-ink-300 mb-4">FAQ</p>
        <h2
          className="font-display font-bold text-ink-900 mb-16"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.02em" }}
        >
          FREQUENTLY{" "}
          <em className="font-serif italic not-italic text-ink-500">Asked</em>{" "}
          QUESTIONS
        </h2>

        <div className="grid md:grid-cols-[3fr_1fr] gap-12 items-start">
          {/* Accordion */}
          <div>
            {faqs.map((faq, i) => (
              <div key={i} className="faq-row border-b border-ink-100">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left interactive group"
                >
                  <span className="font-sans text-ink-900 text-sm md:text-base font-medium pr-4 group-hover:text-ink-700">
                    {faq.q}
                  </span>
                  <span className="text-ink-400 text-lg flex-shrink-0 transition-transform duration-300" style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}>
                    +
                  </span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-ink-500 text-sm leading-relaxed pb-5 pr-8">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Floating photos column */}
          <div className="relative hidden md:block" style={{ height: "480px" }}>
            {floatingImgs.map((img, i) => (
              <motion.div
                key={i}
                className="absolute w-32 h-40 rounded-sm overflow-hidden shadow-lg"
                style={{ top: img.top, left: img.left, rotate: img.rotate }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7, ease: "easeOut" }}
              >
                <Image src={img.src} alt="" fill sizes="128px" className="object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
