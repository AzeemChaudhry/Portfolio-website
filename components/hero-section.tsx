"use client"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react"

export default function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20 md:pt-0">
      {/* Clean minimalist background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/10"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-20">
        {/* Profile Introduction */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-8">
            <Image
              src="/images/company-logo.jpg"
              alt="AI Engineer - Company Logo"
              width={120}
              height={120}
              className="rounded-lg"
            />
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-foreground mb-6">
            <span className="text-primary">AI Engineer</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Intelligent systems, machine learning solutions, and AI-driven applications. Specializing in federated learning, NLP, MLOps, and production-grade AI systems.
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <div className="px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <span className="text-sm font-medium text-primary">Python</span>
            </div>
            <div className="px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <span className="text-sm font-medium text-primary">TensorFlow</span>
            </div>
            <div className="px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <span className="text-sm font-medium text-primary">PyTorch</span>
            </div>
            <div className="px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <span className="text-sm font-medium text-primary">ML/AI</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={scrollToProjects}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              View My Projects
            </button>
            <a
              href="https://github.com/AzeemChaudhry"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-primary/30 text-foreground rounded-lg font-semibold hover:bg-primary/5 transition-colors flex items-center gap-2"
            >
              <Github size={20} />
              GitHub
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/AzeemChaudhry"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="mailto:azeem@example.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-gentle-bounce">
          <button
            onClick={scrollToProjects}
            className="group text-muted-foreground hover:text-primary transition-colors"
            aria-label="Scroll to projects"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
    </section>
  )
}
