"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiGithub, FiBook, FiShare2, FiCode } from "react-icons/fi";
import { AiFillThunderbolt } from "react-icons/ai";

import { BiPalette } from "react-icons/bi";
import GitgenixLogo from "./assets/GitgenixLogo";
import AnimatedTagline from "./components/AnimatedTagline";
import {
  getAnimationPreferences,
  optimizeTransition,
} from "./utils/performanceUtils";
import OnboardingTour from "./components/OnboardingTour";
import { useOnboarding } from "./hooks/useOnboarding";

export default function Home() {
  const [animPrefs] = useState(() => getAnimationPreferences());

  // Initialize onboarding
  const { showWelcome, completeWelcomeTour } = useOnboarding();

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
      boxShadow: "none",
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: optimizeTransition(
        {
          type: "spring",
          stiffness: 100,
          damping: 15,
        },
        animPrefs
      ),
    },
    hover: animPrefs.preferSimpleAnimations
      ? { scale: 1.02 }
      : {
          scale: 1.03,
          y: -5,
          boxShadow: "0px 12px 30px rgba(42, 122, 239, 0.1)",
          transition: optimizeTransition({ duration: 0.2 }, animPrefs),
        },
  };

  const features = [
    {
      icon: <BiPalette className="w-6 h-6" />,
      title: "Visual Designer",
      description: "Intuitive click-and-drag interface to create patterns",
    },
    {
      icon: <FiCode className="w-6 h-6" />,
      title: "Smart Scripts",
      description: "Auto-generated shell scripts with perfect timing",
    },
    {
      icon: <FiShare2 className="w-6 h-6" />,
      title: "Easy Sharing",
      description: "Share your patterns with unique links",
    },
  ];

  return (
    <div className="mx-auto bg-gradient-to-br from-background via-background to-foreground/5">
      <motion.main
        className="flex flex-col items-center justify-center p-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div
          className="text-center max-w-4xl mx-auto pt-20 min-h-screen flex flex-col items-center justify-center"
          variants={itemVariants}
        >
          <motion.h1
            className="text-6xl md:text-7xl font-bold mb-6 flex flex-col md:flex-row items-center justify-center gap-2"
            variants={itemVariants}
          >
            <GitgenixLogo className="h-16 w-16 md:h-20 md:w-20" />
            <motion.span
              className="bg-gradient-to-r from-primary to-primary/40 bg-clip-text text-transparent font-extrabold px-2 py-1"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={optimizeTransition(
                { delay: 0.5, duration: 0.8 },
                animPrefs
              )}
            >
              Gitgenix
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 text-foreground/80 font-medium"
            variants={itemVariants}
          >
            <AnimatedTagline />
          </motion.p>

          <motion.p
            className="text-lg text-foreground/60 mb-12 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Transform your GitHub profile with beautiful contribution art.
            Design patterns, generate scripts, and create stunning visual
            stories that showcase your coding journey.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            variants={itemVariants}
          >
            <motion.div
              variants={buttonVariants}
              className="bg-primary text-white font-bold rounded-lg text-lg"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="/draw"
                className="flex items-center gap-2 px-8 py-4"
                style={{
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden" as const,
                }}
              >
                <AiFillThunderbolt className="w-5 h-5" />
                Start Creating
              </Link>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              className="border border-foreground/20 text-foreground font-semibold rounded-lg text-lg"
              whileHover="hover"
              whileTap="tap"
            >
              <Link href="/guide" className="flex items-center gap-2 px-8 py-4">
                <FiBook className="w-5 h-5" />
                View Guide
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-foreground/2 backdrop-blur-sm border border-foreground/20 rounded-xl p-6 text-center hover:bg-primary/3 transition-colors"
              variants={cardVariants}
              whileHover="hover"
            >
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-4"
                whileHover={
                  !animPrefs.preferSimpleAnimations ? { rotate: 5 } : {}
                }
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="text-center text-foreground/50 text-sm flex items-center gap-2"
          variants={itemVariants}
        >
          <p>
            Created by with <GitgenixLogo className="inline-block w-4 h-4" /> by{" "}
            <Link
              href="https://github.com/thesujalpatel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Sujal Patel
            </Link>
            <Link
              href="https://github.com/thesujalpatel/Gitgenix"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors flex justify-center items-center gap-1"
            >
              <FiGithub className="w-4 h-4" />
              Spark the Repository
            </Link>
          </p>{" "}
        </motion.div>
      </motion.main>
      {/* Onboarding Tour */}
      <OnboardingTour
        isVisible={showWelcome}
        onClose={completeWelcomeTour}
        variant="welcome"
      />
    </div>
  );
}

// Gitgenix thus serves as a unique, professional, and deeply meaningful name for your multi-year contribution graph project — combining historical richness, natural beauty, and time visualization in one elegant word.
