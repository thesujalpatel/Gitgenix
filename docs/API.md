# 📚 Gitgenix API Documentation

This document provides comprehensive API documentation for Gitgenix, including TypeScript interfaces, data structures, and utility functions.

## Table of Contents

- [Core Data Types](#core-data-types)
- [Firebase API](#firebase-api)
- [Graph Utilities](#graph-utilities)
- [Shell Script Generation](#shell-script-generation)
- [Animation & Performance](#animation--performance)
- [Date Utilities](#date-utilities)
- [Constants](#constants)

---

## Core Data Types

### Cell Interface

Represents a single cell in the contribution graph.

```typescript
interface Cell {
  /** The date this cell represents */
  date: Date;

  /** Contribution intensity level (0-4) */
  intensity: number;

  /** Whether this cell is outside the target year range */
  isOutOfRange: boolean;
}
```

### GraphData Interface

Represents the complete data for a single year's contribution graph.

```typescript
interface GraphData {
  /** Array of all cells in the graph */
  cells: Cell[];

  /** Start date of the year */
  yearStart: Date;

  /** End date of the year */
  yearEnd: Date;

  /** Mapping of month numbers to their positions */
  monthLabels: Record<number, number>;
}
```

### GitgenixMetadata Interface

Metadata associated with exported patterns.

```typescript
interface GitgenixMetadata {
  /** GitHub username */
  username: string;

  /** Repository name */
  repository: string;

  /** Target branch */
  branch: string;

  /** Export timestamp */
  exportDate: string;

  /** App version */
  version: string;

  /** Optional app name identifier */
  appName?: string;

  /** Optional pattern creator */
  creator?: string;
}
```

### PatternData Interface

Complete pattern data structure for export/import.

```typescript
interface PatternData {
  gitgenix: {
    /** App version */
    version: string;

    /** Pattern metadata */
    metadata: GitgenixMetadata;

    /** Array of graph data for each year */
    graphs: GraphData[];
  };
}
```

### FirestorePattern Interface

Pattern data structure stored in Firebase.

```typescript
interface FirestorePattern {
  /** Pattern name/title */
  name: string;

  /** GitHub username */
  username: string;

  /** Repository name */
  repository: string;

  /** Target branch */
  branch: string;

  /** Graph data */
  graphs: GraphData[];

  /** Creation timestamp */
  createdAt: Timestamp;

  /** Last updated timestamp */
  updatedAt: Timestamp;
}
```

---

## Firebase API

### Data Service Functions

#### saveGraphToFirestore

Saves a pattern to Firebase Firestore.

```typescript
async function saveGraphToFirestore(data: {
  name: string;
  graphs: GraphData[];
  username: string;
  repository: string;
  branch: string;
}): Promise<string>;
```

**Parameters:**

- `data.name` - Pattern name
- `data.graphs` - Array of graph data
- `data.username` - GitHub username
- `data.repository` - Repository name
- `data.branch` - Target branch

**Returns:**

- `Promise<string>` - Document ID of the saved pattern

**Example:**

```typescript
try {
  const patternId = await saveGraphToFirestore({
    name: "My Cool Pattern",
    graphs: graphsData,
    username: "johndoe",
    repository: "my-repo",
    branch: "main",
  });
  console.log(`Pattern saved with ID: ${patternId}`);
} catch (error) {
  console.error("Failed to save pattern:", error);
}
```

#### getGraphFromFirestore

Retrieves a pattern from Firebase Firestore.

```typescript
async function getGraphFromFirestore(
  id: string
): Promise<FirestorePattern | null>;
```

**Parameters:**

- `id` - Document ID of the pattern

**Returns:**

- `Promise<FirestorePattern | null>` - Pattern data or null if not found

**Example:**

```typescript
try {
  const pattern = await getGraphFromFirestore("pattern123");
  if (pattern) {
    console.log(`Loaded pattern: ${pattern.name}`);
    // Use pattern.graphs for the graph data
  } else {
    console.log("Pattern not found");
  }
} catch (error) {
  console.error("Failed to load pattern:", error);
}
```

### Error Handling

Firebase operations may throw errors. Always wrap in try-catch blocks:

```typescript
// Common error scenarios
try {
  await saveGraphToFirestore(data);
} catch (error) {
  if (error.code === "permission-denied") {
    // Handle permission errors
  } else if (error.code === "network-error") {
    // Handle network errors
  } else {
    // Handle other errors
  }
}
```

---

## Graph Utilities

### Data Serialization

#### stringifyGraphData

Converts graph data to JSON string for export.

```typescript
function stringifyGraphData(
  graphs: GraphData[],
  username: string,
  repository: string,
  branch: string
): string;
```

**Parameters:**

- `graphs` - Array of graph data
- `username` - GitHub username
- `repository` - Repository name
- `branch` - Target branch

**Returns:**

- `string` - JSON string representation

**Example:**

```typescript
const jsonString = stringifyGraphData(graphsData, "johndoe", "my-repo", "main");

// Save to file or share
const blob = new Blob([jsonString], { type: "application/json" });
```

#### parseGraphData

Parses JSON string back to graph data and metadata.

```typescript
function parseGraphData(jsonString: string): {
  graphs: GraphData[];
  metadata: GitgenixMetadata;
};
```

**Parameters:**

- `jsonString` - JSON string to parse

**Returns:**

- Object with `graphs` and `metadata` properties

**Throws:**

- `Error` - If JSON is invalid or missing required fields

**Example:**

```typescript
try {
  const { graphs, metadata } = parseGraphData(jsonString);
  console.log(`Loaded pattern for ${metadata.username}/${metadata.repository}`);
  // Use graphs data...
} catch (error) {
  console.error("Invalid pattern file:", error.message);
}
```

### Graph Manipulation

#### createEmptyGraph

Creates an empty graph for a given year.

```typescript
function createEmptyGraph(year: number): GraphData;
```

**Parameters:**

- `year` - Target year (e.g., 2024)

**Returns:**

- `GraphData` - Empty graph with all cells at intensity 0

#### getCellByDate

Finds a cell by its date within a graph.

```typescript
function getCellByDate(graph: GraphData, date: Date): Cell | undefined;
```

**Parameters:**

- `graph` - Graph data to search
- `date` - Target date

**Returns:**

- `Cell | undefined` - Found cell or undefined

#### updateCellIntensity

Updates the intensity of a specific cell.

```typescript
function updateCellIntensity(
  graph: GraphData,
  date: Date,
  intensity: number
): GraphData;
```

**Parameters:**

- `graph` - Graph data to update
- `date` - Target date
- `intensity` - New intensity (0-4)

**Returns:**

- `GraphData` - Updated graph data (immutable)

---

## Shell Script Generation

### generateShellScript

Generates a shell script for creating Git commits.

```typescript
function generateShellScript(params: {
  graphs: GraphData[];
  username: string;
  repository: string;
  branch: string;
}): string;
```

**Parameters:**

- `graphs` - Array of graph data
- `username` - GitHub username
- `repository` - Repository name
- `branch` - Target branch

**Returns:**

- `string` - Shell script content

**Example:**

```typescript
const script = generateShellScript({
  graphs: patternData,
  username: "johndoe",
  repository: "my-art-repo",
  branch: "main",
});

// Download script
const blob = new Blob([script], { type: "text/plain" });
const url = URL.createObjectURL(blob);
// Trigger download...
```

### Script Structure

The generated script includes:

1. **Setup Commands**: Repository validation and setup
2. **Commit Generation**: Individual commits for each day
3. **Cleanup**: Final repository state

Example generated script:

```bash
#!/bin/bash
# Gitgenix Generated Script
# Pattern for johndoe/my-art-repo

echo "Starting Gitgenix pattern application..."

# Validate repository
if [ ! -d ".git" ]; then
    echo "Error: Not a git repository"
    exit 1
fi

# Generate commits for each day
git commit --allow-empty --date="2024-01-01T12:00:00" -m "Gitgenix: Day 1 (10 commits)"
# ... more commits ...

echo "Pattern application complete!"
echo "Run 'git push origin main' to apply to GitHub"
```

### Platform Support

The script generator supports multiple platforms:

- **Windows**: PowerShell (.ps1) format
- **macOS/Linux**: Bash (.sh) format
- **Cross-platform**: Universal commands when possible

---

## Animation & Performance

### Performance Utilities

#### getAnimationPreferences

Detects user animation preferences.

```typescript
function getAnimationPreferences(): {
  preferSimpleAnimations: boolean;
  shouldReduceMotion: boolean;
};
```

**Returns:**

- Object with animation preference flags

**Example:**

```typescript
const animPrefs = getAnimationPreferences();

// Use in components
const motionProps = animPrefs.preferSimpleAnimations
  ? {}
  : { animate: { scale: 1.05 }, transition: { duration: 0.3 } };

<motion.div {...motionProps}>Content</motion.div>;
```

#### shouldUseSimpleAnimations

Simplified check for animation preferences.

```typescript
function shouldUseSimpleAnimations(): boolean;
```

**Returns:**

- `boolean` - True if simple animations should be used

### Animation Manager

#### AnimationPresets

Pre-defined animation configurations.

```typescript
const AnimationPresets = {
  gentle: {
    transition: { duration: 0.3, ease: "easeOut" },
  },

  energetic: {
    transition: { duration: 0.2, ease: "easeInOut" },
  },

  accessible: {
    transition: { duration: 0 }, // No animation
  },
};
```

#### Usage with Framer Motion

```typescript
import { motion } from "framer-motion";
import {
  getAnimationPreferences,
  AnimationPresets,
} from "../utils/animationManager";

const MyComponent = () => {
  const animPrefs = getAnimationPreferences();
  const preset = animPrefs.preferSimpleAnimations
    ? AnimationPresets.accessible
    : AnimationPresets.gentle;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} {...preset}>
      Content
    </motion.div>
  );
};
```

---

## Date Utilities

### Date Helper Functions

#### isValidDate

Validates if a value is a valid Date object.

```typescript
function isValidDate(date: any): date is Date;
```

**Parameters:**

- `date` - Value to check

**Returns:**

- `boolean` - True if valid Date

#### formatDateForGit

Formats a date for Git commit commands.

```typescript
function formatDateForGit(date: Date): string;
```

**Parameters:**

- `date` - Date to format

**Returns:**

- `string` - Git-compatible date string

**Example:**

```typescript
const gitDate = formatDateForGit(new Date("2024-01-01"));
// Returns: "2024-01-01T12:00:00"
```

#### getWeekNumber

Gets the week number for a given date within a year.

```typescript
function getWeekNumber(date: Date): number;
```

**Parameters:**

- `date` - Target date

**Returns:**

- `number` - Week number (0-53)

#### getDaysInYear

Gets the total number of days in a year.

```typescript
function getDaysInYear(year: number): number;
```

**Parameters:**

- `year` - Target year

**Returns:**

- `number` - Number of days (365 or 366)

---

## Constants

### Application Constants

```typescript
// Intensity levels
export const INTENSITY_LEVELS = {
  NONE: 0,
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  MAXIMUM: 4,
} as const;

// Commit counts per intensity level
export const COMMITS_PER_INTENSITY = {
  [INTENSITY_LEVELS.NONE]: 0,
  [INTENSITY_LEVELS.LOW]: 10,
  [INTENSITY_LEVELS.MEDIUM]: 20,
  [INTENSITY_LEVELS.HIGH]: 30,
  [INTENSITY_LEVELS.MAXIMUM]: 40,
} as const;

// Color classes for intensity levels
export const INTENSITY_COLORS = {
  [INTENSITY_LEVELS.NONE]: "bg-gray-100 dark:bg-gray-800",
  [INTENSITY_LEVELS.LOW]: "bg-green-200 dark:bg-green-900",
  [INTENSITY_LEVELS.MEDIUM]: "bg-green-400 dark:bg-green-700",
  [INTENSITY_LEVELS.HIGH]: "bg-green-600 dark:bg-green-500",
  [INTENSITY_LEVELS.MAXIMUM]: "bg-green-800 dark:bg-green-300",
} as const;

// Grid dimensions
export const GRID_CONFIG = {
  WEEKS_IN_YEAR: 53,
  DAYS_IN_WEEK: 7,
  CELL_SIZE: 12,
  CELL_GAP: 2,
} as const;

// File export settings
export const EXPORT_CONFIG = {
  FILE_PREFIX: "gitgenix-pattern",
  FILE_EXTENSION: ".json",
  MIME_TYPE: "application/json",
} as const;
```

### Type Guards

```typescript
// Type guard for intensity levels
function isValidIntensity(value: any): value is IntensityLevel {
  return (
    typeof value === "number" &&
    value >= INTENSITY_LEVELS.NONE &&
    value <= INTENSITY_LEVELS.MAXIMUM
  );
}

// Type guard for graph data
function isValidGraphData(value: any): value is GraphData {
  return (
    value &&
    Array.isArray(value.cells) &&
    value.yearStart instanceof Date &&
    value.yearEnd instanceof Date &&
    typeof value.monthLabels === "object"
  );
}
```

---

## Error Handling

### Custom Error Types

```typescript
// Base error class
class GitgenixError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = "GitgenixError";
  }
}

// Specific error types
class InvalidPatternError extends GitgenixError {
  constructor(message: string) {
    super(message, "INVALID_PATTERN");
  }
}

class FirebaseError extends GitgenixError {
  constructor(message: string) {
    super(message, "FIREBASE_ERROR");
  }
}

class ValidationError extends GitgenixError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR");
  }
}
```

### Error Handling Patterns

```typescript
// Async function with error handling
async function safeFirebaseOperation<T>(
  operation: () => Promise<T>
): Promise<{ data?: T; error?: Error }> {
  try {
    const data = await operation();
    return { data };
  } catch (error) {
    return { error: error as Error };
  }
}

// Usage
const { data, error } = await safeFirebaseOperation(() =>
  saveGraphToFirestore(patternData)
);

if (error) {
  console.error("Operation failed:", error.message);
} else {
  console.log("Pattern saved:", data);
}
```

---

## Usage Examples

### Complete Pattern Creation Workflow

```typescript
import {
  createEmptyGraph,
  updateCellIntensity,
  stringifyGraphData,
  generateShellScript,
  saveGraphToFirestore,
} from "../utils";

// 1. Create empty graphs for multiple years
const years = [2023, 2024];
let graphs = years.map((year) => createEmptyGraph(year));

// 2. Update specific cells to create a pattern
graphs[0] = updateCellIntensity(graphs[0], new Date("2023-06-15"), 4);
graphs[0] = updateCellIntensity(graphs[0], new Date("2023-06-16"), 4);
// ... more updates ...

// 3. Export as JSON
const jsonData = stringifyGraphData(graphs, "username", "repository", "main");

// 4. Generate shell script
const script = generateShellScript({
  graphs,
  username: "username",
  repository: "repository",
  branch: "main",
});

// 5. Save to cloud (optional)
try {
  const patternId = await saveGraphToFirestore({
    name: "My Pattern",
    graphs,
    username: "username",
    repository: "repository",
    branch: "main",
  });
  console.log("Pattern saved with ID:", patternId);
} catch (error) {
  console.error("Failed to save:", error);
}
```

### Component Integration

```typescript
import { memo, useState } from "react";
import { motion } from "framer-motion";
import { getAnimationPreferences } from "../utils/performanceUtils";
import { INTENSITY_COLORS } from "../utils/constants";

interface CellProps {
  cell: Cell;
  onUpdate: (date: Date, intensity: number) => void;
  selectedIntensity: number;
}

export const ContributionCell = memo(
  ({ cell, onUpdate, selectedIntensity }: CellProps) => {
    const animPrefs = getAnimationPreferences();

    const handleClick = () => {
      onUpdate(cell.date, selectedIntensity);
    };

    return (
      <motion.button
        className={`
        w-3 h-3 rounded-sm transition-colors
        ${INTENSITY_COLORS[cell.intensity]}
        ${cell.isOutOfRange ? "opacity-30" : ""}
        hover:ring-2 hover:ring-blue-500
        focus:outline-none focus:ring-2 focus:ring-blue-500
      `}
        onClick={handleClick}
        whileHover={!animPrefs.preferSimpleAnimations ? { scale: 1.2 } : {}}
        whileTap={!animPrefs.preferSimpleAnimations ? { scale: 0.9 } : {}}
        aria-label={`Set ${cell.date.toDateString()} to intensity ${selectedIntensity}`}
      />
    );
  }
);

ContributionCell.displayName = "ContributionCell";
```

---

This API documentation provides comprehensive coverage of all Gitgenix APIs and utilities. For implementation examples and detailed usage, refer to the source code in the respective utility files.
