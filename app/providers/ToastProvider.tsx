"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  // Base style for all toast types
  const baseToastStyle = {
    background: "color-mix(in srgb, var(--color-background) 60%, transparent)",
    color: "var(--color-foreground)",
    border:
      "1px solid color-mix(in srgb, var(--color-foreground) 20%, transparent)",
    backdropFilter: "blur(10px)",
  };

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        // Default style for all toasts
        style: baseToastStyle,

        // Success toasts
        success: {
          style: baseToastStyle,
          iconTheme: {
            primary: "var(--color-success-text)",
            secondary: "var(--color-background)",
          },
        },

        // Error toasts
        error: {
          style: baseToastStyle,
          iconTheme: {
            primary: "var(--color-danger-text)",
            secondary: "var(--color-background)",
          },
        },

        // Loading toasts
        loading: {
          style: baseToastStyle,
          iconTheme: {
            primary: "var(--color-primary)",
            secondary: "var(--color-background)",
          },
        },
      }}
    />
  );
}
