"use client";

import React from "react";
import {
  ArrowUpRight,
  Download,
  Mail,
} from "lucide-react";

import {
  siGithub,
  siLinkedin,
  siGmail,
} from "simple-icons";

const contactLinks = [
  {
    name: "Gmail",
    label: "gokulaudhayannv@gmail.com",
    href: "mailto:gokulaudhayannv@gmail.com",
    icon: siGmail,
  },
  {
    name: "GitHub",
    label: "gokul-hawk",
    href: "https://github.com/gokul-hawk",
    icon: siGithub,
  },
  {
    name: "LinkedIn",
    label: "gokula-udhayan",
    href: "https://linkedin.com/in/gokula-udhayan",
    icon: siLinkedin,
  },
];

export default function Contact() {
  return (
    <section className="relative h-full w-full overflow-hidden bg-[#f7f8f5] text-slate-900">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.02]" />

        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" />

        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-lime-300/10 blur-3xl" />

      </div>

      {/* Main */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col justify-center px-5 py-8 sm:px-8 md:px-12 lg:px-16">

        {/* Header */}
        <div className="mb-8 text-center sm:mb-10">

          <div className="mb-3 flex items-center justify-center gap-3">

            <span className="h-px w-8 bg-emerald-500" />

            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-emerald-600 sm:text-[10px]">
              Get In Touch
            </span>

            <span className="h-px w-8 bg-emerald-500" />

          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            Let&apos;s Connect
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
            Whether you want to talk about a job, collaborate on something,
            or just say hello — I&apos;d love to hear from you.
          </p>

        </div>

        {/* Contact Cards */}
        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">

          {contactLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target={
                item.href.startsWith("mailto:")
                  ? undefined
                  : "_blank"
              }
              rel={
                item.href.startsWith("mailto:")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white/80
                p-5
                shadow-sm
                backdrop-blur-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-emerald-300
                hover:shadow-lg
                sm:p-6
              "
            >

              {/* Hover glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-emerald-400/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

              {/* Icon */}
              <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 transition-all duration-300 group-hover:scale-105 group-hover:bg-emerald-100">

                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d={item.icon.path} />
                </svg>

              </div>

              {/* Content */}
              <div className="relative">

                <div className="flex items-center justify-between">

                  <h3 className="text-base font-bold text-slate-900">
                    {item.name}
                  </h3>

                  <ArrowUpRight
                    size={16}
                    className="
                      text-slate-300
                      transition-all
                      duration-300
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                      group-hover:text-emerald-600
                    "
                  />

                </div>

                <p className="mt-2 break-all text-[10px] leading-5 text-slate-400 sm:text-xs">
                  {item.label}
                </p>

              </div>

              {/* Bottom line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-emerald-500 transition-all duration-500 group-hover:w-full" />

            </a>
          ))}

        </div>

        {/* Resume */}
        <div className="mx-auto mt-5 w-full max-w-3xl rounded-2xl border border-emerald-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm sm:mt-6 sm:p-6">

          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">

            <div className="text-center sm:text-left">

              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-600">
                Want the formal version?
              </p>

              <h3 className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
                Take a look at my resume.
              </h3>

              <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                Education, experience, projects and everything in between.
              </p>

            </div>

            <a
              href="/resume.pdf"
              download="Gokul_Udhayan_Resume.pdf"
              className="
                inline-flex
                shrink-0
                items-center
                gap-2
                rounded-xl
                bg-slate-950
                px-5
                py-3
                text-xs
                font-medium
                text-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-emerald-700
                hover:shadow-lg
              "
            >
              <Download size={15} />

              Download Resume

              <ArrowUpRight size={13} />
            </a>

          </div>

        </div>

        {/* Footer */}
        <div className="mt-7 flex items-center justify-between border-t border-slate-200 pt-4">

          <div className="flex items-center gap-2">

            <span className="relative flex h-2 w-2">

              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />

            </span>

            <span className="font-mono text-[9px] text-slate-400 sm:text-[10px]">
              OPEN TO OPPORTUNITIES
            </span>

          </div>

          <span className="font-mono text-[9px] text-slate-400 sm:text-[10px]">
            2026
          </span>

        </div>

      </div>
    </section>
  );
}