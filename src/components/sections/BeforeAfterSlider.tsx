"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface BeforeAfterSliderProps {
  beforeSrc?: string;
  afterSrc?:  string;
  label?:     string;
}

export const BeforeAfterSlider = ({
  beforeSrc = "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?w=1400&q=80",
  afterSrc  = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80",
  label     = "THE JJ FILMS DIFFERENCE",
}: BeforeAfterSliderProps) => {
  const containerRef  = useRef<HTMLDivElement>(null);
  const sectionRef    = useRef<HTMLDivElement>(null);
  const [split, setSplit]       = useState(50);
  const [dragging, setDragging] = useState(false);

  const clamp = (v: number) => Math.max(4, Math.min(96, v));

  const getPercent = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return 50;
    return clamp(((clientX - rect.left) / rect.width) * 100);
  }, []);

  // Mouse
  const onMouseDown = () => setDragging(true);
  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging) return;
    setSplit(getPercent(e.clientX));
  }, [dragging, getPercent]);
  const onMouseUp = () => setDragging(false);

  // Touch
  const onTouchStart = () => setDragging(true);
  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!dragging) return;
    setSplit(getPercent(e.touches[0].clientX));
  }, [dragging, getPercent]);
  const onTouchEnd = () => setDragging(false);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup",   onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend",  onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup",   onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend",  onTouchEnd);
    };
  }, [onMouseMove, onTouchMove]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ba-reveal", {
        opacity: 0, y: 25, stagger: 0.1, duration: 0.9, ease: "power3.out",
        clearProps: "opacity,transform",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream-50 py-24 md:py-32 px-8 md:px-14">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
          <div>
            <p className="ba-reveal text-label text-ink-300 tracking-widest mb-3">{label}</p>
            <h2
              className="ba-reveal font-display font-bold text-ink-900 leading-[0.95]"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", letterSpacing: "-0.025em" }}
            >
              Before &{" "}
              <em className="font-serif italic font-normal text-ink-500">After</em>
            </h2>
          </div>
          <p className="ba-reveal font-serif italic text-ink-400 text-sm md:text-base">
            Drag to compare — raw capture vs. JJ Films post-processing.
          </p>
        </div>

        {/* Slider */}
        <div
          ref={containerRef}
          className="ba-reveal relative w-full rounded-sm overflow-hidden select-none"
          style={{ aspectRatio: "16/7", cursor: dragging ? "grabbing" : "col-resize" }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          {/* BEFORE image — full width underneath */}
          <div className="absolute inset-0">
            <Image
              src={beforeSrc}
              alt="Before — unedited"
              fill
              sizes="100vw"
              className="object-cover"
              style={{ filter: "saturate(0.5) brightness(0.75) contrast(0.9)" }}
            />
            <span
              className="absolute top-4 left-4 text-label text-white/70 bg-black/40 px-3 py-1 rounded-[2px]"
              style={{ fontSize: "0.6rem", letterSpacing: "0.2em" }}
            >
              BEFORE
            </span>
          </div>

          {/* AFTER image — clipped to left of split */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
          >
            <Image
              src={afterSrc}
              alt="After — JJ Films edited"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <span
              className="absolute top-4 left-4 text-label text-white/90 bg-black/50 px-3 py-1 rounded-[2px]"
              style={{ fontSize: "0.6rem", letterSpacing: "0.2em" }}
            >
              AFTER
            </span>
          </div>

          {/* Divider line */}
          <div
            className="absolute top-0 bottom-0 w-px bg-white/80 pointer-events-none"
            style={{ left: `${split}%` }}
          />

          {/* Handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center pointer-events-none"
            style={{ left: `${split}%` }}
          >
            <span className="text-ink-600 text-xs select-none">⟺</span>
          </div>
        </div>

        {/* Caption */}
        <p className="ba-reveal text-label text-ink-300 mt-4 text-center">
          Every image is individually retouched — colour calibrated, perspective-corrected and sky-enhanced.
        </p>
      </div>
    </section>
  );
};
