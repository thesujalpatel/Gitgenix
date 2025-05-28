"use client";

import ThemeSwitcher from "../hooks/ThemeSwitcher";
import { motion } from "framer-motion";
import Link from "next/link";
import GitgenixLogo from "../assets/GitgenixLogo";
import AnimatedText from "./AnimatedText";
import { getAnimationVariant } from "../utils/animationManager";
import { PiNotebook } from "react-icons/pi";
import { FiPlay } from "react-icons/fi";
import { useOnboardingContext } from "./OnboardingProvider";

export default function Navigation() {
  const { startTour } = useOnboardingContext();

  const handleTourClick = () => {
    startTour();
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={navTransition}
      className="flex items-center justify-between bg-background/95 backdrop-blur-md text-foreground border-b border-foreground/20 fixed top-0 left-0 right-0 z-[100] py-3 md:py-4 px-4 md:px-6 lg:px-8 min-h-[4rem] w-full"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="flex items-center"
      >
        <Link
          href={"/"}
          className="font-bold flex items-center text-xl md:text-2xl leading-relaxed"
        >
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="h-6 w-6 md:h-7 md:w-7 inline-block mr-2 flex-shrink-0"
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
              className="text-xl md:text-2xl font-bold text-gradient-primary leading-relaxed"
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
        className="flex items-center gap-2 md:gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Link href={"/guide"} rel="noreferrer">
          <motion.div
            className="w-9 h-9 md:w-10 md:h-10 rounded-2xl border-[1.5] border-foreground/40 flex justify-center items-center bg-foreground/5 text-foreground hover:bg-foreground/10 transition-colors"
            initial={{ rotate: 0 }}
            whileHover={{
              scale: 1.1,
              rotate: [0, -5, 5, -5, 0],
            }}
            whileTap={{ scale: 0.95 }}
            transition={guideTransition}
            title="User Guide"
            aria-label="Open user guide"
          >
            <PiNotebook className="inline-block" size={20} />
          </motion.div>
        </Link>

        <motion.button
          onClick={handleTourClick}
          className="w-9 h-9 md:w-10 md:h-10 rounded-2xl border-[1.5] border-foreground/40 flex justify-center items-center bg-foreground/5 text-foreground hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all duration-200"
          initial={{ rotate: 0 }}
          whileHover={{
            scale: 1.1,
            rotate: [0, -5, 5, -5, 0],
          }}
          whileTap={{ scale: 0.95 }}
          transition={guideTransition}
          title="Take the onboarding tour - Learn how to create GitHub contribution art"
          aria-label="Start onboarding tour"
        >
          <FiPlay className="inline-block" size={20} />
        </motion.button>

        <ThemeSwitcher />
      </motion.div>
    </motion.nav>
  );
}
