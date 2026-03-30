# Wings Marketing Automation Strategy

## Overview
Drive waitlist signups for Wings — a Chrome extension that adds prediction-market-powered weather insurance to e-commerce checkout, built on Solana.

## Positioning
- **What:** Chrome extension that overlays on checkout pages with weather-based trip protection
- **How:** Solana prediction markets — pay ~$15, get up to $250 if it rains
- **Who:** Online shoppers booking travel, events, outdoor activities
- **Why:** Peace of mind + potential payout, powered by decentralized prediction markets
- **Key messages:**
  - "Protect your trip. Get paid if it rains."
  - "Checkout insurance powered by Solana prediction markets"
  - "$15 could get you $250 back"
  - "The Chrome extension that pays you when weather ruins your plans"

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

### 2. Faceless Content (Highest Priority — Free)
- Short-form videos showing the checkout overlay in action
- Hook: "Watch me save $250 on my trip because it rained"
- Replicate across Twitter/X, TikTok, YouTube Shorts
- Screen recordings of the extension UX during a real checkout flow
- **Target:** 3-5 videos/week across platforms

### 3. Founder-Led Content
- Personal videos explaining prediction-market insurance
- Crypto/Solana community trusts founders over brands
- "Why I'm building checkout insurance on Solana" angle
- Behind-the-scenes: smart contract development, NWS data integration

### 4. Twitter/X Content (Ready to Execute)
- Pre-written 4-week content calendar in `marketing/twitter-content.md`
- 10+ ready-to-post tweets covering awareness, value, proof, and launch
- Posting schedule: 3-4x/week, Tue/Wed/Thu at 9am & 1pm ET
- **Recommended tool**: Buffer or Typefully for scheduling (both have free tiers)
- **Target communities:** Solana, DeFi, crypto, travel hacking, deal hunting

### 5. UGC ($10-15/video)
- Creators showing real checkout experiences with Wings
- "I just added rain protection to my Cancun booking for $15"
- Authentic, phone-recorded feel

### 6. Influencer Partnerships (~$1 CPM)
- **Crypto/Solana creators:** Explain the prediction market mechanics
- **Travel bloggers/vloggers:** Show checkout protection for trip bookings
- **Deal/savings influencers:** Frame as a smart shopping hack

### 7. SEO (Implemented)
- Open Graph + Twitter Card meta tags on landing page
- Structured data (JSON-LD SoftwareApplication schema)
- `robots.txt` + `sitemap.xml` for search engine crawling
- Dynamic OG image via `/api/og-image` endpoint
- Keywords: checkout insurance, prediction market, Solana, weather protection, rain insurance

### 8. Analytics & UTM Tracking (Implemented)
- UTM parameter capture on waitlist signups (source stored with each email)
- Referrer tracking in waitlist API
- Use UTM links in all social posts: `?utm_source=twitter&utm_medium=social&utm_campaign=prelaunch`

## Metrics to Track
- Waitlist signups per day/week
- Email open rates (available in Resend dashboard)
- Twitter impressions and link clicks
- Short-form video views across platforms
- Landing page traffic (add Vercel Analytics or Plausible for privacy-friendly tracking)

## Quick Start Checklist
- [ ] Set RESEND_API_KEY in Vercel
- [ ] Set EMAIL_API_KEY in Vercel
- [ ] Verify email domain in Resend
- [ ] Start posting Twitter content from calendar
- [ ] Set up Buffer/Typefully for scheduling
- [ ] Record first 3 faceless content videos (screen recordings of checkout flow)
- [ ] Identify 10 crypto/Solana influencers for outreach
- [ ] Identify 10 travel/lifestyle creators for UGC
- [ ] Add Vercel Analytics or Plausible for traffic tracking
