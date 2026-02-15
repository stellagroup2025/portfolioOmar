"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { OrganicOrderBackground } from "@/components/organic-order-background";
import { Playfair_Display, Space_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface HomeProps {
  onOpenMenu?: () => void;
  onNavigate?: (section: string) => void;
  isInitialLoad?: boolean;
}

// Helper Component for Typewriter (Moving outside Home to prevent re-renders)
const letterVariant = {
  hidden: { opacity: 0, y: 10 }, // Slight slide-up for fluidity
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" } // Smoother, fluid appearance
  }
};

const TypewriterLine = ({ text, delay, className = "", isInitialLoad }: { text: string, delay: number, className?: string, isInitialLoad: boolean }) => {
  const letterContainer = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: isInitialLoad ? delay : 0,
        staggerChildren: 0.07, // Slower typing speed (was 0.03)
      }
    }
  };

  return (
    <motion.span
      className={cn("inline-block", className)}
      variants={letterContainer}
      initial="hidden"
      animate="show"
    >
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={letterVariant}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export function Home({ onOpenMenu, onNavigate, isInitialLoad = false }: HomeProps) {
  const isMobile = useIsMobile();
  const [startParticles, setStartParticles] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  // Phase 4: Trigger particles early so they're rising by the time the growth arrow appears (~9.8s)
  // Particles need ~2.5s to transition through chaos → forming → growth (upward)
  useEffect(() => {
    if (isInitialLoad) {
      const timer = setTimeout(() => {
        setStartParticles(true);
      }, 7000); // Start early so upward motion syncs with arrow at 9.8s

      // Phase 7: Welcome Message (10.5s -> 14.5s)
      const timerWelcomeShow = setTimeout(() => setShowWelcome(true), 10500);
      const timerWelcomeHide = setTimeout(() => setShowWelcome(false), 14500); // Extended duration (4s total)

      return () => {
        clearTimeout(timer);
        clearTimeout(timerWelcomeShow);
        clearTimeout(timerWelcomeHide);
      };
    } else {
      setStartParticles(true); // Immediate if not initial load
    }
  }, [isInitialLoad]);

  // Animation Variants with "Organic/Contemplative" timing
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: (customDelay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: isInitialLoad ? customDelay : 0,
        duration: 0.9,
        ease: [0.4, 0.0, 0.2, 1], // Requested contemplative easing
      }
    })
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: (customDelay: number) => ({
      opacity: 1,
      transition: {
        delay: isInitialLoad ? customDelay : 0,
        duration: 0.9,
        ease: [0.4, 0.0, 0.2, 1]
      }
    })
  };

  return (
    <div className="relative w-full h-dvh flex flex-col justify-between p-6 pt-20 sm:p-12 md:p-16 lg:p-24 overflow-hidden">
      <OrganicOrderBackground startAnimation={startParticles} />

      {/* Top Bar: Clean & Minimal */}
      <motion.div
        className="w-full flex justify-end items-start z-10"
      >
        {/* Empty or minimal branding if needed later */}
      </motion.div>

      {/* Main Manifesto Content */}
      <div className="w-full z-10 max-w-5xl mt-auto mb-auto">
        {/* Principio 01 - Subtle reveal with Headline */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          custom={1.4} // Sync with first headline line
          className="mb-12 text-center md:text-left"
        >
          <span className="block w-full md:w-auto text-sm md:text-base tracking-[0.25em] uppercase text-black/40 font-medium">
            Principio 01
          </span>
        </motion.div>

        {/* Phase 3: Headline (Typewriter Effect) */}
        <h1 className={cn(
          "font-light tracking-tight text-black mb-0 md:mb-16",
          "text-[2.5rem] leading-[1.15] md:text-[3.25rem] lg:text-[4rem] xl:text-[4.2rem] md:leading-[0.98]",
          playfair.className
        )}
          aria-label="Cuando las ideas encuentran forma, el crecimiento es natural."
        >
          {/* Mobile Layout */}
          <div className="flex flex-col items-center md:hidden">
            {/* Mobile Delays calculated for 0.07s/char */}
            <TypewriterLine text="Cuando las ideas" delay={2.4} className="block" isInitialLoad={isInitialLoad} />
            <TypewriterLine text="encuentran forma," delay={3.6} className="block" isInitialLoad={isInitialLoad} />
            <TypewriterLine text="el crecimiento es" delay={4.9} className="opacity-90 block" isInitialLoad={isInitialLoad} />
            <TypewriterLine text="natural." delay={5.5} className="opacity-90 block" isInitialLoad={isInitialLoad} />
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex flex-col items-start">
            {/* Desktop Delays calculated for 0.07s/char */}
            <TypewriterLine text="Cuando las ideas encuentran" delay={2.4} className="block" isInitialLoad={isInitialLoad} />
            <TypewriterLine text="forma," delay={4.4} className="block" isInitialLoad={isInitialLoad} />
            <TypewriterLine text="el crecimiento es natural." delay={5.0} className="opacity-90 block" isInitialLoad={isInitialLoad} />
          </div>
        </h1>

        {/* Phase 5: Formula (Sequential Reveal) */}
        <div
          className={cn(
            "flex flex-col gap-12 items-center md:items-start max-w-4xl",
            "mt-12 pb-4 md:mt-0 md:pb-0"
          )}
        >
          {/* The Formula */}
          <div className="space-y-2">
            <h2 className={cn(
              "text-base md:text-3xl text-black/85 font-normal leading-relaxed tracking-wide whitespace-nowrap text-center md:text-left",
              spaceMono.className
            )}>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isInitialLoad ? 7.5 : 0, duration: 0.5 }}
                className="inline-block opacity-60"
              >
                Idea
              </motion.span>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: isInitialLoad ? 8.0 : 0, duration: 0.5 }}
                className="mx-2 md:mx-4 opacity-40 inline-block"
              >
                +
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isInitialLoad ? 8.5 : 0, duration: 0.5 }}
                className="inline-block opacity-100"
              >
                Estructura
              </motion.span>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: isInitialLoad ? 9.0 : 0, duration: 0.5 }}
                className="mx-2 md:mx-4 opacity-40 inline-block"
              >
                =
              </motion.span>

              {/* Crecimiento with Upward Arrow Animation */}
              <span className="inline-flex items-center gap-1 relative">
                <motion.span
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ delay: isInitialLoad ? 9.5 : 0, duration: 0.8, type: "spring", stiffness: 100 }}
                  className="inline-block border-b border-black/30 pb-1 font-medium text-black"
                >
                  Crecimiento
                </motion.span>

                {/* Disappearing Arrow Effect */}
                <motion.span
                  initial={{ opacity: 0, y: 5, x: 0 }}
                  animate={{ opacity: [0, 1, 0], y: -25 }} // Straight up and vanishes
                  transition={{
                    delay: isInitialLoad ? 9.8 : 0, // Starts slightly after word appears
                    duration: 1.5,
                    ease: "easeOut",
                    times: [0, 0.2, 1]
                  }}
                  className="absolute -right-6 top-1"
                >
                  <ArrowUp className="w-5 h-5 text-black/60" />
                </motion.span>
              </span>
            </h2>
          </div>

          {/* Desktop: Strategy/Tech Text - Visible below formula */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isInitialLoad ? 14.5 : 0, duration: 1.0 }}
            className="py-2 hidden 2xl:inline-block"
          >
            <p className={cn(
              "text-xs md:text-sm font-bold tracking-[0.15em] uppercase text-black/60",
              spaceMono.className
            )}>
              Estrategia Técnica &nbsp;·&nbsp; Arquitectura Escalable &nbsp;·&nbsp; Desarrollo de Producto
            </p>
          </motion.div>

        </div>
      </div>

      {/* Phase 7: Welcome Message (Bottom Center) */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className={cn(
              "absolute bottom-48 md:bottom-16 left-0 w-full text-center text-black/40 italic text-xl md:text-2xl tracking-widest pointer-events-none whitespace-nowrap z-30",
              playfair.className
            )}
          >
            Bienvenido
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom: Menu Trigger (Mobile Only -> Now < 2xl) */}
      <motion.div
        className="w-full flex flex-col items-center justify-end z-20 pb-12 gap-6 2xl:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: isInitialLoad ? 11.0 : 0, duration: 2.5, ease: "easeInOut" }}
      >
        {/* Subtle Menu Trigger - Mobile Only (CSS controlled) */}
        <button
          onClick={onOpenMenu}
          className={cn(
            "block 2xl:hidden",
            "text-xs uppercase tracking-[0.3em] font-medium p-4", // Increased size to text-xs, reduced weight to font-medium
            "text-black hover:text-black/70",
            "z-50",
            spaceMono.className
          )}
        >
          <motion.span
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 1, // Reduced delay to 1s
                }
              }
            }}
            aria-hidden
          >
            {Array.from("MÁS SECCIONES →").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>
        </button>
      </motion.div>
    </div>
  );
}
