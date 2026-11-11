/**
 * admin.js - لوحة التحكم الشاملة بالسير الذاتية وإدارة الأسعار
 * مكتب النجاح للاستقدام
 */

(function () {
  "use strict";

  const STORAGE_KEY = "alnajah_resumes_v1";
  const PRICING_KEY = "alnajah_pricing_data";
  const AUTH_KEY = "alnajah_admin_auth";

  // كلمات المرور المسموح بها للدخول
  const VALID_PASSWORDS = ["Ahmed@1991"];

  // خريطة المهن
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

  // خريطة الجنسيات
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
    burundi: { name: "بوروندي", flag: "🇧🇮" },
    egypt: { name: "مصر", flag: "🇪🇬" },
    yemen: { name: "اليمن", flag: "🇾🇪" },
    pakistan: { name: "باكستان", flag: "🇵🇰" }
  };

  // قاعدة البيانات الافتراضية للسير الذاتية
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

  // البيانات الافتراضية لأسعار الاستقدام للحاسبة
  const DEFAULT_PRICING = {
    philippines_maid: { total: 14500, base: 12609, vat: 1891, salary: 1500, time: 89, label: "الفلبين", jobLabel: "عاملة منزلية" },
    philippines_nanny: { total: 14500, base: 12609, vat: 1891, salary: 1500, time: 89, label: "الفلبين", jobLabel: "مربية أطفال" },
    philippines_cook: { total: 14500, base: 12609, vat: 1891, salary: 1500, time: 89, label: "الفلبين", jobLabel: "طباخ / طباخة" },
    philippines_houseboy: { total: 12000, base: 10435, vat: 1565, salary: 1500, time: 89, label: "الفلبين", jobLabel: "عامل منزلي" },
    philippines_driver: { total: 12000, base: 10435, vat: 1565, salary: 1500, time: 89, label: "الفلبين", jobLabel: "سائق خاص" },
    philippines_server: { total: 11119, base: 9669, vat: 1450, salary: 1500, time: 89, label: "الفلبين", jobLabel: "سفرجي منزلي" },

    burundi_maid: { total: 4530, base: 3939, vat: 591, salary: 900, time: 85, label: "بوروندي", jobLabel: "عاملة منزلية" },
    burundi_nanny: { total: 4530, base: 3939, vat: 591, salary: 900, time: 85, label: "بوروندي", jobLabel: "مربية أطفال" },
    burundi_cook: { total: 4530, base: 3939, vat: 591, salary: 900, time: 85, label: "بوروندي", jobLabel: "طباخ / طباخة" },

    ethiopia_maid: { total: 3530, base: 3070, vat: 460, salary: 900, time: 89, label: "إثيوبيا", jobLabel: "عاملة منزلية" },
    ethiopia_nanny: { total: 3530, base: 3070, vat: 460, salary: 900, time: 89, label: "إثيوبيا", jobLabel: "مربية أطفال" },
    ethiopia_cook: { total: 3530, base: 3070, vat: 460, salary: 900, time: 89, label: "إثيوبيا", jobLabel: "طباخ / طباخة" },
    ethiopia_houseboy: { total: 4188, base: 3642, vat: 546, salary: 900, time: 85, label: "إثيوبيا", jobLabel: "عامل منزلي" },
    ethiopia_driver: { total: 4344, base: 3777, vat: 567, salary: 900, time: 85, label: "إثيوبيا", jobLabel: "سائق خاص" },
    ethiopia_guard: { total: 3970, base: 3452, vat: 518, salary: 900, time: 85, label: "إثيوبيا", jobLabel: "حارس منزلي" },

    kenya_maid: { total: 4530, base: 3939, vat: 591, salary: 900, time: 89, label: "كينيا", jobLabel: "عاملة منزلية" },
    kenya_nanny: { total: 4530, base: 3939, vat: 591, salary: 900, time: 89, label: "كينيا", jobLabel: "مربية أطفال" },
    kenya_cook: { total: 4530, base: 3939, vat: 591, salary: 900, time: 89, label: "كينيا", jobLabel: "طباخ / طباخة" },

    uganda_maid: { total: 4990, base: 4339, vat: 651, salary: 900, time: 85, label: "أوغندا", jobLabel: "عاملة منزلية" },
    uganda_nanny: { total: 4990, base: 4339, vat: 651, salary: 900, time: 85, label: "أوغندا", jobLabel: "مربية أطفال" },
    uganda_cook: { total: 4990, base: 4339, vat: 651, salary: 900, time: 85, label: "أوغندا", jobLabel: "طباخ / طباخة" },

    bangladesh_maid: { total: 7070, base: 6148, vat: 922, salary: 1000, time: 89, label: "بنجلاديش", jobLabel: "عاملة منزلية" },
    bangladesh_nanny: { total: 7070, base: 6148, vat: 922, salary: 1000, time: 89, label: "بنجلاديش", jobLabel: "مربية أطفال" },
    bangladesh_cook: { total: 7070, base: 6148, vat: 922, salary: 1000, time: 89, label: "بنجلاديش", jobLabel: "طباخ / طباخة" },
    bangladesh_houseboy: { total: 3402, base: 2958, vat: 444, salary: 1000, time: 89, label: "بنجلاديش", jobLabel: "عامل منزلي" },
    bangladesh_driver: { total: 3450, base: 3000, vat: 450, salary: 1000, time: 89, label: "بنجلاديش", jobLabel: "سائق خاص" },

    srilanka_maid: { total: 8000, base: 6957, vat: 1043, salary: 1200, time: 89, label: "سريلانكا", jobLabel: "عاملة منزلية" },
    srilanka_nanny: { total: 8000, base: 6957, vat: 1043, salary: 1200, time: 89, label: "سريلانكا", jobLabel: "مربية أطفال" },
    srilanka_cook: { total: 8000, base: 6957, vat: 1043, salary: 1200, time: 89, label: "سريلانكا", jobLabel: "طباخ / طباخة" },
    srilanka_houseboy: { total: 4500, base: 3913, vat: 587, salary: 1200, time: 89, label: "سريلانكا", jobLabel: "عامل منزلي" },
    srilanka_driver: { total: 3000, base: 2609, vat: 391, salary: 1200, time: 89, label: "سريلانكا", jobLabel: "سائق خاص" },

    india_maid: { total: 5665, base: 4926, vat: 739, salary: 1200, time: 55, label: "الهند", jobLabel: "عاملة منزلية" },
    india_nanny: { total: 5665, base: 4926, vat: 739, salary: 1200, time: 55, label: "الهند", jobLabel: "مربية أطفال" },
    india_cook: { total: 5665, base: 4926, vat: 739, salary: 1200, time: 55, label: "الهند", jobLabel: "طباخ / طباخة" },
    india_houseboy: { total: 4059, base: 3530, vat: 529, salary: 1200, time: 89, label: "الهند", jobLabel: "عامل منزلي" },
    india_driver: { total: 4070, base: 3539, vat: 531, salary: 1500, time: 89, label: "الهند", jobLabel: "سائق خاص" },

    sudan_houseboy: { total: 4057, base: 3528, vat: 529, salary: 1500, time: 85, label: "السودان", jobLabel: "عامل منزلي" },
    sudan_driver: { total: 3672, base: 3193, vat: 479, salary: 1500, time: 85, label: "السودان", jobLabel: "سائق خاص" },
    sudan_gardener: { total: 2228, base: 1937, vat: 291, salary: 1500, time: 85, label: "السودان", jobLabel: "مزارع منزلي" },

    egypt_houseboy: { total: 3940, base: 3426, vat: 514, salary: 1500, time: 89, label: "مصر", jobLabel: "عامل منزلي" },
    egypt_driver: { total: 3115, base: 2709, vat: 406, salary: 1500, time: 89, label: "مصر", jobLabel: "سائق خاص" },

    yemen_houseboy: { total: 3345, base: 2909, vat: 436, salary: 1500, time: 89, label: "اليمن", jobLabel: "عامل منزلي" },
    yemen_driver: { total: 4069, base: 3538, vat: 531, salary: 1500, time: 89, label: "اليمن", jobLabel: "سائق خاص" },

    pakistan_driver: { total: 2230, base: 1939, vat: 291, salary: 1500, time: 85, label: "باكستان", jobLabel: "سائق خاص" },
    pakistan_gardener: { total: 3615, base: 3143, vat: 472, salary: 1500, time: 89, label: "باكستان", jobLabel: "مزارع منزلي" }
  };

  let resumesList = [];
  let pricingData = {};

  // جلب السير الذاتية
  function loadResumes() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Error reading resumes:", e);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_RESUMES));
    return JSON.parse(JSON.stringify(DEFAULT_RESUMES));
  }

  // حفظ السير الذاتية
  function saveResumes(list) {
    resumesList = list;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    updateStats();
    renderResumesTable();
  }

  // جلب الأسعار للحاسبة
  function loadPricing() {
    try {
      const raw = localStorage.getItem(PRICING_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed === "object" && Object.keys(parsed).length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Error reading pricing:", e);
    }
    localStorage.setItem(PRICING_KEY, JSON.stringify(DEFAULT_PRICING));
    return JSON.parse(JSON.stringify(DEFAULT_PRICING));
  }

  // حفظ الأسعار
  function savePricing(data) {
    pricingData = data;
    localStorage.setItem(PRICING_KEY, JSON.stringify(data));
    renderPricingTable();
  }

  // ================= 1. تسجيل الدخول والخروج =================
    // دالة مساعدة لضغط وتصغير حجم الصور المرفوعة لتفادي امتلاء التخزين المحلي
  function compressImageFile(file, maxWidth, maxHeight, quality, callback) {
    if (!file || !file.type.startsWith("image/")) {
      alert("يرجى اختيار ملف صورة صالح (JPG, PNG, WEBP).");
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        callback(dataUrl);
      };
      img.onerror = function () {
        alert("تعذر قراءة ملف الصورة المحدد. يرجى تجربة صورة أخرى.");
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  window.attemptLogin = function () {
    const input = document.getElementById("adminPassword");
    const errorMsg = document.getElementById("loginError");
    const val = (input ? input.value : "").trim();

    if (VALID_PASSWORDS.includes(val)) {
      if (errorMsg) errorMsg.style.display = "none";
      sessionStorage.setItem(AUTH_KEY, "true");
      showDashboard();
    } else {
      if (errorMsg) {
        errorMsg.textContent = "كلمة المرور غير صحيحة! جرب كلمة المرور: admin123 أو najah2026";
        errorMsg.style.display = "block";
      }
      if (input) {
        input.focus();
        input.select();
      }
    }
  };

  window.togglePasswordVisibility = function (e) {
    if (e) e.preventDefault();
    const input = document.getElementById("adminPassword");
    if (input) {
      input.type = input.type === "password" ? "text" : "password";
    }
  };

  window.logout = function () {
    sessionStorage.removeItem(AUTH_KEY);
    const loginSection = document.getElementById("loginSection");
    const dashboardSection = document.getElementById("dashboardSection");
    const passInput = document.getElementById("adminPassword");

    if (loginSection) loginSection.style.display = "flex";
    if (dashboardSection) dashboardSection.style.display = "none";
    if (passInput) passInput.value = "";
  };

  function showDashboard() {
    const loginSection = document.getElementById("loginSection");
    const dashboardSection = document.getElementById("dashboardSection");

    if (loginSection) loginSection.style.display = "none";
    if (dashboardSection) dashboardSection.style.display = "block";

    resumesList = loadResumes();
    pricingData = loadPricing();

    updateStats();
    renderResumesTable();
    renderPricingTable();
  }

  // ================= 2. الإحصائيات =================
  function updateStats() {
    const total = resumesList.length;
    const avail = resumesList.filter((r) => r.status === "available").length;
    const reserved = total - avail;
    const percent = total > 0 ? Math.round((reserved / total) * 100) : 0;

    const elTotal = document.getElementById("statTotal");
    const elAvail = document.getElementById("statAvailable");
    const elRes = document.getElementById("statReserved");
    const elPct = document.getElementById("statPercent");

    if (elTotal) elTotal.textContent = total;
    if (elAvail) elAvail.textContent = avail;
    if (elRes) elRes.textContent = reserved;
    if (elPct) elPct.textContent = percent + "%";
  }

  // ================= 3. جدول السير الذاتية =================
  function renderResumesTable() {
    const tbody = document.getElementById("resumesTableBody");
    if (!tbody) return;

    if (resumesList.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="10" style="text-align: center; padding: 40px; color: var(--text-muted); font-weight: 700;">
            لا توجد سير ذاتية مضافة حالياً. انقر على "إضافة سيرة ذاتية جديدة +" للبدء.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = resumesList
      .map((cv, idx) => {
        const nat = NATION_MAP[cv.nationality] || { name: cv.nationality, flag: "🏳️" };
        const job = JOB_NAMES[cv.job] || cv.job;
        const isAvail = cv.status === "available";

        return `
          <tr>
            <td>
              <img src="${cv.photo || 'images/logo.jpg'}" alt="${cv.fullname}" class="table-thumb" onclick="openQuickPhotoModal('${cv.id}')" title="انقر لتعديل وتغيير الصورة مباشرة 📷" onerror="this.src='images/logo.jpg'" />
            </td>
            <td>
              <b>${cv.fullname}</b>
              <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">#${cv.id}</span>
            </td>
            <td>${job}</td>
            <td>${nat.flag} ${nat.name}</td>
            <td>${cv.age} سنة</td>
            <td>${cv.experience > 0 ? cv.experience + ' سنين' : 'جديدة'}</td>
            <td>${cv.religion || '—'}</td>
            <td><b>${Number(cv.salary).toLocaleString('en-US')} ر.س</b></td>
            <td>
              <span class="status-pill ${isAvail ? 'status-available' : 'status-reserved'}" onclick="toggleStatus('${cv.id}')" title="انقر للتبديل السريع">
                ${isAvail ? '🟢 متاحة' : '🔴 محجوزة'}
              </span>
            </td>
            <td>
              <div class="table-actions">
                <button type="button" class="btn-table-icon photo" onclick="openQuickPhotoModal('${cv.id}')" title="تغيير الصورة الشخصية">📷 صورة</button>
                <button type="button" class="btn-table-icon edit" onclick="openEditModal('${cv.id}')">تعديل ✏️</button>
                <button type="button" class="btn-table-icon toggle" onclick="toggleStatus('${cv.id}')">${isAvail ? 'حجز 🔒' : 'إتاحة 🔓'}</button>
                <button type="button" class="btn-table-icon delete" onclick="deleteResume('${cv.id}')">حذف 🗑️</button>
              </div>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  // تبديل حالة السيرة
  window.toggleStatus = function (id) {
    const cv = resumesList.find((r) => r.id === id);
    if (!cv) return;
    cv.status = cv.status === "available" ? "reserved" : "available";
    saveResumes(resumesList);
  };

  // حذف سيرة
  window.deleteResume = function (id) {
    const cv = resumesList.find((r) => r.id === id);
    if (!cv) return;
    if (confirm(`هل أنت متأكد من حذف السيرة الذاتية للمرشح (${cv.fullname})؟`)) {
      const updated = resumesList.filter((r) => r.id !== id);
      saveResumes(updated);
    }
  };

  // التحكم في الصورة داخل مودال الإضافة والتعديل
  window.triggerPhotoUpload = function () {
    const fileInput = document.getElementById("photoFileInput");
    if (fileInput) fileInput.click();
  };

  window.handleModalPhotoUpload = function (e) {
    const file = e.target.files[0];
    if (!file) return;

    compressImageFile(file, 450, 450, 0.85, function (dataUrl) {
      const previewImg = document.getElementById("photoPreviewImg");
      const actualVal = document.getElementById("photoActualValue");
      const pathInput = document.getElementById("photoPath");
      const photoSelect = document.getElementById("photoSelect");
      const customWrap = document.getElementById("customPathWrapper");

      if (previewImg) previewImg.src = dataUrl;
      if (actualVal) actualVal.value = dataUrl;
      if (pathInput) pathInput.value = dataUrl;
      if (photoSelect) photoSelect.value = "custom";
      if (customWrap) customWrap.style.display = "block";
    });
  };

  window.syncPhotoInput = function (val) {
    const previewImg = document.getElementById("photoPreviewImg");
    const actualVal = document.getElementById("photoActualValue");
    const pathInput = document.getElementById("photoPath");
    const customWrap = document.getElementById("customPathWrapper");

    if (val === "custom") {
      if (customWrap) customWrap.style.display = "block";
      if (pathInput) {
        pathInput.focus();
        if (actualVal && actualVal.value && !actualVal.value.startsWith("images/")) {
          pathInput.value = actualVal.value;
        }
      }
    } else {
      if (customWrap) customWrap.style.display = "none";
      if (actualVal) actualVal.value = val;
      if (pathInput) pathInput.value = val;
      if (previewImg) previewImg.src = val;
    }
  };

  window.updatePreviewFromInput = function (val) {
    const previewImg = document.getElementById("photoPreviewImg");
    const actualVal = document.getElementById("photoActualValue");
    const cleaned = val.trim();

    if (actualVal) actualVal.value = cleaned || "images/logo.jpg";
    if (previewImg) previewImg.src = cleaned || "images/logo.jpg";
  };

  // فتح نافذة الإضافة
  window.openAddModal = function () {
    const modal = document.getElementById("cvEditorModal");
    const form = document.getElementById("cvForm");
    const title = document.getElementById("modalFormTitle");
    const editIndex = document.getElementById("editIndex");

    if (form) form.reset();
    if (title) title.textContent = "إضافة سيرة ذاتية جديدة";
    if (editIndex) editIndex.value = "";

    const photoSelect = document.getElementById("photoSelect");
    const photoPath = document.getElementById("photoPath");
    const photoActual = document.getElementById("photoActualValue");
    const photoPreview = document.getElementById("photoPreviewImg");
    const customWrap = document.getElementById("customPathWrapper");
    const fileInput = document.getElementById("photoFileInput");

    if (photoSelect) photoSelect.value = "images/cv_sara.jpg";
    if (photoPath) photoPath.value = "images/cv_sara.jpg";
    if (photoActual) photoActual.value = "images/cv_sara.jpg";
    if (photoPreview) photoPreview.src = "images/cv_sara.jpg";
    if (customWrap) customWrap.style.display = "none";
    if (fileInput) fileInput.value = "";

    if (modal) modal.classList.add("open");
  };

  // فتح نافذة التعديل
  window.openEditModal = function (id) {
    const cv = resumesList.find((r) => r.id === id);
    if (!cv) return;

    const modal = document.getElementById("cvEditorModal");
    const title = document.getElementById("modalFormTitle");
    const editIndex = document.getElementById("editIndex");

    if (title) title.textContent = `تعديل السيرة الذاتية (${cv.fullname})`;
    if (editIndex) editIndex.value = cv.id;

    document.getElementById("fullname").value = cv.fullname || "";
    document.getElementById("job").value = cv.job || "maid";
    document.getElementById("nationality").value = cv.nationality || "ethiopia";
    document.getElementById("age").value = cv.age || "";
    document.getElementById("experience").value = cv.experience ?? "";
    document.getElementById("salary").value = cv.salary || "";
    document.getElementById("religion").value = cv.religion || "";
    document.getElementById("education").value = cv.education || "";
    document.getElementById("marital").value = cv.marital || "";
    document.getElementById("height").value = cv.height || "";
    document.getElementById("weight").value = cv.weight || "";
    document.getElementById("languages").value = cv.languages || "";
    document.getElementById("skills").value = cv.skills || "";
    document.getElementById("prevExp").value = cv.prevExp || "";
    document.getElementById("status").value = cv.status || "available";

    const photoSelect = document.getElementById("photoSelect");
    const photoPath = document.getElementById("photoPath");
    const photoActual = document.getElementById("photoActualValue");
    const photoPreview = document.getElementById("photoPreviewImg");
    const customWrap = document.getElementById("customPathWrapper");
    const fileInput = document.getElementById("photoFileInput");

    const currentPhoto = cv.photo || "images/logo.jpg";
    if (photoActual) photoActual.value = currentPhoto;
    if (photoPreview) photoPreview.src = currentPhoto;
    if (fileInput) fileInput.value = "";

    if (photoSelect && photoPath) {
      photoPath.value = currentPhoto;
      const optionExists = Array.from(photoSelect.options).some((o) => o.value === currentPhoto);
      if (optionExists) {
        photoSelect.value = currentPhoto;
        if (customWrap) customWrap.style.display = "none";
      } else {
        photoSelect.value = "custom";
        if (customWrap) customWrap.style.display = "block";
      }
    }

    if (modal) modal.classList.add("open");
  };

  // إغلاق مودال السير الذاتية
  window.closeEditorModal = function () {
    const modal = document.getElementById("cvEditorModal");
    if (modal) modal.classList.remove("open");
  };

  // حفظ نموذج السيرة
  window.saveCvForm = function (e) {
    e.preventDefault();

    const editId = document.getElementById("editIndex").value;
    const fullname = document.getElementById("fullname").value.trim();
    const job = document.getElementById("job").value;
    const nationality = document.getElementById("nationality").value;
    const age = Number(document.getElementById("age").value) || 25;
    const experience = Number(document.getElementById("experience").value) || 0;
    const salary = Number(document.getElementById("salary").value) || 1200;
    const religion = document.getElementById("religion").value.trim();
    const education = document.getElementById("education").value.trim();
    const marital = document.getElementById("marital").value.trim();
    const height = document.getElementById("height").value.trim();
    const weight = document.getElementById("weight").value.trim();
    const actualPhotoInput = document.getElementById("photoActualValue");
    const fallbackPathInput = document.getElementById("photoPath");
    const photoPath = (actualPhotoInput && actualPhotoInput.value.trim()) || 
                      (fallbackPathInput && fallbackPathInput.value.trim()) || 
                      "images/logo.jpg";
    const languages = document.getElementById("languages").value.trim();
    const skills = document.getElementById("skills").value.trim();
    const prevExp = document.getElementById("prevExp").value.trim();
    const status = document.getElementById("status").value;

    if (editId) {
      // تعديل
      const cv = resumesList.find((r) => r.id === editId);
      if (cv) {
        Object.assign(cv, {
          fullname,
          job,
          nationality,
          age,
          experience,
          salary,
          religion,
          education,
          marital,
          height,
          weight,
          photo: photoPath,
          languages,
          skills,
          prevExp,
          status
        });
      }
    } else {
      // إضافة جديدة
      const newId = "NJ-" + Math.floor(100 + Math.random() * 900);
      resumesList.unshift({
        id: newId,
        fullname,
        job,
        nationality,
        age,
        experience,
        salary,
        religion,
        education,
        marital,
        height,
        weight,
        photo: photoPath,
        languages,
        skills,
        prevExp,
        status
      });
    }

    saveResumes(resumesList);
    closeEditorModal();
    alert("تم حفظ السيرة الذاتية بنجاح! تم تحديث الصفحة والموقع فورياً.");
  };

  // ================= 4. إدارة أسعار وتكاليف الاستقدام للحاسبة =================
  function renderPricingTable() {
    const tbody = document.getElementById("pricingTableBody");
    if (!tbody) return;

    const keys = Object.keys(pricingData);
    if (keys.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 20px;">لا توجد بيانات تسعير.</td></tr>`;
      return;
    }

    tbody.innerHTML = keys
      .map((k) => {
        const item = pricingData[k];
        const base = item.base || Math.round(item.total / 1.15);
        const vat = item.vat || item.total - base;

        return `
          <tr>
            <td><b>${item.label || k}</b></td>
            <td>${item.jobLabel || k}</td>
            <td>${base.toLocaleString('en-US')} ر.س</td>
            <td>${vat.toLocaleString('en-US')} ر.س</td>
            <td><b style="color: var(--primary-color);">${item.total.toLocaleString('en-US')} ر.س</b></td>
            <td>${item.time} يوم</td>
            <td>${item.salary ? item.salary.toLocaleString('en-US') + ' ر.س' : '—'}</td>
            <td>
              <button type="button" class="btn-table-icon edit" onclick="openPricingModal('${k}')">
                تعديل التكلفة ✏️
              </button>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  window.openPricingModal = function (key) {
    const item = pricingData[key];
    if (!item) return;

    const modal = document.getElementById("pricingEditorModal");
    document.getElementById("pricingKey").value = key;
    document.getElementById("pricingLabel").value = `${item.label || ''} — ${item.jobLabel || ''}`;
    document.getElementById("pricingTotal").value = item.total;
    document.getElementById("pricingTime").value = item.time;
    document.getElementById("pricingSalary").value = item.salary || 1200;

    if (modal) modal.classList.add("open");
  };

  window.closePricingModal = function () {
    const modal = document.getElementById("pricingEditorModal");
    if (modal) modal.classList.remove("open");
  };

  window.savePricingForm = function (e) {
    e.preventDefault();

    const key = document.getElementById("pricingKey").value;
    const total = Number(document.getElementById("pricingTotal").value);
    const time = Number(document.getElementById("pricingTime").value);
    const salary = Number(document.getElementById("pricingSalary").value);

    if (pricingData[key]) {
      const base = Math.round(total / 1.15);
      const vat = total - base;

      pricingData[key].total = total;
      pricingData[key].base = base;
      pricingData[key].vat = vat;
      pricingData[key].time = time;
      pricingData[key].salary = salary;

      savePricing(pricingData);
      closePricingModal();
      alert("تم تحديث السعر بنجاح! ستظهر التكلفة الجديدة في حاسبة الاستقدام فوراً.");
    }
  };

  window.resetPricingToDefaults = function () {
    if (confirm("هل أنت متأكد من استعادة الأسعار والمدد الافتراضية لحاسبة الاستقدام؟")) {
      savePricing(DEFAULT_PRICING);
      alert("تمت استعادة الأسعار الافتراضية بنجاح.");
    }
  };

  // ================= 5. استيراد وتصدير وتهيئة البيانات =================
  
  // ================= 6. مودال التعديل السريع للصورة الشخصية =================
  let currentQuickPhotoData = "";

  window.openQuickPhotoModal = function (id) {
    const cv = resumesList.find((r) => r.id === id);
    if (!cv) return;

    const modal = document.getElementById("quickPhotoModal");
    const cvIdInput = document.getElementById("quickPhotoCvId");
    const nameEl = document.getElementById("quickPhotoCandidateName");
    const roleEl = document.getElementById("quickPhotoCandidateRole");
    const previewEl = document.getElementById("quickPhotoPreview");
    const selectEl = document.getElementById("quickPhotoSelect");
    const customWrap = document.getElementById("quickPhotoCustomWrap");
    const customUrlInput = document.getElementById("quickPhotoCustomUrl");
    const fileInput = document.getElementById("quickPhotoFileInput");

    if (cvIdInput) cvIdInput.value = cv.id;
    if (nameEl) nameEl.textContent = `${cv.fullname} (رمز #${cv.id})`;
    if (roleEl) {
      const job = JOB_NAMES[cv.job] || cv.job;
      const nat = NATION_MAP[cv.nationality] || { name: cv.nationality, flag: "" };
      roleEl.textContent = `${job} — ${nat.flag} ${nat.name}`;
    }

    currentQuickPhotoData = cv.photo || "images/logo.jpg";
    if (previewEl) previewEl.src = currentQuickPhotoData;
    if (fileInput) fileInput.value = "";

    if (selectEl) {
      const exists = Array.from(selectEl.options).some((o) => o.value === currentQuickPhotoData);
      if (exists) {
        selectEl.value = currentQuickPhotoData;
        if (customWrap) customWrap.style.display = "none";
      } else {
        selectEl.value = "custom";
        if (customWrap) customWrap.style.display = "block";
        if (customUrlInput) customUrlInput.value = currentQuickPhotoData;
      }
    }

    if (modal) modal.classList.add("open");
  };

  window.closeQuickPhotoModal = function () {
    const modal = document.getElementById("quickPhotoModal");
    if (modal) modal.classList.remove("open");
  };

  window.triggerQuickPhotoUpload = function () {
    const fileInput = document.getElementById("quickPhotoFileInput");
    if (fileInput) fileInput.click();
  };

  window.handleQuickPhotoUpload = function (e) {
    const file = e.target.files[0];
    if (!file) return;

    compressImageFile(file, 450, 450, 0.85, function (dataUrl) {
      currentQuickPhotoData = dataUrl;
      const previewEl = document.getElementById("quickPhotoPreview");
      const selectEl = document.getElementById("quickPhotoSelect");
      const customWrap = document.getElementById("quickPhotoCustomWrap");
      const customUrlInput = document.getElementById("quickPhotoCustomUrl");

      if (previewEl) previewEl.src = dataUrl;
      if (selectEl) selectEl.value = "custom";
      if (customWrap) customWrap.style.display = "block";
      if (customUrlInput) customUrlInput.value = "تم اختيار وضغط صورة من جهازك بنجاح";
    });
  };

  window.syncQuickPhotoSelect = function (val) {
    const previewEl = document.getElementById("quickPhotoPreview");
    const customWrap = document.getElementById("quickPhotoCustomWrap");
    const customUrlInput = document.getElementById("quickPhotoCustomUrl");

    if (val === "custom") {
      if (customWrap) customWrap.style.display = "block";
      if (customUrlInput) customUrlInput.focus();
    } else {
      if (customWrap) customWrap.style.display = "none";
      currentQuickPhotoData = val;
      if (previewEl) previewEl.src = val;
    }
  };

  window.syncQuickPhotoCustom = function (val) {
    const previewEl = document.getElementById("quickPhotoPreview");
    const cleaned = val.trim();
    currentQuickPhotoData = cleaned || "images/logo.jpg";
    if (previewEl) previewEl.src = currentQuickPhotoData;
  };

  window.saveQuickPhoto = function () {
    const cvId = document.getElementById("quickPhotoCvId").value;
    const cv = resumesList.find((r) => r.id === cvId);
    if (!cv) return;

    if (!currentQuickPhotoData) {
      alert("يرجى اختيار أو رفع صورة أولاً.");
      return;
    }

    cv.photo = currentQuickPhotoData;
    saveResumes(resumesList);
    closeQuickPhotoModal();
    alert(`تم تحديث الصورة الشخصية للمرشح/ة (${cv.fullname}) بنجاح! تم تطبيق التغيير فوراً في لوحة التحكم وموقع السير الذاتية.`);
  };


  window.exportData = function () {
    const backupData = {
      version: "1.0",
      exportedAt: new Date().toISOString(),
      resumes: resumesList,
      pricing: pricingData
    };
    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `alnajah_recruitment_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  window.triggerImport = function () {
    const input = document.getElementById("importFileInput");
    if (input) input.click();
  };

  window.importData = function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (evt) {
      try {
        const imported = JSON.parse(evt.target.result);
        if (imported.resumes && Array.isArray(imported.resumes)) {
          saveResumes(imported.resumes);
        }
        if (imported.pricing && typeof imported.pricing === "object") {
          savePricing(imported.pricing);
        }
        alert("تم استيراد البيانات وتحديث النظام بنجاح!");
      } catch (err) {
        alert("عذراً، حدث خطأ أثناء قراءة ملف النسخة الاحتياطية. يرجى التأكد من صحة الملف.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  window.resetToDefaults = function () {
    if (confirm("تحذير: هل أنت متأكد من إعادة تعيين جميع السير الذاتية إلى القائمة الافتراضية؟ سيتم مسح أي تعديلات يدوية.")) {
      saveResumes(DEFAULT_RESUMES);
      alert("تمت استعادة السير الذاتية الافتراضية بنجاح.");
    }
  };

  // ================= التهيئة الأولية عند تحميل الصفحة =================
  document.addEventListener("DOMContentLoaded", () => {
    // التحقق من حالة تسجيل الدخول المحفوظة
    if (sessionStorage.getItem(AUTH_KEY) === "true") {
      showDashboard();
    } else {
      const loginSection = document.getElementById("loginSection");
      const passInput = document.getElementById("adminPassword");
      if (loginSection) loginSection.style.display = "flex";
      if (passInput) {
        passInput.addEventListener("keypress", (e) => {
          if (e.key === "Enter") window.attemptLogin();
        });
      }
    }
  });
})();
