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

// Links flagged with data-popup open in a centered popup window instead of a
// full tab: the Google reviews link in the nav, and the portfolio tiles that
// point at our Google Photos albums. Browsers allow this because it happens
// inside a real click; if a blocker stops it anyway we leave the click alone
// and the href opens a normal new tab.
//   data-popup       window name (reused on repeat clicks)
//   data-popup-size  fraction of the screen the window fills (default 0.7)
//   data-popup-then  where the original page goes once the popup is open
(function () {
  var links = document.querySelectorAll('a[data-popup]');
  if (!links.length) return;

  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      // Let modifier- and middle-clicks do their normal thing.
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      // Phones and small tablets ignore window sizing, so just open a tab.
      if (window.innerWidth < 700) return;

      var size = parseFloat(link.getAttribute('data-popup-size')) || 0.7;
      var w = Math.round(screen.availWidth * size);
      var h = Math.round(screen.availHeight * size);
      var left = Math.round((screen.availWidth - w) / 2 + (screen.availLeft || 0));
      var top = Math.round((screen.availHeight - h) / 2 + (screen.availTop || 0));
      var features = 'popup=yes,width=' + w + ',height=' + h +
        ',left=' + left + ',top=' + top + ',scrollbars=yes,resizable=yes';

      var win = window.open(link.href, link.getAttribute('data-popup'), features);
      if (!win) return;  // blocked — the anchor's target="_blank" takes over

      e.preventDefault();
      try { win.opener = null; } catch (err) {}
      win.focus();

      // Leave the quote page behind the album window when asked to.
      var next = link.getAttribute('data-popup-then');
      if (next) window.location.href = next;
    });
  });
})();

// Contact form: compress any uploaded photos in the browser, then POST the
// lead as JSON to the /api/send-contact Vercel function, which emails it via
// Resend. No mail client involved — the visitor stays on the page.
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  // SMS opt-in DISABLED for now — email only. Re-enable with the SMS integration.
  // var CONSENT_VERSION = 'v1.0-2026-05-12';

  var ENDPOINT = '/api/send-contact';

  // Photo compression budget. Vercel caps the request body at ~4.5 MB, so we
  // keep the combined base64 of all photos comfortably under that.
  var MAX_TOTAL_CHARS = 3.5 * 1024 * 1024;
  var MAX_DIM = 1600;      // longest edge, px
  var JPEG_QUALITY = 0.72;

  function digitsOnly(s) { return (s || '').replace(/\D+/g, ''); }

  function setStatus(msg, isError) {
    var status = form.querySelector('.form__status');
    if (!status) return;
    status.textContent = msg || '';
    status.style.color = isError ? '#c0392b' : '';
  }

  function showSuccess(phone, consentGiven) {
    var success = document.getElementById('contact-success');
    if (!success) return;
    form.hidden = true;
    success.hidden = false;

    // SMS opt-in disabled — no confirmation-text line shown (email only for now).
    // var smsLine = document.getElementById('contact-success-sms');
    // if (smsLine) {
    //   if (consentGiven && phone) {
    //     smsLine.textContent = "I'll also send a confirmation text to " + phone + " shortly.";
    //     smsLine.hidden = false;
    //   } else {
    //     smsLine.hidden = true;
    //   }
    // }
    success.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Downscale + re-encode one image file to a JPEG data URL. Resolves null for
  // non-images or files the browser can't decode (e.g. some HEIC).
  function compressImage(file, maxDim, quality) {
    return new Promise(function (resolve) {
      if (!file || !/^image\//.test(file.type)) { resolve(null); return; }
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () {
        URL.revokeObjectURL(url);
        var w = img.naturalWidth, h = img.naturalHeight;
        if (!w || !h) { resolve(null); return; }
        var scale = Math.min(1, maxDim / Math.max(w, h));
        var cw = Math.max(1, Math.round(w * scale));
        var ch = Math.max(1, Math.round(h * scale));
        var canvas = document.createElement('canvas');
        canvas.width = cw;
        canvas.height = ch;
        try {
          canvas.getContext('2d').drawImage(img, 0, 0, cw, ch);
          var baseName = file.name.replace(/\.[^.]+$/, '') || 'photo';
          resolve({ filename: baseName + '.jpg', content: canvas.toDataURL('image/jpeg', quality) });
        } catch (e) {
          resolve(null);
        }
      };
      img.onerror = function () { URL.revokeObjectURL(url); resolve(null); };
      img.src = url;
    });
  }

  // Compress up to 5 photos, staying within the total-size budget. Retries a
  // too-big photo once at a smaller size before giving up on it.
  function collectPhotos(fileList) {
    var files = [];
    for (var i = 0; i < fileList.length && i < 5; i++) files.push(fileList[i]);
    var out = [];
    var used = 0;
    return files.reduce(function (chain, file) {
      return chain.then(function () {
        return compressImage(file, MAX_DIM, JPEG_QUALITY).then(function (c) {
          if (c && c.content.length > MAX_TOTAL_CHARS - used) {
            return compressImage(file, 1100, 0.55); // second, smaller pass
          }
          return c;
        }).then(function (c) {
          if (c && c.content.length <= MAX_TOTAL_CHARS - used) {
            out.push(c);
            used += c.content.length;
          }
        });
      });
    }, Promise.resolve()).then(function () { return out; });
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
    var timeline = (data.get('timeline') || '').trim();
    var budget = (data.get('budget') || '').trim();
    var homeDecade = (data.get('home_decade') || '').trim();
    var referral = (data.get('referral_source') || '').trim() || 'Not provided';
    // SMS opt-in disabled — email only for now.
    // var smsConsent = data.get('sms_consent') === 'yes';
    var smsConsent = false;

    var submitBtn = form.querySelector('.contact-form__submit');
    var btnLabel = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
    setStatus('Compressing photos and sending your request…', false);

    var photoFiles = (form.elements['photos'] && form.elements['photos'].files) || [];

    collectPhotos(photoFiles).then(function (photos) {
      var payload = {
        name: name,
        email: email,
        phone: phoneRaw,
        service_address: serviceAddress,
        message: message,
        timeline: timeline,
        budget: budget,
        home_decade: homeDecade,
        referral_source: referral,
        // sms_consent: smsConsent,           // SMS disabled — email only
        // consent_version: CONSENT_VERSION,
        source_url: window.location.href,
        photos: photos
      };

      return fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      setStatus('', false);
      showSuccess(phoneRaw, smsConsent);
    }).catch(function () {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = btnLabel; }
      setStatus(
        'Sorry — something went wrong sending your request. Please email ' +
        'michael@trailsidehandyman.com or call (303) 214-4479.',
        true
      );
    });
  });
})();
