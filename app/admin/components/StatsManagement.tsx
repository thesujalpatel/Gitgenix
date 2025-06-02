"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  FiBarChart2,
  FiRefreshCw,
  FiDownload,
  FiTrendingUp,
  FiUsers,
  FiFileText,
  FiSave,
  FiStar,
} from "react-icons/fi";
import { BiPalette } from "react-icons/bi";
import { RiGitRepositoryLine } from "react-icons/ri";
import {
  getStats,
  AppStats,
  updateGithubStars,
  updateHappyDevelopers,
} from "../../utils/statsService";
import { useAdmin } from "../../contexts/AdminContext";

export default function StatsManagement() {
  const { hasPermission } = useAdmin();
  const [stats, setStats] = useState<AppStats>({
    patternsCreated: 0,
    scriptsGenerated: 0,
    happyDevelopers: 0,
    githubStars: 0,
    jsonExported: 0,
    patternsSaved: 0,
    uniqueVisitors: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setIsLoading(true);
      const statsData = await getStats();
      setStats(statsData);
      toast.success("Stats loaded successfully");
    } catch (error) {
      console.error("Error loading stats:", error);
      toast.error("Failed to load stats");
    } finally {
      setIsLoading(false);
    }
  };
  const handleManualUpdate = async (field: keyof AppStats, value: number) => {
    try {
      if (field === "githubStars") {
        await updateGithubStars(value);
        toast.success("GitHub stars updated");
      } else if (field === "happyDevelopers") {
        await updateHappyDevelopers(value);
        toast.success("Happy developers count updated");
      }

      // Refresh stats
      await loadStats();
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      toast.error(`Failed to update ${field}`);
    }
  };
  const exportStats = () => {
    const data = JSON.stringify(stats, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gitgenix-stats-${
      new Date().toISOString().split("T")[0]
    }.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Stats exported successfully");
  };

  // Check if user has permission
  if (!hasPermission("analytics_access")) {
    return (
      <div className="text-center py-12">
        <FiBarChart2 className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Access Denied
        </h3>{" "}
        <p className="text-foreground/60">
          You don&apos;t have permission to access stats management.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-foreground">
            Stats Management
          </h3>
          <p className="text-foreground/60">
            View and manage application statistics
          </p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadStats}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors text-primary"
          >
            <FiRefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
            <span>Refresh</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exportStats}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg transition-colors text-blue-500"
          >
            <FiDownload className="w-4 h-4" />
            <span>Export</span>
          </motion.button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Patterns Created",
            value: stats.patternsCreated.toLocaleString(),
            icon: <BiPalette className="w-5 h-5" />,
            color: "from-purple-500 to-pink-500",
            key: "patternsCreated",
          },
          {
            title: "Scripts Generated",
            value: stats.scriptsGenerated.toLocaleString(),
            icon: <RiGitRepositoryLine className="w-5 h-5" />,
            color: "from-blue-500 to-cyan-500",
            key: "scriptsGenerated",
          },
          {
            title: "Happy Developers",
            value: stats.happyDevelopers.toLocaleString(),
            icon: <FiUsers className="w-5 h-5" />,
            color: "from-green-500 to-emerald-500",
            key: "happyDevelopers",
            editable: true,
          },
          {
            title: "GitHub Stars",
            value: stats.githubStars.toLocaleString(),
            icon: <FiStar className="w-5 h-5" />,
            color: "from-yellow-500 to-orange-500",
            key: "githubStars",
            editable: true,
          },
          {
            title: "JSON Exported",
            value: stats.jsonExported.toLocaleString(),
            icon: <FiFileText className="w-5 h-5" />,
            color: "from-indigo-500 to-purple-500",
            key: "jsonExported",
          },
          {
            title: "Patterns Saved",
            value: stats.patternsSaved.toLocaleString(),
            icon: <FiSave className="w-5 h-5" />,
            color: "from-red-500 to-pink-500",
            key: "patternsSaved",
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-foreground/5 rounded-xl p-6 border border-foreground/10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} text-white`}
                >
                  {stat.icon}
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{stat.title}</h4>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
              </div>

              {stat.editable && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const newValue = prompt(
                      `Update ${stat.title}:`,
                      stat.value
                    );
                    if (newValue !== null) {
                      const numValue = parseInt(newValue.replace(/,/g, ""));
                      if (!isNaN(numValue)) {
                        handleManualUpdate(
                          stat.key as keyof AppStats,
                          numValue
                        );
                      } else {
                        toast.error("Please enter a valid number");
                      }
                    }
                  }}
                  className="p-2 text-foreground/60 hover:text-primary rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <FiTrendingUp className="w-4 h-4" />
                </motion.button>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-foreground/10">
              <div className="text-sm text-foreground/60 flex items-center justify-between">
                <span>Last updated:</span>
                <span>
                  {stats.lastUpdated
                    ? new Date(
                        stats.lastUpdated?.seconds * 1000
                      ).toLocaleString()
                    : "Never"}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-foreground/5 rounded-xl p-6 border border-foreground/10"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <FiBarChart2 className="w-5 h-5 mr-2 text-primary" />
          Statistics Overview
        </h3>
        <div className="text-center py-8 text-foreground/60">
          {/* This is where a chart would go in a real implementation */}
          <FiBarChart2 className="w-16 h-16 mx-auto mb-4 text-foreground/30" />
          <p>
            A bar chart showing trends would appear here in a complete
            implementation
          </p>
        </div>{" "}
      </motion.div>
    </div>
  );
}
