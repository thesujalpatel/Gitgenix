"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAdmin } from "../contexts/AdminContext";
import { signInAdmin, resetAdminPassword } from "../firebase/authService";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiLogIn,
  FiShield,
  FiLoader,
} from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { toast } from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const { isAuthenticated, isAdmin, loading } = useAdmin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && isAuthenticated && isAdmin) {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, isAdmin, loading, router]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSigningIn(true);
    setErrors({});

    try {
      await signInAdmin(email, password);
      toast.success("Successfully signed in!", {
        icon: "🎉",
        duration: 3000,
      });
      router.push("/admin/dashboard");
    } catch (error: any) {
      console.error("Sign in error:", error);

      let errorMessage = "Sign in failed. Please try again.";
      if (error.message.includes("Access denied")) {
        errorMessage = "Access denied. Admin privileges required.";
      } else if (error.message.includes("user-not-found")) {
        errorMessage = "No account found with this email address.";
      } else if (error.message.includes("wrong-password")) {
        errorMessage = "Incorrect password.";
      } else if (error.message.includes("too-many-requests")) {
        errorMessage = "Too many failed attempts. Please try again later.";
      }

      toast.error(errorMessage, {
        duration: 5000,
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setErrors({ email: "Please enter your email address first" });
      return;
    }

    setIsResettingPassword(true);

    try {
      await resetAdminPassword(email);
      toast.success("Password reset email sent! Check your inbox.", {
        icon: "📧",
        duration: 5000,
      });
    } catch (error: any) {
      console.error("Password reset error:", error);

      let errorMessage = "Failed to send password reset email.";
      if (error.message.includes("user-not-found")) {
        errorMessage = "No account found with this email address.";
      } else if (error.message.includes("Access denied")) {
        errorMessage = "This email is not authorized for admin access.";
      }

      toast.error(errorMessage, {
        duration: 5000,
      });
    } finally {
      setIsResettingPassword(false);
    }
  };

  // Show loading while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-foreground/5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-foreground/60">Loading...</p>
        </motion.div>
      </div>
    );
  }

  // Redirect if already authenticated (backup check)
  if (isAuthenticated && isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-foreground/5 p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
              <RiAdminLine className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Admin Login
            </h1>
            <p className="text-foreground/60">
              Sign in to access the admin dashboard
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSignIn}
            className="space-y-6"
          >
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground/80"
              >
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email)
                      setErrors({ ...errors, email: undefined });
                  }}
                  className={`w-full pl-10 pr-4 py-3 bg-foreground/5 border rounded-xl text-foreground placeholder-foreground/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${
                    errors.email ? "border-red-500" : "border-foreground/20"
                  }`}
                  placeholder="admin@gitgenix.com"
                  disabled={isSigningIn}
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground/80"
              >
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors({ ...errors, password: undefined });
                  }}
                  className={`w-full pl-10 pr-12 py-3 bg-foreground/5 border rounded-xl text-foreground placeholder-foreground/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${
                    errors.password ? "border-red-500" : "border-foreground/20"
                  }`}
                  placeholder="Enter your password"
                  disabled={isSigningIn}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/40 hover:text-foreground/60 transition-colors"
                  disabled={isSigningIn}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <AnimatePresence>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Sign In Button */}
            <motion.button
              type="submit"
              disabled={isSigningIn}
              whileHover={{ scale: isSigningIn ? 1 : 1.02 }}
              whileTap={{ scale: isSigningIn ? 1 : 0.98 }}
              className="w-full bg-primary text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSigningIn ? (
                <>
                  <FiLoader className="animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <FiLogIn />
                  <span>Sign In</span>
                </>
              )}
            </motion.button>

            {/* Forgot Password */}
            <div className="text-center">
              <button
                type="button"
                onClick={handlePasswordReset}
                disabled={isResettingPassword || isSigningIn}
                className="text-sm text-primary hover:text-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResettingPassword ? "Sending..." : "Forgot your password?"}
              </button>
            </div>
          </motion.form>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl"
          >
            <div className="flex items-start space-x-3">
              <FiShield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm text-foreground/80">
                <p className="font-medium text-primary mb-1">Security Notice</p>
                <p>
                  This is a restricted area. Only authorized administrators can
                  access the admin dashboard. All login attempts are logged.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-6 text-sm text-foreground/60"
        >
          <p>Having trouble? Contact your system administrator</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
