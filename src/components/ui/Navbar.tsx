"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Home",               href: "/" },
  { name: "Real Estate",        href: "/real-estate" },
  { name: "Product",            href: "/product-photography" },
  { name: "Wedding Films",      href: "/wedding-films" },
  { name: "About",              href: "/about" },
  { name: "Gallery",            href: "/gallery" },
  { name: "Journal",            href: "/journal" },
  { name: "Contact",            href: "/contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname                = usePathname();

  // Only the home page has a dark full-bleed hero at the top
  const hasDarkHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-[100] transition-all duration-500",
          scrolled || !hasDarkHero
            ? "py-4 bg-cream-50/95 backdrop-blur-md border-b border-ink-100/40"
            : "py-6 bg-transparent"
        )}
      >
        <div className="px-6 md:px-10 flex items-center justify-between">
          {/* Left – location tag */}
          <span
            className={cn(
              "text-label hidden md:block transition-colors duration-500",
              scrolled || !hasDarkHero ? "text-ink-500" : "text-white/60"
            )}
          >
            STUDIO · WORLDWIDE
          </span>

          {/* Center – logo */}
          <Link
            href="/"
            className={cn(
              "absolute left-1/2 -translate-x-1/2 font-display font-bold tracking-[0.15em] text-xl transition-colors duration-500",
              scrolled || !hasDarkHero ? "text-ink-900" : "text-white"
            )}
          >
            JJFILMS<span className="text-accent-ev">.</span>
          </Link>

          {/* Right – desktop links + menu toggle */}
          <div className="ml-auto flex items-center gap-8">
            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-7">
              {links.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-label hover-underline transition-colors duration-300",
                    pathname === link.href
                      ? scrolled || !hasDarkHero ? "text-ink-900" : "text-white"
                      : scrolled || !hasDarkHero ? "text-ink-500 hover:text-ink-900" : "text-white/60 hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Menu toggle (always visible) */}
            <button
              onClick={() => setIsOpen(true)}
              className={cn(
                "text-label flex items-center gap-2 transition-colors duration-300 interactive lg:hidden",
                scrolled || !hasDarkHero ? "text-ink-700 hover:text-ink-900" : "text-white/70 hover:text-white"
              )}
            >
              MENU
              <span className="inline-block w-4 h-4 rounded-full border border-current" />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[200] bg-dark-void flex flex-col"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-white/5">
              <span className="font-display font-bold text-white tracking-[0.15em]">
                JJFILMS<span className="text-accent-ev">.</span>
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-label text-white/60 hover:text-white transition-colors flex items-center gap-2 interactive"
              >
                CLOSE
                <span className="inline-block w-4 h-4 rounded-full border border-current" />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 flex flex-col justify-center px-10 md:px-16 gap-2">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.5, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block font-display font-bold leading-none py-3 border-b border-white/5 hover:text-accent-ev transition-colors duration-300",
                      "text-4xl md:text-6xl",
                      pathname === link.href ? "text-accent-ev" : "text-white/80"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer row */}
            <div className="px-10 md:px-16 py-8 flex items-center justify-between border-t border-white/5">
              <div className="flex gap-6">
                {[
                  { name: "Instagram", href: "https://instagram.com/jjfilms.studio" },
                  { name: "Behance",   href: "https://behance.net/jjfilms"          },
                  { name: "LinkedIn",  href: "https://linkedin.com/company/jjfilms" },
                ].map(({ name, href }) => (
                  <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="text-label text-white/30 hover:text-white transition-colors">
                    {name}
                  </a>
                ))}
              </div>
              <span className="text-label text-white/20" suppressHydrationWarning>
                © {new Date().getFullYear()} JJFILMS
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
