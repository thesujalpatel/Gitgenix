"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlay,
  FiDownload,
  FiShare2,
  FiEdit3,
  FiChevronDown,
  FiBookOpen,
  FiZap,
  FiSettings,
  FiHelpCircle,
  FiChevronUp,
} from "react-icons/fi";
import { BiSelectMultiple } from "react-icons/bi";
import { AiOutlineGithub } from "react-icons/ai";
import { PiNotebookFill } from "react-icons/pi";
import { AiFillThunderbolt } from "react-icons/ai";
import Link from "next/link";

interface GuideSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export default function UserGuide() {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "getting-started",
  ]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };
  const scrollToSection = (sectionId: string) => {
    // Prevent multiple rapid clicks
    if (isScrolling) return;

    setIsScrolling(true);

    // First, set the expanded sections
    setExpandedSections([sectionId]);

    // Wait for the animation to complete (300ms) plus a small buffer
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 100;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Reset scrolling state after scroll completes
        setTimeout(() => {
          setIsScrolling(false);
        }, 500);
      } else {
        // If element not found, reset state immediately
        setIsScrolling(false);
      }
    }, 350);
  };
  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      // Only update back-to-top visibility if we're not programmatically scrolling
      if (!isScrolling) {
        setShowBackToTop(window.pageYOffset > 300);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolling]);

  const sections: GuideSection[] = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <FiPlay className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-primary">
              Welcome to Gitgenix!
            </h4>{" "}
            <p className="text-foreground/80 mb-4">
              Gitgenix helps you create beautiful GitHub contribution art by
              designing patterns that will appear on your GitHub profile.
              Let&apos;s walk through the process step by step.
            </p>
          </div>

          <div className="bg-foreground/5 rounded-lg p-4">
            <h5 className="font-semibold mb-2 flex items-center">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                1
              </span>
              Access the Draw Page
            </h5>
            <p className="text-sm text-foreground/70 ml-8">
              Navigate to the{" "}
              <Link href="/draw" className="text-primary hover:underline">
                Draw page
              </Link>{" "}
              to start creating your pattern.
            </p>
          </div>

          <div className="bg-foreground/5 rounded-lg p-4">
            <h5 className="font-semibold mb-2 flex items-center">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                2
              </span>
              Select Your Years
            </h5>{" "}
            <p className="text-sm text-foreground/70 ml-8">
              Choose which years you want to include in your pattern. You can
              select &quot;current&quot; year and any past years.
            </p>
          </div>

          <div className="bg-foreground/5 rounded-lg p-4">
            <h5 className="font-semibold mb-2 flex items-center">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                3
              </span>
              Enter Repository Details
            </h5>
            <p className="text-sm text-foreground/70 ml-8">
              Fill in your GitHub username, repository name, and branch where
              you want to create the contributions.
            </p>
          </div>

          <div className="bg-foreground/5 rounded-lg p-4">
            <h5 className="font-semibold mb-2 flex items-center">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                4
              </span>
              Design Your Pattern
            </h5>
            <p className="text-sm text-foreground/70 ml-8">
              Click on cells in the contribution grid to set different intensity
              levels (0-4). You can also click and drag!
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "creating-patterns",
      title: "Creating Patterns",
      icon: <FiEdit3 className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-primary">
              Pattern Design Tools
            </h4>
            <p className="text-foreground/80 mb-4">
              Learn how to use all the tools available for creating your
              contribution art.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="border border-foreground/20 rounded-lg p-4">
              <h5 className="font-semibold mb-2 flex items-center">
                <BiSelectMultiple className="mr-2" />
                Intensity Selector
              </h5>
              <p className="text-sm text-foreground/70 mb-2">
                Choose from 5 intensity levels (0-4) that correspond to
                different contribution frequencies:
              </p>{" "}
              <ul className="text-sm text-foreground/70 space-y-1 ml-4">
                <li>
                  <span className="inline-block w-3 h-3 cell-intensity-0 rounded mr-2"></span>
                  Level 0: No contributions
                </li>
                <li>
                  <span className="inline-block w-3 h-3 cell-intensity-1 rounded mr-2"></span>
                  Level 1: 10 contributions
                </li>
                <li>
                  <span className="inline-block w-3 h-3 cell-intensity-2 rounded mr-2"></span>
                  Level 2: 20 contributions
                </li>
                <li>
                  <span className="inline-block w-3 h-3 cell-intensity-3 rounded mr-2"></span>
                  Level 3: 30 contributions
                </li>
                <li>
                  <span className="inline-block w-3 h-3 cell-intensity-4 rounded mr-2"></span>
                  Level 4: 40 contributions
                </li>
              </ul>
            </div>
            <div className="border border-foreground/20 rounded-lg p-4">
              <h5 className="font-semibold mb-2 flex items-center">
                <FiEdit3 className="mr-2" />
                Drawing Techniques
              </h5>
              <ul className="text-sm text-foreground/70 space-y-2">
                <li>
                  <strong>Click:</strong> Set a cell to the selected intensity
                  level
                </li>
                <li>
                  <strong>Click & Drag:</strong> Paint multiple cells at once
                </li>
                <li>
                  <strong>Multi-Year:</strong> Changes apply to all selected
                  years simultaneously
                </li>
              </ul>
            </div>{" "}
            <div className="border border-foreground/20 rounded-lg p-4">
              <h5 className="font-semibold mb-2 flex items-center">
                <FiSettings className="mr-2" />
                Toolbar Options
              </h5>
              <ul className="text-sm text-foreground/70 space-y-2">
                <li>
                  <strong>Clear All:</strong> Remove all patterns from all years
                </li>
                <li>
                  <strong>Intensity Buttons:</strong> Quick selection of
                  intensity levels
                </li>
              </ul>
            </div>{" "}
            <div className="alert-indigo rounded-lg p-4">
              <h5 className="font-semibold mb-2 flex items-center">
                <FiZap className="mr-2" />
                Best Practice Tips
              </h5>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>Use Clean Years:</strong> In clean years, any
                  intensity level will be highlighted as maximum (level 4) if no
                  other intensities are used
                </li>
                <li>
                  <strong>Mix All Intensity Levels:</strong> Use all levels
                  (0-4) for best contrast - using only 2-3 intensities may make
                  patterns appear darker or lighter than your filled colors
                </li>
                <li>
                  <strong>Live Preview:</strong> Your pattern is previewed in
                  real-time in the editor as you design
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "repository-setup",
      title: "Repository Setup",
      icon: <AiOutlineGithub className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-primary">
              GitHub Repository Configuration
            </h4>
            <p className="text-foreground/80 mb-4">
              Proper repository setup is crucial for your contribution art to
              work correctly.
            </p>
          </div>{" "}
          <div className="alert-warning rounded-lg p-4">
            <h5 className="font-semibold mb-2">⚠️ Important Requirements</h5>
            <ul className="text-sm space-y-1">
              <li>• Repository must exist and be accessible</li>
              <li>• You must have push access to the repository</li>
              <li>• The specified branch must exist</li>
              <li>
                • Repository should preferably be public for contributions to
                show
              </li>
            </ul>
          </div>
          <div className="alert-success rounded-lg p-4">
            <h5 className="font-semibold mb-2">
              ✅ Private Repository Workaround
            </h5>
            <p className="text-sm mb-2">
              Want to keep your repository private but still show the pattern?
              Here&apos;s how:
            </p>
            <ol className="text-sm space-y-2">
              <li>
                <strong>1.</strong> Start with a public repository and run your
                script on it
              </li>
              <li>
                <strong>2.</strong> Once your pattern is created and visible on
                your profile, make the repository private
              </li>
              <li>
                <strong>3.</strong> Go to GitHub &gt; Settings &gt; Public
                profile &gt; Contributions & activity
              </li>
              <li>
                <strong>4.</strong> Check the box &quot;Include private
                contributions on my profile&quot;
              </li>
              <li>
                <strong>5.</strong> Your pattern will remain visible with an
                anonymous repository label
              </li>
            </ol>
            <p className="text-sm mt-2 text-green-700">
              <strong>Result:</strong> Your contribution art stays visible while
              keeping your repository private!
            </p>
          </div>
          <div className="alert-info rounded-lg p-4">
            <h5 className="font-semibold mb-2">💡 Clean Year Recommendation</h5>
            <p className="text-sm mb-2">
              For best results, consider using a clean year without existing
              contributions:
            </p>
            <ul className="text-sm space-y-1 ml-4">
              <li>
                • If your current year already has contributions, they might
                interfere with your pattern
              </li>
              <li>
                • Consider creating patterns for past years that had minimal
                activity
              </li>
              <li>
                • Alternatively, use a dedicated account for contribution art
              </li>
              <li>
                • Pre-existing contributions can make your pattern appear messy
                or distorted
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="border border-foreground/20 rounded-lg p-4">
              <h5 className="font-semibold mb-2">Repository Validation</h5>
              <p className="text-sm text-foreground/70 mb-2">
                Gitgenix automatically validates your repository information
                using the GitHub API:
              </p>
              <ul className="text-sm text-foreground/70 space-y-1 ml-4">
                <li>• Checks if the repository exists</li>
                <li>• Verifies the repository is accessible</li>
                <li>• Prevents script generation for invalid repositories</li>
              </ul>
            </div>

            <div className="border border-foreground/20 rounded-lg p-4">
              <h5 className="font-semibold mb-2">Recommended Setup</h5>{" "}
              <ol className="text-sm text-foreground/70 space-y-2">
                <li>
                  <strong>1.</strong> Create a dedicated repository for your
                  contribution art (e.g., &quot;contribution-art&quot;)
                </li>
                <li>
                  <strong>2.</strong> Make sure the repository is public
                </li>
                <li>
                  <strong>3.</strong> Use any branch you prefer (common choices:
                  &quot;main&quot;, &quot;master&quot;, or create a custom
                  branch)
                </li>
                <li>
                  <strong>4.</strong> Keep the repository clean with minimal
                  files
                </li>
              </ol>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "generating-scripts",
      title: "Generating Scripts",
      icon: <FiDownload className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-primary">
              Shell Script Generation
            </h4>
            <p className="text-foreground/80 mb-4">
              Once your pattern is complete, generate and run the script to
              create your contribution art.
            </p>{" "}
          </div>{" "}
          <div className="alert-info rounded-lg p-4">
            <h5 className="font-semibold mb-2 flex items-center">
              <FiZap className="mr-2" />
              Script Features
            </h5>
            <ul className="text-sm space-y-1">
              <li>
                • Automatically creates commits for each day in your pattern
              </li>
              <li>
                • Sets proper dates to match the contribution graph timeline
              </li>
              <li>
                • Creates the right number of commits for each intensity level
              </li>
              <li>• Includes helpful comments and progress indicators</li>
            </ul>{" "}
          </div>{" "}
          <div className="alert-amber rounded-lg p-4">
            <h5 className="font-semibold mb-2">
              🎯 Understanding GitHub&apos;s Contribution Display
            </h5>
            <p className="text-sm mb-2">
              GitHub automatically calculates contribution intensity based on
              your activity:
            </p>
            <ul className="text-sm space-y-1 ml-4">
              <li>• GitHub finds your highest and lowest contribution days</li>
              <li>
                • It divides this range into 4 intensity levels automatically
              </li>
              <li>
                • Using only low or only high intensity may not show contrast
              </li>
              <li>
                • Mix different intensity levels (0-4) for best visual results
              </li>
              <li>
                • Your pattern visibility depends on the overall year&apos;s
                contribution range
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="border border-foreground/20 rounded-lg p-4">
              <h5 className="font-semibold mb-2">Running the Script</h5>
              <ol className="text-sm text-foreground/70 space-y-2">
                <li>
                  <strong>1.</strong> Download the generated script file
                </li>
                <li>
                  <strong>2.</strong> Navigate to your repository directory in
                  terminal
                </li>
                <li>
                  <strong>3.</strong> Make the script executable:{" "}
                  <code className="bg-foreground/10 px-1 rounded">
                    chmod +x gitgenix.sh
                  </code>
                </li>
                <li>
                  <strong>4.</strong> Run the script:{" "}
                  <code className="bg-foreground/10 px-1 rounded">
                    ./gitgenix.sh
                  </code>
                </li>
              </ol>
            </div>

            <div className="border border-foreground/20 rounded-lg p-4">
              <h5 className="font-semibold mb-2">What the Script Does</h5>
              <ul className="text-sm text-foreground/70 space-y-1">
                <li>• Creates or modifies a file for each commit</li>
                <li>• Sets the commit date to match the contribution graph</li>
                <li>
                  • Adds multiple commits per day based on intensity level
                </li>
                <li>• Includes meaningful commit messages</li>
                <li>• Adds motivational quotes and thoughts to log files</li>
                <li>
                  • Commits log entries with the same inspirational quotes
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "sharing-patterns",
      title: "Sharing & Saving",
      icon: <FiShare2 className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-primary">
              Save and Share Your Creations
            </h4>
            <p className="text-foreground/80 mb-4">
              Gitgenix offers multiple ways to save and share your contribution
              art patterns.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="border border-foreground/20 rounded-lg p-4">
              <h5 className="font-semibold mb-2 flex items-center">
                <FiDownload className="mr-2" />
                Local Export (JSON)
              </h5>
              <p className="text-sm text-foreground/70 mb-2">
                Export your patterns as JSON files for local backup and sharing:
              </p>
              <ul className="text-sm text-foreground/70 space-y-1 ml-4">
                <li>• Contains all pattern data and metadata</li>
                <li>• Can be imported on any device</li>
                <li>• Perfect for version control or backups</li>
                <li>• Includes GitHub repository information</li>
              </ul>
            </div>

            <div className="border border-foreground/20 rounded-lg p-4">
              <h5 className="font-semibold mb-2 flex items-center">
                <FiShare2 className="mr-2" />
                Online Sharing
              </h5>
              <p className="text-sm text-foreground/70 mb-2">
                Save patterns to the cloud and share them with the community:
              </p>
              <ul className="text-sm text-foreground/70 space-y-1 ml-4">
                <li>• Give your pattern a memorable name</li>
                <li>• Get a unique shareable link</li>
                <li>• Others can view and import your pattern</li>
                <li>• Patterns are stored securely in Firebase</li>
              </ul>
            </div>

            {/* <div className="border border-foreground/20 rounded-lg p-4">
              <h5 className="font-semibold mb-2 flex items-center">
                <FiBookOpen className="mr-2" />
                Importing Patterns
              </h5>
              <p className="text-sm text-foreground/70 mb-2">
                Import patterns from JSON files or shared links:
              </p>
              <ul className="text-sm text-foreground/70 space-y-1 ml-4">
                <li>• Drag and drop JSON files to import</li>
                <li>• Visit shared pattern links to import directly</li>
                <li>• All pattern data and settings are preserved</li>
                <li>• Repository information is automatically filled</li>
              </ul>
            </div> */}
          </div>
        </div>
      ),
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      icon: <FiHelpCircle className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-primary">
              Common Issues & Solutions
            </h4>
            <p className="text-foreground/80 mb-4">
              Quick fixes for the most common problems users encounter.
            </p>
          </div>{" "}
          <div className="space-y-4">
            <div className="alert-danger rounded-lg p-4">
              <h5 className="font-semibold mb-2">❌ Script Generation Fails</h5>
              <p className="text-sm mb-2">
                <strong>Common Causes:</strong>
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Repository doesn&apos;t exist or is private</li>
                <li>• Incorrect username or repository name</li>
                <li>• Branch doesn&apos;t exist</li>
                <li>• Network connection issues</li>
              </ul>
              <p className="text-sm mt-2">
                <strong>Solution:</strong> Double-check all repository details
                and ensure the repository is accessible.
              </p>
            </div>
            <div className="alert-warning rounded-lg p-4">
              <h5 className="font-semibold mb-2">⚠️ Pattern Import Errors</h5>
              <p className="text-sm mb-2">
                <strong>Common Causes:</strong>
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Invalid or corrupted JSON file</li>
                <li>• File format not supported</li>
                <li>• Pattern from incompatible version</li>
              </ul>
              <p className="text-sm mt-2">
                <strong>Solution:</strong> Ensure the JSON file was exported
                from Gitgenix and is not corrupted.
              </p>
            </div>
            <div className="alert-info rounded-lg p-4">
              {" "}
              <h5 className="font-semibold mb-2">🐌 Performance Issues</h5>
              <p className="text-sm mb-2">
                <strong>Solutions:</strong>
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>
                  • Enable &quot;Reduce Motion&quot; in browser accessibility
                  settings
                </li>
                <li>• Use smaller patterns on mobile devices</li>
                <li>• Close other browser tabs to free up memory</li>
                <li>• Try using a different browser</li>
              </ul>
            </div>{" "}
            <div className="alert-success rounded-lg p-4">
              <h5 className="font-semibold mb-2">
                ✅ Contributions Not Showing on GitHub
              </h5>
              <p className="text-sm mb-2">
                <strong>Check:</strong>
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Repository is public</li>
                <li>• Commits were pushed successfully</li>
                <li>• Email in Git config matches GitHub account</li>
                <li>• Wait up to 24 hours for GitHub to update</li>
              </ul>
            </div>{" "}
            <div className="alert-purple rounded-lg p-4">
              <h5 className="font-semibold mb-2">
                🎨 Pattern Not Visible as Expected
              </h5>
              <p className="text-sm mb-2">
                <strong>Common Issues:</strong>
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Used only high or only low intensity levels</li>
                <li>• Existing contributions interfering with pattern</li>
                <li>• GitHub&apos;s automatic scaling affecting visibility</li>
                <li>• Pattern created in a year with high existing activity</li>
              </ul>
              <p className="text-sm mt-2">
                <strong>Solutions:</strong> Use a mix of intensity levels (0-4),
                choose clean years with minimal existing contributions, or
                consider using a dedicated account for contribution art.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 pt-20"
        >
          <h1 className="text-4xl font-bold mb-4 flex justify-center items-center">
            <PiNotebookFill className="text-primary" />
            <div className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              User Guide
            </div>
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Learn how to create stunning GitHub contribution art with Gitgenix.
            From your first pattern to advanced techniques.
          </p>
          <div className="mt-6">
            <Link
              href="/draw"
              className="flex items-center justify-center mx-auto px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors w-fit"
            >
              <AiFillThunderbolt className="mr-2 text-2xl" />
              Start Creating
            </Link>
          </div>
        </motion.div>{" "}
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-foreground/5 rounded-lg p-4 mb-8 quick-navigation"
        >
          <div className="flex items-center mb-3">
            <FiBookOpen className="w-5 h-5 text-primary mr-2" />
            <h3 className="font-semibold">Quick Navigation</h3>
            <span className="ml-auto text-xs text-foreground/60">
              Click to jump to section
            </span>
          </div>{" "}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                disabled={isScrolling}
                className={`flex items-center text-sm transition-colors p-2 rounded border border-transparent ${
                  isScrolling
                    ? "opacity-50 cursor-not-allowed text-foreground/40"
                    : expandedSections.includes(section.id)
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-primary hover:text-primary/80 hover:bg-foreground/5"
                }`}
              >
                {section.icon}
                <span className="ml-2">{section.title}</span>
              </button>
            ))}
          </div>
        </motion.div>{" "}
        {/* Guide Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="border border-foreground/20 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-foreground/5 transition-colors"
              >
                <div className="flex items-center">
                  <div className="text-primary mr-3">{section.icon}</div>
                  <h3 className="text-lg font-semibold text-left">
                    {section.title}
                  </h3>
                </div>
                <motion.div
                  animate={{
                    rotate: expandedSections.includes(section.id) ? 180 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <FiChevronDown className="w-5 h-5 text-foreground/60" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedSections.includes(section.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 border-t border-foreground/10">
                      {section.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>{" "}
        {/* Footer */}{" "}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 p-8 bg-foreground/5 rounded-lg"
        >
          <h3 className="text-lg font-semibold mb-2">Need More Help?</h3>
          <p className="text-foreground/70 mb-4">
            Can&apos;t find what you&apos;re looking for? We&apos;re here to
            help!
          </p>{" "}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="https://github.com/yourusername/gitgenix/issues"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              <AiOutlineGithub className="mr-2" />
              Report an Issue
            </Link>
            <Link
              href="/draw"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              <FiEdit3 className="mr-2" />
              Start Drawing
            </Link>
          </div>
        </motion.div>{" "}
        {/* Back to Top Button */}
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => {
              setIsScrolling(true);
              window.scrollTo({ top: 0, behavior: "smooth" });

              // Reset scrolling state after scroll completes
              setTimeout(() => {
                setIsScrolling(false);
              }, 500);
            }}
            className="fixed bottom-8 right-8 z-50 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
            title="Back to Top"
          >
            <FiChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
