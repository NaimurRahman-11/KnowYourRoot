import React, { useState, useMemo } from 'react';
import { FOOD_CULTURE_DATA } from '../data/food-culture-data.js';

export default function Explorer({
  selected,
  onToggleDistrict,
  lang,
  onOpenModal
}) {
  const [activeDivision, setActiveDivision] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTastedOnly, setFilterTastedOnly] = useState(false);

  const isBn = lang === 'bn';

  const categories = [
    { id: "all", en: "All Delicacies", bn: "সকল ঐতিহ্য" },
    { id: "sweet", en: "Sweets & Desserts", bn: "মিষ্টান্ন ও দই" },
    { id: "savory", en: "Savory & Meat", bn: "মাংস ও ঝাল পদ" },
    { id: "pitha_bakery", en: "Pitha & Bakery", bn: "পিঠা ও রুটি" },
    { id: "agri_fruits", en: "Fruits & Agri", bn: "ফল ও কৃষিজাত" },
    { id: "seafood", en: "Fish & Seafood", bn: "মাছ ও শুঁটকি" },
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
      // Division filter
      if (activeDivision !== "all" && item.divisionEn !== activeDivision) {
        return false;
      }

      // Category filter
      if (activeCategory !== "all" && item.primaryFood.category !== activeCategory) {
        return false;
      }

      // Tasted only filter
      if (filterTastedOnly && !selected.has(item.id)) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = item.nameEn.toLowerCase().includes(q) || item.nameBn.includes(q);
        const matchFood = item.primaryFood.nameEn.toLowerCase().includes(q) || item.primaryFood.nameBn.includes(q);
        const matchDesc = item.primaryFood.descriptionEn.toLowerCase().includes(q) || item.primaryFood.descriptionBn.includes(q);
        const matchSpots = item.primaryFood.famousSpotsEn.toLowerCase().includes(q) || item.primaryFood.famousSpotsBn.includes(q);
        const matchSecondaries = item.secondaryItems?.some(s => s.nameEn.toLowerCase().includes(q) || s.nameBn.includes(q));
        if (!matchName && !matchFood && !matchDesc && !matchSpots && !matchSecondaries) {
          return false;
        }
      }

      return true;
    });
  }, [activeDivision, activeCategory, filterTastedOnly, searchQuery, selected]);

  return (
    <section id="explorer-section" className="explorer-section">
      <div className="container">
        <div className="section-head text-center">
          <span className="badge-pill">
            {isBn ? 'স্বাদ ও ঐতিহ্যের কোষাগার' : 'Regional Culinary Index'}
          </span>
          <h2 className="section-title">
            {isBn ? '৬৪ জেলার বিখ্যাত স্বাদের বিবরণী' : 'Explore All 64 Districts Specialties'}
          </h2>
          <p className="section-subtitle">
            {isBn
              ? 'বগুড়ার দই, নাটোরের কাঁচাগোল্লা, পাবনার ঘি, কুমিল্লার রসমালাই থেকে সুন্দরবনের মধু—অনুসন্ধান করুন বিভাগ ও ক্যাটাগরি অনুযায়ী।'
              : 'From Bogura’s yogurt to Pabna’s golden ghee and Cumilla’s roshomalai—explore authenticity, origin tales, and verified heritage spots.'}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="explorer-filters-bar">
          <div className="filters-top-row">
            {/* Search Input */}
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                value={searchQuery}
                placeholder={isBn ? 'জেলা, খাবার বা বিখ্যাত স্থানের নাম লিখুন...' : 'Search by district, delicacy, or shop...'}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-field"
              />
              {searchQuery && (
                <button className="search-clear-btn" onClick={() => setSearchQuery('')}>✕</button>
              )}
            </div>

            {/* Division Dropdown */}
            <div className="division-select-wrapper">
              <select
                value={activeDivision}
                onChange={(e) => setActiveDivision(e.target.value)}
                className="styled-select"
              >
                {divisions.map((d) => (
                  <option key={d.id} value={d.id}>
                    {isBn ? d.bn : d.en}
                  </option>
                ))}
              </select>
            </div>

            {/* Tasted Only Toggle */}
            <label className="filter-checkbox-label">
              <input
                type="checkbox"
                checked={filterTastedOnly}
                onChange={(e) => setFilterTastedOnly(e.target.checked)}
              />
              <span>{isBn ? 'কেবলমাত্র চেখে দেখা জেলা' : 'Tasted Only'}</span>
            </label>
          </div>

          {/* Category Pills */}
          <div className="category-pills-row">
            {categories.map((c) => (
              <button
                key={c.id}
                className={`category-pill-btn ${activeCategory === c.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(c.id)}
              >
                {isBn ? c.bn : c.en}
              </button>
            ))}
          </div>

          <div className="results-counter">
            <span>
              {isBn
                ? `মোট ${filteredDistricts.length} টি জেলার তথ্য প্রদর্শিত হচ্ছে`
                : `Showing ${filteredDistricts.length} districts matching filters`}
            </span>
          </div>
        </div>

        {/* Grid of Food Cards */}
        {filteredDistricts.length === 0 ? (
          <div className="empty-state-box">
            <div className="empty-icon">🔍</div>
            <h3>{isBn ? 'কোনো ফলাফল পাওয়া যায়নি' : 'No heritage foods found'}</h3>
            <p>
              {isBn
                ? 'অনুগ্রহ করে ভিন্ন কোনো জেলা, খাবার বা বিভাগের নাম দিয়ে অনুসন্ধান করুন।'
                : 'Try adjusting your search query, division, or category filter.'}
            </p>
          </div>
        ) : (
          <div className="food-cards-grid">
            {filteredDistricts.map((item) => {
              const isTasted = selected.has(item.id);
              const districtName = isBn ? item.nameBn : item.nameEn;
              const foodName = isBn ? item.primaryFood.nameBn : item.primaryFood.nameEn;
              const desc = isBn ? item.primaryFood.descriptionBn : item.primaryFood.descriptionEn;
              const spots = isBn ? item.primaryFood.famousSpotsBn : item.primaryFood.famousSpotsEn;
              const divName = isBn ? item.divisionBn : item.divisionEn;

              return (
                <div key={item.id} className={`food-card ${isTasted ? 'is-tasted' : ''}`}>
                  <div className="card-top-bar">
                    <span className="card-division-badge">{divName}</span>
                    {item.primaryFood.giStatus && (
                      <span className="card-gi-tag">GI 🏅</span>
                    )}
                    {isTasted && (
                      <span className="card-tasted-status">✓ {isBn ? 'চেখেছি' : 'Tasted'}</span>
                    )}
                  </div>

                  <div className="card-icon-title-row">
                    <span className="card-food-icon">{item.primaryFood.icon || '🍽️'}</span>
                    <div>
                      <h3 className="card-food-name">{foodName}</h3>
                      <span className="card-district-subtitle">{districtName}</span>
                    </div>
                  </div>

                  <p className="card-description">{desc}</p>

                  <div className="card-famous-spots">
                    <span className="spots-icon">📍</span>
                    <span className="spots-text">{spots}</span>
                  </div>

                  {item.secondaryItems && item.secondaryItems.length > 0 && (
                    <div className="card-mini-tags">
                      {item.secondaryItems.slice(0, 2).map((s, idx) => (
                        <span key={idx} className="mini-tag">
                          {isBn ? s.nameBn : s.nameEn}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="card-actions-row">
                    <button
                      className={`btn-card-toggle ${isTasted ? 'active' : ''}`}
                      onClick={() => onToggleDistrict(item.id)}
                    >
                      {isTasted ? (
                        <span>✓ {isBn ? 'চেখেছি' : 'Tasted'}</span>
                      ) : (
                        <span>+ {isBn ? 'চেখেছি' : 'Mark Tasted'}</span>
                      )}
                    </button>
                    <button
                      className="btn-card-details"
                      onClick={() => onOpenModal(item)}
                    >
                      {isBn ? 'বিস্তারিত' : 'Details'} ➔
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
