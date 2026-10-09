/* ==========================================================================
   VENACARE — HOME PAGE CONTROLLER
   Clinical layout controller: At-home sample collection booking widget,
   routine and specialized tests preview, clinical performance marquee,
   and patient testimonials.
   ========================================================================== */

(function () {
  'use strict';

  var S = window.SITE;
  var C = window.UI;

  /* --------------------------------------------------------------- SERVICES */
  function renderServices() {
    var grids = S.qsa('[data-home-services]');
    if (!grids.length) return;

    grids.forEach(function (grid) {
      var limit = parseInt(grid.getAttribute('data-limit') || '6', 10);
      var category = grid.getAttribute('data-category') || 'all';

      var list = window.DATA.services.slice();
      if (category && category !== 'all') {
        list = list.filter(function (s) {
          return s.category.toLowerCase() === category.toLowerCase();
        });
      }

      if (limit > 0) list = list.slice(0, limit);
      grid.innerHTML = list.map(function (s) { return C.serviceCard(s); }).join('');
    });
  }

  function bindServiceTabs() {
    var chips = S.qsa('[data-home-tab]');
    if (!chips.length) return;

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        var cat = chip.getAttribute('data-home-tab');

        var grids = S.qsa('[data-home-services]');
        grids.forEach(function (grid) {
          grid.setAttribute('data-category', cat);
          renderServices();
        });
      });
    });
  }

  /* -------------------------------------------- AT-HOME BOOKING WIDGET */
  function bindBookingWidget() {
    var form = S.qs('#home-booking-form');
    if (!form) return;

    // Populate test selector
    var testSelect = S.qs('#booking-test-select', form);
    if (testSelect && !testSelect.options.length) {
      var options = [
        '<option value="" disabled selected>Select Routine or Specialized Blood Test / Package</option>',
        '<optgroup label="Popular Preventive Packages">',
        '<option value="comprehensive-vitality">Comprehensive Metabolic &amp; Vitality Panel (52 Biomarkers) — $119 (Free Home Draw)</option>',
        '<option value="essential-wellness">Essential Routine Wellness Package (24 Biomarkers) — $49</option>',
        '<option value="executive-advanced">Executive Specialized Diagnostic Profile (78 Biomarkers) — $229 (Free Home Draw)</option>',
        '</optgroup>',
        '<optgroup label="Routine Blood Tests">',
        '<option value="cbc-panel">Complete Blood Count (CBC) with Differential — $24</option>',
        '<option value="cmp-metabolic">Comprehensive Metabolic Panel (CMP-14) — $34</option>',
        '<option value="lipid-profile">Complete Lipid &amp; Cholesterol Profile — $29</option>',
        '<option value="diabetes-hba1c">HbA1c &amp; Fasting Glucose Screen — $28</option>',
        '<option value="thyroid-panel">Thyroid Function Panel (TSH, Free T4/T3) — $39</option>',
        '<option value="renal-liver-panel">Renal &amp; Hepatic Function Panel — $36</option>',
        '</optgroup>',
        '<optgroup label="Specialized Blood Tests">',
        '<option value="cardiac-crp">Cardiac hs-CRP Vascular Inflammation — $42</option>',
        '<option value="hormone-endocrine">Comprehensive Hormone Profile (Male/Female) — $79</option>',
        '<option value="vitamin-deficiency">Vitamin D &amp; Micronutrient Deficiency Panel — $69</option>',
        '<option value="allergy-ige">Food &amp; Environmental Allergy IgE Screen — $95</option>',
        '<option value="autoimmune-ana">Autoimmune Screen &amp; ANA with Reflex — $85</option>',
        '<option value="oncology-markers">Clinical Tumor Biomarkers Screen — $110</option>',
        '</optgroup>'
      ];
      testSelect.innerHTML = options.join('');
    }

    // Set default date to tomorrow
    var dateInput = S.qs('#booking-date', form);
    if (dateInput && !dateInput.value) {
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.value = tomorrow.toISOString().split('T')[0];
      dateInput.min = tomorrow.toISOString().split('T')[0];
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var testVal = testSelect ? testSelect.value : '';
      var dateVal = dateInput ? dateInput.value : '';
      var slotVal = (S.qs('#booking-slot', form) || {}).value || '8:00 AM – 9:00 AM';
      var nameVal = (S.qs('#booking-name', form) || {}).value || 'Patient';
      var phoneVal = (S.qs('#booking-phone', form) || {}).value || '';
      var addrVal = (S.qs('#booking-address', form) || {}).value || '';

      if (!testVal) {
        S.toast('Please select a test', 'Choose a routine or specialized blood test to proceed.', 'error');
        if (testSelect) testSelect.focus();
        return;
      }
      if (!addrVal.trim()) {
        S.toast('Address required', 'Please enter your home or office collection address.', 'error');
        var addrInput = S.qs('#booking-address', form);
        if (addrInput) addrInput.focus();
        return;
      }

      var btn = form.querySelector('[type="submit"]');
      var original = btn ? btn.innerHTML : '';
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="bi bi-arrow-repeat" style="animation:spin 0.9s linear infinite;"></i>Securing Phlebotomist Slot…';
      }

      setTimeout(function () {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = original;
        }

        var resultBox = S.qs('#booking-confirmation');
        if (resultBox) {
          var apptId = 'APT-' + Math.floor(1000 + Math.random() * 9000);
          resultBox.innerHTML =
            '<div class="card glass text-center" style="padding:2.5rem 1.5rem;border-color:rgba(18,185,129,0.45);box-shadow:var(--glow-md);">' +
              '<span class="icon-box lg" style="margin:0 auto 1.25rem;background:rgba(18,185,129,0.15);color:var(--success);"><i class="bi bi-check2-circle" style="font-size:2rem;"></i></span>' +
              '<span class="badge green mb-3"><i class="bi bi-shield-check"></i>At-Home Collection Confirmed</span>' +
              '<h3 class="text-2xl font-bold mt-2">Appointment Scheduled: ' + S.esc(apptId) + '</h3>' +
              '<p class="mt-2 text-sm" style="color:var(--text-muted);max-width:32rem;margin-inline:auto;">' +
                'A certified phlebotomist has been dispatched for <strong>' + S.esc(dateVal) + '</strong> during the <strong>' + S.esc(slotVal) + '</strong> window at <strong>' + S.esc(addrVal) + '</strong>.' +
              '</p>' +
              '<div class="card card-soft text-start mt-6 p-4" style="max-width:30rem;margin-inline:auto;font-size:0.88rem;">' +
                '<div class="flex items-center justify-between py-1 border-b border-white/10">' +
                  '<span style="color:var(--text-faint);">Selected Test:</span>' +
                  '<strong style="color:var(--text);">' + S.esc(testSelect.options[testSelect.selectedIndex].text.split('—')[0].trim()) + '</strong>' +
                '</div>' +
                '<div class="flex items-center justify-between py-1 border-b border-white/10">' +
                  '<span style="color:var(--text-faint);">Patient:</span>' +
                  '<strong style="color:var(--text);">' + S.esc(nameVal) + '</strong>' +
                '</div>' +
                '<div class="flex items-center justify-between py-1 border-b border-white/10">' +
                  '<span style="color:var(--text-faint);">Fasting Status:</span>' +
                  '<span class="badge amber"><i class="bi bi-droplet"></i>Water only 10 hrs prior</span>' +
                '</div>' +
                '<div class="flex items-center justify-between py-1">' +
                  '<span style="color:var(--text-faint);">Phlebotomist:</span>' +
                  '<strong style="color:var(--text);">Sarah Jenkins, CPT-1 (Assigned)</strong>' +
                '</div>' +
              '</div>' +
              '<div class="mt-6 flex flex-wrap justify-center gap-3">' +
                '<a class="btn btn-primary" href="' + S.link('public/auth/user/user-dashboard.html') + '">' +
                  '<i class="bi bi-speedometer2"></i>View in Patient Portal</a>' +
                '<a class="btn btn-outline" href="' + S.link('public/pages/services.html') + '">' +
                  '<i class="bi bi-clipboard2-pulse"></i>Browse More Tests</a>' +
              '</div>' +
            '</div>';
          resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        S.toast('At-Home Collection Booked!', 'Appointment ' + apptId + ' confirmed. A phlebotomist will arrive during your window.');
      }, 950);
    });
  }

  /* ---------------------------------------------------- CLINICAL MARQUEE */
  function renderMarquee() {
    S.qsa('[data-marquee]').forEach(function (host) {
      var items = [
        ['150,000+', 'Home collections completed'],
        ['24–48 hrs', 'Average lab turnaround'],
        ['100%', 'Certified phlebotomists (CPT-1)'],
        ['99.8%', 'Cold-chain specimen integrity'],
        ['CAP & CLIA', 'Accredited partner laboratories'],
        ['HIPAA', 'Encrypted patient portal']
      ];
      var row = items.map(function (it) {
        return '<span style="display:inline-flex;align-items:baseline;gap:0.5rem;font-family:var(--font-display);padding-inline:1.5rem;">' +
          '<strong style="font-size:1.45rem;color:var(--primary);">' + it[0] + '</strong>' +
          '<span style="font-size:0.86rem;color:var(--text-muted);">' + it[1] + '</span></span>';
      }).join('<span style="color:var(--primary);opacity:0.4;">✦</span>');

      host.innerHTML = '<div class="marquee-track">' + row + '<span style="color:var(--primary);opacity:0.4;">✦</span>' + row + '</div>';
    });
  }

  /* ----------------------------------------------------------- ARTICLES & TESTIMONIALS */
  function renderPosts() {
    S.qsa('[data-home-posts]').forEach(function (grid) {
      var limit = parseInt(grid.getAttribute('data-limit') || '3', 10);
      grid.innerHTML = window.DATA.posts.slice(0, limit).map(C.postCard).join('');
    });
  }

  function renderTestimonials() {
    S.qsa('[data-home-testimonials]').forEach(function (grid) {
      grid.innerHTML = window.DATA.testimonials.map(C.testimonialCard).join('');
    });
  }

  function renderTeam() {
    S.qsa('[data-home-team]').forEach(function (grid) {
      if (!window.DATA || !window.DATA.team) return;
      if (C && typeof C.teamCard === 'function') {
        grid.innerHTML = window.DATA.team.map(C.teamCard).join('');
      } else {
        grid.innerHTML = window.DATA.team.map(function (m) {
          return '<div class="card card-hover flex flex-col items-center text-center">' +
            '<div style="position:relative;width:96px;height:96px;margin:0 auto 1.15rem;">' +
              '<img src="' + S.link(m.img) + '" alt="' + S.esc(m.name) + '" style="width:100%;height:100%;border-radius:50%;border:2px solid rgba(255,46,76,0.45);box-shadow:var(--glow-sm);object-fit:cover;" loading="lazy" />' +
            '</div>' +
            '<h3 style="font-size:1.12rem;font-weight:700;margin-bottom:0.3rem;">' + S.esc(m.name) + '</h3>' +
            '<p style="font-size:0.78rem;color:var(--primary);font-weight:700;letter-spacing:0.04em;text-transform:uppercase;margin-bottom:0.75rem;">' + S.esc(m.role) + '</p>' +
            '<p style="font-size:0.88rem;color:var(--text-muted);line-height:1.55;margin-bottom:1.25rem;flex:1;">' + S.esc(m.bio) + '</p>' +
          '</div>';
        }).join('');
      }
    });
  }

  S.onLoad(function () {
    renderServices();
    bindServiceTabs();
    bindBookingWidget();
    renderMarquee();
    renderPosts();
    renderTestimonials();
    renderTeam();
  });
})();
