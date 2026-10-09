/* ==========================================================================
   VENACARE — DASHBOARD MODULES
   Renders data widgets for admin-dashboard.html and user-dashboard.html (Patient Portal).
   The page type is declared on <body data-page="admin|user">.
   ========================================================================== */

(function () {
  'use strict';

  var S = window.SITE;
  var C = window.UI;

  /* ----------------------------------------------------------- SHARED CHROME */
  function bindSidebar() {
    var side = S.qs('.dash-side');
    var toggle = S.qs('[data-dash-toggle]');
    if (side && toggle) {
      toggle.addEventListener('click', function () {
        side.classList.toggle('open');
      });
      document.addEventListener('click', function (e) {
        if (side.classList.contains('open') && !side.contains(e.target) && !toggle.contains(e.target)) {
          side.classList.remove('open');
        }
      });
    }
    var today = S.formatDate(new Date());
    S.qsa('[data-today]').forEach(function (node) { node.textContent = today; });
  }

  function kpiCard(k) {
    return '<div class="kpi-card">' +
      '<span class="kpi-icon"><i class="bi ' + k.icon + '"></i></span>' +
      '<div class="kpi-value">' + S.esc(k.value) + '</div>' +
      '<div class="kpi-label">' + S.esc(k.label) + '</div>' +
      '<span class="kpi-trend ' + k.dir + '"><i class="bi bi-arrow-' + (k.dir === 'up' ? 'up-right' : 'check-circle') + '"></i>' +
        S.esc(k.trend) + '</span>' +
    '</div>';
  }

  /* ----------------------------------------------------------------- ADMIN */
  function renderAdmin() {
    var A = window.DATA.adminStats;

    C.fill('#admin-kpis', A.kpis.map(kpiCard).join(''));

    C.fill('#admin-trend',
      '<div class="bar-chart">' +
        A.trend.map(function (t) {
          return '<div class="bar-col" title="' + t.label + ': ' + t.value + '% capacity">' +
            '<div class="bar" style="height:' + t.value + '%;"></div>' +
            '<span class="bar-label">' + t.label + '</span></div>';
        }).join('') +
      '</div>' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:1rem;flex-wrap:wrap;gap:0.75rem;font-size:0.82rem;color:var(--text-faint);">' +
        '<span><span class="pulse-dot" style="display:inline-block;vertical-align:middle;margin-inline-end:0.4rem;"></span>At-home phlebotomy sample throughput index</span>' +
        '<span>Peak throughput: <strong style="color:var(--primary);">Accredited CAP/CLIA Labs</strong></span>' +
      '</div>');

    C.fill('#admin-stock',
      A.stock.map(function (s) {
        return '<div style="margin-bottom:1rem;">' +
          '<div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:0.4rem;">' +
            '<span style="font-weight:600;color:var(--text);">' + s.group + '</span>' +
            '<span style="color:var(--text-muted);font-weight:700;">' + s.pct + '% completed</span>' +
          '</div>' +
          '<div class="progress ' + s.tone + '"><span style="width:' + s.pct + '%;"></span></div>' +
        '</div>';
      }).join(''));
  }

  /* ------------------------------------------------------- PATIENT PORTAL */
  function renderUser() {
    var P = window.DATA.patientProfile;
    var reports = window.DATA.patientReports || [];
    var appts = window.DATA.patientAppointments || [];
    var biomarkers = window.DATA.patientBiomarkers || [];

    // Patient KPIs
    C.fill('#user-kpis', [
      { label: 'Total Parameters Tested', value: '14', trend: 'Complete panel', dir: 'up', icon: 'bi-clipboard2-pulse-fill' },
      { label: 'Next At-Home Draw', value: 'Tomorrow', trend: '8:30 AM Fasting', dir: 'up', icon: 'bi-house-heart-fill' },
      { label: 'Biomarkers in Range', value: '94%', trend: 'Optimal health', dir: 'up', icon: 'bi-check2-circle' },
      { label: 'Certified PDF Reports', value: String(reports.length), trend: 'Reviewed by MD', dir: 'up', icon: 'bi-file-earmark-medical-fill' }
    ].map(kpiCard).join(''));

    // Upcoming & Past At-Home Appointments
    C.fill('#user-appointments',
      appts.map(function (a) {
        var isUpcoming = a.status.indexOf('Confirmed') !== -1;
        var badgeColor = isUpcoming ? 'amber' : 'green';
        return '<div class="card card-hover mb-4" style="border-color:' + (isUpcoming ? 'rgba(255,46,76,0.35)' : 'var(--border)') + ';">' +
          '<div class="flex flex-wrap items-start justify-between gap-4">' +
            '<div class="flex items-start gap-4">' +
              '<span class="icon-box lg"><i class="bi bi-house-door-fill"></i></span>' +
              '<div>' +
                '<div class="flex items-center gap-2 mb-1">' +
                  '<strong style="font-size:1.05rem;">' + S.esc(a.service) + '</strong>' +
                  '<span class="badge ' + badgeColor + '">' + S.esc(a.status) + '</span>' +
                '</div>' +
                '<p class="text-sm font-semibold" style="color:var(--text);">' +
                  '<i class="bi bi-clock-history text-rose-500 mr-1"></i> ' + S.esc(a.date) + ' · ' + S.esc(a.timeSlot) +
                '</p>' +
                '<p class="text-xs mt-1" style="color:var(--text-muted);">' +
                  '<i class="bi bi-geo-alt-fill text-rose-500 mr-1"></i> ' + S.esc(a.address) +
                '</p>' +
                '<p class="text-xs mt-1" style="color:var(--text-faint);">' +
                  '<i class="bi bi-person-badge text-sky-400 mr-1"></i> Assigned Phlebotomist: <strong style="color:var(--text);">' + S.esc(a.phlebotomist) + '</strong>' +
                '</p>' +
                (a.notes ? '<div class="badge plain mt-2 text-xs"><i class="bi bi-info-circle"></i>' + S.esc(a.notes) + '</div>' : '') +
              '</div>' +
            '</div>' +
            (isUpcoming ? (
              '<div class="flex items-center gap-2 mt-2 sm:mt-0">' +
                '<button class="btn btn-outline btn-sm" type="button" data-appt="reschedule"><i class="bi bi-calendar2-range"></i>Reschedule</button>' +
                '<button class="btn btn-ghost btn-sm" type="button" data-appt="cancel"><i class="bi bi-x-lg"></i>Cancel</button>' +
              '</div>'
            ) : '') +
          '</div>' +
        '</div>';
      }).join(''));

    // Certified Reports Listing
    C.fill('#user-history',
      reports.map(function (r) {
        return '<div class="timeline-item mb-4 pb-4 border-b border-dashed border-white/10">' +
          '<div class="flex flex-wrap items-center justify-between gap-3">' +
            '<div>' +
              '<div class="flex items-center gap-2">' +
                '<strong style="font-size:1rem;color:var(--text);">' + S.esc(r.title) + '</strong>' +
                '<span class="badge blue text-xs">' + S.esc(r.category) + '</span>' +
                '<span class="badge green text-xs"><i class="bi bi-check2"></i>' + S.esc(r.status) + '</span>' +
              '</div>' +
              '<p class="text-xs mt-1" style="color:var(--text-muted);">' + S.esc(r.summary) + '</p>' +
              '<div class="text-xs mt-1" style="color:var(--text-faint);">' +
                '<span><i class="bi bi-calendar3"></i> ' + S.formatDate(r.date) + '</span> · ' +
                '<span><i class="bi bi-person-check"></i> ' + S.esc(r.doctor) + '</span> · ' +
                '<span><i class="bi bi-shield-check"></i> ' + S.esc(r.lab) + '</span>' +
              '</div>' +
            '</div>' +
            '<button class="btn btn-soft btn-sm" type="button" data-download-report="' + S.esc(r.id) + '">' +
              '<i class="bi bi-file-earmark-pdf-fill"></i>Download Certified PDF' +
            '</button>' +
          '</div>' +
        '</div>';
      }).join(''));

    // Biomarker Trackers
    C.fill('#user-badges',
      biomarkers.map(function (b) {
        return '<div class="card card-soft p-4" style="border:1px solid var(--border);">' +
          '<div class="flex items-center justify-between mb-2">' +
            '<span class="text-xs font-semibold" style="color:var(--text-muted);">' + S.esc(b.name) + '</span>' +
            '<span class="badge green text-xs">' + S.esc(b.status) + '</span>' +
          '</div>' +
          '<div class="text-2xl font-bold mb-1" style="color:var(--text);">' + S.esc(b.value) + '</div>' +
          '<div class="flex items-center justify-between text-xs" style="color:var(--text-faint);">' +
            '<span>Target: ' + S.esc(b.target) + '</span>' +
            '<span style="color:var(--success);">' + S.esc(b.change) + '</span>' +
          '</div>' +
        '</div>';
      }).join(''));

    // Diagnostic Summary Overview
    C.fill('#user-impact',
      '<div class="flex flex-wrap items-center justify-between gap-6">' +
        '<div style="flex:1;min-width:16rem;">' +
          '<div class="flex items-center gap-3 mb-2">' +
            '<span class="icon-box" style="background:rgba(18,185,129,0.15);color:var(--success);"><i class="bi bi-heart-pulse-fill"></i></span>' +
            '<div>' +
              '<strong class="block font-semibold">Longitudinal Wellness Status: Optimal</strong>' +
              '<span class="text-xs" style="color:var(--text-muted);">94% of tested diagnostic parameters fall within healthy clinical reference bounds.</span>' +
            '</div>' +
          '</div>' +
          '<div class="progress green mt-3" style="height:0.65rem;"><span style="width:94%;"></span></div>' +
          '<div class="flex justify-between text-xs mt-2" style="color:var(--text-faint);">' +
            '<span>Baseline: Routine Annual Check</span>' +
            '<span>Next Follow-Up: Fasting Draw Tomorrow</span>' +
          '</div>' +
        '</div>' +
        '<div class="text-center sm:text-end">' +
          '<a class="btn btn-primary btn-sm" href="../../../public/pages/services.html">' +
            '<i class="bi bi-house-heart"></i>Order Additional Tests</a>' +
        '</div>' +
      '</div>');

    // Appointment actions
    S.qsa('[data-appt]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var action = btn.getAttribute('data-appt');
        if (action === 'cancel') {
          var card = btn.closest('.card');
          if (card) card.style.opacity = '0.45';
          S.toast('Appointment cancelled', 'The phlebotomist slot has been cancelled. You can reschedule anytime.');
        } else {
          S.toast('Reschedule requested', 'Redirecting to booking desk to select your new slot…');
          setTimeout(function () {
            window.location.href = S.link('public/pages/booking.html');
          }, 1200);
        }
      });
    });

    // Report download simulated action
    S.qsa('[data-download-report]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var repId = btn.getAttribute('data-download-report');
        btn.innerHTML = '<i class="bi bi-arrow-repeat" style="animation:spin 0.9s linear infinite;"></i>Preparing PDF…';
        setTimeout(function () {
          btn.innerHTML = '<i class="bi bi-check2"></i>Downloaded';
          S.toast('Lab Report Downloaded', 'Official certified report ' + repId + ' (CLIA #05D99) generated with clinical reference ranges.');
          setTimeout(function () {
            btn.innerHTML = '<i class="bi bi-file-earmark-pdf-fill"></i>Download Certified PDF';
          }, 3000);
        }, 800);
      });
    });
  }

  /* ------------------------------------------------------------------ BOOT */
  S.onLoad(function () {
    bindSidebar();
    var page = document.body ? document.body.getAttribute('data-page') : '';
    if (page === 'admin') renderAdmin();
    if (page === 'user') renderUser();
  });
})();
