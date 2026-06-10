"use client";

import React, { useEffect, useRef } from "react";
import { Navbar }      from "./Navbar";
import { CustomCursor } from "./CustomCursor";
import { SmoothScroll } from "./SmoothScroll";
import { IntroLoader }  from "./IntroLoader";
import { Footer }       from "./Footer";
import { BookingFab }    from "./BookingFab";
import { WhatsAppFab }   from "./WhatsAppFab";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Camera, Heart, Mail } from "lucide-react";

const MobileBottomNav = () => {
  const pathname = usePathname();
  const items = [
    { icon: <Home   size={18} />, label: "Home",    href: "/" },
    { icon: <Camera size={18} />, label: "Work",    href: "/gallery" },
    { icon: <Heart  size={18} />, label: "Weddings", href: "/wedding-films" },
    { icon: <Mail   size={18} />, label: "Contact", href: "/contact" },
  ];
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] md:hidden w-[88%] max-w-sm">
      <div className="glass rounded-full px-5 py-3.5 flex justify-between items-center shadow-lg">
        {items.map((item) => (
          <Link key={item.href} href={item.href}
            className={cn("flex flex-col items-center gap-1 transition-all",
              pathname === item.href ? "text-ink-900 scale-110" : "text-ink-300 hover:text-ink-700"
            )}
          >
            {item.icon}
            <span className="text-[7px] uppercase tracking-widest font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const GlobalShell = ({ children }: { children: React.ReactNode }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <SmoothScroll>
      <div className="min-h-screen selection:bg-accent-ev selection:text-white pb-20 md:pb-0 film-grain">
        <motion.div className="scroll-progress" style={{ scaleX }} />
        <IntroLoader />
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BookingFab />
        <WhatsAppFab />
        <MobileBottomNav />
      </div>
    </SmoothScroll>
  );
};
