"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onMouseEnterLink = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const text = target.getAttribute("data-cursor");
      
      if (text) {
        setCursorText(text);
        gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 });
        gsap.to(follower, { 
          scale: 3.5, 
          backgroundColor: "rgba(255,255,255,1)",
          duration: 0.3 
        });
      } else {
        gsap.to(cursor, { scale: 3, duration: 0.3 });
        gsap.to(follower, { scale: 2, opacity: 0, duration: 0.3 });
      }
    };

    const onMouseLeaveLink = () => {
      setCursorText("");
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(follower, { 
        scale: 1, 
        opacity: 1, 
        backgroundColor: "transparent",
        duration: 0.3 
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    
    const attachHover = () => {
      const links = document.querySelectorAll("a, button, .interactive, select, input, textarea, [data-cursor]");
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onMouseEnterLink);
        link.removeEventListener("mouseleave", onMouseLeaveLink);
        link.addEventListener("mouseenter", onMouseEnterLink);
        link.addEventListener("mouseleave", onMouseLeaveLink);
      });
    };

    attachHover();

    const observer = new MutationObserver(() => {
      attachHover();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="custom-cursor fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] hidden md:block -translate-x-1/2 -translate-y-1/2" 
      />
      <div 
        ref={followerRef} 
        className="custom-cursor-follower fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-[9998] hidden md:block -translate-x-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden" 
      >
        {cursorText && (
          <span className="text-[4px] font-bold text-black uppercase tracking-tighter leading-none text-center">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
};
