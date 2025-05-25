/**
 * Central Animation Management System for Gitgenix
 * Manages all animations consistently and prevents conflicts
 */

import { getAnimationPreferences } from "./performanceUtils";

// Animation configuration
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string | number[];
  stiffness?: number;
  damping?: number;
  type?: "spring" | "tween" | "keyframes" | "inertia";
  repeat?: number;
  repeatType?: "loop" | "reverse" | "mirror";
  repeatDelay?: number;
}

// Predefined animation variants
export const ANIMATION_VARIANTS = {
  // Page transitions
  pageEnter: {
    simple: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 }
    },
    enhanced: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.4, type: "spring", stiffness: 100 }
    }
  },

  // Container animations
  container: {
    simple: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3 }
    },
    enhanced: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5
      }
    }
  },

  // Item animations (for lists, cards, etc.)
  item: {
    simple: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.2 }
    },
    enhanced: {
      initial: { opacity: 0, y: 20, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { duration: 0.4, type: "spring", stiffness: 100 }
    }
  },

  // Button interactions
  button: {
    simple: {
      whileTap: { scale: 0.98 },
      transition: { duration: 0.1 }
    },
    enhanced: {
      whileHover: { scale: 1.02, y: -1 },
      whileTap: { scale: 0.98 },
      transition: { duration: 0.2, type: "spring", stiffness: 400 }
    }
  },

  // Card hover effects
  card: {
    simple: {
      whileHover: { scale: 1.01 },
      transition: { duration: 0.2 }
    },
    enhanced: {
      whileHover: { 
        scale: 1.02, 
        y: -4,
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
      },
      transition: { duration: 0.3, type: "spring", stiffness: 300 }
    }
  },

  // Loading animations
  loading: {
    simple: {
      animate: { opacity: [0.5, 1, 0.5] },
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    },
    enhanced: {
      animate: { 
        scale: [1, 1.05, 1],
        opacity: [0.8, 1, 0.8]
      },
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    }
  },

  // Modal/overlay animations
  modal: {
    simple: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 }
    },
    enhanced: {
      initial: { opacity: 0, scale: 0.95, y: 20 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95, y: 20 },
      transition: { duration: 0.3, type: "spring", stiffness: 300 }
    }
  },

  // Toolbar/bottom sheet animations
  toolbar: {
    simple: {
      initial: { y: 100 },
      animate: { y: 0 },
      exit: { y: 100 },
      transition: { duration: 0.3 }
    },
    enhanced: {
      initial: { y: 100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 100, opacity: 0 },
      transition: { duration: 0.4, type: "spring", stiffness: 300, damping: 30 }
    }
  },

  // Graph/chart animations
  graph: {
    simple: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3 }
    },
    enhanced: {
      initial: { opacity: 0, y: 20, scale: 0.98 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -20, scale: 0.98 },
      transition: { duration: 0.5, type: "spring", stiffness: 100 }
    }
  },

  // Cell/grid item animations
  cell: {
    simple: {
      whileHover: { scale: 1.1 },
      transition: { duration: 0.1 }
    },
    enhanced: {
      whileHover: { scale: 1.15, rotate: 1 },
      whileTap: { scale: 0.95 },
      transition: { duration: 0.15, type: "spring", stiffness: 400 }
    }
  }
};

// Animation manager class
export class AnimationManager {
  private static instance: AnimationManager;
  private animPrefs: ReturnType<typeof getAnimationPreferences>;

  private constructor() {
    this.animPrefs = getAnimationPreferences();
  }

  static getInstance(): AnimationManager {
    if (!AnimationManager.instance) {
      AnimationManager.instance = new AnimationManager();
    }
    return AnimationManager.instance;
  }

  // Get animation variant based on user preferences
  getVariant(type: keyof typeof ANIMATION_VARIANTS) {
    const variants = ANIMATION_VARIANTS[type];
    return this.animPrefs.preferSimpleAnimations ? variants.simple : variants.enhanced;
  }

  // Create custom animation with preference optimization
  createAnimation(config: AnimationConfig): AnimationConfig {
    if (this.animPrefs.preferSimpleAnimations) {
      return {
        ...config,
        duration: Math.min(config.duration || 0.3, 0.3),
        type: "tween",
        ease: "easeOut"
      };
    }
    return config;
  }

  // Get stagger configuration
  getStagger(baseDelay: number = 0.1): number {
    return this.animPrefs.preferSimpleAnimations ? baseDelay * 0.5 : baseDelay;
  }

  // Get spring configuration
  getSpring(stiffness: number = 100, damping: number = 15) {
    if (this.animPrefs.preferSimpleAnimations) {
      return { type: "tween" as const, duration: 0.3 };
    }
    return { type: "spring" as const, stiffness, damping };
  }

  // Refresh preferences (call when user changes settings)
  refreshPreferences() {
    this.animPrefs = getAnimationPreferences();
  }
}

// Utility functions for easy access
export const animationManager = AnimationManager.getInstance();

export function getAnimationVariant(type: keyof typeof ANIMATION_VARIANTS) {
  return animationManager.getVariant(type);
}

export function createCustomAnimation(config: AnimationConfig) {
  return animationManager.createAnimation(config);
}

export function getStaggerDelay(baseDelay?: number) {
  return animationManager.getStagger(baseDelay);
}

export function getSpringConfig(stiffness?: number, damping?: number) {
  return animationManager.getSpring(stiffness, damping);
}

// CSS class generator for consistent styling
export function getAnimationClasses(optimized: boolean = true): string {
  const baseClasses = optimized ? "animate-optimized" : "";
  return baseClasses;
}

// Prevent animation conflicts by ensuring consistent transform origins
export function getSafeTransformProps() {
  return {
    transformOrigin: "center center",
    backfaceVisibility: "hidden" as const,
    transformStyle: "preserve-3d" as const
  };
}
