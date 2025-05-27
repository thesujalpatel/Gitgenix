"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import GitgenixLogo from "../assets/GitgenixLogo";

export default function Footer() {
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };
  return (
    <motion.div
      className="text-center text-foreground/50 text-sm flex items-center gap-2 w-full justify-center p-4 border-t border-foreground/10"
      variants={itemVariants}
    >
      <p>
        Founded with <GitgenixLogo className="inline-block w-4 h-4" /> by{" "}
        <Link
          href="https://thesujalpatel.github.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Sujal Patel
        </Link>
        <Link
          href="https://github.com/thesujalpatel/Gitgenix"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 transition-colors flex justify-center items-center gap-1"
        >
          <FaStar className="w-4 h-4" />
          Spark the Repository
        </Link>
      </p>{" "}
    </motion.div>
  );
}
