import { DISTRICTS_GEO } from './data/districts-geo.js';
import { FOOD_CULTURE_DATA } from './data/food-culture-data.js';
import { TRANSLATIONS } from './data/translations.js';
import { MapRenderer, THEMES } from './map-renderer.js';
import { PassportCardGenerator } from './passport-card.js';
import { ExplorerHub } from './explorer.js';
import { TriviaGame } from './trivia.js';

class KnowYourRootApp {
  constructor() {
    this.storageKey = 'knowyourroot_state_v1';
    this.state = this.loadState();
    this.userPhotoImg = null;

    this.initElements();
    this.initModules();
    this.bindEvents();
    this.applyLanguage();
    this.updateStatsUI();
    this.renderSidebarList();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          selected: new Set(parsed.selected || ["Bogura", "Pabna", "Natore", "Cumilla"]),
          themeId: parsed.themeId || "emerald",
          lang: parsed.lang || "bn",
          userName: parsed.userName || "",
          showLabels: parsed.showLabels !== false
        };
      }
    } catch (e) {
      console.warn("Storage load error", e);
    }

    return {
      selected: new Set(["Bogura", "Pabna", "Natore", "Cumilla"]),
      themeId: "emerald",
      lang: "bn",
      userName: "",
      showLabels: true
    };
  }

  saveState() {
    try {
      const data = {
        selected: [...this.state.selected],
        themeId: this.state.themeId,
        lang: this.state.lang,
        userName: this.state.userName,
        showLabels: this.state.showLabels
      };
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (e) {
      console.warn("Storage save error", e);
    }
  }

  initElements() {
    this.el = {
      langToggleBtn: document.getElementById('langToggleBtn'),
      canvas: document.getElementById('mapCanvas'),
      tooltip: document.getElementById('mapTooltip'),
      themeContainer: document.getElementById('themeSwatches'),
      userNameInput: document.getElementById('userNameInput'),
      labelsCheckbox: document.getElementById('labelsCheckbox'),
      photoInput: document.getElementById('photoInput'),
      photoPreview: document.getElementById('photoPreview'),
      removePhotoBtn: document.getElementById('removePhotoBtn'),
      downloadBtn: document.getElementById('downloadPassportBtn'),
      
      // Sidebar
      sidebarSearch: document.getElementById('sidebarSearch'),
      sidebarList: document.getElementById('sidebarList'),
      selectAllBtn: document.getElementById('selectAllBtn'),
      clearAllBtn: document.getElementById('clearAllBtn'),
      
      // Counters
      countNumber: document.getElementById('selectedCountNumber'),
      percentNumber: document.getElementById('selectedPercentNumber'),
      heroCounter: document.getElementById('heroCounterNumber'),
      
      // Explorer
      explorerGrid: document.getElementById('explorerGrid'),
      detailModal: document.getElementById('districtModal'),
      divFilterSelect: document.getElementById('filterDivision'),
      catFilterChips: document.getElementById('catFilterChips'),
      explorerSearch: document.getElementById('explorerSearchInput'),
      
      // Trivia
      triviaContainer: document.getElementById('triviaContainer')
    };
  }

  initModules() {
    // 1. Map Renderer
    this.map = new MapRenderer(this.el.canvas, this.el.tooltip, {
      selected: this.state.selected,
      themeId: this.state.themeId,
      showLabels: this.state.showLabels,
      lang: this.state.lang,
      onToggle: (districtId, isSelected, selectedSet) => {
        this.state.selected = selectedSet;
        this.saveState();
        this.updateStatsUI();
        this.syncSidebarCheckboxes();
        if (this.explorer) this.explorer.setSelected(selectedSet);
      }
    });

    // 2. Explorer Hub
    this.explorer = new ExplorerHub(this.el.explorerGrid, this.el.detailModal, {
      selected: this.state.selected,
      lang: this.state.lang,
      onToggleTasted: (districtId, isSelected, selectedSet) => {
        this.state.selected = selectedSet;
        this.saveState();
        this.map.setSelected(selectedSet);
        this.updateStatsUI();
        this.syncSidebarCheckboxes();
      }
    });

    // 3. Trivia Game
    this.trivia = new TriviaGame(this.el.triviaContainer, {
      lang: this.state.lang
    });

    // Set initial form states
    if (this.el.userNameInput) this.el.userNameInput.value = this.state.userName;
    if (this.el.labelsCheckbox) this.el.labelsCheckbox.checked = this.state.showLabels;
    this.renderThemeSwatches();
  }

  bindEvents() {
    // Language Toggle
    if (this.el.langToggleBtn) {
      this.el.langToggleBtn.addEventListener('click', () => {
        this.state.lang = this.state.lang === 'bn' ? 'en' : 'bn';
        this.saveState();
        this.applyLanguage();
        this.map.setLang(this.state.lang);
        this.explorer.setLang(this.state.lang);
        this.trivia.setLang(this.state.lang);
        this.renderSidebarList();
      });
    }

    // Name Input
    if (this.el.userNameInput) {
      this.el.userNameInput.addEventListener('input', (e) => {
        this.state.userName = e.target.value.slice(0, 32);
        this.saveState();
      });
    }

    // Labels Checkbox
    if (this.el.labelsCheckbox) {
      this.el.labelsCheckbox.addEventListener('change', (e) => {
        this.state.showLabels = e.target.checked;
        this.saveState();
        this.map.setShowLabels(this.state.showLabels);
      });
    }

    // Photo Upload
    if (this.el.photoInput) {
      this.el.photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            this.userPhotoImg = img;
            if (this.el.photoPreview) {
              this.el.photoPreview.style.backgroundImage = `url(${img.src})`;
              this.el.photoPreview.classList.add('has-photo');
            }
            if (this.el.removePhotoBtn) this.el.removePhotoBtn.hidden = false;
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
    }

    if (this.el.removePhotoBtn) {
      this.el.removePhotoBtn.addEventListener('click', () => {
        this.userPhotoImg = null;
        if (this.el.photoInput) this.el.photoInput.value = "";
        if (this.el.photoPreview) {
          this.el.photoPreview.style.backgroundImage = "";
          this.el.photoPreview.classList.remove('has-photo');
        }
        this.el.removePhotoBtn.hidden = true;
      });
    }

    // Download Passport
    if (this.el.downloadBtn) {
      this.el.downloadBtn.addEventListener('click', () => {
        this.downloadPassport();
      });
    }

    // Sidebar Search & Bulk Selection
    if (this.el.sidebarSearch) {
      this.el.sidebarSearch.addEventListener('input', (e) => {
        this.filterSidebarList(e.target.value.toLowerCase().trim());
      });
    }

    if (this.el.selectAllBtn) {
      this.el.selectAllBtn.addEventListener('click', () => {
        DISTRICTS_GEO.f.forEach(f => this.state.selected.add(f.n));
        this.saveState();
        this.map.setSelected(this.state.selected);
        this.explorer.setSelected(this.state.selected);
        this.updateStatsUI();
        this.syncSidebarCheckboxes();
      });
    }

    if (this.el.clearAllBtn) {
      this.el.clearAllBtn.addEventListener('click', () => {
        this.state.selected.clear();
        this.saveState();
        this.map.setSelected(this.state.selected);
        this.explorer.setSelected(this.state.selected);
        this.updateStatsUI();
        this.syncSidebarCheckboxes();
      });
    }

    // Explorer Filters
    if (this.el.divFilterSelect) {
      this.el.divFilterSelect.addEventListener('change', (e) => {
        this.explorer.setFilters(e.target.value, undefined, undefined);
      });
    }

    if (this.el.catFilterChips) {
      this.el.catFilterChips.querySelectorAll('.cat-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          this.el.catFilterChips.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          const cat = chip.dataset.cat;
          this.explorer.setFilters(undefined, cat, undefined);
        });
      });
    }

    if (this.el.explorerSearch) {
      this.el.explorerSearch.addEventListener('input', (e) => {
        this.explorer.setFilters(undefined, undefined, e.target.value);
      });
    }
  }

  downloadPassport() {
    this.el.downloadBtn.disabled = true;
    const isBn = this.state.lang === 'bn';
    const oldText = this.el.downloadBtn.textContent;
    this.el.downloadBtn.textContent = isBn ? "পাসপোর্ট প্রস্তুত হচ্ছে..." : "Generating Passport...";

    setTimeout(() => {
      PassportCardGenerator.downloadPassport({
        selected: this.state.selected,
        themeId: this.state.themeId,
        userName: this.state.userName,
        userPhoto: this.userPhotoImg,
        lang: this.state.lang
      });

      this.triggerConfetti();
      this.el.downloadBtn.disabled = false;
      this.el.downloadBtn.textContent = oldText;
    }, 400);
  }

  triggerConfetti() {
    const confettiContainer = document.getElementById('confettiEffect');
    if (!confettiContainer) return;

    confettiContainer.innerHTML = '';
    const colors = ['#0f6b4f', '#e65100', '#f59e0b', '#3b82f6', '#ec4899'];
    for (let i = 0; i < 40; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = `${Math.random() * 0.8}s`;
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      confettiContainer.appendChild(piece);
    }

    setTimeout(() => {
      confettiContainer.innerHTML = '';
    }, 3200);
  }

  renderThemeSwatches() {
    if (!this.el.themeContainer) return;
    this.el.themeContainer.innerHTML = THEMES.map(theme => {
      const isActive = theme.id === this.state.themeId;
      const title = this.state.lang === 'bn' ? theme.nameBn : theme.nameEn;
      return `
        <button type="button" class="theme-swatch ${isActive ? 'active' : ''}" 
                data-theme="${theme.id}" title="${title}" style="--c1: ${theme.v1}; --c2: ${theme.v2};">
          <span class="swatch-circle"></span>
        </button>
      `;
    }).join('');

    this.el.themeContainer.querySelectorAll('.theme-swatch').forEach(btn => {
      btn.addEventListener('click', () => {
        this.el.themeContainer.querySelectorAll('.theme-swatch').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.state.themeId = btn.dataset.theme;
        this.saveState();
        this.map.setTheme(this.state.themeId);
      });
    });
  }

  renderSidebarList() {
    if (!this.el.sidebarList) return;
    const isBn = this.state.lang === 'bn';
    const foodMap = new Map();
    FOOD_CULTURE_DATA.forEach(d => foodMap.set(d.id, d));

    const divisions = [
      { id: "Dhaka", bn: "ঢাকা বিভাগ", en: "Dhaka Division" },
      { id: "Chattogram", bn: "চট্টগ্রাম বিভাগ", en: "Chattogram Division" },
      { id: "Rajshahi", bn: "রাজশাহী বিভাগ", en: "Rajshahi Division" },
      { id: "Khulna", bn: "খুলনা বিভাগ", en: "Khulna Division" },
      { id: "Sylhet", bn: "সিলেট বিভাগ", en: "Sylhet Division" },
      { id: "Barishal", bn: "বরিশাল বিভাগ", en: "Barishal Division" },
      { id: "Rangpur", bn: "রংপুর বিভাগ", en: "Rangpur Division" },
      { id: "Mymensingh", bn: "ময়মনসিংহ বিভাগ", en: "Mymensingh Division" }
    ];

    this.el.sidebarList.innerHTML = divisions.map(div => {
      const districtsInDiv = DISTRICTS_GEO.f.filter(f => f.dv === div.id);
      const divTitle = isBn ? div.bn : div.en;
      const tastedCount = districtsInDiv.filter(d => this.state.selected.has(d.n)).length;

      return `
        <div class="div-group" data-division="${div.id}">
          <div class="div-group-header">
            <strong>${divTitle}</strong>
            <span class="div-count-tag" data-div-tag="${div.id}">${isBn ? this.bnDigits(tastedCount) : tastedCount} / ${isBn ? this.bnDigits(districtsInDiv.length) : districtsInDiv.length}</span>
          </div>
          <div class="div-chips-grid">
            ${districtsInDiv.map(f => {
              const info = foodMap.get(f.n);
              const isChecked = this.state.selected.has(f.n);
              const distName = isBn ? (info?.nameBn || f.n) : (info?.nameEn || f.n);
              const foodName = isBn ? info?.primaryFood?.nameBn : info?.primaryFood?.nameEn;

              return `
                <button type="button" class="district-chip ${isChecked ? 'active' : ''}" 
                        data-id="${f.n}" title="${distName} — ${foodName}">
                  <span class="chip-dot"></span>
                  <span class="chip-name">${distName}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');

    // Bind chip clicks
    this.el.sidebarList.querySelectorAll('.district-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const id = chip.dataset.id;
        this.map.toggleDistrict(id);
      });
    });
  }

  filterSidebarList(query) {
    if (!this.el.sidebarList) return;
    const groups = this.el.sidebarList.querySelectorAll('.div-group');

    groups.forEach(group => {
      let anyVisible = false;
      const chips = group.querySelectorAll('.district-chip');

      chips.forEach(chip => {
        const title = chip.getAttribute('title').toLowerCase();
        const text = chip.textContent.toLowerCase();
        const match = !query || title.includes(query) || text.includes(query);
        chip.style.display = match ? 'inline-flex' : 'none';
        if (match) anyVisible = true;
      });

      group.style.display = anyVisible ? 'block' : 'none';
    });
  }

  syncSidebarCheckboxes() {
    if (!this.el.sidebarList) return;
    const isBn = this.state.lang === 'bn';

    this.el.sidebarList.querySelectorAll('.district-chip').forEach(chip => {
      const id = chip.dataset.id;
      chip.classList.toggle('active', this.state.selected.has(id));
    });

    // Update division counter tags
    this.el.sidebarList.querySelectorAll('[data-div-tag]').forEach(tag => {
      const divId = tag.dataset.divTag;
      const districts = DISTRICTS_GEO.f.filter(f => f.dv === divId);
      const tasted = districts.filter(d => this.state.selected.has(d.n)).length;
      tag.textContent = `${isBn ? this.bnDigits(tasted) : tasted} / ${isBn ? this.bnDigits(districts.length) : districts.length}`;
    });
  }

  updateStatsUI() {
    const num = this.state.selected.size;
    const total = 64;
    const pct = Math.round((num / total) * 100);
    const isBn = this.state.lang === 'bn';

    if (this.el.countNumber) {
      this.el.countNumber.textContent = `${isBn ? this.bnDigits(num) : num} / ${isBn ? '৬৪' : '64'}`;
    }
    if (this.el.percentNumber) {
      this.el.percentNumber.textContent = `${isBn ? this.bnDigits(pct) : pct}%`;
    }
    if (this.el.heroCounter) {
      this.el.heroCounter.textContent = `${isBn ? this.bnDigits(num * 3 + 120) : (num * 3 + 120)}+`;
    }
  }

  applyLanguage() {
    const lang = this.state.lang;
    const t = TRANSLATIONS[lang];
    document.documentElement.lang = lang;

    // Update Language Button Text
    if (this.el.langToggleBtn) {
      this.el.langToggleBtn.querySelector('.lang-cur').textContent = lang === 'bn' ? 'বাং' : 'EN';
      this.el.langToggleBtn.setAttribute('title', t.langSwitchTitle);
    }

    // Auto-update all data-i18n attributes in the DOM
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (t[key]) {
        el.innerHTML = t[key];
      }
    });

    // Placeholders
    if (this.el.userNameInput) this.el.userNameInput.placeholder = t.namePlaceholder;
    if (this.el.sidebarSearch) this.el.sidebarSearch.placeholder = t.pickerSearchPlaceholder;
    if (this.el.explorerSearch) this.el.explorerSearch.placeholder = lang === 'bn' ? 'খাবার বা জেলা খুঁজুন (যেমন: বগুড়া, দই, পাবনা, ঘি)...' : 'Search food or district (e.g. Bogura, Doi, Ghee)...';

    this.renderThemeSwatches();
    this.updateStatsUI();
  }

  bnDigits(num) {
    return String(num).replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);
  }
}

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new KnowYourRootApp();
});
