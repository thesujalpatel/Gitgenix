"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAdmin } from "../../contexts/AdminContext";
import {
  FiHome,
  FiSettings,
  FiUsers,
  FiBarChart,
  FiSearch,
  FiShield,
  FiLogOut,
  FiMenu,
  FiX,
  FiActivity,
  FiTrendingUp,
  FiEye,
  FiEdit3,
  FiDatabase,
  FiRefreshCw,
} from "react-icons/fi";
import { RiAdminLine, RiSeoLine } from "react-icons/ri";
import { BiRocket } from "react-icons/bi";
import Link from "next/link";
import SEOManagement from "../components/SEOManagement";
import StatsManagement from "../components/StatsManagement";
// import UserManagement from "../components/UserManagement";
// import SystemSettings from "../components/SystemSettings";

interface DashboardStats {
  totalUsers: number;
  totalPatterns: number;
  todayVisitors: number;
}

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  component?: React.ComponentType;
  external?: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const {
    isAuthenticated,
    isAdmin,
    loading,
    adminProfile,
    signOut,
    hasPermission,
  } = useAdmin();

  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalPatterns: 0,
    todayVisitors: 0,
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      router.push("/admin");
    }
  }, [isAuthenticated, isAdmin, loading, router]);

  // Load dashboard stats
  useEffect(() => {
    if (isAdmin) {
      loadDashboardStats();
    }
  }, [isAdmin]);

  const loadDashboardStats = async () => {
    setIsRefreshing(true);
    try {
      // TODO: Implement actual stats fetching from Firebase
      // For now, showing mock data
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStats({
        totalUsers: 1247,
        totalPatterns: 8431,
        todayVisitors: 342,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Navigation items based on permissions
  const navigationItems: NavigationItem[] = [
    {
      id: "overview",
      label: "Overview",
      icon: <FiHome className="w-5 h-5" />,
    },
    ...(hasPermission("seo_management")
      ? [
          {
            id: "seo",
            label: "SEO Management",
            icon: <RiSeoLine className="w-5 h-5" />,
            component: SEOManagement,
          },
        ]
      : []),
    ...(hasPermission("user_management")
      ? [
          {
            id: "users",
            label: "User Management",
            icon: <FiUsers className="w-5 h-5" />,
            // component: UserManagement,
          },
        ]
      : []),
    ...(hasPermission("analytics_access")
      ? [
          {
            id: "analytics",
            label: "Analytics",
            icon: <FiBarChart className="w-5 h-5" />,
          },
        ]
      : []),
    ...(hasPermission("analytics_access")
      ? [
          {
            id: "stats",
            label: "Stats Management",
            icon: <FiTrendingUp className="w-5 h-5" />,
            component: StatsManagement,
          },
        ]
      : []),
    ...(hasPermission("system_settings")
      ? [
          {
            id: "settings",
            label: "System Settings",
            icon: <FiSettings className="w-5 h-5" />,
            // component: SystemSettings,
          },
        ]
      : []),
    {
      id: "main-app",
      label: "Main App",
      icon: <BiRocket className="w-5 h-5" />,
      external: "/",
    },
  ];

  // Show loading while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-foreground/60">Loading admin dashboard...</p>
        </motion.div>
      </div>
    );
  }

  // Redirect if not authorized (backup check)
  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  const renderOverviewContent = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Welcome back, {adminProfile?.email?.split("@")[0]}!
            </h2>
            <p className="text-foreground/70">
              Admin level:{" "}
              <span className="capitalize font-medium text-primary">
                {adminProfile?.role}
              </span>
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadDashboardStats}
              disabled={isRefreshing}
              className="flex items-center space-x-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
            >
              <FiRefreshCw
                className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span className="text-sm">Refresh</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
      {/* Stats Cards */}{" "}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Total Users",
            value: stats.totalUsers.toLocaleString(),
            icon: <FiUsers className="w-6 h-6" />,
            color: "from-blue-500 to-cyan-500",
            change: "+12%",
          },
          {
            title: "Total Patterns",
            value: stats.totalPatterns.toLocaleString(),
            icon: <FiEdit3 className="w-6 h-6" />,
            color: "from-purple-500 to-pink-500",
            change: "+23%",
          },
          {
            title: "Today's Visitors",
            value: stats.todayVisitors.toLocaleString(),
            icon: <FiEye className="w-6 h-6" />,
            color: "from-orange-500 to-red-500",
            change: "+15%",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-foreground/5 rounded-xl p-6 border border-foreground/10"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-foreground/60 text-sm mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <div className="flex items-center space-x-1 mt-2">
                  <FiTrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-green-500 text-xs font-medium">
                    {stat.change}
                  </span>
                </div>
              </div>
              <div
                className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white`}
              >
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-foreground/5 rounded-xl p-6 border border-foreground/10"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "SEO Audit",
              description: "Run a comprehensive SEO audit",
              icon: <FiSearch className="w-5 h-5" />,
              action: () => setActiveTab("seo"),
              permission: "seo_management",
            },
            {
              title: "View Analytics",
              description: "Check website analytics",
              icon: <FiActivity className="w-5 h-5" />,
              action: () => setActiveTab("analytics"),
              permission: "analytics_access",
            },
            {
              title: "System Settings",
              description: "Configure system parameters",
              icon: <FiDatabase className="w-5 h-5" />,
              action: () => setActiveTab("settings"),
              permission: "system_settings",
            },
          ]
            .filter((action) => hasPermission(action.permission as any))
            .map((action) => (
              <motion.button
                key={action.title}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={action.action}
                className="text-left p-4 bg-background/50 rounded-lg border border-foreground/10 hover:border-primary/30 transition-all duration-200"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {action.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">
                      {action.title}
                    </h4>
                    <p className="text-sm text-foreground/60">
                      {action.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
        </div>
      </motion.div>
      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-foreground/5 rounded-xl p-6 border border-foreground/10"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {[
            {
              user: "user123",
              action: "created a new pattern",
              time: "2 minutes ago",
            },
            {
              user: "developer456",
              action: "shared a pattern",
              time: "15 minutes ago",
            },
            {
              user: "artist789",
              action: "generated a script",
              time: "1 hour ago",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-background/50 rounded-lg"
            >
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <FiUsers className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity.user}</span>{" "}
                  {activity.action}
                </p>
                <p className="text-xs text-foreground/60">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderContent = () => {
    const activeItem = navigationItems.find((item) => item.id === activeTab);

    if (activeTab === "overview") {
      return renderOverviewContent();
    }

    if (activeItem?.component) {
      const Component = activeItem.component;
      return <Component />;
    }
    if (activeTab === "analytics") {
      return (
        <div className="text-center py-12">
          <FiBarChart className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Analytics Dashboard
          </h3>
          <p className="text-foreground/60 mb-6">
            Analytics integration coming soon. This will show detailed website
            metrics and user behavior.
          </p>
          <Link
            href="https://analytics.google.com"
            target="_blank"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <FiBarChart className="w-4 h-4" />
            <span>Open Google Analytics</span>
          </Link>
        </div>
      );
    }

    return (
      <div className="text-center py-12">
        <p className="text-foreground/60">
          Content for {activeTab} is being developed.
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          width: sidebarOpen ? 280 : 80,
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
        className="bg-foreground/5 border-r border-foreground/10 flex flex-col relative z-20"
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-foreground/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <RiAdminLine className="w-6 h-6 text-white" />
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex-1"
                >
                  <h2 className="font-bold text-foreground">Admin Panel</h2>
                  <p className="text-xs text-foreground/60">
                    Gitgenix Dashboard
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            if (item.external) {
              return (
                <Link key={item.id} href={item.external}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-foreground/10 transition-colors cursor-pointer"
                  >
                    <div className="text-foreground/70">{item.icon}</div>
                    <AnimatePresence>
                      {sidebarOpen && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="text-foreground/70 font-medium"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              );
            }

            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                  activeTab === item.id
                    ? "bg-primary text-white"
                    : "hover:bg-foreground/10 text-foreground/70"
                }`}
              >
                <div>{item.icon}</div>
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-foreground/10">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSignOut}
            className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-500/10 text-red-500 transition-colors"
          >
            <FiLogOut className="w-5 h-5" />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-medium"
                >
                  Sign Out
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-background border-b border-foreground/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-foreground/10 rounded-lg transition-colors"
              >
                {sidebarOpen ? (
                  <FiX className="w-5 h-5" />
                ) : (
                  <FiMenu className="w-5 h-5" />
                )}
              </button>
              <h1 className="text-xl font-semibold text-foreground capitalize">
                {activeTab.replace("-", " ")}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-2 bg-foreground/5 rounded-lg">
                <FiShield className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground/70">
                  {adminProfile?.permissions.length} permissions
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
