"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/types";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .limit(8)
      .then(({ data }) => {
        setProducts(data ?? []);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="bg-[#0A0A0A] py-20 lg:py-32 px-6 lg:px-10"
    >
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-[#FF7334] text-xs font-bold tracking-[0.3em] uppercase mb-3">
              New Arrivals
            </p>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none text-white">
              Featured Gear
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden md:inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-white/50 hover:text-white transition-colors group"
          >
            View All
            <span className="transition-transform group-hover:translate-x-1 duration-200">→</span>
          </Link>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#111] rounded-lg aspect-square animate-pulse"
                style={{ animationDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {products.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.07 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Mobile view all */}
        <div className="mt-10 text-center md:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 border-2 border-white/20 text-white text-sm font-bold tracking-widest uppercase px-8 py-3.5 rounded-full hover:border-[#FF7334] hover:text-[#FF7334] transition-all"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
