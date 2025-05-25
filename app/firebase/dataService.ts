// Firebase data service for Gitgenix
import { db } from './config';
import { collection, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import type { Cell } from '../draw/types/cell';

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
}

export interface GitgenixMetadata {
  username: string;
  repository: string;
  branch: string;
  exportDate: string;
  version: string;
  appName?: string;
  creator?: string;
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
  branch: string
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
    branch
  };

  const graphsCollection = collection(db, 'arcadia-graphs');
  await setDoc(doc(graphsCollection, graphId), graphData);
  
  return graphId;
}

// Fetch graph data from Firestore by ID
export async function getGraphFromFirestore(id: string): Promise<GitgenixGraphData | null> {
  const graphDoc = doc(db, 'arcadia-graphs', id);
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
      appName: 'Gitgenix'
    };
  }
  
  return {
    username: metadata.username || '',
    repository: metadata.repository || '',
    branch: metadata.branch || 'main',
    exportDate: metadata.exportDate || new Date().toISOString(),
    version: metadata.version || '1.0',
    appName: metadata.appName || 'Gitgenix',
    creator: metadata.creator || undefined
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
  branch?: string
): string {
  const exportData = {
    graphs: prepareGraphsForSerialization(graphs),    metadata: {
      username: username || '',
      repository: repository || '',
      branch: branch || 'main',
      exportDate: new Date().toISOString(),
      version: '1.0',
      appName: 'Gitgenix'
    }
  };
  return JSON.stringify(exportData, null, 2); // Pretty print with 2 spaces indentation
}

// Search for patterns by username, repository or pattern name
export async function searchPatterns(searchTerm: string): Promise<GitgenixGraphData[]> {
  if (!searchTerm || searchTerm.length < 2) {
    return [];
  }
  
  const graphsCollection = collection(db, 'arcadia-graphs');
  
  // Search by name (case-insensitive contains)
  const nameQuery = query(
    graphsCollection, 
    where('name', '>=', searchTerm),
    where('name', '<=', searchTerm + '\uf8ff')
  );
  
  // Search by username (case-insensitive contains)
  const usernameQuery = query(
    graphsCollection, 
    where('username', '>=', searchTerm),
    where('username', '<=', searchTerm + '\uf8ff')
  );
  
  const nameSnapshots = await getDocs(nameQuery);
  const usernameSnapshots = await getDocs(usernameQuery);
  
  const results: GitgenixGraphData[] = [];
  
  // Combine results, avoiding duplicates
  const processedIds = new Set<string>();
    nameSnapshots.forEach(doc => {
    const data = doc.data() as GitgenixGraphData;
    processedIds.add(data.id);
    results.push(data);
  });
  
  usernameSnapshots.forEach(doc => {
    const data = doc.data() as GitgenixGraphData;
    if (!processedIds.has(data.id)) {
      results.push(data);
    }
  });
  
  // Sort by most recent
  return results.sort((a, b) => b.updatedAt - a.updatedAt);
}
