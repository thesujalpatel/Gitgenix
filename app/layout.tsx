import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Mona_Sans } from "next/font/google";
import Navigation from "./components/Navigation";
import ToastProvider from "./providers/ToastProvider";
import Footer from "./components/Footer";
import PerformanceOptimizer from "./components/PerformanceOptimizer";
import { AdminProvider } from "./contexts/AdminContext";
import { generateStructuredData } from "./seo-schema";

const monaSans = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-mona-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Gitgenix",
    default: "Gitgenix - GitHub Contribution Art Creator",
  },
  description:
    "Create beautiful GitHub contribution art and patterns with Gitgenix. Design, generate, and share stunning visual stories on your GitHub profile. Transform your commit history into artistic masterpieces.",
  keywords: [
    "GitHub contribution art",
    "GitHub contribution graph",
    "GitHub profile art",
    "contribution patterns",
    "GitHub visualization",
    "commit art",
    "GitHub profile enhancement",
    "contribution graph generator",
    "GitHub art creator",
    "coding art",
    "developer tools",
    "GitHub profile customization",
  ],
  authors: [{ name: "Sujal Patel", url: "https://github.com/thesujalpatel" }],
  creator: "Sujal Patel",
  publisher: "Sujal Patel",
  openGraph: {
    title: "Gitgenix - GitHub Contribution Art Creator",
    description:
      "Create beautiful GitHub contribution art and patterns. Design, generate, and share stunning visual stories on your GitHub profile.",
    url: "https://gitgenix.netlify.app",
    siteName: "Gitgenix",
    type: "website",
    images: [
      {
        url: "https://gitgenix.netlify.app/Banner.png",
        width: 1200,
        height: 630,
        alt: "Gitgenix - GitHub Contribution Art Creator",
      },
      {
        url: "https://gitgenix.netlify.app/logo/Gitgenix.svg",
        width: 512,
        height: 512,
        alt: "Gitgenix Logo",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gitgenix - GitHub Contribution Art Creator",
    description:
      "Create beautiful GitHub contribution art and patterns. Transform your GitHub profile with stunning visual stories.",
    images: ["https://gitgenix.netlify.app/Banner.png"],
    creator: "@thesujalpatel",
    site: "@Gitgenix_contrib",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "7vST1LuRmivtnvzubkePBXbUuQ0PQIjfC5TxIgvER6A",
  },
  category: "technology",
  alternates: {
    canonical: "https://gitgenix.netlify.app",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  other: {
    "msapplication-TileColor": "#2a7aef",
    "theme-color": "#2a7aef",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = generateStructuredData("website");

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Get saved theme or default to system
                  const savedTheme = localStorage.getItem('theme') || 'system';
                  
                  function applyTheme(theme) {
                    let themeToApply = theme;
                    
                    if (theme === 'system') {
                      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                      themeToApply = prefersDark ? 'dark' : 'light';
                    }
                    
                    // Apply data attribute for CSS selectors
                    document.documentElement.setAttribute('data-theme', themeToApply);
                    
                    // Apply class for immediate styling during loading
                    document.documentElement.className = 'theme-' + themeToApply;
                    
                    // Set meta theme color for browser UI
                    const themeColor = themeToApply === 'dark' ? '#0d1117' : '#ffffff';
                    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
                    if (!metaThemeColor) {
                      metaThemeColor = document.createElement('meta');
                      metaThemeColor.name = 'theme-color';
                      document.head.appendChild(metaThemeColor);
                    }
                    metaThemeColor.content = themeColor;
                  }
                  
                  // Apply theme immediately
                  applyTheme(savedTheme);
                  
                  // Listen for system theme changes if using system preference
                  if (savedTheme === 'system') {
                    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                    const handleChange = () => applyTheme('system');
                    
                    if (mediaQuery.addEventListener) {
                      mediaQuery.addEventListener('change', handleChange);
                    } else {
                      // Fallback for older browsers
                      mediaQuery.addListener(handleChange);
                    }
                  }
                } catch (error) {
                  // Fallback to light theme if anything fails
                  console.warn('Theme initialization failed, falling back to light theme:', error);
                  document.documentElement.setAttribute('data-theme', 'light');
                  document.documentElement.className = 'theme-light';
                  
                  // Set light theme color
                  const metaThemeColor = document.createElement('meta');
                  metaThemeColor.name = 'theme-color';
                  metaThemeColor.content = '#ffffff';
                  document.head.appendChild(metaThemeColor);
                }
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        {/* Additional SEO meta tags */}
        <meta name="application-name" content="Gitgenix" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Gitgenix" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Gitgenix",
              url: "https://gitgenix.netlify.app",
              description:
                "Create beautiful GitHub contribution art and patterns with Gitgenix. Design, generate, and share stunning visual stories on your GitHub profile.",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Person",
                name: "Sujal Patel",
                url: "https://github.com/thesujalpatel",
              },
              provider: {
                "@type": "Organization",
                name: "Sujal Patel",
                url: "https://github.com/thesujalpatel",
              },
              softwareVersion: "1.0.0",
              screenshot: "https://gitgenix.netlify.app/screenshot.png",
              featureList: [
                "Visual contribution pattern designer",
                "Automated shell script generation",
                "Pattern sharing and collaboration",
                "Multi-year contribution art",
                "GitHub profile enhancement",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={`antialiased ${monaSans.className}`}>
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-JCBHWE4SCE" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JCBHWE4SCE');
          `}
        </Script>
        <AdminProvider>
          <PerformanceOptimizer />
          <Navigation />
          <ToastProvider />
          <div className="min-h-screen pt-20 md:pt-24">{children}</div>
          <Footer />
        </AdminProvider>
      </body>
    </html>
  );
}
