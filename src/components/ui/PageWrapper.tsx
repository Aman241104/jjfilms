"use client";

import React, { useEffect, useRef } from "react";
import { Navbar } from "./Navbar";
import { CustomCursor } from "./CustomCursor";
import { SmoothScroll } from "./SmoothScroll";
import { IntroLoader } from "./IntroLoader";
import gsap from "gsap";
import Link from "next/link";
import { Home, Camera, Heart, Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring } from "framer-motion";

interface PageWrapperProps {
  children: React.ReactNode;
}

const MobileBottomNav = () => {
  const pathname = usePathname();
  
  const navItems = [
    { icon: <Home size={20} />, label: "Home", href: "/" },
    { icon: <Camera size={20} />, label: "Real Estate", href: "/real-estate" },
    { icon: <Heart size={20} />, label: "Weddings", href: "/wedding-films" },
    { icon: <Mail size={20} />, label: "Contact", href: "/contact" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] md:hidden w-[90%] max-w-[400px]">
      <div className="glass-dark rounded-full px-6 py-4 flex justify-between items-center shadow-2xl border border-white/5">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={cn(
              "flex flex-col items-center space-y-1 transition-all",
              pathname === item.href ? "text-white scale-110" : "text-white/40 hover:text-white/70"
            )}
          >
            {item.icon}
            <span className="text-[8px] uppercase tracking-widest font-bold">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const PageWrapper = ({ children }: PageWrapperProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Cinematic entrance animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, delay: 2.5, ease: "power3.out" }
      );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <div className="min-h-screen selection:bg-jjfilms-accent-wedding selection:text-white pb-20 md:pb-0 film-grain">
        <motion.div className="scroll-progress" style={{ scaleX }} />
        <IntroLoader />
        <CustomCursor />
        <Navbar />
        <div ref={contentRef}>
          <main>{children}</main>
          <footer className="py-20 px-6 bg-jjfilms-dark-deep">
            <div className="container mx-auto">
              <div className="grid md:grid-cols-4 gap-12 mb-16 text-left">
                <div className="col-span-2">
                  <h3 className="text-3xl font-serif font-bold mb-6">JJFILMS.</h3>
                  <p className="text-white/40 max-w-sm leading-relaxed">
                    Premium visual production studio specializing in high-end Real Estate photography and cinematic Wedding films.
                  </p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] mb-6 text-jjfilms-accent-wedding">Explore</h4>
                  <ul className="space-y-4 text-sm text-white/60">
                    <li><Link href="/real-estate" className="hover:text-white transition-colors">Real Estate</Link></li>
                    <li><Link href="/wedding-films" className="hover:text-white transition-colors">Wedding Films</Link></li>
                    <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] mb-6 text-jjfilms-accent-wedding">Connect</h4>
                  <ul className="space-y-4 text-sm text-white/60">
                    <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                    <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Vimeo</a></li>
                  </ul>
                </div>
              </div>
              <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-[10px] tracking-widest text-white/20 uppercase">
                  © {new Date().getFullYear()} JJFILMS. ALL RIGHTS RESERVED.
                </p>
                <div className="flex space-x-8 text-[10px] tracking-widest text-white/20 uppercase">
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
        <MobileBottomNav />
      </div>
    </SmoothScroll>
  );
};
