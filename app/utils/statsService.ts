"use client";

import { db } from "../firebase/config";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";

// Stats document path
const STATS_DOC_PATH = "system/stats";

// Interface for stats data
export interface AppStats {
  patternsCreated: number;
  scriptsGenerated: number;
  happyDevelopers: number; // From Google Analytics
  githubStars: number; // From GitHub API
  jsonExported: number;
  patternsSaved: number;
  uniqueVisitors: number; // New field for unique visitors
  lastUpdated?: any; // firebase timestamp
}

// Default stats
const DEFAULT_STATS: AppStats = {
  patternsCreated: 0,
  scriptsGenerated: 0,
  happyDevelopers: 0,
  githubStars: 0,
  jsonExported: 0,
  patternsSaved: 0,
  uniqueVisitors: 0, // Initialize unique visitors
};

/**
 * Initialize stats document if it doesn't exist
 */
export async function initializeStats(): Promise<void> {
  try {
    const statsRef = doc(db, STATS_DOC_PATH);
    const statsDoc = await getDoc(statsRef);
    
    if (!statsDoc.exists()) {
      await setDoc(statsRef, {
        ...DEFAULT_STATS,
        lastUpdated: serverTimestamp(),
      });
      console.log("Stats document initialized");
    }
  } catch (error) {
    console.error("Error initializing stats:", error);
  }
}

/**
 * Get all stats
 */
export async function getStats(): Promise<AppStats> {
  try {
    const statsRef = doc(db, STATS_DOC_PATH);
    const statsDoc = await getDoc(statsRef);
    
    if (!statsDoc.exists()) {
      await initializeStats();
      return DEFAULT_STATS;
    }
    
    return statsDoc.data() as AppStats;
  } catch (error) {
    console.error("Error getting stats:", error);
    return DEFAULT_STATS;
  }
}

/**
 * Increment the count of patterns created
 */
export async function incrementPatternCreated(): Promise<void> {
  try {
    const statsRef = doc(db, STATS_DOC_PATH);
    await updateDoc(statsRef, {
      patternsCreated: increment(1),
      lastUpdated: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error incrementing patterns created:", error);
    // Try to initialize stats and retry
    await initializeStats();
    try {
      const statsRef = doc(db, STATS_DOC_PATH);
      await updateDoc(statsRef, {
        patternsCreated: increment(1),
        lastUpdated: serverTimestamp(),
      });
    } catch (retryError) {
      console.error("Error retrying increment patterns created:", retryError);
    }
  }
}

/**
 * Increment the count of scripts generated
 */
export async function incrementScriptGenerated(): Promise<void> {
  try {
    const statsRef = doc(db, STATS_DOC_PATH);
    await updateDoc(statsRef, {
      scriptsGenerated: increment(1),
      lastUpdated: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error incrementing scripts generated:", error);
    // Try to initialize stats and retry
    await initializeStats();
    try {
      const statsRef = doc(db, STATS_DOC_PATH);
      await updateDoc(statsRef, {
        scriptsGenerated: increment(1),
        lastUpdated: serverTimestamp(),
      });
    } catch (retryError) {
      console.error("Error retrying increment scripts generated:", retryError);
    }
  }
}

/**
 * Increment the count of JSON exports
 */
export async function incrementJsonExported(): Promise<void> {
  try {
    const statsRef = doc(db, STATS_DOC_PATH);
    await updateDoc(statsRef, {
      jsonExported: increment(1),
      lastUpdated: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error incrementing JSON exported:", error);
    // Try to initialize stats and retry
    await initializeStats();
    try {
      const statsRef = doc(db, STATS_DOC_PATH);
      await updateDoc(statsRef, {
        jsonExported: increment(1),
        lastUpdated: serverTimestamp(),
      });
    } catch (retryError) {
      console.error("Error retrying increment JSON exported:", retryError);
    }
  }
}

/**
 * Increment the count of patterns saved online
 */
export async function incrementPatternSaved(): Promise<void> {
  try {
    const statsRef = doc(db, STATS_DOC_PATH);
    await updateDoc(statsRef, {
      patternsSaved: increment(1),
      lastUpdated: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error incrementing patterns saved:", error);
    // Try to initialize stats and retry
    await initializeStats();
    try {
      const statsRef = doc(db, STATS_DOC_PATH);
      await updateDoc(statsRef, {
        patternsSaved: increment(1),
        lastUpdated: serverTimestamp(),
      });
    } catch (retryError) {
      console.error("Error retrying increment patterns saved:", retryError);
    }
  }
}

/**
 * Increment the count of unique visitors
 */
export async function incrementUniqueVisitor(): Promise<void> {
  try {
    // In a real implementation, you might want to track unique visitors differently
    // For now, we'll just track them in the same stats document
    const statsRef = doc(db, STATS_DOC_PATH);
    await updateDoc(statsRef, {
      uniqueVisitors: increment(1),
      lastUpdated: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error incrementing unique visitors:", error);
    // Try to initialize stats and retry
    await initializeStats();
    try {
      const statsRef = doc(db, STATS_DOC_PATH);
      await updateDoc(statsRef, {
        uniqueVisitors: increment(1),
        lastUpdated: serverTimestamp(),
      });
    } catch (retryError) {
      console.error("Error retrying increment unique visitors:", retryError);
    }
  }
}

/**
 * Update GitHub stars count
 */
export async function updateGithubStars(count: number): Promise<void> {
  try {
    const statsRef = doc(db, STATS_DOC_PATH);
    await updateDoc(statsRef, {
      githubStars: count,
      lastUpdated: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating GitHub stars:", error);
    // Try to initialize stats and retry
    await initializeStats();
    try {
      const statsRef = doc(db, STATS_DOC_PATH);
      await updateDoc(statsRef, {
        githubStars: count,
        lastUpdated: serverTimestamp(),
      });
    } catch (retryError) {
      console.error("Error retrying update GitHub stars:", retryError);
    }
  }
}

/**
 * Update happy developers count (from Google Analytics)
 */
export async function updateHappyDevelopers(count: number): Promise<void> {
  try {
    const statsRef = doc(db, STATS_DOC_PATH);
    await updateDoc(statsRef, {
      happyDevelopers: count,
      lastUpdated: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating happy developers:", error);
    // Try to initialize stats and retry
    await initializeStats();
    try {
      const statsRef = doc(db, STATS_DOC_PATH);
      await updateDoc(statsRef, {
        happyDevelopers: count,
        lastUpdated: serverTimestamp(),
      });
    } catch (retryError) {
      console.error("Error retrying update happy developers:", retryError);
    }
  }
}

/**
 * Track client-side events
 * This function should be called from client-side code
 */
export function trackScriptGenerated(type: string): void {
  // Could be expanded to use Google Analytics or other tracking
  console.log(`Script generated: ${type}`);
  
  // Track with Google Analytics if available
  if (typeof window !== 'undefined' && 'gtag' in window) {
    // @ts-ignore
    window.gtag('event', 'generate_script', {
      'event_category': 'engagement',
      'event_label': type,
    });
  }
}
