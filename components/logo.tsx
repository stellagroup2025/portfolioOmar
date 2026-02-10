"use client";

import { motion } from "framer-motion";
import { Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400"] });

interface LogoProps {
  onClick?: () => void;
}

export function Logo({ onClick }: LogoProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={cn(
        "text-lg md:text-xl text-black/80 hover:text-black/60 transition-colors duration-500 cursor-pointer select-none",
        playfair.className
      )}
      whileTap={{ scale: 0.98 }}
    >
      Omar Somoza
    </motion.button>
  );
}
