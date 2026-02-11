import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Playfair_Display } from "next/font/google"
import { Menu, X } from "lucide-react"

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
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function TypographicNavigation({ activeSection, setActiveSection, isTransitioning, isMobile, isOpen, setIsOpen }: NavigationProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

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
  const desktopContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1.5, // 1.5s delay for desktop
        duration: 1.5
      }
    }
  }

  const desktopItemVariants = {
    hidden: { opacity: 0, x: 20, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8 }
    }
  }

  return (
    <>
      {/* --- MOBILE NAVIGATION (Visible < md) --- */}
      <div className="block md:hidden">
        {/* Toggle Button */}
        {/* Controlled by parent (Home) or local state if passed?
            actually page.tsx controls isOpen.
            We just render the overlay if isOpen is true.
            The trigger button is in Home.tsx.
            Wait, TypographicNavigation also had a toggle button internally in previous versions?
            Let's keep it simple: This component mainly renders the menu OVERLAY on mobile,
            and the SIDEBAR on desktop.
        */}

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-[#faf9f6]/95 z-40 flex flex-col items-center justify-center gap-8"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-8 right-8 p-2 text-black/60 hover:text-black"
                aria-label="Close Menu"
              >
                <X size={32} />
              </button>

              <nav className="flex flex-col items-center gap-8">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "text-4xl font-light tracking-wide text-black/80 hover:text-black transition-colors italic",
                      playfair.className,
                      activeSection === item.id && "font-medium text-black"
                    )}
                    whileHover={{ scale: 1.1 }}
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
      <motion.nav
        className="fixed right-12 xl:right-24 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-end gap-6 pointer-events-none"
        initial="hidden"
        animate="visible"
        variants={desktopContainerVariants}
      >
        {navItems.map((item) => (
          <motion.div key={item.id} className="relative pointer-events-auto" variants={desktopItemVariants}>
            <button
              onClick={() => setActiveSection(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={cn(
                "text-5xl md:text-6xl lg:text-7xl xl:text-[6.5rem] font-bold tracking-tight italic transition-all duration-700 block text-right leading-none",
                (activeSection === item.id || hoveredItem === item.id)
                  ? "text-black opacity-100 scale-105"
                  : "text-black/5 hover:text-black/20 blur-[0.5px] hover:blur-0",
                playfair.className
              )}
            >
              {item.label}
            </button>
          </motion.div>
        ))}
      </motion.nav>
    </>
  )
}
