"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowDown } from "lucide-react";
import HighlightWord from "./HighlightWord";

export default function AboutScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isFullyRevealed, setIsFullyRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  /* --------------------------------
     Canvas
  -------------------------------- */

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container || isFullyRevealed) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const setupCanvas = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      /* Scratch background */
      const gradient = ctx.createLinearGradient(
        0,
        0,
        width,
        height
      );

      gradient.addColorStop(0, "#65b96b");
      gradient.addColorStop(0.5, "#76c776");
      gradient.addColorStop(1, "#55a85e");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      /* Decorative circles */
      ctx.globalAlpha = 0.08;

      for (let i = 0; i < 25; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = 10 + Math.random() * 40;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);

        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      /* Text */
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const titleSize = Math.min(width / 22, 22);

      ctx.font = `bold ${titleSize}px sans-serif`;
      ctx.fillStyle = "#ffffff";

      ctx.fillText(
        "✨ Scratch to reveal my story ✨",
        width / 2,
        height / 2 - 20
      );

      ctx.font = `400 ${Math.min(width / 30, 14)}px sans-serif`;

      ctx.globalAlpha = 0.85;

      ctx.fillText(
        "There's some chaos underneath 😄",
        width / 2,
        height / 2 + 18
      );

      ctx.globalAlpha = 1;
    };

    setupCanvas();

    window.addEventListener("resize", setupCanvas);

    return () => {
      window.removeEventListener("resize", setupCanvas);
    };
  }, [isFullyRevealed]);

  /* --------------------------------
     Scratch
  -------------------------------- */

  const scratch = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;

      if (!canvas || isFullyRevealed) return;

      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.globalCompositeOperation = "destination-out";

      ctx.beginPath();

      ctx.arc(
        x,
        y,
        window.innerWidth < 640 ? 32 : 42,
        0,
        Math.PI * 2
      );

      ctx.fill();
    },
    [isFullyRevealed]
  );

  /* --------------------------------
     Pointer events
  -------------------------------- */

  const handleStart = (
    e: React.MouseEvent | React.TouchEvent
  ) => {
    setIsDrawing(true);

    const clientX =
      "touches" in e
        ? e.touches[0].clientX
        : e.clientX;

    const clientY =
      "touches" in e
        ? e.touches[0].clientY
        : e.clientY;

    scratch(clientX, clientY);
  };

  const handleMove = (
    e: React.MouseEvent | React.TouchEvent
  ) => {
    if (!isDrawing) return;

    const clientX =
      "touches" in e
        ? e.touches[0].clientX
        : e.clientX;

    const clientY =
      "touches" in e
        ? e.touches[0].clientY
        : e.clientY;

    scratch(clientX, clientY);
  };

  const handleEnd = () => {
    setIsDrawing(false);
  };

  return (
    <div
      ref={containerRef}
      className="
        relative
        mx-auto
        h-full
        w-full
        max-w-5xl
        overflow-hidden
        rounded-2xl
        border-4
        border-white
        bg-slate-950
        shadow-2xl
        sm:rounded-3xl
      "
    >

      {/* =====================================================
          REVEALED ABOUT CONTENT
      ===================================================== */}

      <section
        id="about"
        className="
          absolute
          inset-0
          overflow-hidden
          bg-slate-950
          bg-cover
          bg-center
          text-slate-100
        "
        style={{
          backgroundImage: "url('/H11.png')",
        }}
      >

        {/* Background overlay */}
        <div className="pointer-events-none absolute inset-0 bg-slate-950/70" />

        {/* SCROLLABLE CONTENT */}
        <div
          className="
            relative
            z-10
            h-full
            overflow-y-auto
            px-5
            py-8
            sm:px-8
            sm:py-10
            md:px-12
            lg:px-16
          "
        >

          <div className="mx-auto max-w-3xl">

            {/* Header */}
            <div className="mb-8 text-center">

              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-emerald-300 sm:text-[10px]">
                have fun by dragging or scratching the words
              </p>

              <h2 className="mt-2 text-3xl font-bold text-purple-300 sm:text-4xl">
                About Me
              </h2>

              <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />

            </div>

            {/* Story */}
            <div className="space-y-6">

              <p className="text-sm leading-7 text-gray-300 sm:text-base sm:leading-8">
                Hey there! I’m a{" "}
                <HighlightWord color="text-yellow-400">
                  passionate developer
                </HighlightWord>
                ,{" "}
                <HighlightWord color="text-purple-300">
                  tech explorer
                </HighlightWord>
                , and part-time{" "}
                <HighlightWord color="text-red-400">
                  bug creator
                </HighlightWord>
                {" "}
                (don’t worry, I fix them too 😌). I have a strong foundation
                in{" "}
                <HighlightWord color="text-blue-400">
                  software engineering
                </HighlightWord>
                ,{" "}
                <HighlightWord color="text-indigo-300">
                  AI/ML basics
                </HighlightWord>
                , and{" "}
                <HighlightWord color="text-green-400">
                  full-stack development
                </HighlightWord>
                , and I love building things that make life easier—or at least
                look cool while failing successfully. 😄
              </p>

              <p className="text-sm leading-7 text-gray-300 sm:text-base sm:leading-8">
                I enjoy working with tools like{" "}
                <HighlightWord color="text-yellow-300">
                  Python
                </HighlightWord>
                ,{" "}
                <HighlightWord color="text-yellow-400">
                  JavaScript
                </HighlightWord>
                ,{" "}
                <HighlightWord color="text-blue-300">
                  React
                </HighlightWord>
                , and anything that lets me turn{" "}
                <HighlightWord color="text-orange-400">
                  caffeine into code
                </HighlightWord>
                . Whether it&apos;s crafting{" "}
                <HighlightWord color="text-purple-400">
                  intelligent systems
                </HighlightWord>
                , automating boring tasks, or experimenting with the latest{" "}
                <HighlightWord color="text-pink-400">
                  AI models
                </HighlightWord>
                , I love bringing ideas to life. 🚀🤖
              </p>

              <p className="text-sm leading-7 text-gray-300 sm:text-base sm:leading-8">
                ✨ I{" "}
                <HighlightWord color="text-red-300">
                  thrive on challenges
                </HighlightWord>
                —give me a problem, and I’ll happily overthink it until the
                solution magically appears at{" "}
                <HighlightWord color="text-orange-300">
                  3 AM
                </HighlightWord>
                . I enjoy blending{" "}
                <HighlightWord color="text-teal-300">
                  creativity and logic
                </HighlightWord>
                , and just the right amount of chaos to build meaningful,
                efficient, and user-friendly projects.
              </p>

              <p className="text-sm leading-7 text-gray-300 sm:text-base sm:leading-8">
                I’m constantly exploring new technologies in{" "}
                <HighlightWord color="text-indigo-400">
                  AI and automation
                </HighlightWord>
                —because who doesn’t want their code to be smarter than them
                one day? 🤷‍♀️💻
              </p>

              {/* Personal */}
              <div className="rounded-2xl bg-black/40 p-5 backdrop-blur-sm sm:p-6">

                <p className="mb-4 font-medium text-white">
                  When I’m not coding, you’ll probably find me:
                </p>

                <div className="space-y-3 text-sm leading-7 text-gray-300">

                  <p>
                    ✈️ Dreaming about{" "}
                    <HighlightWord color="text-green-300">
                      traveling the world
                    </HighlightWord>
                    ,
                  </p>

                  <p>
                    📸{" "}
                    <HighlightWord color="text-blue-300">
                      Exploring new places
                    </HighlightWord>
                    {" "}like a curious traveler, not a tourist,
                  </p>

                  <p>
                    💸 And doing all of that with a wallet that strongly
                    disagrees with my ambitions. 🥹
                  </p>

                </div>
              </div>

              {/* Dream */}
              <p className="text-sm leading-7 text-gray-300 sm:text-base sm:leading-8">
                My dream? A{" "}
                <HighlightWord color="text-yellow-400">
                  career
                </HighlightWord>
                {" "}that lets me build cool things, learn endlessly, and
                collect memories across the globe—preferably without my bank
                account crying every month. 🌍😂
              </p>

              {/* Footer */}
              <div className="border-t border-white/10 py-6 text-center text-sm leading-7 text-gray-400">

                <p>
                  ✨{" "}
                  <HighlightWord color="text-pink-300">
                    Learning every day
                  </HighlightWord>
                </p>

                <p>
                  ✨{" "}
                  <HighlightWord color="text-orange-300">
                    Building with passion
                  </HighlightWord>
                </p>

                <p>
                  ✨ And{" "}
                  <HighlightWord color="text-red-400">
                    debugging with tears and determination
                  </HighlightWord>
                </p>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SCRATCH OVERLAY
      ===================================================== */}

      <AnimatePresence>
        {!isFullyRevealed && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.03,
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-30"
          >

            {/* Skip */}
            <motion.button
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
              }}
              onClick={() => setIsFullyRevealed(true)}
              className="
                absolute
                right-3
                top-3
                z-40
                flex
                items-center
                gap-1.5
                rounded-full
                bg-white
                px-3
                py-1.5
                text-[10px]
                font-semibold
                text-emerald-900
                shadow-lg
                transition-all
                duration-300
                hover:scale-105
                hover:bg-emerald-50
                sm:right-4
                sm:top-4
                sm:px-4
                sm:py-2
                sm:text-xs
              "
            >
              <X size={14} />

              Skip Scratch
            </motion.button>

            {/* Canvas */}
            <canvas
              ref={canvasRef}
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
              className="
                absolute
                inset-0
                z-20
                h-full
                w-full
                cursor-crosshair
                touch-none
              "
            />

            {/* Hint */}
            <div className="pointer-events-none absolute bottom-4 left-1/2 z-40 -translate-x-1/2">

              <div className="flex items-center gap-2 rounded-full bg-black/20 px-3 py-1.5 font-mono text-[9px] text-white/80 backdrop-blur-md">

                <ArrowDown size={11} />

                SCRATCH ME

              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}