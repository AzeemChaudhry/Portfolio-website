"use client"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export default function SkillsSection() {
  const skillCategories = [
    {
      category: "Machine Learning Solutions",
      description: "Transform your business with predictive models and intelligent algorithms. I build scalable ML systems that solve real-world problems and drive measurable outcomes.",
      cta: "Build smarter predictions",
      skills: ["TensorFlow", "PyTorch", "Scikit-learn", "XGBoost", "Neural Networks"]
    },
    {
      category: "Data Science & Analytics",
      description: "Unlock hidden insights from your data. I conduct in-depth analysis and statistical investigations to help you make data-driven decisions with confidence.",
      cta: "Discover your data insights",
      skills: ["Pandas", "NumPy", "Data Analysis", "EDA", "Statistical Analysis"]
    },
    {
      category: "Deep Learning & Vision",
      description: "Deploy cutting-edge neural networks for vision and language tasks. I create advanced architectures that process images, videos, and text with precision.",
      cta: "Implement advanced AI",
      skills: ["CNN", "RNN", "NLP", "Transformers", "Computer Vision"]
    },
    {
      category: "MLOps & Infrastructure",
      description: "Production-ready AI systems that scale. I handle deployment, monitoring, and optimization so your models perform reliably in real-world environments.",
      cta: "Deploy with confidence",
      skills: ["Python", "Docker", "AWS", "Git", "Jupyter"]
    },
    {
      category: "Enterprise AI Solutions",
      description: "Privacy-preserving and enterprise-grade AI. Specialized in federated learning and production optimization for organizations requiring secure, scalable systems.",
      cta: "Enterprise-grade excellence",
      skills: ["Federated Learning", "MLOps", "Model Optimization", "Production ML"]
    },
    {
      category: "Intelligent Language Systems",
      description: "Build AI-powered applications with natural language understanding. From semantic search to text generation, I create intelligent systems that understand and generate human language.",
      cta: "Enable smart applications",
      skills: ["Hugging Face", "LLMs", "Embeddings", "Text Generation", "Semantic Search"]
    }
  ]

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What I Offer
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Specialized AI engineering services designed to accelerate your projects. Whether you need predictive models, intelligent systems, or enterprise-scale deployments, I deliver solutions that drive real business value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <Card
              key={idx}
              className="p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group cursor-pointer hover:bg-primary/5 flex flex-col"
            >
              <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {category.category}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-grow">
                {category.description}
              </p>
              <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm mb-4 group-hover:gap-3 transition-all">
                {category.cta}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIdx) => (
                  <span
                    key={skillIdx}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20 hover:bg-primary/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Ready to transform your AI project?</p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Let's Work Together
          </a>
        </div>
      </div>
    </section>
  )
}
