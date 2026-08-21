"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Compass, MapPin, Coffee, Code2 } from "lucide-react";

// HighlightWord component with drag capability
const HighlightWord = ({ children, color }: { children: React.ReactNode; color: string }) => {
  return (
    <motion.span
      className={`inline-block cursor-grab font-semibold ${color} select-none touch-none`}
      drag
      dragConstraints={{ left: -20, right: 20, top: -10, bottom: 10 }}
      dragElastic={0.2}
      whileTap={{ scale: 1.15 }}
      whileDrag={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.span>
  );
};

export default function About() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  // Initialize and handle responsive Scratch Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || isFullyRevealed) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      // Fill cover (Slate-900 with rich tint)
      ctx.fillStyle = "#0f172a"; 
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Draw responsive instructions text on cover
      ctx.fillStyle = "#98fb98"; 
      ctx.font = "bold 18px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      // Wrap text or center safely for mobile/desktop
      ctx.fillText("✨ Scratch or Drag to reveal my story! ✨", rect.width / 2, rect.height / 2);
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [isFullyRevealed]);

  // Scratch handler function
  const scratch = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || isFullyRevealed || !isScratching) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, Math.PI * 2);
    ctx.fill();
  }, [isFullyRevealed, isScratching]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen bg-slate-950 bg-cover bg-center flex flex-col items-center justify-center py-20 px-4 sm:px-6 md:px-12 overflow-hidden"
      style={{ backgroundImage: "url('/H11.png')" }}
    >
      {/* Dark overlay tint for readability */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px] z-10" />

      {/* 1. SCRATCH CARD CANVAS OVERLAY */}
      <AnimatePresence>
        {!isFullyRevealed && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-30 cursor-crosshair"
          >
            {/* Skip Scratch Button */}
            <button
              onClick={() => setIsFullyRevealed(true)}
              className="absolute top-6 right-6 sm:top-8 sm:right-8 z-40 flex items-center gap-2 px-4 py-2 bg-emerald-600/90 text-white rounded-full text-sm font-semibold shadow-lg hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95"
            >
              <X size={16} />
              Skip Scratch
            </button>

            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full touch-none"
              onMouseDown={() => setIsScratching(true)}
              onMouseUp={() => setIsScratching(false)}
              onMouseLeave={() => setIsScratching(false)}
              onMouseMove={scratch}
              onTouchStart={() => setIsScratching(true)}
              onTouchEnd={() => setIsScratching(false)}
              onTouchMove={scratch}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. REVEALED CONTENT UNDERNEATH */}
      <div className="relative z-20 w-full max-w-4xl mx-auto bg-slate-900/60 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl space-y-6">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <p className="text-xs sm:text-sm text-emerald-400 font-medium flex items-center justify-center gap-1.5">
            <Sparkles size={14} /> Have fun dragging words or scratching the layer!
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            About <span className="text-emerald-400">Me</span>
          </h2>
          <div className="h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"></div>
        </div>
        
        {/* Bio Paragraphs */}
        <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
          <p>
            Hey there! I’m a <HighlightWord color="text-yellow-400">passionate developer</HighlightWord>, <HighlightWord color="text-purple-300">tech explorer</HighlightWord>, and part-time <HighlightWord color="text-red-400">bug creator</HighlightWord> (don’t worry, I fix them too 😌). I have a strong foundation in <HighlightWord color="text-blue-400">software engineering</HighlightWord>, <HighlightWord color="text-indigo-300">AI/ML basics</HighlightWord>, and <HighlightWord color="text-green-400">full-stack development</HighlightWord>, and I love building things that make life easier—or at least look cool while failing successfully. 😄
          </p>

          <p>
            I enjoy working with tools like <HighlightWord color="text-yellow-300">Python</HighlightWord>, <HighlightWord color="text-yellow-400">JavaScript</HighlightWord>, <HighlightWord color="text-blue-300">React</HighlightWord>, and anything that lets me turn <HighlightWord color="text-orange-400">caffeine into code</HighlightWord>. Whether it&apos;s crafting <HighlightWord color="text-purple-400">intelligent systems</HighlightWord>, automating boring tasks, or experimenting with the latest <HighlightWord color="text-pink-400">AI models</HighlightWord>, I love bringing ideas to life. 🚀🤖
          </p>

          <p>
            ✨ I <HighlightWord color="text-red-300">thrive on challenges</HighlightWord>—give me a problem, and I’ll happily overthink it until the solution magically appears at 3 AM. I enjoy blending <HighlightWord color="text-teal-300">creativity, logic</HighlightWord>, and just the right amount of chaos to build meaningful, efficient, and user-friendly projects.
          </p>

          <p>
            I’m constantly exploring new technologies in <HighlightWord color="text-indigo-400">AI, automation</HighlightWord>, and intelligent systems—because who doesn’t want their code to be smarter than them one day? 🤷‍♀️💻
          </p>
        </div>

        {/* Hobby Box */}
        <div className="bg-slate-950/50 p-5 rounded-2xl border border-white/5 space-y-3 text-sm sm:text-base text-slate-300">
          <p className="font-semibold text-white flex items-center gap-2">
            <Coffee size={16} className="text-emerald-400" /> When I’m not coding, you’ll probably find me:
          </p>
          <div className="space-y-2 pl-2">
            <p className="flex items-center gap-2">✈️ Dreaming about <HighlightWord color="text-green-300">traveling the world</HighlightWord>,</p>
            <p className="flex items-center gap-2">📸 <HighlightWord color="text-blue-300">Exploring new places</HighlightWord> like a curious traveler, not a tourist,</p>
            <p className="flex items-center gap-2">💸 And doing all of that with a wallet that strongly disagrees with my ambitions. 🥹</p>
          </div>
        </div>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          My dream? A <HighlightWord color="text-yellow-400">career</HighlightWord> that lets me build cool things, learn endlessly, and collect memories across the globe—preferably without my bank account crying every month. 🌍😂
        </p>

        {/* Footer badges */}
        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs sm:text-sm text-slate-300 font-medium">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/50 border border-emerald-500/20 text-emerald-300">
            ✨ <HighlightWord color="text-pink-300">Learning every day</HighlightWord>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/50 border border-emerald-500/20 text-emerald-300">
            ✨ <HighlightWord color="text-orange-300">Building with passion</HighlightWord>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/50 border border-emerald-500/20 text-emerald-300">
            ✨ And <HighlightWord color="text-red-400">debugging</HighlightWord> with tears
          </span>
        </div>

      </div>
    </section>
  );
}