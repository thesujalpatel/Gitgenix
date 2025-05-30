import type { Metadata } from "next";
import { generateBreadcrumb } from "../utils/seo";

export const metadata: Metadata = {
  title: "Gallery - Gitgenix | GitHub Contribution Art Templates",
  description:
    "Explore our curated gallery of stunning GitHub contribution art examples and templates. Get inspired by community-created patterns and start building your own masterpiece.",
  keywords: [
    "GitHub contribution art examples",
    "contribution pattern templates",
    "GitHub art gallery",
    "contribution graph examples",
    "GitHub profile inspiration",
    "commit art patterns",
    "contribution design templates",
    "GitHub visualization examples",
    "contribution pattern gallery",
    "GitHub art showcase",
  ],
  openGraph: {
    title: "Gallery - Gitgenix",
    description:
      "Explore stunning GitHub contribution art examples and templates. Get inspired by community-created patterns.",
    type: "website",
    url: "https://gitgenix.netlify.app/gallery",
    images: [
      {
        url: "https://gitgenix.netlify.app/gallery/BannerGallery.png",
        width: 1200,
        height: 630,
        alt: "Gitgenix Gallery - GitHub Contribution Art Templates",
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
    title: "Gallery - Gitgenix",
    description:
      "Explore stunning GitHub contribution art examples and templates. Get inspired by community-created patterns.",
    images: ["https://gitgenix.netlify.app/gallery/BannerGallery.png"],
  },
  alternates: {
    canonical: "https://gitgenix.netlify.app/gallery",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = generateBreadcrumb("/gallery");

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
