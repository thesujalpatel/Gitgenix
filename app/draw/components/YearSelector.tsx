import React, { useState } from "react";
import { BiSelectMultiple } from "react-icons/bi";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import {
  getAnimationPreferences,
  optimizeTransition,
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
  const [animPrefs] = useState(() => getAnimationPreferences());
  const currentYear = new Date().getFullYear().toString();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: animPrefs.preferSimpleAnimations
        ? {
            duration: 0.3,
          }
        : {
            staggerChildren: 0.05,
            delayChildren: 0.1,
          },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: optimizeTransition(
        {
          duration: 0.4,
          type: "spring",
          stiffness: 100,
        },
        animPrefs
      ),
    },
  };

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
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      data-onboarding="year-selector"
    >
      <motion.div className="flex items-center mb-2" variants={itemVariants}>
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
      </motion.div>

      <motion.p
        className="text-sm text-foreground/70 mb-3"
        variants={itemVariants}
      >
        Select one or more years to show graphs. Click on a year to toggle its
        selection.
      </motion.p>

      <motion.div
        className="flex flex-wrap gap-2"
        variants={containerVariants}
        role="group"
        aria-label="Year selection buttons"
      >
        {years.map((year) => {
          const isSelected = selectedYears.includes(year);
          const isCurrentCalendarYear = year === currentYear;

          return (
            <motion.button
              key={year}
              type="button"
              onClick={() => toggleYear(year)}
              className={`px-3 py-1.5 rounded-lg border transition-all relative ${
                isSelected
                  ? "border-primary/50 bg-primary/10 font-medium shadow-sm"
                  : "border-foreground/10 bg-foreground/5 hover:bg-foreground/10"
              }`}
              variants={itemVariants}
              whileHover={
                !animPrefs.preferSimpleAnimations
                  ? {
                      scale: 1.05,
                      boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)",
                    }
                  : {}
              }
              whileTap={{ scale: 0.95 }}
              layout
              transition={optimizeTransition(
                {
                  layout: { duration: 0.3 },
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                },
                animPrefs
              )}
              aria-pressed={isSelected}
              title={`${isSelected ? "Deselect" : "Select"} ${
                year === "current" ? "Current Year (Last 12 Months)" : year
              }`}
            >
              <div className="flex items-center gap-1">
                {year === "current" && (
                  <span className="text-primary">
                    <MdOutlineCalendarMonth />
                  </span>
                )}

                <span>
                  {year === "current" ? "Current Year (Last 12 Months)" : year}
                  {isCurrentCalendarYear && year !== "current" && " (Current)"}
                </span>
              </div>

              <AnimatePresence>
                {isSelected && (
                  <motion.span
                    className="absolute inset-0 border-2 border-primary rounded-lg pointer-events-none"
                    variants={selectedIndicatorVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  />
                )}
              </AnimatePresence>
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
              transition: { duration: 0.3, delay: 0.2 },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: { duration: 0.2 },
            }}
            className="text-sm text-primary font-medium mt-2 overflow-hidden"
          >
            Please select at least one year to display graphs
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedYears.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm text-foreground/60 mt-2 overflow-hidden"
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
