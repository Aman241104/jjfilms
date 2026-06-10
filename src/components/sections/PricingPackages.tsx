"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ServiceKey = "real-estate" | "product" | "weddings";

const packages: Record<ServiceKey, { name: string; price: string; desc: string; includes: string[] }[]> = {
  "real-estate": [
    {
      name: "Essential",
      price: "₹29,000",
      desc: "Perfect for apartments and smaller listings.",
      includes: [
        "Up to 20 edited images",
        "Interior & exterior coverage",
        "48-hour delivery",
        "2 revision rounds",
      ],
    },
    {
      name: "Signature",
      price: "₹55,000",
      desc: "Our most popular package for premium properties.",
      includes: [
        "Up to 40 edited images",
        "Aerial/drone photography",
        "Twilight shoot included",
        "48-hour delivery",
        "Unlimited revisions",
      ],
    },
    {
      name: "Estate",
      price: "₹95,000",
      desc: "For luxury villas, hotels and commercial properties.",
      includes: [
        "Unlimited images",
        "Full-day shoot",
        "Aerial, twilight & detail shots",
        "Vertical video walkthrough",
        "Priority 24-hour delivery",
        "Dedicated creative director",
      ],
    },
  ],
  "product": [
    {
      name: "Catalogue",
      price: "₹22,000",
      desc: "Clean studio shots for e-commerce and catalogues.",
      includes: [
        "Up to 15 products",
        "White / cream background",
        "3 angles per product",
        "48-hour delivery",
      ],
    },
    {
      name: "Campaign",
      price: "₹58,000",
      desc: "Lifestyle and editorial product photography.",
      includes: [
        "Up to 25 products",
        "Lifestyle & flat-lay setups",
        "On-location or studio",
        "Art direction included",
        "48-hour delivery",
      ],
    },
    {
      name: "Brand Suite",
      price: "₹1,20,000",
      desc: "Complete visual identity for brand launches.",
      includes: [
        "Unlimited products",
        "Full-day studio hire",
        "Lifestyle, hero & detail shots",
        "Video cut-downs included",
        "Priority delivery",
        "Usage rights — all media",
      ],
    },
  ],
  "weddings": [
    {
      name: "Intimate",
      price: "₹95,000",
      desc: "For smaller celebrations and civil ceremonies.",
      includes: [
        "1 photographer, 6 hours",
        "Up to 300 edited images",
        "Online gallery",
        "10-day delivery",
      ],
    },
    {
      name: "Classic",
      price: "₹1,65,000",
      desc: "Full-day coverage for traditional weddings.",
      includes: [
        "2 photographers, full day",
        "Up to 600 edited images",
        "Engagement session included",
        "Printed album (30 pages)",
        "7-day delivery",
      ],
    },
    {
      name: "Cinema",
      price: "₹2,80,000",
      desc: "The complete storytelling experience.",
      includes: [
        "2 photographers + videographer",
        "Multi-day coverage",
        "Cinematic highlight film",
        "Unlimited edited images",
        "Premium album + prints",
        "Dedicated creative director",
      ],
    },
  ],
};

const tabs: { label: string; key: ServiceKey }[] = [
  { label: "Real Estate", key: "real-estate" },
  { label: "Product",     key: "product"     },
  { label: "Weddings",    key: "weddings"     },
];

interface PricingPackagesProps {
  defaultTab?: ServiceKey;
}

export const PricingPackages = ({ defaultTab = "real-estate" }: PricingPackagesProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<ServiceKey>(defaultTab);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pkg-card", {
        opacity: 0, y: 30, stagger: 0.1, duration: 0.8, ease: "power3.out",
        clearProps: "opacity,transform",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const current = packages[active];

  return (
    <section ref={sectionRef} className="bg-cream-50 py-24 md:py-32 px-8 md:px-14">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="text-label text-ink-300 tracking-widest mb-3">PRICING</p>
          <h2
            className="font-display font-bold text-ink-900 leading-[0.95] mb-8"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", letterSpacing: "-0.025em" }}
          >
            Transparent pricing.{" "}
            <em className="font-serif italic font-normal text-ink-500">No surprises.</em>
          </h2>

          {/* Tab switcher */}
          <div className="flex gap-1 border border-ink-200 rounded-sm p-1 w-fit">
            {tabs.map(({ label, key }) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`text-label px-5 py-2.5 rounded-[2px] transition-all duration-300 ${
                  active === key
                    ? "bg-ink-900 text-cream-50"
                    : "text-ink-400 hover:text-ink-700"
                }`}
                style={{ fontSize: "0.62rem", letterSpacing: "0.12em" }}
              >
                {label.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Package cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {current.map((pkg, i) => (
            <div
              key={pkg.name}
              className={`pkg-card border rounded-sm p-8 flex flex-col gap-6 transition-colors duration-300 ${
                i === 1
                  ? "border-ink-900 bg-ink-900 text-cream-50"
                  : "border-ink-200 bg-transparent hover:bg-cream-100"
              }`}
            >
              {i === 1 && (
                <span className="text-label text-accent-ev self-start" style={{ fontSize: "0.6rem", letterSpacing: "0.15em" }}>
                  MOST POPULAR
                </span>
              )}
              <div>
                <p className={`font-display font-semibold text-xl mb-1 ${i === 1 ? "text-white" : "text-ink-900"}`}
                  style={{ letterSpacing: "-0.01em" }}>
                  {pkg.name}
                </p>
                <p className={`text-sm ${i === 1 ? "text-white/50" : "text-ink-400"}`}>{pkg.desc}</p>
              </div>
              <p
                className={`font-display font-bold ${i === 1 ? "text-white" : "text-ink-900"}`}
                style={{ fontSize: "clamp(1.8rem, 2.5vw, 2.2rem)", letterSpacing: "-0.02em" }}
              >
                {pkg.price}
              </p>
              <ul className="space-y-2.5 flex-1">
                {pkg.includes.map((item) => (
                  <li key={item} className={`flex items-start gap-2.5 text-sm ${i === 1 ? "text-white/70" : "text-ink-500"}`}>
                    <span className={`mt-0.5 flex-shrink-0 ${i === 1 ? "text-accent-ev" : "text-ink-400"}`}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`mt-auto text-label flex items-center gap-2 group transition-colors duration-300 ${
                  i === 1
                    ? "text-white hover:text-accent-ev"
                    : "text-ink-700 hover:text-ink-900"
                }`}
                style={{ fontSize: "0.62rem", letterSpacing: "0.12em" }}
              >
                GET A QUOTE
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </div>
          ))}
        </div>

        <p className="text-label text-ink-300 mt-8 text-center">
          All prices exclude GST. Custom quotes available for multi-day, destination and corporate projects.
        </p>
      </div>
    </section>
  );
};
