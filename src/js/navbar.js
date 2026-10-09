/* ==========================================================================
   VENACARE — SHARED NAVBAR (rendered on every page via #site-header)
   Contains: utility top bar · brand · primary links · pages dropdown ·
   theme toggle · RTL toggle · profile dropdown · mobile drawer
   ========================================================================== */

(function () {
  'use strict';

  var S = window.SITE;

  var NAV_LINKS = [
    { label: 'Home', href: 'index.html', key: 'index.html' },
    { label: 'About', href: 'public/pages/about.html', key: 'about.html' },
    { label: 'Services', href: 'public/pages/services.html', key: 'services.html' },
    { label: 'Book Draw', href: 'public/pages/booking.html', key: 'booking.html' },
    { label: 'Pricing', href: 'public/pages/pricing.html', key: 'pricing.html' },
    { label: 'Blog', href: 'public/pages/blog.html', key: 'blog.html' },
    { label: 'Contact', href: 'public/pages/contact.html', key: 'contact.html' }
  ];

  var PAGE_MENU = [
    { label: 'Book At-Home Draw', href: 'public/pages/booking.html', icon: 'bi-calendar2-check-fill' },
    { label: 'Routine & Specialized Services', href: 'public/pages/services.html', icon: 'bi-clipboard2-pulse-fill' },
    { label: 'Transparent Test Pricing', href: 'public/pages/pricing.html', icon: 'bi-tags-fill' },
    { label: 'Home 2 · Emergency Camp', href: 'public/pages/home-2.html', icon: 'bi-lightning-charge-fill' },
    { label: 'Service Details', href: 'public/pages/service-details.html?id=at-home-collection', icon: 'bi-clipboard2-pulse-fill' },
    { label: 'Article Details', href: 'public/pages/blog-details.html?id=first-donor-guide', icon: 'bi-newspaper' },
    { label: 'Help & FAQ', href: 'public/pages/FAQ.html', icon: 'bi-question-circle-fill' },
    { label: 'Privacy Policy', href: 'public/pages/Privacy-policy.html', icon: 'bi-shield-lock-fill' },
    { label: 'Terms of Service', href: 'public/pages/Terms-of-service.html', icon: 'bi-file-earmark-text-fill' },
    { label: 'Coming Soon', href: 'public/pages/coming-soon.html', icon: 'bi-hourglass-split' },
    { label: '404 Error', href: 'public/pages/404.html', icon: 'bi-exclamation-triangle-fill' }
  ];

  function currentFile() {
    return (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  }

  function isActive(key) {
    var here = currentFile();
    if (key === 'services.html' && here === 'service-details.html') return true;
    if (key === 'blog.html' && here === 'blog-details.html') return true;
    return key === here;
  }

  function navLinksHTML() {
    return NAV_LINKS.map(function (item) {
      return '<li><a class="nav-link' + (isActive(item.key) ? ' active' : '') + '" data-nav-link href="' +
        S.link(item.href) + '">' + item.label + '</a></li>';
    }).join('');
  }

  function pageMenuHTML() {
    return PAGE_MENU.map(function (item) {
      var active = currentFile() === item.href.split('?')[0].split('/').pop().toLowerCase();
      return '<a class="dropdown-item' + (active ? ' active' : '') + '" href="' + S.link(item.href) + '"><i class="bi ' +
        item.icon + '"></i>' + item.label + '</a>';
    }).join('');
  }

  function profileMenuHTML() {
    return (
      '<div class="dropdown-head">' +
        '<img src="' + S.link('assets/img/avatar-user.svg') + '" alt="Patient avatar" />' +
        '<div>' +
          '<strong style="display:block;font-size:0.92rem;">Patient Portal</strong>' +
          '<span style="font-size:0.76rem;color:var(--text-faint);">Lab results &amp; bookings</span>' +
        '</div>' +
      '</div>' +
      '<div class="dropdown-label">Patient Access</div>' +
      '<a class="dropdown-item" href="' + S.link('public/auth/login.html') + '"><i class="bi bi-box-arrow-in-right"></i>Log In</a>' +
      '<a class="dropdown-item" href="' + S.link('public/auth/signup.html') + '"><i class="bi bi-person-plus-fill"></i> Sign Up </a>' +
      '<div class="dropdown-divider"></div>' +
      '<div class="dropdown-label">My Medical Care</div>' +
      '<a class="dropdown-item" href="' + S.link('public/auth/user/user-dashboard.html') + '"><i class="bi bi-file-earmark-medical-fill"></i>User Dashboard</a>' +
      '<a class="dropdown-item" href="' + S.link('public/auth/admin/admin-dashboard.html') + '"><i class="bi bi-file-earmark-medical-fill"></i>Admin Dashboard</a>'
    );
  }

  function navbarHTML() {
    return (

      '<nav class="site-nav" id="site-navbar" role="navigation" aria-label="Main navigation">' +
        '<div class="container-x">' +
          '<div class="nav-inner">' +

            '<a class="brand" href="' + S.link('index.html') + '" aria-label="VenaCare At-Home Lab Services">' +
              '<img src="' + S.link('assets/img/logo.png') + '" alt="VenaCare logo" />' +
              '<span>' +
                '<span class="brand-name">VenaCare</span>' +
              '</span>' +
            '</a>' +

            '<ul class="nav-links" role="list">' + navLinksHTML() +

            '</ul>' +

            '<div class="nav-actions">' +
              '<button class="icon-btn" type="button" data-theme-toggle aria-label="Toggle colour theme"><i class="bi bi-moon-stars-fill"></i></button>' +
              '<button class="icon-btn hidden sm:inline-flex" type="button" data-rtl-toggle aria-label="Toggle RTL layout" title="Toggle RTL layout"><i class="bi bi-text-right"></i></button>' +

              '<div class="dropdown" data-profile-dropdown>' +
                '<button class="icon-btn" type="button" aria-haspopup="true" aria-expanded="false" data-profile-toggle aria-label="Open patient menu">' +
                  '<i class="bi bi-person-fill"></i>' +
                '</button>' +
                '<div class="dropdown-menu">' + profileMenuHTML() + '</div>' +
              '</div>' +

              '<a class="btn btn-primary btn-sm hidden md:inline-flex" href="' + S.link('public/pages/booking.html') + '">' +
                'Book Test</a>' +

              '<button class="icon-btn burger" type="button" data-drawer-open aria-label="Open menu" aria-expanded="false">' +
                '<i class="bi bi-list" style="font-size:1.3rem;"></i></button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</nav>' +

      '<div class="mobile-drawer" data-drawer aria-hidden="true">' +
        '<div class="mobile-drawer-backdrop" data-drawer-close></div>' +
        '<div class="mobile-drawer-panel">' +
          '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem;">' +
            '<a class="brand" href="' + S.link('index.html') + '">' +
              '<img src="' + S.link('assets/img/logo.svg') + '" alt="" />' +
              '<span><span class="brand-name">VenaCare</span><span class="brand-tag">At-Home Lab Services</span></span>' +
            '</a>' +
            '<button class="icon-btn" type="button" data-drawer-close aria-label="Close menu"><i class="bi bi-x-lg"></i></button>' +
          '</div>' +

          '<div class="dropdown-label">Main</div>' +
          NAV_LINKS.map(function (item) {
            return '<a class="mobile-link' + (isActive(item.key) ? ' active' : '') + '" href="' + S.link(item.href) + '">' +
              item.label + '<i class="bi bi-chevron-right"></i></a>';
          }).join('') +

          '<div class="dropdown-label" style="margin-top:1rem;">More pages</div>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:0.4rem;">' +
            PAGE_MENU.slice(0, 6).map(function (item) {
              return '<a class="mobile-link" style="border:1px solid var(--border);border-bottom:1px solid var(--border);font-size:0.82rem;padding:0.6rem 0.7rem;" href="' +
                S.link(item.href) + '"><i class="bi ' + item.icon + '" style="color:var(--primary);"></i>' +
                item.label.replace(/^[^·]+·?\s*/, '') + '</a>';
            }).join('') +
          '</div>' +

          '<div class="dropdown-label" style="margin-top:1rem;">Patient Portal</div>' +
          '<a class="mobile-link" href="' + S.link('public/auth/login.html') + '"><span><i class="bi bi-box-arrow-in-right" style="color:var(--primary);margin-inline-end:0.5rem;"></i>Patient Portal Log In</span><i class="bi bi-chevron-right"></i></a>' +
          '<a class="mobile-link" href="' + S.link('public/auth/signup.html') + '"><span><i class="bi bi-person-plus-fill" style="color:var(--primary);margin-inline-end:0.5rem;"></i>Register New Patient</span><i class="bi bi-chevron-right"></i></a>' +
          '<a class="mobile-link" href="' + S.link('public/auth/user/user-dashboard.html') + '"><span><i class="bi bi-file-earmark-medical-fill" style="color:var(--primary);margin-inline-end:0.5rem;"></i>My Lab Reports</span><i class="bi bi-chevron-right"></i></a>' +

          '<div style="display:flex;gap:0.5rem;margin-top:1.25rem;">' +
            '<button class="btn btn-outline btn-sm" type="button" data-theme-toggle style="flex:1;"><i class="bi bi-moon-stars-fill"></i>Theme</button>' +
            '<button class="btn btn-outline btn-sm" type="button" data-rtl-toggle style="flex:1;"><i class="bi bi-text-right"></i>RTL</button>' +
          '</div>' +

          '<a class="btn btn-primary btn-block" style="margin-top:0.75rem;" href="' + S.link('public/pages/booking.html') + '">' +
            '<i class="bi bi-house-heart"></i>Book At-Home Collection</a>' +
        '</div>' +
      '</div>'
    );
  }

  function bind() {
    var drawer = S.qs('[data-drawer]');
    var openBtn = S.qs('[data-drawer-open]');

    if (openBtn && drawer) {
      openBtn.addEventListener('click', function () {
        drawer.classList.add('open');
        drawer.setAttribute('aria-hidden', 'false');
        openBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      });
      S.qsa('[data-drawer-close]', drawer).forEach(function (node) {
        node.addEventListener('click', function () {
          drawer.classList.remove('open');
          drawer.setAttribute('aria-hidden', 'true');
          if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });
    }

    var profile = S.qs('[data-profile-dropdown]');
    if (profile) {
      var toggle = S.qs('[data-profile-toggle]', profile);
      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = profile.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
      });
      document.addEventListener('click', function (e) {
        if (!profile.contains(e.target)) {
          profile.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          profile.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          if (drawer && drawer.classList.contains('open')) {
            drawer.classList.remove('open');
            document.body.style.overflow = '';
          }
        }
      });
    }
  }

  S.onLoad(function () {
    var mount = document.getElementById('site-header');
    if (!mount) return;
    mount.innerHTML = navbarHTML();
    bind();
    if (S && typeof S.applyDir === 'function') {
      S.applyDir(document.documentElement.getAttribute('dir') || 'ltr');
    }
  });
})();
