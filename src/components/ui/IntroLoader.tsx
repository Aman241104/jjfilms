"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const IntroLoader = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on first session visit — never on navigations
    if (sessionStorage.getItem("jjf_intro")) return;
    sessionStorage.setItem("jjf_intro", "1");
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[1000] bg-cream-50 flex items-center justify-center overflow-hidden"
        >
          {/* Scanning line */}
          <motion.div
            initial={{ top: "-10%" }}
            animate={{ top: "110%" }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-16 bg-gradient-to-b from-transparent via-ink-100/30 to-transparent pointer-events-none"
          />

          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="font-display font-bold text-7xl md:text-9xl tracking-[0.2em] text-ink-900"
            >
              JJ<span className="text-accent-ev">.</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-6 text-label text-ink-300"
            >
              PREMIUM PHOTOGRAPHY STUDIO
            </motion.div>
          </div>

          {/* Exit circle wipe — oversized to guarantee full-bleed coverage */}
          <motion.div
            initial={{ scale: 0, borderRadius: "50%" }}
            exit={{ scale: 8, transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
            className="absolute bg-dark-void"
            style={{ width: "100vmax", height: "100vmax" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
