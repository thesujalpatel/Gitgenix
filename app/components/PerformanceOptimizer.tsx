"use client";

import { useEffect } from "react";

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical resources
    const preloadResources = [
      { href: "/logo/Gitgenix.svg", as: "image" },
      { href: "/Banner.png", as: "image" },
    ];

    preloadResources.forEach((resource) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = resource.href;
      link.as = resource.as;
      document.head.appendChild(link);
    });

    // Prefetch next likely pages
    const prefetchPages = ["/draw", "/gallery", "/guide", "/admin"];
    prefetchPages.forEach((page) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = page;
      document.head.appendChild(link);
    });

    // Add resource hints for external domains
    const dnsPrefetchDomains = [
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
      "https://www.googletagmanager.com",
    ];

    dnsPrefetchDomains.forEach((domain) => {
      if (
        !document.querySelector(`link[rel="dns-prefetch"][href="${domain}"]`)
      ) {
        const link = document.createElement("link");
        link.rel = "dns-prefetch";
        link.href = domain;
        document.head.appendChild(link);
      }
    });

    // Add viewport meta tag for mobile optimization
    if (!document.querySelector('meta[name="viewport"]')) {
      const viewportMeta = document.createElement("meta");
      viewportMeta.name = "viewport";
      viewportMeta.content =
        "width=device-width, initial-scale=1, viewport-fit=cover";
      document.head.appendChild(viewportMeta);
    }

    // Add color-scheme for dark mode support
    if (!document.querySelector('meta[name="color-scheme"]')) {
      const colorSchemeMeta = document.createElement("meta");
      colorSchemeMeta.name = "color-scheme";
      colorSchemeMeta.content = "light dark";
      document.head.appendChild(colorSchemeMeta);
    }

    // Optimize images with lazy loading attributes
    const images = document.querySelectorAll("img:not([loading])");
    images.forEach((img, index) => {
      // First few images should load eagerly, rest lazy
      img.setAttribute("loading", index < 3 ? "eager" : "lazy");
      img.setAttribute("decoding", "async");
    });

    // Web Vitals monitoring (if needed)
    if (typeof window !== "undefined" && "PerformanceObserver" in window) {
      // Monitor Largest Contentful Paint
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === "largest-contentful-paint") {
            console.log("LCP:", entry.startTime);
          }
        });
      });

      try {
        observer.observe({ entryTypes: ["largest-contentful-paint"] });
      } catch (e) {
        // Fallback for browsers that don't support this
      }
    }
  }, []);

  return null;
}
