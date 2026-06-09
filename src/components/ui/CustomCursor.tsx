"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [cursorImg, setCursorImg] = useState<string | null>(null);
  const [imgLabel, setImgLabel]   = useState<string>("");
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const dot = dotRef.current;
    const img = imgRef.current;
    if (!dot || !img) return;

    // Track raw position for image offset calculation
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.12, ease: "power2.out" });
      // Image floats above-right of cursor
      gsap.to(img, {
        x: e.clientX + 20,
        y: e.clientY - 100,
        duration: 0.38,
        ease: "power2.out",
      });
    };

    const onEnterInteractive = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const src = el.getAttribute("data-cursor-image");
      const label = el.getAttribute("data-cursor-label") ||
        el.querySelector("p")?.textContent?.trim() || "";

      if (src) {
        setCursorImg(src);
        setImgLabel(label);
        gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
        gsap.to(img, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.2)" });
      } else {
        // Subtle expand on interactive elements
        gsap.to(dot, { scale: 2.5, backgroundColor: "rgba(196,164,132,0.9)", duration: 0.25 });
      }
    };

    const onLeaveInteractive = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      if (el.getAttribute("data-cursor-image")) {
        setCursorImg(null);
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.25 });
        gsap.to(img, { scale: 0.85, opacity: 0, duration: 0.22 });
      } else {
        gsap.to(dot, { scale: 1, backgroundColor: "rgba(253,250,246,0.9)", duration: 0.25 });
      }
    };

    window.addEventListener("mousemove", onMove);

    const attachEvents = () => {
      document.querySelectorAll(
        "a, button, .interactive, input, select, textarea, [data-cursor-image]"
      ).forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    };

    attachEvents();
    const observer = new MutationObserver(attachEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Main dot — cream, no mix-blend-mode */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "rgba(253,250,246,0.9)",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.15)",
          willChange: "transform",
        }}
      />

      {/* Image preview — offset above-right of cursor */}
      <div
        ref={imgRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block overflow-hidden rounded-sm shadow-2xl"
        style={{
          width: "148px",
          height: "108px",
          opacity: 0,
          scale: "0.85",
          transform: "translate(0, 0)",
          willChange: "transform, opacity",
        }}
      >
        {cursorImg && (
          <>
            <Image src={cursorImg} alt="" fill sizes="148px" className="object-cover" />
            {imgLabel && (
              <div className="absolute bottom-0 left-0 right-0 px-2.5 py-1.5 bg-dark-void/60">
                <p className="text-label text-white/70 truncate" style={{ fontSize: "0.5rem" }}>
                  {imgLabel}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
