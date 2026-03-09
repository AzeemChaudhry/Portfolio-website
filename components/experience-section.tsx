"use client"
import Image from "next/image"

export default function ExperienceSection() {
  const timelineData = [
    {
      year: "2022",
      title: "Started AI Degree at FAST NUCES",
      description: "Began comprehensive AI education with focus on machine learning, deep learning, and practical AI applications",
      logo: "/images/companies/fastnuces.jpg",
      type: "education"
    },
    {
      year: "2024",
      title: "Atom Camp - AI Internship",
      description: "First professional experience building chatbots and LLM applications with Google API integration and open-source models",
      logo: "/images/companies/atomcamp.jpg",
      type: "work"
    },
    {
      year: "2024",
      title: "Atom Camp - Junior Developer",
      description: "Advanced to junior developer role, leading AI chatbot projects, automation systems, and collaborative development efforts",
      logo: "/images/companies/atomcamp.jpg",
      type: "work"
    },
    {
      year: "2025",
      title: "CARE - AI Intern",
      description: "Current role: Building intelligent resume search systems with semantic embeddings, vector databases, and natural language matching",
      logo: "/images/companies/care.jpg",
      type: "work"
    }
  ]

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-center">
          Career Journey
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          A timeline of my professional growth and educational milestones in AI and machine learning
        </p>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary/50 via-primary/30 to-primary/50 rounded-full"></div>

          <div className="space-y-8 md:space-y-12">
            {timelineData.map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${idx % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
              >
                {/* Content */}
                <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                  <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
                    <div className="flex items-start gap-4 md:flex-col md:items-end md:text-right">
                      <div className="flex-shrink-0">
                        <Image
                          src={item.logo}
                          alt={item.title}
                          width={48}
                          height={48}
                          className="rounded-lg border border-border/50"
                        />
                      </div>
                      <div className="flex-1 md:flex-none">
                        <p className="text-primary font-bold text-lg mb-2">{item.year}</p>
                        <h4 className="text-foreground font-semibold text-base mb-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline node */}
                <div className="flex justify-center w-full md:w-0 my-4 md:my-0">
                  <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg shadow-primary/50 relative z-10"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
