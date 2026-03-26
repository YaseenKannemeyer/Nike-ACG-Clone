"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReveal } from "@/lib/useReveal";

interface Story {
  tag: string;
  headline: string;
  body: string;
  cta: string;
  href: string;
  imageBg: string; // gradient or image url
  imageAlt: string;
  reverse?: boolean;
}

const STORIES: Story[] = [
  {
    tag: "GORE-TEX Technology",
    headline: "Waterproof.\nBreathable.\nUnstoppable.",
    body: "ACG's GORE-TEX collection is built for the most demanding wet-weather conditions. Fully sealed seams, weatherproof zips, and breathable membranes keep you dry and moving.",
    cta: "Shop GORE-TEX",
    href: "/shop?tag=gore-tex",
    imageBg:
      "linear-gradient(135deg, #0a1628 0%, #1a3a5c 50%, #FF7334 100%)",
    imageAlt: "GORE-TEX waterproof jacket",
  },
  {
    tag: "Trail Footwear",
    headline: "Ground\nControl.",
    body: "Multi-directional lugs, rock plates, and trail-specific cushioning systems. ACG trail shoes grip every surface from wet granite to loose scree.",
    cta: "Explore Trail Shoes",
    href: "/shop?category=Shoes",
    imageBg:
      "linear-gradient(135deg, #1a0a00 0%, #3d1a00 50%, #FF7334 100%)",
    imageAlt: "ACG trail running shoes",
    reverse: true,
  },
  {
    tag: "Technical Layering",
    headline: "Layer Up.\nMove Free.",
    body: "A complete system designed to work together. Base layers, mid layers, and shells engineered for unrestricted movement through extreme terrain.",
    cta: "Build Your Kit",
    href: "/shop?category=Clothing",
    imageBg:
      "linear-gradient(135deg, #0d1a0d 0%, #1a2d1a 50%, #2a4a2a 100%)",
    imageAlt: "ACG technical layering system",
  },
];

function StoryCard({ story, index }: { story: Story; index: number }) {
  const { ref, visible } = useReveal();

  return (
    <section
      // @ts-expect-error ref assignment
      ref={ref}
      className={`flex flex-col ${
        story.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      } min-h-[70vh] lg:min-h-[80vh]`}
    >
      {/* Visual panel */}
      <motion.div
        initial={{ opacity: 0, x: story.reverse ? 60 : -60 }}
        animate={visible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full lg:w-1/2 min-h-[50vw] lg:min-h-0 relative overflow-hidden"
        style={{ background: story.imageBg }}
      >
        {/* Texture overlay */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Decorative index number */}
        <div className="absolute bottom-6 right-6 font-display text-[8rem] leading-none text-white/5 select-none pointer-events-none">
          {String(index + 1).padStart(2, "0")}
        </div>
        {/* Orange accent corner */}
        <div className="absolute top-0 left-0 w-12 h-1 bg-[#FF7334]" />
        <div className="absolute top-0 left-0 w-1 h-12 bg-[#FF7334]" />
      </motion.div>

      {/* Text panel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full lg:w-1/2 bg-[#0A0A0A] flex items-center px-8 py-16 lg:px-20 lg:py-0"
      >
        <div className="max-w-md">
          <p className="text-[#FF7334] text-xs font-bold tracking-[0.3em] uppercase mb-6">
            {story.tag}
          </p>
          <h2 className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-none text-white mb-8 whitespace-pre-line">
            {story.headline}
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-10 max-w-sm">
            {story.body}
          </p>
          <Link
            href={story.href}
            className="inline-flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-white border-b-2 border-[#FF7334] pb-1 hover:text-[#FF7334] transition-colors group"
          >
            {story.cta}
            <span className="transition-transform group-hover:translate-x-2 duration-300">→</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default function EditorialSection() {
  return (
    <div className="bg-[#0A0A0A]">
      {STORIES.map((story, i) => (
        <StoryCard key={story.tag} story={story} index={i} />
      ))}
    </div>
  );
}
