"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  initGA,
  trackPageView,
  trackUniqueVisitor,
  startEngagementTracking,
} from "../utils/googleAnalytics";
import { incrementUniqueVisitor } from "../utils/statsService";

/**
 * Component to initialize Google Analytics and track page views
 * This component should be included in the root layout
 */
export default function GoogleAnalyticsInit() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize GA
    initGA();

    // Track unique visitor and update stats
    const isNewVisitor = trackUniqueVisitor();
    if (isNewVisitor) {
      // If this is a new visitor, increment the counter in Firebase
      incrementUniqueVisitor().catch((err) => {
        console.error("Failed to increment unique visitor:", err);
      });
    }

    // Start tracking engagement
    const cleanup = startEngagementTracking();

    // Cleanup on unmount
    return cleanup;
  }, []);

  useEffect(() => {
    // Track page views on route changes
    trackPageView(window.location.href);
  }, [pathname]);

  return null; // This component doesn't render anything
}
