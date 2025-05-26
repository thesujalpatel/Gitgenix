import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Shared Pattern ${id} - Gitgenix | GitHub Contribution Art`,
    description:
      "View and import this shared GitHub contribution art pattern. Create beautiful visual stories on your GitHub profile with this custom design.",
    keywords: [
      "shared GitHub art pattern",
      "GitHub contribution art share",
      "contribution graph pattern",
      "GitHub art community",
      "shared commit art",
      "GitHub profile art",
      "contribution pattern import",
      "GitHub visualization share",
    ],
    openGraph: {
      title: `Shared Pattern - Gitgenix`,
      description:
        "View and import this shared GitHub contribution art pattern. Create beautiful visual stories on your GitHub profile.",
      type: "website",
      url: `https://gitgenix-contrib.netlify.app/draw/share/${id}`,
      images: [
        {
          url: "https://gitgenix-contrib.netlify.app/og-share.png",
          width: 1200,
          height: 630,
          alt: "Shared GitHub Contribution Art Pattern - Gitgenix",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Shared Pattern - Gitgenix`,
      description:
        "View and import this shared GitHub contribution art pattern. Create beautiful visual stories on your GitHub profile.",
      images: ["https://gitgenix-contrib.netlify.app/og-share.png"],
    },
    alternates: {
      canonical: `https://gitgenix-contrib.netlify.app/draw/share/${id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function ShareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
