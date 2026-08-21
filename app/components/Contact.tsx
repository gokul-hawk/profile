"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  Briefcase,
  Code,
  Download,
  Mail,
  MessageCircle,
  RotateCcw,
} from "lucide-react";

type Intent = {
  id: string;
  label: string;
  icon: React.ReactNode;
  message: string;
  response: string;
};

const contactLinks = [
  {
    name: "Gmail",
    label: "gokulaudhayannv@gmail.com",
    href: "mailto:gokulaudhayannv@gmail.com",
    icon: <Mail className="h-4 w-4 text-emerald-700" />,
    actionText: "Send Email",
  },
  {
    name: "GitHub",
    label: "gokul-hawk",
    href: "https://github.com/gokul-hawk",
    icon: <Code className="h-4 w-4 text-emerald-700" />,
    actionText: "Visit Profile",
  },
  {
    name: "LinkedIn",
    label: "gokula-udhayan",
    href: "https://linkedin.com/in/gokula-udhayan",
    icon: <Briefcase className="h-4 w-4 text-emerald-700" />,
    actionText: "Connect",
  },
];

const intents: Intent[] = [
  {
    id: "hire",
    label: "I'm a recruiter",
    icon: <Briefcase size={15} />,
    message: "I'm interested in your profile.",
    response:
      "Nice to meet you! 👋 I'm currently open to Software Engineering opportunities. I'd be happy to talk about a role, team, or project.",
  },
  {
    id: "collaborate",
    label: "Let's collaborate",
    icon: <Code size={15} />,
    message: "I'd like to build something together.",
    response:
      "Now we're talking! 🚀 I'm always interested in interesting ideas and projects. Tell me what you're building and let's see where it goes.",
  },
  {
    id: "project",
    label: "I have a project",
    icon: <MessageCircle size={15} />,
    message: "I have an idea I'd like your help with.",
    response:
      "Interesting 👀. I love turning ideas into working software. Send me the details — I'll bring the coffee and probably overthink the architecture.",
  },
  {
    id: "hello",
    label: "Just saying hi",
    icon: <span>👋</span>,
    message: "Hey Gokula!",
    response:
      "Hey! 👋 Glad you stopped by. Thanks for surviving my portfolio this far. 😄",
  },
  {
    id: "tech",
    label: "Let's talk tech",
    icon: <Code size={15} />,
    message: "I want to talk about technology.",
    response:
      "My kind of conversation. ☕ We can talk software engineering, AI/ML, agents, system design, or why something mysteriously stopped working at 2 AM.",
  },
];

export default function Contact() {
  const [messages, setMessages] = useState<
    {
      sender: "gokula" | "visitor";
      text: string;
    }[]
  >([
    {
      sender: "gokula",
      text: "Hey! 👋 You made it all the way here.",
    },
    {
      sender: "gokula",
      text: "So... what brings you here?",
    },
  ]);

  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);

  const handleIntent = (intent: Intent) => {
    if (selectedIntent) return;

    setSelectedIntent(intent.id);

    setMessages((prev) => [
      ...prev,
      {
        sender: "visitor",
        text: intent.message,
      },
      {
        sender: "gokula",
        text: intent.response,
      },
    ]);
  };

  const resetConversation = () => {
    setMessages([
      {
        sender: "gokula",
        text: "Hey! 👋 You made it all the way here.",
      },
      {
        sender: "gokula",
        text: "So... what brings you here?",
      },
    ]);

    setSelectedIntent(null);
  };

  return (
    <section className="relative h-full w-full overflow-hidden bg-[#f7f8f5] text-slate-900">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.02]" />

        {/* Decorative glow */}
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" />

        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-lime-300/10 blur-3xl" />
      </div>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col px-5 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-5 shrink-0 sm:mb-6">

          <div className="mb-2 flex items-center gap-3">
            <span className="h-px w-8 bg-emerald-500 sm:w-10" />

            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-600 sm:text-[10px]">
              Start a conversation
            </span>
          </div>

          <div className="flex items-end justify-between gap-4">

            <div>
              <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
                Let&apos;s Talk.
              </h2>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                No forms. No awkward corporate language. Just say hello.
              </p>
            </div>

            {/* Online status */}
            <div className="hidden items-center gap-2 sm:flex">

              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>

              <span className="font-mono text-[9px] text-slate-400">
                AVAILABLE
              </span>

            </div>

          </div>
        </div>

        {/* =================================================
            CONVERSATION CONTAINER
        ================================================= */}

        <div className="min-h-0 flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white/70 shadow-sm backdrop-blur-sm sm:rounded-3xl">

          {/* =================================================
              CHAT HEADER
          ================================================= */}

          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white/60 px-4 py-3 sm:px-5">

            <div className="flex items-center gap-3">

              {/* Avatar */}
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
                G
              </div>

              <div>
                <p className="text-xs font-bold text-slate-900">
                  Gokula Udhayan
                </p>

                <p className="font-mono text-[9px] text-emerald-600">
                  usually replies when not debugging
                </p>
              </div>

            </div>

            {/* Restart */}
            <button
              type="button"
              onClick={resetConversation}
              className="
                rounded-full
                p-2
                text-slate-400
                transition-all
                duration-300
                hover:bg-slate-100
                hover:text-slate-700
                hover:rotate-[-30deg]
              "
              aria-label="Restart conversation"
            >
              <RotateCcw size={14} />
            </button>

          </div>

          {/* =================================================
              CHAT BODY
          ================================================= */}

          <div className="flex h-full min-h-0 flex-col">

            {/* Messages */}
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">

              <div className="mx-auto flex max-w-2xl flex-col gap-3">

                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.sender === "visitor"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >

                    <div
                      className={`
                        max-w-[85%]
                        rounded-2xl
                        px-4
                        py-3
                        text-xs
                        leading-5
                        sm:text-sm
                        sm:leading-6

                        ${
                          message.sender === "visitor"
                            ? "rounded-br-md bg-slate-950 text-white"
                            : "rounded-bl-md border border-slate-200 bg-slate-50 text-slate-700"
                        }
                      `}
                    >
                      {message.text}
                    </div>

                  </div>
                ))}

              </div>

            </div>

            {/* =================================================
                INTENT BUTTONS
            ================================================= */}

            {!selectedIntent && (
              <div className="shrink-0 border-t border-slate-200 bg-white/70 p-3 sm:p-4">

                <p className="mb-2 text-center font-mono text-[9px] uppercase tracking-[0.15em] text-slate-400">
                  Choose your conversation
                </p>

                <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2">

                  {intents.map((intent) => (
                    <button
                      key={intent.id}
                      type="button"
                      onClick={() => handleIntent(intent)}
                      className="
                        group
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-slate-200
                        bg-white
                        px-3
                        py-2
                        text-[10px]
                        font-medium
                        text-slate-600
                        shadow-sm
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:border-emerald-300
                        hover:bg-emerald-50
                        hover:text-emerald-800
                        sm:px-4
                        sm:text-xs
                      "
                    >

                      <span className="text-slate-400 transition-colors group-hover:text-emerald-600">
                        {intent.icon}
                      </span>

                      {intent.label}

                    </button>
                  ))}

                </div>
              </div>
            )}

            {/* =================================================
                CONTACT OPTIONS
            ================================================= */}

            {selectedIntent && (
              <div className="shrink-0 border-t border-slate-200 bg-white/70 p-3 sm:p-4">

                <p className="mb-2 text-center font-mono text-[9px] uppercase tracking-[0.15em] text-slate-400">
                  Continue the conversation
                </p>

                <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2">

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
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-slate-200
                        bg-white
                        px-4
                        py-2.5
                        text-[10px]
                        font-medium
                        text-slate-600
                        shadow-sm
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:border-emerald-300
                        hover:bg-emerald-50
                        hover:text-emerald-800
                        sm:text-xs
                      "
                    >

                      {item.icon}

                      <span>
                        {item.name}
                      </span>

                      <ArrowUpRight
                        size={12}
                        className="
                          text-slate-400
                          transition-transform
                          duration-300
                          group-hover:-translate-y-0.5
                          group-hover:translate-x-0.5
                        "
                      />

                    </a>
                  ))}

                  {/* Resume */}
                  <a
                    href="/resume.pdf"
                    download="Gokul_Udhayan_Resume.pdf"
                    className="
                      group
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-emerald-200
                      bg-emerald-50
                      px-4
                      py-2.5
                      text-[10px]
                      font-medium
                      text-emerald-800
                      shadow-sm
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:bg-emerald-100
                      sm:text-xs
                    "
                  >

                    <Download size={13} />

                    <span>
                      Resume
                    </span>

                  </a>

                </div>
              </div>
            )}

          </div>
        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="mt-4 flex shrink-0 items-center justify-between border-t border-slate-200 pt-3">

          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-slate-400 sm:text-[10px]">
            Thanks for stopping by 👋
          </span>

          <span className="font-mono text-[9px] text-slate-400 sm:text-[10px]">
            2026
          </span>

        </div>

      </div>
    </section>
  );
}