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

export default function GoogleAnalyticsInit() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize GA
    initGA();

    // Track unique visitor and update stats
    const isNewVisitor = trackUniqueVisitor();
    if (isNewVisitor) {
      incrementUniqueVisitor();
    }

    // Start engagement tracking
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
