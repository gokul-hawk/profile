import React from "react";

interface HighlightWordProps {
  children: React.ReactNode;
  color?: string;
}

export default function HighlightWord({ children, color = "text-emerald-700" }: HighlightWordProps) {
  return (
    <span className={`font-semibold ${color} transition-all duration-200 inline-block`}>
      {children}
    </span>
  );
}