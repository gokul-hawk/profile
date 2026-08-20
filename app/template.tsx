"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ perspective: "1200px" }} className="w-full overflow-hidden">
      <motion.div
        initial={{ rotateX: 15, opacity: 0, y: 40 }}
        animate={{ rotateX: 0, opacity: 1, y: 0 }}
        exit={{ rotateX: -15, opacity: 0, y: -40 }}
        transition={{
          type: "spring",
          stiffness: 70,
          damping: 15,
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </div>
  );
}