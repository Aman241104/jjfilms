"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Magnetic } from "@/components/ui/Magnetic";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";

const images = {
  realEstate: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070",
    "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=2070",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2070",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070",
  ],
  wedding: [
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069",
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070",
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070",
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=2070",
  ],
};

const MovingGrid = ({ side, active, isMobile = false, mouseX, mouseY }: { side: "left" | "right", active: boolean, isMobile?: boolean, mouseX?: any, mouseY?: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = side === "left" ? images.realEstate : images.wedding;

  const xParallax = useTransform(mouseX || useMotionValue(0), [-500, 500], [20, -20]);
  const yParallax = useTransform(mouseY || useMotionValue(0), [-500, 500], [20, -20]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const rows = containerRef.current.querySelectorAll(".grid-row");
    
    const ctx = gsap.context(() => {
      rows.forEach((row, i) => {
        const direction = i % 2 === 0 ? 1 : -1;
        gsap.to(row, {
          x: direction * -100,
          duration: isMobile ? 40 + (i * 10) : 30 + (i * 5),
          repeat: -1,
          ease: "none",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <motion.div 
      ref={containerRef} 
      style={{ x: xParallax, y: yParallax }}
      className={cn(
        "absolute inset-0 flex flex-col gap-4 p-4 transition-opacity duration-1000 rotate-[15deg] scale-150 md:scale-125",
        isMobile ? "opacity-40" : "opacity-30 group-hover:opacity-50"
      )}
    >
      {[0, 1, 2, 3].map((rowIdx) => (
        <div key={rowIdx} className="grid-row flex gap-4 whitespace-nowrap">
          {[...data, ...data].map((src, imgIdx) => (
            <div 
              key={imgIdx} 
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-900 flex-shrink-0 shadow-2xl",
                isMobile ? "w-48" : "w-64"
              )}
            >
              <Image 
                src={src} 
                alt="background" 
                fill 
                className={cn(
                  "object-cover transition-transform duration-[2000ms] ease-out",
                  active ? "scale-110" : "scale-100"
                )} 
              />
            </div>
          ))}
        </div>
      ))}
    </motion.div>
  );
};

const MobileHero = () => {
  const [activeSide, setActiveSide] = useState<"real-estate" | "wedding">("real-estate");
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  const toggleSide = (newSide: "real-estate" | "wedding") => {
    if (newSide === activeSide) return;
    setDirection(newSide === "wedding" ? 1 : -1);
    setActiveSide(newSide);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black md:hidden perspective-1000">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={activeSide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.6 },
            rotateY: { duration: 0.6 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = Math.abs(offset.x) > 50;
            if (swipe) {
              if (offset.x > 0) {
                toggleSide("real-estate");
              } else {
                toggleSide("wedding");
              }
            }
          }}
          className="absolute inset-0 flex flex-col items-center justify-center touch-none"
        >
          <motion.div 
            className="absolute inset-0"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <MovingGrid 
              side={activeSide === "real-estate" ? "left" : "right"} 
              active={true} 
              isMobile={true} 
            />
          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/90" />
          
          <div className="relative z-10 text-center px-8 flex flex-col items-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h2 className="text-5xl font-serif font-bold tracking-tighter mb-4 text-white">
                {activeSide === "real-estate" ? "REAL ESTATE" : "WEDDING FILMS"}
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/60 mb-12">
                {activeSide === "real-estate" ? "Architectural Excellence" : "Emotional Storytelling"}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <Link 
                href={activeSide === "real-estate" ? "/real-estate" : "/wedding-films"}
                className="inline-flex items-center space-x-3 px-10 py-5 bg-white text-black rounded-full font-bold tracking-widest uppercase text-[10px] shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                <span>{activeSide === "real-estate" ? "Explore Work" : "Watch Stories"}</span>
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Improved Floating Side Navigation Arrows */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 px-4 flex justify-between items-center z-20 pointer-events-none">
        <button 
          onClick={() => toggleSide("real-estate")}
          className={cn(
            "w-12 h-12 rounded-full glass flex items-center justify-center text-white transition-all pointer-events-auto backdrop-blur-xl",
            activeSide === "real-estate" ? "opacity-0 -translate-x-10" : "opacity-100 translate-x-0"
          )}
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={() => toggleSide("wedding")}
          className={cn(
            "w-12 h-12 rounded-full glass flex items-center justify-center text-white transition-all pointer-events-auto backdrop-blur-xl",
            activeSide === "wedding" ? "opacity-0 translate-x-10" : "opacity-100 translate-x-0"
          )}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Elegant Progress Indicators */}
      <div className="absolute bottom-48 left-0 w-full flex justify-center items-center space-x-3 z-20">
        {[0, 1].map((i) => (
          <button
            key={i}
            onClick={() => toggleSide(i === 0 ? "real-estate" : "wedding")}
            className="p-2 transition-all duration-300 active:scale-90"
          >
            <div className={cn(
              "h-1 rounded-full transition-all duration-500",
              (i === 0 && activeSide === "real-estate") || (i === 1 && activeSide === "wedding")
                ? "w-12 bg-white" 
                : "w-6 bg-white/20 hover:bg-white/40"
            )} />
          </button>
        ))}
      </div>

      {/* Swipe Instruction - Fade out after 3 seconds */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4, times: [0, 0.1, 0.8, 1] }}
        className="absolute bottom-32 left-0 w-full text-center pointer-events-none"
      >
        <p className="text-[8px] uppercase tracking-[0.5em] text-white/30">Swipe to switch</p>
      </motion.div>
    </div>
  );
};

const SplitScreenHero = () => {
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".side-content", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: "power4.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative h-screen hidden md:flex flex-row overflow-hidden bg-[#0A0A0A]"
    >
      {/* Left Section: Real Estate */}
      <div
        onMouseEnter={() => setHoverSide("left")}
        onMouseLeave={() => setHoverSide(null)}
        className={cn(
          "relative flex-1 transition-all duration-1000 ease-in-out overflow-hidden flex items-center justify-center group",
          hoverSide === "left" ? "md:flex-[1.8]" : hoverSide === "right" ? "md:flex-[0.6]" : "md:flex-1"
        )}
      >
        <MovingGrid side="left" active={hoverSide === "left"} mouseX={springX} mouseY={springY} />
        <div className={cn(
          "absolute inset-0 bg-black/60 transition-colors duration-1000",
          hoverSide === "left" ? "bg-black/30" : "bg-black/70"
        )} />
        
        <Link href="/real-estate" className="side-content relative z-10 text-center px-6 group/link interactive">
          <div className="overflow-hidden mb-2">
            <h2 className="text-5xl md:text-8xl font-serif font-bold tracking-tighter">
              REAL ESTATE
            </h2>
          </div>
          <p className="text-[10px] md:text-xs tracking-[0.5em] uppercase opacity-50 mb-8 group-hover/link:opacity-100 transition-opacity">
            Architectural Excellence & Design
          </p>
          <Magnetic>
            <div className="inline-block px-12 py-5 border border-white/20 rounded-full text-[10px] tracking-[0.3em] uppercase group-hover/link:bg-white group-hover/link:text-black group-hover/link:border-white transition-all duration-500 overflow-hidden relative">
              <span className="relative z-10">Explore Work</span>
            </div>
          </Magnetic>
        </Link>
      </div>

      {/* Right Section: Wedding Films */}
      <div
        onMouseEnter={() => setHoverSide("right")}
        onMouseLeave={() => setHoverSide(null)}
        className={cn(
          "relative flex-1 transition-all duration-1000 ease-in-out overflow-hidden flex items-center justify-center group",
          hoverSide === "right" ? "md:flex-[1.8]" : hoverSide === "left" ? "md:flex-[0.6]" : "md:flex-1"
        )}
      >
        <MovingGrid side="right" active={hoverSide === "right"} mouseX={springX} mouseY={springY} />
        <div className={cn(
          "absolute inset-0 bg-black/60 transition-colors duration-1000",
          hoverSide === "right" ? "bg-black/30" : "bg-black/70"
        )} />

        <Link href="/wedding-films" className="side-content relative z-10 text-center px-6 group/link interactive">
          <div className="overflow-hidden mb-2">
            <h2 className="text-5xl md:text-8xl font-serif font-bold tracking-tighter">
              WEDDING FILMS
            </h2>
          </div>
          <p className="text-[10px] md:text-xs tracking-[0.5em] uppercase opacity-50 mb-8 group-hover/link:opacity-100 transition-opacity">
            Cinematic Emotional Storytelling
          </p>
          <Magnetic>
            <div className="inline-block px-12 py-5 border border-white/20 rounded-full text-[10px] tracking-[0.3em] uppercase group-hover/link:bg-white group-hover/link:text-black group-hover/link:border-white transition-all duration-500">
               Watch Stories
            </div>
          </Magnetic>
        </Link>
      </div>

      {/* Center Divider/Logo Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <div className={cn(
          "w-32 h-32 rounded-full flex items-center justify-center backdrop-blur-2xl bg-white/5 transition-transform duration-1000",
          hoverSide ? "scale-90 opacity-0" : "scale-100 opacity-100"
        )}>
          <span className="text-3xl font-bold tracking-widest text-white/90">JJ</span>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <PageWrapper>
      <MobileHero />
      <SplitScreenHero />
    </PageWrapper>
  );
}
