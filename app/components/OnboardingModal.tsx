"use client";

import { useState, useEffect, useCallback } from "react";
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
import { AiOutlineGithub } from "react-icons/ai";
import { RiGitRepositoryLine } from "react-icons/ri";
import { GoGitBranch } from "react-icons/go";
import Link from "next/link";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  icon: React.ReactNode;
}

interface OnboardingModalProps {
  isVisible: boolean;
  onComplete: () => void;
  onClose: () => void;
}

export default function OnboardingModal({
  isVisible,
  onComplete,
  onClose,
}: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const steps: OnboardingStep[] = [
    {
      id: "welcome",
      title: "Welcome to Gitgenix! 🎨",
      description: "Create beautiful GitHub contribution art",
      icon: <BiPalette className="w-6 h-6" />,
      content: (
        <div className="text-center">
          <p className="text-lg mb-6 text-foreground/80">
            Transform your GitHub contribution graph into stunning visual art!
          </p>
          <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl p-6 mb-6">
            <h4 className="font-semibold mb-3 text-foreground">
              What you can do:
            </h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>• Design custom patterns for your GitHub profile</li>
              <li>• Generate automated commit scripts</li>
              <li>• Share your creations with the community</li>
              <li>• Create multi-year contribution art</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Learn the basics of creating contribution art",
      icon: <FiPlay className="w-6 h-6" />,
      content: (
        <div>
          <p className="text-lg mb-6 text-foreground/80">
            Ready to create your first contribution art? Here&apos;s how:
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-background/50 rounded-lg border border-foreground/10">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <div>
                <h4 className="font-semibold mb-1">Visit the Canvas</h4>
                <p className="text-sm text-foreground/70">
                  Go to the draw page to access the contribution graph canvas
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-background/50 rounded-lg border border-foreground/10">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <div>
                <h4 className="font-semibold mb-1">Design Your Pattern</h4>
                <p className="text-sm text-foreground/70">
                  Click on cells to create your unique contribution pattern
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-background/50 rounded-lg border border-foreground/10">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <div>
                <h4 className="font-semibold mb-1">Generate & Download</h4>
                <p className="text-sm text-foreground/70">
                  Generate the script and run it to apply your art to GitHub
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "navigation",
      title: "Navigation & Features",
      description: "Explore all the features available",
      icon: <FiSettings className="w-6 h-6" />,
      content: (
        <div>
          <p className="text-lg mb-6 text-foreground/80">
            Discover all the powerful features at your fingertips:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg border border-blue-500/20">
              <FiEdit3 className="w-6 h-6 text-blue-500 mb-2" />
              <h4 className="font-semibold mb-1 text-foreground">
                Canvas Tools
              </h4>
              <p className="text-sm text-foreground/70">
                Brush, patterns, and intensity controls for precise design
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-lg border border-green-500/20">
              <FiDownload className="w-6 h-6 text-green-500 mb-2" />
              <h4 className="font-semibold mb-1 text-foreground">
                Export Options
              </h4>
              <p className="text-sm text-foreground/70">
                Generate shell scripts for Windows, macOS, and Linux
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-lg border border-purple-500/20">
              <AiOutlineGithub className="w-6 h-6 text-purple-500 mb-2" />
              <h4 className="font-semibold mb-1 text-foreground">
                GitHub Integration
              </h4>
              <p className="text-sm text-foreground/70">
                Seamlessly works with your GitHub contribution timeline
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-lg border border-orange-500/20">
              <GoGitBranch className="w-6 h-6 text-orange-500 mb-2" />
              <h4 className="font-semibold mb-1 text-foreground">
                Version Control
              </h4>
              <p className="text-sm text-foreground/70">
                Save, share, and iterate on your contribution art designs
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "ready",
      title: "You're All Set! 🚀",
      description: "Start creating your contribution art masterpiece",
      icon: <BiSelectMultiple className="w-6 h-6" />,
      content: (
        <div className="text-center">
          <p className="text-lg mb-6 text-foreground/80">
            You&apos;re ready to start creating amazing GitHub contribution art!
          </p>
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl p-6 mb-6">
            <h4 className="font-semibold mb-3 text-foreground">Quick Tips:</h4>
            <ul className="space-y-2 text-sm text-foreground/70 text-left max-w-md mx-auto">
              <li>
                • Start with simple patterns and build complexity gradually
              </li>
              <li>• Use the User Guide for detailed instructions</li>
              <li>• Preview your design before generating the script</li>
              <li>• You can always restart this tour from the navigation</li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/draw"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
              onClick={onComplete}
            >
              <FiPlay className="w-4 h-4" />
              Start Creating
            </Link>
            <Link
              href="/guide"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-foreground/20 text-foreground rounded-lg hover:bg-foreground/5 transition-colors"
              onClick={onComplete}
            >
              <RiGitRepositoryLine className="w-4 h-4" />
              User Guide
            </Link>
          </div>
        </div>
      ),
    },
  ];

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, steps.length]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const handleComplete = useCallback(() => {
    onComplete();
    setCurrentStep(0);
    setHasStarted(false);
  }, [onComplete]);

  const handleClose = useCallback(() => {
    onClose();
    setCurrentStep(0);
    setHasStarted(false);
  }, [onClose]);

  const handleStart = useCallback(() => {
    setHasStarted(true);
  }, []);

  // Reset state when tour becomes visible
  useEffect(() => {
    if (isVisible && !hasStarted) {
      setCurrentStep(0);
    }
  }, [isVisible, hasStarted]);

  // Add keyboard navigation
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          handleClose();
          break;
        case "ArrowRight":
          if (hasStarted && currentStep < steps.length - 1) {
            nextStep();
          }
          break;
        case "ArrowLeft":
          if (hasStarted && currentStep > 0) {
            prevStep();
          }
          break;
        case "Enter":
          if (!hasStarted) {
            handleStart();
          } else if (currentStep === steps.length - 1) {
            handleComplete();
          } else {
            nextStep();
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    isVisible,
    hasStarted,
    currentStep,
    steps.length,
    handleClose,
    handleComplete,
    nextStep,
    prevStep,
    handleStart,
  ]);

  if (!isVisible) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4 pt-24"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-background border border-foreground/20 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto relative"
          role="dialog"
          aria-modal="true"
          aria-labelledby="onboarding-title"
          aria-describedby="onboarding-description"
        >
          {!hasStarted ? (
            // Welcome Screen
            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <BiPalette className="w-8 h-8 text-white" />
              </motion.div>
              <h2
                id="onboarding-title"
                className="text-3xl font-bold mb-4 text-foreground"
              >
                Welcome to Gitgenix! 🎨
              </h2>
              <p
                id="onboarding-description"
                className="text-lg text-foreground/70 mb-6 max-w-md mx-auto"
              >
                Ready to transform your GitHub profile with beautiful
                contribution art? Let&apos;s take a quick tour!
              </p>
              <div className="text-xs text-foreground/50 mb-6 space-y-1">
                <p>
                  💡 Use arrow keys to navigate • Press Enter to continue •
                  Press Escape to close
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleStart}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                >
                  <FiPlay className="w-4 h-4" />
                  Start Tour
                </button>
                <button
                  onClick={handleClose}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-foreground/20 text-foreground rounded-lg hover:bg-foreground/5 transition-colors"
                >
                  Skip for Now
                </button>
              </div>
            </div>
          ) : (
            // Tour Steps
            <>
              {/* Header */}
              <div className="border-b border-foreground/10 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      {steps[currentStep].icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {steps[currentStep].title}
                      </h3>
                      <p className="text-sm text-foreground/60">
                        {steps[currentStep].description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-foreground/5 rounded-lg transition-colors"
                    title="Close tour"
                  >
                    <FiX className="w-5 h-5 text-foreground/60" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-foreground/60 mb-2">
                    <span>
                      Step {currentStep + 1} of {steps.length}
                    </span>
                    <span>
                      {Math.round(((currentStep + 1) / steps.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-foreground/10 rounded-full h-2 relative overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full relative"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${((currentStep + 1) / steps.length) * 100}%`,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="text-xs text-foreground/40 mt-2 text-center">
                    Use ← → arrow keys to navigate
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 min-h-[300px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {steps[currentStep].content}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="border-t border-foreground/10 p-6">
                <div className="flex justify-between items-center">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="inline-flex items-center gap-2 px-4 py-2 text-foreground/60 hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-lg hover:bg-foreground/5"
                  >
                    <FiArrowLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <div className="flex items-center gap-2">
                    {steps.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentStep(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === currentStep
                            ? "bg-primary w-6"
                            : index <= currentStep
                            ? "bg-primary/60"
                            : "bg-foreground/20"
                        }`}
                        title={`Go to step ${index + 1}: ${steps[index].title}`}
                      />
                    ))}
                  </div>

                  {currentStep === steps.length - 1 ? (
                    <button
                      onClick={handleComplete}
                      className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg hover:from-primary/90 hover:to-primary/70 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                    >
                      Complete Tour
                      <FiPlay className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={nextStep}
                      className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                    >
                      Next
                      <FiArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
