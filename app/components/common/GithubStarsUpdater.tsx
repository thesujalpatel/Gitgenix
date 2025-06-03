"use client";

import { useEffect, useState } from "react";
import { updateGithubStars } from "@/utils/statsService";

interface GithubStarsUpdaterProps {
  repo: string;
  updateIntervalHours?: number;
}

/**
 * Component that fetches GitHub stars count and updates Firebase
 * This component doesn't render anything visible
 */
export default function GithubStarsUpdater({
  repo = "thesujalpatel/gitgenix",
  updateIntervalHours = 24,
}: GithubStarsUpdaterProps) {
  const [lastUpdated, setLastUpdated] = useState<number>(0);
  useEffect(() => {
    // Check if we need to update (only once per specified hours)
    const now = Date.now();
    const updateIntervalMs = updateIntervalHours * 60 * 60 * 1000;
    const lastUpdateTime = localStorage.getItem("github_stars_last_updated");

    if (!lastUpdateTime || now - parseInt(lastUpdateTime) > updateIntervalMs) {
      fetchGithubStars(repo);
    }

    // Set up interval to check periodically
    const checkInterval = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - lastUpdated > updateIntervalMs) {
        fetchGithubStars(repo);
      }
    }, 60 * 60 * 1000); // Check every hour

    return () => clearInterval(checkInterval);
  }, [repo, updateIntervalHours, lastUpdated]);

  const fetchGithubStars = async (repository: string) => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${repository}`
      );

      if (response.ok) {
        const data = await response.json();
        const starCount = data.stargazers_count || 0;

        // Update Firebase with the star count
        await updateGithubStars(starCount);

        // Save last updated time
        const now = Date.now();
        localStorage.setItem("github_stars_last_updated", now.toString());
        setLastUpdated(now);

        console.log(`GitHub stars updated: ${starCount}`);
      } else {
        console.error("Failed to fetch GitHub stars:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching GitHub stars:", error);
    }
  };

  // This component doesn't render anything
  return null;
}
