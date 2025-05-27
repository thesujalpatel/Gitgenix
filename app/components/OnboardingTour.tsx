"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiArrowRight,
  FiArrowLeft,
  FiPlay,
  FiEdit3,
  FiDownload,
  FiSettings,
} from "react-icons/fi";
import { BiPalette, BiSelectMultiple } from "react-icons/bi";
import { AiOutlineUser, AiOutlineGithub } from "react-icons/ai";
import { RiGitRepositoryLine } from "react-icons/ri";
import { GoGitBranch } from "react-icons/go";
import Link from "next/link";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  targetSelector?: string;
  position?: "top" | "bottom" | "left" | "right" | "center";
  icon: React.ReactNode;
}

interface OnboardingTourProps {
  isVisible: boolean;
  onClose: () => void;
  variant?: "welcome" | "guided" | "quick";
}

export default function OnboardingTour({
  isVisible,
  onClose,
  variant = "welcome",
}: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const welcomeSteps: OnboardingStep[] = [
    {
      id: "welcome",
      title: "Welcome to Gitgenix! 🎨",
      description: "Create beautiful GitHub contribution art",
      icon: <BiPalette className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-foreground/80 leading-relaxed">
            Gitgenix helps you create stunning visual patterns on your GitHub
            contribution graph. Transform your commit history into artistic
            masterpieces that showcase your coding journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center">
                <FiEdit3 className="mr-2" />
                Design Patterns
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Use our intuitive visual editor to click and drag your way to
                beautiful contribution art.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2 flex items-center">
                <FiDownload className="mr-2" />
                Generate Scripts
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Automatically generate shell scripts with perfect timing to
                create your art.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "how-it-works",
      title: "How It Works",
      description: "Simple 4-step process",
      icon: <FiPlay className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold shrink-0">
                1
              </span>
              <div>
                <h4 className="font-semibold">Choose Your Years</h4>
                <p className="text-sm text-foreground/70">
                  Select which years you want to include in your pattern
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold shrink-0">
                2
              </span>
              <div>
                <h4 className="font-semibold">Enter Repository Details</h4>
                <p className="text-sm text-foreground/70">
                  Fill in your GitHub username, repository, and branch
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold shrink-0">
                3
              </span>
              <div>
                <h4 className="font-semibold">Design Your Pattern</h4>
                <p className="text-sm text-foreground/70">
                  Click and drag on the contribution grid to create your art
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold shrink-0">
                4
              </span>
              <div>
                <h4 className="font-semibold">Generate & Run Script</h4>
                <p className="text-sm text-foreground/70">
                  Download and run the generated script to create your
                  contribution art
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "getting-started",
      title: "Ready to Start?",
      description: "Choose your adventure",
      icon: <FiArrowRight className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <p className="text-foreground/80">
            You&apos;re all set! Choose how you&apos;d like to begin your
            Gitgenix journey:
          </p>
          <div className="grid gap-4">
            <Link
              href="/draw"
              className="flex items-center justify-between p-4 bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors group"
              onClick={onClose}
            >
              <div className="flex items-center gap-3">
                <FiPlay className="w-5 h-5 text-primary" />
                <div>
                  <h4 className="font-semibold">Start Creating</h4>
                  <p className="text-sm text-foreground/70">
                    Jump right into the pattern designer
                  </p>
                </div>
              </div>
              <FiArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/guide"
              className="flex items-center justify-between p-4 bg-foreground/5 border border-foreground/20 rounded-lg hover:bg-foreground/10 transition-colors group"
              onClick={onClose}
            >
              <div className="flex items-center gap-3">
                <FiEdit3 className="w-5 h-5 text-foreground/70" />
                <div>
                  <h4 className="font-semibold">View Detailed Guide</h4>
                  <p className="text-sm text-foreground/70">
                    Learn all features and best practices
                  </p>
                </div>
              </div>
              <FiArrowRight className="w-5 h-5 text-foreground/70 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              💡 Quick Tip
            </h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Make sure you have a GitHub repository ready before generating
              scripts. The repository should be public and you need push access
              to it.
            </p>
          </div>
        </div>
      ),
    },
  ];

  const guidedSteps: OnboardingStep[] = [
    {
      id: "year-selector",
      title: "Select Years",
      description: "Choose which years to include",
      icon: <BiSelectMultiple className="w-6 h-6" />,
      targetSelector: "[data-onboarding='year-selector']",
      position: "bottom",
      content: (
        <div className="space-y-3">
          <p className="text-foreground/80">
            Start by selecting which years you want to include in your pattern.
            You can choose the current year and any past years.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Tip:</strong> Multi-year patterns create more impressive
              and complex artwork!
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "user-inputs",
      title: "Repository Details",
      description: "Enter your GitHub information",
      icon: <AiOutlineGithub className="w-6 h-6" />,
      targetSelector: "[data-onboarding='user-inputs']",
      position: "bottom",
      content: (
        <div className="space-y-3">
          <p className="text-foreground/80">
            Fill in your GitHub details. Make sure the repository exists and you
            have push access to it.
          </p>
          <div className="grid gap-2">
            <div className="flex items-center gap-2 text-sm">
              <AiOutlineUser className="w-4 h-4" />
              <span>
                <strong>Username:</strong> Your GitHub username
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <RiGitRepositoryLine className="w-4 h-4" />
              <span>
                <strong>Repository:</strong> Target repository name
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <GoGitBranch className="w-4 h-4" />
              <span>
                <strong>Branch:</strong> Usually &quot;main&quot; or
                &quot;master&quot;
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "contribution-graph",
      title: "Design Your Pattern",
      description: "Click and drag to create art",
      icon: <BiPalette className="w-6 h-6" />,
      targetSelector: "[data-onboarding='contribution-graph']",
      position: "top",
      content: (
        <div className="space-y-3">
          <p className="text-foreground/80">
            This is where the magic happens! Click on cells to set different
            contribution intensities (0-4). You can also click and drag to paint
            multiple cells at once.
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-200 rounded"></div>
              <span>Level 0: No contributions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-200 rounded"></div>
              <span>Level 1: 1-3 commits</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded"></div>
              <span>Level 2: 4-6 commits</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-600 rounded"></div>
              <span>Level 3: 7-9 commits</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "toolbar",
      title: "Use the Toolbar",
      description: "Intensity levels and script generation",
      icon: <FiSettings className="w-6 h-6" />,
      targetSelector: "[data-onboarding='toolbar']",
      position: "top",
      content: (
        <div className="space-y-3">
          <p className="text-foreground/80">
            The toolbar shows intensity level buttons and the script generation
            button. Once you&apos;ve filled in all required fields, you can
            generate your script here.
          </p>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>Ready to generate?</strong> The download button will
              appear when all fields are complete!
            </p>
          </div>
        </div>
      ),
    },
  ];

  const quickSteps: OnboardingStep[] = [
    {
      id: "quick-start",
      title: "Quick Start Guide",
      description: "Get started in 60 seconds",
      icon: <FiPlay className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="grid gap-3">
            <div className="flex items-center gap-3 p-3 bg-foreground/5 rounded-lg">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
                1
              </span>
              <span className="text-sm">
                Select years and enter GitHub details
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-foreground/5 rounded-lg">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
                2
              </span>
              <span className="text-sm">
                Click on the grid to create patterns
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-foreground/5 rounded-lg">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
                3
              </span>
              <span className="text-sm">Generate and run the script</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href="/draw"
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors text-center"
              onClick={onClose}
            >
              Start Now
            </Link>
            <Link
              href="/guide"
              className="flex-1 px-4 py-2 border border-foreground/20 rounded-lg text-sm font-semibold hover:bg-foreground/5 transition-colors text-center"
              onClick={onClose}
            >
              Full Guide
            </Link>
          </div>
        </div>
      ),
    },
  ];

  const steps =
    variant === "guided"
      ? guidedSteps
      : variant === "quick"
      ? quickSteps
      : welcomeSteps;
  const currentStepData = steps[currentStep];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStart = () => {
    setHasStarted(true);
    if (variant === "welcome") {
      setCurrentStep(1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("gitgenix-onboarding-completed", "true");
    onClose();
  };

  useEffect(() => {
    if (isVisible && variant === "guided") {
      const targetElement = currentStepData?.targetSelector
        ? document.querySelector(currentStepData.targetSelector)
        : null;

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [currentStep, isVisible, variant, currentStepData]);

  if (!isVisible || !currentStepData) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={variant === "welcome" ? undefined : onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative bg-background border border-foreground/20 rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-foreground/10">
            <div className="flex items-center gap-3">
              <div className="text-primary">{currentStepData.icon}</div>
              <div>
                <h2 className="text-xl font-bold">{currentStepData.title}</h2>
                <p className="text-sm text-foreground/70">
                  {currentStepData.description}
                </p>
              </div>
            </div>
            <button
              onClick={handleSkip}
              className="p-2 hover:bg-foreground/10 rounded-lg transition-colors"
              aria-label="Skip onboarding"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">{currentStepData.content}</div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-foreground/10">
            <div className="flex items-center gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep
                      ? "bg-primary"
                      : index < currentStep
                      ? "bg-primary/40"
                      : "bg-foreground/20"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-foreground/70">
                {currentStep + 1} of {steps.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {currentStep > 0 && variant === "welcome" && (
                <button
                  onClick={prevStep}
                  className="px-4 py-2 border border-foreground/20 rounded-lg hover:bg-foreground/5 transition-colors inline-flex items-center gap-2"
                >
                  <FiArrowLeft className="w-4 h-4" />
                  Back
                </button>
              )}

              {variant === "welcome" && currentStep === 0 && !hasStarted ? (
                <button
                  onClick={handleStart}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                >
                  Get Started
                  <FiArrowRight className="w-4 h-4" />
                </button>
              ) : currentStep < steps.length - 1 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                >
                  Next
                  <FiArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Get Started!
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
