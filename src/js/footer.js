/* ==========================================================================
   VENACARE — SHARED FOOTER (rendered on every page via #site-footer)
   Includes newsletter form with client-side validation + acknowledgement.
   ========================================================================== */

(function () {
  'use strict';

  var S = window.SITE;

  var QUICK_LINKS = [
    { label: 'Home Page', href: 'index.html', icon: 'bi-house-door-fill' },
    { label: 'Book At-Home Draw', href: 'public/pages/booking.html', icon: 'bi-calendar2-check-fill' },
    { label: 'Blood Tests & Services', href: 'public/pages/services.html', icon: 'bi-clipboard2-pulse-fill' },
    { label: 'Test Pricing & Packages', href: 'public/pages/pricing.html', icon: 'bi-tags-fill' },
    { label: 'Patient Portal', href: 'public/auth/login.html', icon: 'bi-file-earmark-lock2-fill' },
    { label: 'About Our Labs', href: 'public/pages/about.html', icon: 'bi-info-circle-fill' },
    { label: 'Contact Lab Desk', href: 'public/pages/contact.html', icon: 'bi-envelope-fill' }
  ];

  var SERVICE_LINKS = [
    { label: 'At-Home Sample Collection', href: 'public/pages/service-details.html?id=at-home-collection' },
    { label: 'Complete Blood Count', href: 'public/pages/service-details.html?id=cbc-panel' },
    { label: 'Comprehensive Metabolic', href: 'public/pages/service-details.html?id=cmp-metabolic' },
    { label: 'Lipid & Cholesterol', href: 'public/pages/service-details.html?id=lipid-profile' },
    { label: 'Thyroid Function', href: 'public/pages/service-details.html?id=thyroid-panel' },
    { label: 'Specialized Cardiac & Hormones', href: 'public/pages/service-details.html?id=cardiac-crp' }
  ];

  function footerHTML() {
    return (
      '<footer class="site-footer" id="footer">' +
        '<div class="container-x">' +

          '<div class="footer-grid">' +

            '<div>' +
              '<a class="brand" href="' + S.link('index.html') + '" style="margin-bottom:1rem;">' +
                '<img src="' + S.link('assets/img/logo.png') + '" alt="VenaCare logo" />' +
                '<span><span class="brand-name">VenaCare</span></span>' +
              '</a>' +
              '<p style="font-size:0.94rem;max-width:26rem;margin-bottom:1.25rem;">' +
                'VenaCare provides convenient, clinical at-home blood sample collection for routine and specialized lab tests.' +
              '</p>' +
              '<div style="display:flex;gap:0.6rem;flex-wrap:wrap;">' +
                ['facebook', 'instagram', 'linkedin', 'youtube'].map(function (net) {
                  return '<a class="social-btn" href="#" aria-label="VenaCare on ' + net + '"><i class="bi bi-' + net + '"></i></a>';
                }).join('') +
              '</div>' +
            '</div>' +

            '<div>' +
              '<h4 class="footer-title">Quick links</h4>' +
              QUICK_LINKS.map(function (item) {
                return '<a class="footer-link" href="' + S.link(item.href) + '"><i class="bi ' + item.icon + '"></i>' + item.label + '</a>';
              }).join('') +
            '</div>' +

            '<div>' +
              '<h4 class="footer-title">Tests</h4>' +
              SERVICE_LINKS.map(function (item) {
                return '<a class="footer-link" href="' + S.link(item.href) + '"><i class="bi bi-chevron-right"></i>' + item.label + '</a>';
              }).join('') +
            '</div>' +

            '<div>' +
              '<h4 class="footer-title">Stay connected</h4>' +
              '<div style="margin-top:1.4rem;display:grid;gap:0.6rem;font-size:0.9rem;">' +
                '<span class="footer-link" style="padding:0;"><i class="bi bi-geo-alt-fill"></i>221 Meridian Ave, Central Medical District</span>' +
                '<a class="footer-link" style="padding:0;" href="mailto:support@venacare.com"><i class="bi bi-envelope-fill"></i>support@venacare.com</a>' +
                '<a class="footer-link" style="padding:0;" href="tel:+18005535227"><i class="bi bi-telephone-fill"></i>+1 (800) 553-LABS (5227)</a>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="footer-bottom">' +
            '<span>© <span data-year></span> VenaCare Clinical Lab Services. CLIA &amp; CAP Accredited Partners.</span>' +
            '<div style="display:flex;gap:1.25rem;flex-wrap:wrap;">' +
              '<a class="link-primary" style="font-size:0.85rem;font-weight:500;" href="' + S.link('public/pages/Privacy-policy.html') + '">Privacy Policy</a>' +
              '<a class="link-primary" style="font-size:0.85rem;font-weight:500;" href="' + S.link('public/pages/Terms-of-service.html') + '">Terms of Service</a>' +
              '<a class="link-primary" style="font-size:0.85rem;font-weight:500;" href="' + S.link('public/pages/FAQ.html') + '">FAQ</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</footer>' +

      '<button class="icon-btn" data-to-top type="button" aria-label="Back to top" ' +
        'style="position:fixed;inset-inline-end:1.1rem;inset-block-end:1.1rem;z-index:120;opacity:0;pointer-events:none;' +
        'width:2.8rem;height:2.8rem;background:var(--surface-solid);box-shadow:var(--glow-sm);transition:opacity 0.3s;">' +
        '<i class="bi bi-arrow-up"></i></button>'
    );
  }

  S.onLoad(function () {
    var mount = document.getElementById('site-footer');
    if (!mount) return;
    mount.innerHTML = footerHTML();

    var year = S.qs('[data-year]');
    if (year) year.textContent = new Date().getFullYear();

    var toTop = S.qs('[data-to-top]');
    if (toTop) {
      toTop.style.pointerEvents = 'auto';
      var sync = function () {
        toTop.style.opacity = (window.scrollY || 0) > 600 ? '1' : '0';
      };
      window.addEventListener('scroll', sync, { passive: true });
      sync();
      toTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  });
})();
