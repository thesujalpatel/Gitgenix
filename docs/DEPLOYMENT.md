# 🚀 Deployment Guide

Deploy Gitgenix to popular hosting platforms with this streamlined guide.

## 🎯 Quick Deploy

### Netlify (Recommended)

**One-click deployment:**

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/thesujalpatel/gitgenix)

**Manual setup:**

1. **Connect**: Link your GitHub repository to Netlify
2. **Configure**:
   - Build command: `npm run build`
   - Publish directory: `out`
3. **Deploy**: Automatic deployment on every push

### Vercel

**One-click deployment:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/thesujalpatel/gitgenix)

**Manual setup:**

1. **Import**: Import repository to Vercel
2. **Configure**: Build settings auto-detected
3. **Deploy**: Instant deployment

---

## 🔧 Platform-Specific Setup

### Netlify Configuration

Create `netlify.toml` in your project root:

```toml
[build]
  publish = "out"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

# Handle client-side routing
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
```

### Environment Variables

For any platform, configure these environment variables:

```env
# Firebase Configuration (Optional for pattern sharing)
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

> **Note:** Pattern sharing requires Firebase. Core functionality works without it!

---

## 🚀 Alternative Platforms

### Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init hosting

# Deploy
npm run build
firebase deploy
```

**Configuration** (`firebase.json`):

```json
{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts
"deploy": "npm run build && gh-pages -d out"

# Deploy
npm run deploy
```

> **Note:** GitHub Pages has limitations with client-side routing. Consider Netlify for better performance.

---

## 🔍 Production Checklist

### Pre-Deployment

- [ ] **Environment variables** configured
- [ ] **Build passes** locally (`npm run build`)
- [ ] **No TypeScript errors** (`npm run type-check`)
- [ ] **Linting passes** (`npm run lint`)
- [ ] **Manual testing** complete

### Post-Deployment

- [ ] **Site loads** correctly
- [ ] **Pattern creation** works
- [ ] **Script generation** functions
- [ ] **Responsive design** verified
- [ ] **Performance** acceptable (Lighthouse)

---

## 🛠️ Custom Domain Setup

### Netlify Custom Domain

1. **Domain settings** → Add custom domain
2. **DNS configuration** → Point to Netlify
3. **SSL certificate** → Automatic provisioning

### Vercel Custom Domain

1. **Domain settings** → Add domain
2. **Configure DNS** → Add CNAME record
3. **SSL certificate** → Automatic

---

## 📊 Monitoring & Analytics

### Built-in Analytics

- **Netlify Analytics** - Visitor insights
- **Vercel Analytics** - Performance metrics
- **Firebase Analytics** - User engagement

### Performance Monitoring

```bash
# Lighthouse CI for automated audits
npm install -g @lhci/cli

# Run lighthouse audit
lhci autorun
```

### Error Tracking

Consider adding error tracking for production:

- **Sentry** - Error monitoring
- **LogRocket** - Session replay
- **Bugsnag** - Exception tracking

---

## ⚡ Troubleshooting

### Common Issues

**Build fails:**

- Check Node.js version (18+ required)
- Verify all dependencies installed
- Review build logs for specific errors

**Site doesn't load:**

- Check publish directory is set to `out`
- Verify build command is `npm run build`
- Review redirects configuration

**Environment variables not working:**

- Ensure variables start with `NEXT_PUBLIC_`
- Check variable names match exactly
- Redeploy after adding variables

**Pattern sharing not working:**

- Verify Firebase configuration
- Check Firebase project permissions
- Review browser console for errors

### Getting Help

- **Platform docs**: Check your hosting platform's documentation
- **Community**: Join GitHub Discussions for deployment help
- **Issues**: Report deployment-specific problems on GitHub

---

_Successful deployment? Share your site with the community! 🎉_
