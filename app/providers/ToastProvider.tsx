"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      containerStyle={{
        zIndex: 200, // Higher than navigation but lower than modals
        top: "5rem", // Position below navigation bar
      }}
      toastOptions={{
        style: {
          background:
            "color-mix(in srgb, var(--color-background) 60%, transparent)",
          color: "var(--color-foreground)",
          border:
            "1px solid color-mix(in srgb, var(--color-foreground) 20%, transparent)",
          backdropFilter: "blur(10px)",
        },
        // Success toasts
        success: {
          iconTheme: {
            primary: "var(--color-success-text)",
            secondary: "var(--color-background)",
          },
        },

        // Error toasts
        error: {
          iconTheme: {
            primary: "var(--color-danger-text)",
            secondary: "var(--color-background)",
          },
        },

        // Loading toasts
        loading: {
          iconTheme: {
            primary: "var(--color-primary)",
            secondary: "var(--color-background)",
          },
        },
      }}
    />
  );
}
