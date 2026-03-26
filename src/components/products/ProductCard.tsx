"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Heart } from "lucide-react";
import type { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(
    product.colors?.[0]?.image || "/placeholder.png"
  );
  const [liked, setLiked] = useState(false);

  return (
    <div
      className="group relative bg-[#111] rounded-lg overflow-hidden cursor-pointer"
      onClick={() => router.push(`/product/${product.id}`)}
    >
      {/* Image container */}
      <div className="relative w-full aspect-square bg-[#1a1a1a] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={currentImage}
          alt={product.name}
          className="product-card-img w-full h-full object-contain p-4"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked((p) => !p);
          }}
          aria-label="Add to favourites"
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              liked ? "text-[#FF7334] fill-[#FF7334]" : "text-white"
            }`}
          />
        </button>
      </div>

      {/* Color swatches */}
      {product.colors && product.colors.length > 0 && (
        <div className="flex items-center gap-1.5 px-4 pt-3">
          {product.colors.map((color, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImage(color.image);
              }}
              onMouseEnter={() => setCurrentImage(color.image)}
              title={color.name}
              aria-label={`View in ${color.name}`}
              style={{ backgroundColor: color.hex || color.name.toLowerCase() }}
              className="w-4 h-4 rounded-full border border-white/20 hover:ring-2 hover:ring-[#FF7334] hover:ring-offset-1 hover:ring-offset-[#111] transition-all"
            />
          ))}
          {product.colors.length > 1 && (
            <span className="text-white/30 text-xs ml-1">
              {product.colors.length} colours
            </span>
          )}
        </div>
      )}

      {/* Info */}
      <div className="p-4 pt-2">
        <h3 className="text-sm font-bold text-white truncate leading-tight">
          {product.name}
        </h3>
        <p className="text-xs text-white/40 mt-0.5 line-clamp-1">
          {product.description}
        </p>
        <p className="text-sm font-semibold text-white mt-2">{product.price}</p>
      </div>

      {/* Orange bottom accent on hover */}
      <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-[#FF7334] transition-all duration-500" />
    </div>
  );
}
