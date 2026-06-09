"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Cream curtain that lifts on every navigation */}
      <motion.div
        className="fixed inset-0 z-[500] bg-cream-50 origin-bottom pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
      />
      {/* Content fades in after curtain lifts */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
      >
        {children}
      </motion.div>
    </>
  );
}
