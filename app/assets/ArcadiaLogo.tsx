"use client";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

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
}: {
  x: number;
  y: number;
  className: string;
}) {
  const controls = useAnimationControls();

  useEffect(() => {
    let isMounted = true;

    const loop = async () => {
      if (!isMounted) return;

      try {
        await controls.start(flickerAnimation());
        await new Promise((res) => setTimeout(res, Math.random() * 1000 + 500));
        if (isMounted) {
          loop();
        }
      } catch (error) {
        console.error("Animation error:", error);
      }
    };

    // Small delay to ensure component is mounted
    const timeoutId = setTimeout(() => {
      loop();
    }, 50);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [controls]);

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

export default function ArcadiaLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="500"
      height="500"
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <FlickeringRect x={264} y={14} className="text-cell-3" />
      <FlickeringRect x={264} y={264} className="text-cell-4" />
      <FlickeringRect x={14} y={14} className="text-cell-1" />
      <FlickeringRect x={14} y={264} className="text-cell-2" />
    </svg>
  );
}
