import type { Metadata } from "next"
import ProjectBriefForm from "@/components/project-brief-form"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Project Brief - Muhammad Azeem | AI Engineer",
  description: "Submit your AI project brief and get an instant complexity assessment"
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Submit Your AI Project
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Tell me about your AI/ML project and get an instant assessment of complexity, scope, and fit. I'll review your brief within 24 hours and reach out to discuss collaboration opportunities.
            </p>
          </div>

          {/* Form Component */}
          <ProjectBriefForm />
        </div>
      </main>
      <Footer />
    </>
  )
}
