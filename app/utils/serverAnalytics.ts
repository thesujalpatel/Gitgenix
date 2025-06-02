// Server-side only Google Analytics Data API integration
// This file should only be imported from API routes or server components

import { BetaAnalyticsDataClient } from '@google-analytics/data';

// These environment variables should NOT have NEXT_PUBLIC_ prefix
// since they're only used server-side
const GA_PROPERTY_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_PROPERTY_ID;
const GA_CREDENTIALS = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_CREDENTIALS;

/**
 * Get unique users from Google Analytics Data API
 * This should only be called from server components or API routes
 */
export async function fetchUniqueUsers(days: number = 30): Promise<number> {
  try {
    // Check if we have the required credentials
    if (!GA_PROPERTY_ID) {
      console.warn('Google Analytics Property ID not provided');
      return 0;
    }
    
    // Use credentials from environment variable
    let credentials: any;
    
    if (GA_CREDENTIALS) {
      try {
        credentials = JSON.parse(GA_CREDENTIALS);
      } catch (err) {
        console.error('Error parsing Google Analytics credentials:', err);
        return 0;
      }
    } else {
      console.warn('Google Analytics credentials not provided');
      return 0;
    }

    // Create a client
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials,
    });

    // Get the date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);
    
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];

    // Make the request
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${GA_PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
      ],
      metrics: [
        {
          name: 'totalUsers',
        },
      ],
    });

    // Extract and return the unique users count
    if (response.rows && response.rows.length > 0 && response.rows[0].metricValues && response.rows[0].metricValues.length > 0) {
      const uniqueUsers = parseInt(response.rows[0].metricValues[0].value || '0', 10);
      return uniqueUsers;
    }

    return 0;
  } catch (error) {
    console.error('Error fetching unique users from Google Analytics:', error);
    return 0;
  }
}
