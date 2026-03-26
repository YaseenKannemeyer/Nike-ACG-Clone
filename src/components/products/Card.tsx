"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ProductList from "./ProductList";
import type { Product } from "@/types";

const CATEGORIES = ["Shoes", "Clothing", "Equipment"];

export default function Card() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data, error } = await supabase.from("products").select("*");
      if (!error) setProducts(data ?? []);
      setLoading(false);
    }
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-[#1a1a1a] rounded-lg aspect-square animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {CATEGORIES.map((cat) => (
        <div key={cat}>
          <h2 className="font-display text-3xl text-white mb-6 tracking-wide">
            {cat}
          </h2>
          <ProductList products={products} category={cat} />
        </div>
      ))}
    </div>
  );
}
