"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence
import { useIsMobile } from "@/hooks/use-mobile";
import { Playfair_Display, Space_Mono } from "next/font/google"; // Removed unnecessary imports
import { cn } from "@/lib/utils";
import { ThinkingParticles } from "@/components/thinking-particles"; // Import new background

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
});

const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400", "700"],
});

// TYPES & DATA
type Tab = 'manifesto' | 'systems' | 'principles';

const systemTypes = [
    {
        title: "Plataformas de negocio",
        description: "Operaciones, datos y decisiones."
    },
    {
        title: "Productos SaaS B2B",
        description: "Escalabilidad y control."
    },
    {
        title: "Automatización e IA",
        description: "Eficiencia sin fricción."
    },
    {
        title: "Arquitectura",
        description: "Bases para crecer."
    }
];

const principles = [
    "Arquitectura es negocio.",
    "Escalar es mantener claridad.",
    "Automatizar > Contratar.",
    "IA con criterio, no por moda.",
    "Reducir fricción, no crearla."
];

export function Approach() {
    const isMobile = useIsMobile();
    const [activeTab, setActiveTab] = useState<Tab>('manifesto');

    // ANIMATION VARIANTS
    const fade = {
        hidden: { opacity: 0, y: 20, filter: "blur(10px)" }, // blur effect
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
        <div className="w-full h-dvh bg-[#faf9f6] flex flex-col items-center justify-between relative overflow-hidden p-6 pt-24 md:p-12">

            {/* ABSTRACT BACKGROUND */}
            <ThinkingParticles />

            <div className="w-full max-w-5xl z-10">
                {/* CONTENT AREA - FIXED HEIGHT TO PREVENT JUMPS */}
                <div className="h-[55vh] md:h-[60vh] flex items-center justify-center mb-8">
                    <AnimatePresence mode="wait">
                        {activeTab === 'manifesto' && (
                            <motion.div
                                key="manifesto"
                                variants={fade}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                className="w-full max-w-3xl flex flex-col gap-8 md:gap-12"
                            >
                                <span className={cn("text-xs tracking-[0.25em] uppercase text-black/40 font-bold", spaceMono.className)}>
                                    01 Manifiesto
                                </span>
                                <h2 className={cn("text-3xl md:text-5xl lg:text-7xl leading-[1.05] text-black font-normal", playfair.className)}>
                                    Sistemas reales.<br />
                                    <span className="opacity-50">Contextos reales.</span>
                                </h2>
                                <div className="flex flex-col gap-6 md:gap-8">
                                    <p className="text-lg md:text-2xl text-black/60 font-light leading-relaxed max-w-xl">
                                        Construir en producción exige criterio. No busco código perfecto, busco sistemas que sobrevivan al uso real.
                                    </p>
                                    <button
                                        onClick={() => setActiveTab('systems')}
                                        className={cn(
                                            "text-lg md:text-xl text-black italic text-left hover:underline decoration-1 underline-offset-4 transition-all w-fit mt-4",
                                            playfair.className
                                        )}
                                    >
                                        Explorar mis sistemas &rarr;
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'systems' && (
                            <motion.div
                                key="systems"
                                variants={fade}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                className="w-full"
                            >
                                <div className="flex justify-between items-baseline mb-8 md:mb-12">
                                    <span className={cn("text-xs tracking-[0.25em] uppercase text-black/40 font-bold", spaceMono.className)}>
                                        02 Qué construyo
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-8">
                                    {systemTypes.map((type, idx) => (
                                        <div key={idx} className="flex flex-col gap-2">
                                            <h3 className={cn("text-xl md:text-3xl text-black font-normal", playfair.className)}>
                                                {type.title}
                                            </h3>
                                            <p className="text-sm md:text-base text-black/50 leading-relaxed font-normal">
                                                {type.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setActiveTab('principles')}
                                    className={cn(
                                        "text-lg md:text-xl text-black italic text-left hover:underline decoration-1 underline-offset-4 transition-all w-fit",
                                        playfair.className
                                    )}
                                >
                                    Ver principios &rarr;
                                </button>
                            </motion.div>
                        )}

                        {activeTab === 'principles' && (
                            <motion.div
                                key="principles"
                                variants={fade}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                className="w-full max-w-4xl"
                            >
                                <span className={cn("block mb-8 md:mb-12 text-xs tracking-[0.25em] uppercase text-black/40 font-bold", spaceMono.className)}>
                                    03 Cómo pienso
                                </span>
                                <div className="flex flex-col gap-6 md:gap-8 mb-8">
                                    {principles.map((p, idx) => (
                                        <div key={idx} className="flex items-baseline gap-6 border-b border-black/5 pb-4 last:border-0 pl-0">
                                            <span className="text-xs text-black/20 font-mono">0{idx + 1}</span>
                                            <h3 className={cn("text-xl md:text-4xl text-black/80 font-normal", playfair.className)}>
                                                {p}
                                            </h3>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setActiveTab('manifesto')}
                                    className={cn(
                                        "text-sm md:text-base text-black/40 italic text-left hover:text-black transition-all w-fit",
                                        playfair.className
                                    )}
                                >
                                    Volver al inicio ↺
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* TAB NAVIGATION (Fixed Position) */}
                <div className="w-full flex justify-start border-t border-black/5 pt-4">
                    <div className="flex items-center gap-8 md:gap-16">
                        {[
                            { id: 'manifesto', label: 'Manifiesto' },
                            { id: 'systems', label: 'Sistemas' },
                            { id: 'principles', label: 'Principios' }
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
                                        layoutId="activeTabIndicator"
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
