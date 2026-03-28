"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const IntroLoader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[1000] bg-black flex items-center justify-center overflow-hidden"
        >
          <div className="relative flex flex-col items-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-bold tracking-[0.3em] text-white relative z-10"
            >
              JJ<span className="text-jjfilms-accent-wedding">.</span>
            </motion.div>

            {/* Scanning Line Effect */}
            <motion.div 
              initial={{ top: "-100%" }}
              animate={{ top: "200%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-20 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none"
            />

            {/* Subtext */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-8 text-[10px] tracking-[0.8em] uppercase text-white/40"
            >
              Cinematic Visuals
            </motion.div>
          </div>

          {/* Background expanding circle on exit */}
          <motion.div 
            initial={{ scale: 0 }}
            exit={{ 
              scale: 4,
              transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] }
            }}
            className="absolute w-screen aspect-square bg-jjfilms-neutral-900/20 rounded-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
