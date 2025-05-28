"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import Link from "next/link";
import { getGraphFromFirestore } from "../../../firebase/dataService";
import type { GitgenixGraphData } from "../../../firebase/dataService";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { RiErrorWarningFill } from "react-icons/ri";

// This component wrapper handles the params correctly in client components
export default function SharePageWrapper({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [resolvedParams, setResolvedParams] = React.useState<{
    id: string;
  } | null>(null);

  React.useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  if (!resolvedParams) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <motion.div
          className="text-xl font-semibold"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return <SharePage id={resolvedParams.id} />;
}

// Separate the main component logic
function SharePage({ id }: { id: string }) {
  const patternId = id;

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [graphData, setGraphData] = useState<GitgenixGraphData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const data = await getGraphFromFirestore(patternId);
        if (data) {
          setGraphData(data);
        } else {
          setError(
            "Pattern not found. It may have been deleted or the URL is incorrect."
          );
        }
      } catch (err) {
        console.error("Error fetching graph:", err);
        setError("Failed to load the shared pattern. Please try again later.");
      } finally {
        setTimeout(() => setLoading(false), 300); // Small delay for smoother transitions
      }
    };

    fetchGraphData();
  }, [patternId]);
  const handleImportPattern = () => {
    if (!graphData) return;

    setImporting(true);

    // Store the graph data in localStorage for the main draw page to load
    setTimeout(() => {
      try {
        // Ensure we're properly serializing the graphs data
        const importData = {
          graphs: graphData.graphs,
          username: graphData.username || "",
          repository: graphData.repository || "",
          branch: graphData.branch || "main",
        };

        // Use sessionStorage as an alternative if localStorage fails
        try {
          localStorage.setItem(
            "gitgenix-import-data",
            JSON.stringify(importData)
          );
        } catch (storageError) {
          console.warn(
            "localStorage failed, using sessionStorage instead:",
            storageError
          );
          sessionStorage.setItem(
            "gitgenix-import-data",
            JSON.stringify(importData)
          );
        }

        setImportSuccess(true);
        toast.success("Pattern ready to import!", {
          icon: <IoIosCheckmarkCircle />,
          style: {
            border: "1px solid var(--color-primary)",
            padding: "12px",
          },
        });

        // Navigate to the draw page after animation completes
        setTimeout(() => {
          // Use window.location for a full page navigation as a fallback
          try {
            router.push("/draw");
          } catch (navError) {
            console.warn(
              "Router navigation failed, using direct navigation:",
              navError
            );
            window.location.href = "/draw";
          }
        }, 1500);
      } catch (error) {
        console.error("Import error:", error);
        toast.error("Failed to import pattern. Please try again.");
        setImporting(false);
      }
    }, 800);
  }; // Animation variants with direct values
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Import button animation variants
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    },
    tap: { scale: 0.95 },
    importing: {
      scale: [1, 1.03, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
      },
    },
  };
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-foreground/60"
        >
          Loading shared pattern
        </motion.p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        {" "}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            type: "spring" as const,
          }}
          className="text-xl font-semibold text-error flex items-center"
        >
          <RiErrorWarningFill className="mr-2 text-2xl" />
          {error}
        </motion.div>{" "}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.5,
            type: "spring",
            stiffness: 100,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/draw")}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary/90 transition-all duration-200"
        >
          Create your own pattern
        </motion.button>
      </div>
    );
  }

  if (!graphData) return null;
  return (
    <motion.div
      className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[100vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-b from-foreground/5 to-foreground/10 backdrop-blur-sm border border-foreground/20 rounded-2xl p-8 shadow-xl overflow-hidden max-w-4xl w-full"
      >
        <motion.div
          className="flex items-center mb-6 border-b border-foreground/10 pb-4"
          variants={itemVariants}
        >
          <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M12 2l9 4.9V17L12 22l-9-4.9V7z" />
              <path d="M12 16L7 13" />
              <path d="M17 13l-5 3" />
              <path d="M12 8v8" />
            </svg>
          </div>
          <motion.h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            {graphData.name}
          </motion.h1>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={itemVariants}
        >
          <motion.div
            variants={itemVariants}
            className="bg-foreground/5 p-6 rounded-xl border border-foreground/10 shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 text-primary"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l2 2" />
              </svg>
              Pattern Details
            </h2>
            <motion.div className="space-y-4" variants={containerVariants}>
              <motion.div variants={itemVariants} className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-foreground/50">Created</div>
                  <div className="font-medium">
                    {new Date(graphData.createdAt).toLocaleDateString(
                      undefined,
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-foreground/50">Repository</div>
                  <div className="font-medium">
                    {graphData.username}/{graphData.repository}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <line x1="6" y1="3" x2="6" y2="15" />
                    <circle cx="18" cy="6" r="3" />
                    <circle cx="6" cy="18" r="3" />
                    <path d="M18 9a9 9 0 0 1-9 9" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-foreground/50">Branch</div>
                  <div className="font-medium">{graphData.branch}</div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M7 8h.01" />
                    <path d="M12 8h.01" />
                    <path d="M17 8h.01" />
                    <path d="M7 12h.01" />
                    <path d="M12 12h.01" />
                    <path d="M17 12h.01" />
                    <path d="M7 16h.01" />
                    <path d="M12 16h.01" />
                    <path d="M17 16h.01" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-foreground/50">Years</div>
                  <div className="font-medium">
                    {Object.keys(graphData.graphs).join(", ")}
                  </div>
                </div>
              </motion.div>

              {graphData.minContributions !== undefined &&
                graphData.maxContributions !== undefined && (
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M2 12h20" />
                        <path d="M10 16v-4a2 2 0 0 1 4 0v4" />
                        <path d="M18 16V8" />
                        <path d="M6 16v-4" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-foreground/50">
                        Contribution Limits
                      </div>
                      <div className="font-medium">
                        Min: {graphData.minContributions} / Max:{" "}
                        {graphData.maxContributions}
                      </div>
                    </div>
                  </motion.div>
                )}
            </motion.div>
          </motion.div>

          <motion.div
            className="bg-foreground/5 p-6 rounded-xl border border-foreground/10 shadow-sm flex flex-col justify-center items-center relative overflow-hidden"
            variants={itemVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/20 opacity-30"></div>
            <div className="relative z-10 w-full">
              <h2 className="text-xl font-semibold mb-6 text-center flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 text-primary"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Import Pattern
              </h2>

              <AnimatePresence mode="wait">
                {!importing ? (
                  <motion.button
                    key="import-button"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleImportPattern}
                    className="w-full px-6 py-4 bg-primary text-white rounded-xl font-semibold text-lg shadow-lg button-premium transition-all duration-300"
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                  >
                    <span className="flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      Import This Pattern
                    </span>
                  </motion.button>
                ) : importSuccess ? (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full px-6 py-4 bg-green-500 text-white rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center"
                  >
                    <IoIosCheckmarkCircle className="mr-2 text-2xl" />
                    Imported Successfully!
                  </motion.div>
                ) : (
                  <motion.button
                    key="importing-button"
                    variants={buttonVariants}
                    animate="importing"
                    className="w-full px-6 py-4 bg-primary text-white rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center"
                    disabled
                  >
                    <motion.span
                      animate={{
                        opacity: [1, 0.6, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                      className="flex items-center justify-center"
                    >
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Importing...
                    </motion.span>
                  </motion.button>
                )}
              </AnimatePresence>

              <div className="mt-6 text-center">
                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-center bg-foreground/10 rounded-lg p-3 mb-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary mr-2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p className="text-sm text-foreground/80">
                    This pattern will be imported into your Gitgenix workspace
                  </p>
                </motion.div>

                <Link
                  href="/draw"
                  className="text-sm text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                >
                  ← Back to Designer
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
