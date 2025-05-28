"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GlobalLoaderProps {
  children: React.ReactNode;
}

// Combined loading logo component (previously separate LoadingLogo component)
interface LoadingLogoProps {
  size?: number;
  message?: string;
  variant?: "flickering" | "loading";
  className?: string;
}

function LoadingLogo({
  size = 100,
  message = "Loading...",
  variant = "loading",
  className = "",
}: LoadingLogoProps) {
  // Container animation for loading
  const containerAnimation =
    variant === "loading"
      ? {
          animate: {},
          transition: {
            staggerChildren: 0.2,
            repeat: Infinity,
            repeatDelay: 0.5,
          },
        }
      : {
          animate: {
            opacity: [1, 0.6, 1],
            scale: [1, 0.98, 1],
            filter: ["brightness(1)", "brightness(0.8)", "brightness(1)"],
          },
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };

  // Individual box animations for loading sequence
  const boxAnimation =
    variant === "loading"
      ? {
          animate: {
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          },
          transition: {
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        }
      : {};
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {" "}
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          ...containerAnimation.animate,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          ...containerAnimation.transition,
        }}
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden" as const,
          color: "inherit",
        }}
      >
        {/* Top Left */}
        <motion.rect
          x="14"
          y="14"
          width="222"
          height="222"
          rx="30"
          fill="var(--color-cell-1)"
          {...boxAnimation}
        />

        {/* Top Right */}
        <motion.rect
          x="264"
          y="14"
          width="222"
          height="222"
          rx="30"
          fill="var(--color-cell-3)"
          {...boxAnimation}
          transition={{
            ...boxAnimation.transition,
            delay: 0.2,
          }}
        />

        {/* Bottom Left */}
        <motion.rect
          x="14"
          y="264"
          width="222"
          height="222"
          rx="30"
          fill="var(--color-cell-2)"
          {...boxAnimation}
          transition={{
            ...boxAnimation.transition,
            delay: 0.4,
          }}
        />

        {/* Bottom Right */}
        <motion.rect
          x="264"
          y="264"
          width="222"
          height="222"
          rx="30"
          fill="var(--color-cell-4)"
          {...boxAnimation}
          transition={{
            ...boxAnimation.transition,
            delay: 0.6,
          }}
        />
      </motion.svg>{" "}
      {message && (
        <motion.p
          className="mt-4 text-lg font-medium text-foreground/80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {message}
          <>
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
            >
              .
            </motion.span>
          </>
        </motion.p>
      )}
    </div>
  );
}

export default function GlobalLoader({ children }: GlobalLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    // Mark as hydrated once client-side
    setIsHydrated(true);

    // Add loading class to body to prevent scrolling
    document.body.classList.add("loading");

    // Check if page has been loaded before (to reduce loading time on subsequent visits)
    const hasVisited = sessionStorage.getItem("gitgenix-visited");
    const loadingDuration = hasVisited ? 800 : 1800; // Shorter loading for return visits

    // Wait for a minimum duration to show the loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Remove loading class from body
      document.body.classList.remove("loading");
      // Mark as visited for this session
      sessionStorage.setItem("gitgenix-visited", "true");
    }, loadingDuration);

    return () => {
      clearTimeout(timer);
      // Cleanup: remove loading class if component unmounts
      document.body.classList.remove("loading");
    };
  }, []);

  // Don't render loading screen during SSR to prevent hydration mismatch
  if (!isHydrated) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 0.95,
              transition: {
                duration: 0.6,
                ease: "easeInOut",
              },
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{
              // Use CSS variables for theme-aware colors
              backgroundColor: "var(--color-background)",
              color: "var(--color-foreground)",
              // Ensure it's above everything
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 100,
                },
              }}
              className="flex flex-col items-center px-6 text-center"
            >
              {" "}
              <LoadingLogo size={100} message="Welcome to Gitgenix" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.4,
                    duration: 0.6,
                  },
                }}
                className="mt-8 text-center max-w-md"
              >
                <motion.h2
                  className="text-xl font-semibold text-foreground mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  GitHub Contribution Art Studio
                </motion.h2>
                <motion.p
                  className="text-base text-foreground/70 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Preparing your creative workspace...
                </motion.p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: "100%",
                    transition: {
                      delay: 1.0,
                      duration: 1.0,
                      ease: "easeInOut",
                    },
                  }}
                  className="h-1 bg-gradient-to-r from-primary/30 via-primary to-primary/30 rounded-full"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: "easeOut",
              },
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
