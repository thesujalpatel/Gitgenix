"use client";

import ThemeSwitcher from "../hooks/ThemeSwitcher";
import { motion } from "framer-motion";
import Link from "next/link";
import GitgenixLogo from "../assets/GitgenixLogo";
import { PiNotebook } from "react-icons/pi";

export default function Navigation() {
  const navTransition = {
    duration: 0.6,
    type: "spring" as const,
    stiffness: 100,
    damping: 20,
    delay: 0.5,
  };

  const logoTransition = {
    delay: 0.7,
    duration: 0.5,
  };

  const guideTransition = {
    duration: 0.3,
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={navTransition}
      className="flex items-center justify-between bg-background text-foreground border border-foreground/30 fixed top-0 left-0 right-0 z-50 py-2 px-4 w-[80%] mx-auto rounded-b-lg pt-10 -translate-y-8"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={logoTransition}
      >
        <Link href={"/"} className="font-bold flex items-center text-2xl">
          <GitgenixLogo className="h-7 w-7 inline-block mr-2" />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Gitgenix
          </motion.span>
        </Link>
      </motion.div>
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Link href={"/guide"} rel="noreferrer">
          {" "}
          <motion.div
            className="w-10 h-10 rounded-2xl border-[1.5] border-foreground/40 flex justify-center items-center bg-foreground/5 text-foreground"
            initial={{ rotate: 0 }}
            whileHover={{
              scale: 1.1,
              rotate: [0, -5, 5, -5, 0],
            }}
            whileTap={{ scale: 0.95 }}
            transition={guideTransition}
          >
            <PiNotebook className="inline-block" size={24} />
          </motion.div>
        </Link>
        <ThemeSwitcher />
      </motion.div>
    </motion.nav>
  );
}
