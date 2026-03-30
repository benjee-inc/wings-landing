import { updateEmail, launchEmail } from './_email-templates.js';

const REPO = 'benjee-inc/wings-landing';
const FILE_PATH = 'data/waitlist.json';
const BRANCH = 'main';

const TEMPLATES = { update: updateEmail, launch: launchEmail };

async function getWaitlistEmails(token) {
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`,
    { headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' } }
  );
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`GitHub GET failed: ${res.status}`);
  const data = await res.json();
  return JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8'));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers['x-api-key'];
  if (!process.env.EMAIL_API_KEY || authHeader !== process.env.EMAIL_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { template } = req.body;
  const tmpl = TEMPLATES[template];
  if (!tmpl) {
    return res.status(400).json({ error: `Unknown template. Options: ${Object.keys(TEMPLATES).join(', ')}` });
  }

  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) {
    return res.status(500).json({ error: 'GITHUB_TOKEN not configured' });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return res.status(500).json({ error: 'RESEND_API_KEY not configured' });
  }

  try {
    const subscribers = await getWaitlistEmails(githubToken);
    if (subscribers.length === 0) {
      return res.status(200).json({ success: true, sent: 0, message: 'No subscribers' });
    }

    const html = typeof tmpl.html === 'function' ? tmpl.html() : tmpl.html;
    let sent = 0;
    let failed = 0;

    // Send in batches of 10 to respect rate limits
    for (let i = 0; i < subscribers.length; i += 10) {
      const batch = subscribers.slice(i, i + 10);
      const results = await Promise.allSettled(
        batch.map((sub) =>
          fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${resendKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: 'Wings <hello@wings-landing.vercel.app>',
              to: [sub.email],
              subject: tmpl.subject,
              html,
            }),
          })
        )
      );
      results.forEach((r) => (r.status === 'fulfilled' && r.value.ok ? sent++ : failed++));
    }

    console.log(`BATCH_EMAIL: template=${template}, sent=${sent}, failed=${failed}`);
    return res.status(200).json({ success: true, sent, failed, total: subscribers.length });
  } catch (error) {
    console.error('Batch email error:', error);
    return res.status(500).json({ error: 'Batch send failed' });
  }
}
