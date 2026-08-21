import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen w-full flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto py-16 md:py-24">
      <div className="space-y-6 md:space-y-8 max-w-5xl">
        


        {/* Formal Introduction Header */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
            Hello, I am{" "}
            <span className="text-emerald-700 bg-[#98fb98]/30 px-2 py-0.5 rounded-md inline-block mt-1">
              GOKULA UDHAYAN
            </span>
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-700 leading-snug pt-2">
            I build end-to-end solutions using AI agents with interactive web systems.
          </h2>
        </div>

        {/* Professional Bio */}
        <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl">
          I learn things out of curiosity and forget in a week 😅, but still like to learn from scratch <span className="font-mono text-emerald-800 bg-[#98fb98]/20 px-1.5 py-0.5 rounded">[&quot;HELLO WORLD!&quot;]</span>
        </p>

        {/* Action Buttons */}
        {/* Status Pills Container */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#98fb98]/20 border border-[#98fb98] text-xs sm:text-sm font-medium text-slate-800 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0"></span>
            Available for Software Engineering Roles
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#98fb98]/20 border border-[#98fb98] text-xs sm:text-sm font-medium text-slate-800 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0"></span>
            AI Agent Developing
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#98fb98]/20 border border-[#98fb98] text-xs sm:text-sm font-medium text-slate-800 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0"></span>
            AI/ML Engineering
          </div>
        </div>

      </div>
    </section>
  );
}