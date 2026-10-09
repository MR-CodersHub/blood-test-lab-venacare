/* ==========================================================================
   VENACARE — SITE CONTENT DATABASE
   Single source of truth for services, articles, team, lab tests,
   routine & specialized blood tests, pricing, and patient portal data.
   Consumed by home.js, services.js, service-details.js, blog.js,
   blog-details.js, and dashboard.js.
   ========================================================================== */

window.DATA = (function () {
  'use strict';

  /* ---------------------------------------------------------------- SERVICES */
  /* Covers At-Home Sample Collection, Routine Blood Tests, Specialized Tests, and Packages */
  var services = [
    {
      id: 'at-home-collection',
      title: 'At-Home Sample Collection',
      kicker: 'Featured Service',
      icon: 'bi-house-heart-fill',
      image: 'assets/img/service-mobile-drive.svg',
      category: 'At-Home Care',
      priceFrom: 50,
      duration: '15–25 minutes per visit',
      excerpt: 'Certified, background-checked phlebotomists arrive at your doorstep with sterile single-use vacuum kits, cold-chain specimen storage, and digital tracking.',
      bullets: [
        'Certified Phlebotomists (CPT-1 Licensed)',
        'Sterile single-use vacuum collection tubes',
        'Temperature-controlled cold-chain logistics',
        'Results in 24–48 hours on Patient Portal'
      ],
      fasting: 'Depends on selected tests (early morning slots available)',
      sampleType: 'Venous & Capillary Blood',
      turnaround: '24–48 Hours',
      description: [
        'VenaCare’s at-home sample collection brings hospital-grade phlebotomy directly to your living room or office. Each appointment is conducted by a state-licensed, background-checked phlebotomist who follows strict CLSI venipuncture standards and infection control protocols.',
        'We offer flexible early-morning collection slots (6:30 AM to 11:30 AM) so you can complete fasting tests comfortably without waiting in clinic lobbies. All collection kits and micro-needles are sealed, single-use, and opened in front of you.',
        'Immediately after collection, samples are labeled with unique barcoded patient identifiers, placed in temperature-monitored cold transport containers, and expedited to our accredited partner laboratories (CAP & CLIA certified). Doctor-reviewed digital reports are uploaded directly to your secure Patient Portal.'
      ],
      features: [
        { icon: 'bi-shield-check', title: 'Licensed Phlebotomists', text: 'Every phlebotomist is state-certified with pediatric and geriatric blood draw expertise.' },
        { icon: 'bi-box2-heart', title: 'Sterile Vacuum Kits', text: 'Single-use needles, alcohol prep, and specialized vacuum collection tubes opened in your presence.' },
        { icon: 'bi-thermometer-snow', title: 'Cold-Chain Logistics', text: 'Calibrated cold-boxes maintain optimal specimen temperature from your doorstep to the lab.' },
        { icon: 'bi-clock-history', title: 'Early Morning Slots', text: 'Convenient 6:30 AM – 11:30 AM morning slots designed specifically for fasting requirements.' },
        { icon: 'bi-file-earmark-medical', title: 'Secure Patient Portal', text: 'Encrypted, downloadable PDF diagnostic reports with physician review within 24–48 hours.' },
        { icon: 'bi-geo-alt-fill', title: 'Live Phlebotomist ETA', text: 'Receive real-time SMS updates with the phlebotomist’s arrival window and credentials.' }
      ],
      tiers: [
        {
          name: 'Home Visit · Routine Draw', price: 15, per: 'per visit', featured: false,
          desc: 'For individual routine blood tests (Free on all orders over $50).',
          features: ['Home or workplace collection', 'Licensed phlebotomist', 'Sterile single-use kit', 'Cold-chain dispatch', 'Portal PDF report']
        },
        {
          name: 'Complimentary on Panels', price: 0, per: 'orders over $50', featured: true,
          desc: 'Included automatically with any diagnostic package or multi-test order.',
          features: ['Zero collection fee', 'Priority morning fasting slot', 'Dedicated phlebotomist dispatch', 'Doctor-reviewed lab report', 'Longitudinal biomarker tracking']
        },
        {
          name: 'Executive & Family Group', price: 29, per: 'up to 4 members', featured: false,
          desc: 'Simultaneous sample collection for family members or executive teams.',
          features: ['Single visit for up to 4 patients', 'Dedicated clinical supervisor', 'Combined cold-chain handling', 'Separate confidential patient portal accounts', 'Priority lab processing']
        }
      ],
      faqs: [
        { q: 'How do I prepare for an at-home blood collection?', a: 'Fast for 10–12 hours if your tests include glucose, lipids, or comprehensive metabolic panels. Drink plenty of water to stay hydrated, which helps make veins more accessible.' },
        { q: 'Are your phlebotomists certified and background-checked?', a: 'Yes. 100% of VenaCare phlebotomists hold valid state phlebotomy licenses (CPT-1), carry medical malpractice insurance, and undergo thorough background checks.' },
        { q: 'How are blood samples preserved during transport?', a: 'Samples are immediately placed in insulated cold-transport carriers with monitored digital temperature logs to ensure specimen integrity meets CAP and CLIA standards.' },
        { q: 'When and where do I get my test results?', a: 'Results are typically ready within 24 to 48 hours. You will receive an SMS and email notification to view and download your certified report from the secure Patient Portal.' },
        { q: 'What safety precautions are taken during the home visit?', a: 'Our phlebotomists wear fresh gloves, masks, and sanitize equipment before each patient. Needles and collection tubes are 100% single-use and disposed of in an OSHA-approved sharps container.' }
      ],
      stats: [{ value: '150k+', label: 'Home draws completed' }, { value: '99.8%', label: 'Specimen integrity' }, { value: '24–48 hrs', label: 'Average turnaround' }],
      related: ['cbc-panel', 'cmp-metabolic', 'comprehensive-vitality']
    },

    /* ROUTINE BLOOD TESTS */
    {
      id: 'cbc-panel',
      title: 'Complete Blood Count (CBC) with Differential',
      kicker: 'Routine Blood Test',
      icon: 'bi-droplet-half',
      image: 'assets/img/service-screening.svg',
      category: 'Routine',
      priceFrom: 24,
      duration: '15 min collection · 24 hr results',
      excerpt: 'Evaluates overall health and detects a wide range of disorders including anemia, infection, inflammation, and leukemia.',
      bullets: ['Red & White Blood Cell Count', 'Hemoglobin & Hematocrit Levels', 'Platelet Count & Volume (MPV)', 'Differential Leukocyte Breakdown'],
      fasting: 'No fasting required',
      sampleType: 'Whole Blood (EDTA Purple Top)',
      turnaround: 'Same-day / 24 Hours',
      description: [
        'The Complete Blood Count (CBC) with Differential is one of the most fundamental routine diagnostic tests. It measures the cellular components of blood, giving your physician a comprehensive overview of your immune status and oxygen-carrying capacity.',
        'The panel measures Red Blood Cells (RBC), Hemoglobin, and Hematocrit to screen for iron-deficiency anemia or blood loss, White Blood Cells (WBC) and five-part differential to detect acute infections, and Platelets to evaluate blood clotting efficiency.',
        'Available with convenient at-home collection. Specimen integrity is preserved via gentle venipuncture and immediate ambient/chilled stabilization.'
      ],
      features: [
        { icon: 'bi-virus', title: 'Infection Screening', text: 'Identifies viral vs. bacterial infections through neutrophil and lymphocyte counts.' },
        { icon: 'bi-heart-pulse', title: 'Anemia Detection', text: 'Accurately quantifies hemoglobin, hematocrit, and mean corpuscular volume (MCV).' },
        { icon: 'bi-shield-plus', title: 'Immune System Check', text: 'Full 5-part white blood cell differential assessing overall immunity.' },
        { icon: 'bi-activity', title: 'Clotting & Platelets', text: 'Measures platelet count to evaluate bleeding and thrombosis risk.' },
        { icon: 'bi-house-check', title: 'At-Home Phlebotomy', text: 'Gentle draw at your home or office; no clinic waiting room required.' },
        { icon: 'bi-file-earmark-pdf', title: 'Digital Patient Report', text: 'Download color-coded report showing your values against reference ranges.' }
      ],
      tiers: [
        {
          name: 'Standard CBC', price: 24, per: 'per test', featured: true,
          desc: 'Complete Blood Count with 5-part differential.',
          features: ['16 cellular parameters', 'Red & white blood cell counts', 'Hemoglobin & hematocrit', 'Platelet indices', 'Digital PDF report']
        },
        {
          name: 'CBC + Iron Panel Add-On', price: 44, per: 'per test', featured: false,
          desc: 'Adds Serum Iron, Ferritin, and Total Iron Binding Capacity (TIBC).',
          features: ['All CBC parameters', 'Serum Ferritin (iron reserves)', 'Total Iron Binding Capacity', 'Transferrin saturation %', 'Physician summary']
        }
      ],
      faqs: [
        { q: 'Is fasting required for a CBC test?', a: 'No, you do not need to fast for a CBC test alone. You can eat and drink normally before your home collection appointment.' },
        { q: 'How long until my CBC results are ready in the patient portal?', a: 'CBC results are usually processed and available in your patient portal within 12 to 24 hours of sample pickup.' }
      ],
      stats: [{ value: '16', label: 'Parameters tested' }, { value: '24 hrs', label: 'Portal turnaround' }, { value: '100%', label: 'CLIA accredited' }],
      related: ['cmp-metabolic', 'lipid-profile', 'essential-wellness']
    },
    {
      id: 'cmp-metabolic',
      title: 'Comprehensive Metabolic Panel (CMP-14)',
      kicker: 'Routine Blood Test',
      icon: 'bi-activity',
      image: 'assets/img/service-screening.svg',
      category: 'Routine',
      priceFrom: 34,
      duration: '15 min collection · 24 hr results',
      excerpt: '14 vital chemical biomarkers providing an essential snapshot of kidney function, liver health, electrolytes, blood glucose, and fluid balance.',
      bullets: ['Fasting Glucose & Calcium', 'Kidney: BUN & Serum Creatinine', 'Liver Enzymes: ALT, AST, ALP, Bilirubin', 'Electrolytes: Sodium, Potassium, Chloride, CO2'],
      fasting: '10–12 hours fasting required (water encouraged)',
      sampleType: 'Serum / SST Gold Top',
      turnaround: '24 Hours',
      description: [
        'The Comprehensive Metabolic Panel (CMP) evaluates fourteen vital biochemical markers. It is routinely ordered as part of annual health checkups, pre-operative clearances, and long-term medication monitoring.',
        'The test evaluates renal health by measuring Blood Urea Nitrogen (BUN) and Creatinine (with calculated eGFR), hepatic health through four major liver enzymes (ALT, AST, ALP, Total Bilirubin), electrolytes for hydration and acid-base balance, and fasting glucose for metabolic control.',
        'Our phlebotomists schedule morning at-home collection slots so you can complete your 10–12 hour fast with minimal disruption to your daily routine.'
      ],
      features: [
        { icon: 'bi-droplet-half', title: 'Kidney Function', text: 'BUN, Creatinine, and estimated Glomerular Filtration Rate (eGFR).' },
        { icon: 'bi-hospital', title: 'Liver Enzyme Health', text: 'ALT, AST, Alkaline Phosphatase, Total Bilirubin, and Albumin/Globulin.' },
        { icon: 'bi-lightning', title: 'Electrolyte Balance', text: 'Sodium, Potassium, Chloride, and Carbon Dioxide (CO2).' },
        { icon: 'bi-speedometer2', title: 'Metabolic & Sugar', text: 'Fasting Plasma Glucose and Total Calcium levels.' },
        { icon: 'bi-house-check', title: 'Morning Home Draw', text: 'Wake up, have blood drawn in 10 minutes, and enjoy breakfast immediately.' },
        { icon: 'bi-file-lock', title: 'Doctor-Reviewed', text: 'Reference ranges clearly annotated with abnormal flags on your portal.' }
      ],
      tiers: [
        {
          name: 'Standard CMP-14', price: 34, per: 'per test', featured: true,
          desc: 'Full 14-parameter comprehensive metabolic evaluation.',
          features: ['14 core chemical biomarkers', 'Liver & kidney panels', 'Full electrolyte profile', 'eGFR filtration score', 'Portal report in 24 hrs']
        },
        {
          name: 'CMP + Lipid Combo', price: 54, per: 'bundle', featured: false,
          desc: 'Combines CMP-14 with complete Lipid & Cholesterol panel.',
          features: ['All 14 CMP parameters', 'Full lipid profile (Total, HDL, LDL, Triglycerides)', 'Free at-home sample collection', 'Comprehensive doctor report']
        }
      ],
      faqs: [
        { q: 'Why do I have to fast for a CMP test?', a: 'Food intake temporarily alters glucose, calcium, and electrolyte levels. A 10–12 hour overnight fast ensures clinical accuracy for baseline metabolic markers. Drinking plain water is recommended.' }
      ],
      stats: [{ value: '14', label: 'Key biomarkers' }, { value: '24 hrs', label: 'Average turnaround' }, { value: '100%', label: 'Home collection ready' }],
      related: ['lipid-profile', 'diabetes-hba1c', 'comprehensive-vitality']
    },
    {
      id: 'lipid-profile',
      title: 'Complete Lipid & Cholesterol Profile',
      kicker: 'Routine Blood Test',
      icon: 'bi-heart-pulse',
      image: 'assets/img/service-matching.svg',
      category: 'Routine',
      priceFrom: 29,
      duration: '15 min collection · 24 hr results',
      excerpt: 'Comprehensive cardiovascular assessment measuring total cholesterol, HDL (good), LDL (bad), triglycerides, and cardiac risk ratio.',
      bullets: ['Total Cholesterol & Triglycerides', 'HDL ("Good") & LDL ("Bad") Cholesterol', 'Non-HDL Cholesterol & VLDL', 'Cholesterol / HDL Risk Ratio'],
      fasting: '9–12 hours fasting recommended',
      sampleType: 'Serum / SST Gold Top',
      turnaround: '24 Hours',
      description: [
        'Heart disease remains the leading health concern worldwide, yet lipid abnormalities often present with zero symptoms. The VenaCare Lipid Profile provides a detailed breakdown of fats and sterols in your bloodstream.',
        'This panel measures Total Cholesterol, High-Density Lipoprotein (HDL), Low-Density Lipoprotein (LDL), Very Low-Density Lipoprotein (VLDL), and Triglycerides. It computes your total-to-HDL ratio to predict cardiovascular and coronary artery disease risk.',
        'Book an early morning at-home visit to meet fasting guidelines without traveling to an outpatient diagnostic center.'
      ],
      features: [
        { icon: 'bi-heart-fill', title: 'Cardiac Risk Scoring', text: 'Accurately measures LDL, HDL, and calculates atherogenic ratios.' },
        { icon: 'bi-graph-up', title: 'Triglyceride Evaluation', text: 'Detects hypertriglyceridemia linked to metabolic syndrome and arterial hardening.' },
        { icon: 'bi-speedometer', title: 'Target Guidelines', text: 'Results compared against AHA/ACC optimal clinical cholesterol targets.' },
        { icon: 'bi-house-check', title: 'Gentle Home Phlebotomy', text: 'Fast, comfortable morning blood collection in your own residence.' }
      ],
      tiers: [
        {
          name: 'Standard Lipid Panel', price: 29, per: 'per test', featured: true,
          desc: 'Total Cholesterol, HDL, LDL, VLDL, and Triglycerides.',
          features: ['5 lipid biomarkers', 'Calculated risk ratios', 'AHA clinical benchmarks', 'Available via home draw', 'Portal PDF report']
        },
        {
          name: 'Advanced Cardio Panel', price: 65, per: 'bundle', featured: false,
          desc: 'Adds High-Sensitivity C-Reactive Protein (hs-CRP) for vascular inflammation.',
          features: ['Complete Lipid Panel', 'hs-CRP inflammation marker', 'Apolipoprotein B (ApoB)', 'Comprehensive cardiac risk score', 'Free home phlebotomy']
        }
      ],
      faqs: [
        { q: 'Can I drink coffee before a lipid test?', a: 'No coffee, tea, or juice during your fast. Only plain water is permitted, as caffeine and milk can skew triglyceride measurements.' }
      ],
      stats: [{ value: '5', label: 'Lipid markers' }, { value: '24 hrs', label: 'Portal turnaround' }, { value: 'AHA', label: 'Standard aligned' }],
      related: ['cardiac-crp', 'cmp-metabolic', 'essential-wellness']
    },
    {
      id: 'diabetes-hba1c',
      title: 'HbA1c & Fasting Glucose Diabetes Screen',
      kicker: 'Routine Blood Test',
      icon: 'bi-clipboard2-pulse',
      image: 'assets/img/service-screening.svg',
      category: 'Routine',
      priceFrom: 28,
      duration: '15 min collection · 24 hr results',
      excerpt: 'Evaluates your 3-month average blood glucose alongside immediate fasting plasma glucose to detect prediabetes and monitor diabetes control.',
      bullets: ['Hemoglobin A1c Percentage (HbA1c)', 'Estimated Average Glucose (eAG in mg/dL)', 'Fasting Plasma Glucose', 'ADA Diagnostic Reference Ranges'],
      fasting: '8–10 hours fasting required',
      sampleType: 'Whole Blood (Lavender EDTA)',
      turnaround: '24 Hours',
      description: [
        'Hemoglobin A1c provides an objective, reliable measure of blood sugar regulation over the preceding 90 to 120 days. As glucose circulates in the blood, it glycates onto red blood cell hemoglobin molecules.',
        'Combined with an immediate fasting glucose test, this panel accurately diagnoses prediabetes (A1c 5.7% – 6.4%) and diabetes (A1c ≥ 6.5%), while verifying current glycemic stability.',
        'At-home collection allows consistent fasting conditions and stress-free blood draw, eliminating clinic white-coat glycemic spikes.'
      ],
      features: [
        { icon: 'bi-calendar-check', title: '90-Day Glycemic Index', text: 'Measures glycated hemoglobin unaffected by single-day dietary swings.' },
        { icon: 'bi-lightning-charge', title: 'Instant Fasting Sugar', text: 'Captures baseline morning glucose to correlate with long-term trends.' },
        { icon: 'bi-award', title: 'NGSP Certified', text: 'Analyzed on standardized HPLC analyzers calibrated to national standards.' },
        { icon: 'bi-house-check', title: 'Comfortable Home Visit', text: 'Quick, virtually painless venipuncture by certified phlebotomists.' }
      ],
      tiers: [
        {
          name: 'HbA1c + Fasting Sugar', price: 28, per: 'per test', featured: true,
          desc: 'Gold standard diabetes monitoring and prediabetes screening.',
          features: ['HbA1c percentage', 'Estimated Average Glucose (eAG)', 'Fasting plasma glucose', 'Clear prediabetes threshold indicators', 'Portal report']
        }
      ],
      faqs: [
        { q: 'What is the normal range for HbA1c?', a: 'Below 5.7% is considered normal. 5.7% to 6.4% indicates prediabetes, and 6.5% or higher on two separate tests indicates diabetes.' }
      ],
      stats: [{ value: '90 days', label: 'Average window' }, { value: '24 hrs', label: 'Turnaround' }, { value: 'NGSP', label: 'Certified method' }],
      related: ['cmp-metabolic', 'essential-wellness', 'comprehensive-vitality']
    },
    {
      id: 'thyroid-panel',
      title: 'Thyroid Function Panel (TSH, Free T4 & T3)',
      kicker: 'Routine Blood Test',
      icon: 'bi-speedometer',
      image: 'assets/img/service-matching.svg',
      category: 'Routine',
      priceFrom: 39,
      duration: '15 min collection · 24–48 hr results',
      excerpt: 'Comprehensive endocrine screen measuring Thyroid Stimulating Hormone (TSH) with Free Thyroxine (T4) and Free Triiodothyronine (T3).',
      bullets: ['Ultra-Sensitive TSH with 3rd Gen Assay', 'Free Thyroxine (Free T4)', 'Free Triiodothyronine (Free T3)', 'Screens Hypo- and Hyper-thyroidism'],
      fasting: 'No fasting required (morning collection recommended)',
      sampleType: 'Serum / SST Gold Top',
      turnaround: '24–48 Hours',
      description: [
        'The thyroid gland controls metabolism, body temperature, cardiovascular rhythm, and energy production. The VenaCare Thyroid Function Panel examines the complete pituitary-thyroid feedback loop.',
        'Measures TSH (the pituitary signal) together with Free T4 and Free T3 (unbound, active circulating thyroid hormones). Detects sluggish metabolism, unexplained weight gain or loss, chronic fatigue, brain fog, and autoimmune thyroiditis.',
        'Convenient morning at-home blood collection ensures accurate baseline hormone levels.'
      ],
      features: [
        { icon: 'bi-cpu', title: 'Metabolic Baseline', text: 'Assesses cellular metabolism, thermal regulation, and weight management.' },
        { icon: 'bi-battery-charging', title: 'Fatigue & Mood Screen', text: 'Uncovers subclinical hypothyroidism behind persistent tiredness.' },
        { icon: 'bi-shield-check', title: 'Unbound Free Hormones', text: 'Measures bioavailable Free T4 and Free T3 for clinical precision.' },
        { icon: 'bi-house-check', title: 'Doorstep Collection', text: 'Sample collected gently at your location and cold-shipped to accredited lab.' }
      ],
      tiers: [
        {
          name: 'Complete Thyroid Panel', price: 39, per: 'per test', featured: true,
          desc: 'TSH, Free T4, and Free T3 comprehensive screen.',
          features: ['Ultra-sensitive TSH', 'Free T4 (unbound)', 'Free T3 (unbound)', 'Metabolic rate assessment', 'Digital portal results']
        },
        {
          name: 'Thyroid + Antibodies Panel', price: 79, per: 'bundle', featured: false,
          desc: 'Adds TPO Antibodies & Antithyroglobulin to screen Hashimoto’s / Graves’.',
          features: ['Complete Thyroid Panel', 'Thyroid Peroxidase (TPO) Antibodies', 'Thyroglobulin Antibodies', 'Autoimmune diagnosis aid', 'Free home phlebotomy']
        }
      ],
      faqs: [
        { q: 'Should I take my thyroid medication before the blood draw?', a: 'Consult your physician. Most doctors recommend delaying your morning levothyroxine/synthroid dose until after your blood sample has been drawn.' }
      ],
      stats: [{ value: '3', label: 'Hormones measured' }, { value: '24–48 hrs', label: 'Turnaround' }, { value: '3rd Gen', label: 'Chemiluminescent assay' }],
      related: ['cmp-metabolic', 'hormone-endocrine', 'comprehensive-vitality']
    },
    {
      id: 'renal-liver-panel',
      title: 'Renal & Hepatic Function Panel',
      kicker: 'Routine Blood Test',
      icon: 'bi-shield-plus',
      image: 'assets/img/service-screening.svg',
      category: 'Routine',
      priceFrom: 36,
      duration: '15 min collection · 24 hr results',
      excerpt: 'Focused clinical assessment of kidney glomerular filtration rate and comprehensive liver enzymes and proteins.',
      bullets: ['Serum Creatinine & eGFR Calculation', 'Blood Urea Nitrogen (BUN) & Ratio', 'ALT, AST & Alkaline Phosphatase', 'Total Protein, Albumin & Globulin'],
      fasting: '8–10 hours fasting recommended',
      sampleType: 'Serum / SST Gold Top',
      turnaround: '24 Hours',
      description: [
        'The kidneys and liver are the body’s principal filtration, detoxification, and protein-synthesizing organs. This combined panel evaluates both systems simultaneously.',
        'Measures creatinine and BUN for renal filtration capacity, and hepatic transaminases (ALT, AST, ALP) alongside albumin and total protein to assess liver inflammation, metabolic capacity, and medication toxicity.',
        'Ideal for patients on statins, NSAIDs, antihypertensives, or routine wellness health tracking.'
      ],
      features: [
        { icon: 'bi-funnel-fill', title: 'Renal Filtration', text: 'Accurate eGFR calculation for early detection of kidney stress.' },
        { icon: 'bi-shield-shaded', title: 'Liver Detoxification', text: 'Monitors transaminase enzymes reflecting hepatocellular integrity.' },
        { icon: 'bi-capsule', title: 'Medication Safety', text: 'Essential for patients monitoring prescription tolerances.' },
        { icon: 'bi-house-check', title: 'At-Home Safety', text: 'No exposure to clinic viruses; sample collected safely in your home.' }
      ],
      tiers: [
        {
          name: 'Renal & Hepatic Screen', price: 36, per: 'per test', featured: true,
          desc: 'Complete combined assessment of liver and kidney biomarkers.',
          features: ['9 biochemical parameters', 'eGFR filtration score', 'Liver transaminases', 'Albumin / Globulin ratio', 'Portal report in 24 hrs']
        }
      ],
      faqs: [
        { q: 'How often should kidney and liver functions be checked?', a: 'Typically once a year during an annual physical, or every 3–6 months if you are managing conditions like diabetes, hypertension, or taking chronic medications.' }
      ],
      stats: [{ value: '9', label: 'Parameters' }, { value: '24 hrs', label: 'Average turnaround' }, { value: '100%', label: 'Cold-chain tracked' }],
      related: ['cmp-metabolic', 'cbc-panel', 'essential-wellness']
    },

    /* SPECIALIZED BLOOD TESTS */
    {
      id: 'cardiac-crp',
      title: 'Cardiac Biomarkers & High-Sensitivity CRP',
      kicker: 'Specialized Blood Test',
      icon: 'bi-heart-pulse-fill',
      image: 'assets/img/service-emergency.svg',
      category: 'Specialized',
      priceFrom: 42,
      duration: '15 min collection · 24–48 hr results',
      excerpt: 'High-sensitivity C-reactive protein (hs-CRP) detects hidden vascular and arterial inflammation to assess cardiovascular event risk.',
      bullets: ['hs-CRP High-Sensitivity Inflammation Assay', 'Atherosclerotic Plaque Instability Indicator', 'Relative Cardiovascular Risk Stratification', 'Apolipoprotein B (ApoB) Optional Add-on'],
      fasting: 'No fasting required (rested state)',
      sampleType: 'Serum / SST Gold Top',
      turnaround: '24–48 Hours',
      description: [
        'Cholesterol numbers alone don’t tell the whole cardiovascular story. High-sensitivity C-Reactive Protein (hs-CRP) measures microscopic vascular inflammation within arterial walls, where plaques can rupture and cause heart attacks or strokes.',
        'Clinically validated by the American Heart Association to stratify patients into low (< 1.0 mg/L), average (1.0–3.0 mg/L), and high (> 3.0 mg/L) cardiovascular risk tiers.',
        'Our phlebotomists collect the venous sample at your home under relaxed resting conditions, ensuring accurate baseline values without physical stress from travel.'
      ],
      features: [
        { icon: 'bi-flame', title: 'Vascular Inflammation', text: 'Detects microscopic endothelial inflammation undetectable by standard lipid panels.' },
        { icon: 'bi-shield-slash', title: 'Plaque Vulnerability', text: 'Correlates with arterial plaque instability and cardiovascular event risk.' },
        { icon: 'bi-graph-up-arrow', title: 'AHA Risk Categorization', text: 'Calibrated into clinical low, average, and high risk categories.' },
        { icon: 'bi-house-check', title: 'Home Comfort Draw', text: 'Eliminates commute stress that can elevate inflammatory markers.' }
      ],
      tiers: [
        {
          name: 'hs-CRP Vascular Screen', price: 42, per: 'per test', featured: true,
          desc: 'High-sensitivity C-reactive protein diagnostic assay.',
          features: ['hs-CRP quantitative value', 'AHA cardiovascular risk bracket', 'Vascular inflammation analysis', 'Patient portal PDF report']
        },
        {
          name: 'Advanced Cardiometabolic', price: 95, per: 'bundle', featured: false,
          desc: 'Adds Apolipoprotein B (ApoB) and Lipoprotein(a) [Lp(a)].',
          features: ['hs-CRP marker', 'ApoB particle count', 'Lipoprotein(a) genetic marker', 'Complete Lipid Profile', 'Free home phlebotomy']
        }
      ],
      faqs: [
        { q: 'Can a cold or minor infection affect hs-CRP?', a: 'Yes. Any recent viral infection, dental work, or physical trauma can temporarily spike hs-CRP. It is best to test when you are free of acute illness for at least two weeks.' }
      ],
      stats: [{ value: '< 1.0 mg/L', label: 'Optimal target' }, { value: '24–48 hrs', label: 'Turnaround' }, { value: 'AHA', label: 'Risk aligned' }],
      related: ['lipid-profile', 'cmp-metabolic', 'executive-advanced']
    },
    {
      id: 'hormone-endocrine',
      title: 'Comprehensive Hormone Profile (Male / Female)',
      kicker: 'Specialized Blood Test',
      icon: 'bi-gender-ambiguous',
      image: 'assets/img/service-camps.svg',
      category: 'Specialized',
      priceFrom: 79,
      duration: '15 min collection · 48 hr results',
      excerpt: 'Comprehensive endocrine evaluation assessing testosterone, estradiol, progesterone, DHEA-S, cortisol, and sex hormone binding globulin.',
      bullets: ['Total & Free Testosterone / Estradiol', 'Progesterone & DHEA-Sulfate', 'Morning Baseline Serum Cortisol', 'Sex Hormone Binding Globulin (SHBG)'],
      fasting: 'Morning fasting collection recommended (7:00 AM – 10:00 AM)',
      sampleType: 'Serum / SST Gold Top',
      turnaround: '48 Hours',
      description: [
        'Hormones regulate energy, muscle mass, libido, sleep quality, fertility, bone density, and emotional well-being. This specialized panel measures bioavailable and total hormones across the hypothalamic-pituitary-gonadal axis.',
        'Available in gender-specific panels: for men, measures total/free testosterone, SHBG, and estradiol; for women, assesses estradiol, progesterone, LH, FSH, and DHEA-S for reproductive vitality, perimenopause, or PCOS evaluation.',
        'Hormones experience sharp diurnal rhythms. Our at-home phlebotomist arrives between 7:00 AM and 9:30 AM to capture true peak circulating levels.'
      ],
      features: [
        { icon: 'bi-battery-charging', title: 'Vitality & Stamina', text: 'Identifies testosterone deficiency, estrogen dominance, and adrenal fatigue.' },
        { icon: 'bi-droplet', title: 'Free vs. Bound Ratio', text: 'Calculates bioavailable free hormones for meaningful physiological insight.' },
        { icon: 'bi-alarm', title: 'Circadian Precision', text: 'Collected in the narrow morning window when endocrine levels are standardized.' },
        { icon: 'bi-house-check', title: 'Private Doorstep Draw', text: 'Professional, discreet collection in the comfort and privacy of your home.' }
      ],
      tiers: [
        {
          name: 'Vitality Hormone Panel', price: 79, per: 'per test', featured: true,
          desc: 'Targeted male or female hormone profile.',
          features: ['Total & Free Testosterone or Estradiol', 'DHEA-Sulfate', 'SHBG calculation', 'Morning cortisol', 'Portal PDF report']
        },
        {
          name: 'Complete Endocrine Suite', price: 139, per: 'bundle', featured: false,
          desc: 'Adds Thyroid Panel, Prolactin, and IGF-1 Somatomedin-C.',
          features: ['Complete hormone profile', 'Full Thyroid Panel (TSH, Free T4/T3)', 'Prolactin & Growth axis (IGF-1)', 'Free home collection', 'Physician consultation aid']
        }
      ],
      faqs: [
        { q: 'Why must hormone tests be drawn in the morning?', a: 'Testosterone and cortisol peak in the early morning hours and decline throughout the day. Standardized reference ranges require morning collection between 7 AM and 10 AM.' }
      ],
      stats: [{ value: '6', label: 'Hormones analyzed' }, { value: '48 hrs', label: 'Average turnaround' }, { value: '7–10 AM', label: 'Optimal draw window' }],
      related: ['thyroid-panel', 'executive-advanced', 'comprehensive-vitality']
    },
    {
      id: 'allergy-ige',
      title: 'Food & Environmental Allergy IgE Comprehensive Screen',
      kicker: 'Specialized Blood Test',
      icon: 'bi-virus',
      image: 'assets/img/service-screening.svg',
      category: 'Specialized',
      priceFrom: 95,
      duration: '15 min collection · 48–72 hr results',
      excerpt: 'Quantitative allergen-specific IgE blood test analyzing 45 common foods, dairy, tree nuts, grasses, molds, and pet danders without skin pricks.',
      bullets: ['45 Specific Food & Inhalant IgE Panels', 'Total Serum IgE Quantitative Level', 'Nut, Dairy, Wheat, Seafood & Egg Antibodies', 'Quantitative Class Grading (Class 0 to Class VI)'],
      fasting: 'No fasting required',
      sampleType: 'Serum / SST Gold Top',
      turnaround: '48–72 Hours',
      description: [
        'Unlike skin-prick testing which can cause uncomfortable reactions, the VenaCare In Vitro Allergy Panel uses a single blood sample to quantify allergen-specific Immunoglobulin E (IgE) antibodies against 45 common allergens.',
        'Covers major food allergens (milk, egg white/yolk, peanut, tree nuts, wheat, soy, shrimp, codfish) and inhalant allergens (dust mites, cat/dog dander, timothy grass, ragweed, alternaria mold).',
        'Results are presented in an easy-to-read color-coded PDF report with quantitative Class 0 (absent) to Class VI (extremely high) rankings.'
      ],
      features: [
        { icon: 'bi-shield-check', title: 'Zero Skin Irritation', text: 'No uncomfortable itching, scratching, or risk of anaphylactic skin reaction.' },
        { icon: 'bi-capsule-pill', title: 'No Antihistamine Cessation', text: 'You do not need to stop taking allergy medications prior to this blood draw.' },
        { icon: 'bi-grid-3x3-gap-fill', title: '45 Specific Allergens', text: 'Broad screen covering both dietary foods and respiratory inhalants.' },
        { icon: 'bi-house-check', title: 'Child & Adult Friendly', text: 'Single gentle venipuncture at home; gentle pediatric phlebotomists available.' }
      ],
      tiers: [
        {
          name: 'Core 45-Allergen Panel', price: 95, per: 'per test', featured: true,
          desc: 'Complete quantitative IgE food & inhalant panel.',
          features: ['45 specific allergen antibodies', 'Total IgE level', 'Class 0–VI severity grading', 'Food avoidance guideline', 'Free at-home phlebotomy visit']
        }
      ],
      faqs: [
        { q: 'Do I have to stop antihistamines before this blood test?', a: 'No! Unlike skin-prick tests, blood IgE testing is not influenced by antihistamines, steroids, or allergy sprays.' }
      ],
      stats: [{ value: '45', label: 'Allergens tested' }, { value: '0', label: 'Skin discomfort' }, { value: 'Class 0–VI', label: 'Grading scale' }],
      related: ['autoimmune-ana', 'comprehensive-vitality', 'cbc-panel']
    },
    {
      id: 'vitamin-deficiency',
      title: 'Vitamin D & Micronutrient Deficiency Panel',
      kicker: 'Specialized Blood Test',
      icon: 'bi-sun',
      image: 'assets/img/service-screening.svg',
      category: 'Specialized',
      priceFrom: 69,
      duration: '15 min collection · 24–48 hr results',
      excerpt: 'Evaluates bone density, immune response, and cellular metabolism via 25-Hydroxy Vitamin D, Vitamin B12, Serum Folate, and Ferritin stores.',
      bullets: ['Vitamin D 25-Hydroxy (25-OH Total)', 'Active Vitamin B12 (Cobalamin)', 'Serum Folate (Vitamin B9)', 'Serum Ferritin (Stored Iron)'],
      fasting: 'Fasting optional (preferred for iron/ferritin)',
      sampleType: 'Serum / SST Gold Top (Light protected)',
      turnaround: '24–48 Hours',
      description: [
        'Micronutrient deficiencies are remarkably prevalent due to indoor lifestyles, dietary restrictions, and malabsorption. This panel evaluates the four most vital vitamins and minerals that control cellular energy, immunity, and bone integrity.',
        'Quantifies Vitamin D 25-OH to evaluate immune protection and calcium absorption, Vitamin B12 and Folate for red blood cell synthesis and neurological nerve function, and Ferritin to detect hidden iron deficiency before anemia appears.',
        'Samples are protected from light and maintained at regulated temperatures during home-to-lab cold-chain transport.'
      ],
      features: [
        { icon: 'bi-sun-fill', title: 'Immune & Bone Health', text: 'Precision 25-OH Vitamin D assay for bone density and seasonal wellness.' },
        { icon: 'bi-lightning-charge', title: 'Nerve & Energy Support', text: 'B12 and Folate levels for cognitive clarity and myelin sheath maintenance.' },
        { icon: 'bi-box-seam', title: 'True Iron Reserves', text: 'Ferritin measures deep bone marrow iron reserves, not just temporary serum iron.' },
        { icon: 'bi-house-check', title: 'At-Home Phlebotomy', text: 'Convenient draw at your dining table with specimen light-protection tubes.' }
      ],
      tiers: [
        {
          name: 'Core Micronutrient Panel', price: 69, per: 'per test', featured: true,
          desc: 'Vitamin D, Vitamin B12, Folate, and Ferritin.',
          features: ['25-OH Vitamin D Total', 'Vitamin B12 Cobalamin', 'Serum Folate', 'Serum Ferritin', 'Free at-home sample collection', 'Portal PDF report']
        }
      ],
      faqs: [
        { q: 'What is the optimal range for Vitamin D?', a: 'Clinical guidelines consider 30 to 100 ng/mL sufficient, while many integrative physicians recommend maintaining 40 to 60 ng/mL for optimal immunological function.' }
      ],
      stats: [{ value: '4', label: 'Essential vitamins' }, { value: '24–48 hrs', label: 'Turnaround' }, { value: '100%', label: 'Free home draw' }],
      related: ['cbc-panel', 'comprehensive-vitality', 'executive-advanced']
    },
    {
      id: 'autoimmune-ana',
      title: 'Autoimmune Screen & ANA with Reflex Panel',
      kicker: 'Specialized Blood Test',
      icon: 'bi-shield-shaded',
      image: 'assets/img/service-screening.svg',
      category: 'Specialized',
      priceFrom: 85,
      duration: '15 min collection · 48–72 hr results',
      excerpt: 'Comprehensive autoimmune screening including Antinuclear Antibodies (ANA) by IFA with reflex titer and Rheumatoid Factor (RF).',
      bullets: ['Antinuclear Antibodies (ANA) by IFA', 'Rheumatoid Factor (RF) Quantitative', 'Erythrocyte Sedimentation Rate (ESR)', 'Automatic Reflex to Specific ENA Antibodies'],
      fasting: 'No fasting required',
      sampleType: 'Serum / SST Gold Top',
      turnaround: '48–72 Hours',
      description: [
        'Autoimmune diseases occur when the immune system mistakenly attacks healthy cells. The gold-standard initial evaluation is the Antinuclear Antibody (ANA) screen performed via Indirect Immunofluorescence (IFA).',
        'If the ANA screen is positive, the laboratory automatically reflexes to identify specific staining patterns and titers, and screens for secondary antibodies associated with Lupus (anti-dsDNA), Sjogren’s (SSA/SSB), Scleroderma, and Mixed Connective Tissue Disease.',
        'Paired with Rheumatoid Factor and ESR inflammation markers for comprehensive joint and tissue assessment.'
      ],
      features: [
        { icon: 'bi-search', title: 'IFA Gold Standard', text: 'Performed using gold-standard immunofluorescence for maximum clinical accuracy.' },
        { icon: 'bi-arrow-repeat', title: 'Reflex Cascade', text: 'Positive screens automatically cascade to identify exact antibody subtypes.' },
        { icon: 'bi-activity', title: 'Systemic Inflammation', text: 'Includes Erythrocyte Sedimentation Rate (ESR) and Rheumatoid Factor.' },
        { icon: 'bi-house-check', title: 'Comfortable At-Home Draw', text: 'Gentle collection without long hospital clinic commutes.' }
      ],
      tiers: [
        {
          name: 'Autoimmune & ANA Panel', price: 85, per: 'per test', featured: true,
          desc: 'ANA by IFA, Rheumatoid Factor, and ESR inflammation.',
          features: ['ANA IFA screening & titer', 'Rheumatoid Factor', 'ESR sedimentation rate', 'Automatic ENA reflex if positive', 'Free home phlebotomy']
        }
      ],
      faqs: [
        { q: 'What does a positive ANA test mean?', a: 'A positive ANA test indicates the presence of antinuclear antibodies, but does not diagnose a specific disease by itself. It is correlated with clinical symptoms and specific reflex antibody panels by your physician.' }
      ],
      stats: [{ value: 'IFA', label: 'Gold standard' }, { value: '48–72 hrs', label: 'Turnaround' }, { value: '11', label: 'Reflex antigens' }],
      related: ['cardiac-crp', 'allergy-ige', 'executive-advanced']
    },
    {
      id: 'oncology-markers',
      title: 'Clinical Tumor Biomarkers Screen',
      kicker: 'Specialized Blood Test',
      icon: 'bi-search-heart',
      image: 'assets/img/service-screening.svg',
      category: 'Specialized',
      priceFrom: 110,
      duration: '15 min collection · 48–72 hr results',
      excerpt: 'Serum tumor biomarker detection used in clinical monitoring and oncological risk screening (PSA, CEA, CA-125, AFP).',
      bullets: ['Total & Free PSA (Prostate Screen for Men)', 'CA-125 (Ovarian Biomarker for Women)', 'Carcinoembryonic Antigen (CEA)', 'Alpha-Fetoprotein (AFP) & CA 19-9'],
      fasting: 'No fasting required',
      sampleType: 'Serum / SST Gold Top',
      turnaround: '48–72 Hours',
      description: [
        'Tumor markers are biological substances produced by tumor cells or normal cells in response to oncological conditions. This specialized panel measures circulating serum proteins utilized in routine risk surveillance and treatment monitoring.',
        'Offers gender-specific profiles: Total and Free PSA for prostate health in men; CA-125 for gynecological monitoring in women; alongside CEA (colon and gastrointestinal) and AFP (liver/germ cell).',
        'Handled with utmost clinical confidentiality, cold-chain preservation, and detailed physician-reviewed reports.'
      ],
      features: [
        { icon: 'bi-gender-male', title: 'Prostate Health (PSA)', text: 'Total PSA and Free PSA percentage to differentiate BPH from malignant risk.' },
        { icon: 'bi-gender-female', title: 'CA-125 Biomarker', text: 'Serum monitoring for ovarian tissue activity and pelvic surveillance.' },
        { icon: 'bi-eye', title: 'GI Markers (CEA & CA 19-9)', text: 'Carcinoembryonic antigen and pancreatic-biliary screening indicators.' },
        { icon: 'bi-house-check', title: 'Discreet Home Phlebotomy', text: 'Private, confidential sample collection at your residence.' }
      ],
      tiers: [
        {
          name: 'Tumor Biomarker Panel', price: 110, per: 'per test', featured: true,
          desc: 'Targeted oncological biomarker profile (Male or Female).',
          features: ['PSA (Men) or CA-125 (Women)', 'CEA General Marker', 'AFP Biomarker', 'CA 19-9 GI Marker', 'Free home collection', 'Doctor-reviewed report']
        }
      ],
      faqs: [
        { q: 'Are tumor markers diagnostic of cancer on their own?', a: 'No. Elevated tumor markers can occur in benign conditions (such as inflammation or benign prostatic hyperplasia). They are screening and monitoring aids that must be evaluated alongside clinical imaging and medical examination.' }
      ],
      stats: [{ value: '4', label: 'Biomarkers' }, { value: '48–72 hrs', label: 'Turnaround' }, { value: '100%', label: 'Confidential' }],
      related: ['cmp-metabolic', 'cbc-panel', 'executive-advanced']
    },

    /* PREVENTIVE PACKAGES */
    {
      id: 'essential-wellness',
      title: 'Essential Routine Wellness Package',
      kicker: 'Preventive Package',
      icon: 'bi-clipboard2-check',
      image: 'assets/img/service-screening.svg',
      category: 'Packages',
      priceFrom: 49,
      duration: '15 min collection · 24 hr results',
      excerpt: 'Core preventive checkup combining Complete Blood Count (CBC), Complete Lipid Profile, Fasting Blood Glucose, and Kidney Screen in one convenient home visit.',
      bullets: [
        'Complete Blood Count with Differential (16 parameters)',
        'Full Lipid & Cholesterol Profile (5 parameters)',
        'Fasting Blood Glucose Diabetes Check',
        'Kidney Function Screen (BUN & Serum Creatinine)'
      ],
      fasting: '10–12 hours fasting required',
      sampleType: 'Whole Blood & Serum',
      turnaround: '24 Hours',
      description: [
        'The Essential Routine Wellness Package is designed as your annual preventive health baseline. It bundles the four most critical routine panels into a single, affordable blood collection.',
        'Detects hidden anemia, early cholesterol abnormalities, silent blood sugar elevations, and kidney filtration stress long before outward symptoms develop.',
        'Includes complimentary at-home phlebotomist collection. Relax at home while a certified professional takes care of everything.'
      ],
      features: [
        { icon: 'bi-check2-circle', title: '24 Essential Biomarkers', text: 'Covers red blood cells, white blood cells, platelets, cholesterol, glucose, and kidneys.' },
        { icon: 'bi-piggy-bank', title: '55% Bundle Savings', text: 'Saves over half the cost of booking individual tests separately.' },
        { icon: 'bi-house-heart', title: 'Free Home Collection', text: 'Zero travel, zero waiting rooms, and certified phlebotomy at your doorstep.' },
        { icon: 'bi-file-earmark-medical', title: 'Easy-to-Read Report', text: 'Interactive digital results and downloadable PDF report on your Patient Portal.' }
      ],
      tiers: [
        {
          name: 'Essential Wellness', price: 49, per: 'package', featured: true,
          desc: 'Annual preventive blood test package.',
          features: ['Complete Blood Count (CBC)', 'Lipid & Cholesterol Profile', 'Fasting Blood Glucose', 'Kidney Filtration Screen', 'Free at-home sample collection', 'Portal PDF report within 24 hrs']
        }
      ],
      faqs: [
        { q: 'How often should I get the Essential Wellness Package?', a: 'Healthy adults aged 18 to 65 are recommended to complete an essential blood screening once a year to catch emerging metabolic trends early.' }
      ],
      stats: [{ value: '24', label: 'Biomarkers' }, { value: '24 hrs', label: 'Turnaround' }, { value: '$49', label: 'Total cost' }],
      related: ['comprehensive-vitality', 'cbc-panel', 'lipid-profile']
    },
    {
      id: 'comprehensive-vitality',
      title: 'Comprehensive Metabolic & Vitality Panel',
      kicker: 'Most Popular Package',
      icon: 'bi-gem',
      image: 'assets/img/service-screening.svg',
      category: 'Packages',
      priceFrom: 119,
      duration: '20 min collection · 24–48 hr results',
      excerpt: 'Our flagship 52-parameter health panel: CBC, CMP-14, Lipid Profile, HbA1c, Thyroid (TSH), Vitamin D 25-OH, and Liver/Kidney functions with free at-home collection.',
      bullets: [
        '52 Clinical Diagnostic Biomarkers',
        'Includes Complete CMP-14 & Lipid Profile',
        'Thyroid TSH & HbA1c 90-Day Glucose',
        'Vitamin D 25-Hydroxy & Free Home Phlebotomy Visit'
      ],
      fasting: '10–12 hours fasting required (morning)',
      sampleType: 'Whole Blood & Serum',
      turnaround: '24–48 Hours',
      description: [
        'Our most frequently booked package by patients, physicians, and health-conscious individuals. The Comprehensive Metabolic & Vitality Panel delivers a 360-degree diagnostic view of your physiology.',
        'Combines Complete Blood Count, Complete Metabolic Panel (liver, kidneys, electrolytes, calcium), full Lipid profile, HbA1c diabetes screen, Thyroid TSH for metabolic rate, and Vitamin D 25-OH for bone and immune health.',
        'Includes complimentary at-home sample collection by a senior licensed phlebotomist and doctor-reviewed reports on the Patient Portal within 24 to 48 hours.'
      ],
      features: [
        { icon: 'bi-gem-fill', title: '52 Diagnostic Biomarkers', text: 'Full systemic review: hematology, hepatic, renal, cardiac, thyroid, glucose, and vitamin D.' },
        { icon: 'bi-star-fill', title: 'Free Home Collection', text: 'Complimentary priority morning home phlebotomist visit included.' },
        { icon: 'bi-file-earmark-check-fill', title: 'Physician Review', text: 'Every parameter reviewed and flagged against clinical reference ranges.' },
        { icon: 'bi-phone', title: 'Longitudinal Tracking', text: 'Your Patient Portal charts trends across your past and future collections.' }
      ],
      tiers: [
        {
          name: 'Comprehensive Vitality', price: 119, per: 'package', featured: true,
          desc: 'Flagship 52-parameter clinical wellness panel.',
          features: [
            'All 52 diagnostic biomarkers',
            'CBC with Differential',
            'Comprehensive Metabolic Panel (CMP-14)',
            'Complete Lipid Profile',
            'HbA1c & Fasting Glucose',
            'Thyroid TSH Ultra-Sensitive',
            'Vitamin D 25-Hydroxy',
            'Complimentary At-Home Phlebotomist Visit',
            'Doctor-Reviewed Portal PDF Report'
          ]
        }
      ],
      faqs: [
        { q: 'Is the home phlebotomist visit free with this package?', a: 'Yes! The Comprehensive Metabolic & Vitality Panel includes complimentary at-home phlebotomist collection with zero mobile fees.' }
      ],
      stats: [{ value: '52', label: 'Biomarkers' }, { value: '24–48 hrs', label: 'Turnaround' }, { value: '$0', label: 'Home visit fee' }],
      related: ['essential-wellness', 'executive-advanced', 'thyroid-panel']
    },
  ];

  /* ------------------------------------------------------------- TEST CATALOG */
  /* Used for interactive A-to-Z directory on the Pricing page */
  var testCatalog = [
    { code: 'CBC-01', name: 'Complete Blood Count (CBC) with Differential', category: 'Routine', sample: 'Blood (EDTA)', fasting: 'No fasting', turnaround: '24 hrs', price: 24 },
    { code: 'CMP-14', name: 'Comprehensive Metabolic Panel (CMP-14)', category: 'Routine', sample: 'Blood (SST)', fasting: '10–12 hrs', turnaround: '24 hrs', price: 34 },
    { code: 'LIP-01', name: 'Lipid & Cholesterol Profile (Total, HDL, LDL, Triglycerides)', category: 'Routine', sample: 'Blood (SST)', fasting: '9–12 hrs', turnaround: '24 hrs', price: 29 },
    { code: 'GLU-02', name: 'HbA1c & Fasting Plasma Glucose', category: 'Routine', sample: 'Blood (Lavender)', fasting: '8–10 hrs', turnaround: '24 hrs', price: 28 },
    { code: 'THY-01', name: 'Thyroid Function Panel (TSH, Free T4, Free T3)', category: 'Routine', sample: 'Blood (SST)', fasting: 'No fasting', turnaround: '24–48 hrs', price: 39 },
    { code: 'REN-01', name: 'Renal (Kidney) Function Panel (BUN, Creatinine, eGFR)', category: 'Routine', sample: 'Blood (SST)', fasting: '8–10 hrs', turnaround: '24 hrs', price: 32 },
    { code: 'HEP-01', name: 'Hepatic (Liver) Function Panel (ALT, AST, ALP, Bilirubin, Albumin)', category: 'Routine', sample: 'Blood (SST)', fasting: '8–10 hrs', turnaround: '24 hrs', price: 32 },
    { code: 'URI-01', name: 'Routine Clinical Urinalysis with Microscopic Exam', category: 'Routine', sample: 'Urine Cup', fasting: 'No fasting', turnaround: '24 hrs', price: 22 },
    { code: 'CRP-01', name: 'High-Sensitivity C-Reactive Protein (hs-CRP)', category: 'Specialized', sample: 'Blood (SST)', fasting: 'No fasting', turnaround: '24–48 hrs', price: 42 },
    { code: 'APOB-1', name: 'Apolipoprotein B (ApoB) & Lp(a) Cardiovascular Risk', category: 'Specialized', sample: 'Blood (SST)', fasting: '9–12 hrs', turnaround: '48 hrs', price: 58 },
    { code: 'HOR-01', name: 'Comprehensive Hormone Panel (Testosterone, Estradiol, DHEA-S, Cortisol)', category: 'Specialized', sample: 'Blood (SST)', fasting: 'Morning (7–10 AM)', turnaround: '48 hrs', price: 79 },
    { code: 'VIT-D',  name: 'Vitamin D 25-Hydroxy (25-OH Total)', category: 'Specialized', sample: 'Blood (SST)', fasting: 'No fasting', turnaround: '24–48 hrs', price: 45 },
    { code: 'VIT-B',  name: 'Vitamin B12 (Cobalamin) & Serum Folate', category: 'Specialized', sample: 'Blood (SST)', fasting: 'Fasting optional', turnaround: '24–48 hrs', price: 42 },
    { code: 'FER-01', name: 'Ferritin & Iron Deficiency Panel (TIBC, Transferrin Saturation)', category: 'Specialized', sample: 'Blood (SST)', fasting: '8–10 hrs', turnaround: '24 hrs', price: 38 },
    { code: 'ALL-45', name: 'Food & Environmental Allergy IgE 45-Antigen Screen', category: 'Specialized', sample: 'Blood (SST)', fasting: 'No fasting', turnaround: '48–72 hrs', price: 95 },
    { code: 'ANA-01', name: 'Autoimmune Screen & ANA by IFA with Reflex Cascade', category: 'Specialized', sample: 'Blood (SST)', fasting: 'No fasting', turnaround: '48–72 hrs', price: 85 },
    { code: 'TUM-01', name: 'Tumor Biomarkers Screen (PSA / CA-125, CEA, AFP, CA 19-9)', category: 'Specialized', sample: 'Blood (SST)', fasting: 'No fasting', turnaround: '48–72 hrs', price: 110 },
    { code: 'CEL-01', name: 'Celiac Disease Comprehensive Panel (tTG-IgA & Total Serum IgA)', category: 'Specialized', sample: 'Blood (SST)', fasting: 'No fasting', turnaround: '48 hrs', price: 68 },
    { code: 'PKG-01', name: 'Essential Routine Wellness Package (CBC + Lipids + Glucose + Kidneys)', category: 'Packages', sample: 'Blood (Combo)', fasting: '10–12 hrs', turnaround: '24 hrs', price: 49 },
    { code: 'PKG-02', name: 'Comprehensive Metabolic & Vitality Panel (52 Biomarkers)', category: 'Packages', sample: 'Blood (Combo)', fasting: '10–12 hrs', turnaround: '24–48 hrs', price: 119 },
    { code: 'PKG-03', name: 'Executive Specialized Diagnostic Profile (78 Biomarkers)', category: 'Packages', sample: 'Blood (Combo)', fasting: '10–12 hrs', turnaround: '48 hrs', price: 229 }
  ];

  /* ----------------------------------------------------------- TESTIMONIALS */
  var testimonials = [
    {
      quote: 'Having a phlebotomist come to my apartment at 7:30 AM made my annual fasting blood tests effortless. Sarah was gentle, arrived on time, and I had my certified PDF reports in my patient portal the next afternoon.',
      name: 'Elena Rostova',
      role: 'Routine Patient · Metro City',
      img: 'assets/img/team-2.svg',
      rating: 5
    },
    {
      quote: 'My mother is elderly and going to diagnostic clinics is exhausting for her. VenaCare phlebotomist handled her blood draw with immense patience and skill. Accessing her lab reports on the patient portal was seamless.',
      name: 'Marcus Vance',
      role: 'Caregiver · Riverside District',
      img: 'assets/img/team-4.svg',
      rating: 5
    },
    {
      quote: 'The Comprehensive Vitality Panel uncovered my subclinical thyroid imbalance and low Vitamin D. Transparent pricing, zero hidden fees, and at-home collection made this the most convenient lab experience I have ever had.',
      name: 'Dr. Rachel Patel',
      role: 'Healthcare Professional · Northgate',
      img: 'assets/img/team-1.svg',
      rating: 5
    },
    {
      quote: 'I logged into the patient portal right before my doctor appointment and had all my routine CBC and lipid panels ready to share. The longitudinal biomarker comparison is fantastic.',
      name: 'David Zhao',
      role: 'Executive Patient · Central Plaza',
      img: 'assets/img/team-3.svg',
      rating: 5
    }
  ];

  /* ---------------------------------------------------------------- ARTICLES */
  var posts = [
    {
      id: 'fasting-guide',
      title: 'How to Prepare for a Fasting Blood Test: Complete Clinical Guide',
      category: 'Patient Guidance',
      tags: ['fasting', 'lab-prep', 'patient-care'],
      author: 'Dr. Aisha Kapoor',
      authorRole: 'Medical Director, VenaCare',
      authorImg: 'assets/img/team-1.svg',
      date: '2026-09-28',
      readTime: '6 min read',
      image: 'assets/img/blog-1.svg',
      excerpt: 'Everything you need to know before your at-home blood collection: why water is permitted, medications to mention, and how fasting ensures accurate clinical numbers.',
      body:
        '<p>Fasting before a blood test can feel inconvenient, but it is the cornerstone of clinical diagnostic accuracy. When you eat, food is broken down into glucose, lipids, and amino acids that temporarily flood your bloodstream. Without fasting, your numbers reflect your breakfast rather than your true baseline physiology.</p>' +
        '<h2 id="water-is-allowed">Myth: You cannot drink water while fasting</h2>' +
        '<p>You can — and should — drink plenty of plain water before your blood draw. Good hydration expands your blood volume and makes your veins visibly plumper and easier to access, resulting in a quicker, gentler venipuncture. Just steer clear of sparkling water with flavorings, lemon slices, coffee, or tea.</p>' +
        '<h2 id="which-tests-require-fasting">Which blood tests require fasting?</h2>' +
        '<ul>' +
        '<li><strong>Fasting Blood Glucose & Comprehensive Metabolic Panel (CMP):</strong> 10–12 hours.</li>' +
        '<li><strong>Lipid & Cholesterol Profile:</strong> 9–12 hours for baseline triglycerides and LDL.</li>' +
        '<li><strong>Renal & Iron Panels:</strong> 8–10 hours for stable serum iron reserves.</li>' +
        '<li><strong>Complete Blood Count (CBC) & Thyroid Panel:</strong> Generally no fasting required.</li>' +
        '</ul>' +
        '<h2 id="morning-advantage">The At-Home Morning Advantage</h2>' +
        '<p>Booking an early morning at-home sample collection (between 7:00 AM and 9:00 AM) means 90% of your fasting window happens while you sleep. Our certified phlebotomist arrives, completes the gentle draw in 10 minutes, and you can enjoy your morning coffee and meal right in your own kitchen.</p>',
      takeaways: ['Drink plain water to keep veins hydrated', 'Fast 10–12 hours for glucose and lipid panels', 'Morning at-home collection minimizes awake fasting time', 'Inform your phlebotomist about prescription medications'],
      related: ['home-collection-safety', 'understanding-cbc-cmp']
    },
    {
      id: 'routine-vs-specialized',
      title: 'Routine vs. Specialized Blood Tests: What Does Your Doctor Look For?',
      category: 'Diagnostic Insights',
      tags: ['blood-tests', 'routine', 'specialized'],
      author: 'Dr. Rohan Mehta',
      authorRole: 'Senior Clinical Pathologist',
      authorImg: 'assets/img/team-3.svg',
      date: '2026-09-14',
      readTime: '7 min read',
      image: 'assets/img/blog-2.svg',
      excerpt: 'Understand the difference between broad baseline screening panels (CBC, CMP, Lipids) and targeted specialized diagnostic investigations (hs-CRP, Hormones, IgE).',
      body:
        '<p>When ordering laboratory tests, physicians categorize investigations into routine screenings and specialized clinical assays. Understanding the distinction helps you make informed choices about your preventive health checkups.</p>' +
        '<h2 id="routine-tests">Routine Baseline Screenings</h2>' +
        '<p>Routine tests examine the foundational pillars of health. A Complete Blood Count (CBC) examines oxygenation and immune cells; a Comprehensive Metabolic Panel (CMP) tracks kidney filtration, liver enzymes, and electrolytes; and a Lipid Profile monitors cardiovascular cholesterol markers. These should be reviewed annually by every adult.</p>' +
        '<h2 id="specialized-investigations">Specialized Diagnostic Investigations</h2>' +
        '<p>Specialized blood tests dig deeper into specific symptoms or elevated risk factors. High-sensitivity C-reactive protein (hs-CRP) uncovers microscopic arterial inflammation; thyroid panels (TSH, Free T4/T3) evaluate subtle endocrine sluggishness; and quantitative IgE panels detect specific allergen triggers.</p>',
      takeaways: ['Routine tests provide essential annual baseline health data', 'Specialized tests target hormones, inflammation, and autoimmune markers', 'Both can be drawn in a single at-home phlebotomy visit', 'Access historical comparisons through the patient portal'],
      related: ['fasting-guide', 'understanding-cbc-cmp']
    },
    {
      id: 'home-collection-safety',
      title: 'Behind the Scenes: How Cold-Chain Logistics Keep At-Home Blood Samples Sterile & Accurate',
      category: 'Laboratory Standards',
      tags: ['cold-chain', 'phlebotomy', 'lab-safety'],
      author: 'Dr. Aisha Kapoor',
      authorRole: 'Medical Director, VenaCare',
      authorImg: 'assets/img/team-1.svg',
      date: '2026-08-30',
      readTime: '5 min read',
      image: 'assets/img/blog-3.svg',
      excerpt: 'From single-use safety needles to temperature-calibrated specimen carriers, here is how VenaCare preserves diagnostic precision from your home to accredited labs.',
      body:
        '<p>Many patients wonder: does an at-home blood collection offer the exact same clinical accuracy as a draw done in a major hospital laboratory? The answer is an unequivocal yes — when certified phlebotomists follow rigorous chain-of-custody and cold-chain protocols.</p>' +
        '<h2 id="sterile-kits">100% Single-Use Vacuum Technology</h2>' +
        '<p>Our phlebotomists open sealed, sterile collection tubes and micro-needles right before your eyes. Single-use vacuum tubes draw the exact required specimen volume automatically, eliminating hemolysis and contamination risks.</p>' +
        '<h2 id="cold-chain-tracking">Digital Cold-Chain Monitoring</h2>' +
        '<p>Immediately following collection, samples are labeled with unique encrypted barcodes and placed in calibrated thermal carriers maintained at 2°C to 8°C. Data loggers verify that temperatures never fluctuate during transit to our CLIA/CAP accredited partner laboratories.</p>',
      takeaways: ['Specimen accuracy equals hospital standards', 'Cold-chain transport preserves enzyme and cell integrity', 'Every tube is uniquely barcoded to prevent mislabeling', 'Doctor-reviewed results appear directly in your patient portal'],
      related: ['fasting-guide', 'routine-vs-specialized']
    }
  ];

  /* -------------------------------------------------------------------- TEAM */
  var team = [
    { name: 'Dr. Aisha Kapoor', role: 'Medical Director & Clinical Pathologist', img: 'assets/img/team-1.svg', bio: 'Board-certified pathologist with 16 years leading accredited diagnostic laboratories and mobile phlebotomy operations.', socials: ['linkedin', 'x-twitter'] },
    { name: 'Sara Muller', role: 'Head of Phlebotomy Services & Quality Control', img: 'assets/img/team-2.svg', bio: 'Oversees our network of 250+ licensed phlebotomists, enforcing CLSI standards, sterile protocols, and patient comfort.', socials: ['instagram', 'linkedin'] },
    { name: 'Dr. Rohan Mehta', role: 'Senior Consultant in Endocrinology & Diagnostics', img: 'assets/img/team-3.svg', bio: 'Specializes in metabolic biomarkers, hormonal profiles, and preventive wellness diagnostic panels.', socials: ['linkedin', 'x-twitter'] },
    { name: 'Nikhil Daran', role: 'Director of Cold-Chain & Lab Logistics', img: 'assets/img/team-4.svg', bio: 'Engineered VenaCare’s real-time cold-chain tracking system, ensuring 99.8% specimen integrity from doorstep to lab analyzer.', socials: ['x-twitter', 'instagram'] }
  ];

  /* ------------------------------------------------------------------ PRICING */
  var pricing = {
    plans: [
      {
        id: 'essential',
        name: 'Essential Routine Panel',
        monthly: 49,
        yearly: 49,
        blurb: 'Core preventive checkup: Complete Blood Count, CMP-14, Lipid Profile, and Fasting Glucose.',
        featured: false,
        cta: 'Book At-Home Draw',
        href: 'public/pages/services.html?id=essential-wellness',
        features: [
          '24 clinical biomarkers',
          'Complete Blood Count (CBC)',
          'Comprehensive Metabolic Panel (CMP)',
          'Complete Lipid & Cholesterol Panel',
          'Fasting Plasma Glucose',
          'Kidney filtration (eGFR score)',
          'Digital Patient Portal report in 24 hrs'
        ],
        missing: ['Thyroid (TSH) Panel', 'Vitamin D 25-OH', 'Hormone & Cardiac Biomarkers']
      },
      {
        id: 'comprehensive',
        name: 'Comprehensive Vitality Panel',
        monthly: 119,
        yearly: 119,
        blurb: 'Our flagship 52-parameter wellness checkup with complimentary at-home phlebotomist collection.',
        featured: true,
        cta: 'Book At-Home Draw',
        href: 'public/pages/services.html?id=comprehensive-vitality',
        features: [
          '52 clinical biomarkers',
          'Everything in Essential Panel',
          'HbA1c 90-day diabetes screen',
          'Thyroid Function (TSH Ultra-Sensitive)',
          'Vitamin D 25-Hydroxy',
          'Complete Liver & Kidney Panels',
          'FREE At-Home Phlebotomist Visit',
          'Doctor-reviewed portal PDF report in 24–48 hrs'
        ],
        missing: ['Cardiac hs-CRP', 'Complete Hormone Suite']
      },
      {
        id: 'executive',
        name: 'Executive Diagnostic Profile',
        monthly: 229,
        yearly: 229,
        blurb: 'All-inclusive 78-biomarker diagnostic profile: Comprehensive + Cardiac hs-CRP, Hormones, B12 & Ferritin.',
        featured: false,
        cta: 'Book At-Home Draw',
        href: 'public/pages/services.html?id=executive-advanced',
        features: [
          '78 comprehensive biomarkers',
          'Everything in Comprehensive Panel',
          'High-Sensitivity CRP (Cardiac Vascular)',
          'Full Male/Female Hormone & Cortisol Profile',
          'Vitamin B12, Folate & Ferritin Stores',
          'FREE VIP At-Home Phlebotomist Visit',
          'Priority 48-hr lab processing',
          'Direct physician tele-review option'
        ],
        missing: []
      }
    ],
    comparison: [
      { feature: 'Total Biomarkers', donor: '24 Parameters', organizer: '52 Parameters', hospital: '78 Parameters' },
      { feature: 'CBC & Differential', donor: 'Included', organizer: 'Included', hospital: 'Included' },
      { feature: 'CMP-14 Metabolic & Electrolytes', donor: 'Included', organizer: 'Included', hospital: 'Included' },
      { feature: 'Complete Lipid & Cholesterol', donor: 'Included', organizer: 'Included', hospital: 'Included' },
      { feature: 'HbA1c & Fasting Glucose', donor: '—', organizer: 'Included', hospital: 'Included' },
      { feature: 'Thyroid Function (TSH)', donor: '—', organizer: 'Included', hospital: 'Included' },
      { feature: 'Vitamin D 25-OH', donor: '—', organizer: 'Included', hospital: 'Included' },
      { feature: 'Cardiac hs-CRP & ApoB', donor: '—', organizer: '—', hospital: 'Included' },
      { feature: 'Hormone Panel (Testosterone / Estradiol / Cortisol)', donor: '—', organizer: '—', hospital: 'Included' },
      { feature: 'At-Home Phlebotomist Fee', donor: '$15 (or Free > $50)', organizer: 'FREE Included', hospital: 'FREE Included' },
      { feature: 'Turnaround Time', donor: '24 Hours', organizer: '24–48 Hours', hospital: '48 Hours (Priority)' },
      { feature: 'Secure Patient Portal PDF', donor: 'Yes', organizer: 'Yes (Doctor Reviewed)', hospital: 'Yes + Tele-Review' }
    ],
    faqs: [
      { q: 'How does at-home blood collection pricing work?', a: 'At-home sample collection is 100% FREE for all test packages and any individual test orders totaling $50 or more. For single test orders under $50, a nominal $15 mobile phlebotomy fee applies.' },
      { q: 'Are there any hidden lab processing or venipuncture fees?', a: 'Zero hidden fees. The price you see covers your sterile collection kit, certified phlebotomist visit, cold-chain transport, accredited laboratory analysis, and your secure Patient Portal PDF report.' },
      { q: 'Can I use my HSA or FSA card?', a: 'Yes! VenaCare diagnostic services and at-home blood tests are qualified medical expenses under HSA and FSA guidelines. You can pay with your HSA/FSA card or download an itemized receipt.' },
      { q: 'Do you bill health insurance directly?', a: 'We operate as a direct-pay diagnostic service to offer transparent upfront pricing without deductibles or surprise bills. Upon request, we provide an itemized superbill with CPT and ICD-10 codes for you to submit to your insurer for reimbursement.' },
      { q: 'Can I add individual routine tests to a package?', a: 'Absolutely. You can easily add single tests like Vitamin B12 ($42), Thyroid TSH ($39), or hs-CRP ($42) to any routine or comprehensive package during booking.' }
    ]
  };

  /* --------------------------------------------------------------------- FAQS */
  var faqs = [
    { group: 'At-Home Sample Collection', q: 'How does at-home blood collection work?', a: 'You select your desired routine or specialized blood tests online, choose a convenient date and time window (such as 7:00 AM – 9:00 AM for fasting tests), and enter your address. A licensed phlebotomist arrives with sterile single-use vacuum collection kits, performs the draw in 10–15 minutes, and safely transports your samples in cold-chain containers to our accredited partner labs.' },
    { group: 'At-Home Sample Collection', q: 'Who performs the blood draw at my home?', a: 'All draws are conducted by state-certified phlebotomists (CPT-1 licensed) with extensive clinical experience. Every professional undergoes background verification, is trained in pediatric and geriatric vein access, and follows strict CLSI infection control standards.' },
    { group: 'At-Home Sample Collection', q: 'How do I prepare for fasting blood tests at home?', a: 'Fast for 10–12 hours before your scheduled morning appointment if your tests include Glucose, Lipids, or Comprehensive Metabolic Panels. You are encouraged to drink plenty of plain water to stay hydrated, which makes veins easier to access.' },
    { group: 'At-Home Sample Collection', q: 'What happens if I need to reschedule or cancel my appointment?', a: 'You can reschedule or cancel your at-home collection appointment free of charge up to 3 hours before your scheduled window directly through your Patient Portal or by calling our lab desk.' },
    { group: 'Routine & Specialized Tests', q: 'What is the difference between routine and specialized blood tests?', a: 'Routine blood tests (such as CBC, CMP-14, Lipid Profiles, and Fasting Glucose) check broad organ function, blood counts, and metabolic baseline health. Specialized blood tests (such as Cardiac hs-CRP, Hormone Profiles, Vitamin D, Autoimmune ANA, and Food Allergy IgE) investigate specific physiological pathways, vascular inflammation, or endocrine imbalances.' },
    { group: 'Routine & Specialized Tests', q: 'Are your partner laboratories accredited?', a: 'Yes. All samples collected by VenaCare are analyzed exclusively by CAP (College of American Pathologists) accredited and CLIA (Clinical Laboratory Improvement Amendments) certified clinical diagnostic laboratories.' },
    { group: 'Routine & Specialized Tests', q: 'Can my primary care physician order tests through VenaCare?', a: 'Yes. You can either order tests independently for personal wellness tracking, or upload a prescription/lab requisition order from your physician. We will ensure the exact tests specified are drawn and delivered.' },
    { group: 'Patient Portal & Reports', q: 'How do I access my lab test results?', a: 'Once your samples are analyzed and reviewed by a clinical pathologist, you receive an instant SMS and email alert. Simply log in to the Patient Portal to view interactive biomarker summaries and download your official, encrypted PDF lab report.' },
    { group: 'Patient Portal & Reports', q: 'How quickly are test results available on the portal?', a: 'Most routine blood tests (CBC, CMP, Lipids, Glucose) are available within 24 hours. Specialized tests (Hormone profiles, Allergy IgE, Autoimmune screens) are typically ready within 24 to 48 hours.' },
    { group: 'Patient Portal & Reports', q: 'Can I share my lab reports with my doctor?', a: 'Yes. Your Patient Portal allows you to download certified PDF reports or generate a secure, temporary doctor-share link with one click.' },
    { group: 'Patient Portal & Reports', q: 'Is my medical and health data private and secure?', a: 'Absolutely. VenaCare is fully HIPAA-compliant. All health records, test orders, and laboratory reports are encrypted with 256-bit AES encryption at rest and in transit. Your data is never sold or shared.' }
  ];

  /* ----------------------------------------------------------- PATIENT PORTAL */
  /* Mock data for Patient Portal Dashboard */
  var patientProfile = {
    name: 'Jordan Diaz',
    id: 'VC-849201',
    dob: '1988-04-12',
    gender: 'Male',
    bloodGroup: 'O+',
    email: 'patient@venacare.com',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace, Metro City',
    primaryDoctor: 'Dr. Sarah Lin, MD (Internal Medicine)'
  };

  var patientAppointments = [
    {
      id: 'APT-9102',
      service: 'Comprehensive Metabolic & Thyroid Panel',
      tests: ['CMP-14', 'TSH Ultra-Sensitive', 'Free T4'],
      date: 'Tomorrow, Oct 9, 2026',
      timeSlot: '8:30 AM – 9:00 AM (Morning Fasting)',
      address: '742 Evergreen Terrace, Metro City',
      phlebotomist: 'Sarah Jenkins, CPT-1 (License #PHL-44910)',
      status: 'Confirmed & Dispatched',
      fastingHours: 10,
      notes: 'Water only from 10:30 PM tonight. Phlebotomist will call 15 mins prior.'
    },
    {
      id: 'APT-8740',
      service: 'Routine Wellness Follow-Up Draw',
      tests: ['Complete Blood Count (CBC)', 'Lipid Profile'],
      date: 'Aug 14, 2026',
      timeSlot: '7:45 AM – 8:15 AM',
      address: '742 Evergreen Terrace, Metro City',
      phlebotomist: 'David Miller, CPT-1',
      status: 'Completed',
      fastingHours: 10,
      notes: 'Sample delivered to CLIA lab. Completed without issue.'
    }
  ];

  var patientReports = [
    {
      id: 'REP-4819',
      title: 'Lipid & Cholesterol Profile',
      category: 'Routine',
      date: '2026-09-15',
      doctor: 'Dr. Aisha Kapoor, MD',
      lab: 'VenaCare Central Diagnostic Lab #CLIA-05D99',
      status: 'Normal',
      summary: 'Total Cholesterol 185 mg/dL (Desirable), HDL 54 mg/dL, LDL 108 mg/dL, Triglycerides 115 mg/dL.',
      pdfUrl: '#download-report-lipids'
    },
    {
      id: 'REP-4818',
      title: 'Comprehensive Metabolic Panel (CMP-14)',
      category: 'Routine',
      date: '2026-09-15',
      doctor: 'Dr. Aisha Kapoor, MD',
      lab: 'VenaCare Central Diagnostic Lab #CLIA-05D99',
      status: 'Normal',
      summary: 'Fasting Glucose 88 mg/dL, BUN 14 mg/dL, Creatinine 0.9 mg/dL (eGFR > 90), Electrolytes balanced, Liver enzymes optimal.',
      pdfUrl: '#download-report-cmp'
    },
    {
      id: 'REP-4817',
      title: 'Complete Blood Count (CBC) with Differential',
      category: 'Routine',
      date: '2026-09-15',
      doctor: 'Dr. Aisha Kapoor, MD',
      lab: 'VenaCare Central Diagnostic Lab #CLIA-05D99',
      status: 'Normal',
      summary: 'WBC 6.4 x10³/µL, RBC 4.85 x10⁶/µL, Hemoglobin 15.2 g/dL, Hematocrit 44.8%, Platelets 245 x10³/µL.',
      pdfUrl: '#download-report-cbc'
    },
    {
      id: 'REP-3920',
      title: 'Vitamin D 25-Hydroxy & Ferritin Screen',
      category: 'Specialized',
      date: '2026-06-20',
      doctor: 'Dr. Rohan Mehta, MD',
      lab: 'VenaCare Central Diagnostic Lab #CLIA-05D99',
      status: 'Normal (Improved)',
      summary: 'Vitamin D 25-OH is 38 ng/mL (Optimal, up from 22 ng/mL in March). Serum Ferritin 95 ng/mL.',
      pdfUrl: '#download-report-vitd'
    }
  ];

  var patientBiomarkers = [
    { name: 'Fasting Blood Glucose', value: '88 mg/dL', target: '70–99 mg/dL', status: 'Optimal', change: '-4 mg/dL vs Mar' },
    { name: 'Total Cholesterol', value: '185 mg/dL', target: '< 200 mg/dL', status: 'Optimal', change: '-12 mg/dL vs Mar' },
    { name: 'HDL "Good" Cholesterol', value: '54 mg/dL', target: '> 40 mg/dL', status: 'Optimal', change: '+3 mg/dL vs Mar' },
    { name: 'Hemoglobin A1c (HbA1c)', value: '5.4%', target: '< 5.7%', status: 'Optimal', change: 'Stable' },
    { name: 'Vitamin D 25-Hydroxy', value: '38 ng/mL', target: '30–100 ng/mL', status: 'Optimal', change: '+16 ng/mL vs Mar' },
    { name: 'Kidney eGFR Filtration', value: '> 90 mL/min', target: '> 60 mL/min', status: 'Optimal', change: 'Normal' }
  ];

  /* Legacy compatibility maps for emergency camp features if visited */
  var camps = [
    { id: 'camp-central', title: 'Metro Central Phlebotomy Center', date: '2026-10-18', time: '7:00 AM – 3:00 PM', venue: 'Central Medical Plaza, 12 Meridian Ave', city: 'Metro City', target: 120, booked: 86, image: 'assets/img/camp-1.svg', tags: ['Walk-in Lab', 'Routine & Specialized'] },
    { id: 'camp-riverside', title: 'Riverside Community Health Check', date: '2026-11-02', time: '8:00 AM – 2:00 PM', venue: 'Riverside Diagnostic Annex', city: 'Riverside', target: 90, booked: 31, image: 'assets/img/camp-3.svg', tags: ['Wellness Check', 'At-Home Hub'] }
  ];

  var emergencyRequests = [];

  var adminStats = {
    kpis: [
      { label: 'At-Home Collections (YTD)', value: '154,290', trend: '+14.2%', dir: 'up', icon: 'bi-house-heart-fill' },
      { label: 'Routine Tests Processed', value: '342,810', trend: '+11.8%', dir: 'up', icon: 'bi-droplet-half' },
      { label: 'Specialized Panels Run', value: '68,450', trend: '+18.5%', dir: 'up', icon: 'bi-activity' },
      { label: 'Average Report Turnaround', value: '21.4 hrs', trend: '-2.1 hrs', dir: 'up', icon: 'bi-clock-history' }
    ],
    trend: [
      { label: 'Jan', value: 65 }, { label: 'Feb', value: 72 }, { label: 'Mar', value: 78 },
      { label: 'Apr', value: 81 }, { label: 'May', value: 85 }, { label: 'Jun', value: 90 },
      { label: 'Jul', value: 92 }, { label: 'Aug', value: 94 }, { label: 'Sep', value: 98 },
      { label: 'Oct', value: 95 }, { label: 'Nov', value: 97 }, { label: 'Dec', value: 100 }
    ],
    stock: [
      { group: 'Routine CBC', pct: 92, tone: 'green' },
      { group: 'CMP-14 Panels', pct: 88, tone: 'green' },
      { group: 'Lipid Profiles', pct: 84, tone: 'green' },
      { group: 'Specialized IgE', pct: 76, tone: 'blue' },
      { group: 'Hormone Suites', pct: 72, tone: 'blue' }
    ],
    camps: [],
    donors: []
  };

  /* ------------------------------------------------------------------ HELPERS */
  function getService(id) {
    for (var i = 0; i < services.length; i++) if (services[i].id === id) return services[i];
    return null;
  }
  function getPost(id) {
    for (var i = 0; i < posts.length; i++) if (posts[i].id === id) return posts[i];
    return null;
  }
  function categories() {
    var seen = {}, out = [];
    services.forEach(function (s) { if (!seen[s.category]) { seen[s.category] = 1; out.push(s.category); } });
    return out;
  }

  return {
    services: services,
    testCatalog: testCatalog,
    posts: posts,
    team: team,
    testimonials: testimonials,
    camps: camps,
    emergencyRequests: emergencyRequests,
    pricing: pricing,
    faqs: faqs,
    patientProfile: patientProfile,
    patientAppointments: patientAppointments,
    patientReports: patientReports,
    patientBiomarkers: patientBiomarkers,
    donationHistory: [],
    adminStats: adminStats,
    getService: getService,
    getPost: getPost,
    categories: categories
  };
})();
