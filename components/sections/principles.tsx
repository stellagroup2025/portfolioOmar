"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
});

const principles = [
    {
        title: "El software debe reducir fricción, no añadirla.",
        description: "Si la tecnología complica la operación en lugar de simplificarla, es deuda técnica desde el día 1."
    },
    {
        title: "La arquitectura es una decisión de negocio.",
        description: "Cada elección técnica (monolito vs microservicios, build vs buy) impacta directamente en el P&L."
    },
    {
        title: "Automatizar antes de contratar.",
        description: "Los equipos pequeños y ágiles ganan cuando los procesos repetitivos están delegados a código."
    },
    {
        title: "IA como capa estructural, no como truco.",
        description: "Integración profunda que mejora la toma de decisiones, no solo chatbots superficiales."
    },
    {
        title: "Escalar sin perder legibilidad.",
        description: "Sistemas que el equipo del futuro pueda entender, mantener y evolver sin reescribir todo."
    }
];

export function Principles() {
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
        hidden: { opacity: 0, y: 20 },
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
        <div className="w-full min-h-full flex flex-col justify-center py-20 px-8 sm:px-20 md:px-28 lg:px-40 bg-background/50 backdrop-blur-sm">
            <motion.div
                className="w-full max-w-5xl"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-10%" }}
            >
                <div className="mb-16 md:mb-24">
                    <h2 className="text-sm tracking-[0.2em] uppercase text-foreground/50 font-light mb-4">
                        Cómo Pienso
                    </h2>
                    <p className={cn(
                        "text-3xl md:text-5xl font-light text-foreground leading-tight max-w-3xl",
                        playfair.className
                    )}>
                        Trabajo con principios claros.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-24">
                    {principles.map((principle, idx) => (
                        <motion.div
                            key={idx}
                            variants={item}
                            className="group"
                        >
                            <div className="h-px bg-foreground/10 w-full mb-6 group-hover:bg-foreground/30 transition-colors duration-500" />
                            <h3 className={cn(
                                "text-xl md:text-2xl font-medium mb-4 text-foreground/90 group-hover:text-foreground transition-colors duration-300",
                                playfair.className
                            )}>
                                {principle.title}
                            </h3>
                            <p className="text-base text-muted-foreground leading-relaxed font-light">
                                {principle.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
