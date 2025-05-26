# 🤝 Contributing to Gitgenix

Thank you for your interest in contributing to Gitgenix! This guide will help you get started with contributing to our GitHub contribution art creator.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Workflow](#contributing-workflow)
- [Development Guidelines](#development-guidelines)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](../CODE_OF_CONDUCT.md). Please read it before contributing.

### Our Pledge

We are committed to making participation in our project a harassment-free experience for everyone, regardless of:

- Age, body size, disability, ethnicity, gender identity and expression
- Level of experience, education, socio-economic status
- Nationality, personal appearance, race, religion
- Sexual identity and orientation

---

## Getting Started

### Ways to Contribute

- 🐛 **Bug Reports**: Help us identify and fix issues
- ✨ **Feature Requests**: Suggest new features and improvements
- 📝 **Documentation**: Improve guides, API docs, and examples
- 🎨 **UI/UX**: Enhance user interface and experience
- 🧪 **Testing**: Write tests and improve test coverage
- 🔧 **Code**: Implement features, fix bugs, optimize performance
- 🌍 **Community**: Help other users, answer questions

### Before You Start

1. **Check Existing Issues**: Look for existing issues or discussions
2. **Read Documentation**: Familiarize yourself with the project
3. **Understand the Architecture**: Review our [Architecture Guide](./ARCHITECTURE.md)
4. **Set Up Development Environment**: Follow our [Development Setup](./DEVELOPMENT.md)

---

## Development Setup

### Prerequisites

- **Node.js 18+** and npm
- **Git** for version control
- **VS Code** (recommended) with suggested extensions
- **Firebase Account** for cloud features (optional for basic development)

### Quick Setup

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/gitgenix.git
cd gitgenix

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Start development server
npm run dev

# 5. Open browser at http://localhost:3000
```

### Environment Configuration

Create `.env.local` with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

**Note**: Firebase is optional for basic development. Many features work without it.

---

## Contributing Workflow

### 1. Create an Issue

Before starting work, create an issue to discuss:

- **Bug Reports**: Use the bug report template
- **Feature Requests**: Use the feature request template
- **Questions**: Use GitHub Discussions

### 2. Fork and Branch

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/gitgenix.git
cd gitgenix

# Create a feature branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 3. Develop and Test

```bash
# Start development server
npm run dev

# Run type checking
npm run type-check

# Run linting
npm run lint

# Build for production
npm run build
```

### 4. Commit Your Changes

We use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Examples of good commit messages
git commit -m "feat: add pattern rotation feature"
git commit -m "fix: resolve mobile touch sensitivity issue"
git commit -m "docs: update user guide with new features"
git commit -m "refactor: optimize contribution graph rendering"
```

#### Commit Types

- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### 5. Push and Create Pull Request

```bash
# Push your branch
git push origin feature/your-feature-name

# Create a Pull Request on GitHub
```

---

## Development Guidelines

### Code Style

#### TypeScript

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
- **Architecture**: Review our [Architecture Guide](./ARCHITECTURE.md)
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
