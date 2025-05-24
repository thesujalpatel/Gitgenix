# Arcadia

Arcadia is a web application that allows you to design custom GitHub contribution patterns and export them as shell scripts to visualize your GitHub contribution graph.

## Features

- **Draw Custom Patterns**: Create custom GitHub contribution patterns by selecting cells with various intensity levels.
- **Multi-Year Support**: Design patterns across multiple years.
- **Export & Import**: Save your designs as JSON files and import them later.
- **Online Storage**: Save your patterns online with unique names using Firebase.
- **Share with Friends**: Generate shareable links to your patterns.
- **Shell Script Generation**: Export your patterns as shell scripts that can be run to create the actual GitHub contributions.

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a Firebase project and add your Firebase configuration to `.env.local` (see `.env.example` for template)
4. Run the development server with `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain-here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket-here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id-here
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id-here
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id-here
```

## Usage

1. Select years to include in your pattern
2. Set your GitHub username, repository, and branch
3. Draw your pattern by clicking on cells or clicking and dragging
4. Export your pattern as a shell script to create actual GitHub contributions
5. Save your pattern online or export as JSON for later use
6. Share your pattern with friends via a unique link
