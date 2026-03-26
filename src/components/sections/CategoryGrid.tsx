"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReveal } from "@/lib/useReveal";

const CATEGORIES = [
  {
    label: "Trail Shoes",
    href: "/shop?category=Shoes",
    bg: "linear-gradient(135deg, #1a0a00 0%, #3d1a00 70%, #FF7334 100%)",
    size: "col-span-2 row-span-2",
  },
  {
    label: "Jackets",
    href: "/shop?category=Clothing",
    bg: "linear-gradient(135deg, #0a1628 0%, #1a3a5c 100%)",
    size: "col-span-1 row-span-1",
  },
  {
    label: "Pants",
    href: "/shop?category=Clothing",
    bg: "linear-gradient(135deg, #0d1a0d 0%, #2a4a2a 100%)",
    size: "col-span-1 row-span-1",
  },
  {
    label: "Packs",
    href: "/shop?category=Equipment",
    bg: "linear-gradient(135deg, #1a1a0a 0%, #4a4a1a 100%)",
    size: "col-span-1 row-span-1",
  },
  {
    label: "Accessories",
    href: "/shop?category=Equipment",
    bg: "linear-gradient(135deg, #1a0a1a 0%, #3d1a3d 100%)",
    size: "col-span-1 row-span-1",
  },
];

export default function CategoryGrid() {
  const { ref, visible } = useReveal(0.1);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="bg-[#0A0A0A] py-20 lg:py-28 px-6 lg:px-10"
    >
      <div className="max-w-8xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <p className="text-[#FF7334] text-xs font-bold tracking-[0.3em] uppercase mb-3">
            Shop By Category
          </p>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none text-white">
            Gear Up.
          </h2>
        </motion.div>

        {/* Bento-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] md:auto-rows-[240px] gap-3">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={visible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
            >
              <Link
                href={cat.href}
                className="group relative w-full h-full flex items-end p-5 rounded-xl overflow-hidden block"
                style={{ background: cat.bg }}
              >
                {/* Grain */}
                <div
                  className="absolute inset-0 opacity-[0.05] pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {/* Orange accent */}
                <div className="absolute top-0 left-0 w-0 group-hover:w-full h-0.5 bg-[#FF7334] transition-all duration-500" />

                <div className="relative z-10">
                  <p className="font-display text-white text-2xl md:text-3xl leading-none tracking-wide">
                    {cat.label}
                  </p>
                  <p className="text-white/50 text-xs mt-1 font-semibold tracking-widest uppercase group-hover:text-[#FF7334] transition-colors">
                    Shop →
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
