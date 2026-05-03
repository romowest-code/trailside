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
