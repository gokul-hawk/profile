import Link from "next/link";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#f7f8f5] text-slate-900">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid */}
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

        {/* Soft moving glow */}
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-emerald-300/10 blur-3xl animate-pulse" />

        <div className="absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-lime-300/10 blur-3xl" />

        {/* Decorative vertical line */}
        <div className="absolute left-[8%] top-0 hidden h-full w-px bg-slate-900/[0.06] lg:block" />

        <div className="absolute right-[8%] top-0 hidden h-full w-px bg-slate-900/[0.06] lg:block" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 py-24 sm:px-8 md:px-12 lg:px-20">

        {/* Top label */}
        <div className="mb-10 flex items-center gap-4 animate-[fadeIn_0.8s_ease-out]">
          <span className="h-px w-10 bg-slate-400" />

          <span className="font-mono text-xs tracking-[0.25em] text-slate-500 uppercase">
            Software Engineer · Builder · Learner
          </span>

          <span className="hidden h-px w-10 bg-slate-400 sm:block" />
        </div>

        {/* Hero Heading */}
        <div className="max-w-6xl">
          <p className="mb-4 font-mono text-sm text-slate-500">
            {"<hello_world />"}
          </p>

          <h1 className="text-[clamp(3.2rem,9vw,8rem)] font-black leading-[0.9] tracking-[-0.055em]">
            <span className="block animate-[slideUp_0.7s_ease-out]">
              GOKULA
            </span>

            <span className="relative inline-block animate-[slideUp_0.9s_ease-out]">
              UDHAYAN
              <span className="absolute -bottom-2 left-0 h-[6px] w-[72%] origin-left bg-emerald-400/70 animate-[expand_1.2s_ease-out]" />
            </span>
          </h1>
        </div>

        {/* Description */}
        <div className="mt-12 grid max-w-5xl gap-10 md:grid-cols-[1fr_280px] md:items-end">
          <div>
            <h2 className="max-w-3xl text-2xl font-medium leading-tight tracking-tight text-slate-700 sm:text-3xl md:text-4xl">
              I build{" "}
              <span className="font-semibold text-slate-950">
                practical software
              </span>{" "}
              that connects intelligent systems with real-world products.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
              Curious by nature. Engineer by choice. I enjoy understanding
              things from first principles, building them from scratch, and
              occasionally breaking them just to understand why they work.
            </p>
          </div>

          {/* Side technical card */}
          <div className="group relative hidden md:block">
            <div className="absolute -inset-2 rounded-2xl bg-emerald-400/10 opacity-0 blur-xl transition duration-500 group-hover:opacity-100" />

            <div className="relative rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition duration-500 group-hover:-translate-y-1 group-hover:shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-widest text-slate-400">
                  CURRENT_STATE
                </span>

                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  <span className="font-mono text-[10px] text-emerald-600">
                    ONLINE
                  </span>
                </span>
              </div>

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

                <div className="mt-4 border-t border-slate-100 pt-3 text-emerald-700">
                  {"while(alive) { learn(); }"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status / Focus */}
        <div className="mt-12 flex flex-wrap gap-2">
          {[
            "Software Engineering",
            "AI Agents",
            "AI / ML",
            "Full-Stack Development",
          ].map((item, index) => (
            <div
              key={item}
              className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-4 py-2 text-xs font-medium text-slate-600 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
              style={{
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-slate-300 transition-colors group-hover:bg-emerald-500" />
              {item}
            </div>
          ))}
        </div>

        {/* Actions */}
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
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/50 px-6 py-3.5 text-sm font-medium text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-slate-400 hover:bg-white"
          >
            Let's connect
          </Link>
        </div>

        {/* Bottom */}
        
          <div className="hidden items-center gap-2 font-mono text-[10px] tracking-widest text-slate-400 sm:flex">
            SCROLL TO EXPLORE
            <ArrowDown size={13} className="animate-bounce" />
          </div>

          <span className="font-mono text-[10px] text-slate-400">
            2026
          </span>
        </div>
      

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expand {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  );
}