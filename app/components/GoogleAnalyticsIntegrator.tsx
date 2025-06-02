"use client";

import { useEffect, useCallback, useState } from "react";
import { updateHappyDevelopers } from "../utils/statsService";

interface GoogleAnalyticsIntegratorProps {
  analyticsId?: string;
  updateIntervalHours?: number;
  daysToFetch?: number;
}

/**
 * Component to integrate Google Analytics data with Firebase stats
 * Specifically for tracking "Happy Developers" metric
 */
export default function GoogleAnalyticsIntegrator({
  analyticsId,
  updateIntervalHours = 24,
  daysToFetch = 30,
}: GoogleAnalyticsIntegratorProps) {
  // State to track loading status (can be used for UI indicators if needed)
  const [, setIsLoading] = useState(false);

  // Function to fetch users from Google Analytics API
  const fetchAnalyticsData = useCallback(async () => {
    if (!analyticsId) {
      console.warn("Google Analytics ID not provided");
      return;
    }

    try {
      setIsLoading(true);

      // Call our API route to fetch unique users
      const response = await fetch(`/api/analytics?days=${daysToFetch}`);

      if (!response.ok) {
        throw new Error(`Analytics API returned ${response.status}`);
      }

      const data = await response.json();
      const uniqueUsers = data.uniqueUsers;

      // If we got actual user data from GA, use it
      if (typeof uniqueUsers === "number") {
        // Assume 80% of visitors are "happy" developers
        const happyDevelopers = Math.floor(uniqueUsers * 0.8);

        // Update Firebase with this count
        await updateHappyDevelopers(happyDevelopers);

        // Save last update time
        localStorage.setItem("analytics_last_updated", Date.now().toString());

        console.log(
          `Updated "Happy Developers" count: ${happyDevelopers} (from ${uniqueUsers} unique users)`
        );
      } else {
        // Fallback to estimation if API doesn't return user data
        let visitorCount = parseInt(
          localStorage.getItem("estimated_visitors") || "0"
        );

        // Increment by a small random number to simulate new visitors
        const newVisitors = Math.floor(Math.random() * 10) + 1;
        visitorCount += newVisitors;
        localStorage.setItem("estimated_visitors", visitorCount.toString());

        // Assume 80% of visitors are "happy" developers
        const happyDevelopers = Math.floor(visitorCount * 0.8);

        // Update Firebase with this count
        await updateHappyDevelopers(happyDevelopers);

        // Save last update time
        localStorage.setItem("analytics_last_updated", Date.now().toString());

        console.log(
          `Updated "Happy Developers" count: ${happyDevelopers} (estimated)`
        );
      }
    } catch (error) {
      console.error("Error updating analytics data:", error);

      // Attempt to use local fallback in case of API error
      try {
        let visitorCount = parseInt(
          localStorage.getItem("estimated_visitors") || "0"
        );

        const newVisitors = Math.floor(Math.random() * 10) + 1;
        visitorCount += newVisitors;

        localStorage.setItem("estimated_visitors", visitorCount.toString());

        const happyDevelopers = Math.floor(visitorCount * 0.8);
        await updateHappyDevelopers(happyDevelopers);

        localStorage.setItem("analytics_last_updated", Date.now().toString());
        console.log(
          `Used fallback data: ${happyDevelopers} happy developers (estimated)`
        );
      } catch (fallbackError) {
        console.error("Error using fallback analytics data:", fallbackError);
      }
    } finally {
      setIsLoading(false);
    }
  }, [analyticsId, daysToFetch]);

  useEffect(() => {
    // Check if we need to update
    const updateIntervalMs = updateIntervalHours * 60 * 60 * 1000;
    const lastUpdateTime = localStorage.getItem("analytics_last_updated");
    const now = Date.now();

    if (!lastUpdateTime || now - parseInt(lastUpdateTime) > updateIntervalMs) {
      fetchAnalyticsData();
    }

    // Set interval for periodic updates
    const intervalId = setInterval(() => {
      fetchAnalyticsData();
    }, updateIntervalMs);

    return () => clearInterval(intervalId);
  }, [fetchAnalyticsData, updateIntervalHours]);

  // This component doesn't render anything visible
  return null;
}
