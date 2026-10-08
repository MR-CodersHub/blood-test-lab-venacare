/* ==========================================================================
   VENACARE — SHARED UI BEHAVIOUR
   Accordions (FAQ / service FAQs) · animated counters · countdown timer ·
   pricing billing toggle · FAQ search & group filters.
   ========================================================================== */

(function () {
  'use strict';

  var S = window.SITE;

  /* ------------------------------------------------------------ ACCORDION */
  function bindAccordion(root) {
    var scope = root || document;
    S.qsa('.accordion-btn', scope).forEach(function (btn) {
      if (btn.dataset.bound === '1') return;
      btn.dataset.bound = '1';
      btn.addEventListener('click', function () {
        var item = btn.closest('.accordion-item');
        if (!item) return;
        var panel = item.querySelector('.accordion-panel');
        var open = item.classList.contains('open');

        var container = item.parentElement;
        if (container && container.hasAttribute('data-accordion')) {
          S.qsa('.accordion-item.open', container).forEach(function (other) {
            if (other === item) return;
            other.classList.remove('open');
            var op = other.querySelector('.accordion-panel');
            if (op) op.style.maxHeight = '0px';
            var ob = other.querySelector('.accordion-btn');
            if (ob) ob.setAttribute('aria-expanded', 'false');
          });
        }

        item.classList.toggle('open', !open);
        btn.setAttribute('aria-expanded', String(!open));
        if (panel) panel.style.maxHeight = open ? '0px' : panel.scrollHeight + 'px';
      });
    });
  }
  window.UIBindAccordion = bindAccordion;

  /* ------------------------------------------------------------ COUNTERS */
  function bindCounters() {
    var nodes = S.qsa('[data-count]');
    if (!nodes.length) return;

    var animate = function (node) {
      if (node.dataset.done === '1') return;
      node.dataset.done = '1';
      var target = parseFloat(node.getAttribute('data-count')) || 0;
      var decimals = (String(target).split('.')[1] || '').length;
      var suffix = node.getAttribute('data-suffix') || '';
      var prefix = node.getAttribute('data-prefix') || '';
      var start = performance.now();
      var dur = 1500;

      var tick = function (now) {
        var p = Math.min(1, (now - start) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = target * eased;
        node.textContent = prefix + val.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { animate(en.target); obs.unobserve(en.target); }
        });
      }, { threshold: 0.4 });
      nodes.forEach(function (n) { obs.observe(n); });
    } else {
      nodes.forEach(animate);
    }
  }

  /* ----------------------------------------------------------- COUNTDOWN */
  function bindCountdown() {
    var box = S.qs('[data-countdown]');
    if (!box) return;
    var target = box.getAttribute('data-countdown');
    var end = target ? new Date(target).getTime() : Date.now() + 1000 * 60 * 60 * 24 * 42;
    if (isNaN(end)) end = Date.now() + 1000 * 60 * 60 * 24 * 42;

    var cells = {
      days: box.querySelector('[data-cd="days"]'),
      hours: box.querySelector('[data-cd="hours"]'),
      minutes: box.querySelector('[data-cd="minutes"]'),
      seconds: box.querySelector('[data-cd="seconds"]')
    };

    var pad = function (n) { return n < 10 ? '0' + n : String(n); };

    var tick = function () {
      var diff = Math.max(0, end - Date.now());
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      if (cells.days) cells.days.textContent = pad(d);
      if (cells.hours) cells.hours.textContent = pad(h);
      if (cells.minutes) cells.minutes.textContent = pad(m);
      if (cells.seconds) cells.seconds.textContent = pad(s);
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ------------------------------------------------------- BILLING TOGGLE */
  function bindBilling() {
    var btns = S.qsa('[data-billing]');
    if (!btns.length) return;

    var apply = function (period) {
      btns.forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-billing') === period);
      });
      S.qsa('[data-price-monthly]').forEach(function (node) {
        var val = period === 'yearly'
          ? node.getAttribute('data-price-yearly')
          : node.getAttribute('data-price-monthly');
        node.textContent = val;
      });
      S.qsa('[data-per-label]').forEach(function (node) {
        node.textContent = period === 'yearly' ? '/ year' : '/ month';
      });
      S.toast(
        period === 'yearly' ? 'Annual billing selected' : 'Monthly billing selected',
        period === 'yearly' ? 'Two months free on every paid plan.' : 'Cancel or switch any time.'
      );
    };

    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        apply(b.getAttribute('data-billing'));
      });
    });
  }

  /* ---------------------------------------------------------- FAQ SEARCH */
  function bindFaqFilters() {
    var search = S.qs('#faq-search');
    var items = S.qsa('[data-faq-item]');
    var chips = S.qsa('[data-faq-group]');
    if (!items.length && !search) return;

    var state = { query: '', group: 'all' };

    var apply = function () {
      var q = state.query.trim().toLowerCase();
      var visible = 0;
      items.forEach(function (item) {
        var text = (item.getAttribute('data-faq-text') || item.textContent).toLowerCase();
        var group = item.getAttribute('data-faq-item') || 'all';
        var okQ = !q || text.indexOf(q) !== -1;
        var okG = state.group === 'all' || group === state.group;
        var show = okQ && okG;
        item.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      var count = S.qs('#faq-count');
      if (count) count.textContent = visible + (visible === 1 ? ' answer' : ' answers');
      var empty = S.qs('#faq-empty');
      if (empty) empty.style.display = visible ? 'none' : 'block';
    };

    if (search) {
      var t = null;
      search.addEventListener('input', function () {
        clearTimeout(t);
        t = setTimeout(function () { state.query = search.value; apply(); }, 150);
      });
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        state.group = chip.getAttribute('data-faq-group');
        apply();
      });
    });

    apply();
  }

  /* ------------------------------------------------------------- BOOTSTRAP */
  S.onLoad(function () {
    bindAccordion(document);
    bindCounters();
    bindCountdown();
    bindBilling();
    bindFaqFilters();
  });
})();
