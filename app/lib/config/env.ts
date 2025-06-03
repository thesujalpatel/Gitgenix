/**
 * Environment Configuration
 * Centralized configuration for environment variables
 */

export const config = {
  // App Configuration
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Gitgenix',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://gitgenix.netlify.app',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV,
  },
  // Analytics Configuration
  analytics: {
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    propertyId: process.env.NEXT_PUBLIC_GA_PROPERTY_ID,
    enabled: process.env.NODE_ENV === 'production' || 
             process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  },

  // Firebase Configuration (if using Firebase Analytics)
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  },

  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '5000'),
  },

  // Performance Configuration
  performance: {
    enableOptimizations: process.env.NEXT_PUBLIC_ENABLE_PERFORMANCE_OPTIMIZATIONS === 'true',
    enableVisitorTracking: process.env.NEXT_PUBLIC_ENABLE_VISITOR_TRACKING === 'true',
  },

  // Feature Flags
  features: {
    adminMode: process.env.NEXT_PUBLIC_ENABLE_ADMIN_MODE === 'true',
    betaFeatures: process.env.NEXT_PUBLIC_ENABLE_BETA_FEATURES === 'true',
  },
} as const;

export type Config = typeof config;
