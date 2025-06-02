"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initializeVisitorTracking } from "../utils/statsService";

/**
 * Component to track visitors and sessions using localStorage
 * This replaces the Google Analytics tracking with a simpler approach
 */
export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize visitor tracking when the app loads
    initializeVisitorTracking();
  }, []);

  useEffect(() => {
    // Track page navigation (for future analytics if needed)
    console.log(`Page visited: ${pathname}`);
  }, [pathname]);

  return null; // This component doesn't render anything
}
