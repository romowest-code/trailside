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
  var form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var name = (data.get('name') || '').trim();
    var email = (data.get('email') || '').trim();
    var phone = (data.get('phone') || '').trim();
    var subject = (data.get('subject') || '').trim() || 'Trailside Handyman website contact';
    var message = (data.get('message') || '').trim();

    var body =
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n' +
      'Phone: ' + (phone || '—') + '\n\n' +
      message;

    var href = 'mailto:michael@trailsidehandyman.com' +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    var status = form.querySelector('.form__status');
    if (status) {
      status.textContent = 'Opening your email app… if nothing happens, email michael@trailsidehandyman.com directly.';
      status.classList.add('is-visible');
    }
    window.location.href = href;
  });
})();
