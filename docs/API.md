# API Documentation

## Overview

Gitgenix provides several APIs for creating, sharing, and managing GitHub contribution art patterns.

## Core APIs

### Graph Data Service

#### `saveGraphToFirestore(data: GitgenixGraphData): Promise<string>`

Saves a graph pattern to Firestore and returns a unique pattern ID.

**Parameters:**

- `data`: GitgenixGraphData object containing pattern information

**Returns:**

- Promise resolving to pattern ID string

**Example:**

```typescript
const patternId = await saveGraphToFirestore({
  name: "My Pattern",
  graphs: graphsData,
  username: "myusername",
  repository: "myrepo",
  branch: "main",
});
```

#### `getGraphFromFirestore(id: string): Promise<GitgenixGraphData>`

Retrieves a graph pattern from Firestore by ID.

**Parameters:**

- `id`: Pattern ID string

**Returns:**

- Promise resolving to GitgenixGraphData object

**Example:**

```typescript
const pattern = await getGraphFromFirestore("pattern123");
```

### Data Serialization

#### `stringifyGraphData(data: any): string`

Converts graph data to JSON string with proper serialization of Date objects.

#### `parseGraphData(jsonString: string): any`

Parses JSON string back to graph data with Date object restoration.

### Shell Script Generation

#### `generateShellScript(options: ScriptOptions): string`

Generates a shell script to recreate the contribution pattern.

**Parameters:**

```typescript
interface ScriptOptions {
  graphs: Record<string, GraphData>;
  username: string;
  repository: string;
  branch: string;
}
```

**Returns:**

- Shell script string

### Performance Utilities

#### `getAnimationPreferences(): AnimationPreferences`

Detects device capabilities and returns optimized animation settings.

#### `optimizeTransition(transition: any, preferences?: AnimationPreferences): any`

Optimizes Framer Motion transitions for performance.

#### `createMotionVariants(variants: Record<string, any>, preferences?: AnimationPreferences): any`

Creates performance-optimized motion variants.

## Data Types

### Cell

```typescript
interface Cell {
  date: Date;
  intensity: number; // 0-4
  isOutOfRange?: boolean;
}
```

### GraphData

```typescript
interface GraphData {
  cells: Cell[];
  yearStart: Date;
  yearEnd: Date;
  monthLabels: Record<number, number>;
}
```

### GitgenixGraphData

```typescript
interface GitgenixGraphData {
  name: string;
  graphs: Record<string, GraphData>;
  username: string;
  repository: string;
  branch: string;
  createdAt: string;
}
```

## Error Handling

All API functions include proper error handling:

- Network errors are caught and logged
- Invalid data returns meaningful error messages
- Firestore errors include retry logic
- Rate limiting is handled gracefully

## Rate Limits

- Pattern saves: 10 per minute per user
- Pattern loads: 100 per minute per user
- File exports: 20 per minute per user

## Best Practices

1. **Performance**: Use `getAnimationPreferences()` to optimize animations
2. **Data Validation**: Always validate input data before API calls
3. **Error Handling**: Implement proper try-catch blocks
4. **Caching**: Cache frequently accessed patterns locally
5. **Memory Management**: Clean up large graph data when not needed

## Examples

### Creating a Simple Pattern

```typescript
import { generateCells } from "./utils/graphHelpers";

// Generate cells for current year
const cells = generateCells(new Date(), new Date());

// Set some cells to active
cells[100].intensity = 3;
cells[150].intensity = 4;

const graphData = {
  cells,
  yearStart: new Date(),
  yearEnd: new Date(),
  monthLabels: computeMonthLabels(new Date()),
};
```

### Sharing a Pattern

```typescript
const patternData = {
  name: "Heart Pattern",
  graphs: { current: graphData },
  username: "johndoe",
  repository: "contributions",
  branch: "main",
};

const patternId = await saveGraphToFirestore(patternData);
const shareUrl = `${window.location.origin}/draw/share/${patternId}`;
```

### Performance Optimization

```typescript
import {
  getAnimationPreferences,
  optimizeTransition,
} from "./utils/performanceUtils";

const animPrefs = getAnimationPreferences();

const transition = optimizeTransition(
  {
    duration: 0.5,
    type: "spring",
  },
  animPrefs
);

// Use optimized transition in Framer Motion components
<motion.div transition={transition}>Content</motion.div>;
```
