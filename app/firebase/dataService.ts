// Firebase data service for Gitgenix
import { db } from './config';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import type { Cell } from '../draw/types/cell';
import { incrementPatternCreated, incrementPatternSaved, incrementJsonExported } from '../utils/statsService';

export interface GitgenixGraphData {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  graphs: Record<string, { 
    cells: Cell[];
    yearStart: string; // ISO string as Firestore doesn't handle Date objects directly
    yearEnd: string;
    monthLabels: Record<number, number>;
  }>;
  username: string;
  repository: string;
  branch: string;
  minContributions?: number;
  maxContributions?: number;
}

export interface GitgenixMetadata {
  username: string;
  repository: string;
  branch: string;
  exportDate: string;
  version: string;
  appName?: string;
  creator?: string;
  minContributions?: number;
  maxContributions?: number;
}

// Helper to convert dates for serialization
export function prepareGraphsForSerialization(
  graphs: Record<
    string,
    {
      cells: Cell[];
      yearStart: Date;
      yearEnd: Date;
      monthLabels: Record<number, number>;
    }
  >
): Record<
  string, 
  {
    cells: {
      date: string;
      intensity: number;
      isOutOfRange: boolean;
    }[];
    yearStart: string;
    yearEnd: string;
    monthLabels: Record<number, number>;
  }
> {
  return Object.fromEntries(
    Object.entries(graphs).map(([year, graph]) => [
      year,
      {
        ...graph,
        cells: graph.cells.map(cell => ({
          ...cell,
          date: cell.date.toISOString()
        })),
        yearStart: graph.yearStart.toISOString(),
        yearEnd: graph.yearEnd.toISOString()
      }
    ])
  );
}

// Helper to restore dates from serialized format
export function restoreGraphsFromSerialized(
  serializedGraphs: Record<
    string, 
    {
      cells: {
        date: string;
        intensity: number;
        isOutOfRange: boolean;
      }[];
      yearStart: string;
      yearEnd: string;
      monthLabels: Record<number, number>;
    }
  >
): Record<
  string,
  {
    cells: Cell[];
    yearStart: Date;
    yearEnd: Date;
    monthLabels: Record<number, number>;
  }
> {
  return Object.fromEntries(
    Object.entries(serializedGraphs).map(([year, graph]) => [
      year,
      {
        ...graph,
        cells: graph.cells.map(cell => ({
          ...cell,
          date: new Date(cell.date)
        })),
        yearStart: new Date(graph.yearStart),
        yearEnd: new Date(graph.yearEnd)
      }
    ])
  );
}

// Save graph data to Firestore
export async function saveGraphToFirestore(
  name: string,
  graphs: Record<
    string,
    {
      cells: Cell[];
      yearStart: Date;
      yearEnd: Date;
      monthLabels: Record<number, number>;
    }
  >,
  username: string,
  repository: string,
  branch: string,
  minContributions?: number,
  maxContributions?: number
): Promise<string> {
  const graphId = nanoid(10); // Generate a short, unique ID
  const timestamp = Date.now();

  const serializedGraphs = prepareGraphsForSerialization(graphs);
  const graphData: GitgenixGraphData = {
    id: graphId,
    name,
    createdAt: timestamp,
    updatedAt: timestamp,
    graphs: serializedGraphs as any, // Type assertion as we've already converted the dates
    username,
    repository,
    branch,
    minContributions,
    maxContributions
  };
  const graphsCollection = collection(db, 'gitgenix-graphs');
  await setDoc(doc(graphsCollection, graphId), graphData);
  
  // Track this pattern creation in stats
  await incrementPatternCreated();
  await incrementPatternSaved();
  
  return graphId;
}

// Fetch graph data from Firestore by ID
export async function getGraphFromFirestore(id: string): Promise<GitgenixGraphData | null> {
  const graphDoc = doc(db, 'gitgenix-graphs', id);
  const docSnap = await getDoc(graphDoc);
  
  if (docSnap.exists()) {
    const data = docSnap.data() as GitgenixGraphData;
    return data;
  }
  
  return null;
}

// Convert JSON string to object with proper date handling
export function parseGraphData(jsonString: string): {
  graphs: Record<
    string,
    {
      cells: Cell[];
      yearStart: Date;
      yearEnd: Date;
      monthLabels: Record<number, number>;
    }
  >;
  metadata?: GitgenixMetadata;
} {
  try {
    const parsed = JSON.parse(jsonString);
    
    // Handle different format variations
    if (parsed.graphs) {
      // New format with metadata
      return {
        graphs: restoreGraphsFromSerialized(parsed.graphs),
        metadata: validateAndNormalizeMetadata(parsed.metadata)
      };
    } else if (parsed.data && parsed.data.graphs) {
      // Alternative format with nested data
      return {
        graphs: restoreGraphsFromSerialized(parsed.data.graphs),
        metadata: validateAndNormalizeMetadata(parsed.data.metadata || parsed.metadata)
      };
    } else {
      // Legacy format (just the graphs object)
      return {
        graphs: restoreGraphsFromSerialized(parsed)
      };
    }
  } catch (error) {
    console.error('Failed to parse graph data:', error);
    throw new Error('Invalid JSON format');
  }
}

// Validate and normalize metadata to ensure consistent structure
function validateAndNormalizeMetadata(metadata: any): GitgenixMetadata {
  if (!metadata) {    return {
      username: '',
      repository: '',
      branch: 'main',
      exportDate: new Date().toISOString(),
      version: '1.0',
      appName: 'Gitgenix',
      minContributions: 1,
      maxContributions: 10
    };
  }
  
  return {
    username: metadata.username || '',
    repository: metadata.repository || '',
    branch: metadata.branch || 'main',
    exportDate: metadata.exportDate || new Date().toISOString(),
    version: metadata.version || '1.0',
    appName: metadata.appName || 'Gitgenix',
    creator: metadata.creator || undefined,
    minContributions: metadata.minContributions || 1,
    maxContributions: metadata.maxContributions || 10
  };
}

// Convert graph data to JSON string with enhanced metadata
export function stringifyGraphData(
  graphs: Record<
    string,
    {
      cells: Cell[];
      yearStart: Date;
      yearEnd: Date;
      monthLabels: Record<number, number>;
    }
  >,
  username?: string,
  repository?: string,
  branch?: string,
  minContributions?: number,
  maxContributions?: number
): string {
  const exportData = {
    graphs: prepareGraphsForSerialization(graphs),    metadata: {
      username: username || '',
      repository: repository || '',
      branch: branch || 'main',
      exportDate: new Date().toISOString(),
      version: '1.0',
      appName: 'Gitgenix',
      minContributions: minContributions || 1,
      maxContributions: maxContributions || 10
    }
  };
    // Track JSON export and pattern creation in stats
  Promise.all([
    incrementJsonExported().catch(err => console.error("Error tracking JSON export:", err)),
    incrementPatternCreated().catch(err => console.error("Error tracking pattern creation:", err))
  ]);
  
  return JSON.stringify(exportData, null, 2); // Pretty print with 2 spaces indentation
}


