"use client";
import { motion } from "framer-motion";
import { getAnimationVariant } from "@/utils/animationManager";

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export default function AnimatedText({
  text,
  className = "",
  style = {},
  delay = 0,
}: AnimatedTextProps) {
  const characterVariants = getAnimationVariant("characterStaggerStable");

  const containerVariants = {
    initial: { opacity: 1 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
    hover: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className={className}
      style={{
        ...style,
        display: "inline-block",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        textRendering: "optimizeLegibility",
      }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={characterVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          style={{
            display: "inline-block",
            transformOrigin: "center bottom",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            // Maintain gradient inheritance from parent
            backgroundImage: "inherit",
            backgroundClip: "inherit",
            WebkitBackgroundClip: "inherit",
            WebkitTextFillColor: "inherit",
            color: "inherit",
          }}
          className="character-animation"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
