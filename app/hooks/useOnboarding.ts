"use client";

import { useState, useEffect } from "react";

interface OnboardingState {
  hasCompletedWelcome: boolean;
  hasCompletedGuided: boolean;
  showWelcome: boolean;
  showGuided: boolean;
  showQuick: boolean;
}

export function useOnboarding() {
  const [state, setState] = useState<OnboardingState>({
    hasCompletedWelcome: false,
    hasCompletedGuided: false,
    showWelcome: false,
    showGuided: false,
    showQuick: false,
  });
  
  useEffect(() => {
    // Check localStorage for onboarding completion status
    const hasCompletedWelcome = localStorage.getItem('gitgenix-onboarding-completed') === 'true';
    const hasCompletedGuided = localStorage.getItem('gitgenix-guided-tour-completed') === 'true';

    setState(prev => ({
      ...prev,
      hasCompletedWelcome,
      hasCompletedGuided,
      // Show welcome tour on first visit if not completed
      showWelcome: !hasCompletedWelcome,
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
    localStorage.setItem('gitgenix-onboarding-completed', 'true');
    setState(prev => ({ 
      ...prev, 
      showWelcome: false, 
      hasCompletedWelcome: true 
    }));
  };

  const completeGuidedTour = () => {
    localStorage.setItem('gitgenix-guided-tour-completed', 'true');
    setState(prev => ({ 
      ...prev, 
      showGuided: false, 
      hasCompletedGuided: true 
    }));
  };

  const completeQuickTour = () => {
    setState(prev => ({ ...prev, showQuick: false }));
  };  const resetOnboarding = () => {
    // Clear all localStorage entries
    localStorage.removeItem('gitgenix-onboarding-completed');
    localStorage.removeItem('gitgenix-guided-tour-completed');
    
    // Reset all states
    setState({
      hasCompletedWelcome: false,
      hasCompletedGuided: false,
      showWelcome: false,
      showGuided: false,
      showQuick: false,
    });
    
    // Force a small delay to ensure clean state reset
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(void 0);
      }, 50);
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
