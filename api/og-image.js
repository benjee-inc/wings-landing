export const config = { runtime: 'edge' };

export default function handler() {
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#0a0a0b"/>
    <rect x="0" y="0" width="1200" height="630" fill="url(#glow)"/>
    <defs>
      <radialGradient id="glow" cx="50%" cy="30%" r="60%">
        <stop offset="0%" stop-color="rgba(99,102,241,0.15)"/>
        <stop offset="100%" stop-color="rgba(10,10,11,0)"/>
      </radialGradient>
    </defs>
    <rect x="80" y="180" width="56" height="56" rx="12" fill="#6366f1"/>
    <text x="108" y="220" font-family="Arial,sans-serif" font-size="28" font-weight="bold" fill="#fff" text-anchor="middle">W</text>
    <text x="150" y="220" font-family="Arial,sans-serif" font-size="32" font-weight="bold" fill="#f0f0f2">Wings</text>
    <text x="80" y="300" font-family="Arial,sans-serif" font-size="52" font-weight="bold" fill="#f0f0f2">Browse smarter.</text>
    <text x="80" y="365" font-family="Arial,sans-serif" font-size="52" font-weight="bold" fill="#f0f0f2">Do more, faster.</text>
    <text x="80" y="430" font-family="Arial,sans-serif" font-size="22" fill="#8a8a95">AI-powered Chrome extension for instant summaries,</text>
    <text x="80" y="462" font-family="Arial,sans-serif" font-size="22" fill="#8a8a95">smart actions, and contextual insights.</text>
    <rect x="80" y="510" width="240" height="50" rx="8" fill="#6366f1"/>
    <text x="200" y="542" font-family="Arial,sans-serif" font-size="18" font-weight="bold" fill="#fff" text-anchor="middle">Join the Waitlist</text>
  </svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
