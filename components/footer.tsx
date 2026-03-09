"use client"

import { Mail, Github, Linkedin } from "lucide-react"

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer id="contact" className="py-16 px-4 sm:px-6 bg-background border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Projects */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-foreground">Projects</h3>
            <div className="space-y-3">
              <button
                onClick={() => scrollToSection("portfolio")}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Featured Work
              </button>
              <button
                onClick={() => scrollToSection("experience")}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm block"
              >
                Experience
              </button>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-foreground">Skills</h3>
            <div className="space-y-3">
              <button
                onClick={() => scrollToSection("skills")}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Technical Skills
              </button>
              <button
                onClick={() => scrollToSection("home")}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm block"
              >
                About Me
              </button>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-foreground">Connect</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Let&apos;s collaborate on AI and machine learning projects.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/AzeemChaudhry"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="mailto:azeem@example.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/chaudhryazeem/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex justify-center items-center pt-8 border-t border-border/50">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Muhammad Azeem Chaudhry. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
