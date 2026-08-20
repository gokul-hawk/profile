import Hero from "@/app/components/Hero";
import AboutScratchCard from "@/app/components/AboutScratchCard";
import Projects from "@/app/components/Projects";
import Contact from "@/app/components/Contact";
import FlipPortfolioContainer from "@/app/components/FlipPortfolioContainer";

export default function Home() {
  return (
    <FlipPortfolioContainer>
      {/* Section 1: Hero */}
      <div className="w-full h-full flex items-center justify-center">
        <Hero />
      </div>

      {/* Section 2: About / Scratch Card */}
      <div className="w-full h-full flex items-center justify-center bg-slate-50 py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-emerald-600 mb-2">
            Unlock Profile
          </h2>
          <AboutScratchCard />
        </div>
      </div>

      {/* Section 3: Projects Showcase */}
      <div className="w-full h-full flex items-center justify-center">
        <Projects />
      </div>

      {/* Section 4: Contact & Socials */}
      <div className="w-full h-full flex items-center justify-center">
        <Contact />
      </div>
    </FlipPortfolioContainer>
  );
}