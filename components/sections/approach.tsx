"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Playfair_Display, Space_Mono, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThinkingParticles } from "@/components/thinking-particles";

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    variable: "--font-playfair",
});

const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-space-mono",
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    variable: "--font-inter",
});

// CHAPTERS DATA - "Structural Framework"
const chapters = [
    {
        id: "systems",
        label: "SISTEMAS",
        title: "Arquitectura es negocio.",
        body: "La escalabilidad es una decisión arquitectónica, no un parche. Sistemas donde la complejidad está encapsulada, no expuesta. La estabilidad es la base del crecimiento."
    },
    {
        id: "decision",
        label: "DECISIÓN",
        title: "Decidir es eliminar ruido.",
        body: "La mayoría de decisiones no generan impacto — lo diluyen. El valor está en identificar las pocas que realmente mueven la aguja y ejecutarlas con claridad. Menos decisiones, mejor dirección."
    },
    {
        id: "ux",
        label: "UX",
        title: "Reducir el desgaste cognitivo.",
        body: "Cada interacción innecesaria es fricción acumulada. La interfaz es la lógica del negocio hecha visible — cuando funciona, desaparece. Un sistema bien diseñado no se explica, se entiende."
    },
    {
        id: "ia",
        label: "IA",
        title: "Inteligencia como utilidad.",
        body: "No es magia, es apalancamiento. La IA se integra donde reduce la carga cognitiva o acelera flujos de trabajo verificados. Implementación práctica sobre el hype."
    },
    {
        id: "teams",
        label: "EQUIPOS",
        title: "Cultura es el sistema operativo.",
        body: "La autonomía requiere límites claros. Entornos donde la documentación es un reflejo y la toma de decisiones está distribuida, no embotellada."
    },
    {
        id: "responsibility",
        label: "RESPONSABILIDAD",
        title: "La capacidad de responder.",
        body: "Responsabilidad no es obligación — es la habilidad de responder cuando la presión aparece. Asumir el peso de las decisiones difíciles sin delegar la incomodidad. La presión no se evita, se sostiene."
    },
    {
        id: "capital",
        label: "CAPITAL",
        title: "Eficiencia de recursos.",
        body: "Se construyen activos. Cada ciclo de desarrollo debe incrementar la valoración del producto, no solo su conteo de funcionalidades."
    }
];

export function Approach() {
    const [activeChapterId, setActiveChapterId] = useState("systems");

    // Find active chapter data & index
    const activeChapterIndex = chapters.findIndex(c => c.id === activeChapterId);
    const activeChapter = chapters[activeChapterIndex] || chapters[0];

    // Handle Next Button
    const handleNext = () => {
        const nextIndex = (activeChapterIndex + 1) % chapters.length;
        setActiveChapterId(chapters[nextIndex].id);
    };

    return (
        <div className="w-full h-dvh bg-[#faf9f6] flex flex-col relative overflow-hidden">

            {/* ABSTRACT BACKGROUND */}
            <ThinkingParticles />

            {/* --- TOP NAVIGATION (HORIZONTAL) --- */}
            <div className="w-full z-20 pt-24 px-6 md:px-12 lg:px-24">
                <nav className="w-full border-b border-black/10 pb-4 md:pb-6 overflow-x-auto no-scrollbar mask-gradient-right">
                    <ul className="flex items-center gap-8 md:gap-12 lg:gap-16 min-w-max">
                        {chapters.map((chapter) => (
                            <li key={chapter.id}>
                                <button
                                    onClick={() => setActiveChapterId(chapter.id)}
                                    className={cn(
                                        "text-xs md:text-sm tracking-[0.2em] font-medium transition-all duration-300 relative py-2 uppercase",
                                        activeChapterId === chapter.id
                                            ? "text-black opacity-100"
                                            : "text-black/30 hover:text-black/60 hover:opacity-100"
                                    )}
                                    style={{ fontFamily: 'var(--font-inter)' }} // Using Inter for UI
                                >
                                    {chapter.label}
                                    {activeChapterId === chapter.id && (
                                        <motion.div
                                            layoutId="activeChapterLine"
                                            className="absolute bottom-0 left-0 w-full h-[1px] bg-black"
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24 z-10 w-full max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeChapter.id}
                        initial={{ opacity: 0, y: 10 }} // Removed blur, kept subtle slide
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35, ease: "easeOut" }} // Faster, snappier
                        className="flex flex-col gap-8 md:gap-12"
                    >
                        {/* Title */}
                        <h2 className={cn(
                            "text-4xl md:text-5xl lg:text-7xl leading-[1.1] text-black font-normal tracking-tight max-w-4xl",
                            playfair.className
                        )}>
                            {activeChapter.title}
                        </h2>

                        {/* Body Text */}
                        <div className="w-12 h-[1px] bg-black/20 my-2" /> {/* Separator Line */}

                        <div className="flex flex-col gap-8 items-start">
                            <p className={cn(
                                "text-lg md:text-xl lg:text-2xl text-black/60 font-light leading-relaxed max-w-2xl",
                                inter.className // Using Inter for readability
                            )}>
                                {activeChapter.body}
                            </p>

                            {/* NEXT BUTTON */}
                            <button
                                onClick={handleNext}
                                className={cn(
                                    "flex items-center gap-2 text-sm md:text-base tracking-widest uppercase text-black/40 hover:text-black transition-colors mt-4 group",
                                    spaceMono.className
                                )}
                            >
                                <span>Siguiente</span>
                                <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* --- FOOTER / PAGINATION INDICATOR (OPTIONAL) --- */}
            <div className="w-full px-6 md:px-12 lg:px-24 pb-12 z-10 flex justify-between items-end opacity-20 hover:opacity-100 transition-opacity duration-500">
                <span className={cn("text-xs font-mono uppercase tracking-widest", spaceMono.className)}>
                    Thinking Framework
                </span>
                <span className={cn("text-xs font-mono uppercase tracking-widest", spaceMono.className)}>
                    {String(chapters.findIndex(c => c.id === activeChapterId) + 1).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}
                </span>
            </div>

        </div>
    );
}
