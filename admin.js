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
  ];;

  // البيانات الافتراضية لأسعار الاستقدام للحاسبة
  const DEFAULT_PRICING = {
    philippines_maid: { total: 14500, base: 12609, vat: 1891, salary: 1500, time: 89, label: "الفلبين", jobLabel: "عاملة منزلية" },
    philippines_nanny: { total: 14500, base: 12609, vat: 1891, salary: 1500, time: 89, label: "الفلبين", jobLabel: "مربية أطفال" },
    philippines_cook: { total: 14500, base: 12609, vat: 1891, salary: 1500, time: 89, label: "الفلبين", jobLabel: "طباخ / طباخة" },
    philippines_houseboy: { total: 12000, base: 10435, vat: 1565, salary: 1500, time: 89, label: "الفلبين", jobLabel: "عامل منزلي" },
    philippines_driver: { total: 12000, base: 10435, vat: 1565, salary: 1500, time: 89, label: "الفلبين", jobLabel: "سائق خاص" },
    philippines_server: { total: 11119, base: 9669, vat: 1450, salary: 1500, time: 89, label: "الفلبين", jobLabel: "سفرجي منزلي" },

    burundi_maid: { total: 5000, base: 4348, vat: 652, salary: 800, time: 85, label: "بوروندي", jobLabel: "عاملة منزلية" },
    burundi_nanny: { total: 5000, base: 4348, vat: 652, salary: 800, time: 85, label: "بوروندي", jobLabel: "مربية أطفال" },
    burundi_cook: { total: 5000, base: 4348, vat: 652, salary: 800, time: 85, label: "بوروندي", jobLabel: "طباخ / طباخة" },

    ethiopia_maid: { total: 4500, base: 3913, vat: 587, salary: 900, time: 89, label: "إثيوبيا", jobLabel: "عاملة منزلية" },
    ethiopia_nanny: { total: 4500, base: 3913, vat: 587, salary: 900, time: 89, label: "إثيوبيا", jobLabel: "مربية أطفال" },
    ethiopia_cook: { total: 4500, base: 3913, vat: 587, salary: 900, time: 89, label: "إثيوبيا", jobLabel: "طباخ / طباخة" },
    ethiopia_houseboy: { total: 4188, base: 3642, vat: 546, salary: 900, time: 85, label: "إثيوبيا", jobLabel: "عامل منزلي" },
    ethiopia_driver: { total: 4344, base: 3777, vat: 567, salary: 900, time: 85, label: "إثيوبيا", jobLabel: "سائق خاص" },
    ethiopia_guard: { total: 3970, base: 3452, vat: 518, salary: 900, time: 85, label: "إثيوبيا", jobLabel: "حارس منزلي" },

    kenya_maid: { total: 5000, base: 4348, vat: 652, salary: 900, time: 89, label: "كينيا", jobLabel: "عاملة منزلية" },
    kenya_nanny: { total: 5000, base: 4348, vat: 652, salary: 900, time: 89, label: "كينيا", jobLabel: "مربية أطفال" },
    kenya_cook: { total: 5000, base: 4348, vat: 652, salary: 900, time: 89, label: "كينيا", jobLabel: "طباخ / طباخة" },

    uganda_maid: { total: 5000, base: 4348, vat: 652, salary: 900, time: 85, label: "أوغندا", jobLabel: "عاملة منزلية" },
    uganda_nanny: { total: 5000, base: 4348, vat: 652, salary: 900, time: 85, label: "أوغندا", jobLabel: "مربية أطفال" },
    uganda_cook: { total: 5000, base: 4348, vat: 652, salary: 900, time: 85, label: "أوغندا", jobLabel: "طباخ / طباخة" },

    tanzania_maid: { total: 5500, base: 4783, vat: 717, salary: 900, time: 85, label: "تنزانيا", jobLabel: "عاملة منزلية" },
    tanzania_nanny: { total: 5500, base: 4783, vat: 717, salary: 900, time: 85, label: "تنزانيا", jobLabel: "مربية أطفال" },
    tanzania_cook: { total: 5500, base: 4783, vat: 717, salary: 900, time: 85, label: "تنزانيا", jobLabel: "طباخ / طباخة" },

    sierraleone_maid: { total: 6000, base: 5217, vat: 783, salary: 900, time: 85, label: "سيراليون", jobLabel: "عاملة منزلية" },
    sierraleone_nanny: { total: 6000, base: 5217, vat: 783, salary: 900, time: 85, label: "سيراليون", jobLabel: "مربية أطفال" },
    sierraleone_cook: { total: 6000, base: 5217, vat: 783, salary: 900, time: 85, label: "سيراليون", jobLabel: "طباخ / طباخة" },

    bangladesh_maid: { total: 7500, base: 6522, vat: 978, salary: 1200, time: 89, label: "بنجلاديش", jobLabel: "عاملة منزلية" },
    bangladesh_nanny: { total: 7500, base: 6522, vat: 978, salary: 1200, time: 89, label: "بنجلاديش", jobLabel: "مربية أطفال" },
    bangladesh_cook: { total: 7500, base: 6522, vat: 978, salary: 1200, time: 89, label: "بنجلاديش", jobLabel: "طباخ / طباخة" },
    bangladesh_houseboy: { total: 3402, base: 2958, vat: 444, salary: 1000, time: 89, label: "بنجلاديش", jobLabel: "عامل منزلي" },
    bangladesh_driver: { total: 3450, base: 3000, vat: 450, salary: 1000, time: 89, label: "بنجلاديش", jobLabel: "سائق خاص" },

    srilanka_maid: { total: 13500, base: 11739, vat: 1761, salary: 1200, time: 89, label: "سريلانكا", jobLabel: "عاملة منزلية" },
    srilanka_nanny: { total: 13500, base: 11739, vat: 1761, salary: 1200, time: 89, label: "سريلانكا", jobLabel: "مربية أطفال" },
    srilanka_cook: { total: 13500, base: 11739, vat: 1761, salary: 1200, time: 89, label: "سريلانكا", jobLabel: "طباخ / طباخة" },
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

  // خرائط ترجمة أسماء الدول والمهن للحاسبة وجدول التسعير
  const PRICING_COUNTRIES = {
    philippines: "الفلبين",
    burundi: "بوروندي",
    ethiopia: "إثيوبيا",
    kenya: "كينيا",
    uganda: "أوغندا",
    bangladesh: "بنجلاديش",
    srilanka: "سريلانكا",
    india: "الهند",
    sudan: "السودان",
    egypt: "مصر",
    yemen: "اليمن",
    pakistan: "باكستان",
    tanzania: "تنزانيا"
  };

  const PRICING_JOBS = {
    maid: "عاملة منزلية",
    nanny: "مربية أطفال",
    cook: "طباخ / طباخة",
    houseboy: "عامل منزلي",
    driver: "سائق خاص",
    server: "سفرجي منزلي",
    guard: "حارس منزلي",
    gardener: "مزارع منزلي",
    nurse: "ممرضة منزلية",
    elderly: "رعاية كبار السن",
    babysitter: "مربية أطفال",
    chef: "طباخ / طباخة"
  };

  function getJobLabel(key, item) {
    if (item && item.jobLabel && item.jobLabel !== key) return item.jobLabel;
    const parts = key.split("_");
    const jobKey = parts.slice(1).join("_");
    return PRICING_JOBS[jobKey] || (DEFAULT_PRICING[key] && DEFAULT_PRICING[key].jobLabel) || jobKey;
  }

  function getCountryLabel(key, item) {
    if (item && item.label && item.label !== key) return item.label;
    const countryKey = key.split("_")[0];
    return PRICING_COUNTRIES[countryKey] || (DEFAULT_PRICING[key] && DEFAULT_PRICING[key].label) || countryKey;
  }

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

  // جلب الأسعار للحاسبة مع ترقية وتأكيد التعريب لجميع المهن والدول
  function loadPricing() {
    let data = null;
    try {
      const raw = localStorage.getItem(PRICING_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed === "object" && Object.keys(parsed).length > 0) {
          data = parsed;
        }
      }
    } catch (e) {
      console.warn("Error reading pricing:", e);
    }

    if (!data) {
      data = JSON.parse(JSON.stringify(DEFAULT_PRICING));
    }

    // ترقية أي بيانات تسعير سابقة في التخزين المحلي لتظهر المهن والدول بالعربية فوراً
    let updated = false;
    Object.keys(data).forEach((k) => {
      const countryName = getCountryLabel(k, data[k]);
      const jobName = getJobLabel(k, data[k]);
      if (!data[k].jobLabel || data[k].jobLabel === k || data[k].jobLabel !== jobName) {
        data[k].jobLabel = jobName;
        updated = true;
      }
      if (!data[k].label || data[k].label === k || data[k].label !== countryName) {
        data[k].label = countryName;
        updated = true;
      }
    });

    if (updated) {
      localStorage.setItem(PRICING_KEY, JSON.stringify(data));
    }

    return data;
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

  // اختيار صورة من المعرض السريع بنقرة واحدة
  window.selectAvatarChoice = function (path, btnEl) {
    const photoActual = document.getElementById("photoActualValue");
    const photoPreview = document.getElementById("photoPreviewImg");
    const photoPath = document.getElementById("photoPath");
    const photoSelect = document.getElementById("photoSelect");
    const customWrap = document.getElementById("customPathWrapper");

    if (photoActual) photoActual.value = path;
    if (photoPreview) photoPreview.src = path;
    if (photoPath) photoPath.value = path;

    if (photoSelect) {
      const optionExists = Array.from(photoSelect.options).some((o) => o.value === path);
      if (optionExists) {
        photoSelect.value = path;
        if (customWrap) customWrap.style.display = "none";
      } else {
        photoSelect.value = "custom";
        if (customWrap) customWrap.style.display = "block";
      }
    }

    // تحديث التحديد النشط في المعرض
    document.querySelectorAll("#avatarQuickGallery .avatar-choice").forEach((b) => b.classList.remove("active"));
    if (btnEl) btnEl.classList.add("active");

    window.updateLivePreview();
  };

  // إضافة لغة سريعة بنقرة واحدة
  window.addLanguageTag = function (lang) {
    const input = document.getElementById("languages");
    if (!input) return;
    const current = input.value.trim();
    if (!current) {
      input.value = lang;
    } else if (!current.includes(lang)) {
      input.value = current + "، " + lang;
    }
    window.updateLivePreview();
  };

  // إضافة مهارة سريعة بنقرة واحدة
  window.addSkillTag = function (skill) {
    const input = document.getElementById("skills");
    if (!input) return;
    const current = input.value.trim();
    if (!current) {
      input.value = skill;
    } else if (!current.includes(skill)) {
      input.value = current + "، " + skill;
    }
    window.updateLivePreview();
  };

  // تعيين حالة السيرة (متاحة أو محجوزة)
  window.setStatusChoice = function (status) {
    const statusInput = document.getElementById("status");
    const cardAvail = document.getElementById("statusCardAvailable");
    const cardRes = document.getElementById("statusCardReserved");
    const optAvail = document.getElementById("optAvailable");
    const optRes = document.getElementById("optReserved");

    if (statusInput) statusInput.value = status;

    if (status === "available") {
      if (cardAvail) cardAvail.classList.add("active-available");
      if (cardRes) cardRes.classList.remove("active-reserved");
      if (optAvail) optAvail.checked = true;
    } else {
      if (cardRes) cardRes.classList.add("active-reserved");
      if (cardAvail) cardAvail.classList.remove("active-available");
      if (optRes) optRes.checked = true;
    }

    window.updateLivePreview();
  };

  // تحديث المعاينة الحية للبطاقة
  window.updateLivePreview = function () {
    const fullname = (document.getElementById("fullname")?.value || "سارة م.").trim();
    const jobVal = document.getElementById("job")?.value || "maid";
    const natVal = document.getElementById("nationality")?.value || "ethiopia";
    const ageVal = document.getElementById("age")?.value || "26";
    const expVal = document.getElementById("experience")?.value || "3";
    const salVal = document.getElementById("salary")?.value || "1000";
    const photoActual = document.getElementById("photoActualValue")?.value || "images/cv_sara.jpg";
    const skillsVal = document.getElementById("skills")?.value || "النظافة الشاملة، الكي، الغسيل";
    const statusVal = document.getElementById("status")?.value || "available";

    const jobName = JOB_NAMES[jobVal] || "عاملة منزلية";
    const natObj = NATION_MAP[natVal] || { name: "إثيوبيا", flag: "🇪🇹" };

    const liveImg = document.getElementById("livePreviewImg");
    const liveName = document.getElementById("livePreviewName");
    const liveJob = document.getElementById("livePreviewJob");
    const liveNat = document.getElementById("livePreviewNat");
    const liveAge = document.getElementById("livePreviewAge");
    const liveExp = document.getElementById("livePreviewExp");
    const liveSalary = document.getElementById("livePreviewSalary");
    const liveSkills = document.getElementById("livePreviewSkills");
    const liveBadge = document.getElementById("livePreviewStatusBadge");

    if (liveImg) liveImg.src = photoActual;
    if (liveName) liveName.textContent = fullname;
    if (liveJob) liveJob.textContent = jobName;
    if (liveNat) liveNat.textContent = `${natObj.flag} ${natObj.name}`;
    if (liveAge) liveAge.textContent = `${ageVal} سنة`;
    if (liveExp) liveExp.textContent = `${expVal > 0 ? expVal + " سنوات خبرة" : "جديدة كلياً"}`;
    if (liveSalary) liveSalary.textContent = `${Number(salVal).toLocaleString("en-US")} ر.س`;
    if (liveSkills) liveSkills.textContent = `المهارات: ${skillsVal || "لم تحدد بعد"}`;

    if (liveBadge) {
      if (statusVal === "available") {
        liveBadge.textContent = "🟢 متاحة للحجز";
        liveBadge.style.background = "rgba(16, 185, 129, 0.1)";
        liveBadge.style.color = "#059669";
      } else {
        liveBadge.textContent = "🔴 محجوزة";
        liveBadge.style.background = "rgba(239, 68, 68, 0.1)";
        liveBadge.style.color = "#dc2626";
      }
    }
  };

  // إشعار عائم Toast احترافي
  window.showAdminToast = function (msg) {
    let toast = document.getElementById("adminToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "adminToast";
      toast.className = "admin-toast";
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>✅</span> <span>${msg}</span>`;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3500);
  };

  // فتح نافذة الإضافة
  window.openAddModal = function () {
    const modal = document.getElementById("cvEditorModal");
    const form = document.getElementById("cvForm");
    const title = document.getElementById("modalFormTitle");
    const editIndex = document.getElementById("editIndex");

    if (form) form.reset();
    if (title) title.innerHTML = `<span>➕</span> <span>إضافة سيرة ذاتية جديدة</span>`;
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

    // تعيين الصورة النشطة في المعرض
    document.querySelectorAll("#avatarQuickGallery .avatar-choice").forEach((b) => {
      const img = b.querySelector("img");
      if (img && img.getAttribute("src") === "images/cv_sara.jpg") {
        b.classList.add("active");
      } else {
        b.classList.remove("active");
      }
    });

    window.setStatusChoice("available");
    window.updateLivePreview();

    if (modal) modal.classList.add("open");
  };

  // فتح نافذة التعديل
  window.openEditModal = function (id) {
    const cv = resumesList.find((r) => r.id === id);
    if (!cv) return;

    const modal = document.getElementById("cvEditorModal");
    const title = document.getElementById("modalFormTitle");
    const editIndex = document.getElementById("editIndex");

    if (title) title.innerHTML = `<span>✏️</span> <span>تعديل السيرة الذاتية (${cv.fullname} - #${cv.id})</span>`;
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
    document.getElementById("height").value = (cv.height || "").replace(/\s*سم\s*/g, "");
    document.getElementById("weight").value = (cv.weight || "").replace(/\s*كجم\s*/g, "");
    document.getElementById("languages").value = cv.languages || "";
    document.getElementById("skills").value = cv.skills || "";
    document.getElementById("prevExp").value = cv.prevExp || "";

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

    // تنشيط الصورة في المعرض السريع إذا كانت موجودة
    document.querySelectorAll("#avatarQuickGallery .avatar-choice").forEach((b) => {
      const img = b.querySelector("img");
      if (img && img.getAttribute("src") === currentPhoto) {
        b.classList.add("active");
      } else {
        b.classList.remove("active");
      }
    });

    window.setStatusChoice(cv.status || "available");
    window.updateLivePreview();

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
    const rawHeight = document.getElementById("height").value.trim();
    const rawWeight = document.getElementById("weight").value.trim();
    const height = rawHeight ? (rawHeight.includes("سم") ? rawHeight : `${rawHeight} سم`) : "";
    const weight = rawWeight ? (rawWeight.includes("كجم") ? rawWeight : `${rawWeight} كجم`) : "";
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
    window.showAdminToast("تم حفظ السيرة الذاتية بنجاح! تم تحديث الصفحة والموقع فورياً.");
  };

  // ================= 4. إدارة أسعار وتكاليف الاستقدام للحاسبة =================
  function renderPricingTable() {
    const tbody = document.getElementById("pricingTableBody");
    if (!tbody) return;

    const keys = Object.keys(pricingData);
    if (keys.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 25px; color: var(--text-muted);">لا توجد بيانات تسعير حالياً.</td></tr>`;
      return;
    }

    tbody.innerHTML = keys
      .map((k) => {
        const item = pricingData[k];
        const countryLabel = getCountryLabel(k, item);
        const jobLabel = getJobLabel(k, item);
        const base = item.base || Math.round(item.total / 1.15);
        const vat = item.vat || item.total - base;

        return `
          <tr>
            <td><b style="color: var(--navy-950, #071830); font-weight: 800; font-size: 0.95rem;">${countryLabel}</b></td>
            <td>
              <span style="display: inline-block; background: rgba(197, 155, 39, 0.12); color: #8a6a14; padding: 4px 12px; border-radius: 99px; font-weight: 700; font-size: 0.85rem; border: 1px solid rgba(197, 155, 39, 0.25);">
                ${jobLabel}
              </span>
            </td>
            <td>${base.toLocaleString('en-US')} ر.س</td>
            <td>${vat.toLocaleString('en-US')} ر.س</td>
            <td><b style="color: var(--primary-color); font-weight: 800;">${item.total.toLocaleString('en-US')} ر.س</b></td>
            <td>${item.time} يوم</td>
            <td>${item.salary ? item.salary.toLocaleString('en-US') + ' ر.س' : '—'}</td>
            <td>
              <button type="button" class="btn-table-icon edit" onclick="openPricingModal('${k}')" style="font-weight: 700;">
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

    const countryLabel = getCountryLabel(key, item);
    const jobLabel = getJobLabel(key, item);

    const modal = document.getElementById("pricingEditorModal");
    document.getElementById("pricingKey").value = key;
    document.getElementById("pricingLabel").value = `${countryLabel} — ${jobLabel}`;
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
      pricingData[key].label = getCountryLabel(key, pricingData[key]);
      pricingData[key].jobLabel = getJobLabel(key, pricingData[key]);

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
