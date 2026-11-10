/**
 * resumes.js - نظام إدارة وتصفية السير الذاتية التفاعلي
 * مكتب النجاح للاستقدام
 */

(function () {
  "use strict";

  const STORAGE_KEY = "alnajah_resumes_v1";
  const WHATSAPP_PHONE = "966555021298";

  // خريطة أسماء المهن
  const JOB_NAMES = {
    maid: "عاملة منزلية",
    houseboy: "عامل منزلي",
    driver: "سائق خاص",
    chef: "طباخ/ة منزلي",
    nurse: "ممرض/ة منزلي",
    babysitter: "مربية أطفال",
    elderly: "رعاية كبار السن",
    guard: "حارس منزلي",
    gardener: "مزارع/بستاني"
  };

  // خريطة أعلام وأسماء الجنسيات
  const NATION_MAP = {
    ethiopia: { name: "إثيوبيا", flag: "🇪🇹" },
    kenya: { name: "كينيا", flag: "🇰🇪" },
    uganda: { name: "أوغندا", flag: "🇺🇬" },
    philippines: { name: "الفلبين", flag: "🇵🇭" },
    tanzania: { name: "تنزانيا", flag: "🇹🇿" },
    bangladesh: { name: "بنجلاديش", flag: "🇧🇩" },
    srilanka: { name: "سريلانكا", flag: "🇱🇰" },
    india: { name: "الهند", flag: "🇮🇳" },
    sudan: { name: "السودان", flag: "🇸🇩" },
    burundi: { name: "بوروندي", flag: "🇧🇮" }
  };

  // قاعدة بيانات السير الذاتية الافتراضية المعتمدة
  const DEFAULT_RESUMES = [
    {
      id: "NJ-101",
      fullname: "سارة م.",
      job: "maid",
      nationality: "ethiopia",
      age: 26,
      experience: 3,
      salary: 1000,
      religion: "مسيحية",
      education: "ثانوي عام",
      marital: "عزباء",
      height: "162 سم",
      weight: "58 كجم",
      photo: "images/cv_sara.jpg",
      languages: "العربية (جيد جداً)، الأمهرية",
      skills: "النظافة الشاملة، الكي، الغسيل، رعاية الأطفال، مساعدة الطهي",
      prevExp: "سنتان في الرياض، سنة في أديس أبابا",
      status: "available"
    },
    {
      id: "NJ-102",
      fullname: "ماري و.",
      job: "maid",
      nationality: "kenya",
      age: 29,
      experience: 4,
      salary: 1000,
      religion: "مسيحية",
      education: "دبلوم مهني",
      marital: "متزوجة ولدها طفلان",
      height: "165 سم",
      weight: "62 كجم",
      photo: "images/cv_mary.jpg",
      languages: "الإنجليزية (بطلاقة)، العربية (مبتدئ)",
      skills: "التدبير المنزلي، استخدام الأجهزة الحديثة، الإشراف المنزلي",
      prevExp: "4 سنوات في الكويت في منازل راقية",
      status: "available"
    },
    {
      id: "NJ-103",
      fullname: "جون ك.",
      job: "driver",
      nationality: "uganda",
      age: 32,
      experience: 6,
      salary: 1500,
      religion: "مسيحي",
      education: "ثانوي + رخصة قيادة دولية وسعودية",
      marital: "متزوج",
      height: "174 سم",
      weight: "72 كجم",
      photo: "images/cv_john.jpg",
      languages: "الإنجليزية (ممتاز)، العربية (جيد جداً)",
      skills: "معرفة شوارع الرياض وجدة، استخدام GPS، صيانة دورية للمركبات",
      prevExp: "4 سنوات سائق خاص لعائلة بالرياض، سنتان بالإمارات",
      status: "available"
    },
    {
      id: "NJ-104",
      fullname: "جريس ب.",
      job: "babysitter",
      nationality: "philippines",
      age: 28,
      experience: 5,
      salary: 1500,
      religion: "مسيحية كاثوليكية",
      education: "دبلوم تربية وتعليم أطفال",
      marital: "عزباء",
      height: "158 سم",
      weight: "54 كجم",
      photo: "images/cv_grace.jpg",
      languages: "الإنجليزية (طلاقة تامة)، العربية (جيد)",
      skills: "رعاية حديثي الولادة، التعليم التفاعلي، الإسعافات الأولية، تحضير وجبات الأطفال",
      prevExp: "3 سنوات في دبي، سنتان بالفلبين بحضانات معتمدة",
      status: "available"
    },
    {
      id: "NJ-105",
      fullname: "كومار س.",
      job: "driver",
      nationality: "india",
      age: 35,
      experience: 8,
      salary: 1500,
      religion: "هندوسي",
      education: "متوسط + رخصة قيادة سعودية سارية",
      marital: "متزوج",
      height: "170 سم",
      weight: "68 كجم",
      photo: "images/cv_kumar.jpg",
      languages: "العربية (ممتاز)، الهندية، الإنجليزية",
      skills: "التوصيل للمدارس، قيادة سيارات فاخرة، الالتزام بالمواعيد، هدوء تام",
      prevExp: "6 سنوات سائق خاص لعائلة بالدمام والرياض",
      status: "available"
    },
    {
      id: "NJ-106",
      fullname: "فاطمة ع.",
      job: "chef",
      nationality: "ethiopia",
      age: 31,
      experience: 5,
      salary: 1200,
      religion: "مسلمة",
      education: "ثانوي عام",
      marital: "متزوجة",
      height: "160 سم",
      weight: "60 كجم",
      photo: "images/cv_fatima.jpg",
      languages: "العربية (ممتاز)، الأمهرية",
      skills: "إعداد الأطباق الخليجية (الكبسة، المندي، الشوربات، المعجنات، السلطات)",
      prevExp: "3 سنوات طباخة لعائلة بجدة، سنتان بأديس أبابا",
      status: "available"
    },
    {
      id: "NJ-107",
      fullname: "كلودين ن.",
      job: "maid",
      nationality: "burundi",
      age: 24,
      experience: 0,
      salary: 900,
      religion: "مسيحية",
      education: "متوسط",
      marital: "عزباء",
      height: "163 سم",
      weight: "55 كجم",
      photo: "images/logo.jpg",
      languages: "الفرنسية، السواحلية، العربية (أساسيات مقبولة)",
      skills: "التنظيف، الغسيل، ترتيب الغرف، رغبة سريعة بالتعلم",
      prevExp: "جديدة كلياً بدون خبرة سابقة، مدربة بالمركز المعتمد",
      status: "available"
    },
    {
      id: "NJ-108",
      fullname: "شانيكا ر.",
      job: "maid",
      nationality: "srilanka",
      age: 33,
      experience: 6,
      salary: 1200,
      religion: "بوذية",
      education: "ثانوي",
      marital: "متزوجة",
      height: "157 سم",
      weight: "59 كجم",
      photo: "images/logo.jpg",
      languages: "العربية (جيد جداً)، السنهالية",
      skills: "طهي خليجي منوع، إدارة أعمال البيت بكفاءة، العناية بالأطفال",
      prevExp: "5 سنوات بالسعودية والقصيم",
      status: "reserved"
    }
  ];

  // جلب السير الذاتية من التخزين المحلي
  function getStoredResumes() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not read resumes from localStorage:", e);
    }
    // حفظ الافتراضي إذا لم يكن موجوداً
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_RESUMES));
    return DEFAULT_RESUMES;
  }

  // عناصر واجهة المستخدم
  const resumesGrid = document.getElementById("resumesGrid");
  const searchInput = document.getElementById("searchInput");
  const nationalityFilter = document.getElementById("nationalityFilter");
  const jobFilter = document.getElementById("jobFilter");
  const experienceFilter = document.getElementById("experienceFilter");
  const sortSelector = document.getElementById("sortSelector");

  let allResumes = [];
  let filteredResumes = [];

  // إنشاء شريط الإحصائيات قبل الشبكة
  let statsBar = document.getElementById("resumesStatsBar");
  if (!statsBar && resumesGrid) {
    statsBar = document.createElement("div");
    statsBar.id = "resumesStatsBar";
    statsBar.className = "resumes-stats-bar";
    resumesGrid.parentNode.insertBefore(statsBar, resumesGrid);
  }

  // إنشاء نافذة تفاصيل السيرة الذاتية (Modal)
  let cvModal = document.getElementById("cvDetailsModal");
  if (!cvModal) {
    cvModal = document.createElement("div");
    cvModal.id = "cvDetailsModal";
    cvModal.className = "cv-modal";
    cvModal.innerHTML = `
      <div class="cv-modal-backdrop" id="cvModalCloseBackdrop"></div>
      <div class="cv-modal-container">
        <div class="cv-modal-header">
          <h3 id="cvModalTitle">تفاصيل السيرة الذاتية الكاملة</h3>
          <button type="button" class="cv-modal-close" id="cvModalCloseBtn">&times;</button>
        </div>
        <div class="cv-modal-body" id="cvModalBody"></div>
        <div class="cv-modal-footer">
          <button type="button" class="btn-cv-details" id="cvModalDismiss">إغلاق</button>
          <a href="#" target="_blank" rel="noopener noreferrer" class="btn-cv-book" id="cvModalBookBtn" style="padding: 10px 24px;">حجز هذه السيرة عبر واتساب 📲</a>
        </div>
      </div>
    `;
    document.body.appendChild(cvModal);

    const closeMod = () => {
      cvModal.classList.remove("open");
      document.body.style.overflow = "";
    };
    document.getElementById("cvModalCloseBackdrop").addEventListener("click", closeMod);
    document.getElementById("cvModalCloseBtn").addEventListener("click", closeMod);
    document.getElementById("cvModalDismiss").addEventListener("click", closeMod);
  }

  // عرض تفاصيل سيرة معينة
  window.showCvDetails = function (cvId) {
    const cv = allResumes.find((item) => item.id === cvId);
    if (!cv) return;

    const nat = NATION_MAP[cv.nationality] || { name: cv.nationality, flag: "🏳️" };
    const jobText = JOB_NAMES[cv.job] || cv.job;
    const isAvail = cv.status === "available";

    const modalBody = document.getElementById("cvModalBody");
    const bookBtn = document.getElementById("cvModalBookBtn");

    modalBody.innerHTML = `
      <div class="cv-detail-hero">
        <img src="${cv.photo || 'images/logo.jpg'}" alt="${cv.fullname}" class="cv-detail-photo" onerror="this.src='images/logo.jpg'" />
        <div class="cv-detail-info">
          <h4>${cv.fullname} (${cv.id})</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 6px;">
            <span class="cv-job-title">${jobText}</span>
            <span class="cv-badge-status ${isAvail ? 'available' : 'reserved'}" style="position: static;">
              ${isAvail ? '🟢 متاحة للاستقدام الفوري' : '🔴 محجوزة حالياً'}
            </span>
          </div>
        </div>
      </div>

      <table class="cv-detail-table">
        <tbody>
          <tr><th>الجنسية</th><td>${nat.flag} ${nat.name}</td></tr>
          <tr><th>العمر</th><td>${cv.age} سنة</td></tr>
          <tr><th>سنوات الخبرة</th><td>${cv.experience > 0 ? cv.experience + ' سنوات' : 'جديدة كلياً بدون خبرة'}</td></tr>
          <tr><th>الراتب الشهري</th><td>${Number(cv.salary).toLocaleString('en-US')} ريال سعودي</td></tr>
          <tr><th>الديانة</th><td>${cv.religion || '—'}</td></tr>
          <tr><th>الحالة الاجتماعية</th><td>${cv.marital || '—'}</td></tr>
          <tr><th>المؤهل التعليمي</th><td>${cv.education || '—'}</td></tr>
          <tr><th>الطول والوزن</th><td>${cv.height || '—'} / ${cv.weight || '—'}</td></tr>
          <tr><th>إتقان اللغات</th><td>${cv.languages || '—'}</td></tr>
          <tr><th>المهارات الأساسية</th><td>${cv.skills || '—'}</td></tr>
          <tr><th>الخبرات العملية السابقة</th><td>${cv.prevExp || '—'}</td></tr>
        </tbody>
      </table>
    `;

    const waMsg = `مرحباً مكتب النجاح، أرغب بحجز السيرة الذاتية التالية:\n- الرمز: ${cv.id}\n- الاسم: ${cv.fullname}\n- المهنة: ${jobText}\n- الجنسية: ${nat.name}\n- الراتب: ${cv.salary} ر.س\nيرجى إفادتي بإجراءات التعاقد وحجز السيرة عبر منصة مساند.`;
    bookBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waMsg)}`;
    if (!isAvail) {
      bookBtn.style.opacity = "0.6";
      bookBtn.innerHTML = `السيرة محجوزة (استفسر عن البديل)`;
    } else {
      bookBtn.style.opacity = "1";
      bookBtn.innerHTML = `حجز هذه السيرة عبر واتساب 📲`;
    }

    cvModal.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  // توليد بطاقة HTML لكل سيرة
  function renderCard(cv) {
    const nat = NATION_MAP[cv.nationality] || { name: cv.nationality, flag: "🏳️" };
    const jobText = JOB_NAMES[cv.job] || cv.job;
    const isAvail = cv.status === "available";

    // تحويل المهارات إلى شرائح
    const skillChips = (cv.skills || "")
      .split(/[،,]/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .slice(0, 4)
      .map((s) => `<span class="cv-skill-chip">${s}</span>`)
      .join("");

    const waMsg = `مرحباً مكتب النجاح للاستقدام، أود الاستفسار وحجز السيرة الذاتية (${cv.fullname} - رمز #${cv.id} - مهنة ${jobText} من ${nat.name}).`;
    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waMsg)}`;

    return `
      <div class="cv-card" data-id="${cv.id}">
        <div class="cv-card-media">
          <img src="${cv.photo || 'images/logo.jpg'}" alt="${cv.fullname}" onerror="this.src='images/logo.jpg'" />
          <span class="cv-badge-status ${isAvail ? 'available' : 'reserved'}">
            ${isAvail ? '🟢 متاحة للحجز' : '🔴 محجوزة'}
          </span>
          <span class="cv-badge-nat">
            ${nat.flag} ${nat.name}
          </span>
          <div class="cv-media-gradient"></div>
          <span class="cv-ref-code">#${cv.id}</span>
        </div>

        <div class="cv-card-body">
          <div class="cv-name-row">
            <h3>${cv.fullname}</h3>
            <span class="cv-age-tag">${cv.age} سنة</span>
          </div>

          <span class="cv-job-title">${jobText}</span>

          <div class="cv-facts-grid">
            <div class="cv-fact-item">
              <span class="cv-fact-label">الراتب الشهري</span>
              <span class="cv-fact-val" style="color: var(--primary-color);">${Number(cv.salary).toLocaleString('en-US')} ر.س</span>
            </div>
            <div class="cv-fact-item">
              <span class="cv-fact-label">سنوات الخبرة</span>
              <span class="cv-fact-val">${cv.experience > 0 ? cv.experience + ' سنوات' : 'جديدة'}</span>
            </div>
            <div class="cv-fact-item">
              <span class="cv-fact-label">الديانة</span>
              <span class="cv-fact-val">${cv.religion || '—'}</span>
            </div>
            <div class="cv-fact-item">
              <span class="cv-fact-label">اللغات</span>
              <span class="cv-fact-val" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${cv.languages || '—'}</span>
            </div>
          </div>

          <div class="cv-skills-chips">
            ${skillChips}
          </div>

          <div class="cv-card-actions">
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-cv-book" ${!isAvail ? 'style="opacity: 0.7;"' : ''}>
              ${isAvail ? 'حجز عبر واتساب 📲' : 'استفسر عن الحجز 💬'}
            </a>
            <button type="button" class="btn-cv-details" onclick="showCvDetails('${cv.id}')">
              التفاصيل 👁️
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // تصفية وعرض السير الذاتية
  function applyFilters() {
    if (!resumesGrid) return;

    const search = (searchInput ? searchInput.value : "").trim().toLowerCase();
    const nat = nationalityFilter ? nationalityFilter.value : "";
    const job = jobFilter ? jobFilter.value : "";
    const exp = experienceFilter ? experienceFilter.value : "";
    const sort = sortSelector ? sortSelector.value : "";

    filteredResumes = allResumes.filter((cv) => {
      // بحث نصي
      if (search) {
        const fullContent = `${cv.fullname} ${cv.skills} ${cv.religion} ${cv.languages} ${cv.id} ${cv.prevExp}`.toLowerCase();
        if (!fullContent.includes(search)) return false;
      }

      // تصفية الجنسية
      if (nat && cv.nationality !== nat) return false;

      // تصفية المهنة
      if (job && cv.job !== job) return false;

      // تصفية الخبرة
      if (exp) {
        const years = Number(cv.experience) || 0;
        if (exp === "fresh" && years !== 0) return false;
        if (exp === "1-5" && (years < 1 || years > 5)) return false;
        if (exp === "5+" && years <= 5) return false;
      }

      return true;
    });

    // الترتيب
    if (sort === "age-asc") {
      filteredResumes.sort((a, b) => a.age - b.age);
    } else if (sort === "age-desc") {
      filteredResumes.sort((a, b) => b.age - a.age);
    } else if (sort === "exp-desc") {
      filteredResumes.sort((a, b) => b.experience - a.experience);
    }

    // تحديث شريط الإحصائيات
    if (statsBar) {
      const isFiltered = search || nat || job || exp || sort;
      statsBar.innerHTML = `
        <div>
          <span>عرض السير الذاتية: </span>
          <span class="resumes-count-badge">${filteredResumes.length} من أصل ${allResumes.length} سيرة</span>
        </div>
        ${
          isFiltered
            ? `<button type="button" class="btn-reset-filters" id="btnResetAllFilters">🔄 إعادة ضبط وتصفير الفلاتر</button>`
            : `<span style="font-size: 0.82rem; color: var(--text-muted);">جميع السير مفحوصة ومطابقة لمعايير منصة مساند</span>`
        }
      `;

      const resetBtn = document.getElementById("btnResetAllFilters");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          if (searchInput) searchInput.value = "";
          if (nationalityFilter) nationalityFilter.value = "";
          if (jobFilter) jobFilter.value = "";
          if (experienceFilter) experienceFilter.value = "";
          if (sortSelector) sortSelector.value = "";
          applyFilters();
        });
      }
    }

    // عرض البطاقات
    if (filteredResumes.length === 0) {
      resumesGrid.innerHTML = `
        <div class="cv-empty-state">
          <div class="cv-empty-icon">🔍</div>
          <h3>لم يتم العثور على سير ذاتية مطابقة</h3>
          <p>جرب تغيير معايير البحث أو تصفير الفلاتر لعرض كافة السير المتاحة.</p>
          <button type="button" class="btn-action" style="margin: 0 auto;" onclick="
            document.getElementById('searchInput').value = '';
            document.getElementById('nationalityFilter').value = '';
            document.getElementById('jobFilter').value = '';
            document.getElementById('experienceFilter').value = '';
            document.getElementById('sortSelector').value = '';
            window.refreshCvList();
          ">تصفير الفلاتر وعرض الجميع</button>
        </div>
      `;
    } else {
      resumesGrid.innerHTML = filteredResumes.map(renderCard).join("");
    }
  }

  // تحديث القائمة العامة
  window.refreshCvList = function () {
    allResumes = getStoredResumes();
    applyFilters();
  };

  // الاستماع للأحداث
  document.addEventListener("DOMContentLoaded", () => {
    allResumes = getStoredResumes();

    if (searchInput) searchInput.addEventListener("input", applyFilters);
    if (nationalityFilter) nationalityFilter.addEventListener("change", applyFilters);
    if (jobFilter) jobFilter.addEventListener("change", applyFilters);
    if (experienceFilter) experienceFilter.addEventListener("change", applyFilters);
    if (sortSelector) sortSelector.addEventListener("change", applyFilters);

    applyFilters();
  });

  // مزامنة التغييرات الحية عبر التبويبات
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) {
      allResumes = getStoredResumes();
      applyFilters();
    }
  });
})();
