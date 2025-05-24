"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { taglines } from "../utils/constants";

interface AnimatedTaglineProps {
  lines?: string[];
  interval?: number;
}

export default function AnimatedTagline({
  lines = taglines,
  interval = 2500,
}: AnimatedTaglineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentLine = lines[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);

      // Give time for exit animation
      setTimeout(() => {
        setIsAnimating(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % lines.length);
      }, 400);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, lines.length]);

  // Function to render text with **text** as bold
  const renderTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const boldText = part.slice(2, -2);
        return (
          <span key={index} className="font-semibold text-foreground/70">
            {boldText}
          </span>
        );
      }
      return part;
    });
  };
  return (
    <span className="relative inline-flex min-w-[70px] justify-center">
      <motion.span
        key={currentLine}
        initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
        animate={{
          opacity: isAnimating ? 0 : 1,
          y: isAnimating ? -10 : 0,
          filter: isAnimating ? "blur(8px)" : "blur(0px)",
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
          type: "tween", // Better for low-end devices
        }}
        className="inline-block text-foreground/50"
        style={{
          // Hardware acceleration for smoother animations
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      >
        {renderTextWithBold(currentLine)}
      </motion.span>
    </span>
  );
}
