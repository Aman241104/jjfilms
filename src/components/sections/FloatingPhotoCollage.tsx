"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lightbox, useLightbox } from "@/components/ui/Lightbox";

interface Photo {
  src:    string;
  left:   string;
  top:    string;
  width:  string;
  rotate: number;
  zIndex: number;
  aspect: string;
  /* Mobile: hide on small screens? */
  hideMobile?: boolean;
}

const photos: Photo[] = [
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",  left: "4%",  top: "8%",  width: "18%", rotate: -6, zIndex: 3, aspect: "2/3" },
  { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",  left: "18%", top: "4%",  width: "13%", rotate:  4, zIndex: 2, aspect: "3/4", hideMobile: true },
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",  left: "3%",  top: "52%", width: "16%", rotate:  5, zIndex: 4, aspect: "3/4" },
  { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",  left: "62%", top: "5%",  width: "20%", rotate: -4, zIndex: 3, aspect: "2/3" },
  { src: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80",  left: "78%", top: "44%", width: "14%", rotate:  7, zIndex: 2, aspect: "4/5", hideMobile: true },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",  left: "66%", top: "60%", width: "18%", rotate: -3, zIndex: 4, aspect: "3/4" },
  { src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",  left: "20%", top: "66%", width: "13%", rotate: -8, zIndex: 2, aspect: "1/1", hideMobile: true },
  { src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",  left: "43%", top: "72%", width: "17%", rotate:  5, zIndex: 3, aspect: "4/5", hideMobile: true },
];

const srcs = photos.map((p) => p.src);

interface FloatingPhotoCollageProps {
  title:     string;
  subtitle?: string;
}

export const FloatingPhotoCollage = ({ title, subtitle = "photographer" }: FloatingPhotoCollageProps) => {
  const lb = useLightbox(srcs);

  return (
    <>
      <section
        className="relative bg-cream-50 overflow-hidden"
        style={{ height: "100svh", minHeight: "560px" }}
      >
        {/* Scattered photos */}
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            onClick={() => lb.openAt(i)}
            className={`absolute shadow-lg rounded-sm overflow-hidden cursor-pointer ${photo.hideMobile ? "hidden md:block" : ""}`}
            style={{
              left: photo.left,
              top: photo.top,
              /* Mobile: photos are smaller */
              width: `clamp(80px, ${photo.width}, ${photo.width})`,
              aspectRatio: photo.aspect,
              zIndex: photo.zIndex,
              rotate: photo.rotate,
            }}
            initial={{ opacity: 0, y: 50, rotate: photo.rotate * 0.4 }}
            animate={{ opacity: 1, y: 0, rotate: photo.rotate }}
            transition={{ delay: i * 0.07 + 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -10, scale: 1.05, zIndex: 20, rotate: photo.rotate * 0.5, transition: { duration: 0.3 } }}
            data-cursor-image={photo.src}
          >
            <Image src={photo.src} alt="" fill sizes="(max-width:768px) 25vw, 20vw" className="object-cover" priority={i < 3} />
          </motion.div>
        ))}

        {/* Central label */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none text-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="text-label text-ink-400 mb-3">{subtitle}</p>
          <h1
            className="font-display font-bold text-ink-900"
            style={{ fontSize: "clamp(2rem, 7vw, 6rem)", letterSpacing: "-0.03em" }}
          >
            {title}
          </h1>
          <p className="font-serif italic text-ink-400 mt-4 text-sm md:text-base">
            click any photo · scroll to browse
          </p>
        </motion.div>
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
