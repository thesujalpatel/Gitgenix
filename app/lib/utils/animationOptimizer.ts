"use client";

/**
 * Animation Optimizer for Gitgenix
 * Ensures smooth animations by optimizing Framer Motion and CSS transitions
 * Prevents animation jank and stuck hover states
 */

type PerformanceOptions = {
  preferReducedMotion: boolean;
  enableHardwareAcceleration: boolean;
  optimizeForLowPower: boolean;
};

// Default performance options - can be overridden by user preferences
const defaultOptions: PerformanceOptions = {
  preferReducedMotion: false,
  enableHardwareAcceleration: true,
  optimizeForLowPower: false,
};

// Get user preferences from localStorage if available
export function getUserAnimationPreferences(): PerformanceOptions {
  if (typeof window === "undefined") return defaultOptions;
  
  try {
    const savedPrefs = localStorage.getItem("gitgenix-animation-prefs");
    if (savedPrefs) {
      return JSON.parse(savedPrefs);
    }
    
    // Detect system preference for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const options = { 
      ...defaultOptions,
      preferReducedMotion: prefersReducedMotion,
    };
    
    // Save detected preferences
    localStorage.setItem("gitgenix-animation-prefs", JSON.stringify(options));
    return options;
  } catch  {
    return defaultOptions;
  }
}

// Generate optimized Framer Motion transition props based on user preferences and component needs
export function getOptimizedTransition(
  options: {
    type?: "spring" | "tween" | "inertia";
    duration?: number;
    stiffness?: number;
    damping?: number;
    delay?: number;
  } = {}
) {
  const prefs = getUserAnimationPreferences();
  
  // Base transition settings
  const transition = {
    type: options.type || "tween",
    duration: prefs.preferReducedMotion ? Math.min(options.duration || 0.3, 0.3) : options.duration || 0.5,
    stiffness: options.stiffness || 100,
    damping: options.damping || 20,
    delay: prefs.preferReducedMotion ? 0 : options.delay || 0,
  };

  // Add hardware acceleration hint for complex animations
  const transitionWithOptimization = {
    ...transition,
    // Transform GPU-accelerated properties for better performance
    transformPerspective: prefs.enableHardwareAcceleration ? 1000 : undefined,
    willChange: prefs.enableHardwareAcceleration ? "transform" : undefined,
  };

  return transitionWithOptimization;
}

// CSS helper for optimized animations
export function getOptimizedCSSTransition(duration: number = 0.3, properties: string[] = ["all"]) {
  const prefs = getUserAnimationPreferences();
  
  if (prefs.preferReducedMotion) {
    return "none";
  }
  
  const actualDuration = prefs.optimizeForLowPower ? Math.min(duration, 0.2) : duration;
  const propertiesList = properties.join(", ");
  
  return `${propertiesList} ${actualDuration}s ease-out`;
}

// Fix for hover animation stuck states by ensuring animation completion
export function getHoverExitFix() {
  return {
    onMouseLeave: (e: React.MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      
      // Force repaint to break stuck animations
      if (target) {
        target.style.animation = 'none';
        // Force browser repaint
        void target.offsetHeight;
        target.style.animation = '';
      }
    }
  };
}

// Recommended style attributes to prevent animation jank
export const performanceStyles = {
  transform: "translateZ(0)", // Force GPU acceleration
  backfaceVisibility: "hidden" as const,
  willChange: "transform, opacity",
  transformStyle: "preserve-3d" as const,
};
