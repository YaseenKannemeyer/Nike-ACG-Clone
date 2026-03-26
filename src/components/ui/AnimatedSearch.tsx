"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import SearchOverlay from "./SearchOverlay";

export default function AnimatedSearch() {
  const [isLarge, setIsLarge] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsLarge(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="flex items-center">
      {/* Mobile: icon only */}
      {!isLarge && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open search"
          className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>
      )}

      {/* Desktop: pill button */}
      {isLarge && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open search"
          className="group flex items-center h-9 w-36 rounded-full bg-black/20 hover:bg-black/30 transition-colors px-1 gap-2 cursor-pointer"
        >
          <div className="flex items-center justify-center w-7 h-7 rounded-full">
            <Search className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
          </div>
          <span className="text-sm text-white/70 group-hover:text-white transition-colors">
            Search
          </span>
        </button>
      )}

      <SearchOverlay open={open} onClose={() => setOpen(false)} isLarge={isLarge} />
    </div>
  );
}
