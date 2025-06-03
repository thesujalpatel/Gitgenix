"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import {
  onAdminAuthStateChanged,
  getAdminProfile,
  AdminUser,
  hasPermission,
  AdminPermission,
} from "@/firebase/authService";

interface AdminContextType {
  user: User | null;
  adminProfile: AdminUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  hasPermission: (permission: AdminPermission) => boolean;
  signOut: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [adminProfile, setAdminProfile] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAdminAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        const profile = await getAdminProfile(firebaseUser.uid);
        setAdminProfile(profile);
      } else {
        setAdminProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const checkPermission = (permission: AdminPermission): boolean => {
    return hasPermission(adminProfile, permission);
  };

  const handleSignOut = async () => {
    try {
      const { signOutAdmin } = await import("@/firebase/authService");
      await signOutAdmin();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value: AdminContextType = {
    user,
    adminProfile,
    loading,
    isAuthenticated: !!user,
    isAdmin: !!adminProfile?.isActive,
    hasPermission: checkPermission,
    signOut: handleSignOut,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
