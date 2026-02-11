"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Playfair_Display, Space_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { ArrowRight, Mail, Linkedin } from "lucide-react";
import { SparkBackground } from "@/components/spark-background";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

type Tab = 'hablemos' | 'conectar';

export function Contact() {
  const isMobile = useIsMobile();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("contacto@omarsomoza.es");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-dvh bg-[#faf9f6] flex flex-col items-center justify-center relative overflow-hidden px-6 pb-6 pt-32 md:px-12 md:pb-12 md:pt-40">

      {/* BACKGROUND */}
      <SparkBackground />

      <div className="w-full max-w-4xl z-10 flex flex-col items-center text-center gap-10 md:gap-14">

        {/* HEADLINE */}
        <h2 className={cn("text-3xl md:text-5xl lg:text-7xl text-black font-normal leading-tight", playfair.className)}>
          Hay ideas que no necesitan un proceso.<br />
          <span className="text-black/40 italic">Solo el momento adecuado.</span>
        </h2>

        {/* SUBHEADLINE */}
        <p className="text-lg md:text-2xl text-black/60 font-light leading-relaxed max-w-2xl">
          A veces, una conversación es suficiente.
        </p>

        {/* MAIN CTA - LINKEDIN */}
        <a
          href="https://www.linkedin.com/in/omar-somoza-230b71228/"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-2xl md:text-3xl text-black border-b border-black/20 hover:border-black transition-all duration-300 pb-1 italic font-medium no-underline hover:pr-4",
            playfair.className
          )}
        >
          Nos vemos en LinkedIn &rarr;
        </a>

        {/* SECONDARY - EMAIL WITH COPY FUNCTION */}
        <div className="flex flex-col md:flex-row items-center gap-2 text-base md:text-lg text-black/40 font-light mt-4 mb-8">
          <span>o escríbeme en</span>

          <button
            onClick={handleCopy}
            className="relative group inline-flex flex-col items-center justify-center align-baseline"
          >
            <span className={cn(
              "text-black/60 hover:text-black transition-colors border-b border-transparent hover:border-black/20 pb-0.5",
              copied && "text-black border-black"
            )}>
              contacto@omarsomoza.es
            </span>

            {/* FEEDBACK - Adjusted for Mobile to avoid overlap */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 h-4 flex items-center justify-center whitespace-nowrap pointer-events-none w-full">
              <span className={cn(
                "absolute font-sans text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ease-out text-black/40",
                !copied ? "opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0" : "opacity-0"
              )}>
                Copiar
              </span>

              <span className={cn(
                "absolute font-sans text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ease-out text-green-600 font-bold",
                copied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
              )}>
                ¡Copiado!
              </span>
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
