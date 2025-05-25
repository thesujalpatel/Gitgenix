"use client";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { getAnimationPreferences } from "../utils/performanceUtils";

const flickerAnimation = (isSimple: boolean = false) => ({
  opacity: isSimple ? [1, 0.8, 1] : [1, Math.random() * 0.6 + 0.4, 1],
  scale: isSimple ? [1] : [1, Math.random() * 0.02 + 0.98, 1],
  filter: isSimple
    ? ["brightness(1)"]
    : [
        "brightness(1)",
        `brightness(${Math.random() * 0.4 + 0.8})`,
        "brightness(1)",
      ],
  transition: {
    duration: isSimple ? 0.5 : Math.random() * 0.8 + 0.4,
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

  useEffect(() => {
    let isMounted = true;

    const loop = async () => {
      if (!isMounted) return;

      try {
        await controls.start(flickerAnimation(isSimple));
        await new Promise((res) =>
          setTimeout(res, isSimple ? 1000 : Math.random() * 1000 + 500)
        );
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
  }, [controls, isSimple]);

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
  const [animPrefs] = useState(() => getAnimationPreferences());

  return (
    <svg
      {...props}
      width="500"
      height="500"
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <FlickeringRect
        x={264}
        y={14}
        className="text-cell-3"
        isSimple={animPrefs.preferSimpleAnimations}
      />
      <FlickeringRect
        x={264}
        y={264}
        className="text-cell-4"
        isSimple={animPrefs.preferSimpleAnimations}
      />
      <FlickeringRect
        x={14}
        y={14}
        className="text-cell-1"
        isSimple={animPrefs.preferSimpleAnimations}
      />
      <FlickeringRect
        x={14}
        y={264}
        className="text-cell-2"
        isSimple={animPrefs.preferSimpleAnimations}
      />
    </svg>
  );
}
