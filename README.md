# 🎨 Gitgenix - GitHub Contribution Art Generator

<div align="center">

**Transform your GitHub contribution graph into beautiful pixel art patterns**

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-10.0-orange?style=flat&logo=firebase)](https://firebase.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

[🚀 Live Demo](https://Gitgenix-github-art.netlify.app/) • [📖 User Guide](./docs/USER_GUIDE.md) • [🤝 Contributing](#-contributing)

</div>

---

## ✨ Features

### 🎨 **Visual Pattern Creation**

- **Interactive Grid Editor**: Click and drag to create custom contribution patterns
- **Multi-Year Support**: Design patterns across multiple years (current year + any past year)
- **Intensity Levels**: 5 different contribution intensity levels (0-4)
- **Real-time Preview**: See your pattern exactly as it will appear on GitHub

### 🔄 **Data Management**

- **Export/Import**: Save patterns as JSON files for backup and sharing
- **Cloud Storage**: Save patterns online with Firebase integration
- **Pattern Sharing**: Generate shareable links for your artistic creations
- **Cross-Device Sync**: Access your patterns from any device

### ⚡ **Performance Optimized**

- **Device Detection**: Automatic optimization for low-end devices
- **Reduced Motion Support**: Respects user accessibility preferences
- **Hardware Acceleration**: GPU-optimized animations where supported
- **Progressive Loading**: Smooth loading experiences with custom animations

### 🛠️ **Developer Tools**

- **Shell Script Generator**: Automatically generate bash scripts for contribution creation
- **Repository Validation**: Real-time GitHub repository existence checking
- **Batch Operations**: Clear entire years or all patterns at once
- **Debug Information**: Comprehensive error handling and user feedback
- **Shell Script Generation**: Export your patterns as shell scripts that can be run to create the actual GitHub contributions.

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a Firebase project and add your Firebase configuration to `.env.local` (see `.env.example` for template)
4. Run the development server with `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain-here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket-here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id-here
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id-here
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id-here
```

## Usage

1. Select years to include in your pattern
2. Set your GitHub username, repository, and branch
3. Draw your pattern by clicking on cells or clicking and dragging
4. Export your pattern as a shell script to create actual GitHub contributions
5. Save your pattern online or export as JSON for later use
6. Share your pattern with friends via a unique link

---

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **Animations**: Framer Motion with performance optimization
- **Backend**: Firebase Firestore for pattern storage
- **Deployment**: Netlify with automatic deployments

### Project Structure

```
Gitgenix/
├── app/                    # Next.js app directory
│   ├── components/         # Reusable UI components
│   ├── draw/              # Main application logic
│   │   ├── components/    # Draw-specific components
│   │   ├── share/         # Pattern sharing functionality
│   │   └── utils/         # Utility functions
│   ├── firebase/          # Firebase configuration & services
│   └── utils/             # Global utilities
├── docs/                  # Documentation
├── public/                # Static assets
└── ...config files
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### **🐛 Bug Reports**

- Use the GitHub issue tracker
- Include reproduction steps and environment details
- Screenshots are always helpful!

### **✨ Feature Requests**

- Check existing issues first
- Describe the feature and its use case
- Consider implementation complexity

### **📝 Code Contributions**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 🔧 Troubleshooting

### **Common Issues**

#### **Script Generation Fails**

- **Cause**: Invalid repository information
- **Solution**: Verify your GitHub username, repository name, and branch exist

#### **Pattern Import Errors**

- **Cause**: Corrupted or invalid JSON file
- **Solution**: Ensure the JSON file was exported from Gitgenix or follows the correct format

#### **Performance Issues**

- **Cause**: Large patterns on low-end devices
- **Solution**: Enable "Reduce Motion" in browser settings or use smaller patterns

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- **GitHub** for providing the contribution graph that inspired this project
- **Next.js Team** for the amazing React framework
- **Framer Motion** for smooth animations
- **Firebase** for reliable backend services
- **Tailwind CSS** for beautiful, responsive design

---

<div align="center">

**Made with ❤️ for the GitHub community**

[⭐ Star this repo](https://github.com/yourusername/arcadia) if you find it helpful!

</div>
