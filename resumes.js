/**
 * resumes.js - نظام إدارة وتصفية السير الذاتية التفاعلي (مبني على اختيار الجنسية أولاً)
 * مكتب النجاح للاستقدام
 */

(function () {
  "use strict";

  const STORAGE_KEY = "alnajah_resumes_v2";
  const OLD_STORAGE_KEY = "alnajah_resumes_v1";
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
    "sri-lanka": { name: "سريلانكا", flag: "🇱🇰" },
    india: { name: "الهند", flag: "🇮🇳" },
    sudan: { name: "السودان", flag: "🇸🇩" },
    burundi: { name: "بوروندي", flag: "🇧🇮" },
    sierraleone: { name: "سيراليون", flag: "🇸🇱" },
    "sierra-leone": { name: "سيراليون", flag: "🇸🇱" },
    egypt: { name: "مصر", flag: "🇪🇬" },
    yemen: { name: "اليمن", flag: "🇾🇪" },
    pakistan: { name: "باكستان", flag: "🇵🇰" }
  };

  // بطاقات الجنسيات المعتمدة للخطوة الأولى
  const NATIONS_CATALOG = [
    { key: "all", name: "جميع الجنسيات", flag: "🌐", roles: "استعراض كافة السير المتاحة" },
    { key: "ethiopia", name: "إثيوبيا", flag: "🇪🇹", roles: "عاملة منزلية، طاهية" },
    { key: "kenya", name: "كينيا", flag: "🇰🇪", roles: "عاملة منزلية، رعاية" },
    { key: "uganda", name: "أوغندا", flag: "🇺🇬", roles: "سائق خاص، عاملة منزلية" },
    { key: "philippines", name: "الفلبين", flag: "🇵🇭", roles: "مربية أطفال، تمريض" },
    { key: "india", name: "الهند", flag: "🇮🇳", roles: "سائق خاص" },
    { key: "srilanka", name: "سريلانكا", flag: "🇱🇰", roles: "عاملة منزلية، مربية" },
    { key: "bangladesh", name: "بنجلاديش", flag: "🇧🇩", roles: "عمالة منزلية وسائقون" },
    { key: "tanzania", name: "تنزانيا", flag: "🇹🇿", roles: "عمالة منزلية" },
    { key: "sudan", name: "السودان", flag: "🇸🇩", roles: "سائقون وعمالة" },
    { key: "burundi", name: "بوروندي", flag: "🇧🇮", roles: "عمالة منزلية" },
    { key: "sierraleone", name: "سيراليون", flag: "🇸🇱", roles: "عمالة منزلية" }
  ];

  // قاعدة بيانات السير الذاتية الافتراضية المعتمدة
  const DEFAULT_RESUMES = [
    {
      id: "NJ-117",
      fullname: "نشيميريمانا كارين (NSHIMIRIMANA CARINE)",
      job: "maid",
      nationality: "burundi",
      age: 31,
      experience: 0,
      salary: 800,
      religion: "مسيحية",
      education: "ثانوي (Secondary)",
      marital: "عزباء (عدد الأطفال: 0)",
      height: "168 سم",
      weight: "56 كجم",
      photo: "images/cv_carine.jpg",
      languages: "الكيروندية، الفرنسية، الإنجليزية (مبتدئ)",
      skills: "التنظيف الشامل، الكوي، عناية الرضيع والأطفال، الغسيل",
      prevExp: "جديدة — لم يسبق لها العمل بالخارج (رقم الجواز: P00173788)",
      status: "available"
    },
    {
      id: "NJ-118",
      fullname: "شورويريمانا شانتال (SHURWERYIMANA CHANTAL)",
      job: "maid",
      nationality: "burundi",
      age: 27,
      experience: 0,
      salary: 800,
      religion: "مسيحية",
      education: "ثانوي (High School)",
      marital: "عزباء (عدد الأطفال: 0)",
      height: "154 سم",
      weight: "59 كجم",
      photo: "images/cv_chantal.jpg",
      languages: "الكيروندية، الفرنسية، الإنجليزية (مبتدئ)",
      skills: "التنظيف الشامل، الطبخ، مجالسة الأطفال، الغسيل",
      prevExp: "جديدة — لم يسبق لها العمل بالخارج (رقم الجواز: P00353752)",
      status: "available"
    },
    {
      id: "NJ-114",
      fullname: "إراكازا إيفانجلين (IRAKAZA EVANGELINE)",
      job: "maid",
      nationality: "burundi",
      age: 27,
      experience: 0,
      salary: 800,
      religion: "مسيحية",
      education: "ثانوي (Secondary)",
      marital: "عزباء (عدد الأطفال: 0)",
      height: "155 سم",
      weight: "55 كجم",
      photo: "images/cv_irakaza.jpg",
      languages: "الكيروندية، الفرنسية، الإنجليزية (مبتدئ)",
      skills: "التنظيف الشامل، الكوي، عناية الرضيع والأطفال، الغسيل",
      prevExp: "جديدة — لم يسبق لها العمل بالخارج (رقم الجواز: P00143982)",
      status: "available"
    },
    {
      id: "NJ-115",
      fullname: "هابونيمانا فرانسين (HABONIMANA FRANCINE)",
      job: "maid",
      nationality: "burundi",
      age: 37,
      experience: 0,
      salary: 800,
      religion: "مسيحية",
      education: "ابتدائي (Primary)",
      marital: "متزوجة (عدد الأطفال: 1)",
      height: "170 سم",
      weight: "56 كجم",
      photo: "images/cv_habonimana.jpg",
      languages: "الكيروندية، الفرنسية، الإنجليزية (مبتدئ)",
      skills: "التنظيف الشامل، الكوي، عناية الرضيع والأطفال، الغسيل",
      prevExp: "جديدة — لم يسبق لها العمل بالخارج (رقم الجواز: OP02060124)",
      status: "available"
    },
    {
      id: "NJ-116",
      fullname: "أكيمانا دانسيل (AKIMANA DANCILE)",
      job: "maid",
      nationality: "burundi",
      age: 26,
      experience: 0,
      salary: 800,
      religion: "مسيحية",
      education: "ثانوي (Secondary)",
      marital: "متزوجة (عدد الأطفال: 2)",
      height: "168 سم",
      weight: "57 كجم",
      photo: "images/cv_akimana.jpg",
      languages: "الكيروندية، الفرنسية، الإنجليزية (مبتدئ)",
      skills: "التنظيف الشامل، الكوي، عناية الرضيع والأطفال، الغسيل",
      prevExp: "جديدة — لم يسبق لها العمل بالخارج (رقم الجواز: P00338382)",
      status: "available"
    },
    {
      id: "NJ-101",
      fullname: "سارة م.",
      job: "maid",
      nationality: "ethiopia",
      age: 26,
      experience: 3,
      salary: 900,
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
      salary: 900,
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
      age: 31,
      experience: 5,
      salary: 1500,
      religion: "مسيحية",
      education: "بكالوريوس تمريض",
      marital: "عزباء",
      height: "158 سم",
      weight: "52 كجم",
      photo: "images/cv_grace.jpg",
      languages: "الإنجليزية (بطلاقة فائقة)، العربية (متوسط)",
      skills: "رعاية حديثي الولادة والأطفال، الإسعافات الأولية، مساعدة بالدراسة",
      prevExp: "3 سنوات في دبي مع عائلة دبلوماسية، سنتان بمانيلا",
      status: "available"
    },
    {
      id: "NJ-105",
      fullname: "كومار س.",
      job: "driver",
      nationality: "india",
      age: 35,
      experience: 8,
      salary: 1600,
      religion: "هندوسي",
      education: "ثانوي + رخصة قيادة سعودية سارية",
      marital: "متزوج ولديه 3 أبناء",
      height: "170 سم",
      weight: "68 كجم",
      photo: "images/cv_kumar.jpg",
      languages: "العربية (بطلاقة)، الهندية، الإنجليزية (أساسي)",
      skills: "القيادة الهادئة والآمنة، الالتزام بالمواعيد، العناية بنظافة السيارة",
      prevExp: "6 سنوات في الرياض والدمام مع نفس العائلة",
      status: "available"
    },
    {
      id: "NJ-106",
      fullname: "فاطمة ع.",
      job: "chef",
      nationality: "ethiopia",
      age: 33,
      experience: 7,
      salary: 1200,
      religion: "مسلمة",
      education: "متوسط + دورات طهي منزلي",
      marital: "أرملة",
      height: "160 سم",
      weight: "65 كجم",
      photo: "images/cv_fatima.jpg",
      languages: "العربية (ممتاز)، الأمهرية",
      skills: "الكبسات السعودية، المرقوق، المعجنات، الإيدامات، الحلويات الشرقية",
      prevExp: "5 سنوات طاهية رئيسية في قصر بالرياض، سنتان بجدة",
      status: "available"
    },
    {
      id: "NJ-107",
      fullname: "عائشة م.",
      job: "maid",
      nationality: "uganda",
      age: 24,
      experience: 0,
      salary: 900,
      religion: "مسلمة",
      education: "ثانوي عام",
      marital: "عزباء",
      height: "163 سم",
      weight: "56 كجم",
      photo: "images/logo.jpg",
      languages: "الإنجليزية (جيد)، العربية (مبتدئ)",
      skills: "نشيطة وسريعة التعلم، تنظيف عام، غسيل ملابس، مساعدة بالمطبخ",
      prevExp: "جديدة كلياً بدون خبرة سابقة (تدريب مهني بمركز كمبالا)",
      status: "available"
    },
    {
      id: "NJ-108",
      fullname: "سودارما ك.",
      job: "maid",
      nationality: "srilanka",
      age: 36,
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
    },
    {
      id: "NJ-109",
      fullname: "نادية ج.",
      job: "maid",
      nationality: "burundi",
      age: 25,
      experience: 2,
      salary: 800,
      religion: "مسيحية",
      education: "ثانوي عام",
      marital: "عزباء",
      height: "160 سم",
      weight: "56 كجم",
      photo: "images/cv_mary.jpg",
      languages: "الفرنسية، السواحيلية، الإنجليزية (أساسي)",
      skills: "النظافة الشاملة، الغسيل والكي، ترتيب المنزل، مساعدة المطبخ",
      prevExp: "سنتان في بوجومبورا",
      status: "available"
    },
    {
      id: "NJ-110",
      fullname: "ريحانة ب.",
      job: "maid",
      nationality: "bangladesh",
      age: 28,
      experience: 4,
      salary: 1200,
      religion: "مسلمة",
      education: "ثانوي",
      marital: "متزوجة",
      height: "155 سم",
      weight: "54 كجم",
      photo: "images/cv_sara.jpg",
      languages: "العربية (متوسط)، البنغالية",
      skills: "الطهي الخليجي البسيط، النظافة، رعاية كبار السن، الكي السريع",
      prevExp: "سنتان في الدمام، سنتان في دكا",
      status: "available"
    },
    {
      id: "NJ-111",
      fullname: "أسماء ز.",
      job: "maid",
      nationality: "tanzania",
      age: 27,
      experience: 3,
      salary: 900,
      religion: "مسلمة",
      education: "ثانوي عام",
      marital: "عزباء",
      height: "164 سم",
      weight: "60 كجم",
      photo: "images/cv_mary.jpg",
      languages: "السواحيلية، الإنجليزية (جيد جداً)، العربية (مبتدئ)",
      skills: "إدارة شؤون المنزل، العناية بالأطفال، التنظيف المتكامل، الهدوء والأمانة",
      prevExp: "3 سنوات في دار السلام",
      status: "available"
    },
    {
      id: "NJ-112",
      fullname: "فاطماتا ك.",
      job: "maid",
      nationality: "sierraleone",
      age: 26,
      experience: 2,
      salary: 900,
      religion: "مسلمة",
      education: "ثانوي عام",
      marital: "عزباء",
      height: "162 سم",
      weight: "57 كجم",
      photo: "images/cv_mary.jpg",
      languages: "الإنجليزية (ممتاز)، العربية (أساسي)",
      skills: "النشاط العالي، سرعة التعلم، غسيل وكي الملابس، التنظيف العام",
      prevExp: "سنتان في فريتاون في منازل عائلية",
      status: "available"
    },
    {
      id: "NJ-113",
      fullname: "جوي ر.",
      job: "maid",
      nationality: "philippines",
      age: 30,
      experience: 5,
      salary: 1500,
      religion: "مسيحية",
      education: "دبلوم مهني",
      marital: "متزوجة",
      height: "157 سم",
      weight: "51 كجم",
      photo: "images/cv_grace.jpg",
      languages: "الإنجليزية (بطلاقة)، التاغالوغ، العربية (متوسط)",
      skills: "التدبير المنزلي الحديث، استخدام الأجهزة الكهربائية، الطهي، التنظيم والترتيب",
      prevExp: "3 سنوات في مانيلا، سنتان في الرياض",
      status: "available"
    }
  ];

  const DELETED_IDS_KEY = "alnajah_deleted_cv_ids";

  // جلب السير الذاتية من التخزين المحلي مع الترقية التلقائية وحفظ أي سير يدوية
  function getStoredResumes() {
    let deletedIds = [];
    try {
      const delRaw = localStorage.getItem(DELETED_IDS_KEY);
      if (delRaw) deletedIds = JSON.parse(delRaw) || [];
    } catch (e) {}

    // 1. فحص وجود مزامنة مباشرة عبر window.name (لضمان التزامن عند فتح الملفات محلياً عبر file://)
    try {
      if (window.name && window.name.indexOf("ALNAJAH_SYNC:") === 0) {
        const syncedJson = window.name.substring("ALNAJAH_SYNC:".length);
        const syncedData = JSON.parse(syncedJson);
        if (Array.isArray(syncedData) && syncedData.length > 0) {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(syncedData));
          } catch (err) {}
          return syncedData;
        }
      }
    } catch (e) {}

    // 2. قراءة التخزين المحلي ودمج أي سير مضافة من لوحة التحكم في المقدمة
    try {
      let raw = localStorage.getItem(STORAGE_KEY);
      let oldRaw = localStorage.getItem(OLD_STORAGE_KEY);
      let list = [];

      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) list = parsed;
      }

      // دمج أي سير ذاتية من النسخة القديمة v1 لم تكن موجودة
      if (oldRaw) {
        try {
          const oldList = JSON.parse(oldRaw);
          if (Array.isArray(oldList)) {
            oldList.forEach((oldItem) => {
              if (oldItem && oldItem.id && !list.some((x) => x.id === oldItem.id) && !deletedIds.includes(oldItem.id)) {
                list.unshift(oldItem);
              }
            });
          }
        } catch (e) {}
      }

      if (list.length > 0) {
        let updated = false;
        // إدراج أي سير افتراضية جديدة في مقدمة القائمة حتى تظهر للزوار فوراً
        for (let i = DEFAULT_RESUMES.length - 1; i >= 0; i--) {
          const dr = DEFAULT_RESUMES[i];
          if (deletedIds.includes(dr.id)) continue;
          const existingIdx = list.findIndex((p) => p && p.id === dr.id);
          if (existingIdx === -1) {
            list.unshift(dr);
            updated = true;
          }
        }
        if (updated) {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
          } catch (e) {}
        }
        return list;
      }
    } catch (e) {
      console.warn("Could not read resumes from localStorage:", e);
    }

    const initialList = DEFAULT_RESUMES.filter((dr) => !deletedIds.includes(dr.id));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialList));
    } catch (e) {}
    return initialList;
  }

  let allResumes = [];
  let filteredResumes = [];
  let selectedNationality = "all"; // عرض جميع السير الذاتية المتاحة فوراً عند فتح الصفحة

  // حساب عدد السير المتاحة لكل جنسية
  function getAvailCount(natKey) {
    if (!natKey || natKey === "all") {
      return allResumes.filter((r) => r.status === "available").length;
    }
    return allResumes.filter((r) => r.nationality === natKey && r.status === "available").length;
  }

  // بناء وعرض بطاقات الجنسيات في الخطوة الأولى
  function renderNationalityCards() {
    const grid = document.getElementById("natCardsGrid");
    if (!grid) return;

    // إضافة أي جنسية جديدة مضافة في السير الذاتية غير موجودة في القائمة الأساسية
    const catalog = NATIONS_CATALOG.slice();
    allResumes.forEach((cv) => {
      if (cv.nationality && !catalog.some((c) => c.key === cv.nationality)) {
        const natInfo = NATION_MAP[cv.nationality] || { name: cv.nationality, flag: "🏳️" };
        catalog.push({
          key: cv.nationality,
          name: natInfo.name,
          flag: natInfo.flag,
          roles: "عمالة منزلية ومهنية"
        });
      }
    });

    grid.innerHTML = catalog.map((item) => {
      const count = getAvailCount(item.key);
      const isActive = (selectedNationality || "all") === item.key;
      const totalForNat = item.key === "all" ? allResumes.length : allResumes.filter((r) => r.nationality === item.key).length;
      const countBadge = count > 0
        ? `<span class="nat-card-badge has-cvs">${count} سيرة متاحة</span>`
        : totalForNat > 0
          ? `<span class="nat-card-badge has-cvs">${totalForNat} سيرة مسجلة</span>`
          : `<span class="nat-card-badge empty-cvs">استقدام عند الطلب</span>`;

      return `
        <button type="button" class="nat-card-btn ${isActive ? 'active' : ''}" onclick="selectNationality('${item.key}')">
          <span class="nat-card-flag">${item.flag}</span>
          <h3 class="nat-card-name">${item.name}</h3>
          <span class="nat-card-role">${item.roles}</span>
          ${countBadge}
        </button>
      `;
    }).join("");
  }

  // اختيار جنسية وعرض سيرها الذاتية
  window.selectNationality = function (natKey, shouldScroll = true) {
    if (!natKey) natKey = "all";
    if (natKey === "sri-lanka") natKey = "srilanka";
    if (natKey === "sierra-leone") natKey = "sierraleone";
    selectedNationality = natKey;

    const natStepSection = document.getElementById("natStepSection");
    const activeBanner = document.getElementById("activeNatBanner");
    const activeFlag = document.getElementById("activeNatFlag");
    const activeName = document.getElementById("activeNatName");
    const activeCount = document.getElementById("activeNatCount");
    const cvFiltersBar = document.getElementById("cvFiltersBar");
    const natFilter = document.getElementById("nationalityFilter");

    // تحديث القائمة المنسدلة
    if (natFilter) {
      natFilter.value = natKey;
    }

    // إبقاء بطاقات الجنسيات وشريط الفلاتر ظاهرين دائماً لسهولة التنقل الفوري
    if (natStepSection) natStepSection.style.display = "block";
    if (cvFiltersBar) cvFiltersBar.style.display = "grid";

    if (activeBanner) {
      if (natKey === "all") {
        activeBanner.style.display = "none";
      } else {
        const natItem = NATIONS_CATALOG.find((n) => n.key === natKey) || NATION_MAP[natKey] || { name: natKey, flag: "🏳️" };
        const count = getAvailCount(natKey);

        if (activeFlag) activeFlag.textContent = natItem.flag || "🏳️";
        if (activeName) activeName.textContent = natItem.name || natKey;
        if (activeCount) {
          activeCount.textContent = count > 0 ? `${count} سيرة متاحة للحجز` : "متاح الاستقدام الفوري عبر مساند";
        }
        activeBanner.style.display = "flex";
      }
    }

    renderNationalityCards();
    applyFilters();

    if (shouldScroll) {
      const gridEl = document.getElementById("cvFiltersBar") || document.getElementById("resumesGrid");
      if (gridEl) {
        const topOffset = gridEl.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top: Math.max(0, topOffset), behavior: "smooth" });
      }
    }
  };

  // إعادة ضبط واختيار جنسية أخرى (عرض الجميع)
  window.resetNationalityChoice = function () {
    selectedNationality = "all";

    const natStepSection = document.getElementById("natStepSection");
    const activeBanner = document.getElementById("activeNatBanner");
    const cvFiltersBar = document.getElementById("cvFiltersBar");
    const natFilter = document.getElementById("nationalityFilter");

    if (natFilter) natFilter.value = "all";
    if (natStepSection) natStepSection.style.display = "block";
    if (activeBanner) activeBanner.style.display = "none";
    if (cvFiltersBar) cvFiltersBar.style.display = "grid";

    renderNationalityCards();
    applyFilters();
  };

  // عارض صورة السيرة الذاتية بالحجم الكامل (Lightbox)
  window.openCvImageLightbox = function (imgSrc, titleText) {
    let lb = document.getElementById("cvImageLightbox");
    if (!lb) {
      lb = document.createElement("div");
      lb.id = "cvImageLightbox";
      lb.style.cssText = "position:fixed;inset:0;z-index:99999;background:rgba(7,24,48,0.92);display:none;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(6px);";
      lb.innerHTML = `
        <div style="position:relative;max-width:95vw;max-height:92vh;display:flex;flex-direction:column;align-items:center;background:#fff;border-radius:16px;padding:14px;box-shadow:0 25px 50px rgba(0,0,0,0.5);">
          <div style="width:100%;display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding:0 6px;gap:16px;">
            <strong id="cvLightboxTitle" style="color:#0b2545;font-size:1rem;">صورة السيرة الذاتية</strong>
            <button type="button" id="cvLightboxClose" style="background:#ef4444;color:#fff;border:none;border-radius:8px;padding:6px 14px;font-family:inherit;font-weight:800;cursor:pointer;">إغلاق ✕</button>
          </div>
          <div style="overflow:auto;max-height:80vh;max-width:90vw;text-align:center;">
            <img id="cvLightboxImg" src="" alt="صورة السيرة الذاتية" style="max-width:100%;height:auto;border-radius:10px;display:block;margin:0 auto;" />
          </div>
        </div>
      `;
      document.body.appendChild(lb);
      lb.addEventListener("click", (e) => {
        if (e.target === lb || e.target.id === "cvLightboxClose") {
          lb.style.display = "none";
        }
      });
    }
    const imgEl = document.getElementById("cvLightboxImg");
    const titleEl = document.getElementById("cvLightboxTitle");
    if (imgEl) imgEl.src = imgSrc || "images/logo.jpg";
    if (titleEl) titleEl.textContent = titleText || "صورة السيرة الذاتية الكاملة";
    lb.style.display = "flex";
  };

  // التأكد من وجود نافذة التفاصيل
  function ensureCvModalExists() {
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
            <button type="button" class="cv-modal-close" id="cvModalCloseBtn" aria-label="إغلاق">&times;</button>
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

      const bd = document.getElementById("cvModalCloseBackdrop");
      const cb = document.getElementById("cvModalCloseBtn");
      const dm = document.getElementById("cvModalDismiss");
      if (bd) bd.addEventListener("click", closeMod);
      if (cb) cb.addEventListener("click", closeMod);
      if (dm) dm.addEventListener("click", closeMod);

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && cvModal.classList.contains("open")) {
          closeMod();
        }
      });
    }
    return cvModal;
  }

  // عرض تفاصيل سيرة معينة
  window.showCvDetails = function (cvId) {
    const cv = allResumes.find((item) => item.id === cvId);
    if (!cv) return;

    const nat = NATION_MAP[cv.nationality] || { name: cv.nationality, flag: "🏳️" };
    const jobText = JOB_NAMES[cv.job] || cv.job;
    const isAvail = cv.status === "available";
    const photoSrc = cv.photo || "images/logo.jpg";

    const cvModal = ensureCvModalExists();
    const modalBody = document.getElementById("cvModalBody");
    const bookBtn = document.getElementById("cvModalBookBtn");

    if (modalBody) {
      modalBody.innerHTML = `
        <div class="cv-detail-hero">
          <img src="${photoSrc}" alt="${cv.fullname}" class="cv-detail-photo" style="cursor: zoom-in;" onclick="window.openCvImageLightbox('${photoSrc}', '${cv.fullname} - #${cv.id}')" title="انقر لتكبير الصورة" onerror="this.src='images/logo.jpg'" />
          <div class="cv-detail-info">
            <h4>${cv.fullname} (${cv.id})</h4>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 6px; align-items: center;">
              <span class="cv-job-title">${jobText}</span>
              <span class="cv-badge-status ${isAvail ? 'available' : 'reserved'}" style="position: static;">
                ${isAvail ? '🟢 متاحة للاستقدام الفوري' : '🔴 محجوزة حالياً'}
              </span>
              <button type="button" onclick="window.openCvImageLightbox('${photoSrc}', '${cv.fullname} - #${cv.id}')" style="background: #eef4fb; color: #0b2545; border: 1px solid #cbd5e1; border-radius: 8px; padding: 4px 10px; font-family: inherit; font-size: 0.8rem; font-weight: 700; cursor: pointer;">
                🔍 تكبير صورة السيرة
              </button>
            </div>
          </div>
        </div>

        <table class="cv-detail-table">
          <tbody>
            <tr><th>الجنسية</th><td>${nat.flag} ${nat.name}</td></tr>
            <tr><th>العمر</th><td>${cv.age} سنة</td></tr>
            <tr><th>سنوات الخبرة</th><td>${cv.experience > 0 ? 'سبق لها العمل (' + cv.experience + ' سنوات)' : 'لم يسبق لها العمل (جديدة)'}</td></tr>
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
        <div style="margin-top: 18px; text-align: center;">
          <div style="font-weight: 800; color: #0b2545; margin-bottom: 8px; font-size: 0.92rem;">📄 صورة نموذج السيرة الذاتية الرسمية (انقر للتكبير):</div>
          <img src="${photoSrc}" alt="${cv.fullname}" style="width: 100%; max-height: 680px; object-fit: contain; border-radius: 12px; border: 2px solid #e2e8f0; cursor: zoom-in; background: #fff;" onclick="window.openCvImageLightbox('${photoSrc}', '${cv.fullname} - #${cv.id}')" onerror="this.style.display='none'" />
        </div>
      `;
    }

    if (bookBtn) {
      const waMsg = `مرحباً مكتب النجاح، أرغب بحجز السيرة الذاتية التالية:\n- الرمز: ${cv.id}\n- الاسم: ${cv.fullname}\n- المهنة: ${jobText}\n- الجنسية: ${nat.name}\n- الراتب: ${cv.salary} ر.س\nيرجى إفادتي بإجراءات التعاقد وحجز السيرة عبر منصة مساند.`;
      bookBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waMsg)}`;
      if (!isAvail) {
        bookBtn.style.opacity = "0.6";
        bookBtn.innerHTML = `السيرة محجوزة (استفسر عن البديل)`;
      } else {
        bookBtn.style.opacity = "1";
        bookBtn.innerHTML = `حجز هذه السيرة عبر واتساب 📲`;
      }
    }

    cvModal.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  // توليد بطاقة HTML لكل سيرة
  function renderCard(cv) {
    const isEn = typeof window.getCurrentLanguage === "function" && window.getCurrentLanguage() === "en";
    const nat = NATION_MAP[cv.nationality] || { name: cv.nationality, flag: "🏳️" };
    const jobText = (isEn && JOB_NAMES[cv.job]?.en) || JOB_NAMES[cv.job] || cv.job;
    const isAvail = cv.status === "available";
    const photoSrc = cv.photo || "images/logo.jpg";

    const skillChips = (cv.skills || "")
      .split(/[،,]/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .slice(0, 4)
      .map((s) => `<span class="cv-skill-chip">${s}</span>`)
      .join("");

    const waMsg = isEn
      ? `Hello Al-Najah Recruitment, I would like to inquire about booking candidate (${cv.fullname} - Code #${cv.id} - ${jobText} from ${nat.name}).`
      : `مرحباً مكتب النجاح للاستقدام، أود الاستفسار وحجز السيرة الذاتية (${cv.fullname} - رمز #${cv.id} - مهنة ${jobText} من ${nat.name}).`;
    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waMsg)}`;

    return `
      <div class="cv-card" data-id="${cv.id}">
        <div class="cv-card-media" style="cursor: pointer;" onclick="showCvDetails('${cv.id}')" title="انقر لعرض تفاصيل وصورة السيرة الكاملة">
          <img src="${photoSrc}" alt="${cv.fullname}" onerror="this.src='images/logo.jpg'" />
          <span class="cv-badge-status ${isAvail ? 'available' : 'reserved'}">
            ${isAvail ? (isEn ? '🟢 Available' : '🟢 متاحة للحجز') : (isEn ? '🔴 Reserved' : '🔴 محجوزة')}
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
            <span class="cv-age-tag">${cv.age} ${isEn ? 'yrs' : 'سنة'}</span>
          </div>

          <span class="cv-job-title">${jobText}</span>

          <div class="cv-facts-grid">
            <div class="cv-fact-item">
              <span class="cv-fact-label">${isEn ? 'Monthly Salary' : 'الراتب الشهري'}</span>
              <span class="cv-fact-val" style="color: var(--primary-color); font-weight:800;">${Number(cv.salary).toLocaleString('en-US')} ${isEn ? 'SAR' : 'ر.س'}</span>
            </div>
            <div class="cv-fact-item">
              <span class="cv-fact-label">${isEn ? 'Experience' : 'سنوات الخبرة'}</span>
              <span class="cv-fact-val">${cv.experience > 0 ? (isEn ? 'Experienced (' + cv.experience + ' yrs)' : 'سبق لها العمل (' + cv.experience + ' سنوات)') : (isEn ? 'Fresh / New' : 'لم يسبق لها العمل (جديدة)')}</span>
            </div>
            <div class="cv-fact-item">
              <span class="cv-fact-label">${isEn ? 'Religion' : 'الديانة'}</span>
              <span class="cv-fact-val">${cv.religion || '—'}</span>
            </div>
            <div class="cv-fact-item">
              <span class="cv-fact-label">${isEn ? 'Languages' : 'اللغات'}</span>
              <span class="cv-fact-val" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${cv.languages || '—'}</span>
            </div>
          </div>

          <div class="cv-skills-chips">
            ${skillChips}
          </div>

          <div class="cv-card-actions">
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-cv-book" ${!isAvail ? 'style="opacity: 0.7;"' : ''}>
              ${isAvail ? (isEn ? 'Book via WhatsApp 📲' : 'حجز عبر واتساب 📲') : (isEn ? 'Inquire via WhatsApp 💬' : 'استفسر عن الحجز 💬')}
            </a>
            <button type="button" class="btn-cv-details" onclick="showCvDetails('${cv.id}')">
              ${isEn ? 'Details 👁️' : 'التفاصيل 👁️'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // تصفية وعرض السير الذاتية طبقاً للجنسية المحددة
  function applyFilters() {
    const resumesGrid = document.getElementById("resumesGrid");
    if (!resumesGrid) return;

    if (!selectedNationality) {
      selectedNationality = "all";
    }

    const searchInput = document.getElementById("searchInput");
    const nationalityFilter = document.getElementById("nationalityFilter");
    const jobFilter = document.getElementById("jobFilter");
    const experienceFilter = document.getElementById("experienceFilter");
    const sortSelector = document.getElementById("sortSelector");

    const search = (searchInput ? searchInput.value : "").trim().toLowerCase();
    const nat = selectedNationality === "all" ? "" : selectedNationality;
    const job = jobFilter ? jobFilter.value : "";
    const exp = experienceFilter ? experienceFilter.value : "";
    const sort = sortSelector ? sortSelector.value : "";

    filteredResumes = allResumes.filter((cv) => {
      // تصفية الجنسية المحددة أولاً
      if (nat && cv.nationality !== nat) return false;

      // تصفية المهنة
      if (job && cv.job !== job) return false;

      // تصفية الخبرة (خيارين فقط: سبق لها العمل أو لم يسبق لها العمل جديدة)
      if (exp) {
        const years = Number(cv.experience) || 0;
        if (exp === "fresh" && years > 0) return false;
        if (exp === "experienced" && years === 0) return false;
      }

      // بحث نصي
      if (search) {
        const fullContent = `${cv.fullname} ${cv.skills} ${cv.religion} ${cv.languages} ${cv.id} ${cv.prevExp}`.toLowerCase();
        if (!fullContent.includes(search)) return false;
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
    let statsBar = document.getElementById("resumesStatsBar");
    if (!statsBar && resumesGrid.parentNode) {
      statsBar = document.createElement("div");
      statsBar.id = "resumesStatsBar";
      statsBar.className = "resumes-stats-bar";
      resumesGrid.parentNode.insertBefore(statsBar, resumesGrid);
    }

    if (statsBar) {
      const isFiltered = search || job || exp || sort || (selectedNationality && selectedNationality !== "all");
      const currentNatName =
        selectedNationality === "all"
          ? "جميع الجنسيات"
          : NATIONS_CATALOG.find((n) => n.key === selectedNationality)?.name ||
            NATION_MAP[selectedNationality]?.name ||
            "الجنسية المحددة";

      statsBar.innerHTML = `
        <div>
          <span>السير الذاتية المعروضة (${currentNatName}): </span>
          <span class="resumes-count-badge">${filteredResumes.length} سيرة</span>
        </div>
        ${
          isFiltered
            ? `<button type="button" class="btn-reset-filters" id="btnResetAllFilters">🔄 عرض جميع السير وتصفير الفلاتر</button>`
            : `<span style="font-size: 0.82rem; color: var(--text-muted);">جميع السير مفحوصة ومطابقة لمعايير منصة مساند</span>`
        }
      `;

      const resetBtn = document.getElementById("btnResetAllFilters");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          if (searchInput) searchInput.value = "";
          if (jobFilter) jobFilter.value = "";
          if (experienceFilter) experienceFilter.value = "";
          if (sortSelector) sortSelector.value = "";
          window.resetNationalityChoice();
        });
      }
    }

    // عرض البطاقات
    if (filteredResumes.length === 0) {
      resumesGrid.innerHTML = `
        <div class="cv-empty-state" style="grid-column: 1 / -1; padding: 50px 20px; text-align: center; background: #f8fafc; border-radius: 16px; border: 2px dashed #cbd5e1;">
          <div class="cv-empty-icon" style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
          <h3 style="color: var(--primary-color); font-weight: 800; font-size: 1.3rem; margin-bottom: 8px;">لا توجد سير ذاتية مطابقة حالياً لهذه المعايير</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 20px;">يمكنك عرض جميع الجنسيات أو تصفير معايير البحث.</p>
          <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
            <button type="button" class="btn-gold" style="padding: 10px 20px;" onclick="window.resetNationalityChoice()">
              🌐 عرض جميع الجنسيات
            </button>
            <button type="button" class="btn-action" style="padding: 10px 20px;" onclick="
              const s = document.getElementById('searchInput'); if(s) s.value = '';
              const j = document.getElementById('jobFilter'); if(j) j.value = '';
              const e = document.getElementById('experienceFilter'); if(e) e.value = '';
              const o = document.getElementById('sortSelector'); if(o) o.value = '';
              applyFilters();
            ">تصفير الفلاتر</button>
          </div>
        </div>
      `;
    } else {
      resumesGrid.innerHTML = filteredResumes.map(renderCard).join("");
    }
  }

  // تحديث القائمة العامة
  window.refreshCvList = function () {
    allResumes = getStoredResumes();
    renderNationalityCards();
    applyFilters();
  };

  // تهيئة النظام
  function initResumesApp() {
    allResumes = getStoredResumes();
    renderNationalityCards();

    const searchInput = document.getElementById("searchInput");
    const nationalityFilter = document.getElementById("nationalityFilter");
    const jobFilter = document.getElementById("jobFilter");
    const experienceFilter = document.getElementById("experienceFilter");
    const sortSelector = document.getElementById("sortSelector");

    if (searchInput && !searchInput.dataset.bound) {
      searchInput.addEventListener("input", applyFilters);
      searchInput.dataset.bound = "true";
    }
    if (nationalityFilter && !nationalityFilter.dataset.bound) {
      nationalityFilter.addEventListener("change", (e) => {
        const val = e.target.value;
        if (val) {
          selectNationality(val, false);
        } else {
          resetNationalityChoice();
        }
      });
      nationalityFilter.dataset.bound = "true";
    }
    if (jobFilter && !jobFilter.dataset.bound) {
      jobFilter.addEventListener("change", applyFilters);
      jobFilter.dataset.bound = "true";
    }
    if (experienceFilter && !experienceFilter.dataset.bound) {
      experienceFilter.addEventListener("change", applyFilters);
      experienceFilter.dataset.bound = "true";
    }
    if (sortSelector && !sortSelector.dataset.bound) {
      sortSelector.addEventListener("change", applyFilters);
      sortSelector.dataset.bound = "true";
    }

    ensureCvModalExists();

    // فحص إذا كان هناك جنسية محددة في الرابط URL
    const urlParams = new URLSearchParams(window.location.search);
    const paramNat = urlParams.get("nat") || urlParams.get("nationality");
    if (paramNat) {
      selectNationality(paramNat, false);
    } else {
      selectNationality("all", false);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initResumesApp);
  } else {
    initResumesApp();
  }

  // مزامنة التغييرات الحية عبر التبويبات وعند العودة للتبويب
  window.addEventListener("storage", (e) => {
    if (!e.key || e.key === STORAGE_KEY || e.key === DELETED_IDS_KEY) {
      window.refreshCvList();
    }
  });

  window.addEventListener("focus", () => {
    window.refreshCvList();
  });

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      window.refreshCvList();
    }
  });

  // إعادة العرض فوراً عند تبديل لغة الموقع
  window.addEventListener("languageChanged", () => {
    renderNationalityCards();
    applyFilters();
  });
})();
