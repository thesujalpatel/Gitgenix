// Google Analytics 4 integration for Gitgenix - Client Side Only
// This file contains only browser-compatible code

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || 'G-JCBHWE4SCE';

// Check if GA is available
export const isGAEnabled = (): boolean => {
  return !!(GA_TRACKING_ID && typeof window !== 'undefined' && window.gtag);
};

// Initialize Google Analytics
export const initGA = (): void => {
  if (!GA_TRACKING_ID || typeof window === 'undefined') {
    console.warn('Google Analytics tracking ID not found');
    return;
  }

  // Load gtag script if it's not already loaded
  if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}"]`)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);
  }

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer.push(args);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });

  console.log('Google Analytics initialized');
};

// Track page view
export const trackPageView = (url: string, title?: string): void => {
  if (!isGAEnabled()) return;

  window.gtag('config', GA_TRACKING_ID!, {
    page_title: title || document.title,
    page_location: url,
  });
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
): void => {
  if (!isGAEnabled()) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Enhanced visitor tracking with session management
export const trackUniqueVisitor = (): boolean => {
  if (typeof window === 'undefined') return false;

  const SESSION_KEY = 'gitgenix_session';
  const VISITOR_KEY = 'gitgenix_visitor';
  const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

  const now = Date.now();
  const existingSession = localStorage.getItem(SESSION_KEY);
  const existingVisitor = localStorage.getItem(VISITOR_KEY);

  // Check if it's a new session
  if (!existingSession || (existingSession && now - parseInt(existingSession) > SESSION_DURATION)) {
    // New session
    localStorage.setItem(SESSION_KEY, now.toString());

    // Check if it's a new visitor (first time ever)
    if (!existingVisitor) {
      localStorage.setItem(VISITOR_KEY, now.toString());
      trackEvent('new_visitor', 'users', 'first_visit');
      return true; // This is a new unique visitor
    } else {
      trackEvent('returning_visitor', 'users', 'new_session');
      return false; // Returning visitor, new session
    }
  }

  // Existing session, don't count as new visitor
  return false;
};

// Start engagement tracking
export const startEngagementTracking = (): (() => void) => {
  const startTime = Date.now();
  let isActive = true;

  const handleVisibilityChange = () => {
    if (document.hidden) {
      const engagementTime = Date.now() - startTime;
      trackEvent('engagement_time', 'user_behavior', 'page_hidden', Math.round(engagementTime / 1000));
      isActive = false;
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  // Return cleanup function
  return () => {
    if (isActive) {
      const engagementTime = Date.now() - startTime;
      trackEvent('engagement_time', 'user_behavior', 'session_end', Math.round(engagementTime / 1000));
    }
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
};
