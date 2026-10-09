/* ==========================================================================
   VENACARE — SHARED UI COMPONENT BUILDERS
   Used by home.js, services.js, service-details.js, blog.js and
   blog-details.js so every card in the site renders identically.
   ========================================================================== */

window.UI = (function () {
  'use strict';

  var S = window.SITE;

  function stars(count) {
    var out = '';
    for (var i = 1; i <= 5; i++) {
      out += '<i class="bi ' + (i <= count ? 'bi-star-fill' : 'bi-star') + '" style="color:' +
        (i <= count ? 'var(--warning)' : 'var(--text-faint)') + ';font-size:0.85rem;"></i>';
    }
    return '<span style="display:inline-flex;gap:0.15rem;" aria-label="' + count + ' out of 5 stars">' + out + '</span>';
  }

  function serviceCard(svc, root) {
    var catClass = svc.category === 'Routine' ? 'badge blue' : (svc.category === 'Specialized' ? 'badge' : (svc.category === 'Packages' ? 'badge green' : 'badge plain'));
    var fastingBadge = svc.fasting ? '<span class="badge plain" style="font-size:0.75rem;"><i class="bi bi-clock"></i>' + S.esc(svc.fasting.split('(')[0].trim()) + '</span>' : '';
    var priceText = svc.priceFrom === 0 ? 'Free with panels > $50' : (svc.priceFrom ? '$' + svc.priceFrom : 'Free');

    return (
      '<div class="service-card flex flex-col justify-between" style="text-decoration:none;position:relative;">' +
        '<div>' +
          '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.75rem;margin-bottom:0.75rem;">' +
            '<span class="icon-box lg"><i class="bi ' + svc.icon + '"></i></span>' +
            '<span class="' + catClass + '">' + S.esc(svc.kicker || svc.category) + '</span>' +
          '</div>' +
          '<h3 style="font-size:1.15rem;margin-bottom:0.5rem;line-height:1.3;">' + S.esc(svc.title) + '</h3>' +
          '<p style="font-size:0.88rem;color:var(--text-muted);margin-bottom:1rem;line-height:1.5;">' + S.esc(svc.excerpt) + '</p>' +
          (fastingBadge ? '<div style="margin-bottom:0.75rem;">' + fastingBadge + '</div>' : '') +
          '<div class="service-tags" style="margin-bottom:1rem;">' +
            svc.bullets.slice(0, 3).map(function (b) {
              return '<span class="badge plain" style="font-size:0.76rem;"><i class="bi bi-check2" style="color:var(--primary);"></i>' + S.esc(b) + '</span>';
            }).join('') +
          '</div>' +
        '</div>' +
        '<div style="border-top:1px dashed var(--border);padding-top:0.85rem;margin-top:auto;display:flex;align-items:center;justify-content:space-between;gap:0.75rem;">' +
          '<div>' +
            '<span style="display:block;font-size:0.72rem;color:var(--text-faint);text-transform:uppercase;letter-spacing:0.04em;">Lab &amp; Home Draw</span>' +
            '<strong style="font-size:1.15rem;color:var(--text);">' + priceText + '</strong>' +
          '</div>' +
          '<a class="btn btn-primary btn-sm" href="' + S.link('public/pages/service-details.html?id=' + encodeURIComponent(svc.id)) + '">' +
            'View Test <i class="bi bi-arrow-right"></i></a>' +
        '</div>' +
      '</div>'
    );
  }

  function postCard(post) {
    var d = S.formatDate(post.date);
    return (
      '<article class="post-card">' +
        '<a class="post-media" href="' + S.link('public/pages/blog-details.html?id=' + encodeURIComponent(post.id)) + '">' +
          '<img src="' + S.link(post.image) + '" alt="' + S.esc(post.title) + '" loading="lazy" />' +
          '<span class="badge">' + S.esc(post.category) + '</span>' +
        '</a>' +
        '<div class="post-body">' +
          '<div class="post-meta">' +
            '<span><i class="bi bi-calendar3"></i>' + d + '</span>' +
            '<span><i class="bi bi-clock"></i>' + S.esc(post.readTime) + '</span>' +
            '<span><i class="bi bi-person"></i>' + S.esc(post.author) + '</span>' +
          '</div>' +
          '<h3 class="post-title"><a href="' + S.link('public/pages/blog-details.html?id=' + encodeURIComponent(post.id)) + '">' +
            S.esc(post.title) + '</a></h3>' +
          '<p class="post-excerpt">' + S.esc(post.excerpt) + '</p>' +
          '<a class="post-link" href="' + S.link('public/pages/blog-details.html?id=' + encodeURIComponent(post.id)) + '">' +
            'Read article <i class="bi bi-arrow-right"></i></a>' +
        '</div>' +
      '</article>'
    );
  }

  function campCard(camp) {
    var pct = Math.min(100, Math.round((camp.booked / camp.target) * 100));
    return (
      '<a class="post-card" href="' + S.link('public/pages/contact.html?subject=camp:' + encodeURIComponent(camp.id)) + '">' +
        '<span class="post-media"><img src="' + S.link(camp.image) + '" alt="' + S.esc(camp.title) + '" loading="lazy" />' +
          '<span class="badge"><i class="bi bi-calendar-event"></i>' + S.formatDate(camp.date) + '</span></span>' +
        '<div class="post-body">' +
          '<div class="post-meta">' +
            '<span><i class="bi bi-geo-alt"></i>' + S.esc(camp.city) + '</span>' +
            '<span><i class="bi bi-clock"></i>' + S.esc(camp.time) + '</span>' +
          '</div>' +
          '<h3 class="post-title">' + S.esc(camp.title) + '</h3>' +
          '<p class="post-excerpt"><i class="bi bi-pin-map" style="color:var(--primary);"></i> ' + S.esc(camp.venue) + '</p>' +
          '<div>' +
            '<div style="display:flex;justify-content:space-between;font-size:0.8rem;color:var(--text-faint);margin-bottom:0.35rem;">' +
              '<span>' + camp.booked + ' booked</span><span>' + camp.target + ' target</span>' +
            '</div>' +
            '<div class="progress"><span style="width:' + pct + '%;"></span></div>' +
          '</div>' +
          '<span class="post-link">Reserve a slot <i class="bi bi-arrow-right"></i></span>' +
        '</div>' +
      '</a>'
    );
  }

  function testimonialCard(t) {
    return (
      '<figure class="card card-hover" style="display:flex;flex-direction:column;gap:1rem;height:100%;">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;">' +
          stars(t.rating) +
          '<i class="bi bi-quote" style="font-size:1.9rem;color:var(--primary);opacity:0.75;"></i>' +
        '</div>' +
        '<blockquote style="color:var(--text-muted);font-size:0.97rem;flex:1;">“' + S.esc(t.quote) + '”</blockquote>' +
        '<figcaption style="display:flex;align-items:center;gap:0.8rem;border-top:1px solid var(--border);padding-top:1rem;">' +
          '<img src="' + S.link(t.img) + '" alt="' + S.esc(t.name) + '" style="width:46px;height:46px;border-radius:50%;" />' +
          '<span><strong style="display:block;font-size:0.95rem;">' + S.esc(t.name) + '</strong>' +
          '<span style="font-size:0.82rem;color:var(--text-faint);">' + S.esc(t.role) + '</span></span>' +
        '</figcaption>' +
      '</figure>'
    );
  }

  function teamCard(m) {
    var socs = (m.socials || []).map(function (s) {
      var icon = s === 'x-twitter' ? 'bi-twitter-x' : (s === 'linkedin' ? 'bi-linkedin' : (s === 'instagram' ? 'bi-instagram' : 'bi-share'));
      return '<a href="#" class="icon-btn" style="width:2.2rem;height:2.2rem;font-size:0.9rem;" aria-label="' + S.esc(s) + '" onclick="event.preventDefault();">' +
        '<i class="bi ' + icon + '"></i></a>';
    }).join('');

    return (
      '<div class="card card-hover flex flex-col items-center text-center">' +
        '<div style="position:relative;width:96px;height:96px;margin:0 auto 1.15rem;">' +
          '<img src="' + S.link(m.img) + '" alt="' + S.esc(m.name) + '" style="width:100%;height:100%;border-radius:50%;border:2px solid rgba(255,46,76,0.45);box-shadow:var(--glow-sm);object-fit:cover;" loading="lazy" />' +
        '</div>' +
        '<h3 style="font-size:1.12rem;font-weight:700;margin-bottom:0.3rem;">' + S.esc(m.name) + '</h3>' +
        '<p style="font-size:0.78rem;color:var(--primary);font-weight:700;letter-spacing:0.04em;text-transform:uppercase;margin-bottom:0.75rem;">' + S.esc(m.role) + '</p>' +
        '<p style="font-size:0.88rem;color:var(--text-muted);line-height:1.55;margin-bottom:1.25rem;flex:1;">' + S.esc(m.bio) + '</p>' +
        (socs ? '<div style="display:flex;gap:0.5rem;justify-content:center;margin-top:auto;">' + socs + '</div>' : '') +
      '</div>'
    );
  }

  function faqItem(item, open) {
    return (
      '<div class="accordion-item' + (open ? ' open' : '') + '" data-accordion-item>' +
        '<button class="accordion-btn" type="button" aria-expanded="' + (open ? 'true' : 'false') + '">' +
          '<span>' + S.esc(item.q) + '</span>' +
          '<span class="acc-icon"><i class="bi bi-plus-lg"></i></span>' +
        '</button>' +
        '<div class="accordion-panel"' + (open ? ' style="max-height:600px;"' : '') + '>' +
          '<div class="accordion-panel-inner">' + S.esc(item.a) + '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function breadcrumb(items, root) {
    return (
      '<nav class="breadcrumb" aria-label="Breadcrumb">' +
        '<a href="' + S.link('index.html') + '"><i class="bi bi-house-door-fill"></i> Home</a>' +
        items.map(function (it, i) {
          var sep = '<i class="bi bi-chevron-right"></i>';
          if (i === items.length - 1) return sep + '<span class="current">' + S.esc(it.label) + '</span>';
          return sep + '<a href="' + S.link(it.href) + '">' + S.esc(it.label) + '</a>';
        }).join('') +
      '</nav>'
    );
  }

  function emptyState(text, icon) {
    return '<div class="empty-state"><i class="bi ' + (icon || 'bi-search') + '"></i>' +
      '<p style="font-weight:600;color:var(--text);">' + S.esc(text) + '</p>' +
      '<p style="font-size:0.9rem;margin-top:0.35rem;">Try a different keyword or category filter.</p></div>';
  }

  function fill(selector, html) {
    var node = S.qs(selector);
    if (node) node.innerHTML = html;
    return !!node;
  }

  return {
    stars: stars,
    serviceCard: serviceCard,
    postCard: postCard,
    campCard: campCard,
    testimonialCard: testimonialCard,
    teamCard: teamCard,
    faqItem: faqItem,
    breadcrumb: breadcrumb,
    emptyState: emptyState,
    fill: fill
  };
})();
