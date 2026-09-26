// Vercel serverless function — emails Trailside Handyman contact-form leads
// via Resend. Lives at POST /api/send-contact.
//
// Requires RESEND_API_KEY on the Trailside Vercel project. Sends from the
// verified c-money.app domain; the lead's email is set as Reply-To.
//
// NOTE: SMS/texting is DISABLED for now — EMAIL ONLY. The Twilio integration
// below is commented out. To re-enable: uncomment the Twilio block, the SMS
// send block in the handler, and the consent lines in the email, then set the
// TWILIO_* / LEAD_ALERT_SMS_TO env vars in Vercel.

const LEAD_TO = 'michael@trailsidehandyman.com';
const FROM = 'Trailside Leads <leads@c-money.app>';

/* ---- Twilio SMS (DISABLED — email only for now) ----
const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_FROM = process.env.TWILIO_FROM;
const TWILIO_MSG_SERVICE = process.env.TWILIO_MESSAGING_SERVICE_SID;
const LEAD_ALERT_SMS_TO = process.env.LEAD_ALERT_SMS_TO;

// Format a US phone as E.164 (+1XXXXXXXXXX); returns null if it can't.
function toE164US(raw) {
  const d = String(raw || '').replace(/\D+/g, '');
  if (d.length === 10) return '+1' + d;
  if (d.length === 11 && d[0] === '1') return '+' + d;
  if (String(raw || '').trim().charAt(0) === '+') return String(raw).trim();
  return null;
}

// Best-effort single SMS via the Twilio REST API (no SDK, raw fetch).
// Never throws; returns a small status string for logging/debugging.
async function sendSms(to, bodyText) {
  if (!TWILIO_SID || !TWILIO_TOKEN || (!TWILIO_FROM && !TWILIO_MSG_SERVICE)) {
    return 'skipped:not-configured';
  }
  if (!to) return 'skipped:no-recipient';
  const params = new URLSearchParams();
  params.set('To', to);
  if (TWILIO_MSG_SERVICE) params.set('MessagingServiceSid', TWILIO_MSG_SERVICE);
  else params.set('From', TWILIO_FROM);
  params.set('Body', bodyText);
  const auth = Buffer.from(TWILIO_SID + ':' + TWILIO_TOKEN).toString('base64');
  try {
    const r = await fetch(
      'https://api.twilio.com/2010-04-01/Accounts/' + TWILIO_SID + '/Messages.json',
      {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + auth,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      }
    );
    if (!r.ok) {
      const t = await r.text();
      return 'error:' + r.status + ':' + t.slice(0, 160);
    }
    return 'sent';
  } catch (e) {
    return 'error:' + String((e && e.message) || e).slice(0, 160);
  }
}
---- end Twilio SMS ---- */

// Guard against oversized payloads getting to Resend. Vercel already caps the
// request body at ~4.5 MB, so this is a secondary backstop (~8 MB decoded).
const MAX_ATTACH_BYTES = 8 * 1024 * 1024;

/* SMS consent wording — DISABLED (email only for now). Re-enable with the
   SMS integration.
const CONSENT_TEXT =
  'Text me about my project (optional). I consent to receive SMS text ' +
  'messages from Trailside Handyman at the phone number provided regarding ' +
  'appointment scheduling, technician arrival times, job updates, ' +
  'estimates, invoices, and replies to my questions. Message and data ' +
  'rates may apply. Message frequency varies. Reply HELP for help, reply ' +
  'STOP to unsubscribe at any time. Consent is not a condition of ' +
  'purchase. See our Privacy Policy and Terms & Conditions.';
*/

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
      // row('SMS consent', consentGiven ? 'YES' : 'NO') +  // SMS disabled — email only
    '</table>' +
    '<h3 style="font-family:system-ui,Arial,sans-serif;">Project description</h3>' +
    '<p style="white-space:pre-wrap;font-family:system-ui,Arial,sans-serif;font-size:14px;">' +
      esc(message) + '</p>' +
    '<h3 style="font-family:system-ui,Arial,sans-serif;">Photos</h3>' +
    '<pre style="font-family:ui-monospace,monospace;font-size:13px;white-space:pre-wrap;">' +
      esc(attachNote) + '</pre>' +
    '<hr>' +
    '<h3 style="font-family:system-ui,Arial,sans-serif;">Submission details</h3>' +
    '<pre style="font-family:ui-monospace,monospace;font-size:12px;white-space:pre-wrap;">' +
      esc(
        // SMS opt-in disabled — consent audit lines omitted (email only for now)
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

    /* SMS DISABLED — email only for now. Re-enable when the Twilio campaign is live.
    const firstName = String(name).trim().split(/\s+/)[0] || 'there';
    const sms = { customer: 'skipped:no-consent', mike: 'skipped:not-configured' };
    try {
      if (consentGiven) {
        sms.customer = await sendSms(
          toE164US(phone),
          'Trailside Handyman: Thanks ' + firstName + '! We received your request ' +
          'and will get back to you within 24 hours. Reply STOP to opt out, HELP for help.'
        );
      }
      sms.mike = await sendSms(
        LEAD_ALERT_SMS_TO,
        'New Trailside lead: ' + name + ', ' + phone + ' — ' + service_address +
        '. Check email for full details.'
      );
    } catch (e) {
      // swallow — email already succeeded
    }
    console.log('send-contact SMS status', sms);
    */

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
