"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiRefreshCw,
  FiBarChart,
  FiUsers,
  FiGitBranch,
  FiStar,
  FiActivity,
} from "react-icons/fi";
import { BiPalette } from "react-icons/bi";
import { RiGitRepositoryLine } from "react-icons/ri";
import { toast } from "react-hot-toast";
import {
  getSiteStats,
  updateGitHubStars,
  syncStats,
  formatStatNumber,
  type SiteStats,
} from "../../utils/statsService";

export default function StatsManagement() {
  const [stats, setStats] = useState<SiteStats>({
    patternsCreated: 0,
    scriptsGenerated: 0,
    happyDevelopers: 0,
    githubStars: 0,
    lastUpdated: Date.now(),
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isUpdatingStars, setIsUpdatingStars] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const siteStats = await getSiteStats();
      setStats(siteStats);
    } catch (error) {
      console.error("Error loading stats:", error);
      toast.error("Failed to load statistics");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await loadStats();
      toast.success("Statistics refreshed successfully");
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleUpdateGitHubStars = async () => {
    setIsUpdatingStars(true);
    try {
      await updateGitHubStars();
      await loadStats(); // Reload to get updated stats
      toast.success("GitHub stars updated successfully");
    } catch (error) {
      console.error("Error updating GitHub stars:", error);
      toast.error("Failed to update GitHub stars");
    } finally {
      setIsUpdatingStars(false);
    }
  };

  const handleSyncStats = async () => {
    setIsSyncing(true);
    try {
      await syncStats();
      await loadStats(); // Reload to get updated stats
      toast.success("All statistics synced successfully");
    } catch (error) {
      console.error("Error syncing stats:", error);
      toast.error("Failed to sync statistics");
    } finally {
      setIsSyncing(false);
    }
  };
  const statsCards = [
    {
      title: "Patterns Created",
      value: formatStatNumber(stats.patternsCreated),
      icon: <BiPalette className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      description: "Total patterns created by users",
    },
    {
      title: "Scripts Generated",
      value: formatStatNumber(stats.scriptsGenerated),
      icon: <RiGitRepositoryLine className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      description: "Shell scripts generated from patterns",
    },
    {
      title: "Happy Developers",
      value: formatStatNumber(stats.happyDevelopers),
      icon: <FiUsers className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      description: "Total unique site visitors",
    },
    {
      title: "GitHub Stars",
      value: formatStatNumber(stats.githubStars),
      icon: <FiStar className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500",
      description: "Stars on GitHub repository",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <FiBarChart className="w-7 h-7 text-primary" />
            Statistics Management
          </h2>
          <p className="text-foreground/60 mt-1">
            Monitor and manage site statistics and metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            onClick={handleRefresh}
            disabled={isRefreshing}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors disabled:opacity-50"
          >
            <FiRefreshCw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            <span className="text-sm">Refresh</span>
          </motion.button>
        </div>
      </div>{" "}
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-background/80 backdrop-blur-sm border border-foreground/10 rounded-xl p-6 relative overflow-hidden"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`}
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}
                >
                  {stat.icon}
                </div>
                <FiActivity className="w-5 h-5 text-foreground/40" />
              </div>
              <h3 className="text-sm font-medium text-foreground/60 mb-1">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-foreground mb-2">
                {isLoading ? "..." : stat.value}
              </p>
              <p className="text-xs text-foreground/50">{stat.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Management Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-background/80 backdrop-blur-sm border border-foreground/10 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <FiActivity className="w-5 h-5 text-primary" />
          Management Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button
            onClick={handleUpdateGitHubStars}
            disabled={isUpdatingStars}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center space-x-3 p-4 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors disabled:opacity-50"
          >
            <FiStar
              className={`w-5 h-5 ${isUpdatingStars ? "animate-pulse" : ""}`}
            />
            <span className="font-medium">
              {isUpdatingStars ? "Updating..." : "Update GitHub Stars"}
            </span>
          </motion.button>

          <motion.button
            onClick={handleSyncStats}
            disabled={isSyncing}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center space-x-3 p-4 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors disabled:opacity-50"
          >
            <FiGitBranch
              className={`w-5 h-5 ${isSyncing ? "animate-pulse" : ""}`}
            />
            <span className="font-medium">
              {isSyncing ? "Syncing..." : "Sync All Statistics"}
            </span>
          </motion.button>
        </div>
      </motion.div>
      {/* Last Updated */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center text-sm text-foreground/50"
      >
        Last updated: {new Date(stats.lastUpdated).toLocaleString()}
      </motion.div>
    </div>
  );
}
