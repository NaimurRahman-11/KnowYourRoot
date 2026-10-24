import { FOOD_CULTURE_DATA } from './data/food-culture-data.js';

export class ExplorerHub {
  constructor(containerEl, modalEl, options = {}) {
    this.container = containerEl;
    this.modal = modalEl;
    this.selected = new Set(options.selected || []);
    this.lang = options.lang || "bn";
    this.activeDivision = "all";
    this.activeCategory = "all";
    this.searchQuery = "";
    this.onToggleTasted = options.onToggleTasted || (() => {});
    
    this.init();
  }

  setLang(lang) {
    this.lang = lang;
    this.render();
  }

  setSelected(selectedSet) {
    this.selected = new Set(selectedSet);
    this.updateCardStatuses();
  }

  setFilters(division, category, query) {
    if (division !== undefined) this.activeDivision = division;
    if (category !== undefined) this.activeCategory = category;
    if (query !== undefined) this.searchQuery = query.toLowerCase().trim();
    this.render();
  }

  init() {
    this.render();
    this.setupModalEvents();
  }

  getFilteredData() {
    return FOOD_CULTURE_DATA.filter(item => {
      // Division match
      if (this.activeDivision !== "all" && item.divisionEn !== this.activeDivision) {
        return false;
      }
      
      // Category match
      if (this.activeCategory !== "all" && item.primaryFood.category !== this.activeCategory) {
        return false;
      }

      // Search Query
      if (this.searchQuery) {
        const q = this.searchQuery;
        const matchName = item.nameEn.toLowerCase().includes(q) || item.nameBn.includes(q);
        const matchFood = item.primaryFood.nameEn.toLowerCase().includes(q) || item.primaryFood.nameBn.includes(q);
        const matchDesc = item.primaryFood.descriptionEn.toLowerCase().includes(q) || item.primaryFood.descriptionBn.includes(q);
        const matchSpots = item.primaryFood.famousSpotsEn.toLowerCase().includes(q) || item.primaryFood.famousSpotsBn.includes(q);
        const matchSecondaries = item.secondaryItems.some(s => s.nameEn.toLowerCase().includes(q) || s.nameBn.includes(q));
        return matchName || matchFood || matchDesc || matchSpots || matchSecondaries;
      }

      return true;
    });
  }

  render() {
    if (!this.container) return;
    const items = this.getFilteredData();
    const isBn = this.lang === 'bn';

    if (items.length === 0) {
      this.container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>${isBn ? 'কোনো ফলাফল পাওয়া যায়নি' : 'No heritage foods found'}</h3>
          <p>${isBn ? 'অনুগ্রহ করে ভিন্ন কোনো জেলা, খাবার বা বিভাগের নাম দিয়ে খুঁজুন।' : 'Try adjusting your search query, division, or category filter.'}</p>
        </div>
      `;
      return;
    }

    this.container.innerHTML = items.map(item => {
      const isTasted = this.selected.has(item.id);
      const districtName = isBn ? item.nameBn : item.nameEn;
      const divName = isBn ? item.divisionBn : item.divisionEn;
      const food = item.primaryFood;
      const foodTitle = isBn ? food.nameBn : food.nameEn;
      const foodDesc = isBn ? food.descriptionBn : food.descriptionEn;
      const spots = isBn ? food.famousSpotsBn : food.famousSpotsEn;

      return `
        <article class="food-card ${isTasted ? 'is-tasted' : ''}" data-id="${item.id}">
          <div class="fc-header">
            <div class="fc-location">
              <span class="fc-district">${districtName}</span>
              <span class="fc-division">${divName}</span>
            </div>
            ${food.isGI ? `<span class="gi-tag" title="Geographical Indication (GI)">✓ ${isBn ? 'জিআই স্বীকৃত' : 'GI Certified'}</span>` : ''}
          </div>

          <div class="fc-body">
            <h4 class="fc-food-title">${foodTitle}</h4>
            <p class="fc-food-desc">${foodDesc}</p>
            
            <div class="fc-meta">
              <div class="fc-spots">
                <span class="fc-label">📍 ${isBn ? 'জনপ্রিয় দোকান/স্থান:' : 'Famous Spots:'}</span>
                <span class="fc-val">${spots}</span>
              </div>
            </div>

            <div class="fc-secondary-chips">
              ${item.secondaryItems.map(s => `
                <span class="sec-chip" title="${s.tag}">
                  ${isBn ? s.nameBn : s.nameEn}
                </span>
              `).join('')}
            </div>
          </div>

          <div class="fc-footer">
            <button type="button" class="btn-toggle-tasted ${isTasted ? 'active' : ''}" data-id="${item.id}">
              ${isTasted 
                ? (isBn ? '✓ টেস্ট করেছি' : '✓ Tasted') 
                : (isBn ? '+ টেস্ট করেছি' : '+ Mark Tasted')}
            </button>
            <button type="button" class="btn-card-details" data-id="${item.id}">
              ${isBn ? 'বিস্তারিত গল্প →' : 'Story & Details →'}
            </button>
          </div>
        </article>
      `;
    }).join('');

    this.bindCardEvents();
  }

  bindCardEvents() {
    this.container.querySelectorAll('.btn-toggle-tasted').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        this.toggleTasted(id);
      });
    });

    this.container.querySelectorAll('.btn-card-details, .food-card').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('.btn-toggle-tasted')) return;
        const id = el.dataset.id;
        this.openDetailModal(id);
      });
    });
  }

  toggleTasted(districtId) {
    if (this.selected.has(districtId)) {
      this.selected.delete(districtId);
    } else {
      this.selected.add(districtId);
    }
    this.updateCardStatuses();
    this.onToggleTasted(districtId, this.selected.has(districtId), this.selected);
  }

  updateCardStatuses() {
    if (!this.container) return;
    const isBn = this.lang === 'bn';
    this.container.querySelectorAll('.food-card').forEach(card => {
      const id = card.dataset.id;
      const isTasted = this.selected.has(id);
      card.classList.toggle('is-tasted', isTasted);

      const btn = card.querySelector('.btn-toggle-tasted');
      if (btn) {
        btn.classList.toggle('active', isTasted);
        btn.textContent = isTasted 
          ? (isBn ? '✓ টেস্ট করেছি' : '✓ Tasted') 
          : (isBn ? '+ টেস্ট করেছি' : '+ Mark Tasted');
      }
    });
  }

  setupModalEvents() {
    if (!this.modal) return;
    const closeBtn = this.modal.querySelector('.modal-close');
    const backdrop = this.modal.querySelector('.modal-backdrop');

    if (closeBtn) closeBtn.addEventListener('click', () => this.closeDetailModal());
    if (backdrop) backdrop.addEventListener('click', () => this.closeDetailModal());

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.closeDetailModal();
      }
    });
  }

  openDetailModal(districtId) {
    const item = FOOD_CULTURE_DATA.find(d => d.id === districtId);
    if (!item || !this.modal) return;

    const isBn = this.lang === 'bn';
    const isTasted = this.selected.has(item.id);
    const content = this.modal.querySelector('.modal-body');

    content.innerHTML = `
      <div class="modal-district-header">
        <div class="mdh-top">
          <span class="mdh-pill">${isBn ? item.divisionBn + ' বিভাগ' : item.divisionEn + ' Division'}</span>
          ${item.primaryFood.isGI ? `<span class="gi-badge-modal">✓ ${isBn ? 'জাতীয় ভৌগোলিক নির্দেশক (GI) সনদপ্রাপ্ত' : 'GI Certified Heritage'}</span>` : ''}
        </div>
        <h2>${isBn ? item.nameBn : item.nameEn}</h2>
        <p class="mdh-sub">${isBn ? item.primaryFood.nameBn : item.primaryFood.nameEn}</p>
      </div>

      <div class="modal-story-card">
        <h3>📜 ${isBn ? 'উৎপত্তির শিকড় ও ঐতিহাসিক কাহিনি' : 'Origins & Cultural Heritage'}</h3>
        <p>${isBn ? item.primaryFood.originStoryBn : item.primaryFood.originStoryEn}</p>
      </div>

      <div class="modal-section">
        <h3>🍽️ ${isBn ? 'স্বাদ ও রন্ধন বৈশিষ্ট্য' : 'Taste & Flavor Profile'}</h3>
        <p>${isBn ? item.primaryFood.descriptionBn : item.primaryFood.descriptionEn}</p>
      </div>

      <div class="modal-section">
        <h3>🏪 ${isBn ? 'যেখানে সবচেয়ে খাঁটি স্বাদ পাওয়া যায়' : 'Where to Find Authentic Quality'}</h3>
        <p class="modal-highlight-box">📍 ${isBn ? item.primaryFood.famousSpotsBn : item.primaryFood.famousSpotsEn}</p>
      </div>

      <div class="modal-section">
        <h3>🏛️ ${isBn ? 'জেলার দর্শনীয় সাংস্কৃতিক গৌরব' : 'Cultural Landmark Pride'}</h3>
        <p><strong>${isBn ? item.culturalHeritage.nameBn : item.culturalHeritage.nameEn}:</strong> ${isBn ? item.culturalHeritage.descBn : item.culturalHeritage.descEn}</p>
      </div>

      <div class="modal-section">
        <h3>✨ ${isBn ? 'জেলার আরও কিছু বিশেষ পদ' : 'Other Regional Specialties'}</h3>
        <div class="modal-chips">
          ${item.secondaryItems.map(s => `
            <span class="modal-chip">
              <b>${isBn ? s.nameBn : s.nameEn}</b>
              <small>(${s.tag})</small>
            </span>
          `).join('')}
        </div>
      </div>

      <div class="modal-action-bar">
        <button type="button" class="btn-modal-tasted ${isTasted ? 'active' : ''}">
          ${isTasted 
            ? (isBn ? '✓ টেস্ট তালিকা থেকে বাদ দিন' : '✓ Remove from Tasted List') 
            : (isBn ? '+ টেস্ট তালিকায় যোগ করুন' : '+ Mark as Tasted')}
        </button>
      </div>
    `;

    const modalTastedBtn = content.querySelector('.btn-modal-tasted');
    if (modalTastedBtn) {
      modalTastedBtn.addEventListener('click', () => {
        this.toggleTasted(item.id);
        const updated = this.selected.has(item.id);
        modalTastedBtn.classList.toggle('active', updated);
        modalTastedBtn.textContent = updated 
          ? (isBn ? '✓ টেস্ট তালিকা থেকে বাদ দিন' : '✓ Remove from Tasted List') 
          : (isBn ? '+ টেস্ট তালিকায় যোগ করুন' : '+ Mark as Tasted');
      });
    }

    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeDetailModal() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}
