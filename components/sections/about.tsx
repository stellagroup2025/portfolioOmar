"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { AboutBackground } from "@/components/about-background";
import { cn } from "@/lib/utils";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

import Image from "next/image";

export function About() {
  const isMobile = useIsMobile();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="w-full h-full flex flex-col items-start justify-start py-20 px-6 sm:px-12 md:px-24 lg:px-32 overflow-y-auto scrollbar-hide">
      <AboutBackground />

      <motion.div
        className="w-full max-w-4xl z-10 pb-32"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Header - Subtle */}
        <motion.div variants={item} className="mb-16 pl-6 md:pl-10">
          <span className="block text-xs md:text-sm tracking-[0.25em] uppercase text-foreground/50 font-medium">
            Filosofía
          </span>
        </motion.div>

        {/* Reading Zone - Improved Contrast & Air */}
        <div className="backdrop-blur-[2px] bg-background/20 rounded-sm p-6 md:p-10 border border-white/5">
          {/* Main Text - Philosophy */}
          <motion.div variants={item} className="space-y-12 mb-24">
            <p className={cn(
              "text-2xl md:text-3xl text-foreground/90 font-light leading-snug",
              playfair.className
            )}>
              Construir no es ejecutar rápido.<br />
              Es elegir bien el camino.
            </p>

            <p className="text-lg md:text-xl text-muted-foreground/90 font-light leading-loose max-w-2xl">
              He aprendido que el software es solo un medio. Las ideas necesitan forma para existir,
              pero el crecimiento real solo se sostiene con tiempo, disciplina y ajuste constante.
            </p>

            <p className="text-lg md:text-xl text-muted-foreground/90 font-light leading-loose max-w-2xl">
              El error y el pivotaje son inseparables del proceso. No busco la perfección inmediata, sino la claridad
              que surge de iterar con intención. Creo en el valor que se construye en sinergia, donde ganar–ganar
              es el único principio sostenible.
            </p>

            <p className="text-lg md:text-xl text-muted-foreground/90 font-light leading-loose max-w-2xl">
              Prefiero el largo plazo a los resultados efímeros.<br />
              La calma y la estructura frente al caos.
            </p>
          </motion.div>

          {/* Image - Visual Pause (Secondary) */}
          <motion.div variants={item} className="mb-20 flex justify-end pr-4">
            <div className="relative w-full max-w-sm grayscale opacity-80 hover:opacity-100 transition-opacity duration-700 mix-blend-multiply dark:mix-blend-normal">
              <Image
                src="/omardubai.png"
                alt="Omar Somoza"
                width={400}
                height={400}
                className="rounded-sm object-cover shadow-2xl shadow-black/5"
                priority
              />
            </div>
          </motion.div>

          {/* Closing - Open Idea (No CTA) */}
          <motion.div variants={item} className="mb-8">
            <div className="h-px w-16 bg-foreground/20 mb-10" />
            <p className={cn(
              "text-xl md:text-2xl text-foreground/70 font-normal italic leading-relaxed",
              playfair.className
            )}>
              "No sé exactamente cómo trabaja,<br />
              pero sé que quiero construir con alguien así."
            </p>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}
