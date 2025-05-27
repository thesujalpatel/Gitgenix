import React, { useState, useEffect } from "react";
import { BiSelectMultiple } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { getAnimationVariant } from "../../utils/animationManager";
import {
  getAnimationPreferences,
  optimizeTransition,
  AnimationPreferences,
} from "../../utils/performanceUtils";

interface YearSelectorProps {
  years: string[];
  selectedYears: string[];
  toggleYear: (year: string) => void;
}

export default function YearSelector({
  years,
  selectedYears,
  toggleYear,
}: YearSelectorProps) {
  // Default preferences for SSR consistency
  const [animPrefs, setAnimPrefs] = useState<AnimationPreferences>({
    reduceMotion: true,
    isLowEndDevice: true,
    preferSimpleAnimations: true,
  });

  // Initialize animation preferences after mount to avoid hydration mismatch
  useEffect(() => {
    setAnimPrefs(getAnimationPreferences());
  }, []);

  // Use centralized animation system
  const containerVariant = getAnimationVariant("container");
  const itemVariant = getAnimationVariant("item");
  const buttonVariant = getAnimationVariant("button");

  const staggerTransition = optimizeTransition(
    {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
    animPrefs
  );

  const selectedIndicatorVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: optimizeTransition({ duration: 0.3 }, animPrefs),
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: optimizeTransition({ duration: 0.2 }, animPrefs),
    },
  };
  return (
    <motion.section
      className="mb-6"
      initial="initial"
      animate="animate"
      variants={containerVariant}
      transition={staggerTransition}
      data-onboarding="year-selector"
    >
      <motion.div className="flex items-center mb-2" variants={itemVariant}>
        {" "}
        <motion.span
          whileHover={
            !animPrefs.preferSimpleAnimations ? { rotate: 15, scale: 1.1 } : {}
          }
          transition={optimizeTransition({ duration: 0.2 }, animPrefs)}
          className="mr-2 text-primary"
        >
          <BiSelectMultiple size={22} />
        </motion.span>
        <div className="text-lg font-bold">Year Selector</div>
      </motion.div>{" "}
      <motion.p
        className="text-sm text-foreground/70 mb-3"
        variants={itemVariant}
      >
        Select one or more years to show graphs. Click on a year to toggle its
        selection.
      </motion.p>
      <motion.div
        className="flex flex-wrap gap-2 justify-center sm:justify-normal"
        variants={containerVariant}
        role="group"
        aria-label="Year selection buttons"
      >
        {years.map((year) => {
          const isSelected = selectedYears.includes(year);
          return (
            <motion.button
              key={year}
              type="button"
              onClick={() => toggleYear(year)}
              className={`px-3 py-1.5 rounded-lg border relative ${
                isSelected
                  ? "border-primary/50 bg-primary/10 font-medium shadow-sm"
                  : "border-foreground/10 bg-foreground/5"
              }`}
              variants={buttonVariant}
              whileHover={
                !animPrefs.preferSimpleAnimations
                  ? {
                      scale: 1.02,
                    }
                  : {}
              }
              whileTap="whileTap"
              layout
              transition={optimizeTransition(
                {
                  layout: { duration: 0.3 },
                  backgroundColor: { duration: 0.2 },
                  scale: { duration: 0.2 },
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                },
                animPrefs
              )}
              style={{ willChange: "transform, background-color" }}
              aria-pressed={isSelected}
              title={`${isSelected ? "Deselect" : "Select"} ${
                year === "current" ? "Current Year (Last 12 Months)" : year
              }`}
            >
              <div className="flex items-center gap-1">
                <AnimatePresence mode="wait">
                  {isSelected && (
                    <motion.span
                      className="absolute inset-0 border-2 border-primary rounded-lg pointer-events-none"
                      variants={selectedIndicatorVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      style={{ willChange: "opacity, transform" }}
                    />
                  )}
                </AnimatePresence>
                <span>
                  {year === "current" ? "Current Year (Last 12 Months)" : year}
                </span>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
      <AnimatePresence>
        {selectedYears.length === 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={optimizeTransition(
              {
                opacity: {
                  duration: 0.3,
                  delay: selectedYears.length === 0 ? 0.2 : 0,
                },
                height: {
                  duration: 0.3,
                  delay: selectedYears.length === 0 ? 0.1 : 0,
                },
              },
              animPrefs
            )}
            className="text-sm text-primary font-medium mt-2 overflow-hidden"
            style={{ willChange: "height, opacity" }}
          >
            Please select at least one year to display graphs
          </motion.div>
        )}
        {selectedYears.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={optimizeTransition(
              {
                opacity: { duration: 0.2 },
                height: { duration: 0.3 },
              },
              animPrefs
            )}
            className="text-sm text-foreground/60 mt-2 overflow-hidden"
            style={{ willChange: "height, opacity" }}
          >
            <span className="font-medium">{selectedYears.length}</span>{" "}
            {selectedYears.length === 1 ? "year" : "years"} selected:{" "}
            {selectedYears
              .map((y) => (y === "current" ? "Current" : y))
              .join(", ")}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
