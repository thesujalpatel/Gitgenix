# Contributing to Gitgenix

Thank you for your interest in contributing to Gitgenix! This document provides guidelines and instructions for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Basic knowledge of React, TypeScript, and Next.js

### Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/Gitgenix.git
   cd Gitgenix
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📋 Development Guidelines

### Code Style

- **TypeScript**: All new code should be written in TypeScript
- **ESLint**: Follow the existing ESLint configuration
- **Prettier**: Code is automatically formatted on commit
- **Comments**: Add JSDoc comments for public functions and components

### File Structure

```
app/
├── components/          # Reusable UI components
├── draw/               # Drawing page and related components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── assets/             # Static assets (logos, icons)
└── providers/          # Context providers
```

### Component Guidelines

1. **Functional Components**: Use functional components with hooks
2. **TypeScript**: Always define prop interfaces
3. **Performance**: Use `memo()` for expensive components
4. **Accessibility**: Include proper ARIA labels and keyboard navigation
5. **Responsive Design**: Ensure components work on mobile and desktop

### Animation Guidelines

1. **Performance First**: Use the performance utilities in `utils/performanceUtils.ts`
2. **Accessibility**: Respect `prefers-reduced-motion`
3. **Optimization**: Use GPU acceleration for smooth animations
4. **Conflicts**: Avoid CSS and Framer Motion conflicts

Example:

```tsx
import {
  getAnimationPreferences,
  optimizeTransition,
} from "../utils/performanceUtils";

export default function MyComponent() {
  const [animPrefs] = useState(() => getAnimationPreferences());

  const transition = optimizeTransition(
    {
      duration: 0.3,
      type: "spring",
    },
    animPrefs
  );

  return (
    <motion.div
      transition={transition}
      whileHover={!animPrefs.preferSimpleAnimations ? { scale: 1.05 } : {}}
    >
      Content
    </motion.div>
  );
}
```

## 🐛 Bug Reports

### Before Submitting

1. Check existing issues to avoid duplicates
2. Test with the latest version
3. Clear browser cache and localStorage

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:

1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**

- OS: [e.g. Windows 10, macOS 12]
- Browser: [e.g. Chrome 96, Firefox 95]
- Device: [e.g. Desktop, iPhone 12]

**Additional context**
Any other context about the problem.
```

## ✨ Feature Requests

### Guidelines

- **Clear Use Case**: Explain why the feature would be valuable
- **Scope**: Keep features focused and well-defined
- **Compatibility**: Consider impact on existing functionality

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Other solutions you've thought about.

**Additional context**
Mockups, examples, or other context.
```

## 🔄 Pull Request Process

### Before Submitting

1. **Branch**: Create a feature branch from `main`
2. **Testing**: Test your changes thoroughly
3. **Documentation**: Update documentation if needed
4. **Performance**: Run performance tests for animation changes
5. **Accessibility**: Test with screen readers and keyboard navigation

### PR Guidelines

1. **Title**: Use descriptive titles (e.g., "Add pattern import/export functionality")
2. **Description**: Explain what changes were made and why
3. **Testing**: Include test results and screenshots
4. **Breaking Changes**: Clearly document any breaking changes

### PR Template

```markdown
## Changes Made

- [x] Feature/fix description
- [x] Tests added/updated
- [x] Documentation updated

## Testing

- [ ] Manual testing completed
- [ ] Performance impact assessed
- [ ] Accessibility tested

## Screenshots

<!-- Add screenshots for UI changes -->

## Breaking Changes

<!-- List any breaking changes -->

## Additional Notes

<!-- Any additional context -->
```

## 🧪 Testing

### Manual Testing

1. **Core Functionality**: Test drawing, exporting, importing
2. **Responsive Design**: Test on mobile and desktop
3. **Browser Compatibility**: Test in Chrome, Firefox, Safari, Edge
4. **Performance**: Test on low-end devices
5. **Accessibility**: Test with keyboard navigation and screen readers

### Automated Testing

- Run `npm run lint` to check code style
- Run `npm run type-check` to verify TypeScript
- Run `npm run build` to ensure production build works

## 🎨 Design Guidelines

### UI/UX Principles

1. **Simplicity**: Keep interfaces clean and intuitive
2. **Consistency**: Use existing design patterns
3. **Accessibility**: Ensure good contrast and keyboard navigation
4. **Performance**: Prioritize smooth animations and fast loading

### Color Scheme

- **Primary**: Blue (#2563eb)
- **Background**: Dynamic (light/dark mode)
- **Cells**: 5 intensity levels with distinct colors
- **Text**: High contrast for readability

### Typography

- **Font**: Mona Sans (GitHub's font)
- **Hierarchy**: Clear heading levels
- **Readability**: Adequate line spacing and font sizes

## 🏗️ Architecture Decisions

### State Management

- **Local State**: React hooks for component state
- **Global State**: Context providers for theme and settings
- **Persistence**: localStorage for user preferences and temporary data

### Data Flow

1. User creates pattern in drawing interface
2. Data stored in component state during editing
3. Export/import handles serialization
4. Sharing saves to Firebase and generates URLs

### Performance Optimizations

1. **Lazy Loading**: Components loaded as needed
2. **Memoization**: Expensive calculations cached
3. **Animation Optimization**: Device-specific animation settings
4. **Code Splitting**: Reduced initial bundle size

## 📦 Release Process

### Version Numbering

- **Major**: Breaking changes (1.0.0 → 2.0.0)
- **Minor**: New features (1.0.0 → 1.1.0)
- **Patch**: Bug fixes (1.0.0 → 1.0.1)

### Deployment

- **Automatic**: Deploys to Netlify on merge to main
- **Testing**: Thoroughly test staging environment
- **Rollback**: Keep previous version available for quick rollback

## 🤝 Community

### Communication

- **Issues**: Use GitHub issues for bugs and features
- **Discussions**: Use GitHub discussions for questions
- **Code Review**: All changes require review

### Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Maintain professional communication

## 📚 Resources

### Learning Resources

- [React Documentation](https://react.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Framer Motion Documentation](https://www.framer.com/motion)

### Tools

- [VS Code](https://code.visualstudio.com) - Recommended editor
- [React DevTools](https://reactjs.org/blog/2019/08/15/new-react-devtools.html)
- [GitHub CLI](https://cli.github.com) - Command line tools

## 🎉 Recognition

Contributors are recognized in:

- README.md contributor section
- Release notes for significant contributions
- GitHub repository insights

## Questions?

If you have questions about contributing, please:

1. Check existing documentation
2. Search closed issues
3. Open a new discussion
4. Contact maintainers

Thank you for contributing to Gitgenix! 🎨
