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

  /*
   * Initialize scratch canvas
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container || isFullyRevealed) return;

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!ctx) return;

    const resizeCanvas = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      /*
       * Scratch surface
       */
      const gradient = ctx.createLinearGradient(
        0,
        0,
        width,
        height
      );

      gradient.addColorStop(0, "#65b96b");
      gradient.addColorStop(0.5, "#76c776");
      gradient.addColorStop(1, "#58aa62");

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      /*
       * Decorative circles
       */
      ctx.globalAlpha = 0.08;

      for (let i = 0; i < 18; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = 20 + Math.random() * 50;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      /*
       * Center message
       */
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const fontSize = Math.min(width / 22, 22);

      ctx.font = `600 ${fontSize}px sans-serif`;

      ctx.fillText(
        "Scratch to discover my story",
        width / 2,
        height / 2 - 15
      );

      ctx.font = `400 ${Math.min(width / 30, 14)}px sans-serif`;

      ctx.globalAlpha = 0.8;

      ctx.fillText(
        "Drag your mouse or finger",
        width / 2,
        height / 2 + 20
      );

      ctx.globalAlpha = 1;
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isFullyRevealed]);

  /*
   * Scratch
   */
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

  /*
   * Start scratching
   */
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

  /*
   * Continue scratching
   */
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
        border
        border-white/80
        bg-slate-950
        shadow-xl
        sm:rounded-3xl
      "
    >
      {/* =========================================
          ABOUT CONTENT
      ========================================= */}
      <section
        id="about"
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          overflow-hidden
          bg-slate-950
          bg-cover
          bg-center
          px-5
          py-6
          text-slate-100
          sm:px-8
          md:px-12
        "
        style={{
          backgroundImage: "url('/H11.png')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-slate-950/70" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl">

          {/* Header */}
          <div className="mb-5 text-center sm:mb-6">
            <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-300 sm:text-[10px]">
              A little about me
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              Behind the Code
            </h2>

            <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-emerald-400 sm:w-16" />
          </div>

          {/* Main introduction */}
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">

            <div className="rounded-xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm sm:p-5">
              <p className="text-xs leading-6 text-slate-300 sm:text-sm sm:leading-7">
                Hey there! I&apos;m a{" "}
                <HighlightWord color="text-yellow-300">
                  passionate developer
                </HighlightWord>
                ,{" "}
                <HighlightWord color="text-purple-300">
                  tech explorer
                </HighlightWord>
                , and part-time{" "}
                <HighlightWord color="text-red-300">
                  bug creator
                </HighlightWord>
                . I enjoy building software that solves real problems while
                learning how things work underneath the surface.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm sm:p-5">
              <p className="text-xs leading-6 text-slate-300 sm:text-sm sm:leading-7">
                My playground includes{" "}
                <HighlightWord color="text-yellow-300">
                  Python
                </HighlightWord>
                ,{" "}
                <HighlightWord color="text-blue-300">
                  React
                </HighlightWord>
                ,{" "}
                <HighlightWord color="text-green-300">
                  full-stack development
                </HighlightWord>
                , AI systems, automation, and anything that lets me turn an
                idea into something people can actually use.
              </p>
            </div>
          </div>

          {/* Philosophy */}
          <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] p-4 text-center sm:mt-5 sm:p-5">
            <p className="text-sm font-medium leading-6 text-slate-200 sm:text-base">
              &quot;Give me a problem and I&apos;ll probably overthink it
              until I understand it.&quot;
            </p>

            <p className="mt-2 font-mono text-[9px] text-emerald-300 sm:text-[10px]">
              learn → build → break → understand → repeat
            </p>
          </div>

          {/* Personal side */}
          <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-3">

            <div className="rounded-lg border border-white/10 bg-black/20 p-3 text-center">
              <span className="text-lg sm:text-xl">✈️</span>

              <p className="mt-1 text-[9px] text-slate-400 sm:text-[10px]">
                Travel
              </p>
            </div>

            <div className="rounded-lg border border-white/10 bg-black/20 p-3 text-center">
              <span className="text-lg sm:text-xl">💻</span>

              <p className="mt-1 text-[9px] text-slate-400 sm:text-[10px]">
                Build
              </p>
            </div>

            <div className="rounded-lg border border-white/10 bg-black/20 p-3 text-center">
              <span className="text-lg sm:text-xl">🧠</span>

              <p className="mt-1 text-[9px] text-slate-400 sm:text-[10px]">
                Learn
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SCRATCH OVERLAY
      ========================================= */}
      <AnimatePresence>
        {!isFullyRevealed && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.03,
            }}
            transition={{
              duration: 0.45,
            }}
            className="absolute inset-0 z-30"
          >
            {/* Skip */}
            <motion.button
              initial={{
                opacity: 0,
                y: -8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4,
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
                border
                border-white/40
                bg-white/90
                px-3
                py-1.5
                text-[10px]
                font-semibold
                text-emerald-900
                shadow-lg
                backdrop-blur-sm
                transition-all
                duration-300
                hover:scale-105
                hover:bg-white
                sm:right-4
                sm:top-4
                sm:px-4
                sm:py-2
                sm:text-xs
              "
            >
              <X size={13} />

              Skip
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

            {/* Small corner hint */}
            <div className="pointer-events-none absolute bottom-4 left-1/2 z-40 -translate-x-1/2">
              <div className="flex items-center gap-2 rounded-full bg-black/20 px-3 py-1.5 font-mono text-[9px] text-white/80 backdrop-blur-sm">
                <RotateCcw size={11} />

                SCRATCH
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}