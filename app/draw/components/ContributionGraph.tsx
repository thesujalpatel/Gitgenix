import React from "react";
import type { Cell } from "../types/cell";
import { AiOutlineDelete } from "react-icons/ai";

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
  const isCurrentYear = year === "current";
  const runningMonthIndex = isCurrentYear ? graph.yearStart.getMonth() : 0;
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

  return (
    <div className="select-none">
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
        </h2>
        <button
          type="button"
          onClick={() => clearYearGraph(year)}
          className="px-2 py-1 text-sm text-white bg-error/70 border border-error/90 rounded-md cursor-pointer flex items-center justify-center"
          title={`Clear all contributions for ${year}`}
        >
          <AiOutlineDelete className="inline-block mr-1" size={18} />
          Clear
        </button>
      </header>
      <section
        className="mb-10 max-w-full overflow-auto"
        aria-label={`Contribution graph for ${
          isCurrentYear ? "Current Year" : year
        }`}
      >
        <div className="border-[1.5] border-foreground/10 w-fit rounded-md p-2 pb-2">
          {/* Month labels row */}
          <div className="grid grid-cols-[max-content_repeat(53,17)] gap-0.5 select-none mb-1">
            <div className="w-10" /> {/* Empty spacer for weekday labels */}
            {monthLabelOrder.map((monthIndex, i) => (
              <div
                key={`month-label-${i}`}
                className="text-xs text-foreground/80"
                style={{ gridColumnStart: monthLabelPositions[i] }}
              >
                {monthNames[monthIndex]}
              </div>
            ))}
          </div>

          {/* Contribution grid with weekday labels */}
          <div
            className="grid grid-cols-[max-content_repeat(53,17)] gap-0.5 cursor-crosshair"
            onMouseDown={() => (isDragging.current = true)}
            onMouseUp={() => (isDragging.current = false)}
            onMouseLeave={() => (isDragging.current = false)}
          >
            {/* Weekday labels (left) */}
            {weekLabels.map((day, i) => (
              <div
                key={day}
                className="text-xs text-foreground/80 pr-1"
                style={{ gridRowStart: i + 2, gridColumnStart: 1 }}
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

              return (
                <div
                  key={cell.date.toISOString()}
                  title={`${cell.date.toISOString().slice(0, 10)}, intensity ${
                    cell.intensity
                  }`}
                  className={`w-4 h-4 rounded-sm ${colorClass} ${
                    isBlurred ? "opacity-30 cursor-not-allowed" : ""
                  }`}
                  style={{ gridColumnStart: col, gridRowStart: row }}
                  onClick={() => !isBlurred && updateCellIntensity(year, index)}
                  onMouseEnter={() => {
                    if (isDragging.current && !isBlurred) {
                      updateCellIntensity(year, index);
                    }
                  }}
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
    </div>
  );
}
