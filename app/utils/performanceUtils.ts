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
 */
export function getAnimationPreferences(): AnimationPreferences {
  const isLowEndDevice = detectLowEndDevice();
  const reduceMotion = typeof window !== 'undefined' ? 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  return {
    reduceMotion,
    isLowEndDevice,
    preferSimpleAnimations: isLowEndDevice || reduceMotion,
  };
}

/**
 * Creates optimized animation configurations based on device capabilities
 */
export function createOptimizedAnimation(
  fullAnimation: any,
  simpleAnimation: any,
  preferences?: AnimationPreferences
) {
  const prefs = preferences || getAnimationPreferences();
  
  if (prefs.preferSimpleAnimations) {
    return {
      ...simpleAnimation,
      transition: {
        ...simpleAnimation.transition,
        type: 'tween', // Use tween for better performance
        duration: (simpleAnimation.transition?.duration || 0.3) * 0.7, // Faster animations
      }
    };
  }

  return fullAnimation;
}

/**
 * Optimizes transition settings for performance
 */
export function optimizeTransition(transition: any, preferences?: AnimationPreferences) {
  const prefs = preferences || getAnimationPreferences();
  
  if (prefs.preferSimpleAnimations) {
    return {
      ...transition,
      type: 'tween',
      duration: Math.min(transition.duration || 0.3, 0.2),
      ease: 'easeOut',
    };
  }

  return transition;
}
