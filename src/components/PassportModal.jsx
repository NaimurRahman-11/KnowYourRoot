import React, { useRef, useState, useEffect } from 'react';
import {
  THEMES,
  generatePassportCard,
  triggerCelebrationConfetti,
  getRankTitle,
  bnDigits,
  DIVISION_META,
  CROWN_JEWELS
} from '../utils/passportCard.js';
import { FOOD_CULTURE_DATA } from '../data/food-culture-data.js';
import { Award, Download, Camera, Trash2, X, Sparkles, CheckCircle } from 'lucide-react';

export default function PassportModal({
  isOpen,
  onClose,
  selected,
  userName,
  setUserName,
  avatarImg,
  setAvatarImg,
  themeId,
  setThemeId,
  lang
}) {
  const isBn = lang === 'bn';
  const fileInputRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKey);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentTheme = THEMES.find((t) => t.id === themeId) || THEMES[0];
  const tastedCount = selected.size;
  const percentage = Math.round((tastedCount / 64) * 100);

  // Group tasted items by division for live preview
  const divisionStats = DIVISION_META.map((div) => {
    const divDistricts = FOOD_CULTURE_DATA.filter((d) => d.divisionEn === div.id);
    const divTasted = divDistricts.filter((d) => selected.has(d.id));
    return {
      ...div,
      tastedList: divTasted,
      isComplete: divTasted.length === div.count && div.count > 0
    };
  });

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setAvatarImg(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      await generatePassportCard(userName, avatarImg, selected, themeId, lang);
      triggerCelebrationConfetti();
    } catch (err) {
      console.error("Export error:", err);
    } finally {
      setIsExporting(false);
    }
  };

  const hashVal = Math.abs(userName.split('').reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0) % 90000 + 10000);
  const serialNo = `BD-KYR-2026-${hashVal}`;

  return (
    <div className="passport-modal-backdrop" onClick={onClose}>
      <div className="passport-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="passport-modal-header">
          <div className="modal-title-group">
            <div className="passport-gold-icon">
              <Award size={22} />
            </div>
            <div>
              <h3 className="passport-modal-title">
                {isBn ? 'আপনার ডিজিটাল রন্ধন ঐতিহ্য সনদ ও পাসপোর্ট' : 'Official Culinary Heritage Passport & Certificate'}
              </h3>
              <p className="passport-modal-sub">
                {isBn
                  ? 'চোখের প্রশান্তিকর রঙ ও উচ্চ স্পষ্টতায় তৈরি ১২০০x১৬০০ পিক্সেল প্রামাণ্য সোশ্যাল কার্ড'
                  : 'Eye-soothing, high-contrast, crystal-clear 1200x1600 HD shareable social card'}
              </p>
            </div>
          </div>
          <button className="passport-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Modal Content Grid */}
        <div className="passport-modal-body">
          {/* LEFT: Live Interactive Passport Preview Card (Eye-Soothing & Ultra-High Visibility) */}
          <div className="passport-preview-column">
            <div
              className={`live-passport-card scalable-passport-view ${currentTheme.isLight ? 'theme-is-light' : 'theme-is-dark'}`}
              style={{
                background: currentTheme.bg,
                color: currentTheme.ink,
                borderColor: currentTheme.gold
              }}
            >
              <div className="card-ornament-border" style={{ borderColor: currentTheme.gold }}>
                {/* Republic Crest Header */}
                <div className="card-top-header">
                  <div className="header-national-mark" style={{ color: currentTheme.gold }}>
                    <span>PEOPLE'S REPUBLIC OF BANGLADESH</span>
                  </div>
                  <div className="card-serial" style={{ color: currentTheme.gold }}>
                    {serialNo}
                  </div>
                </div>

                <div className="card-main-title-block">
                  <h4 style={{ color: currentTheme.ink }}>
                    {isBn ? 'বাংলাদেশ রন্ধন ঐতিহ্য সনদ ও টেস্ট পাসপোর্ট' : 'OFFICIAL CULINARY HERITAGE PASSPORT'}
                  </h4>
                  <span className="card-title-sub" style={{ color: currentTheme.inkSecondary }}>
                    {isBn ? '৬৪ জেলার আদি স্বাদ ও ভৌগোলিক সংস্কৃতি অভিযাত্রা' : 'Definitive Gastronomic Anthology of 64 Districts'}
                  </span>
                </div>

                {/* Profile Identity Strip */}
                <div
                  className="card-profile-strip"
                  style={{
                    background: currentTheme.cardBg,
                    borderColor: currentTheme.border
                  }}
                >
                  <div className="card-avatar-frame" style={{ borderColor: currentTheme.gold }}>
                    {avatarImg ? (
                      <img src={avatarImg} alt="Traveler" className="card-avatar-image" />
                    ) : (
                      <div className="card-avatar-fallback">👤</div>
                    )}
                  </div>
                  <div className="card-holder-info">
                    <span className="holder-alias" style={{ color: currentTheme.ink }}>
                      {userName || (isBn ? 'বাংলার রসিক অভিযাত্রী' : 'Bengal Roots Traveler')}
                    </span>
                    <span className="holder-rank-tag" style={{ color: currentTheme.gold }}>
                      🏅 {getRankTitle(tastedCount, lang)}
                    </span>
                  </div>

                  <div className="card-stats-counter" style={{ color: currentTheme.ink }}>
                    <span className="stats-counter-num">{isBn ? bnDigits(tastedCount) : tastedCount}</span>
                    <span className="stats-counter-den" style={{ color: currentTheme.inkSecondary }}>/ 64</span>
                    <small style={{ color: currentTheme.accent, fontWeight: 700 }}>{percentage}% {isBn ? 'সম্পন্ন' : 'Explored'}</small>
                  </div>
                </div>

                {/* 8 Divisional Chapters Preview (Clean & High Contrast) */}
                <div className="preview-division-chapters-header">
                  <span style={{ color: currentTheme.ink }}>
                    ★ {isBn ? '৮ বিভাগীয় অন্বেষণ ও ঐতিহ্য বিবরণী:' : '8 DIVISIONAL CHAPTERS & TASTED HERITAGE:'}
                  </span>
                </div>

                <div className="preview-divisions-grid">
                  {divisionStats.map((div) => (
                    <div
                      key={div.id}
                      className={`preview-division-card ${div.isComplete ? 'is-complete' : ''}`}
                      style={{
                        background: div.isComplete
                          ? currentTheme.divBgActive
                          : (div.tastedList.length > 0 ? currentTheme.divBg : (currentTheme.isLight ? "#fbfaf7" : "rgba(255, 255, 255, 0.03)")),
                        borderColor: div.isComplete
                          ? currentTheme.borderActive
                          : (div.tastedList.length > 0 ? currentTheme.border : (currentTheme.isLight ? "#d9e5dd" : "rgba(255, 255, 255, 0.12)"))
                      }}
                    >
                      <div className="div-card-top-line">
                        <span className="div-card-title" style={{ color: currentTheme.ink }}>
                          {div.icon} {isBn ? div.bn : div.en}
                        </span>
                        <span className="div-card-score" style={{ color: div.isComplete ? currentTheme.gold : currentTheme.accent }}>
                          {div.isComplete ? '★ ALL ' : ''}{isBn ? `${bnDigits(div.tastedList.length)}/${bnDigits(div.count)}` : `${div.tastedList.length}/${div.count}`}
                        </span>
                      </div>

                      <div className="div-card-content">
                        {div.tastedList.length > 0 ? (
                          <p className="div-tasted-items-snippet" style={{ color: currentTheme.ink }}>
                            <strong style={{ color: currentTheme.accent }}>✓ {isBn ? 'চেখেছেন: ' : 'Tasted: '}</strong>
                            {div.tastedList.map((d) => isBn ? d.primaryFood?.nameBn : d.primaryFood?.nameEn).slice(0, 2).join(", ")}
                            {div.tastedList.length > 2 && (
                              <span className="extra-count-tag" style={{ color: currentTheme.gold }}>
                                {" "}+{div.tastedList.length - 2} {isBn ? 'অন্যান্য' : 'more'}
                              </span>
                            )}
                          </p>
                        ) : (
                          <p className="div-unexplored-note" style={{ color: currentTheme.muted }}>
                            {isBn ? 'এই বিভাগে এখনো স্বাদ নেননি' : 'Unexplored in this division'}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Crown Jewels GI Seals Preview */}
                <div className="preview-crown-jewels-row">
                  {CROWN_JEWELS.map((jewel) => {
                    const isTasted = selected.has(jewel.id);
                    return (
                      <div
                        key={jewel.id}
                        className={`mini-jewel-badge ${isTasted ? 'tasted' : ''}`}
                        style={{
                          background: isTasted
                            ? (currentTheme.isLight ? "#eef7f2" : currentTheme.divBgActive)
                            : (currentTheme.isLight ? "#ffffff" : 'rgba(255, 255, 255, 0.04)'),
                          borderColor: isTasted ? currentTheme.stroke : currentTheme.border
                        }}
                      >
                        <span className="jewel-icon">{jewel.icon}</span>
                        <span className="jewel-name" style={{ color: isTasted ? currentTheme.ink : currentTheme.muted }}>
                          {isBn ? jewel.foodBn : jewel.foodEn}
                        </span>
                        <span className="jewel-status" style={{ color: isTasted ? currentTheme.accent : currentTheme.muted }}>
                          {isTasted ? '✓' : '—'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Official Hologram Stamp */}
                <div className="card-official-seal" style={{ borderColor: currentTheme.gold, color: currentTheme.gold }}>
                  <span>✓ VERIFIED ROOTS</span>
                  <small style={{ color: currentTheme.inkSecondary }}>{isBn ? 'খাঁটি বাংলাদেশি ঐতিহ্য ও স্বাদ' : 'AUTHENTIC BENGAL HERITAGE'}</small>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Passport Customization Controls */}
          <div className="passport-controls-column">
            {/* 1. Name & Photo */}
            <div className="control-section-box">
              <h4 className="control-heading">
                {isBn ? '১. আপনার নাম ও প্রোফাইল ছবি' : '1. Traveler Name & Avatar'}
              </h4>

              <div className="avatar-uploader-row">
                <div
                  className="avatar-clickable-box"
                  onClick={() => fileInputRef.current?.click()}
                  title={isBn ? 'ছবি যোগ করতে ক্লিক করুন' : 'Click to upload photo'}
                >
                  {avatarImg ? (
                    <img src={avatarImg} alt="Avatar" className="uploaded-thumb" />
                  ) : (
                    <Camera size={22} className="camera-icon-empty" />
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    style={{ display: 'none' }}
                  />
                </div>

                <div className="avatar-meta-field">
                  <div className="avatar-buttons">
                    <button
                      type="button"
                      className="btn-upload-pic"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera size={14} />
                      <span>{avatarImg ? (isBn ? 'ছবি পরিবর্তন' : 'Change Photo') : (isBn ? 'ছবি যোগ করুন' : 'Add Photo')}</span>
                    </button>
                    {avatarImg && (
                      <button
                        type="button"
                        className="btn-remove-pic"
                        onClick={() => setAvatarImg(null)}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                  <span className="avatar-hint">
                    {isBn ? 'পাসপোর্ট কার্ডের গোল্ডেন ফ্রেমে আপনার ছবি বসবে' : 'Your avatar appears inside the golden crest frame'}
                  </span>
                </div>
              </div>

              <div className="name-input-group">
                <label htmlFor="passport-name-field">
                  {isBn ? 'আপনার নাম / উপাধি' : 'Traveler Full Name / Alias'}
                </label>
                <input
                  id="passport-name-field"
                  type="text"
                  maxLength={32}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder={isBn ? 'যেমন: নাবিল রহমান' : 'e.g. Naimur Rahman'}
                  className="modern-text-input"
                />
              </div>
            </div>

            {/* 2. Eye-Soothing Theme Palettes */}
            <div className="control-section-box">
              <h4 className="control-heading">
                {isBn ? '২. চোখ জুড়ানো কালার প্যালেট' : '2. Eye-Soothing Color Palettes'}
              </h4>
              <div className="theme-grid-selector">
                {THEMES.map((theme) => {
                  const isSelected = themeId === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      className={`theme-selection-card ${isSelected ? 'active' : ''}`}
                      onClick={() => setThemeId(theme.id)}
                    >
                      <span
                        className="theme-gradient-dot"
                        style={{
                          background: `linear-gradient(135deg, ${theme.bg}, ${theme.stroke})`,
                          border: `1.5px solid ${theme.border}`
                        }}
                      />
                      <span className="theme-title-text">{isBn ? theme.nameBn : theme.nameEn}</span>
                      {isSelected && <CheckCircle size={15} className="theme-check-icon" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Export CTA */}
            <div className="passport-export-box">
              <button
                type="button"
                className="btn-download-highres"
                onClick={handleDownload}
                disabled={isExporting}
              >
                {isExporting ? (
                  <span>⏳ {isBn ? 'এইচডি পাসপোর্ট প্রস্তুত হচ্ছে...' : 'Generating 4K Card...'}</span>
                ) : (
                  <>
                    <Download size={19} />
                    <span>{isBn ? 'এইচডি পাসপোর্ট ডাউনলোড করুন (১২০০x১৬০০)' : 'Download 4K Passport Card'}</span>
                    <Sparkles size={17} />
                  </>
                )}
              </button>
              <p className="download-subtext">
                {isBn
                  ? '✨ প্রাকৃতিক আইভরি ও পরিচ্ছন্ন রঙের বিন্যাস—সব তথ্য হবে একদম স্পষ্ট ও আকর্ষণীয়।'
                  : '✨ Natural parchment & crystal-clear color scheme for effortless visibility.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
