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

// Session and visitor tracking constants
const SESSION_KEY = 'gitgenix_session';
const VISITOR_KEY = 'gitgenix_visitor';
const STATS_CACHE_KEY = 'gitgenix_stats_cache';
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Interface for stats data
export interface AppStats {
  patternsCreated: number;
  scriptsGenerated: number;
  happyDevelopers: number; // Calculated from unique visitors
  githubStars: number; // From GitHub API
  jsonExported: number;
  patternsSaved: number;
  uniqueVisitors: number; // Session-based tracking
  sessionsToday: number;
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
  uniqueVisitors: 0,
  sessionsToday: 0,
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
 * Get cached stats from localStorage if available and fresh
 */
function getCachedStats(): AppStats | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const cached = localStorage.getItem(STATS_CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }
  } catch (error) {
    console.error("Error reading stats cache:", error);
  }
  
  return null;
}

/**
 * Cache stats to localStorage
 */
function setCachedStats(stats: AppStats): void {
  if (typeof window === 'undefined') return;
  
  try {
    const cacheData = {
      data: stats,
      timestamp: Date.now()
    };
    localStorage.setItem(STATS_CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error("Error caching stats:", error);
  }
}

/**
 * Get all stats with caching
 */
export async function getStats(): Promise<AppStats> {
  // Try to get cached stats first
  const cached = getCachedStats();
  if (cached) {
    return cached;
  }

  try {
    const statsRef = doc(db, STATS_DOC_PATH);
    const statsDoc = await getDoc(statsRef);
    
    if (!statsDoc.exists()) {
      await initializeStats();
      setCachedStats(DEFAULT_STATS);
      return DEFAULT_STATS;
    }
    
    const stats = statsDoc.data() as AppStats;
    setCachedStats(stats);
    return stats;
  } catch (error) {
    console.error("Error getting stats:", error);
    return DEFAULT_STATS;
  }
}

/**
 * Track visitor session and unique visitors using localStorage
 */
export function trackVisitorSession(): { isNewVisitor: boolean; isNewSession: boolean } {
  if (typeof window === 'undefined') {
    return { isNewVisitor: false, isNewSession: false };
  }

  const now = Date.now();
  const existingSession = localStorage.getItem(SESSION_KEY);
  const existingVisitor = localStorage.getItem(VISITOR_KEY);

  let isNewVisitor = false;
  let isNewSession = false;

  // Check if it's a new session
  if (!existingSession || (existingSession && now - parseInt(existingSession) > SESSION_DURATION)) {
    isNewSession = true;
    localStorage.setItem(SESSION_KEY, now.toString());

    // Check if it's a new visitor (first time ever)
    if (!existingVisitor) {
      isNewVisitor = true;
      localStorage.setItem(VISITOR_KEY, now.toString());
    }
  }

  return { isNewVisitor, isNewSession };
}

/**
 * Get estimated happy developers based on patterns and usage
 */
function calculateHappyDevelopers(stats: AppStats): number {
  // Calculate based on activity: patterns created + scripts generated + patterns saved
  const activityScore = stats.patternsCreated + stats.scriptsGenerated + stats.patternsSaved;
  
  // Assume roughly 60% of visitors who create patterns are "happy developers"
  const baseHappyDevs = Math.floor(stats.uniqueVisitors * 0.6);
  
  // Add bonus for high activity (creating patterns, generating scripts)
  const activityBonus = Math.floor(activityScore * 0.1);
  
  return baseHappyDevs + activityBonus;
}

/**
 * Update stats in Firebase and clear cache
 */
async function updateStatsInFirebase(updates: any): Promise<void> {
  try {
    const statsRef = doc(db, STATS_DOC_PATH);
    await updateDoc(statsRef, {
      ...updates,
      lastUpdated: serverTimestamp(),
    });
    
    // Clear cache after update
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STATS_CACHE_KEY);
    }
  } catch (error) {
    console.error("Error updating stats in Firebase:", error);
    // Try to initialize stats and retry
    await initializeStats();
    try {
      const statsRef = doc(db, STATS_DOC_PATH);
      await updateDoc(statsRef, {
        ...updates,
        lastUpdated: serverTimestamp(),
      });
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STATS_CACHE_KEY);
      }
    } catch (retryError) {
      console.error("Error retrying stats update:", retryError);
    }
  }
}
/**
 * Increment the count of patterns created
 */
export async function incrementPatternCreated(): Promise<void> {
  const updates = {
    patternsCreated: increment(1),
  };
  await updateStatsInFirebase(updates);
}

/**
 * Increment the count of scripts generated
 */
export async function incrementScriptGenerated(): Promise<void> {
  const updates = {
    scriptsGenerated: increment(1),
  };
  await updateStatsInFirebase(updates);
}

/**
 * Increment the count of JSON exports
 */
export async function incrementJsonExported(): Promise<void> {
  const updates = {
    jsonExported: increment(1),
  };
  await updateStatsInFirebase(updates);
}

/**
 * Increment the count of patterns saved online
 */
export async function incrementPatternSaved(): Promise<void> {
  const updates = {
    patternsSaved: increment(1),
  };
  await updateStatsInFirebase(updates);
}

/**
 * Increment the count of unique visitors (called when a new visitor is detected)
 */
export async function incrementUniqueVisitor(): Promise<void> {
  const updates = {
    uniqueVisitors: increment(1),
  };
  await updateStatsInFirebase(updates);
}

/**
 * Increment session count (called when a new session is detected)
 */
export async function incrementSessionCount(): Promise<void> {
  const updates = {
    sessionsToday: increment(1),
  };
  await updateStatsInFirebase(updates);
}

/**
 * Update GitHub stars count
 */
export async function updateGithubStars(count: number): Promise<void> {
  const updates = {
    githubStars: count,
  };
  await updateStatsInFirebase(updates);
}

/**
 * Update happy developers count (now calculated automatically)
 */
export async function updateHappyDevelopers(count: number): Promise<void> {
  const updates = {
    happyDevelopers: count,
  };
  await updateStatsInFirebase(updates);
}

/**
 * Recalculate and update happy developers based on current stats
 */
export async function recalculateHappyDevelopers(): Promise<void> {
  try {
    const currentStats = await getStats();
    const newHappyDevs = calculateHappyDevelopers(currentStats);
    await updateHappyDevelopers(newHappyDevs);
  } catch (error) {
    console.error("Error recalculating happy developers:", error);
  }
}

/**
 * Track client-side events and sessions
 * This function should be called from client-side code
 */
export function trackScriptGenerated(type: string): void {
  console.log(`Script generated: ${type}`);
  
  // Increment script count in Firebase
  incrementScriptGenerated().catch(err => {
    console.error("Error tracking script generation:", err);
  });
  
  // Recalculate happy developers after activity
  setTimeout(() => {
    recalculateHappyDevelopers().catch(err => {
      console.error("Error recalculating happy developers:", err);
    });
  }, 1000);
}

/**
 * Initialize visitor tracking and session management
 * Call this function when the app loads
 */
export function initializeVisitorTracking(): void {
  if (typeof window === 'undefined') return;
  
  const { isNewVisitor, isNewSession } = trackVisitorSession();
  
  if (isNewVisitor) {
    console.log("New visitor detected");
    incrementUniqueVisitor().catch(err => {
      console.error("Error tracking new visitor:", err);
    });
  }
  
  if (isNewSession) {
    console.log("New session detected");
    incrementSessionCount().catch(err => {
      console.error("Error tracking new session:", err);
    });
  }
  
  // Recalculate happy developers when visitor tracking is initialized
  if (isNewVisitor || isNewSession) {
    setTimeout(() => {
      recalculateHappyDevelopers().catch(err => {
        console.error("Error recalculating happy developers:", err);
      });
    }, 2000);
  }
}

/**
 * Get session info for debugging
 */
export function getSessionInfo(): { isNewSession: boolean; sessionAge: number; hasVisited: boolean } {
  if (typeof window === 'undefined') {
    return { isNewSession: false, sessionAge: 0, hasVisited: false };
  }
  const now = Date.now();
  const existingSession = localStorage.getItem(SESSION_KEY);
  const existingVisitor = localStorage.getItem(VISITOR_KEY);
  
  const isNewSession: boolean = !existingSession || (existingSession ? (now - parseInt(existingSession) > SESSION_DURATION) : true);
  const sessionAge: number = existingSession ? now - parseInt(existingSession) : 0;
  const hasVisited: boolean = !!existingVisitor;
  
  return { isNewSession, sessionAge, hasVisited };
}
