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
export const ANIMATION_VARIANTS = {
  // Page transitions
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
  // Enhanced primary button interactions
  button: {
    initial: { scale: 1 },
    whileHover: { 
      scale: 1.05, 
      y: -3,
      boxShadow: "0 12px 35px rgba(42, 122, 239, 0.3)",
      filter: "brightness(1.1)",
      transition: { duration: 0.2, type: "spring", stiffness: 400, damping: 15 }
    },
    whileTap: { 
      scale: 0.95,
      y: -1,
      boxShadow: "0 4px 12px rgba(42, 122, 239, 0.2)",
      transition: { duration: 0.1, type: "spring", stiffness: 600, damping: 20 }
    },
    transition: { duration: 0.2, type: "spring", stiffness: 400 }
  },
  // Enhanced stable primary button with corner-safe animations
  buttonStable: {
    initial: { 
      scale: 1,
      y: 0,
      filter: "brightness(1)",
      borderRadius: "0.75rem"
    },
    whileHover: { 
      scale: 1.05, 
      y: -3,
      filter: "brightness(1.1)",
      borderRadius: "0.75rem",
      boxShadow: [
        "0 15px 35px rgba(42, 122, 239, 0.25)",
        "0 5px 15px rgba(0, 0, 0, 0.1)",
        "0 0 0 1px rgba(255, 255, 255, 0.05) inset"
      ],
      transition: { 
        duration: 0.25, 
        type: "spring", 
        stiffness: 400, 
        damping: 25,
        borderRadius: { duration: 0.1 }
      }
    },
    whileTap: { 
      scale: 0.98,
      y: -1,
      filter: "brightness(0.95)",
      borderRadius: "0.75rem",
      boxShadow: "0 4px 12px rgba(42, 122, 239, 0.2)",
      transition: { 
        duration: 0.1, 
        type: "spring", 
        stiffness: 600, 
        damping: 30 
      }
    },
    transition: { duration: 0.2, type: "spring", stiffness: 400 }
  },

  // Secondary button (outline style)
  buttonSecondary: {
    initial: { scale: 1 },
    whileHover: { 
      scale: 1.05, 
      y: -3,
      borderColor: "var(--primary)",
      boxShadow: "0 12px 35px rgba(42, 122, 239, 0.2)",
      backgroundColor: "rgba(42, 122, 239, 0.05)",
      transition: { duration: 0.2, type: "spring", stiffness: 400, damping: 15 }
    },
    whileTap: { 
      scale: 0.95,
      y: -1,
      transition: { duration: 0.1, type: "spring", stiffness: 600, damping: 20 }
    },
    transition: { duration: 0.2, type: "spring", stiffness: 400 }
  },

  // Enhanced stable secondary button with corner-safe animations
  buttonSecondaryStable: {
    initial: { 
      scale: 1,
      y: 0,
      borderColor: "var(--color-foreground)",
      backgroundColor: "transparent",
      borderRadius: "0.75rem"
    },
    whileHover: { 
      scale: 1.03, 
      y: -2,
      borderColor: "var(--color-primary)",
      backgroundColor: "rgba(var(--color-primary-rgb), 0.08)",
      borderRadius: "0.75rem",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
      transition: { 
        duration: 0.2, 
        type: "spring", 
        stiffness: 500, 
        damping: 25,
        borderRadius: { duration: 0.1 }
      }
    },
    whileTap: { 
      scale: 0.99,
      y: -1,
      borderRadius: "0.75rem",
      transition: { 
        duration: 0.1, 
        type: "spring", 
        stiffness: 700, 
        damping: 35 
      }
    },
    transition: { duration: 0.2, type: "spring", stiffness: 400 }
  },

  // Icon button animations
  iconButton: {
    initial: { scale: 1, rotate: 0 },
    whileHover: { 
      scale: 1.15, 
      rotate: 8,
      filter: "brightness(1.2)",
      transition: { duration: 0.2, type: "spring", stiffness: 500, damping: 15 }
    },
    whileTap: { 
      scale: 0.9,
      rotate: -3,
      transition: { duration: 0.1, type: "spring", stiffness: 600, damping: 20 }
    },
    transition: { duration: 0.2, type: "spring", stiffness: 500 }
  },

  // Card hover effects
  card: {
    whileHover: { 
      scale: 1.03, 
      y: -8,
      boxShadow: "0 16px 40px rgba(0,0,0,0.12)"
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
  },
  // Character stagger animation for text
  characterStagger: {
    initial: { 
      opacity: 0, 
      y: 20, 
      scale: 0.8,
      rotateX: -90
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 200,
        damping: 12
      }
    },
    hover: {
      y: -5,
      scale: 1.1,
      color: "var(--color-primary)",
      transition: { duration: 0.2, type: "spring", stiffness: 400 }
    }
  },

  // Stable character stagger without vertical hover movement
  characterStaggerStable: {
    initial: { 
      opacity: 0, 
      y: 20, 
      scale: 0.8,
      rotateX: -90
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 200,
        damping: 12
      }
    },
    hover: {
      scale: 1.05,
      color: "var(--color-primary)",
      filter: "brightness(1.1)",
      transition: { duration: 0.2, type: "spring", stiffness: 400 }
    }
  },// Logo animations with floating effect
  logo: {
    initial: { scale: 1, rotate: 0 },
    animate: { 
      scale: 1, 
      rotate: 0,
      y: [0, -8, 0],
      transition: { 
        duration: 0.6, 
        type: "spring", 
        stiffness: 100,
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    hover: { 
      scale: 1.1, 
      rotate: [0, -5, 5, 0],
      y: -12,
      filter: "brightness(1.15) drop-shadow(0 8px 20px rgba(42, 122, 239, 0.3))",
      transition: { 
        duration: 0.5, 
        type: "spring", 
        stiffness: 300,
        rotate: { duration: 0.8, ease: "easeInOut" }
      }
    }
  },

  // Stable logo variant without vertical movement to prevent hover glitches
  logoStable: {
    initial: { scale: 1, rotate: 0 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: 0.6, 
        type: "spring", 
        stiffness: 100
      }
    },
    hover: { 
      scale: 1.05, 
      rotate: [0, -2, 2, 0],
      filter: "brightness(1.15) drop-shadow(0 8px 20px rgba(42, 122, 239, 0.3))",
      transition: { 
        duration: 0.3, 
        type: "spring", 
        stiffness: 300,
        rotate: { duration: 0.6, ease: "easeInOut" }
      }
    }
  },

  // Floating animation for decorative elements
  floating: {
    animate: {
      y: [-10, 10, -10],
      x: [-5, 5, -5],
      rotate: [-2, 2, -2],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },

  // New creative slide and morph effect for page transitions
  slideWave: {
    initial: { 
      opacity: 0, 
      x: -50, 
      scale: 0.9,
      rotateY: -15
    },
    animate: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 80,
        damping: 15,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      x: 50, 
      scale: 0.9,
      rotateY: 15,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  },

  // Particle burst effect for elements
  particleBurst: {
    initial: { 
      opacity: 0, 
      scale: 0.5,
      rotate: -180
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 200,
        damping: 12
      }
    },
    exit: {
      opacity: 0,
      scale: 1.5,
      rotate: 180,
      filter: "blur(5px)",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  },

  // Enhanced card with tilt effect
  cardEnhanced: {
    initial: { opacity: 0, y: 20, rotateX: 10 },
    animate: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 100 }
    },
    whileHover: { 
      scale: 1.05, 
      y: -10,
      rotateX: 5,
      rotateY: 5,
      boxShadow: [
        "0 20px 40px rgba(0,0,0,0.1)",
        "0 0 0 1px rgba(255, 255, 255, 0.1) inset"
      ],
      transition: { duration: 0.3, type: "spring", stiffness: 300 }
    }
  },
  // Enhanced card reveal animation - UI/UX centric
  cardReveal: {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.6,
        ease: "easeOut"
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      rotateX: 2,
      boxShadow: "0px 20px 40px rgba(42, 122, 239, 0.15)",
      transition: { 
        duration: 0.3,
        type: "spring",
        stiffness: 200,
        damping: 15
      },
    },
  },

  // Stable card reveal without vertical hover movement
  cardRevealStable: {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.6,
        ease: "easeOut"
      },
    },
    hover: {
      scale: 1.02,
      rotateX: 2,
      boxShadow: "0px 20px 40px rgba(42, 122, 239, 0.15)",
      filter: "brightness(1.05)",
      transition: { 
        duration: 0.3,
        type: "spring",
        stiffness: 200,
        damping: 15
      },
    },
  },

  // Subtle slide-up reveal
  slideUpReveal: {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
        duration: 0.5,
      },
    },
    hover: {
      y: -4,
      scale: 1.01,
      transition: { 
        duration: 0.2,
        type: "spring",
        stiffness: 300
      },
    },
  },

  // Stable slide-up reveal without vertical hover movement
  slideUpRevealStable: {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.01,
      filter: "brightness(1.05)",
      transition: { 
        duration: 0.2,
        type: "spring",
        stiffness: 300
      },
    },
  },

  // Elegant fade-in with slight scale
  elegantFade: {
    hidden: { 
      opacity: 0, 
      scale: 0.96,
      filter: "blur(4px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: "easeOut",
        scale: {
          type: "spring",
          stiffness: 100,
          damping: 15
        }
      },
    },
    hover: {
      scale: 1.02,
      transition: { 
        duration: 0.2,
        type: "spring",
        stiffness: 400
      },
    },
  },

  // ...existing code...
};

// Enhanced theme-aware button animations with different themes
export const THEME_BUTTON_VARIANTS = {
  // Premium gradient button with glow
  buttonPremium: {
    initial: { 
      scale: 1,
      background: "linear-gradient(135deg, var(--color-primary), var(--color-primary))"
    },
    whileHover: { 
      scale: 1.05, 
      y: -4,
      background: "linear-gradient(135deg, var(--color-primary), #3b82f6)",
      boxShadow: [
        "0 12px 35px rgba(42, 122, 239, 0.3)",
        "0 20px 50px rgba(42, 122, 239, 0.4)",
        "0 0 0 1px rgba(255, 255, 255, 0.1) inset"
      ],
      filter: "brightness(1.15) contrast(1.05)",
      transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 15 }
    },
    whileTap: { 
      scale: 0.96,
      y: -2,
      boxShadow: "0 6px 20px rgba(42, 122, 239, 0.25)",
      transition: { duration: 0.15, type: "spring", stiffness: 500, damping: 25 }
    }
  },

  // Elegant outline button with morphing
  buttonElegant: {
    initial: { 
      scale: 1,
      borderColor: "var(--color-foreground)",
      backgroundColor: "transparent"
    },
    whileHover: { 
      scale: 1.03, 
      y: -3,
      borderColor: "var(--color-primary)",
      backgroundColor: "rgba(var(--color-primary-rgb), 0.05)",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      color: "var(--color-primary)",
      transition: { duration: 0.25, type: "spring", stiffness: 400, damping: 20 }
    },
    whileTap: { 
      scale: 0.98,
      y: -1,
      transition: { duration: 0.1, type: "spring", stiffness: 600, damping: 25 }
    }
  },

  // Glass morphism button
  buttonGlass: {
    initial: { 
      scale: 1,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)"
    },
    whileHover: { 
      scale: 1.05, 
      y: -4,
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(15px)",
      boxShadow: [
        "0 15px 40px rgba(0, 0, 0, 0.1)",
        "0 0 0 1px rgba(255, 255, 255, 0.2) inset"
      ],
      transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 15 }
    },
    whileTap: { 
      scale: 0.95,
      y: -2,
      transition: { duration: 0.15, type: "spring", stiffness: 500, damping: 25 }
    }
  },

  // Magnetic button with attraction effect
  buttonMagnetic: {
    initial: { scale: 1 },
    whileHover: { 
      scale: 1.08, 
      y: -5,
      boxShadow: "0 15px 45px rgba(42, 122, 239, 0.35)",
      filter: "brightness(1.1)",
      transition: { 
        duration: 0.4, 
        type: "spring", 
        stiffness: 200, 
        damping: 10,
        bounce: 0.6
      }
    },
    whileTap: { 
      scale: 0.92,
      y: -2,
      transition: { duration: 0.2, type: "spring", stiffness: 400, damping: 15 }
    }
  },

  // Neon glow button for dark theme
  buttonNeon: {
    initial: { 
      scale: 1,
      textShadow: "0 0 10px var(--color-primary)"
    },
    whileHover: { 
      scale: 1.05, 
      y: -3,
      boxShadow: [
        "0 0 20px var(--color-primary)",
        "0 0 40px var(--color-primary)",
        "0 0 60px var(--color-primary)"
      ],
      textShadow: "0 0 20px var(--color-primary)",
      filter: "brightness(1.2)",
      transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 15 }
    },
    whileTap: { 
      scale: 0.95,
      y: -1,
      transition: { duration: 0.15, type: "spring", stiffness: 500, damping: 25 }
    }
  }
};

// Footer animation variants
export const FOOTER_VARIANTS = {
  container: {
    initial: { opacity: 0, y: 50 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  
  item: {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 150,
        damping: 12
      }
    }
  },

  logo: {
    initial: { scale: 1, rotate: 0 },
    animate: { 
      scale: 1,
      rotate: 0,
      transition: { duration: 0.3 }
    },
    whileHover: { 
      scale: 1.2, 
      rotate: [0, -5, 5, 0],
      filter: "brightness(1.2)",
      transition: { 
        duration: 0.4, 
        type: "spring", 
        stiffness: 300,
        rotate: { duration: 0.6, ease: "easeInOut" }
      }
    }
  },

  socialLink: {
    initial: { scale: 1 },
    whileHover: { 
      scale: 1.1, 
      y: -2,
      color: "var(--color-primary)",
      transition: { duration: 0.2, type: "spring", stiffness: 400 }
    },
    whileTap: { 
      scale: 0.95,
      transition: { duration: 0.1, type: "spring", stiffness: 600 }
    }
  },

  starButton: {
    initial: { scale: 1 },
    whileHover: { 
      scale: 1.05,
      y: -3,
      boxShadow: "0 8px 25px rgba(255, 215, 0, 0.3)",
      color: "#ffd700",
      transition: { duration: 0.3, type: "spring", stiffness: 300 }
    },
    whileTap: { 
      scale: 0.95,
      transition: { duration: 0.15 }
    }
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
