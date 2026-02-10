"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Playfair_Display } from "next/font/google"

// Use Playfair Display as a stylish alternative
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
})

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
  isTransitioning: boolean
  isMobile: boolean
}

export function TypographicNavigation({ activeSection, setActiveSection, isTransitioning, isMobile }: NavigationProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { id: "approach", label: "Thinking" },
    { id: "work", label: "Work" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ]

  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  }

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      pointerEvents: "none" as const,
      transition: { duration: 0.3 }
    },
    open: {
      opacity: 1,
      pointerEvents: "auto" as const,
      transition: { duration: 0.4 }
    }
  }

  // Si estamos en la página de inicio, mostramos la navegación
  if (activeSection === "home") {
    if (isMobile) {
      // Mobile Layout: Hidden Menu with Overlay
      return (
        <>
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="fixed top-6 right-6 z-50 p-2 text-black mix-blend-difference focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span className={cn(
              "block text-sm font-bold tracking-widest uppercase",
              playfair.className
            )}>
              {isOpen ? "Close" : "Menu"}
            </span>
          </button>

          {/* Mobile Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-[#faf9f6]/95 backdrop-blur-md flex flex-col items-center justify-center"
            variants={mobileMenuVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
          >
            <div className="flex flex-col items-center justify-center space-y-10">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    if (!isTransitioning) {
                      setActiveSection(item.id);
                      setIsOpen(false);
                    }
                  }}
                  className={cn(
                    "text-5xl font-black tracking-wide pointer-events-auto italic text-black",
                    playfair.className,
                  )}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )
    } else {
      // Desktop Layout - Significantly reduced weight and dominance
      return (
        <motion.div
          className="absolute top-0 right-0 w-full h-full flex items-center justify-center pointer-events-none"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {navItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="absolute"
                variants={itemVariants}
                style={{
                  right: "5%", // Moved slightly more to the right
                  top: `${15 + index * 14}%`, // Added more spacing
                }}
              >
                <motion.button
                  onClick={() => !isTransitioning && setActiveSection(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    // Drastically reduced size and opacity for "Texture" feel
                    "text-4xl md:text-5xl lg:text-6xl xl:text-[5rem] font-bold tracking-wide pointer-events-auto relative italic transition-all duration-500",
                    hoveredItem === item.id ? "text-black opacity-100 scale-105" : "text-black/5 hover:text-black/20", // Very low opacity (5%)
                    playfair.className,
                  )}
                  whileHover={{ x: -10 }}
                  disabled={isTransitioning}
                >
                  <motion.span className="inline-block relative">
                    {item.label}
                  </motion.span>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )
    }
  }

  // Para las demás secciones, no mostramos la navegación tipográfica
  return null
}
