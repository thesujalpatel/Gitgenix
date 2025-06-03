/**
 * Google Analytics Script Component
 * Loads GA4 scripts and initializes analytics
 */

import Script from "next/script";
import { GA_MEASUREMENT_ID, isAnalyticsEnabled } from "./gtag";

interface GoogleAnalyticsProps {
  measurementId?: string;
}

export default function GoogleAnalytics({
  measurementId = GA_MEASUREMENT_ID,
}: GoogleAnalyticsProps) {
  if (!isAnalyticsEnabled) {
    return null;
  }

  return (
    <>
      {/* Load GA4 gtag script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Google Analytics loaded successfully");
        }}
      />

      {/* Initialize GA4 */}
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', '${measurementId}', {
              // Enhanced measurement settings
              enhanced_measurement: {
                scrolls: true,
                outbound_clicks: true,
                site_search: true,
                video_engagement: true,
                file_downloads: true,
              },
              // Privacy and data settings
              anonymize_ip: true,
              allow_google_signals: false,
              cookie_flags: 'SameSite=None;Secure',
              // Performance settings
              send_page_view: true,
              // Debug mode for development
              debug_mode: ${process.env.NODE_ENV === "development"},
              // Custom dimensions for Gitgenix
              custom_map: {
                custom_parameter_1: 'pattern_type',
                custom_parameter_2: 'script_generated',
              },
            });
          `,
        }}
      />
    </>
  );
}
