import React, { useRef, useEffect, useState } from 'react';
import { DISTRICTS_GEO } from '../data/districts-geo.js';
import { FOOD_CULTURE_DATA } from '../data/food-culture-data.js';
import { THEMES, generatePassportCard, triggerCelebrationConfetti } from '../utils/passportCard.js';

export default function MapStage({
  selected,
  onToggleDistrict,
  userName,
  setUserName,
  avatarImg,
  setAvatarImg,
  themeId,
  setThemeId,
  lang,
  t
}) {
  const canvasRef = useRef(null);
  const tooltipRef = useRef(null);
  const fileInputRef = useRef(null);

  const [showLabels, setShowLabels] = useState(true);
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  const isBn = lang === 'bn';
  const geoWidth = DISTRICTS_GEO.w || 600;
  const geoHeight = DISTRICTS_GEO.h || 872;

  // Pre-cached Path2D objects
  const pathsRef = useRef(new Map());
  const foodMapRef = useRef(new Map());

  useEffect(() => {
    FOOD_CULTURE_DATA.forEach(d => foodMapRef.current.set(d.id, d));
    DISTRICTS_GEO.f.forEach(f => {
      pathsRef.current.set(f.n, new Path2D(f.d));
    });
  }, []);

  const getTheme = () => THEMES.find(t => t.id === themeId) || THEMES[0];

  // Canvas drawing routine
  const drawMap = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const rect = parent.getBoundingClientRect();
    const width = rect.width || 600;
    const height = (width / geoWidth) * geoHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const scale = (width / geoWidth) * dpr;
    const currentTheme = getTheme();

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(scale, scale);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    // 1. Draw unselected districts
    for (const f of DISTRICTS_GEO.f) {
      if (selected.has(f.n)) continue;
      const path = pathsRef.current.get(f.n);
      if (!path) continue;
      const isHovered = hoveredDistrict && hoveredDistrict.n === f.n;

      ctx.fillStyle = isHovered ? (currentTheme.id === 'midnight' ? '#334155' : '#f0e6d6') : currentTheme.land;
      ctx.fill(path);
      ctx.strokeStyle = currentTheme.stroke;
      ctx.lineWidth = 1.1;
      ctx.stroke(path);
    }

    // 2. Gradient for selected districts
    const grad = ctx.createLinearGradient(0, 0, geoWidth, geoHeight);
    grad.addColorStop(0, currentTheme.v1);
    grad.addColorStop(1, currentTheme.v2);

    // Glow for midnight theme
    if (currentTheme.glow && selected.size > 0) {
      ctx.save();
      ctx.shadowColor = currentTheme.glow;
      ctx.shadowBlur = 18 * dpr;
      for (const n of selected) {
        const path = pathsRef.current.get(n);
        if (path) {
          ctx.fillStyle = grad;
          ctx.fill(path);
        }
      }
      ctx.restore();
    }

    // 3. Draw Selected (Tasted/Explored) Districts
    for (const n of selected) {
      const path = pathsRef.current.get(n);
      if (!path) continue;
      const isHovered = hoveredDistrict && hoveredDistrict.n === n;

      ctx.fillStyle = grad;
      ctx.fill(path);
      ctx.strokeStyle = isHovered ? currentTheme.dot : currentTheme.vStroke;
      ctx.lineWidth = isHovered ? 2.2 : 1.2;
      ctx.stroke(path);
    }

    // 4. Center dots & labels
    if (showLabels) {
      const fontName = '"Hind Siliguri", "Noto Sans Bengali", system-ui, sans-serif';
      ctx.font = `600 10.5px ${fontName}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const f of DISTRICTS_GEO.f) {
        const isSelected = selected.has(f.n);
        const isHovered = hoveredDistrict && hoveredDistrict.n === f.n;
        const [cx, cy] = f.c;
        const info = foodMapRef.current.get(f.n);
        const labelText = isBn ? (info?.nameBn || f.n) : (info?.nameEn || f.n);

        if (isSelected || isHovered) {
          ctx.beginPath();
          ctx.arc(cx, cy, isHovered ? 4.5 : 3.2, 0, Math.PI * 2);
          ctx.fillStyle = isHovered ? "#ffeb3b" : currentTheme.dot;
          ctx.fill();
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Text halo
          ctx.lineWidth = 3.5;
          ctx.strokeStyle = isSelected ? (currentTheme.id === 'midnight' ? '#0b0f19' : '#ffffff') : currentTheme.halo;
          ctx.strokeText(labelText, cx, cy - 8.5);

          ctx.fillStyle = isSelected ? (currentTheme.id === 'midnight' ? '#ffffff' : currentTheme.label) : (currentTheme.id === 'midnight' ? '#94a3b8' : '#334155');
          ctx.fillText(labelText, cx, cy - 8.5);
        }
      }
    }

    ctx.restore();
  };

  useEffect(() => {
    drawMap();
  }, [selected, themeId, showLabels, lang, hoveredDistrict]);

  useEffect(() => {
    const handleResize = () => drawMap();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePointerMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const scale = rect.width / geoWidth;
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);

    const x = (clientX - rect.left) / scale;
    const y = (clientY - rect.top) / scale;

    const ctx = canvas.getContext('2d');
    let hit = null;

    for (const f of DISTRICTS_GEO.f) {
      const path = pathsRef.current.get(f.n);
      if (path && ctx.isPointInPath(path, x * scale * dpr, y * scale * dpr)) {
        hit = f;
        break;
      }
    }

    if (hit !== hoveredDistrict) {
      setHoveredDistrict(hit);
      canvas.style.cursor = hit ? 'pointer' : 'default';
    }

    const tooltip = tooltipRef.current;
    if (hit && tooltip) {
      const info = foodMapRef.current.get(hit.n);
      const name = isBn ? (info?.nameBn || hit.n) : (info?.nameEn || hit.n);
      const divName = isBn ? (info?.divisionBn + ' বিভাগ') : (info?.divisionEn + ' Div');
      const foodName = isBn ? info?.primaryFood?.nameBn : info?.primaryFood?.nameEn;
      const isTasted = selected.has(hit.n);

      tooltip.innerHTML = `
        <div class="tt-header">
          <strong>${name}</strong>
          <span class="tt-div">${divName}</span>
        </div>
        <div class="tt-food">
          <span class="tt-food-icon">🍽️</span>
          <span>${foodName || ''}</span>
        </div>
        <div class="tt-status ${isTasted ? 'tasted' : ''}">
          ${isTasted 
            ? (isBn ? '✓ চেখে দেখেছি' : '✓ Explored & Tasted') 
            : (isBn ? '+ তালিকায় যোগ করতে ক্লিক করুন' : '+ Tap to Mark Tasted')}
        </div>
      `;

      const parentRect = canvas.parentElement.getBoundingClientRect();
      tooltip.style.left = `${clientX - parentRect.left}px`;
      tooltip.style.top = `${clientY - parentRect.top}px`;
      tooltip.classList.add('visible');
    } else if (tooltip) {
      tooltip.classList.remove('visible');
    }
  };

  const handlePointerLeave = () => {
    setHoveredDistrict(null);
    if (tooltipRef.current) tooltipRef.current.classList.remove('visible');
  };

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scale = rect.width / geoWidth;
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    const ctx = canvas.getContext('2d');

    for (const f of DISTRICTS_GEO.f) {
      const path = pathsRef.current.get(f.n);
      if (path && ctx.isPointInPath(path, x * scale * dpr, y * scale * dpr)) {
        onToggleDistrict(f.n);
        break;
      }
    }
  };

  const handleAvatarChange = (e) => {
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
      console.error("Passport export error:", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="stage-main-card">
      {/* Controls Bar */}
      <div className="stage-controls-bar">
        {/* Themes */}
        <div className="stage-themes">
          <span className="theme-label">{t.themeLabel}</span>
          <div className="theme-swatches">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                type="button"
                className={`theme-swatch ${themeId === theme.id ? 'active' : ''}`}
                style={{
                  '--c1': theme.v1,
                  '--c2': theme.v2
                }}
                onClick={() => setThemeId(theme.id)}
                title={isBn ? theme.nameBn : theme.nameEn}
                aria-label={`Select ${isBn ? theme.nameBn : theme.nameEn} theme`}
              />
            ))}
          </div>
        </div>

        {/* User Options */}
        <div className="stage-user-opts">
          {/* Avatar Upload */}
          <label className="photo-upload-label" title={t.addPhotoLabel}>
            <div
              className={`photo-preview-box ${avatarImg ? 'has-photo' : ''}`}
              style={avatarImg ? { backgroundImage: `url(${avatarImg})` } : {}}
            >
              {!avatarImg && <span>👤</span>}
            </div>
            <span>{avatarImg ? (isBn ? 'ছবি পরিবর্তন' : 'Change') : t.addPhotoLabel}</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
            />
          </label>

          {avatarImg && (
            <button
              type="button"
              className="btn-tool-link"
              onClick={() => setAvatarImg(null)}
              title={t.removePhoto}
            >
              ✕
            </button>
          )}

          {/* Name Input */}
          <input
            type="text"
            className="input-user-name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder={t.namePlaceholder}
            maxLength={32}
            aria-label="Your Name for the passport card"
          />

          {/* Show Labels Toggle */}
          <label className="checkbox-toggle">
            <input
              type="checkbox"
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
            />
            <span>{t.showLabelsLabel}</span>
          </label>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="canvas-container" style={{ background: getTheme().bg }}>
        <canvas
          id="mapCanvas"
          ref={canvasRef}
          onMouseMove={handlePointerMove}
          onMouseLeave={handlePointerLeave}
          onClick={handleClick}
        />
        <div ref={tooltipRef} className="map-tooltip" />
      </div>

      {/* Helper hint */}
      <p className="stage-helper-hint">{t.mapHint}</p>

      {/* Download Button */}
      <div className="download-cta-row">
        <button
          type="button"
          className="btn-download-passport"
          onClick={handleDownload}
          disabled={isExporting}
        >
          {isExporting ? (
            <span>⏳ {isBn ? 'পাসপোর্ট তৈরি হচ্ছে...' : 'Generating Card...'}</span>
          ) : (
            <span>{t.downloadBtn}</span>
          )}
        </button>
      </div>
    </div>
  );
}
