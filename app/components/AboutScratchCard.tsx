"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, X } from "lucide-react";
import HighlightWord from "./HighlightWord";

export default function AboutScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isFullyRevealed, setIsFullyRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  /* --------------------------------
     Canvas Setup
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

      /* Scratch surface */
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

      /* Decorative pattern */
      ctx.globalAlpha = 0.07;

      for (let i = 0; i < 20; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = 15 + Math.random() * 45;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);

        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      /* Instruction */
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const titleSize = Math.min(width / 22, 22);

      ctx.font = `bold ${titleSize}px sans-serif`;
      ctx.fillStyle = "#ffffff";

      ctx.fillText(
        "✨ Scratch or drag to reveal my story ✨",
        width / 2,
        height / 2 - 18
      );

      ctx.font = `400 ${Math.min(width / 32, 14)}px sans-serif`;
      ctx.globalAlpha = 0.8;

      ctx.fillText(
        "Have fun — there's nothing serious here 😄",
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
     Mouse / Touch
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
        bg-emerald-900
        shadow-2xl
        sm:rounded-3xl
      "
    >

      {/* =====================================================
          HIDDEN ABOUT CONTENT
      ===================================================== */}

      <section
        id="about"
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          overflow-hidden
          bg-cover
          bg-center
          px-5
          py-6
          text-slate-100
          sm:px-8
          md:px-10
          lg:px-14
        "
        style={{
          backgroundImage: "url('/H11.png')",
        }}
      >

        {/* Background overlay */}
        <div className="absolute inset-0 bg-slate-950/65" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl">

          {/* Header */}
          <div className="mb-4 text-center sm:mb-5">

            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-emerald-300 sm:text-[10px]">
              have fun by dragging or scratching the words
            </p>

            <h2 className="mt-1 text-2xl font-bold text-purple-300 sm:text-3xl md:text-4xl">
              About Me
            </h2>

            <div className="mx-auto mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />

          </div>

          {/* Main Content */}
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2">

            {/* Story 1 */}
            <div className="rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-md sm:p-5">

              <p className="text-xs leading-6 text-gray-300 sm:text-sm sm:leading-7">

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
                (don’t worry, I fix them too 😌).

                <br />

                I have a strong foundation in{" "}
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
                .

              </p>

            </div>

            {/* Story 2 */}
            <div className="rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-md sm:p-5">

              <p className="text-xs leading-6 text-gray-300 sm:text-sm sm:leading-7">

                I love building things that make life easier—or at least
                look cool while{" "}
                <HighlightWord color="text-red-400">
                  failing successfully
                </HighlightWord>
                . 😄

                <br />

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
                .

              </p>

            </div>

            {/* Story 3 */}
            <div className="rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-md sm:p-5">

              <p className="text-xs leading-6 text-gray-300 sm:text-sm sm:leading-7">

                Whether it’s crafting{" "}
                <HighlightWord color="text-purple-400">
                  intelligent systems
                </HighlightWord>
                , automating boring tasks, or experimenting with the latest{" "}
                <HighlightWord color="text-pink-400">
                  AI models
                </HighlightWord>
                , I love bringing ideas to life. 🚀🤖

                <br />

                ✨ I{" "}
                <HighlightWord color="text-red-300">
                  thrive on challenges
                </HighlightWord>
                —give me a problem, and I’ll happily overthink it until the
                solution magically appears at{" "}
                <HighlightWord color="text-orange-300">
                  3 AM
                </HighlightWord>
                .

              </p>

            </div>

            {/* Story 4 */}
            <div className="rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-md sm:p-5">

              <p className="text-xs leading-6 text-gray-300 sm:text-sm sm:leading-7">

                I enjoy blending{" "}
                <HighlightWord color="text-teal-300">
                  creativity and logic
                </HighlightWord>
                , with just the right amount of chaos to build meaningful,
                efficient, and user-friendly projects.

                <br />

                I’m constantly exploring new technologies in{" "}
                <HighlightWord color="text-indigo-400">
                  AI and automation
                </HighlightWord>
                —because who doesn’t want their code to be smarter than them
                one day? 🤷‍♀️💻

              </p>

            </div>

          </div>

          {/* Personal Section */}
          <div className="mt-3 rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md sm:mt-4 sm:p-5">

            <p className="mb-3 text-xs font-medium text-white sm:text-sm">
              When I’m not coding, you’ll probably find me:
            </p>

            <div className="grid gap-2 text-[10px] text-gray-300 sm:grid-cols-3 sm:text-xs">

              <p>
                ✈️ Dreaming about{" "}
                <HighlightWord color="text-green-300">
                  traveling the world
                </HighlightWord>
              </p>

              <p>
                📸{" "}
                <HighlightWord color="text-blue-300">
                  Exploring new places
                </HighlightWord>
                {" "}like a curious traveler, not a tourist
              </p>

              <p>
                💸 And doing all of that with a wallet that strongly
                disagrees with my ambitions. 🥹
              </p>

            </div>

          </div>

          {/* Dream */}
          <div className="mt-3 text-center sm:mt-4">

            <p className="text-[10px] leading-5 text-gray-300 sm:text-xs sm:leading-6">

              My dream? A{" "}
              <HighlightWord color="text-yellow-400">
                career
              </HighlightWord>
              {" "}that lets me build cool things, learn endlessly, and
              collect memories across the globe—

              <span className="text-white">
                preferably without my bank account crying every month.
              </span>

              {" "}🌍😂

            </p>

          </div>

          {/* Footer personality */}
          <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1 text-[9px] text-gray-400 sm:mt-4 sm:text-[10px]">

            <span>
              ✨{" "}
              <HighlightWord color="text-pink-300">
                Learning every day
              </HighlightWord>
            </span>

            <span>
              ✨{" "}
              <HighlightWord color="text-orange-300">
                Building with passion
              </HighlightWord>
            </span>

            <span>
              ✨ And{" "}
              <HighlightWord color="text-red-400">
                debugging with tears
              </HighlightWord>
              {" "}and determination
            </span>

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
            transition={{
              duration: 0.5,
            }}
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

            {/* Scratch hint */}
            <div className="pointer-events-none absolute bottom-4 left-1/2 z-40 -translate-x-1/2">

              <div className="flex items-center gap-2 rounded-full bg-black/20 px-3 py-1.5 font-mono text-[9px] text-white/80 backdrop-blur-md">

                <RotateCcw size={11} />

                SCRATCH ME

              </div>

            </div>

          </motion.div>

        )}
      </AnimatePresence>

    </div>
  );
}