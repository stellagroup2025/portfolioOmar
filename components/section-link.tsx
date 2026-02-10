"use client"

import { motion } from "framer-motion"

interface SectionLinkProps {
  onClick: () => void
  isTransitioning: boolean
  section: string
}

export function SectionLink({ onClick, isTransitioning, section }: SectionLinkProps) {
  // Determinar qué letras mostrar según la sección
  const letters = section === "work" ? ["K", "R", "O", "W"] : ["E", "M", "O", "H"]

  return (
    <motion.button
      onClick={() => !isTransitioning && onClick()}
      className="fixed top-1/2 left-2 md:left-6 -translate-y-1/2 text-black/40 hover:text-black transition-colors duration-300 pointer-events-auto z-[60] flex flex-col items-center mix-blend-multiply"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      disabled={isTransitioning}
    >
      <div className="flex flex-col items-center mb-6">
        {letters.map((letter, index) => (
          <span key={index} className="text-[10px] md:text-xs font-medium tracking-widest -rotate-90 mb-3 md:mb-5 uppercase">
            {letter}
          </span>
        ))}
      </div>
      <motion.div className="w-[1px] h-16 md:h-24 bg-black/20 group-hover:bg-black/60 transition-colors" />
    </motion.button>
  )
}
