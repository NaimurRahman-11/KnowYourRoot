import React, { useRef, useState, useEffect } from 'react';
import { THEMES, generatePassportCard, triggerCelebrationConfetti } from '../utils/passportCard.js';
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
                {isBn ? 'আপনার ডিজিটাল টেস্ট পাসপোর্ট' : 'Your Official Taste Passport'}
              </h3>
              <p className="passport-modal-sub">
                {isBn ? 'সোশ্যাল মিডিয়ায় শেয়ার করার জন্য ১২০০x১৬০০ পিক্সেল হাই-রেজ্যুলেশন কার্ড' : 'High-definition 1200x1600px collectible social card'}
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
                borderColor: currentTheme.accent
              }}
            >
              {/* Card Gold Trim */}
              <div className="card-ornament-border" style={{ borderColor: currentTheme.accent }}>
                <div className="card-top-header">
                  <div className="header-national-mark">
                    <span className="seal-emblem">🇧🇩</span>
                    <span className="seal-text">
                      {isBn ? 'গণপ্রজাতন্ত্রী বাংলাদেশ' : "PEOPLE'S REPUBLIC OF BANGLADESH"}
                    </span>
                  </div>
                  <div className="card-serial">
                    KYR-{Math.abs(userName.split('').reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0) % 90000 + 10000)}
                  </div>
                </div>

                <div className="card-main-title-block">
                  <h4 style={{ color: currentTheme.accent }}>
                    {isBn ? 'স্বাদ ও ঐতিহ্য ভ্রমণ পাসপোর্ট' : 'OFFICIAL TASTE PASSPORT'}
                  </h4>
                  <span className="card-title-sub">
                    {isBn ? '৬৪ জেলার আঞ্চলিক রন্ধনশৈলী অভিযাত্রা' : '64 Districts Culinary Heritage Odyssey'}
                  </span>
                </div>

                {/* Profile Mini Row */}
                <div className="card-profile-strip">
                  <div className="card-avatar-frame" style={{ borderColor: currentTheme.accent }}>
                    {avatarImg ? (
                      <img src={avatarImg} alt="Traveler" className="card-avatar-image" />
                    ) : (
                      <div className="card-avatar-fallback">👤</div>
                    )}
                  </div>
                  <div className="card-holder-info">
                    <span className="holder-alias">{userName || (isBn ? 'অজ্ঞাতনামা পথিক' : 'Anonymous Explorer')}</span>
                    <span className="holder-roots-score">
                      🏆 {tastedCount} / 64 {isBn ? 'জেলা চেখেছেন' : 'Districts'} ({percentage}%)
                    </span>
                  </div>
                </div>

                {/* Tasted Districts Snippet Tags */}
                <div className="card-tasted-chips-cloud">
                  {Array.from(selected).slice(0, 10).map((dId) => (
                    <span key={dId} className="mini-card-chip" style={{ background: currentTheme.land, color: currentTheme.ink }}>
                      {dId}
                    </span>
                  ))}
                  {selected.size > 10 && (
                    <span className="mini-card-chip more-tag" style={{ background: currentTheme.accent, color: '#fff' }}>
                      +{selected.size - 10} {isBn ? 'অন্যান্য' : 'more'}
                    </span>
                  )}
                  {selected.size === 0 && (
                    <span className="empty-hint-text">
                      {isBn ? 'এখনো কোনো জেলা যুক্ত করা হয়নি' : 'No districts tasted yet. Tap on map!'}
                    </span>
                  )}
                </div>

                {/* Bottom Official Hologram Stamp */}
                <div className="card-official-seal" style={{ borderColor: currentTheme.dot, color: currentTheme.dot }}>
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
                {isBn ? '১. আপনার তথ্য ও ছবি' : '1. Traveler Name & Avatar'}
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
                    {isBn ? 'পাসপোর্টের জন্য পাসপোর্ট সাইজ বা স্কয়ার ছবি আদর্শ' : 'Square portrait recommended'}
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
