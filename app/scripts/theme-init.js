// Theme initialization script - runs before page load to prevent FOUC
(function () {
  try {
    // Get saved theme or default to system
    const savedTheme = localStorage.getItem("theme") || "system";

    function applyTheme(theme) {
      let themeToApply = theme;

      if (theme === "system") {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        themeToApply = prefersDark ? "dark" : "light";
      }

      document.documentElement.setAttribute("data-theme", themeToApply);

      // Also set a CSS class for immediate styling
      document.documentElement.className = `theme-${themeToApply}`;
    }

    // Apply theme immediately
    applyTheme(savedTheme);

    // Listen for system theme changes if using system preference
    if (savedTheme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme("system");

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.addListener(handleChange);
      }
    }
  } catch (error) {
    // Fallback to light theme if anything fails
    console.warn(
      "Theme initialization failed, falling back to light theme:",
      error
    );
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.className = "theme-light";
  }
})();
