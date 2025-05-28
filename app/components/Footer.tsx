"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaStar, FaGithub, FaHeart } from "react-icons/fa6";
import { BiGitBranch, BiCode } from "react-icons/bi";
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

  const stableLinkVariants = {
    initial: { scale: 1 },
    whileHover: {
      scale: 1.05,
      color: "var(--color-primary)",
      transition: { duration: 0.2, type: "spring", stiffness: 400 },
    },
    whileTap: {
      scale: 0.98,
      transition: { duration: 0.1, type: "spring", stiffness: 600 },
    },
  };

  const stableButtonVariants = {
    initial: { scale: 1 },
    whileHover: {
      scale: 1.02,
      filter: "brightness(1.1)",
      transition: { duration: 0.2, type: "spring", stiffness: 400 },
    },
    whileTap: {
      scale: 0.98,
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
            <div className="space-y-4">
              {" "}
              {[
                { href: "/draw", icon: <BiCode />, text: "Start Creating" },
                { href: "/guide", icon: <BiGitBranch />, text: "User Guide" },
                { href: "/draw/share", icon: <FaGithub />, text: "Examples" },
              ].map((link, index) => (
                <motion.div key={index} variants={stableLinkVariants}>
                  <Link
                    href={link.href}
                    className="flex items-center justify-center gap-2 text-foreground/70 hover:text-primary transition-colors duration-200"
                  >
                    {link.icon}
                    {link.text}
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
              <motion.div variants={stableLinkVariants}>
                <Link
                  href="https://thesujalpatel.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-end gap-2 text-foreground/70 hover:text-primary transition-colors duration-200"
                >
                  <FaHeart className="text-red-500" />
                  Created by Sujal Patel
                </Link>
              </motion.div>{" "}
              <div className="flex justify-center md:justify-end">
                {" "}
                <motion.div
                  variants={stableButtonVariants}
                  className="inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="https://github.com/thesujalpatel/Gitgenix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black font-bold rounded-xl overflow-hidden group shadow-lg transition-all duration-300"
                  >
                    {/* Animated background gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        backgroundSize: "200% 100%",
                      }}
                    />

                    {/* Premium UI shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12"
                      initial={{ x: "-100%" }}
                      whileHover={{
                        x: "100%",
                        transition: { duration: 0.6, ease: "easeInOut" },
                      }}
                    />

                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 opacity-0 blur-xl"
                      whileHover={{
                        opacity: 0.3,
                        scale: 1.1,
                        transition: { duration: 0.3 },
                      }}
                    />

                    {/* Star icon with premium animation */}
                    <motion.div
                      initial={{ rotate: 0, scale: 1 }}
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 2,
                      }}
                      whileHover={{
                        scale: 1.2,
                        rotate: 90,
                        transition: {
                          duration: 0.5,
                          type: "spring",
                          stiffness: 150,
                          damping: 12,
                        },
                      }}
                      className="relative z-10"
                    >
                      <FaStar className="w-5 h-5 drop-shadow-sm" />
                    </motion.div>

                    <span className="relative z-10 font-extrabold tracking-wide">
                      Star on GitHub
                    </span>

                    {/* Premium sparkle effects */}
                    <motion.div
                      className="absolute top-1 right-2 w-1.5 h-1.5 bg-white/90 rounded-full"
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.5,
                      }}
                    />
                    <motion.div
                      className="absolute bottom-1 left-2 w-1 h-1 bg-white/80 rounded-full"
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0.7, 1.3, 0.7],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: 1,
                      }}
                    />
                    <motion.div
                      className="absolute top-3 left-1/3 w-0.5 h-0.5 bg-white/70 rounded-full"
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.5, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: 1.5,
                      }}
                    />

                    {/* Premium border effect */}
                    <motion.div
                      className="absolute inset-0 border-2 border-white/30 rounded-xl"
                      whileHover={{
                        scale: 1.02,
                        borderColor: "rgba(255,255,255,0.6)",
                        transition: { duration: 0.3 },
                      }}
                    />
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
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.span
                className="flex items-center gap-1"
                whileHover={{
                  scale: 1.05,
                  color: "var(--color-primary)",
                  transition: { duration: 0.2 },
                }}
              >
                <motion.span
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 3,
                  }}
                >
                  ✨
                </motion.span>
                Open Source
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
