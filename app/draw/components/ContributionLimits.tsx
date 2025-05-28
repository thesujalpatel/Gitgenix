import React, { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTarget, FiInfo } from "react-icons/fi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { getAnimationVariant } from "../../utils/animationManager";

interface ContributionLimitsProps {
  minContributions: number;
  setMinContributions: (value: number) => void;
  maxContributions: number;
  setMaxContributions: (value: number) => void;
}

// Input component for contribution limits
const LimitInput = ({
  label,
  value,
  onChange,
  min,
  max,
  icon,
  tooltip,
  index,
  id,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  icon: React.ReactNode;
  tooltip: string;
  index: number;
  id: string;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const itemVariant = getAnimationVariant("item");
  const buttonVariant = getAnimationVariant("buttonStable");

  const containerTransition = {
    duration: 0.4,
    delay: index * 0.15,
    type: "spring" as const,
    stiffness: 100,
    damping: 15,
  };

  const focusTransition = {
    duration: 0.2,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0;
    onChange(Math.min(Math.max(newValue, min), max));
  };

  return (
    <motion.section
      className="mb-2"
      variants={itemVariant}
      initial="initial"
      animate="animate"
      transition={containerTransition}
    >
      <motion.label
        htmlFor={id}
        className="font-semibold mb-1 flex items-center gap-2 text-sm"
        initial={{ opacity: 0.8 }}
        animate={{
          opacity: isFocused ? 1 : 0.8,
          color: isFocused ? "var(--color-primary)" : "inherit",
        }}
        transition={focusTransition}
      >
        <motion.span
          animate={{
            scale: isFocused ? 1.1 : 1,
            color: isFocused ? "var(--color-primary)" : "inherit",
          }}
          transition={focusTransition}
          className="text-lg"
        >
          {icon}
        </motion.span>
        {label}
        <span
          className="relative inline-block"
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
          onFocus={() => setTooltipVisible(true)}
          onBlur={() => setTooltipVisible(false)}
        >
          <motion.span
            variants={buttonVariant}
            whileHover="whileHover"
            whileTap="whileTap"
            className="cursor-help text-foreground/60 hover:text-foreground transition-colors"
          >
            <AiOutlineQuestionCircle size={14} />
          </motion.span>
          <AnimatePresence>
            {tooltipVisible && (
              <motion.div
                initial={{ opacity: 0, y: -5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute -top-2 left-6 transform -translate-y-full z-20 bg-background border border-foreground/20 text-foreground text-xs rounded-lg px-3 py-2 shadow-lg max-w-xs min-w-max"
                style={{
                  filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
                }}
              >
                {tooltip}
                <div className="absolute top-full left-3 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground/20"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </span>
      </motion.label>{" "}
      <motion.div className="relative">
        <input
          type="number"
          id={id}
          value={value}
          min={min}
          max={max}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground transition-all duration-200 ${
            isFocused ? "border-primary" : "border-foreground/30"
          }`}
          aria-required="true"
          aria-label={label}
        />
        <div className="text-xs text-foreground/60 mt-1">
          Range: {min} - {max}
        </div>
      </motion.div>
    </motion.section>
  );
};

// Memoize the component to prevent unnecessary re-renders
const ContributionLimits = memo(function ContributionLimits({
  minContributions,
  setMinContributions,
  maxContributions,
  setMaxContributions,
}: ContributionLimitsProps) {
  const containerVariant = getAnimationVariant("container");
  const containerTransition = {
    duration: 0.5,
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 relative"
      variants={containerVariant}
      initial="initial"
      animate="animate"
      transition={containerTransition}
      data-onboarding="contribution-limits"
    >
      <LimitInput
        id="min-contributions"
        label="Min Contributions"
        value={minContributions}
        onChange={setMinContributions}
        min={0}
        max={100}
        icon={<FiTarget />}
        tooltip="Minimum number of daily contributions for the lightest intensity level"
        index={0}
      />
      <LimitInput
        id="max-contributions"
        label="Max Contributions"
        value={maxContributions}
        onChange={setMaxContributions}
        min={1}
        max={1000}
        icon={<FiTarget />}
        tooltip="Maximum number of daily contributions for the highest intensity level"
        index={1}
      />

      <div className="md:col-span-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <FiInfo className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-700 dark:text-blue-300">
            <strong>Contribution Mapping:</strong> Your pattern will generate
            scripts with contribution counts distributed across 4 intensity
            levels between your min and max values for better visual clarity.
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default ContributionLimits;
