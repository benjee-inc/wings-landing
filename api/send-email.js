import { welcomeEmail, updateEmail, launchEmail } from './_email-templates.js';

const TEMPLATES = {
  welcome: welcomeEmail,
  update: updateEmail,
  launch: launchEmail,
};

async function sendViaResend(apiKey, to, subject, html) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Wings <hello@wings-landing.vercel.app>',
      to: [to],
      subject,
      html,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error ${res.status}: ${err}`);
  }
  return res.json();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers['x-api-key'];
  const expectedKey = process.env.EMAIL_API_KEY;
  if (!expectedKey || authHeader !== expectedKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { template, to, position } = req.body;

  if (!template || !to) {
    return res.status(400).json({ error: 'template and to are required' });
  }

  const tmpl = TEMPLATES[template];
  if (!tmpl) {
    return res.status(400).json({ error: `Unknown template: ${template}. Options: ${Object.keys(TEMPLATES).join(', ')}` });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.log(`EMAIL_QUEUED: template=${template}, to=${to}, position=${position || 'n/a'}`);
    return res.status(200).json({ success: true, message: 'Email logged (no RESEND_API_KEY configured)', queued: true });
  }

  try {
    const html = typeof tmpl.html === 'function' ? tmpl.html(position) : tmpl.html;
    const result = await sendViaResend(resendKey, to, tmpl.subject, html);
    console.log(`EMAIL_SENT: template=${template}, to=${to}, id=${result.id}`);
    return res.status(200).json({ success: true, emailId: result.id });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
