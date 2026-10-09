/* ==========================================================================
   VENACARE — SERVICE DETAILS (dynamic, ?id= driven)
   service-details.html?id=mobile-blood-drive → loads that service record
   from DATA.services and renders hero, overview, features, pricing tiers,
   FAQs and related services. Falls back to the first service + a notice
   when the id is unknown.
   ========================================================================== */

(function () {
  'use strict';

  var S = window.SITE;
  var C = window.UI;

  function notFound(id) {
    var root = S.qs('#service-detail-root');
    if (!root) return;
    root.innerHTML =
      '<section class="section"><div class="container-x"><div class="empty-state">' +
      '<i class="bi bi-clipboard2-x"></i>' +
      '<p style="font-weight:700;color:var(--text);font-size:1.15rem;">Service “' + S.esc(id || 'unknown') + '” was not found.</p>' +
      '<p style="margin-top:0.5rem;">It may have been renamed or retired.</p>' +
      '<a class="btn btn-primary" style="margin-top:1.25rem;" href="' + S.link('public/pages/services.html') + '">' +
      '<i class="bi bi-grid-3x3-gap-fill"></i>Browse all services</a>' +
      '</div></div></section>';
  }

  function render() {
    var params = S.params();
    var id = params.id || '';
    var svc = id ? window.DATA.getService(id) : null;

    if (!svc) {
      if (id) {
        notFound(id);
        S.toast('Service not found', 'Showing our full catalogue instead.', 'error');
      } else {
        svc = window.DATA.services[0];
      }
      if (!svc) return;
      if (!id) paint(svc);
      return;
    }
    paint(svc);
  }

  function paint(svc) {
    /* --- hero / breadcrumb --- */
    C.fill('#sd-breadcrumb', C.breadcrumb([
      { label: 'Services', href: 'public/pages/services.html' },
      { label: svc.title, href: 'public/pages/service-details.html?id=' + svc.id }
    ]));
    C.fill('#sd-kicker', '<i class="bi ' + svc.icon + '"></i>' + S.esc(svc.kicker));
    C.fill('#sd-title', S.esc(svc.title));
    C.fill('#sd-sub', S.esc(svc.excerpt));

    var meta = S.qs('#sd-meta');
    if (meta) {
      meta.innerHTML =
        '<div style="display:flex;flex-wrap:wrap;gap:0.6rem;justify-content:center;margin-top:1.5rem;">' +
        '</div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:0.7rem;justify-content:center;margin-top:1.4rem;">' +
          '<a class="btn btn-primary" href="' + S.link('public/pages/booking.html?id=' + encodeURIComponent(svc.id)) + '">' +
            '<i class="bi bi-calendar-check-fill"></i>Book At-Home Collection</a>' +
          '<a class="btn btn-outline" href="' + S.link('public/pages/pricing.html') + '">' +
            '<i class="bi bi-tags"></i>Compare test pricing</a>' +
        '</div>';
    }

    /* --- overview --- */
    var overview = S.qs('#sd-overview');
    if (overview) {
      overview.innerHTML =
        '<div style="display:grid;gap:2.5rem;grid-template-columns:1fr;align-items:center;" class="lg:grid-cols-2">' +
          '<div>' +
            '<div class="section-head" style="margin-bottom:1.5rem;">' +
              '<span class="kicker"><i class="bi bi-info-circle-fill"></i>Overview</span>' +
              '<h2 class="section-title" style="margin-top:0.9rem;">What you get with ' + S.esc(svc.title) + '</h2>' +
            '</div>' +
            svc.description.map(function (p) {
              return '<p style="color:var(--text-muted);margin-bottom:1rem;">' + S.esc(p) + '</p>';
            }).join('') +
            '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0.75rem;margin-top:1.5rem;">' +
              svc.stats.map(function (st) {
                return '<div class="card card-soft" style="padding:1rem;text-align:center;">' +
                  '<div style="font-family:var(--font-display);font-weight:800;font-size:1.45rem;color:var(--primary);">' + S.esc(st.value) + '</div>' +
                  '<div style="font-size:0.75rem;color:var(--text-faint);margin-top:0.2rem;">' + S.esc(st.label) + '</div>' +
                '</div>';
              }).join('') +
            '</div>' +
          '</div>' +
          '<div style="position:relative;">' +
            '<div class="glow-blob red" style="width:16rem;height:16rem;top:-3rem;inset-inline-end:-3rem;"></div>' +
            '<img src="' + S.link(svc.image) + '" alt="' + S.esc(svc.title) + '" ' +
              'style="position:relative;border-radius:var(--radius-xl);border:1px solid var(--border-strong);box-shadow:var(--glow-lg);width:100%;" />' +
            '<div class="card glass" style="position:absolute;bottom:-1.5rem;inset-inline-start:1rem;padding:1rem 1.2rem;display:flex;gap:0.75rem;align-items:center;">' +
              '<span class="icon-box"><i class="bi bi-check2-circle"></i></span>' +
              '<span><strong style="display:block;font-size:0.92rem;">Fully supervised</strong>' +
              '<span style="font-size:0.78rem;color:var(--text-muted);">Nurse on duty at every session</span></span>' +
            '</div>' +
          '</div>' +
        '</div>';
    }

    /* --- features --- */
    C.fill('#sd-features-head',
      '<span class="kicker"><i class="bi bi-star-fill"></i>Features</span>' +
      '<h2 class="section-title">Everything included, nothing to arrange</h2>' +
      '<p class="section-sub">Each element below is handled by VenaCare staff on the ground — you never have to source, hire or supervise it.</p>');
    C.fill('#sd-features',
      svc.features.map(function (f) {
        return '<div class="card card-hover">' +
          '<span class="icon-box" style="margin-bottom:1rem;"><i class="bi ' + f.icon + '"></i></span>' +
          '<h3 style="font-size:1.06rem;margin-bottom:0.5rem;">' + S.esc(f.title) + '</h3>' +
          '<p style="color:var(--text-muted);font-size:0.92rem;">' + S.esc(f.text) + '</p>' +
        '</div>';
      }).join(''));

    /* --- pricing tiers --- */
    C.fill('#sd-pricing-head',
      '<span class="kicker"><i class="bi bi-diagram-3-fill"></i>Pricing tiers</span>' +
      '<h2 class="section-title">Choose the tier that fits your reach</h2>' +
      '<p class="section-sub">Transparent, per-service pricing — no setup fees, no hidden crew charges. Travel within city limits is included.</p>');
    C.fill('#sd-pricing',
      '<div style="display:grid;gap:1.5rem;grid-template-columns:1fr;align-items:stretch;" class="md:grid-cols-3">' +
        svc.tiers.map(function (t) {
          return '<div class="price-card' + (t.featured ? ' featured' : '') + '">' +
            (t.featured ? '<span class="plan-popular">Most booked</span>' : '') +
            '<div>' +
              '<span class="plan-name">' + S.esc(t.name) + '</span>' +
              '<p style="font-size:0.87rem;color:var(--text-muted);margin-top:0.4rem;">' + S.esc(t.desc) + '</p>' +
            '</div>' +
            '<div class="plan-price">' +
              (t.price === 0 ? 'Free' : '$' + t.price) +
              '<span class="per"> ' + S.esc(t.per) + '</span>' +
            '</div>' +
            '<div style="display:grid;gap:0.65rem;flex:1;">' +
              t.features.map(function (f) {
                return '<span class="price-feature"><i class="bi bi-check-circle-fill"></i>' + S.esc(f) + '</span>';
              }).join('') +
            '</div>' +
            '<a class="btn ' + (t.featured ? 'btn-primary' : 'btn-outline') + ' btn-block" href="' +
              S.link('public/pages/contact.html?subject=' + encodeURIComponent(svc.id + ':' + t.name)) + '">' +
              'Select ' + S.esc(t.name) + '</a>' +
          '</div>';
        }).join('') +
      '</div>');

    /* --- FAQs --- */
    C.fill('#sd-faq-head',
      '<span class="kicker"><i class="bi bi-question-circle-fill"></i>FAQs</span>' +
      '<h2 class="section-title">Questions about ' + S.esc(svc.title) + '</h2>' +
      '<p class="section-sub">Still unsure? Our coordinators answer on <a class="link-primary" href="' +
        S.link('public/pages/contact.html') + '">the contact page</a> within one business hour.</p>');
    C.fill('#sd-faq',
      '<div style="max-width:48rem;margin-inline:auto;" data-accordion>' +
        svc.faqs.map(function (f, i) { return C.faqItem(f, i === 0); }).join('') +
      '</div>');

    /* --- related --- */
    C.fill('#sd-related-head',
      '<span class="kicker"><i class="bi bi-grid-3x3-gap-fill"></i>Related</span>' +
      '<h2 class="section-title">Related services</h2>');
    C.fill('#sd-related',
      '<div style="display:grid;gap:1.5rem;grid-template-columns:1fr;" class="md:grid-cols-3">' +
        (svc.related || []).map(function (rid) {
          var rel = window.DATA.getService(rid);
          return rel ? C.serviceCard(rel) : '';
        }).join('') +
      '</div>');

    document.title = svc.title + ' | VenaCare Clinical Lab Services';

    /* accordion behaviour for the freshly painted FAQ list */
    if (window.UIBindAccordion) window.UIBindAccordion(S.qs('#sd-faq'));
  }

  S.onLoad(render);
})();
