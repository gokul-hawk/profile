import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  const focus = [
    "Software Engineering",
    "AI Agents",
    "AI / ML",
    "Full-Stack Development",
  ];

  return (
    <section className="relative overflow-hidden bg-[#f7f8f5]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-180px] top-[-180px] h-[350px] w-[350px] rounded-full bg-emerald-300/10 blur-3xl sm:h-[450px] sm:w-[450px]" />

        <div className="absolute bottom-[-180px] left-[-180px] h-[350px] w-[350px] rounded-full bg-lime-300/10 blur-3xl sm:h-[450px] sm:w-[450px]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.025]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 md:px-12 md:pb-24 md:pt-32 lg:px-20 lg:pt-36">

        {/* Intro */}
        <div className="mb-8 flex items-center gap-3 sm:mb-10">
          <span className="h-px w-8 bg-slate-400 sm:w-12" />

          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 sm:text-xs">
            Software Engineer · Builder · Learner
          </span>
        </div>

        {/* Name */}
        <div>
          <p className="mb-3 font-mono text-xs text-slate-400 sm:text-sm">
            {"<hello_world />"}
          </p>

          <h1 className="text-[clamp(3.4rem,10vw,8rem)] font-black leading-[0.85] tracking-[-0.06em]">
            <span className="block transition-transform duration-500 hover:translate-x-2">
              GOKULA
            </span>

            <span className="relative inline-block text-slate-800 transition-transform duration-500 hover:translate-x-2">
              UDHAYAN

              <span className="absolute -bottom-2 left-0 h-1 w-2/3 rounded-full bg-emerald-400 sm:-bottom-3 sm:h-1.5" />
            </span>
          </h1>
        </div>

        {/* Introduction */}
        <div className="mt-12 max-w-4xl sm:mt-14 md:mt-16">
          <h2 className="text-xl font-medium leading-snug tracking-tight text-slate-700 sm:text-2xl md:text-3xl lg:text-4xl">
            I build{" "}
            <span className="font-semibold text-slate-950">
              practical software
            </span>{" "}
            that connects intelligent systems with real-world products.
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-500 sm:mt-6 sm:text-base sm:leading-7 md:text-lg">
            Curious by nature. Engineer by choice. I like understanding
            things from the ground up, building them from scratch, and
            occasionally breaking them just to understand why they work.
          </p>
        </div>

        {/* Focus */}
        <div className="mt-8 flex max-w-4xl flex-wrap gap-2 sm:mt-10">
          {focus.map((item) => (
            <span
              key={item}
              className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-[11px] font-medium text-slate-600 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 sm:px-4 sm:py-2 sm:text-xs"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-slate-300 transition-colors duration-300 group-hover:bg-emerald-500" />

              {item}
            </span>
          ))}
        </div>

        {/* Availability */}
        <div className="mt-8 flex items-center gap-3 sm:mt-10">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>

          <span className="text-xs font-medium text-slate-500 sm:text-sm">
            Available for Software Engineering Roles
          </span>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex items-center justify-between border-t border-slate-200 pt-5 sm:mt-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 sm:text-xs">
            Building · Learning · Exploring
          </span>

          <span className="font-mono text-[10px] text-slate-400 sm:text-xs">
            2026
          </span>
        </div>
      </div>
    </section>
  );
}