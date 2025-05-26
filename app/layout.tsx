import type { Metadata } from "next";
import "./globals.css";
import { Mona_Sans } from "next/font/google";
import Navigation from "./components/Navigation";
import ToastProvider from "./providers/ToastProvider";
import Footer from "./components/Footer";

const monaSans = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-mona-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gitgenix - GitHub Contribution Art Creator",
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
    url: "https://Gitgenix-contrib.netlify.app",
    siteName: "Gitgenix",
    type: "website",
    images: [
      {
        url: "https://Gitgenix-contrib.netlify.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gitgenix - GitHub Contribution Art Creator",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gitgenix - GitHub Contribution Art Creator",
    description:
      "Create beautiful GitHub contribution art and patterns. Transform your GitHub profile with stunning visual stories.",
    images: ["https://Gitgenix-contrib.netlify.app/og-image.png"],
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
    google: "your-google-verification-code",
  },
  category: "technology",
  classification: "Developer Tools",
  alternates: {
    canonical: "https://gitgenix-contrib.netlify.app",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
              url: "https://gitgenix-contrib.netlify.app",
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
              screenshot: "https://gitgenix-contrib.netlify.app/screenshot.png",
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
      </head>
      <body className={`antialiased ${monaSans.className}`}>
        <Navigation />
        <ToastProvider />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
