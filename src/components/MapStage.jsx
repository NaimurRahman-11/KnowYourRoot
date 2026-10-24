import React, { useState, useMemo, useRef } from 'react';
import { DISTRICTS_GEO } from '../data/districts-geo.js';
import { FOOD_CULTURE_DATA } from '../data/food-culture-data.js';
import {
  Compass,
  CheckCircle2,
  PlusCircle,
  Award,
  Sparkles,
  MapPin,
  Flame,
  Search,
  Filter,
  Eye,
  RotateCcw,
  CheckSquare
} from 'lucide-react';

const ICONIC_BEACONS = [
  { id: "BOGURA", labelEn: "Bogura Curd", labelBn: "বগুড়ার দই", icon: "🍮" },
  { id: "PABNA", labelEn: "Pabna Ghee", labelBn: "পাবনার ঘি", icon: "🧈" },
  { id: "NATORE", labelEn: "Kachagolla", labelBn: "কাঁচাগোল্লা", icon: "🥟" },
  { id: "CUMILLA", labelEn: "Roshomalai", labelBn: "রসমালাই", icon: "🥣" },
  { id: "CHATTOGRAM", labelEn: "Mezbani / Kala Bhuna", labelBn: "কালা ভুনা", icon: "🥩" },
  { id: "SYLHET", labelEn: "7-Layer Tea", labelBn: "সাত রঙের চা", icon: "☕" },
  { id: "SATKHIRA", labelEn: "Sundarban Honey", labelBn: "খাঁটি মধু", icon: "🍯" },
  { id: "BARISHAL", labelEn: "Ilish Delicacy", labelBn: "রূপালী ইলিশ", icon: "🐟" },
  { id: "RAJSHAHI", labelEn: "Fazli Mango", labelBn: "আম ও রেশম", icon: "🥭" },
  { id: "TANGAIL", labelEn: "Porabari Chamcham", labelBn: "পোড়াবাড়ির চমচম", icon: "🍬" }
];

const DIVISION_LIST = [
  { id: "all", en: "All Bangladesh", bn: "পুরো বাংলাদেশ", icon: "🇧🇩" },
  { id: "Dhaka", en: "Dhaka", bn: "ঢাকা", icon: "🏙️" },
  { id: "Chattogram", en: "Chattogram", bn: "চট্টগ্রাম", icon: "🌊" },
  { id: "Rajshahi", en: "Rajshahi", bn: "রাজশাহী", icon: "🥭" },
  { id: "Khulna", en: "Khulna", bn: "খুলনা", icon: "🐯" },
  { id: "Barishal", en: "Barishal", bn: "বরিশাল", icon: "⛵" },
  { id: "Sylhet", en: "Sylhet", bn: "সিলেট", icon: "🍵" },
  { id: "Rangpur", en: "Rangpur", bn: "রংপুর", icon: "🌾" },
  { id: "Mymensingh", en: "Mymensingh", bn: "ময়মনসিংহ", icon: "🌿" },
];

export default function MapStage({
  selected,
  onToggleDistrict,
  onSelectAll,
  onClearAll,
  lang,
  onOpenDetails,
  onOpenPassport
}) {
  const isBn = lang === 'bn';
  const [activeDivision, setActiveDivision] = useState("all");
  const [filterTrail, setFilterTrail] = useState("all"); // 'all', 'gi', 'sweet', 'savory'
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [spotlightId, setSpotlightId] = useState("BOGURA"); // default spotlight
  const [searchDistrict, setSearchDistrict] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, visible: false });

  // Quick lookup dictionary for 64 districts data
  const foodDataMap = useMemo(() => {
    const map = new Map();
    FOOD_CULTURE_DATA.forEach((d) => map.set(d.id, d));
    return map;
  }, []);

  const totalCount = 64;
  const tastedCount = selected.size;
  const tastedPercentage = Math.round((tastedCount / totalCount) * 100);

  // Compute Rank / Title
  const getRankTitle = () => {
    if (tastedCount === 0) return isBn ? "শুরুয়াতি পথিক" : "Aspiring Explorer";
    if (tastedCount <= 5) return isBn ? "আঞ্চলিক স্বাদ সন্ধানী" : "Regional Wanderer";
    if (tastedCount <= 15) return isBn ? "অভিজ্ঞ খাদ্যপ্রেমী" : "Heritage Foodie";
    if (tastedCount <= 30) return isBn ? "বাংলার রসনাবিদ" : "Culinary Connoisseur";
    if (tastedCount <= 50) return isBn ? "শিকড়ের মহারাজ" : "Master of Roots";
    return isBn ? "জীবন্ত কিংবদন্তি 👑" : "Living Legend 👑";
  };

  // Currently spotlighted district object
  const spotlightDistrict = foodDataMap.get(spotlightId) || FOOD_CULTURE_DATA[0];
  const isSpotlightTasted = selected.has(spotlightId);

  // SVG Mouse handlers for precise vector interaction
  const handlePathMouseEnter = (e, f) => {
    setHoveredDistrict(f);
    setSpotlightId(f.n);
    const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true
    });
  };

  const handlePathMouseMove = (e) => {
    const svgEl = e.currentTarget.ownerSVGElement;
    if (!svgEl) return;
    const rect = svgEl.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true
    });
  };

  const handlePathMouseLeave = () => {
    setHoveredDistrict(null);
    setMousePos((prev) => ({ ...prev, visible: false }));
  };

  const handlePathClick = (f) => {
    onToggleDistrict(f.n);
    setSpotlightId(f.n);
  };

  // Check if a district matches the current trail filter
  const isDistrictMatched = (districtId, division) => {
    if (activeDivision !== 'all' && division !== activeDivision) {
      return false;
    }

    const data = foodDataMap.get(districtId);
    if (!data) return true;

    if (filterTrail === 'gi') {
      return Boolean(data.primaryFood?.giStatus);
    }
    if (filterTrail === 'sweet') {
      return data.primaryFood?.category === 'sweet';
    }
    if (filterTrail === 'savory') {
      return data.primaryFood?.category === 'savory';
    }

    return true;
  };

  return (
    <section id="mapSection" className="map-atlas-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-head text-center">
          <div className="section-pill">
            <Compass size={15} />
            <span>{isBn ? 'ইন্টারেক্টিভ ডিজিটাল অ্যাটলাস' : 'Interactive Digital Atlas'}</span>
          </div>
          <h2 className="atlas-main-title">
            {isBn ? (
              <>
                ৬৪ জেলার <span className="text-glow">স্বাদ ও ঐতিহ্যের</span> জীবন্ত মানচিত্র
              </>
            ) : (
              <>
                Living Map of <span className="text-glow">64 Districts</span> & Heritage
              </>
            )}
          </h2>
          <p className="atlas-sub-title">
            {isBn
              ? 'মানচিত্রের যেকোনো জেলায় কার্সর নিয়ে স্বাদ ও ইতিহাস জানুন। ক্লিক করে আপনার তালিকায় যোগ করুন এবং তৈরি করুন হাই-রেজ্যুলেশন ডিজিটাল টেস্ট পাসপোর্ট।'
              : 'Hover seamlessly over any district polygon to inspect authentic origin lore. Click to toggle your tasted roots and unlock your personalized passport.'}
          </p>
        </div>

        {/* Division & Filter Navigation Ribbon */}
        <div className="division-radar-ribbon">
          <div className="division-scroll-row">
            {DIVISION_LIST.map((div) => {
              const isActive = activeDivision === div.id;
              return (
                <button
                  key={div.id}
                  type="button"
                  className={`division-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveDivision(div.id)}
                >
                  <span className="div-icon">{div.icon}</span>
                  <span className="div-name">{isBn ? div.bn : div.en}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Trail Filters */}
          <div className="trail-filters-row">
            <span className="trail-label">
              <Filter size={14} />
              <span>{isBn ? 'স্পেশাল ট্রেইল:' : 'Special Trails:'}</span>
            </span>

            <button
              type="button"
              className={`trail-btn ${filterTrail === 'all' ? 'active' : ''}`}
              onClick={() => setFilterTrail('all')}
            >
              🌟 {isBn ? 'সকল জেলা (৬৪)' : 'All Districts'}
            </button>
            <button
              type="button"
              className={`trail-btn ${filterTrail === 'gi' ? 'active' : ''}`}
              onClick={() => setFilterTrail('gi')}
            >
              🏅 {isBn ? 'জিআই সনদপ্রাপ্ত (GI)' : 'GI Certified'}
            </button>
            <button
              type="button"
              className={`trail-btn ${filterTrail === 'sweet' ? 'active' : ''}`}
              onClick={() => setFilterTrail('sweet')}
            >
              🍯 {isBn ? 'মিষ্টান্ন ও দই ট্রেইল' : 'Sweet Trail'}
            </button>
            <button
              type="button"
              className={`trail-btn ${filterTrail === 'savory' ? 'active' : ''}`}
              onClick={() => setFilterTrail('savory')}
            >
              🥩 {isBn ? 'মাংস ও মেজবানি পদ' : 'Savory Route'}
            </button>
          </div>
        </div>

        {/* Main Interactive Stage Grid */}
        <div className="atlas-stage-grid">
          {/* LEFT: Native Vector SVG Map Box */}
          <div className="map-viewport-card">
            <div className="viewport-top-hud">
              <div className="hud-status-badge">
                <span className="pulsing-green-dot"></span>
                <span>
                  {activeDivision === 'all'
                    ? (isBn ? 'বাংলাদেশ সম্পূর্ণ দৃশ্যপট' : 'Full Bangladesh Panorama')
                    : (isBn ? `${activeDivision} বিভাগ হাইলাইট` : `${activeDivision} Division Spotlight`)}
                </span>
              </div>

              {/* Fast District Search Input */}
              <div className="map-quick-search">
                <Search size={14} className="quick-search-icon" />
                <input
                  type="text"
                  placeholder={isBn ? 'দ্রুত জেলা খুঁজুন...' : 'Find district...'}
                  value={searchDistrict}
                  onChange={(e) => {
                    const q = e.target.value;
                    setSearchDistrict(q);
                    if (q.trim()) {
                      const matched = DISTRICTS_GEO.f.find((f) => {
                        const d = foodDataMap.get(f.n);
                        return (
                          f.n.toLowerCase().includes(q.toLowerCase()) ||
                          d?.nameBn?.includes(q) ||
                          d?.nameEn?.toLowerCase().includes(q.toLowerCase())
                        );
                      });
                      if (matched) {
                        setSpotlightId(matched.n);
                      }
                    }
                  }}
                  className="quick-search-input"
                />
              </div>
            </div>

            {/* THE NATIVE SVG MAP */}
            <div className="svg-map-container">
              <svg
                viewBox="0 0 600 872"
                preserveAspectRatio="xMidYMid meet"
                className="bangladesh-vector-map"
              >
                <defs>
                  {/* Glowing gradients for tasted districts */}
                  <linearGradient id="tastedGradEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#047857" />
                  </linearGradient>

                  <linearGradient id="tastedGradGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>

                  {/* Drop shadow filter for active district */}
                  <filter id="activeGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#f59e0b" floodOpacity="0.8" />
                  </filter>
                  <filter id="hoverGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#38bdf8" floodOpacity="0.75" />
                  </filter>
                </defs>

                {/* 1. Base District Paths */}
                {DISTRICTS_GEO.f.map((f) => {
                  const isTasted = selected.has(f.n);
                  const isHovered = hoveredDistrict && hoveredDistrict.n === f.n;
                  const isSpotlight = spotlightId === f.n;
                  const isMatched = isDistrictMatched(f.n, f.dv);

                  let fillColor = '#17362a'; // Default unexplored dark slate
                  let strokeColor = 'rgba(255, 255, 255, 0.15)';
                  let strokeWidth = 1.0;
                  let filterStyle = undefined;

                  if (isTasted) {
                    fillColor = 'url(#tastedGradEmerald)';
                    strokeColor = '#34d399';
                    strokeWidth = 1.3;
                  }

                  if (!isMatched) {
                    fillColor = isTasted ? '#064e3b' : '#0d1f18';
                    strokeColor = 'rgba(255, 255, 255, 0.05)';
                  }

                  if (isSpotlight) {
                    strokeColor = '#f59e0b';
                    strokeWidth = 2.4;
                    filterStyle = 'url(#activeGlow)';
                  } else if (isHovered) {
                    strokeColor = '#38bdf8';
                    strokeWidth = 2.0;
                    filterStyle = 'url(#hoverGlow)';
                  }

                  return (
                    <path
                      key={f.n}
                      id={`svg-district-${f.n}`}
                      d={f.d}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      filter={filterStyle}
                      className={`district-path ${isTasted ? 'is-tasted' : ''} ${isHovered ? 'is-hovered' : ''} ${isSpotlight ? 'is-spotlight' : ''}`}
                      onMouseEnter={(e) => handlePathMouseEnter(e, f)}
                      onMouseMove={handlePathMouseMove}
                      onMouseLeave={handlePathMouseLeave}
                      onClick={() => handlePathClick(f)}
                    />
                  );
                })}

                {/* 2. Centroid Dots and Labels for Selected / Spotlighted */}
                {DISTRICTS_GEO.f.map((f) => {
                  const isTasted = selected.has(f.n);
                  const isSpotlight = spotlightId === f.n;
                  const isHovered = hoveredDistrict && hoveredDistrict.n === f.n;
                  if (!isTasted && !isSpotlight && !isHovered) return null;

                  const [cx, cy] = f.c;
                  const data = foodDataMap.get(f.n);
                  const label = isBn ? (data?.nameBn || f.n) : (data?.nameEn || f.n);

                  return (
                    <g key={`lbl-${f.n}`} className="district-svg-marker" pointerEvents="none">
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isSpotlight ? 4.8 : 3.4}
                        fill={isSpotlight ? '#f59e0b' : '#ffffff'}
                        stroke="#061a14"
                        strokeWidth={1.5}
                      />
                      {/* Crisp Text with Halo */}
                      <text
                        x={cx}
                        y={cy - 9}
                        textAnchor="middle"
                        stroke="#061a14"
                        strokeWidth={3.5}
                        strokeLinejoin="round"
                        className="district-svg-text-halo"
                      >
                        {label}
                      </text>
                      <text
                        x={cx}
                        y={cy - 9}
                        textAnchor="middle"
                        fill={isSpotlight ? '#fde047' : '#ffffff'}
                        className="district-svg-text-fill"
                      >
                        {label}
                      </text>
                    </g>
                  );
                })}

                {/* 3. Iconic Delicacy Food Pins (Beacons) */}
                {ICONIC_BEACONS.map((beacon) => {
                  const f = DISTRICTS_GEO.f.find((item) => item.n === beacon.id);
                  if (!f) return null;
                  const [bx, by] = f.c;
                  const isTasted = selected.has(beacon.id);

                  return (
                    <g
                      key={beacon.id}
                      className="food-beacon-pin"
                      transform={`translate(${bx}, ${by})`}
                      onClick={() => {
                        setSpotlightId(beacon.id);
                        onToggleDistrict(beacon.id);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <circle cx="0" cy="0" r="10" className="beacon-radar-ring" />
                      <circle
                        cx="0"
                        cy="0"
                        r="8"
                        fill={isTasted ? '#059669' : '#1e293b'}
                        stroke="#f59e0b"
                        strokeWidth="1.4"
                      />
                      <text x="0" y="3.5" textAnchor="middle" fontSize="9">
                        {beacon.icon}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Floating Dynamic Tooltip */}
              {mousePos.visible && hoveredDistrict && (
                <div
                  className="interactive-floating-tooltip"
                  style={{
                    left: `${mousePos.x}px`,
                    top: `${mousePos.y}px`
                  }}
                >
                  <div className="tooltip-head">
                    <span className="tooltip-name">
                      {isBn
                        ? (foodDataMap.get(hoveredDistrict.n)?.nameBn || hoveredDistrict.n)
                        : (foodDataMap.get(hoveredDistrict.n)?.nameEn || hoveredDistrict.n)}
                    </span>
                    <span className="tooltip-div">{hoveredDistrict.dv}</span>
                  </div>
                  <div className="tooltip-delicacy">
                    <span className="delicacy-icon">
                      {foodDataMap.get(hoveredDistrict.n)?.primaryFood?.icon || '🍽️'}
                    </span>
                    <span className="delicacy-title">
                      {isBn
                        ? foodDataMap.get(hoveredDistrict.n)?.primaryFood?.nameBn
                        : foodDataMap.get(hoveredDistrict.n)?.primaryFood?.nameEn}
                    </span>
                  </div>
                  <div className="tooltip-action-prompt">
                    {selected.has(hoveredDistrict.n) ? (
                      <span className="status-tasted">✓ {isBn ? 'চেখে দেখেছেন' : 'Tasted'}</span>
                    ) : (
                      <span className="status-untasted">+ {isBn ? 'চেখে দেখার জন্য ক্লিক করুন' : 'Click to Mark Tasted'}</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="map-footer-toolbar">
              <div className="hint-pill">
                <span>💡 {isBn ? 'যেকোনো জেলায় ক্লিক করে তালিকায় যুক্ত বা বাদ দিন' : 'Click any district to toggle tasted state'}</span>
              </div>
              <div className="bulk-tools">
                <button type="button" className="btn-hud-tool" onClick={onSelectAll}>
                  <CheckSquare size={13} />
                  <span>{isBn ? 'সব বাছাই' : 'Select All'}</span>
                </button>
                <button type="button" className="btn-hud-tool" onClick={onClearAll}>
                  <RotateCcw size={13} />
                  <span>{isBn ? 'সব মুছুন' : 'Clear All'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Floating Smart Spotlight Drawer & Progress Radar */}
          <div className="spotlight-hud-column">
            {/* 1. Live Roots Progress Radar */}
            <div className="progress-radar-card">
              <div className="radar-top">
                <div className="radar-metric-circle">
                  <svg viewBox="0 0 100 100" className="radial-svg">
                    <circle cx="50" cy="50" r="42" className="radial-bg" />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      className="radial-fill"
                      style={{
                        strokeDasharray: 264,
                        strokeDashoffset: 264 - (264 * tastedPercentage) / 100
                      }}
                    />
                  </svg>
                  <div className="radial-label-inner">
                    <span className="radial-number">{tastedCount}</span>
                    <span className="radial-total">/64</span>
                  </div>
                </div>

                <div className="radar-info">
                  <span className="radar-badge-rank">{getRankTitle()}</span>
                  <h3 className="radar-stat-title">
                    {isBn ? `${tastedPercentage}% স্বাদ নেওয়া সম্পন্ন` : `${tastedPercentage}% Explored`}
                  </h3>
                  <p className="radar-desc">
                    {isBn
                      ? 'যত বেশি জেলার স্বাদ আপনি যুক্ত করবেন, তত সমৃদ্ধ হবে আপনার ডিজিটাল টেস্ট পাসপোর্ট।'
                      : 'Every district you mark authenticates your journey across Bangladesh.'}
                  </p>
                </div>
              </div>

              {/* Passport Launch CTA */}
              <button
                type="button"
                className="btn-launch-passport-card"
                onClick={onOpenPassport}
              >
                <Award size={18} />
                <span>{isBn ? 'টেস্ট পাসপোর্ট তৈরি করুন' : 'Generate Taste Passport'}</span>
                <Sparkles size={16} />
              </button>
            </div>

            {/* 2. Real-Time District Spotlight Card */}
            <div className="district-spotlight-card">
              <div className="spotlight-card-header">
                <div className="spotlight-tags">
                  <span className="division-badge">
                    {isBn ? `${spotlightDistrict.divisionBn} বিভাগ` : `${spotlightDistrict.divisionEn} Div`}
                  </span>
                  {spotlightDistrict.primaryFood?.giStatus && (
                    <span className="gi-badge">🏅 GI Certified</span>
                  )}
                  <span className="category-pill">{spotlightDistrict.primaryFood?.category}</span>
                </div>

                <div className="spotlight-title-row">
                  <div>
                    <h3 className="spotlight-district-name">
                      {isBn ? spotlightDistrict.nameBn : spotlightDistrict.nameEn}
                    </h3>
                    <span className="spotlight-latin-sub">
                      {isBn ? spotlightDistrict.nameEn : spotlightDistrict.nameBn}
                    </span>
                  </div>
                  <span className="spotlight-hero-icon">
                    {spotlightDistrict.primaryFood?.icon || '🍽️'}
                  </span>
                </div>
              </div>

              <div className="spotlight-card-body">
                <div className="delicacy-name-banner">
                  <Flame size={16} className="flame-icon" />
                  <h4>{isBn ? spotlightDistrict.primaryFood?.nameBn : spotlightDistrict.primaryFood?.nameEn}</h4>
                </div>

                <p className="delicacy-desc">
                  {isBn
                    ? spotlightDistrict.primaryFood?.descriptionBn
                    : spotlightDistrict.primaryFood?.descriptionEn}
                </p>

                {/* Historic Spots */}
                <div className="spotlight-info-row">
                  <span className="info-icon">📍</span>
                  <div className="info-texts">
                    <strong className="info-title">{isBn ? 'আদি ও খাঁটি স্থান:' : 'Authentic Spots:'}</strong>
                    <span className="info-val">
                      {isBn
                        ? spotlightDistrict.primaryFood?.famousSpotsBn
                        : spotlightDistrict.primaryFood?.famousSpotsEn}
                    </span>
                  </div>
                </div>

                {/* Cultural Landmark */}
                {spotlightDistrict.culturalPride && (
                  <div className="spotlight-info-row">
                    <span className="info-icon">🏛️</span>
                    <div className="info-texts">
                      <strong className="info-title">{isBn ? 'সাংস্কৃতিক গৌরব:' : 'Cultural Pride:'}</strong>
                      <span className="info-val">
                        {isBn
                          ? spotlightDistrict.culturalPride.landmarkBn
                          : spotlightDistrict.culturalPride.landmarkEn}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="spotlight-card-actions">
                <button
                  type="button"
                  className={`btn-toggle-tasted-main ${isSpotlightTasted ? 'tasted' : ''}`}
                  onClick={() => onToggleDistrict(spotlightDistrict.id)}
                >
                  {isSpotlightTasted ? (
                    <>
                      <CheckCircle2 size={18} />
                      <span>{isBn ? 'তালিকায় যুক্ত হয়েছে (চেখেছি)' : 'Tasted & Explored'}</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle size={18} />
                      <span>{isBn ? 'চেখেছি হিসেবে যুক্ত করুন' : 'Mark as Tasted'}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="btn-open-modal-details"
                  onClick={() => onOpenDetails(spotlightDistrict)}
                  title={isBn ? 'সম্পূর্ণ ঐতিহ্য বিবরণী দেখুন' : 'View Full Heritage Lore'}
                >
                  <Eye size={17} />
                  <span>{isBn ? 'বিস্তারিত' : 'Lore'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
