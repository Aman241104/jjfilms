"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Lightbox, useLightbox } from "@/components/ui/Lightbox";

interface ArchiveItem {
  src:      string;
  title:    string;
  category: "REAL ESTATE" | "PRODUCT" | "EVENTS";
}

const allItems: ArchiveItem[] = [
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80",  title: "The Glass House",        category: "REAL ESTATE" },
  { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",  title: "Timepiece Editorial",    category: "PRODUCT"     },
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=80",  title: "Coastal Ceremony",       category: "EVENTS"      },
  { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=80",  title: "Malibu Residence",       category: "REAL ESTATE" },
  { src: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80",  title: "Fragrance Campaign",     category: "PRODUCT"     },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80",  title: "Corporate Gala 2024",    category: "EVENTS"      },
  { src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=700&q=80",  title: "Minimalist Loft NYC",    category: "REAL ESTATE" },
  { src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",  title: "Sneaker Drop Series",    category: "PRODUCT"     },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&q=80",  title: "Garden Wedding, Amalfi", category: "EVENTS"      },
  { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=700&q=80",  title: "Penthouse Suite",        category: "REAL ESTATE" },
];

type Filter = "ALL" | "REAL ESTATE" | "PRODUCT" | "EVENTS";

export const DarkArchiveGallery = () => {
  const [filter, setFilter]     = useState<Filter>("ALL");
  const [selected, setSelected] = useState(0);
  const scrollRef               = useRef<HTMLDivElement>(null);

  const filtered   = filter === "ALL" ? allItems : allItems.filter((i) => i.category === filter);
  const safeSelected = Math.min(selected, filtered.length - 1);
  const lb = useLightbox(filtered.map((i) => i.src));

  const tabs: Filter[] = ["ALL", "REAL ESTATE", "PRODUCT", "EVENTS"];

  return (
    <>
    <section className="bg-dark-void py-20 md:py-28">
      {/* Header */}
      <div className="px-8 md:px-14 mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p className="text-label text-white/30 mb-2">PORTFOLIO ARCHIVE</p>
          <h2
            className="font-display font-bold text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.02em" }}
          >
            Selected Works
          </h2>
        </div>
        {/* Filter tabs */}
        <div className="flex gap-1 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => { setFilter(tab); setSelected(0); }}
              className={cn(
                "text-label px-4 py-2 rounded-full border transition-all duration-300 interactive",
                filter === tab
                  ? "bg-white/10 border-white/20 text-white"
                  : "border-white/10 text-white/40 hover:text-white/70 hover:border-white/20"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal scroll strip */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-6 px-8 md:px-14 scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.div
              key={item.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              onClick={() => { setSelected(i); lb.openAt(i); }}
              className={cn(
                "relative flex-shrink-0 rounded-sm overflow-hidden cursor-pointer transition-all duration-300 interactive",
                safeSelected === i
                  ? "ring-1 ring-accent-ev scale-[1.02] brightness-110"
                  : "brightness-[0.55] hover:brightness-90"
              )}
              style={{ width: "200px", height: "270px" }}
              data-cursor-image={item.src}
            >
              <Image src={item.src} alt={item.title} fill sizes="200px" className="object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-label text-white/50 mb-0.5">{item.category}</p>
                <p className="text-white text-xs font-medium">{item.title}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Selected detail */}
      {filtered[safeSelected] && (
        <motion.div
          key={`detail-${safeSelected}-${filter}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-8 md:px-14 mt-10 flex flex-col md:flex-row gap-8 items-start"
        >
          <div className="relative w-full md:w-1/2 aspect-video rounded-sm overflow-hidden">
            <Image
              src={filtered[safeSelected].src}
              alt={filtered[safeSelected].title}
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
          <div className="flex-1 pt-2">
            <p className="text-label text-white/30 mb-2">
              ({String(safeSelected + 1).padStart(2, "0")}) {filtered[safeSelected].category}
            </p>
            <h3
              className="font-display font-bold text-white mb-6"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", letterSpacing: "-0.02em" }}
            >
              {filtered[safeSelected].title}
            </h3>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">
              A curated capture from our portfolio. Available for licensing and client presentation.
            </p>
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setSelected(Math.max(0, safeSelected - 1))}
                className="text-label text-white/40 hover:text-white transition-colors interactive"
              >
                ← PREV
              </button>
              <button
                onClick={() => setSelected(Math.min(filtered.length - 1, safeSelected + 1))}
                className="text-label text-white/40 hover:text-white transition-colors interactive"
              >
                NEXT →
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </section>

      <Lightbox
        images={filtered.map((i) => i.src)}
        index={lb.index}
        isOpen={lb.open}
        onClose={lb.close}
        onPrev={lb.prev}
        onNext={lb.next}
      />
    </>
  );
};
