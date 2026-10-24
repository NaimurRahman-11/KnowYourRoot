import React, { useRef, useState, useEffect } from 'react';
import { THEMES, generatePassportCard, triggerCelebrationConfetti, getRankTitle, bnDigits } from '../utils/passportCard.js';
import { FOOD_CULTURE_DATA } from '../data/food-culture-data.js';
import { Award, Download, Camera, Trash2, X, Sparkles, CheckCircle, MapPin, Check } from 'lucide-react';

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

  // Map food data for preview
  const foodMap = new Map();
  FOOD_CULTURE_DATA.forEach((d) => foodMap.set(d.id, d));
  const tastedList = Array.from(selected).map((id) => foodMap.get(id)).filter(Boolean);

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
      // Pass the live latest selected Set and avatarImg
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
                {isBn ? 'আপনার ডিজিটাল টেস্ট পাসপোর্ট (Culinary Visa)' : 'Official Culinary Visa & Taste Passport'}
              </h3>
              <p className="passport-modal-sub">
                {isBn
                  ? 'আপনার চেখে দেখা খাঁটি ঐতিহ্যবাহী খাবারের শেয়ারযোগ্য সোশ্যাল কার্ড (১২০০x১৬০০ HD)'
                  : 'Collectible high-res card showcasing the authentic regional foods you explored'}
              </p>
            </div>
          </div>
          <button className="passport-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Modal Content Grid */}
        <div className="passport-modal-body">
          {/* LEFT: Live Interactive Passport Preview Card */}
          <div className="passport-preview-column">
            <div
              className="live-passport-card"
              style={{
                background: currentTheme.bg,
                color: currentTheme.ink,
                borderColor: currentTheme.stroke
              }}
            >
              {/* Card Gold Trim Frame */}
              <div className="card-ornament-border" style={{ borderColor: currentTheme.gold }}>
                {/* Government Seal & Crest Header */}
                <div className="card-top-header">
                  <div className="header-national-mark" style={{ color: currentTheme.gold }}>
                    <span>PEOPLE'S REPUBLIC OF BANGLADESH</span>
                  </div>
                  <div className="card-serial" style={{ color: currentTheme.muted }}>
                    {serialNo}
                  </div>
                </div>

                <div className="card-main-title-block">
                  <h4 style={{ color: currentTheme.ink }}>
                    {isBn ? 'অফিসিয়াল রন্ধন ঐতিহ্য পাসপোর্ট' : 'OFFICIAL TASTE PASSPORT'}
                  </h4>
                  <span className="card-title-sub" style={{ color: currentTheme.accent }}>
                    {isBn ? '৬৪ জেলার খাঁটি স্বাদ ও সংস্কৃতির অভিযাত্রা' : '64 Districts Authentic Bengal Gastronomy'}
                  </span>
                </div>

                {/* Profile Strip */}
                <div className="card-profile-strip" style={{ background: currentTheme.cardBg, borderColor: currentTheme.border }}>
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

                  <div className="card-stats-counter" style={{ color: currentTheme.gold }}>
                    <span className="stats-counter-num">{isBn ? bnDigits(tastedCount) : tastedCount}</span>
                    <span className="stats-counter-den" style={{ color: currentTheme.muted }}>/ 64</span>
                    <small style={{ color: currentTheme.accent }}>{percentage}% {isBn ? 'চেখেছি' : 'Tasted'}</small>
                  </div>
                </div>

                {/* Section Title */}
                <div className="preview-stamps-header">
                  <span className="stamps-header-title">
                    ★ {isBn ? 'আপনার চেখে দেখা খাবারের ভিসা স্ট্যাম্প:' : 'TASTED HERITAGE VISA STAMPS:'}
                  </span>
                </div>

                {/* Dynamic Stamp Showcase Grid (What the user actually tasted!) */}
                <div className="preview-stamps-grid">
                  {tastedList.slice(0, 6).map((item) => (
                    <div
                      key={item.id}
                      className="preview-food-stamp"
                      style={{
                        background: currentTheme.stampBg,
                        borderColor: currentTheme.border
                      }}
                    >
                      <div className="stamp-top-line">
                        <span className="stamp-div-tag" style={{ color: currentTheme.accent }}>
                          {isBn ? item.divisionBn : item.divisionEn}
                        </span>
                        {item.primaryFood?.giStatus && (
                          <span className="stamp-gi-tag">GI 🏅</span>
                        )}
                      </div>

                      <div className="stamp-food-row">
                        <span className="stamp-food-emoji">
                          {item.primaryFood?.icon || '🍽️'}
                        </span>
                        <div className="stamp-food-names">
                          <strong className="stamp-food-name">
                            {isBn ? item.primaryFood?.nameBn : item.primaryFood?.nameEn}
                          </strong>
                          <span className="stamp-district-name" style={{ color: currentTheme.gold }}>
                            📍 {isBn ? item.nameBn : item.nameEn}
                          </span>
                        </div>
                      </div>

                      <div className="stamp-verification-strip">
                        <Check size={11} />
                        <span>VERIFIED TASTED</span>
                      </div>
                    </div>
                  ))}

                  {/* Empty state hint if user hasn't tasted yet */}
                  {tastedList.length === 0 && (
                    <div className="preview-empty-stamp-prompt">
                      <span>🧭 {isBn ? 'মানচিত্রে যেকোনো জেলায় ক্লিক করে আপনার স্বাদ পাসপোর্ট রাঙান!' : 'Click any district on the map to add your tasted foods!'}</span>
                    </div>
                  )}
                </div>

                {tastedList.length > 6 && (
                  <div className="preview-extra-foods-note" style={{ color: currentTheme.gold }}>
                    + {isBn ? bnDigits(tastedList.length - 6) : tastedList.length - 6} {isBn ? 'অন্যান্য জেলার বিশেষ স্বাদ যুক্ত রয়েছে' : 'more regional foods stamped in HD export'}
                  </div>
                )}

                {/* Bottom Hologram Stamp */}
                <div className="card-official-seal" style={{ borderColor: currentTheme.gold, color: currentTheme.gold }}>
                  <span>✓ VERIFIED ROOTS</span>
                  <small>{isBn ? 'খাঁটি দেশীয় ঐতিহ্য' : 'AUTHENTIC HERITAGE'}</small>
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
                    {isBn ? 'পাসপোর্ট কার্ডে আপনার পাসপোর্ট সাইজ ছবি বসবে' : 'Your avatar appears inside the gold passport seal'}
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
                  placeholder={isBn ? 'যেমন: নাবিল রহমান' : 'e.g. Nabil Rahman'}
                  className="modern-text-input"
                />
              </div>
            </div>

            {/* 2. Theme Palettes */}
            <div className="control-section-box">
              <h4 className="control-heading">
                {isBn ? '২. কালার থিম প্যালেট' : '2. Color Theme Palette'}
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
                        style={{ background: `linear-gradient(135deg, ${theme.v1}, ${theme.v2})` }}
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
                  ? '✨ ডাউনলোড সম্পন্ন হতেই স্ক্রিনে রঙিন কনফেটি উড়বে!'
                  : '✨ Crystal-sharp image ready for Instagram, Facebook, and print!'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
