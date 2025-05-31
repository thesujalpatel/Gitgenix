# 🛠️ Development Guide

Quick setup and development workflow for contributing to Gitgenix.

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- **VS Code** (recommended) - [Download](https://code.visualstudio.com/)

### Setup

```bash
# Clone the repository
git clone https://github.com/thesujalpatel/gitgenix.git
cd gitgenix

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app running!

---

## 🔧 Environment Configuration

### Required Environment Variables

Create `.env.local` in the project root:

```env
# Firebase Configuration (Optional for basic development)
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

> **Note:** Firebase is only needed for pattern sharing features. Core functionality works without it!
> NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Development Settings (Optional)

NODE_ENV=development
NEXT_PUBLIC_DEBUG=true

````

### Firebase Setup (Optional)

Firebase is only required for cloud features (pattern sharing). Core functionality works without it.

1. **Create Firebase Project**: [Firebase Console](https://console.firebase.google.com/)
2. **Enable Firestore**: Set up Firestore database
3. **Get Configuration**: Copy your Firebase config
4. **Update Environment**: Add config to `.env.local`

### Development vs Production

```env
# Development
NODE_ENV=development
NEXT_PUBLIC_DEBUG=true

# Production (handled by deployment)
NODE_ENV=production
NEXT_PUBLIC_DEBUG=false
````

---

## Development Workflow

### Daily Development

```bash
# 1. Pull latest changes
git pull origin main

# 2. Install any new dependencies
npm install

# 3. Start development server
npm run dev

# 4. Make your changes...

# 5. Run checks before committing
npm run type-check
npm run lint
npm run build

# 6. Commit and push
git add .
git commit -m "feat: your changes"
git push origin your-branch
```

### Feature Development

```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Develop and test
npm run dev

# 3. Run all checks
npm run type-check
npm run lint
npm run build

# 4. Test manually
# - Test core functionality
# - Check responsive design
# - Verify accessibility

# 5. Commit with conventional commits
git commit -m "feat: add new feature"

# 6. Push and create PR
git push origin feature/new-feature
```

### Hot Reloading

The development server supports hot reloading:

- **React Components**: Instant refresh on save
- **CSS Changes**: Immediate style updates
- **TypeScript**: Live type checking
- **Configuration Changes**: Automatic restart

---

## Project Structure

### High-Level Overview

```
gitgenix/
├── app/                    # Next.js app directory
├── docs/                   # Documentation
├── public/                 # Static assets
├── .env.example           # Environment template
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── next.config.ts         # Next.js configuration
```

### App Directory Structure

```
app/
├── layout.tsx             # Root layout
├── page.tsx              # Landing page
├── globals.css           # Global styles
├── components/           # Reusable UI components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── OnboardingTour.tsx
│   └── AnimatedTagline.tsx
├── draw/                 # Main application
│   ├── page.tsx         # Draw interface
│   ├── layout.tsx       # Draw layout
│   ├── components/      # Drawing-specific components
│   ├── types/           # TypeScript definitions
│   ├── utils/           # Drawing utilities
│   └── share/[id]/      # Pattern sharing
├── firebase/            # Firebase configuration
├── hooks/               # Custom React hooks
├── providers/           # Context providers
└── utils/               # Global utilities
```

### Component Organization

#### Reusable Components (`app/components/`)

- Global navigation, footer, tours
- Shared UI elements
- Layout components

#### Feature Components (`app/draw/components/`)

- ContributionGraph - Main drawing interface
- Toolbar - Drawing tools and controls
- UserInputs - GitHub repository settings
- YearSelector - Multi-year selection
- DataIO - Import/export functionality

#### Utility Functions (`app/utils/` & `app/draw/utils/`)

- Graph manipulation
- Shell script generation
- Performance optimization
- Date helpers

---

## Available Scripts

### Development Scripts

```bash
# Start development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Fix linting issues
npm run lint:fix
```

### Build Scripts

```bash
# Production build
npm run build

# Start production server locally
npm start

# Export static files
npm run export
```

### Analysis Scripts

```bash
# Bundle analysis (if configured)
npm run analyze

# Check bundle size
npm run build && ls -la .next/static/chunks/
```

### Custom Scripts

Add custom scripts to `package.json`:

```json
{
  "scripts": {
    "dev:debug": "NODE_OPTIONS='--inspect' npm run dev",
    "test:manual": "npm run build && npm start",
    "clean": "rm -rf .next node_modules/.cache"
  }
}
```

---

## IDE Setup

### VS Code Configuration

#### Recommended Extensions

```json
// .vscode/extensions.json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

#### Settings

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}
```

#### Tasks Configuration

```json
// .vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "dev",
      "type": "shell",
      "command": "npm run dev",
      "group": "build",
      "isBackground": true
    },
    {
      "label": "type-check",
      "type": "shell",
      "command": "npm run type-check",
      "group": "build"
    }
  ]
}
```

### Other IDEs

#### WebStorm

- Enable TypeScript service
- Configure Prettier and ESLint
- Set up run configurations

#### Vim/Neovim

- Install TypeScript language server
- Configure coc.nvim or native LSP
- Set up formatting and linting

---

## Debugging

### Browser DevTools

#### React Components

1. Install [React DevTools](https://react.dev/learn/react-developer-tools)
2. Inspect component props and state
3. Profile component renders

#### Performance Analysis

```javascript
// In browser console
performance.mark("start");
// ... your code ...
performance.mark("end");
performance.measure("operation", "start", "end");
console.table(performance.getEntriesByType("measure"));
```

#### Network Monitoring

- Monitor Firebase requests
- Check static asset loading
- Analyze bundle sizes

### TypeScript Debugging

#### Type Checking

```bash
# Continuous type checking
npm run type-check -- --watch

# Detailed type information
npx tsc --noEmit --listFiles
```

#### Common Type Issues

```typescript
// Use type assertions carefully
const element = document.getElementById("my-id") as HTMLElement;

// Better: Type guards
function isHTMLElement(element: Element | null): element is HTMLElement {
  return element !== null && element instanceof HTMLElement;
}

const element = document.getElementById("my-id");
if (isHTMLElement(element)) {
  // element is now typed as HTMLElement
}
```

### Console Debugging

#### Development Helpers

```typescript
// Debug utilities
const debug = {
  log: (label: string, data: any) => {
    if (process.env.NODE_ENV === "development") {
      console.group(`🐛 ${label}`);
      console.log(data);
      console.groupEnd();
    }
  },

  table: (data: any) => {
    if (process.env.NODE_ENV === "development") {
      console.table(data);
    }
  },
};

// Usage
debug.log("Graph Data", graphs);
debug.table(cellsArray);
```

---

## Performance Optimization

### Development Performance

#### Bundle Analysis

```bash
# Analyze bundle size
npm run build
du -sh .next/static/chunks/*

# Check for large dependencies
npx bundlephobia <package-name>
```

#### Memory Usage

```javascript
// Monitor memory in browser
console.log("Memory usage:", performance.memory);

// Check for memory leaks
// Use Chrome DevTools Memory tab
```

### Code Optimization

#### Component Memoization

```typescript
import { memo, useMemo, useCallback } from "react";

const ExpensiveComponent = memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return expensiveCalculation(data);
  }, [data]);

  const handleUpdate = useCallback(
    (newData) => {
      onUpdate(newData);
    },
    [onUpdate]
  );

  return <div>{/* Component */}</div>;
});
```

#### Bundle Splitting

```typescript
// Dynamic imports for code splitting
const HeavyComponent = lazy(() => import("./HeavyComponent"));

// Use with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <HeavyComponent />
</Suspense>;
```

### Animation Performance

#### Efficient Animations

```typescript
import { getAnimationPreferences } from "../utils/performanceUtils";

const animPrefs = getAnimationPreferences();

// Conditional animations based on user preference
const motionProps = animPrefs.preferSimpleAnimations
  ? {}
  : {
      animate: { scale: 1.05 },
      transition: { duration: 0.3 },
    };
```

#### GPU Acceleration

```css
/* Use transform instead of changing layout properties */
.animate-element {
  transform: translateX(0);
  transition: transform 0.3s ease;
}

.animate-element:hover {
  transform: translateX(10px);
}
```

---

## Testing in Development

### Manual Testing Checklist

#### Core Functionality

- [ ] Pattern creation and editing
- [ ] Multi-year support
- [ ] Script generation
- [ ] Import/export functionality
- [ ] Pattern sharing (if Firebase configured)

#### Responsive Design

- [ ] Desktop (1920x1080+)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667, 414x896)

#### Cross-Browser

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

#### Accessibility

- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] High contrast mode
- [ ] Reduced motion preference

### Development Tools

#### Browser Extensions

- React DevTools
- Redux DevTools (if using Redux)
- Accessibility Insights
- Lighthouse

#### Command Line Tools

```bash
# Lighthouse audit
npx lighthouse http://localhost:3000 --view

# Bundle analyzer
npx @next/bundle-analyzer
```

---

## Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Find process using port 3000
lsof -ti:3000

# Kill the process
kill -9 <PID>

# Or use different port
npm run dev -- --port 3001
```

#### Module Resolution Issues

```bash
# Clear Next.js cache
rm -rf .next

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Errors

```bash
# Check TypeScript version
npx tsc --version

# Full type check
npx tsc --noEmit

# Clear TypeScript cache
rm -rf .next/cache
```

#### Firebase Connection Issues

```bash
# Check environment variables
echo $NEXT_PUBLIC_FIREBASE_API_KEY

# Test Firebase configuration
# Add console.log in firebase/config.ts
```

### Performance Issues

#### Slow Development Server

- Close unnecessary browser tabs
- Disable browser extensions
- Increase Node.js memory: `NODE_OPTIONS="--max-old-space-size=4096"`

#### Memory Leaks

- Use React DevTools Profiler
- Check for event listener cleanup
- Monitor browser DevTools Memory tab

---

## Next Steps

After setting up your development environment:

1. **Read the [Developer Reference](./DEVELOPER_REFERENCE.md)** - Understand the project structure
2. **Review [Contributing Guidelines](./CONTRIBUTING.md)** - Learn how to contribute
3. **Check the [Developer Reference](./DEVELOPER_REFERENCE.md)** - Understand the codebase APIs
4. **Start with Good First Issues** - Look for beginner-friendly issues

### Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion)

---

**Happy coding!** 🚀

If you run into any issues during setup, please check our [troubleshooting section](#troubleshooting) or create an issue on GitHub.
