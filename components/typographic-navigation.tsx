import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Playfair_Display, Space_Mono } from "next/font/google"
import { Menu, X } from "lucide-react"

// Use Playfair Display as a stylish alternative
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
})

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
  isTransitioning: boolean
  isMobile: boolean
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function TypographicNavigation({ activeSection, setActiveSection, isTransitioning, isMobile, isOpen, setIsOpen }: NavigationProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  // State for delayed visibility (Staggered 2s start, 1 by 1)
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    // Start revealing after 2000ms
    const timer1 = setTimeout(() => setRevealedCount(1), 2000);
    const timer2 = setTimeout(() => setRevealedCount(2), 2400); // +400ms
    const timer3 = setTimeout(() => setRevealedCount(3), 2800); // +400ms
    const timer4 = setTimeout(() => setRevealedCount(4), 3200); // +400ms

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

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
      transition: { duration: 0.3, transitionEnd: { display: "none" } }
    },
    open: {
      display: "flex",
      opacity: 1,
      pointerEvents: "auto" as const,
      transition: { duration: 0.4 }
    }
  }

  // Si estamos en la página de inicio, mostramos la navegación
  // Si estamos en la página de inicio, mostramos la navegación
  if (activeSection !== "home") return null;

  // Variants for desktop container
  // const desktopContainerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.1,
  //       delayChildren: 1.5, // 1.5s delay for desktop
  //       duration: 1.5
  //     }
  //   }
  // }

  // const desktopItemVariants = {
  //   hidden: { opacity: 0, x: 20, filter: "blur(5px)" },
  //   visible: {
  //     opacity: 1,
  //     x: 0,
  //     filter: "blur(0px)",
  //     transition: { duration: 0.8 }
  //   }
  // }

  return (
    <>
      {/* --- MOBILE/OVERLAY NAVIGATION (Overlay visible on all screens if open) --- */}
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "fixed top-6 right-4 sm:right-6 z-[70] text-black/40 hover:text-black transition-colors focus:outline-none md:hidden", // Added md:hidden back
            "text-sm font-bold tracking-widest uppercase",
            spaceMono.className
          )}
          aria-label="Toggle Menu"
        >
          {isOpen ? "CLOSE" : "MENU"}
        </button>

        {/* Menu Overlay (Visible on all screens when open) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-[60] bg-[#faf9f6]/95 backdrop-blur-md flex flex-col items-center justify-center gap-8"
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              exit="closed"
              variants={mobileMenuVariants}
            >
              {/* Close Button Removed - Handled by Toggle Button */}

              <nav className="flex flex-col items-center gap-8">
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
                      "text-4xl font-light tracking-wide text-black/80 hover:text-black transition-colors italic",
                      playfair.className,
                      activeSection === item.id && "font-medium text-black"
                    )}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- DESKTOP NAVIGATION (Visible >= md) --- */}
      {/* --- DESKTOP NAVIGATION (Visible >= md) --- */}
      <nav
        className="fixed right-12 xl:right-24 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-end gap-6 pointer-events-none"
      // initial="hidden"
      // animate="visible"
      // variants={desktopContainerVariants}
      >
        {navItems.map((item, index) => {
          const isActive = activeSection === item.id;
          const isHovered = hoveredItem === item.id;
          const isRevealed = index < revealedCount;

          return (
            <div key={item.id} className="relative pointer-events-auto">
              <button
                onClick={() => setActiveSection(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                // Accessibility: reveal all immediately on focus
                onFocus={() => setRevealedCount(4)}
                className={cn(
                  "text-5xl md:text-6xl lg:text-7xl xl:text-[6.5rem] font-bold tracking-tight italic block text-right leading-none outline-none",
                  "transition-all ease-in-out", // Base transition props
                  playfair.className,

                  // Dynamic Duration: Fast on interaction, Slow on reveal
                  (isHovered || isActive) ? "duration-500" : "duration-[2500ms]",

                  // 1. Active State
                  isActive
                    ? "text-black opacity-100 scale-105 -translate-x-8"
                    : "",

                  // 2. Inactive States
                  !isActive && [
                    // Hover State
                    isHovered
                      ? "opacity-80 text-black scale-100 -translate-x-4"
                      : "translate-x-0", // Reset translate if not hovered

                    // Reveal State (if not hovered)
                    !isHovered && (isRevealed ? "text-black opacity-50 motion-reduce:opacity-50" : "text-black opacity-10")
                  ]
                )}
              >
                {item.label}
              </button>
            </div>
          );
        })}
      </nav>
    </>
  )
}
