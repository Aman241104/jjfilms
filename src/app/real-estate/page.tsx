"use client";

import React, { useEffect, useRef } from "react";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Magnetic } from "@/components/ui/Magnetic";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Star, Quote, ArrowRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "The Glass House",
    location: "Malibu, CA",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070",
    size: "large",
  },
  {
    title: "Minimalist Loft",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070",
    size: "small",
  },
  {
    title: "Desert Oasis",
    location: "Palm Springs, CA",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070",
    size: "small",
  },
  {
    title: "Nordic Retreat",
    location: "Aspen, CO",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974",
    size: "medium",
  },
];

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Architect at Studio A",
    content: "JJFilms captured our latest project with such precision and artistry. The play of light and shadow they managed to document was exactly how we envisioned the space.",
    stars: 5,
  },
  {
    name: "Michael Chen",
    role: "Luxury Real Estate Agent",
    content: "The HDR video tours provided by JJFilms have significantly increased the engagement on our premium listings. Their work is truly a cut above the rest.",
    stars: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Interior Designer",
    content: "Attention to detail is everything in my work, and Julian and his team never miss a beat. They understand the textures and materials of a room.",
    stars: 5,
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070",
  "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=2070",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2070",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974",
];

const RealEstatePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".reveal",
          start: "top 80%",
        },
      });

      gsap.utils.toArray<HTMLElement>(".parallax-bg").forEach((bg) => {
        gsap.to(bg, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: bg,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageWrapper>
      {/* 1. Home (Hero) */}
      <section className="relative h-[80vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070"
            alt="Real Estate Hero"
            fill
            className="object-cover parallax-bg"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="container relative z-10 px-6 text-center">
          <h1 className="text-5xl md:text-9xl font-serif font-bold tracking-tighter mb-6 md:mb-8 reveal">
            ARCHITECTURAL <br /> EXCELLENCE
          </h1>
          <p className="text-xs md:text-base tracking-[0.3em] md:tracking-[0.5em] text-white/60 mb-8 md:mb-12 reveal uppercase">
            Premium Photography & Cinematography
          </p>
          <div className="reveal">
             <Magnetic>
               <button 
                 onClick={() => {
                   const about = document.getElementById("about-section");
                   about?.scrollIntoView({ behavior: "smooth" });
                 }}
                 data-cursor="EXPLORE"
                 className="px-8 md:px-12 py-4 md:py-5 bg-white text-black font-bold tracking-widest uppercase text-[10px] rounded-full hover:bg-black hover:text-white border border-white transition-all interactive"
               >
                 Scroll to Explore
               </button>
             </Magnetic>
          </div>
        </div>
      </section>

      {/* 2. About Us */}
      <section id="about-section" className="py-20 md:py-32 px-6 bg-[#0A0A0A]">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="reveal">
            <h2 className="text-cinematic text-[10px] md:text-xs text-white/40 mb-4 md:mb-6">About Us</h2>
            <h3 className="text-3xl md:text-6xl font-serif mb-6 md:mb-8 leading-tight">
              We translate spaces into stories.
            </h3>
            <p className="text-white/50 leading-relaxed text-base md:text-lg mb-8 md:mb-10">
              With a background in architecture and cinema, we bring a unique perspective to real estate photography. We don't just document a property; we capture its ambiance, its flow, and its soul. Our work helps potential buyers feel the space before they even step inside.
            </p>
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              <div>
                <h4 className="font-serif text-2xl md:text-3xl mb-1 md:mb-2">10+</h4>
                <p className="text-[10px] uppercase tracking-widest text-white/40">Years Experience</p>
              </div>
              <div>
                <h4 className="font-serif text-2xl md:text-3xl mb-1 md:mb-2">500+</h4>
                <p className="text-[10px] uppercase tracking-widest text-white/40">Properties Shot</p>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden reveal">
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070"
              alt="About real estate"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. Our Work (Portfolio) */}
      <section className="py-20 md:py-32 px-6 bg-jjfilms-neutral-900">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 reveal">
            <div>
              <h2 className="text-cinematic text-[10px] md:text-xs text-white/40 mb-4 md:mb-6">Our Work</h2>
              <h3 className="text-4xl md:text-7xl font-serif mb-4 md:mb-0">Selected Projects</h3>
            </div>
            <p className="text-white/40 max-w-sm">
              A curated selection of luxury properties and architectural masterpieces we've had the privilege to document.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {projects.map((project, idx) => (
              <div
                key={project.title}
                data-cursor="VIEW"
                className={cn(
                  "relative group overflow-hidden rounded-2xl md:rounded-3xl bg-neutral-800 reveal interactive",
                  project.size === "large" ? "md:col-span-8 h-[400px] md:h-[600px]" : 
                  project.size === "medium" ? "md:col-span-12 h-[350px] md:h-[500px]" : 
                  "md:col-span-4 h-[300px] md:h-[400px]"
                )}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/60 mb-1 md:mb-2">{project.location}</p>
                  <h4 className="text-2xl md:text-3xl font-serif font-bold">{project.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Gallery */}
      <section className="py-20 md:py-32 px-6 bg-[#0A0A0A]">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-20 reveal">
            <h2 className="text-cinematic text-[10px] md:text-xs text-white/40 mb-4 md:mb-6">Gallery</h2>
            <h3 className="text-4xl md:text-5xl font-serif">Visual Atmosphere</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {galleryImages.map((src, idx) => (
              <div key={idx} data-cursor="OPEN" className="relative aspect-square overflow-hidden rounded-xl md:rounded-2xl reveal group cursor-pointer">
                <Image 
                  src={src} 
                  alt="gallery" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
              </div>
            ))}
          </div>
          
          <div className="mt-12 md:mt-16 text-center reveal">
            <Link href="/gallery" className="inline-flex items-center space-x-4 text-[10px] md:text-xs tracking-widest uppercase hover:text-white/60 transition-colors">
              <span>View Full Gallery</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="py-20 md:py-32 px-6 bg-jjfilms-neutral-900">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-20 reveal">
            <h2 className="text-cinematic text-[10px] md:text-xs text-white/40 mb-4 md:mb-6">Testimonials</h2>
            <h3 className="text-4xl md:text-5xl font-serif">Client Words</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {testimonials.map((t, idx) => (
              <div key={idx} className="glass-dark p-8 md:p-12 rounded-2xl md:rounded-3xl border border-white/5 reveal flex flex-col h-full">
                <div className="flex mb-4 md:mb-6">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" className="text-white/80 mr-1" />
                  ))}
                </div>
                <Quote className="text-white/10 mb-4 md:mb-6" size={32} />
                <p className="text-base md:text-lg text-white/70 italic leading-relaxed mb-6 md:mb-8 flex-grow">"{t.content}"</p>
                <div>
                  <h4 className="font-serif text-lg md:text-xl">{t.name}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-white/40">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Contact Us */}
      <section className="py-24 md:py-40 px-6 bg-white text-black">
        <div className="container mx-auto text-center reveal">
          <h2 className="text-cinematic text-[10px] md:text-xs text-black/40 mb-6 md:mb-8">Get In Touch</h2>
          <h3 className="text-4xl md:text-8xl font-serif mb-8 md:mb-12 leading-tight">
            Ready to elevate <br /> your listing?
          </h3>
          <p className="text-base md:text-xl max-w-2xl mx-auto mb-10 md:mb-16 text-black/60">
            Let's work together to showcase your property in its most premium light. 
            We offer photography, cinematography, and drone services tailored to your needs.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <Magnetic>
              <Link href="/contact" data-cursor="LET'S GO" className="w-full md:w-auto px-10 md:px-12 py-5 md:py-6 bg-black text-white font-bold tracking-widest uppercase text-[10px] rounded-full hover:scale-105 transition-transform interactive text-center inline-block">
                Book a Session
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/contact" className="w-full md:w-auto px-10 md:px-12 py-5 md:py-6 border border-black/20 text-black font-bold tracking-widest uppercase text-[10px] rounded-full hover:bg-black/5 transition-colors interactive text-center inline-block">
                View Pricing
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default RealEstatePage;
