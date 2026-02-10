"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Playfair_Display, Space_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
});

const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400", "700"],
});

// Block 2 Data: System Types
const systemTypes = [
    {
        title: "Plataformas de negocio",
        description: "Sistemas que ordenan operaciones, datos y decisiones."
    },
    {
        title: "Productos SaaS B2B",
        description: "Pensados para crecer sin perder control ni legibilidad."
    },
    {
        title: "Automatización e IA aplicada",
        description: "Reducir fricción operativa sin romper procesos existentes."
    },
    {
        title: "Arquitectura para escalar",
        description: "Bases técnicas que permiten crecer sin rehacerlo todo."
    }
];

// Block 3 Data: Thinking Principles
const principles = [
    "La arquitectura es una decisión de negocio.",
    "Escalar es mantener claridad bajo presión.",
    "Automatizar antes que añadir personas.",
    "La IA debe integrarse con criterio, no imponerse.",
    "El software debe reducir fricción, no crearla."
];

export function Approach() {
    const isMobile = useIsMobile();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center py-20 px-8 sm:px-20 md:px-28 lg:px-40 bg-white dark:bg-black overflow-hidden relative">

            <motion.div
                className="w-full max-w-5xl z-10"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-10%" }}
            >

                {/* BLOCK 1: CONTEXT REAL (Truth Anchor) */}
                <motion.div variants={item} className="mb-24 md:mb-32">
                    <h2 className={cn(
                        "text-3xl md:text-5xl font-light text-black dark:text-white mb-8 leading-tight",
                        playfair.className
                    )}>
                        Sistemas reales. Contextos reales.
                    </h2>
                    <p className="text-lg md:text-xl text-black/70 dark:text-white/70 font-light leading-relaxed max-w-2xl">
                        Construir en producción cambia la forma de pensar. He trabajado en productos que se usan a diario,
                        con equipos reales y usuarios reales. La experiencia en producción exige criterio.
                    </p>
                </motion.div>


                {/* BLOCK 2: SYSTEM TYPES (Your Territory) */}
                <motion.div variants={item} className="mb-24 md:mb-32">
                    <div className="mb-12 border-b border-black/10 dark:border-white/10 pb-4">
                        <span className={cn(
                            "text-xs md:text-sm tracking-widest uppercase text-black/50 dark:text-white/50",
                            spaceMono.className
                        )}>
                            Qué construyo
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                        {systemTypes.map((type, idx) => (
                            <div key={idx} className="group">
                                <h3 className={cn(
                                    "text-xl md:text-2xl font-normal text-black dark:text-white mb-3 group-hover:text-black/80 transition-colors",
                                    playfair.className
                                )}>
                                    {type.title}
                                </h3>
                                <p className="text-base text-black/60 dark:text-white/60 font-light leading-relaxed">
                                    {type.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>


                {/* BLOCK 3: THINKING (Decisions > Features) */}
                <motion.div variants={item}>
                    <div className="mb-12 border-b border-black/10 dark:border-white/10 pb-4">
                        <span className={cn(
                            "text-xs md:text-sm tracking-widest uppercase text-black/50 dark:text-white/50",
                            spaceMono.className
                        )}>
                            Cómo pienso
                        </span>
                    </div>

                    <ul className="space-y-6">
                        {principles.map((principle, idx) => (
                            <li key={idx} className="flex items-start gap-4">
                                <span className="text-black/30 dark:text-white/30 font-light mt-1">—</span>
                                <span className={cn(
                                    "text-xl md:text-3xl text-black/80 dark:text-white/80 font-light leading-tight",
                                    playfair.className
                                )}>
                                    {principle}
                                </span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

            </motion.div>
        </div>
    );
}
