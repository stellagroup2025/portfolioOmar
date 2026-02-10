"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Playfair_Display, Space_Mono } from "next/font/google"
import { ThinkingParticles } from "@/components/thinking-particles"
import { Badge } from "@/components/ui/badge"

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] })

export function Work() {
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab] = useState<string>('fintech-erp')

  const caseStudies = [
    {
      id: "fintech-erp",
      label: "Fintech ERP",
      title: "ERP Multitenant B2B",
      subtitle: "Unificación Operativa a Escala",
      context: "Empresa con crecimiento rápido, sistemas fragmentados y alto coste operativo.",
      decision: "Unificar operaciones en una plataforma multitenant centralizada.",
      architecture: ".NET Core + React + Redis + SQL + Mongo.",
      impact: "Menos fricción operativa, base sólida para nuevas líneas de negocio.",
      tags: ["Arquitectura Distribuida", "Sistemas Críticos"],
    },
    {
      id: "proptech-scale",
      label: "PropTech",
      title: "Plataforma de Inversión",
      subtitle: "Democratización de Activos",
      context: "Necesidad de procesar miles de micro-inversiones en tiempo real.",
      decision: "Arquitectura serverless para manejar picos de tráfico y ledger inmutable.",
      architecture: "Next.js + AWS Lambda + DynamoDB.",
      impact: "Procesamiento de $5M+ sin incidentes de seguridad.",
      tags: ["FinTech", "Serverless"],
    },
    {
      id: "logistics-ai",
      label: "Logística IA",
      title: "Motor de Optimización",
      subtitle: "Eficiencia vía Algoritmos",
      context: "Flota de distribución operando con rutas estáticas ineficientes.",
      decision: "Implementar optimización dinámica basada en tráfico real.",
      architecture: "Python (OR-Tools) + Google Maps API.",
      impact: "Reducción del 18% en costes operativos.",
      tags: ["Algoritmos", "Real-time Data"],
    },
  ]

  // ANIMATION VARIANTS
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

  const currentProject = caseStudies.find(p => p.id === activeTab) || caseStudies[0]
  const currentIndex = caseStudies.findIndex(p => p.id === activeTab)
  const nextProject = caseStudies[(currentIndex + 1) % caseStudies.length]

  return (
    <div className="w-full h-full bg-[#faf9f6] flex flex-col items-center justify-center relative overflow-hidden p-6 md:p-12">

      {/* BACKGROUND */}
      <ThinkingParticles />

      <div className="w-full max-w-5xl z-10">

        {/* CONTENT AREA - FIXED HEIGHT */}
        <div className="h-[55vh] md:h-[60vh] flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={fade}
              initial="hidden"
              animate="show"
              exit="exit"
              className="w-full max-w-4xl"
            >
              <span className={cn("block mb-6 md:mb-8 text-xs tracking-[0.25em] uppercase text-black/40 font-bold", spaceMono.className)}>
                0{currentIndex + 1} Caso de Estudio
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                {/* LEFT: TITLE & CONTEXT */}
                <div className="flex flex-col gap-6">
                  <div>
                    <h2 className={cn("text-3xl md:text-5xl text-black font-normal leading-tight mb-2", playfair.className)}>
                      {currentProject.title}
                    </h2>
                    <p className={cn("text-lg md:text-xl text-black/50 italic", playfair.className)}>
                      {currentProject.subtitle}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm md:text-base text-black/70 font-light leading-relaxed">
                      <span className="font-medium text-black/90">Reto:</span> {currentProject.context}
                    </p>
                    <p className="text-sm md:text-base text-black/70 font-light leading-relaxed">
                      <span className="font-medium text-black/90">Solución:</span> {currentProject.decision}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab(nextProject.id)}
                    className={cn(
                      "text-lg md:text-xl text-black italic text-left hover:underline decoration-1 underline-offset-4 transition-all w-fit mt-4",
                      playfair.className
                    )}
                  >
                    Siguiente: {nextProject.label} &rarr;
                  </button>
                </div>

                {/* RIGHT: SPECS & IMPACT */}
                <div className="flex flex-col justify-center gap-6 bg-white/40 backdrop-blur-sm p-6 rounded-sm border border-black/5">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-black/40 block mb-2 font-bold">Arquitectura</span>
                    <p className="text-sm md:text-base text-black/80 font-mono leading-relaxed border-l-2 border-black/10 pl-4">
                      {currentProject.architecture}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-widest text-black/40 block mb-2 font-bold">Impacto</span>
                    <p className="text-sm md:text-base text-black/80 font-medium leading-relaxed">
                      {currentProject.impact}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentProject.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="bg-black/5 text-black/60 hover:bg-black/10 font-normal text-xs rounded-sm px-2 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* NAVIGATION */}
        <div className="w-full flex justify-start border-t border-black/5 pt-4">
          <div className="flex items-center gap-8 md:gap-16 overflow-x-auto scrollbar-hide">
            {caseStudies.map((project) => (
              <button
                key={project.id}
                onClick={() => setActiveTab(project.id)}
                className={cn(
                  "text-xs md:text-sm tracking-widest uppercase transition-all duration-300 relative py-2 whitespace-nowrap",
                  spaceMono.className,
                  activeTab === project.id ? "text-black font-bold" : "text-black/30 hover:text-black/60"
                )}
              >
                {project.label}
                {activeTab === project.id && (
                  <motion.div
                    layoutId="activeWorkTab"
                    className="absolute bottom-0 left-0 w-full h-px bg-black"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
