"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Home } from "@/components/sections/home";
import { About } from "@/components/sections/about";
import { Work } from "@/components/sections/work";
import { Approach } from "@/components/sections/approach";
import { Contact } from "@/components/sections/contact";
import { TypographicNavigation } from "@/components/typographic-navigation";
import { SocialLinks } from "@/components/social-links";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { Logo } from "@/components/logo";
import { PageTransition } from "@/components/page-transition";
import { SectionLink } from "@/components/section-link";
import { useIsMobile } from "@/hooks/use-mobile";
import { Space_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuSource, setMenuSource] = useState<'header' | 'hero_cta'>('header'); // Track where menu was opened from
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Control for entrance choreography
  const isMobile = useIsMobile();

  const handleSectionChange = (section: string) => {
    if (activeSection !== section && !isTransitioning) {
      setIsTransitioning(true);
      setActiveSection(section);

      // If leaving home, initial load sequence is done
      if (activeSection === 'home') {
        setIsInitialLoad(false);
      }

      // Reset active project when changing sections
      if (section !== "work") {
        setActiveProject(null);
      }
    }
  };

  // ... (handleProjectChange same as before) 

  // Function to set active project (will be passed to Work component)
  const handleProjectChange = (projectId: string | null) => {
    setActiveProject(projectId);
  };

  useEffect(() => {
    // Reset transitioning state after animation completes
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [activeSection]);

  const sections = {
    home: <Home onOpenMenu={() => { setMenuSource('hero_cta'); setIsMenuOpen(true); }} onNavigate={handleSectionChange} isInitialLoad={isInitialLoad} />,
    approach: <Approach />,
    work: (
      <Work
        activeProject={activeProject}
        setActiveProject={handleProjectChange}
      />
    ),
    about: <About />,
    contact: <Contact />,
  };

  // ... (shouldShowSectionLink logic logic)

  // Determinar qué sección debe tener el enlace de navegación
  const shouldShowSectionLink = activeSection !== "home";

  // Determinar si debemos mostrar "HOME" o "WORK" en el enlace
  // Solo mostrar "WORK" cuando estamos en un proyecto específico dentro de la sección work
  const sectionToReturn =
    activeSection === "work" && activeProject ? "work" : "home";

  // Determinar a qué sección debemos navegar al hacer clic en el enlace
  const sectionToNavigate =
    activeSection === "work" && activeProject
      ? () => handleProjectChange(null) // Si estamos en un proyecto, volver a la lista de proyectos
      : () => handleSectionChange("home"); // En cualquier otro caso, volver a home

  return (
    <div className="min-h-screen overflow-hidden text-black pointer-events-none">
      <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 pt-8 pb-6 md:py-6 pointer-events-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-6">
            <motion.div
              initial={isInitialLoad ? { opacity: 0 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }} // Phase 2: Logo Reveal (600ms delay, 800ms duration)
            >
              <Logo onClick={() => handleSectionChange("home")} />
            </motion.div>

            <AnimatePresence>
              {activeSection !== "home" && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={() => handleSectionChange("home")}
                  className={cn(
                    "flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-black/40 hover:text-black transition-colors ml-4", // Added margin-left
                    spaceMono.className
                  )}
                >
                  <span className="text-lg leading-none mb-0.5">←</span>
                  <span className="mt-0.5">Inicio</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Section Indicator (Right) */}
          <div className="flex items-center">
            <AnimatePresence mode="wait">
              <motion.button
                key={activeSection}
                initial={isInitialLoad ? { opacity: 0 } : { opacity: 0, y: -10 }} // Phase 6: Nav Reveal (0 opacity initially)
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={
                  isInitialLoad && activeSection === 'home'
                    ? { delay: 6.5, duration: 1.0, ease: "easeOut" } // Phase 6: Late reveal for Home (6.5s delay)
                    : { delay: 0.7, duration: 0.4, ease: "easeOut" } // Wait for page transition to finish
                }
                onClick={() => setIsMenuOpen(true)}
                className={cn(
                  "text-sm md:text-xl font-bold tracking-widest text-black/40 hover:text-black uppercase block cursor-pointer transition-colors relative z-50 pointer-events-auto", // Added z-50 pointer-events-auto
                  spaceMono.className
                )}
              >
                {activeSection === 'home' ? '' : (
                  activeSection === 'approach' ? 'THINKING' :
                    activeSection === 'work' ? 'WORK' :
                      activeSection === 'about' ? 'ABOUT' :
                        activeSection === 'contact' ? 'CONTACT' :
                          activeSection.toUpperCase()
                )}
              </motion.button>
            </AnimatePresence>
          </div>
        </div>
      </header>

      <div className="relative h-screen">
        <AnimatePresence mode="wait">
          <PageTransition key={activeSection}>
            <div className="w-full h-full pointer-events-auto">
              {sections[activeSection as keyof typeof sections]}
            </div>
          </PageTransition>
        </AnimatePresence>

        {shouldShowSectionLink && (
          <SectionLink
            onClick={sectionToNavigate}
            isTransitioning={isTransitioning}
            section={sectionToReturn}
          />
        )}

        <TypographicNavigation
          activeSection={activeSection}
          setActiveSection={handleSectionChange}
          isOpen={isMenuOpen}
          setIsOpen={setIsMenuOpen}
          isInitialLoad={isInitialLoad}
          isTransitioning={isTransitioning}
          menuSource={menuSource}
          onHeaderOpen={() => setMenuSource('header')}
        />
      </div>

      {/* Footer con posicionamiento condicional */}
      {/* Footer con posicionamiento condicional */}
      <footer
        className={
          isMobile
            ? "fixed bottom-4 left-0 w-full z-40 px-6 pointer-events-none" // pointer-events-none to avoid blocking if empty
            : "fixed bottom-6 sm:bottom-8 left-4 sm:left-6 w-auto z-40"
        }
      >
        {/* On Mobile: Only show on Home. On Desktop: Always show. */}
        {(!isMobile || activeSection === 'home') && (
          <div className="pointer-events-auto">
            <SocialLinks />
          </div>
        )}
      </footer>
    </div>
  );
}
