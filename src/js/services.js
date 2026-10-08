/* ==========================================================================
   VENACARE — SERVICES & BLOOD TESTS LISTING
   Renders routine and specialized blood test cards into [data-services-grid],
   supports category filters and real-time biomarker search.
   ========================================================================== */

(function () {
  'use strict';

  var S = window.SITE;
  var C = window.UI;

  var currentCategory = 'all';
  var currentSearch = '';

  function filterList() {
    var list = window.DATA.services.slice();

    if (currentCategory && currentCategory !== 'all') {
      list = list.filter(function (s) {
        return s.category.toLowerCase() === currentCategory.toLowerCase() || s.id === currentCategory;
      });
    }

    if (currentSearch) {
      var q = currentSearch.toLowerCase();
      list = list.filter(function (s) {
        var matchTitle = s.title.toLowerCase().indexOf(q) !== -1;
        var matchExcerpt = s.excerpt.toLowerCase().indexOf(q) !== -1;
        var matchKicker = (s.kicker || '').toLowerCase().indexOf(q) !== -1;
        var matchBullets = (s.bullets || []).some(function (b) { return b.toLowerCase().indexOf(q) !== -1; });
        return matchTitle || matchExcerpt || matchKicker || matchBullets;
      });
    }

    return list;
  }

  function renderGrid(grid) {
    var list = filterList();

    if (!list.length) {
      grid.innerHTML =
        '<div class="col-span-full card text-center p-12" style="border-color:var(--border);">' +
          '<span class="icon-box lg mb-3" style="margin-inline:auto;"><i class="bi bi-search"></i></span>' +
          '<h3 class="text-lg font-bold">No blood tests match your search</h3>' +
          '<p class="text-sm mt-1" style="color:var(--text-muted);">Try searching for terms like "CBC", "Lipid", "Thyroid", "Glucose", or "Hormone".</p>' +
          '<button class="btn btn-outline btn-sm mt-4" type="button" data-reset-filter><i class="bi bi-arrow-repeat"></i>Reset Filters</button>' +
        '</div>';

      var resetBtn = grid.querySelector('[data-reset-filter]');
      if (resetBtn) {
        resetBtn.addEventListener('click', function () {
          currentCategory = 'all';
          currentSearch = '';
          var input = S.qs('[data-service-search]');
          if (input) input.value = '';
          var chips = S.qsa('[data-service-filter]');
          chips.forEach(function (c) {
            c.classList.toggle('active', c.getAttribute('data-service-filter') === 'all');
          });
          renderAll();
        });
      }
      return;
    }

    grid.innerHTML = list.map(function (s) { return C.serviceCard(s); }).join('');

    var countNode = S.qs('[data-service-count]');
    if (countNode) {
      countNode.textContent = list.length + (list.length === 1 ? ' test' : ' tests');
    }
  }

  function renderAll() {
    S.qsa('[data-services-grid]').forEach(renderGrid);
  }

  function bindFilters() {
    var chips = S.qsa('[data-service-filter]');
    if (chips.length) {
      chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
          chips.forEach(function (c) { c.classList.remove('active'); });
          chip.classList.add('active');
          currentCategory = chip.getAttribute('data-service-filter');
          renderAll();
        });
      });
    }

    var searchInput = S.qs('[data-service-search]');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        currentSearch = searchInput.value.trim();
        renderAll();
      });
    }

    // Support URL query param ?category=... or ?id=...
    var params = S.params();
    if (params.category) {
      currentCategory = params.category;
      chips.forEach(function (c) {
        c.classList.toggle('active', c.getAttribute('data-service-filter').toLowerCase() === currentCategory.toLowerCase());
      });
    }
  }

  S.onLoad(function () {
    renderAll();
    bindFilters();
  });
})();
