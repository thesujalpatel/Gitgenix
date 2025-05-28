"use client";

import { useState, useEffect } from "react";

interface OnboardingState {
  hasCompleted: boolean;
  isVisible: boolean;
}

export function useOnboarding() {
  const [state, setState] = useState<OnboardingState>({
    hasCompleted: false,
    isVisible: false,
  });

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompleted = localStorage.getItem('gitgenix-onboarding-completed') === 'true';
    
    setState({
      hasCompleted,
      // Show onboarding automatically only on first visit
      isVisible: !hasCompleted,
    });
  }, []);
  const startTour = () => {
    console.log("startTour called, current state:", state);
    setState(prev => {
      const newState = { ...prev, isVisible: true };
      console.log("Setting new state:", newState);
      return newState;
    });
  };

  const completeTour = () => {
    localStorage.setItem('gitgenix-onboarding-completed', 'true');
    setState({ hasCompleted: true, isVisible: false });
  };

  const closeTour = () => {
    setState(prev => ({ ...prev, isVisible: false }));
  };

  const resetOnboarding = () => {
    localStorage.removeItem('gitgenix-onboarding-completed');
    setState({ hasCompleted: false, isVisible: false });
  };

  return {
    hasCompleted: state.hasCompleted,
    isVisible: state.isVisible,
    startTour,
    completeTour,
    closeTour,
    resetOnboarding,
  };
}
