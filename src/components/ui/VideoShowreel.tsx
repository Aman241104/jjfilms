"use client";

import React, { useState } from "react";

interface VideoShowreelProps {
  videoUrl?: string; // YouTube embed URL e.g. https://www.youtube.com/embed/VIDEO_ID
  title?:    string;
  label?:    string;
}

export const VideoShowreel = ({
  videoUrl,
  title = "Our Showreel",
  label = "SHOWREEL",
}: VideoShowreelProps) => {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-dark-void py-20 md:py-32 px-8 md:px-14">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <div>
            <p className="text-label text-white/25 tracking-[0.25em] mb-3">{label}</p>
            <h2
              className="font-display italic text-white leading-[0.95]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", letterSpacing: "-0.025em" }}
            >
              {title}
            </h2>
          </div>
          <span className="text-label text-white/15 hidden md:block tracking-widest">
            JJFILMS · 2024
          </span>
        </div>

        {/* Video container 16:9 */}
        <div className="relative w-full rounded-sm overflow-hidden" style={{ aspectRatio: "16/9" }}>
          {playing && videoUrl ? (
            <iframe
              src={`${videoUrl}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          ) : (
            <button
              onClick={() => videoUrl && setPlaying(true)}
              className="absolute inset-0 w-full h-full group text-left"
              style={{ cursor: videoUrl ? "pointer" : "default" }}
              aria-label={videoUrl ? "Play showreel" : "Video coming soon"}
            >
              {/* Dark gradient background */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, #111 0%, #1a1a1a 45%, #0d0d0d 100%)" }}
              />

              {/* Subtle grid lines */}
              <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                  backgroundSize: "80px 80px",
                }}
              />

              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

              {/* Center play button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-7">
                <div
                  className={`w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center border border-white/12 transition-all duration-500 ${videoUrl ? "group-hover:scale-110 group-hover:border-white/35 group-hover:bg-white/10" : ""}`}
                  style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)" }}
                >
                  <span className="text-white/65 text-2xl md:text-4xl" style={{ marginLeft: "5px" }}>
                    ▶
                  </span>
                </div>
                <p className="text-label text-white/28 tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.28)" }}>
                  {videoUrl ? "PLAY SHOWREEL" : "VIDEO COMING SOON"}
                </p>
              </div>

              {/* Corner labels */}
              <span
                className="absolute top-5 left-6 text-label text-white/12"
                style={{ fontSize: "0.52rem", letterSpacing: "0.2em" }}
              >
                JJFILMS · STUDIO
              </span>
              <span
                className="absolute bottom-5 right-6 text-label text-white/10"
                style={{ fontSize: "0.52rem", letterSpacing: "0.2em" }}
              >
                4K · COLOUR GRADED
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
