import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen w-screen flex flex-col justify-center px-6 md:px-16 lg:px-45 max-w-7xl mx-auto py-20">
      <div className="space-y-6 max-w-5xl">
        
        

        {/* Formal Introduction Header */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
          Hello, I am <span className="text-emerald-700 bg-[#98fb98]/30 px-2 py-0.5 rounded-md">GOKULA UDHAYAN</span>.
          <br />
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-800 leading-tight">
          I build end to end solutions using AI agents with interactive web systems.
        </h2>

        {/* Professional Bio */}
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
          I Learn Things out of curiousity and forgert in a week😅 , But still like to learn from scratch["HELLO WORLD!"]
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <Link
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-800 text-white font-medium hover:bg-emerald-900 transition-colors shadow-sm"
          >
            View Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-[#76c776] text-slate-800 font-medium hover:bg-[#98fb98]/20 transition-colors"
          >
            <Download className="w-4 h-4 text-emerald-700" />
            Resume
          </Link>
        </div>

        {/* Subtle Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#98fb98]/20 border border-[#98fb98] text-sm font-medium text-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          Available for Software Engineering Roles
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#98fb98]/20 border border-[#98fb98] text-sm font-medium text-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          AI Agent Developing
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#98fb98]/20 border border-[#98fb98] text-sm font-medium text-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          AI/ML Engineering
        </div>

        

      </div>
    </section>
  );
}