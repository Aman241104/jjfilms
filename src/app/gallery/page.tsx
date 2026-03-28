"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Magnetic } from "@/components/ui/Magnetic";
import Image from "next/image";
import { X, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const galleryItems = [
  { id: 1, type: "real-estate", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070", title: "Modern Estate" },
  { id: 2, type: "wedding", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069", title: "Eternal Vows" },
  { id: 3, type: "real-estate", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070", title: "Minimalist Interior" },
  { id: 4, type: "wedding", image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070", title: "Coastal Wedding" },
  { id: 5, type: "real-estate", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070", title: "Desert Villa" },
  { id: 6, type: "wedding", image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974", title: "Parisian Romance" },
  { id: 7, type: "real-estate", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974", title: "Aspen Retreat" },
  { id: 8, type: "wedding", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070", title: "Mountain Vows" },
];

const GalleryCard = ({ item, onClick }: { item: any, onClick: () => void }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer overflow-hidden rounded-2xl bg-jjfilms-neutral-900 aspect-[4/5]"
      onClick={onClick}
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none"
      >
        <div className="w-16 h-16 rounded-full glass flex items-center justify-center text-white">
          <Maximize2 size={24} />
        </div>
      </div>

      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
         <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">{item.type.replace("-", " ")}</p>
         <h4 className="text-xl font-serif text-white">{item.title}</h4>
      </div>
    </motion.div>
  );
};

const GalleryPage = () => {
  const [filter, setFilter] = useState<"all" | "real-estate" | "wedding">("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredItems = galleryItems.filter(
    (item) => filter === "all" || item.type === filter
  );

  return (
    <PageWrapper>
      <section className="pt-40 pb-32 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
            <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter">GALLERY.</h1>
            <div className="flex space-x-2 p-1 glass rounded-full">
              {["all", "real-estate", "wedding"].map((f) => (
                <Magnetic key={f}>
                  <button
                    onClick={() => setFilter(f as any)}
                    className={cn(
                      "px-6 py-2 rounded-full text-[10px] md:text-xs uppercase tracking-widest transition-all interactive",
                      filter === f ? "bg-white text-black" : "text-white/60 hover:text-white"
                    )}
                  >
                    {f.replace("-", " ")}
                  </button>
                </Magnetic>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <GalleryCard 
                  key={item.id} 
                  item={item} 
                  onClick={() => setSelectedImage(item.image)} 
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white hover:text-jjfilms-accent-wedding transition-colors interactive">
              <X size={48} />
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-5xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Selected"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default GalleryPage;
