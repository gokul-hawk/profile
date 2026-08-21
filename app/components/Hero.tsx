import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-full w-full overflow-hidden bg-[#f7f8f5] text-slate-900">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.025]" />

      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[350px] w-[350px] rounded-full bg-emerald-300/10 blur-3xl lg:h-[450px] lg:w-[450px]" />

      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[300px] w-[300px] rounded-full bg-lime-300/10 blur-3xl lg:h-[400px] lg:w-[400px]" />

      {/* Vertical Lines */}
      <div className="absolute left-[7%] top-0 hidden h-full w-px bg-slate-900/[0.05] lg:block" />

      <div className="absolute right-[7%] top-0 hidden h-full w-px bg-slate-900/[0.05] lg:block" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-5 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10 lg:px-20 lg:py-12">

        {/* Intro Label */}
        <div className="mb-5 flex items-center gap-3 sm:mb-6 lg:mb-8">
          <span className="h-px w-8 bg-slate-400 sm:w-10" />

          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500 sm:text-[10px] lg:text-xs">
            Software Engineer · Builder · Learner
          </span>
        </div>

        {/* Name */}
        <div>
          <p className="mb-2 font-mono text-[10px] text-slate-400 sm:text-xs lg:mb-3 lg:text-sm">
            {"<hello_world />"}
          </p>

          <h1 className="text-[clamp(3rem,8vw,7.5rem)] font-black leading-[0.82] tracking-[-0.06em]">
            <span className="block transition-transform duration-500 hover:translate-x-2">
              GOKULA
            </span>

            <span className="relative inline-block text-slate-800 transition-transform duration-500 hover:translate-x-2">
              UDHAYAN

              <span className="absolute -bottom-2 left-0 h-1 w-2/3 rounded-full bg-emerald-400 sm:-bottom-2.5 sm:h-1.5" />
            </span>
          </h1>
        </div>

        {/* Main Content */}
        <div className="mt-7 grid max-w-6xl gap-7 sm:mt-8 sm:gap-8 md:mt-9 md:grid-cols-[1fr_260px] md:items-end lg:mt-10 lg:grid-cols-[1fr_280px] lg:gap-10">

          {/* Description */}
          <div>
            <h2 className="max-w-3xl text-lg font-medium leading-snug tracking-tight text-slate-700 sm:text-xl md:text-2xl lg:text-3xl">
              I build{" "}
              <span className="font-semibold text-slate-950">
                practical software
              </span>{" "}
              that connects intelligent systems with real-world products.
            </h2>

            <p className="mt-3 max-w-2xl text-xs leading-5 text-slate-500 sm:mt-4 sm:text-sm sm:leading-6 lg:text-base">
              Curious by nature. Engineer by choice. I like understanding
              things from the ground up, building them from scratch, and
              occasionally breaking them just to understand why they work.
            </p>
          </div>

          {/* Developer Card */}
          <div className="group hidden md:block">
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-lg lg:p-5">

              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[9px] tracking-[0.2em] text-slate-400">
                  CURRENT_STATE
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />

                  <span className="font-mono text-[9px] text-emerald-600">
                    ONLINE
                  </span>
                </div>
              </div>

              {/* State */}
              <div className="space-y-2.5 font-mono text-[10px] lg:text-xs">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">building</span>
                  <span className="text-slate-700">software</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">exploring</span>
                  <span className="text-slate-700">AI systems</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">learning</span>
                  <span className="text-slate-700">everything</span>
                </div>

                <div className="mt-3 border-t border-slate-100 pt-3 text-emerald-700">
                  while(alive) {"{"} learn(); {"}"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Focus */}
        <div className="mt-6 flex max-w-5xl flex-wrap gap-1.5 sm:mt-7 sm:gap-2 lg:mt-8">
          {[
            "Software Engineering",
            "AI Agents",
            "AI / ML",
            "Full-Stack Development",
          ].map((item) => (
            <div
              key={item}
              className="group flex cursor-default items-center gap-1.5 rounded-full border border-slate-200 bg-white/60 px-3 py-1.5 text-[9px] font-medium text-slate-600 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 sm:px-3.5 sm:text-[10px] lg:px-4 lg:py-2 lg:text-xs"
            >
              <span className="h-1 w-1 rounded-full bg-slate-300 transition-colors duration-300 group-hover:bg-emerald-500 sm:h-1.5 sm:w-1.5" />

              {item}
            </div>
          ))}
        </div>

        {/* Bottom Information */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-3 sm:mt-7 sm:pt-4 lg:mt-8">

          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>

            <span className="text-[9px] font-medium text-slate-500 sm:text-[10px] lg:text-xs">
              Available for Software Engineering Roles
            </span>
          </div>

          <div className="hidden items-center gap-2 font-mono text-[9px] tracking-[0.15em] text-slate-400 sm:flex">
            SCROLL

            <ArrowDown
              size={11}
              className="animate-bounce"
            />
          </div>

          <span className="font-mono text-[9px] text-slate-400 sm:text-[10px]">
            2026
          </span>
        </div>
      </div>
    </section>
  );
}