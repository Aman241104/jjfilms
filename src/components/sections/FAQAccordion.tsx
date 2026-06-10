"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "When will I receive my finished photos?",
    a: "Delivery timelines depend on the project scope. Real estate shoots are returned within 48 hours — guaranteed. Wedding and event galleries are delivered within 3–4 weeks. Product campaigns are scoped and agreed during the brief, typically 5–10 business days.",
  },
  {
    q: "How many edited photos will I receive?",
    a: "For real estate, expect 30–80 fully retouched images depending on property size. Wedding and event coverage delivers 400–800+ curated images. Product packages include agreed quantities. We never pad delivery counts — every image we send is one worth keeping.",
  },
  {
    q: "What makes JJ Films different from other studios?",
    a: "JJ Films was founded in 1999 by brothers Jignesh and Jay Shah — that's 25 years of building one thing: a reputation for images that move people. We're not a marketplace or a freelancer platform. Every project is personally handled by the founding team or our senior photographers. You speak to the people who will actually shoot your work.",
  },
  {
    q: "Do you travel for shoots?",
    a: "Yes — we shoot worldwide. Our team has worked across India, Europe, South East Asia, the Middle East and North America. International travel costs are quoted transparently and included in your proposal with no hidden fees.",
  },
  {
    q: "Do you offer videography alongside photography?",
    a: "For weddings and events, yes — we offer combined photo + film packages. For real estate we provide aerial drone footage as an add-on. Product video and brand reels are handled on a case-by-case basis. Ask us during your consultation.",
  },
  {
    q: "How far in advance should I book?",
    a: "For weddings and large events, 6–12 months ahead is ideal — especially for peak season dates. Real estate and product shoots can often be accommodated within 1–2 weeks. Contact us and we'll always do our best to make it work.",
  },
  {
    q: "Can I see more of your work before booking?",
    a: "Absolutely — visit our Gallery page for a curated selection across all categories. You can also request a category-specific portfolio by reaching out to us directly at hello@jjfilms.studio and we'll send you relevant work within 24 hours.",
  },
];

const floatingImgs = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=300&q=70", top: "0%",  left: "0%",  rotate:  4 },
  { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=70", top: "35%", left: "8%",  rotate: -6 },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&q=70", top: "68%", left: "2%",  rotate:  3 },
];

export const FAQAccordion = () => {
  const [open, setOpen]   = useState<number | null>(0);
  const sectionRef        = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-row", {
        opacity: 0, y: 20, stagger: 0.08, duration: 0.7, ease: "power3.out",
        clearProps: "opacity,transform",
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
                  <span
                    className="text-ink-400 text-lg flex-shrink-0 transition-transform duration-300"
                    style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
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

          {/* Floating photos */}
          <div className="relative hidden md:block" style={{ height: "540px" }}>
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
