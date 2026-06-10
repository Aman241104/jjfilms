"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { name: "Godrej Properties",  category: "Real Estate" },
  { name: "Lodha Group",        category: "Real Estate" },
  { name: "Prestige Estates",   category: "Real Estate" },
  { name: "DLF Limited",        category: "Real Estate" },
  { name: "Titan Company",      category: "Product"     },
  { name: "Forest Essentials",  category: "Product"     },
  { name: "Taj Hotels",         category: "Events"      },
  { name: "Oberoi Hotels",      category: "Events"      },
  { name: "ITC Limited",        category: "Product"     },
  { name: "Fabindia",           category: "Product"     },
  { name: "Kalpataru Group",    category: "Real Estate" },
  { name: "Tanishq",            category: "Product"     },
];

interface ClientStripProps {
  dark?: boolean;
}

export const ClientStrip = ({ dark = false }: ClientStripProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".client-item", {
        opacity: 0, y: 14, stagger: 0.05, duration: 0.6, ease: "power3.out",
        clearProps: "opacity,transform",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const bg          = dark ? "bg-dark-void"           : "bg-cream-100";
  const border      = dark ? "border-white/5"          : "border-ink-100";
  const labelColor  = dark ? "text-white/25"           : "text-ink-300";
  const nameColor   = dark ? "text-white/45"           : "text-ink-400";
  const nameHover   = dark ? "hover:text-white/75"     : "hover:text-ink-800";
  const catColor    = dark ? "text-white/15"           : "text-ink-200";
  const dividerColor= dark ? "border-white/5"          : "border-ink-100/60";

  return (
    <section
      ref={sectionRef}
      className={`${bg} py-16 md:py-20 px-8 md:px-14 border-t ${border}`}
    >
      <div className="max-w-screen-xl mx-auto">
        <p className={`text-label ${labelColor} tracking-widest mb-10`}>TRUSTED BY</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-0">
          {clients.map(({ name, category }) => (
            <div
              key={name}
              className={`client-item py-5 border-b ${dividerColor}`}
            >
              <p
                className={`font-display font-semibold text-sm md:text-base ${nameColor} ${nameHover} transition-colors duration-300 leading-tight`}
                style={{ letterSpacing: "-0.005em" }}
              >
                {name}
              </p>
              <p className={`text-label ${catColor} mt-1`}>{category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
