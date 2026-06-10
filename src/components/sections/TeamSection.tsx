"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name:  "Jignesh Shah",
    role:  "Co-Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
    bio:   "With 25 years behind the lens, Jignesh's architectural eye and meticulous post-processing style define the visual language of everything JJ Films produces. He co-founded the studio with his brother Jay after years of freelance work across India and Europe.",
  },
  {
    name:  "Jay Shah",
    role:  "Co-Founder & Lead Photographer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80",
    bio:   "Jay built his reputation documenting weddings and milestone moments across three continents. His instinct for the unscripted — the tear, the laugh, the stolen glance — is what clients remember long after the day is over.",
  },
  {
    name:  "Elena Rossi",
    role:  "Senior Photographer – Commercial",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80",
    bio:   "Elena joined JJ Films a decade ago after working with fashion houses in Milan. She leads all product and commercial campaigns, bringing a studio-perfectionist sensibility that transforms every object into a brand statement.",
  },
];

export const TeamSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".team-card", {
        opacity: 0, y: 40, stagger: 0.15, duration: 0.9, ease: "power3.out",
        clearProps: "opacity,transform",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream-100 py-24 md:py-32 px-8 md:px-14">
      <div className="max-w-screen-xl mx-auto">
        <p className="text-label text-ink-300 mb-3">THE TEAM</p>
        <h2
          className="font-display font-bold text-ink-900 mb-4"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
        >
          The people behind the lens
        </h2>
        <p className="text-ink-500 text-sm md:text-base leading-relaxed max-w-xl mb-16">
          JJ Films was founded by brothers Jignesh and Jay Shah in 1999. What started as a two-man
          operation in a rented studio has grown into one of the most trusted photography practices
          in the country — 500+ projects and 25 years later.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.name} className="team-card group">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden mb-5">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width:768px) 90vw, 30vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <p className="text-label text-ink-400 mb-1">{member.role}</p>
              <h3 className="font-display font-semibold text-ink-900 text-xl mb-2" style={{ letterSpacing: "-0.01em" }}>
                {member.name}
              </h3>
              <p className="text-ink-500 text-sm leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
