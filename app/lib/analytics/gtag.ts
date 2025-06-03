/**
 * Google Analytics 4 (GA4) Configuration
 * Latest Google Analytics implementation with gtag.js
 */

// Google Analytics Measurement ID - Replace with your actual measurement ID
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Google Analytics Property ID - Replace with your actual property ID  
export const GA_PROPERTY_ID = process.env.NEXT_PUBLIC_GA_PROPERTY_ID || 'XXXXXXXXX';

// Ensure we have analytics IDs before initializing
export const isAnalyticsEnabled = GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' && GA_PROPERTY_ID !== 'XXXXXXXXX';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

/**
 * Initialize Google Analytics
 */
export const initGA = () => {
  if (!isAnalyticsEnabled) {
    console.warn('Google Analytics not configured. Please set NEXT_PUBLIC_GA_MEASUREMENT_ID and NEXT_PUBLIC_GA_PROPERTY_ID in your environment variables.');
    return;
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
    // Define gtag function
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer.push(args);
  };

  // Configure GA4
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    // Enhanced measurement settings
    enhanced_measurement: {
      scrolls: true,
      outbound_clicks: true,
      site_search: true,
      video_engagement: true,
      file_downloads: true,
    },
    // Privacy and data settings
    anonymize_ip: true,
    allow_google_signals: false,
    cookie_flags: 'SameSite=None;Secure',
    // Performance settings
    send_page_view: true,
    // Custom settings for Gitgenix
    custom_map: {
      custom_parameter_1: 'pattern_type',
      custom_parameter_2: 'script_generated',
    },
  });
};

/**
 * Track page views
 */
export const trackPageView = (url: string, title?: string) => {
  if (!isAnalyticsEnabled || typeof window.gtag !== 'function') return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: title,
    page_location: url,
  });
};

/**
 * Track custom events
 */
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (!isAnalyticsEnabled || typeof window.gtag !== 'function') return;

  window.gtag('event', eventName, {
    event_category: 'engagement',
    event_label: eventName,
    ...parameters,
  });
};

/**
 * Track Gitgenix-specific events
 */
export const trackPatternCreated = (patternType: string) => {
  trackEvent('pattern_created', {
    event_category: 'pattern',
    pattern_type: patternType,
    value: 1,
  });
};

export const trackScriptGenerated = (scriptType: 'shell' | 'batch') => {
  trackEvent('script_generated', {
    event_category: 'script',
    script_type: scriptType,
    value: 1,
  });
};

export const trackPatternShared = (shareMethod: 'link' | 'export') => {
  trackEvent('pattern_shared', {
    event_category: 'sharing',
    share_method: shareMethod,
    value: 1,
  });
};

export const trackUserJourney = (step: string, details?: Record<string, any>) => {
  trackEvent('user_journey', {
    event_category: 'journey',
    journey_step: step,
    ...details,
  });
};

/**
 * Track performance metrics
 */
export const trackPerformance = (metricName: string, value: number, unit: string = 'ms') => {
  trackEvent('performance_metric', {
    event_category: 'performance',
    metric_name: metricName,
    metric_value: value,
    metric_unit: unit,
  });
};

/**
 * Track errors
 */
export const trackError = (errorName: string, errorMessage: string, errorLocation?: string) => {
  trackEvent('error_occurred', {
    event_category: 'error',
    error_name: errorName,
    error_message: errorMessage,
    error_location: errorLocation,
  });
};

/**
 * Enhanced ecommerce tracking (for future monetization)
 */
export const trackPurchase = (transactionId: string, value: number, currency: string = 'USD') => {
  if (!isAnalyticsEnabled || typeof window.gtag !== 'function') return;

  window.gtag('event', 'purchase', {
    transaction_id: transactionId,
    value: value,
    currency: currency,
  });
};

/**
 * Track user engagement
 */
export const trackEngagement = (engagementType: string, duration?: number) => {
  trackEvent('user_engagement', {
    event_category: 'engagement',
    engagement_type: engagementType,
    engagement_duration: duration,
  });
};
