# 🤝 Contributing to Gitgenix

Welcome to the Gitgenix community! We're excited to have you contribute to making GitHub contribution art creation even better. This guide will help you get started quickly and effectively.

## 🚀 Quick Start

### First-Time Contributors

1. 🍴 **Fork** the repository on GitHub
2. 🔽 **Clone** your fork locally
3. 📦 **Install** dependencies: `npm install`
4. 🛠️ **Start** development: `npm run dev`
5. 🎯 **Pick** an issue or create a new one
6. 💻 **Code** your contribution
7. ✅ **Test** your changes
8. 📤 **Submit** a pull request

### Already Familiar?

Jump to [Development Workflow](#development-workflow) →

## 📋 Table of Contents

- [Ways to Contribute](#-ways-to-contribute)
- [Development Setup](#-development-setup)
- [Development Workflow](#-development-workflow)
- [Code Guidelines](#-code-guidelines)
- [Testing](#-testing)
- [Pull Request Process](#-pull-request-process)
- [Issue Guidelines](#-issue-guidelines)
- [Community](#-community)

---

## 🌟 Ways to Contribute

### 🐛 Report Bugs

Found something broken? Help us fix it!

- Check [existing issues](https://github.com/thesujalpatel/gitgenix/issues) first
- Use our [bug report template](.github/ISSUE_TEMPLATE/bug_report.md)
- Include steps to reproduce, screenshots, and system info

### ✨ Suggest Features

Have an idea to make Gitgenix better?

- Browse [feature discussions](https://github.com/thesujalpatel/gitgenix/discussions)
- Use our [feature request template](.github/ISSUE_TEMPLATE/feature_request.md)
- Explain the problem and proposed solution

### 📝 Improve Documentation

Help others understand Gitgenix:

- Fix typos and improve clarity
- Add examples and tutorials
- Update API documentation
- Write blog posts or guides

### 🎨 Enhance UI/UX

Make Gitgenix more beautiful and usable:

- Improve accessibility
- Add animations and interactions
- Optimize for mobile devices
- Design new components

### 🧪 Write Tests

Help ensure quality and reliability:

- Add unit tests for new features
- Improve test coverage
- Write integration tests
- Test accessibility compliance

### 💻 Contribute Code

Dive into the codebase:

- Fix bugs and issues
- Implement new features
- Optimize performance
- Refactor and clean up code

---

## 🛠️ Development Setup

### Prerequisites

- **Node.js 18+** with npm
- **Git** for version control
- **Modern browser** (Chrome recommended for development)
- **VS Code** (recommended) with extensions:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - Prettier - Code formatter
  - ESLint

### Installation

````bash
# Fork the repo on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/gitgenix.git
cd gitgenix

# Install dependencies
npm install

# Set up environment variables (optional for basic development)
cp .env.example .env.local

---

## 🔄 Development Workflow

### 1. Plan Your Contribution
- 📋 **Browse Issues**: Check [existing issues](https://github.com/thesujalpatel/gitgenix/issues) for something to work on
- 💬 **Discuss First**: For new features, open a discussion or issue first
- 🎯 **Start Small**: First-time contributors should pick "good first issue" labels

### 2. Set Up Your Branch
```bash
# Always start from the latest main
git checkout main
git pull upstream main

# Create a feature branch with descriptive name
git checkout -b feature/pattern-rotation
git checkout -b fix/mobile-touch-sensitivity
git checkout -b docs/update-user-guide
````

### 3. Development Process

```bash
# Make your changes
# Test thoroughly
npm run dev        # Verify in browser
npm run build      # Check production build
npm run lint       # Fix any linting issues
npm run type-check # Ensure TypeScript is happy
```

### 4. Commit Your Work

We use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Good commit messages
git commit -m "feat: add pattern rotation and flip tools"
git commit -m "fix: improve mobile touch detection accuracy"
git commit -m "docs: update README with new installation steps"
git commit -m "refactor: optimize rendering performance"
git commit -m "test: add unit tests for pattern validation"
```

#### Commit Types

- **feat**: New features or functionality
- **fix**: Bug fixes
- **docs**: Documentation updates
- **style**: Code formatting (no logic changes)
- **refactor**: Code improvements (no new features)
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### 5. Submit Pull Request

```bash
# Push your branch
git push origin feature/your-feature-name

# Open GitHub and create a Pull Request
# Use our PR template and provide clear description
```

---

## 📋 Code Guidelines

### TypeScript Standards

```typescript
// Use descriptive names
interface ContributionPattern {
  id: string;
  name: string;
  cells: CellData[][];
  metadata: PatternMetadata;
}

// Always type your functions
function generateScript(pattern: ContributionPattern): string {
  // Implementation
}

// Use proper error handling
try {
  const result = await processPattern(pattern);
  return result;
} catch (error) {
  console.error("Pattern processing failed:", error);
  throw new Error("Failed to process pattern");
}
```

### React Components

```tsx
// Use functional components with TypeScript
interface PatternGridProps {
  pattern: ContributionPattern;
  onCellClick: (row: number, col: number) => void;
  readonly?: boolean;
}

export function PatternGrid({
  pattern,
  onCellClick,
  readonly = false,
}: PatternGridProps) {
  // Component implementation
}

// Use proper hook patterns
function usePatternEditor(initialPattern: ContributionPattern) {
  const [pattern, setPattern] = useState(initialPattern);
  const [history, setHistory] = useState<ContributionPattern[]>([]);

  const updateCell = useCallback(
    (row: number, col: number, intensity: number) => {
      // Implementation
    },
    []
  );

  return { pattern, updateCell, undo, redo };
}
```

### CSS/Styling

```css
/* Use Tailwind classes primarily */
<div className="grid grid-cols-53 gap-1 p-4 bg-background rounded-lg">

/* For complex custom styles, use CSS modules */
.contributionCell {
  @apply transition-colors duration-200 cursor-pointer;
  border-radius: 2px;
}

.contributionCell:hover {
  @apply scale-110 shadow-sm;
}
```

### Performance Guidelines

- **Lazy Loading**: Use `React.lazy()` for large components
- **Memoization**: Use `React.memo()`, `useMemo()`, `useCallback()` appropriately
- **Bundle Size**: Monitor bundle size with `npm run build`
- **Animation**: Use CSS transforms and Framer Motion efficiently

### Accessibility

```tsx
// Always include proper ARIA labels
<button
  aria-label={`Set cell ${row},${col} to intensity ${intensity}`}
  className="contribution-cell"
  onClick={() => onCellClick(row, col)}
>

// Support keyboard navigation
<div
  role="grid"
  onKeyDown={handleKeyDown}
  tabIndex={0}
>

// Use semantic HTML
<main>
  <h1>Create GitHub Contribution Art</h1>
  <section aria-label="Pattern editor">
    {/* Pattern grid */}
  </section>
</main>
```

---

## 🧪 Testing

### Current Testing Approach

While we're building out comprehensive testing, currently focus on:

#### Manual Testing

- **Cross-browser**: Test in Chrome, Firefox, Safari, Edge
- **Mobile devices**: Test on actual mobile devices
- **Accessibility**: Use screen readers and keyboard navigation
- **Performance**: Check with browser dev tools

#### Testing Checklist

- [ ] Feature works on desktop and mobile
- [ ] No console errors or warnings
- [ ] Animations are smooth and performant
- [ ] Accessibility features work correctly
- [ ] TypeScript compiles without errors
- [ ] Linting passes

### Future Testing Framework

We plan to add:

- **Unit Tests**: Jest + Testing Library
- **Integration Tests**: Playwright or Cypress
- **Visual Regression**: Chromatic or similar
- **Performance Tests**: Lighthouse CI

---

## 📤 Pull Request Process

### Before Submitting

- [ ] Code follows our style guidelines
- [ ] TypeScript compiles without errors
- [ ] ESLint passes without errors
- [ ] Manual testing completed
- [ ] Documentation updated if needed
- [ ] Commit messages follow conventional format

### PR Template

Use our pull request template and include:

1. **Description**: What does this PR do?
2. **Type**: Feature, bug fix, documentation, etc.
3. **Testing**: How was this tested?
4. **Screenshots**: For UI changes
5. **Breaking Changes**: List any breaking changes
6. **Related Issues**: Link to related issues

### Review Process

1. **Automated Checks**: CI/CD pipeline runs automatically
2. **Code Review**: Maintainers will review your code
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, your PR will be merged

### After Merge

- **Delete Branch**: Clean up your feature branch
- **Update Local**: Pull the latest changes
- **Celebrate**: You're now a Gitgenix contributor! 🎉

---

## 🐛 Issue Guidelines

### Bug Reports

Use our [bug report template](.github/ISSUE_TEMPLATE/bug_report.md):

**Required Information:**

- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Screenshots or video if applicable

**Good Bug Report Example:**

```
Title: Pattern not saving on mobile Safari

Description: When creating a pattern on mobile Safari, clicking "Save Pattern"
doesn't save the pattern to local storage.

Steps to reproduce:
1. Open Gitgenix on iPhone Safari
2. Create a simple pattern
3. Click "Save Pattern"
4. Refresh the page
5. Pattern is lost

Expected: Pattern should be saved and persist after refresh
Actual: Pattern disappears after refresh

Browser: Safari 17.2 on iOS 17.2
Device: iPhone 14 Pro
```

### Feature Requests

Use our [feature request template](.github/ISSUE_TEMPLATE/feature_request.md):

**Required Information:**

- Problem you're trying to solve
- Proposed solution
- Alternative solutions considered
- Additional context

### Priority Labels

We use these labels to prioritize issues:

- `critical`: Security issues, major bugs affecting core functionality
- `high`: Important bugs, popular feature requests
- `medium`: Standard bugs and features
- `low`: Nice-to-have improvements

---

## 👥 Community

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions, ideas, and general discussion
- **Pull Requests**: Code review and collaboration

### Getting Help

- **New Contributor**: Look for "good first issue" labels
- **Stuck**: Ask questions in GitHub Discussions
- **Developer Reference**: Check our [Developer Reference](./DEVELOPER_REFERENCE.md)
- **Development**: Review [Development Setup](./DEVELOPMENT.md)

### Code of Conduct

We're committed to providing a welcoming and inclusive environment. Please:

- Be respectful and constructive in all interactions
- Help create a positive experience for everyone
- Report any unacceptable behavior to maintainers

### Recognition

Contributors are recognized in:

- **README**: Contributors section
- **Release Notes**: Major contributions highlighted
- **GitHub**: Contributors graph and activity

---

## 🎯 Contribution Ideas

### 🔰 Good First Issues

Perfect for new contributors:

- Fix typos in documentation
- Add missing TypeScript types
- Improve error messages
- Add accessibility attributes
- Update dependencies

### 🚀 Feature Ideas

- **Pattern Templates**: Pre-made patterns for common designs
- **Undo/Redo**: Edit history for pattern creation
- **Pattern Gallery**: Community pattern sharing
- **Mobile App**: React Native or PWA version
- **CLI Tool**: Command-line pattern generator
- **Pattern Editor**: Advanced editing tools (copy, paste, rotate)
- **Animation Preview**: Show how patterns will appear over time
- **Multi-format Export**: Export patterns as images, GIFs, etc.

### 🔧 Technical Improvements

- **Performance**: Optimize rendering for large patterns
- **Testing**: Add comprehensive test suite
- **Accessibility**: Improve screen reader support
- **SEO**: Enhance search engine optimization
- **Analytics**: Add privacy-friendly usage analytics
- **Offline Support**: PWA with offline capabilities

---

## 📚 Resources

### Project Documentation

- **[User Guide](./USER_GUIDE.md)**: Complete user documentation
- **[Development Setup](./DEVELOPMENT.md)**: Detailed dev environment setup
- **[Developer Reference](./DEVELOPER_REFERENCE.md)**: API docs and architecture overview
- **[Deployment](./DEPLOYMENT.md)**: Deployment and hosting guide

### External Resources

- **[Next.js Documentation](https://nextjs.org/docs)**
- **[React Documentation](https://react.dev)**
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)**
- **[Tailwind CSS](https://tailwindcss.com/docs)**
- **[Framer Motion](https://www.framer.com/motion/)**

### Tools and Extensions

- **VS Code Extensions**: TypeScript, Tailwind CSS IntelliSense, Prettier, ESLint
- **Browser Tools**: React Developer Tools, Lighthouse
- **Design**: Figma (for mockups), Excalidraw (for diagrams)

---

## ❓ Questions?

- **General Questions**: [GitHub Discussions](https://github.com/thesujalpatel/gitgenix/discussions)
- **Bug Reports**: [GitHub Issues](https://github.com/thesujalpatel/gitgenix/issues)
- **Feature Ideas**: [Feature Request Template](https://github.com/thesujalpatel/gitgenix/issues/new?template=feature_request.md)

**Thank you for contributing to Gitgenix!** 🎨✨

Every contribution, no matter how small, helps make GitHub contribution art creation better for everyone. We're excited to see what you'll build!

All new code should be written in TypeScript:

```typescript
// Good: Proper TypeScript with interfaces
interface PatternData {
  cells: Cell[];
  metadata: PatternMetadata;
}

const createPattern = (data: PatternData): Pattern => {
  // Implementation
};

// Avoid: Any types or missing type annotations
const createPattern = (data: any) => {
  // Implementation
};
```

#### Component Structure

```typescript
// Component template
import { memo } from "react";
import { motion } from "framer-motion";
import { getAnimationPreferences } from "../utils/performanceUtils";

interface ComponentProps {
  data: PatternData;
  onUpdate: (data: PatternData) => void;
  className?: string;
}

/**
 * Component description and usage
 */
export const Component = memo(
  ({ data, onUpdate, className }: ComponentProps) => {
    const animPrefs = getAnimationPreferences();

    return (
      <motion.div
        className={className}
        animate={!animPrefs.preferSimpleAnimations ? { scale: 1.02 } : {}}
        transition={{ duration: 0.2 }}
      >
        {/* Component content */}
      </motion.div>
    );
  }
);

Component.displayName = "Component";
```

#### Styling Guidelines

- **Tailwind CSS**: Use Tailwind for all styling
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Support both light and dark themes
- **Accessibility**: Follow WCAG 2.1 AA guidelines

```tsx
// Good: Responsive, accessible styling
<button
  className="
    px-4 py-2 
    bg-blue-500 hover:bg-blue-600 
    dark:bg-blue-600 dark:hover:bg-blue-700
    text-white font-medium
    rounded-md transition-colors
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  "
  aria-label="Save pattern"
>
  Save Pattern
</button>
```

### Performance Guidelines

#### Animation Optimization

Always respect user preferences for reduced motion:

```typescript
import { getAnimationPreferences } from '../utils/performanceUtils';

const animPrefs = getAnimationPreferences();

// Good: Conditional animations
<motion.div
  animate={!animPrefs.preferSimpleAnimations ? {
    scale: [1, 1.05, 1],
    transition: { duration: 0.3 }
  } : {}}
>
```

#### Component Optimization

- Use `memo()` for expensive components
- Implement proper dependency arrays for hooks
- Avoid unnecessary re-renders

```typescript
// Good: Memoized component with proper dependencies
const ExpensiveComponent = memo(({ data, onUpdate }: Props) => {
  const processedData = useMemo(() => {
    return expensiveProcessing(data);
  }, [data]);

  const handleUpdate = useCallback(
    (newData: Data) => {
      onUpdate(newData);
    },
    [onUpdate]
  );

  return <div>{/* Component */}</div>;
});
```

### Accessibility Requirements

#### Keyboard Navigation

All interactive elements must be keyboard accessible:

```tsx
// Good: Keyboard navigation support
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  }}
  onClick={handleClick}
>
  Interactive Element
</div>
```

#### Screen Reader Support

```tsx
// Good: Proper ARIA labels and descriptions
<div
  role="grid"
  aria-label="Contribution pattern designer"
  aria-describedby="grid-instructions"
>
  <div id="grid-instructions" className="sr-only">
    Use arrow keys to navigate, space to toggle cell intensity
  </div>
  {/* Grid content */}
</div>
```

---

## Testing

### Testing Strategy

We use a multi-layered testing approach:

1. **Unit Tests**: Test individual functions and components
2. **Integration Tests**: Test component interactions
3. **E2E Tests**: Test complete user workflows
4. **Manual Testing**: Cross-browser and device testing

### Manual Testing Checklist

Before submitting a PR, test:

#### Core Functionality

- [ ] Pattern creation and editing
- [ ] Script generation and download
- [ ] Pattern import/export
- [ ] Pattern sharing (if Firebase configured)

#### Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

#### Device Testing

- [ ] Desktop (1920x1080+)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667, 414x896)

#### Accessibility Testing

- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] High contrast mode
- [ ] Reduced motion preference

#### Performance Testing

- [ ] Page load times
- [ ] Animation smoothness
- [ ] Memory usage
- [ ] Mobile performance

### Running Tests

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build for production (checks for build errors)
npm run build

# Run in development mode for manual testing
npm run dev
```

---

## Pull Request Process

### Before Submitting

1. **Test Thoroughly**: Complete the testing checklist
2. **Update Documentation**: Update relevant docs if needed
3. **Check Accessibility**: Ensure WCAG 2.1 AA compliance
4. **Performance**: Verify no performance regressions

### PR Template

When creating a PR, include:

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

## Testing

- [ ] Manual testing completed
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] Accessibility testing

## Screenshots

Include screenshots for UI changes

## Checklist

- [ ] Code follows project conventions
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors or warnings
```

### Review Process

1. **Automated Checks**: Build and type checking must pass
2. **Code Review**: At least one maintainer review required
3. **Testing**: Manual testing by reviewers
4. **Approval**: Changes approved by maintainers
5. **Merge**: Squash and merge to main branch

---

## Issue Guidelines

### Bug Reports

Use the bug report template and include:

- **Clear Description**: What went wrong?
- **Steps to Reproduce**: Detailed reproduction steps
- **Expected Behavior**: What should happen?
- **Screenshots**: Visual evidence of the issue
- **Environment**: Browser, device, OS version
- **Console Errors**: Any JavaScript errors

### Feature Requests

Use the feature request template and include:

- **Problem Statement**: What problem does this solve?
- **Proposed Solution**: Your suggested approach
- **Alternatives**: Other solutions considered
- **Use Cases**: How would this be used?
- **Implementation Ideas**: Technical considerations

### Questions and Discussions

For questions, use [GitHub Discussions](https://github.com/thesujalpatel/gitgenix/discussions):

- **Q&A**: General questions about usage
- **Ideas**: Brainstorming new features
- **Show and Tell**: Share your contribution art
- **General**: Other project-related discussions

---

## Recognition

### Contributors

All contributors are recognized in our:

- **README**: Contributors section
- **About Page**: In-app contributor recognition
- **Release Notes**: Acknowledgment in changelogs

### Types of Contributions

We value all types of contributions:

- 💻 **Code**: Features, fixes, optimizations
- 📖 **Documentation**: Guides, examples, API docs
- 🎨 **Design**: UI/UX improvements, graphics
- 🐛 **Testing**: Bug reports, test cases
- 💡 **Ideas**: Feature suggestions, feedback
- 🌍 **Community**: Helping users, discussions

---

## Getting Help

### Development Help

- **Documentation**: Check our [Development Guide](./DEVELOPMENT.md)
- **Developer Reference**: Review our [Developer Reference](./DEVELOPER_REFERENCE.md)
- **Discussions**: Ask in [GitHub Discussions](https://github.com/thesujalpatel/gitgenix/discussions)

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and community
- **Pull Requests**: Code review and feedback

### Maintainer Response Times

We aim to respond to:

- **Security Issues**: Within 24 hours
- **Bug Reports**: Within 3-5 days
- **Feature Requests**: Within 1 week
- **Pull Requests**: Within 1 week

---

## License

By contributing to Gitgenix, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Gitgenix!** 🎉

Your contributions help make GitHub contribution art accessible to everyone. Whether you're fixing a bug, adding a feature, or improving documentation, every contribution matters.

**Questions?** Feel free to ask in [GitHub Discussions](https://github.com/thesujalpatel/gitgenix/discussions) or create an issue!
