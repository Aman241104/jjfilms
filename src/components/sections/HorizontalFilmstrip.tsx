"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lightbox, useLightbox } from "@/components/ui/Lightbox";

gsap.registerPlugin(ScrollTrigger);

interface StripItem {
  src:      string;
  category: string;
  title:    string;
  size?: "normal" | "tall" | "short";
}

const items: StripItem[] = [
  { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80",  category: "REAL ESTATE", title: "The Glass House",     size: "tall"   },
  { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",  category: "PRODUCT",     title: "Timepiece Editorial", size: "short"  },
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80",  category: "WEDDINGS",    title: "Coastal Ceremony",    size: "normal" },
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80",  category: "REAL ESTATE", title: "Malibu Residence",    size: "tall"   },
  { src: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80",  category: "PRODUCT",     title: "Fragrance Campaign",  size: "short"  },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80",  category: "EVENTS",      title: "Corporate Gala",      size: "normal" },
  { src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=80",  category: "REAL ESTATE", title: "Minimalist Loft",     size: "tall"   },
  { src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",  category: "PRODUCT",     title: "Sneaker Series",      size: "short"  },
];

/* Stagger cards above/below center — positive mt pushes down, negative mt lifts up */
const mtOffsets = ["0px", "80px", "40px", "-40px", "100px", "20px", "-20px", "60px"];

/* Desktop sizes */
const hD = { tall: "60vh", normal: "46vh", short: "33vh" };
const wD = { tall: "28vw", normal: "21vw", short: "16vw" };
/* Mobile sizes */
const hM = { tall: "56vw", normal: "42vw", short: "30vw" };
const wM = { tall: "48vw", normal: "36vw", short: "26vw" };

const srcs = items.map((i) => i.src);

export const HorizontalFilmstrip = () => {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const stripRef    = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const lb = useLightbox(srcs);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const section  = sectionRef.current;
    const strip    = stripRef.current;
    const progress = progressRef.current;
    if (!section || !strip) return;

    const ctx = gsap.context(() => {
      const totalScroll = strip.scrollWidth - strip.offsetWidth;
      if (totalScroll <= 0) return;

      const horizontalTween = gsap.to(strip, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.4,
          end: () => `+=${totalScroll + window.innerWidth * 0.35}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progress) gsap.set(progress, { scaleX: self.progress });
          },
        },
      });

      /* Stagger cards in on first appearance as they scroll into view */
      strip.querySelectorAll<HTMLElement>(".strip-card").forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: "power3.out",
          clearProps: "all",
          immediateRender: false,
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontalTween,
            start: "left 90%",
            once: true,
          },
        });
      });

      /* Inner parallax */
      strip.querySelectorAll<HTMLElement>(".strip-img").forEach((img) => {
        gsap.fromTo(img,
          { x: -16 },
          {
            x: 16,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: img,
              containerAnimation: horizontalTween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  const hMap = isMobile ? hM : hD;
  const wMap = isMobile ? wM : wD;

  return (
    <>
      {/*
        overflowX:"clip" prevents horizontal scrollbar without creating a new stacking context
        — unlike overflow:hidden it does NOT clip the Y axis, so vertically-offset cards show.
      */}
      <section
        ref={sectionRef}
        className="bg-cream-50"
        style={{ overflowX: "clip" }}
      >
        {/* ── Header ─────────────────────────────────── */}
        <div className="px-8 md:px-14 pt-16 md:pt-20 pb-10 md:pb-14 flex items-end justify-between border-b border-ink-100/50">
          <div>
            <p className="text-label text-ink-300 mb-3">SELECTED WORK</p>
            <h2
              className="font-display font-bold text-ink-900 leading-none"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)", letterSpacing: "-0.03em" }}
            >
              A collection
            </h2>
          </div>
          <div className="text-right hidden sm:block">
            <p className="font-serif italic text-ink-400 text-sm mb-1">
              {isMobile ? "swipe to explore" : "scroll to explore"}
            </p>
            <p className="text-label text-ink-200">
              {String(items.length).padStart(2, "0")} works
            </p>
          </div>
        </div>

        {/* ── Strip — items-end so tallest image anchors the top, others vary via mt ── */}
        <div
          ref={stripRef}
          className="flex items-end gap-4 md:gap-5 px-8 md:px-14 pb-16 md:pb-20 pt-16 md:pt-20 w-max"
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="strip-card relative flex-shrink-0 overflow-hidden rounded-sm group cursor-pointer"
              style={{
                width:       wMap[item.size ?? "normal"],
                height:      hMap[item.size ?? "normal"],
                marginBottom: mtOffsets[i % mtOffsets.length],
              }}
              onClick={() => lb.openAt(i)}
              data-cursor-image={item.src}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width:768px) 52vw, 30vw"
                className="strip-img object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-void/80 via-dark-void/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Number */}
              <span
                className="absolute top-3 left-3 text-label text-white/0 group-hover:text-white/50 transition-colors duration-300"
                style={{ fontSize: "0.5rem", letterSpacing: "0.2em" }}
              >
                ({String(i + 1).padStart(2, "0")})
              </span>

              {/* Category badge */}
              <span
                className="absolute top-3 right-3 text-label bg-dark-void/50 text-white/80 px-2 py-1 rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ fontSize: "0.48rem", letterSpacing: "0.18em" }}
              >
                {item.category}
              </span>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                <p
                  className="font-display font-semibold text-white leading-tight"
                  style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.2rem)", letterSpacing: "-0.01em" }}
                >
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Progress bar ───────────────────────────── */}
        <div className="relative h-px bg-ink-100/40 mx-8 md:mx-14 mb-8">
          <div
            ref={progressRef}
            className="absolute inset-0 bg-ink-400 origin-left"
            style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
          />
        </div>
      </section>

      <Lightbox
        images={srcs}
        index={lb.index}
        isOpen={lb.open}
        onClose={lb.close}
        onPrev={lb.prev}
        onNext={lb.next}
      />
    </>
  );
};
