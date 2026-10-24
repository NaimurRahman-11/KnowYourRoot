import React, { useEffect } from 'react';

export default function DistrictModal({ district, isOpen, onClose, isTasted, onToggleTasted, lang }) {
  const isBn = lang === 'bn';

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !district) return null;

  const {
    id,
    nameEn,
    nameBn,
    divisionEn,
    divisionBn,
    heritageScore,
    primaryFood,
    secondaryItems,
    culturalPride
  } = district;

  const districtName = isBn ? nameBn : nameEn;
  const divisionName = isBn ? `${divisionBn} বিভাগ` : `${divisionEn} Division`;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-titles">
            <span className="modal-division-badge">{divisionName}</span>
            <h3 className="modal-district-title">{districtName}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Primary Food Highlight Box */}
          <div className="primary-food-card">
            <div className="primary-food-header">
              <span className="primary-food-icon">{primaryFood.icon || '🍽️'}</span>
              <div className="primary-food-meta">
                <div className="primary-food-tag">
                  {primaryFood.giStatus && (
                    <span className="gi-badge">🏅 {isBn ? 'জিআই সনদপ্রাপ্ত ঐতিহ্য' : 'Official GI Certified'}</span>
                  )}
                  <span className="category-badge">{primaryFood.category}</span>
                </div>
                <h4 className="primary-food-name">
                  {isBn ? primaryFood.nameBn : primaryFood.nameEn}
                </h4>
              </div>
            </div>

            <p className="primary-food-desc">
              {isBn ? primaryFood.descriptionBn : primaryFood.descriptionEn}
            </p>

            {/* Origin & Authenticity */}
            <div className="food-detail-grid">
              <div className="food-detail-item">
                <span className="detail-label">📜 {isBn ? 'ঐতিহাসিক পটভূমি' : 'Heritage Origin'}</span>
                <span className="detail-value">{isBn ? primaryFood.originBn : primaryFood.originEn}</span>
              </div>
              <div className="food-detail-item">
                <span className="detail-label">📍 {isBn ? 'আদি ও খাঁটি স্থান' : 'Authentic Shops & Spots'}</span>
                <span className="detail-value">{isBn ? primaryFood.famousSpotsBn : primaryFood.famousSpotsEn}</span>
              </div>
            </div>
          </div>

          {/* Secondary Famous Delicacies */}
          {secondaryItems && secondaryItems.length > 0 && (
            <div className="secondary-foods-section">
              <h5 className="section-label">
                ✨ {isBn ? 'অন্যান্য বিখ্যাত আঞ্চলিক স্বাদ' : 'Other Regional Specialties'}
              </h5>
              <div className="secondary-chips-row">
                {secondaryItems.map((sec, idx) => (
                  <div key={idx} className="secondary-chip">
                    <span className="chip-name">{isBn ? sec.nameBn : sec.nameEn}</span>
                    <span className="chip-type">{sec.type}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cultural Pride & Landmark */}
          {culturalPride && (
            <div className="cultural-pride-box">
              <h5 className="section-label">
                🏛️ {isBn ? 'সাংস্কৃতিক গৌরব ও দর্শনীয় স্থান' : 'Cultural Pride & Landmark'}
              </h5>
              <p className="cultural-landmark">
                <strong>{isBn ? culturalPride.landmarkBn : culturalPride.landmarkEn}</strong>
              </p>
              <p className="cultural-summary">
                {isBn ? culturalPride.summaryBn : culturalPride.summaryEn}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button
            className={`btn-tasted-modal ${isTasted ? 'tasted' : ''}`}
            onClick={() => onToggleTasted(id)}
          >
            {isTasted ? (
              <span>✓ {isBn ? 'চেখে দেখেছি (তালিকায় যুক্ত)' : 'Tasted & Explored'}</span>
            ) : (
              <span>+ {isBn ? 'চেখে দেখার তালিকায় যোগ করুন' : 'Mark as Tasted'}</span>
            )}
          </button>
          <button className="btn-secondary" onClick={onClose}>
            {isBn ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
