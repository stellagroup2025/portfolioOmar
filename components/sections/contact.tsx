"use client";

import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Playfair_Display, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ArrowRight, Mail, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({ subsets: ["latin"] });

export function Contact() {
  const isMobile = useIsMobile();
  const containerRef = useRef(null);

  // Title Animation
  const titleText = "Conversemos";
  const letters = titleText.split("");

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        duration: 1.0,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 1.5, duration: 0.8 }
    }
  };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden bg-[#faf9f6]">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 md:px-16">

        <div className="max-w-4xl w-full text-center" ref={containerRef}>
          <motion.div
            className="mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className={cn("text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-black mb-6", playfair.className)}>
              {letters.map((letter, index) => (
                <motion.span key={index} variants={letterVariants} className="inline-block">
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <p className="text-xl md:text-2xl text-black/60 font-light max-w-2xl mx-auto leading-relaxed">
              Sin formularios. Sin ventas. <br />
              Solo una conversación sobre si tiene sentido construir algo juntos.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <a
                href="mailto:contacto@omarsomoza.es"
                className="text-xl md:text-2xl text-black border-b border-black/20 hover:border-black transition-all duration-300 pb-2 italic font-light"
              >
                contacto@omarsomoza.es
              </a>
            </div>

            <div className="pt-8 opacity-60 hover:opacity-100 transition-opacity duration-300">
              <a
                href="https://linkedin.com/in/omarsomoza"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-sm uppercase tracking-widest text-black/40 hover:text-black"
              >
                <span>O conecta en LinkedIn</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-12 left-0 w-full text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <p className="text-sm text-black/30 font-light tracking-widest uppercase">
            EST. 2025 • Omar Somoza • Product & Strategy
          </p>
        </motion.div>

      </div>
    </div>
  );
}
