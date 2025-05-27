import React, { memo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getAnimationPreferences,
  optimizeTransition,
  AnimationPreferences,
} from "../../utils/performanceUtils";

interface IntensitySelectorProps {
  selectedIntensity: number;
  setSelectedIntensity: (i: number) => void;
}

// Intensity levels array for better maintainability
const INTENSITY_LEVELS = [0, 1, 2, 3, 4];

// Memoize the component to prevent unnecessary re-renders
export default memo(function IntensitySelector({
  selectedIntensity,
  setSelectedIntensity,
}: IntensitySelectorProps) {
  // Default preferences for SSR consistency
  const [animPrefs, setAnimPrefs] = useState<AnimationPreferences>({
    reduceMotion: false,
    isLowEndDevice: false,
    preferSimpleAnimations: false,
  });

  // Initialize animation preferences after mount to avoid hydration mismatch
  useEffect(() => {
    setAnimPrefs(getAnimationPreferences());
  }, []);
  const containerTransition = optimizeTransition({
    duration: 0.3,
  });

  const buttonTransition = optimizeTransition({
    duration: 0.2,
    type: "spring",
    stiffness: 300,
  });

  return (
    <section>
      <motion.div
        className="flex gap-2 p-2 rounded-md"
        initial={{ opacity: 0.8, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={containerTransition}
      >
        {INTENSITY_LEVELS.map((i) => {
          const isSelected = selectedIntensity === i;
          return (
            <motion.button
              key={i}
              type="button"
              title={`Intensity level ${i}`}
              className={`w-6 h-6 rounded border-2 cell-intensity-${i} ${
                isSelected ? "border-foreground/80" : "border-transparent"
              } flex items-center justify-center text-xs relative`}
              aria-label={`Set intensity to level ${i}`}
              role="radio"
              aria-checked={isSelected ? "true" : "false"}
              tabIndex={0}
              onClick={() => setSelectedIntensity(i)}
              whileHover={
                !animPrefs.preferSimpleAnimations ? { scale: 1.1 } : {}
              }
              whileTap={{ scale: 0.95 }}
              transition={buttonTransition}
            >
              <motion.div
                className={`flex items-center justify-center
                ${
                  i === 0
                    ? "text-foreground/60"
                    : i === 1
                    ? "text-foreground/60"
                    : i === 2
                    ? "text-foreground/60"
                    : i === 3
                    ? "text-background/60"
                    : "text-background/60"
                }
                `}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {i}
              </motion.div>
              {isSelected && (
                <AnimatePresence>
                  <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    layoutId="selectedIntensity"
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  />
                </AnimatePresence>
              )}
            </motion.button>
          );
        })}
      </motion.div>
    </section>
  );
});
