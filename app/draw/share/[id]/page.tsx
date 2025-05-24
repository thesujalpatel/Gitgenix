"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import {
  getGraphFromFirestore,
  restoreGraphsFromSerialized,
} from "../../../firebase/dataService";
import type { ArcadiaGraphData } from "../../../firebase/dataService";
import type { Cell } from "../../types/cell";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { RiErrorWarningFill } from "react-icons/ri";

export default function SharePage({ params }: { params: { id: string } }) {
  const patternId = params.id;

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [graphData, setGraphData] = useState<ArcadiaGraphData | null>(null);
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
        localStorage.setItem(
          "arcadia-import-data",
          JSON.stringify({
            graphs: graphData.graphs,
            username: graphData.username || "",
            repository: graphData.repository || "",
            branch: graphData.branch || "main",
          })
        );

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
          router.push("/draw");
        }, 1500);
      } catch (error) {
        console.error("Import error:", error);
        toast.error("Failed to import pattern. Please try again.");
        setImporting(false);
      }
    }, 800);
  };

  // Animation variants
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
    visible: { opacity: 1, y: 0 },
  };

  // Loading animation variants
  const loadingCircleVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  const loadingTextVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        yoyo: Infinity,
        repeatDelay: 0.5,
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-xl font-semibold flex flex-col items-center"
        >
          <motion.svg
            width="60"
            height="60"
            viewBox="0 0 50 50"
            className="mb-4"
          >
            <motion.circle
              cx="25"
              cy="25"
              r="20"
              stroke="var(--color-primary)"
              strokeWidth="4"
              fill="transparent"
              variants={loadingCircleVariants}
              initial="hidden"
              animate="visible"
            />
          </motion.svg>

          <motion.div
            className="flex items-center"
            variants={loadingTextVariants}
            initial="hidden"
            animate="visible"
          >
            Loading shared pattern
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
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-xl font-semibold text-error flex items-center"
        >
          <RiErrorWarningFill className="mr-2 text-2xl" />
          {error}
        </motion.div>
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
      className="container mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-foreground/5 border border-foreground/20 rounded-lg p-6 shadow-lg overflow-hidden"
      >
        <motion.h1 className="text-2xl font-bold mb-4" variants={itemVariants}>
          {graphData.name}
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={itemVariants}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-xl font-semibold mb-2">Pattern Details</h2>
            <motion.div className="space-y-2" variants={containerVariants}>
              <motion.p variants={itemVariants} className="mb-1">
                <span className="font-medium">Created:</span>{" "}
                {new Date(graphData.createdAt).toLocaleDateString()}
              </motion.p>
              <motion.p variants={itemVariants} className="mb-1">
                <span className="font-medium">Repository:</span>{" "}
                {graphData.username}/{graphData.repository}
              </motion.p>
              <motion.p variants={itemVariants} className="mb-1">
                <span className="font-medium">Branch:</span> {graphData.branch}
              </motion.p>
              <motion.p variants={itemVariants} className="mb-4">
                <span className="font-medium">Years:</span>{" "}
                {Object.keys(graphData.graphs).join(", ")}
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-col justify-center items-center"
            variants={itemVariants}
          >
            <AnimatePresence mode="wait">
              {!importing ? (
                <motion.button
                  key="import-button"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleImportPattern}
                  className="w-full max-w-xs px-6 py-3 bg-primary text-white rounded-lg font-semibold text-lg shadow-md transition-all duration-200"
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                >
                  Import This Pattern
                </motion.button>
              ) : importSuccess ? (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-xs px-6 py-3 bg-green-500 text-white rounded-lg font-semibold text-lg shadow-md flex items-center justify-center"
                >
                  <IoIosCheckmarkCircle className="mr-2 text-2xl" />
                  Imported Successfully!
                </motion.div>
              ) : (
                <motion.button
                  key="importing-button"
                  variants={buttonVariants}
                  animate="importing"
                  className="w-full max-w-xs px-6 py-3 bg-primary text-white rounded-lg font-semibold text-lg shadow-md flex items-center justify-center"
                  disabled
                >
                  <motion.span
                    animate={{
                      opacity: [1, 0.6, 1],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Importing...
                  </motion.span>
                </motion.button>
              )}
            </AnimatePresence>

            <motion.p
              variants={itemVariants}
              className="mt-2 text-sm text-foreground/60"
            >
              This pattern will be imported into your Arcadia dashboard
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
