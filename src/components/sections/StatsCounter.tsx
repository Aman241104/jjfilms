"use client";

import React, { useRef, useEffect, useState } from "react";

interface Stat {
  value:  number;
  suffix: string;
  label:  string;
}

const stats: Stat[] = [
  { value: 500, suffix: "+", label: "Projects Completed"   },
  { value: 25,  suffix: "+", label: "Years of Experience"  },
  { value: 300, suffix: "+", label: "Weddings Covered"     },
  { value: 48,  suffix: "h", label: "Delivery Guarantee"   },
];

const useCountUp = (target: number, duration = 1600, active: boolean) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
};

const StatItem = ({ value, suffix, label, active }: Stat & { active: boolean }) => {
  const count = useCountUp(value, 1400, active);
  return (
    <div className="text-center md:text-left">
      <p
        className="font-display font-bold text-white leading-none"
        style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}
      >
        {count}<span className="text-white/40">{suffix}</span>
      </p>
      <p className="text-label text-white/40 mt-2 tracking-widest">{label}</p>
    </div>
  );
};

export const StatsCounter = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive]   = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-dark-void py-20 md:py-28 px-8 md:px-14">
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 md:divide-x md:divide-white/10">
        {stats.map((s) => (
          <StatItem key={s.label} {...s} active={active} />
        ))}
      </div>
    </section>
  );
};
