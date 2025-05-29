"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiHome, FiEdit3, FiBook, FiArrowLeft } from "react-icons/fi";
import { BiRocket } from "react-icons/bi";
import { getAnimationVariant } from "./utils/animationManager";

export default function NotFound() {
  const containerVariants = getAnimationVariant("container");
  const itemVariants = getAnimationVariant("slideWave");
  const buttonVariants = getAnimationVariant("buttonStable");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-foreground/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <motion.main
        className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="text-center max-w-2xl mx-auto"
          variants={itemVariants}
        >
          {/* 404 Display */}
          <motion.div
            className="mb-8"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <h1 className="text-8xl md:text-9xl font-bold text-gradient-primary mb-4">
              404
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto rounded-full"></div>
          </motion.div>

          {/* Error Message */}
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6 text-foreground"
            variants={itemVariants}
          >
            Page Not Found
          </motion.h2>

          <motion.p
            className="text-lg text-foreground/70 mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Oops! It looks like the page you&apos;re looking for doesn&apos;t
            exist or has been moved. Don&apos;t worry, let&apos;s get you back
            on track to creating amazing GitHub contribution art!
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            variants={itemVariants}
          >
            <Link href="/">
              <motion.div
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                className="bg-primary text-white font-semibold rounded-xl px-8 py-4 button-premium shadow-lg flex items-center gap-3"
                whileHover="whileHover"
                whileTap="whileTap"
              >
                <FiHome className="w-5 h-5" />
                Go Home
              </motion.div>
            </Link>

            <Link href="/draw">
              <motion.div
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                className="border-2 border-foreground/30 text-foreground font-semibold rounded-xl px-8 py-4 button-elegant flex items-center gap-3"
                whileHover="whileHover"
                whileTap="whileTap"
              >
                <FiEdit3 className="w-5 h-5" />
                Start Creating
              </motion.div>
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Link
                href="/draw"
                className="block p-4 bg-foreground/5 border border-foreground/10 rounded-xl hover:bg-foreground/10 transition-colors group"
              >
                <BiRocket className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-sm font-medium text-foreground">
                  Draw Patterns
                </div>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link
                href="/guide"
                className="block p-4 bg-foreground/5 border border-foreground/10 rounded-xl hover:bg-foreground/10 transition-colors group"
              >
                <FiBook className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-sm font-medium text-foreground">
                  User Guide
                </div>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link
                href="/examples"
                className="block p-4 bg-foreground/5 border border-foreground/10 rounded-xl hover:bg-foreground/10 transition-colors group"
              >
                <FiArrowLeft className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-sm font-medium text-foreground">
                  Examples
                </div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Back Button */}
          <motion.button
            onClick={() => window.history.back()}
            className="mt-8 text-primary hover:text-primary/80 transition-colors flex items-center gap-2 mx-auto text-sm"
            variants={itemVariants}
            whileHover={{ x: -5 }}
          >
            <FiArrowLeft className="w-4 h-4" />
            Go back to previous page
          </motion.button>
        </motion.div>
      </motion.main>
    </div>
  );
}
