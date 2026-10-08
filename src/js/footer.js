/* ==========================================================================
   VENACARE — SHARED FOOTER (rendered on every page via #site-footer)
   Includes newsletter form with client-side validation + acknowledgement.
   ========================================================================== */

(function () {
  'use strict';

  var S = window.SITE;

  var QUICK_LINKS = [
    { label: 'Home Page', href: 'index.html', icon: 'bi-house-door-fill' },
    { label: 'Blood Tests & Services', href: 'public/pages/services.html', icon: 'bi-clipboard2-pulse-fill' },
    { label: 'Test Pricing & Packages', href: 'public/pages/pricing.html', icon: 'bi-tags-fill' },
    { label: 'Patient Portal', href: 'public/auth/login.html', icon: 'bi-file-earmark-lock2-fill' },
    { label: 'About Our Labs', href: 'public/pages/about.html', icon: 'bi-info-circle-fill' },
    { label: 'Contact Lab Desk', href: 'public/pages/contact.html', icon: 'bi-envelope-fill' }
  ];

  var SERVICE_LINKS = [
    { label: 'At-Home Sample Collection', href: 'public/pages/service-details.html?id=at-home-collection' },
    { label: 'Complete Blood Count (CBC)', href: 'public/pages/service-details.html?id=cbc-panel' },
    { label: 'Comprehensive Metabolic (CMP-14)', href: 'public/pages/service-details.html?id=cmp-metabolic' },
    { label: 'Lipid & Cholesterol Profile', href: 'public/pages/service-details.html?id=lipid-profile' },
    { label: 'Thyroid Function Panel', href: 'public/pages/service-details.html?id=thyroid-panel' },
    { label: 'Specialized Cardiac & Hormones', href: 'public/pages/service-details.html?id=cardiac-crp' }
  ];

  function footerHTML() {
    return (
      '<footer class="site-footer" id="footer">' +
        '<div class="container-x">' +

          '<div class="footer-grid">' +

            '<div>' +
              '<a class="brand" href="' + S.link('index.html') + '" style="margin-bottom:1rem;">' +
                '<img src="' + S.link('assets/img/logo.svg') + '" alt="VenaCare logo" />' +
                '<span><span class="brand-name">VenaCare</span><span class="brand-tag">At-Home Lab Services</span></span>' +
              '</a>' +
              '<p style="font-size:0.94rem;max-width:26rem;margin-bottom:1.25rem;">' +
                'VenaCare provides convenient, clinical at-home blood sample collection for routine and specialized lab tests. Skip the waiting room and access doctor-reviewed results through our secure patient portal.' +
              '</p>' +
              '<div style="display:flex;gap:0.6rem;flex-wrap:wrap;">' +
                ['facebook', 'x-twitter', 'instagram', 'linkedin', 'youtube'].map(function (net) {
                  return '<a class="social-btn" href="#" aria-label="VenaCare on ' + net + '"><i class="bi bi-' + net + '"></i></a>';
                }).join('') +
              '</div>' +
            '</div>' +

            '<div>' +
              '<h4 class="footer-title">Navigation</h4>' +
              QUICK_LINKS.map(function (item) {
                return '<a class="footer-link" href="' + S.link(item.href) + '"><i class="bi ' + item.icon + '"></i>' + item.label + '</a>';
              }).join('') +
            '</div>' +

            '<div>' +
              '<h4 class="footer-title">Blood Tests &amp; Panels</h4>' +
              SERVICE_LINKS.map(function (item) {
                return '<a class="footer-link" href="' + S.link(item.href) + '"><i class="bi bi-chevron-right"></i>' + item.label + '</a>';
              }).join('') +
            '</div>' +

            '<div>' +
              '<h4 class="footer-title">Patient Newsletter</h4>' +
              '<p style="font-size:0.92rem;margin-bottom:1rem;">Stay informed on routine preventive checkups, seasonal biomarker guidelines, and health tips.</p>' +
              '<form class="newsletter-form" data-form="newsletter" novalidate>' +
                '<div class="newsletter-row">' +
                  '<div class="field" style="flex:1;min-width:11rem;">' +
                    '<input class="input" type="email" name="email" placeholder="you@example.com" aria-label="Email address" data-required="email" />' +
                    '<span class="error-msg"><i class="bi bi-exclamation-circle-fill"></i>Enter a valid email address.</span>' +
                  '</div>' +
                  '<button class="btn btn-primary" type="submit"><i class="bi bi-send-fill"></i>Subscribe</button>' +
                '</div>' +
                '<div class="form-success" data-success><i class="bi bi-check2-circle"></i><span>Subscribed — health guidelines and diagnostic tips are on the way.</span></div>' +
              '</form>' +

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
              '<a class="link-primary" style="font-size:0.85rem;font-weight:500;" href="' + S.link('public/auth/login.html') + '">Patient Portal</a>' +
              '<a class="link-primary" style="font-size:0.85rem;font-weight:500;" href="' + S.link('public/pages/contact.html') + '">Support</a>' +
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
