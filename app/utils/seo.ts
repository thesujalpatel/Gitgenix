// SEO utilities and constants for Gitgenix
export const SEO_CONSTANTS = {
  SITE_URL: 'https://gitgenix.netlify.app',
  SITE_NAME: 'Gitgenix',
  DEFAULT_TITLE: 'Gitgenix - GitHub Contribution Art Creator',
  DEFAULT_DESCRIPTION: 'Create beautiful GitHub contribution art and patterns with Gitgenix. Design, generate, and share stunning visual stories on your GitHub profile. Transform your commit history into artistic masterpieces.',
  AUTHOR: 'Sujal Patel',
  TWITTER_HANDLE: '@thesujalpatel',
  TWITTER_SITE: '@Gitgenix_contrib',
  GOOGLE_VERIFICATION: '7vST1LuRmivtnvzubkePBXbUuQ0PQIjfC5TxIgvER6A',
  THEME_COLOR: '#2a7aef',
  LOCALE: 'en_US'
};

export const SEO_KEYWORDS = {
  PRIMARY: [
    'GitHub contribution art',
    'GitHub contribution graph',
    'GitHub profile art',
    'contribution patterns',
    'GitHub visualization'
  ],
  SECONDARY: [
    'commit art',
    'GitHub profile enhancement',
    'contribution graph generator',
    'GitHub art creator',
    'coding art',
    'developer tools',
    'GitHub profile customization'
  ],
  LONG_TAIL: [
    'how to create GitHub contribution art',
    'GitHub profile pixel art',
    'custom GitHub contribution patterns',
    'GitHub commit history art',
    'visual GitHub profile enhancement'
  ]
};

export const generatePageTitle = (pageTitle: string): string => {
  return `${pageTitle} | ${SEO_CONSTANTS.SITE_NAME}`;
};

export const generateCanonicalUrl = (path: string): string => {
  return `${SEO_CONSTANTS.SITE_URL}${path}`;
};

export const generateOpenGraphImage = (route: string): string => {
  const routeImages: Record<string, string> = {
    '/': '/Banner.png',
    '/draw': '/draw/BannerDraw.png',
    '/gallery': '/gallery/BannerGallery.png',
    '/guide': '/guide/BannerGuide.png'
  };
  
  return `${SEO_CONSTANTS.SITE_URL}${routeImages[route] || routeImages['/']}`;
};

export const generateSquareImage = (): string => {
  return `${SEO_CONSTANTS.SITE_URL}/logo/Gitgenix.svg`;
};

// Breadcrumb data for better navigation SEO
export const generateBreadcrumb = (path: string) => {
  const pathSegments = path.split('/').filter(Boolean);
  const breadcrumbs = [
    { name: 'Home', url: SEO_CONSTANTS.SITE_URL }
  ];

  let currentPath = '';
  pathSegments.forEach(segment => {
    currentPath += `/${segment}`;
    const segmentName = segment.charAt(0).toUpperCase() + segment.slice(1);
    breadcrumbs.push({
      name: segmentName,
      url: `${SEO_CONSTANTS.SITE_URL}${currentPath}`
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

// FAQ Schema for guide page
export const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I create GitHub contribution art with Gitgenix?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use our visual editor to design patterns, set intensity levels, and generate shell scripts. Simply draw your pattern, configure the settings, and run the generated script to create beautiful contribution art on your GitHub profile."
      }
    },
    {
      "@type": "Question", 
      "name": "Is Gitgenix free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Gitgenix is completely free to use. Create unlimited patterns and generate as many scripts as you need for your GitHub profile enhancement."
      }
    },
    {
      "@type": "Question",
      "name": "Will this affect my existing GitHub repositories?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, Gitgenix creates new commits in a separate repository specifically for contribution art. Your existing repositories and their history remain completely unchanged."
      }
    },
    {
      "@type": "Question",
      "name": "Can I customize the intensity of my contribution patterns?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, you can set different intensity levels (0-4) for each cell in your pattern, giving you full control over the visual appearance of your contribution graph."
      }
    }
  ]
};
