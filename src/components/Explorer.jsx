import React, { useState, useMemo } from 'react';
import { FOOD_CULTURE_DATA } from '../data/food-culture-data.js';
import { Search, Filter, Check, Plus, BookOpen, Award, Sparkles, MapPin } from 'lucide-react';

export default function Explorer({
  selected,
  onToggleDistrict,
  lang,
  onOpenModal
}) {
  const isBn = lang === 'bn';
  const [activeDivision, setActiveDivision] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTastedOnly, setFilterTastedOnly] = useState(false);

  const categories = [
    { id: "all", en: "All Heritage", bn: "সকল ঐতিহ্য", icon: "🌟" },
    { id: "sweet", en: "Royal Sweets & Curd", bn: "শাহী মিষ্টি ও দই", icon: "🍯" },
    { id: "savory", en: "Mezbani & Savory", bn: "মেজবানি ও মাংস", icon: "🥩" },
    { id: "pitha_bakery", en: "Artisanal Pitha", bn: "হাতে গড়া পিঠা", icon: "🥟" },
    { id: "agri_fruits", en: "Agri & Forest Gold", bn: "বনজ ও ফলমূল", icon: "🥭" },
    { id: "seafood", en: "Riverine & Marine", bn: "নদী ও সমুদ্রের স্বাদ", icon: "🐟" },
  ];

  const divisions = [
    { id: "all", en: "All Divisions", bn: "সকল বিভাগ" },
    { id: "Dhaka", en: "Dhaka", bn: "ঢাকা" },
    { id: "Chattogram", en: "Chattogram", bn: "চট্টগ্রাম" },
    { id: "Rajshahi", en: "Rajshahi", bn: "রাজশাহী" },
    { id: "Khulna", en: "Khulna", bn: "খুলনা" },
    { id: "Barishal", en: "Barishal", bn: "বরিশাল" },
    { id: "Sylhet", en: "Sylhet", bn: "সিলেট" },
    { id: "Rangpur", en: "Rangpur", bn: "রংপুর" },
    { id: "Mymensingh", en: "Mymensingh", bn: "ময়মনসিংহ" },
  ];

  const filteredDistricts = useMemo(() => {
    return FOOD_CULTURE_DATA.filter((item) => {
      // Division
      if (activeDivision !== "all" && item.divisionEn !== activeDivision) {
        return false;
      }
      // Category
      if (activeCategory !== "all" && item.primaryFood.category !== activeCategory) {
        return false;
      }
      // Tasted
      if (filterTastedOnly && !selected.has(item.id)) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = item.nameEn.toLowerCase().includes(q) || item.nameBn.includes(q);
        const matchFood = item.primaryFood.nameEn.toLowerCase().includes(q) || item.primaryFood.nameBn.includes(q);
        const matchDesc = item.primaryFood.descriptionEn.toLowerCase().includes(q) || item.primaryFood.descriptionBn.includes(q);
        const matchSpots = item.primaryFood.famousSpotsEn.toLowerCase().includes(q) || item.primaryFood.famousSpotsBn.includes(q);
        const matchSec = item.secondaryItems?.some((s) => s.nameEn.toLowerCase().includes(q) || s.nameBn.includes(q));
        if (!matchName && !matchFood && !matchDesc && !matchSpots && !matchSec) {
          return false;
        }
      }
      return true;
    });
  }, [activeDivision, activeCategory, filterTastedOnly, searchQuery, selected]);

  return (
    <section id="explorerSection" className="modern-explorer-section">
      <div className="container">
        {/* Section Head */}
        <div className="section-head text-center">
          <div className="section-pill">
            <BookOpen size={15} />
            <span>{isBn ? 'আঞ্চলিক স্বাদ কোষাগার' : 'Culinary Heritage Vault'}</span>
          </div>
          <h2 className="atlas-main-title">
            {isBn ? (
              <>
                ৬৪ জেলার <span className="text-glow">বিখ্যাত স্বাদের</span> পূর্ণাঙ্গ অ্যালবাম
              </>
            ) : (
              <>
                The Definitive Anthology of <span className="text-glow">64 Regional Delicacies</span>
              </>
            )}
          </h2>
          <p className="atlas-sub-title">
            {isBn
              ? 'শতাব্দীপ্রাচীন প্রস্তুত প্রণালী, ভৌগোলিক নির্দেশক (জিআই) স্বীকৃতি এবং খাঁটি আদি দোকানের সন্ধান।'
              : 'Centuries of artisanal gastronomy, GI certifications, and the origin stories of authentic masters.'}
          </p>
        </div>

        {/* Filter Navigation Bar */}
        <div className="explorer-control-bar">
          <div className="explorer-top-search-row">
            <div className="search-box-pill">
              <Search size={18} className="search-icon-inside" />
              <input
                type="text"
                value={searchQuery}
                placeholder={isBn ? 'জেলা, খাবার বা বিখ্যাত দোকানের নাম দিয়ে খুঁজুন...' : 'Search by district, delicacy, or heritage shop...'}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="explorer-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-pill"
                  onClick={() => setSearchQuery('')}
                >
                  ✕
                </button>
              )}
            </div>

            <div className="division-dropdown-box">
              <select
                value={activeDivision}
                onChange={(e) => setActiveDivision(e.target.value)}
                className="modern-select-dropdown"
              >
                {divisions.map((d) => (
                  <option key={d.id} value={d.id}>
                    {isBn ? d.bn : d.en}
                  </option>
                ))}
              </select>
            </div>

            <label className="tasted-filter-toggle">
              <input
                type="checkbox"
                checked={filterTastedOnly}
                onChange={(e) => setFilterTastedOnly(e.target.checked)}
              />
              <span className="toggle-switch-slider"></span>
              <span className="toggle-label-text">
                {isBn ? 'শুধু চেখে দেখা পদ' : 'Tasted Only'}
              </span>
            </label>
          </div>

          {/* Category Chips Bar */}
          <div className="category-chips-strip">
            {categories.map((c) => {
              const isActive = activeCategory === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  className={`category-filter-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveCategory(c.id)}
                >
                  <span className="cat-icon">{c.icon}</span>
                  <span className="cat-label">{isBn ? c.bn : c.en}</span>
                </button>
              );
            })}
          </div>

          <div className="results-status-line">
            <span>
              {isBn
                ? `মোট ${filteredDistricts.length} টি ঐতিহ্যবাহী জেলার ফলাফল প্রদর্শিত`
                : `Showing ${filteredDistricts.length} matching heritage districts`}
            </span>
          </div>
        </div>

        {/* Bento Grid */}
        {filteredDistricts.length === 0 ? (
          <div className="explorer-empty-state">
            <span className="empty-icon-large">🔍</span>
            <h3>{isBn ? 'কোনো ফলাফল পাওয়া যায়নি' : 'No heritage foods found'}</h3>
            <p>
              {isBn
                ? 'অনুগ্রহ করে ভিন্ন কোনো জেলা, খাবার বা বিভাগের নাম দিয়ে চেষ্টা করুন।'
                : 'Try adjusting your search query, division, or category filter.'}
            </p>
          </div>
        ) : (
          <div className="bento-delicacies-grid">
            {filteredDistricts.map((item) => {
              const isTasted = selected.has(item.id);
              const districtName = isBn ? item.nameBn : item.nameEn;
              const foodName = isBn ? item.primaryFood.nameBn : item.primaryFood.nameEn;
              const desc = isBn ? item.primaryFood.descriptionBn : item.primaryFood.descriptionEn;
              const spots = isBn ? item.primaryFood.famousSpotsBn : item.primaryFood.famousSpotsEn;
              const divName = isBn ? item.divisionBn : item.divisionEn;

              return (
                <div key={item.id} className={`bento-food-card ${isTasted ? 'is-tasted' : ''}`}>
                  <div className="bento-card-top">
                    <div className="bento-division-tag">
                      <span>{divName}</span>
                    </div>

                    <div className="bento-status-badges">
                      {item.primaryFood.giStatus && (
                        <span className="gi-tag-pill">
                          <Award size={12} />
                          <span>GI</span>
                        </span>
                      )}
                      {isTasted && (
                        <span className="tasted-tag-pill">
                          <Check size={12} />
                          <span>{isBn ? 'চেখেছি' : 'Tasted'}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="bento-title-row">
                    <span className="bento-food-icon">{item.primaryFood.icon || '🍽️'}</span>
                    <div className="bento-names-block">
                      <h3 className="bento-food-name">{foodName}</h3>
                      <span className="bento-district-origin">
                        <MapPin size={13} />
                        <span>{districtName}</span>
                      </span>
                    </div>
                  </div>

                  <p className="bento-description">{desc}</p>

                  <div className="bento-famous-spots">
                    <span className="spots-bullet">📍</span>
                    <span className="spots-text">{spots}</span>
                  </div>

                  {item.secondaryItems && item.secondaryItems.length > 0 && (
                    <div className="bento-secondary-tags">
                      {item.secondaryItems.slice(0, 2).map((sec, idx) => (
                        <span key={idx} className="bento-mini-chip">
                          {isBn ? sec.nameBn : sec.nameEn}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="bento-card-footer">
                    <button
                      type="button"
                      className={`btn-bento-taste ${isTasted ? 'active' : ''}`}
                      onClick={() => onToggleDistrict(item.id)}
                    >
                      {isTasted ? (
                        <>
                          <Check size={15} />
                          <span>{isBn ? 'চেখে দেখেছি' : 'Tasted'}</span>
                        </>
                      ) : (
                        <>
                          <Plus size={15} />
                          <span>{isBn ? 'চেখেছি হিসেবে যোগ' : 'Mark Tasted'}</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      className="btn-bento-lore"
                      onClick={() => onOpenModal(item)}
                    >
                      <span>{isBn ? 'ইতিহাস' : 'Lore'}</span>
                      <Sparkles size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
