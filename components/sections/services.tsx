"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const valueProps = [
  "Construcción de productos digitales desde cero",
  "Escalado de plataformas existentes sin romperlas",
  "Automatización de procesos críticos",
  "Sistemas con datos e IA integrados de forma responsable",
  "MVPs con visión de largo plazo"
];

export function Services() {
  const isMobile = useIsMobile();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Note: This component is currently unused in the main navigation (replaced by Principles)
  // But we might want to include it as a subsection of About or Strategy later.
  // For now, I will keep it as a standalone 'Value' component if needed.
  return (
    <div className="w-full h-full flex flex-col justify-center px-8 sm:px-20 md:px-28 lg:px-40">
      <motion.div
        className="w-full max-w-4xl"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-sm tracking-[0.2em] uppercase text-foreground/50 font-light mb-12">
          Dónde aporto más valor
        </h2>

        <ul className="space-y-8">
          {valueProps.map((prop, idx) => (
            <motion.li
              key={idx}
              variants={item}
              className="flex items-start gap-6 group"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-foreground/20 group-hover:bg-foreground/80 transition-colors duration-300 flex-shrink-0" />
              <span className={cn(
                "text-2xl md:text-4xl text-foreground/80 font-light leading-snug group-hover:text-foreground transition-colors duration-300",
                playfair.className
              )}>
                {prop}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
