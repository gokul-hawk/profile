"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Briefcase,
  Code,
  Download,
  Mail,
  MessageCircle,
  RotateCcw,
  Send,
} from "lucide-react";

type Message = {
  id: number;
  sender: "gokula" | "visitor";
  text: string;
};

const contactLinks = [
  {
    name: "Gmail",
    href: "mailto:gokulaudhayannv@gmail.com",
    icon: <Mail className="h-4 w-4 text-emerald-700" />,
  },
  {
    name: "GitHub",
    href: "https://github.com/gokul-hawk",
    icon: <Code className="h-4 w-4 text-emerald-700" />,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/gokula-udhayan",
    icon: <Briefcase className="h-4 w-4 text-emerald-700" />,
  },
];

const getResponse = (message: string) => {
  const text = message.toLowerCase();

  if (
    text.includes("job") ||
    text.includes("hire") ||
    text.includes("recruit") ||
    text.includes("role")
  ) {
    return "Oh, a career conversation 👀. I'm interested! You can reach me through email or LinkedIn below.";
  }

  if (
    text.includes("project") ||
    text.includes("build") ||
    text.includes("collaborate") ||
    text.includes("work together")
  ) {
    return "Now we're talking! 🚀 Tell me about the project. I enjoy turning interesting ideas into working software.";
  }

  if (
    text.includes("ai") ||
    text.includes("machine learning") ||
    text.includes("ml") ||
    text.includes("agent")
  ) {
    return "My kind of conversation. 🤖 We can talk AI, agents, ML, software engineering, or why the model suddenly decides to stop cooperating.";
  }

  if (
    text.includes("hello") ||
    text.includes("hi") ||
    text.includes("hey")
  ) {
    return "Hey! 👋 Nice to meet you. What would you like to talk about?";
  }

  if (
    text.includes("github") ||
    text.includes("code") ||
    text.includes("portfolio")
  ) {
    return "Want to inspect the code? 😄 My GitHub is right below. Feel free to explore the chaos.";
  }

  return "Interesting! 👀 Tell me more. I promise I'm listening — unless I'm debugging something at 3 AM.";
};

export default function Contact() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "gokula",
      text: "Hey! 👋 You made it all the way here.",
    },
    {
      id: 2,
      sender: "gokula",
      text: "You can actually talk to me here. What do you want to say?",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  /* Scroll conversation to bottom */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const sendMessage = () => {
    const trimmedMessage = input.trim();

    if (!trimmedMessage || isTyping) return;

    const visitorMessage: Message = {
      id: Date.now(),
      sender: "visitor",
      text: trimmedMessage,
    };

    setMessages((prev) => [...prev, visitorMessage]);
    setInput("");

    setIsTyping(true);

    /* Fake typing delay */
    setTimeout(() => {
      const response: Message = {
        id: Date.now() + 1,
        sender: "gokula",
        text: getResponse(trimmedMessage),
      };

      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 700);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetConversation = () => {
    setMessages([
      {
        id: 1,
        sender: "gokula",
        text: "Hey! 👋 You made it all the way here.",
      },
      {
        id: 2,
        sender: "gokula",
        text: "You can actually talk to me here. What do you want to say?",
      },
    ]);

    setInput("");
    setIsTyping(false);
  };

  return (
    <section className="relative h-full w-full overflow-hidden bg-[#f7f8f5] text-slate-900">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.02]" />

        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" />

        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-lime-300/10 blur-3xl" />
      </div>

      {/* Main */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col px-5 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10">

        {/* Header */}
        <div className="mb-5 shrink-0 sm:mb-6">

          <div className="mb-2 flex items-center gap-3">
            <span className="h-px w-8 bg-emerald-500 sm:w-10" />

            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-600 sm:text-[10px]">
              Start a conversation
            </span>
          </div>

          <div className="flex items-end justify-between">

            <div>
              <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
                Let&apos;s Talk.
              </h2>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                No forms. Just type something.
              </p>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>

              <span className="font-mono text-[9px] text-slate-400">
                ONLINE
              </span>
            </div>

          </div>
        </div>

        {/* Conversation Window */}
        <div className="min-h-0 flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-sm sm:rounded-3xl">

          {/* Chat Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white/70 px-4 py-3 sm:px-5">

            <div className="flex items-center gap-3">

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

            <button
              type="button"
              onClick={resetConversation}
              className="rounded-full p-2 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-700"
              aria-label="Restart conversation"
            >
              <RotateCcw size={14} />
            </button>

          </div>

          {/* Chat */}
          <div className="flex h-[calc(100%-57px)] min-h-0 flex-col">

            {/* Messages */}
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">

              <div className="mx-auto flex max-w-2xl flex-col gap-3">

                {messages.map((message) => (
                  <div
                    key={message.id}
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

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">

                    <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-slate-50 px-4 py-3">

                      <div className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />

                        <span
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                          style={{ animationDelay: "100ms" }}
                        />

                        <span
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                          style={{ animationDelay: "200ms" }}
                        />
                      </div>

                    </div>

                  </div>
                )}

                <div ref={messagesEndRef} />

              </div>
            </div>

            {/* Contact Links */}
            <div className="shrink-0 border-t border-slate-200 bg-white/70 px-3 py-2.5">

              <div className="flex flex-wrap justify-center gap-1.5">

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
                      gap-1.5
                      rounded-full
                      border
                      border-slate-200
                      bg-white
                      px-3
                      py-1.5
                      text-[9px]
                      font-medium
                      text-slate-500
                      transition-all
                      hover:border-emerald-300
                      hover:bg-emerald-50
                      hover:text-emerald-800
                      sm:text-[10px]
                    "
                  >
                    {item.icon}

                    {item.name}

                    <ArrowUpRight
                      size={10}
                      className="text-slate-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                ))}

                <a
                  href="/resume.pdf"
                  download="Gokul_Udhayan_Resume.pdf"
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-emerald-200
                    bg-emerald-50
                    px-3
                    py-1.5
                    text-[9px]
                    font-medium
                    text-emerald-800
                    transition-all
                    hover:bg-emerald-100
                    sm:text-[10px]
                  "
                >
                  <Download size={10} />
                  Resume
                </a>

              </div>
            </div>

            {/* Input */}
            <div className="shrink-0 border-t border-slate-200 bg-white p-3 sm:p-4">

              <div className="mx-auto flex max-w-2xl items-center gap-2">

                <div className="relative flex-1">

                  <MessageCircle
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
                  />

                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type something..."
                    disabled={isTyping}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      py-2.5
                      pl-9
                      pr-3
                      text-xs
                      text-slate-800
                      outline-none
                      transition-all
                      placeholder:text-slate-400
                      focus:border-emerald-400
                      focus:bg-white
                      focus:ring-2
                      focus:ring-emerald-100
                      sm:py-3
                      sm:text-sm
                    "
                  />

                </div>

                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-slate-950
                    text-white
                    transition-all
                    duration-300
                    hover:bg-emerald-700
                    disabled:cursor-not-allowed
                    disabled:opacity-30
                    sm:h-11
                    sm:w-11
                  "
                  aria-label="Send message"
                >
                  <Send size={15} />
                </button>

              </div>

              <p className="mt-2 text-center font-mono text-[8px] text-slate-300">
                Press Enter to send
              </p>

            </div>

          </div>
        </div>

        {/* Footer */}
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