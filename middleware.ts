import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip middleware for the login page and setup page
    if (request.nextUrl.pathname === '/admin' || request.nextUrl.pathname === '/admin/setup') {
      return NextResponse.next();
    }

    // Check for authentication token in cookies
    const authToken = request.cookies.get('admin-auth-token');
    
    if (!authToken || !authToken.value) {
      // Redirect to admin login if no token found
      const loginUrl = new URL('/admin', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Basic token validation - in production you'd want to verify with Firebase Admin SDK
    try {
      // For now, just check if token exists and is not empty
      if (authToken.value.length < 10) {
        const loginUrl = new URL('/admin', request.url);
        return NextResponse.redirect(loginUrl);
      }
    } catch (error) {
      console.error('Token validation error:', error);
      const loginUrl = new URL('/admin', request.url);
      return NextResponse.redirect(loginUrl);
    }
    
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
