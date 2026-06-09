"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface DeckPhoto {
  src:      string;
  title:    string;
  location: string;
  category: string;
}

const deckPhotos: DeckPhoto[] = [
  { src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",  title: "Oceanfront Villa",      location: "Malibu, CA",    category: "REAL ESTATE" },
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",  title: "Tuscany Ceremony",      location: "Florence, IT",  category: "EVENTS"      },
  { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",  title: "Watch Campaign",        location: "Studio, NYC",   category: "PRODUCT"     },
  { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",  title: "Sunset Residence",      location: "Beverly Hills", category: "REAL ESTATE" },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",  title: "Annual Gala",           location: "London, UK",    category: "EVENTS"      },
];

const StackCorner = ({ photos, side }: { photos: string[]; side: "tl" | "tr" | "bl" | "br" }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative w-32 h-40 md:w-40 md:h-52"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ perspective: "600px" }}
    >
      {photos.slice(0, 6).map((src, i) => {
        const spread   = hovered ? i * 12 : i * 4;
        const rotSpread = hovered ? (i - 2.5) * 14 : (i - 2.5) * 5;
        return (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-sm overflow-hidden shadow-md"
            animate={{
              rotateZ: rotSpread,
              x: side === "tl" ? -spread : spread,
              y: side === "tl" ? -spread : spread,
              zIndex: i,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src={src} alt="" fill sizes="160px" className="object-cover" />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export const PhotoDeck3D = () => {
  const [current, setCurrent] = useState(0);
  const [time, setTime]       = useState("");
  const [dateStr, setDateStr] = useState("");
  const sectionRef            = useRef<HTMLDivElement>(null);

  // Live clock — initialised client-side only to avoid hydration mismatch
  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setDateStr(d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }));
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".deck-reveal", {
        opacity: 0, y: 30, stagger: 0.1, duration: 0.8, ease: "power3.out",
        clearProps: "opacity,transform",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const photo    = deckPhotos[current];
  const allSrcs  = deckPhotos.map((p) => p.src);

  return (
    <section ref={sectionRef} className="bg-cream-50 py-24 md:py-36 px-8 md:px-14 relative">
      {/* Timestamp – top left */}
      <div className="absolute top-8 left-8 md:top-10 md:left-10">
        <p className="text-label text-ink-300" suppressHydrationWarning>
          {dateStr}
        </p>
        <p className="font-sans text-ink-400 text-xs mt-0.5">
          {time}<span className="animate-pulse">_</span>
        </p>
      </div>

      <div className="max-w-screen-xl mx-auto flex flex-col items-center">
        {/* Label */}
        <p className="deck-reveal text-label text-ink-300 mb-10">FEATURED CAPTURES</p>

        <div className="relative w-full flex items-center justify-center gap-8 md:gap-16">
          {/* Bottom-left stack */}
          <div className="deck-reveal self-end hidden md:block">
            <StackCorner photos={allSrcs.slice(2)} side="bl" />
          </div>

          {/* Center photo */}
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="deck-reveal relative rounded-sm overflow-hidden shadow-2xl"
            style={{ width: "min(480px, 90vw)", aspectRatio: "4/5" }}
          >
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              sizes="480px"
              className="object-cover"
            />
          </motion.div>

          {/* Top-right stack */}
          <div className="deck-reveal self-start hidden md:block">
            <StackCorner photos={allSrcs} side="tr" />
          </div>
        </div>

        {/* Caption */}
        <motion.div
          key={`cap-${current}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-label text-ink-300 mb-1">{photo.category}</p>
          <h3
            className="font-display font-semibold text-ink-900 mb-1"
            style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", letterSpacing: "-0.01em" }}
          >
            {photo.title}
          </h3>
          <p className="font-serif italic text-ink-400 text-sm">{photo.location}</p>
        </motion.div>

        {/* Navigation */}
        <div className="flex gap-8 mt-8">
          <button
            onClick={() => setCurrent((current - 1 + deckPhotos.length) % deckPhotos.length)}
            className="text-label text-ink-400 hover:text-ink-900 transition-colors interactive"
          >
            ← PREV
          </button>
          <span className="text-label text-ink-200">
            {String(current + 1).padStart(2, "0")} / {String(deckPhotos.length).padStart(2, "0")}
          </span>
          <button
            onClick={() => setCurrent((current + 1) % deckPhotos.length)}
            className="text-label text-ink-400 hover:text-ink-900 transition-colors interactive"
          >
            NEXT →
          </button>
        </div>
      </div>
    </section>
  );
};
