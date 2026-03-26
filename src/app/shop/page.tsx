"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import FilterNav from "@/components/products/FilterNav";
import ProductList from "@/components/products/ProductList";
import type { Product, FilterCategory } from "@/types";

const CATEGORIES: FilterCategory[] = [
  "All",
  "Shoes",
  "Hoodies",
  "Accessories",
  "T-Shirts",
  "Pants",
  "Hats",
  "Bags",
  "Watches",
  "Jewelry",
];

function ShopContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");

  // Sync category from URL query param
  useEffect(() => {
    const cat = searchParams.get("category") as FilterCategory | null;
    if (cat && CATEGORIES.includes(cat)) setActiveCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase.from("products").select("*");
      setProducts(data ?? []);
      setLoading(false);
    }
    fetch();
  }, []);

  const displayed =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Page header */}
      <div className="border-b border-white/10 px-6 lg:px-10 py-10">
        <p className="text-[#FF7334] text-xs font-bold tracking-[0.3em] uppercase mb-2">
          Nike ACG
        </p>
        <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-none text-white">
          All Conditions Gear
        </h1>
      </div>

      {/* Mobile: category strip + filter trigger (lg:hidden inside FilterNav) */}
      <FilterNav
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Desktop layout: sidebar + grid */}
      <div className="hidden lg:flex gap-0 px-10 pt-6">
        {/* Desktop sidebar toggle + animated sidebar */}
        <FilterNav
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Product grid */}
        <div className="flex-1 pl-10 pb-16">
          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-white/30 text-xs">
              {loading ? "Loading…" : `${displayed.length} products`}
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-[#111] rounded-lg aspect-square animate-pulse"
                />
              ))}
            </div>
          ) : (
            <ProductList products={displayed} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
      <ShopContent />
    </Suspense>
  );
}
