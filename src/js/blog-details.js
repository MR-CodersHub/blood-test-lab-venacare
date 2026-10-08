/* ==========================================================================
   VENACARE — BLOG DETAILS (dynamic, ?id= driven)
   blog-details.html?id=first-donor-guide → renders the matching article
   from DATA.posts: hero meta, cover, body, takeaways, table of contents,
   author card, tags, share links, prev/next and related articles.
   ========================================================================== */

(function () {
  'use strict';

  var S = window.SITE;
  var C = window.UI;

  function notFound(id) {
    var root = S.qs('#blog-detail-root');
    if (!root) return;
    root.innerHTML =
      '<section class="section"><div class="container-x"><div class="empty-state">' +
      '<i class="bi bi-journal-x"></i>' +
      '<p style="font-weight:700;color:var(--text);font-size:1.15rem;">Article “' + S.esc(id || 'unknown') + '” is unavailable.</p>' +
      '<p style="margin-top:0.5rem;">It may have been unpublished or the link is mistyped.</p>' +
      '<a class="btn btn-primary" style="margin-top:1.25rem;" href="' + S.link('public/pages/blog.html') + '">' +
      '<i class="bi bi-newspaper"></i>Browse the blog</a>' +
      '</div></div></section>' +
      '<section class="section-sm section-alt"><div class="container-x"><div class="card text-center"><span class="icon-box lg mx-auto"><i class="bi bi-search"></i></span><h3 class="mt-3">Find similar articles</h3><p class="mt-1 text-sm" style="color:var(--text-muted);">Use our search to discover helpful donation guides.</p><a href="' + S.link('public/pages/blog.html') + '" class="btn btn-outline mt-4 mx-auto"><i class="bi bi-arrow-right"></i>Search articles</a></div></div></section>' +
      '<section class="section-sm"><div class="container-x"><div class="grid gap-4 sm:grid-cols-3"><div class="card"><span class="icon-box"><i class="bi bi-lightbulb"></i></span><h4 class="mt-3">Tips</h4><p class="mt-1 text-sm" style="color:var(--text-muted);">Practical advice for first-time and returning donors.</p></div><div class="card"><span class="icon-box"><i class="bi bi-book"></i></span><h4 class="mt-3">Guides</h4><p class="mt-1 text-sm" style="color:var(--text-muted);">Physician-reviewed articles to answer your questions.</p></div><div class="card"><span class="icon-box"><i class="bi bi-people"></i></span><h4 class="mt-3">Organisers</h4><p class="mt-1 text-sm" style="color:var(--text-muted);">Resources to plan a successful blood camp.</p></div></div></div></section>' +
      '<section class="section-sm section-alt"><div class="container-x"><div class="relative overflow-hidden rounded-[30px] text-center" style="padding:3rem 1.5rem;background:linear-gradient(135deg,rgba(255,46,76,0.2),rgba(255,138,61,0.1)),var(--bg-2);border:1px solid rgba(255,46,76,0.4);box-shadow:var(--glow-lg);"><span class="kicker"><i class="bi bi-headset"></i>Need help</span><h2 class="section-title mt-4" style="margin-inline:auto;">Still can’t find what you’re looking for?</h2><p class="section-sub" style="margin-inline:auto;">Reach out to our team and we’ll point you in the right direction.</p><div class="mt-7 flex flex-wrap justify-center gap-3"><a class="btn btn-primary btn-lg" href="' + S.link('public/pages/contact.html') + '"><i class="bi bi-envelope-open"></i>Contact us</a><a class="btn btn-outline btn-lg" href="' + S.link('public/pages/blog.html') + '"><i class="bi bi-newspaper"></i>Browse blog</a></div></div></div></section>' +
      '<section class="section-sm"><div class="container-x"><div class="card flex flex-wrap items-center justify-between gap-4"><div class="flex items-center gap-4"><span class="icon-box lg"><i class="bi bi-droplet-half"></i></span><div><h3>Ready to save lives</h3><p class="text-sm mt-1" style="color:var(--text-muted);">Find your nearest camp or book one today.</p></div></div><div class="flex flex-wrap gap-3"><a href="' + S.link('public/pages/home-2.html') + '" class="btn btn-primary"><i class="bi bi-lightning-charge-fill"></i>Find a camp</a><a href="' + S.link('public/pages/contact.html') + '" class="btn btn-outline"><i class="bi bi-calendar-check"></i>Book a camp</a></div></div></div></section>';
  }

  function buildToc(bodyHtml) {
    var holder = document.createElement('div');
    holder.innerHTML = bodyHtml;
    var heads = Array.prototype.slice.call(holder.querySelectorAll('h2[id]'));
    if (!heads.length) return '<span class="toc-link" style="border-color:transparent;">No sections</span>';
    return heads.map(function (h) {
      return '<a class="toc-link" href="#' + h.id + '">' + h.textContent + '</a>';
    }).join('');
  }

  function shareRow(post) {
    var url = encodeURIComponent(location.href);
    var text = encodeURIComponent(post.title + ' — VenaCare Blood Camp');
    return [
      '<a class="social-btn" target="_blank" rel="noopener" aria-label="Share on Facebook" href="https://www.facebook.com/sharer/sharer.php?u=' + url + '"><i class="bi bi-facebook"></i></a>',
      '<a class="social-btn" target="_blank" rel="noopener" aria-label="Share on X" href="https://twitter.com/intent/tweet?url=' + url + '&text=' + text + '"><i class="bi bi-x-twitter"></i></a>',
      '<a class="social-btn" target="_blank" rel="noopener" aria-label="Share on LinkedIn" href="https://www.linkedin.com/sharing/share-offsite/?url=' + url + '"><i class="bi bi-linkedin"></i></a>',
      '<a class="social-btn" aria-label="Copy link" href="#" data-copy-link><i class="bi bi-link-45deg"></i></a>'
    ].join('');
  }

  function render() {
    var id = (S.params().id || '').trim();
    var post = id ? window.DATA.getPost(id) : null;

    if (!post) {
      notFound(id);
      if (id) S.toast('Article not found', 'Check the link or browse the full blog.', 'error');
      return;
    }

    document.title = post.title + ' | VenaCare Blood Camp';

    var idx = window.DATA.posts.indexOf(post);
    var prev = window.DATA.posts[idx - 1] || null;
    var next = window.DATA.posts[idx + 1] || null;

    C.fill('#bd-breadcrumb', C.breadcrumb([
      { label: 'Blog', href: 'public/pages/blog.html' },
      { label: post.category, href: 'public/pages/blog.html?category=' + encodeURIComponent(post.category) },
      { label: post.title, href: '#' }
    ]));
    C.fill('#bd-category', S.esc(post.category));
    C.fill('#bd-title', S.esc(post.title));
    C.fill('#bd-excerpt', S.esc(post.excerpt));
    C.fill('#bd-meta',
      '<div style="display:flex;flex-wrap:wrap;gap:1.25rem;justify-content:center;align-items:center;font-size:0.88rem;color:var(--text-muted);">' +
        '<span style="display:inline-flex;align-items:center;gap:0.5rem;">' +
          '<img src="' + S.link(post.authorImg) + '" alt="" style="width:34px;height:34px;border-radius:50%;" />' +
          '<strong>' + S.esc(post.author) + '</strong></span>' +
        '<span><i class="bi bi-person-badge" style="color:var(--primary);"></i> ' + S.esc(post.authorRole) + '</span>' +
        '<span><i class="bi bi-calendar3" style="color:var(--primary);"></i> ' + S.formatDate(post.date) + '</span>' +
        '<span><i class="bi bi-clock" style="color:var(--primary);"></i> ' + S.esc(post.readTime) + '</span>' +
      '</div>');
    C.fill('#bd-cover', '<img src="' + S.link(post.image) + '" alt="' + S.esc(post.title) + '" style="width:100%;border-radius:var(--radius-xl);border:1px solid var(--border);box-shadow:var(--glow-lg);" />');

    C.fill('#bd-body', post.body);
    C.fill('#bd-toc', buildToc(post.body));

    C.fill('#bd-takeaways',
      '<div class="card" style="border-color:rgba(255,46,76,0.4);box-shadow:var(--glow-sm);">' +
        '<span class="kicker"><i class="bi bi-lightbulb-fill"></i>Key takeaways</span>' +
        '<ul style="display:grid;gap:0.6rem;margin-top:1rem;">' +
          post.takeaways.map(function (t) {
            return '<li style="display:flex;gap:0.6rem;font-size:0.9rem;color:var(--text-muted);">' +
              '<i class="bi bi-check-circle-fill" style="color:var(--primary);margin-top:0.15rem;"></i>' +
              '<span>' + S.esc(t) + '</span></li>';
          }).join('') +
        '</ul>' +
      '</div>');

    C.fill('#bd-tags',
      post.tags.map(function (t) {
        return '<a class="chip" href="' + S.link('public/pages/blog.html?q=' + encodeURIComponent(t)) + '">#' + S.esc(t) + '</a>';
      }).join(''));

    C.fill('#bd-share', shareRow(post));

    C.fill('#bd-author',
      '<div class="card" style="display:flex;gap:1.15rem;align-items:flex-start;flex-wrap:wrap;">' +
        '<img src="' + S.link(post.authorImg) + '" alt="' + S.esc(post.author) + '" style="width:82px;height:82px;border-radius:50%;border:2px solid rgba(255,46,76,0.5);box-shadow:var(--glow-sm);" />' +
        '<div style="flex:1;min-width:14rem;">' +
          '<span class="badge">Written by</span>' +
          '<h3 style="margin-top:0.6rem;font-size:1.15rem;">' + S.esc(post.author) + '</h3>' +
          '<p style="font-size:0.85rem;color:var(--primary);font-weight:600;margin-bottom:0.5rem;">' + S.esc(post.authorRole) + '</p>' +
          '<p style="font-size:0.92rem;color:var(--text-muted);">Medical and operations staff at VenaCare publish practical, reviewed guidance for donors, organisers and partner hospitals.</p>' +
        '</div>' +
        '<a class="btn btn-outline btn-sm" href="' + S.link('public/pages/contact.html') + '"><i class="bi bi-envelope"></i>Ask a question</a>' +
      '</div>');

    C.fill('#bd-related',
      (post.related || []).map(function (rid) {
        var rel = window.DATA.getPost(rid);
        return rel ? C.postCard(rel) : '';
      }).join(''));

    var nav = S.qs('#bd-prevnext');
    if (nav) {
      nav.innerHTML =
        (prev
          ? '<a class="card card-hover" style="flex:1;min-width:12rem;" href="' + S.link('public/pages/blog-details.html?id=' + prev.id) + '">' +
            '<span class="post-meta"><i class="bi bi-arrow-left"></i>Previous</span>' +
            '<strong style="display:block;margin-top:0.5rem;">' + S.esc(prev.title) + '</strong></a>'
          : '<span></span>') +
        (next
          ? '<a class="card card-hover" style="flex:1;min-width:12rem;text-align:end;" href="' + S.link('public/pages/blog-details.html?id=' + next.id) + '">' +
            '<span class="post-meta" style="justify-content:flex-end;">Next<i class="bi bi-arrow-right"></i></span>' +
            '<strong style="display:block;margin-top:0.5rem;">' + S.esc(next.title) + '</strong></a>'
          : '<span></span>');
    }

    var copyBtn = S.qs('[data-copy-link]');
    if (copyBtn) {
      copyBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(location.href).then(function () {
            S.toast('Link copied', 'Share it with anyone who needs this article.');
          });
        } else {
          S.toast('Copy this link', location.href);
        }
      });
    }

    /* active TOC highlighting while reading */
    var links = S.qsa('.toc-link[href^="#"]');
    if (links.length && 'IntersectionObserver' in window) {
      var map = {};
      links.forEach(function (l) { map[l.getAttribute('href').slice(1)] = l; });
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            links.forEach(function (l) { l.classList.remove('active'); });
            if (map[en.target.id]) map[en.target.id].classList.add('active');
          }
        });
      }, { rootMargin: '-80px 0px -70% 0px' });
      Object.keys(map).forEach(function (key) {
        var target = document.getElementById(key);
        if (target) obs.observe(target);
      });
    }
  }

  S.onLoad(render);
})();
