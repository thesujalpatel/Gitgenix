import { NextRequest, NextResponse } from 'next/server';
import { fetchUniqueUsers } from '@/app/utils/serverAnalytics';

// API route to fetch unique users from GA4 - keep credentials secure
export async function GET(req: NextRequest) {
  try {
    // Parse the days param, default to 30 if not provided
    const searchParams = req.nextUrl.searchParams;
    const days = parseInt(searchParams.get('days') || '30', 10);
    
    // Get unique users from Google Analytics
    const uniqueUsers = await fetchUniqueUsers(days);
    
    // Return the result
    return NextResponse.json({ uniqueUsers });
  } catch (error) {
    console.error('Error in analytics API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' }, 
      { status: 500 }
    );
  }
}
