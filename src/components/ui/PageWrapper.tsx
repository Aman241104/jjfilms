"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFirst = !sessionStorage.getItem("jjf_nav");
    if (isFirst) sessionStorage.setItem("jjf_nav", "1");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, delay: isFirst ? 2.8 : 0.5, ease: "power3.out" }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
};
