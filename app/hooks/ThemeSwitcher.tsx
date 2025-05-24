"use client";

import { useEffect, useState } from "react";
import { PiSun, PiMoon, PiDevices } from "react-icons/pi";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("system");

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

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <button
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
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            <PiSun
              size={20}
              className={`absolute text-foreground transition-all duration-300 ease-in-out ${
                theme === "light"
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 rotate-180 scale-75"
              }`}
            />
            <PiMoon
              size={20}
              className={`absolute text-foreground transition-all duration-300 ease-in-out ${
                theme === "dark"
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 rotate-180 scale-75"
              }`}
            />
            <PiDevices
              size={20}
              className={`absolute text-foreground transition-all duration-300 ease-in-out ${
                theme === "system"
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 rotate-180 scale-75"
              }`}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
