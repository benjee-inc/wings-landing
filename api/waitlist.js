import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email is required' });
    }

    const normalized = email.toLowerCase().trim();

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Check if already on waitlist
    const exists = await kv.sismember('waitlist:emails', normalized);
    if (exists) {
      return res.status(409).json({ error: 'Already on waitlist' });
    }

    // Add to waitlist set and store signup timestamp
    await kv.sadd('waitlist:emails', normalized);
    await kv.hset(`waitlist:meta:${normalized}`, {
      email: normalized,
      signedUpAt: new Date().toISOString(),
      source: req.headers.referer || 'direct',
    });

    const count = await kv.scard('waitlist:emails');

    return res.status(200).json({
      success: true,
      message: 'Added to waitlist',
      position: count,
    });
  } catch (error) {
    console.error('Waitlist error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
