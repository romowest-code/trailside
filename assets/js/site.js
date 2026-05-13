// Mobile nav toggle
(function () {
  var nav = document.querySelector('.site-nav');
  var btn = document.querySelector('.site-nav__hamburger');
  if (!nav || !btn) return;

  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close the menu after clicking a link (mobile).
  nav.querySelectorAll('.site-nav__links a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Contact form: build a mailto: URL from the form fields and open it.
// Works zero-setup. To upgrade to direct-submit, swap this for a POST
// to Formspree / Web3Forms / a Vercel function.
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  // Version + verbatim text of the SMS consent shown on this page. Logged in
  // the outgoing email so Mike has an inbox-level paper trail of what each
  // submitter saw and agreed to.
  var CONSENT_VERSION = 'v1.0-2026-05-12';
  var CONSENT_TEXT = (
    'Text me about my project (optional). I consent to receive SMS text ' +
    'messages from Trailside Handyman at the phone number provided regarding ' +
    'appointment scheduling, technician arrival times, job updates, ' +
    'estimates, invoices, and replies to my questions. Message and data ' +
    'rates may apply. Message frequency varies. Reply HELP for help, reply ' +
    'STOP to unsubscribe at any time. Consent is not a condition of ' +
    'purchase. See our Privacy Policy and Terms & Conditions.'
  );

  function digitsOnly(s) { return (s || '').replace(/\D+/g, ''); }

  function showSuccess(phone, consentGiven) {
    var success = document.getElementById('contact-success');
    if (!success) return;
    form.hidden = true;
    success.hidden = false;

    var smsLine = document.getElementById('contact-success-sms');
    if (smsLine) {
      if (consentGiven && phone) {
        smsLine.textContent = "I'll also text you at " + phone + " when your estimate is ready.";
        smsLine.hidden = false;
      } else {
        smsLine.hidden = true;
      }
    }
    success.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Honeypot: if filled, silently "succeed" without sending.
    var hp = (form.elements['website'] && form.elements['website'].value) || '';
    if (hp.trim() !== '') {
      showSuccess('', false);
      return;
    }

    // Trigger native validation before we proceed.
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var data = new FormData(form);
    var name = (data.get('name') || '').trim();
    var email = (data.get('email') || '').trim();
    var phoneRaw = (data.get('phone') || '').trim();
    var phoneDigits = digitsOnly(phoneRaw);
    if (phoneDigits.length < 10) {
      var phoneEl = document.getElementById('phone');
      if (phoneEl) {
        phoneEl.setCustomValidity('Please enter a valid 10-digit phone number.');
        phoneEl.reportValidity();
        phoneEl.addEventListener('input', function clear() {
          phoneEl.setCustomValidity('');
          phoneEl.removeEventListener('input', clear);
        });
      }
      return;
    }
    var serviceAddress = (data.get('service_address') || '').trim();
    var message = (data.get('message') || '').trim();
    var referral = (data.get('referral_source') || '').trim() || 'Not provided';
    var smsConsent = data.get('sms_consent') === 'yes';

    // List of photo filenames (mailto: can't actually attach files; the user
    // needs to attach them in their mail client. We surface this in the body.)
    var photoFiles = (form.elements['photos'] && form.elements['photos'].files) || [];
    var photoLines = [];
    for (var i = 0; i < photoFiles.length; i++) {
      photoLines.push('  - ' + photoFiles[i].name + ' (' + Math.round(photoFiles[i].size / 1024) + ' KB)');
    }

    var subject = 'New Trailside Handyman lead: ' + name;
    var body = [
      'NEW LEAD via trailsidehandyman.com',
      '',
      'Name: ' + name,
      'Phone: ' + phoneRaw,
      'Email: ' + email,
      'Service Address: ' + serviceAddress,
      'Heard about us: ' + referral,
      'SMS Consent: ' + (smsConsent ? 'YES' : 'NO'),
      '',
      'PROJECT DESCRIPTION:',
      message,
      '',
      'PHOTOS:',
      photoLines.length
        ? photoLines.join('\n') + '\n(Please attach these photos to this email before sending.)'
        : 'No photos uploaded.',
      '',
      '----- SMS consent audit trail -----',
      'Consent text version: ' + CONSENT_VERSION,
      'Consent text shown to submitter:',
      CONSENT_TEXT,
      'Submitter agreed: ' + (smsConsent ? 'YES' : 'NO'),
      'Submitted: ' + new Date().toISOString(),
      'Source URL: ' + window.location.href,
      'User Agent: ' + navigator.userAgent
    ].join('\n');

    var href = 'mailto:michael@trailsidehandyman.com' +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    showSuccess(phoneRaw, smsConsent);
    window.location.href = href;
  });
})();
