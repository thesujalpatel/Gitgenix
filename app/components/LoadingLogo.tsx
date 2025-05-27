"use client";
import { motion } from "framer-motion";

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
            opacity: [1, 0.6, 1],
            scale: [1, 0.98, 1],
            filter: ["brightness(1)", "brightness(0.8)", "brightness(1)"],
          },
          transition: {
            duration: 1.5,
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
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }
      : {};

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...containerAnimation}
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      >
        {/* Top Left */}
        <motion.rect
          x="14"
          y="14"
          width="222"
          height="222"
          rx="30"
          fill="currentColor"
          className="text-cell-1"
          {...boxAnimation}
        />

        {/* Top Right */}
        <motion.rect
          x="264"
          y="14"
          width="222"
          height="222"
          rx="30"
          fill="currentColor"
          className="text-cell-3"
          {...boxAnimation}
          transition={{
            ...boxAnimation.transition,
            delay: 0.2,
          }}
        />

        {/* Bottom Left */}
        <motion.rect
          x="14"
          y="264"
          width="222"
          height="222"
          rx="30"
          fill="currentColor"
          className="text-cell-2"
          {...boxAnimation}
          transition={{
            ...boxAnimation.transition,
            delay: 0.4,
          }}
        />

        {/* Bottom Right */}
        <motion.rect
          x="264"
          y="264"
          width="222"
          height="222"
          rx="30"
          fill="currentColor"
          className="text-cell-4"
          {...boxAnimation}
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
        </motion.p>
      )}
    </div>
  );
}
