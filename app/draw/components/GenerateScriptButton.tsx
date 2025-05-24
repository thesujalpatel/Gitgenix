import React from "react";
import { LuCodeXml } from "react-icons/lu";
import { motion } from "framer-motion";

interface GenerateScriptButtonProps {
  onClick: () => void;
}

export default function GenerateScriptButton({
  onClick,
}: GenerateScriptButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
        duration: 0.1,
      }}
      type="button"
      onClick={onClick}
      className="bg-[#2a7aef]/80 border-blue-600 border text-white h-8 w-8 rounded-full flex items-center justify-center cursor-pointer"
      title="Generate shell script to create an art canvas"
    >
      <LuCodeXml className="inline-block" size={20} />
    </motion.button>
  );
}
