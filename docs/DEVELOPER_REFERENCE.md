# 📚 Developer Reference

Essential API documentation and architecture overview for Gitgenix contributors.

## 🔧 Core Data Types

### Cell Interface

Represents a single cell in the contribution graph:

```typescript
interface Cell {
  date: Date; // The date this cell represents
  intensity: number; // Contribution level (0-4)
  isOutOfRange: boolean; // Outside target year range
}
```

### PatternData Interface

Structure for pattern export/import:

```typescript
interface PatternData {
  gitgenix: {
    version: string;
    metadata: GitgenixMetadata;
    graphs: GraphData[];
  };
}

interface GitgenixMetadata {
  username: string;
  repository: string;
  branch: string;
  exportDate: string;
  version: string;
}
```

---

## 🏗️ Architecture Overview

### Project Structure

```
app/
├── components/          # Shared UI components
├── draw/               # Main pattern editor
│   ├── components/     # Drawing-specific components
│   ├── utils/          # Core algorithms
│   └── types/          # TypeScript definitions
├── firebase/           # Cloud services
└── utils/              # Global utilities
```

### Key Components

- **ContributionGraph** - Main drawing canvas
- **Toolbar** - Drawing tools and controls
- **YearSelector** - Multi-year pattern support
- **DataIO** - Import/export functionality

### Data Flow

1. **User Input** → Pattern creation via click/drag
2. **State Management** → React state with local storage
3. **Processing** → Graph calculations and validations
4. **Output** → Shell script generation

---

## 🛠️ Core Utilities

### Graph Helpers

```typescript
// Create graph for specific year
function generateGraphForYear(year: number): GraphData;

// Calculate cell positions
function getCellPosition(date: Date): { row: number; col: number };

// Get contribution intensity
function getIntensityForDate(cells: Cell[], date: Date): number;
```

### Script Generation

```typescript
// Generate shell script
function generateShellScript(
  graphs: GraphData[],
  metadata: GitgenixMetadata
): string;

// Calculate commits needed
function calculateCommitsForIntensity(intensity: number): number;
```

### Animation System

```typescript
// Performance-optimized animations
function getAnimationPreferences(): AnimationPreferences;

// Conditional animation based on user preference
function applyAnimation(element: HTMLElement, animation: Animation): void;
```

---

## 🔥 Firebase Integration

### Pattern Sharing

```typescript
// Save pattern to cloud
async function savePattern(patternData: PatternData): Promise<string>;

// Load shared pattern
async function loadPattern(shareId: string): Promise<PatternData>;

// List community patterns
async function getCommunityPatterns(): Promise<PatternSummary[]>;
```

### Configuration

```typescript
// Firebase config interface
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}
```

---

## 📅 Date Utilities

### Constants

```typescript
export const GITHUB_GRAPH_WEEKS = 53;
export const DAYS_IN_WEEK = 7;
export const TOTAL_CELLS = GITHUB_GRAPH_WEEKS * DAYS_IN_WEEK;
export const CONTRIBUTION_LEVELS = [0, 1, 2, 3, 4];
```

### Helper Functions

```typescript
// Get GitHub year boundaries
function getGitHubYearBoundaries(year: number): {
  startDate: Date;
  endDate: Date;
};

// Check if date is valid for contribution
function isValidContributionDate(date: Date): boolean;

// Format date for script generation
function formatDateForScript(date: Date): string;
```

---

## ⚡ Performance Optimizations

### Animation Preferences

```typescript
interface AnimationPreferences {
  preferSimpleAnimations: boolean;
  prefersReducedMotion: boolean;
  performanceMode: "high" | "balanced" | "low";
}

// Detect user preferences
function getAnimationPreferences(): AnimationPreferences {
  return {
    preferSimpleAnimations: window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches,
    prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches,
    performanceMode: "balanced",
  };
}
```

### Component Optimization

```typescript
// Memoized expensive components
const ContributionGraph = memo(({ cells, onCellClick }) => {
  const memoizedCells = useMemo(
    () => cells.map((cell) => processCell(cell)),
    [cells]
  );

  return <GraphCanvas cells={memoizedCells} onClick={onCellClick} />;
});
```

---

## 🔒 Type Safety

### Strict TypeScript Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### Common Patterns

```typescript
// Type guards for runtime validation
function isValidCell(obj: unknown): obj is Cell {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "date" in obj &&
    "intensity" in obj &&
    "isOutOfRange" in obj
  );
}

// Generic API response handler
type ApiResponse<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };
```

---

## 🧪 Testing Patterns

### Component Testing

```typescript
// Test pattern creation
test("creates pattern with correct cell intensities", () => {
  const pattern = createPattern(mockCells);
  expect(pattern.graphs[0].cells).toHaveLength(371); // 53 weeks * 7 days
});

// Test script generation
test("generates valid shell script", () => {
  const script = generateShellScript(mockGraphs, mockMetadata);
  expect(script).toContain("#!/bin/bash");
  expect(script).toContain("git commit");
});
```

### Integration Testing

```typescript
// Test pattern export/import
test("exported pattern can be reimported", async () => {
  const original = await exportPattern(testPattern);
  const imported = await importPattern(original);
  expect(imported).toEqual(testPattern);
});
```

---

## 🚀 Contributing Guidelines

### Adding New Features

1. **Type definitions** first in `types/` directory
2. **Core logic** in appropriate `utils/` file
3. **Components** with proper TypeScript interfaces
4. **Tests** for new functionality
5. **Documentation** updates

### Code Style

```typescript
// ✅ Good - Explicit types and clear naming
interface PatternCreationProps {
  initialCells: Cell[];
  onPatternChange: (cells: Cell[]) => void;
  yearRange: [number, number];
}

// ✅ Good - Memoized expensive operations
const processedCells = useMemo(
  () =>
    cells.map((cell) => ({
      ...cell,
      displayIntensity: Math.min(cell.intensity, maxIntensity),
    })),
  [cells, maxIntensity]
);

// ❌ Avoid - Implicit any and unclear names
const handleStuff = (data: any) => {
  // Process data
};
```

### Performance Considerations

- Use `React.memo` for expensive components
- Implement `useMemo`/`useCallback` for computed values
- Consider animation preferences for accessibility
- Test with large patterns (multi-year)

---

## 📖 Further Reading

- **User Guide**: [USER_GUIDE.md](./USER_GUIDE.md) - Complete user documentation
- **Contributing**: [CONTRIBUTING.md](./CONTRIBUTING.md) - How to contribute
- **FAQ**: [FAQ.md](./FAQ.md) - Common questions and solutions
- **Development**: [DEVELOPMENT.md](./DEVELOPMENT.md) - Setup and workflow

---

_Need help with the API? Join our [GitHub Discussions](https://github.com/thesujalpatel/gitgenix/discussions) for developer support!_
