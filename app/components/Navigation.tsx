"use client";

import ThemeSwitcher from "../hooks/ThemeSwitcher";
import { motion } from "framer-motion";
import Link from "next/link";
import { VscGithub } from "react-icons/vsc";
import ArcadiaLogo from "../assets/ArcadiaLogo";

export default function Navigation() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.5,
      }}
      className="flex items-center justify-between bg-background text-foreground border border-foreground/30 fixed top-0 left-0 right-0 z-50 py-2 px-4 w-[80%] mx-auto rounded-b-lg pt-10 -translate-y-8"
    >
      {" "}
      <Link href={"/"} className="font-bold flex items-center text-2xl">
        <ArcadiaLogo className="h-7 w-7 inline-block mr-2" />
        Arcadia
      </Link>
      <div className="flex items-center gap-2">
        <Link href={""}>
          <div className="w-10 h-10 rounded-2xl transition-all duration-300 ease-in-out border-[1.5] border-foreground/40 hover:scale-103 active:scale-95 focus:outline-none flex justify-center items-center bg-foreground/90 text-background">
            <VscGithub className="inline-block" size={24} />
          </div>
        </Link>
        <ThemeSwitcher />
      </div>
    </motion.nav>
  );
}
