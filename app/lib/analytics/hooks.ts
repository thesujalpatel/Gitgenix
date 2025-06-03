/**
 * Analytics Hooks for React Components
 * Custom hooks to track user interactions and events
 */

'use client';

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { 
  trackPageView, 
  trackEvent, 
  trackPatternCreated, 
  trackScriptGenerated,
  trackPatternShared,
  trackUserJourney,
  trackEngagement,
  isAnalyticsEnabled
} from './gtag';

/**
 * Hook to track page views automatically
 */
export function usePageTracking() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isAnalyticsEnabled || typeof window === 'undefined') return;

    // Get search params safely on client side
    const searchParams = typeof window !== 'undefined' ? window.location.search : '';
    const url = pathname + searchParams;
    const title = typeof document !== 'undefined' ? document.title : '';
    
    trackPageView(url, title);
  }, [pathname]);
}

/**
 * Hook to track custom events
 */
export function useEventTracking() {
  const trackCustomEvent = useCallback((eventName: string, parameters?: Record<string, any>) => {
    trackEvent(eventName, parameters);
  }, []);

  return { trackEvent: trackCustomEvent };
}

/**
 * Hook to track Gitgenix-specific patterns
 */
export function usePatternTracking() {
  const trackPattern = useCallback((patternType: string) => {
    trackPatternCreated(patternType);
  }, []);

  const trackScript = useCallback((scriptType: 'shell' | 'batch') => {
    trackScriptGenerated(scriptType);
  }, []);

  const trackShare = useCallback((shareMethod: 'link' | 'export') => {
    trackPatternShared(shareMethod);
  }, []);

  return {
    trackPattern,
    trackScript,
    trackShare
  };
}

/**
 * Hook to track user journey through the app
 */
export function useJourneyTracking() {
  const trackJourneyStep = useCallback((step: string, details?: Record<string, any>) => {
    trackUserJourney(step, details);
  }, []);

  return { trackJourneyStep };
}

/**
 * Hook to track user engagement and time spent
 */
export function useEngagementTracking() {
  const trackEngagementEvent = useCallback((engagementType: string, duration?: number) => {
    trackEngagement(engagementType, duration);
  }, []);

  // Track time spent on page
  const trackTimeOnPage = useCallback(() => {
    const startTime = Date.now();
    
    return () => {
      const timeSpent = Date.now() - startTime;
      trackEngagement('time_on_page', timeSpent);
    };
  }, []);

  return {
    trackEngagement: trackEngagementEvent,
    trackTimeOnPage
  };
}

/**
 * Hook to track scroll depth
 */
export function useScrollTracking() {
  useEffect(() => {
    if (!isAnalyticsEnabled) return;

    let maxScrollDepth = 0;
    const trackScrollDepth = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = Math.round((scrollTop / (docHeight - winHeight)) * 100);
      
      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
        
        // Track at 25%, 50%, 75%, 100% milestones
        if ([25, 50, 75, 100].includes(scrollPercent)) {
          trackEvent('scroll_depth', {
            event_category: 'engagement',
            scroll_depth: scrollPercent,
          });
        }
      }
    };

    window.addEventListener('scroll', trackScrollDepth, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', trackScrollDepth);
    };
  }, []);
}

/**
 * Hook to track form interactions
 */
export function useFormTracking() {
  const trackFormStart = useCallback((formName: string) => {
    trackEvent('form_start', {
      event_category: 'form',
      form_name: formName,
    });
  }, []);

  const trackFormComplete = useCallback((formName: string) => {
    trackEvent('form_complete', {
      event_category: 'form',
      form_name: formName,
    });
  }, []);

  const trackFormError = useCallback((formName: string, fieldName: string, errorMessage: string) => {
    trackEvent('form_error', {
      event_category: 'form',
      form_name: formName,
      field_name: fieldName,
      error_message: errorMessage,
    });
  }, []);

  return {
    trackFormStart,
    trackFormComplete,
    trackFormError
  };
}
