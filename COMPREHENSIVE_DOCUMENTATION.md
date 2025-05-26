# 🎨 Gitgenix - Comprehensive Documentation

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [User Guide](#user-guide)
- [API Documentation](#api-documentation)
- [Development Setup](#development-setup)
- [Contributing](#contributing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Overview

**Gitgenix** is a comprehensive web application that allows users to create beautiful GitHub contribution art by designing patterns that appear on their GitHub contribution graph. The app provides a visual pattern editor, automated shell script generation, and pattern sharing capabilities.

### What Makes Gitgenix Special

- 🎨 **Visual Pattern Designer**: Intuitive click-and-drag interface for creating contribution art
- 🚀 **Automated Script Generation**: Creates precise shell scripts with exact commit dates and frequencies
- 📱 **Cross-Platform**: Works seamlessly on desktop, tablet, and mobile devices
- 🔄 **Pattern Sharing**: Save and share patterns with the community via Firebase cloud storage
- 📊 **Multi-Year Support**: Create patterns spanning multiple years
- ⚡ **Performance Optimized**: Smooth animations with accessibility considerations
- 🌍 **Open Source**: Free and open source with comprehensive documentation

---

## Features

### Core Features

#### 1. **Visual Pattern Editor**

- Interactive contribution grid with 5 intensity levels (0-4)
- Click and drag functionality with touch support
- Real-time pattern preview
- Multi-year pattern creation
- Undo/redo functionality (via browser navigation)

#### 2. **GitHub Integration**

- Repository validation using GitHub API
- Automatic branch and repository verification
- Support for public and private repositories
- Cross-platform script generation (Windows, macOS, Linux)

#### 3. **Data Management**

- **Local Export**: JSON format with complete pattern data and metadata
- **Cloud Storage**: Firebase integration for pattern sharing
- **Import/Export**: Drag-and-drop JSON file support
- **Pattern Sharing**: Generate shareable URLs for community sharing

#### 4. **Advanced Features**

- **Performance Optimization**: Respects user's motion preferences
- **Accessibility**: Full keyboard navigation and screen reader support
- **Responsive Design**: Optimized for all device sizes
- **Dark/Light Mode**: Automatic theme detection with manual override
- **Onboarding**: Interactive tour for new users

### Technical Features

#### Frontend

- **Next.js 15** with App Router
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Hot Toast** for notifications

#### Backend & Services

- **Firebase Firestore** for pattern storage
- **GitHub API** integration for repository validation
- **Netlify** deployment with automatic builds

#### Performance & Accessibility

- **Optimized animations** based on user preferences
- **Progressive Web App** features
- **SEO optimized** with structured data
- **WCAG 2.1 AA compliance**

---

## Quick Start

### For Users

1. **Visit the App**: Go to [https://gitgenix-contrib.netlify.app](https://gitgenix-contrib.netlify.app)

2. **Create Your Pattern**:

   - Navigate to the Draw page
   - Select which years to include in your pattern
   - Enter your GitHub username, repository name, and branch
   - Design your pattern by clicking on the contribution grid
   - Use different intensity levels (0-4) for varied effects

3. **Generate & Apply**:
   - Click "Generate Script" to download your custom script
   - Run the script in your repository directory
   - Push changes to GitHub and watch your art appear!

### For Developers

```bash
# Clone the repository
git clone https://github.com/thesujalpatel/gitgenix.git
cd gitgenix

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Firebase configuration

# Start development server
npm run dev

# Open browser at http://localhost:3000
```

---

## Architecture

### Tech Stack

```
Frontend:
├── Next.js 15 (App Router)
├── React 19 + TypeScript
├── Tailwind CSS
├── Framer Motion
└── React Hot Toast

Backend Services:
├── Firebase Firestore
├── GitHub API
└── Netlify Functions (if needed)

Development:
├── ESLint + Prettier
├── PostCSS
└── TypeScript
```

### Project Structure

```
gitgenix/
├── app/                    # Next.js app directory
│   ├── components/         # Reusable UI components
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── OnboardingTour.tsx
│   │   └── AnimatedTagline.tsx
│   ├── draw/              # Main application
│   │   ├── components/    # Drawing interface
│   │   │   ├── ContributionGraph.tsx
│   │   │   ├── DataIO.tsx
│   │   │   ├── Toolbar.tsx
│   │   │   ├── UserInputs.tsx
│   │   │   └── YearSelector.tsx
│   │   ├── share/[id]/    # Pattern sharing
│   │   ├── types/         # TypeScript definitions
│   │   └── utils/         # Utility functions
│   ├── firebase/          # Firebase configuration
│   ├── hooks/             # Custom React hooks
│   ├── providers/         # Context providers
│   └── utils/             # Global utilities
├── docs/                  # Documentation
├── public/               # Static assets
└── Configuration files   # Next.js, TypeScript, etc.
```

### Data Flow

1. **Pattern Creation**: User designs pattern on interactive grid
2. **Data Storage**: Pattern stored in component state during editing
3. **Export/Import**: JSON serialization with metadata
4. **Sharing**: Firebase Firestore for cloud storage
5. **Script Generation**: Shell script created with precise Git commands

---

## User Guide

### Getting Started

#### Step 1: Access the Draw Page

Navigate to the drawing interface where you'll create your contribution art.

#### Step 2: Configure Your Setup

- **Select Years**: Choose which years to include in your pattern
- **GitHub Details**: Enter your username, repository name, and branch
- **Repository Validation**: The app automatically checks if your repository exists

#### Step 3: Design Your Pattern

- **Intensity Levels**: Choose from 5 levels (0-4) corresponding to contribution frequencies
  - Level 0: No contributions (0 commits)
  - Level 1: Light activity (10 commits)
  - Level 2: Moderate activity (20 commits)
  - Level 3: High activity (30 commits)
  - Level 4: Maximum activity (40 commits)

#### Step 4: Create Your Art

- **Click**: Set individual cells to selected intensity
- **Drag**: Paint multiple cells at once
- **Clear**: Remove patterns or reset entire years

#### Step 5: Generate Script

- Click "Generate Script" to download your custom shell script
- The script contains precise Git commands for each day

#### Step 6: Apply to GitHub

```bash
# Make script executable
chmod +x gitgenix.sh

# Run the script in your repository
./gitgenix.sh

# Push changes to GitHub
git push origin main
```

### Advanced Features

#### Sharing Patterns

1. **Save Online**: Give your pattern a name and save to the cloud
2. **Get Share Link**: Receive a unique URL to share with others
3. **Import Shared**: Click any shared pattern link to import directly

#### Export/Import

- **JSON Export**: Download patterns as JSON files for backup
- **Drag & Drop Import**: Import patterns by dragging JSON files
- **Cross-Device**: Share patterns between different devices

### Best Practices

#### Repository Setup

- Create a dedicated repository for contribution art
- Use public repositories for contributions to show
- Keep repositories clean with minimal files
- Use descriptive branch names

#### Pattern Design

- **Mix Intensity Levels**: Use all levels (0-4) for best contrast
- **Clean Years**: Target years with minimal existing contributions
- **Test Small**: Start with simple patterns to understand the process
- **Live Preview**: Pattern appears in real-time as you design

---

## API Documentation

### Core APIs

#### Graph Data Service

```typescript
// Save pattern to cloud
const patternId = await saveGraphToFirestore({
  name: "My Pattern",
  graphs: graphsData,
  username: "myusername",
  repository: "myrepo",
  branch: "main",
});

// Retrieve pattern from cloud
const pattern = await getGraphFromFirestore("pattern123");
```

#### Data Serialization

```typescript
// Export to JSON string
const jsonData = stringifyGraphData(graphs, username, repository, branch);

// Parse from JSON string
const { graphs, metadata } = parseGraphData(jsonString);
```

#### Shell Script Generation

```typescript
// Generate script for pattern
const script = generateShellScript({
  graphs: patternData,
  username: "myusername",
  repository: "myrepo",
  branch: "main",
});
```

### Data Types

#### Cell Interface

```typescript
interface Cell {
  date: Date;
  intensity: number; // 0-4
  isOutOfRange: boolean;
}
```

#### Graph Data Structure

```typescript
interface GraphData {
  cells: Cell[];
  yearStart: Date;
  yearEnd: Date;
  monthLabels: Record<number, number>;
}
```

#### Pattern Metadata

```typescript
interface GitgenixMetadata {
  username: string;
  repository: string;
  branch: string;
  exportDate: string;
  version: string;
  appName?: string;
  creator?: string;
}
```

---

## Development Setup

### Prerequisites

- **Node.js 18+** and npm
- **Git** for version control
- **Firebase account** for cloud features
- Basic knowledge of React, TypeScript, and Next.js

### Installation Steps

1. **Clone Repository**

   ```bash
   git clone https://github.com/thesujalpatel/gitgenix.git
   cd gitgenix
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Firebase**
   Create `.env.local`:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

4. **Start Development Server**

   ```bash
   npm run dev
   ```

5. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Development Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Type checking
npm run type-check

# Linting
npm run lint

# Preview production build
npm run preview
```

### Development Guidelines

#### Code Style

- **TypeScript**: All new code in TypeScript
- **ESLint**: Follow project ESLint configuration
- **Prettier**: Automatic formatting on commit
- **JSDoc**: Document public functions and components

#### Component Development

```typescript
// Example component with TypeScript and performance optimization
import { memo } from "react";
import { motion } from "framer-motion";
import { getAnimationPreferences } from "../utils/performanceUtils";

interface MyComponentProps {
  data: PatternData;
  onUpdate: (data: PatternData) => void;
}

export const MyComponent = memo(({ data, onUpdate }: MyComponentProps) => {
  const animPrefs = getAnimationPreferences();

  return (
    <motion.div
      animate={!animPrefs.preferSimpleAnimations ? { scale: 1.02 } : {}}
      transition={{ duration: 0.2 }}
    >
      {/* Component content */}
    </motion.div>
  );
});

MyComponent.displayName = "MyComponent";
```

#### Performance Best Practices

1. **Animation Optimization**: Use performance utilities
2. **Component Memoization**: Wrap expensive components with `memo()`
3. **Lazy Loading**: Import components only when needed
4. **Bundle Optimization**: Monitor bundle size

#### Accessibility Requirements

- **Keyboard Navigation**: All interactive elements accessible
- **ARIA Labels**: Proper labeling for screen readers
- **Color Contrast**: WCAG 2.1 AA compliance
- **Reduced Motion**: Respect user preference

---

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](./docs/CONTRIBUTING.md) for detailed information.

### Quick Contributing Guide

1. **Fork** the repository
2. **Create** feature branch: `git checkout -b feature/amazing-feature`
3. **Develop** with proper testing
4. **Commit** with conventional commits: `git commit -m 'feat: add amazing feature'`
5. **Push** to branch: `git push origin feature/amazing-feature`
6. **Open** Pull Request

### Development Workflow

```bash
# Setup development environment
npm install
npm run dev

# Make changes and test
npm run lint
npm run type-check
npm run build

# Commit changes
git add .
git commit -m 'feat: description of changes'
git push origin feature-branch
```

### Testing Checklist

- [ ] **Core Functionality**: Drawing, exporting, importing patterns
- [ ] **Responsive Design**: Mobile, tablet, and desktop
- [ ] **Browser Compatibility**: Chrome, Firefox, Safari, Edge
- [ ] **Performance**: Test on low-end devices
- [ ] **Accessibility**: Keyboard navigation and screen readers

---

## Deployment

### Netlify Configuration

The project automatically deploys to Netlify on push to main branch:

- **Build Command**: `npm run build`
- **Publish Directory**: `out`
- **Environment Variables**: Set in Netlify dashboard
- **Redirects**: Configured in `public/_redirects`

### Performance Monitoring

- **Core Web Vitals**: Monitor LCP, FID, CLS
- **Bundle Analysis**: Use `npm run analyze` to check bundle size
- **Firebase Analytics**: Track user interactions and performance

### Environment Variables

Required for production:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=production-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=production-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=production-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=production-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=production-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=production-app-id
```

---

## Troubleshooting

### Common Issues

| Problem                          | Solution                                           |
| -------------------------------- | -------------------------------------------------- |
| **Firebase connection errors**   | Check environment variables and Firebase config    |
| **Animation performance issues** | Enable reduced motion mode in development          |
| **Type errors after updates**    | Run `npm run type-check` and fix TypeScript issues |
| **Build failures**               | Clear `.next` cache and reinstall dependencies     |

### User Issues

#### Script Generation Fails

- Double-check repository exists and is accessible
- Verify GitHub username and repository name
- Ensure you have push access to the repository

#### Pattern Not Visible on GitHub

- Use mixed intensity levels (0-4) for best contrast
- Ensure repository is public for contributions to show
- Check that commits were pushed successfully
- Wait up to 24 hours for GitHub to update

#### Performance Issues

- Enable "Reduce Motion" in browser settings
- Close other browser tabs to free up memory
- Try using a different browser
- Use smaller patterns on mobile devices

### Debug Tools

- **React DevTools**: Component inspection and profiling
- **Chrome DevTools**: Performance and network analysis
- **Firebase DevTools**: Firestore data inspection
- **Next.js Debug Mode**: Set `NODE_ENV=development` for detailed logs

---

## Resources

### Learning Materials

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Framer Motion Documentation](https://www.framer.com/motion)
- [Firebase Documentation](https://firebase.google.com/docs)

### Development Tools

- [VS Code](https://code.visualstudio.com) - Recommended editor
- [React DevTools](https://reactjs.org/blog/2019/08/15/new-react-devtools.html)
- [GitHub CLI](https://cli.github.com) - Command line tools
- [Netlify CLI](https://docs.netlify.com/cli/get-started/) - Local preview

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## Support

### Getting Help

- 📖 Check our [Complete User Guide](./app/guide)
- 🐛 [Report Issues](https://github.com/thesujalpatel/gitgenix/issues)
- 💬 Ask questions in [Discussions](https://github.com/thesujalpatel/gitgenix/discussions)

### Community

- **🌟 Show Off Your Art**: Share your GitHub contribution art
- **💡 Contributing Ideas**: Pattern templates, new features, mobile app
- **🎨 Community Gallery**: Showcase amazing patterns created by users

---

<div align="center">

**Built with ❤️ by [Sujal Patel](https://github.com/thesujalpatel)**

[🚀 Try Gitgenix Now](https://gitgenix-contrib.netlify.app/) • [📖 User Guide](https://gitgenix-contrib.netlify.app/guide) • [🤝 Contributing](./docs/CONTRIBUTING.md)

</div>
