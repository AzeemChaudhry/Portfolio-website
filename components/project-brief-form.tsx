"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Brain, Zap, CheckCircle2 } from "lucide-react"

const AI_KEYWORDS = {
  high: ["federated learning", "reinforcement learning", "generative", "gpt", "llm", "transformer", "neural", "deep learning", "computer vision", "nlp", "nlp", "production ml", "mlops"],
  medium: ["prediction", "classification", "clustering", "regression", "sentiment", "recommendation", "anomaly", "automation", "data science"],
  low: ["analysis", "reporting", "dashboard", "analytics", "visualization"]
}

export default function ProjectBriefForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectTitle: "",
    projectDescription: "",
    timeline: "3-6 months",
    budget: "50k-100k",
    industry: ""
  })

  const [complexity, setComplexity] = useState(0)
  const [match, setMatch] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  // Calculate AI complexity score based on description
  useEffect(() => {
    const desc = (formData.projectDescription + " " + formData.projectTitle).toLowerCase()
    let score = 0

    // Check for high complexity keywords
    AI_KEYWORDS.high.forEach(keyword => {
      if (desc.includes(keyword)) score += 25
    })

    // Check for medium complexity keywords
    AI_KEYWORDS.medium.forEach(keyword => {
      if (desc.includes(keyword)) score += 12
    })

    // Check for low complexity keywords
    AI_KEYWORDS.low.forEach(keyword => {
      if (desc.includes(keyword)) score += 5
    })

    // Bonus for longer, more detailed descriptions
    if (formData.projectDescription.length > 200) score += 10
    if (formData.projectDescription.length > 500) score += 15

    // Cap at 100
    score = Math.min(100, score)
    setComplexity(score)

    // Calculate match score (higher complexity = better match for you)
    setMatch(score)
  }, [formData.projectDescription, formData.projectTitle])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/submit-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          complexity_score: complexity,
          match_percentage: match,
          status: "new"
        })
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          name: "",
          email: "",
          company: "",
          projectTitle: "",
          projectDescription: "",
          timeline: "3-6 months",
          budget: "50k-100k",
          industry: ""
        })
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (error) {
      console.error("[v0] Error submitting inquiry:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {submitted && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle2 size={20} className="text-green-600" />
          <div>
            <p className="font-semibold text-green-900">Project Brief Received!</p>
            <p className="text-sm text-green-700">I'll review your project and reach out within 24 hours.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card className="p-8 border border-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-6">Describe Your AI Project</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border/50 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border/50 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              {/* Row 2: Company & Industry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-border/50 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50"
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Industry</label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-border/50 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50"
                    placeholder="e.g., FinTech, Healthcare, E-commerce"
                  />
                </div>
              </div>

              {/* Project Title */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Project Title *</label>
                <input
                  type="text"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border/50 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50"
                  placeholder="What is your project about?"
                />
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Project Description *</label>
                <textarea
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg border border-border/50 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 resize-none"
                  placeholder="Describe your project in detail. What problem are you solving? What AI/ML technologies are you considering? What are your goals?"
                />
              </div>

              {/* Row 3: Timeline & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Timeline</label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-border/50 bg-background text-foreground focus:outline-none focus:border-primary/50"
                  >
                    <option>Immediate</option>
                    <option>1-3 months</option>
                    <option>3-6 months</option>
                    <option>6-12 months</option>
                    <option>12+ months</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-border/50 bg-background text-foreground focus:outline-none focus:border-primary/50"
                  >
                    <option>Under 25k</option>
                    <option>25k-50k</option>
                    <option>50k-100k</option>
                    <option>100k-250k</option>
                    <option>250k+</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Project Brief"}
              </button>
            </form>
          </Card>
        </div>

        {/* Scoring Sidebar */}
        <div className="space-y-4">
          <Card className="p-6 border border-border/50 bg-primary/5">
            <div className="flex items-center gap-2 mb-4">
              <Brain size={24} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">AI Complexity</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Complexity Score</span>
                  <span className="text-2xl font-bold text-primary">{complexity}</span>
                </div>
                <div className="w-full bg-border/50 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${complexity}%` }}
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {complexity < 30 && "Simple data/analysis tasks"}
                {complexity >= 30 && complexity < 60 && "Standard ML/AI implementation"}
                {complexity >= 60 && "Advanced deep learning & production systems"}
              </p>
            </div>
          </Card>

          <Card className="p-6 border border-border/50 bg-primary/5">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={24} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Project Match</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Fit Score</span>
                  <span className="text-2xl font-bold text-primary">{match}%</span>
                </div>
                <div className="w-full bg-border/50 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${match}%` }}
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {match < 40 && "Not a strong fit for my expertise"}
                {match >= 40 && match < 70 && "Good potential match"}
                {match >= 70 && "Excellent fit for my expertise!"}
              </p>
            </div>
          </Card>

          <Card className="p-4 border border-border/50 bg-background">
            <p className="text-xs text-muted-foreground">
              💡 The complexity score is calculated based on the AI/ML technologies and project details you mention. More detailed descriptions help me understand your needs better.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
