import React from "react";
import { BiSelectMultiple } from "react-icons/bi";
import { motion } from "framer-motion";

interface YearSelectorProps {
  years: string[];
  selectedYears: string[];
  toggleYear: (year: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export default function YearSelector({
  years,
  selectedYears,
  toggleYear,
}: YearSelectorProps) {
  return (
    <motion.section
      className="mb-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="flex items-center" variants={itemVariants}>
        <BiSelectMultiple className="inline-block mr-2" size={20} />
        <div className="text-lg font-bold">Year Selector</div>
      </motion.div>
      <motion.p className="text-sm text-gray-600 mb-2" variants={itemVariants}>
        Select one or more years to show graphs. Click on a year to toggle its
        selection.
      </motion.p>
      <motion.div className="flex flex-wrap gap-2" variants={containerVariants}>
        {years.map((year) => (
          <motion.button
            key={year}
            type="button"
            onClick={() => toggleYear(year)}
            className={`px-3 py-1 rounded-lg border border-foreground/10 bg-foreground/2 transition-colors cursor-pointer ${
              selectedYears.includes(year) ? "cell-intensity-3 text-white" : ""
            }`}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            layout
            transition={{ layout: { duration: 0.2 } }}
          >
            {year === "current" ? "Current Year (Last 12 Months)" : year}
          </motion.button>
        ))}
      </motion.div>
    </motion.section>
  );
}
