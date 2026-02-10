"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { OrganicOrderBackground } from "@/components/organic-order-background";
import { Playfair_Display, Space_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export function Home() {
  const isMobile = useIsMobile();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: [0.22, 1, 0.36, 1], // Custom cubic bezier for "heavy" feel
      },
    },
  };

  // Main Manifesto Content (Clean & Static)

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-12 md:p-16 lg:p-24 overflow-hidden">
      <OrganicOrderBackground />

      {/* Top Bar: Clean & Minimal */}
      <motion.div
        className="w-full flex justify-end items-start z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        {/* Empty or minimal branding if needed later */}
      </motion.div>

      {/* Main Manifesto Content */}
      <motion.div
        className="w-full z-10 max-w-5xl mt-auto mb-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="mb-12">
          <span className="block text-sm md:text-base tracking-[0.25em] uppercase text-black/40 font-medium">
            Principio 01
          </span>
        </motion.div>

        <motion.h1
          className={cn(
            "font-light tracking-tight text-black mb-0 md:mb-16",
            isMobile ? "text-[2.5rem] leading-[1.15]" : "text-[3.25rem] md:text-[4rem] lg:text-[4.2rem] leading-[0.98]",
            playfair.className
          )}
          variants={item}
        >
          {isMobile ? (
            // Mobile: Natural flow, no forced breaks that might isolate weirdly
            <>
              Cuando las ideas<br /> encuentran forma,<br />
              <span className="opacity-90 mt-4 block">el crecimiento es natural.</span>
            </>
          ) : (
            // Desktop: Editorial pause structure
            <>
              Cuando las ideas encuentran <br />
              forma, <br />
              <span className="opacity-90">el crecimiento es natural.</span>
            </>
          )}
        </motion.h1>

        <motion.div
          className={cn(
            "flex flex-col gap-12 items-start max-w-4xl",
            isMobile && "mt-[35vh]" // Push content down on mobile (Below fold)
          )}
          variants={item}
        >
          {/* The Formula: Idea ↔ Forma + Tiempo = Crecimiento (Increased weight/contrast) */}
          <div className="space-y-2">
            <h2 className={cn(
              "text-xl md:text-3xl text-black/85 font-normal leading-relaxed tracking-wide",
              spaceMono.className
            )}>
              <span className="opacity-60">Idea</span> <span className="mx-2 opacity-90">↔</span> <span className="opacity-100">Forma</span>
              <span className="mx-2 md:mx-4 opacity-50">+</span>
              <span className="opacity-70">Tiempo</span>
              <span className="mx-2 md:mx-4 opacity-50">=</span>
              <span className="border-b border-black/30 pb-1">Crecimiento</span>
            </h2>
          </div>

          {/* Micro-copy: Strategy Technical Triangle - High Contrast & Bold (Kept as requested) */}
          <div className="py-2 inline-block">
            <p className={cn(
              "text-xs md:text-sm font-bold tracking-[0.15em] uppercase text-black/60", // Increased contrast for mobile
              spaceMono.className
            )}>
              Estrategia Técnica &nbsp;·&nbsp; Arquitectura Escalable &nbsp;·&nbsp; Desarrollo
            </p>
          </div>

        </motion.div>
      </motion.div>

      {/* Bottom: Scroll Indicator */}
      <motion.div
        className="w-full flex justify-center items-end z-10 pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-2 animate-bounce opacity-20 hover:opacity-100 transition-opacity duration-500">
          <span className={cn("text-[10px] uppercase tracking-widest", spaceMono.className)}>Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </div>
      </motion.div>
    </div>
  );
}
