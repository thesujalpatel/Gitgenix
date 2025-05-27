// Performance utilities for optimizing animations on low-end devices

export interface AnimationPreferences {
  reduceMotion: boolean;
  isLowEndDevice: boolean;
  preferSimpleAnimations: boolean;
}

/**
 * Detects if the user is on a low-end device based on various factors
 */
export function detectLowEndDevice(): boolean {
  if (typeof window === 'undefined') return false;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return true;

  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4;
  if (cores <= 2) return true;

  // Check device memory (if available)
  const deviceMemory = (navigator as any).deviceMemory;
  if (deviceMemory && deviceMemory <= 2) return true;

  // Check connection type (if available)
  const connection = (navigator as any).connection;
  if (connection) {
    const slowConnections = ['slow-2g', '2g', '3g'];
    if (slowConnections.includes(connection.effectiveType)) return true;
  }

  return false;
}

/**
 * Gets animation preferences based on device capabilities
 * Always returns full animations enabled to ensure all animations are visible
 */
export function getAnimationPreferences(): AnimationPreferences {
  // Always return full animations enabled for consistency and visibility
  return {
    reduceMotion: false,
    isLowEndDevice: false,
    preferSimpleAnimations: false,
  };
}

/**
 * Creates optimized animation configurations based on device capabilities
 * Always returns full animations to ensure all animations are visible
 */
export function createOptimizedAnimation(
  fullAnimation: any,
  _simpleAnimation?: any,
  _preferences?: AnimationPreferences
) {
  // Always return full animations for maximum visibility
  void _simpleAnimation;
  void _preferences;
  return fullAnimation;
}

/**
 * Optimizes transition settings for performance
 * Always returns full transitions to ensure all animations are visible
 */
export function optimizeTransition(transition: any) {
  // Always return full transitions for maximum animation visibility
  return transition;
}

/**
 * Prevents animation conflicts by providing safe animation defaults
 * Always returns full animation settings for maximum visibility
 */
export function getSafeAnimationProps() {
  return {
    // Hardware acceleration
    style: {
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      perspective: 1000,
    },
    
    // Full transition settings for maximum animation visibility
    transition: { type: 'spring', damping: 25, stiffness: 300 },
      
    // Enable layout animations for full visual effects
    layout: true,
    layoutId: undefined,
  };
}

/**
 * Creates conflict-free motion variants
 * Always returns full variants for maximum animation visibility
 */
export function createMotionVariants(
  variants: Record<string, any>
) {
  // Always return full variants for maximum animation visibility
  return variants;
}

/**
 * Debounces animation triggers to prevent conflicts
 */
export function createAnimationDebouncer(delay: number = 100) {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return (callback: () => void) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(callback, delay);
  };
}
