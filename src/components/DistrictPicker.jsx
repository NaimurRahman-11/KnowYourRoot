import React, { useState, useMemo } from 'react';
import { DISTRICTS_GEO } from '../data/districts-geo.js';
import { FOOD_CULTURE_DATA } from '../data/food-culture-data.js';
import { bnDigits } from '../utils/passportCard.js';

const DIVISIONS = [
  { id: "Dhaka", bn: "ঢাকা বিভাগ", en: "Dhaka Division" },
  { id: "Chattogram", bn: "চট্টগ্রাম বিভাগ", en: "Chattogram Division" },
  { id: "Rajshahi", bn: "রাজশাহী বিভাগ", en: "Rajshahi Division" },
  { id: "Khulna", bn: "খুলনা বিভাগ", en: "Khulna Division" },
  { id: "Sylhet", bn: "সিলেট বিভাগ", en: "Sylhet Division" },
  { id: "Barishal", bn: "বরিশাল বিভাগ", en: "Barishal Division" },
  { id: "Rangpur", bn: "রংপুর বিভাগ", en: "Rangpur Division" },
  { id: "Mymensingh", bn: "ময়মনসিংহ বিভাগ", en: "Mymensingh Division" }
];

export default function DistrictPicker({ selected, onToggle, onSelectAll, onClearAll, lang, t }) {
  const [search, setSearch] = useState("");
  const isBn = lang === 'bn';

  const foodMap = useMemo(() => {
    const map = new Map();
    FOOD_CULTURE_DATA.forEach(d => map.set(d.id, d));
    return map;
  }, []);

  const countStr = isBn 
    ? `${bnDigits(selected.size)} / ${bnDigits(64)}`
    : `${selected.size} / 64`;

  return (
    <aside className="picker-card" aria-label="District Picker Checklist">
      <div className="picker-header">
        <h3>{t.pickerTitle}</h3>
        <span className="counter-badge">{countStr}</span>
      </div>

      <div className="picker-search">
        <span className="search-icon">🔍</span>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.pickerSearchPlaceholder}
          aria-label="Search districts"
        />
      </div>

      <div className="picker-tools">
        <button type="button" className="btn-tool-link" onClick={onSelectAll}>
          {t.selectAll}
        </button>
        <button type="button" className="btn-tool-link" onClick={onClearAll}>
          {t.clearAll}
        </button>
      </div>

      <div className="picker-list-scroll">
        {DIVISIONS.map(div => {
          const districtsInDiv = DISTRICTS_GEO.f.filter(f => f.dv === div.id);
          const tastedCount = districtsInDiv.filter(d => selected.has(d.n)).length;

          // Filter by search query
          const q = search.toLowerCase().trim();
          const visibleDistricts = districtsInDiv.filter(f => {
            if (!q) return true;
            const info = foodMap.get(f.n);
            const nameEn = (info?.nameEn || f.n).toLowerCase();
            const nameBn = (info?.nameBn || f.n);
            const foodEn = (info?.primaryFood?.nameEn || '').toLowerCase();
            const foodBn = (info?.primaryFood?.nameBn || '');
            return nameEn.includes(q) || nameBn.includes(q) || foodEn.includes(q) || foodBn.includes(q);
          });

          if (visibleDistricts.length === 0) return null;

          return (
            <div key={div.id} className="div-group">
              <div className="div-group-header">
                <strong>{isBn ? div.bn : div.en}</strong>
                <span className="div-count-tag">
                  {isBn ? bnDigits(tastedCount) : tastedCount} / {isBn ? bnDigits(districtsInDiv.length) : districtsInDiv.length}
                </span>
              </div>

              <div className="div-chips-grid">
                {visibleDistricts.map(f => {
                  const info = foodMap.get(f.n);
                  const isChecked = selected.has(f.n);
                  const distName = isBn ? (info?.nameBn || f.n) : (info?.nameEn || f.n);
                  const foodName = isBn ? info?.primaryFood?.nameBn : info?.primaryFood?.nameEn;

                  return (
                    <button
                      key={f.n}
                      type="button"
                      className={`district-chip ${isChecked ? 'active' : ''}`}
                      onClick={() => onToggle(f.n)}
                      title={`${distName} — ${foodName}`}
                    >
                      <span className="chip-dot"></span>
                      <span className="chip-name">{distName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
