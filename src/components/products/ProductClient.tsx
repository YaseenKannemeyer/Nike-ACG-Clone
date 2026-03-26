"use client";

import { useState } from "react";
import { Heart, ShoppingBag, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { Product } from "@/types";

const SIZES = ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"];

export default function ProductClient({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(
    product.colors?.[0]?.image || "/placeholder.png"
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);

  const handleAddToBag = () => {
    if (!selectedSize) return;
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Back link */}
      <div className="px-6 lg:px-10 pt-6">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Shop
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">

        {/* ── LEFT — Image viewer ─────────────────────────────────────── */}
        <div className="flex gap-4">
          {/* Thumbnail strip */}
          {product.colors && product.colors.length > 1 && (
            <div className="flex flex-col gap-3 flex-shrink-0">
              {product.colors.map((color, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(color.image)}
                  className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === color.image
                      ? "border-[#FF7334]"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={color.image}
                    alt={color.name}
                    className="w-full h-full object-contain bg-[#1a1a1a] p-1"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main image */}
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="flex-1 bg-[#111] rounded-xl overflow-hidden flex items-center justify-center aspect-square"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-contain p-8"
            />
          </motion.div>
        </div>

        {/* ── RIGHT — Product info ────────────────────────────────────── */}
        <div className="flex flex-col justify-center">
          {/* Category tag */}
          <p className="text-[#FF7334] text-xs font-bold tracking-[0.3em] uppercase mb-3">
            {product.category} — Nike ACG
          </p>

          {/* Name */}
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-none text-white mb-4">
            {product.name}
          </h1>

          {/* Description */}
          <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-md">
            {product.description}
          </p>

          {/* Price */}
          <p className="text-2xl font-bold text-white mb-8">{product.price}</p>

          {/* Colour swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-8">
              <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-3">
                Colour
              </p>
              <div className="flex items-center gap-2">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(color.image)}
                    title={color.name}
                    style={{ backgroundColor: color.hex || color.name.toLowerCase() }}
                    className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${
                      selectedImage === color.image
                        ? "border-[#FF7334] ring-2 ring-[#FF7334] ring-offset-2 ring-offset-[#0A0A0A]"
                        : "border-white/20 hover:border-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size picker */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold tracking-widest uppercase text-white/40">
                Select Size
              </p>
              <button className="text-xs text-[#FF7334] underline">
                Size Guide
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 text-xs font-semibold rounded-md border transition-all duration-200 ${
                    selectedSize === size
                      ? "border-[#FF7334] bg-[#FF7334]/10 text-[#FF7334]"
                      : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && (
              <p className="text-white/30 text-xs mt-2">Please select a size</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToBag}
              disabled={!selectedSize}
              className={`w-full flex items-center justify-center gap-3 py-4 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
                addedToBag
                  ? "bg-green-600 text-white"
                  : selectedSize
                  ? "bg-[#FF7334] text-white hover:bg-[#e55e1f]"
                  : "bg-white/10 text-white/30 cursor-not-allowed"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              {addedToBag ? "Added to Bag!" : "Add to Bag"}
            </motion.button>

            <button
              onClick={() => setLiked((p) => !p)}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-full text-sm font-bold tracking-widest uppercase border-2 border-white/15 hover:border-white/40 transition-all duration-300"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  liked ? "text-[#FF7334] fill-[#FF7334]" : "text-white"
                }`}
              />
              {liked ? "Saved to Favourites" : "Favourite"}
            </button>
          </div>

          {/* Shipping note */}
          <p className="text-white/25 text-xs mt-6 text-center">
            Free standard shipping on orders over R1,500 · Free returns
          </p>
        </div>
      </div>
    </div>
  );
}
