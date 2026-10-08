/* ==========================================================================
   VENACARE — CLIENT-SIDE FORM VALIDATION
   Works on any <form data-form="..."> in the site: contact, newsletter,
   login, signup, comments. No backend — successful submits show an inline
   acknowledgement panel plus a toast message.
   Field rules are declared with data-required="text|email|phone|password|
   confirm|select|checked" on the input itself.
   ========================================================================== */

(function () {
  'use strict';

  var S = window.SITE;

  var MESSAGES = {
    text: 'Please complete this field.',
    email: 'Enter a valid email address.',
    phone: 'Enter a valid phone number (at least 7 digits).',
    password: 'Password must be at least 8 characters.',
    confirm: 'Passwords do not match.',
    select: 'Please choose an option.',
    checked: 'This box must be checked.',
    terms: 'Please accept the terms to continue.'
  };

  function fieldOf(input) {
    return input.closest('.field') || input.closest('.checkbox-row') || input.parentElement;
  }

  function value(input) {
    if (input.type === 'checkbox') return input.checked;
    return (input.value || '').trim();
  }

  function check(input) {
    var rule = input.getAttribute('data-required');
    if (!rule) return true;
    var v = value(input);
    var ok = true;

    switch (rule) {
      case 'text':
        ok = String(v).length >= (parseInt(input.getAttribute('minlength') || '2', 10));
        break;
      case 'email':
        ok = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(String(v));
        break;
      case 'phone':
        ok = String(v).replace(/[^\d]/g, '').length >= 7;
        break;
      case 'password':
        ok = String(v).length >= 8;
        break;
      case 'confirm': {
        var target = input.getAttribute('data-match');
        var other = target ? input.form && input.form.elements[target] : null;
        ok = !!other && String(v).length > 0 && value(other) === v;
        break;
      }
      case 'select':
        ok = String(v).length > 0;
        break;
      case 'checked':
        ok = input.checked;
        break;
      case 'terms':
        ok = input.checked;
        break;
      default:
        ok = String(v).length > 0;
    }
    return ok;
  }

  function mark(input, valid) {
    var field = fieldOf(input);
    if (!field) return;
    field.classList.toggle('invalid', !valid);
    input.setAttribute('aria-invalid', valid ? 'false' : 'true');
    var msg = field.querySelector('.error-msg');
    if (msg && !valid) {
      var rule = input.getAttribute('data-required');
      var custom = input.getAttribute('data-error');
      var text = custom || MESSAGES[rule] || MESSAGES.text;
      msg.innerHTML = '<i class="bi bi-exclamation-circle-fill"></i>' + S.esc(text);
    }
  }

  function validateForm(form) {
    var fields = S.qsa('[data-required]', form);
    var firstBad = null;
    fields.forEach(function (input) {
      var ok = check(input);
      mark(input, ok);
      if (!ok && !firstBad) firstBad = input;
    });
    if (firstBad) {
      firstBad.focus({ preventScroll: false });
      return false;
    }
    return true;
  }

  function showSuccess(form) {
    var panel = form.querySelector('[data-success]');
    if (panel) {
      panel.classList.add('show');
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    var kind = form.getAttribute('data-form');
    var copy = {
      contact: ['Message received', 'A coordinator will reply within one business hour.'],
      newsletter: ['Subscribed', 'Camp alerts are on the way to your inbox.'],
      login: ['Welcome back', 'Session started — redirecting you to your dashboard.'],
      signup: ['Account created', 'Check your inbox to verify your email address.'],
      comment: ['Comment submitted', 'It will appear after a quick moderation review.'],
      request: ['Request submitted', 'Our emergency desk has been notified.']
    }[kind] || ['Submitted', 'Thank you — your details were received.'];
    S.toast(copy[0], copy[1]);
  }

  function bindForm(form) {
    var attempted = false;

    S.qsa('[data-required]', form).forEach(function (input) {
      var evt = input.type === 'checkbox' || input.tagName === 'SELECT' ? 'change' : 'blur';
      input.addEventListener(evt, function () {
        if (attempted || value(input)) mark(input, check(input));
      });
      input.addEventListener('input', function () {
        if (attempted) mark(input, check(input));
        var panel = form.querySelector('[data-success]');
        if (panel) panel.classList.remove('show');
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      attempted = true;

      if (!validateForm(form)) {
        S.toast('Check the highlighted fields', 'A few details still need your attention.', 'error');
        return;
      }

      var btn = form.querySelector('[type="submit"]');
      var original = btn ? btn.innerHTML : '';
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="bi bi-arrow-repeat" style="animation:spin 0.9s linear infinite;"></i>Please wait…';
      }

      setTimeout(function () {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = original;
        }
        showSuccess(form);
        form.reset();
        attempted = false;
        S.qsa('.field.invalid', form).forEach(function (f) { f.classList.remove('invalid'); });

        var kind = form.getAttribute('data-form');
        if (kind === 'login') {
          setTimeout(function () {
            window.location.href = S.link('public/auth/user/user-dashboard.html');
          }, 1400);
        }
        if (kind === 'signup') {
          setTimeout(function () {
            window.location.href = S.link('public/auth/user/user-dashboard.html');
          }, 1800);
        }
      }, 850);
    });
  }

  /* password visibility toggles */
  function bindPasswordToggles() {
    S.qsa('[data-toggle-password]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var input = document.getElementById(btn.getAttribute('data-toggle-password'));
        if (!input) return;
        var show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        var icon = btn.querySelector('i');
        if (icon) icon.className = show ? 'bi bi-eye-slash' : 'bi bi-eye';
      });
    });
  }

  /* pre-fill contact subject from ?subject= */
  function prefillContact() {
    var form = S.qs('form[data-form="contact"]');
    if (!form) return;
    var params = S.params();
    var subject = params.subject;
    if (subject) {
      var select = form.elements.subject || form.querySelector('[name="subject"]');
      if (select) {
        var mapped = subject.indexOf('camp:') === 0 ? 'camp'
          : subject.indexOf('emergency') !== -1 ? 'emergency'
          : subject.indexOf('billing') !== -1 ? 'billing'
          : 'general';
        var option = Array.prototype.filter.call(select.options || [], function (o) { return o.value === mapped; })[0];
        if (option) select.value = mapped;
      }
    }
    var message = form.elements.message || form.querySelector('[name="message"]');
    if (subject && message && !message.value) {
      var label = subject.split(':').pop().replace(/-/g, ' ');
      message.value = 'Hello VenaCare team,\n\nI would like to know more about "' + label + '".\n\nThanks!';
    }
  }

  S.onLoad(function () {
    S.qsa('form[data-form]').forEach(bindForm);
    bindPasswordToggles();
    prefillContact();
  });
})();
