"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FOOTER_LINKS = [
  {
    title: "Resources",
    links: [
      { name: "Find a Store", href: "/find-a-store" },
      { name: "Nike Journal", href: "/nike-journal" },
      { name: "Become a Member", href: "/become-a-member" },
      { name: "Feedback", href: "/feedback" },
      { name: "Promo Codes", href: "/promo-codes" },
      { name: "Product Advice", href: "/product-advice" },
      { name: "Running Shoe Finder", href: "/running-shoe-finder" },
    ],
  },
  {
    title: "Help",
    links: [
      { name: "Get Help", href: "/get-help" },
      { name: "Order Status", href: "/order-status" },
      { name: "Shipping and Delivery", href: "/shipping-and-delivery" },
      { name: "Returns", href: "/returns" },
      { name: "Payment Options", href: "/payment-options" },
      { name: "Contact Us", href: "/contact-us" },
      { name: "Reviews", href: "/reviews" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Nike", href: "/about-nike" },
      { name: "News", href: "/news" },
      { name: "Careers", href: "/careers" },
      { name: "Investors", href: "/investors" },
      { name: "Sustainability", href: "/sustainability" },
      { name: "Purpose", href: "/purpose" },
      { name: "Nike Coaching", href: "/nike-coaching" },
      { name: "Report a Concern", href: "/report-a-concern" },
    ],
  },
  {
    title: "Community",
    links: [
      { name: "Student Discount", href: "/student" },
      { name: "Teacher Discount", href: "/teacher" },
    ],
  },
];

const BOTTOM_LINKS = [
  "Guides",
  "Terms of Use",
  "Terms of Sale",
  "Company Details",
  "Privacy & Cookie Policy",
  "Privacy & Cookie Settings",
];

export default function Footer() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <footer className="w-full bg-[#FF7334] font-sans text-white">
      <div className="max-w-8xl mx-auto px-6 lg:px-10 border-t border-white/20">

        {/* ── Mobile accordion ──────────────────────────────────────────── */}
        <div className="md:hidden divide-y divide-white/20 py-4">
          {FOOTER_LINKS.map((section, i) => (
            <div key={section.title}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center py-4 text-sm font-semibold tracking-wide"
              >
                {section.title}
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.ul
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden pb-4 space-y-3 pl-1"
                  >
                    {section.links.map((l) => (
                      <li key={l.name}>
                        <Link
                          href={l.href}
                          className="text-sm text-white/80 hover:text-white transition-colors"
                        >
                          {l.name}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* ── Desktop grid ──────────────────────────────────────────────── */}
        <div className="hidden md:grid md:grid-cols-5 gap-10 py-16">
          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-bold tracking-widest uppercase mb-6 text-white/60">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((l) => (
                  <li key={l.name}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/80 hover:text-white transition-colors"
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Country */}
          <div className="flex flex-col items-end justify-start">
            <button className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
              <Globe className="w-4 h-4" />
              South Africa
            </button>
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────────────────────────── */}
        <div className="py-6 border-t border-white/20 flex flex-col md:flex-row md:items-center gap-3 text-xs text-white/50">
          <span className="md:whitespace-nowrap md:pr-6">
            © 2026 Nike, Inc. All rights reserved
          </span>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {BOTTOM_LINKS.map((l) => (
              <Link key={l} href="#" className="hover:text-white transition-colors">
                {l}
              </Link>
            ))}
          </div>
          <Link
            href="https://nike.com"
            target="_blank"
            rel="noopener noreferrer"
            className="md:ml-auto mt-2 md:mt-0 flex-shrink-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nike (2).png" alt="Nike" className="w-16 h-auto opacity-70 hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
