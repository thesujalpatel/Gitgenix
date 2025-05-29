"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiBook,
  FiShare2,
  FiCode,
  FiZap,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import { AiFillThunderbolt } from "react-icons/ai";
import { BiPalette, BiRocket, BiHeart, BiShield } from "react-icons/bi";
import { RiGitRepositoryLine } from "react-icons/ri";
import GitgenixLogo from "./assets/GitgenixLogo";
import AnimatedTagline from "./components/AnimatedTagline";
import AnimatedText from "./components/AnimatedText";
import { getAnimationVariant } from "./utils/animationManager";

export default function Home() {
  // Animation variants using the animation manager
  const containerVariants = getAnimationVariant("container");
  const itemVariants = getAnimationVariant("slideWave");
  const buttonVariants = getAnimationVariant("buttonStable");
  const buttonSecondaryVariants = getAnimationVariant("buttonSecondaryStable");
  const iconButtonVariants = getAnimationVariant("iconButton");
  const logoVariants = getAnimationVariant("logoStable");
  const floatingVariants = getAnimationVariant("floating");
  const particleVariants = getAnimationVariant("cardRevealStable");
  const slideUpVariants = getAnimationVariant("slideUpRevealStable");

  const features = [
    {
      icon: <BiPalette className="w-7 h-7" />,
      title: "Visual Designer",
      description:
        "Intuitive drag-and-drop interface to create stunning contribution patterns with real-time preview",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <FiCode className="w-7 h-7" />,
      title: "Smart Scripts",
      description:
        "Auto-generated shell scripts with perfect timing and cross-platform compatibility",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FiShare2 className="w-7 h-7" />,
      title: "Easy Sharing",
      description:
        "Share your masterpieces with unique links and collaborate with the community",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <FiZap className="w-7 h-7" />,
      title: "Lightning Fast",
      description:
        "Optimized performance for smooth editing and instant script generation",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: <BiShield className="w-7 h-7" />,
      title: "Secure & Private",
      description:
        "Your data stays private with secure cloud storage and optional anonymization",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: <FiTrendingUp className="w-7 h-7" />,
      title: "Multi-Year Support",
      description:
        "Design patterns across multiple years with our advanced year selector and cross-year copying tools",
      gradient: "from-red-500 to-pink-500",
    },
  ];

  const stats = [
    { value: "0", label: "Patterns Created", icon: <BiPalette /> },
    { value: "0", label: "Happy Developers", icon: <FiUsers /> },
    {
      value: "0",
      label: "Scripts Generated",
      icon: <RiGitRepositoryLine />,
    },
    { value: "0", label: "Uptime", icon: <BiRocket /> },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-foreground/5 relative overflow-hidden">
      {" "}
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-48 h-48 bg-cyan-500/3 rounded-full blur-2xl"
          variants={particleVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 12, repeat: Infinity, delay: 4 }}
        />
      </div>
      <motion.main
        className="relative z-10 flex flex-col items-center justify-center p-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {" "}
        {/* Hero Section */}
        <motion.div
          className="text-center max-w-6xl mx-auto min-h-screen flex flex-col items-center justify-center"
          variants={itemVariants}
        >
          {/* Hero Header */}
          <motion.div variants={itemVariants}>
            <motion.h1
              className="mb-6 flex flex-col md:flex-row items-center justify-center gap-6"
              variants={itemVariants}
            >
              <motion.div
                variants={logoVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="cursor-pointer"
              >
                <motion.div variants={floatingVariants} animate="animate">
                  <GitgenixLogo className="h-16 w-16 md:h-20 md:w-20" />
                </motion.div>
              </motion.div>
              <AnimatedText
                text="Gitgenix"
                className="text-5xl md:text-7xl font-extrabold text-gradient-primary cursor-pointer"
                style={{
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden" as const,
                  display: "inline-block",
                }}
              />
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-8 text-foreground/80 font-medium"
              variants={itemVariants}
            >
              <AnimatedTagline />
            </motion.p>
          </motion.div>

          {/* Enhanced Description */}
          <motion.div
            className="max-w-4xl mx-auto mb-12"
            variants={itemVariants}
          >
            <motion.p
              className="text-lg md:text-xl text-foreground/70 mb-6 leading-relaxed"
              variants={itemVariants}
            >
              Transform your GitHub profile into a{" "}
              <span className="text-primary font-semibold">
                visual masterpiece
              </span>
              . Design intricate contribution patterns, generate perfect
              scripts, and tell your{" "}
              <span className="text-gradient-primary font-semibold">
                coding story
              </span>{" "}
              through art.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4 text-sm text-foreground/60"
              variants={itemVariants}
            >
              {[
                "No Coding Required",
                "Cross-Platform",
                "Real-time Preview",
                "Community Driven",
              ].map((tag, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 bg-foreground/5 border border-foreground/20 rounded-full"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(var(--color-primary-rgb), 0.1)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            variants={itemVariants}
          >
            <Link href="/draw">
              <motion.div
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                className="bg-primary text-white font-bold rounded-xl text-xl px-10 py-5 button-premium shadow-2xl flex items-center gap-3 relative z-10"
                whileHover="whileHover"
                whileTap="whileTap"
              >
                <motion.div
                  variants={iconButtonVariants}
                  className="icon-button"
                >
                  <AiFillThunderbolt className="w-6 h-6" />
                </motion.div>
                Start Creating Magic
              </motion.div>
            </Link>

            <Link href="/guide">
              <motion.div
                variants={buttonSecondaryVariants}
                initial="initial"
                className="border-2 border-foreground/30 text-foreground font-semibold rounded-xl text-xl px-10 py-5 button-elegant flex items-center gap-3 relative z-10"
                whileHover="whileHover"
                whileTap="whileTap"
              >
                <motion.div
                  variants={iconButtonVariants}
                  className="icon-button"
                >
                  <FiBook className="w-6 h-6" />
                </motion.div>
                Explore Guide
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20"
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="text-3xl mb-2 text-primary"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                >
                  {stat.icon}
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-foreground/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>{" "}
        {/* Enhanced Features Grid */}
        <motion.div
          className="w-full max-w-6xl mx-auto mb-20"
          variants={containerVariants}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-primary">
              Why Choose Gitgenix?
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Packed with powerful features designed to make your GitHub
              contribution graph shine like never before
            </p>
          </motion.div>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative p-8 bg-foreground/3 backdrop-blur-sm border border-foreground/20 rounded-2xl hover:bg-primary/5 transition-all duration-300"
                variants={particleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                whileHover="hover"
                style={{
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden" as const,
                }}
              >
                {/* Gradient border effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} text-white rounded-2xl mb-6 shadow-lg`}
                  variants={iconButtonVariants}
                  whileHover="whileHover"
                  whileTap="whileTap"
                >
                  {feature.icon}
                </motion.div>

                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-foreground/70 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Hover effect overlay */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>{" "}
        {/* Call to Action Section */}
        <motion.div
          className="w-full max-w-5xl mx-auto text-center py-20"
          variants={slideUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 rounded-3xl p-12 border border-primary/20"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-primary">
              Ready to Create Art?
            </h2>
            <p className="text-xl text-foreground/70 mb-8 max-w-3xl mx-auto">
              Join thousands of developers who are already transforming their
              GitHub profiles into visual stories. Start your journey today –
              it&apos;s completely free!
            </p>
            <motion.div
              variants={buttonVariants}
              whileHover="whileHover"
              whileTap="whileTap"
              className="inline-block"
            >
              <Link
                href="/draw"
                className="inline-flex items-center gap-3 bg-primary text-white font-bold rounded-xl text-xl px-12 py-6 button-premium shadow-2xl"
              >
                <BiHeart className="w-6 h-6" />
                Start Your Journey
                <AiFillThunderbolt className="w-6 h-6" />
              </Link>
            </motion.div>{" "}
          </motion.div>
        </motion.div>
      </motion.main>
    </div>
  );
}
