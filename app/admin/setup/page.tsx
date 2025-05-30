"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createAdminUser } from "../../firebase/authService";
import { FiUser, FiMail, FiLock, FiShield, FiCheck } from "react-icons/fi";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function AdminSetupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsCreating(true);

    try {
      await createAdminUser(email, password, "super_admin", [
        "seo_management",
        "user_management",
        "content_management",
        "analytics_access",
        "system_settings",
      ]);

      setAccountCreated(true);
      toast.success("Admin account created successfully!", {
        icon: "🎉",
        duration: 5000,
      });
    } catch (error: any) {
      console.error("Account creation error:", error);
      toast.error(error.message || "Failed to create admin account");
    } finally {
      setIsCreating(false);
    }
  };

  if (accountCreated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-foreground/5 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-full mb-6">
            <FiCheck className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Admin Account Created!
          </h1>
          <p className="text-foreground/60 mb-8">
            Your admin account has been successfully created. You can now sign
            in to the admin dashboard.
          </p>
          <Link
            href="/admin"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            <FiShield className="w-5 h-5 mr-2" />
            Go to Admin Login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-foreground/5 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl p-8 shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
              <FiUser className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Create Admin Account
            </h1>
            <p className="text-foreground/60">
              Set up your first admin account
            </p>
          </motion.div>

          <form onSubmit={handleCreateAccount} className="space-y-6">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-foreground/5 border border-foreground/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-foreground placeholder-foreground/40"
                  placeholder="admin@example.com"
                  required
                />
              </div>
              <p className="mt-2 text-xs text-foreground/60">
                Make sure this email is added to the ADMIN_EMAILS list in
                authService.ts
              </p>
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-foreground/5 border border-foreground/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-foreground placeholder-foreground/40"
                  placeholder="Minimum 6 characters"
                  required
                  minLength={6}
                />
              </div>
            </motion.div>

            {/* Confirm Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40 w-5 h-5" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-foreground/5 border border-foreground/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-foreground placeholder-foreground/40"
                  placeholder="Confirm your password"
                  required
                  minLength={6}
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              type="submit"
              disabled={isCreating}
              className="w-full bg-primary text-white py-3 px-4 rounded-xl font-semibold hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isCreating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Creating Account...
                </>
              ) : (
                <>
                  <FiShield className="w-5 h-5 mr-2" />
                  Create Admin Account
                </>
              )}
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 text-center"
          >
            <Link
              href="/admin"
              className="text-primary hover:text-primary/80 text-sm transition-colors"
            >
              Already have an admin account? Sign in
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
