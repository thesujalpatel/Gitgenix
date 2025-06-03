/**
 * Analytics Module Exports
 * Central export point for all analytics functionality
 */

// Core analytics functions
export {
  GA_MEASUREMENT_ID,
  GA_PROPERTY_ID,
  isAnalyticsEnabled,
  initGA,
  trackPageView,
  trackEvent,
  trackPatternCreated,
  trackScriptGenerated,
  trackPatternShared,
  trackUserJourney,
  trackPerformance,
  trackError,
  trackPurchase,
  trackEngagement,
} from './gtag';

// Analytics Hooks
export {
  usePageTracking,
  useEventTracking,
  usePatternTracking,
  useJourneyTracking,
  useEngagementTracking,
  useScrollTracking,
  useFormTracking
} from './hooks';

// Analytics Components
export { default as AnalyticsProvider } from '../../components/common/AnalyticsProvider';