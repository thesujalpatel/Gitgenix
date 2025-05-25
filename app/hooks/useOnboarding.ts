"use client";

import { useState, useEffect } from "react";

interface OnboardingState {
  isFirstVisit: boolean;
  hasCompletedWelcome: boolean;
  hasCompletedGuided: boolean;
  showWelcome: boolean;
  showGuided: boolean;
  showQuick: boolean;
}

export function useOnboarding() {
  const [state, setState] = useState<OnboardingState>({
    isFirstVisit: true,
    hasCompletedWelcome: false,
    hasCompletedGuided: false,
    showWelcome: false,
    showGuided: false,
    showQuick: false,
  });

  useEffect(() => {
    // Check localStorage for onboarding completion status
    const hasCompletedWelcome = localStorage.getItem('arcadia-onboarding-completed') === 'true';
    const hasCompletedGuided = localStorage.getItem('arcadia-guided-tour-completed') === 'true';
    const visitCount = parseInt(localStorage.getItem('arcadia-visit-count') || '0');
    const isFirstVisit = visitCount === 0;

    // Update visit count
    localStorage.setItem('arcadia-visit-count', (visitCount + 1).toString());

    setState(prev => ({
      ...prev,
      isFirstVisit,
      hasCompletedWelcome,
      hasCompletedGuided,
      // Show welcome tour on first visit if not completed
      showWelcome: isFirstVisit && !hasCompletedWelcome,
    }));
  }, []);

  const startWelcomeTour = () => {
    setState(prev => ({ ...prev, showWelcome: true }));
  };

  const startGuidedTour = () => {
    setState(prev => ({ ...prev, showGuided: true }));
  };

  const startQuickTour = () => {
    setState(prev => ({ ...prev, showQuick: true }));
  };

  const completeWelcomeTour = () => {
    localStorage.setItem('arcadia-onboarding-completed', 'true');
    setState(prev => ({ 
      ...prev, 
      showWelcome: false, 
      hasCompletedWelcome: true 
    }));
  };

  const completeGuidedTour = () => {
    localStorage.setItem('arcadia-guided-tour-completed', 'true');
    setState(prev => ({ 
      ...prev, 
      showGuided: false, 
      hasCompletedGuided: true 
    }));
  };

  const completeQuickTour = () => {
    setState(prev => ({ ...prev, showQuick: false }));
  };

  const resetOnboarding = () => {
    localStorage.removeItem('arcadia-onboarding-completed');
    localStorage.removeItem('arcadia-guided-tour-completed');
    localStorage.removeItem('arcadia-visit-count');
    setState({
      isFirstVisit: true,
      hasCompletedWelcome: false,
      hasCompletedGuided: false,
      showWelcome: false,
      showGuided: false,
      showQuick: false,
    });
  };

  return {
    ...state,
    startWelcomeTour,
    startGuidedTour,
    startQuickTour,
    completeWelcomeTour,
    completeGuidedTour,
    completeQuickTour,
    resetOnboarding,
  };
}
