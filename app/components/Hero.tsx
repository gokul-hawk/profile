import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  
  Mail,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f7f8f5] text-slate-900">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0f172a 1px, transparent 1px),
            linear-gradient(to bottom, #0f172a 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Decorative background elements */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-300/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-lime-300/10 blur-3xl" />

      {/* Vertical lines */}
      <div className="absolute left-[8%] top-0 hidden h-full w-px bg-slate-900/[0.05] lg:block" />

      <div className="absolute right-[8%] top-0 hidden h-full w-px bg-slate-900/[0.05] lg:block" />

      {/* Main */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 py-20 sm:px-8 md:px-12 lg:px-20">

        {/* Small introduction */}
        <div className="mb-10 flex items-center gap-4">
          <span className="h-px w-10 bg-slate-400" />

          <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
            Software Engineer · Builder · Learner
          </span>
        </div>

        {/* Name */}
        <div>
          <p className="mb-4 font-mono text-sm text-slate-400">
            {"<hello_world />"}
          </p>

          <h1 className="text-[clamp(3.5rem,10vw,8.5rem)] font-black leading-[0.85] tracking-[-0.06em]">
            <span className="block transition-transform duration-500 hover:translate-x-2">
              GOKULA
            </span>

            <span className="relative inline-block text-slate-800 transition-transform duration-500 hover:translate-x-2">
              UDHAYAN

              {/* Underline */}
              <span className="absolute -bottom-3 left-0 h-1.5 w-3/4 rounded-full bg-emerald-400" />
            </span>
          </h1>
        </div>

        {/* Content */}
        <div className="mt-14 grid max-w-6xl gap-12 md:grid-cols-[1fr_300px] md:items-end">

          {/* Description */}
          <div>
            <h2 className="max-w-3xl text-2xl font-medium leading-tight tracking-tight text-slate-700 sm:text-3xl md:text-4xl">
              I build{" "}
              <span className="font-semibold text-slate-950">
                practical software
              </span>{" "}
              that connects intelligent systems with real-world products.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
              Curious by nature. Engineer by choice. I like understanding
              things from the ground up, building them from scratch, and
              occasionally breaking them just to understand why they work.
            </p>
          </div>

          {/* Developer card */}
          <div className="group relative">
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl">
              
              {/* Card header */}
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.2em] text-slate-400">
                  CURRENT_STATE
                </span>

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

                  <span className="font-mono text-[10px] text-emerald-600">
                    ONLINE
                  </span>
                </div>
              </div>

              {/* Card content */}
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">building</span>
                  <span className="text-slate-700">software</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">exploring</span>
                  <span className="text-slate-700">AI systems</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">learning</span>
                  <span className="text-slate-700">everything</span>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-4 text-emerald-700">
                  while(alive) {"{"} learn(); {"}"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills / focus */}
        <div className="mt-12 flex flex-wrap gap-2">
          {[
            "Software Engineering",
            "AI Agents",
            "AI / ML",
            "Full-Stack Development",
          ].map((item) => (
            <div
              key={item}
              className="group flex cursor-default items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-4 py-2 text-xs font-medium text-slate-600 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-slate-300 transition-colors duration-300 group-hover:bg-emerald-500" />

              {item}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="#projects"
            className="group inline-flex items-center gap-3 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-900/10"
          >
            Explore my work

            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>

          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/50 px-6 py-3.5 text-sm font-medium text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:bg-white"
          >
            Let's connect
          </Link>
        </div>

        

          {/* Scroll */}
          <div className="hidden items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-slate-400 sm:flex">
            SCROLL TO EXPLORE

            <ArrowDown
              size={13}
              className="animate-bounce"
            />
          </div>

          <span className="font-mono text-[10px] text-slate-400">
            2026
          </span>
        </div>
      </div>
    </section>
  );
}