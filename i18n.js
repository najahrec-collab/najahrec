/**
 * i18n.js - محرك الترجمة متعدد اللغات (عربي / English) لموقع مكتب النجاح للاستقدام
 * يدعم التبديل اللحظي للغة مع حفظ تفضيل الزائر والتكيف الكامل مع اتجاه الصفحة (RTL / LTR)
 */

(function () {
  "use strict";

  const STORAGE_KEY = "alnajah_lang";

  // القاموس الشامل للنصوص والترجمات
  const TRANSLATIONS = {
    ar: {
      langBtnText: "English",
      langSwitchTitle: "Switch to English",
      brandName: "مكتب النجاح",
      brandSub: "للاستقدام",
      licenseBadge: "ترخيص مساند رقم 3801328",
      topbarPhone: "055 502 1298",
      topbarEmail: "info@najahrec.sa",
      topbarHours: "الأحد — الخميس، 9 صباحًا حتى 9 مساءً",
      topbarLicense: "مكتب مرخّص ومعتمد من وزارة الموارد البشرية والتنمية الاجتماعية (ترخيص 3801328)",
      navHome: "الرئيسية",
      navAbout: "نبذة عنا",
      navServices: "خدماتنا",
      navNationalities: "الجنسيات",
      navResumes: "السير الذاتية",
      navSteps: "خطوات الاستقدام",
      navFaq: "الأسئلة الشائعة",
      navOffers: "العروض",
      navContact: "تواصل معنا",
      ctaRequest: "اطلب استقدامك الآن",
      ctaContactWa: "تواصل معنا عبر واتساب",
      ctaBrowseCv: "تصفح السير الذاتية",
      heroHomeTitle: "عمالة منزلية مدربة وموثوقة",
      heroHomeSub: "نختار لكم الأفضل... لراحة بالكم وسعادة أسرتكم",
      trustPill1: "معتمدين من وزارة الموارد البشرية (ترخيص رقم 3801328)",
      trustPill2: "ضمان واستبدال شامل وفق منصة مساند",
      trustPill3: "متابعة مستمرة على مدار الساعة",
      statExp: "سنوات خبرة في الاستقدام",
      statRecruited: "عامل تم استقدامه",
      statSatisfaction: "نسبة رضا العملاء",
      statCountries: "دولة استقدام معتمدة",
      statSupport: "فريق دعم ومتابعة على مدار الساعة",
      calcTitle: "حاسبة تكاليف الاستقدام",
      calcSub: "اختر الدولة والمهنة لمعرفة التكلفة الإجمالية والمدة المتوقعة للوصول والراتب الشهري بدقة:",
      calcCountryLabel: "الدولة المطلوبة:",
      calcJobLabel: "المهنة المطلوبة:",
      calcBaseLabel: "التكلفة الأساسية:",
      calcVatLabel: "ضريبة القيمة المضافة (15%):",
      calcTotalLabel: "الإجمالي شامل الضريبة:",
      calcSalaryLabel: "الراتب الشهري المتوقع:",
      calcTimeLabel: "المدة المتوقعة للوصول:",
      calcBtnWa: "بدء طلب الاستقدام الآن عبر واتساب",
      trackTitle: "تتبع حالة طلب الاستقدام",
      trackSub: "أدخل رقم الطلب الخاص بك للاطلاع على مراحل المعاملة والإجراءات الحكومية المنجزة:",
      trackInputPlaceholder: "أدخل رقم الطلب (مثال: NJ-2026-01)",
      trackBtn: "استعلام عن حالة الطلب",
      natStepTitle: "الخطوة الأولى: تحديد الجنسية",
      natStepSub: "اختر الجنسية المطلوبة لعرض السير الذاتية المتاحة الجاهزة للحجز الفوري وفق منصة مساند:",
      natChangeBtn: "🔄 اختيار جنسية أخرى",
      filterSearchLabel: "البحث بالاسم والمهارات",
      filterSearchPlaceholder: "اكتب اسم أو مهارة أو ديانة...",
      filterNatLabel: "الجنسية",
      filterJobLabel: "المهنة",
      filterExpLabel: "الخبرة",
      filterSortLabel: "ترتيب حسب",
      filterAllNat: "كل الجنسيات",
      filterAllJobs: "كل المهن",
      filterAllExp: "كل مستويات الخبرة",
      filterSortDefault: "الافتراضي",
      filterSortAgeAsc: "الأصغر سنًا",
      filterSortAgeDesc: "الأكبر سنًا",
      filterSortExpDesc: "الأكثر خبرة",
      cvBadgeAvail: "🟢 متاحة للاستقدام الفوري",
      cvBadgeReserved: "🔴 محجوزة لعميل آخر",
      cvBtnBookWa: "حجز السيرة عبر واتساب 💬",
      cvBtnMusaned: "طلب عبر مساند 🏛️",
      cvBtnDetails: "عرض التفاصيل الكاملة 📄",
      cvAgeLabel: "العمر:",
      cvExpLabel: "الخبرة:",
      cvSalaryLabel: "الراتب:",
      cvReligionLabel: "الديانة:",
      cvEducationLabel: "التعليم:",
      cvMaritalLabel: "الحالة:",
      cvHeightWeight: "الطول والوزن:",
      cvLanguagesLabel: "اللغات المتقنة:",
      cvSkillsLabel: "المهارات:",
      cvPrevExpLabel: "الخبرات السابقة:",
      footerAboutText: "مكتب معتمد ومرخص من وزارة الموارد البشرية والتنمية الاجتماعية (ترخيص رقم 3801328). نوفر أفضل الكفاءات والعمالة المنزلية المؤهلة لكافة مناطق المملكة وفق أعلى معايير الجودة والأمان.",
      footerQuickLinks: "روابط سريعة",
      footerServices: "خدماتنا",
      footerContact: "تواصل معنا",
      footerAddress: "المقر: الرياض، حي الملقا، طريق أنس بن مالك",
      footerRights: "جميع الحقوق محفوظة لمكتب النجاح للاستقدام © 2026 — ترخيص مساند رقم 3801328",
      securityModalTitle: "تنبيه أمني هام وتحذير من الاحتيال",
      securityModalText: "عملاؤنا الأعزاء، يرجى الحذر من أي صفحات أو أرقام غير رسمية تدّعي تمثيل مكتب النجاح للاستقدام. نؤكد أن جميع تعاملاتنا المالية تتم حصرياً عبر منصة مساند الحكومية أو الحساب البنكي الرسمي المعتمد باسم المؤسسة فقط.",
      securityModalBtn: "فهمت وأوافق"
    },
    en: {
      langBtnText: "العربية",
      langSwitchTitle: "التحويل إلى اللغة العربية",
      brandName: "Al-Najah",
      brandSub: "Recruitment",
      licenseBadge: "Musaned License #3801328",
      topbarPhone: "+966 55 502 1298",
      topbarEmail: "info@najahrec.sa",
      topbarHours: "Sun — Thu: 9:00 AM — 9:00 PM",
      topbarLicense: "Licensed & Certified by the Ministry of Human Resources (License #3801328)",
      navHome: "Home",
      navAbout: "About Us",
      navServices: "Services",
      navNationalities: "Nationalities",
      navResumes: "Resumes & CVs",
      navSteps: "Recruitment Steps",
      navFaq: "FAQ",
      navOffers: "Special Offers",
      navContact: "Contact Us",
      ctaRequest: "Apply for Recruitment",
      ctaContactWa: "WhatsApp Inquiries",
      ctaBrowseCv: "Browse Candidate CVs",
      heroHomeTitle: "Trained & Trusted Domestic Workforce",
      heroHomeSub: "Selecting the very best candidates for your peace of mind and family comfort.",
      trustPill1: "Certified by Ministry of Human Resources (Lic. #3801328)",
      trustPill2: "Comprehensive Warranty & Replacement via Musaned",
      trustPill3: "24/7 Dedicated Support & Continuous Follow-up",
      statExp: "Years of Recruitment Experience",
      statRecruited: "Domestic Workers Recruited",
      statSatisfaction: "Customer Satisfaction Rate",
      statCountries: "Approved Source Countries",
      statSupport: "Dedicated Support Team 24/7",
      calcTitle: "Recruitment Cost Calculator",
      calcSub: "Select nationality and profession to calculate total cost, expected arrival time, and monthly salary:",
      calcCountryLabel: "Target Country:",
      calcJobLabel: "Target Profession:",
      calcBaseLabel: "Base Cost:",
      calcVatLabel: "VAT (15%):",
      calcTotalLabel: "Total (including VAT):",
      calcSalaryLabel: "Expected Monthly Salary:",
      calcTimeLabel: "Estimated Arrival Time:",
      calcBtnWa: "Start Recruitment via WhatsApp Now",
      trackTitle: "Track Your Recruitment Order",
      trackSub: "Enter your order reference code to track real-time government stages and progress:",
      trackInputPlaceholder: "Enter Order Number (e.g. NJ-2026-01)",
      trackBtn: "Track Order Status",
      natStepTitle: "Step 1: Select Desired Nationality",
      natStepSub: "Choose the country you wish to recruit from to browse candidates ready for immediate booking:",
      natChangeBtn: "🔄 Change Country",
      filterSearchLabel: "Search by Name or Skills",
      filterSearchPlaceholder: "Type candidate name, skill, or religion...",
      filterNatLabel: "Nationality",
      filterJobLabel: "Profession",
      filterExpLabel: "Experience",
      filterSortLabel: "Sort By",
      filterAllNat: "All Nationalities",
      filterAllJobs: "All Professions",
      filterAllExp: "All Experience Levels",
      filterSortDefault: "Default",
      filterSortAgeAsc: "Youngest First",
      filterSortAgeDesc: "Oldest First",
      filterSortExpDesc: "Most Experienced",
      cvBadgeAvail: "🟢 Available for Immediate Booking",
      cvBadgeReserved: "🔴 Reserved for Another Client",
      cvBtnBookWa: "Book via WhatsApp 💬",
      cvBtnMusaned: "Request via Musaned 🏛️",
      cvBtnDetails: "View Full Profile 📄",
      cvAgeLabel: "Age:",
      cvExpLabel: "Experience:",
      cvSalaryLabel: "Salary:",
      cvReligionLabel: "Religion:",
      cvEducationLabel: "Education:",
      cvMaritalLabel: "Status:",
      cvHeightWeight: "Height & Weight:",
      cvLanguagesLabel: "Languages:",
      cvSkillsLabel: "Skills:",
      cvPrevExpLabel: "Past Experience:",
      footerAboutText: "A licensed and certified recruitment agency by the Ministry of Human Resources and Social Development (License #3801328). We supply qualified and rigorously vetted domestic workforce across Saudi Arabia with the highest standards of reliability and care.",
      footerQuickLinks: "Quick Navigation",
      footerServices: "Our Services",
      footerContact: "Contact Details",
      footerAddress: "Headquarters: Riyadh, Al-Malqa District, Anas Ibn Malik Rd.",
      footerRights: "All Rights Reserved © 2026 Al-Najah Recruitment Office — Musaned License #3801328",
      securityModalTitle: "Important Security Notice & Fraud Alert",
      securityModalText: "Valued clients, please beware of unauthorized pages, brokers, or unofficial phone numbers claiming to represent Al-Najah Office. All official financial transactions are conducted strictly through the governmental Musaned platform or our officially verified commercial bank account.",
      securityModalBtn: "I Understand & Acknowledge"
    }
  };

  // أسماء الدول المترجمة
  const COUNTRY_NAMES = {
    ethiopia: { ar: "إثيوبيا", en: "Ethiopia" },
    kenya: { ar: "كينيا", en: "Kenya" },
    uganda: { ar: "أوغندا", en: "Uganda" },
    philippines: { ar: "الفلبين", en: "Philippines" },
    srilanka: { ar: "سريلانكا", en: "Sri Lanka" },
    "sri-lanka": { ar: "سريلانكا", en: "Sri Lanka" },
    india: { ar: "الهند", en: "India" },
    bangladesh: { ar: "بنجلاديش", en: "Bangladesh" },
    tanzania: { ar: "تنزانيا", en: "Tanzania" },
    sudan: { ar: "السودان", en: "Sudan" },
    burundi: { ar: "بوروندي", en: "Burundi" },
    egypt: { ar: "مصر", en: "Egypt" },
    yemen: { ar: "اليمن", en: "Yemen" },
    pakistan: { ar: "باكستان", en: "Pakistan" }
  };

  // أسماء المهن المترجمة
  const JOB_NAMES = {
    maid: { ar: "عاملة منزلية", en: "Housemaid" },
    houseboy: { ar: "عامل منزلي", en: "Houseboy" },
    driver: { ar: { m: "سائق خاص", f: "سائقة خاصة" }, en: "Private Driver" },
    chef: { ar: "طباخ / طباخة منزلية", en: "Home Cook / Chef" },
    cook: { ar: "طباخ / طباخة منزلية", en: "Home Cook / Chef" },
    nanny: { ar: "مربية أطفال", en: "Nanny / Babysitter" },
    babysitter: { ar: "مربية أطفال", en: "Babysitter" },
    nurse: { ar: "ممرض / ممرضة منزلية", en: "Home Caregiver / Nurse" },
    elderly: { ar: "رعاية كبار السن", en: "Elderly Caregiver" },
    guard: { ar: "حارس منزلي", en: "Home Guard" },
    gardener: { ar: "مزارع منزلي / بستاني", en: "Home Gardener" },
    server: { ar: "سفرجي منزلي", en: "Home Waiter / Server" }
  };

  // قراءة اللغة المحفوظة (الافتراضي: العربية)
  function getStoredLanguage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "ar") return saved;
    } catch (e) {}
    return "ar";
  }

  let currentLanguage = getStoredLanguage();

  // تطبيق الاتجاه واللغة فوراً على جذر الوثيقة لتفادي وميض العرض
  function applyDocumentRootLang(lang) {
    const isEn = lang === "en";
    const docEl = document.documentElement;
    docEl.lang = lang;
    docEl.dir = isEn ? "ltr" : "rtl";

    if (isEn) {
      docEl.classList.add("lang-en");
      if (document.body) document.body.classList.add("lang-en");
    } else {
      docEl.classList.remove("lang-en");
      if (document.body) document.body.classList.remove("lang-en");
    }
  }

  // تطبيق فوري على <html>
  applyDocumentRootLang(currentLanguage);

  // تحديث أزرار تبديل اللغة في الواجهة
  function updateSwitcherButtons() {
    const isEn = currentLanguage === "en";
    const text = isEn ? "العربية" : "English";
    const title = isEn ? "التحويل إلى اللغة العربية" : "Switch to English";
    const flag = isEn ? "🇸🇦" : "🌐";

    document.querySelectorAll(".lang-switch-btn").forEach((btn) => {
      btn.setAttribute("title", title);
      btn.setAttribute("aria-label", title);
      btn.innerHTML = `
        <span class="lang-switch-icon">${flag}</span>
        <span class="lang-switch-text">${text}</span>
      `;
    });
  }

  // حقن زر تبديل اللغة تلقائياً في شريط التنقل وقائمة الجوال إن لم يكن موجوداً
  function injectSwitcherButtons() {
    // 1. في شريط التنقل بالهيدر
    const navActions = document.querySelector(".nav-actions");
    if (navActions && !document.getElementById("navLangBtn")) {
      const btn = document.createElement("button");
      btn.id = "navLangBtn";
      btn.type = "button";
      btn.className = "lang-switch-btn";
      btn.onclick = window.toggleLanguage;
      // يوضع قبل زر فتح قائمة الجوال
      const menuBtn = document.getElementById("menuOpen");
      if (menuBtn) {
        navActions.insertBefore(btn, menuBtn);
      } else {
        navActions.appendChild(btn);
      }
    }

    // 2. في ترويسة قائمة الجوال
    const mobileHeader = document.querySelector(".mm-header");
    if (mobileHeader && !document.getElementById("mobileLangBtn")) {
      const btn = document.createElement("button");
      btn.id = "mobileLangBtn";
      btn.type = "button";
      btn.className = "lang-switch-btn mm-lang-btn";
      btn.onclick = window.toggleLanguage;
      mobileHeader.appendChild(btn);
    }

    // 3. في الشريط العلوي (Topbar)
    const topbarInner = document.querySelector(".topbar-inner");
    if (topbarInner && !document.getElementById("topbarLangBtn")) {
      const wrap = document.createElement("div");
      wrap.className = "topbar-lang-wrap";
      const btn = document.createElement("button");
      btn.id = "topbarLangBtn";
      btn.type = "button";
      btn.className = "topbar-lang-btn lang-switch-btn";
      btn.onclick = window.toggleLanguage;
      wrap.appendChild(btn);
      topbarInner.appendChild(wrap);
    }

    updateSwitcherButtons();
  }

  // حفظ النص الأصلي العربي قبل استبداله بالإنجليزية
  function storeOriginalText(el) {
    if (!el.dataset.origText) {
      el.dataset.origText = el.textContent.trim();
    }
  }

  function storeOriginalHtml(el) {
    if (!el.dataset.origText) {
      el.dataset.origText = el.innerHTML;
    }
  }

  // استبدال نصوص القوائم والروابط العامة
  function translateCommonNav() {
    const isEn = currentLanguage === "en";
    const dict = TRANSLATIONS[currentLanguage];

    // روابط التنقل
    const navMap = {
      "index.html": dict.navHome,
      "about.html": dict.navAbout,
      "services.html": dict.navServices,
      "nationalities.html": dict.navNationalities,
      "resumes.html": dict.navResumes,
      "steps.html": dict.navSteps,
      "faq.html": dict.navFaq,
      "offers.html": dict.navOffers,
      "contact.html": dict.navContact
    };

    document.querySelectorAll(".nav-links a, .mm-links a").forEach((a) => {
      const href = a.getAttribute("href");
      if (href && navMap[href]) {
        storeOriginalText(a);
        a.textContent = isEn ? navMap[href] : a.dataset.origText;
      }
    });

    // شعار الموقع
    document.querySelectorAll(".brand-title").forEach((el) => {
      storeOriginalText(el);
      el.textContent = isEn ? dict.brandName : el.dataset.origText;
    });
    document.querySelectorAll(".brand-sub").forEach((el) => {
      storeOriginalText(el);
      el.textContent = isEn ? dict.brandSub : el.dataset.origText;
    });

    // زر اطلب استقدامك بالهيدر
    document.querySelectorAll(".header-cta").forEach((el) => {
      storeOriginalText(el);
      el.textContent = isEn ? dict.ctaRequest : el.dataset.origText;
    });

    // ترخيص الشريط العلوي
    document.querySelectorAll(".topbar-license").forEach((el) => {
      storeOriginalHtml(el);
      el.innerHTML = isEn
        ? `<svg class="icon-xs"><use href="#i-shield-check"/></svg> ${dict.topbarLicense}`
        : el.dataset.origText;
    });

    // ساعات العمل بالشريط العلوي
    document.querySelectorAll(".topbar-info .topbar-item").forEach((el) => {
      if (el.textContent.includes("الأحد") || el.textContent.includes("Sun")) {
        storeOriginalHtml(el);
        el.innerHTML = isEn
          ? `<svg class="icon-sm"><use href="#i-clock"/></svg> ${dict.topbarHours}`
          : el.dataset.origText;
      }
    });

    // التذييل (Footer)
    document.querySelectorAll(".footer-brand p").forEach((el) => {
      storeOriginalText(el);
      el.textContent = isEn ? dict.footerAboutText : el.dataset.origText;
    });

    document.querySelectorAll(".footer-col h3, .footer-col h4").forEach((el) => {
      storeOriginalText(el);
      const txt = el.textContent.trim();
      if (txt.includes("روابط") || txt.includes("Quick")) el.textContent = dict.footerQuickLinks;
      else if (txt.includes("خدمات") || txt.includes("Services")) el.textContent = dict.footerServices;
      else if (txt.includes("تواصل") || txt.includes("Contact")) el.textContent = dict.footerContact;
    });

    // ترجمة حقوق النشر وتنسيق روابط المصمم ولوحة التحكم
    document.querySelectorAll(".footer-bottom").forEach((fb) => {
      const copyP = fb.querySelector("p:not(.footer-credit)");
      const creditP = fb.querySelector(".footer-credit");
      if (copyP) {
        storeOriginalText(copyP);
        copyP.textContent = isEn ? dict.footerRights : copyP.dataset.origText;
      }
      if (creditP) {
        creditP.innerHTML = isEn
          ? 'Designed by <b>Ebtekar Tech Solutions</b> | <a href="admin.html" class="admin-footer-link" style="color: var(--text-muted); text-decoration: none; font-weight: 700; margin-left: 8px;">Admin Panel 🔒</a>'
          : 'تم التصميم بواسطة <b>ابتكار للحلول التقنية</b> | <a href="admin.html" class="admin-footer-link" style="color: var(--text-muted); text-decoration: none; font-weight: 700; margin-right: 8px;">لوحة التحكم 🔒</a>';
      }
    });

    // شريط الاعتمادات (Trust bar)
    const trustPills = document.querySelectorAll(".trust-pill");
    if (trustPills.length >= 3) {
      storeOriginalHtml(trustPills[0]);
      storeOriginalHtml(trustPills[1]);
      storeOriginalHtml(trustPills[2]);

      trustPills[0].innerHTML = isEn
        ? `<svg class="icon-sm"><use href="#i-badge-check"/></svg> ${dict.trustPill1}`
        : trustPills[0].dataset.origHtml;
      trustPills[1].innerHTML = isEn
        ? `<svg class="icon-sm"><use href="#i-shield-check"/></svg> ${dict.trustPill2}`
        : trustPills[1].dataset.origHtml;
      trustPills[2].innerHTML = isEn
        ? `<svg class="icon-sm"><use href="#i-clock"/></svg> ${dict.trustPill3}`
        : trustPills[2].dataset.origHtml;
    }

    // إحصائيات الصفحة الرئيسية
    document.querySelectorAll(".stat-item").forEach((item) => {
      const labelEl = item.querySelector(".stat-label");
      if (labelEl) {
        storeOriginalText(labelEl);
        const txt = labelEl.textContent.trim();
        if (txt.includes("سنوات خبرة") || txt.includes("Years of")) labelEl.textContent = dict.statExp;
        else if (txt.includes("عامل تم") || txt.includes("Domestic Workers")) labelEl.textContent = dict.statRecruited;
        else if (txt.includes("رضا") || txt.includes("Satisfaction")) labelEl.textContent = dict.statSatisfaction;
        else if (txt.includes("دولة") || txt.includes("Approved Source")) labelEl.textContent = dict.statCountries;
        else if (txt.includes("فريق") || txt.includes("Support Team")) labelEl.textContent = dict.statSupport;
      }
    });
  }

  // ترجمة الصفحات الفرعية الخاصة (Subpages hero)
  function translateSubpages() {
    const isEn = currentLanguage === "en";
    const path = window.location.pathname.toLowerCase();

    const subpageTitles = {
      "about.html": {
        title: { ar: "نبذة عن مكتب النجاح", en: "About Al-Najah Recruitment" },
        sub: { ar: "ريادة في استقدام العمالة المنزلية والمهنية المعتمدة بالمملكة", en: "Leading certified domestic and professional workforce recruitment in KSA" }
      },
      "services.html": {
        title: { ar: "خدماتنا المعتمدة", en: "Our Certified Recruitment Services" },
        sub: { ar: "نوفر عمالة منزلية مدربة على حسب الاحتياج من مختلف الجنسيات", en: "Providing trained domestic workers tailored to your needs from various nationalities" }
      },
      "nationalities.html": {
        title: { ar: "الجنسيات المعتمدة", en: "Approved Source Countries" },
        sub: { ar: "نستقدم لكم أفضل الكفاءات المنزلية من الدول المصرح بها رسمياً عبر مساند", en: "Recruiting top domestic talent from officially authorized countries via Musaned" }
      },
      "resumes.html": {
        title: { ar: "السير الذاتية", en: "Available Candidates (CVs)" },
        sub: { ar: "اختر من بين الكفاءات المنزلية المتاحة للاستقدام الفوري وحجز طلبك الآن.", en: "Browse top qualified domestic candidates ready for immediate booking via Musaned." }
      },
      "steps.html": {
        title: { ar: "خطوات الاستقدام", en: "Recruitment Steps & Procedures" },
        sub: { ar: "إجراءات ميسرة وواضحة من التعاقد حتى وصول العمالة لمنزلك", en: "Clear and streamlined procedures from initial contract to safe arrival at your home" }
      },
      "faq.html": {
        title: { ar: "الأسئلة الشائعة", en: "Frequently Asked Questions" },
        sub: { ar: "إجابات شاملة ومفصلة عن كافة استفساراتكم حول خدمات الاستقدام والضمان", en: "Detailed answers to all your inquiries regarding recruitment, contracts, and guarantees" }
      },
      "offers.html": {
        title: { ar: "العروض والباقات", en: "Special Offers & Packages" },
        sub: { ar: "أفضل أسعار الاستقدام مع ضمان شامل ومتابعة مستمرة", en: "Competitive recruitment pricing with comprehensive warranty and 24/7 care" }
      },
      "contact.html": {
        title: { ar: "تواصل معنا", en: "Contact Our Team" },
        sub: { ar: "يسعدنا تواصلك معنا واستقبال جميع الأسئلة والمقترحات والطلبات على مدار الساعة.", en: "We are pleased to receive all inquiries, requests, and feedback around the clock." }
      }
    };

    Object.keys(subpageTitles).forEach((file) => {
      if (path.endsWith(file) || path.includes("/" + file)) {
        const item = subpageTitles[file];
        const titleEl = document.querySelector(".hero.subpage-bg .hero-title");
        const subEl = document.querySelector(".hero.subpage-bg .hero-sub");
        if (titleEl) {
          storeOriginalText(titleEl);
          titleEl.textContent = isEn ? item.title.en : titleEl.dataset.origText;
        }
        if (subEl) {
          storeOriginalText(subEl);
          subEl.textContent = isEn ? item.sub.en : subEl.dataset.origText;
        }
      }
    });

    // ترجمة حقول صفحة اتصل بنا (contact.html)
    if (path.includes("contact.html")) {
      const labels = document.querySelectorAll(".contact-form .form-label, .contact-card h3");
      const enLabels = {
        "الاسم الكامل *": "Full Name *",
        "رقم الجوال *": "Mobile Number *",
        "البريد الإلكتروني": "Email Address",
        "نوع الخدمة المطلوبة *": "Desired Service *",
        "الجنسية المفضلة": "Preferred Nationality",
        "تفاصيل الطلب أو الرسالة *": "Message / Details *",
        "معلومات التواصل": "Contact Information",
        "ساعات العمل الرسمية": "Official Working Hours",
        "موقع المكتب": "Office Location"
      };
      labels.forEach((l) => {
        const txt = l.textContent.trim();
        if (enLabels[txt]) {
          storeOriginalText(l);
          l.textContent = isEn ? enLabels[txt] : l.dataset.origText;
        }
      });
      const submitBtn = document.querySelector(".contact-form button[type='submit']");
      if (submitBtn) {
        storeOriginalText(submitBtn);
        submitBtn.textContent = isEn ? "Send Message via WhatsApp" : submitBtn.dataset.origText;
      }
    }
  }

  // ترجمة صفحة السير الذاتية (resumes.html)
  function translateResumesPage() {
    if (!window.location.pathname.toLowerCase().includes("resumes.html")) return;
    const isEn = currentLanguage === "en";
    const dict = TRANSLATIONS[currentLanguage];

    // خطوة تحديد الجنسية
    const badge = document.querySelector(".nat-step-badge");
    const title = document.querySelector(".nat-step-title");
    const sub = document.querySelector(".nat-step-sub");
    if (badge) badge.textContent = isEn ? "Step 1: Select Nationality" : "خطوة 1: تحديد الجنسية";
    if (title) title.textContent = isEn ? "Select desired nationality to view available candidate CVs" : "اختر الجنسية المطلوبة لعرض السير الذاتية المتاحة";
    if (sub) sub.textContent = isEn ? "Choose the country you wish to recruit from to browse candidates ready for immediate booking:" : "حدد الدولة التي ترغب بالاستقدام منها لاستعراض الكفاءات الجاهزة للحجز فوراً وفق منصة مساند:";

    // زر تغيير الدولة
    const btnChange = document.querySelector(".btn-change-nat");
    if (btnChange) btnChange.textContent = isEn ? "🔄 Choose Another Country" : "🔄 اختيار دولة أخرى";

    // مسميات الفلاتر
    const filterLabels = document.querySelectorAll("#cvFiltersBar .filter-label");
    const fEn = ["Search by Name or Skills", "Nationality", "Profession", "Experience", "Sort By"];
    const fAr = ["البحث بالاسم والمهارات", "الجنسية", "المهنة", "الخبرة", "ترتيب حسب"];
    filterLabels.forEach((l, i) => {
      if (fEn[i]) l.textContent = isEn ? fEn[i] : fAr[i];
    });

    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.placeholder = isEn ? "Type name, skill, or religion..." : "اكتب اسم أو مهارة أو ديانة...";
    }

    // إذا كانت دالة إعادة العرض في resumes.js متوفرة، نقوم باستدعائها
    const expFilter = document.getElementById("experienceFilter");
    if (expFilter && expFilter.options.length >= 3) {
      expFilter.options[0].textContent = isEn ? "All Experience Levels" : "كل مستويات الخبرة";
      expFilter.options[1].textContent = isEn ? "Previously Worked (Experienced)" : "سبق لها العمل";
      expFilter.options[2].textContent = isEn ? "No Previous Experience (New)" : "لم يسبق لها العمل (جديدة)";
    }

    if (typeof window.refreshCvList === "function") {
      window.refreshCvList();
    }
  }

  // تطبيق الترجمة الكاملة للموقع
  function applyLanguage(lang) {
    currentLanguage = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}

    applyDocumentRootLang(lang);
    updateSwitcherButtons();
    translateCommonNav();
    translateSubpages();
    translateResumesPage();

    // إشعار أي مكوّن يستمع لتغير اللغة
    window.dispatchEvent(new CustomEvent("languageChanged", { detail: { lang } }));
  }

  // الدالة العامة للتبديل بين العربية والإنجليزية
  window.toggleLanguage = function () {
    const nextLang = currentLanguage === "ar" ? "en" : "ar";
    applyLanguage(nextLang);
  };

  window.setLanguage = function (lang) {
    if (lang === "ar" || lang === "en") {
      applyLanguage(lang);
    }
  };

  window.getCurrentLanguage = function () {
    return currentLanguage;
  };

  // تهيئة النظام عند اكتمال تحميل DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      injectSwitcherButtons();
      applyLanguage(currentLanguage);
    });
  } else {
    injectSwitcherButtons();
    applyLanguage(currentLanguage);
  }
})();
