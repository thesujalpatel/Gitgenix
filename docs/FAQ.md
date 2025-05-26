# ❓ Frequently Asked Questions

Common questions and answers about Gitgenix, the GitHub contribution art creator.

## Table of Contents

- [General Questions](#general-questions)
- [Usage Questions](#usage-questions)
- [Technical Questions](#technical-questions)
- [Troubleshooting](#troubleshooting)
- [Contributing Questions](#contributing-questions)

---

## General Questions

### What is Gitgenix?

Gitgenix is a web application that allows you to create beautiful art on your GitHub contribution graph. You design patterns using a visual editor, and the app generates a shell script that creates the exact number of commits needed to display your art on GitHub.

### Is Gitgenix free to use?

Yes, Gitgenix is completely free and open source. You can use it without any limitations, and the source code is available on GitHub under the MIT license.

### Do I need to install anything?

No installation required! Gitgenix runs entirely in your web browser. Just visit [https://gitgenix-contrib.netlify.app](https://gitgenix-contrib.netlify.app) and start creating.

### How does it work?

1. **Design**: Create patterns on the visual contribution grid
2. **Configure**: Enter your GitHub repository details
3. **Generate**: Download a custom shell script
4. **Apply**: Run the script in your repository to create commits
5. **Display**: Your art appears on your GitHub profile

### Is my data safe?

Yes! Gitgenix:

- Runs entirely in your browser
- Doesn't store personal information
- Only accesses public GitHub repository data for validation
- Stores shared patterns anonymously in Firebase (optional)

---

## Usage Questions

### What makes a good contribution art pattern?

- **High Contrast**: Use intensity levels 0 and 4 for clear visibility
- **Clean Years**: Target years with minimal existing contributions
- **Simple Designs**: Complex patterns may not display well at GitHub's small scale
- **Test First**: Start with simple patterns to understand the process

### How many commits does each intensity level create?

- **Level 0**: 0 commits (no activity)
- **Level 1**: 10 commits (light activity)
- **Level 2**: 20 commits (moderate activity)
- **Level 3**: 30 commits (high activity)
- **Level 4**: 40 commits (maximum activity)

### Can I create patterns spanning multiple years?

Yes! Gitgenix supports multi-year patterns. Select multiple years in the year selector and design across year boundaries.

### Will this affect my existing commits?

No, Gitgenix creates new commits with specific dates. Your existing commits remain unchanged. However, we recommend using a dedicated repository for contribution art.

### Why isn't my pattern showing on GitHub?

Common reasons:

- **Wait Time**: GitHub can take up to 24 hours to update contribution graphs
- **Repository Visibility**: Ensure your repository is public for contributions to appear
- **Contrast**: Use higher contrast intensity levels (0 and 4)
- **Date Range**: Verify commits are within GitHub's display range

### Can I edit a pattern after generating the script?

Yes! You can:

- Modify the pattern and generate a new script
- Import previously exported patterns
- Share patterns and re-import them for editing

---

## Technical Questions

### What technologies does Gitgenix use?

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Animations**: Framer Motion with performance optimization
- **Storage**: Firebase Firestore (for sharing), Local Storage
- **Deployment**: Netlify with CDN

### How does the script generation work?

Gitgenix analyzes your pattern and creates Git commands with specific dates and commit counts:

```bash
# Example generated commands
git commit --allow-empty --date="2024-01-01T12:00:00" -m "Gitgenix: Day 1"
git commit --allow-empty --date="2024-01-01T12:01:00" -m "Gitgenix: Day 1"
# ... more commits for the day
```

### Does Gitgenix work on mobile devices?

Yes! Gitgenix is fully responsive and touch-optimized:

- **Touch Support**: Tap and drag to create patterns
- **Mobile Layout**: Optimized interface for small screens
- **Performance**: Smooth operation on mobile devices

### Can I use Gitgenix offline?

Core functionality works offline:

- **Pattern Creation**: Design patterns without internet
- **Script Generation**: Create scripts locally
- **Import/Export**: Work with JSON files offline

Internet is only required for:

- Pattern sharing (Firebase)
- Repository validation (GitHub API)

### Is there an API I can use?

Gitgenix doesn't have a public API, but you can:

- Use the exported JSON format for integration
- Fork the project and modify it for your needs
- Access the client-side utilities in the source code

---

## Troubleshooting

### The app won't load or is very slow

**Solutions**:

- **Clear Browser Cache**: Force refresh (Ctrl+F5 or Cmd+Shift+R)
- **Try Different Browser**: Test in Chrome, Firefox, Safari, or Edge
- **Check Internet Connection**: Ensure stable internet for initial load
- **Disable Extensions**: Some browser extensions may interfere
- **Enable JavaScript**: Gitgenix requires JavaScript to function

### Repository validation keeps failing

**Common Issues**:

- **Typos**: Double-check username and repository spelling
- **Repository Access**: Ensure repository exists and is accessible
- **Private Repositories**: Public repositories work best for contribution display
- **Case Sensitivity**: GitHub usernames and repositories are case-sensitive

**Solutions**:

```bash
# Verify repository exists
https://github.com/USERNAME/REPOSITORY

# Check if you have access
git clone https://github.com/USERNAME/REPOSITORY.git
```

### Script won't run or produces errors

**Windows (PowerShell)**:

```powershell
# Enable script execution
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Run the script
.\gitgenix.ps1
```

**macOS/Linux (Bash)**:

```bash
# Make script executable
chmod +x gitgenix.sh

# Run the script
./gitgenix.sh
```

**Common Script Issues**:

- **Wrong Directory**: Run script inside your Git repository
- **Git Not Configured**: Set up Git username and email
- **Permission Issues**: Check file permissions and execution policy

### Pattern sharing isn't working

**Possible Causes**:

- **Firebase Connection**: Check browser console for Firebase errors
- **Network Issues**: Ensure stable internet connection
- **Browser Blocking**: Some browsers block third-party connections

**Solutions**:

- **Try Again**: Network issues are often temporary
- **Different Browser**: Test in an incognito/private window
- **Export Instead**: Use JSON export as an alternative

### Animations are laggy or not working

**Solutions**:

- **Enable Hardware Acceleration**: Check browser settings
- **Close Other Tabs**: Free up system memory
- **Reduce Motion**: Enable "Reduce motion" in your OS accessibility settings
- **Update Browser**: Use the latest browser version

### Mobile touch controls aren't responsive

**Solutions**:

- **Zoom Out**: Ensure page isn't zoomed in
- **Landscape Mode**: Try rotating device for larger touch targets
- **Clean Screen**: Remove screen protectors or clean screen
- **Use Stylus**: For precise control on small screens

---

## Contributing Questions

### How can I contribute to Gitgenix?

There are many ways to contribute:

- **Code**: Features, bug fixes, optimizations
- **Documentation**: Improve guides and examples
- **Design**: UI/UX improvements
- **Testing**: Report bugs and test new features
- **Community**: Help other users, share feedback

See our [Contributing Guide](./CONTRIBUTING.md) for detailed instructions.

### I found a bug. How do I report it?

1. **Check Existing Issues**: Search [GitHub Issues](https://github.com/thesujalpatel/gitgenix/issues)
2. **Create Bug Report**: Use our bug report template
3. **Include Details**:
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and device information
   - Screenshots if applicable

### I have an idea for a new feature

We'd love to hear it!

1. **Check Discussions**: See if it's already being discussed
2. **Create Feature Request**: Use our feature request template
3. **Provide Context**: Explain the problem and proposed solution
4. **Consider Implementation**: Think about how it might work

### How do I set up the development environment?

See our [Development Setup Guide](./DEVELOPMENT.md) for complete instructions:

```bash
# Quick setup
git clone https://github.com/thesujalpatel/gitgenix.git
cd gitgenix
npm install
npm run dev
```

### Can I use Gitgenix code in my own project?

Yes! Gitgenix is open source under the MIT License. You can:

- Use the code in commercial projects
- Modify and distribute it
- Create derivative works

Just include the original license notice.

---

## Advanced Questions

### Can I automate pattern creation?

While Gitgenix doesn't have automation features, you can:

- Export patterns as JSON and modify programmatically
- Use the generated scripts as templates
- Fork the project and add automation features

### How do I create complex multi-year patterns?

**Tips for Complex Patterns**:

1. **Plan Ahead**: Sketch your design on paper first
2. **Use Multiple Years**: Spread large designs across years
3. **Test Sections**: Create and test smaller sections first
4. **Consider Scale**: Remember GitHub's contribution graph is small

### Can I customize the commit messages?

Currently, Gitgenix uses standard commit messages. To customize:

1. **Edit Script**: Modify the generated script before running
2. **Fork Project**: Add custom message features
3. **Manual Commits**: Create commits manually with custom messages

### How do I backup my patterns?

**Backup Methods**:

- **JSON Export**: Download patterns as JSON files
- **Cloud Sharing**: Save to Firebase (requires account)
- **Git Repository**: Store exported files in Git
- **Multiple Locations**: Keep backups in different places

### Is there a pattern gallery or community?

Currently, pattern sharing is peer-to-peer via links. For community features:

- **GitHub Discussions**: Share patterns and get feedback
- **Social Media**: Tag posts with #Gitgenix
- **Feature Request**: Request a community gallery feature

---

## Still Have Questions?

### Getting Help

- 📖 **User Guide**: [Complete step-by-step instructions](./USER_GUIDE.md)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/thesujalpatel/gitgenix/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/thesujalpatel/gitgenix/discussions)
- 📧 **Contact**: Create an issue for direct communication

### Quick Links

- **🚀 Try Gitgenix**: [https://gitgenix-contrib.netlify.app](https://gitgenix-contrib.netlify.app)
- **📚 Documentation**: [User Guide](./USER_GUIDE.md) | [Contributing](./CONTRIBUTING.md)
- **💻 Source Code**: [GitHub Repository](https://github.com/thesujalpatel/gitgenix)

---

**Can't find your answer?** Feel free to ask in our [GitHub Discussions](https://github.com/thesujalpatel/gitgenix/discussions) - the community is always happy to help! 🤝
