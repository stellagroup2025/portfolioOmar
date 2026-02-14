"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Playfair_Display, Space_Mono, Inter } from "next/font/google";
import Image from "next/image";
import { StructureBackground } from "@/components/structure-background";
import { useIsMobile } from "@/hooks/use-mobile";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

type Tab = 'perfil' | 'enfoque' | 'aporte';

export function About() {
  const [activeTab, setActiveTab] = useState<Tab>('perfil');
  const isMobile = useIsMobile();

  const contentVariants = {
    hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] }
    },
    exit: {
      opacity: 0,
      y: -10,
      filter: "blur(4px)",
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  return (
    <div className="w-full h-dvh bg-[#faf9f6] relative overflow-hidden">

      {/* BACKGROUND */}
      <StructureBackground />

      {/* SCROLLABLE WRAPPER */}
      <div className="absolute inset-0 w-full h-full overflow-y-auto">
        <div className="w-full min-h-full flex flex-col justify-start md:justify-center px-6 py-24 md:px-12 lg:px-24">

          {/* MAIN LAYOUT GRID (Desktop: 2 Cols, Mobile: Stack) */}
          <div className="w-full max-w-7xl mx-auto z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

            {/* --- LEFT COLUMN (Text Content) --- */}
            <div className="flex flex-col gap-12 lg:gap-16 order-1">

              {/* 1. STATEMENT BLOCK */}
              <div className="flex flex-col gap-6 items-start text-left">
                <h1 className={cn("text-4xl md:text-5xl lg:text-6xl text-black leading-tight tracking-tight", playfair.className)}>
                  Omar Somoza.
                </h1>

                <div className={cn("flex flex-col gap-2 opacity-80", playfair.className)}>
                  <p className="text-xl md:text-2xl lg:text-3xl text-black/80 font-normal">
                    Sistemas que alinean personas.
                  </p>
                  <p className="text-xl md:text-2xl lg:text-3xl text-black/60 font-normal">
                    Arquitectura para ordenar la complejidad.
                  </p>
                  <p className="text-xl md:text-2xl lg:text-3xl text-black/60 font-normal">
                    Responsabilidad para sostener la escala.
                  </p>
                  <p className="text-xl md:text-2xl lg:text-3xl text-black/40 font-normal italic">
                    Sinergia como sistema.
                  </p>
                </div>
              </div>

              {/* MOBILE IMAGE PLACEMENT (If Mobile, show image here between Concept and Text) */}
              <div className="lg:hidden w-full relative aspect-[4/5] max-h-[60vh] grayscale mix-blend-multiply opacity-90 my-4">
                <Image
                  src="/omardubai.png"
                  alt="Omar Somoza Skyline"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* VISUAL SEPARATION (Desktop only, or small on mobile) */}
              <div className="w-full h-px bg-gradient-to-r from-black/20 to-transparent" />

              {/* 3. TABS SECTION */}
              <div className="flex flex-col gap-8 w-full">

                {/* TABS NAVIGATION */}
                <div className="flex items-center gap-8 border-b border-black/5 pb-4 w-fit overflow-x-auto no-scrollbar">
                  {[
                    { id: 'perfil', label: 'PERFIL' },
                    { id: 'enfoque', label: 'ENFOQUE' },
                    { id: 'aporte', label: 'APORTE' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as Tab)}
                      className={cn(
                        "text-xs md:text-sm tracking-[0.2em] uppercase transition-all duration-300 relative py-2 whitespace-nowrap",
                        spaceMono.className,
                        activeTab === tab.id ? "text-black font-bold" : "text-black/40 hover:text-black/70"
                      )}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeAboutTabLine"
                          className="absolute bottom-0 left-0 w-full h-[1px] bg-black"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* TAB CONTENT */}
                <div className="min-h-[150px]">
                  <AnimatePresence mode="wait">
                    {activeTab === 'perfil' && (
                      <motion.div
                        key="perfil"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="space-y-6"
                      >
                        <p className={cn("text-lg md:text-xl text-black/70 font-light leading-relaxed", inter.className)}>
                          Trayectoria definida por la construcción de productos digitales escalables. Experiencia acumulada en entornos de alta incertidumbre y exigencia técnica.
                        </p>
                        <p className={cn("text-lg md:text-xl text-black/70 font-light leading-relaxed", inter.className)}>
                          Enfoque en la intersección entre ingeniería de software y estrategia de producto. La capacidad técnica se utiliza para resolver problemas de negocio, no para acumular deuda tecnológica.
                        </p>
                      </motion.div>
                    )}

                    {activeTab === 'enfoque' && (
                      <motion.div
                        key="enfoque"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="space-y-6"
                      >
                        <p className={cn("text-lg md:text-xl text-black/70 font-light leading-relaxed", inter.className)}>
                          Estructura sobre caos. La arquitectura de software no es un fin, sino el medio para garantizar operatividad continua.
                        </p>
                        <p className={cn("text-lg md:text-xl text-black/70 font-light leading-relaxed", inter.className)}>
                          Se prioriza la legibilidad, la mantenibilidad y la resistencia del sistema. Las decisiones se toman basándose en compensaciones (trade-offs) claras, no en tendencias.
                        </p>
                      </motion.div>
                    )}

                    {activeTab === 'aporte' && (
                      <motion.div
                        key="aporte"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="space-y-6"
                      >
                        <p className={cn("text-lg md:text-xl text-black/70 font-light leading-relaxed", inter.className)}>
                          Visión de largo plazo aplicada a la ejecución diaria. Identificación temprana de riesgos estructurales y operativos.
                        </p>
                        <p className={cn("text-lg md:text-xl text-black/70 font-light leading-relaxed", inter.className)}>
                          Diseño de sistemas que permiten a los equipos escalar sin fricción. Entrega de activos digitales robustos, documentados y listos para absorber capital.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </div>

            {/* --- RIGHT COLUMN (Image - Desktop Only) --- */}
            <div className="hidden lg:block relative h-full min-h-[600px] w-full order-2">
              <div className="relative w-full h-full grayscale mix-blend-multiply opacity-90 p-8">
                {/* Padding lightly to not touch edges as requested */}
                <Image
                  src="/omardubai.png"
                  alt="Omar Somoza Skyline"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
