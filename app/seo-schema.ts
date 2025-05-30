// SEO Schema and structured data configurations for Gitgenix
import { WebSite, Organization, SoftwareApplication, Article } from 'schema-dts';

export const organizationSchema: Organization = {
  "@type": "Organization",
  name: "Gitgenix",
  url: "https://gitgenix.netlify.app",
  logo: "https://gitgenix.netlify.app/logo/Gitgenix.svg",
  description: "GitHub Contribution Art Creator - Transform your GitHub profile with stunning visual stories",
  founder: {
    "@type": "Person",
    name: "Sujal Patel",
    url: "https://github.com/thesujalpatel"
  },
  sameAs: [
    "https://github.com/thesujalpatel",
  ]
};

export const websiteSchema: WebSite = {
  "@type": "WebSite",
  name: "Gitgenix",
  url: "https://gitgenix.netlify.app",
  description: "Create beautiful GitHub contribution art and patterns with Gitgenix. Design, generate, and share stunning visual stories on your GitHub profile.",
  publisher: organizationSchema,
  potentialAction: {
    "@type": "SearchAction",
    target: "https://gitgenix.netlify.app/gallery?search={search_term_string}"
  }
};

export const softwareApplicationSchema: SoftwareApplication = {
  "@type": "SoftwareApplication",
  name: "Gitgenix",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web Browser",
  description: "Create beautiful GitHub contribution art and patterns. Design, generate, and share stunning visual stories on your GitHub profile.",
  url: "https://gitgenix.netlify.app",
  screenshot: "https://gitgenix.netlify.app/Banner.png",
  author: organizationSchema,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "150",
    bestRating: "5"
  },
  featureList: [
    "Visual contribution graph editor",
    "Custom pattern creation",
    "Shell script generation",
    "GitHub integration",
    "Template gallery",
    "Intensity level control"
  ]
};

export const articleSchema = (title: string, description: string, url: string, datePublished?: string): Article => ({
  "@type": "Article",
  headline: title,
  description: description,
  url: url,
  author: organizationSchema,
  publisher: organizationSchema,
  datePublished: datePublished || "2024-01-01T00:00:00Z",
  dateModified: new Date().toISOString(),
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": url
  },
  image: `${url}/Banner.png`
});

export const generateStructuredData = (type: 'website' | 'software' | 'article', options?: any) => {
  const baseData = {
    "@context": "https://schema.org"
  };

  switch (type) {
    case 'website':
      return { ...baseData, ...websiteSchema };
    case 'software':
      return { ...baseData, ...softwareApplicationSchema };
    case 'article':
      return { ...baseData, ...articleSchema(options.title, options.description, options.url, options.datePublished) };
    default:
      return { ...baseData, ...websiteSchema };
  }
};
