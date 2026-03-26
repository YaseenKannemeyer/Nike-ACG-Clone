"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FADE_UP = {
  hidden: { opacity: 0, y: 40 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#0A0A0A]">
      {/* Background — video if available, else gradient fallback */}
      <div className="absolute inset-0">
        {/* Fallback gradient — replace with <video> when you have footage */}
        <div
          className="w-full h-full"
          style={{
            background:
              "linear-gradient(135deg, #0A0A0A 0%, #1a1a1a 30%, #2a1810 60%, #FF7334 100%)",
          }}
        />
        {/* Grain overlay for cinematic texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />
        {/* Dark gradient at bottom for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {/* Left edge vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      </div>

      {/* Decorative orange accent line */}
      <div className="absolute top-0 left-0 w-1 h-full bg-[#FF7334] opacity-60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-16 lg:pb-24 px-6 lg:px-16">
        <div className="max-w-4xl">
          {/* Season tag */}
          <motion.p
            variants={FADE_UP}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="text-[#FF7334] text-xs font-bold tracking-[0.3em] uppercase mb-4"
          >
            All Conditions Gear — SS26
          </motion.p>

          {/* Main headline */}
          <motion.h1
            variants={FADE_UP}
            initial="hidden"
            animate="show"
            custom={0.25}
            className="font-display text-[clamp(4rem,12vw,9rem)] leading-none text-white tracking-tight mb-6"
          >
            Built for
            <br />
            <span className="text-[#FF7334]">Every</span>
            <br />
            Terrain.
          </motion.h1>

          {/* Sub copy */}
          <motion.p
            variants={FADE_UP}
            initial="hidden"
            animate="show"
            custom={0.4}
            className="text-white/70 text-base lg:text-lg max-w-md mb-10 leading-relaxed"
          >
            Technical gear engineered for the mountains, trails, and everything
            in between. No conditions too extreme.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={FADE_UP}
            initial="hidden"
            animate="show"
            custom={0.55}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#FF7334] text-white text-sm font-bold tracking-widest uppercase px-8 py-4 rounded-full hover:bg-[#e55e1f] transition-colors duration-300"
            >
              Shop Now
            </Link>
            <Link
              href="/shop?category=new"
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white text-sm font-bold tracking-widest uppercase px-8 py-4 rounded-full hover:border-white hover:bg-white/10 transition-all duration-300"
            >
              Explore New
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-[10px] tracking-[0.25em] uppercase rotate-90 origin-center mb-4">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#FF7334] animate-[scroll-hint_2s_ease-in-out_infinite]" />
        <ChevronDown className="w-4 h-4 text-[#FF7334] animate-bounce" />
      </motion.div>

      {/* Product count badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute top-1/2 right-6 lg:right-16 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-1"
      >
        <div className="w-16 h-16 rounded-full border-2 border-[#FF7334]/60 flex items-center justify-center">
          <span className="text-white text-xs font-bold text-center leading-tight">
            NEW<br />SS26
          </span>
        </div>
      </motion.div>
    </section>
  );
}
