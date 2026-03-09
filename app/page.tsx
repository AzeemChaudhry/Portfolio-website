import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import SkillsSection from "@/components/skills-section"
import PortfolioSection from "@/components/portfolio-section"
import ExperienceSection from "@/components/experience-section"
import Footer from "@/components/footer"
import ScrollFadeWrapper from "@/components/scroll-fade-wrapper"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <ScrollFadeWrapper delay={100}>
        <HeroSection />
      </ScrollFadeWrapper>

      <ScrollFadeWrapper delay={200}>
        <SkillsSection />
      </ScrollFadeWrapper>

      <ScrollFadeWrapper delay={300}>
        <PortfolioSection />
      </ScrollFadeWrapper>

      <ScrollFadeWrapper delay={400}>
        <ExperienceSection />
      </ScrollFadeWrapper>

      <ScrollFadeWrapper delay={500}>
        <Footer />
      </ScrollFadeWrapper>
    </main>
  )
}
