import React, { useEffect } from 'react';
import { X, Award, MapPin, Check, Plus, BookOpen, Sparkles } from 'lucide-react';

export default function DistrictModal({
  district,
  isOpen,
  onClose,
  isTasted,
  onToggleTasted,
  lang
}) {
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
    primaryFood,
    secondaryItems,
    culturalPride
  } = district;

  const districtName = isBn ? nameBn : nameEn;
  const divisionName = isBn ? `${divisionBn} বিভাগ` : `${divisionEn} Division`;

  return (
    <div className="modern-modal-backdrop" onClick={onClose}>
      <div className="modern-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header with Glowing Division Accent */}
        <div className="modal-top-banner">
          <div className="modal-title-area">
            <span className="modal-division-chip">{divisionName}</span>
            <h3 className="modal-hero-district">{districtName}</h3>
            <span className="modal-alt-district">{isBn ? nameEn : nameBn}</span>
          </div>

          <button className="modal-close-icon-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-scroll-body">
          {/* Primary Delicacy Showcase Card */}
          <div className="showcase-delicacy-card">
            <div className="showcase-header-row">
              <span className="showcase-large-icon">{primaryFood.icon || '🍽️'}</span>
              <div className="showcase-delicacy-title-box">
                <div className="showcase-badges">
                  {primaryFood.giStatus && (
                    <span className="showcase-gi-pill">
                      <Award size={13} />
                      <span>{isBn ? 'ভৌগোলিক নির্দেশক (জিআই)' : 'Official GI Certified'}</span>
                    </span>
                  )}
                  <span className="showcase-cat-pill">{primaryFood.category}</span>
                </div>
                <h4 className="showcase-food-name">
                  {isBn ? primaryFood.nameBn : primaryFood.nameEn}
                </h4>
              </div>
            </div>

            <p className="showcase-desc">
              {isBn ? primaryFood.descriptionBn : primaryFood.descriptionEn}
            </p>

            {/* Historical Origin & Historic Shops Grid */}
            <div className="showcase-details-grid">
              <div className="detail-box">
                <div className="detail-box-head">
                  <BookOpen size={15} />
                  <span>{isBn ? 'ঐতিহাসিক প্রেক্ষাপট' : 'Heritage & Origin Story'}</span>
                </div>
                <p className="detail-box-content">
                  {isBn ? primaryFood.originBn : primaryFood.originEn}
                </p>
              </div>

              <div className="detail-box">
                <div className="detail-box-head">
                  <MapPin size={15} />
                  <span>{isBn ? 'আদি ও খাঁটি স্থান' : 'Authentic Shops & Masters'}</span>
                </div>
                <p className="detail-box-content highlight-spot">
                  {isBn ? primaryFood.famousSpotsBn : primaryFood.famousSpotsEn}
                </p>
              </div>
            </div>
          </div>

          {/* Secondary Regional Specialties */}
          {secondaryItems && secondaryItems.length > 0 && (
            <div className="modal-sub-section">
              <h5 className="sub-section-title">
                <Sparkles size={16} />
                <span>{isBn ? 'জেলার অন্যান্য জনপ্রিয় স্বাদ' : 'Other Renowned Regional Tastes'}</span>
              </h5>
              <div className="modal-secondary-chips-row">
                {secondaryItems.map((sec, idx) => (
                  <div key={idx} className="modal-secondary-chip">
                    <span className="sec-chip-name">{isBn ? sec.nameBn : sec.nameEn}</span>
                    <span className="sec-chip-type">{sec.type}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cultural Landmark */}
          {culturalPride && (
            <div className="modal-sub-section landmark-section">
              <h5 className="sub-section-title">
                🏛️ <span>{isBn ? 'সাংস্কৃতিক গৌরব ও স্মৃতিচিহ্ন' : 'Cultural Pride & Landmark'}</span>
              </h5>
              <p className="landmark-title">
                {isBn ? culturalPride.landmarkBn : culturalPride.landmarkEn}
              </p>
              <p className="landmark-desc">
                {isBn ? culturalPride.summaryBn : culturalPride.summaryEn}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="modal-bottom-bar">
          <button
            type="button"
            className={`btn-modal-taste-toggle ${isTasted ? 'active' : ''}`}
            onClick={() => onToggleTasted(id)}
          >
            {isTasted ? (
              <>
                <Check size={18} />
                <span>{isBn ? 'স্বাদ গ্রহণ সম্পন্ন (তালিকায় রয়েছে)' : 'Tasted & Added to Roots'}</span>
              </>
            ) : (
              <>
                <Plus size={18} />
                <span>{isBn ? 'স্বাদ গ্রহণ তালিকায় যোগ করুন' : 'Add to Tasted Roots'}</span>
              </>
            )}
          </button>

          <button type="button" className="btn-modal-dismiss" onClick={onClose}>
            {isBn ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
