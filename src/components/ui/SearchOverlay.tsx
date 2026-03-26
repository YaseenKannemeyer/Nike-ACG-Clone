"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const POPULAR = [
  "Nike ACG",
  "Trail Shoes",
  "GORE-TEX",
  "Hiking Jacket",
  "ACG Pants",
  "Winter Gear",
  "All Conditions",
  "Outdoor Pack",
];

interface Props {
  open: boolean;
  onClose: () => void;
  isLarge: boolean;
}

export default function SearchOverlay({ open, onClose, isLarge }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("acg-recent-searches") ?? "[]");
      setRecent(stored);
    } catch {}
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const saveSearch = (term: string) => {
    if (!term.trim()) return;
    const updated = [term, ...recent.filter((r) => r !== term)].slice(0, 5);
    setRecent(updated);
    try {
      localStorage.setItem("acg-recent-searches", JSON.stringify(updated));
    } catch {}
  };

  const handleSubmit = (term: string) => {
    if (!term.trim()) return;
    saveSearch(term);
    router.push(`/shop?q=${encodeURIComponent(term)}`);
    onClose();
  };

  const removeRecent = (term: string) => {
    const updated = recent.filter((r) => r !== term);
    setRecent(updated);
    try {
      localStorage.setItem("acg-recent-searches", JSON.stringify(updated));
    } catch {}
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-start"
          onClick={() => { if (isLarge) onClose(); }}
        >
          <motion.div
            initial={{ y: isLarge ? -20 : 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: isLarge ? -20 : 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full bg-[#FF7334] text-white ${
              isLarge
                ? "min-h-[45vh] max-h-[80vh] overflow-y-auto shadow-2xl"
                : "h-screen overflow-y-auto"
            } p-6 lg:px-10`}
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-10">
              {isLarge && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/nike-acg-seeklogo.png"
                  alt="Nike ACG"
                  className="w-20 h-auto flex-shrink-0"
                />
              )}

              <div className="flex-1 flex items-center border border-white/40 rounded-full px-4 py-2.5 focus-within:border-white transition-colors">
                <input
                  type="text"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit(query)}
                  placeholder="Search ACG gear…"
                  className="flex-1 bg-transparent text-white placeholder-white/60 focus:outline-none text-sm"
                />
              </div>

              <button
                onClick={onClose}
                className="flex-shrink-0 text-sm font-semibold text-white/80 hover:text-white transition-colors px-2"
              >
                Cancel
              </button>
            </div>

            <div className="max-w-2xl mx-auto space-y-10">
              {/* Popular */}
              <section>
                <h4 className="text-xs font-bold tracking-widest uppercase mb-4 text-white/60">
                  Popular Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {POPULAR.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSubmit(item)}
                      className="rounded-full border border-white/40 px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </section>

              {/* Recent */}
              <section>
                <h4 className="text-xs font-bold tracking-widest uppercase mb-4 text-white/60">
                  Recent Searches
                </h4>
                {recent.length === 0 ? (
                  <p className="text-sm text-white/50">No recent searches</p>
                ) : (
                  <ul className="space-y-1">
                    {recent.map((item) => (
                      <li
                        key={item}
                        className="flex items-center justify-between py-2 border-b border-white/10"
                      >
                        <button
                          onClick={() => handleSubmit(item)}
                          className="text-sm hover:text-white/70 transition-colors text-left"
                        >
                          {item}
                        </button>
                        <button
                          onClick={() => removeRecent(item)}
                          className="text-white/40 hover:text-white transition-colors ml-4"
                          aria-label={`Remove ${item}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
