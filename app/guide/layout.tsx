import type { Metadata } from "next";
import { generateStructuredData } from "../seo-schema";
import { FAQ_SCHEMA, generateBreadcrumb } from "../utils/seo";

export const metadata: Metadata = {
  title: "User Guide & Documentation - Gitgenix | GitHub Contribution Art",
  description:
    "Complete guide to creating GitHub contribution art with Gitgenix. Learn how to design patterns, generate scripts, troubleshoot issues, and create stunning visual stories on your GitHub profile.",
  keywords: [
    "GitHub contribution art guide",
    "Gitgenix tutorial",
    "GitHub art documentation",
    "contribution graph tutorial",
    "GitHub profile art guide",
    "commit art instructions",
    "GitHub visualization guide",
    "contribution pattern tutorial",
    "GitHub art help",
    "developer profile enhancement",
  ],
  openGraph: {
    title: "User Guide & Documentation - Gitgenix",
    description:
      "Complete guide to creating GitHub contribution art. Learn how to design patterns, generate scripts, and create stunning visual stories.",
    type: "article",
    url: "https://gitgenix.netlify.app/guide",
    images: [
      {
        url: "https://gitgenix.netlify.app/Banners/BannerGuide.png",
        width: 1200,
        height: 630,
        alt: "Gitgenix User Guide - Learn GitHub Contribution Art",
      },
      {
        url: "https://gitgenix.netlify.app/logo/GitgenixDark.png",
        width: 512,
        height: 512,
        alt: "Gitgenix Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "User Guide & Documentation - Gitgenix",
    description:
      "Complete guide to creating GitHub contribution art. Learn how to design patterns, generate scripts, and create stunning visual stories.",
    images: ["https://gitgenix.netlify.app/Banners/BannerGuide.png"],
  },
  alternates: {
    canonical: "https://gitgenix.netlify.app/guide",
  },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const articleSchema = generateStructuredData("article", {
    title: "User Guide & Documentation - Gitgenix",
    description:
      "Complete guide to creating GitHub contribution art. Learn how to design patterns, generate scripts, and create stunning visual stories.",
    url: "https://gitgenix.netlify.app/guide",
    datePublished: "2024-01-01T00:00:00Z",
  });

  const breadcrumbSchema = generateBreadcrumb("/guide");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(FAQ_SCHEMA),
        }}
      />
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
