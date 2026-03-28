"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Home", href: "/" },
  { name: "Real Estate", href: "/real-estate" },
  { name: "Wedding Films", href: "/wedding-films" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-500",
        scrolled ? "py-4 glass-dark" : "py-8 bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center relative z-[101]">
        <Link href="/" className="text-2xl font-serif font-bold tracking-tighter">
          JJFILMS<span className="text-jjfilms-accent-wedding">.</span>
        </Link>

        {/* Desktop Links - Hidden on Mobile */}
        <div className="hidden md:flex space-x-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm uppercase tracking-widest font-medium transition-all hover:text-jjfilms-accent-wedding",
                pathname === link.href ? "text-jjfilms-accent-wedding" : "text-white/70"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white/70 interactive focus:outline-none hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/98 z-[99] md:hidden flex flex-col items-center justify-center space-y-10 transition-all duration-700 ease-in-out",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center space-y-8">
          <p className="text-[10px] tracking-[0.5em] uppercase text-white/30 mb-4">Menu</p>
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-4xl font-serif transition-colors",
                pathname === link.href ? "text-jjfilms-accent-wedding" : "text-white/80 hover:text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        <div className="absolute bottom-20 flex space-x-8 text-[10px] tracking-widest text-white/40 uppercase">
           <a href="#">Instagram</a>
           <a href="#">Vimeo</a>
        </div>
      </div>
    </nav>
  );
};
