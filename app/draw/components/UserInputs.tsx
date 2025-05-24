import React, { memo } from "react";
import { motion } from "framer-motion";
import { FaRegUser } from "react-icons/fa";
import { RiGitRepositoryLine } from "react-icons/ri";
import { GoGitBranch } from "react-icons/go";
import { AiOutlineQuestionCircle } from "react-icons/ai";

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
  sublable,
  index,
}: {
  label: string;
  sublable?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: React.ReactNode;
  index: number;
}) => (
  <motion.section
    className="mb-2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
  >
    <label className="font-semibold mb-1 flex items-center gap-2">
      {icon}
      {label}*
      {sublable && (
        <span className="relative group">
          <AiOutlineQuestionCircle
            className="text-foreground/60 cursor-pointer"
            aria-label={sublable}
          />
          <motion.span className="pointer-events-none opacity-0 group-hover:opacity-100 absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-10 bg-background text-foreground text-xs rounded shadow-lg px-3 py-2 whitespace-pre-line min-w-[180px] border-[1.5] border-foreground/40 text-center">
            {sublable}
          </motion.span>
        </span>
      )}
    </label>
    <motion.input
      required
      type="text"
      value={value}
      onChange={onChange}
      className="border-[1.5] border-foreground/40 rounded-lg px-3 py-2 w-full"
      placeholder={placeholder}
      whileFocus={{ scale: 1.02, borderColor: "rgb(99 102 241)" }}
      transition={{ duration: 0.2 }}
    />
  </motion.section>
);

// Memoize the component to prevent unnecessary re-renders
const UserInputs = memo(function UserInputs({
  username,
  setUsername,
  repository,
  setRepository,
  branch,
  setBranch,
}: UserInputsProps) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <InputField
        label="GitHub Username"
        sublable="your GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your GitHub username"
        icon={<FaRegUser />}
        index={0}
      />
      <InputField
        label="Repository Name"
        sublable="a repository name in which you want to generate contributions. Repository must be public"
        value={repository}
        onChange={(e) => setRepository(e.target.value)}
        placeholder="Enter your repository name"
        icon={<RiGitRepositoryLine />}
        index={1}
      />
      <InputField
        label="Branch Name"
        sublable="a branch name in which you want to generate contributions"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
        placeholder="Enter your branch name"
        icon={<GoGitBranch />}
        index={2}
      />
    </motion.div>
  );
});

export default UserInputs;
