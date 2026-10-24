import { DISTRICTS_GEO } from '../data/districts-geo.js';
import { FOOD_CULTURE_DATA } from '../data/food-culture-data.js';
import confetti from 'canvas-confetti';

export const THEMES = [
  {
    id: "emerald",
    nameEn: "Royal Botanical & Sovereign Gold",
    nameBn: "রাজকীয় বোটানিক্যাল ও স্বর্ণালী",
    isLight: false,
    bg: "#071e16",
    bgGradientEnd: "#030e0b",
    cardBg: "#0d2c20",
    divBg: "#11382a",
    divBgActive: "#174735",
    stroke: "#10b981",
    v1: "#10b981",
    v2: "#059669",
    ink: "#ffffff",
    inkSecondary: "#e2f5ec",
    muted: "#9fd3be",
    gold: "#fbbf24",
    goldSoft: "rgba(251, 191, 36, 0.16)",
    accent: "#34d399",
    border: "rgba(52, 211, 153, 0.28)",
    borderActive: "#fbbf24",
    sealBorder: "#fbbf24",
    dot: "#fbbf24"
  },
  {
    id: "ivory",
    nameEn: "Heritage Parchment & Forest Pine",
    nameBn: "ঐতিহ্যবাহী প্যার্চমেন্ট ও পাইন",
    isLight: true,
    bg: "#fcfaf6",
    bgGradientEnd: "#f3ede2",
    cardBg: "#ffffff",
    divBg: "#faf6ed",
    divBgActive: "#ebf7f1",
    stroke: "#065f46",
    v1: "#059669",
    v2: "#047857",
    ink: "#0f291e",
    inkSecondary: "#1e3d30",
    muted: "#446959",
    gold: "#b45309",
    goldSoft: "rgba(180, 83, 9, 0.12)",
    accent: "#059669",
    border: "#d9e5dd",
    borderActive: "#059669",
    sealBorder: "#b45309",
    dot: "#b45309"
  },
  {
    id: "midnight",
    nameEn: "Midnight Sapphire & Champagne",
    nameBn: "নীল রজনী ও শ্যাম্পেন গোল্ড",
    isLight: false,
    bg: "#081224",
    bgGradientEnd: "#040913",
    cardBg: "#0f1f38",
    divBg: "#142847",
    divBgActive: "#1b355d",
    stroke: "#38bdf8",
    v1: "#38bdf8",
    v2: "#6366f1",
    ink: "#ffffff",
    inkSecondary: "#e2e8f0",
    muted: "#94a3b8",
    gold: "#fbbf24",
    goldSoft: "rgba(251, 191, 36, 0.18)",
    accent: "#60a5fa",
    border: "rgba(255, 255, 255, 0.18)",
    borderActive: "#fbbf24",
    sealBorder: "#fbbf24",
    dot: "#fbbf24"
  },
  {
    id: "terracotta",
    nameEn: "Warm Clay & Burnished Sand",
    nameBn: "পোড়ামাটি ও সোনালী বালুকা",
    isLight: true,
    bg: "#faf5ef",
    bgGradientEnd: "#f0e5da",
    cardBg: "#ffffff",
    divBg: "#fbf6f0",
    divBgActive: "#fdeee5",
    stroke: "#c2410c",
    v1: "#ea580c",
    v2: "#9a3412",
    ink: "#2e150a",
    inkSecondary: "#452212",
    muted: "#6e4b3c",
    gold: "#d97706",
    goldSoft: "rgba(217, 119, 6, 0.14)",
    accent: "#ea580c",
    border: "#e5d5c7",
    borderActive: "#ea580c",
    sealBorder: "#c2410c",
    dot: "#d97706"
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
  if (count >= 64) return lang === 'bn' ? "গ্র্যান্ড সার্বভৌম রসনাবিদ (Grand Sovereign of 64 Districts)" : "Grand Sovereign of 64 Districts (100% Conquered)";
  if (count >= 50) return lang === 'bn' ? "জীবন্ত ঐতিহ্য কিংবদন্তি (Living Heritage Legend)" : "Living Heritage Legend (Tier 5)";
  if (count >= 30) return lang === 'bn' ? "শিকড়ের মহারাজ (Master of Bengal Roots)" : "Master of Bengal Roots (Tier 4)";
  if (count >= 15) return lang === 'bn' ? "বাংলার বিশিষ্ট রসনাবিদ (Culinary Connoisseur)" : "Culinary Connoisseur (Tier 3)";
  if (count >= 5) return lang === 'bn' ? "অভিজ্ঞ স্বাদ সন্ধানী (Heritage Wanderer)" : "Heritage Wanderer (Tier 2)";
  return lang === 'bn' ? "শুরুয়াতি পথিক (Curious Explorer)" : "Curious Explorer (Tier 1)";
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
 * Generates an eye-soothing, prestigious, high-visibility 1200 x 1600 px Taste Passport
 * with natural contrast, non-crowded divisional chapters, and readable typography.
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

  // 1. Soothing Background with gentle warm vignette
  const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 80, width / 2, height / 2, 880);
  bgGrad.addColorStop(0, theme.bg);
  bgGrad.addColorStop(1, theme.bgGradientEnd || theme.bg);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Elegant Guilloche Frame & Ornaments (No intrusive watermark that obscures text)
  const pad = 42;
  ctx.strokeStyle = theme.gold;
  ctx.lineWidth = 3.5;
  roundRect(ctx, pad, pad, width - pad * 2, height - pad * 2, 22);
  ctx.stroke();

  // Inner decorative stitch line
  ctx.save();
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 1.4;
  ctx.setLineDash([8, 6]);
  roundRect(ctx, pad + 12, pad + 12, width - (pad + 12) * 2, height - (pad + 12) * 2, 16);
  ctx.stroke();
  ctx.restore();

  // Corner Filigree Ornaments
  const drawCorner = (cx, cy, sx, sy) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(sx, sy);
    ctx.strokeStyle = theme.gold;
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(14, 30);
    ctx.lineTo(14, 14);
    ctx.lineTo(30, 14);
    ctx.stroke();
    ctx.restore();
  };
  drawCorner(pad + 18, pad + 18, 1, 1);
  drawCorner(width - pad - 18, pad + 18, -1, 1);
  drawCorner(pad + 18, height - pad - 18, 1, -1);
  drawCorner(width - pad - 18, height - pad - 18, -1, -1);

  // 3. Header Bar: People's Republic & Formal Crest Title
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillStyle = theme.gold;
  ctx.font = `800 15px ${FONT_BODY}`;
  ctx.fillText("PEOPLE'S REPUBLIC OF BANGLADESH · গণপ্রজাতন্ত্রী বাংলাদেশ", width / 2, pad + 38);

  ctx.fillStyle = theme.ink;
  ctx.font = `800 36px ${FONT_HEAD}`;
  ctx.fillText(
    isBn ? "বাংলাদেশ রন্ধন ঐতিহ্য সনদ ও টেস্ট পাসপোর্ট" : "OFFICIAL CULINARY HERITAGE PASSPORT",
    width / 2,
    pad + 80
  );

  ctx.fillStyle = theme.muted;
  ctx.font = `600 16px ${FONT_BODY}`;
  ctx.fillText(
    isBn ? "৬৪ জেলার প্রামাণ্য আঞ্চলিক খাদ্যাভ্যাস ও ভৌগোলিক সংস্কৃতি অভিযাত্রা" : "64 Districts Authentic Gastronomy & Cultural Odysseys",
    width / 2,
    pad + 114
  );

  // Document Serial Tag
  const hashVal = Math.abs(userName.split('').reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0) % 90000 + 10000);
  const serialNo = `BD-KYR-2026-${hashVal}`;
  ctx.fillStyle = theme.goldSoft;
  roundRect(ctx, width / 2 - 170, pad + 132, 340, 30, 15);
  ctx.fill();
  ctx.strokeStyle = theme.gold;
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = theme.ink;
  ctx.font = `700 13px ${FONT_BODY}`;
  ctx.fillText(`HERITAGE DOCUMENT ID: ${serialNo}`, width / 2, pad + 147);

  // 4. Traveler Profile Identity Plaque (High Contrast & Clear)
  const profileY = pad + 176;
  const profileH = 144;
  const profileW = width - (pad + 24) * 2;
  const profileX = pad + 24;

  ctx.fillStyle = theme.cardBg;
  roundRect(ctx, profileX, profileY, profileW, profileH, 18);
  ctx.fill();
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 1.6;
  ctx.stroke();

  // Load avatar
  const userPhotoImg = await loadImage(avatarSrc);
  const avatarSize = 100;
  const avatarX = profileX + 24;
  const avatarY = profileY + 22;

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
    ctx.font = `800 46px ${FONT_HEAD}`;
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

  // Traveler details
  const textStartX = avatarX + avatarSize + 28;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  const travelerName = userName.trim() ? userName.trim() : (isBn ? "বাংলার রসিক অভিযাত্রী" : "Bengal Roots Traveler");
  ctx.fillStyle = theme.ink;
  ctx.font = `800 30px ${FONT_HEAD}`;
  ctx.fillText(travelerName, textStartX, profileY + 50);

  const tastedCount = selected.size;
  const rankStr = getRankTitle(tastedCount, lang);
  ctx.fillStyle = theme.gold;
  ctx.font = `700 16px ${FONT_BODY}`;
  ctx.fillText(`🏅 ${rankStr}`, textStartX, profileY + 80);

  // Exploration Progress Meter
  const pct = Math.round((tastedCount / 64) * 100);
  const barW = 400;
  const barH = 12;
  const barY = profileY + 98;

  ctx.fillStyle = theme.isLight ? "#e5ded2" : "rgba(255, 255, 255, 0.12)";
  roundRect(ctx, textStartX, barY, barW, barH, 6);
  ctx.fill();

  if (pct > 0) {
    const fillGrad = ctx.createLinearGradient(textStartX, 0, textStartX + barW, 0);
    fillGrad.addColorStop(0, theme.v1);
    fillGrad.addColorStop(1, theme.gold);
    ctx.fillStyle = fillGrad;
    roundRect(ctx, textStartX, barY, Math.max(14, (barW * pct) / 100), barH, 6);
    ctx.fill();
  }

  // Right Tally Box
  ctx.textAlign = "right";
  ctx.fillStyle = theme.ink;
  ctx.font = `800 56px ${FONT_HEAD}`;
  ctx.fillText(`${isBn ? bnDigits(tastedCount) : tastedCount}`, profileX + profileW - 84, profileY + 70);

  ctx.fillStyle = theme.muted;
  ctx.font = `700 26px ${FONT_HEAD}`;
  ctx.fillText(isBn ? "/ ৬৪" : "/ 64", profileX + profileW - 24, profileY + 70);

  ctx.fillStyle = theme.stroke;
  ctx.font = `800 16px ${FONT_BODY}`;
  ctx.fillText(isBn ? `${bnDigits(pct)}% স্বাদ সম্পন্ন` : `${pct}% Explored`, profileX + profileW - 24, profileY + 108);

  // 5. CENTERPIECE: The 8 Divisional Heritage Chapters (Clean, High-Contrast & Eye-Soothing)
  const divSectionY = profileY + profileH + 26;

  ctx.textAlign = "left";
  ctx.fillStyle = theme.ink;
  ctx.font = `800 24px ${FONT_HEAD}`;
  ctx.fillText(
    isBn ? "★ ৮ বিভাগীয় অন্বেষণ ও ঐতিহ্য বিবরণী (Divisional Chapters):" : "★ 8 DIVISIONAL CHAPTERS & EXPLORED SPECIALTIES:",
    pad + 26,
    divSectionY + 8
  );

  ctx.textAlign = "right";
  ctx.fillStyle = theme.muted;
  ctx.font = `700 14px ${FONT_BODY}`;
  ctx.fillText(
    isBn ? "৬৪ জেলার প্রামাণ্য আঞ্চলিক খাদ্যকোষ" : "Authentic Regional Records",
    width - (pad + 26),
    divSectionY + 8
  );

  // 2 columns x 4 rows
  const gridX = pad + 24;
  const gridY = divSectionY + 24;
  const gridW = width - (pad + 24) * 2;
  const cols = 2;
  const colGap = 20;
  const rowGap = 16;
  const cardW = (gridW - colGap) / cols;
  const cardH = 154;

  DIVISION_META.forEach((div, idx) => {
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    const cx = gridX + col * (cardW + colGap);
    const cy = gridY + row * (cardH + rowGap);

    const divDistricts = FOOD_CULTURE_DATA.filter((d) => d.divisionEn === div.id);
    const divTasted = divDistricts.filter((d) => selected.has(d.id));
    const isComplete = divTasted.length === div.count && div.count > 0;
    const hasTastedAny = divTasted.length > 0;

    // Card background
    ctx.fillStyle = isComplete
      ? theme.divBgActive
      : (hasTastedAny ? theme.divBg : (theme.isLight ? "#fbfaf7" : "rgba(255, 255, 255, 0.02)"));
    roundRect(ctx, cx, cy, cardW, cardH, 14);
    ctx.fill();

    // Border
    ctx.strokeStyle = isComplete
      ? theme.gold
      : (hasTastedAny ? theme.border : (theme.isLight ? "#e5ded4" : "rgba(255, 255, 255, 0.08)"));
    ctx.lineWidth = isComplete ? 2 : 1.4;
    ctx.stroke();

    // Division Title & Icon
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";

    ctx.font = "22px sans-serif";
    ctx.fillText(div.icon, cx + 18, cy + 32);

    ctx.fillStyle = theme.ink;
    ctx.font = `800 20px ${FONT_HEAD}`;
    const divTitle = isBn ? `${div.bn} বিভাগ` : `${div.en} Division`;
    ctx.fillText(divTitle, cx + 50, cy + 32);

    // Score Tag right
    ctx.textAlign = "right";
    const scoreText = isBn
      ? `${bnDigits(divTasted.length)} / ${bnDigits(div.count)}`
      : `${divTasted.length} / ${div.count}`;

    if (isComplete) {
      ctx.fillStyle = theme.gold;
      ctx.font = `800 14px ${FONT_BODY}`;
      ctx.fillText(`★ ${scoreText} ALL`, cx + cardW - 18, cy + 32);
    } else {
      ctx.fillStyle = hasTastedAny ? theme.stroke : theme.muted;
      ctx.font = `800 14px ${FONT_BODY}`;
      ctx.fillText(scoreText, cx + cardW - 18, cy + 32);
    }

    // Mini progress track
    const miniBarW = cardW - 36;
    const miniBarH = 5;
    const miniBarY = cy + 42;

    ctx.fillStyle = theme.isLight ? "#e6decb" : "rgba(255, 255, 255, 0.1)";
    roundRect(ctx, cx + 18, miniBarY, miniBarW, miniBarH, 3);
    ctx.fill();

    if (divTasted.length > 0) {
      const fillW = Math.max(10, (miniBarW * divTasted.length) / div.count);
      ctx.fillStyle = isComplete ? theme.gold : theme.v1;
      roundRect(ctx, cx + 18, miniBarY, fillW, miniBarH, 3);
      ctx.fill();
    }

    // Food names content
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    if (hasTastedAny) {
      const tastedFoodNames = divTasted.map((d) => {
        return isBn ? d.primaryFood?.nameBn : d.primaryFood?.nameEn;
      }).filter(Boolean);

      const itemsText = tastedFoodNames.slice(0, 3).join(" · ");
      const extraCount = tastedFoodNames.length - 3;

      ctx.fillStyle = theme.ink;
      ctx.font = `700 15px ${FONT_HEAD}`;
      ctx.fillText(
        `✓ চেখেছেন: ${itemsText}${extraCount > 0 ? ` +${isBn ? bnDigits(extraCount) : extraCount}টি` : ""}`,
        cx + 18,
        cy + 58
      );

      // District names
      const distNames = divTasted.map((d) => isBn ? d.nameBn : d.nameEn).slice(0, 4).join(", ");
      ctx.fillStyle = theme.muted;
      ctx.font = `600 13px ${FONT_BODY}`;
      ctx.fillText(`📍 জেলা: ${distNames}${divTasted.length > 4 ? "..." : ""}`, cx + 18, cy + 84);

      // Status pill at bottom
      ctx.fillStyle = isComplete
        ? (theme.isLight ? "rgba(180, 83, 9, 0.14)" : "rgba(251, 191, 36, 0.22)")
        : (theme.isLight ? "rgba(5, 150, 105, 0.14)" : "rgba(16, 185, 129, 0.2)");
      roundRect(ctx, cx + 18, cy + 110, cardW - 36, 30, 8);
      ctx.fill();

      ctx.fillStyle = isComplete ? theme.gold : theme.accent;
      ctx.font = `800 13px ${FONT_BODY}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        isComplete
          ? (isBn ? "👑 বিভাগের শতভাগ ঐতিহ্য সম্পন্ন!" : "👑 100% REGIONAL CHAPTER CONQUERED")
          : (isBn ? `✓ ${bnDigits(divTasted.length)}টি জেলার স্বাদ প্রমাণিত` : `✓ ${divTasted.length} Districts Authenticated`),
        cx + cardW / 2,
        cy + 125
      );
    } else {
      ctx.fillStyle = theme.muted;
      ctx.font = `600 14px ${FONT_HEAD}`;
      const sampleDist = divDistricts.slice(0, 3).map((d) => isBn ? d.nameBn : d.nameEn).join(", ");
      ctx.fillText(`এই বিভাগের ঐতিহ্য এখনো চেখে দেখা বাকি (${sampleDist}...)`, cx + 18, cy + 64);

      ctx.fillStyle = theme.isLight ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.05)";
      roundRect(ctx, cx + 18, cy + 108, cardW - 36, 28, 8);
      ctx.fill();

      ctx.fillStyle = theme.muted;
      ctx.font = `700 12.5px ${FONT_BODY}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(isBn ? "+ পরবর্তী ভ্রমণ স্বাদ তালিকা" : "+ Awaiting Exploration", cx + cardW / 2, cy + 122);
    }
  });

  // 6. CROWN JEWELS GI SEALS (Clean, Eye-Soothing & Visible)
  const jewelY = gridY + 4 * (cardH + rowGap) + 18;

  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = theme.ink;
  ctx.font = `800 22px ${FONT_HEAD}`;
  ctx.fillText(
    isBn ? "★ শীর্ষ ভৌগোলিক নির্দেশক ও রাজকীয় স্বাদ (Crown Heritage GI Seals):" : "★ ICONIC GI & ROYAL CULINARY SEALS:",
    pad + 26,
    jewelY
  );

  const jewelGridY = jewelY + 14;
  const jewelCols = 6;
  const jewelGap = 12;
  const jewelW = (gridW - jewelGap * (jewelCols - 1)) / jewelCols;
  const jewelH = 96;

  CROWN_JEWELS.forEach((jewel, i) => {
    const jx = gridX + i * (jewelW + jewelGap);
    const isTasted = selected.has(jewel.id);

    ctx.fillStyle = isTasted
      ? (theme.isLight ? "#eef7f2" : theme.divBgActive)
      : (theme.isLight ? "#ffffff" : "rgba(255, 255, 255, 0.04)");
    roundRect(ctx, jx, jewelGridY, jewelW, jewelH, 12);
    ctx.fill();

    ctx.strokeStyle = isTasted ? theme.stroke : theme.border;
    ctx.lineWidth = isTasted ? 2 : 1.2;
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "26px sans-serif";
    ctx.fillText(jewel.icon, jx + jewelW / 2, jewelGridY + 28);

    ctx.fillStyle = isTasted ? theme.ink : theme.muted;
    ctx.font = `800 14px ${FONT_HEAD}`;
    ctx.fillText(isBn ? jewel.foodBn : jewel.foodEn, jx + jewelW / 2, jewelGridY + 56);

    ctx.fillStyle = isTasted ? theme.accent : theme.muted;
    ctx.font = `800 12px ${FONT_BODY}`;
    ctx.fillText(isTasted ? "✓ TASTED" : "UNEXPLORED", jx + jewelW / 2, jewelGridY + 78);
  });

  // 7. Bottom Security Seal & Footer Verification
  const footerY = height - pad - 52;

  // Official Gold Verification Stamp
  ctx.save();
  ctx.translate(pad + 160, footerY);
  ctx.rotate(-0.03);
  ctx.strokeStyle = theme.gold;
  ctx.lineWidth = 2.4;
  roundRect(ctx, -140, -32, 280, 64, 12);
  ctx.stroke();

  ctx.fillStyle = theme.gold;
  ctx.font = `800 16px ${FONT_BODY}`;
  ctx.textAlign = "center";
  ctx.fillText("✓ VERIFIED ROOTS", 0, -8);
  ctx.font = `700 12px ${FONT_HEAD}`;
  ctx.fillText(isBn ? "খাঁটি বাংলাদেশি ঐতিহ্য ও স্বাদ" : "AUTHENTIC BENGAL HERITAGE", 0, 14);
  ctx.restore();

  // Footer Link & Copyright
  ctx.textAlign = "right";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = theme.ink;
  ctx.font = `800 17px ${FONT_BODY}`;
  ctx.fillText("KnowYourRoot — আপনার শিকড়কে জানুন", width - pad - 26, footerY - 8);

  ctx.fillStyle = theme.muted;
  ctx.font = `600 13px ${FONT_BODY}`;
  ctx.fillText("https://know-your-root.vercel.app · Official Heritage Collector Edition", width - pad - 26, footerY + 16);

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
