"use client";

import React, { createContext, useContext } from "react";
import OnboardingModal from "./OnboardingModal";
import { useOnboarding } from "../hooks/useOnboarding";

interface OnboardingContextType {
  startTour: () => void;
  isVisible: boolean;
  hasCompleted: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export function useOnboardingContext() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error(
      "useOnboardingContext must be used within an OnboardingProvider"
    );
  }
  return context;
}

interface OnboardingProviderProps {
  children: React.ReactNode;
}

export default function OnboardingProvider({
  children,
}: OnboardingProviderProps) {
  const { isVisible, hasCompleted, startTour, completeTour, closeTour } =
    useOnboarding();

  const contextValue: OnboardingContextType = {
    startTour,
    isVisible,
    hasCompleted,
  };
  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
      <OnboardingModal
        isVisible={isVisible}
        onComplete={completeTour}
        onClose={closeTour}
      />
    </OnboardingContext.Provider>
  );
}
