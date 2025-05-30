"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface SEOEnhancementsProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  noIndex?: boolean;
}

export default function SEOEnhancements({
  title,
  keywords = [],
  noIndex = false,
}: SEOEnhancementsProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Add hreflang for international SEO (if needed in future)
    const hreflangLink = document.querySelector(
      'link[rel="alternate"][hreflang="en"]'
    );
    if (!hreflangLink) {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = "en";
      link.href = `https://gitgenix.netlify.app${pathname}`;
      document.head.appendChild(link);
    }

    // Add JSON-LD for current page tracking
    const pageViewSchema = {
      "@context": "https://schema.org",
      "@type": "Action",
      actionStatus: "CompletedActionStatus",
      object: {
        "@type": "WebPage",
        url: `https://gitgenix.netlify.app${pathname}`,
        name: title || document.title,
      },
      agent: {
        "@type": "Person",
        name: "User",
      },
    };

    const existingPageView = document.getElementById("page-view-schema");
    if (existingPageView) {
      existingPageView.remove();
    }

    const script = document.createElement("script");
    script.id = "page-view-schema";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(pageViewSchema);
    document.head.appendChild(script);

    // Add keywords meta tag if provided
    if (keywords.length > 0) {
      let keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (!keywordsMeta) {
        keywordsMeta = document.createElement("meta");
        keywordsMeta.setAttribute("name", "keywords");
        document.head.appendChild(keywordsMeta);
      }
      keywordsMeta.setAttribute("content", keywords.join(", "));
    }

    // Add robots meta tag
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }

    const robotsContent = noIndex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
    robotsMeta.setAttribute("content", robotsContent);

    // Add preconnect links for performance
    const preconnectDomains = [
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
      "https://www.google-analytics.com",
    ];

    preconnectDomains.forEach((domain) => {
      if (!document.querySelector(`link[rel="preconnect"][href="${domain}"]`)) {
        const link = document.createElement("link");
        link.rel = "preconnect";
        link.href = domain;
        if (domain.includes("gstatic")) {
          link.crossOrigin = "anonymous";
        }
        document.head.appendChild(link);
      }
    });

    return () => {
      // Cleanup function
      const pageViewScript = document.getElementById("page-view-schema");
      if (pageViewScript) {
        pageViewScript.remove();
      }
    };
  }, [pathname, title, keywords, noIndex]);

  return null; // This component doesn't render anything
}
