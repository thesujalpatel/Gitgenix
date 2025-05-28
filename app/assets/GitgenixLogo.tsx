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

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    let isActive = true;

    const loop = async () => {
      if (!isActive || !isMounted) return;

      try {
        await controls.start(flickerAnimation());
        await new Promise((res) => setTimeout(res, Math.random() * 1000 + 500));
        if (isActive && isMounted) {
          loop();
        }
      } catch (error) {
        // Silently handle animation errors that occur during unmounting
        if (isActive) {
          console.error("Animation error:", error);
        }
      }
    };

    // Start animation after a small delay to ensure proper mounting
    const timeoutId = setTimeout(() => {
      if (isActive && isMounted) {
        loop();
      }
    }, 100);

    return () => {
      isActive = false;
      clearTimeout(timeoutId);
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
    setIsClient(true);
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
