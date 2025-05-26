import type { Metadata } from "next";

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
    url: "https://gitgenix-contrib.netlify.app/guide",
    images: [
      {
        url: "https://gitgenix-contrib.netlify.app/og-guide.png",
        width: 1200,
        height: 630,
        alt: "Gitgenix User Guide - Learn GitHub Contribution Art",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "User Guide & Documentation - Gitgenix",
    description:
      "Complete guide to creating GitHub contribution art. Learn how to design patterns, generate scripts, and create stunning visual stories.",
    images: ["https://gitgenix-contrib.netlify.app/og-guide.png"],
  },
  alternates: {
    canonical: "https://gitgenix-contrib.netlify.app/guide",
  },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
