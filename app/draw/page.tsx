"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import YearSelector from "./components/YearSelector";
import UserInputs from "./components/UserInputs";
import Toolbar from "./components/Toolbar";
import ContributionGraph from "./components/ContributionGraph";
import DataIO from "./components/DataIO";
import { BiSelectMultiple } from "react-icons/bi";
import { generateCells, computeMonthLabels } from "./utils/graphHelpers";
import { generateShellScript } from "./utils/shellScriptGenerator";
import { getYear } from "date-fns";
import download from "downloadjs";
import type { Cell } from "./types/cell";
import { weekLabels, monthNames } from "./utils/constants";
import { motion, AnimatePresence } from "framer-motion";
import { parseGraphData } from "../firebase/dataService";
import { toast } from "react-hot-toast";
import {
  getAnimationPreferences,
  optimizeTransition,
} from "../utils/performanceUtils";
import OnboardingTour from "../components/OnboardingTour";
import { useOnboarding } from "../hooks/useOnboarding";

export default function GitgenixGraph() {
  // Initialize performance preferences early
  const [animPrefs] = useState(() => getAnimationPreferences());
  // Initialize onboarding
  const { showGuided, completeGuidedTour } = useOnboarding();

  // --- State ---
  const today = useMemo(
    () =>
      new Date(
        Date.UTC(
          new Date().getUTCFullYear(),
          new Date().getUTCMonth(),
          new Date().getUTCDate()
        )
      ),
    []
  );
  const [selectedYears, setSelectedYears] = useState<string[]>(["current"]);
  const [username, setUsername] = useState("");
  const [repository, setRepository] = useState("");
  const [branch, setBranch] = useState("main");
  const [graphs, setGraphs] = useState<
    Record<
      string,
      {
        cells: Cell[];
        yearStart: Date;
        yearEnd: Date;
        monthLabels: Record<number, number>;
      }
    >
  >({});
  const [selectedIntensity, setSelectedIntensity] = useState(3);
  const isDragging = useRef(false);
  const [isImportProcessed, setIsImportProcessed] = useState(false);

  // --- Effects ---
  // Process imported data from localStorage FIRST
  useEffect(() => {
    const importData = localStorage.getItem("gitgenix-import-data");
    if (importData) {
      try {
        const parsedData = JSON.parse(importData);

        // Process the graphs data to restore Date objects and preserve filled cells
        if (parsedData.graphs) {
          // First check if we need to parse the graphs as JSON string
          let graphsToProcess = parsedData.graphs;
          if (typeof parsedData.graphs === "string") {
            graphsToProcess = JSON.parse(parsedData.graphs);
          }

          const restoredData = parseGraphData(
            JSON.stringify({ graphs: graphsToProcess })
          );

          // Ensure the imported graphs maintain their filled cells
          setGraphs(restoredData.graphs);

          // Update other state values
          if (parsedData.username) setUsername(parsedData.username);
          if (parsedData.repository) setRepository(parsedData.repository);
          if (parsedData.branch) setBranch(parsedData.branch);

          // Update selected years based on the imported graphs
          setSelectedYears(Object.keys(restoredData.graphs));

          // Show success with filled cell count
          const totalFilledCells = Object.values(restoredData.graphs).reduce(
            (total, graph) =>
              total +
              graph.cells.filter(
                (cell) => cell.intensity > 0 && !cell.isOutOfRange
              ).length,
            0
          );

          toast.success(
            `Pattern imported successfully! ${totalFilledCells} filled cells restored.`,
            {
              icon: "🎨",
              duration: 4000,
              style: {
                border: "1px solid var(--color-primary)",
                padding: "16px",
              },
            }
          );
        }

        // Clear the import data from localStorage
        localStorage.removeItem("gitgenix-import-data");
        setIsImportProcessed(true);
      } catch (error) {
        console.error("Failed to process imported data:", error);
        toast.error("Failed to import pattern. Please check the file format.");
        setIsImportProcessed(true);
      }
    } else {
      setIsImportProcessed(true);
    }
  }, []);

  // Generate graphs for selected years ONLY after import is processed
  useEffect(() => {
    if (!isImportProcessed) return; // Wait for import to complete

    setGraphs((prev) => {
      const newGraphs = { ...prev };
      let changed = false;
      selectedYears.forEach((year) => {
        if (!newGraphs[year]) {
          const { cells, yearStart, yearEnd } = generateCells(year, today);
          const monthLabels = computeMonthLabels(cells);
          const newCells = [...cells];

          // Only apply cross-year copying if this is NOT from an import
          // (imported graphs already have their filled cells preserved)
          const hasImportedData =
            Object.keys(prev).length > 0 &&
            Object.values(prev).some((graph) =>
              graph.cells.some((cell) => cell.intensity > 0)
            );

          if (!hasImportedData) {
            // Copy from CURRENT into past year
            if (year !== "current" && prev["current"]) {
              const currentMap = new Map(
                prev["current"].cells.map((c) => [
                  c.date.getTime(),
                  c.intensity,
                ])
              );
              for (let i = 0; i < newCells.length; i++) {
                const dateKey = newCells[i].date.getTime();
                if (currentMap.has(dateKey)) {
                  newCells[i].intensity = currentMap.get(dateKey)!;
                }
              }
            }
            // Copy from past years into CURRENT
            if (year === "current") {
              const pastYears = Object.keys(prev).filter(
                (y) => y !== "current"
              );
              const mergedMap = new Map<number, number>();
              for (const pastYear of pastYears) {
                const pastCells = prev[pastYear]?.cells || [];
                for (const cell of pastCells) {
                  const key = cell.date.getTime();
                  if (
                    !mergedMap.has(key) ||
                    mergedMap.get(key)! < cell.intensity
                  ) {
                    mergedMap.set(key, cell.intensity);
                  }
                }
              }
              for (let i = 0; i < newCells.length; i++) {
                const dateKey = newCells[i].date.getTime();
                if (mergedMap.has(dateKey)) {
                  newCells[i].intensity = mergedMap.get(dateKey)!;
                }
              }
            }
          }
          newGraphs[year] = {
            cells: newCells,
            yearStart,
            yearEnd,
            monthLabels,
          };
          changed = true;
        }
      });
      Object.keys(newGraphs).forEach((year) => {
        if (!selectedYears.includes(year)) {
          delete newGraphs[year];
          changed = true;
        }
      });

      return changed ? newGraphs : prev;
    });
  }, [selectedYears, today, isImportProcessed]);

  // --- Handlers ---
  const updateCellIntensity = useCallback(
    (targetYear: string, cellIndex: number) => {
      setGraphs((prevGraphs) => {
        const targetCell = prevGraphs[targetYear]?.cells[cellIndex];
        if (
          !targetCell ||
          targetCell.isOutOfRange ||
          targetCell.intensity === selectedIntensity
        )
          return prevGraphs;
        const updatedGraphs: typeof prevGraphs = {};
        for (const [year, graph] of Object.entries(prevGraphs)) {
          const updatedCells = graph.cells.map((cell) => {
            if (
              cell.date.getTime() === targetCell.date.getTime() &&
              !cell.isOutOfRange
            ) {
              return { ...cell, intensity: selectedIntensity };
            }
            return cell;
          });
          updatedGraphs[year] = { ...graph, cells: updatedCells };
        }
        return updatedGraphs;
      });
    },
    [selectedIntensity]
  );

  const toggleYear = useCallback((year: string) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  }, []);
  const clearYearGraph = useCallback((year: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            <span className="font-medium">Clear year {year}?</span>
          </div>
          <p className="text-sm text-gray-600">
            This will clear all contributions for year {year}. This action
            cannot be undone.
          </p>
          <div className="flex gap-2 justify-end">
            <button
              className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 transition-colors"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
              onClick={() => {
                toast.dismiss(t.id);
                setGraphs((prev) => {
                  const graphToClear = prev[year];
                  if (!graphToClear) return prev;
                  const datesToClear = new Set(
                    graphToClear.cells
                      .filter((c) => !c.isOutOfRange)
                      .map((c) => c.date.getTime())
                  );
                  const updatedGraphs = Object.fromEntries(
                    Object.entries(prev).map(([gYear, gData]) => {
                      const updatedCells = gData.cells.map((cell) => {
                        if (
                          datesToClear.has(cell.date.getTime()) &&
                          !cell.isOutOfRange
                        ) {
                          return { ...cell, intensity: 0 };
                        }
                        return cell;
                      });
                      return [gYear, { ...gData, cells: updatedCells }];
                    })
                  );
                  return updatedGraphs;
                });
                toast.success(`Year ${year} cleared successfully!`, {
                  icon: "🗑️",
                  style: {
                    border: "1px solid var(--color-primary)",
                    padding: "12px",
                  },
                });
              }}
            >
              Clear Year
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        style: {
          maxWidth: "400px",
          padding: "16px",
        },
      }
    );
  }, []);

  const clearAllGraphs = useCallback(() => {
    setGraphs((prev) => {
      const updatedGraphs = Object.fromEntries(
        Object.entries(prev).map(([year, gData]) => {
          const updatedCells = gData.cells.map((cell) => {
            if (!cell.isOutOfRange) {
              return { ...cell, intensity: 0 };
            }
            return cell;
          });
          return [year, { ...gData, cells: updatedCells }];
        })
      );
      return updatedGraphs;
    });
  }, []);
  const handleGenerateScript = useCallback(async () => {
    if (!username || !repository || !branch) {
      toast.error(
        "Please fill in all required fields: username, repository, and branch."
      );
      return;
    }
    // Check if repository exists
    try {
      const response = await fetch(
        `https://api.github.com/repos/${username}/${repository}`
      );
      if (!response.ok) {
        toast.error(
          `Repository "${username}/${repository}" not found. Please check the username and repository name.`
        );
        return;
      }
    } catch {
      toast.error(
        "Error checking repository. Please check your internet connection and try again."
      );
      return;
    }
    const scriptContent = generateShellScript({
      graphs,
      username,
      repository,
      branch,
    });

    download(scriptContent, "gitgenix.sh", "text/plain");
  }, [graphs, username, repository, branch]);

  // --- Options ---
  const yearsOptions = [
    "current",
    ...Array.from({ length: 30 }, (_, i) => `${getYear(today) - i}`),
  ]; // Check if form is complete
  const isFormComplete = Boolean(username && repository && branch);
  // --- Animation Variants with Performance Optimization ---
  const graphVariants = {
    hidden: {
      opacity: 0,
      y: animPrefs.preferSimpleAnimations ? 15 : 30,
      scale: animPrefs.preferSimpleAnimations ? 0.98 : 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: optimizeTransition(
        {
          type: "spring",
          stiffness: 100,
          damping: 15,
        },
        animPrefs
      ),
    },
    exit: {
      opacity: 0,
      y: animPrefs.preferSimpleAnimations ? -15 : -30,
      scale: animPrefs.preferSimpleAnimations ? 0.98 : 0.95,
      transition: optimizeTransition({ duration: 0.2 }, animPrefs),
    },
  };

  // --- Render ---
  return (
    <main className="p-6 max-w-full pt-25">
      {" "}
      <motion.h1
        className="text-4xl font-bold mb-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={optimizeTransition({ duration: 0.5 }, animPrefs)}
      >
        Draw your Art
      </motion.h1>{" "}
      <motion.p
        className="text-gray-600 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={optimizeTransition(
          { duration: 0.5, delay: 0.2 },
          animPrefs
        )}
      >
        Unleash your creativity by painting your own GitHub contribution
        masterpiece.
      </motion.p>
      <YearSelector
        years={yearsOptions}
        selectedYears={selectedYears}
        toggleYear={toggleYear}
      />
      <UserInputs
        username={username}
        setUsername={setUsername}
        repository={repository}
        setRepository={setRepository}
        branch={branch}
        setBranch={setBranch}
      />{" "}
      <DataIO
        graphs={graphs}
        setGraphs={setGraphs}
        username={username}
        repository={repository}
        branch={branch}
        setUsername={setUsername}
        setRepository={setRepository}
        setBranch={setBranch}
      />{" "}
      <Toolbar
        selectedIntensity={selectedIntensity}
        setSelectedIntensity={setSelectedIntensity}
        onGenerateScript={handleGenerateScript}
        showGenerateScript={selectedYears.length > 0}
        isFormComplete={isFormComplete}
        onClearAll={clearAllGraphs}
      />
      <AnimatePresence>
        {selectedYears.length === 0 && (
          <motion.p
            className="text-gray-600 mb-6 flex items-center absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BiSelectMultiple className="inline-block mr-2" size={18} />
            <strong>Select years</strong> to generate contribution graphs.
            Please select one or more years to show graphs.
          </motion.p>
        )}
      </AnimatePresence>{" "}
      <AnimatePresence>
        {selectedYears.map((year) => {
          const graph = graphs[year];
          if (!graph) return null;
          return (
            <motion.div
              key={year}
              variants={graphVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              style={{ marginBottom: 32 }}
              data-onboarding="contribution-graph"
            >
              <ContributionGraph
                year={year}
                graph={graph}
                today={today}
                weekLabels={weekLabels}
                monthNames={monthNames}
                updateCellIntensity={updateCellIntensity}
                clearYearGraph={clearYearGraph}
                isDragging={isDragging}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>{" "}
      {/* Onboarding Tour */}
      <OnboardingTour
        isVisible={showGuided}
        onClose={completeGuidedTour}
        variant="guided"
      />
    </main>
  );
}
