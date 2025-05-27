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
  AnimationPreferences,
} from "../utils/performanceUtils";
import OnboardingTour from "../components/OnboardingTour";
import { useOnboarding } from "../hooks/useOnboarding";
import { MdDraw } from "react-icons/md";

export default function GitgenixGraph() {
  // Initialize performance preferences after mount to avoid hydration mismatch
  const [animPrefs, setAnimPrefs] = useState<AnimationPreferences>({
    reduceMotion: false,
    isLowEndDevice: false,
    preferSimpleAnimations: false,
  });
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
  // Initialize animation preferences after mount to avoid hydration mismatch
  useEffect(() => {
    setAnimPrefs(getAnimationPreferences());
  }, []);

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

          // Only apply minimal cross-year copying for initial setup
          // Our toggleYear function handles the smart logic
          const hasImportedData =
            Object.keys(prev).length > 0 &&
            Object.values(prev).some((graph) =>
              graph.cells.some((cell) => cell.intensity > 0)
            );

          // Only copy data if this is the very first graph creation and no import
          if (!hasImportedData && Object.keys(prev).length === 0) {
            // This is the initial state - do nothing special
            // Let the user start fresh or import data
          } else if (hasImportedData) {
            // We have imported data - try to restore from any available data
            const allAvailableData = new Map<number, number>();

            Object.values(prev).forEach((graph) => {
              graph.cells.forEach((cell) => {
                const key = cell.date.getTime();
                if (cell.intensity > 0 && !cell.isOutOfRange) {
                  const currentIntensity = allAvailableData.get(key) || 0;
                  if (cell.intensity > currentIntensity) {
                    allAvailableData.set(key, cell.intensity);
                  }
                }
              });
            });

            // Apply available data to new cells
            for (let i = 0; i < newCells.length; i++) {
              const dateKey = newCells[i].date.getTime();
              if (allAvailableData.has(dateKey) && !newCells[i].isOutOfRange) {
                newCells[i].intensity = allAvailableData.get(dateKey)!;
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

      // Clean up years that are no longer selected
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
  const toggleYear = useCallback(
    (year: string) => {
      setSelectedYears((prev) => {
        const isCurrentlySelected = prev.includes(year);

        if (isCurrentlySelected) {
          // Removing year - check for duplicate cells logic
          const newSelectedYears = prev.filter((y) => y !== year);

          // Schedule state cleanup after year removal
          setTimeout(() => {
            setGraphs((currentGraphs) => {
              const updatedGraphs = { ...currentGraphs };
              const graphToRemove = updatedGraphs[year];

              if (graphToRemove) {
                // Get all filled cells from the year being removed
                const removedYearCells = graphToRemove.cells.filter(
                  (cell) => cell.intensity > 0 && !cell.isOutOfRange
                );

                // Check if these cells exist in other active years
                const remainingYears = newSelectedYears.filter(
                  (y) => updatedGraphs[y]
                );
                const duplicateCells = new Set<number>();

                // Find which cells have duplicates in remaining active years
                for (const cell of removedYearCells) {
                  const cellDate = cell.date.getTime();
                  for (const remainingYear of remainingYears) {
                    const remainingGraph = updatedGraphs[remainingYear];
                    if (remainingGraph) {
                      const hasDuplicate = remainingGraph.cells.some(
                        (c) =>
                          c.date.getTime() === cellDate &&
                          c.intensity > 0 &&
                          !c.isOutOfRange
                      );
                      if (hasDuplicate) {
                        duplicateCells.add(cellDate);
                        break;
                      }
                    }
                  }
                }

                // Clear cells that don't have duplicates from ALL graphs
                const cellsToClear = removedYearCells
                  .filter((cell) => !duplicateCells.has(cell.date.getTime()))
                  .map((cell) => cell.date.getTime());

                if (cellsToClear.length > 0) {
                  // Clear these cells from all graphs
                  Object.keys(updatedGraphs).forEach((graphYear) => {
                    const graph = updatedGraphs[graphYear];
                    if (graph) {
                      updatedGraphs[graphYear] = {
                        ...graph,
                        cells: graph.cells.map((cell) => {
                          if (
                            cellsToClear.includes(cell.date.getTime()) &&
                            !cell.isOutOfRange
                          ) {
                            return { ...cell, intensity: 0 };
                          }
                          return cell;
                        }),
                      };
                    }
                  });

                  toast.success(
                    `Cleared ${cellsToClear.length} unique patterns from year ${year}`,
                    {
                      icon: "🗑️",
                      duration: 3000,
                    }
                  );
                } else {
                  toast.success(
                    `Year ${year} hidden - all patterns preserved in other active years`,
                    {
                      icon: "👁️",
                      duration: 3000,
                    }
                  );
                }

                // Remove the year's graph from state
                delete updatedGraphs[year];
              }

              return updatedGraphs;
            });
          }, 50);

          return newSelectedYears;
        } else {
          // Adding year - fill from existing state data
          const newSelectedYears = [...prev, year];

          // Schedule filling from existing state after year addition
          setTimeout(() => {
            setGraphs((currentGraphs) => {
              const updatedGraphs = { ...currentGraphs };

              if (!updatedGraphs[year]) {
                const { cells, yearStart, yearEnd } = generateCells(
                  year,
                  today
                );
                const monthLabels = computeMonthLabels(cells);
                const newCells = [...cells];

                // Fill from existing state data (all graphs, not just active ones)
                const allAvailableYears = Object.keys(currentGraphs);
                const mergedMap = new Map<number, number>();

                // Collect all filled cells from any existing year data
                for (const availableYear of allAvailableYears) {
                  const availableCells =
                    currentGraphs[availableYear]?.cells || [];
                  for (const cell of availableCells) {
                    const key = cell.date.getTime();
                    if (cell.intensity > 0 && !cell.isOutOfRange) {
                      const currentIntensity = mergedMap.get(key) || 0;
                      if (cell.intensity > currentIntensity) {
                        mergedMap.set(key, cell.intensity);
                      }
                    }
                  }
                }

                let filledCount = 0;
                // Apply merged data to new year cells
                for (let i = 0; i < newCells.length; i++) {
                  const dateKey = newCells[i].date.getTime();
                  if (mergedMap.has(dateKey) && !newCells[i].isOutOfRange) {
                    newCells[i].intensity = mergedMap.get(dateKey)!;
                    filledCount++;
                  }
                }

                updatedGraphs[year] = {
                  cells: newCells,
                  yearStart,
                  yearEnd,
                  monthLabels,
                };

                if (filledCount > 0) {
                  toast.success(
                    `Year ${year} restored with ${filledCount} patterns from saved data`,
                    {
                      icon: "🎨",
                      duration: 3000,
                    }
                  );
                }
              }

              return updatedGraphs;
            });
          }, 50);

          return newSelectedYears;
        }
      });
    },
    [today]
  );
  const clearYearGraph = useCallback((year: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            <span className="font-medium">Clear year {year}?</span>
          </div>
          <p className="text-sm text-foreground/60">
            This will clear all contributions for year {year}. This action
            cannot be undone.
          </p>
          <div className="flex gap-2 justify-end">
            <button
              className="px-3 py-1 text-sm rounded bg-foreground/10 hover:bg-foreground/15 transition-colors cursor-pointer"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer"
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
      transition: optimizeTransition({
        type: "spring",
        stiffness: 100,
        damping: 15,
      }),
    },
    exit: {
      opacity: 0,
      y: animPrefs.preferSimpleAnimations ? -15 : -30,
      scale: animPrefs.preferSimpleAnimations ? 0.98 : 0.95,
      transition: optimizeTransition({ duration: 0.2 }),
    },
  };
  // --- Render ---
  return (
    <main className="p-6 pt-25 max-w-6xl mx-auto">
      <motion.h1
        className="text-4xl font-bold mb-4 flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={optimizeTransition({ duration: 0.5 })}
      >
        <MdDraw className="inline mr-2 text-primary" />
        <div className="bg-gradient-to-r from-foreground to-foreground/30 bg-clip-text text-transparent">
          Draw your Art
        </div>
      </motion.h1>
      <motion.p
        className="text-foreground/50 mb-12 w-full align-center text-center text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={optimizeTransition({ duration: 0.5, delay: 0.2 })}
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
      />
      <DataIO
        graphs={graphs}
        setGraphs={setGraphs}
        username={username}
        repository={repository}
        branch={branch}
        setUsername={setUsername}
        setRepository={setRepository}
        setBranch={setBranch}
      />
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
            className="text-foreground/40 mb-6 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BiSelectMultiple className="inline-block mr-2" size={18} />
            <span className="font-bold mr-[0.4ch]">Select years </span> to
            generate contribution graphs. Please select one or more years to
            show graphs.
          </motion.p>
        )}
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
      </AnimatePresence>
      {/* Onboarding Tour */}
      <OnboardingTour
        isVisible={showGuided}
        onClose={completeGuidedTour}
        variant="guided"
      />
    </main>
  );
}
