/**
 * Analytics Provider Component
 * Initializes Google Analytics and provides tracking context
 */

"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePageTracking } from "@/analytics/hooks";
import { initGA } from "@/analytics/gtag";

interface AnalyticsProviderProps {
  children: React.ReactNode;
  measurementId?: string;
}

export default function AnalyticsProvider({
  children,
  measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
}: AnalyticsProviderProps) {
  // Initialize page tracking
  usePageTracking();

  useEffect(() => {
    if (measurementId) {
      initGA();
    }
  }, [measurementId]);

  // Don't load analytics in development unless explicitly enabled
  const shouldLoadAnalytics =
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true";

  if (!shouldLoadAnalytics || !measurementId) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Google Analytics Scripts */}{" "}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: true,
              custom_map: {
                'custom_parameter_1': 'pattern_type',
                'custom_parameter_2': 'script_type',
                'custom_parameter_3': 'user_journey_step'
              }
            });
          `,
        }}
      />
      {children}
    </>
  );
}
