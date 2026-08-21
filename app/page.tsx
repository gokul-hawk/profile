import Hero from "@/app/components/Hero";
import AboutScratchCard from "@/app/components/AboutScratchCard";
import Projects from "@/app/components/Projects";
import Contact from "@/app/components/Contact";
import FlipPortfolioContainer from "@/app/components/FlipPortfolioContainer";

export default function Home() {
  return (
    <FlipPortfolioContainer>

  {/* Hero */}
  <div className="h-full w-full">
    <Hero />
  </div>

  {/* About */}
  <div className="h-full w-full bg-slate-50">
    <AboutScratchCard />
  </div>

  {/* Projects */}
  <div className="h-full w-full">
    <Projects />
  </div>

  {/* Contact */}
  <div className="h-full w-full">
    <Contact />
  </div>

</FlipPortfolioContainer>
  );
}