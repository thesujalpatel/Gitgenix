"use client";

import { useState, useEffect, useMemo } from "react";
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
  FiClock,
  FiTrendingUp,
  FiTarget,
  FiArrowUp,
  FiGitBranch,
  FiCalendar,
  FiRefreshCw,
} from "react-icons/fi";
import { BiRocket, BiShield } from "react-icons/bi";
import { AiOutlineGithub } from "react-icons/ai";
import Link from "next/link";
import { getAnimationVariant } from "../utils/animationManager";

interface GuideSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  category: "basics" | "advanced" | "sharing" | "help";
  estimatedTime?: string;
}

interface CategoryFilter {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export default function UserGuide() {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "getting-started",
  ]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  // Animation variants - optimized for performance
  const containerVariants = getAnimationVariant("container");
  const cardVariants = getAnimationVariant("cardRevealStable");
  const buttonVariants = getAnimationVariant("buttonSecondaryStable");

  // Memoized categories for performance optimization
  const categories: CategoryFilter[] = useMemo(
    () => [
      {
        id: "all",
        label: "All Sections",
        icon: <FiBookOpen className="w-4 h-4" />,
      },
      {
        id: "basics",
        label: "Getting Started",
        icon: <FiPlay className="w-4 h-4" />,
      },
      {
        id: "advanced",
        label: "Advanced Features",
        icon: <FiTarget className="w-4 h-4" />,
      },
      {
        id: "sharing",
        label: "Sharing & Export",
        icon: <FiShare2 className="w-4 h-4" />,
      },
      {
        id: "help",
        label: "Help & Support",
        icon: <FiHelpCircle className="w-4 h-4" />,
      },
    ],
    []
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const scrollToSection = (sectionId: string) => {
    if (isScrolling) return;

    setIsScrolling(true);
    setExpandedSections([sectionId]);

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 100;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        setTimeout(() => {
          setIsScrolling(false);
        }, 500);
      } else {
        setIsScrolling(false);
      }
    }, 350);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolling) {
        setShowBackToTop(window.pageYOffset > 300);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolling]);

  // Memoized sections for better performance
  /**
   * An array of guide sections containing comprehensive documentation for the Gitgenix application.
   * Each section provides step-by-step instructions, best practices, and troubleshooting information
   * for creating GitHub contribution art patterns.
   *
   * @remarks
   * This memoized array contains seven main sections:
   * - Getting Started: Introduction and basic workflow (5 min)
   * - Creating Patterns: Drawing tools and pattern design guide (8 min)
   * - Repository Setup: Git configuration and repository creation (10 min)
   * - Generating Scripts: Script creation and execution instructions (6 min)
   * - Sharing & Saving: Pattern management and community features (4 min)
   * - Documentation & Help: Support resources and quick actions (2 min)
   * - Troubleshooting: Common issues and solutions (5 min)
   *
   * Each section includes:
   * - Unique identifier for navigation
   * - Category classification (basics, advanced, sharing, help)
   * - Estimated reading time
   * - Interactive content with animations and styled components
   * - Relevant icons from react-icons library
   *
   * @see {@link GuideSection} for the type definition
   * @see {@link cardVariants} for animation configuration
   *
   * @example
   * ```tsx
   * // Access a specific section
   * const gettingStartedSection = sections.find(s => s.id === "getting-started");
   *
   * // Filter by category
   * const basicSections = sections.filter(s => s.category === "basics");
   * ```
   */
  const sections: GuideSection[] = useMemo(
    () => [
      {
        id: "getting-started",
        title: "Getting Started",
        icon: <FiPlay className="w-5 h-5" />,
        category: "basics",
        estimatedTime: "3 min",
        content: (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-primary">
                Welcome to Gitgenix!
              </h4>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center gap-1 flex-nowrap text-nowrap">
                <FiClock className="w-3 h-3" />3 min read
              </span>
            </div>
            <p className="text-foreground/80 mb-4">
              Gitgenix helps you create beautiful GitHub contribution art by
              designing patterns that will appear on your GitHub profile.
              Let&apos;s walk through the process step by step.
            </p>
            <div className="grid gap-4">
              <motion.div
                className="bg-foreground/5 rounded-lg p-4 border-l-4 border-primary"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <h5 className="font-semibold mb-2 flex items-center">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                    1
                  </span>
                  Access the Draw Page
                </h5>
                <p className="text-sm text-foreground/70 ml-8">
                  Navigate to the{" "}
                  <Link
                    href="/draw"
                    className="text-primary hover:underline font-medium"
                  >
                    Draw page
                  </Link>{" "}
                  to start creating your pattern.
                </p>
              </motion.div>

              <motion.div
                className="bg-foreground/5 rounded-lg p-4 border-l-4 border-secondary"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <h5 className="font-semibold mb-2 flex items-center">
                  <span className="bg-secondary text-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                    2
                  </span>
                  Design Your Pattern
                </h5>
                <p className="text-sm text-foreground/70 ml-8">
                  Use the grid to click and create your desired pattern. Each
                  cell represents a day in your GitHub contribution calendar.
                </p>
              </motion.div>

              <motion.div
                className="bg-foreground/5 rounded-lg p-4 border-l-4 border-accent"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <h5 className="font-semibold mb-2 flex items-center">
                  <span className="bg-accent text-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                    3
                  </span>
                  Generate & Execute
                </h5>
                <p className="text-sm text-foreground/70 ml-8">
                  Once your pattern is ready, generate the script and follow the
                  setup instructions to apply it to your GitHub profile.
                </p>
              </motion.div>
            </div>{" "}
            <div className="bg-info-bg border border-info-border rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <FiZap className="h-5 w-5 text-info-text" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-info-text">
                    Pro Tip
                  </h3>
                  <div className="mt-2 text-sm text-info-text/90">
                    <p>
                      Start with simple patterns like text or basic shapes
                      before attempting complex designs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "creating-patterns",
        title: "Creating Patterns",
        icon: <FiEdit3 className="w-5 h-5" />,
        category: "basics",
        estimatedTime: "6 min",
        content: (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-primary">
                Pattern Creation Guide
              </h4>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center gap-1 flex-nowrap text-nowrap">
                <FiClock className="w-3 h-3" />6 min read
              </span>
            </div>

            <p className="text-foreground/80">
              Learn how to create stunning patterns that will appear on your
              GitHub contribution graph.
            </p>

            <div className="grid gap-4">
              <motion.div
                className="bg-foreground/5 rounded-lg p-4"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <h5 className="font-semibold mb-3 flex items-center">
                  <FiEdit3 className="w-4 h-4 mr-2 text-primary" />
                  Drawing Tools
                </h5>
                <div className="space-y-3 text-sm text-foreground/80">
                  <div className="flex items-start">
                    <span className="font-medium text-primary w-20">
                      Click:
                    </span>
                    <span>Fill cells with selected color</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-medium text-primary w-20">Drag:</span>
                    <span>Paint multiple cells at once</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-foreground/5 rounded-lg p-4"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <h5 className="font-semibold mb-3 flex items-center">
                  <FiSettings className="w-4 h-4 mr-2 text-secondary" />
                  Pattern Options
                </h5>
                <div className="space-y-3 text-sm text-foreground/80">
                  <div>
                    <span className="font-medium text-secondary">
                      Intensity Levels:
                    </span>
                    <p className="mt-1">
                      Check your GitHub profile&apos;s contribution graph to
                      find your typical contribution range, then choose
                      intensity levels (1-4 contributions per day) that blend
                      naturally with your existing pattern
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-secondary">
                      Date Range:
                    </span>
                    <p className="mt-1">
                      Set the start date for your pattern to appear on your
                      profile
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-secondary">Preview:</span>
                    <p className="mt-1">
                      See how your pattern will look on GitHub before generating
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-foreground/5 rounded-lg p-4"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <h5 className="font-semibold mb-3 flex items-center">
                  <FiTrendingUp className="w-4 h-4 mr-2 text-accent" />
                  Best Practices
                </h5>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    Keep patterns readable - avoid too much detail
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    Test with different intensity levels for better visibility
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    Consider your existing contributions when planning timing
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    Save your work frequently using the save feature
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        ),
      },
      {
        id: "repository-setup",
        title: "Repository Setup",
        icon: <AiOutlineGithub className="w-5 h-5" />,
        category: "advanced",
        estimatedTime: "6 min",
        content: (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-primary">
                Setting Up Your Repository
              </h4>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center gap-1 flex-nowrap text-nowrap">
                <FiClock className="w-3 h-3" />6 min read
              </span>
            </div>
            <p className="text-foreground/80">
              Proper repository setup is crucial for your contribution patterns
              to appear correctly on your GitHub profile.
            </p>
            <div className="grid gap-4">
              <motion.div
                className="bg-foreground/5 rounded-lg p-4 border-l-4 border-primary"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <h5 className="font-semibold mb-3 flex items-center">
                  <FiGitBranch className="w-4 h-4 mr-2 text-primary" />
                  Step 1: Create a New Repository
                </h5>
                <div className="space-y-3 text-sm text-foreground/80">
                  <p>1. Go to GitHub and create a new repository</p>
                  <p>
                    2. Name it something like &quot;contribution-art&quot; or
                    &quot;github-patterns&quot;
                  </p>
                  <p>
                    3. Make sure it&apos;s set to <strong>Public</strong>
                  </p>
                  <p>4. Add other details or readme file if you want</p>
                </div>
              </motion.div>

              <motion.div
                className="bg-foreground/5 rounded-lg p-4 border-l-4 border-accent"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <h5 className="font-semibold mb-3 flex items-center">
                  <FiSettings className="w-4 h-4 mr-2 text-accent" />
                  Step 2: Configure Git
                </h5>
                <div className="space-y-3 text-sm text-foreground/80">
                  <p>
                    Make sure your git configuration matches your GitHub
                    account:
                  </p>
                  <div className="bg-background/50 rounded p-3 font-mono text-xs">
                    git config user.name &quot;Your GitHub Username&quot;
                    <br />
                    git config user.email
                    &quot;your-github-email@example.com&quot;
                  </div>{" "}
                  <p className="text-warning-text">
                    ⚠️ The email must match the one associated with your GitHub
                    account
                  </p>
                </div>
              </motion.div>
            </div>{" "}
            <div className="bg-success-bg border border-success-border rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <BiShield className="h-5 w-5 text-success-text" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-success-text">
                    Important Notes
                  </h3>
                  <div className="mt-2 text-sm text-success-text/90">
                    <ul className="list-disc list-inside space-y-1">
                      <li>
                        Repository must be public for contributions to show
                      </li>
                      <li>
                        Your git email must match your GitHub account email
                      </li>
                      <li>Commits must be made from the correct date/time</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "generating-scripts",
        title: "Generating Scripts",
        icon: <FiDownload className="w-5 h-5" />,
        category: "advanced",
        estimatedTime: "8 min",
        content: (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-primary">
                Script Generation & Execution
              </h4>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center gap-1 flex-nowrap text-nowrap">
                <FiClock className="w-3 h-3" />8 min read
              </span>
            </div>
            <p className="text-foreground/80">
              Learn how to generate and execute the scripts that will create
              your contribution patterns.
            </p>
            <div className="grid gap-4">
              <motion.div
                className="bg-foreground/5 rounded-lg p-4"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                {" "}
                <h5 className="font-semibold mb-3 flex items-center">
                  <FiDownload className="w-4 h-4 mr-2 text-primary" />
                  Generating Your Script
                </h5>
                <div className="space-y-3 text-sm text-foreground/80">
                  <p>1. Complete your pattern design on the draw page</p>
                  <p>
                    2. Set your desired start date and contribution intensity
                  </p>
                  <p>
                    3. Click &quot;Generate Script&quot; to create your bash
                    script
                  </p>
                  <p>4. Download the generated script for your pattern</p>
                  <div className="bg-info-bg border border-info-border rounded-lg p-3 mt-4">
                    <p className="font-medium text-info-text">
                      Smart Repository Generation
                    </p>
                    <p className="mt-1 text-info-text/90">
                      The generated script includes smart repository detection
                      and creation. If you have GitHub CLI installed, the script
                      will automatically create a new repository if it
                      doesn&apos;t exist. <br />
                      <strong>Note:</strong> You must create the repository
                      first if not using GitHub CLI.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-foreground/5 rounded-lg p-4"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <h5 className="font-semibold mb-3 flex items-center">
                  <FiRefreshCw className="w-4 h-4 mr-2 text-secondary" />
                  Script Execution
                </h5>
                <div className="space-y-3 text-sm text-foreground/80">
                  <div>
                    <span className="font-medium text-secondary">
                      For Bash:
                    </span>
                    <div className="bg-background/50 rounded p-3 font-mono text-xs mt-2">
                      chmod +x gitgenix.sh
                      <br />
                      ./gitgenix.sh
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-foreground/5 rounded-lg p-4"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <h5 className="font-semibold mb-3 flex items-center">
                  <FiCalendar className="w-4 h-4 mr-2 text-accent" />
                  Timing Considerations
                </h5>
                <div className="space-y-3 text-sm text-foreground/80">
                  <div>
                    <span className="font-medium text-accent">Start Date:</span>
                    <p className="mt-1">
                      Choose a date that aligns with your desired pattern
                      placement
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-accent">
                      Execution Time:
                    </span>
                    <p className="mt-1">
                      Scripts can take several minutes to complete for large
                      patterns
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-accent">
                      GitHub Sync:
                    </span>
                    <p className="mt-1">
                      It may take a few minutes for changes to appear on your
                      profile
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>{" "}
            <div className="bg-warning-bg border border-warning-border rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <FiZap className="h-5 w-5 text-warning-text" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-warning-text">
                    Before Running Scripts
                  </h3>
                  <div className="mt-2 text-sm text-warning-text/90">
                    <ul className="list-disc list-inside space-y-1">
                      <li>
                        Make sure you&apos;re in the correct repository
                        directory
                      </li>
                      <li>
                        Backup your repository if it contains important data
                      </li>
                      <li>Test with a small pattern first to verify setup</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "sharing-patterns",
        title: "Sharing & Saving",
        icon: <FiShare2 className="w-5 h-5" />,
        category: "sharing",
        estimatedTime: "5 min",
        content: (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-primary">
                Share Your Creations
              </h4>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center gap-1 flex-nowrap text-nowrap">
                <FiClock className="w-3 h-3" />5 min read
              </span>
            </div>

            <p className="text-foreground/80">
              Save your patterns and share them with the community or keep them
              for future use.
            </p>

            <div className="grid gap-4">
              <motion.div
                className="bg-foreground/5 rounded-lg p-4"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <h5 className="font-semibold mb-3 flex items-center">
                  <FiDownload className="w-4 h-4 mr-2 text-primary" />
                  Saving Patterns
                </h5>
                <div className="space-y-3 text-sm text-foreground/80">
                  <p>• Save patterns locally to your browser&apos;s storage</p>
                  <p>• Export patterns as JSON files for backup</p>
                  <p>• Import previously saved patterns</p>
                  <p>• Create pattern collections for different themes</p>
                </div>
              </motion.div>

              <motion.div
                className="bg-foreground/5 rounded-lg p-4"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <h5 className="font-semibold mb-3 flex items-center">
                  <FiShare2 className="w-4 h-4 mr-2 text-secondary" />
                  Sharing Options
                </h5>
                <div className="space-y-3 text-sm text-foreground/80">
                  <p>• Generate shareable URLs for your patterns</p>
                  <p>• Copy pattern data to clipboard</p>
                  <p>• Export as image for social media</p>
                  <p>• Share scripts with friends and colleagues</p>
                </div>
              </motion.div>

              <motion.div
                className="bg-foreground/5 rounded-lg p-4"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <h5 className="font-semibold mb-3 flex items-center">
                  <BiRocket className="w-4 h-4 mr-2 text-accent" />
                  Community Features
                </h5>
                <div className="space-y-3 text-sm text-foreground/80">
                  <p>• Browse community-created patterns</p>
                  <p>• Vote and favorite popular designs</p>
                  <p>• Submit your own patterns to the gallery</p>
                  <p>• Follow trending pattern creators</p>
                </div>
              </motion.div>
            </div>
          </div>
        ),
      },
      {
        id: "documentation-help",
        title: "Documentation & Help",
        icon: <FiBookOpen className="w-5 h-5" />,
        category: "help",
        estimatedTime: "2 min",
        content: (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-primary">
                Getting Help & Support
              </h4>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center gap-1 flex-nowrap text-nowrap">
                <FiClock className="w-3 h-3" />2 min read
              </span>
            </div>

            <p className="text-foreground/80">
              Access help resources whenever you need guidance.
            </p>

            <div className="grid gap-4">
              <motion.div
                className="bg-foreground/5 rounded-lg p-4"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <h5 className="font-semibold mb-3 flex items-center">
                  <FiHelpCircle className="w-4 h-4 mr-2 text-secondary" />
                  Help Resources
                </h5>
                <div className="space-y-3 text-sm text-foreground/80">
                  <p>• Comprehensive FAQ section</p>
                  <p>• Video tutorials and examples</p>
                  <p>• Common troubleshooting solutions</p>
                  <p>• Community forum discussions</p>
                </div>
              </motion.div>

              <motion.div
                className="bg-foreground/5 rounded-lg p-4"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <h5 className="font-semibold mb-3 flex items-center">
                  <BiRocket className="w-4 h-4 mr-2 text-accent" />
                  Quick Actions
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <Link
                    href="/draw"
                    className="flex items-center justify-center px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm"
                  >
                    <FiEdit3 className="w-4 h-4 mr-2" />
                    Start Drawing
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        ),
      },
      {
        id: "troubleshooting",
        title: "Troubleshooting",
        icon: <FiHelpCircle className="w-5 h-5" />,
        category: "help",
        estimatedTime: "6 min",
        content: (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-primary">
                Common Issues & Solutions
              </h4>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center gap-1 flex-nowrap text-nowrap">
                <FiClock className="w-3 h-3" />6 min read
              </span>
            </div>

            <div className="grid gap-4">
              {" "}
              <motion.div
                className="bg-danger-bg border border-danger-border rounded-lg p-4"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <h5 className="font-semibold mb-3 text-danger-text">
                  Pattern Not Showing on GitHub
                </h5>
                <div className="space-y-3 text-sm text-danger-text/90">
                  <p>
                    <strong>Issue:</strong> Contributions aren&apos;t appearing
                    on your GitHub profile
                  </p>
                  <p>
                    <strong>Solutions:</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Verify repository is public</li>
                    <li>Check git email matches GitHub account</li>{" "}
                    <li>Wait 5-10 minutes for GitHub to sync</li>
                    <li>Refresh your GitHub profile page</li>
                  </ul>
                </div>
              </motion.div>{" "}
              <motion.div
                className="bg-warning-bg border border-warning-border rounded-lg p-4"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <h5 className="font-semibold mb-3 text-warning-text">
                  Script Execution Errors
                </h5>
                <div className="space-y-3 text-sm text-warning-text/90">
                  <p>
                    <strong>Issue:</strong> Script fails to run or produces
                    errors
                  </p>
                  <p>
                    <strong>Solutions:</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Check you&apos;re in the correct directory</li>
                    <li>Verify script permissions (chmod +x for bash)</li>
                    <li>Ensure git is properly configured</li>
                    <li>Check for special characters in file names</li>
                  </ul>
                </div>
              </motion.div>
              <motion.div
                className="bg-info-bg border border-info-border rounded-lg p-4"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <h5 className="font-semibold mb-3 text-info-text">
                  Performance Issues
                </h5>
                <div className="space-y-3 text-sm text-info-text/90">
                  <p>
                    <strong>Issue:</strong> App running slowly or freezing
                  </p>
                  <p>
                    <strong>Solutions:</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Clear browser cache and reload</li>
                    <li>Close other browser tabs</li>
                    <li>Try a different browser</li>
                    <li>Reduce pattern complexity</li>
                  </ul>
                </div>
              </motion.div>
              <motion.div
                className="bg-success-bg border border-success-border rounded-lg p-4"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <h5 className="font-semibold mb-3 text-success-text">
                  Need More Help?
                </h5>
                <div className="space-y-3 text-sm text-success-text/90">
                  <p>If you&apos;re still experiencing issues:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Check our FAQ section</li>
                    <li>Visit the community forum</li>
                    <li>Contact support via email</li>
                    <li>Report bugs on our GitHub repository</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        ),
      },
    ],
    [cardVariants]
  );

  // Filter sections based on active category
  const filteredSections = useMemo(() => {
    if (activeCategory === "all") return sections;
    return sections.filter((section) => section.category === activeCategory);
  }, [sections, activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-foreground mb-4"
              variants={cardVariants}
            >
              User Guide
            </motion.h1>
            <motion.p
              className="text-xl text-foreground/80 max-w-2xl mx-auto"
              variants={cardVariants}
            >
              Everything you need to know to create stunning GitHub contribution
              art with Gitgenix
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}{" "}
          <motion.div
            className="lg:col-span-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="sticky top-20 md:top-24 space-y-6 md:max-h-[calc(100vh-100px)] overflow-y-auto pr-2 pb-4">
              {/* Category Filter */}
              <div className="bg-foreground/5 rounded-lg p-4">
                <h3 className="font-semibold mb-3 text-foreground">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full text-left p-2 rounded-lg transition-colors flex items-center ${
                        activeCategory === category.id
                          ? "bg-primary text-white"
                          : "hover:bg-foreground/10 text-foreground/80"
                      }`}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {category.icon}
                      <span className="ml-2 text-sm">{category.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
              {/* Quick Navigation */}
              <div className="bg-foreground/5 rounded-lg p-4">
                <h3 className="font-semibold mb-3 text-foreground">
                  Quick Jump
                </h3>
                <div className="space-y-2">
                  {filteredSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="w-full text-left p-2 rounded-lg hover:bg-foreground/10 transition-colors flex items-center text-sm text-foreground/80"
                      disabled={isScrolling}
                    >
                      {section.icon}
                      <span className="ml-2 truncate">{section.title}</span>
                    </button>
                  ))}
                </div>
              </div>{" "}
              {/* Quick Actions */}
              <div className="bg-foreground/5 rounded-lg p-4">
                <h3 className="font-semibold mb-3 text-foreground">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/draw"
                    className="w-full flex items-center p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm"
                  >
                    <FiEdit3 className="w-4 h-4 mr-2" />
                    Start Drawing
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
          {/* Main Content */}
          <motion.div
            className="lg:col-span-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                {filteredSections.map((section) => (
                  <motion.div
                    key={section.id}
                    id={section.id}
                    className="bg-foreground/5 rounded-lg overflow-hidden"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-foreground/10 transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="bg-primary/10 text-primary p-2 rounded-lg mr-4">
                          {section.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {section.title}
                          </h3>
                          {section.estimatedTime && (
                            <p className="text-sm text-foreground/60 mt-1">
                              Estimated reading time: {section.estimatedTime}
                            </p>
                          )}
                        </div>
                      </div>
                      <motion.div
                        animate={{
                          rotate: expandedSections.includes(section.id)
                            ? 180
                            : 0,
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
                          transition={{ duration: 0.3, ease: "easeInOut" }}
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
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors z-50"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileHover="hover"
            whileTap="tap"
          >
            <FiArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
