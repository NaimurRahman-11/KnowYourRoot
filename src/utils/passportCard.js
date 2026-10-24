import { DISTRICTS_GEO } from '../data/districts-geo.js';
import { FOOD_CULTURE_DATA } from '../data/food-culture-data.js';
import confetti from 'canvas-confetti';

export const THEMES = [
  {
    id: "emerald",
    nameEn: "Emerald Heritage",
    nameBn: "পান্না সবুজ",
    bg: "#061811",
    cardBg: "#0d2b20",
    stampBg: "#12382a",
    stroke: "#10b981",
    v1: "#10b981",
    v2: "#059669",
    ink: "#ffffff",
    muted: "#94a3b8",
    gold: "#f59e0b",
    accent: "#34d399",
    border: "rgba(52, 211, 153, 0.35)",
    dot: "#f59e0b"
  },
  {
    id: "terracotta",
    nameEn: "Clay Terracotta",
    nameBn: "পোড়ামাটি",
    bg: "#1c0d07",
    cardBg: "#2d170f",
    stampBg: "#3d2015",
    stroke: "#ea580c",
    v1: "#f97316",
    v2: "#c2410c",
    ink: "#ffffff",
    muted: "#cbd5e1",
    gold: "#fbbf24",
    accent: "#fb923c",
    border: "rgba(249, 115, 22, 0.4)",
    dot: "#fbbf24"
  },
  {
    id: "midnight",
    nameEn: "Midnight Royal",
    nameBn: "নীল রাত",
    bg: "#050b18",
    cardBg: "#0f1c38",
    stampBg: "#16284f",
    stroke: "#38bdf8",
    v1: "#38bdf8",
    v2: "#6366f1",
    ink: "#ffffff",
    muted: "#94a3b8",
    gold: "#f59e0b",
    accent: "#60a5fa",
    border: "rgba(56, 189, 248, 0.4)",
    dot: "#f43f5e"
  },
  {
    id: "sunset",
    nameEn: "Sunset Crimson",
    nameBn: "গোধূলি আভা",
    bg: "#1a0612",
    cardBg: "#2e0f22",
    stampBg: "#3f1630",
    stroke: "#ec4899",
    v1: "#f43f5e",
    v2: "#db2777",
    ink: "#ffffff",
    muted: "#cbd5e1",
    gold: "#fcd34d",
    accent: "#f472b6",
    border: "rgba(244, 63, 94, 0.4)",
    dot: "#fbbf24"
  }
];

export function getRankTitle(count, lang = 'bn') {
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

// Asynchronously load an image URL to an HTMLImageElement
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

export async function generatePassportCanvas(options = {}) {
  // Normalize parameters regardless of caller argument naming
  const selectedSet = options.selected || options.visitedSet || options.selectedDistricts || new Set();
  const selected = selectedSet instanceof Set ? selectedSet : new Set(selectedSet);
  const themeId = options.themeId || 'emerald';
  const userName = (options.userName || '').trim();
  const avatarSrc = options.avatarImg || options.userPhoto || null;
  const lang = options.lang || 'bn';

  const theme = THEMES.find((t) => t.id === themeId) || THEMES[0];
  const isBn = lang === 'bn';

  // Build food data dictionary
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

  // 1. Base Luxury Background
  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, width, height);

  // Subtle radial gradient in background center
  const radialGlow = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, 700);
  radialGlow.addColorStop(0, theme.cardBg);
  radialGlow.addColorStop(1, theme.bg);
  ctx.fillStyle = radialGlow;
  ctx.fillRect(0, 0, width, height);

  // 2. Delicate Map Silhouette Watermark in Background
  ctx.save();
  ctx.globalAlpha = 0.08;
  const wmScale = 1.6;
  const wmX = (width - DISTRICTS_GEO.w * wmScale) / 2;
  const wmY = 160;
  ctx.translate(wmX, wmY);
  ctx.scale(wmScale, wmScale);
  for (const f of DISTRICTS_GEO.f) {
    const p = new Path2D(f.d);
    ctx.fillStyle = theme.stroke;
    ctx.fill(p);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 0.8;
    ctx.stroke(p);
  }
  ctx.restore();

  // 3. Double Gold / Metallic Border Frame
  const pad = 50;
  ctx.strokeStyle = theme.gold;
  ctx.lineWidth = 3;
  roundRect(ctx, pad, pad, width - pad * 2, height - pad * 2, 28);
  ctx.stroke();

  // Inner dashed security line
  ctx.save();
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([8, 6]);
  roundRect(ctx, pad + 12, pad + 12, width - (pad + 12) * 2, height - (pad + 12) * 2, 20);
  ctx.stroke();
  ctx.restore();

  // Corner Filigree Ornaments
  const drawCorner = (cx, cy, rx, ry) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(rx, ry);
    ctx.strokeStyle = theme.gold;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(15, 30);
    ctx.lineTo(15, 15);
    ctx.lineTo(30, 15);
    ctx.stroke();
    ctx.restore();
  };
  drawCorner(pad + 18, pad + 18, 1, 1);
  drawCorner(width - pad - 18, pad + 18, -1, 1);
  drawCorner(pad + 18, height - pad - 18, 1, -1);
  drawCorner(width - pad - 18, height - pad - 18, -1, -1);

  // 4. Header Bar: National Republic Banner
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillStyle = theme.gold;
  ctx.font = `800 16px ${FONT_BODY}`;
  ctx.letterSpacing = "2px";
  ctx.fillText("PEOPLE'S REPUBLIC OF BANGLADESH · গণপ্রজাতন্ত্রী বাংলাদেশ", width / 2, pad + 45);

  ctx.fillStyle = "#ffffff";
  ctx.font = `800 36px ${FONT_HEAD}`;
  ctx.fillText(isBn ? "অফিসিয়াল স্বাদ ও ঐতিহ্য পাসপোর্ট" : "OFFICIAL CULINARY HERITAGE PASSPORT", width / 2, pad + 90);

  ctx.fillStyle = theme.accent;
  ctx.font = `600 17px ${FONT_BODY}`;
  ctx.fillText(
    isBn ? "৬৪ জেলার আঞ্চলিক রন্ধনশৈলী ও সাংস্কৃতিক পদচিহ্ন" : "64 Districts Authentic Gastronomy & Cultural Odysseys",
    width / 2,
    pad + 125
  );

  // Serial & Date Pill
  const hashVal = Math.abs(userName.split('').reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0) % 90000 + 10000);
  const serialNo = `BD-KYR-2026-${hashVal}`;
  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  roundRect(ctx, width / 2 - 160, pad + 145, 320, 32, 16);
  ctx.fill();
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = theme.muted;
  ctx.font = `700 13px ${FONT_BODY}`;
  ctx.fillText(`PASSPORT NO: ${serialNo}`, width / 2, pad + 161);

  // 5. Traveler Profile Identity Card
  const profileCardY = pad + 195;
  const profileCardH = 150;
  const profileCardW = width - (pad + 30) * 2;
  const profileCardX = pad + 30;

  ctx.fillStyle = theme.cardBg;
  roundRect(ctx, profileCardX, profileCardY, profileCardW, profileCardH, 20);
  ctx.fill();
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Load avatar image asynchronously
  const userPhotoImg = await loadImage(avatarSrc);
  const avatarSize = 104;
  const avatarX = profileCardX + 24;
  const avatarY = profileCardY + 23;

  ctx.save();
  roundRect(ctx, avatarX, avatarY, avatarSize, avatarSize, 52);
  ctx.clip();

  if (userPhotoImg) {
    const iw = userPhotoImg.naturalWidth;
    const ih = userPhotoImg.naturalHeight;
    const k = Math.max(avatarSize / iw, avatarSize / ih);
    ctx.drawImage(userPhotoImg, avatarX + (avatarSize - iw * k) / 2, avatarY + (avatarSize - ih * k) / 2, iw * k, ih * k);
  } else {
    // Elegant monogram fallback
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

  // Gold Ring around Avatar
  ctx.strokeStyle = theme.gold;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2 + 2, 0, Math.PI * 2);
  ctx.stroke();

  // Traveler Details in Card
  const textStartX = avatarX + avatarSize + 28;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  const travelerName = userName.trim() ? userName.trim() : (isBn ? "বাংলার রসিক অভিযাত্রী" : "Bengal Roots Traveler");
  ctx.fillStyle = "#ffffff";
  ctx.font = `800 30px ${FONT_HEAD}`;
  ctx.fillText(travelerName, textStartX, profileCardY + 54);

  const rankStr = getRankTitle(selected.size, lang);
  ctx.fillStyle = theme.gold;
  ctx.font = `700 16px ${FONT_BODY}`;
  ctx.fillText(`🏅 ${rankStr}`, textStartX, profileCardY + 86);

  // Progress Bar inside Profile Card
  const tastedCount = selected.size;
  const pct = Math.round((tastedCount / 64) * 100);
  const barW = 340;
  const barH = 10;
  const barY = profileCardY + 104;

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

  // Right Score Box
  const scoreBoxX = profileCardX + profileCardW - 200;
  ctx.textAlign = "right";
  ctx.fillStyle = theme.gold;
  ctx.font = `800 52px ${FONT_HEAD}`;
  ctx.fillText(`${isBn ? bnDigits(tastedCount) : tastedCount}`, profileCardX + profileCardW - 74, profileCardY + 68);

  ctx.fillStyle = theme.muted;
  ctx.font = `600 24px ${FONT_HEAD}`;
  ctx.fillText(isBn ? "/ ৬৪" : "/ 64", profileCardX + profileCardW - 24, profileCardY + 68);

  ctx.fillStyle = theme.accent;
  ctx.font = `700 15px ${FONT_BODY}`;
  ctx.fillText(isBn ? `${bnDigits(pct)}% স্বাদ চেখে দেখা হয়েছে` : `${pct}% Bangladesh Explored`, profileCardX + profileCardW - 24, profileCardY + 106);

  // 6. MAIN SHOWCASE: "HERITAGE DELICACY VISA STAMPS"
  const stampSectionY = profileCardY + profileCardH + 30;

  ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff";
  ctx.font = `800 22px ${FONT_HEAD}`;
  ctx.fillText(
    isBn ? "★ আপনার চেখে দেখা আঞ্চলিক ঐতিহ্যবাহী খাবারসমূহ:" : "★ OFFICIAL CULINARY VISA STAMPS EXPLORED:",
    pad + 34,
    stampSectionY + 10
  );

  ctx.textAlign = "right";
  ctx.fillStyle = theme.muted;
  ctx.font = `600 14px ${FONT_BODY}`;
  ctx.fillText(
    isBn ? "প্রামাণ্য জেলা ও ঐতিহাসিক স্বাদ কোষাগার" : "Verified Authentic Heritage Records",
    width - (pad + 34),
    stampSectionY + 10
  );

  // Stamp Grid: 3 columns x 4 rows = 12 highlight stamps
  const gridX = pad + 30;
  const gridY = stampSectionY + 28;
  const gridW = width - (pad + 30) * 2;
  const cols = 3;
  const colGap = 16;
  const stampW = (gridW - colGap * (cols - 1)) / cols;
  const stampH = 175;
  const rowGap = 16;

  // Collect the tasted districts data
  const tastedDistrictsData = [];
  for (const districtId of selected) {
    const data = foodMap.get(districtId);
    if (data) tastedDistrictsData.push(data);
  }

  // If user selected fewer than 12, fill remaining slots with "Heritage Quest Awaiting" prompt badges!
  const maxDisplay = 12;
  const displayItems = tastedDistrictsData.slice(0, maxDisplay);

  for (let i = 0; i < maxDisplay; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const sx = gridX + col * (stampW + colGap);
    const sy = gridY + row * (stampH + rowGap);

    const item = displayItems[i];

    if (item) {
      // 1. Tasted Delicacy Stamp
      ctx.fillStyle = theme.stampBg;
      roundRect(ctx, sx, sy, stampW, stampH, 16);
      ctx.fill();

      // Border with decorative color
      ctx.strokeStyle = theme.border;
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // Inner stamp perforation
      ctx.save();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      roundRect(ctx, sx + 6, sy + 6, stampW - 12, stampH - 12, 12);
      ctx.stroke();
      ctx.restore();

      // Top Tag: Division & GI
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";

      ctx.fillStyle = theme.accent;
      ctx.font = `700 12px ${FONT_BODY}`;
      const divLabel = isBn ? `${item.divisionBn} বিভাগ` : `${item.divisionEn} Div`;
      ctx.fillText(divLabel, sx + 18, sy + 28);

      if (item.primaryFood?.giStatus) {
        ctx.textAlign = "right";
        ctx.fillStyle = theme.gold;
        ctx.font = `800 11.5px ${FONT_BODY}`;
        ctx.fillText("GI 🏅", sx + stampW - 18, sy + 28);
      }

      // Food Icon Circle
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      roundRect(ctx, sx + 18, sy + 38, 48, 48, 12);
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.stroke();

      ctx.font = "26px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(item.primaryFood?.icon || "🍽️", sx + 18 + 24, sy + 38 + 24);

      // Delicacy Name
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "#ffffff";
      ctx.font = `800 18px ${FONT_HEAD}`;
      const foodName = isBn ? item.primaryFood?.nameBn : item.primaryFood?.nameEn;
      ctx.fillText(foodName.length > 18 ? foodName.slice(0, 17) + "…" : foodName, sx + 74, sy + 58);

      // District Name
      ctx.fillStyle = theme.gold;
      ctx.font = `700 14px ${FONT_HEAD}`;
      ctx.fillText(`📍 ${isBn ? item.nameBn : item.nameEn}`, sx + 74, sy + 78);

      // Authentic Shop snippet
      ctx.fillStyle = theme.muted;
      ctx.font = `500 12px ${FONT_BODY}`;
      const spotStr = isBn ? item.primaryFood?.famousSpotsBn : item.primaryFood?.famousSpotsEn;
      const spotClean = (spotStr || "").split(/[,·|]/)[0].trim();
      ctx.fillText(`আদি: ${spotClean.slice(0, 24)}`, sx + 18, sy + 115);

      // Verified Authentic Stamp Pill
      ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
      roundRect(ctx, sx + 18, sy + 130, stampW - 36, 28, 8);
      ctx.fill();
      ctx.strokeStyle = "rgba(52, 211, 153, 0.35)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = "#34d399";
      ctx.font = `700 12px ${FONT_BODY}`;
      ctx.textAlign = "center";
      ctx.fillText("✓ VERIFIED TASTED & EXPLORED", sx + stampW / 2, sy + 148);
    } else {
      // 2. Unexplored / Awaiting Quest Stamp Slot
      ctx.save();
      ctx.fillStyle = "rgba(255, 255, 255, 0.015)";
      roundRect(ctx, sx, sy, stampW, stampH, 16);
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.setLineDash([6, 6]);
      ctx.stroke();

      ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
      ctx.font = "26px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("🧭", sx + stampW / 2, sy + stampH / 2 - 18);

      ctx.font = `700 13px ${FONT_BODY}`;
      ctx.fillStyle = theme.muted;
      ctx.fillText(
        isBn ? "+ পরবর্তী স্বাদ অন্বেষণ" : "+ Next Heritage Quest",
        sx + stampW / 2,
        sy + stampH / 2 + 18
      );
      ctx.restore();
    }
  }

  // 7. Extra Explored Summary Line if more than 12
  const bottomMetaY = gridY + 4 * (stampH + rowGap) + 10;
  if (tastedDistrictsData.length > maxDisplay) {
    const extraCount = tastedDistrictsData.length - maxDisplay;
    ctx.textAlign = "center";
    ctx.fillStyle = theme.gold;
    ctx.font = `800 15px ${FONT_HEAD}`;
    ctx.fillText(
      isBn
        ? `★ এছাড়াও তালিকায় রয়েছে আরও ${bnDigits(extraCount)} টি জেলার শতাব্দীপ্রাচীন স্বাদ ও ঐতিহাসিক ঐতিহ্য!`
        : `★ PLUS ${extraCount} MORE REGIONAL DELICACIES RECORDED IN YOUR DIGITAL ARCHIVE!`,
      width / 2,
      bottomMetaY
    );
  }

  // 8. Bottom Security Seal & Verification Footer
  const footerY = height - pad - 60;

  // Red/Gold Tilted Verification Stamp
  ctx.save();
  ctx.translate(pad + 160, footerY);
  ctx.rotate(-0.06);
  ctx.strokeStyle = theme.gold;
  ctx.lineWidth = 2.5;
  roundRect(ctx, -130, -32, 260, 64, 12);
  ctx.stroke();

  ctx.fillStyle = theme.gold;
  ctx.font = `800 16px ${FONT_BODY}`;
  ctx.textAlign = "center";
  ctx.fillText("✓ VERIFIED ROOTS", 0, -8);
  ctx.font = `700 11.5px ${FONT_HEAD}`;
  ctx.fillText(isBn ? "খাঁটি বাংলাদেশি ঐতিহ্য ও স্বাদ" : "AUTHENTIC BENGAL HERITAGE", 0, 14);
  ctx.restore();

  // Web & QR Information in Center/Right
  ctx.textAlign = "right";
  ctx.fillStyle = "#ffffff";
  ctx.font = `800 17px ${FONT_BODY}`;
  ctx.fillText("KnowYourRoot — আপনার শিকড়কে জানুন", width - pad - 40, footerY - 10);

  ctx.fillStyle = theme.muted;
  ctx.font = `600 13px ${FONT_BODY}`;
  ctx.fillText("https://know-your-root.vercel.app · Explore & Flaunt Your Roots", width - pad - 40, footerY + 14);

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
