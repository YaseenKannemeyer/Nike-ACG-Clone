"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReveal } from "@/lib/useReveal";

interface CampaignBannerProps {
  tag?: string;
  headline: string;
  sub?: string;
  cta?: string;
  href?: string;
  variant?: "orange" | "dark" | "split";
}

export default function CampaignBanner({
  tag = "Nike ACG",
  headline,
  sub,
  cta = "Shop Now",
  href = "/shop",
  variant = "orange",
}: CampaignBannerProps) {
  const { ref, visible } = useReveal(0.1);

  const bg =
    variant === "orange"
      ? "bg-[#FF7334]"
      : variant === "dark"
      ? "bg-[#111111]"
      : "bg-[#1a0a00]";

  const textColor = variant === "orange" ? "text-[#0A0A0A]" : "text-white";
  const subColor = variant === "orange" ? "text-black/60" : "text-white/50";
  const btnClass =
    variant === "orange"
      ? "bg-black text-white hover:bg-[#1a1a1a]"
      : "bg-[#FF7334] text-white hover:bg-[#e55e1f]";

  return (
    <section
      // @ts-expect-error ref
      ref={ref}
      className={`${bg} relative overflow-hidden`}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Giant display text watermark */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden`}
      >
        <span
          className={`font-display text-[20vw] leading-none ${
            variant === "orange" ? "text-black/5" : "text-white/[0.03]"
          }`}
        >
          ACG
        </span>
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-6 lg:px-16 py-24 lg:py-36 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`text-xs font-bold tracking-[0.35em] uppercase mb-4 ${
            variant === "orange" ? "text-black/50" : "text-[#FF7334]"
          }`}
        >
          {tag}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={`font-display text-[clamp(3.5rem,10vw,8rem)] leading-none ${textColor} max-w-5xl text-balance`}
        >
          {headline}
        </motion.h2>

        {sub && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className={`mt-6 text-base lg:text-lg max-w-lg leading-relaxed ${subColor}`}
          >
            {sub}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10"
        >
          <Link
            href={href}
            className={`inline-flex items-center gap-2 ${btnClass} text-sm font-bold tracking-widest uppercase px-10 py-4 rounded-full transition-colors duration-300`}
          >
            {cta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
