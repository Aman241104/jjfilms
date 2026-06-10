"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const posts = [
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", alt: "Real estate exterior shoot" },
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80", alt: "Wedding ceremony moment"     },
  { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80", alt: "Luxury watch product shot"   },
  { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", alt: "Modern villa exterior"       },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80", alt: "Wedding portrait"            },
  { src: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80", alt: "Fragrance campaign"          },
  { src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80", alt: "Minimalist loft interiors"   },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", alt: "Corporate event photography" },
  { src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80", alt: "Sneaker product series"      },
];

export const InstagramFeed = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ig-tile", {
        opacity: 0, scale: 0.94, stagger: 0.06, duration: 0.7, ease: "power3.out",
        clearProps: "opacity,transform",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream-100 py-20 md:py-28 px-8 md:px-14">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-label text-ink-300 tracking-widest mb-3">FOLLOW OUR WORK</p>
            <h2
              className="font-display italic text-ink-900"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.8rem)", letterSpacing: "-0.02em" }}
            >
              @jjfilms.studio
            </h2>
          </div>
          <a
            href="https://instagram.com/jjfilms.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-3 text-label text-ink-500 hover:text-ink-900 transition-colors duration-300 group"
          >
            <span className="w-6 h-px bg-ink-300 group-hover:w-12 transition-all duration-500" />
            FOLLOW
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 md:grid-cols-9 gap-1.5">
          {posts.map((post, i) => (
            <div
              key={i}
              className="ig-tile relative aspect-square overflow-hidden rounded-[2px] group cursor-pointer"
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                sizes="(max-width:768px) 33vw, 12vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white/80 text-xl">♥</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile follow link */}
        <div className="mt-8 flex justify-center md:hidden">
          <a
            href="https://instagram.com/jjfilms.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-label text-ink-500 hover:text-ink-900 transition-colors tracking-widest"
          >
            FOLLOW @jjfilms.studio
          </a>
        </div>
      </div>
    </section>
  );
};
