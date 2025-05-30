"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSettings,
  FiDatabase,
  FiShield,
  FiCode,
  FiSave,
  FiRefreshCw,
  FiAlertTriangle,
  FiEye,
  FiEyeOff,
  FiUpload,
  FiDownload,
  FiTrash2,
  FiCopy,
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useAdmin } from "../../contexts/AdminContext";

interface SystemConfig {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  adminEmail: string;
  enableRegistration: boolean;
  maintenanceMode: boolean;
  maxFileSize: number;
  allowedFileTypes: string[];
}

interface DatabaseConfig {
  backupFrequency: string;
  lastBackup: string;
  databaseSize: string;
  totalRecords: number;
}

interface APIConfig {
  githubToken: string;
  analyticsId: string;
  firebaseProject: string;
  enableRateLimiting: boolean;
  rateLimit: number;
}

interface SecurityConfig {
  enableTwoFactor: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  enableAuditLog: boolean;
  allowedIPs: string[];
}

export default function SystemSettings() {
  const { hasPermission } = useAdmin();
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setSaving] = useState(false);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>(
    {}
  );

  const [systemConfig, setSystemConfig] = useState<SystemConfig>({
    siteName: "Gitgenix",
    siteDescription: "Create beautiful GitHub contribution art and patterns",
    siteUrl: "https://gitgenix.netlify.app",
    adminEmail: "admin@gitgenix.com",
    enableRegistration: true,
    maintenanceMode: false,
    maxFileSize: 5,
    allowedFileTypes: ["svg", "png", "jpg", "gif"],
  });

  const [databaseConfig, setDatabaseConfig] = useState<DatabaseConfig>({
    backupFrequency: "daily",
    lastBackup: "2024-01-20T10:30:00Z",
    databaseSize: "2.4 GB",
    totalRecords: 15789,
  });

  const [apiConfig, setApiConfig] = useState<APIConfig>({
    githubToken: "ghp_**********************",
    analyticsId: "GA-123456789",
    firebaseProject: "gitgenix-app",
    enableRateLimiting: true,
    rateLimit: 100,
  });

  const [securityConfig, setSecurityConfig] = useState<SecurityConfig>({
    enableTwoFactor: true,
    sessionTimeout: 24,
    maxLoginAttempts: 5,
    enableAuditLog: true,
    allowedIPs: ["0.0.0.0/0"], // All IPs allowed by default
  });

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSaveSettings = async (configType: string) => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(`${configType} settings saved successfully!`);
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleBackupDatabase = async () => {
    try {
      toast.loading("Creating database backup...", { id: "backup" });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      toast.success("Database backup created successfully!", { id: "backup" });
      setDatabaseConfig((prev) => ({
        ...prev,
        lastBackup: new Date().toISOString(),
      }));
    } catch (error) {
      toast.error("Failed to create backup", { id: "backup" });
    }
  };

  const handleExportSettings = () => {
    const settings = {
      system: systemConfig,
      database: databaseConfig,
      api: apiConfig,
      security: securityConfig,
    };
    const blob = new Blob([JSON.stringify(settings, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gitgenix-settings-${
      new Date().toISOString().split("T")[0]
    }.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Settings exported successfully!");
  };

  const renderGeneralTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">
            Site Information
          </h4>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">
              Site Name
            </label>
            <input
              type="text"
              value={systemConfig.siteName}
              onChange={(e) =>
                setSystemConfig({ ...systemConfig, siteName: e.target.value })
              }
              className="w-full px-3 py-2 bg-foreground/5 border border-foreground/20 rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">
              Site Description
            </label>
            <textarea
              value={systemConfig.siteDescription}
              onChange={(e) =>
                setSystemConfig({
                  ...systemConfig,
                  siteDescription: e.target.value,
                })
              }
              className="w-full px-3 py-2 bg-foreground/5 border border-foreground/20 rounded-lg text-foreground resize-none"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">
              Site URL
            </label>
            <input
              type="url"
              value={systemConfig.siteUrl}
              onChange={(e) =>
                setSystemConfig({ ...systemConfig, siteUrl: e.target.value })
              }
              className="w-full px-3 py-2 bg-foreground/5 border border-foreground/20 rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">
              Admin Email
            </label>
            <input
              type="email"
              value={systemConfig.adminEmail}
              onChange={(e) =>
                setSystemConfig({ ...systemConfig, adminEmail: e.target.value })
              }
              className="w-full px-3 py-2 bg-foreground/5 border border-foreground/20 rounded-lg text-foreground"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">
            Application Settings
          </h4>

          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground/80">
                Enable User Registration
              </span>
              <input
                type="checkbox"
                checked={systemConfig.enableRegistration}
                onChange={(e) =>
                  setSystemConfig({
                    ...systemConfig,
                    enableRegistration: e.target.checked,
                  })
                }
                className="w-4 h-4 text-primary bg-foreground/5 border-foreground/20 rounded focus:ring-primary"
              />
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground/80">
                Maintenance Mode
              </span>
              <input
                type="checkbox"
                checked={systemConfig.maintenanceMode}
                onChange={(e) =>
                  setSystemConfig({
                    ...systemConfig,
                    maintenanceMode: e.target.checked,
                  })
                }
                className="w-4 h-4 text-primary bg-foreground/5 border-foreground/20 rounded focus:ring-primary"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">
              Max File Size (MB)
            </label>
            <input
              type="number"
              value={systemConfig.maxFileSize}
              onChange={(e) =>
                setSystemConfig({
                  ...systemConfig,
                  maxFileSize: parseInt(e.target.value),
                })
              }
              className="w-full px-3 py-2 bg-foreground/5 border border-foreground/20 rounded-lg text-foreground"
              min="1"
              max="50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">
              Allowed File Types
            </label>
            <div className="flex flex-wrap gap-2">
              {systemConfig.allowedFileTypes.map((type, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full flex items-center space-x-2"
                >
                  <span>{type}</span>
                  <button
                    onClick={() => {
                      const newTypes = systemConfig.allowedFileTypes.filter(
                        (_, i) => i !== index
                      );
                      setSystemConfig({
                        ...systemConfig,
                        allowedFileTypes: newTypes,
                      });
                    }}
                    className="hover:text-red-500"
                  >
                    <FiTrash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSaveSettings("General")}
          disabled={isSaving}
          className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          <FiSave className="w-4 h-4" />
          <span>{isSaving ? "Saving..." : "Save Changes"}</span>
        </motion.button>
      </div>
    </div>
  );

  const renderDatabaseTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">
            Database Status
          </h4>

          <div className="bg-foreground/5 rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-foreground/70">Database Size:</span>
              <span className="font-medium text-foreground">
                {databaseConfig.databaseSize}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/70">Total Records:</span>
              <span className="font-medium text-foreground">
                {databaseConfig.totalRecords.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/70">Last Backup:</span>
              <span className="font-medium text-foreground">
                {new Date(databaseConfig.lastBackup).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">
              Backup Frequency
            </label>
            <select
              value={databaseConfig.backupFrequency}
              onChange={(e) =>
                setDatabaseConfig({
                  ...databaseConfig,
                  backupFrequency: e.target.value,
                })
              }
              className="w-full px-3 py-2 bg-foreground/5 border border-foreground/20 rounded-lg text-foreground"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">
            Database Actions
          </h4>

          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBackupDatabase}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20 transition-colors"
            >
              <FiDownload className="w-4 h-4" />
              <span>Create Backup</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-colors"
            >
              <FiUpload className="w-4 h-4" />
              <span>Restore Backup</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-yellow-500/10 text-yellow-500 rounded-lg hover:bg-yellow-500/20 transition-colors"
            >
              <FiRefreshCw className="w-4 h-4" />
              <span>Optimize Database</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
            >
              <FiTrash2 className="w-4 h-4" />
              <span>Clear Cache</span>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSaveSettings("Database")}
          disabled={isSaving}
          className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          <FiSave className="w-4 h-4" />
          <span>{isSaving ? "Saving..." : "Save Changes"}</span>
        </motion.button>
      </div>
    </div>
  );

  const renderAPITab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">
            API Configuration
          </h4>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">
              GitHub Token
            </label>
            <div className="relative">
              <input
                type={showPasswords.github ? "text" : "password"}
                value={apiConfig.githubToken}
                onChange={(e) =>
                  setApiConfig({ ...apiConfig, githubToken: e.target.value })
                }
                className="w-full px-3 py-2 pr-20 bg-foreground/5 border border-foreground/20 rounded-lg text-foreground"
              />
              <div className="absolute right-2 top-2 flex space-x-1">
                <button
                  onClick={() => togglePasswordVisibility("github")}
                  className="p-1 hover:bg-foreground/10 rounded"
                >
                  {showPasswords.github ? (
                    <FiEyeOff className="w-4 h-4" />
                  ) : (
                    <FiEye className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(apiConfig.githubToken);
                    toast.success("Copied to clipboard");
                  }}
                  className="p-1 hover:bg-foreground/10 rounded"
                >
                  <FiCopy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">
              Google Analytics ID
            </label>
            <input
              type="text"
              value={apiConfig.analyticsId}
              onChange={(e) =>
                setApiConfig({ ...apiConfig, analyticsId: e.target.value })
              }
              className="w-full px-3 py-2 bg-foreground/5 border border-foreground/20 rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">
              Firebase Project ID
            </label>
            <input
              type="text"
              value={apiConfig.firebaseProject}
              onChange={(e) =>
                setApiConfig({ ...apiConfig, firebaseProject: e.target.value })
              }
              className="w-full px-3 py-2 bg-foreground/5 border border-foreground/20 rounded-lg text-foreground"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">
            Rate Limiting
          </h4>

          <label className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground/80">
              Enable Rate Limiting
            </span>
            <input
              type="checkbox"
              checked={apiConfig.enableRateLimiting}
              onChange={(e) =>
                setApiConfig({
                  ...apiConfig,
                  enableRateLimiting: e.target.checked,
                })
              }
              className="w-4 h-4 text-primary bg-foreground/5 border-foreground/20 rounded focus:ring-primary"
            />
          </label>

          {apiConfig.enableRateLimiting && (
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Requests per minute
              </label>
              <input
                type="number"
                value={apiConfig.rateLimit}
                onChange={(e) =>
                  setApiConfig({
                    ...apiConfig,
                    rateLimit: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 bg-foreground/5 border border-foreground/20 rounded-lg text-foreground"
                min="1"
                max="1000"
              />
            </div>
          )}

          <div className="bg-blue-500/10 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <FiShield className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h5 className="font-medium text-blue-500 mb-1">API Security</h5>
                <p className="text-sm text-blue-500/80">
                  Make sure to keep your API keys secure and never share them
                  publicly. Rotate tokens regularly for better security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSaveSettings("API")}
          disabled={isSaving}
          className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          <FiSave className="w-4 h-4" />
          <span>{isSaving ? "Saving..." : "Save Changes"}</span>
        </motion.button>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">
            Authentication
          </h4>

          <label className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground/80">
              Enable Two-Factor Authentication
            </span>
            <input
              type="checkbox"
              checked={securityConfig.enableTwoFactor}
              onChange={(e) =>
                setSecurityConfig({
                  ...securityConfig,
                  enableTwoFactor: e.target.checked,
                })
              }
              className="w-4 h-4 text-primary bg-foreground/5 border-foreground/20 rounded focus:ring-primary"
            />
          </label>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">
              Session Timeout (hours)
            </label>
            <input
              type="number"
              value={securityConfig.sessionTimeout}
              onChange={(e) =>
                setSecurityConfig({
                  ...securityConfig,
                  sessionTimeout: parseInt(e.target.value),
                })
              }
              className="w-full px-3 py-2 bg-foreground/5 border border-foreground/20 rounded-lg text-foreground"
              min="1"
              max="168"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">
              Max Login Attempts
            </label>
            <input
              type="number"
              value={securityConfig.maxLoginAttempts}
              onChange={(e) =>
                setSecurityConfig({
                  ...securityConfig,
                  maxLoginAttempts: parseInt(e.target.value),
                })
              }
              className="w-full px-3 py-2 bg-foreground/5 border border-foreground/20 rounded-lg text-foreground"
              min="3"
              max="10"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">
            Security Monitoring
          </h4>

          <label className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground/80">
              Enable Audit Logging
            </span>
            <input
              type="checkbox"
              checked={securityConfig.enableAuditLog}
              onChange={(e) =>
                setSecurityConfig({
                  ...securityConfig,
                  enableAuditLog: e.target.checked,
                })
              }
              className="w-4 h-4 text-primary bg-foreground/5 border-foreground/20 rounded focus:ring-primary"
            />
          </label>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">
              Allowed IP Addresses
            </label>
            <textarea
              value={securityConfig.allowedIPs.join("\n")}
              onChange={(e) =>
                setSecurityConfig({
                  ...securityConfig,
                  allowedIPs: e.target.value
                    .split("\n")
                    .filter((ip) => ip.trim()),
                })
              }
              className="w-full px-3 py-2 bg-foreground/5 border border-foreground/20 rounded-lg text-foreground resize-none"
              rows={4}
              placeholder="Enter IP addresses or CIDR blocks (one per line)"
            />
            <p className="text-xs text-foreground/60 mt-1">
              Use 0.0.0.0/0 to allow all IPs
            </p>
          </div>
        </div>
      </div>

      <div className="bg-red-500/10 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <FiAlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
          <div>
            <h5 className="font-medium text-red-500 mb-1">Security Warning</h5>
            <p className="text-sm text-red-500/80">
              Changing security settings can affect application access. Make
              sure you understand the implications before applying changes.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSaveSettings("Security")}
          disabled={isSaving}
          className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          <FiSave className="w-4 h-4" />
          <span>{isSaving ? "Saving..." : "Save Changes"}</span>
        </motion.button>
      </div>
    </div>
  );

  if (!hasPermission("system_settings")) {
    return (
      <div className="text-center py-12">
        <FiShield className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Access Denied
        </h3>
        <p className="text-foreground/60">
          You don't have permission to access system settings.
        </p>
      </div>
    );
  }

  const tabs = [
    {
      id: "general",
      label: "General",
      icon: <FiSettings className="w-4 h-4" />,
    },
    {
      id: "database",
      label: "Database",
      icon: <FiDatabase className="w-4 h-4" />,
    },
    {
      id: "api",
      label: "API & Integrations",
      icon: <FiCode className="w-4 h-4" />,
    },
    {
      id: "security",
      label: "Security",
      icon: <FiShield className="w-4 h-4" />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-foreground">System Settings</h3>
          <p className="text-foreground/60">
            Configure application settings and preferences
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExportSettings}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20 transition-colors"
        >
          <FiDownload className="w-4 h-4" />
          <span>Export Settings</span>
        </motion.button>
      </div>

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
          {activeTab === "general" && renderGeneralTab()}
          {activeTab === "database" && renderDatabaseTab()}
          {activeTab === "api" && renderAPITab()}
          {activeTab === "security" && renderSecurityTab()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
