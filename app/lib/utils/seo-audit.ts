/**
 * SEO Audit Script for Gitgenix
 * Run this script to check SEO implementation and get recommendations
 */

export interface SEOAuditResult {
  score: number;
  issues: string[];
  recommendations: string[];
  passed: string[];
}

export function auditPageSEO(): SEOAuditResult {
  const issues: string[] = [];
  const recommendations: string[] = [];
  const passed: string[] = [];
  let score = 100;

  // Check if running in browser
  if (typeof window === 'undefined') {
    return {
      score: 0,
      issues: ['SEO audit can only run in browser environment'],
      recommendations: ['Run this audit on the client side'],
      passed: []
    };
  }

  // Check meta title
  const title = document.title;
  if (!title || title.length === 0) {
    issues.push('Missing page title');
    score -= 15;
  } else if (title.length < 30 || title.length > 60) {
    issues.push(`Title length (${title.length}) should be between 30-60 characters`);
    score -= 5;
  } else {
    passed.push('Title length is optimal');
  }

  // Check meta description
  const description = document.querySelector('meta[name="description"]')?.getAttribute('content');
  if (!description) {
    issues.push('Missing meta description');
    score -= 15;
  } else if (description.length < 120 || description.length > 160) {
    issues.push(`Description length (${description.length}) should be between 120-160 characters`);
    score -= 5;
  } else {
    passed.push('Meta description length is optimal');
  }

  // Check Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  const ogUrl = document.querySelector('meta[property="og:url"]');

  if (!ogTitle) {
    issues.push('Missing Open Graph title');
    score -= 10;
  } else {
    passed.push('Open Graph title present');
  }

  if (!ogDescription) {
    issues.push('Missing Open Graph description');
    score -= 10;
  } else {
    passed.push('Open Graph description present');
  }

  if (!ogImage) {
    issues.push('Missing Open Graph image');
    score -= 10;
  } else {
    passed.push('Open Graph image present');
  }

  if (!ogUrl) {
    issues.push('Missing Open Graph URL');
    score -= 5;
  } else {
    passed.push('Open Graph URL present');
  }

  // Check Twitter Card tags
  const twitterCard = document.querySelector('meta[name="twitter:card"]');

  if (!twitterCard) {
    issues.push('Missing Twitter Card meta tags');
    score -= 5;
  } else {
    passed.push('Twitter Card meta tags present');
  }

  // Check canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    issues.push('Missing canonical URL');
    score -= 10;
  } else {
    passed.push('Canonical URL present');
  }

  // Check structured data
  const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
  if (structuredData.length === 0) {
    issues.push('No structured data found');
    score -= 15;
  } else {
    passed.push(`${structuredData.length} structured data scripts found`);
  }

  // Check robots meta
  const robots = document.querySelector('meta[name="robots"]');
  if (!robots) {
    recommendations.push('Add robots meta tag for better crawling control');
  } else {
    passed.push('Robots meta tag present');
  }

  // Check viewport meta
  const viewport = document.querySelector('meta[name="viewport"]');
  if (!viewport) {
    issues.push('Missing viewport meta tag (mobile SEO)');
    score -= 10;
  } else {
    passed.push('Viewport meta tag present');
  }

  // Check image alt attributes
  const images = document.querySelectorAll('img');
  let imagesWithoutAlt = 0;
  images.forEach(img => {
    if (!img.getAttribute('alt')) {
      imagesWithoutAlt++;
    }
  });

  if (imagesWithoutAlt > 0) {
    issues.push(`${imagesWithoutAlt} images missing alt attributes`);
    score -= Math.min(imagesWithoutAlt * 2, 10);
  } else if (images.length > 0) {
    passed.push('All images have alt attributes');
  }

  // Check heading structure
  const h1Tags = document.querySelectorAll('h1');
  if (h1Tags.length === 0) {
    issues.push('No H1 tag found');
    score -= 10;
  } else if (h1Tags.length > 1) {
    issues.push('Multiple H1 tags found (should be only one)');
    score -= 5;
  } else {
    passed.push('Single H1 tag present');
  }

  // Performance recommendations
  const preloadLinks = document.querySelectorAll('link[rel="preload"]');
  if (preloadLinks.length === 0) {
    recommendations.push('Add preload links for critical resources');
  } else {
    passed.push(`${preloadLinks.length} preload links found`);
  }

  const prefetchLinks = document.querySelectorAll('link[rel="prefetch"]');
  if (prefetchLinks.length === 0) {
    recommendations.push('Add prefetch links for next likely pages');
  } else {
    passed.push(`${prefetchLinks.length} prefetch links found`);
  }

  // Additional recommendations
  recommendations.push('Regularly update sitemap.xml');
  recommendations.push('Monitor Core Web Vitals');
  recommendations.push('Submit sitemap to Google Search Console');
  recommendations.push('Check for broken links regularly');
  recommendations.push('Optimize images for web (WebP format recommended)');
  recommendations.push('Implement breadcrumb navigation');

  return {
    score: Math.max(0, score),
    issues,
    recommendations,
    passed
  };
}

export function generateSEOReport(auditResult: SEOAuditResult): string {
  const { score, issues, recommendations, passed } = auditResult;
  
  let report = `# SEO Audit Report for Gitgenix\n\n`;
  report += `## Overall Score: ${score}/100\n\n`;
  
  if (score >= 90) {
    report += `🎉 **Excellent!** Your SEO implementation is outstanding.\n\n`;
  } else if (score >= 80) {
    report += `✅ **Good!** Your SEO is well implemented with minor improvements needed.\n\n`;
  } else if (score >= 70) {
    report += `⚠️ **Fair** - Several SEO improvements are needed.\n\n`;
  } else {
    report += `❌ **Poor** - Significant SEO improvements required.\n\n`;
  }

  if (passed.length > 0) {
    report += `## ✅ What's Working Well\n`;
    passed.forEach(item => {
      report += `- ${item}\n`;
    });
    report += `\n`;
  }

  if (issues.length > 0) {
    report += `## ❌ Issues Found\n`;
    issues.forEach(issue => {
      report += `- ${issue}\n`;
    });
    report += `\n`;
  }

  if (recommendations.length > 0) {
    report += `## 💡 Recommendations\n`;
    recommendations.forEach(rec => {
      report += `- ${rec}\n`;
    });
    report += `\n`;
  }

  report += `## Next Steps\n`;
  report += `1. Fix critical issues first (missing meta tags, structured data)\n`;
  report += `2. Implement performance optimizations\n`;
  report += `3. Monitor search console for crawl errors\n`;
  report += `4. Run this audit regularly to maintain SEO health\n`;

  return report;
}
