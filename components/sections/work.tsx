import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Playfair_Display, Space_Mono } from "next/font/google"; // Removed Inter
import { ThinkingParticles } from "@/components/thinking-particles";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "900"] });
// Removed const inter = Inter(...) - using global font-sans instead
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export function Work() {
  const [activeTab, setActiveTab] = useState<'building' | 'systems'>('building');

  // Animation variants
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
    <div className="w-full h-dvh bg-[#faf9f6] flex flex-col relative overflow-hidden">

      {/* BACKGROUND PARTICLES (Subtle Neural Network) */}
      <ThinkingParticles />

      {/* --- TOP NAVIGATION (BUILDING | SYSTEMS) --- */}
      <div className="w-full z-20 pt-24 px-6 md:px-12 lg:px-24 flex-none">
        <nav className="w-full border-b border-black/10 pb-4 md:pb-6 flex items-center gap-12 md:gap-16">
          <TabButton
            isActive={activeTab === 'building'}
            onClick={() => setActiveTab('building')}
            label="BUILDING"
          />
          <TabButton
            isActive={activeTab === 'systems'}
            onClick={() => setActiveTab('systems')}
            label="SYSTEMS"
          />
        </nav>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 overflow-y-auto no-scrollbar pb-24 pt-8 md:pt-12 z-10">
        <AnimatePresence mode="wait">

          {/* TAB: BUILDING (QRONNECT) */}
          {activeTab === 'building' && (
            <motion.div
              key="building"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col gap-16 md:gap-24"
            >
              {/* HEADER */}
              <div className="space-y-4">
                <span className={cn("text-xs tracking-[0.3em] uppercase text-black/40 font-bold block mb-2", spaceMono.className)}>
                  Current Focus
                </span>
                <h2 className={cn("text-6xl md:text-8xl lg:text-[7rem] leading-[0.9] text-black tracking-tight", playfair.className)}>
                  Qronnect
                </h2>
                <p className={cn("text-xl md:text-2xl text-black/50 italic font-light max-w-2xl mt-4", playfair.className)}>
                  Infraestructura SaaS de Fidelización Multitenant.
                </p>
              </div>

              {/* ARCHITECTURAL PILLARS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 border-l border-black/10 pl-6 md:pl-12">
                <ArchitecturalBlock
                  title="ESCALA NATIVA"
                  body="Arquitectura diseñada para absorber crecimiento exponencial sin refactorización. La separación estricta entre entorno de negocio y entorno de cliente permite escalar inquilinos (tenants) de forma horizontal infinita."
                />
                <ArchitecturalBlock
                  title="IA ESTRUCTURAL"
                  body="La inteligencia no es una 'feature' añadida. Es la capa base que orquesta la segmentación de usuarios y la predicción de churn en tiempo real. El sistema aprende del comportamiento, no solo reacciona."
                />
                <ArchitecturalBlock
                  title="FRICTIONLESS UX"
                  body="La reducción de carga cognitiva es nuestra ventaja competitiva. Optimizamos cada milisegundo de interacción. Menos fricción significa mayor retención y menor coste de soporte."
                />
                <ArchitecturalBlock
                  title="CAPITAL READY"
                  body="Código, métricas y documentación estructurados para due diligence técnica inmediata. Un activo preparado para la inversión, no un prototipo que requiere reingeniería."
                />
              </div>

              {/* FOOTER NOTE */}
              <div className="border-t border-black/5 pt-8 mt-8">
                <p className={cn("text-sm text-black/40 font-mono", spaceMono.className)}>
                  Estado: <span className="text-black/70">Piloto Operativo Real</span>
                </p>
              </div>
            </motion.div>
          )}

          {/* TAB: SYSTEMS (PRODUCTION LED) */}
          {activeTab === 'systems' && (
            <motion.div
              key="systems"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col gap-16"
            >
              <div className="space-y-4">
                <span className={cn("text-xs tracking-[0.3em] uppercase text-black/40 font-bold block mb-2", spaceMono.className)}>
                  Led in Production
                </span>
                <h2 className={cn("text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-black tracking-tight max-w-3xl", playfair.className)}>
                  Sistemas complejos operando en el mundo real.
                </h2>
              </div>

              <div className="grid gap-16 md:gap-24 mt-8">
                <SystemRow
                  title="ERP Multitenant B2B"
                  role="Arquitectura & Dirección"
                  desc="Sistema central que unifica operaciones fragmentadas. Gestiona facturación compleja, inventario distribuido y relaciones con clientes en un entorno unificado. Riesgo técnico minimizado mediante modularidad estricta."
                />
                <SystemRow
                  title="Gestion One"
                  role="Diseño de Producto & IA"
                  desc="Plataforma de centralización operativa. Fusiona email, gestión de tareas y CRM bajo una capa de IA simplificada. Diseñada para reducir el ruido operativo y centralizar la toma de decisiones críticas diarias."
                />
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

// --- SUBCOMPONENTS ---

function TabButton({ isActive, onClick, label }: { isActive: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-xs md:text-sm tracking-[0.2em] font-medium transition-all duration-300 relative py-2 uppercase select-none",
        spaceMono.className,
        isActive ? "text-black opacity-100" : "text-black/30 hover:text-black/60 hover:opacity-100"
      )}
    >
      {label}
      {isActive && (
        <motion.div
          layoutId="activeWorkTabLine"
          className="absolute bottom-0 left-0 w-full h-[1px] bg-black"
          transition={{ duration: 0.3 }}
        />
      )}
    </button>
  );
}

function ArchitecturalBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-col gap-4 group">
      <span className={cn(
        "text-xs tracking-widest uppercase text-black/40 font-bold group-hover:text-black/70 transition-colors duration-500",
        spaceMono.className
      )}>
        {title}
      </span>
      <p className={cn(
        "text-lg md:text-xl lg:text-xl text-black/80 font-sans font-light leading-relaxed",
      )}>
        {body}
      </p>
    </div>
  );
}

function SystemRow({ title, role, desc }: { title: string; role: string; desc: string }) {
  return (
    <div className="group border-t border-black/5 pt-8 first:border-none first:pt-0">
      <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 mb-4">
        <h3 className={cn("text-3xl md:text-4xl text-black group-hover:pl-4 transition-all duration-500", playfair.className)}>
          {title}
        </h3>
        <span className={cn("text-xs md:text-sm text-black/40 font-mono uppercase tracking-wider", spaceMono.className)}>
          {role}
        </span>
      </div>
      <p className={cn(
        "text-lg md:text-xl text-black/70 font-sans font-light leading-relaxed max-w-3xl group-hover:pl-4 transition-all duration-500 delay-75",
      )}>
        {desc}
      </p>
    </div>
  );
}
