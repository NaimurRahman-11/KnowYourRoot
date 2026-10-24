import { DISTRICTS_GEO } from '../data/districts-geo.js';
import { FOOD_CULTURE_DATA } from '../data/food-culture-data.js';
import confetti from 'canvas-confetti';

export const THEMES = [
  {
    id: "emerald",
    nameEn: "Emerald Heritage",
    nameBn: "পান্না সবুজ",
    bg: "#05130e",
    cardBg: "#0a2219",
    divBg: "#0f2e22",
    divBgActive: "#143d2e",
    stroke: "#10b981",
    v1: "#10b981",
    v2: "#059669",
    ink: "#ffffff",
    muted: "#94a3b8",
    gold: "#f59e0b",
    accent: "#34d399",
    border: "rgba(52, 211, 153, 0.35)",
    borderActive: "rgba(245, 158, 11, 0.6)",
    dot: "#f59e0b"
  },
  {
    id: "terracotta",
    nameEn: "Clay Terracotta",
    nameBn: "পোড়ামাটি",
    bg: "#180c07",
    cardBg: "#28150d",
    divBg: "#351c12",
    divBgActive: "#442417",
    stroke: "#ea580c",
    v1: "#f97316",
    v2: "#c2410c",
    ink: "#ffffff",
    muted: "#cbd5e1",
    gold: "#fbbf24",
    accent: "#fb923c",
    border: "rgba(249, 115, 22, 0.4)",
    borderActive: "rgba(251, 191, 36, 0.6)",
    dot: "#fbbf24"
  },
  {
    id: "midnight",
    nameEn: "Midnight Royal",
    nameBn: "নীল রাত",
    bg: "#050b18",
    cardBg: "#0e1a35",
    divBg: "#14254b",
    divBgActive: "#1b3265",
    stroke: "#38bdf8",
    v1: "#38bdf8",
    v2: "#6366f1",
    ink: "#ffffff",
    muted: "#94a3b8",
    gold: "#f59e0b",
    accent: "#60a5fa",
    border: "rgba(56, 189, 248, 0.4)",
    borderActive: "rgba(245, 158, 11, 0.6)",
    dot: "#f43f5e"
  },
  {
    id: "sunset",
    nameEn: "Sunset Crimson",
    nameBn: "গোধূলি আভা",
    bg: "#180612",
    cardBg: "#2b0d20",
    divBg: "#3a132c",
    divBgActive: "#4d1a3b",
    stroke: "#ec4899",
    v1: "#f43f5e",
    v2: "#db2777",
    ink: "#ffffff",
    muted: "#cbd5e1",
    gold: "#fcd34d",
    accent: "#f472b6",
    border: "rgba(244, 63, 94, 0.4)",
    borderActive: "rgba(252, 211, 77, 0.6)",
    dot: "#fbbf24"
  }
];

export const DIVISION_META = [
  { id: "Dhaka", en: "Dhaka", bn: "ঢাকা", icon: "🏙️", count: 13 },
  { id: "Chattogram", en: "Chattogram", bn: "চট্টগ্রাম", icon: "🌊", count: 11 },
  { id: "Rajshahi", en: "Rajshahi", bn: "রাজশাহী", icon: "🥭", count: 8 },
  { id: "Khulna", en: "Khulna", bn: "খুলনা", icon: "🐯", count: 10 },
  { id: "Barishal", en: "Barishal", bn: "বরিশাল", icon: "⛵", count: 6 },
  { id: "Sylhet", en: "Sylhet", bn: "সিলেট", icon: "🍵", count: 4 },
  { id: "Rangpur", en: "Rangpur", bn: "রংপুর", icon: "🌾", count: 8 },
  { id: "Mymensingh", en: "Mymensingh", bn: "ময়মনসিংহ", icon: "🌿", count: 4 }
];

export const CROWN_JEWELS = [
  { id: "BOGURA", foodBn: "বগুড়ার দই", foodEn: "Bogura Curd", distBn: "বগুড়া", icon: "🍮", gi: true },
  { id: "NATORE", foodBn: "কাঁচাগোল্লা", foodEn: "Kachagolla", distBn: "নাটোর", icon: "🥟", gi: true },
  { id: "CUMILLA", foodBn: "রসমালাই", foodEn: "Roshomalai", distBn: "কুমিল্লা", icon: "🥣", gi: true },
  { id: "PABNA", foodBn: "গাওয়া ঘি", foodEn: "Gawa Ghee", distBn: "পাবনা", icon: "🧈", gi: false },
  { id: "CHATTOGRAM", foodBn: "কালা ভুনা", foodEn: "Kala Bhuna", distBn: "চট্টগ্রাম", icon: "🥩", gi: false },
  { id: "TANGAIL", foodBn: "চমচম", foodEn: "Chamcham", distBn: "টাঙ্গাইল", icon: "🍬", gi: true }
];

export function getRankTitle(count, lang = 'bn') {
  if (count >= 64) return lang === 'bn' ? "গ্র্যান্ড মাস্টার অব বেঙ্গল রুটস (Grand Sovereign)" : "Grand Sovereign of 64 Districts (100%)";
  if (count >= 50) return lang === 'bn' ? "জীবন্ত কিংবদন্তি (Living Legend)" : "Living Legend (Grand Connoisseur)";
  if (count >= 30) return lang === 'bn' ? "শিকড়ের মহারাজ (Master of Roots)" : "Master of Roots (Level 4)";
  if (count >= 15) return lang === 'bn' ? "বাংলার রসনাবিদ (Culinary Connoisseur)" : "Culinary Connoisseur (Level 3)";
  if (count >= 5) return lang === 'bn' ? "অভিজ্ঞ স্বাদ সন্ধানী (Heritage Wanderer)" : "Heritage Wanderer (Level 2)";
  return lang === 'bn' ? "শুরুয়াতি পথিক (Curious Explorer)" : "Curious Explorer (Level 1)";
}

export function bnDigits(num) {
  return String(num).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function loadImage(src) {
  return new Promise((resolve) => {
    if (!src) return resolve(null);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/**
 * Generates an ultra-legible, prestigious, and scalable 1200 x 1600 px Taste Passport
 * that seamlessly handles 1 to ALL 64 districts without crowding.
 */
export async function generatePassportCanvas(options = {}) {
  const selectedSet = options.selected || options.visitedSet || options.selectedDistricts || new Set();
  const selected = selectedSet instanceof Set ? selectedSet : new Set(selectedSet);
  const themeId = options.themeId || 'emerald';
  const userName = (options.userName || '').trim();
  const avatarSrc = options.avatarImg || options.userPhoto || null;
  const lang = options.lang || 'bn';

  const theme = THEMES.find((t) => t.id === themeId) || THEMES[0];
  const isBn = lang === 'bn';

  // Build food dictionary
  const foodMap = new Map();
  FOOD_CULTURE_DATA.forEach((d) => foodMap.set(d.id, d));

  const width = 1200;
  const height = 1600;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const FONT_HEAD = '"Hind Siliguri", "Noto Sans Bengali", sans-serif';
  const FONT_BODY = '"Plus Jakarta Sans", "Noto Sans Bengali", sans-serif';

  // 1. Luxury Dark Background
  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, width, height);

  // Subtle center radial glow
  const radialGlow = ctx.createRadialGradient(width / 2, height / 2, 80, width / 2, height / 2, 750);
  radialGlow.addColorStop(0, theme.cardBg);
  radialGlow.addColorStop(1, theme.bg);
  ctx.fillStyle = radialGlow;
  ctx.fillRect(0, 0, width, height);

  // 2. Watermark Silhouette of Bangladesh Map in Center Background (Delicate 7% opacity)
  ctx.save();
  ctx.globalAlpha = 0.07;
  const wmScale = 1.65;
  const wmX = (width - DISTRICTS_GEO.w * wmScale) / 2;
  const wmY = 150;
  ctx.translate(wmX, wmY);
  ctx.scale(wmScale, wmScale);
  for (const f of DISTRICTS_GEO.f) {
    const p = new Path2D(f.d);
    ctx.fillStyle = theme.stroke;
    ctx.fill(p);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1;
    ctx.stroke(p);
  }
  ctx.restore();

  // 3. Double Gold / Metallic Border Frame
  const pad = 44;
  ctx.strokeStyle = theme.gold;
  ctx.lineWidth = 3.5;
  roundRect(ctx, pad, pad, width - pad * 2, height - pad * 2, 28);
  ctx.stroke();

  // Security dashed line
  ctx.save();
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([8, 6]);
  roundRect(ctx, pad + 12, pad + 12, width - (pad + 12) * 2, height - (pad + 12) * 2, 20);
  ctx.stroke();
  ctx.restore();

  // Corner Ornaments
  const drawCorner = (cx, cy, sx, sy) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(sx, sy);
    ctx.strokeStyle = theme.gold;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(14, 28);
    ctx.lineTo(14, 14);
    ctx.lineTo(28, 14);
    ctx.stroke();
    ctx.restore();
  };
  drawCorner(pad + 18, pad + 18, 1, 1);
  drawCorner(width - pad - 18, pad + 18, -1, 1);
  drawCorner(pad + 18, height - pad - 18, 1, -1);
  drawCorner(width - pad - 18, height - pad - 18, -1, -1);

  // 4. Header Section: Republic Crest & Diplomatic Banner
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillStyle = theme.gold;
  ctx.font = `800 15px ${FONT_BODY}`;
  ctx.fillText("PEOPLE'S REPUBLIC OF BANGLADESH · গণপ্রজাতন্ত্রী বাংলাদেশ", width / 2, pad + 40);

  ctx.fillStyle = "#ffffff";
  ctx.font = `800 34px ${FONT_HEAD}`;
  ctx.fillText(
    isBn ? "বাংলাদেশ রন্ধন ঐতিহ্য সনদ ও টেস্ট পাসপোর্ট" : "OFFICIAL CULINARY HERITAGE PASSPORT",
    width / 2,
    pad + 80
  );

  ctx.fillStyle = theme.accent;
  ctx.font = `600 16px ${FONT_BODY}`;
  ctx.fillText(
    isBn ? "৬৪ জেলার আদি স্বাদ ও ভৌগোলিক সংস্কৃতি অভিযাত্রা" : "Definitive Gastronomic Anthology of 64 Districts",
    width / 2,
    pad + 114
  );

  // Serial Number Tag
  const hashVal = Math.abs(userName.split('').reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0) % 90000 + 10000);
  const serialNo = `BD-KYR-2026-${hashVal}`;
  ctx.fillStyle = "rgba(255, 255, 255, 0.07)";
  roundRect(ctx, width / 2 - 150, pad + 132, 300, 28, 14);
  ctx.fill();
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = theme.muted;
  ctx.font = `700 12px ${FONT_BODY}`;
  ctx.fillText(`DOCUMENT ID: ${serialNo}`, width / 2, pad + 146);

  // 5. Traveler Profile Identity Plaque
  const profileY = pad + 175;
  const profileH = 142;
  const profileW = width - (pad + 24) * 2;
  const profileX = pad + 24;

  ctx.fillStyle = theme.cardBg;
  roundRect(ctx, profileX, profileY, profileW, profileH, 20);
  ctx.fill();
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Load avatar
  const userPhotoImg = await loadImage(avatarSrc);
  const avatarSize = 100;
  const avatarX = profileX + 22;
  const avatarY = profileY + 21;

  ctx.save();
  roundRect(ctx, avatarX, avatarY, avatarSize, avatarSize, 50);
  ctx.clip();

  if (userPhotoImg) {
    const iw = userPhotoImg.naturalWidth;
    const ih = userPhotoImg.naturalHeight;
    const k = Math.max(avatarSize / iw, avatarSize / ih);
    ctx.drawImage(userPhotoImg, avatarX + (avatarSize - iw * k) / 2, avatarY + (avatarSize - ih * k) / 2, iw * k, ih * k);
  } else {
    const gradAvatar = ctx.createLinearGradient(avatarX, avatarY, avatarX + avatarSize, avatarY + avatarSize);
    gradAvatar.addColorStop(0, theme.v1);
    gradAvatar.addColorStop(1, theme.v2);
    ctx.fillStyle = gradAvatar;
    ctx.fillRect(avatarX, avatarY, avatarSize, avatarSize);

    ctx.fillStyle = "#ffffff";
    ctx.font = `800 44px ${FONT_HEAD}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const initial = (userName.trim() ? userName.trim()[0] : (isBn ? 'বা' : 'K')).toUpperCase();
    ctx.fillText(initial, avatarX + avatarSize / 2, avatarY + avatarSize / 2);
  }
  ctx.restore();

  // Avatar Gold Ring
  ctx.strokeStyle = theme.gold;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2 + 2, 0, Math.PI * 2);
  ctx.stroke();

  // Traveler Info text
  const textStartX = avatarX + avatarSize + 26;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  const travelerName = userName.trim() ? userName.trim() : (isBn ? "বাংলার রসিক অভিযাত্রী" : "Bengal Roots Traveler");
  ctx.fillStyle = "#ffffff";
  ctx.font = `800 28px ${FONT_HEAD}`;
  ctx.fillText(travelerName, textStartX, profileY + 50);

  const tastedCount = selected.size;
  const rankStr = getRankTitle(tastedCount, lang);
  ctx.fillStyle = theme.gold;
  ctx.font = `700 16px ${FONT_BODY}`;
  ctx.fillText(`🏅 ${rankStr}`, textStartX, profileY + 80);

  // Exploration Progress Meter
  const pct = Math.round((tastedCount / 64) * 100);
  const barW = 380;
  const barH = 10;
  const barY = profileY + 98;

  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  roundRect(ctx, textStartX, barY, barW, barH, 5);
  ctx.fill();

  if (pct > 0) {
    const fillGrad = ctx.createLinearGradient(textStartX, 0, textStartX + barW, 0);
    fillGrad.addColorStop(0, theme.v1);
    fillGrad.addColorStop(1, theme.gold);
    ctx.fillStyle = fillGrad;
    roundRect(ctx, textStartX, barY, Math.max(12, (barW * pct) / 100), barH, 5);
    ctx.fill();
  }

  // Right Tally Box
  ctx.textAlign = "right";
  ctx.fillStyle = theme.gold;
  ctx.font = `800 52px ${FONT_HEAD}`;
  ctx.fillText(`${isBn ? bnDigits(tastedCount) : tastedCount}`, profileX + profileW - 74, profileY + 65);

  ctx.fillStyle = theme.muted;
  ctx.font = `600 24px ${FONT_HEAD}`;
  ctx.fillText(isBn ? "/ ৬৪" : "/ 64", profileX + profileW - 24, profileY + 65);

  ctx.fillStyle = theme.accent;
  ctx.font = `700 15px ${FONT_BODY}`;
  ctx.fillText(isBn ? `${bnDigits(pct)}% সম্পন্ন` : `${pct}% Explored`, profileX + profileW - 24, profileY + 104);

  // 6. CENTERPIECE: The 8 Divisional Heritage Chapters (Scalable & 100% Legible!)
  const divSectionY = profileY + profileH + 26;

  ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff";
  ctx.font = `800 22px ${FONT_HEAD}`;
  ctx.fillText(
    isBn ? "★ ৮ বিভাগীয় ঐতিহ্য ও অন্বেষণ সূচক (Divisional Heritage Chapters):" : "★ 8 DIVISIONAL HERITAGE CHAPTERS & TASTED DELICACIES:",
    pad + 26,
    divSectionY + 8
  );

  ctx.textAlign = "right";
  ctx.fillStyle = theme.muted;
  ctx.font = `600 13px ${FONT_BODY}`;
  ctx.fillText(
    isBn ? "৬৪ জেলার পূর্ণাঙ্গ স্বাদ বিবরণী" : "All 64 Regional Specialties Classified",
    width - (pad + 26),
    divSectionY + 8
  );

  // 2 columns x 4 rows = 8 division cards
  const gridX = pad + 24;
  const gridY = divSectionY + 24;
  const gridW = width - (pad + 24) * 2;
  const cols = 2;
  const colGap = 18;
  const rowGap = 16;
  const cardW = (gridW - colGap) / cols;
  const cardH = 148;

  DIVISION_META.forEach((div, idx) => {
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    const cx = gridX + col * (cardW + colGap);
    const cy = gridY + row * (cardH + rowGap);

    // Get all districts belonging to this division
    const divDistricts = FOOD_CULTURE_DATA.filter((d) => d.divisionEn === div.id);
    const divTasted = divDistricts.filter((d) => selected.has(d.id));
    const isComplete = divTasted.length === div.count && div.count > 0;
    const hasTastedAny = divTasted.length > 0;

    // Card background
    ctx.fillStyle = isComplete ? theme.divBgActive : (hasTastedAny ? theme.divBg : "rgba(255, 255, 255, 0.02)");
    roundRect(ctx, cx, cy, cardW, cardH, 16);
    ctx.fill();

    // Border
    ctx.strokeStyle = isComplete ? theme.borderActive : (hasTastedAny ? theme.border : "rgba(255, 255, 255, 0.07)");
    ctx.lineWidth = isComplete ? 2 : 1.2;
    ctx.stroke();

    // Division Card Header
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";

    // Icon + Division Title
    ctx.font = "20px sans-serif";
    ctx.fillText(div.icon, cx + 16, cy + 30);

    ctx.fillStyle = "#ffffff";
    ctx.font = `800 18px ${FONT_HEAD}`;
    const divTitle = isBn ? `${div.bn} বিভাগ` : `${div.en} Division`;
    ctx.fillText(divTitle, cx + 46, cy + 30);

    // Score Tag right
    ctx.textAlign = "right";
    const scoreText = isBn
      ? `${bnDigits(divTasted.length)} / ${bnDigits(div.count)}`
      : `${divTasted.length} / ${div.count}`;

    if (isComplete) {
      ctx.fillStyle = theme.gold;
      ctx.font = `800 13px ${FONT_BODY}`;
      ctx.fillText(`★ ${scoreText} COMPLETE`, cx + cardW - 16, cy + 30);
    } else {
      ctx.fillStyle = hasTastedAny ? theme.accent : theme.muted;
      ctx.font = `700 13px ${FONT_BODY}`;
      ctx.fillText(scoreText, cx + cardW - 16, cy + 30);
    }

    // Mini division progress bar
    const miniBarW = cardW - 32;
    const miniBarH = 5;
    const miniBarY = cy + 42;

    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    roundRect(ctx, cx + 16, miniBarY, miniBarW, miniBarH, 3);
    ctx.fill();

    if (divTasted.length > 0) {
      const fillW = Math.max(6, (miniBarW * divTasted.length) / div.count);
      ctx.fillStyle = isComplete ? theme.gold : theme.v1;
      roundRect(ctx, cx + 16, miniBarY, fillW, miniBarH, 3);
      ctx.fill();
    }

    // Content: Show what food items have been tasted in this division!
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    if (hasTastedAny) {
      // Build a clean string of tasted foods in this division
      const tastedFoodNames = divTasted.map((d) => {
        return isBn ? d.primaryFood?.nameBn : d.primaryFood?.nameEn;
      }).filter(Boolean);

      const itemsText = tastedFoodNames.slice(0, 3).join(" · ");
      const extraCount = tastedFoodNames.length - 3;

      ctx.fillStyle = isComplete ? "#ffffff" : theme.ink;
      ctx.font = `700 13.5px ${FONT_HEAD}`;
      ctx.fillText(
        `✓ চেখেছেন: ${itemsText}${extraCount > 0 ? ` +${isBn ? bnDigits(extraCount) : extraCount}টি` : ""}`,
        cx + 16,
        cy + 58
      );

      // District origins
      const distNames = divTasted.map((d) => isBn ? d.nameBn : d.nameEn).slice(0, 4).join(", ");
      ctx.fillStyle = theme.gold;
      ctx.font = `500 12px ${FONT_BODY}`;
      ctx.fillText(`📍 জেলা: ${distNames}${divTasted.length > 4 ? "..." : ""}`, cx + 16, cy + 82);

      // Status pill
      ctx.fillStyle = isComplete ? "rgba(245, 158, 11, 0.2)" : "rgba(16, 185, 129, 0.15)";
      roundRect(ctx, cx + 16, cy + 106, cardW - 32, 26, 8);
      ctx.fill();

      ctx.fillStyle = isComplete ? theme.gold : "#34d399";
      ctx.font = `700 11.5px ${FONT_BODY}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        isComplete
          ? (isBn ? "👑 বিভাগের শতভাগ ঐতিহ্য সম্পন্ন!" : "👑 100% REGIONAL HERITAGE CONQUERED")
          : (isBn ? `✓ ${bnDigits(divTasted.length)}টি জেলার স্বাদ প্রমাণিত` : `✓ ${divTasted.length} Districts Authenticated`),
        cx + cardW / 2,
        cy + 119
      );
    } else {
      // Unexplored prompt
      ctx.fillStyle = theme.muted;
      ctx.font = `500 12.5px ${FONT_HEAD}`;
      const sampleDist = divDistricts.slice(0, 3).map((d) => isBn ? d.nameBn : d.nameEn).join(", ");
      ctx.fillText(`এই বিভাগের স্বাদ এখনো গ্রহণ করেননি (${sampleDist}...)`, cx + 16, cy + 64);

      ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
      roundRect(ctx, cx + 16, cy + 102, cardW - 32, 26, 8);
      ctx.fill();

      ctx.fillStyle = theme.muted;
      ctx.font = `600 11.5px ${FONT_BODY}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(isBn ? "+ পরবর্তী ভ্রমণ স্বাদ তালিকা" : "+ Awaiting Exploration", cx + cardW / 2, cy + 115);
    }
  });

  // 7. CROWN JEWELS GI STRIP (Y: 1290)
  const jewelY = gridY + 4 * (cardH + rowGap) + 16;

  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#ffffff";
  ctx.font = `800 20px ${FONT_HEAD}`;
  ctx.fillText(isBn ? "★ স্বীকৃত ভৌগোলিক নির্দেশক ও রাজকীয় স্বাদ (Crown Heritage Seals):" : "★ ICONIC GI & ROYAL CULINARY SEALS:", pad + 26, jewelY);

  const jewelGridY = jewelY + 14;
  const jewelCols = 6;
  const jewelGap = 12;
  const jewelW = (gridW - jewelGap * (jewelCols - 1)) / jewelCols;
  const jewelH = 92;

  CROWN_JEWELS.forEach((jewel, i) => {
    const jx = gridX + i * (jewelW + jewelGap);
    const isTasted = selected.has(jewel.id);

    ctx.fillStyle = isTasted ? theme.divBgActive : "rgba(255, 255, 255, 0.03)";
    roundRect(ctx, jx, jewelGridY, jewelW, jewelH, 12);
    ctx.fill();
    ctx.strokeStyle = isTasted ? theme.gold : "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = isTasted ? 1.5 : 1;
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "24px sans-serif";
    ctx.fillText(jewel.icon, jx + jewelW / 2, jewelGridY + 26);

    ctx.fillStyle = isTasted ? "#ffffff" : theme.muted;
    ctx.font = `700 12.5px ${FONT_HEAD}`;
    ctx.fillText(isBn ? jewel.foodBn : jewel.foodEn, jx + jewelW / 2, jewelGridY + 54);

    ctx.fillStyle = isTasted ? theme.gold : "rgba(255, 255, 255, 0.3)";
    ctx.font = `600 10.5px ${FONT_BODY}`;
    ctx.fillText(isTasted ? "✓ TASTED" : "UNEXPLORED", jx + jewelW / 2, jewelGridY + 74);
  });

  // 8. Bottom Security Seal & Footer Verification
  const footerY = height - pad - 54;

  // Official Gold Verification Stamp
  ctx.save();
  ctx.translate(pad + 160, footerY);
  ctx.rotate(-0.05);
  ctx.strokeStyle = theme.gold;
  ctx.lineWidth = 2.5;
  roundRect(ctx, -135, -30, 270, 60, 12);
  ctx.stroke();

  ctx.fillStyle = theme.gold;
  ctx.font = `800 15px ${FONT_BODY}`;
  ctx.textAlign = "center";
  ctx.fillText("✓ VERIFIED ROOTS", 0, -8);
  ctx.font = `700 11px ${FONT_HEAD}`;
  ctx.fillText(isBn ? "খাঁটি বাংলাদেশি ঐতিহ্য ও স্বাদ" : "AUTHENTIC BENGAL HERITAGE", 0, 12);
  ctx.restore();

  // Footer Link & Signature
  ctx.textAlign = "right";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#ffffff";
  ctx.font = `800 16px ${FONT_BODY}`;
  ctx.fillText("KnowYourRoot — আপনার শিকড়কে জানুন", width - pad - 26, footerY - 6);

  ctx.fillStyle = theme.muted;
  ctx.font = `600 12px ${FONT_BODY}`;
  ctx.fillText("https://know-your-root.vercel.app · Official Collector Edition", width - pad - 26, footerY + 16);

  return canvas;
}

export function triggerCelebrationConfetti() {
  confetti({
    particleCount: 80,
    spread: 80,
    origin: { y: 0.6 }
  });
}

export async function generatePassportCard(userName, avatarImg, visitedSet, themeId, lang) {
  return downloadPassportImage({
    userName,
    avatarImg,
    selected: visitedSet,
    themeId,
    lang
  });
}

export async function downloadPassportImage(options = {}) {
  const canvas = await generatePassportCanvas(options);
  const nameSlug = options.userName ? options.userName.trim().replace(/\s+/g, '_') : 'Explorer';
  const filename = `KnowYourRoot_Passport_${nameSlug}.jpg`;

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 4000);

    triggerCelebrationConfetti();
  }, 'image/jpeg', 0.95);
}
