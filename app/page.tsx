"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import ArcadiaLogo from "./assets/ArcadiaLogo";
import AnimatedTagline from "./components/AnimatedTagline";
import {
  getAnimationPreferences,
  optimizeTransition,
} from "./utils/performanceUtils";

export default function Home() {
  const [animPrefs] = useState(() => getAnimationPreferences());

  // Performance-optimized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: optimizeTransition(
        {
          staggerChildren: animPrefs.preferSimpleAnimations ? 0.1 : 0.2,
          delayChildren: animPrefs.preferSimpleAnimations ? 0.1 : 0.3,
        },
        animPrefs
      ),
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: animPrefs.preferSimpleAnimations ? 10 : 20,
      scale: animPrefs.preferSimpleAnimations ? 0.98 : 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: optimizeTransition(
        {
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 0.6,
        },
        animPrefs
      ),
    },
  };

  const buttonVariants = {
    hover: animPrefs.preferSimpleAnimations
      ? { scale: 1.02 }
      : {
          scale: 1.05,
          boxShadow: "0px 8px 25px rgba(42, 122, 239, 0.3)",
          transition: optimizeTransition({ duration: 0.2 }, animPrefs),
        },
    tap: {
      scale: 0.95,
      transition: optimizeTransition({ duration: 0.1 }, animPrefs),
    },
  };

  return (
    <motion.main
      className="flex flex-col items-center justify-center min-h-screen p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-6xl font-bold mb-4 flex items-center gap-3"
        variants={itemVariants}
      >
        <ArcadiaLogo className="h-15 w-15" />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={optimizeTransition(
            { delay: 0.5, duration: 0.8 },
            animPrefs
          )}
        >
          Arcadia
        </motion.span>
      </motion.h1>

      <motion.p
        className="text-xl mb-8 flex justify-center"
        variants={itemVariants}
      >
        <AnimatedTagline />
      </motion.p>

      <motion.div variants={itemVariants}>
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Link
            href="/draw"
            className="bg-primary text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-[#2a7aef]/90 transition duration-200 inline-block"
            style={{
              // Hardware acceleration hints
              transform: "translateZ(0)",
              backfaceVisibility: "hidden" as const,
            }}
          >
            Get Started
          </Link>
        </motion.div>
      </motion.div>
    </motion.main>
  );
}

// Arcadia thus serves as a unique, professional, and deeply meaningful name for your multi-year contribution graph project — combining historical richness, natural beauty, and time visualization in one elegant word.
