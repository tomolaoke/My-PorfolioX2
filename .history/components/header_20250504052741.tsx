"use client"

import { Button } from "@/components/ui/button"
import { Download, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { throttle } from 'lodash'

export function Header() {
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Set scrolled state for navbar background
      setScrolled(window.scrollY > 50)
  
      // Determine active section
      const sections = ["home", "about", "skills", "projects", "contact"]
      const headerHeight = 80 // Match the header height constant
      const scrollPosition = window.scrollY + headerHeight
  
      // Get the sections that are currently in view
      const visibleSections = sections
        .map(sectionId => {
          const element = document.getElementById(sectionId)
          if (!element) return null
  
          const rect = element.getBoundingClientRect()
          const offsetTop = rect.top + window.scrollY
          return {
            id: sectionId,
            offsetTop,
            height: rect.height
          }
        })
        .filter(Boolean)
  
      // Find the section that takes up most of the viewport
      let currentSection = visibleSections[0]?.id || "home"
      for (const section of visibleSections) {
        if (scrollPosition >= section.offsetTop && 
            scrollPosition < section.offsetTop + section.height) {
          currentSection = section.id
          break
        }
      }
  
      setActiveSection(currentSection)
    }
  
    // Add throttling to prevent too many calculations
    const throttledHandleScroll = throttle(handleScroll, 100)
  
    // Initial check for active section
    handleScroll()
  
    window.addEventListener("scroll", throttledHandleScroll)
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll)
      throttledHandleScroll.cancel()
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Close mobile menu if open
      setMobileMenuOpen(false)

      // Calculate the offset based on header height
      const headerHeight = 80 // Approximate header height in pixels
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - headerHeight

      // Scroll to the section with offset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Update active section immediately for better UX
      setActiveSection(sectionId)
    }
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => scrollToSection("home")} className="flex items-center space-x-2">
            <motion.span
              className="text-xl font-bold text-blue-500"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
               ΞDΛ°
            </motion.span>
          </button>

          <nav className="hidden md:flex items-center space-x-1">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "skills", label: "Skills" },
              { id: "projects", label: "Projects" },
              { id: "contact", label: "Contact" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === id ? "bg-primary/10 text-primary" : "hover:bg-muted hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button asChild>
              <a
                href="https://drive.google.com/file/d/1w9-k26Hkm0AbYKQDaV3yo4SsELAJ5Nny/view?usp=sharing"
                target="_blank"
                className="flex items-center space-x-2"
                rel="noreferrer"
              >
                <span>Resume | CV</span>
                <Download className="w-4 h-4" />
              </a>
            </Button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-background/95 backdrop-blur-md shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2">
                {[
                  { id: "home", label: "Home" },
                  { id: "about", label: "About" },
                  { id: "skills", label: "Skills" },
                  { id: "projects", label: "Projects" },
                  { id: "contact", label: "Contact" },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                      activeSection === id ? "bg-primary/10 text-primary" : "hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
