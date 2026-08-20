"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import HighlightWord from "./HighlightWord";

export default function AboutScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  // Initialize Canvas Cover
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || isFullyRevealed) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // 1. Solid Pista Green Cover Fill (Ensures layer is clearly visible)
    ctx.fillStyle = "#76c776"; 
    ctx.fillRect(0, 0, width, height);

    // 2. Texture Overlay / Instructions
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✨ Scratch or drag here to reveal my story! ✨", width / 2, 70);
  }, [isFullyRevealed]);

  // Handle Scratching Action
  const scratch = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isFullyRevealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 45, 0, Math.PI * 2, false);
    ctx.fill();
  }, [isFullyRevealed]);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    scratch(clientX, clientY);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    scratch(clientX, clientY);
  };

  const handleEnd = () => {
    setIsDrawing(false);
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full max-w-4xl h-[70vh] rounded-3xl shadow-2xl overflow-hidden border-4 border-white mx-auto my-auto bg-emerald-700"
    >
      
      {/* 1. THE HIDDEN CONTENT SECTION */}
      <section
        id="about"
        className="absolute inset-0 bg-cover bg-center flex flex-col items-center justify-start overflow-y-auto p-8 md:p-12 z-10 text-slate-100"
        style={{ backgroundImage: "url('/H11.png')" }}
      >
        <div className="w-full text-center max-w-3xl">
          <p className="text-md text-gray-300">have fun by dragging or scratching the words</p>
          <h2 className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">
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

          <div className="text-md text-gray-300 leading-8 mb-6 text-left inline-block bg-black/40 p-6 rounded-xl backdrop-blur-sm">
            <p className="mb-2 text-white font-medium">When I’m not coding, you’ll probably find me:</p>
            <p className="ml-4">✈️ Dreaming about <HighlightWord color="text-green-300">traveling the world</HighlightWord>,</p>
            <p className="ml-4">📸 <HighlightWord color="text-blue-300">Exploring new places</HighlightWord> like a curious traveler, not a tourist,</p>
            <p className="ml-4">💸 And doing all of that with a wallet that strongly disagrees with my ambitions. 🥹</p>
          </div>

          <p className="text-md text-gray-300 leading-8 mb-6">
            My dream? A <HighlightWord color="text-yellow-400">career</HighlightWord> that lets me build cool things, learn endlessly, and collect memories across the globe—preferably without my bank account crying every month. 🌍😂
          </p>

          <div className="text-md text-gray-300 leading-8 pb-8">
            <p>✨ <HighlightWord color="text-pink-300">Learning every day</HighlightWord></p>
            <p>✨ <HighlightWord color="text-orange-300">Building with passion</HighlightWord></p>
            <p>✨ And <HighlightWord color="text-red-400">debugging</HighlightWord> with tears and determination</p>
          </div>
        </div>
      </section>

      {/* 2. THE SCRATCH-CARD OVERLAY & SKIP BUTTON */}
      <AnimatePresence>
        {!isFullyRevealed && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-30 overflow-hidden"
          >
            {/* Skip Button */}
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => setIsFullyRevealed(true)}
              className="absolute top-4 right-4 z-40 flex items-center gap-2 px-4 py-2 bg-white text-emerald-900 rounded-full font-semibold shadow-lg hover:bg-emerald-50 transition-all hover:scale-105 cursor-pointer"
            >
              <X size={16} />
              Skip Scratch
            </motion.button>

            {/* Interactive Scratch Canvas */}
            <canvas
              ref={canvasRef}
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
              className="absolute inset-0 w-full h-full cursor-crosshair touch-none z-20"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}