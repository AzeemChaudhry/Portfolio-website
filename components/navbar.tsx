"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      setIsScrolled(scrolled)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (id: string) => {
    if (pathname !== "/") {
      window.location.href = `/#${id}`
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 outline-none ${isScrolled ? "px-4 py-2" : ""}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div
        className={`max-w-7xl mx-auto transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md rounded-2xl px-6 py-3 border border-border/50"
            : "px-4 sm:px-6 py-4 border border-transparent"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:flex-1">
            <Image
              src="/images/company-logo.jpg"
              alt="AI Engineer"
              width={36}
              height={36}
              className="rounded-md"
            />
            <span className="text-lg sm:text-xl font-bold text-foreground hidden sm:inline">Muhammad Azeem</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8 mr-6">
            <button
              onClick={() => scrollToSection("home")}
              className="nav-item text-muted-foreground hover:text-foreground transition-colors relative"
              aria-label="Navigate to home section"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="nav-item text-muted-foreground hover:text-foreground transition-colors relative"
              aria-label="Navigate to skills section"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="nav-item text-muted-foreground hover:text-foreground transition-colors relative"
              aria-label="Navigate to portfolio section"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className="nav-item text-muted-foreground hover:text-foreground transition-colors relative"
              aria-label="Navigate to experience section"
            >
              Experience
            </button>
            <Link
              href="/contact"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              aria-label="Navigate to contact page"
            >
              Contact
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground hover:text-foreground/80 transition-colors p-2"
              aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 p-4 bg-background/80 rounded-lg border border-border/50" role="menu">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("home")}
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                role="menuitem"
                aria-label="Navigate to home section"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("skills")}
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                role="menuitem"
                aria-label="Navigate to skills section"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection("portfolio")}
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                role="menuitem"
                aria-label="Navigate to portfolio section"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("experience")}
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                role="menuitem"
                aria-label="Navigate to experience section"
              >
                Experience
              </button>
              <Link
                href="/contact"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
                role="menuitem"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
