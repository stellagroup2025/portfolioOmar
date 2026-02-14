"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import React from 'react';
import { useIsMobile } from "@/hooks/use-mobile";
import { Playfair_Display, Space_Mono, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ArrowRight, Mail, Linkedin } from "lucide-react";

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

export function Contact() {
  const isMobile = useIsMobile();
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("contacto@omarsomoza.es");
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="w-full h-dvh bg-[#faf9f6] flex flex-col items-center justify-center relative overflow-hidden px-6 md:px-12">

      <div className="w-full max-w-5xl z-20 flex flex-col items-center text-center">

        {/* HEADLINE BLOCK */}
        <div className="flex flex-col items-center mb-16 md:mb-24">
          <h2 className={cn(
            "text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] text-black font-normal leading-[1.1] md:leading-tight mb-6 md:mb-8 max-w-4xl",
            playfair.className
          )}>
            Los caminos se reconocen<br className="hidden md:block" /> cuando llega el momento.
          </h2>

          <p className={cn(
            "text-base md:text-lg text-black/50 font-normal tracking-wide",
            spaceMono.className
          )}>
            Nada es casual.
          </p>
        </div>

        {/* CONTACT ACTIONS BLOCK */}
        <div className="flex flex-col items-center gap-12 md:gap-16">

          {/* EMAIL - PRIMARY */}
          <div className="relative group flex flex-col items-center">
            <a
              href={isMobile ? undefined : "mailto:contacto@omarsomoza.es"}
              onClick={(e) => {
                if (isMobile) {
                  e.preventDefault();
                  handleCopy(e);
                }
              }}
              onContextMenu={handleCopy}
              className="relative cursor-pointer"
            >
              <span className={cn(
                "text-2xl md:text-3xl text-black font-normal tracking-tight pb-0.5 border-b-[1px] border-transparent transition-all duration-300 group-hover:border-black",
                inter.className
              )}>
                contacto@omarsomoza.es
              </span>
            </a>

            {/* HOVER / FEEDBACK SUBTEXT */}
            <div className="h-6 mt-2 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className={cn("text-xs md:text-sm text-green-600 font-medium tracking-wide", spaceMono.className)}
                  >
                    COPIADO
                  </motion.span>
                ) : (
                  <motion.span
                    key="actions"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0 }} // Hidden by default
                    whileInView={{ opacity: 1 }} // Show logic handled mostly by CSS group-hover on parent usually, but here we want it on email hover. 
                    // Actually, simpler to use standard CSS opacity for hover state if not copied.
                    className={cn(
                      "text-[10px] md:text-xs text-black/30 tracking-widest uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100", // This group-hover needs to be on a parent of both
                      spaceMono.className
                    )}
                  >
                    {/* Controlled by parent hover */}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Static "Escribir · Copiar" that fades out when copied */}
              {!copied && (
                <span className={cn(
                  "absolute text-[10px] md:text-xs text-black/30 tracking-widest uppercase opacity-0 transition-opacity duration-300 pointer-events-none transform translate-y-0",
                  "group-hover:opacity-100", // We need a parent group wrapper
                  spaceMono.className
                )}>
                  Copiar (Clic dcho.)
                </span>
              )}
            </div>
          </div>

          {/* LINKEDIN - SECONDARY */}
          <a
            href="https://www.linkedin.com/in/omar-somoza-230b71228/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "text-base md:text-lg text-black/60 hover:text-black transition-colors duration-300 flex items-center gap-2",
              inter.className
            )}
          >
            Nos vemos en LinkedIn
            <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>

        </div>

      </div>
    </div>
  );
}
