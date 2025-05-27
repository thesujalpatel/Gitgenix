import IntensitySelector from "./IntensitySelector";
import GenerateScriptButton from "./GenerateScriptButton";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { getAnimationVariant } from "../../utils/animationManager";

type ToolbarProps = {
  selectedIntensity: number; // or string, depending on your use case
  setSelectedIntensity: (value: number) => void; // adjust the type if needed
  onGenerateScript: () => void;
  showGenerateScript: boolean;
  isFormComplete?: boolean;
  onClearAll?: () => void;
};

export default function Toolbar({
  selectedIntensity,
  setSelectedIntensity,
  onGenerateScript,
  showGenerateScript,
  isFormComplete = false,
  onClearAll,
}: ToolbarProps) {
  const containerVariant = getAnimationVariant("container");
  const buttonVariant = getAnimationVariant("button");
  const handleClearAll = () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            <span className="font-medium">Clear all contributions?</span>
          </div>
          <p className="text-sm text-foreground/60">
            This action cannot be undone. All your work will be lost.
          </p>
          <div className="flex gap-2 justify-end">
            <button
              className="px-3 py-1 text-sm rounded bg-foreground/10 hover:bg-foreground/15 transition-colors"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
              onClick={() => {
                toast.dismiss(t.id);
                onClearAll?.();
                toast.success("All contributions cleared successfully!", {
                  icon: "🧹",
                  style: {
                    border: "1px solid var(--color-primary)",
                    padding: "12px",
                  },
                });
              }}
            >
              Clear All
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        style: {
          maxWidth: "400px",
          padding: "16px",
        },
      }
    );
  };
  return (
    <AnimatePresence>
      {showGenerateScript && (
        <motion.section
          {...containerVariant}
          className="fixed bottom-0 left-1/2 -translate-x-1/2 bg-background/30 backdrop-blur-sm rounded-md border border-foreground/40 pb-10 translate-y-10 z-30"
          data-onboarding="toolbar"
        >
          <div className="flex justify-center items-center gap-2 p-2 px-4">
            <IntensitySelector
              selectedIntensity={selectedIntensity}
              setSelectedIntensity={setSelectedIntensity}
            />
            {onClearAll && (
              <motion.button
                type="button"
                onClick={handleClearAll}
                {...buttonVariant}
                className="h-8 w-8 rounded-full flex items-center justify-center cursor-pointer bg-error/70 border border-error/90 text-white hover:bg-error/80 transition-colors duration-200"
                title="Clear all contributions"
              >
                <AiOutlineDelete size={16} />
              </motion.button>
            )}
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
