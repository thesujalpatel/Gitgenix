import React, { useState, useEffect } from "react";
import { LuCodeXml } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

interface GenerateScriptButtonProps {
  onClick: () => void;
  isEnabled?: boolean;
}

export default function GenerateScriptButton({
  onClick,
  isEnabled = true,
}: GenerateScriptButtonProps) {
  const [showCompletionAura, setShowCompletionAura] = useState(false);

  // Show special animation when form becomes complete
  useEffect(() => {
    if (isEnabled) {
      setShowCompletionAura(true);
      const timer = setTimeout(() => setShowCompletionAura(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isEnabled]);

  // Direct transition values
  const pulseTransition = {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut" as const,
  };
  return (
    <div className="relative">
      {" "}
      {/* Form completion spreading aura effect */}
      <AnimatePresence>
        {showCompletionAura && isEnabled && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Multiple expanding rings for dramatic effect */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border-2 border-blue-400/40 rounded-full"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{
                  scale: [1, 2, 3, 4],
                  opacity: [0.8, 0.6, 0.3, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Shimmering particles */}
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                style={{
                  left: `${50 + Math.cos((i * Math.PI * 2) / 6) * 20}%`,
                  top: `${50 + Math.sin((i * Math.PI * 2) / 6) * 20}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: [0, Math.cos((i * Math.PI * 2) / 6) * 50],
                  y: [0, Math.sin((i * Math.PI * 2) / 6) * 50],
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.5 + i * 0.1,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>{" "}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={onClick}
        disabled={!isEnabled}
        className={`relative h-8 w-8 rounded-full flex items-center justify-center cursor-pointer overflow-hidden ${
          isEnabled
            ? "bg-[#2a7aef]/80 border-blue-600 border text-white shadow-lg shadow-blue-500/25"
            : "bg-gray-400 border-gray-500 border text-gray-300 cursor-not-allowed"
        }`}
        title="Generate shell script to create an art canvas"
      >
        {" "}
        {/* Animated background glow when enabled */}
        {isEnabled && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full"
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.05, 1],
            }}
            transition={pulseTransition}
          />
        )}
        {/* Icon with subtle animation */}
        <motion.div
          className="relative z-10"
          animate={
            isEnabled
              ? {
                  rotate: [0, 5, -5, 0],
                }
              : {}
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <LuCodeXml size={20} />
        </motion.div>
        {/* Pulse rings when enabled */}
        {isEnabled && (
          <>
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border-2 border-blue-400/50 rounded-full"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{
                  scale: [1, 1.4, 1.8],
                  opacity: [0.8, 0.4, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 1,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </motion.button>
    </div>
  );
}
