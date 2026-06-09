"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images:  string[];
  index:   number;
  isOpen:  boolean;
  onClose: () => void;
  onPrev:  () => void;
  onNext:  () => void;
}

export const Lightbox = ({ images, index, isOpen, onClose, onPrev, onNext }: LightboxProps) => {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[800] bg-dark-void/95 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10 interactive"
          >
            <X size={28} />
          </button>

          {/* Counter */}
          <span className="absolute top-7 left-8 text-label text-white/40">
            ({String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")})
          </span>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors z-10 interactive p-3"
          >
            <ChevronLeft size={36} />
          </button>

          {/* Image */}
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[85vh] max-w-[85vw] aspect-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ width: "min(900px, 85vw)", height: "min(700px, 85vh)" }}
          >
            <Image
              src={images[index]}
              alt=""
              fill
              sizes="85vw"
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors z-10 interactive p-3"
          >
            <ChevronRight size={36} />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); }}
                className={`h-1 rounded-full transition-all duration-300 interactive ${
                  i === index ? "w-6 bg-white" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook to manage lightbox state cleanly
export function useLightbox(images: string[]) {
  const [open, setOpen]   = React.useState(false);
  const [index, setIndex] = React.useState(0);

  const openAt = (i: number) => { setIndex(i); setOpen(true); };
  const close   = ()         => setOpen(false);
  const prev    = ()         => setIndex((i) => (i - 1 + images.length) % images.length);
  const next    = ()         => setIndex((i) => (i + 1) % images.length);

  return { open, index, openAt, close, prev, next };
}
