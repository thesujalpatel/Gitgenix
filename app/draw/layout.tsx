import type { Metadata } from "next";
import { generateBreadcrumb } from "../utils/seo";

export const metadata: Metadata = {
  title: "Draw & Create Patterns - Gitgenix | GitHub Contribution Art Creator",
  description:
    "Create stunning GitHub contribution art patterns with our visual editor. Design custom patterns, set intensity levels, and generate shell scripts to transform your GitHub profile.",
  keywords: [
    "GitHub contribution pattern editor",
    "contribution graph designer",
    "GitHub art creator tool",
    "commit pattern generator",
    "GitHub profile customizer",
    "contribution art designer",
    "GitHub visualization tool",
    "pixel art editor",
    "GitHub graph patterns",
    "contribution intensity editor",
  ],
  openGraph: {
    title: "Draw & Create Patterns - Gitgenix",
    description:
      "Create stunning GitHub contribution art patterns with our visual editor. Design custom patterns and generate shell scripts.",
    type: "website",
    url: "https://gitgenix.netlify.app/draw",
    images: [
      {
        url: "https://gitgenix.netlify.app/draw/BannerDraw.png",
        width: 1200,
        height: 630,
        alt: "Gitgenix Pattern Editor - Create GitHub Contribution Art",
      },
      {
        url: "https://gitgenix.netlify.app/logo/Gitgenix.svg",
        width: 512,
        height: 512,
        alt: "Gitgenix Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Draw & Create Patterns - Gitgenix",
    description:
      "Create stunning GitHub contribution art patterns with our visual editor. Design custom patterns and generate shell scripts.",
    images: ["https://gitgenix.netlify.app/draw/BannerDraw.png"],
  },
  alternates: {
    canonical: "https://gitgenix.netlify.app/draw",
  },
};

export default function DrawLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = generateBreadcrumb("/draw");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {children}
    </>
  );
}
