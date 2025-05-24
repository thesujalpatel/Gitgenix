import IntensitySelector from "./IntensitySelector";
import GenerateScriptButton from "./GenerateScriptButton";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  getAnimationPreferences,
  optimizeTransition,
} from "../../utils/performanceUtils";

type ToolbarProps = {
  selectedIntensity: number; // or string, depending on your use case
  setSelectedIntensity: (value: number) => void; // adjust the type if needed
  onGenerateScript: () => void;
  showGenerateScript: boolean;
  isFormComplete?: boolean;
};

export default function Toolbar({
  selectedIntensity,
  setSelectedIntensity,
  onGenerateScript,
  showGenerateScript,
  isFormComplete = false,
}: ToolbarProps) {
  const [animPrefs] = useState(() => getAnimationPreferences());

  const toolbarTransition = optimizeTransition(
    {
      duration: 0.5,
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
    animPrefs
  );

  return (
    <AnimatePresence>
      {showGenerateScript && (
        <motion.section
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={toolbarTransition}
          className="fixed bottom-0 left-1/2 -translate-x-1/2 bg-background/30 backdrop-blur-sm rounded-md border border-foreground/40 pb-10 translate-y-10 z-30"
        >
          <div className="flex justify-center items-center gap-2 p-2 px-4">
            <IntensitySelector
              selectedIntensity={selectedIntensity}
              setSelectedIntensity={setSelectedIntensity}
            />
            <GenerateScriptButton
              onClick={onGenerateScript}
              isEnabled={isFormComplete}
            />
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
