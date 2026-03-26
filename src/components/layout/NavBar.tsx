"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  User,
  Menu as MenuIcon,
  X,
  HelpCircle,
  Package,
  MapPin,
} from "lucide-react";
import { slide as BurgerMenu } from "react-burger-menu";
import AnimatedSearch from "@/components/ui/AnimatedSearch";

const NAV_LINKS = [
  { label: "New", href: "/" },
  { label: "Mens", href: "/shop?gender=mens" },
  { label: "Womens", href: "/shop?gender=womens" },
  { label: "Kids", href: "/shop?gender=kids" },
  { label: "Sport", href: "/shop?category=sport" },
];

const TOP_LINKS = [
  { label: "Find a Store", href: "/find-a-store" },
  { label: "Help", href: "/help" },
  { label: "Join Us", href: "/join" },
  { label: "Sign In", href: "/signin" },
];

const BURGER_ITEMS = [
  { icon: <HelpCircle className="w-5 h-5" />, label: "Help", href: "/help" },
  { icon: <ShoppingBag className="w-5 h-5" />, label: "Bag", href: "/bag" },
  { icon: <Package className="w-5 h-5" />, label: "Orders", href: "/orders" },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Find a Store",
    href: "/find-a-store",
  },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /* scroll-aware nav ---------------------------------------------------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close on outside click --------------------------------------------- */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      )
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  /* burger styles ------------------------------------------------------- */
  const burgerStyles = {
    bmBurgerButton: { position: "relative", width: "24px", height: "24px" },
    bmBurgerBars: { background: "#ffffff" },
    bmBurgerBarsHover: { background: "#d1d5db" },
    bmMenuWrap: {
      position: "fixed" as const,
      top: "0px",
      right: "0px",
      height: "100vh",
      width: "320px",
      zIndex: "1000",
    },
    bmMenu: {
      background: "#FF7334",
      height: "100%",
      padding: "2rem 1.5rem",
      overflowY: "auto" as const,
    },
    bmItem: {
      color: "#ffffff",
      fontSize: "1.5rem",
      fontFamily: "var(--font-display)",
      letterSpacing: "0.05em",
      marginBottom: "0.5rem",
      display: "block",
    },
    bmOverlay: { background: "rgba(0,0,0,0.55)" },
  };

  return (
    <div id="outer-container">
      {/* ── Top bar (desktop) ───────────────────────────────────────────── */}
      <div className="hidden lg:flex items-center justify-between bg-[#111] text-[#A3A3A3] text-xs px-8 h-8 border-b border-white/5">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/nike (1).png"
            alt="Nike"
            className="w-14 h-auto opacity-80 hover:opacity-100 transition-opacity"
          />
        </Link>
        <div className="flex items-center gap-1">
          {TOP_LINKS.map((l, i) => (
            <React.Fragment key={l.label}>
              <Link
                href={l.href}
                className="px-2 py-1 hover:text-white transition-colors"
              >
                {l.label}
              </Link>
              {i < TOP_LINKS.length - 1 && (
                <span className="text-white/20">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── Main nav ────────────────────────────────────────────────────── */}
      <nav
        className={`sticky top-0 z-50 flex items-center justify-between px-6 lg:px-10 h-20 transition-all duration-500 ${
          scrolled
            ? "bg-[#FF7334] shadow-[0_2px_24px_rgba(255,115,52,0.25)]"
            : "bg-[#FF7334]"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/nike-acg-seeklogo.png"
            alt="Nike ACG"
            className="w-24 h-auto"
          />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className="text-white font-semibold text-sm tracking-wide relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-1">
          <AnimatedSearch />
          <button
            aria-label="Favourites"
            className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <Heart className="w-5 h-5" />
          </button>
          <button
            aria-label="Bag"
            className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile actions */}
        <div className="flex lg:hidden items-center gap-1">
          <AnimatedSearch />
          <button
            aria-label="Profile"
            className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <User className="w-5 h-5" />
          </button>
          <button
            aria-label="Bag"
            className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>

          {/* Burger */}
          <div ref={menuRef} className="relative">
            <BurgerMenu
              right
              isOpen={menuOpen}
              onStateChange={(s) => setMenuOpen(s.isOpen)}
              styles={burgerStyles}
              pageWrapId="page-wrap"
              outerContainerId="outer-container"
              customBurgerIcon={
                menuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <MenuIcon className="w-6 h-6 text-white" />
                )
              }
              customCrossIcon={false}
            >
              {/* Nav links */}
              <div className="flex flex-col gap-1 pt-8">
                {NAV_LINKS.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="menu-item flex justify-between items-center py-3 border-b border-white/20 group"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.75rem",
                      color: "#fff",
                      letterSpacing: "0.04em",
                    }}
                  >
                    <span className="group-hover:opacity-70 transition-opacity">
                      {l.label}
                    </span>
                    <span className="text-white/50 group-hover:opacity-70 transition-opacity text-2xl">
                      ›
                    </span>
                  </Link>
                ))}
              </div>

              {/* Membership section */}
              <div className="mt-8 flex flex-col gap-5">
                <div className="border-y border-white/30 py-4 flex justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/nike (1).png" alt="Nike" className="w-16 h-auto" />
                </div>

                <p className="text-white/90 text-sm leading-relaxed">
                  Become a <span className="font-bold">Nike Member</span> for
                  the best products, inspiration and stories in sport.{" "}
                  <Link href="/join" className="underline opacity-70">
                    Learn more
                  </Link>
                </p>

                <div className="flex gap-3">
                  <Link
                    href="/join"
                    className="flex-1 text-center text-sm text-white py-2.5 rounded-full font-bold bg-black hover:bg-[#1a1a1a] transition-colors tracking-wider uppercase"
                  >
                    Join Us
                  </Link>
                  <Link
                    href="/signin"
                    className="flex-1 text-center text-sm text-white py-2.5 rounded-full font-bold border-2 border-white/40 hover:border-white transition-colors tracking-wider uppercase"
                  >
                    Sign In
                  </Link>
                </div>
              </div>

              {/* Icon links */}
              <div className="mt-auto pt-8 flex flex-col gap-4 border-t border-white/20">
                {BURGER_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="text-sm font-semibold">{item.label}</span>
                  </Link>
                ))}
              </div>
            </BurgerMenu>
          </div>
        </div>
      </nav>
    </div>
  );
}
