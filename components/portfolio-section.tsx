"use client"

import { Card } from "@/components/ui/card"
import { Github, ExternalLink } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  github: string
  delay: number
}

const projects: Project[] = [
  {
    id: "federated-learning",
    title: "Federated Learning & Distributed Data Pipeline",
    description:
      "Privacy-preserving federated learning system with automated data preprocessing and aggregation. Engineered FedAvg algorithm implementation with multi-client training coordination and comprehensive MLOps workflow.",
    tags: ["Python", "Federated Learning", "MLOps", "Distributed Systems"],
    github: "https://github.com/AzeemChaudhry/Federated-Learning",
    delay: 0,
  },
  {
    id: "flight-delay",
    title: "Flight Delay Analysis",
    description:
      "Comprehensive exploratory data analysis of flight delays with statistical insights and predictive modeling. Built data preprocessing pipelines and visualization dashboards for temporal analysis.",
    tags: ["Python", "Data Analysis", "Machine Learning", "EDA"],
    github: "https://github.com/AzeemChaudhry/Flight_delay_analysis",
    delay: 100,
  },
  {
    id: "intelligent-resume",
    title: "Intelligent Resume Filtering",
    description:
      "LLM-powered semantic resume search system using vector embeddings. Implemented end-to-end pipeline with OCR-based PDF parsing, SentenceTransformer embeddings, and Qdrant vector storage.",
    tags: ["Python", "LLM", "NLP", "Vector DB", "RAG"],
    github: "https://github.com/AzeemChaudhry",
    delay: 200,
  },
  {
    id: "nlp-story2audio",
    title: "NLP Story2Audio",
    description:
      "AI-driven audio storytelling system converting narratives into expressive audio. Integrated SpeechT5 with contextual prosody, Librosa, and Parler TTS for tone modulation and voice synthesis.",
    tags: ["NLP", "TTS", "PyTorch", "Audio Processing"],
    github: "https://github.com/AzeemChaudhry",
    delay: 300,
  },
]

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-center">
          Featured Projects
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Exploring machine learning, AI systems, and data engineering through practical projects
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 group overflow-hidden"
            >
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors w-fit"
                >
                  <Github size={20} />
                  View on GitHub
                  <ExternalLink size={16} />
                </a>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://github.com/AzeemChaudhry"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Explore More on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
