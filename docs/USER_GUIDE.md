# 📖 Complete User Guide

Your comprehensive guide to creating stunning GitHub contribution art with Gitgenix! Transform your GitHub profile into a canvas for pixel art and creative expression.

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [🚀 Getting Started](#-getting-started)
- [🎨 Creating Patterns](#-creating-patterns)
- [⚙️ Advanced Features](#️-advanced-features)
- [📤 Sharing & Export](#-sharing--export)
- [🛠️ Repository Setup](#️-repository-setup)
- [💡 Best Practices](#-best-practices)
- [🆘 Troubleshooting](#-troubleshooting)
- [❓ FAQ](#-faq)

---

## 🎯 Overview

Gitgenix is a powerful web application that transforms your GitHub contribution graph into a canvas for creating stunning pixel art, text, and complex designs. Whether you want to spell out your name, create beautiful patterns, or design intricate artwork, Gitgenix makes it simple and fun.

### ✨ Key Features

- **🎨 Visual Pattern Designer**: Intuitive grid-based drawing interface
- **📊 Custom Contribution Limits**: Adjust intensity levels to match your profile
- **📜 Smart Script Generation**: Automated bash script creation with repository detection
- **🔗 Pattern Sharing**: Share your creations with the community
- **📅 Multi-Year Support**: Create patterns spanning multiple years
- **💾 JSON Export/Import**: Save and restore your work

### How It Works

1. **Design** your pattern using the visual grid interface
2. **Configure** repository settings and contribution intensity
3. **Generate** a custom shell script tailored to your design
4. **Execute** the script to create precisely timed commits
5. **Enjoy** your beautiful contribution art on GitHub! 🎉

### Quick Start

New to Gitgenix? Check our [Quick Start Guide](./QUICK_START.md) for a 5-minute setup walkthrough!

---

## 🚀 Getting Started

### Prerequisites

- ✅ Active GitHub account
- ✅ Git installed and configured locally
- ✅ Basic command line knowledge
- ✅ A public GitHub repository (or willingness to create one)
- ⭐ Creative inspiration!

### First Steps

1. **Visit Gitgenix**: Navigate to [gitgenix.netlify.app](https://gitgenix.netlify.app)
2. **Explore the Interface**: Familiarize yourself with the navigation
3. **Access the Draw Page**: Click "Draw" to start creating your first pattern
4. **Read This Guide**: Understanding the features will help you create better art

---

## 🎨 Creating Patterns

### Understanding the Grid Interface

The drawing canvas is your main workspace, representing GitHub's contribution calendar. Each cell corresponds to a single day and can be set to different contribution intensities.

#### 🖱️ Drawing Tools

| Action           | Function   | Description                                |
| ---------------- | ---------- | ------------------------------------------ |
| **Single Click** | Fill Cell  | Set individual cells to selected intensity |
| **Click & Drag** | Paint Mode | Fill multiple cells quickly                |
| **Right Click**  | Clear Cell | Reset cells to zero intensity              |

#### 🎨 Intensity Levels

Gitgenix uses 5 intensity levels that map to GitHub's contribution colors:

| Level | Appearance    | Default Commits | Visual Result            |
| ----- | ------------- | --------------- | ------------------------ |
| **0** | Gray          | 0 commits       | No contribution (empty)  |
| **1** | Light Green   | 10 commits      | Light contribution shade |
| **2** | Medium Green  | 20 commits      | Medium-light shade       |
| **3** | Dark Green    | 30 commits      | Medium-dark shade        |
| **4** | Darkest Green | 40 commits      | Maximum intensity        |

### 📊 Custom Contribution Limits (Advanced)

For optimal visual results, you can customize commit counts based on your existing GitHub activity:

#### How to Find Your Ideal Settings

1. **Visit your GitHub profile** and examine your contribution graph
2. **Hover over active squares** to see contribution counts
3. **Note your typical range** (e.g., 2-15 contributions per active day)
4. **Set custom limits** in Gitgenix to match your profile's natural rhythm

#### Configuration Options

- **Minimum Commits**: Sets the count for Level 1 (recommended: your lowest active day)
- **Maximum Commits**: Sets the count for Level 4 (recommended: your highest typical day)
- **Auto-scaling**: Levels 2 and 3 are automatically calculated for smooth gradients

> **💡 Pro Tip**: Using custom limits ensures your art blends naturally with your existing contributions!

### 📅 Year Selection & Multi-Year Patterns

#### Single Year Mode

- Perfect for beginners or simple patterns
- Choose any year for your pattern placement
- Ideal for text and basic shapes

#### Multi-Year Mode

- Create expansive artwork spanning multiple years
- Copy patterns across years for consistency
- Build complex animations or large-scale designs

### 🎯 Pattern Planning Tips

#### Start Simple

- Begin with text (your name, initials, or short words)
- Try basic shapes (hearts, arrows, geometric patterns)
- Practice with single-year patterns first

#### Design Considerations

- **Readability**: Ensure patterns are clear at GitHub's scale
- **Proportions**: Consider GitHub's week-by-week layout
- **Timing**: Plan around your existing contribution activity

### 🔧 Drawing Interface Features

#### Toolbar Functions

- **Intensity Selector**: Choose your current drawing level (0-4)
- **Clear Options**:
  - Clear entire pattern
  - Clear specific years
  - Clear by intensity level
- **Real-time Preview**: See exactly how your pattern will appear

---

## ⚙️ Advanced Features

### 🎯 Smart Script Generation

Gitgenix automatically generates optimized shell scripts tailored to your pattern and system configuration.

#### Script Features

- **Repository Detection**: Automatically detects if your repository exists
- **GitHub CLI Integration**: Uses `gh` command for seamless repository creation
- **Git Configuration**: Validates your git setup before execution
- **Date Precision**: Creates commits with exact timestamps for perfect pattern alignment
- **Error Handling**: Built-in checks and fallbacks for common issues

#### Generated Script Contents

```bash
# Repository setup and validation
# Git configuration verification
# Precise commit creation with custom dates
# Automatic pushing to GitHub
# Success confirmation and cleanup
```

### 📊 Repository Configuration

#### Required Settings

- **GitHub Username**: Your exact GitHub username (case-sensitive)
- **Repository Name**: Target repository for your pattern
- **Branch Name**: Usually "main" or "master" (default: "main")

#### Advanced Options

- **Start Date**: When your pattern should begin appearing
- **Custom Commit Messages**: Personalize your commit history
- **Force Push Options**: Handle existing repositories safely

### 🔄 Multi-Year Workflow

#### Planning Multi-Year Patterns

1. **Design Phase**: Create your pattern across multiple years
2. **Timeline Planning**: Consider when each year should be active
3. **Execution Strategy**: Run scripts in chronological order
4. **Verification**: Check each year's completion before proceeding

#### Best Practices for Large Patterns

- **Break into segments**: Handle one year at a time
- **Test first**: Use a small pattern to verify your setup
- **Backup regularly**: Save your work frequently
- **Monitor progress**: Watch for GitHub sync delays

### 🎨 Pattern Optimization

#### Visual Enhancement Tips

- **Contrast Management**: Use varied intensity levels for depth
- **Spacing Techniques**: Strategic empty spaces improve readability
- **Color Flow**: Plan intensity transitions for smooth gradients
- **Scale Awareness**: Consider how patterns appear at different zoom levels

#### Performance Considerations

- **Large Patterns**: May take 10-30 minutes to execute
- **Commit Volume**: High-intensity patterns create more commits
- **Network Impact**: Large scripts require stable internet connection
- **GitHub Limits**: Be aware of API rate limits for repository operations

---

## 📤 Sharing & Export

### 💾 Save & Load Patterns

#### Local Storage

- **Auto-save**: Patterns automatically save to your browser
- **Manual Save**: Create named saves for pattern collections
- **Quick Load**: Access recently created patterns instantly

#### JSON Export/Import

```json
{
  "pattern": "your-pattern-data",
  "metadata": {
    "name": "My Awesome Pattern",
    "created": "2025-05-30",
    "intensity_levels": [0, 1, 2, 3, 4],
    "years": [2024, 2025]
  }
}
```

#### Export Options

- **Pattern Data**: Complete pattern information in JSON format
- **Configuration**: Include repository and intensity settings
- **Backup Package**: Everything needed to recreate your pattern

### 🔗 Sharing Features

#### Share URLs

- **Generate Links**: Create shareable URLs for your patterns
- **Public Gallery**: Submit patterns to the community showcase
- **Social Media**: Export pattern previews as images

#### Community Integration

- **Pattern Gallery**: Browse community-created designs
- **Voting System**: Rate and favorite popular patterns
- **Creator Profiles**: Follow your favorite pattern artists
- **Trending Patterns**: Discover what's popular in the community

### 📱 Cross-Platform Access

#### Device Compatibility

- **Desktop**: Full-featured experience on Windows, Mac, Linux
- **Mobile**: Touch-optimized interface for phones and tablets
- **Browser Support**: Works on Chrome, Firefox, Safari, Edge
- **Offline Mode**: Continue working without internet connection

---

## 🛠️ Repository Setup

### 📂 Creating Your Repository

#### Method 1: GitHub Web Interface

1. **Navigate to GitHub**: Go to [github.com](https://github.com)
2. **Create New Repository**: Click the "+" icon → "New repository"
3. **Configure Settings**:
   - Name: `contribution-art` (or your preferred name)
   - Visibility: **Public** (required for contribution counting)
   - Initialize: Optional README, .gitignore, license
4. **Create Repository**: Complete the setup

#### Method 2: GitHub CLI (Recommended)

```bash
# Install GitHub CLI if not already installed
# Then create repository directly from command line
gh repo create contribution-art --public --description "My GitHub contribution art"
```

#### Method 3: Automatic Creation

- **Let Gitgenix handle it**: Generated scripts can create repositories automatically
- **GitHub CLI Required**: Must have `gh` installed and authenticated
- **Fallback Instructions**: Manual steps provided if auto-creation fails

### ⚙️ Git Configuration

#### Essential Setup

```bash
# Verify your git configuration
git config --global user.name "Your GitHub Username"
git config --global user.email "your-github-email@example.com"

# Check current configuration
git config --list
```

#### Critical Requirements

- **Email Match**: Must use the email associated with your GitHub account
- **Username Accuracy**: Case-sensitive matching with GitHub profile
- **SSH/HTTPS**: Either authentication method works
- **Repository Access**: Ensure you have push permissions

#### Troubleshooting Configuration

```bash
# Test your git setup
git clone https://github.com/yourusername/contribution-art.git
cd contribution-art
git commit --allow-empty -m "Test commit"
git push origin main
```

### 🔐 Authentication Setup

#### HTTPS Authentication

- **Personal Access Tokens**: Recommended for security
- **Token Permissions**: Ensure `repo` scope is enabled
- **Storage**: Use git credential manager for convenience

#### SSH Authentication

- **Key Generation**: Create SSH key pair if needed
- **GitHub Registration**: Add public key to GitHub account
- **Testing**: Verify connection with `ssh -T git@github.com`

---

## 💡 Best Practices

### 🎨 Design Guidelines

#### Pattern Readability

- **Size Matters**: Larger patterns are more visible and impactful
- **Contrast Usage**: Mix different intensity levels for depth
- **White Space**: Strategic empty areas improve overall readability
- **Testing**: Preview patterns at different zoom levels

#### Content Recommendations

- **Personal Branding**: Your name, initials, or professional title
- **Motivational Text**: Inspiring words or phrases
- **Geometric Art**: Patterns, shapes, and abstract designs
- **Seasonal Themes**: Holiday-appropriate designs
- **Programming Humor**: Code-related jokes or symbols

### ⏰ Timing Strategy

#### Optimal Scheduling

- **Plan Ahead**: Start patterns well before target appearance dates
- **Existing Activity**: Consider your current contribution patterns
- **Visibility Windows**: Plan for when your profile gets most views
- **Maintenance Mode**: Account for breaks in your regular activity

#### Execution Timing

- **Off-Peak Hours**: Run scripts during low-traffic times
- **Stable Connection**: Ensure reliable internet for large patterns
- **Progress Monitoring**: Check GitHub sync status regularly
- **Backup Strategy**: Save work before major script executions

### 🔧 Technical Best Practices

#### Script Management

- **Test Environment**: Use a test repository for initial runs
- **Incremental Execution**: Break large patterns into smaller segments
- **Error Recovery**: Keep logs of script execution for troubleshooting
- **Version Control**: Track different versions of your patterns

#### Performance Optimization

- **Pattern Complexity**: Balance detail with execution time
- **Intensity Distribution**: Avoid excessive high-intensity areas
- **Year Segmentation**: Handle multi-year patterns systematically
- **Resource Monitoring**: Watch system resources during execution

### 🛡️ Safety Guidelines

#### Repository Safety

- **Backup First**: Always backup important repositories before running scripts
- **Dedicated Repos**: Use separate repositories for contribution art
- **Public Visibility**: Ensure repositories remain public for counting
- **Regular Verification**: Check that patterns appear correctly on GitHub

#### Account Security

- **Token Management**: Regularly rotate personal access tokens
- **Permission Limits**: Use minimal required permissions
- **Activity Monitoring**: Watch for unexpected account activity
- **Recovery Planning**: Know how to restore if something goes wrong

---

## 🆘 Troubleshooting

### 🚫 Pattern Not Appearing on GitHub

#### Common Causes & Solutions

**Repository Not Public**

- ✅ **Solution**: Change repository visibility to Public in GitHub settings
- 🔍 **Check**: Go to your repository → Settings → Change visibility

**Email Mismatch**

- ✅ **Solution**: Verify git email matches your GitHub account email
- 🔍 **Check**: Run `git config user.email` and compare with GitHub profile

**GitHub Sync Delay**

- ✅ **Solution**: Wait 5-10 minutes, then refresh your GitHub profile
- 🔍 **Check**: GitHub's contribution graph updates periodically

**Incorrect Date Range**

- ✅ **Solution**: Verify your start date and pattern timeline
- 🔍 **Check**: Ensure dates fall within the visible contribution graph period

### ⚡ Script Execution Errors

#### Permission Issues (Unix/Linux/Mac)

```bash
# Fix script permissions
chmod +x gitgenix.sh
./gitgenix.sh
```

#### Git Configuration Errors

```bash
# Reconfigure git with correct details
git config --global user.name "Your Exact GitHub Username"
git config --global user.email "your-github-email@example.com"

# Verify configuration
git config --list | grep user
```

#### Repository Access Issues

- **Authentication**: Ensure your credentials are valid and current
- **Permissions**: Verify you have push access to the target repository
- **Network**: Check internet connection stability
- **GitHub Status**: Verify GitHub services are operational

### 🐛 Application Issues

#### Performance Problems

- **Browser Cache**: Clear browser cache and reload Gitgenix
- **Memory Usage**: Close unnecessary browser tabs and applications
- **Pattern Complexity**: Reduce pattern size or detail temporarily
- **Browser Choice**: Try a different browser (Chrome recommended)

#### Interface Problems

- **Zoom Level**: Reset browser zoom to 100%
- **Screen Resolution**: Ensure adequate screen size for interface
- **JavaScript**: Verify JavaScript is enabled in browser settings
- **Extensions**: Disable browser extensions that might interfere

#### Data Loss Prevention

- **Regular Saves**: Use the save feature frequently while designing
- **Export Backups**: Create JSON exports of important patterns
- **Browser Storage**: Understand that clearing browser data removes saves
- **Multiple Devices**: Sync patterns across devices using export/import

### 🔧 Advanced Troubleshooting

#### Debug Mode

- **Browser DevTools**: Use F12 to access developer console
- **Error Messages**: Note any JavaScript errors or warnings
- **Network Tab**: Check for failed API requests
- **Console Logs**: Look for Gitgenix-specific error messages

#### Community Support

- **GitHub Issues**: Report bugs on the Gitgenix repository
- **Community Forum**: Ask questions and share solutions
- **Documentation**: Reference the complete documentation set
- **FAQ Section**: Check frequently asked questions below

---

## ❓ FAQ

### General Questions

**Q: Is Gitgenix free to use?**
A: Yes! Gitgenix is completely free and open-source.

**Q: Will this affect my real GitHub contributions?**
A: The commits are real and will appear on your profile, but they're contained in a separate repository specifically for art.

**Q: Can I use this for professional profiles?**
A: Consider your audience. Some employers appreciate creativity, while others prefer clean contribution graphs.

**Q: How long do patterns take to appear?**
A: Usually 5-10 minutes after script execution, but can take up to an hour during high GitHub traffic.

### Technical Questions

**Q: What if I make a mistake in my pattern?**
A: You can create a new pattern to overwrite the old one, or manually edit commits in your repository.

**Q: Can I delete contribution art later?**
A: Yes, delete the repository to remove all associated contributions from your graph.

**Q: Does this work on GitHub Enterprise?**
A: Gitgenix is designed for github.com. Enterprise compatibility depends on your organization's configuration.

**Q: Can I create patterns spanning multiple years?**
A: Absolutely! Use the multi-year feature to create expansive artwork.

### Pattern Design Questions

**Q: What's the best pattern size?**
A: Start with simple text or small shapes. Larger patterns are more visible but take longer to execute.

**Q: How do I choose the right intensity levels?**
A: Check your existing GitHub activity and set custom commit limits to match your typical contribution range.

**Q: Can I animate my patterns?**
A: While GitHub doesn't support animation, you can create patterns that suggest movement or progression over time.

**Q: What file formats can I export?**
A: Patterns export as JSON files containing all pattern data and configuration settings.

### Script & Execution Questions

**Q: Why won't my script run on Windows?**
A: You may need to change PowerShell execution policy. Run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

**Q: The script created commits but they don't show on GitHub. Why?**
A: Ensure your repository is public and your git email matches your GitHub account email exactly.

**Q: How long does script execution take?**
A: Simple patterns: 1-5 minutes. Complex patterns: 10-30 minutes. Very large patterns: 30+ minutes.

**Q: Can I stop a script while it's running?**
A: Yes, use Ctrl+C (Windows/Linux) or Cmd+C (Mac) to interrupt execution.

### Need More Help?

If you can't find the answer to your question:

- 📖 Check our [Quick Start Guide](./QUICK_START.md) for basics
- 🔧 Review [Development Documentation](./DEVELOPMENT.md) for technical details
- 🤝 Visit [Contributing Guidelines](./CONTRIBUTING.md) to help improve Gitgenix
- 🐛 Report issues on our [GitHub repository](https://github.com/thesujalpatel/gitgenix)
- 💬 Join discussions in our [Community Forum](https://github.com/thesujalpatel/gitgenix/discussions)

---

_Happy pattern creating! 🎨✨_

> **Remember**: Gitgenix is about creative expression and having fun with your GitHub profile. Experiment, share your creations, and inspire others in the community!
