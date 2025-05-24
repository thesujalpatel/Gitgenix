// Export/Import component for Arcadia
import React, { useState, useEffect } from "react";
import { IoMdDownload, IoMdShare, IoMdCloudUpload } from "react-icons/io";
import { RiSave3Line } from "react-icons/ri";
import { FiCopy, FiCheck } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import download from "downloadjs";
import {
  saveGraphToFirestore,
  stringifyGraphData,
  parseGraphData,
} from "../../firebase/dataService";
import type { Cell } from "../types/cell";
import {
  getAnimationPreferences,
  optimizeTransition,
} from "../../utils/performanceUtils";

interface DataIOProps {
  graphs: Record<
    string,
    {
      cells: Cell[];
      yearStart: Date;
      yearEnd: Date;
      monthLabels: Record<number, number>;
    }
  >;
  setGraphs: React.Dispatch<
    React.SetStateAction<
      Record<
        string,
        {
          cells: Cell[];
          yearStart: Date;
          yearEnd: Date;
          monthLabels: Record<number, number>;
        }
      >
    >
  >;
  username: string;
  repository: string;
  branch: string;
  setUsername: (username: string) => void;
  setRepository: (repository: string) => void;
  setBranch: (branch: string) => void;
}

export default function DataIO({
  graphs,
  setGraphs,
  username,
  repository,
  branch,
  setUsername,
  setRepository,
  setBranch,
}: DataIOProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [patternName, setPatternName] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [savedPatternId, setSavedPatternId] = useState("");
  const [importProgress, setImportProgress] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [animPrefs] = useState(() => getAnimationPreferences());

  // Animation controls
  const controls = useAnimation();

  // Reset copy status after a delay
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);
  // Export graph data as JSON file with enhanced animation
  const handleExport = () => {
    setIsExporting(true);
    controls.start(
      optimizeTransition(
        {
          scale: [1, 1.05, 1],
          transition: { duration: 0.3 },
        },
        animPrefs
      )
    );

    try {
      // Include username, repository and branch in the exported JSON
      const jsonData = stringifyGraphData(graphs, username, repository, branch);
      const filename = `arcadia-pattern-${new Date()
        .toISOString()
        .slice(0, 10)}.json`;
      download(jsonData, filename, "application/json");
      toast.success("Pattern exported successfully!", {
        icon: "💾",
        style: {
          border: "1px solid var(--color-primary)",
          padding: "12px",
        },
      });
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export pattern");
    } finally {
      setTimeout(() => setIsExporting(false), 300);
    }
  };
  // Import graph data from JSON file with progress visualization
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsImporting(true);
    setImportProgress(0);
    const file = event.target.files?.[0];
    if (!file) {
      setIsImporting(false);
      return;
    }

    // Start progress animation
    const progressInterval = setInterval(() => {
      setImportProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 10;
      });
    }, 100);

    const reader = new FileReader();
    reader.onload = (e) => {
      clearInterval(progressInterval);
      setImportProgress(100);

      try {
        const jsonData = e.target?.result as string;
        const parsed = parseGraphData(jsonData);

        // Update graphs state with parsed data
        setGraphs(parsed.graphs);

        // Extract and update metadata if available
        if (parsed.metadata) {
          if (parsed.metadata.username) {
            setUsername(parsed.metadata.username);
          }

          if (parsed.metadata.repository) {
            setRepository(parsed.metadata.repository);
          }

          if (parsed.metadata.branch) {
            setBranch(parsed.metadata.branch || "main");
          }
        }

        // Enhanced visual feedback
        toast.success("Pattern imported successfully!", {
          icon: "🎨",
          duration: 3000,
          style: {
            border: "1px solid var(--color-primary)",
            padding: "16px",
          },
        });
      } catch (error) {
        console.error("Import failed:", error);
        toast.error("Failed to import pattern: Invalid file format");
      } finally {
        setTimeout(() => {
          setIsImporting(false);
          // Reset progress after animation completes
          setTimeout(() => setImportProgress(0), 500);
        }, 300);
      }
    };

    reader.onerror = () => {
      clearInterval(progressInterval);
      setImportProgress(0);
      toast.error("Failed to read file");
      setIsImporting(false);
    };

    reader.readAsText(file);

    // Reset the input so the same file can be imported again if needed
    event.target.value = "";
  };

  // Save pattern to Firebase with enhanced animation
  const handleSave = async () => {
    if (!patternName.trim()) {
      toast.error("Please enter a name for your pattern");
      return;
    }

    setIsSaving(true);
    controls.start({
      scale: [1, 1.03, 1],
      transition: { duration: 0.3 },
    });

    try {
      const patternId = await saveGraphToFirestore(
        patternName.trim(),
        graphs,
        username,
        repository,
        branch
      );

      setSavedPatternId(patternId);
      const shareableUrl = `${window.location.origin}/draw/share/${patternId}`;
      setShareUrl(shareableUrl);

      toast.success("Pattern saved successfully!", {
        icon: "🚀",
        style: {
          border: "1px solid var(--color-primary)",
          padding: "12px",
        },
      });

      // Automatically show sharing options after saving
      setIsSharing(true);
      setTimeout(() => setIsSaving(false), 300);
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to save pattern");
      setTimeout(() => setIsSaving(false), 300);
    }
  };

  // Share pattern
  const handleShare = () => {
    if (!savedPatternId) {
      toast.error("Please save your pattern first");
      return;
    }

    setIsSharing(true);
    const shareableUrl = `${window.location.origin}/draw/share/${savedPatternId}`;
    setShareUrl(shareableUrl);
  };

  // Copy share URL to clipboard with animation feedback
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    toast.success("Link copied to clipboard!", {
      icon: "📋",
      style: {
        border: "1px solid var(--color-primary)",
      },
    });
  };

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <motion.div
      className="w-full mb-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-wrap gap-4 items-center">
        {/* Export Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={controls}
          onClick={handleExport}
          disabled={isExporting || Object.keys(graphs).length === 0}
          className={`flex items-center px-4 py-2 rounded-lg bg-foreground/5 border border-foreground/40 hover:bg-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer`}
          aria-label="Export pattern as JSON file"
          title="Export your pattern as a JSON file"
        >
          <IoMdDownload className="mr-2" size={20} />
          {isExporting ? (
            <span className="inline-flex items-center">
              <motion.span
                animate={{
                  opacity: [1, 0.5, 1],
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                Exporting
              </motion.span>
              <motion.span
                animate={{
                  opacity: [1, 0.5, 1],
                }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              >
                .
              </motion.span>
              <motion.span
                animate={{
                  opacity: [1, 0.5, 1],
                }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              >
                .
              </motion.span>
              <motion.span
                animate={{
                  opacity: [1, 0.5, 1],
                }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
              >
                .
              </motion.span>
            </span>
          ) : (
            "Export as JSON"
          )}
        </motion.button>{" "}
        {/* Import Button */}
        <motion.div
          className="relative"
          whileHover={!isImporting ? { scale: 1.05 } : {}}
          whileTap={!isImporting ? { scale: 0.95 } : {}}
          animate={
            isImporting
              ? {
                  scale: [1, 1.02, 1],
                  transition: {
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
              : {}
          }
        >
          <label htmlFor="file-upload" className="sr-only">
            Import JSON file
          </label>
          <input
            type="file"
            id="file-upload"
            accept=".json"
            onChange={handleImport}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
            title="Import pattern from JSON file"
            aria-label="Import pattern from JSON file"
            disabled={isImporting}
          />
          <div
            className={`flex items-center px-4 py-2 rounded-lg bg-foreground/5 border border-foreground/40 hover:bg-foreground/10 ${
              isImporting ? "opacity-75 cursor-not-allowed" : "cursor-pointer"
            } transition-all duration-200 relative z-0`}
          >
            <motion.div
              animate={
                isImporting
                  ? {
                      rotate: [0, 360],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      },
                    }
                  : {}
              }
            >
              <IoMdCloudUpload className="mr-2" size={20} />
            </motion.div>
            {isImporting ? (
              <span className="inline-flex items-center">
                <motion.span
                  animate={{
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  Importing
                </motion.span>
                <motion.span
                  animate={{
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                >
                  .
                </motion.span>
                <motion.span
                  animate={{
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                >
                  .
                </motion.span>
                <motion.span
                  animate={{
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
                >
                  .
                </motion.span>
              </span>
            ) : (
              "Import from JSON"
            )}
          </div>

          {/* Import progress indicator */}
          <AnimatePresence>
            {importProgress > 0 && (
              <motion.div
                className="absolute left-0 bottom-0 h-1.5 bg-primary rounded-full z-5"
                initial={{ width: 0 }}
                animate={{ width: `${importProgress}%` }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>
        </motion.div>
        {/* Save Button */}
        <div className="flex items-center border border-foreground/40 rounded-lg overflow-hidden">
          <label htmlFor="pattern-name" className="sr-only">
            Pattern name
          </label>
          <input
            id="pattern-name"
            type="text"
            value={patternName}
            onChange={(e) => setPatternName(e.target.value)}
            placeholder="Pattern name"
            className="flex-1 px-3 py-2 border-none outline-none bg-transparent focus:ring-0"
            aria-label="Pattern name for saving online"
          />
          <motion.button
            animate={controls}
            onClick={handleSave}
            disabled={
              isSaving ||
              !patternName.trim() ||
              Object.keys(graphs).length === 0
            }
            className={`flex items-center px-4 py-2 bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200`}
            aria-label={isSaving ? "Saving pattern..." : "Save pattern online"}
            title="Save your pattern online to share it"
          >
            <RiSave3Line className="mr-2" size={20} />
            {isSaving ? (
              <span className="inline-flex items-center">
                <motion.span
                  animate={{
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  Saving
                </motion.span>
                <motion.span
                  animate={{
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                >
                  .
                </motion.span>
                <motion.span
                  animate={{
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                >
                  .
                </motion.span>
                <motion.span
                  animate={{
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
                >
                  .
                </motion.span>
              </span>
            ) : (
              "Save Online"
            )}
          </motion.button>
        </div>
        {/* Share Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          disabled={!savedPatternId}
          className={`flex items-center px-4 py-2 rounded-lg bg-foreground/5 border border-foreground/40 hover:bg-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200`}
          aria-label="Share your pattern"
          title={
            savedPatternId
              ? "Share your pattern with others"
              : "Save your pattern first to share it"
          }
        >
          <IoMdShare className="mr-2" size={20} />
          Share
        </motion.button>
      </div>

      {/* Share Dialog with AnimatePresence for smooth transitions */}
      <AnimatePresence>
        {isSharing && shareUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-4 p-4 rounded-lg border border-foreground/20 bg-foreground/5 overflow-hidden"
          >
            <motion.h3
              className="text-lg font-semibold mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              custom={0}
              variants={itemVariants}
            >
              Share your Arcadia pattern
            </motion.h3>
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              custom={1}
              variants={itemVariants}
            >
              <label htmlFor="share-url" className="sr-only">
                Share URL
              </label>
              <input
                id="share-url"
                type="text"
                value={shareUrl}
                readOnly
                className="flex-grow border-[1.5] border-foreground/40 rounded-lg px-3 py-2 bg-background focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                aria-label="Shareable link for your pattern"
                title="Shareable link for your pattern"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all duration-200 flex items-center"
                aria-label="Copy link to clipboard"
                title="Copy link to clipboard"
              >
                {isCopied ? (
                  <>
                    <FiCheck className="mr-2" size={18} />
                    Copied!
                  </>
                ) : (
                  <>
                    <FiCopy className="mr-2" size={18} />
                    Copy Link
                  </>
                )}
              </motion.button>
            </motion.div>
            <motion.div
              className="mt-2 text-sm text-foreground/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              custom={2}
              variants={itemVariants}
            >
              Anyone with this link can view and import your pattern.
            </motion.div>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => setIsSharing(false)}
              className="mt-2 text-sm text-foreground/60 hover:text-foreground transition-colors duration-200"
              aria-label="Close sharing dialog"
            >
              Close
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
