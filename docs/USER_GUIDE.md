# 📖 Gitgenix User Guide

Welcome to the complete user guide for Gitgenix! This guide will walk you through every feature and help you create amazing GitHub contribution art.

## Table of Contents

- [Getting Started](#getting-started)
- [Creating Your First Pattern](#creating-your-first-pattern)
- [Advanced Features](#advanced-features)
- [Pattern Sharing](#pattern-sharing)
- [Export & Import](#export--import)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Getting Started

### What You'll Need

- A GitHub account
- A repository where you want to create the contribution art
- Basic understanding of Git commands

### Accessing Gitgenix

1. Visit [https://gitgenix-contrib.netlify.app](https://gitgenix-contrib.netlify.app)
2. Click "Get Started" or navigate to the Draw page
3. Take the optional onboarding tour for first-time users

---

## Creating Your First Pattern

### Step 1: Configure Your Setup

1. **Select Years**: Choose which years to include in your pattern

   - You can create patterns spanning multiple years
   - Consider years with minimal existing contributions for best results

2. **GitHub Details**: Enter your repository information

   - **Username**: Your GitHub username
   - **Repository**: Name of the repository (must exist)
   - **Branch**: Target branch (usually 'main' or 'master')

3. **Repository Validation**: The app automatically verifies your repository exists

### Step 2: Understanding Intensity Levels

Gitgenix uses 5 intensity levels that correspond to contribution frequencies:

| Level | Color         | Commits Per Day | Description       |
| ----- | ------------- | --------------- | ----------------- |
| 0     | Gray          | 0 commits       | No contributions  |
| 1     | Light Green   | 10 commits      | Light activity    |
| 2     | Medium Green  | 20 commits      | Moderate activity |
| 3     | Dark Green    | 30 commits      | High activity     |
| 4     | Darkest Green | 40 commits      | Maximum activity  |

### Step 3: Design Your Pattern

#### Basic Drawing

- **Click**: Set individual cells to the selected intensity
- **Drag**: Paint multiple cells at once
- **Touch Support**: Full mobile and tablet support

#### Advanced Tools

- **Intensity Selector**: Choose your painting intensity (0-4)
- **Clear Functions**:
  - Clear specific years
  - Clear entire pattern
  - Clear selected intensity level
- **Real-time Preview**: See your pattern as you create it

### Step 4: Generate Your Script

1. Click "Generate Script" when your pattern is complete
2. The app creates a custom shell script with precise Git commands
3. Download the script to your computer

### Step 5: Apply to GitHub

#### Windows (PowerShell)

```powershell
# Navigate to your repository
cd path\to\your\repository

# Make sure you're on the correct branch
git checkout main

# Run the script
.\gitgenix.ps1

# Push changes to GitHub
git push origin main
```

#### macOS/Linux (Bash)

```bash
# Navigate to your repository
cd /path/to/your/repository

# Make sure you're on the correct branch
git checkout main

# Make script executable
chmod +x gitgenix.sh

# Run the script
./gitgenix.sh

# Push changes to GitHub
git push origin main
```

---

## Advanced Features

### Multi-Year Patterns

Create patterns that span multiple years:

1. **Year Selection**: Use the year selector to choose multiple years
2. **Seamless Design**: Design across year boundaries
3. **Consistent Patterns**: Maintain pattern consistency across years

### Pattern Variations

#### Text Patterns

- Create letters, words, or messages
- Use high contrast (levels 0 and 4) for clear text

#### Artistic Patterns

- Geometric shapes and designs
- Gradients using different intensity levels
- Seasonal themes and holiday patterns

#### Programming Themes

- Code-related symbols (< >, { }, etc.)
- Programming language logos
- Binary patterns

### Performance Features

#### Accessibility

- **Reduced Motion**: Automatically detects user preference
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Compatible with assistive technologies

#### Mobile Optimization

- **Touch Gestures**: Optimized for touch devices
- **Responsive Design**: Adapts to all screen sizes
- **Performance**: Smooth on low-end devices

---

## Pattern Sharing

### Saving to Cloud

1. **Name Your Pattern**: Give your creation a descriptive name
2. **Save Online**: Click "Save Pattern" to store in Firebase
3. **Get Share Link**: Receive a unique URL for sharing

### Sharing with Others

1. **Copy Link**: Share the generated URL
2. **Social Media**: Post your pattern link on social platforms
3. **Community**: Share in GitHub discussions or forums

### Importing Shared Patterns

1. **Click Share Link**: Open any shared pattern URL
2. **Auto-Import**: Pattern loads automatically
3. **Customize**: Modify the pattern for your repository
4. **Generate**: Create your custom script

---

## Export & Import

### JSON Export

Export patterns for backup or sharing:

```json
{
  "gitgenix": {
    "version": "1.0.0",
    "metadata": {
      "username": "your-username",
      "repository": "your-repo",
      "branch": "main",
      "exportDate": "2025-05-27",
      "creator": "Pattern Creator"
    },
    "graphs": [
      // Pattern data...
    ]
  }
}
```

### Import Methods

#### Drag & Drop

1. Drag a JSON file onto the application
2. Pattern loads automatically
3. Verify repository settings

#### File Upload

1. Click "Import Pattern"
2. Select JSON file from your device
3. Confirm import settings

### Cross-Device Usage

- **Backup**: Export patterns before switching devices
- **Sync**: Use cloud sharing for real-time sync
- **Collaboration**: Share JSON files with team members

---

## Best Practices

### Repository Setup

#### Dedicated Repository

- Create a repository specifically for contribution art
- Keep it separate from actual projects
- Use descriptive repository names

#### Repository Settings

- **Public**: Make repository public for contributions to appear
- **Clean History**: Start with minimal commit history
- **Branch Strategy**: Use main/master branch consistently

### Pattern Design Tips

#### High Contrast

- Mix intensity levels 0 and 4 for maximum impact
- Use level 2 for subtle details
- Avoid using only mid-range levels

#### Year Selection

- **Clean Years**: Target years with few existing contributions
- **Recent Years**: More recent years are more visible
- **Future Planning**: Plan patterns for upcoming years

#### Testing Patterns

- **Start Small**: Begin with simple patterns
- **Test Repository**: Use a test repository first
- **Verify Results**: Check GitHub after pushing

### Performance Tips

#### Large Patterns

- Break complex patterns into sections
- Use progressive enhancement
- Consider mobile users

#### Browser Performance

- Close unnecessary tabs
- Use updated browsers
- Enable hardware acceleration

---

## Troubleshooting

### Common Issues

#### Repository Validation Fails

**Problem**: "Repository not found" error

**Solutions**:

- Verify GitHub username is correct
- Check repository name spelling
- Ensure repository exists and is accessible
- For private repos, check access permissions

#### Pattern Not Visible on GitHub

**Problem**: Contribution art doesn't appear after running script

**Solutions**:

- **Wait**: GitHub can take up to 24 hours to update
- **Public Repository**: Ensure repository is public
- **Commit History**: Verify commits were created successfully
- **Date Range**: Check that commits are within GitHub's display range
- **Contrast**: Use higher contrast intensity levels

#### Script Execution Fails

**Problem**: Shell script won't run or produces errors

**Solutions**:

- **Permissions**: Make script executable (`chmod +x` on macOS/Linux)
- **Repository Path**: Run script from within your repository directory
- **Git Status**: Ensure repository is clean before running
- **Branch**: Verify you're on the correct branch

#### Mobile/Touch Issues

**Problem**: Difficulty using on mobile devices

**Solutions**:

- **Zoom**: Use browser zoom for precise control
- **Orientation**: Try landscape mode for larger patterns
- **Stylus**: Use a stylus for fine detail work
- **Reduced Motion**: Enable in device settings if animations lag

### Performance Issues

#### Slow Performance

**Solutions**:

- **Reduce Motion**: Enable in browser/device settings
- **Close Tabs**: Free up browser memory
- **Update Browser**: Use latest browser version
- **Device Memory**: Close other applications

#### Animation Issues

**Solutions**:

- **Browser Settings**: Check hardware acceleration
- **Reduced Motion**: Enable reduced motion preference
- **Device Capabilities**: Use simpler patterns on older devices

### Data Issues

#### Import/Export Problems

**Problem**: JSON files won't import or export

**Solutions**:

- **File Format**: Ensure JSON file is valid
- **File Size**: Large patterns may take time to process
- **Browser Storage**: Clear browser cache if needed
- **File Permissions**: Check file access permissions

#### Pattern Corruption

**Problem**: Pattern appears broken or incomplete

**Solutions**:

- **Refresh**: Try refreshing the browser
- **Re-import**: Import pattern again
- **Browser Storage**: Clear local storage
- **Backup**: Use exported JSON files as backup

### Getting Help

If you're still experiencing issues:

1. **Check FAQ**: Review common questions and solutions
2. **GitHub Issues**: Report bugs on our GitHub repository
3. **Discussions**: Ask questions in GitHub Discussions
4. **Documentation**: Review the complete documentation

---

## Tips for Success

### Creative Ideas

- **Seasonal Themes**: Christmas trees, Halloween pumpkins
- **Personal Branding**: Your initials or logo
- **Programming Symbols**: Code brackets, arrows, symbols
- **Pixel Art**: Simple 8-bit style graphics
- **Messages**: "HIRE ME", "HELLO WORLD", etc.

### Community Sharing

- **Show Off**: Share your creations on social media
- **Inspire Others**: Post patterns in community forums
- **Collaborate**: Work with others on complex patterns
- **Document Process**: Share your creation process

### Long-term Planning

- **Annual Themes**: Plan yearly contribution themes
- **Career Milestones**: Mark important career events
- **Learning Journey**: Document your learning progress
- **Portfolio Enhancement**: Make your GitHub profile stand out

---

**Need more help?** Check our [FAQ](./FAQ.md) or visit the [GitHub Discussions](https://github.com/thesujalpatel/gitgenix/discussions) for community support!
