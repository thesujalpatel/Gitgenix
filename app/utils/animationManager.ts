/**
 * Central Animation Management System for Gitgenix
 * Manages all animations consistently with full animations enabled
 */

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
export const ANIMATION_VARIANTS = {  // Page transitions
  pageEnter: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, type: "spring", stiffness: 100 }
  },

  // Container animations
  container: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.5
    }
  },

  // Item animations (for lists, cards, etc.)
  item: {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.4, type: "spring", stiffness: 100 }
  },

  // Button interactions
  button: {
    whileHover: { scale: 1.02, y: -1 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2, type: "spring", stiffness: 400 }
  },

  // Card hover effects
  card: {
    whileHover: { 
      scale: 1.02, 
      y: -4,
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
    },
    transition: { duration: 0.3, type: "spring", stiffness: 300 }
  },

  // Loading animations
  loading: {
    animate: { 
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8]
    },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  },

  // Modal/overlay animations
  modal: {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
    transition: { duration: 0.3, type: "spring", stiffness: 300 }
  },

  // Toolbar/bottom sheet animations
  toolbar: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 100, opacity: 0 },
    transition: { duration: 0.4, type: "spring", stiffness: 300, damping: 30 }
  },

  // Graph/chart animations
  graph: {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.98 },
    transition: { duration: 0.5, type: "spring", stiffness: 100 }
  },

  // Cell/grid item animations
  cell: {
    whileHover: { scale: 1.15, rotate: 1 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.15, type: "spring", stiffness: 400 }
  }
};

// Animation manager class - simplified for full animations
export class AnimationManager {
  private static instance: AnimationManager;

  private constructor() {
    // No animation preferences needed - always use full animations
  }

  static getInstance(): AnimationManager {
    if (!AnimationManager.instance) {
      AnimationManager.instance = new AnimationManager();
    }
    return AnimationManager.instance;
  }

  // Get animation variant - always return full animations
  getVariant(type: keyof typeof ANIMATION_VARIANTS) {
    return ANIMATION_VARIANTS[type];
  }

  // Create custom animation - always return full config
  createAnimation(config: AnimationConfig): AnimationConfig {
    return config;
  }

  // Get stagger configuration - always return full timing
  getStagger(baseDelay: number = 0.1): number {
    return baseDelay;
  }

  // Get spring configuration - always return full spring
  getSpring(stiffness: number = 100, damping: number = 15) {
    return { type: "spring" as const, stiffness, damping };
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
export function getAnimationClasses(): string {
  return ""; // No special classes needed for full animations
}

// Prevent animation conflicts by ensuring consistent transform origins
export function getSafeTransformProps() {
  return {
    transformOrigin: "center center",
    backfaceVisibility: "hidden" as const,
    transformStyle: "preserve-3d" as const
  };
}
