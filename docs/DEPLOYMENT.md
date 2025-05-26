# 🚀 Deployment Guide

This guide covers deploying Gitgenix to various platforms and environments.

## Table of Contents

- [Deployment Overview](#deployment-overview)
- [Netlify Deployment](#netlify-deployment)
- [Vercel Deployment](#vercel-deployment)
- [Firebase Hosting](#firebase-hosting)
- [Environment Configuration](#environment-configuration)
- [Domain Setup](#domain-setup)
- [Monitoring & Analytics](#monitoring--analytics)
- [Troubleshooting](#troubleshooting)

---

## Deployment Overview

### Supported Platforms

- **Netlify** (Recommended) - Static site hosting with CDN
- **Vercel** - Next.js optimized platform
- **Firebase Hosting** - Google's static hosting service
- **GitHub Pages** - Free static hosting (with limitations)

### Build Requirements

- **Node.js 18+** for the build process
- **Static Export** capability (Next.js configured for static export)
- **Environment Variables** for Firebase configuration

---

## Netlify Deployment

### Automatic Deployment (Recommended)

#### 1. Connect Repository

1. **Sign in to Netlify**: [https://app.netlify.com](https://app.netlify.com)
2. **New site from Git**: Click "New site from Git"
3. **Choose provider**: Select GitHub/GitLab/Bitbucket
4. **Select repository**: Choose your Gitgenix fork/repository
5. **Configure build settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - **Production branch**: `main`

#### 2. Environment Variables

In Netlify dashboard → Site settings → Environment variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

#### 3. Build Configuration

Create `netlify.toml` in project root:

```toml
[build]
  publish = "out"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--legacy-peer-deps"

# Redirect rules for client-side routing
[[redirects]]
  from = "/draw/share/:id"
  to = "/draw/share/:id"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Security headers
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    X-XSS-Protection = "1; mode=block"

# Cache static assets
[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Manual Deployment

#### 1. Build Locally

```bash
# Clone repository
git clone https://github.com/your-username/gitgenix.git
cd gitgenix

# Install dependencies
npm install

# Build for production
npm run build

# The build output will be in the 'out' directory
```

#### 2. Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to Netlify
netlify deploy --prod --dir=out

# Follow prompts to create new site or update existing
```

---

## Vercel Deployment

### Automatic Deployment

#### 1. Connect Repository

1. **Sign in to Vercel**: [https://vercel.com](https://vercel.com)
2. **Import Git Repository**: Click "New Project"
3. **Configure Project**:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `out`

#### 2. Environment Variables

In Vercel dashboard → Project → Settings → Environment Variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

#### 3. Vercel Configuration

Create `vercel.json` in project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  "trailingSlash": false,
  "rewrites": [
    {
      "source": "/draw/share/:id",
      "destination": "/draw/share/:id"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

### Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Follow prompts for configuration
```

---

## Firebase Hosting

### Setup Firebase Hosting

#### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

#### 2. Initialize Firebase

```bash
# Login to Firebase
firebase login

# Initialize Firebase in project directory
firebase init hosting

# Choose options:
# - Use existing project or create new
# - Public directory: out
# - Single-page app: Yes
# - Overwrite index.html: No
```

#### 3. Configure Firebase

Update `firebase.json`:

```json
{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "/draw/share/**",
        "destination": "/draw/share/[id].html"
      },
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

#### 4. Deploy

```bash
# Build the project
npm run build

# Deploy to Firebase
firebase deploy --only hosting

# Your app will be available at:
# https://your-project-id.web.app
```

---

## Environment Configuration

### Production Environment Variables

```env
# Firebase Configuration (Required)
NEXT_PUBLIC_FIREBASE_API_KEY=your-production-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-production-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-production-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-production-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-production-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-production-app-id

# Optional Configuration
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
NEXT_PUBLIC_DEBUG=false
NODE_ENV=production
```

### Development vs Production

```typescript
// Environment-specific configuration
const config = {
  development: {
    apiUrl: "http://localhost:3000",
    debug: true,
    analytics: false,
  },
  production: {
    apiUrl: "https://your-domain.com",
    debug: false,
    analytics: true,
  },
};

export default config[process.env.NODE_ENV || "development"];
```

### Security Considerations

```env
# Use different Firebase projects for dev/prod
NEXT_PUBLIC_FIREBASE_PROJECT_ID=gitgenix-dev      # Development
NEXT_PUBLIC_FIREBASE_PROJECT_ID=gitgenix-prod     # Production

# Restrict API keys to specific domains
# In Firebase Console → Project Settings → API Keys
# Add your domain to "HTTP referrers" restrictions
```

---

## Domain Setup

### Custom Domain Configuration

#### Netlify Custom Domain

1. **Add Domain**: Netlify dashboard → Domain settings → Add custom domain
2. **DNS Configuration**: Update nameservers or add DNS records
3. **SSL Certificate**: Automatic Let's Encrypt certificate

#### Vercel Custom Domain

1. **Add Domain**: Vercel dashboard → Project → Settings → Domains
2. **Configure DNS**: Add CNAME record to your DNS provider
3. **SSL Certificate**: Automatic certificate provisioning

#### Firebase Custom Domain

```bash
# Add custom domain
firebase hosting:channel:create live
firebase target:apply hosting production your-site-name
firebase deploy --only hosting:production

# Configure DNS
# Add A records to your DNS provider pointing to Firebase IPs
```

### DNS Configuration Examples

#### Cloudflare DNS

```
Type    Name    Content                 TTL
A       @       75.2.60.5              Auto
A       @       99.83.190.102          Auto
CNAME   www     your-domain.com        Auto
```

#### Standard DNS Provider

```
Type    Name    Value                   TTL
A       @       netlify-ip-address     3600
CNAME   www     your-netlify-site.netlify.app  3600
```

---

## Monitoring & Analytics

### Performance Monitoring

#### Core Web Vitals

```typescript
// Add to _app.tsx or layout.tsx
import { reportWebVitals } from "../utils/analytics";

export function reportWebVitals(metric) {
  console.log(metric);

  // Send to analytics service
  if (process.env.NODE_ENV === "production") {
    // Google Analytics, Vercel Analytics, etc.
  }
}
```

#### Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push, pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm install
      - run: npm run build
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          configPath: "./lighthouserc.json"
```

### Error Tracking

#### Sentry Integration

```bash
# Install Sentry
npm install @sentry/nextjs
```

```typescript
// sentry.client.config.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 0.1,
});
```

### Analytics Setup

#### Google Analytics 4

```typescript
// lib/gtag.js
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageview = (url) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
```

---

## Troubleshooting

### Common Deployment Issues

#### Build Failures

**Error**: `npm ERR! code ELIFECYCLE`

**Solution**:

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Check Node.js version
node --version  # Should be 18+
```

#### Environment Variable Issues

**Error**: Firebase initialization fails

**Solution**:

1. Verify all required environment variables are set
2. Check variable names (must start with `NEXT_PUBLIC_`)
3. Ensure no spaces or special characters in values
4. Test locally with same environment variables

#### Static Export Issues

**Error**: `Error: Dynamic Code Evaluation`

**Solution**:

```typescript
// next.config.ts
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Disable server-side features for static export
  experimental: {
    esmExternals: "loose",
  },
};
```

### Performance Issues

#### Large Bundle Size

**Diagnosis**:

```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer
```

**Solutions**:

- Implement code splitting with dynamic imports
- Remove unused dependencies
- Optimize images and assets
- Use tree shaking

#### Slow Loading

**Diagnosis**:

```bash
# Test with Lighthouse
npx lighthouse http://your-domain.com --view
```

**Solutions**:

- Enable compression (gzip/brotli)
- Optimize images
- Implement lazy loading
- Use CDN for static assets

### Firebase Issues

#### Firestore Permission Denied

**Error**: `Missing or insufficient permissions`

**Solution**:

1. Check Firestore security rules
2. Verify Firebase configuration
3. Ensure project ID is correct

#### Firebase Hosting 404s

**Error**: Direct URL access returns 404

**Solution**:
Update `firebase.json` rewrites:

```json
{
  "hosting": {
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### Domain & SSL Issues

#### SSL Certificate Errors

**Solutions**:

1. **Netlify**: Wait 24-48 hours for automatic provisioning
2. **Vercel**: Check domain verification status
3. **Firebase**: Verify domain ownership

#### DNS Propagation

**Check DNS**:

```bash
# Check DNS propagation
nslookup your-domain.com
dig your-domain.com

# Online tools
# https://www.whatsmydns.net/
```

---

## Deployment Checklist

### Pre-Deployment

- [ ] All tests passing
- [ ] Build completes successfully
- [ ] Environment variables configured
- [ ] Performance optimizations applied
- [ ] Security headers configured
- [ ] Analytics/monitoring setup

### Post-Deployment

- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] Forms and interactions work
- [ ] Mobile responsiveness verified
- [ ] Performance metrics acceptable
- [ ] SSL certificate active
- [ ] Analytics tracking confirmed

### Maintenance

- [ ] Regular dependency updates
- [ ] Security patches applied
- [ ] Performance monitoring active
- [ ] Backup strategies in place
- [ ] Error tracking configured

---

**Deployment Complete!** 🎉

Your Gitgenix application should now be live and accessible to users. Monitor the deployment for any issues and refer back to this guide for troubleshooting and maintenance tasks.
