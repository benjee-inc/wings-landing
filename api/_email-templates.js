const BRAND_COLOR = '#10b981';
const BG_COLOR = '#0a0a0b';
const SURFACE_COLOR = '#141416';
const TEXT_COLOR = '#f0f0f2';
const MUTED_COLOR = '#8a8a95';

function layout(content) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:${BG_COLOR};font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${BG_COLOR};padding:40px 20px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
  <tr><td style="padding-bottom:32px;">
    <span style="display:inline-block;width:32px;height:32px;background:${BRAND_COLOR};color:#fff;font-weight:bold;font-size:16px;line-height:32px;text-align:center;border-radius:6px;">W</span>
    <span style="font-size:18px;font-weight:bold;color:${TEXT_COLOR};vertical-align:middle;margin-left:8px;">Wings</span>
  </td></tr>
  <tr><td style="background:${SURFACE_COLOR};border-radius:12px;padding:40px 32px;border:1px solid #2a2a30;">
    ${content}
  </td></tr>
  <tr><td style="padding-top:24px;text-align:center;color:${MUTED_COLOR};font-size:12px;">
    &copy; 2026 Wings. You're receiving this because you joined the Wings waitlist.<br>
    <a href="https://wings-landing.vercel.app" style="color:${MUTED_COLOR};">wings-landing.vercel.app</a>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

export const welcomeEmail = {
  subject: "You're on the Wings waitlist!",
  html: (position) => layout(`
    <h1 style="color:${TEXT_COLOR};font-size:24px;margin:0 0 16px;">Welcome to Wings!</h1>
    <p style="color:${MUTED_COLOR};font-size:16px;line-height:1.6;margin:0 0 16px;">
      You're officially on the waitlist${position ? ` at position #${position}` : ''}. We're building something special and you'll be among the first to try it.
    </p>
    <p style="color:${MUTED_COLOR};font-size:16px;line-height:1.6;margin:0 0 24px;">
      Wings is a Chrome extension that adds prediction-market-powered weather insurance to your checkout. Protect your trip for as little as $15 and get up to $250 if it rains — all powered by Solana.
    </p>
    <h2 style="color:${TEXT_COLOR};font-size:18px;margin:0 0 12px;">What to expect:</h2>
    <ul style="color:${MUTED_COLOR};font-size:15px;line-height:1.8;margin:0 0 24px;padding-left:20px;">
      <li>Early access when we launch</li>
      <li>Product updates as we build</li>
      <li>A chance to shape the product with your feedback</li>
    </ul>
    <p style="color:${MUTED_COLOR};font-size:16px;line-height:1.6;margin:0 0 24px;">
      In the meantime, help us spread the word! Share Wings with anyone who books trips or shops online.
    </p>
    <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent("Just joined the Wings waitlist — a Chrome extension that adds weather-based prediction-market insurance to your checkout. Protect your trip, get paid if it rains!")}&url=${encodeURIComponent("https://wings-landing.vercel.app")}" style="display:inline-block;padding:12px 24px;background:${BRAND_COLOR};color:#fff;text-decoration:none;font-weight:bold;font-size:14px;border-radius:8px;">Share on Twitter/X</a>
  `),
};

export const updateEmail = {
  subject: "Wings Update: We're making progress!",
  html: () => layout(`
    <h1 style="color:${TEXT_COLOR};font-size:24px;margin:0 0 16px;">Building update</h1>
    <p style="color:${MUTED_COLOR};font-size:16px;line-height:1.6;margin:0 0 16px;">
      Hey there! Quick update from the Wings team.
    </p>
    <p style="color:${MUTED_COLOR};font-size:16px;line-height:1.6;margin:0 0 24px;">
      We've been hard at work building the features you're going to love. Here's what's been happening:
    </p>
    <div style="background:${BG_COLOR};border-radius:8px;padding:20px;margin:0 0 24px;border:1px solid #2a2a30;">
      <p style="color:${TEXT_COLOR};font-size:15px;margin:0 0 8px;font-weight:bold;">Recent progress:</p>
      <ul style="color:${MUTED_COLOR};font-size:14px;line-height:1.8;margin:0;padding-left:20px;">
        <li>Checkout overlay integration working on major e-commerce sites</li>
        <li>Solana prediction market contract finalized</li>
        <li>Weather data pipeline connected to National Weather Service</li>
      </ul>
    </div>
    <p style="color:${MUTED_COLOR};font-size:16px;line-height:1.6;margin:0;">
      Stay tuned — we're getting closer to launch every day.
    </p>
  `),
};

export const launchEmail = {
  subject: "Wings is live! Get your early access now",
  html: () => layout(`
    <h1 style="color:${TEXT_COLOR};font-size:24px;margin:0 0 16px;">Wings is here!</h1>
    <p style="color:${MUTED_COLOR};font-size:16px;line-height:1.6;margin:0 0 16px;">
      The day has arrived. Wings is officially available and you have early access!
    </p>
    <p style="color:${MUTED_COLOR};font-size:16px;line-height:1.6;margin:0 0 24px;">
      As a waitlist member, you get priority access. Install Wings now and start protecting your purchases with prediction-market weather insurance.
    </p>
    <a href="https://wings-landing.vercel.app" style="display:inline-block;padding:14px 28px;background:${BRAND_COLOR};color:#fff;text-decoration:none;font-weight:bold;font-size:16px;border-radius:8px;margin-bottom:24px;">Install Wings</a>
    <p style="color:${MUTED_COLOR};font-size:15px;line-height:1.6;margin:24px 0 0;">
      We'd love to hear your feedback — reply to this email or reach out on Twitter/X. You're helping shape the future of checkout insurance.
    </p>
  `),
};
