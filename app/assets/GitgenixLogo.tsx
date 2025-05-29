"use client";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

const flickerAnimation = () => ({
  opacity: [1, Math.random() * 0.6 + 0.4, 1],
  scale: [1, Math.random() * 0.02 + 0.98, 1],
  filter: [
    "brightness(1)",
    `brightness(${Math.random() * 0.4 + 0.8})`,
    "brightness(1)",
  ],
  transition: {
    duration: Math.random() * 0.8 + 0.4,
    ease: "easeInOut",
    type: "tween", // Better for performance
  },
});

function FlickeringRect({
  x,
  y,
  className,
  isSimple = false,
}: {
  x: number;
  y: number;
  className: string;
  isSimple?: boolean;
}) {
  const controls = useAnimationControls();
  const [isMounted, setIsMounted] = useState(false);

  // Safely handle component mounting state
  useEffect(() => {
    // Short delay to ensure DOM is ready
    const mountTimeout = setTimeout(() => {
      setIsMounted(true);
    }, 50);

    return () => {
      clearTimeout(mountTimeout);
      setIsMounted(false);
    };
  }, []);
  useEffect(() => {
    // Only run animation if the component is mounted
    if (!isMounted) return;

    let isActive = true;
    let timeoutId: NodeJS.Timeout;

    // Create a safer animation loop with better cleanup
    const startAnimation = () => {
      if (!isActive || !isMounted) return;

      // Simple animation sequence with proper error handling
      controls
        .start(flickerAnimation())
        .then(() => {
          // Only schedule next animation if component is still mounted
          if (isActive && isMounted) {
            timeoutId = setTimeout(startAnimation, Math.random() * 1000 + 500);
          }
        })
        .catch((error) => {
          // Only log errors if component is still active
          if (isActive) {
            console.error("Animation error:", error);
          }
        });
    };

    // Start animation with a delay to ensure DOM is ready
    timeoutId = setTimeout(startAnimation, 300);
    return () => {
      isActive = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      // Safely stop animations when unmounting
      controls.stop();
    };
  }, [controls, isMounted, isSimple]);

  return (
    <motion.rect
      x={x}
      y={y}
      width="222"
      height="222"
      rx="30"
      fill="currentColor"
      className={className}
      animate={controls}
    />
  );
}

export default function GitgenixLogo(props: React.SVGProps<SVGSVGElement>) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Small delay to ensure hydration is complete
    const hydrationTimeout = setTimeout(() => {
      setIsClient(true);
    }, 100);

    return () => clearTimeout(hydrationTimeout);
  }, []);

  return (
    <svg
      {...props}
      width="500"
      height="500"
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {isClient ? (
        <>
          <FlickeringRect x={264} y={14} className="text-cell-3" />
          <FlickeringRect x={264} y={264} className="text-cell-4" />
          <FlickeringRect x={14} y={14} className="text-cell-1" />
          <FlickeringRect x={14} y={264} className="text-cell-2" />
        </>
      ) : (
        // Static version for SSR
        <>
          <rect
            x={264}
            y={14}
            width="222"
            height="222"
            rx="30"
            fill="currentColor"
            className="text-cell-3"
          />
          <rect
            x={264}
            y={264}
            width="222"
            height="222"
            rx="30"
            fill="currentColor"
            className="text-cell-4"
          />
          <rect
            x={14}
            y={14}
            width="222"
            height="222"
            rx="30"
            fill="currentColor"
            className="text-cell-1"
          />
          <rect
            x={14}
            y={264}
            width="222"
            height="222"
            rx="30"
            fill="currentColor"
            className="text-cell-2"
          />
        </>
      )}
    </svg>
  );
}
