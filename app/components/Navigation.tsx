"use client";

import ThemeSwitcher from "../hooks/ThemeSwitcher";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GitgenixLogo from "../assets/GitgenixLogo";
import AnimatedText from "./AnimatedText";
import { getAnimationVariant } from "../utils/animationManager";
import { PiNotebook } from "react-icons/pi";
import { FiHelpCircle, FiRefreshCw } from "react-icons/fi";
import { useOnboarding } from "../hooks/useOnboarding";
import { useState, useRef } from "react";

export default function Navigation() {
  const { startWelcomeTour, startGuidedTour, resetOnboarding } =
    useOnboarding();
  const pathname = usePathname();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleHelpClick = () => {
    // Start appropriate tour based on current page
    if (pathname === "/draw") {
      startGuidedTour();
    } else {
      startWelcomeTour();
    }
  };
  const handleRestartTour = () => {
    resetOnboarding();

    // Add a small delay to ensure state is reset
    setTimeout(() => {
      if (pathname === "/draw") {
        startGuidedTour();
      } else {
        startWelcomeTour();
      }

      // Show enhanced success feedback
      setTooltipVisible(true);
      if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);

      tooltipTimeoutRef.current = setTimeout(() => {
        setTooltipVisible(false);
      }, 3000);
    }, 100);
  };

  const navTransition = {
    duration: 0.6,
    type: "spring" as const,
    stiffness: 100,
    damping: 20,
    delay: 0.5,
  };

  const logoVariants = getAnimationVariant("logoStable");
  const guideTransition = {
    duration: 0.3,
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={navTransition}
      className="flex items-center justify-between bg-background text-foreground border border-foreground/30 fixed top-0 left-0 right-0 z-50 py-4 px-4 w-[80%] mx-auto rounded-b-lg pt-8 -translate-y-6 min-h-[4rem]"
      style={{ overflow: "visible" }}
    >
      {" "}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="flex items-center"
      >
        {" "}
        <Link
          href={"/"}
          className="font-bold flex items-center text-2xl leading-relaxed"
        >
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="h-7 w-7 inline-block mr-2 flex-shrink-0"
            style={{
              transformOrigin: "center center",
              backfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
            }}
          >
            <GitgenixLogo className="h-full w-full" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="relative"
          >
            <AnimatedText
              text="Gitgenix"
              className="text-2xl font-bold text-gradient-primary leading-relaxed"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden" as const,
                display: "inline-block",
                lineHeight: "1.4",
                paddingBottom: "0.125rem",
              }}
            />
          </motion.div>
        </Link>
      </motion.div>
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {" "}
        <Link href={"/guide"} rel="noreferrer">
          {" "}
          <motion.div
            className="w-10 h-10 rounded-2xl border-[1.5] border-foreground/40 flex justify-center items-center bg-foreground/5 text-foreground"
            initial={{ rotate: 0 }}
            whileHover={{
              scale: 1.1,
              rotate: [0, -5, 5, -5, 0],
            }}
            whileTap={{ scale: 0.95 }}
            transition={guideTransition}
          >
            <PiNotebook className="inline-block" size={24} />
          </motion.div>
        </Link>{" "}
        <motion.button
          onClick={handleHelpClick}
          className="w-10 h-10 rounded-2xl border-[1.5] border-foreground/40 flex justify-center items-center bg-foreground/5 text-foreground"
          initial={{ rotate: 0 }}
          whileHover={{
            scale: 1.1,
            rotate: [0, -5, 5, -5, 0],
          }}
          whileTap={{ scale: 0.95 }}
          transition={guideTransition}
          title="Take a tour"
        >
          <FiHelpCircle className="inline-block" size={24} />
        </motion.button>{" "}
        <div className="relative">
          <motion.button
            onClick={handleRestartTour}
            className="w-10 h-10 rounded-2xl border-[1.5] border-foreground/40 flex justify-center items-center bg-foreground/5 text-foreground"
            initial={{ rotate: 0 }}
            whileHover={{
              scale: 1.1,
              rotate: [0, -5, 5, -5, 0],
            }}
            whileTap={{ scale: 0.95 }}
            transition={guideTransition}
            title="Revisit Tour"
          >
            <FiRefreshCw className="inline-block" size={24} />
          </motion.button>
          <AnimatePresence>
            {tooltipVisible && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 top-12 bg-primary text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg z-50"
              >
                Tour reset successfully!
                <div className="absolute top-0 right-4 w-3 h-3 bg-primary transform -translate-y-1/2 rotate-45"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <ThemeSwitcher />
      </motion.div>
    </motion.nav>
  );
}
