/* ==========================================================================
   VENACARE — BLOG LISTING
   Client-side search · category filter · live result count · load more.
   Targets on blog.html: #blog-grid, #blog-search, [data-blog-filter],
   #blog-count, #blog-load-more, [data-blog-categories]
   ========================================================================== */

(function () {
  'use strict';

  var S = window.SITE;
  var C = window.UI;

  var state = { query: '', category: 'all', shown: 6 };
  var STEP = 6;

  /* honour ?q= and ?category= deep links (blog.html?q=iron, 404 search, tags) */
  (function readParams() {
    var p = S.params();
    if (p.q) state.query = p.q;
    if (p.category) state.category = p.category;
  })();

  function filtered() {
    var q = state.query.trim().toLowerCase();
    return window.DATA.posts.filter(function (p) {
      var catOk = state.category === 'all' || p.category === state.category;
      if (!catOk) return false;
      if (!q) return true;
      var hay = (p.title + ' ' + p.excerpt + ' ' + p.category + ' ' + p.author + ' ' + p.tags.join(' ')).toLowerCase();
      return hay.indexOf(q) !== -1;
    });
  }

  function render() {
    var grid = S.qs('#blog-grid');
    if (!grid) return;

    var list = filtered();
    var visible = list.slice(0, state.shown);

    grid.innerHTML = list.length
      ? visible.map(function (p) { return C.postCard(p); }).join('')
      : C.emptyState('No articles found for “' + state.query + '”.', 'bi-journal-x');

    var count = S.qs('#blog-count');
    if (count) {
      count.textContent = list.length + (list.length === 1 ? ' article' : ' articles');
    }

    var more = S.qs('#blog-load-more');
    if (more) {
      more.style.display = list.length > state.shown ? 'inline-flex' : 'none';
      var remaining = Math.max(0, list.length - state.shown);
      more.innerHTML = '<i class="bi bi-arrow-down-circle"></i>Load more (' + remaining + ')';
    }
  }

  function bind() {
    var search = S.qs('#blog-search');
    if (search) {
      if (state.query) search.value = state.query;
      var timer = null;
      search.addEventListener('input', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          state.query = search.value;
          state.shown = STEP;
          render();
        }, 160);
      });
      search.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') e.preventDefault();
      });
    }

    var chips = S.qsa('[data-blog-filter]');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        state.category = chip.getAttribute('data-blog-filter');
        state.shown = STEP;
        render();
      });
      if (chip.classList.contains('chip')) {
        chip.classList.toggle('active', chip.getAttribute('data-blog-filter') === state.category);
      }
    });

    var catList = S.qs('[data-blog-categories]');
    if (catList) {
      var cats = window.DATA.categories();
      catList.innerHTML =
        '<a href="#" class="footer-link" data-blog-filter="all" style="justify-content:space-between;"><span>All articles</span>' +
        '<span class="badge plain">' + window.DATA.posts.length + '</span></a>' +
        cats.map(function (cat) {
          var n = window.DATA.posts.filter(function (p) { return p.category === cat; }).length;
          return '<a href="#" class="footer-link" data-blog-filter="' + S.esc(cat) + '" style="justify-content:space-between;">' +
            '<span>' + S.esc(cat) + '</span><span class="badge plain">' + n + '</span></a>';
        }).join('');

      S.qsa('[data-blog-filter]', catList).forEach(function (link) {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          var value = link.getAttribute('data-blog-filter');
          state.category = value;
          state.shown = STEP;
          S.qsa('[data-blog-filter]').forEach(function (c) {
            if (c.classList.contains('chip')) c.classList.toggle('active', c.getAttribute('data-blog-filter') === value);
          });
          render();
          var grid = S.qs('#blog-grid');
          if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    }

    var more = S.qs('#blog-load-more');
    if (more) {
      more.addEventListener('click', function () {
        state.shown += STEP;
        render();
      });
    }

    var clear = S.qs('#blog-clear');
    if (clear) {
      clear.addEventListener('click', function () {
        state = { query: '', category: 'all', shown: STEP };
        if (search) search.value = '';
        S.qsa('[data-blog-filter]').forEach(function (c) {
          if (c.classList.contains('chip')) c.classList.toggle('active', c.getAttribute('data-blog-filter') === 'all');
        });
        render();
        S.toast('Filters cleared', 'Showing every published article.');
      });
    }
  }

  S.onLoad(function () {
    bind();
    render();
  });
})();
