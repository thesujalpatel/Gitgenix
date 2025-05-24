import React from "react";
import { LuCodeXml } from "react-icons/lu";
import { motion } from "framer-motion";

interface GenerateScriptButtonProps {
  onClick: () => void;
  isEnabled?: boolean;
}

export default function GenerateScriptButton({
  onClick,
  isEnabled = true,
}: GenerateScriptButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
        duration: 0.1,
      }}
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
      {/* Animated background glow when enabled */}
      {isEnabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full"
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
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
  );
}
