"use client";

import React, { useEffect, useRef } from "react";
import { PageWrapper } from "@/components/ui/PageWrapper";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Play, Star, Quote, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const films = [
  {
    title: "Eternal Love in Tuscany",
    couple: "Sarah & Mark",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069",
    category: "Feature Film",
  },
  {
    title: "Coastal Whispers",
    couple: "Elena & David",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070",
    category: "Highlight Reel",
  },
  {
    title: "Parisian Romance",
    couple: "Chloe & Julian",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974",
    category: "Wedding Trailer",
  },
  {
    title: "Mountain Vows",
    couple: "Isabella & James",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070",
    category: "Short Film",
  },
];

const testimonials = [
  {
    name: "Jessica & David",
    role: "Married in Lake Como",
    content: "Watching our wedding film felt like reliving the day all over again. JJFilms didn't just capture events; they captured the feeling of being there. We've watched it dozens of times and cry every time.",
    stars: 5,
  },
  {
    name: "Sophia & Ryan",
    role: "Married in NYC",
    content: "The team was so discreet during the ceremony, we almost forgot they were there. Yet, they captured the most intimate moments perfectly. The editing is pure cinema.",
    stars: 5,
  },
  {
    name: "Aria & Leo",
    role: "Married in Santorini",
    content: "Absolutely breathtaking work. Every frame looks like a painting. They managed to tell our story in a way that feels authentic and incredibly beautiful.",
    stars: 5,
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070",
];

const WeddingFilmsPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".reveal",
          start: "top 85%",
        },
      });

      gsap.utils.toArray<HTMLElement>(".parallax-img").forEach((img) => {
        gsap.to(img, {
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: img,
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
      <section className="relative h-[80vh] md:h-screen flex items-center justify-center overflow-hidden bg-[#0F0D0C]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069"
            alt="Wedding Films Hero"
            fill
            className="object-cover opacity-60 parallax-img"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0F0D0C]" />
        </div>
        
        <div className="container relative z-10 px-6 text-center">
          <h4 className="text-cinematic text-[10px] md:text-xs text-jjfilms-accent-wedding mb-6 md:mb-8 reveal uppercase tracking-[0.3em] md:tracking-[0.5em]">Cinematic Storytelling</h4>
          <h1 className="text-5xl md:text-9xl font-serif font-bold tracking-tighter mb-6 md:mb-8 reveal">
            YOUR STORY, <br /> IMMORTALIZED
          </h1>
          <p className="text-base md:text-xl font-light text-white/70 max-w-2xl mx-auto reveal leading-relaxed mb-8 md:mb-12">
            We capture the fleeting moments, the unspoken words, and the raw emotions that make your wedding day uniquely yours.
          </p>
          <div className="reveal">
            <button 
              onClick={() => {
                document.getElementById('work-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-10 md:px-12 py-4 md:py-5 border border-white/20 rounded-full text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-all interactive"
            >
              View Our Films
            </button>
          </div>
        </div>
      </section>

      {/* 2. About Us */}
      <section className="py-20 md:py-32 px-6 bg-[#0F0D0C]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="relative aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden reveal">
              <Image
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070"
                alt="Our Style"
                fill
                className="object-cover"
              />
            </div>
            <div className="reveal">
              <h3 className="text-cinematic text-[10px] md:text-xs text-jjfilms-accent-wedding mb-4 md:mb-6">Our Philosophy</h3>
              <h2 className="text-3xl md:text-6xl font-serif mb-6 md:mb-8 leading-tight">
                More than just a video. <br /> A legacy of love.
              </h2>
              <p className="text-white/50 leading-relaxed mb-8 md:mb-10 text-base md:text-lg">
                Our approach is discreet and artistic. We don't direct your day; we observe it. This allows us to capture authentic moments that reflect the true essence of your relationship. We believe every couple has a unique cinematic language, and we're here to translate it.
              </p>
              <div className="grid grid-cols-2 gap-6 md:gap-8">
                <div>
                  <h4 className="font-serif text-2xl md:text-3xl mb-1 md:mb-2 flex items-center">
                    <Heart size={18} className="mr-2 text-jjfilms-accent-wedding" /> 
                    100%
                  </h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Authentic Moments</p>
                </div>
                <div>
                  <h4 className="font-serif text-2xl md:text-3xl mb-1 md:mb-2">4K</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Cinema Quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Work (Portfolio) */}
      <section id="work-section" className="py-20 md:py-32 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 md:mb-24 reveal">
            <h2 className="text-cinematic text-[10px] md:text-xs text-jjfilms-accent-wedding mb-4 md:mb-6">Our Work</h2>
            <h3 className="text-4xl md:text-7xl font-serif">Featured Films</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {films.map((film, idx) => (
              <div key={film.title} className="group relative reveal interactive">
                <div className="relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden mb-6 md:mb-8">
                  <Image
                    src={film.image}
                    alt={film.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full glass flex items-center justify-center text-white border-white/20">
                      <Play fill="currentColor" size={24} className="md:w-9 md:h-9" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start px-2 md:px-4 gap-2 md:gap-0">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-serif mb-1 md:mb-2">{film.title}</h3>
                    <p className="text-xs md:text-sm text-white/40 tracking-widest uppercase">{film.couple}</p>
                  </div>
                  <span className="text-[8px] md:text-[10px] uppercase tracking-widest px-3 md:px-4 py-1.5 md:py-2 border border-white/10 rounded-full text-white/60">
                    {film.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Gallery */}
      <section className="py-20 md:py-32 px-6 bg-[#0A0A0A]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 md:mb-20 reveal gap-6 md:gap-0">
            <div>
               <h2 className="text-cinematic text-[10px] md:text-xs text-jjfilms-accent-wedding mb-2 md:mb-4">Gallery</h2>
               <h3 className="text-4xl md:text-5xl font-serif">Captured Moments</h3>
            </div>
            <Link href="/gallery" className="inline-flex items-center space-x-4 text-[10px] md:text-xs tracking-widest uppercase hover:text-jjfilms-accent-wedding transition-colors">
              <span>View Full Gallery</span>
              <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {galleryImages.map((src, idx) => (
              <div key={idx} className="relative aspect-[3/4] overflow-hidden rounded-xl md:rounded-2xl reveal group">
                <Image 
                  src={src} 
                  alt="gallery" 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="py-20 md:py-32 px-6 bg-[#0F0D0C]">
        <div className="container mx-auto">
          <div className="text-center mb-16 md:mb-20 reveal">
            <h2 className="text-cinematic text-[10px] md:text-xs text-jjfilms-accent-wedding mb-4 md:mb-6">Testimonials</h2>
            <h3 className="text-4xl md:text-5xl font-serif">Kind Words</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="glass p-8 md:p-12 rounded-[30px] md:rounded-[40px] border border-white/5 reveal flex flex-col h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 md:p-8 text-white/5 group-hover:text-jjfilms-accent-wedding/10 transition-colors">
                   <Heart size={80} className="md:w-[120px] md:h-[120px]" />
                </div>
                <div className="flex mb-6 md:mb-8">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" className="text-jjfilms-accent-wedding mr-1" />
                  ))}
                </div>
                <p className="text-lg md:text-xl text-white/80 italic leading-relaxed mb-8 md:mb-10 flex-grow relative z-10">"{t.content}"</p>
                <div className="relative z-10">
                  <h4 className="font-serif text-xl md:text-2xl mb-1">{t.name}</h4>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Contact Us */}
      <section className="py-24 md:py-40 px-6 bg-jjfilms-accent-wedding text-white">
        <div className="container mx-auto text-center reveal">
          <h2 className="text-cinematic text-[10px] md:text-xs text-white/60 mb-6 md:mb-8">Reservations</h2>
          <h3 className="text-4xl md:text-8xl font-serif mb-8 md:mb-12 leading-tight">
            Let's create something <br /> timeless together.
          </h3>
          <p className="text-base md:text-xl max-w-2xl mx-auto mb-10 md:mb-16 text-white/80">
            Our 2026/2027 calendar is filling up. Reach out today to check our availability for your wedding date.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <Link href="/contact" className="w-full md:w-auto px-10 md:px-12 py-5 md:py-6 bg-white text-black font-bold tracking-widest uppercase text-[10px] rounded-full hover:scale-105 transition-transform interactive text-center">
              Check Availability
            </Link>
            <Link href="/contact" className="w-full md:w-auto px-10 md:px-12 py-5 md:py-6 border border-white/30 text-white font-bold tracking-widest uppercase text-[10px] rounded-full hover:bg-white/10 transition-colors interactive text-center">
              View Packages
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default WeddingFilmsPage;
