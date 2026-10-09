/* ==========================================================================
   VENACARE — DEDICATED AT-HOME BOOKING ENGINE (booking.js)
   Multi-step clinical appointment booking:
   Step 1: Test & Panel Selection (Routine, Specialized, Packages)
   Step 2: Scheduling & Morning Fasting Windows
   Step 3: Patient Information, Requisition & Collection Address
   Step 4: Clinical Review & Payment Method (Online / Doorstep)
   Step 5: Instant Booking Confirmation & Patient Portal Integration
   ========================================================================== */

(function () {
  'use strict';

  var S = window.SITE;
  var C = window.UI;

  // Master Test Catalog normalization
  var allTests = [];
  var selectedMap = {}; // id -> test object
  var currentStep = 1;
  var currentCategory = 'all';
  var searchQuery = '';

  var bookingState = {
    date: '',
    slot: '07:30 AM – 08:30 AM (Recommended Fasting)',
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    patientDob: '',
    patientGender: 'Not specified',
    address: '',
    apt: '',
    city: 'San Francisco',
    zip: '94107',
    notes: '',
    reqType: 'self-directed',
    paymentMethod: 'doorstep',
    referenceId: ''
  };

  /* ------------------------------------------------------------- BUILD TEST CATALOG */
  function initTestCatalog() {
    allTests = [];
    var seen = {};

    // 1. Diagnostic Packages
    if (window.DATA && window.DATA.pricing && window.DATA.pricing.plans) {
      window.DATA.pricing.plans.forEach(function (p) {
        var id = 'pkg-' + p.id;
        seen[id] = true;
        allTests.push({
          id: id,
          code: 'PKG-' + p.id.toUpperCase(),
          title: p.name,
          category: 'Packages',
          kicker: 'Wellness Panel',
          price: p.monthly || 49,
          turnaround: p.id === 'essential' ? '24 Hours' : '24–48 Hours',
          fasting: '10–12 hours overnight fasting (water encouraged)',
          sampleType: 'Blood Combo (EDTA + SST)',
          excerpt: p.blurb,
          bullets: p.features ? p.features.slice(0, 4) : [],
          isPackage: true
        });
      });
    }

    // 2. Services from DATA.services
    if (window.DATA && window.DATA.services) {
      window.DATA.services.forEach(function (s) {
        if (!seen[s.id] && !seen['pkg-' + s.id]) {
          seen[s.id] = true;
          allTests.push({
            id: s.id,
            code: (s.category === 'Packages' ? 'PKG-' : 'TEST-') + s.id.substring(0, 4).toUpperCase(),
            title: s.title,
            category: s.category || 'Routine',
            kicker: s.kicker || s.category,
            price: s.priceFrom || 29,
            turnaround: s.turnaround || '24 Hours',
            fasting: s.fasting || 'No fasting required',
            sampleType: s.sampleType || 'Whole Blood',
            excerpt: s.excerpt || '',
            bullets: s.bullets ? s.bullets.slice(0, 3) : [],
            isPackage: s.category === 'Packages'
          });
        }
      });
    }

    // 3. Test catalog items from DATA.testCatalog
    if (window.DATA && window.DATA.testCatalog) {
      window.DATA.testCatalog.forEach(function (tc) {
        var genId = 'test-' + tc.code.toLowerCase().replace(/[^a-z0-9]/g, '-');
        if (!seen[genId]) {
          seen[genId] = true;
          allTests.push({
            id: genId,
            code: tc.code,
            title: tc.name,
            category: tc.category || 'Routine',
            kicker: tc.category,
            price: tc.price || 30,
            turnaround: tc.turnaround || '24 hrs',
            fasting: tc.fasting || 'No fasting',
            sampleType: tc.sample || 'Blood',
            excerpt: 'Clinical laboratory diagnostic assay with doctor-reviewed digital report.',
            bullets: [tc.code + ' Diagnostic Assay', tc.sample, tc.turnaround],
            isPackage: tc.category === 'Packages'
          });
        }
      });
    }
  }

  /* ------------------------------------------------------------- URL PARAMS PRE-SELECT */
  function parseUrlParams() {
    var params = new URLSearchParams(window.location.search);
    var targetId = params.get('id') || params.get('test') || params.get('service') || params.get('plan');
    var cat = params.get('category');
    var q = params.get('q');

    if (cat) currentCategory = cat;
    if (q) searchQuery = q;

    if (targetId) {
      var found = allTests.find(function (t) {
        return t.id.toLowerCase() === targetId.toLowerCase() ||
               t.id.toLowerCase() === ('pkg-' + targetId).toLowerCase() ||
               t.code.toLowerCase() === targetId.toLowerCase();
      });
      if (found) {
        selectedMap[found.id] = found;
        S.toast('Test Added', found.title + ' pre-selected for your booking.');
      }
    }
  }

  /* ------------------------------------------------------------- CALCULATIONS */
  function getSelectedList() {
    return Object.keys(selectedMap).map(function (k) { return selectedMap[k]; });
  }

  function calculateTotals() {
    var list = getSelectedList();
    var subtotal = list.reduce(function (sum, item) { return sum + item.price; }, 0);
    
    // Free phlebotomist visit if order >= $50 OR includes any package
    var hasPackage = list.some(function (t) { return t.isPackage || t.category === 'Packages'; });
    var isPhlebotomyFree = subtotal >= 50 || hasPackage || list.length === 0;
    var phlebotomyFee = (list.length > 0 && !isPhlebotomyFree) ? 15 : 0;
    var total = subtotal + phlebotomyFee;

    var requiresFasting = list.some(function (t) {
      var str = (t.fasting || '').toLowerCase();
      return str.indexOf('hour') !== -1 || str.indexOf('fasting required') !== -1 || str.indexOf('10') !== -1;
    });

    return {
      subtotal: subtotal,
      isPhlebotomyFree: isPhlebotomyFree,
      phlebotomyFee: phlebotomyFee,
      total: total,
      requiresFasting: requiresFasting,
      count: list.length,
      amountNeededForFree: Math.max(0, 50 - subtotal)
    };
  }

  /* ------------------------------------------------------------- STEP NAVIGATION */
  function setStep(step) {
    currentStep = step;
    
    // Update step bar
    S.qsa('[data-step-indicator]').forEach(function (node) {
      var num = parseInt(node.getAttribute('data-step-indicator'), 10);
      node.classList.remove('active', 'completed');
      if (num === step) {
        node.classList.add('active');
      } else if (num < step) {
        node.classList.add('completed');
      }
    });

    // Show panel
    S.qsa('[data-step-panel]').forEach(function (panel) {
      var num = parseInt(panel.getAttribute('data-step-panel'), 10);
      if (num === step) {
        panel.classList.remove('hidden');
        panel.style.display = 'block';
      } else {
        panel.classList.add('hidden');
        panel.style.display = 'none';
      }
    });

    // If step 4 (review), render summary details
    if (step === 4) {
      renderReviewPanel();
    }

    // Scroll to top of booking engine smoothly
    var anchor = S.qs('#booking-engine');
    if (anchor && window.scrollY > 300) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    renderOrderSummary();
  }

  /* ------------------------------------------------------------- ORDER SUMMARY */
  function renderOrderSummary() {
    var totals = calculateTotals();
    var list = getSelectedList();

    // Summary item list
    var listContainer = S.qs('#summary-items-list');
    if (listContainer) {
      if (list.length === 0) {
        listContainer.innerHTML = 
          '<div style="text-align:center;padding:1.5rem 0;color:var(--text-faint);">' +
            '<i class="bi bi-cart-x" style="font-size:2rem;display:block;margin-bottom:0.5rem;opacity:0.4;"></i>' +
            '<p style="font-size:0.88rem;">No tests selected yet.</p>' +
            '<p style="font-size:0.78rem;margin-top:0.2rem;">Choose a test or wellness package to get started.</p>' +
          '</div>';
      } else {
        listContainer.innerHTML = list.map(function (item) {
          return (
            '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.75rem;padding:0.65rem 0;border-bottom:1px dashed var(--border);">' +
              '<div style="flex:1;">' +
                '<strong style="display:block;font-size:0.92rem;line-height:1.25;color:var(--text);">' + S.esc(item.title) + '</strong>' +
                '<span style="font-size:0.75rem;color:var(--text-faint);">' + S.esc(item.category) + ' · ' + S.esc(item.turnaround) + '</span>' +
              '</div>' +
              '<div style="display:flex;align-items:center;gap:0.6rem;">' +
                '<span style="font-weight:700;font-size:0.95rem;color:var(--text);">' + (item.price === 0 ? 'FREE' : '$' + item.price) + '</span>' +
                '<button type="button" class="btn-ghost" data-remove-test="' + item.id + '" aria-label="Remove ' + S.esc(item.title) + '" style="color:var(--primary);padding:0.2rem;font-size:0.9rem;border-radius:4px;cursor:pointer;">' +
                  '<i class="bi bi-trash3"></i>' +
                '</button>' +
              '</div>' +
            '</div>'
          );
        }).join('');

        // Bind delete buttons
        S.qsa('[data-remove-test]', listContainer).forEach(function (btn) {
          btn.addEventListener('click', function () {
            var removeId = btn.getAttribute('data-remove-test');
            delete selectedMap[removeId];
            renderTestsList();
            renderOrderSummary();
          });
        });
      }
    }

    // Free delivery progress pill
    var freeNotice = S.qs('#free-phlebotomy-notice');
    if (freeNotice) {
      if (list.length === 0) {
        freeNotice.innerHTML = '<span class="badge plain" style="width:100%;justify-content:center;font-size:0.75rem;"><i class="bi bi-info-circle"></i>Free at-home draw on packages or orders $50+</span>';
      } else if (totals.isPhlebotomyFree) {
        freeNotice.innerHTML = '<span class="badge" style="width:100%;justify-content:center;font-size:0.78rem;"><i class="bi bi-check-circle-fill"></i>You have unlocked FREE At-Home Sample Collection!</span>';
      } else {
        freeNotice.innerHTML = '<div style="background:rgba(225,29,72,0.06);border:1px solid rgba(225,29,72,0.22);padding:0.45rem 0.65rem;border-radius:var(--radius-sm);font-size:0.75rem;color:var(--text);">' +
          '<i class="bi bi-lightning-charge-fill" style="color:var(--primary);margin-right:0.3rem;"></i>' +
          'Add <strong>$' + totals.amountNeededForFree + '</strong> more for <strong>FREE</strong> at-home phlebotomist collection!' +
        '</div>';
      }
    }

    // Totals values
    var subEl = S.qs('#summary-subtotal');
    if (subEl) subEl.textContent = '$' + totals.subtotal;

    var feeEl = S.qs('#summary-phlebotomy-fee');
    if (feeEl) {
      feeEl.innerHTML = totals.phlebotomyFee === 0 
        ? '<span style="color:var(--primary);font-weight:700;">FREE ($0)</span>' 
        : '$' + totals.phlebotomyFee;
    }

    var totalEl = S.qs('#summary-total');
    if (totalEl) totalEl.textContent = '$' + totals.total;

    var countBadge = S.qs('#summary-items-count');
    if (countBadge) countBadge.textContent = totals.count + ' test' + (totals.count === 1 ? '' : 's');

    // Fasting advisory badge in summary
    var fastingAdv = S.qs('#summary-fasting-advisory');
    if (fastingAdv) {
      if (totals.requiresFasting) {
        fastingAdv.classList.remove('hidden');
        fastingAdv.style.display = 'block';
      } else {
        fastingAdv.classList.add('hidden');
        fastingAdv.style.display = 'none';
      }
    }

    // Step 1 next button state
    var step1Next = S.qs('#step-1-next');
    if (step1Next) {
      if (totals.count > 0) {
        step1Next.removeAttribute('disabled');
        step1Next.classList.remove('opacity-50', 'pointer-events-none');
      } else {
        step1Next.setAttribute('disabled', 'true');
        step1Next.classList.add('opacity-50', 'pointer-events-none');
      }
    }
  }

  /* ------------------------------------------------------------- STEP 1: TESTS LIST */
  function renderTestsList() {
    var container = S.qs('#booking-tests-grid');
    if (!container) return;

    var filtered = allTests.filter(function (t) {
      var matchesCat = (currentCategory === 'all') || 
        (t.category.toLowerCase() === currentCategory.toLowerCase());
      
      var matchesSearch = true;
      if (searchQuery.trim()) {
        var q = searchQuery.toLowerCase().trim();
        matchesSearch = t.title.toLowerCase().indexOf(q) !== -1 ||
          t.code.toLowerCase().indexOf(q) !== -1 ||
          (t.excerpt && t.excerpt.toLowerCase().indexOf(q) !== -1) ||
          (t.category && t.category.toLowerCase().indexOf(q) !== -1);
      }
      return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = 
        '<div style="grid-column:1/-1;text-align:center;padding:3rem 1rem;" class="card card-soft">' +
          '<i class="bi bi-search" style="font-size:2.2rem;color:var(--text-faint);display:block;margin-bottom:0.75rem;"></i>' +
          '<h3 style="font-size:1.1rem;">No matching blood tests found</h3>' +
          '<p style="font-size:0.88rem;color:var(--text-muted);margin-top:0.35rem;">Try adjusting your search query or select "All Tests".</p>' +
          '<button type="button" class="btn btn-outline btn-sm mt-4" id="clear-test-search">Clear Search Filter</button>' +
        '</div>';
      var clearBtn = S.qs('#clear-test-search', container);
      if (clearBtn) {
        clearBtn.addEventListener('click', function () {
          searchQuery = '';
          currentCategory = 'all';
          var input = S.qs('#booking-test-search');
          if (input) input.value = '';
          updateTabButtons();
          renderTestsList();
        });
      }
      return;
    }

    container.innerHTML = filtered.map(function (t) {
      var isSelected = !!selectedMap[t.id];
      var isFasting = (t.fasting || '').toLowerCase().indexOf('no fasting') === -1 && (t.fasting || '').toLowerCase().indexOf('optional') === -1;

      return (
        '<div class="card card-hover flex flex-col justify-between" style="border-color:' + (isSelected ? 'rgba(255,46,76,0.65)' : 'var(--border)') + ';background:' + (isSelected ? 'linear-gradient(165deg, rgba(255,46,76,0.06), var(--surface-2))' : '') + ';box-shadow:' + (isSelected ? 'var(--glow-sm)' : '') + ';">' +
          '<div>' +
            '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.5rem;margin-bottom:0.75rem;">' +
              '<span class="badge" style="font-size:0.74rem;">' + S.esc(t.kicker || t.category) + '</span>' +
              '<span class="badge plain" style="font-size:0.72rem;font-family:monospace;">' + S.esc(t.code) + '</span>' +
            '</div>' +
            '<h3 style="font-size:1.08rem;font-weight:700;line-height:1.3;margin-bottom:0.45rem;">' + S.esc(t.title) + '</h3>' +
            '<p style="font-size:0.84rem;color:var(--text-muted);margin-bottom:0.85rem;line-height:1.45;">' + S.esc(t.excerpt) + '</p>' +
            '<div style="display:flex;flex-wrap:wrap;gap:0.35rem;margin-bottom:1rem;">' +
              '<span class="badge plain" style="font-size:0.72rem;">' +
                '<i class="bi ' + (isFasting ? 'bi-clock-history' : 'bi-check2') + '"></i>' + S.esc(t.fasting.split('(')[0].trim()) +
              '</span>' +
              '<span class="badge plain" style="font-size:0.72rem;"><i class="bi bi-hourglass-split"></i>' + S.esc(t.turnaround) + '</span>' +
            '</div>' +
          '</div>' +
          '<div style="display:flex;align-items:center;justify-content:space-between;gap:0.75rem;border-top:1px dashed var(--border);padding-top:0.85rem;margin-top:auto;">' +
            '<div>' +
              '<span style="display:block;font-size:0.72rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.04em;">Price</span>' +
              '<strong style="font-size:1.15rem;color:var(--text);">' + (t.price === 0 ? 'FREE' : '$' + t.price) + '</strong>' +
            '</div>' +
            '<button type="button" class="btn btn-sm ' + (isSelected ? 'btn-primary' : 'btn-outline') + '" style="flex-shrink:0;" data-toggle-test="' + t.id + '">' +
              (isSelected ? '<i class="bi bi-check2-circle"></i>Selected' : '<i class="bi bi-plus-lg"></i>Add Test') +
            '</button>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    // Bind add/remove toggles
    S.qsa('[data-toggle-test]', container).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-toggle-test');
        if (selectedMap[id]) {
          delete selectedMap[id];
        } else {
          var found = allTests.find(function (t) { return t.id === id; });
          if (found) selectedMap[id] = found;
        }
        renderTestsList();
        renderOrderSummary();
      });
    });
  }

  function updateTabButtons() {
    S.qsa('[data-test-tab]').forEach(function (btn) {
      var cat = btn.getAttribute('data-test-tab');
      if (cat === currentCategory) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  /* ------------------------------------------------------------- STEP 2: SCHEDULING */
  function initScheduling() {
    var dateInput = S.qs('#booking-date-input');
    if (dateInput) {
      // Default to tomorrow
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var yyyy = tomorrow.getFullYear();
      var mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      var dd = String(tomorrow.getDate()).padStart(2, '0');
      var defaultDate = yyyy + '-' + mm + '-' + dd;
      dateInput.min = defaultDate;
      dateInput.value = defaultDate;
      bookingState.date = defaultDate;

      dateInput.addEventListener('change', function () {
        bookingState.date = dateInput.value;
        updateScheduleDisplay();
      });
    }

    // Slot selection buttons
    S.qsa('[data-booking-slot]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        S.qsa('[data-booking-slot]').forEach(function (b) { b.classList.remove('active', 'btn-primary'); b.classList.add('btn-outline'); });
        btn.classList.add('active', 'btn-primary');
        btn.classList.remove('btn-outline');
        bookingState.slot = btn.getAttribute('data-booking-slot');
        updateScheduleDisplay();
      });
    });

    updateScheduleDisplay();
  }

  function updateScheduleDisplay() {
    var preview = S.qs('#booking-schedule-preview');
    if (preview) {
      preview.innerHTML = 
        '<i class="bi bi-calendar2-check text-rose-500 mr-1.5"></i>' +
        '<strong>' + (bookingState.date ? S.formatDate(bookingState.date) : 'Tomorrow') + '</strong> · ' +
        '<span>' + S.esc(bookingState.slot) + '</span>';
    }
  }

  /* ------------------------------------------------------------- STEP 3: PATIENT & ADDRESS */
  function bindPatientForm() {
    // Requisition radio changes
    S.qsa('input[name="reqType"]').forEach(function (radio) {
      radio.addEventListener('change', function () {
        bookingState.reqType = radio.value;
      });
    });

    // Populate from demo patient profile if available
    if (window.DATA && window.DATA.patientProfile) {
      var p = window.DATA.patientProfile;
      var nameIn = S.qs('#patient-name');
      var phoneIn = S.qs('#patient-phone');
      var emailIn = S.qs('#patient-email');
      var addrIn = S.qs('#patient-address');

      if (nameIn && !nameIn.value) nameIn.value = p.name || '';
      if (phoneIn && !phoneIn.value) phoneIn.value = p.phone || '';
      if (emailIn && !emailIn.value) emailIn.value = p.email || '';
      if (addrIn && !addrIn.value) addrIn.value = p.address || '';
    }
  }

  function validatePatientStep() {
    var nameIn = S.qs('#patient-name');
    var phoneIn = S.qs('#patient-phone');
    var emailIn = S.qs('#patient-email');
    var addrIn = S.qs('#patient-address');
    var cityIn = S.qs('#patient-city');
    var zipIn = S.qs('#patient-zip');

    var valid = true;

    function check(el, cond) {
      var parent = el ? el.closest('.field') : null;
      if (!parent) return;
      if (!cond) {
        parent.classList.add('invalid');
        valid = false;
      } else {
        parent.classList.remove('invalid');
      }
    }

    check(nameIn, nameIn && nameIn.value.trim().length >= 2);
    check(phoneIn, phoneIn && phoneIn.value.trim().length >= 7);
    check(emailIn, emailIn && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailIn.value.trim()));
    check(addrIn, addrIn && addrIn.value.trim().length >= 5);
    check(cityIn, cityIn && cityIn.value.trim().length >= 2);
    check(zipIn, zipIn && zipIn.value.trim().length >= 3);

    if (valid) {
      bookingState.patientName = nameIn.value.trim();
      bookingState.patientPhone = phoneIn.value.trim();
      bookingState.patientEmail = emailIn.value.trim();
      bookingState.patientDob = (S.qs('#patient-dob') || {}).value || '';
      bookingState.patientGender = (S.qs('#patient-gender') || {}).value || 'Not specified';
      bookingState.address = addrIn.value.trim();
      bookingState.apt = (S.qs('#patient-apt') || {}).value || '';
      bookingState.city = cityIn.value.trim();
      bookingState.zip = zipIn.value.trim();
      bookingState.notes = (S.qs('#patient-notes') || {}).value || '';
    }

    return valid;
  }

  /* ------------------------------------------------------------- STEP 4: REVIEW & PAYMENT */
  function renderReviewPanel() {
    var list = getSelectedList();
    var totals = calculateTotals();

    // Fill Review Details
    var revList = S.qs('#review-tests-list');
    if (revList) {
      revList.innerHTML = list.map(function (t) {
        return (
          '<div style="display:flex;justify-content:space-between;padding:0.4rem 0;font-size:0.9rem;border-bottom:1px dashed var(--border);">' +
            '<span><i class="bi bi-check2 text-rose-500 mr-1.5"></i>' + S.esc(t.title) + '</span>' +
            '<strong style="color:var(--text);">' + (t.price === 0 ? 'FREE' : '$' + t.price) + '</strong>' +
          '</div>'
        );
      }).join('');
    }

    var revSched = S.qs('#review-schedule-details');
    if (revSched) {
      revSched.innerHTML = 
        '<strong>Date:</strong> ' + S.formatDate(bookingState.date) + '<br />' +
        '<strong>Time Window:</strong> ' + S.esc(bookingState.slot) + '<br />' +
        '<span style="color:var(--primary);font-size:0.8rem;font-weight:600;"><i class="bi bi-shield-check"></i> ' +
        (totals.requiresFasting ? 'Fasting Window (Water only 10–12h prior)' : 'Standard Non-Fasting Draw') + '</span>';
    }

    var revPatient = S.qs('#review-patient-details');
    if (revPatient) {
      revPatient.innerHTML = 
        '<strong>Patient:</strong> ' + S.esc(bookingState.patientName) + ' (' + S.esc(bookingState.patientGender) + ')<br />' +
        '<strong>Phone:</strong> ' + S.esc(bookingState.patientPhone) + '<br />' +
        '<strong>Email:</strong> ' + S.esc(bookingState.patientEmail);
    }

    var revAddress = S.qs('#review-address-details');
    if (revAddress) {
      revAddress.innerHTML = 
        S.esc(bookingState.address) + (bookingState.apt ? ', ' + S.esc(bookingState.apt) : '') + '<br />' +
        S.esc(bookingState.city) + ', ' + S.esc(bookingState.zip) +
        (bookingState.notes ? '<br /><em style="font-size:0.8rem;color:var(--text-faint);">Note: ' + S.esc(bookingState.notes) + '</em>' : '');
    }

    // Payment Radio listeners
    S.qsa('input[name="paymentMethod"]').forEach(function (radio) {
      radio.addEventListener('change', function () {
        bookingState.paymentMethod = radio.value;
        var cardForm = S.qs('#online-card-inputs');
        if (cardForm) {
          cardForm.style.display = radio.value === 'online' ? 'block' : 'none';
        }
      });
    });
  }

  /* ------------------------------------------------------------- STEP 5: SUBMIT & CONFIRM */
  function submitBooking() {
    var totals = calculateTotals();
    var list = getSelectedList();

    // Generate reference code
    var ref = 'VC-' + Math.floor(100000 + Math.random() * 900000);
    bookingState.referenceId = ref;

    // Build appointment object
    var newAppt = {
      id: ref,
      service: list.map(function (t) { return t.title; }).join(' + '),
      date: S.formatDate(bookingState.date),
      timeSlot: bookingState.slot.split('(')[0].trim(),
      phlebotomist: 'Sara Muller (CLSI Certified)',
      address: bookingState.address + ', ' + bookingState.city,
      status: 'Confirmed · Scheduled',
      total: totals.total,
      notes: bookingState.notes || 'Routine sterile collection'
    };

    // Store in localStorage for Patient Portal
    try {
      var saved = JSON.parse(localStorage.getItem('venacare_appointments') || '[]');
      saved.unshift(newAppt);
      localStorage.setItem('venacare_appointments', JSON.stringify(saved));
      
      // Also update in-memory patientAppointments if present
      if (window.DATA && window.DATA.patientAppointments) {
        window.DATA.patientAppointments.unshift(newAppt);
      }
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }

    // Populate Success View
    var refNode = S.qs('#confirmed-ref-id');
    if (refNode) refNode.textContent = ref;

    var sTitle = S.qs('#confirmed-tests-title');
    if (sTitle) sTitle.textContent = list.map(function (t) { return t.title; }).join(' • ');

    var sTime = S.qs('#confirmed-datetime');
    if (sTime) sTime.textContent = S.formatDate(bookingState.date) + ' at ' + bookingState.slot;

    var sAddr = S.qs('#confirmed-address');
    if (sAddr) sAddr.textContent = bookingState.address + ', ' + bookingState.city;

    var sTotal = S.qs('#confirmed-total');
    if (sTotal) sTotal.textContent = '$' + totals.total + ' (' + (bookingState.paymentMethod === 'online' ? 'Paid Online' : 'Pay at Doorstep') + ')';

    // Switch to confirmation view
    var engine = S.qs('#booking-wizard-content');
    var successView = S.qs('#booking-success-view');
    var summaryCol = S.qs('#booking-summary-col');

    if (engine) engine.style.display = 'none';
    if (summaryCol) summaryCol.style.display = 'none';
    if (successView) {
      successView.classList.remove('hidden');
      successView.style.display = 'block';
    }

    // Scroll to success screen
    var topNode = S.qs('#booking-engine');
    if (topNode) topNode.scrollIntoView({ behavior: 'smooth', block: 'start' });

    S.toast('Booking Confirmed!', 'Appointment ' + ref + ' has been scheduled with Sara Muller.', 'success');
  }

  /* ------------------------------------------------------------- FAQ ACCORDIONS */
  function initBookingFaqs() {
    var faqs = [
      {
        q: 'How does at-home blood collection work?',
        a: 'A state-licensed, background-checked phlebotomist visits your home or office with a sterile, single-use vacuum collection kit. The blood draw takes about 10 minutes. Immediately after, your tubes are barcoded and stored in our temperature-controlled 2°C–8°C cold carrier.'
      },
      {
        q: 'Is at-home sample collection really FREE?',
        a: 'Yes! At-home phlebotomist collection is 100% FREE on all diagnostic packages (Essential $49, Comprehensive $119, Executive $229) and any combined test orders totaling $50 or more. For single test orders under $50, a nominal $15 mobile phlebotomy fee applies.'
      },
      {
        q: 'Do I need a doctor’s prescription to book a blood test?',
        a: 'No prescription is required. Under direct-access diagnostic regulations, our board-certified Medical Director oversees and authorizes all preventive wellness and routine lab orders. If you already have a physician’s lab requisition, you can present it during the draw.'
      },
      {
        q: 'When and how will I receive my certified lab results?',
        a: 'Most routine tests (CBC, CMP, Lipids, Glucose) are completed in 24 hours. Specialized panels take 24–48 hours. As soon as accredited CAP/CLIA lab pathologists certify your results, an encrypted PDF with clinical reference ranges is uploaded to your secure Patient Portal.'
      },
      {
        q: 'Can I reschedule or cancel my home collection slot?',
        a: 'Yes. You can reschedule or cancel your visit free of charge up to 4 hours before your scheduled appointment directly through your Patient Portal or by calling our coordinator desk at +1 (800) 553-5227.'
      }
    ];

    var faqGrid = S.qs('#booking-faqs-accordion');
    if (faqGrid) {
      faqGrid.innerHTML = faqs.map(function (item, idx) {
        return C.faqItem(item, idx === 0);
      }).join('');
    }
  }

  /* ------------------------------------------------------------- EVENT BINDINGS */
  function bindEvents() {
    // Search input
    var searchIn = S.qs('#booking-test-search');
    if (searchIn) {
      searchIn.addEventListener('input', function (e) {
        searchQuery = e.target.value;
        renderTestsList();
      });
    }

    // Category Tabs
    S.qsa('[data-test-tab]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentCategory = btn.getAttribute('data-test-tab');
        updateTabButtons();
        renderTestsList();
      });
    });

    // Step 1 -> Step 2
    var s1Next = S.qs('#step-1-next');
    if (s1Next) {
      s1Next.addEventListener('click', function () {
        if (getSelectedList().length > 0) {
          setStep(2);
        } else {
          S.toast('Select a Test', 'Please select at least one test or package to continue.', 'error');
        }
      });
    }

    // Step 2 Back & Next
    var s2Back = S.qs('#step-2-back');
    if (s2Back) s2Back.addEventListener('click', function () { setStep(1); });

    var s2Next = S.qs('#step-2-next');
    if (s2Next) {
      s2Next.addEventListener('click', function () {
        if (!bookingState.date) {
          S.toast('Select a Date', 'Please choose an appointment date.', 'error');
          return;
        }
        setStep(3);
      });
    }

    // Step 3 Back & Next
    var s3Back = S.qs('#step-3-back');
    if (s3Back) s3Back.addEventListener('click', function () { setStep(2); });

    var s3Next = S.qs('#step-3-next');
    if (s3Next) {
      s3Next.addEventListener('click', function () {
        if (validatePatientStep()) {
          setStep(4);
        } else {
          S.toast('Incomplete Form', 'Please fill in all required fields marked in red.', 'error');
        }
      });
    }

    // Step 4 Back & Submit
    var s4Back = S.qs('#step-4-back');
    if (s4Back) s4Back.addEventListener('click', function () { setStep(3); });

    var submitBtn = S.qs('#submit-booking-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var consent = S.qs('#booking-consent-check');
        if (consent && !consent.checked) {
          S.toast('Consent Required', 'Please confirm the clinical testing and sample collection consent checkbox.', 'error');
          return;
        }

        submitBtn.innerHTML = '<i class="bi bi-arrow-repeat" style="animation:spin 0.8s linear infinite;"></i> Confirming Appointment…';
        submitBtn.setAttribute('disabled', 'true');

        setTimeout(function () {
          submitBooking();
        }, 800);
      });
    }

    // Book another button on confirmation
    var bookAgain = S.qs('#book-again-btn');
    if (bookAgain) {
      bookAgain.addEventListener('click', function () {
        selectedMap = {};
        currentStep = 1;
        var engine = S.qs('#booking-wizard-content');
        var successView = S.qs('#booking-success-view');
        var summaryCol = S.qs('#booking-summary-col');
        if (engine) engine.style.display = 'block';
        if (summaryCol) summaryCol.style.display = 'block';
        if (successView) successView.style.display = 'none';
        setStep(1);
        renderTestsList();
        renderOrderSummary();
      });
    }
  }

  /* ------------------------------------------------------------- BOOT */
  S.onLoad(function () {
    initTestCatalog();
    parseUrlParams();
    renderTestsList();
    initScheduling();
    bindPatientForm();
    initBookingFaqs();
    bindEvents();
    renderOrderSummary();
    setStep(1);
  });

})();
