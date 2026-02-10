"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Playfair_Display, Space_Mono } from "next/font/google";
import Image from "next/image";
import { StructureBackground } from "@/components/structure-background";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

type Tab = 'perfil' | 'filosofia' | 'vision';

export function About() {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<Tab>('perfil');

  // ANIMATION VARIANTS (Same as Approach)
  const fade = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: "blur(10px)",
      transition: { duration: 0.4, ease: "easeIn" }
    }
  };

  return (
    <div className="w-full h-full bg-[#faf9f6] flex flex-col items-center justify-center relative overflow-hidden p-6 md:p-12">

      {/* BACKGROUND */}
      <StructureBackground />

      <div className="w-full max-w-5xl z-10">
        {/* CONTENT AREA - FIXED HEIGHT */}
        <div className="h-[55vh] md:h-[60vh] flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">

            {/* TAB 1: PERFIL */}
            {activeTab === 'perfil' && (
              <motion.div
                key="perfil"
                variants={fade}
                initial="hidden"
                animate="show"
                exit="exit"
                className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-8 md:gap-16"
              >
                <div className="flex-1 space-y-6 md:space-y-8">
                  <span className={cn("text-xs tracking-[0.25em] uppercase text-black/40 font-bold", spaceMono.className)}>
                    01 Quién soy
                  </span>
                  <h2 className={cn("text-3xl md:text-5xl lg:text-6xl text-black font-normal leading-tight", playfair.className)}>
                    Omar Somoza.<br />
                    <span className="text-black/40 italic">Constructor.</span>
                  </h2>
                  <p className="text-lg md:text-xl text-black/60 font-light leading-relaxed">
                    Transformo complejidad técnica en sistemas funcionales. Mi trabajo es diseñar soluciones que operan, escalan y generan valor real desde el primer día.
                  </p>
                  <button
                    onClick={() => setActiveTab('filosofia')}
                    className={cn(
                      "text-lg md:text-xl text-black italic text-left hover:underline decoration-1 underline-offset-4 transition-all w-fit mt-4",
                      playfair.className
                    )}
                  >
                    Cómo trabajo &rarr;
                  </button>
                </div>

                {/* Image Profile */}
                <div className="relative w-48 h-48 md:w-80 md:h-80 grayscale opacity-90 hover:opacity-100 transition-opacity duration-700 mix-blend-multiply flex-shrink-0">
                  <Image
                    src="/omardubai.png"
                    alt="Omar Somoza"
                    fill
                    className="rounded-full md:rounded-sm object-cover shadow-2xl shadow-black/5"
                    priority
                  />
                </div>
              </motion.div>
            )}

            {/* TAB 2: FILOSOFÍA -> ENFOQUE */}
            {activeTab === 'filosofia' && (
              <motion.div
                key="filosofia"
                variants={fade}
                initial="hidden"
                animate="show"
                exit="exit"
                className="w-full max-w-3xl"
              >
                <span className={cn("block mb-8 md:mb-12 text-xs tracking-[0.25em] uppercase text-black/40 font-bold", spaceMono.className)}>
                  02 Enfoque
                </span>

                <div className="space-y-8 md:space-y-12">
                  <p className={cn(
                    "text-2xl md:text-4xl text-black/80 font-normal leading-snug",
                    playfair.className
                  )}>
                    "Construir no es ejecutar rápido. <br />
                    <span className="opacity-50 italic">Es elegir bien el camino."</span>
                  </p>

                  <div className="space-y-6">
                    <p className="text-base md:text-lg text-black/60 font-light leading-relaxed">
                      El software es un medio, no el fin. La calidad técnica solo importa si sostiene la operación del negocio de forma fiable.
                    </p>
                    <p className="text-base md:text-lg text-black/60 font-light leading-relaxed">
                      Mi metodología prioriza la claridad. Estructura frente al caos. Resultados sostenibles frente a parches temporales.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('vision')}
                    className={cn(
                      "text-lg md:text-xl text-black italic text-left hover:underline decoration-1 underline-offset-4 transition-all w-fit",
                      playfair.className
                    )}
                  >
                    Lo que aporto &rarr;
                  </button>
                </div>
              </motion.div>
            )}

            {/* TAB 3: VISIÓN -> APORTE */}
            {activeTab === 'vision' && (
              <motion.div
                key="vision"
                variants={fade}
                initial="hidden"
                animate="show"
                exit="exit"
                className="w-full max-w-3xl flex flex-col items-center text-center gap-8 md:gap-12"
              >
                <span className={cn("text-xs tracking-[0.25em] uppercase text-black/40 font-bold", spaceMono.className)}>
                  03 Aporte
                </span>

                <p className={cn(
                  "text-3xl md:text-5xl text-black/80 font-normal italic leading-relaxed",
                  playfair.className
                )}>
                  "Entregables claros. <br />
                  Sistemas robustos."
                </p>

                <p className="text-lg md:text-xl text-black/50 font-light leading-relaxed max-w-xl">
                  Aporto experiencia técnica para desbloquear problemas y visión de arquitectura para que el producto crezca sin romperse.
                </p>

                <button
                  onClick={() => setActiveTab('perfil')}
                  className={cn(
                    "text-sm md:text-base text-black/40 italic text-left hover:text-black transition-all w-fit mt-8",
                    playfair.className
                  )}
                >
                  Volver al perfil ↺
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* NAVIGATION */}
        <div className="w-full flex justify-start border-t border-black/5 pt-4">
          <div className="flex items-center gap-8 md:gap-16">
            {[
              { id: 'perfil', label: 'Perfil' },
              { id: 'filosofia', label: 'Enfoque' },
              { id: 'vision', label: 'Aporte' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={cn(
                  "text-xs md:text-sm tracking-widest uppercase transition-all duration-300 relative py-2",
                  spaceMono.className,
                  activeTab === tab.id ? "text-black font-bold" : "text-black/30 hover:text-black/60"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeAboutTab"
                    className="absolute bottom-0 left-0 w-full h-px bg-black"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
