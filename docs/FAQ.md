# ❓ Frequently Asked Questions

Quick answers to common questions about Gitgenix, the GitHub contribution art creator.

## 🎯 Quick Answers

### What is Gitgenix?

Gitgenix is a free web application that lets you create beautiful pixel art on your GitHub contribution graph. Design patterns visually, generate automated scripts, and transform your GitHub profile into a canvas!

### Is it free?

Yes! Completely free and open source under MIT license. No sign-up, no limits, no hidden costs.

### How does it work?

1. **Design** → Create patterns on our visual grid editor
2. **Generate** → Download a custom script for your design
3. **Apply** → Run the script in any GitHub repository
4. **Enjoy** → Watch your art appear on your GitHub profile

### Is it safe?

Absolutely! Gitgenix runs entirely in your browser, doesn't store personal data, and only creates harmless Git commits in repositories you choose.

---

## 🔧 Technical Questions

### Do I need to install anything?

No installation required! Just visit [gitgenix-contrib.netlify.app](https://gitgenix-contrib.netlify.app) in any modern browser.

### What browsers are supported?

All modern browsers including Chrome, Firefox, Safari, and Edge. Mobile browsers work too!

### Does it work on mobile?

Yes! The interface is touch-optimized and works great on phones and tablets.

### Will this affect my GitHub statistics?

The commits created are normal Git commits. They will appear in your contribution graph as intended, but won't affect repository-specific statistics like code frequency.

### Can I create multi-year patterns?

Yes! Gitgenix supports patterns spanning multiple years. Perfect for creating large, complex designs that extend beyond a single year.

### What repository should I use?

Create a dedicated repository like `github-art` or `contribution-art` to keep your art separate from your main projects.

---

## 🎨 Design Questions

### What makes a good pattern?

- **High contrast** → Use intensity levels 0 and 4 for clear visibility
- **Simple shapes** → Bold, recognizable designs work best
- **Consider timing** → Plan when you want your art to appear
- **Test first** → Preview patterns before committing

### Can I edit existing patterns?

Yes! Use the JSON export/import feature to save your work and make modifications later.

### How do I share patterns?

Click the share button in the pattern editor to get a shareable link, or export as JSON to share with others.

---

## 🛠️ Repository Setup

### How do I create a new repository?

1. Go to [github.com/new](https://github.com/new)
2. Name it something like `github-art` or `contribution-art`
3. Make it public so your art shows on your profile
4. Initialize with a README
5. Clone it locally where you'll run the script

### Should I use an existing repository?

For best results, use a dedicated repository for your art. This keeps your main projects clean and makes it easy to manage your designs.

### Can I delete the commits later?

Yes, but this will remove your art from the contribution graph. The commits are real Git history, so standard Git operations apply.

---

## ⚡ Troubleshooting

### The script isn't working

**Most common solutions:**

- Ensure you're in the correct repository directory
- Check that Git is properly configured with your email/name
- Verify the repository exists and you have write access
- On Windows, try running in Git Bash instead of PowerShell

### My art isn't showing up

**Check these items:**

- Repository must be public for art to appear on your profile
- Commits must be authored with your GitHub email address
- Wait a few minutes for GitHub to update the contribution graph
- Ensure the dates in your pattern align with your intended display year

### Pattern looks different than expected

- Verify the year settings match your intended display period
- Check that intensity levels are set correctly (0-4)
- Consider that GitHub's contribution graph starts on Sunday

### Need more help?

- Check our [User Guide](./USER_GUIDE.md) for detailed instructions
- Review [troubleshooting section](./USER_GUIDE.md#troubleshooting) for common issues
- Open an issue on [GitHub](https://github.com/thesujalpatel/gitgenix/issues) for bugs
- Join our community discussions for design tips and support

---

## 🤝 Contributing

### How can I contribute?

- **Report bugs** → Open issues on GitHub
- **Suggest features** → Share your ideas in discussions
- **Submit code** → Follow our [Contributing Guide](./CONTRIBUTING.md)
- **Share patterns** → Inspire others with your creations
- **Write documentation** → Help improve our guides

### I found a bug, what should I include?

- Browser version and operating system
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable
- Any error messages from browser console

---

_Need immediate help? Check our [Quick Start Guide](./QUICK_START.md) for a 5-minute setup walkthrough!_

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
