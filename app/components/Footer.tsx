"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaStar, FaHeart } from "react-icons/fa6";
import { BiBookOpen } from "react-icons/bi";
import { FiPlay, FiGrid } from "react-icons/fi";
import GitgenixLogo from "../assets/GitgenixLogo";
import {
  getAnimationVariant,
  getSafeTransformProps,
} from "../utils/animationManager";

export default function Footer() {
  // Use consistent animation variants from the animation manager
  const containerVariants = getAnimationVariant("container");
  const itemVariants = getAnimationVariant("item");

  // Create stable animations without vertical movement to prevent hover glitches
  const stableLogoVariants = {
    initial: { scale: 1, rotate: 0 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.05,
      rotate: [0, -2, 2, 0],
      filter: "brightness(1.15)",
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        rotate: { duration: 0.6, ease: "easeInOut" },
      },
    },
  };
  // Enhanced link animation variants for better UX
  const quickLinkVariants = {
    initial: {
      scale: 1,
      x: 0,
      backgroundColor: "rgba(var(--color-foreground-rgb), 0.05)",
    },
    whileHover: {
      scale: 1.03,
      x: 4,
      backgroundColor: "rgba(var(--color-primary-rgb), 0.1)",
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 400,
        backgroundColor: { duration: 0.3 },
      },
    },
    whileTap: {
      scale: 0.98,
      x: 2,
      transition: { duration: 0.1, type: "spring", stiffness: 600 },
    },
  };

  const currentYear = new Date().getFullYear();
  return (
    <motion.footer
      className="relative bg-gradient-to-r from-background via-background to-foreground/5 border-t border-foreground/10"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Decorative top border with animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Brand Section */}
          <motion.div
            className="text-center md:text-left"
            variants={itemVariants}
          >
            {" "}
            <Link href="/" className="inline-block">
              <motion.div
                className="flex items-center justify-center md:justify-start gap-3 mb-4"
                variants={stableLogoVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                {...getSafeTransformProps()}
              >
                <GitgenixLogo className="w-8 h-8" />
                <span className="text-2xl font-bold text-gradient-primary">
                  Gitgenix
                </span>
              </motion.div>
            </Link>
            <p className="text-foreground/70 text-sm max-w-md mx-auto md:mx-0 leading-relaxed">
              Transform your GitHub contribution graph into beautiful art.
              Create patterns, generate scripts, and showcase your coding
              journey with style.
            </p>
          </motion.div>{" "}
          {/* Quick Links */}
          <motion.div className="text-center" variants={itemVariants}>
            <h3 className="font-semibold text-lg mb-6 text-foreground/90">
              Quick Links
            </h3>
            <div className="space-y-3">
              {[
                {
                  href: "/draw",
                  icon: <FiPlay className="w-4 h-4" />,
                  text: "Start Creating",
                  description: "Begin designing patterns",
                },
                {
                  href: "/guide",
                  icon: <BiBookOpen className="w-4 h-4" />,
                  text: "User Guide",
                  description: "Learn how to use Gitgenix",
                },
                {
                  href: "/gallery",
                  icon: <FiGrid className="w-4 h-4" />,
                  text: "Gallery",
                  description: "Explore example patterns",
                },
                // {
                //   href: "/draw/share",
                //   icon: <FiShare2 className="w-4 h-4" />,
                //   text: "Share Patterns",
                //   description: "Share your creations",
                // },
              ].map((link, index) => (
                <motion.div
                  key={index}
                  variants={quickLinkVariants}
                  initial="initial"
                  whileHover="whileHover"
                  whileTap="whileTap"
                  className="rounded-lg overflow-hidden"
                >
                  <Link
                    href={link.href}
                    className="group flex items-center gap-3 p-3 text-foreground/70 hover:text-primary transition-colors duration-200 relative"
                  >
                    {/* Icon container with enhanced animation */}
                    <motion.div
                      className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary"
                      initial={{ rotate: 0, scale: 1 }}
                      whileHover={{
                        rotate: [0, -5, 5, 0],
                        scale: 1.1,
                        backgroundColor: "rgba(var(--color-primary-rgb), 0.2)",
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {link.icon}
                    </motion.div>

                    {/* Text content with stagger animation */}
                    <div className="flex-1 text-left">
                      <motion.div
                        className="font-medium"
                        initial={{ x: 0 }}
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.text}
                      </motion.div>
                      <motion.div
                        className="text-xs text-foreground/50 group-hover:text-foreground/70 transition-colors"
                        initial={{ opacity: 0.7, x: 0 }}
                        whileHover={{ opacity: 1, x: 4 }}
                        transition={{ duration: 0.2, delay: 0.05 }}
                      >
                        {link.description}
                      </motion.div>
                    </div>

                    {/* Hover indicator arrow */}
                    <motion.div
                      className="text-primary/40 group-hover:text-primary transition-colors"
                      initial={{ x: -5, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.div>

                    {/* Background hover effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>{" "}
          {/* Creator & GitHub Star */}
          <motion.div
            className="text-center md:text-right"
            variants={itemVariants}
          >
            <h3 className="font-semibold text-lg mb-6 text-foreground/90">
              Connect
            </h3>{" "}
            <div className="space-y-4">
              {" "}
              <div className="flex items-center justify-center md:justify-end">
                <Link
                  href="https://thesujalpatel.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-end gap-2 text-foreground/70 hover:text-primary transition-colors duration-200"
                >
                  {" "}
                  <motion.div
                    initial={{ scale: 1, rotate: 0 }}
                    whileHover={{
                      scale: 1.15,
                      rotate: [0, -5, 5, 0],
                      filter:
                        "brightness(1.2) drop-shadow(0 0 8px rgba(239, 68, 68, 0.6))",
                      transition: {
                        duration: 0.4,
                        ease: "easeOut",
                      },
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    <FaHeart className="text-red-500" />
                  </motion.div>{" "}
                  <motion.span
                    initial={{
                      x: 0,
                      letterSpacing: "normal",
                      y: 0,
                      scale: 1,
                      color: "inherit",
                      textShadow: "0 0 0px rgba(59, 130, 246, 0)",
                    }}
                    whileHover={{
                      x: 3,
                      y: -1,
                      scale: 1.03,
                      letterSpacing: "0.02em",
                      color: "#3b82f6",
                      textShadow: "0 0 8px rgba(59, 130, 246, 0.6)",
                      transition: {
                        duration: 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smooth feel
                      },
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="relative inline-block creator-name-enhanced"
                  >
                    Created by Sujal Patel{" "}
                    {/* Multiple layers of underline animation for richer effect */}
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-400"
                      initial={{ width: 0, opacity: 0 }}
                      whileHover={{
                        width: "100%",
                        opacity: 1,
                        transition: {
                          duration: 0.4,
                          delay: 0.1,
                          ease: "easeOut",
                        },
                      }}
                      transition={{
                        width: { duration: 0.3, ease: "easeOut" },
                        opacity: { duration: 0.2, ease: "easeOut" },
                      }}
                    />
                    {/* Secondary subtle glow underline */}
                    <motion.div
                      className="absolute bottom-[-2px] left-0 w-0 h-1 blur-sm bg-blue-300/40"
                      initial={{ width: 0, opacity: 0 }}
                      whileHover={{
                        width: "100%",
                        opacity: 1,
                        transition: {
                          duration: 0.5,
                          delay: 0.2,
                          ease: "easeOut",
                        },
                      }}
                      transition={{
                        width: { duration: 0.4, ease: "easeOut" },
                        opacity: { duration: 0.3, ease: "easeOut" },
                      }}
                    />
                  </motion.span>
                </Link>
              </div>{" "}
              <div className="flex justify-center md:justify-end">
                {" "}
                <motion.div
                  className="inline-block hw-accelerated"
                  initial="initial"
                  whileHover="whileHover"
                  whileTap="whileTap"
                  exit="exit"
                >
                  {" "}
                  <Link
                    href="https://github.com/thesujalpatel/Gitgenix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black font-bold rounded-xl overflow-hidden group shadow-md star-button-enhanced"
                    style={{
                      borderRadius: "0.75rem",
                      WebkitBackgroundClip: "padding-box",
                      backgroundClip: "padding-box",
                    }}
                    onClick={(e) => {
                      // Create a ripple effect on click
                      const button = e.currentTarget;
                      const rect = button.getBoundingClientRect();
                      const size = Math.max(rect.width, rect.height);

                      // Add magnetic effect on click
                      const ripple = document.createElement("span");
                      ripple.style.width = ripple.style.height = `${size}px`;
                      ripple.style.left = `${
                        e.clientX - rect.left - size / 2
                      }px`;
                      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
                      ripple.classList.add("star-button-ripple");

                      button.appendChild(ripple);

                      // Create burst effect
                      const burstCount = 8; // Number of burst particles
                      for (let i = 0; i < burstCount; i++) {
                        const burst = document.createElement("span");
                        burst.classList.add("star-burst-particle");

                        // Random position and angle
                        const angle = (Math.PI * 2 * i) / burstCount;
                        const distance = 30 + Math.random() * 20;

                        burst.style.left = `${e.clientX - rect.left}px`;
                        burst.style.top = `${e.clientY - rect.top}px`;

                        // Use CSS variables to control the animation
                        burst.style.setProperty("--angle", `${angle}rad`);
                        burst.style.setProperty("--distance", `${distance}px`);
                        burst.style.setProperty(
                          "--delay",
                          `${Math.random() * 0.1}s`
                        );

                        button.appendChild(burst);

                        setTimeout(() => {
                          burst.remove();
                        }, 1000);
                      }

                      setTimeout(() => {
                        ripple.remove();
                      }, 700);
                    }}
                    onMouseMove={(e) => {
                      // Magnetic effect on hover
                      const button = e.currentTarget;
                      const rect = button.getBoundingClientRect();

                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;

                      // Calculate distance from center
                      const centerX = rect.width / 2;
                      const centerY = rect.height / 2;

                      // Calculate magnetic pull (max 5px movement)
                      const maxPull = 5;
                      const pullX = ((x - centerX) / centerX) * maxPull;
                      const pullY = ((y - centerY) / centerY) * maxPull;

                      // Apply transform
                      button.style.transform = `translate(${pullX}px, ${pullY}px) scale(1.05)`;
                    }}
                    onMouseLeave={(e) => {
                      // Reset transform with spring effect
                      const button = e.currentTarget;
                      button.style.transition =
                        "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
                      button.style.transform = "translate(0px, 0px) scale(1)";

                      // Reset after animation completes
                      setTimeout(() => {
                        button.style.transition = "";
                      }, 500);
                    }}
                  >
                    {/* Animated background gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500"
                      initial={{
                        backgroundSize: "200% 100%",
                        backgroundPosition: "0% 50%",
                      }}
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      whileHover={{
                        backgroundSize: "150% 100%",
                        backgroundPosition: ["0% 50%", "100% 50%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        backgroundSize: {
                          duration: 0.3,
                          repeat: 0,
                        },
                      }}
                    />{" "}
                    {/* Enhanced Premium UI shimmer effect with multiple layers */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12"
                      initial={{ x: "-100%" }}
                      whileHover={{
                        x: "100%",
                        transition: {
                          duration: 0.7,
                          ease: "easeInOut",
                          repeat: 2,
                          repeatType: "loop",
                          repeatDelay: 0.15,
                        },
                      }}
                      exit={{
                        x: "100%",
                        opacity: [1, 0.5, 0],
                        transition: {
                          duration: 0.4,
                          times: [0, 0.7, 1],
                          ease: "easeOut",
                        },
                      }}
                    />
                    {/* Secondary shimmer with delay for layered effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
                      initial={{ x: "-100%" }}
                      whileHover={{
                        x: "100%",
                        transition: {
                          duration: 0.7,
                          delay: 0.3,
                          ease: "easeInOut",
                          repeat: 2,
                          repeatType: "loop",
                          repeatDelay: 0.15,
                        },
                      }}
                      exit={{
                        x: "100%",
                        opacity: [1, 0.5, 0],
                        transition: {
                          duration: 0.3,
                          delay: 0.1,
                          times: [0, 0.6, 1],
                          ease: "easeOut",
                        },
                      }}
                    />{" "}
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 opacity-0 blur-xl"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileHover={{
                        opacity: [0, 0.3, 0.2],
                        scale: [0.9, 1.1, 1.05],
                        transition: {
                          duration: 1.2,
                          times: [0, 0.4, 1],
                          ease: "easeOut",
                        },
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.9,
                        transition: { duration: 0.3 },
                      }}
                    />{" "}
                    {/* Star icon with enhanced animation and fixed hover exit */}
                    <motion.div
                      initial={{ rotate: 0, scale: 1 }}
                      animate={{
                        rotate: [0, 8, -8, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 2,
                      }}
                      whileHover={{
                        scale: [1, 1.4, 1.35],
                        rotate: [0, 200, 180],
                        color: ["inherit", "#FFE55C", "#FFC107"],
                        filter: [
                          "drop-shadow(0 0 0px rgba(255, 193, 7, 0)) brightness(1)",
                          "drop-shadow(0 0 8px rgba(255, 193, 7, 0.9)) brightness(1.3)",
                          "drop-shadow(0 0 5px rgba(255, 193, 7, 0.7)) brightness(1.2)",
                        ],
                        transition: {
                          duration: 0.7,
                          times: [0, 0.6, 1],
                          ease: "easeOut",
                        },
                      }}
                      onMouseLeave={() => {
                        // Ensure clean exit animation
                      }}
                      style={{
                        // Better color contrast for visibility
                        color: "#1a1a1a", // Dark color for better contrast on yellow background
                        WebkitTextStroke: "0.5px rgba(0,0,0,0.1)",
                      }}
                      className="relative z-10"
                    >
                      <FaStar className="w-5 h-5 drop-shadow-sm" />
                    </motion.div>{" "}
                    <motion.span
                      className="relative z-10 font-extrabold tracking-wide"
                      initial={{ scale: 1, textShadow: "none" }}
                      whileHover={{
                        scale: [1, 1.07, 1.04],
                        textShadow: [
                          "0 0 0px rgba(255, 193, 7, 0)",
                          "0 0 4px rgba(255, 193, 7, 0.7)",
                          "0 0 3px rgba(255, 193, 7, 0.5)",
                        ],
                        letterSpacing: ["normal", "0.04em", "0.02em"],
                        transition: {
                          duration: 0.5,
                          times: [0, 0.6, 1],
                          ease: "easeOut",
                        },
                      }}
                      onMouseLeave={() => {
                        // Natural exit to initial state
                      }}
                      style={{
                        // Improved text contrast
                        color: "#1a1a1a",
                        WebkitTextStroke: "0.5px rgba(0,0,0,0.1)",
                      }}
                    >
                      Star on GitHub
                    </motion.span>{" "}
                    {/* Enhanced sparkle effects with improved exit behavior */}
                    <motion.div
                      className="absolute top-1 right-2 w-1.5 h-1.5 bg-white/90 rounded-full"
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0.8, 1.2, 0.8],
                        filter: [
                          "drop-shadow(0 0 0px rgba(255, 255, 255, 0))",
                          "drop-shadow(0 0 2px rgba(255, 255, 255, 0.8))",
                          "drop-shadow(0 0 0px rgba(255, 255, 255, 0))",
                        ],
                      }}
                      whileHover={{
                        opacity: [0, 1, 0, 1, 0],
                        scale: [0.8, 1.5, 0.9, 1.3, 0.7],
                        x: [0, 3, -2, 1, 0],
                        y: [0, -2, 1, -1, 0],
                        filter: [
                          "drop-shadow(0 0 0px rgba(255, 193, 7, 0))",
                          "drop-shadow(0 0 3px rgba(255, 193, 7, 0.9))",
                          "drop-shadow(0 0 2px rgba(255, 193, 7, 0.6))",
                          "drop-shadow(0 0 3px rgba(255, 193, 7, 0.9))",
                          "drop-shadow(0 0 0px rgba(255, 193, 7, 0))",
                        ],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: 0.1,
                      }}
                    />{" "}
                    <motion.div
                      className="absolute bottom-1 left-2 w-1 h-1 bg-white/80 rounded-full"
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0.7, 1.3, 0.7],
                        filter: [
                          "drop-shadow(0 0 0px rgba(255, 255, 255, 0))",
                          "drop-shadow(0 0 2px rgba(255, 255, 255, 0.8))",
                          "drop-shadow(0 0 0px rgba(255, 255, 255, 0))",
                        ],
                      }}
                      whileHover={{
                        opacity: [0, 1, 0, 1, 0],
                        scale: [0.7, 1.5, 0.8, 1.2, 0.7],
                        x: [0, -2, 3, -1, 0],
                        y: [0, 2, -1, 1, 0],
                        filter: [
                          "drop-shadow(0 0 0px rgba(255, 193, 7, 0))",
                          "drop-shadow(0 0 3px rgba(255, 193, 7, 0.9))",
                          "drop-shadow(0 0 2px rgba(255, 193, 7, 0.6))",
                          "drop-shadow(0 0 3px rgba(255, 193, 7, 0.9))",
                          "drop-shadow(0 0 0px rgba(255, 193, 7, 0))",
                        ],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        delay: 0.3,
                      }}
                    />
                    <motion.div
                      className="absolute top-3 left-1/3 w-0.5 h-0.5 bg-white/70 rounded-full"
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.5, 0.5],
                      }}
                      whileHover={{
                        opacity: [0, 1, 0, 1, 0],
                        scale: [0.5, 2, 1, 1.5, 0.5],
                        x: [0, 1, -1, 0.5, 0],
                        y: [0, -1, 0.5, -0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.5,
                      }}
                    />
                    {/* Add extra sparkles that only appear on hover */}
                    <motion.div
                      className="absolute top-2 left-2 w-1 h-1 bg-yellow-200 rounded-full"
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{
                        opacity: [0, 0.8, 0],
                        scale: [0, 1.5, 0],
                        rotate: [0, 180, 360],
                        x: [0, 10, 0],
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                    />
                    {/* Dynamic trailing star particles */}
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={`star-particle-${i}`}
                        className="absolute w-0.5 h-0.5 bg-yellow-100 rounded-full"
                        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                        whileHover={{
                          opacity: [0, 0.9, 0],
                          scale: [0, 1, 0],
                          x: [
                            0,
                            (i % 2 === 0 ? -1 : 1) * (Math.random() * 15 + 5),
                          ],
                          y: [
                            0,
                            (i % 3 === 0 ? -1 : 1) * (Math.random() * 15 + 5),
                          ],
                        }}
                        transition={{
                          duration: 0.8 + i * 0.2,
                          delay: i * 0.1,
                          repeat: Infinity,
                          repeatType: "loop",
                          repeatDelay: 0.2,
                        }}
                        style={{
                          top: `${50 + i * 5}%`,
                          left: `${30 + i * 10}%`,
                        }}
                      />
                    ))}{" "}
                    {/* Enhanced premium border effect */}{" "}
                    <motion.div
                      className="absolute inset-0 border-2 border-white/30 rounded-xl"
                      initial={{
                        scale: 1,
                        borderColor: "rgba(255,255,255,0.3)",
                      }}
                      whileHover={{
                        scale: [1, 1.03, 1.01],
                        borderColor: [
                          "rgba(255,255,255,0.3)",
                          "rgba(255,255,255,0.8)",
                          "rgba(255,255,255,0.6)",
                        ],
                        boxShadow: [
                          "0 0 0px rgba(255,215,0,0)",
                          "0 0 15px rgba(255,215,0,0.6)",
                          "0 0 8px rgba(255,215,0,0.4)",
                        ],
                        transition: {
                          duration: 0.8,
                          times: [0, 0.6, 1],
                          ease: "easeOut",
                        },
                      }}
                      exit={{
                        scale: [null, 1.02, 0.99, 1],
                        borderColor: [
                          null,
                          "rgba(255,255,255,0.5)",
                          "rgba(255,255,255,0.4)",
                          "rgba(255,255,255,0.3)",
                        ],
                        boxShadow: [
                          null,
                          "0 0 12px rgba(255,215,0,0.3)",
                          "0 0 5px rgba(255,215,0,0.1)",
                          "0 0 0px rgba(255,215,0,0)",
                        ],
                        transition: {
                          duration: 0.6,
                          times: [0, 0.2, 0.5, 1],
                          ease: "easeOut", // Removed type: "spring" to support multiple keyframes
                        },
                      }}
                    >
                      {/* Border corner accents that appear on hover */}
                      {[
                        "top-left",
                        "top-right",
                        "bottom-left",
                        "bottom-right",
                      ].map((corner, i) => (
                        <motion.div
                          key={corner}
                          className={`absolute w-3 h-3 border-${
                            corner.split("-")[0]
                          } border-${
                            corner.split("-")[1]
                          } border-yellow-300 opacity-0`}
                          style={{
                            [corner.split("-")[0]]: -1,
                            [corner.split("-")[1]]: -1,
                            borderWidth: corner.includes("top")
                              ? "2px 0 0 2px"
                              : corner.includes("bottom-left")
                              ? "0 0 2px 2px"
                              : "0 2px 2px 0",
                          }}
                          initial={{ opacity: 0 }}
                          whileHover={{
                            opacity: 1,
                            transition: { delay: 0.1 * i, duration: 0.2 },
                          }}
                          exit={{
                            opacity: 0,
                            transition: { duration: 0.1 },
                          }}
                        />
                      ))}
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>{" "}
        {/* Bottom Section */}
        <motion.div
          className="border-t border-foreground/10 mt-12 pt-8"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              className="text-foreground/60 text-sm"
              variants={itemVariants}
            >
              © {currentYear} Gitgenix. Made with{" "}
              <span className="text-red-500 font-medium">♥</span> for the
              developer community.
            </motion.p>{" "}
            <motion.div
              className="flex items-center justify-center text-sm text-foreground/60"
              variants={itemVariants}
              initial={{ opacity: 1 }}
              animate={{
                y: [0, -5, -2, -4, 0],
                x: [0, 3, -2, 1, 0],
                rotate: [0, 1, -1, 0.5, 0],
              }}
              transition={{
                duration: 12,
                times: [0, 0.25, 0.5, 0.75, 1],
                repeat: Infinity,
                ease: "easeInOut",
                y: {
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "reverse",
                },
                rotate: {
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "mirror",
                },
              }}
            >
              <span className="flex items-center gap-1.5 relative open-source-text">
                <motion.span
                  animate={{
                    rotate: [0, 10, -5, 8, 0],
                    scale: [1, 1.2, 1.05, 1.15, 1],
                    filter: [
                      "brightness(1) drop-shadow(0 0 0px rgba(250, 204, 21, 0))",
                      "brightness(1.2) drop-shadow(0 0 3px rgba(250, 204, 21, 0.6))",
                      "brightness(1.1) drop-shadow(0 0 2px rgba(250, 204, 21, 0.4))",
                      "brightness(1.15) drop-shadow(0 0 4px rgba(250, 204, 21, 0.5))",
                      "brightness(1) drop-shadow(0 0 0px rgba(250, 204, 21, 0))",
                    ],
                  }}
                  transition={{
                    duration: 8,
                    times: [0, 0.25, 0.5, 0.75, 1],
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "mirror",
                  }}
                  className="inline-block transform-gpu"
                >
                  ✨
                </motion.span>
                <motion.span
                  initial={{ y: 0, opacity: 1 }}
                  animate={{
                    y: [0, -1.5, 1, -1, 0],
                    x: [0, 1, -1, 1.5, 0],
                    rotate: [0, 0.3, -0.3, 0.2, 0],
                    opacity: 1, // Always visible
                    textShadow: [
                      "0 0 0px rgba(59, 130, 246, 0)",
                      "0 0 2px rgba(59, 130, 246, 0.2)",
                      "0 0 1px rgba(59, 130, 246, 0.1)",
                      "0 0 3px rgba(59, 130, 246, 0.3)",
                      "0 0 0px rgba(59, 130, 246, 0)",
                    ],
                  }}
                  transition={{
                    duration: 14,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    times: [0, 0.25, 0.5, 0.75, 1],
                  }}
                  className="font-medium tracking-wide transform-gpu text-foreground"
                >
                  Open Source
                </motion.span>
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
