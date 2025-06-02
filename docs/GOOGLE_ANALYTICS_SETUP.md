# Google Analytics Integration for Gitgenix

This guide explains how to properly set up Google Analytics 4 integration in Gitgenix to track unique users and other important metrics.

## Setup Requirements

Before you can fetch real user data from Google Analytics, you need to set up the following:

1. A Google Analytics 4 property
2. Service account credentials for API access
3. Environment variables for secure access

## Step 1: Create a Google Analytics 4 Property

If you haven't already:

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property for your website
3. Complete the setup and note your Measurement ID (starts with G-)

## Step 2: Set Up a Google Cloud Project for API Access

To access the Google Analytics Data API:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use an existing one)
3. Enable the "Google Analytics Data API" for your project
4. Create a service account with the following roles:
   - "Analytics Data Viewer"
   - "Analytics Reader"
5. Generate a JSON key for this service account
6. Save this JSON file securely (don't commit it to version control)

## Step 3: Configure Environment Variables

Add these environment variables to your project:

```
# Client-side visible Google Analytics tracking ID (safe to expose)
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX

# Server-side only Analytics variables (should NOT have NEXT_PUBLIC_ prefix)
NEXT_PUBLIC_GOOGLE_ANALYTICS_PROPERTY_ID=123456789
NEXT_PUBLIC_GOOGLE_ANALYTICS_CREDENTIALS={"type":"service_account","project_id":"...","private_key":"...","client_email":"..."}
```

Important notes:

- For local development, place these in a `.env.local` file
- For production, set these in your hosting environment (Vercel, etc.)
- Never commit the credentials to version control

## How the Integration Works

Gitgenix uses a proper client-server separation for Google Analytics:

### Client-Side Components:

1. **GoogleAnalyticsInit.tsx**: Initializes GA on the client side and tracks page views
2. **GoogleAnalyticsIntegrator.tsx**: Fetches data from our API endpoint and updates Firebase

### Server-Side Components:

1. **`/api/analytics` endpoint**: Makes secure server-side API calls to Google Analytics
2. **`serverAnalytics.ts`**: Contains server-only code to communicate with the GA Data API

This separation is important because the Google Analytics Data API uses Node.js modules which aren't available in the browser.

The data flows as follows:

- `/api/analytics` endpoint: Makes secure server-side API calls to Google Analytics
- `fetchUniqueUsers()` in `googleAnalytics.ts`: Handles the communication with GA Data API

## Testing Your Setup

1. Make sure you have set all environment variables
2. Run the application locally
3. Visit a few pages to generate analytics data
4. Wait a day for Google Analytics to process the data
5. Check if the "Happy Developers" count on your admin dashboard is updated

## Troubleshooting

Common issues:

- **API returns 0 users**: Check that your GA property has collected data and that the date range includes data
- **API errors**: Ensure your service account has the correct permissions
- **Authentication failures**: Double-check your credentials JSON format
- **Module not found errors**: If you see "Module not found: Can't resolve 'child_process'" or similar errors, make sure you're not importing server-side code directly in components. Use the API routes instead
- **'fs' is not defined**: This typically happens when Node.js modules are imported in client components - always keep Google Analytics Data API code in server components or API routes

## Learn More

- [Google Analytics Data API Documentation](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [Google Cloud Service Accounts](https://cloud.google.com/iam/docs/service-accounts)
