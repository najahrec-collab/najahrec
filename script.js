/**
 * script.js - التفاعلية والبرمجة العامة لموقع مكتب النجاح للاستقدام
 */

window.closeWarningModal = function () {
  const modal = document.getElementById("warningModal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
    sessionStorage.setItem("alnajah_warning_dismissed", "true");
  }
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    window.closeWarningModal();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // 1. نافذة التنبيه الأمني
  const warningModal = document.getElementById("warningModal");
  if (warningModal && !sessionStorage.getItem("alnajah_warning_dismissed")) {
    setTimeout(() => {
      warningModal.classList.add("open");
      document.body.style.overflow = "hidden";
    }, 1000);
  }

  // 2. الهيدر وشريط الملاحة عند التمرير
  const mainNav = document.getElementById("mainnav");
  if (mainNav) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        mainNav.classList.add("scrolled");
      } else {
        mainNav.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
  }

  // 3. قائمة الجوال التفاعلية
  const menuOpenBtn = document.getElementById("menuOpen");
  const menuCloseBtn = document.getElementById("menuCloseBtn");
  const menuCloseBackdrop = document.getElementById("menuClose");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuOpenBtn && mobileMenu) {
    const openMenu = () => {
      mobileMenu.classList.add("open");
      document.body.style.overflow = "hidden";
    };

    const closeMenu = () => {
      mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    };

    menuOpenBtn.addEventListener("click", openMenu);
    if (menuCloseBtn) menuCloseBtn.addEventListener("click", closeMenu);
    if (menuCloseBackdrop) menuCloseBackdrop.addEventListener("click", closeMenu);

    const mobileLinks = mobileMenu.querySelectorAll(".mm-nav a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }

  // 4. أكورديون الأسئلة الشائعة
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const questionButton = item.querySelector(".faq-q");
    const answerContainer = item.querySelector(".faq-a");
    if (questionButton && answerContainer) {
      questionButton.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
            const otherAnswer = otherItem.querySelector(".faq-a");
            if (otherAnswer) otherAnswer.style.maxHeight = null;
          }
        });
        if (isActive) {
          item.classList.remove("active");
          answerContainer.style.maxHeight = null;
        } else {
          item.classList.add("active");
          answerContainer.style.maxHeight = answerContainer.scrollHeight + "px";
        }
      });
    }
  });

  // 5. زر العودة للأعلى
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // 6. حاسبة تكلفة الاستقدام التفاعلية
  const calcNat = document.getElementById("calc-nationality");
  const calcJob = document.getElementById("calc-job");
  const resBase = document.getElementById("res-base");
  const resVat = document.getElementById("res-vat");
  const resTotal = document.getElementById("res-total");
  const resSalary = document.getElementById("res-salary");
  const resTime = document.getElementById("res-time");
  const calcWaBtn = document.getElementById("calc-whatsapp-btn");

  if (calcNat && calcJob && resBase && resVat && resTotal && resSalary && resTime) {
    const defaultPricingData = {
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

    let costData = {};
    const PRICING_VER_KEY = "alnajah_pricing_ver_2026";
    const currentVersion = "v3_updated_prices";
    const hasUpdatedVer = localStorage.getItem(PRICING_VER_KEY) === currentVersion;

    const localPricing = localStorage.getItem("alnajah_pricing_data");
    if (localPricing) {
      try {
        costData = JSON.parse(localPricing);
        if (!hasUpdatedVer) {
          const updatedKeys = [
            'philippines_maid', 'ethiopia_maid', 'kenya_maid', 'burundi_maid',
            'uganda_maid', 'tanzania_maid', 'sierraleone_maid', 'srilanka_maid',
            'ethiopia_nanny', 'ethiopia_cook', 'kenya_nanny', 'kenya_cook',
            'burundi_nanny', 'burundi_cook', 'uganda_nanny', 'uganda_cook',
            'tanzania_nanny', 'tanzania_cook', 'sierraleone_nanny', 'sierraleone_cook',
            'srilanka_nanny', 'srilanka_cook'
          ];
          updatedKeys.forEach((k) => {
            if (defaultPricingData[k]) {
              costData[k] = JSON.parse(JSON.stringify(defaultPricingData[k]));
            }
          });
          localStorage.setItem(PRICING_VER_KEY, currentVersion);
        }
        let upgraded = false;
        Object.keys(costData).forEach(k => {
          if (!costData[k].jobLabel && defaultPricingData[k]) {
            costData[k].jobLabel = defaultPricingData[k].jobLabel;
            upgraded = true;
          }
        });
        if (upgraded || !hasUpdatedVer) {
          localStorage.setItem("alnajah_pricing_data", JSON.stringify(costData));
        }
      } catch (e) {
        costData = defaultPricingData;
      }
    } else {
      costData = defaultPricingData;
      localStorage.setItem("alnajah_pricing_data", JSON.stringify(costData));
      localStorage.setItem(PRICING_VER_KEY, currentVersion);
    }

    const jobLabels = {
      maid: "عاملة منزلية",
      houseboy: "عامل منزلي",
      driver: "سائق خاص",
      cook: "طباخ / طباخة",
      nanny: "مربية أطفال",
      gardener: "مزارع منزلي",
      guard: "حارس منزلي",
      server: "سفرجي منزلي"
    };

    const adjustJobOptions = (nat) => {
      const options = Array.from(calcJob.options);
      options.forEach((opt) => {
        const val = opt.value;
        const key = `${nat}_${val}`;
        if (costData[key]) {
          opt.disabled = false;
          opt.style.display = "";
        } else {
          opt.disabled = true;
          opt.style.display = "none";
        }
      });

      if (calcJob.selectedOptions.length > 0 && calcJob.selectedOptions[0].disabled) {
        const firstEnabled = options.find((opt) => !opt.disabled);
        if (firstEnabled) {
          calcJob.value = firstEnabled.value;
        }
      }
    };

    const updateCalc = (event) => {
      const nat = calcNat.value;

      if (event && event.target === calcNat) {
        adjustJobOptions(nat);
      }

      const job = calcJob.value;
      const key = `${nat}_${job}`;
      const data = costData[key];

      if (data) {
        resBase.textContent = data.base.toLocaleString("en-US");
        resVat.textContent = data.vat.toLocaleString("en-US");
        resTotal.textContent = data.total.toLocaleString("en-US");
        resSalary.textContent = data.salary.toLocaleString("en-US");
        resTime.textContent = data.time;

        if (calcWaBtn) {
          const natText = data.label;
          const jobText = jobLabels[job] || job;
          const waMsg = `مرحباً مكتب النجاح، قمت بحساب تكلفة الاستقدام عبر الحاسبة التفاعلية:\n- الجنسية: ${natText}\n- المهنة: ${jobText}\n- التكلفة التقريبية: ${data.total.toLocaleString("en-US")} ر.س (شامل الضريبة)\n- الراتب الشهري: ${data.salary.toLocaleString("en-US")} ر.س\nأرغب بالاستفسار والبدء في الإجراءات.`;
          calcWaBtn.href = `https://wa.me/966555021298?text=${encodeURIComponent(waMsg)}`;
          calcWaBtn.innerHTML = `اطلب هذه العمالة الآن 📲`;
          calcWaBtn.style.opacity = "1";
          calcWaBtn.style.pointerEvents = "auto";
        }
      } else {
        resBase.textContent = "—";
        resVat.textContent = "—";
        resTotal.textContent = "غير متوفر حالياً";
        resSalary.textContent = "—";
        resTime.textContent = "—";

        if (calcWaBtn) {
          const natText = calcNat.options[calcNat.selectedIndex].text;
          const jobText = jobLabels[job] || job;
          const waMsg = `مرحباً مكتب النجاح، أود الاستفسار عن إمكانية وتوفر خدمة استقدام مهنة (${jobText}) من جنسية (${natText}).`;
          calcWaBtn.href = `https://wa.me/966555021298?text=${encodeURIComponent(waMsg)}`;
          calcWaBtn.innerHTML = `استفسر عن توفر الخدمة عبر واتساب 💬`;
        }
      }
    };

    adjustJobOptions(calcNat.value);
    calcNat.addEventListener("change", updateCalc);
    calcJob.addEventListener("change", updateCalc);
    updateCalc();
  }

  // 7. متتبع حالة الطلب التفاعلي
  const trackInput = document.getElementById("track-input");
  const trackBtn = document.getElementById("track-btn");
  const trackResult = document.getElementById("tracker-result");

  if (trackInput && trackBtn && trackResult) {
    const trackData = {
      "2026-1584": {
        name: "سارة م.",
        nationality: "إثيوبيا — عاملة منزلية",
        status: "تحت التنفيذ",
        currentStage: 4,
        stages: [
          "المرحلة 1: تقديم الطلب وتوقيع العقد وقبول الشروط",
          "المرحلة 2: سداد الرسوم وإرسال ملف المعاملة للخارج",
          "المرحلة 3: إجراء الفحص الطبي المعتمد والتحقق من الخلفية",
          "المرحلة 4: إصدار التأشيرة الرسمية وحجز تذكرة الطيران",
          "المرحلة 5: إنهاء إجراءات السفارة وتفويض مساند الحكومي",
          "المرحلة 6: المغادرة وحجز رحلة الطيران المباشرة للمملكة",
          "المرحلة 7: الوصول لمطار الملك خالد بالرياض ومباشرة العمل"
        ]
      },
      "2026-2001": {
        name: "كومار س.",
        nationality: "الهند — سائق خاص",
        status: "مكتمل وتم التسليم",
        currentStage: 7,
        stages: [
          "المرحلة 1: تقديم الطلب وتوقيع العقد وقبول الشروط",
          "المرحلة 2: سداد الرسوم وإرسال ملف المعاملة للخارج",
          "المرحلة 3: إجراء الفحص الطبي المعتمد والتحقق من الخلفية",
          "المرحلة 4: إصدار التأشيرة الرسمية وحجز تذكرة الطيران",
          "المرحلة 5: إنهاء إجراءات السفارة وتفويض مساند الحكومي",
          "المرحلة 6: المغادرة وحجز رحلة الطيران المباشرة للمملكة",
          "المرحلة 7: الوصول لمطار الملك خالد بالرياض ومباشرة العمل"
        ]
      },
      "2026-1102": {
        name: "جريس ب.",
        nationality: "الفلبين — مربية أطفال",
        status: "بانتظار الإجراءات الأولى",
        currentStage: 1,
        stages: [
          "المرحلة 1: تقديم الطلب وتوقيع العقد وقبول الشروط",
          "المرحلة 2: سداد الرسوم وإرسال ملف المعاملة للخارج",
          "المرحلة 3: إجراء الفحص الطبي المعتمد والتحقق من الخلفية",
          "المرحلة 4: إصدار التأشيرة الرسمية وحجز تذكرة الطيران",
          "المرحلة 5: إنهاء إجراءات السفارة وتفويض مساند الحكومي",
          "المرحلة 6: المغادرة وحجز رحلة الطيران المباشرة للمملكة",
          "المرحلة 7: الوصول لمطار الملك خالد بالرياض ومباشرة العمل"
        ]
      }
    };

    const doTrack = () => {
      const code = trackInput.value.trim();
      if (!code) {
        alert("يرجى إدخال رقم الطلب أولاً.");
        return;
      }

      const data = trackData[code];
      if (data) {
        let stagesHtml = "";
        data.stages.forEach((stage, idx) => {
          const stageNum = idx + 1;
          let statusClass = "waiting";
          let icon = "⭕";

          if (stageNum < data.currentStage) {
            statusClass = "completed";
            icon = "✅";
          } else if (stageNum === data.currentStage) {
            statusClass = "active";
            icon = "⏳";
          }

          stagesHtml += `
            <div class="tracker-stage ${statusClass}" style="display: flex; gap: 15px; margin-bottom: 20px; align-items: flex-start; position: relative; padding-bottom: 20px;">
              <div class="tracker-icon" style="font-size: 1.3rem; z-index: 2;">${icon}</div>
              <div class="tracker-text" style="flex: 1;">
                <h4 style="font-weight: 700; color: ${statusClass === "active" ? "var(--gold-color)" : statusClass === "completed" ? "var(--primary-color)" : "var(--text-muted)"}; margin-bottom: 4px; font-size: 1rem; text-align: right;">
                  ${stage}
                </h4>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0; text-align: right;">
                  ${statusClass === "completed" ? "تم الانتهاء بنجاح" : statusClass === "active" ? "قيد المراجعة والإصدار حالياً" : "بانتظار اكتمال المراحل السابقة"}
                </p>
              </div>
            </div>
          `;
        });

        trackResult.innerHTML = `
          <div style="background: var(--bg-light); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 25px; margin-bottom: 30px; border-right: 4px solid var(--gold-color); text-align: right;">
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 15px;">
              <div>
                <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700;">رمز المعاملة المتابع:</span>
                <h3 style="font-weight: 800; color: var(--primary-color); margin: 5px 0 0 0;">طلبك #${code}</h3>
              </div>
              <div>
                <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700;">حالة الطلب:</span>
                <div style="background: rgba(197, 155, 39, 0.1); color: var(--gold-color); padding: 5px 15px; border-radius: var(--radius-full); font-weight: 800; font-size: 0.9rem; margin-top: 5px; text-align: center;">
                  ${data.status}
                </div>
              </div>
            </div>
            <div style="margin-top: 15px; font-weight: 700; font-size: 0.95rem; color: var(--text-dark);">
              👤 العمالة المنزلية: <span style="color: var(--primary-color); font-weight: 800;">${data.name}</span> (${data.nationality})
            </div>
          </div>
          
          <h3 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 25px; color: var(--primary-color); position: relative; padding-bottom: 10px; border-bottom: 1px solid var(--border-color); text-align: right;">
            مراحل سير المعاملة (المرحلة ${data.currentStage} من 7)
          </h3>
          
          <div class="tracker-stages-list" style="position: relative; padding-right: 15px; text-align: right;">
            <div style="position: absolute; right: 26px; top: 15px; bottom: 35px; width: 2px; background: var(--border-color); z-index: 1;"></div>
            ${stagesHtml}
          </div>
        `;
        trackResult.style.display = "block";
      } else {
        trackResult.innerHTML = `
          <div style="background: #fdf2f2; border: 1px solid #fde8e8; border-radius: var(--radius-md); padding: 25px; color: #9b1c1c; text-align: center; font-weight: 700; border-right: 4px solid #f05252;">
            ⚠️ عذرًا، رقم الطلب المدخل غير موجود. يرجى التحقق من الرقم أو التواصل مع خدمة عملاء مكتب النجاح للاستعلام عن حالة معاملتك.
          </div>
        `;
        trackResult.style.display = "block";
      }
    };

    trackBtn.addEventListener("click", doTrack);
    trackInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") doTrack();
    });
  }
});
