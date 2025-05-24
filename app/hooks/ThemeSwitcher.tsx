"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PiSun, PiMoon, PiDevices } from "react-icons/pi";
import {
  getAnimationPreferences,
  optimizeTransition,
} from "../utils/performanceUtils";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("system");
  const [animPrefs] = useState(() => getAnimationPreferences());

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme);
    applyTheme(savedTheme);

    if (savedTheme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    }
  }, []);

  const applyTheme = (value: string) => {
    let themeToApply = value;

    if (value === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      themeToApply = prefersDark ? "dark" : "light";
    }

    document.documentElement.setAttribute("data-theme", themeToApply);
  };

  const handleChange = (value: string) => {
    setTheme(value);
    localStorage.setItem("theme", value);
    applyTheme(value);
  };

  // Performance-optimized transition
  const buttonTransition = optimizeTransition(
    {
      duration: 0.3,
      ease: "easeInOut",
    },
    animPrefs
  );

  const iconTransition = optimizeTransition(
    {
      duration: 0.3,
      ease: "easeInOut",
    },
    animPrefs
  );

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <motion.button
          type="button"
          className="flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-300 ease-in-out bg-foreground/5 border-[1.5] border-foreground/40 hover:scale-103 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          aria-label={`Switch theme (current: ${theme})`}
          onClick={() => {
            const next =
              theme === "light"
                ? "dark"
                : theme === "dark"
                ? "system"
                : "light";
            handleChange(next);
          }}
          whileHover={
            !animPrefs.preferSimpleAnimations
              ? { scale: 1.05 }
              : { scale: 1.02 }
          }
          whileTap={{ scale: 0.95 }}
          transition={buttonTransition}
          style={{
            // Hardware acceleration hints
            transform: "translateZ(0)",
            backfaceVisibility: "hidden" as const,
          }}
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            <motion.div
              className="absolute"
              animate={{
                opacity: theme === "light" ? 1 : 0,
                rotate: theme === "light" ? 0 : 180,
                scale: theme === "light" ? 1 : 0.75,
              }}
              transition={iconTransition}
            >
              <PiSun size={20} className="text-foreground" />
            </motion.div>

            <motion.div
              className="absolute"
              animate={{
                opacity: theme === "dark" ? 1 : 0,
                rotate: theme === "dark" ? 0 : 180,
                scale: theme === "dark" ? 1 : 0.75,
              }}
              transition={iconTransition}
            >
              <PiMoon size={20} className="text-foreground" />
            </motion.div>

            <motion.div
              className="absolute"
              animate={{
                opacity: theme === "system" ? 1 : 0,
                rotate: theme === "system" ? 0 : 180,
                scale: theme === "system" ? 1 : 0.75,
              }}
              transition={iconTransition}
            >
              <PiDevices size={20} className="text-foreground" />
            </motion.div>
          </div>
        </motion.button>
      </div>
    </div>
  );
}
