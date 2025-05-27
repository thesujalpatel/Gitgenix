import React, { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegUser } from "react-icons/fa";
import { RiGitRepositoryLine } from "react-icons/ri";
import { GoGitBranch } from "react-icons/go";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { getAnimationVariant } from "../../utils/animationManager";

interface UserInputsProps {
  username: string;
  setUsername: (v: string) => void;
  repository: string;
  setRepository: (v: string) => void;
  branch: string;
  setBranch: (v: string) => void;
}

// Create a common input component to reduce duplication
const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  icon,
  sublabel,
  index,
  id,
}: {
  label: string;
  sublabel?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: React.ReactNode;
  index: number;
  id: string;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  // Use centralized animation system
  const itemVariant = getAnimationVariant("item");
  const buttonVariant = getAnimationVariant("button");

  // Direct transition values
  const containerTransition = {
    duration: 0.4,
    delay: index * 0.15,
    type: "spring" as const,
    stiffness: 100,
    damping: 15,
  };

  const focusTransition = {
    duration: 0.2,
  };

  return (
    <motion.section
      className="mb-2"
      variants={itemVariant}
      initial="initial"
      animate="animate"
      transition={containerTransition}
    >
      <motion.label
        htmlFor={id}
        className="font-semibold mb-1 flex items-center gap-2 text-sm"
        initial={{ opacity: 0.8 }}
        animate={{
          opacity: isFocused ? 1 : 0.8,
          color: isFocused ? "var(--color-primary)" : "inherit",
        }}
        transition={focusTransition}
      >
        {" "}
        <motion.span
          animate={{
            scale: isFocused ? 1.1 : 1,
            color: isFocused ? "var(--color-primary)" : "inherit",
          }}
          transition={focusTransition}
          className="text-lg"
        >
          {icon}
        </motion.span>
        {label}
        <span className="text-primary">*</span>
        {sublabel && (
          <span
            className="relative inline-block"
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
            onFocus={() => setTooltipVisible(true)}
            onBlur={() => setTooltipVisible(false)}
          >
            {" "}
            <motion.span
              variants={buttonVariant}
              whileHover="whileHover"
              whileTap="whileTap"
              transition={focusTransition}
            >
              <AiOutlineQuestionCircle
                className="text-foreground/60 cursor-help"
                aria-label={`Help for ${label}`}
                tabIndex={0}
                role="button"
                title={`Information about ${label}`}
              />
            </motion.span>
            <AnimatePresence>
              {tooltipVisible && (
                <motion.span
                  className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-10 bg-background text-foreground text-xs rounded shadow-lg px-3 py-2 whitespace-pre-line min-w-[180px] border-[1.5] border-foreground/40 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2 }}
                  role="tooltip"
                >
                  {sublabel}
                  <motion.div className="absolute w-2 h-2 bg-background border-b border-r border-foreground/40 transform rotate-45 left-1/2 -bottom-1 -ml-1" />
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        )}
      </motion.label>

      <motion.div
        initial={{ boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)" }}
        animate={{
          boxShadow: isFocused
            ? "0px 4px 12px rgba(0, 0, 0, 0.08)"
            : "0px 0px 0px rgba(0, 0, 0, 0)",
        }}
        transition={{ duration: 0.3 }}
        className="rounded-lg"
      >
        <motion.input
          required
          id={id}
          type="text"
          value={value}
          onChange={onChange}
          className="border-[1.5] border-foreground/40 rounded-lg px-3 py-2 w-full transition-all duration-200 focus:outline-none"
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-required="true"
          aria-label={label}
          style={{
            borderColor: isFocused ? "var(--color-primary)" : "",
          }}
        />
      </motion.div>
    </motion.section>
  );
};

// Memoize the component to prevent unnecessary re-renders
const UserInputs = memo(function UserInputs({
  username,
  setUsername,
  repository,
  setRepository,
  branch,
  setBranch,
}: UserInputsProps) {
  // Use centralized animation system
  const containerVariant = getAnimationVariant("container");
  const containerTransition = {
    duration: 0.5,
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5 relative"
      variants={containerVariant}
      initial="initial"
      animate="animate"
      transition={containerTransition}
      data-onboarding="user-inputs"
    >
      <InputField
        id="github-username"
        label="GitHub Username"
        sublabel="Your GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your GitHub username"
        icon={<FaRegUser />}
        index={0}
      />
      <InputField
        id="repository-name"
        label="Repository Name"
        sublabel="A repository name in which you want to generate contributions. Repository must be public"
        value={repository}
        onChange={(e) => setRepository(e.target.value)}
        placeholder="Enter your repository name"
        icon={<RiGitRepositoryLine />}
        index={1}
      />
      <InputField
        id="branch-name"
        label="Branch Name"
        sublabel="A branch name in which you want to generate contributions"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
        placeholder="Enter your branch name"
        icon={<GoGitBranch />}
        index={2}
      />

      {/* Removed the enhanced visual indicator animations for better performance */}
    </motion.div>
  );
});

export default UserInputs;
