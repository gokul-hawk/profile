"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FlipPortfolioContainerProps {
  children: ReactNode[];
}

// Define the names corresponding to your sections in order
const SECTION_NAMES = ["Home", "About Me", "Projects", "Contact"];

export default function FlipPortfolioContainer({ children }: FlipPortfolioContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const totalSections = React.Children.count(children);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      if (e.deltaY > 30) {
        // Scroll Down -> Next Section
        if (currentIndex < totalSections - 1) {
          setIsScrolling(true);
          setCurrentIndex((prev) => prev + 1);
          setTimeout(() => setIsScrolling(false), 800); // Cooldown for flip animation
        }
      } else if (e.deltaY < -30) {
        // Scroll Up -> Previous Section
        if (currentIndex > 0) {
          setIsScrolling(true);
          setCurrentIndex((prev) => prev - 1);
          setTimeout(() => setIsScrolling(false), 800);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        if (currentIndex < totalSections - 1) {
          setIsScrolling(true);
          setCurrentIndex((prev) => prev + 1);
          setTimeout(() => setIsScrolling(false), 800);
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        if (currentIndex > 0) {
          setIsScrolling(true);
          setCurrentIndex((prev) => prev - 1);
          setTimeout(() => setIsScrolling(false), 800);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, totalSections, isScrolling]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-emerald-200 flex items-center justify-center perspective-[1500px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ rotateX: 90, opacity: 0, scale: 0.95 }}
          animate={{ rotateX: 0, opacity: 1, scale: 1 }}
          exit={{ rotateX: -90, opacity: 0, scale: 0.95 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1], // Custom smooth cubic-bezier curve
          }}
          style={{ transformOrigin: "center center" }}
          className="absolute inset-0 w-full h-full flex items-center justify-center overflow-y-auto bg-pista shadow-2xl"
        >
          {React.Children.toArray(children)[currentIndex]}
        </motion.div>
      </AnimatePresence>

      {/* Floating Dot Pagination with Visible Style and Hover Tooltips */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3.5 bg-black/10 backdrop-blur-md p-3 rounded-full border border-white/20 shadow-lg">
        {Array.from({ length: totalSections }).map((_, index) => {
          const sectionName = SECTION_NAMES[index] || `Section ${index + 1}`;
          const isActive = currentIndex === index;

          return (
            <div key={index} className="relative group flex items-center justify-end">
              
              {/* Tooltip Label (Shows on hover) */}
              <span className="absolute right-7 px-2.5 py-1 rounded-md bg-slate-900 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
                {sectionName}
              </span>

              {/* Navigation Dot Button */}
              <button
                onClick={() => {
                  if (!isScrolling) {
                    setIsScrolling(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsScrolling(false), 800);
                  }
                }}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-emerald-700 scale-125 ring-4 ring-emerald-300 shadow-md"
                    : "bg-white/70 hover:bg-white hover:scale-110"
                }`}
                aria-label={`Go to ${sectionName}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}