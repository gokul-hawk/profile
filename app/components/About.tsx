"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";

// HighlightWord component with drag capability
const HighlightWord = ({ children, color }: { children: React.ReactNode; color: string }) => {
  return (
    <motion.span
      className={`inline-block cursor-grab font-semibold ${color} select-none`}
      drag
      dragConstraints={{ left: -30, right: 30, top: -10, bottom: 10 }}
      dragElastic={0.3}
      whileTap={{ scale: 1.2 }}
      whileDrag={{ scale: 1.1, rotate: 10 }}
      transition={{ type: "spring", stiffness: 300 }}
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

  // Initialize Scratch Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || isFullyRevealed) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Fill cover (matching dark/blended theme overlay)
    ctx.fillStyle = "#1e293b"; // Slate-800 cover tone
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Draw instructions text on cover
    ctx.fillStyle = "#98fb98"; // Pista Green accent
    ctx.font = "bold 22px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✨ Scratch or Drag here to reveal my story! ✨", rect.width / 2, rect.height / 2);

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
    ctx.arc(x, y, 40, 0, Math.PI * 2);
    ctx.fill();
  }, [isFullyRevealed, isScratching]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative blended-background min-h-screen bg-cover bg-center flex flex-col items-center justify-center py-20 overflow-hidden"
      style={{ backgroundImage: "url('/H11.png')" }}
    >
      {/* 1. SCRATCH CARD CANVAS OVERLAY */}
      <AnimatePresence>
        {!isFullyRevealed && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-30 cursor-crosshair"
          >
            {/* Skip Scratch Button */}
            <button
              onClick={() => setIsFullyRevealed(true)}
              className="absolute top-8 right-8 z-40 flex items-center gap-2 px-4 py-2 bg-purple-600/90 text-white rounded-full font-semibold shadow-lg hover:bg-purple-700 transition-all hover:scale-105"
            >
              <X size={18} />
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

      {/* 2. REVEALED CONTENT UNDERNEATH (Your Exact Code + Draggable Words) */}
      <div className="relative z-10 w-full px-6 md:px-20 text-center max-w-4xl mx-auto bg-black/40 backdrop-blur-sm p-8 rounded-3xl border border-white/10 shadow-2xl">
        <p className="text-md text-gray-400">have fun by dragging the words or scratching the layer</p>
        <h2 className="text-3xl md:text-4xl font-bold text-purple-400 mb-4">
          About Me
        </h2>
        
        <div className="border-b-4 border-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 w-32 mx-auto mb-6"></div>
        
        <p className="text-md text-gray-300 leading-8 mb-6">
          Hey there! I’m a <HighlightWord color="text-yellow-400">passionate developer</HighlightWord>, <HighlightWord color="text-purple-300">tech explorer</HighlightWord>, and part-time <HighlightWord color="text-red-400">bug creator</HighlightWord> (don’t worry, I fix them too 😌). I have a strong foundation in <HighlightWord color="text-blue-400">software engineering</HighlightWord>, <HighlightWord color="text-indigo-300">AI/ML basics</HighlightWord>, and <HighlightWord color="text-green-400">full-stack development</HighlightWord>, and I love building things that make life easier—or at least look cool while failing successfully. 😄
        </p>

        <p className="text-md text-gray-300 leading-8 mb-6">
          I enjoy working with tools like <HighlightWord color="text-yellow-300">Python</HighlightWord>, <HighlightWord color="text-yellow-400">JavaScript</HighlightWord>, <HighlightWord color="text-blue-300">React</HighlightWord>, and anything that lets me turn <HighlightWord color="text-orange-400">caffeine into code</HighlightWord>. Whether it&apos;s crafting <HighlightWord color="text-purple-400">intelligent systems</HighlightWord>, automating boring tasks, or experimenting with the latest <HighlightWord color="text-pink-400">AI models</HighlightWord>, I love bringing ideas to life. 🚀🤖
        </p>

        <p className="text-md text-gray-300 leading-8 mb-6">
          ✨ I <HighlightWord color="text-red-300">thrive on challenges</HighlightWord>—give me a problem, and I’ll happily overthink it until the solution magically appears at 3 AM. I enjoy blending <HighlightWord color="text-teal-300">creativity, logic</HighlightWord>, and just the right amount of chaos to build meaningful, efficient, and user-friendly projects.
        </p>

        <p className="text-md text-gray-300 leading-8 mb-6">
          I’m constantly exploring new technologies in <HighlightWord color="text-indigo-400">AI, automation</HighlightWord>, and intelligent systems—because who doesn’t want their code to be smarter than them one day? 🤷‍♀️💻
        </p>

        <div className="text-md text-gray-300 leading-8 mb-6 text-left inline-block bg-black/30 p-6 rounded-xl border border-white/5">
          <p className="mb-2 text-white">When I’m not coding, you’ll probably find me:</p>
          <p className="ml-4">✈️ Dreaming about <HighlightWord color="text-green-300">traveling the world</HighlightWord>,</p>
          <p className="ml-4">📸 <HighlightWord color="text-blue-300">Exploring new places</HighlightWord> like a curious traveler, not a tourist,</p>
          <p className="ml-4">💸 And doing all of that with a wallet that strongly disagrees with my ambitions. 🥹</p>
        </div>

        <p className="text-md text-gray-300 leading-8 mb-6">
          My dream? A <HighlightWord color="text-yellow-400">career</HighlightWord> that lets me build cool things, learn endlessly, and collect memories across the globe—preferably without my bank account crying every month. 🌍😂
        </p>

        <div className="text-md text-gray-300 leading-8 space-y-1">
          <p>✨ <HighlightWord color="text-pink-300">Learning every day</HighlightWord></p>
          <p>✨ <HighlightWord color="text-orange-300">Building with passion</HighlightWord></p>
          <p>✨ And <HighlightWord color="text-red-400">debugging</HighlightWord> with tears and determination</p>
        </div>
      </div>
    </section>
  );
};