# Wings Marketing Automation Strategy

## Overview
Drive waitlist signups for Wings (Chrome extension) through automated, repeatable marketing channels.

## Channels

### 1. Email Automation (Implemented)
- **Welcome email**: Auto-sent on waitlist signup via Resend API
- **Update email**: Batch send to all subscribers for product updates
- **Launch email**: Batch send when product goes live
- **API endpoints**:
  - `POST /api/waitlist` — signup + auto welcome email
  - `POST /api/send-email` — single email (requires `X-API-Key` header)
  - `POST /api/send-batch` — batch email to all subscribers (requires `X-API-Key` header)

**Setup required:**
1. Set `RESEND_API_KEY` in Vercel env vars (get from resend.com — free tier: 100 emails/day)
2. Set `EMAIL_API_KEY` in Vercel env vars (any strong random string — protects batch endpoints)
3. Verify sending domain in Resend dashboard for production sends

### 2. Twitter/X Content (Ready to Execute)
- Pre-written 4-week content calendar in `marketing/twitter-content.md`
- 10+ ready-to-post tweets covering awareness, value, proof, and launch
- Thread template for product explainer
- Posting schedule: 3-4x/week, Tue/Wed/Thu at 9am & 1pm ET
- **Recommended tool**: Buffer or Typefully for scheduling (both have free tiers)

### 3. SEO (Implemented)
- Open Graph + Twitter Card meta tags on landing page
- Structured data (JSON-LD SoftwareApplication schema)
- `robots.txt` + `sitemap.xml` for search engine crawling
- Dynamic OG image via `/api/og-image` endpoint
- Keyword-optimized meta description

### 4. Analytics & UTM Tracking (Implemented)
- UTM parameter capture on waitlist signups (source stored with each email)
- Referrer tracking in waitlist API
- Use UTM links in all social posts: `?utm_source=twitter&utm_medium=social&utm_campaign=prelaunch`

## Metrics to Track
- Waitlist signups per day/week
- Email open rates (available in Resend dashboard)
- Twitter impressions and link clicks
- Landing page traffic (add Vercel Analytics or Plausible for privacy-friendly tracking)

## Quick Start Checklist
- [ ] Set RESEND_API_KEY in Vercel
- [ ] Set EMAIL_API_KEY in Vercel
- [ ] Verify email domain in Resend
- [ ] Start posting Twitter content from calendar
- [ ] Set up Buffer/Typefully for scheduling
- [ ] Add Vercel Analytics or Plausible for traffic tracking
