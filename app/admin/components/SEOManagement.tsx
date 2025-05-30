"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiGlobe,
  FiTrendingUp,
  FiAlertCircle,
  FiCheckCircle,
  FiRefreshCw,
  FiExternalLink,
  FiSettings,
  FiEdit3,
  FiX,
  FiPlus,
  FiTrash2,
  FiEye,
} from "react-icons/fi";
import { RiSeoLine } from "react-icons/ri";
import { BiRocket } from "react-icons/bi";
import { toast } from "react-hot-toast";
import SEODashboard from "../../components/SEODashboard";

interface SEOMetrics {
  score: number;
  issues: string[];
  suggestions: string[];
  pageSpeed: number;
  mobileOptimized: boolean;
}

interface MetaTag {
  id: string;
  name: string;
  content: string;
  property?: string;
}

interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: string;
  priority: number;
}

export default function SEOManagement() {
  const [activeTab, setActiveTab] = useState("overview");
  const [seoMetrics, setSeoMetrics] = useState<SEOMetrics>({
    score: 0,
    issues: [],
    suggestions: [],
    pageSpeed: 0,
    mobileOptimized: false,
  });
  const [isRunningAudit, setIsRunningAudit] = useState(false);
  const [metaTags, setMetaTags] = useState<MetaTag[]>([]);
  const [editingMeta, setEditingMeta] = useState<string | null>(null);
  const [newMetaTag, setNewMetaTag] = useState({
    name: "",
    content: "",
    property: "",
  });
  const [showAddMeta, setShowAddMeta] = useState(false);
  const [sitemapEntries, setSitemapEntries] = useState<SitemapEntry[]>([]);

  useEffect(() => {
    loadSEOData();
  }, []);

  const loadSEOData = async () => {
    try {
      // Load current meta tags (mock data for now)
      setMetaTags([
        {
          id: "1",
          name: "description",
          content:
            "Create beautiful GitHub contribution art and patterns with Gitgenix. Design, generate, and share stunning visual stories on your GitHub profile.",
        },
        {
          id: "2",
          name: "keywords",
          content:
            "GitHub contribution art, GitHub contribution graph, GitHub profile art, contribution patterns",
        },
        {
          id: "3",
          property: "og:title",
          name: "",
          content: "Gitgenix - GitHub Contribution Art Creator",
        },
        {
          id: "4",
          property: "og:description",
          name: "",
          content:
            "Create beautiful GitHub contribution art and patterns. Transform your GitHub profile with stunning visual stories.",
        },
        { id: "5", name: "twitter:card", content: "summary_large_image" },
      ]);

      // Load sitemap entries
      setSitemapEntries([
        {
          url: "https://gitgenix.netlify.app/",
          lastModified: "2024-01-20",
          changeFrequency: "weekly",
          priority: 1.0,
        },
        {
          url: "https://gitgenix.netlify.app/draw",
          lastModified: "2024-01-20",
          changeFrequency: "weekly",
          priority: 0.9,
        },
        {
          url: "https://gitgenix.netlify.app/guide",
          lastModified: "2024-01-15",
          changeFrequency: "monthly",
          priority: 0.8,
        },
        {
          url: "https://gitgenix.netlify.app/gallery",
          lastModified: "2024-01-18",
          changeFrequency: "weekly",
          priority: 0.8,
        },
      ]);
    } catch (error) {
      console.error("Error loading SEO data:", error);
      toast.error("Failed to load SEO data");
    }
  };

  const runSEOAudit = async () => {
    setIsRunningAudit(true);
    try {
      // Simulate SEO audit
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Mock audit results
      setSeoMetrics({
        score: 87,
        issues: [
          "Some images missing alt text",
          "Page title could be more descriptive on gallery page",
          "Meta description too long on guide page",
        ],
        suggestions: [
          "Add structured data for better rich snippets",
          "Improve internal linking between pages",
          "Optimize images for better loading speed",
          "Add more relevant keywords to content",
        ],
        pageSpeed: 92,
        mobileOptimized: true,
      });

      toast.success("SEO audit completed!", {
        icon: "🎉",
      });
    } catch (error) {
      console.error("Error running SEO audit:", error);
      toast.error("Failed to run SEO audit");
    } finally {
      setIsRunningAudit(false);
    }
  };

  const handleSaveMetaTag = (id: string, newContent: string) => {
    setMetaTags((tags) =>
      tags.map((tag) => (tag.id === id ? { ...tag, content: newContent } : tag))
    );
    setEditingMeta(null);
    toast.success("Meta tag updated successfully");
  };

  const handleAddMetaTag = () => {
    if (!newMetaTag.content) {
      toast.error("Content is required");
      return;
    }

    const newTag: MetaTag = {
      id: Date.now().toString(),
      name: newMetaTag.property ? "" : newMetaTag.name,
      property: newMetaTag.property || undefined,
      content: newMetaTag.content,
    };

    setMetaTags((tags) => [...tags, newTag]);
    setNewMetaTag({ name: "", content: "", property: "" });
    setShowAddMeta(false);
    toast.success("Meta tag added successfully");
  };

  const handleDeleteMetaTag = (id: string) => {
    setMetaTags((tags) => tags.filter((tag) => tag.id !== id));
    toast.success("Meta tag deleted");
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* SEO Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary rounded-xl">
              <RiSeoLine className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                SEO Overview
              </h3>
              <p className="text-foreground/60">
                Monitor and optimize your website's SEO performance
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={runSEOAudit}
            disabled={isRunningAudit}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            <FiRefreshCw
              className={`w-4 h-4 ${isRunningAudit ? "animate-spin" : ""}`}
            />
            <span>{isRunningAudit ? "Running Audit..." : "Run SEO Audit"}</span>
          </motion.button>
        </div>

        {seoMetrics.score > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg
                  className="w-24 h-24 transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-foreground/10"
                  />
                  <path
                    d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${seoMetrics.score}, 100`}
                    className={`${
                      seoMetrics.score >= 80
                        ? "text-green-500"
                        : seoMetrics.score >= 60
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-foreground">
                    {seoMetrics.score}
                  </span>
                </div>
              </div>
              <p className="text-sm text-foreground/60">SEO Score</p>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">
                {seoMetrics.pageSpeed}
              </div>
              <p className="text-sm text-foreground/60">Page Speed Score</p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-2">
                {seoMetrics.mobileOptimized ? (
                  <FiCheckCircle className="text-green-500 mx-auto" />
                ) : (
                  <FiAlertCircle className="text-red-500 mx-auto" />
                )}
              </div>
              <p className="text-sm text-foreground/60">Mobile Optimized</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Issues and Suggestions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-foreground/5 rounded-xl p-6 border border-foreground/10"
        >
          <div className="flex items-center space-x-3 mb-4">
            <FiAlertCircle className="w-5 h-5 text-red-500" />
            <h3 className="font-semibold text-foreground">Issues Found</h3>
            <span className="px-2 py-1 bg-red-500/10 text-red-500 text-xs rounded-full">
              {seoMetrics.issues.length}
            </span>
          </div>
          <div className="space-y-3">
            {seoMetrics.issues.length > 0 ? (
              seoMetrics.issues.map((issue, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-red-500/5 rounded-lg"
                >
                  <FiAlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground/80">{issue}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-foreground/60 italic">
                No issues found. Great job!
              </p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-foreground/5 rounded-xl p-6 border border-foreground/10"
        >
          <div className="flex items-center space-x-3 mb-4">
            <BiRocket className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-foreground">Suggestions</h3>
            <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-xs rounded-full">
              {seoMetrics.suggestions.length}
            </span>
          </div>
          <div className="space-y-3">
            {seoMetrics.suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-blue-500/5 rounded-lg"
              >
                <FiTrendingUp className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground/80">{suggestion}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-foreground/5 rounded-xl p-6 border border-foreground/10"
      >
        <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              title: "Meta Tags",
              description: "Manage meta tags",
              icon: <FiSettings className="w-5 h-5" />,
              action: () => setActiveTab("meta-tags"),
            },
            {
              title: "Sitemap",
              description: "Update sitemap",
              icon: <FiGlobe className="w-5 h-5" />,
              action: () => setActiveTab("sitemap"),
            },
            {
              title: "Analytics",
              description: "View SEO analytics",
              icon: <FiTrendingUp className="w-5 h-5" />,
              action: () =>
                window.open("https://analytics.google.com", "_blank"),
            },
            {
              title: "Search Console",
              description: "Open Search Console",
              icon: <FiExternalLink className="w-5 h-5" />,
              action: () =>
                window.open(
                  "https://search.google.com/search-console",
                  "_blank"
                ),
            },
          ].map((action) => (
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
                  <h4 className="font-medium text-foreground text-sm">
                    {action.title}
                  </h4>
                  <p className="text-xs text-foreground/60">
                    {action.description}
                  </p>
                </div>{" "}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* SEO Dashboard Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-foreground/5 rounded-xl p-6 border border-foreground/10"
      >
        <div className="flex items-center space-x-3 mb-4">
          <FiEye className="w-5 h-5 text-purple-500" />
          <h3 className="font-semibold text-foreground">Live SEO Dashboard</h3>
          <span className="px-2 py-1 bg-purple-500/10 text-purple-500 text-xs rounded-full">
            Real-time
          </span>
        </div>
        <div className="bg-background/50 rounded-lg p-4">
          <SEODashboard />
        </div>
      </motion.div>
    </div>
  );

  const renderMetaTagsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-foreground">
            Meta Tags Management
          </h3>
          <p className="text-foreground/60">
            Manage SEO meta tags for better search engine visibility
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddMeta(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Meta Tag</span>
        </motion.button>
      </div>

      {/* Add Meta Tag Modal */}
      <AnimatePresence>
        {showAddMeta && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddMeta(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-xl p-6 w-full max-w-md border border-foreground/10"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-foreground">Add Meta Tag</h4>
                <button
                  onClick={() => setShowAddMeta(false)}
                  className="p-1 hover:bg-foreground/10 rounded"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Type
                  </label>{" "}
                  <select
                    value={newMetaTag.property ? "property" : "name"}
                    onChange={(e) => {
                      if (e.target.value === "property") {
                        setNewMetaTag({
                          ...newMetaTag,
                          name: "",
                          property: newMetaTag.name || newMetaTag.property,
                        });
                      } else {
                        setNewMetaTag({
                          ...newMetaTag,
                          property: "",
                          name: newMetaTag.property || newMetaTag.name,
                        });
                      }
                    }}
                    className="w-full px-3 py-2 bg-foreground/5 border border-foreground/20 rounded-lg text-foreground"
                    aria-label="Select meta tag type"
                    title="Choose between name and property meta tag types"
                  >
                    <option value="name">Name</option>
                    <option value="property">Property</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    {newMetaTag.property ? "Property" : "Name"}
                  </label>
                  <input
                    type="text"
                    value={newMetaTag.property || newMetaTag.name}
                    onChange={(e) => {
                      if (newMetaTag.property) {
                        setNewMetaTag({
                          ...newMetaTag,
                          property: e.target.value,
                        });
                      } else {
                        setNewMetaTag({ ...newMetaTag, name: e.target.value });
                      }
                    }}
                    className="w-full px-3 py-2 bg-foreground/5 border border-foreground/20 rounded-lg text-foreground"
                    placeholder={
                      newMetaTag.property ? "og:title" : "description"
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Content
                  </label>{" "}
                  <textarea
                    value={newMetaTag.content}
                    onChange={(e) =>
                      setNewMetaTag({ ...newMetaTag, content: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-foreground/5 border border-foreground/20 rounded-lg text-foreground resize-none"
                    rows={3}
                    placeholder="Meta tag content..."
                    aria-label="Meta tag content"
                    title="Enter the content for this meta tag"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleAddMetaTag}
                    className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Add Meta Tag
                  </button>
                  <button
                    onClick={() => setShowAddMeta(false)}
                    className="flex-1 bg-foreground/10 text-foreground py-2 rounded-lg hover:bg-foreground/20 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Meta Tags List */}
      <div className="space-y-4">
        {metaTags.map((tag) => (
          <motion.div
            key={tag.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-foreground/5 rounded-lg p-4 border border-foreground/10"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                    {tag.property ? "property" : "name"}
                  </span>
                  <span className="font-medium text-foreground text-sm">
                    {tag.property || tag.name}
                  </span>
                </div>

                {editingMeta === tag.id ? (
                  <div className="space-y-2">
                    <textarea
                      defaultValue={tag.content}
                      className="w-full px-3 py-2 bg-background border border-foreground/20 rounded text-sm resize-none"
                      rows={2}
                      onBlur={(e) => handleSaveMetaTag(tag.id, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSaveMetaTag(tag.id, e.currentTarget.value);
                        }
                        if (e.key === "Escape") {
                          setEditingMeta(null);
                        }
                      }}
                      autoFocus
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSaveMetaTag(tag.id, tag.content)}
                        className="text-xs px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingMeta(null)}
                        className="text-xs px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {tag.content}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() =>
                    setEditingMeta(editingMeta === tag.id ? null : tag.id)
                  }
                  className="p-2 hover:bg-foreground/10 rounded text-foreground/60 hover:text-foreground"
                >
                  <FiEdit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteMetaTag(tag.id)}
                  className="p-2 hover:bg-red-500/10 rounded text-foreground/60 hover:text-red-500"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderSitemapTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-foreground">
          Sitemap Management
        </h3>
        <p className="text-foreground/60">
          Monitor and manage your website's sitemap entries
        </p>
      </div>

      <div className="bg-foreground/5 rounded-xl p-6 border border-foreground/10">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-foreground">
            Current Sitemap Entries
          </h4>{" "}
          <div className="flex space-x-2">
            <button
              className="text-xs px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20"
              aria-label="View current sitemap"
              title="View current sitemap"
            >
              <FiEye className="w-3 h-3 inline mr-1" />
              View Sitemap
            </button>
            <button
              className="text-xs px-3 py-1 bg-green-500/10 text-green-500 rounded hover:bg-green-500/20"
              aria-label="Regenerate sitemap"
              title="Regenerate sitemap"
            >
              <FiRefreshCw className="w-3 h-3 inline mr-1" />
              Regenerate
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-foreground/10">
                <th className="text-left py-2 text-foreground/70">URL</th>
                <th className="text-left py-2 text-foreground/70">
                  Last Modified
                </th>
                <th className="text-left py-2 text-foreground/70">
                  Change Frequency
                </th>
                <th className="text-left py-2 text-foreground/70">Priority</th>
              </tr>
            </thead>
            <tbody>
              {sitemapEntries.map((entry, index) => (
                <tr key={index} className="border-b border-foreground/5">
                  <td className="py-3 text-foreground/80">{entry.url}</td>
                  <td className="py-3 text-foreground/60">
                    {entry.lastModified}
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-xs rounded">
                      {entry.changeFrequency}
                    </span>
                  </td>
                  <td className="py-3 text-foreground/60">{entry.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: <FiSearch className="w-4 h-4" />,
    },
    {
      id: "meta-tags",
      label: "Meta Tags",
      icon: <FiSettings className="w-4 h-4" />,
    },
    { id: "sitemap", label: "Sitemap", icon: <FiGlobe className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-foreground/5 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-background text-primary shadow-sm"
                : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "overview" && renderOverviewTab()}
          {activeTab === "meta-tags" && renderMetaTagsTab()}
          {activeTab === "sitemap" && renderSitemapTab()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
