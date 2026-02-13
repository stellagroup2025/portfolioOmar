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

interface TypographicNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isInitialLoad?: boolean;
  isTransitioning?: boolean;
  menuSource?: 'header' | 'hero_cta';
  onHeaderOpen?: () => void;
}

export function TypographicNavigation({
  activeSection,
  setActiveSection,
  isOpen,
  setIsOpen,
  isInitialLoad = false,
  isTransitioning = false,
  menuSource = 'header',
  onHeaderOpen,
}: TypographicNavigationProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [revealedCount, setRevealedCount] = useState(0);

  const handleOpen = () => {
    if (onHeaderOpen) onHeaderOpen();
    setIsOpen(true);
  };

  useEffect(() => {
    // If initial load, wait for full choreography (approx 9.5s - sync with menu trigger)
    // If returning, quick fade in (0.5s)
    const delayTime = isInitialLoad ? 9500 : 500;

    const timer = setTimeout(() => {
      // Staggered reveal (Slower - 600ms per item)
      setRevealedCount(1);
      setTimeout(() => setRevealedCount(2), 600);
      setTimeout(() => setRevealedCount(3), 1200);
      setTimeout(() => setRevealedCount(4), 1800);
    }, delayTime);

    return () => clearTimeout(timer);
  }, [isInitialLoad]);

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
      {/* --- MOBILE/OVERLAY NAVIGATION --- */}
      {/* Toggle Button (Hamburger / Close) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "fixed top-8 right-8 z-[60] px-4 py-2 hover:bg-black/5 rounded-full transition-colors 2xl:hidden pointer-events-auto",
              spaceMono.className
            )}
            onClick={handleOpen}
            aria-label="Menu"
          >
            <span className="text-xs font-bold tracking-widest uppercase text-black">MENU</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* --- MOBILE OVERLAY --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-sm z-[55] flex flex-col items-center justify-center pointer-events-auto 2xl:hidden"
          >
            {/* Top Right Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className={cn(
                "absolute top-8 right-8 z-[70] transition-colors p-2 rounded-full",
                menuSource === 'header'
                  ? "hover:bg-black/5 opacity-100"
                  : "opacity-30 hover:opacity-100"
              )}
              aria-label="Close menu"
            >
              {menuSource === 'header' ? (
                <X className="w-8 h-8" />
              ) : (
                <span className={cn("text-xs font-bold tracking-widest uppercase", spaceMono.className)}>CERRAR</span>
              )}
            </button>

            {/* Bottom Center Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className={cn(
                "absolute bottom-20 left-1/2 -translate-x-1/2 z-[70] transition-colors p-2 rounded-full",
                menuSource === 'hero_cta'
                  ? "hover:bg-black/5 opacity-100"
                  : "opacity-30 hover:opacity-100"
              )}
              aria-label="Close menu"
            >
              {menuSource === 'hero_cta' ? (
                <X className="w-8 h-8" />
              ) : (
                <span className={cn("text-xs font-bold tracking-widest uppercase", spaceMono.className)}>CERRAR</span>
              )}
            </button>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center gap-12"
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- DESKTOP NAVIGATION (Visible >= 2xl) --- */}
      <nav
        className={cn(
          "fixed right-12 xl:right-24 top-1/2 -translate-y-1/2 z-50 hidden 2xl:flex flex-col items-end gap-6 pointer-events-none transition-opacity duration-1000",
          (isInitialLoad && revealedCount === 0) ? "opacity-0" : "opacity-100" // Completely invisible until timer hits
        )}
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

                  // Dynamic Duration: Fast on reveal/interact, slow only for subtle effects later if needed
                  // Increased to 2500ms for ghostly/gradual paint (was 1500)
                  (isHovered || isActive) ? "duration-500" : "duration-[2500ms]",

                  // 1. Active State
                  isActive
                    ? "text-black opacity-100 scale-105 -translate-x-8 blur-0"
                    : "",

                  // 2. Inactive States
                  !isActive && [
                    // Hover State
                    isHovered
                      ? "opacity-80 text-black scale-100 -translate-x-4 blur-0"
                      : "translate-x-0", // Reset translate if not hovered

                    // Reveal State (if not hovered)
                    // Added blur transition: starts blurry and focused as it appears
                    !isHovered && (isRevealed ? "text-black opacity-50 blur-0" : "text-black opacity-0 blur-sm")
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
