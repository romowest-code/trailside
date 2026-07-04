// Vercel serverless function — emails Trailside Handyman contact-form leads
// via Resend. Lives at POST /api/send-contact.
//
// Requires the RESEND_API_KEY env var to be set on the Trailside Vercel
// project. Sends from the verified c-money.app domain; the lead's own email
// is set as Reply-To so Mike can reply straight to them.

const LEAD_TO = 'michael@trailsidehandyman.com';
const FROM = 'Trailside Leads <leads@c-money.app>';

// Guard against oversized payloads getting to Resend. Vercel already caps the
// request body at ~4.5 MB, so this is a secondary backstop (~8 MB decoded).
const MAX_ATTACH_BYTES = 8 * 1024 * 1024;

// Exact SMS consent wording shown on /contact/. Kept here as the source of
// truth for the audit trail so it can't be tampered with client-side. Keep in
// sync with the consent block in build/pages/contact.html.
const CONSENT_TEXT =
  'Text me about my project (optional). I consent to receive SMS text ' +
  'messages from Trailside Handyman at the phone number provided regarding ' +
  'appointment scheduling, technician arrival times, job updates, ' +
  'estimates, invoices, and replies to my questions. Message and data ' +
  'rates may apply. Message frequency varies. Reply HELP for help, reply ' +
  'STOP to unsubscribe at any time. Consent is not a condition of ' +
  'purchase. See our Privacy Policy and Terms & Conditions.';

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function row(label, val) {
  return '<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">' +
    esc(label) +
    '</td><td style="padding:8px;border-bottom:1px solid #eee;">' +
    esc(val) + '</td></tr>';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};
  const {
    website, // honeypot
    name,
    email,
    phone,
    service_address,
    message,
    timeline,
    budget,
    home_decade,
    referral_source,
    sms_consent,
    consent_version,
    source_url,
    photos,
  } = body;

  // Honeypot: bots fill this hidden field. Pretend success, send nothing.
  if (website && String(website).trim() !== '') {
    return res.status(200).json({ success: true });
  }

  if (!name || !email || !phone || !service_address || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'RESEND_API_KEY not configured' });
  }

  // Normalize photo attachments. The client sends compressed JPEGs as data
  // URLs; strip the "data:...;base64," prefix and enforce a total-size cap.
  const attachments = [];
  const attachLines = [];
  if (Array.isArray(photos) && photos.length) {
    let total = 0;
    let truncated = false;
    for (let i = 0; i < photos.length && i < 5; i++) {
      const p = photos[i] || {};
      let content = String(p.content || '');
      const comma = content.indexOf(',');
      if (content.slice(0, 5) === 'data:' && comma !== -1) {
        content = content.slice(comma + 1);
      }
      if (!content) continue;

      total += Math.floor(content.length * 0.75); // approx decoded byte size
      if (total > MAX_ATTACH_BYTES) { truncated = true; break; }

      const filename = String(p.filename || ('photo-' + (i + 1) + '.jpg'))
        .replace(/[^\w.\-]+/g, '_');
      attachments.push({ filename, content });
      attachLines.push('  - ' + filename);
    }
    if (truncated) attachLines.push('  - (some photos omitted — total too large)');
  }
  const attachNote = attachments.length
    ? attachments.length + ' photo(s) attached:\n' + attachLines.join('\n')
    : 'No photos uploaded.';

  const consentGiven = sms_consent === true || sms_consent === 'yes';
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  const ua = req.headers['user-agent'] || 'unknown';
  const nowIso = new Date().toISOString();

  const html =
    '<h2 style="font-family:system-ui,Arial,sans-serif;">New lead via trailsidehandyman.com</h2>' +
    '<table style="border-collapse:collapse;max-width:560px;width:100%;font-family:system-ui,Arial,sans-serif;font-size:14px;">' +
      row('Name', name) +
      row('Phone', phone) +
      row('Email', email) +
      row('Service Address', service_address) +
      row('Ideal timeline', timeline || 'Not provided') +
      row('Rough budget', budget || 'Not provided') +
      row('Home built', home_decade || 'Not provided') +
      row('Heard about us', referral_source || 'Not provided') +
      row('SMS consent', consentGiven ? 'YES' : 'NO') +
    '</table>' +
    '<h3 style="font-family:system-ui,Arial,sans-serif;">Project description</h3>' +
    '<p style="white-space:pre-wrap;font-family:system-ui,Arial,sans-serif;font-size:14px;">' +
      esc(message) + '</p>' +
    '<h3 style="font-family:system-ui,Arial,sans-serif;">Photos</h3>' +
    '<pre style="font-family:ui-monospace,monospace;font-size:13px;white-space:pre-wrap;">' +
      esc(attachNote) + '</pre>' +
    '<hr>' +
    '<h3 style="font-family:system-ui,Arial,sans-serif;">SMS consent audit trail</h3>' +
    '<pre style="font-family:ui-monospace,monospace;font-size:12px;white-space:pre-wrap;">' +
      esc(
        'Consent version: ' + (consent_version || 'n/a') + '\n' +
        'Submitter agreed: ' + (consentGiven ? 'YES' : 'NO') + '\n' +
        'Consent text shown:\n' + CONSENT_TEXT + '\n\n' +
        'Submitted: ' + nowIso + '\n' +
        'Source URL: ' + (source_url || 'n/a') + '\n' +
        'IP: ' + ip + '\n' +
        'User agent: ' + ua
      ) +
    '</pre>';

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [LEAD_TO],
        reply_to: email,
        subject: `New Trailside Handyman lead: ${name}`,
        html,
        attachments,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: (data && data.message) || 'Send failed' });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
