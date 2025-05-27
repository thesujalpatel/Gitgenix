import React, { useCallback, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Cell } from "../types/cell";
import { AiOutlineDelete } from "react-icons/ai";
import { getAnimationVariant } from "../../utils/animationManager";
import {
  getAnimationPreferences,
  optimizeTransition,
  AnimationPreferences,
} from "../../utils/performanceUtils";
import styles from "./ContributionGraph.module.css";

interface ContributionGraphProps {
  year: string;
  graph: {
    cells: Cell[];
    yearStart: Date;
    yearEnd: Date;
    monthLabels: Record<number, number>; // key: monthIndex (0–11), value: column index
  };
  today: Date;
  weekLabels: string[];
  monthNames: string[];
  updateCellIntensity: (year: string, index: number) => void;
  clearYearGraph: (year: string) => void;
  isDragging: React.MutableRefObject<boolean>;
}

export default function ContributionGraph({
  year,
  graph,
  today,
  weekLabels,
  monthNames,
  updateCellIntensity,
  clearYearGraph,
  isDragging,
}: ContributionGraphProps) {
  // Default preferences for SSR consistency
  const [animPrefs, setAnimPrefs] = useState<AnimationPreferences>({
    reduceMotion: true,
    isLowEndDevice: true,
    preferSimpleAnimations: true,
  });

  // Initialize animation preferences after mount to avoid hydration mismatch
  useEffect(() => {
    setAnimPrefs(getAnimationPreferences());
  }, []);

  const isCurrentYear = year === "current";
  const runningMonthIndex = isCurrentYear ? graph.yearStart.getMonth() : 0;
  const currentCellRef = useRef<string | null>(null);
  // Use centralized animation system
  const cellVariant = getAnimationVariant("cell");

  // Optimized transitions based on device capabilities
  const containerTransition = optimizeTransition(
    {
      duration: 0.3,
      ease: "easeOut",
      type: "tween",
    },
    animPrefs
  );

  const cellTransition = optimizeTransition(
    {
      duration: 0.1,
      ease: "easeOut",
      type: "tween",
    },
    animPrefs
  );

  let monthLabelOrder: number[] = [];
  if (isCurrentYear) {
    for (let i = 0; i <= 12; i++) {
      monthLabelOrder.push((runningMonthIndex + i) % 12);
    }
  } else {
    monthLabelOrder = Array.from({ length: 12 }, (_, i) => i);
  }
  const weeksCount = Math.ceil(graph.cells.length / 7);
  const numMonths = monthLabelOrder.length;
  const spacing = weeksCount / numMonths;

  const monthLabelPositions = monthLabelOrder.map(
    (_, i) => Math.round(spacing * i) + 2
  );
  // Optimized cell update with throttling to prevent excessive rerenders
  const handleCellUpdate = useCallback(
    (cellKey: string, index: number) => {
      if (currentCellRef.current === cellKey) return;
      currentCellRef.current = cellKey;
      updateCellIntensity(year, index);
    },
    [year, updateCellIntensity]
  );

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
    currentCellRef.current = null;
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    currentCellRef.current = null;
  }, [isDragging]);

  // Optimized mouse enter with debouncing for smooth dragging
  const handleMouseEnter = useCallback(
    (cellKey: string, index: number, isBlurred: boolean) => {
      if (isDragging.current && !isBlurred) {
        handleCellUpdate(cellKey, index);
      }
    },
    [handleCellUpdate, isDragging]
  );
  // Optimized transitions based on device capabilities

  return (
    <motion.div
      className="select-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={containerTransition}
    >
      <header className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">
          {isCurrentYear
            ? `Last year - 
                ${graph.yearStart.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })} to ${today.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })} 
            `
            : `Year - ${year}`}
        </h2>{" "}
        <motion.button
          type="button"
          onClick={() => clearYearGraph(year)}
          className="px-2 py-1 text-sm text-white bg-error/70 border border-error/90 rounded-md cursor-pointer flex items-center justify-center"
          title={`Clear all contributions for ${year}`}
          whileHover={!animPrefs.preferSimpleAnimations ? { scale: 1.05 } : {}}
          whileTap={{ scale: 0.95 }}
          transition={cellTransition}
        >
          <AiOutlineDelete className="inline-block mr-1" size={18} />
          Clear
        </motion.button>
      </header>
      <section
        className="mb-10 max-w-full overflow-auto"
        aria-label={`Contribution graph for ${
          isCurrentYear ? "Current Year" : year
        }`}
      >
        <div className="border-[1.5] border-foreground/10 w-fit rounded-md p-2 pb-2">
          {" "}
          {/* Month labels row */}
          <div className="grid grid-cols-[max-content_repeat(53,17)] gap-0.5 select-none mb-1">
            {" "}
            <div className="w-10" /> {/* Empty spacer for weekday labels */}
            {monthLabelOrder.map((monthIndex, i) => (
              <div
                key={`month-label-${i}`}
                className={`text-xs text-foreground/80 ${styles.monthLabel} ${styles.monthLabelDynamic}`}
                data-grid-col={monthLabelPositions[i]}
                style={
                  {
                    "--grid-col": monthLabelPositions[i],
                  } as React.CSSProperties
                }
              >
                {monthNames[monthIndex]}
              </div>
            ))}
          </div>
          {/* Contribution grid with weekday labels */}{" "}
          <div
            className={`grid grid-cols-[max-content_repeat(53,17)] gap-0.5 cursor-crosshair ${
              animPrefs.preferSimpleAnimations
                ? styles.contributionGrid
                : styles.contributionGridAnimated
            }`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {" "}
            {/* Weekday labels (left) */}{" "}
            {weekLabels.map((day, i) => (
              <div
                key={day}
                className={`text-xs text-foreground/80 pr-1 ${styles.weekdayLabel} ${styles.weekdayLabelDynamic}`}
                style={
                  {
                    "--grid-row": i + 2,
                    "--grid-col": 1,
                  } as React.CSSProperties
                }
              >
                {i % 2 === 0 ? day : ""}
              </div>
            ))}
            {/* Contribution cells */}
            {graph.cells.map((cell, index) => {
              const col = Math.floor(index / 7) + 2; // +2 due to weekday labels
              const row = (index % 7) + 2;
              const colorClass = `cell-intensity-${cell.intensity}`;
              const isFuture = cell.date > today;
              const isBlurred = cell.isOutOfRange || isFuture;
              const cellKey = `${year}-${index}`;

              return (
                <motion.div
                  key={cell.date.toISOString()}
                  title={`${cell.date.toISOString().slice(0, 10)}, intensity ${
                    cell.intensity
                  }`}
                  className={`w-4 h-4 rounded-sm ${colorClass} ${
                    styles.cellDynamic
                  } ${
                    isBlurred
                      ? "opacity-30 cursor-not-allowed"
                      : animPrefs.preferSimpleAnimations
                      ? styles.contributionCell
                      : `${styles.contributionCellAnimated} ${styles.contributionCellHover}`
                  }`}
                  style={
                    {
                      "--grid-col": col,
                      "--grid-row": row,
                    } as React.CSSProperties
                  }
                  variants={cellVariant}
                  onClick={() => !isBlurred && handleCellUpdate(cellKey, index)}
                  onMouseEnter={() =>
                    handleMouseEnter(cellKey, index, isBlurred)
                  }
                  whileHover={
                    !isBlurred && !animPrefs.preferSimpleAnimations
                      ? { scale: 1.1 }
                      : {}
                  }
                  transition={cellTransition}
                />
              );
            })}
          </div>
          <div className="text-xs text-foreground/60 mt-2 ml-10">
            {" "}
            {isCurrentYear ? `Last 12 Months` : year}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
