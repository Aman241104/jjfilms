"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const thumbnails = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&q=70",
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=300&q=70",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=70",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&q=70",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&q=70",
];

const navLinks = [
  { num: "001", name: "Home",              href: "/" },
  { num: "002", name: "Real Estate",       href: "/real-estate" },
  { num: "003", name: "Product",           href: "/product-photography" },
  { num: "004", name: "Wedding Films",     href: "/wedding-films" },
  { num: "005", name: "About",             href: "/about" },
  { num: "006", name: "Journal",           href: "/journal" },
  { num: "007", name: "Contact",           href: "/contact" },
];

const socials = [
  { name: "Instagram", href: "https://instagram.com/jjfilms.studio" },
  { name: "Behance",   href: "https://behance.net/jjfilms"          },
  { name: "LinkedIn",  href: "https://linkedin.com/company/jjfilms" },
];

export const Footer = () => (
  <footer className="bg-cream-100 border-t border-ink-100/60">
    {/* Thumbnail strip */}
    <div className="flex gap-1 overflow-hidden">
      {thumbnails.map((src, i) => (
        <div key={i} className="relative flex-1 aspect-[3/2] overflow-hidden group">
          <Image
            src={src}
            alt=""
            fill
            sizes="20vw"
            loading="eager"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      ))}
    </div>

    {/* Main footer row */}
    <div className="px-8 md:px-14 py-14 grid md:grid-cols-3 gap-12">
      {/* Brand */}
      <div>
        <p className="font-display font-bold text-2xl text-ink-900 tracking-[0.12em] mb-3">
          JJFILMS<span className="text-accent-ev">.</span>
        </p>
        <p className="text-ink-500 text-sm leading-relaxed max-w-xs">
          Founded in 1999 by brothers Jignesh & Jay Shah. 25 years of photography across real estate, product and weddings — Mumbai to worldwide.
        </p>
      </div>

      {/* Navigate */}
      <div>
        <p className="text-label text-ink-300 mb-5">NAVIGATE</p>
        <ul className="space-y-3">
          {navLinks.map(({ num, name, href }) => (
            <li key={href} className="flex items-center gap-3">
              <span className="text-label text-ink-300">{num}</span>
              <Link href={href} className="text-sm text-ink-700 hover:text-ink-900 hover-underline transition-colors">
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Connect */}
      <div>
        <p className="text-label text-ink-300 mb-5">CONNECT</p>
        <ul className="space-y-3">
          {socials.map(({ name, href }) => (
            <li key={name}>
              <a href={href} className="text-sm text-ink-700 hover:text-ink-900 hover-underline transition-colors">
                {name}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <p className="text-label text-ink-300 mb-2">CONTACT</p>
          <a href="mailto:hello@jjfilms.studio" className="text-sm text-ink-700 hover:text-ink-900 transition-colors">
            hello@jjfilms.studio
          </a>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="px-8 md:px-14 py-5 border-t border-ink-100/60 flex flex-col md:flex-row items-center justify-between gap-3">
      <p className="text-label text-ink-300" suppressHydrationWarning>
        © {new Date().getFullYear()} JJFILMS. ALL RIGHTS RESERVED.
      </p>
      <div className="flex items-center gap-6">
        <Link href="/privacy" className="text-label text-ink-300 hover:text-ink-600 transition-colors">
          PRIVACY POLICY
        </Link>
        <p className="text-label text-ink-300">
          PHOTOGRAPHY · REAL ESTATE · PRODUCT · EVENTS
        </p>
      </div>
    </div>
  </footer>
);
