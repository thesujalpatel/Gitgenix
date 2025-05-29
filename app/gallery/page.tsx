"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiClock,
  FiEdit3,
  FiGithub,
  FiStar,
  FiUsers,
  FiTrendingUp,
  FiZap,
  FiHeart,
  FiArrowRight,
} from "react-icons/fi";
import { BiPalette, BiRocket } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import { getAnimationVariant } from "../utils/animationManager";

export default function GalleryPage() {
  // Animation variants using the animation manager
  const containerVariants = getAnimationVariant("container");
  const itemVariants = getAnimationVariant("slideWave");
  const buttonVariants = getAnimationVariant("buttonStable");
  const floatingVariants = getAnimationVariant("floating");
  const particleVariants = getAnimationVariant("cardRevealStable");

  const upcomingFeatures = [
    {
      icon: <BiPalette className="w-6 h-6" />,
      title: "Pattern Gallery",
      description:
        "Browse hundreds of community-created contribution art patterns",
      eta: "Coming Soon",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "Community Showcase",
      description:
        "Share your creations and discover patterns from other developers",
      eta: "Coming Soon",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FiStar className="w-6 h-6" />,
      title: "Featured Templates",
      description:
        "Ready-to-use templates for special occasions and celebrations",
      eta: "Coming Soon",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <FiTrendingUp className="w-6 h-6" />,
      title: "Trending Patterns",
      description:
        "Discover the most popular and trending contribution art designs",
      eta: "Coming Soon",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: <FiZap className="w-6 h-6" />,
      title: "Quick Import",
      description: "One-click import of patterns directly into your workspace",
      eta: "Coming Soon",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: <FiHeart className="w-6 h-6" />,
      title: "Favorites System",
      description:
        "Save and organize your favorite patterns for future reference",
      eta: "Coming Soon",
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-foreground/5 relative overflow-hidden">
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
        {/* Hero Section */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-16"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <FiClock className="w-4 h-4" />
            Coming Soon
          </motion.div>{" "}
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-6"
            variants={itemVariants}
          >
            <span className="text-gradient-primary">Gallery</span>
            <span className="text-foreground"> & Showcase</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-foreground/80 font-medium"
            variants={itemVariants}
          >
            Discover amazing GitHub contribution art patterns created by our
            community
          </motion.p>
          <motion.p
            className="text-lg text-foreground/70 mb-8 leading-relaxed max-w-3xl mx-auto"
            variants={itemVariants}
          >
            {" "}
            We&apos;re building the ultimate gallery of GitHub contribution art
            patterns, templates, and community showcases. Soon you&apos;ll be
            able to browse, favorite, and instantly import stunning patterns
            created by developers from around the world.
          </motion.p>
          {/* Action Buttons */}
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
                <BiRocket className="w-6 h-6" />
                Create Your Own
                <AiFillThunderbolt className="w-6 h-6" />
              </motion.div>
            </Link>

            <Link href="/guide">
              <motion.div
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                className="border-2 border-foreground/30 text-foreground font-semibold rounded-xl text-xl px-10 py-5 button-elegant flex items-center gap-3 relative z-10"
                whileHover="whileHover"
                whileTap="whileTap"
              >
                <FiGithub className="w-6 h-6" />
                Learn How It Works
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Upcoming Features Grid */}
        <motion.div
          className="w-full max-w-6xl mx-auto mb-20"
          variants={containerVariants}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-primary">
              What&apos;s Coming Soon
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Exciting features we&apos;re working on to make your GitHub
              contribution art experience even better
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative p-8 bg-foreground/3 backdrop-blur-sm border border-foreground/20 rounded-2xl hover:bg-primary/5 transition-all duration-300"
                variants={particleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                whileHover="hover"
              >
                {/* Gradient border effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} text-white rounded-2xl mb-6 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {feature.icon}
                </motion.div>

                <div className="space-y-2 mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-medium">
                    <FiClock className="w-3 h-3" />
                    {feature.eta}
                  </div>
                </div>

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
        </motion.div>

        {/* Notification Section */}
        <motion.div
          className="w-full max-w-4xl mx-auto text-center py-16"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 rounded-3xl p-8 border border-primary/20"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-2xl mb-6 shadow-lg"
              variants={floatingVariants}
              animate="animate"
            >
              <FiStar className="w-8 h-8" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-primary">
              Be the First to Know
            </h2>

            <p className="text-lg text-foreground/70 mb-6 max-w-2xl mx-auto">
              We&apos;re working hard to bring you an amazing gallery
              experience. Follow our progress and be notified when new features
              are ready!
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={itemVariants}
            >
              <Link href="/draw">
                <motion.div
                  className="inline-flex items-center gap-3 bg-primary text-white font-semibold rounded-xl px-8 py-4 button-premium shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiEdit3 className="w-5 h-5" />
                  Start Creating Now
                  <FiArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>

              <a
                href="https://github.com/thesujalpatel/Gitgenix"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border-2 border-foreground/30 text-foreground font-semibold rounded-xl px-8 py-4 button-elegant hover:bg-foreground/5 transition-colors"
              >
                <FiGithub className="w-5 h-5" />
                Star on GitHub
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.main>
    </div>
  );
}
