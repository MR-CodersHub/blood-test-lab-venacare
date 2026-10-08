/* ==========================================================================
   VENACARE — CORE RUNTIME (paths, theme, RTL, toasts, helpers)
   Exposes window.SITE used by every other module.
   ========================================================================== */

window.SITE = (function () {
  'use strict';

  var body = document.body;
  var root = body && body.dataset.root ? body.dataset.root : '';

  function link(path) {
    return root + path;
  }

  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function el(tag, attrs, html) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'class') node.className = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ---------- THEME (dark / light, system aware) ---------- */
  var THEME_KEY = 'venacare-theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    // update all theme toggles that exist now (or will exist)
    qsa('[data-theme-toggle]').forEach(function (btn) {
      var icon = qs('i', btn);
      if (icon) icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) { saved = null; }
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = saved || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);

    function bindButtons() {
      qsa('[data-theme-toggle]').forEach(function (btn) {
        // avoid double-binding
        if (btn.dataset.themeBound === '1') return;
        btn.dataset.themeBound = '1';
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          var current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
          var next = current === 'dark' ? 'light' : 'dark';
          applyTheme(next);
          try { localStorage.setItem(THEME_KEY, next); } catch (e2) {}
          if (typeof toast === 'function') {
            toast(next === 'dark' ? 'Dark mode enabled' : 'Light mode enabled', 'Theme updated across your session.');
          }
        });
      });
    }

    bindButtons();
    // re-bind when navbar/footer inject buttons later
    document.addEventListener('DOMContentLoaded', bindButtons);
    // also listen for dynamic insertion
    var observer = new MutationObserver(bindButtons);
    observer.observe(document.body, { childList: true, subtree: true });

    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        var stored = null;
        try { stored = localStorage.getItem(THEME_KEY); } catch (err) {}
        if (!stored) applyTheme(e.matches ? 'dark' : 'light');
      });
    }
  }

  /* ---------- RTL TOGGLE ---------- */
  var RTL_KEY = 'venacare-rtl';

  function applyDir(dir) {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', 'en');
    qsa('[data-rtl-toggle]').forEach(function (btn) {
      var icon = qs('i', btn);
      if (icon) icon.className = dir === 'rtl' ? 'bi bi-text-left' : 'bi bi-text-right';
      btn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to LTR layout' : 'Switch to RTL layout');
    });
  }

  function initDir() {
    var saved = null;
    try { saved = localStorage.getItem(RTL_KEY); } catch (e) { saved = null; }
    var dir = saved || 'ltr';
    applyDir(dir);

    qsa('[data-rtl-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
        var next = current === 'rtl' ? 'ltr' : 'rtl';
        applyDir(next);
        try { localStorage.setItem(RTL_KEY, next); } catch (e) {}
        toast(next === 'rtl' ? 'RTL layout enabled' : 'LTR layout enabled', 'Layout direction switched.');
      });
    });
  }

  /* ---------- TOASTS / ACKNOWLEDGEMENT MESSAGES ---------- */
  var toastHost = null;

  function ensureToastHost() {
    if (!toastHost || !document.body.contains(toastHost)) {
      toastHost = qs('.toast-host');
      if (!toastHost) {
        toastHost = el('div', { class: 'toast-host', 'aria-live': 'polite' });
        document.body.appendChild(toastHost);
      }
    }
    return toastHost;
  }

  function toast(title, sub, type) {
    var host = ensureToastHost();
    var node = el('div', { class: 'toast' + (type === 'error' ? ' error' : ''), role: 'status' });
    node.innerHTML =
      '<i class="bi ' + (type === 'error' ? 'bi-exclamation-octagon-fill' : 'bi-check-circle-fill') + '"></i>' +
      '<div class="toast-body">' + esc(title) +
      (sub ? '<span class="toast-sub">' + esc(sub) + '</span>' : '') +
      '</div>' +
      '<button class="toast-close" type="button" aria-label="Dismiss"><i class="bi bi-x-lg"></i></button>';
    host.appendChild(node);

    var remove = function () {
      node.classList.add('hide');
      setTimeout(function () { if (node.parentNode) node.parentNode.removeChild(node); }, 320);
    };
    qs('.toast-close', node).addEventListener('click', remove);
    setTimeout(remove, 4600);
    return node;
  }

  /* ---------- SCROLL EFFECTS ---------- */
  function initScroll() {
    var onScroll = function () {
      var y = window.scrollY || window.pageYOffset;
      qsa('.site-nav').forEach(function (nav) {
        nav.classList.toggle('scrolled', y > 24);
      });
      var toTop = qs('[data-to-top]');
      if (toTop) toTop.style.opacity = y > 600 ? '1' : '0';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    var toTop = qs('[data-to-top]');
    if (toTop) {
      toTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* ---------- ACTIVE NAV LINK ---------- */
  function initActiveLinks() {
    var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (!here) here = 'index.html';
    qsa('[data-nav-link]').forEach(function (a) {
      var href = (a.getAttribute('href') || '').split('/').pop().toLowerCase();
      if (href && href === here) a.classList.add('active');
    });
  }

  /* ---------- MISC HELPERS ---------- */
  function params() {
    var out = {};
    var search = location.search.replace(/^\?/, '');
    if (!search) return out;
    search.split('&').forEach(function (pair) {
      if (!pair) return;
      var bits = pair.split('=');
      out[decodeURIComponent(bits[0])] = decodeURIComponent((bits[1] || '').replace(/\+/g, ' '));
    });
    return out;
  }

  function formatDate(value) {
    var d = value instanceof Date ? value : new Date(value);
    if (isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function onLoad(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function boot() {
    initTheme();
    initDir();
    initScroll();
    initActiveLinks();
  }

  onLoad(boot);

  return {
    root: root,
    link: link,
    qs: qs,
    qsa: qsa,
    el: el,
    esc: esc,
    toast: toast,
    params: params,
    formatDate: formatDate,
    onLoad: onLoad
  };
})();
