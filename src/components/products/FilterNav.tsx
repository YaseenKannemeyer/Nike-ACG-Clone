"use client";

import { useState } from "react";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { FilterCategory } from "@/types";

const ACG_COLORS = [
  { hex: "#FF7334", name: "Orange" },
  { hex: "#000000", name: "Black" },
  { hex: "#FFFFFF", name: "White" },
  { hex: "#525252", name: "Grey" },
  { hex: "#0072CE", name: "Blue" },
  { hex: "#2E7D32", name: "Green" },
  { hex: "#FFD700", name: "Gold" },
  { hex: "#8B4513", name: "Brown" },
];

const FILTER_SECTIONS = [
  {
    key: "sort",
    label: "Sort By",
    type: "radio" as const,
    options: ["Featured", "Newest", "Price: High–Low", "Price: Low–High"],
  },
  {
    key: "gender",
    label: "Gender",
    type: "checkbox" as const,
    options: ["Men", "Women", "Unisex"],
  },
  {
    key: "kids",
    label: "Kids",
    type: "checkbox" as const,
    options: ["Boys", "Girls"],
  },
  {
    key: "price",
    label: "Shop by Price",
    type: "checkbox" as const,
    options: ["Under R 1,800", "R 1,800 – R 5,000", "Over R 5,000"],
  },
  {
    key: "sale",
    label: "Sale & Offers",
    type: "checkbox" as const,
    options: ["Sale"],
  },
  {
    key: "height",
    label: "Shoe Height",
    type: "checkbox" as const,
    options: ["Low Top", "Mid Top", "High Top"],
  },
  {
    key: "collection",
    label: "Collection",
    type: "checkbox" as const,
    options: ["Nike Air 1", "Nike Air 2", "ACG Mountain Fly", "ACG Lowcate"],
  },
];

interface FilterNavProps {
  categories: FilterCategory[];
  activeCategory: FilterCategory;
  onCategoryChange: (c: FilterCategory) => void;
}

export default function FilterNav({
  categories,
  activeCategory,
  onCategoryChange,
}: FilterNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    sort: true,
  });
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const toggle = (key: string) =>
    setOpenSections((p) => ({ ...p, [key]: !p[key] }));

  const toggleColor = (hex: string) =>
    setSelectedColors((p) =>
      p.includes(hex) ? p.filter((c) => c !== hex) : [...p, hex]
    );

  const FiltersContent = (
    <div className="space-y-7">
      {/* Category nav */}
      <section>
        <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/30 mb-3">
          Category
        </p>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => onCategoryChange(cat)}
                className={`w-full text-left text-sm px-3 py-2 rounded-md font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-[#FF7334]/15 text-[#FF7334]"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <div className="h-px bg-white/10" />

      {/* Collapsible filter sections */}
      {FILTER_SECTIONS.map(({ key, label, type, options }) => (
        <section key={key}>
          <button
            onClick={() => toggle(key)}
            className="w-full flex justify-between items-center text-sm font-semibold text-white hover:text-[#FF7334] transition-colors mb-1"
          >
            {label}
            <motion.div
              animate={{ rotate: openSections[key] ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {openSections[key] && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pt-3 space-y-2">
                  {options.map((opt, i) => (
                    <label
                      key={opt}
                      className="flex items-center gap-3 text-sm text-white/60 hover:text-white cursor-pointer transition-colors"
                    >
                      <input
                        type={type}
                        name={key}
                        defaultChecked={i === 0 && type === "radio"}
                        className="accent-[#FF7334] w-3.5 h-3.5"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      ))}

      {/* Colour filter */}
      <section>
        <button
          onClick={() => toggle("color")}
          className="w-full flex justify-between items-center text-sm font-semibold text-white hover:text-[#FF7334] transition-colors mb-1"
        >
          Colour
          <motion.div
            animate={{ rotate: openSections["color"] ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {openSections["color"] && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="pt-3 grid grid-cols-6 gap-2">
                {ACG_COLORS.map((c) => (
                  <button
                    key={c.hex}
                    title={c.name}
                    onClick={() => toggleColor(c.hex)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-8 h-8 rounded-full border transition-all ${
                      selectedColors.includes(c.hex)
                        ? "border-[#FF7334] ring-2 ring-[#FF7334] ring-offset-1 ring-offset-black"
                        : "border-white/20 hover:border-white/60"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );

  return (
    <>
      {/* ── Mobile category strip ──────────────────────────────────────── */}
      <div className="lg:hidden bg-[#0A0A0A] border-b border-white/10 px-4 overflow-x-auto scrollbar-hide">
        <ul className="flex gap-6 py-3 flex-nowrap">
          {categories.map((cat) => (
            <li key={cat} className="flex-shrink-0">
              <button
                onClick={() => onCategoryChange(cat)}
                className={`pb-2 text-sm font-semibold whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "text-[#FF7334] border-b-2 border-[#FF7334]"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Mobile filter trigger ──────────────────────────────────────── */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-white/10">
        <p className="text-white/40 text-xs">
          {activeCategory === "All" ? "All Products" : activeCategory}
        </p>
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 text-sm font-semibold text-white bg-[#FF7334] px-4 py-2 rounded-full"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* ── Desktop sidebar toggle ─────────────────────────────────────── */}
      <div className="hidden lg:block">
        <button
          onClick={() => setSidebarVisible((p) => !p)}
          className="flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white mb-4 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {sidebarVisible ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* ── Desktop sidebar ────────────────────────────────────────────── */}
      <AnimatePresence>
        {sidebarVisible && (
          <motion.aside
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 256 }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden lg:block flex-shrink-0 overflow-hidden"
          >
            <div className="w-64 pr-6 border-r border-white/10 overflow-y-auto max-h-[calc(100vh-120px)] sticky top-24">
              {FiltersContent}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Mobile overlay ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-[85vw] max-w-sm bg-[#0F0F0F] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <h2 className="font-semibold text-white">Filters</h2>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filters */}
              <div className="flex-1 overflow-y-auto p-5">
                {FiltersContent}
              </div>

              {/* Apply */}
              <div className="p-4 border-t border-white/10">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-full bg-[#FF7334] text-white py-3.5 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-[#e55e1f] transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
