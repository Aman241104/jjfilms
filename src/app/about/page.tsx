"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Magnetic } from "@/components/ui/Magnetic";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".reveal",
          start: "top 80%",
        },
      });

      gsap.to(".parallax-image", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-image",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-7xl md:text-9xl font-serif font-bold tracking-tighter mb-12"
            >
              OUR <br /> STORY.
            </motion.h1>
            <p className="text-xl md:text-3xl font-light text-white/70 leading-relaxed reveal">
              Founded on the belief that every structure has a soul and every couple has a unique narrative, JJFilms was born to bridge the gap between technical precision and emotional artistry.
            </p>
          </div>
        </div>
      </section>

      {/* Large Image with Floating Text */}
      <section className="h-screen relative overflow-hidden my-20">
        <Image
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop"
          alt="Studio"
          fill
          className="object-cover parallax-image scale-110"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
           <h2 className="text-[10vw] font-serif font-bold opacity-10 whitespace-nowrap select-none pointer-events-none">CINEMATIC EXCELLENCE</h2>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-32 px-6">
        <div className="container mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="reveal">
            <h2 className="text-cinematic text-xs text-jjfilms-accent-wedding mb-6">Our Mission</h2>
            <h3 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
              To elevate the standard of visual storytelling.
            </h3>
            <p className="text-white/50 leading-relaxed text-lg mb-12">
              We combine state-of-the-art technology with a deep understanding of human emotion and spatial dynamics. Our goal is to create visuals that don't just look good but feel significant.
            </p>
            <div className="grid grid-cols-2 gap-12">
               <div>
                 <span className="block text-4xl font-serif mb-2">98%</span>
                 <span className="text-[10px] uppercase tracking-widest text-white/30">Client Satisfaction</span>
               </div>
               <div>
                 <span className="block text-4xl font-serif mb-2">15+</span>
                 <span className="text-[10px] uppercase tracking-widest text-white/30">Industry Awards</span>
               </div>
            </div>
          </div>
          <div className="space-y-8 reveal">
            {[
              { title: "Artistic Precision", desc: "Every frame is meticulously composed to tell the most compelling story." },
              { title: "Cinematic Quality", desc: "We use high-end cinema cameras and professional lighting for all projects." },
              { title: "Discreet Approach", desc: "For weddings, we remain invisible to capture the most authentic moments." },
            ].map((value, i) => (
              <motion.div 
                whileHover={{ x: 20 }}
                key={value.title} 
                className="glass p-8 rounded-3xl border border-white/5"
              >
                <h4 className="text-2xl font-serif mb-4 flex items-center">
                  <span className="text-jjfilms-accent-wedding mr-4">0{i+1}</span>
                  {value.title}
                </h4>
                <p className="text-white/40">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team/Intro with Magnetic Effect */}
      <section className="py-32 px-6 bg-jjfilms-neutral-900/50">
        <div className="container mx-auto reveal">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-serif mb-6">Meet the Team</h2>
            <p className="text-white/30 tracking-[0.3em] uppercase text-xs">The Visionaries behind JJFilms</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {[
              { name: "Julian James", role: "Creative Director", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974" },
              { name: "Elena Rossi", role: "Lead Editor", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974" },
              { name: "Marcus Thorne", role: "Cinematographer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974" },
            ].map((member) => (
              <div key={member.name} className="flex flex-col items-center">
                <Magnetic strength={0.3}>
                  <div className="relative w-64 h-64 md:w-full md:aspect-square rounded-[2rem] overflow-hidden mb-8 grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer">
                    <Image src={member.img} alt={member.name} fill className="object-cover" />
                  </div>
                </Magnetic>
                <h4 className="text-3xl font-serif mb-2">{member.name}</h4>
                <p className="text-[10px] tracking-widest uppercase text-jjfilms-accent-wedding">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Footer */}
      <section className="py-40 px-6 text-center reveal">
         <h3 className="text-4xl md:text-6xl font-serif mb-12">Want to work with us?</h3>
         <Magnetic>
           <Link href="/contact" className="inline-block px-12 py-6 bg-white text-black rounded-full font-bold tracking-widest uppercase text-xs hover:bg-jjfilms-accent-wedding hover:text-white transition-all">
             Get in Touch
           </Link>
         </Magnetic>
      </section>
    </PageWrapper>
  );
};

export default AboutPage;
