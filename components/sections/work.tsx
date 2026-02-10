"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ExternalLink, ArrowRight, TrendingUp, Lightbulb, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { PageTransition } from "@/components/page-transition"
import { WorkBackground } from "@/components/work-background"
import { cn } from "@/lib/utils"
import { Playfair_Display } from "next/font/google"
import { Badge } from "@/components/ui/badge"

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] })

interface WorkProps {
  activeProject: string | null
  setActiveProject: (id: string | null) => void
}

export function Work({ activeProject, setActiveProject }: WorkProps) {
  const isMobile = useIsMobile()

  // Data schema updated for Calm Builder: Systems Built
  const caseStudies = [
    {
      id: "fintech-erp",
      title: "ERP Multitenant B2B",
      subtitle: "Unificación Operativa a Escala",
      context: "Empresa con crecimiento rápido, sistemas fragmentados y alto coste operativo manual.",
      decision: "Unificar operaciones en una plataforma multitenant con control fino de datos y escalabilidad.",
      architecture: ".NET Core + React + Redis + SQL + Mongo + IA para automatización.",
      impact: "Menos fricción operativa, base sólida para crecimiento y nuevas líneas de negocio.",
      tags: ["Arquitectura Distribuida", "Sistemas Críticos", "Automatización"],
    },
    {
      id: "proptech-scale",
      title: "Plataforma de Inversión Inmobiliaria",
      subtitle: "Democratización de Activos",
      context: "Necesidad de procesar miles de micro-inversiones en tiempo real con seguridad bancaria.",
      decision: "Arquitectura serverless para manejar picos de tráfico y ledger inmutable para transacciones.",
      architecture: "Next.js + AWS Lambda + DynamoDB + Stripe Connect.",
      impact: "Procesamiento de $5M+ en transacciones el primer año sin incidentes de seguridad.",
      tags: ["FinTech", "High Availability", "Serverless"],
    },
    {
      id: "logistics-ai",
      title: "Motor de Optimización Logística",
      subtitle: "Eficiencia vía Algoritmos",
      context: "Flota de distribución operando con rutas estáticas ineficientes y alto consumo.",
      decision: "Implementar optimización dinámica de rutas basada en tráfico y carga en tiempo real.",
      architecture: "Python (OR-Tools) + Google Maps API + React Native para conductores.",
      impact: "Reducción del 18% en costes operativos y mejora del 25% en tiempos de entrega.",
      tags: ["Algoritmos", "Logística", "Real-time Data"],
    },
  ]

  if (!activeProject) {
    return (
      <div className="w-full h-full flex flex-col relative">
        <WorkBackground />

        {/* Texto introductorio - Móvil: arriba, Desktop: izquierda */}
        <motion.div
          className={cn(
            "z-10",
            isMobile
              ? "px-6 pt-20 pb-8" // Móvil: parte superior con padding
              : "absolute left-8 sm:left-16 md:left-24 top-1/2 -translate-y-1/2 max-w-2xl", // Desktop: posición original
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className={cn(
              "font-bold font-playfair mb-6 text-foreground tracking-tight",
              isMobile ? "text-3xl text-center" : "text-4xl sm:text-5xl md:text-6xl text-left",
            )}
          >
            Sistemas Construidos
          </h1>

          <p className={cn("text-muted-foreground mb-4 font-light text-lg", isMobile ? "text-center" : "text-left")}>
            Sistemas construidos
          </p>
        </motion.div>

        {/* Navegación de proyectos */}
        <div className={cn("flex-1", isMobile ? "relative" : "absolute inset-0")}>
          <WorkNavigation projects={caseStudies} setActiveProject={setActiveProject} isMobile={isMobile} />
        </div>
      </div>
    )
  }

  const project = caseStudies.find((p) => p.id === activeProject)!

  return (
    <PageTransition>
      <div className="w-full h-full flex flex-col items-center justify-start py-12 px-4 sm:px-6 overflow-y-auto">
        <WorkBackground />

        <div className="w-full max-w-5xl mx-auto z-10 pt-4 pb-20">
          {/* Header del Caso */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center gap-2 mb-4">
              {project.tags.map((tag, i) => (
                <Badge key={i} variant="secondary" className="bg-secondary text-secondary-foreground hover:bg-secondary/80 font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1
              className={cn(
                "text-3xl md:text-5xl lg:text-6xl font-bold mb-2 tracking-tight text-foreground",
                playfair.className,
              )}
            >
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground font-playfair italic">
              {project.subtitle}
            </p>
          </motion.div>

          {/* Grid de Contenido Estratégico */}
          {/* Grid de Contenido Estratégico */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Columna Izquierda: Contexto & Decisión Clave */}
            <div className="space-y-8">
              <div className="bg-card/40 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-border shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="text-muted-foreground w-5 h-5" />
                  <h3 className="text-lg font-medium tracking-wide font-playfair text-foreground">Contexto & Decisión</h3>
                </div>

                <div className="mb-6">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Contexto</span>
                  <p className="text-foreground/90 leading-relaxed font-light">
                    {project.context}
                  </p>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Decisión Clave</span>
                  <p className="text-foreground leading-relaxed font-medium">
                    {project.decision}
                  </p>
                </div>
              </div>

              <div className="bg-primary text-primary-foreground p-6 sm:p-8 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="text-primary-foreground/80 w-5 h-5" />
                  <h3 className="text-lg font-medium tracking-wide font-playfair">Impacto</h3>
                </div>
                <p className="text-primary-foreground/90 leading-relaxed text-lg font-light">
                  {project.impact}
                </p>
              </div>
            </div>

            {/* Columna Derecha: Arquitectura */}
            <div className="bg-card/60 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-border shadow-md h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Target className="text-muted-foreground w-5 h-5" />
                  <h3 className="text-lg font-medium tracking-wide font-playfair text-foreground">Arquitectura</h3>
                </div>
                <p className="text-foreground/80 leading-relaxed text-lg font-mono text-sm border-l-2 border-foreground/10 pl-4 py-1">
                  {project.architecture}
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Tecnologías</h4>
                <ul className="space-y-3">
                  {project.tags.map((tag, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground text-sm">
                      <div className="w-1 h-1 rounded-full bg-foreground/40" />
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button
              onClick={() => setActiveProject(null)}
              className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors px-6 py-3"
            >
              <ArrowRight className="rotate-180 w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm uppercase tracking-widest">Volver al índice</span>
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

interface WorkNavigationProps {
  projects: any[]
  setActiveProject: (id: string | null) => void
  isMobile: boolean
}

function WorkNavigation({ projects, setActiveProject, isMobile }: WorkNavigationProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <motion.div
      className="absolute top-0 right-0 w-full h-full flex items-center justify-center pointer-events-none"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="absolute"
            variants={itemVariants}
            style={{
              right: isMobile ? "5%" : "10%",
              top: isMobile ? `${20 + index * 15}%` : `${25 + index * 18}%`,
            }}
          >
            <motion.button
              onClick={() => setActiveProject(project.id)}
              onMouseEnter={() => setHoveredItem(project.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`text-2xl sm:text-4xl md:text-5xl font-bold font-playfair tracking-tight transition-all duration-300 pointer-events-auto relative text-right block ${hoveredItem === project.id ? "text-foreground scale-105" : "text-foreground/40 blur-[1px] hover:blur-none"
                }`}
              whileHover={{ x: -20 }}
            >
              {project.title}
              <span
                className={`block text-xs sm:text-sm font-sans tracking-wide font-light mt-1 transition-opacity ${hoveredItem === project.id ? "opacity-100 text-muted-foreground" : "opacity-0"
                  }`}
              >
                {project.subtitle}
              </span>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
