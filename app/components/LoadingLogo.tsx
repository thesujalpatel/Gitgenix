"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { getAnimationPreferences } from "../utils/performanceUtils";

interface LoadingLogoProps {
  className?: string;
  size?: number;
  message?: string;
  variant?: "flickering" | "loading";
}

export default function LoadingLogo({
  className = "h-15 w-15",
  size = 60,
  message = "Loading...",
  variant = "loading",
}: LoadingLogoProps) {
  const [animPrefs] = useState(() => getAnimationPreferences());

  // Container animation for loading
  const containerAnimation =
    variant === "loading"
      ? {
          animate: {},
          transition: {
            staggerChildren: 0.2,
            repeat: Infinity,
            repeatDelay: 0.5,
          },
        }
      : {
          animate: {
            opacity: animPrefs.preferSimpleAnimations
              ? [1, 0.8, 1]
              : [1, 0.6, 1],
            scale: animPrefs.preferSimpleAnimations ? [1] : [1, 0.98, 1],
            filter: animPrefs.preferSimpleAnimations
              ? ["brightness(1)"]
              : ["brightness(1)", "brightness(0.8)", "brightness(1)"],
          },
          transition: {
            duration: animPrefs.preferSimpleAnimations ? 1 : 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        };

  // Individual box animations for loading sequence
  const boxAnimation =
    variant === "loading"
      ? {
          animate: {
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          },
          transition: {
            duration: 0.6,
            ease: "easeInOut",
          },
        }
      : {};
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={containerAnimation.animate}
        transition={containerAnimation.transition}
      >
        {/* Top right box */}
        <motion.rect
          x={264}
          y={14}
          width="222"
          height="222"
          rx="30"
          fill="currentColor"
          className="text-cell-3"
          animate={boxAnimation.animate}
          transition={{
            ...boxAnimation.transition,
            delay: 0,
          }}
        />

        {/* Bottom right box */}
        <motion.rect
          x={264}
          y={264}
          width="222"
          height="222"
          rx="30"
          fill="currentColor"
          className="text-cell-4"
          animate={boxAnimation.animate}
          transition={{
            ...boxAnimation.transition,
            delay: 0.2,
          }}
        />

        {/* Top left box */}
        <motion.rect
          x={14}
          y={14}
          width="222"
          height="222"
          rx="30"
          fill="currentColor"
          className="text-cell-1"
          animate={boxAnimation.animate}
          transition={{
            ...boxAnimation.transition,
            delay: 0.4,
          }}
        />

        {/* Bottom left box */}
        <motion.rect
          x={14}
          y={264}
          width="222"
          height="222"
          rx="30"
          fill="currentColor"
          className="text-cell-2"
          animate={boxAnimation.animate}
          transition={{
            ...boxAnimation.transition,
            delay: 0.6,
          }}
        />
      </motion.svg>

      {message && (
        <motion.p
          className="mt-3 text-lg font-medium text-foreground/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
          {!animPrefs.preferSimpleAnimations && (
            <>
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              >
                .
              </motion.span>
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              >
                .
              </motion.span>
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
              >
                .
              </motion.span>
            </>
          )}
        </motion.p>
      )}
    </div>
  );
}
