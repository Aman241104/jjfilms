"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BookingFab = () => {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  // Hide on home (SplitIntro) and contact page
  const hidden = pathname === "/" || pathname === "/contact";

  useEffect(() => {
    if (hidden) { setVisible(false); return; }
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [hidden]);

  if (hidden) return null;

  return (
    <Link
      href="/contact"
      className="hidden md:flex fixed bottom-8 right-8 z-[90] items-center gap-3 bg-ink-900 text-cream-50 px-5 py-3.5 rounded-full shadow-2xl hover:bg-ink-700 transition-all duration-300 group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.4s ease, transform 0.4s ease, background-color 0.3s ease",
      }}
    >
      <span className="text-label tracking-widest" style={{ fontSize: "0.62rem" }}>BOOK A CALL</span>
      <span className="group-hover:translate-x-0.5 transition-transform duration-300 text-xs">→</span>
    </Link>
  );
};
