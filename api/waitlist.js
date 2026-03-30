const REPO = 'benjee-inc/wings-landing';
const FILE_PATH = 'data/waitlist.json';
const BRANCH = 'main';

async function getWaitlistFile(token) {
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`,
    { headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' } }
  );
  if (res.status === 404) return { emails: [], sha: null };
  if (!res.ok) throw new Error(`GitHub GET failed: ${res.status}`);
  const data = await res.json();
  const content = JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8'));
  return { emails: content, sha: data.sha };
}

async function updateWaitlistFile(token, emails, sha) {
  const body = {
    message: `Add waitlist signup (${emails.length} total)`,
    content: Buffer.from(JSON.stringify(emails, null, 2)).toString('base64'),
    branch: BRANCH,
  };
  if (sha) body.sha = sha;
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) throw new Error(`GitHub PUT failed: ${res.status}`);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { email } = req.body;
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email is required' });
    }

    const normalized = email.toLowerCase().trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      // Fallback: log to Vercel function logs if no token configured
      console.log(`WAITLIST_SIGNUP: ${normalized} at ${new Date().toISOString()}`);
      return res.status(200).json({ success: true, message: 'Added to waitlist' });
    }

    const { emails, sha } = await getWaitlistFile(token);

    // Check for duplicate
    if (emails.some((e) => e.email === normalized)) {
      return res.status(409).json({ error: 'Already on waitlist' });
    }

    emails.push({
      email: normalized,
      signedUpAt: new Date().toISOString(),
      source: req.headers.referer || 'direct',
    });

    await updateWaitlistFile(token, emails, sha);

    console.log(`WAITLIST_SIGNUP: ${normalized} (total: ${emails.length})`);

    return res.status(200).json({
      success: true,
      message: 'Added to waitlist',
      position: emails.length,
    });
  } catch (error) {
    console.error('Waitlist error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
