# 🔧 Gitgenix - Developer Documentation

<div align="center">

**Technical documentation for developers and contributors**

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-10.0-orange?style=flat&logo=firebase)](https://firebase.google.com/)

[🚀 Live Demo](https://Gitgenix-github-art.netlify.app/) • [📖 API Docs](./docs/API.md) • [🤝 Contributing](./docs/CONTRIBUTING.md)

</div>

## 🛠️ Tech Stack & Architecture

### **Core Technologies**

- **Frontend**: Next.js 15 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **Animations**: Framer Motion with performance optimization
- **Backend**: Firebase Firestore for pattern storage
- **Deployment**: Netlify with automatic deployments
- **Build Tools**: Next.js, PostCSS, ESLint, Prettier

### **Project Structure**

```
gitgenix/
├── app/                    # Next.js app directory
│   ├── components/         # Reusable UI components
│   │   ├── AnimatedTagline.tsx
│   │   ├── Footer.tsx
│   │   ├── LoadingLogo.tsx
│   │   ├── Navigation.tsx
│   │   └── OnboardingTour.tsx
│   ├── draw/              # Main application logic
│   │   ├── components/    # Draw-specific components
│   │   │   ├── ContributionGraph.tsx
│   │   │   ├── DataIO.tsx
│   │   │   ├── GenerateScriptButton.tsx
│   │   │   ├── IntensitySelector.tsx
│   │   │   ├── Toolbar.tsx
│   │   │   ├── UserInputs.tsx
│   │   │   └── YearSelector.tsx
│   │   ├── share/         # Pattern sharing functionality
│   │   │   └── [id]/page.tsx
│   │   ├── types/         # TypeScript definitions
│   │   └── utils/         # Utility functions
│   │       ├── constants.ts
│   │       ├── dateHelpers.ts
│   │       ├── graphHelpers.ts
│   │       └── shellScriptGenerator.ts
│   ├── firebase/          # Firebase configuration & services
│   │   ├── config.ts
│   │   └── dataService.ts
│   ├── hooks/             # Custom React hooks
│   ├── providers/         # Context providers
│   └── utils/             # Global utilities
├── docs/                  # Documentation
│   ├── API.md
│   └── CONTRIBUTING.md
├── public/                # Static assets
└── Configuration files    # Next.js, TypeScript, ESLint, etc.
```

## 🚀 Development Setup

### **Prerequisites**

- Node.js 18+ and npm
- Git
- Firebase account (for cloud features)
- Basic knowledge of React, TypeScript, and Next.js

### **Installation**

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/gitgenix.git
   cd gitgenix
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Firebase**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain-here
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id-here
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket-here
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id-here
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id-here
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id-here
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Core Features & Implementation

### **📊 Contribution Graph System**

- **Grid Generation**: Dynamic grid based on GitHub's contribution calendar
- **Year Support**: Multi-year pattern creation with proper date calculations
- **Intensity Levels**: 5 levels (0-4) corresponding to contribution frequencies
- **Real-time Rendering**: Immediate visual feedback during pattern creation

### **🎨 Pattern Editor**

- **Interactive Drawing**: Click and drag functionality with touch support
- **Performance Optimized**: Efficient rendering for large grids
- **Undo/Redo**: Pattern history management
- **Multi-selection**: Batch operations on cells

### **💾 Data Management**

- **Local Storage**: Temporary pattern storage during editing
- **JSON Export/Import**: Standardized pattern format
- **Firebase Integration**: Cloud storage for pattern sharing
- **Validation**: Data integrity checks and error handling

### **🔧 Script Generation**

- **Git Command Generation**: Precise commit date and frequency control
- **Repository Validation**: GitHub API integration for repo verification
- **Cross-platform Support**: Windows, macOS, and Linux compatible scripts
- **Progress Tracking**: Detailed logging and error reporting

## 🎯 Development Guidelines

### **Code Style**

- **TypeScript**: All new code must be TypeScript
- **ESLint**: Follow the project's ESLint configuration
- **Prettier**: Automatic code formatting on commit
- **JSDoc**: Document all public functions and components

### **Component Development**

```tsx
// Example component with proper TypeScript and performance optimization
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

### **Performance Best Practices**

1. **Animation Optimization**: Use the performance utilities in `utils/performanceUtils.ts`
2. **Component Memoization**: Wrap expensive components with `memo()`
3. **Lazy Loading**: Import components only when needed
4. **Bundle Optimization**: Monitor bundle size and split code appropriately

### **Accessibility Requirements**

- **Keyboard Navigation**: All interactive elements must be keyboard accessible
- **ARIA Labels**: Proper labeling for screen readers
- **Color Contrast**: Maintain WCAG 2.1 AA compliance
- **Reduced Motion**: Respect `prefers-reduced-motion` user preference

## 🧪 Testing & Quality Assurance

### **Manual Testing Checklist**

- [ ] **Core Functionality**: Drawing, exporting, importing patterns
- [ ] **Responsive Design**: Test on mobile, tablet, and desktop
- [ ] **Browser Compatibility**: Chrome, Firefox, Safari, Edge
- [ ] **Performance**: Test on low-end devices
- [ ] **Accessibility**: Keyboard navigation and screen readers

### **Automated Checks**

```bash
# Lint code
npm run lint

# Type checking
npm run type-check

# Build verification
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment

### **Netlify Configuration**

The project automatically deploys to Netlify on push to main branch:

- **Build Command**: `npm run build`
- **Publish Directory**: `out`
- **Environment Variables**: Set in Netlify dashboard
- **Redirects**: Configured in `public/_redirects`

### **Performance Monitoring**

- **Core Web Vitals**: Monitor LCP, FID, CLS
- **Bundle Analysis**: Use `npm run analyze` to check bundle size
- **Firebase Analytics**: Track user interactions and performance

## 🔌 API Reference

### **Graph Data Service**

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

### **Shell Script Generation**

```typescript
// Generate script for pattern
const script = generateShellScript({
  graphs: patternData,
  username: "myusername",
  repository: "myrepo",
  branch: "main",
});
```

For complete API documentation, see [docs/API.md](./docs/API.md).

## 🐛 Debugging & Troubleshooting

### **Common Development Issues**

| Issue                            | Solution                                           |
| -------------------------------- | -------------------------------------------------- |
| **Firebase connection errors**   | Check environment variables and Firebase config    |
| **Animation performance issues** | Enable reduced motion mode in development          |
| **Type errors after updates**    | Run `npm run type-check` and fix TypeScript issues |
| **Build failures**               | Clear `.next` cache and reinstall dependencies     |

### **Debug Tools**

- **React DevTools**: Component inspection and profiling
- **Chrome DevTools**: Performance and network analysis
- **Firebase DevTools**: Firestore data inspection
- **Next.js Debug Mode**: Set `NODE_ENV=development` for detailed logs

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for detailed guidelines.

### **Development Workflow**

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Develop** with proper testing
4. **Commit** with conventional commits: `git commit -m 'feat: add amazing feature'`
5. **Push** to branch: `git push origin feature/amazing-feature`
6. **Open** a Pull Request

### **Release Process**

- **Semantic Versioning**: Major.Minor.Patch (e.g., 1.2.3)
- **Automated Deployment**: Merge to main triggers production deployment
- **Changelog**: Maintained in [CHANGELOG.md](./CHANGELOG.md)
- **Testing**: Comprehensive testing on staging before release

## 📚 Resources

### **Learning Materials**

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Framer Motion Documentation](https://www.framer.com/motion)
- [Firebase Documentation](https://firebase.google.com/docs)

### **Development Tools**

- [VS Code](https://code.visualstudio.com) - Recommended editor
- [React DevTools](https://reactjs.org/blog/2019/08/15/new-react-devtools.html)
- [GitHub CLI](https://cli.github.com) - Command line tools
- [Netlify CLI](https://docs.netlify.com/cli/get-started/) - Local preview

---

<div align="center">

**Questions about development?**

[📖 Check Documentation](./docs/) • [💬 Open Discussion](https://github.com/yourusername/gitgenix/discussions) • [🐛 Report Issues](https://github.com/yourusername/gitgenix/issues)

**Built with ❤️ by the open source community**

</div>
