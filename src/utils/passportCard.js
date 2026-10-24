import { DISTRICTS_GEO } from '../data/districts-geo.js';
import { FOOD_CULTURE_DATA } from '../data/food-culture-data.js';
import confetti from 'canvas-confetti';

export const THEMES = [
  {
    id: "emerald",
    nameEn: "Emerald Heritage",
    nameBn: "পান্না সবুজ",
    bg: "#f8f6f0",
    land: "#e6decb",
    stroke: "#ffffff",
    v1: "#0f6b4f",
    v2: "#1f9a70",
    vStroke: "#ffffff",
    ink: "#17201c",
    muted: "#667085",
    label: "#083321",
    halo: "#f8f6f0",
    dot: "#e65100",
    accent: "#0f6b4f"
  },
  {
    id: "terracotta",
    nameEn: "Clay Terracotta",
    nameBn: "পোড়ামাটি",
    bg: "#fdf8f3",
    land: "#eddcd0",
    stroke: "#ffffff",
    v1: "#b43b12",
    v2: "#e65100",
    vStroke: "#ffffff",
    ink: "#2c1810",
    muted: "#8c6b5e",
    label: "#5a1b05",
    halo: "#fdf8f3",
    dot: "#f59e0b",
    accent: "#c2410c"
  },
  {
    id: "midnight",
    nameEn: "Midnight Royal",
    nameBn: "নীল রাত",
    bg: "#0b0f19",
    land: "#1e293b",
    stroke: "#0b0f19",
    v1: "#0ea5e9",
    v2: "#6366f1",
    vStroke: "#38bdf8",
    ink: "#ffffff",
    muted: "#94a3b8",
    label: "#ffffff",
    halo: "#0b0f19",
    dot: "#f43f5e",
    accent: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.45)"
  },
  {
    id: "sunset",
    nameEn: "Sunset Glow",
    nameBn: "গোধূলি আভা",
    bg: "#fff6f6",
    land: "#fbd5d5",
    stroke: "#ffffff",
    v1: "#f97316",
    v2: "#db2777",
    vStroke: "#ffffff",
    ink: "#3b0720",
    muted: "#9d4c6c",
    label: "#700938",
    halo: "#fff6f6",
    dot: "#831843",
    accent: "#db2777"
  }
];

export function getRank(count, lang = 'bn') {
  if (count >= 50) {
    return lang === 'bn' ? "ঐতিহ্যের রাজকীয় রসজ্ঞ (Master Connoisseur)" : "Royal Heritage Master (Level 4)";
  } else if (count >= 30) {
    return lang === 'bn' ? "মহা ভোজনরসিক পরিব্রাজক (Epicurean Voyager)" : "Grand Culinary Connoisseur (Level 3)";
  } else if (count >= 12) {
    return lang === 'bn' ? "বাংলার স্বাদ রসিক (Heritage Explorer)" : "Heritage Wanderer (Level 2)";
  }
  return lang === 'bn' ? "শিকড় অনুসন্ধানী (Root Explorer)" : "Root Explorer (Level 1)";
}

export function bnDigits(num) {
  return String(num).replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);
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

export function generatePassportCanvas(options = {}) {
  const {
    selected = new Set(),
    themeId = 'emerald',
    userName = '',
    userPhoto = null,
    lang = 'bn'
  } = options;

  const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
  const foodMap = new Map();
  FOOD_CULTURE_DATA.forEach(d => foodMap.set(d.id, d));

  const width = 1200;
  const height = 1600;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const FONT_HEAD = '"Hind Siliguri", "Noto Sans Bengali", sans-serif';
  const FONT_BODY = '"Noto Sans Bengali", system-ui, sans-serif';

  // 1. Background
  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, width, height);

  // Decorative top gradient border
  const topGrad = ctx.createLinearGradient(0, 0, width, 0);
  topGrad.addColorStop(0, theme.v1);
  topGrad.addColorStop(0.5, theme.dot);
  topGrad.addColorStop(1, theme.v2);
  ctx.fillStyle = topGrad;
  ctx.fillRect(0, 0, width, 12);

  // 2. Header Box & Logo
  const pad = 70;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  // Pill
  ctx.fillStyle = theme.id === 'midnight' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(15, 107, 79, 0.1)';
  roundRect(ctx, pad, 44, 230, 36, 18);
  ctx.fill();

  ctx.fillStyle = theme.dot;
  ctx.font = `700 16px ${FONT_BODY}`;
  ctx.fillText(lang === 'bn' ? "★ বাংলাদেশ টেস্ট পাসপোর্ট" : "★ BANGLADESH TASTE PASSPORT", pad + 16, 68);

  // App Title
  ctx.fillStyle = theme.ink;
  ctx.font = `800 34px ${FONT_HEAD}`;
  ctx.fillText("KnowYourRoot · আপনার শিকড়কে জানুন", pad, 126);

  // 3. User Identity Card
  const userCardY = 150;
  const userCardH = 140;
  ctx.fillStyle = theme.id === 'midnight' ? '#131b2e' : '#ffffff';
  roundRect(ctx, pad, userCardY, width - (pad * 2), userCardH, 24);
  ctx.fill();
  ctx.strokeStyle = theme.id === 'midnight' ? '#24324f' : '#e6decb';
  ctx.lineWidth = 1.8;
  ctx.stroke();

  // User Avatar / Monogram
  const avatarX = pad + 24;
  const avatarY = userCardY + 20;
  const avatarSize = 100;

  ctx.save();
  roundRect(ctx, avatarX, avatarY, avatarSize, avatarSize, 50);
  ctx.clip();

  if (userPhoto && userPhoto.complete && userPhoto.naturalWidth) {
    const iw = userPhoto.naturalWidth;
    const ih = userPhoto.naturalHeight;
    const k = Math.max(avatarSize / iw, avatarSize / ih);
    ctx.drawImage(userPhoto, avatarX + (avatarSize - iw * k) / 2, avatarY + (avatarSize - ih * k) / 2, iw * k, ih * k);
  } else {
    ctx.fillStyle = topGrad;
    ctx.fillRect(avatarX, avatarY, avatarSize, avatarSize);
    ctx.fillStyle = "#ffffff";
    ctx.font = `700 44px ${FONT_HEAD}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const initial = (userName.trim() ? userName.trim()[0] : (lang === 'bn' ? 'বা' : 'K')).toUpperCase();
    ctx.fillText(initial, avatarX + (avatarSize / 2), avatarY + (avatarSize / 2));
  }
  ctx.restore();

  // Gold Ring
  ctx.save();
  ctx.strokeStyle = theme.dot;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2 + 3, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // User Name and Rank
  const textStartX = avatarX + avatarSize + 28;
  const displayName = userName.trim() 
    ? (lang === 'bn' ? `${userName.trim()}-এর ফুডি পাসপোর্ট` : `${userName.trim()}'s Taste Passport`)
    : (lang === 'bn' ? "বাংলার রসিক অভিযাত্রী" : "Bengal Culinary Nomad");

  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = theme.ink;
  ctx.font = `800 32px ${FONT_HEAD}`;
  ctx.fillText(displayName, textStartX, userCardY + 58);

  const rankTitle = getRank(selected.size, lang);
  ctx.fillStyle = theme.dot;
  ctx.font = `700 18px ${FONT_BODY}`;
  ctx.fillText(`🏆 ${rankTitle}`, textStartX, userCardY + 98);

  // Big Score Counter
  const scoreX = width - pad - 30;
  const numTasted = selected.size;
  const totalDistricts = 64;
  const pct = Math.round((numTasted / totalDistricts) * 100);

  ctx.textAlign = "right";
  ctx.fillStyle = theme.ink;
  ctx.font = `800 48px ${FONT_HEAD}`;
  ctx.fillText(`${lang === 'bn' ? bnDigits(numTasted) : numTasted}`, scoreX - 60, userCardY + 70);

  ctx.fillStyle = theme.muted;
  ctx.font = `600 24px ${FONT_HEAD}`;
  ctx.fillText(`/ ${lang === 'bn' ? '৬৪' : '64'}`, scoreX, userCardY + 70);

  ctx.fillStyle = theme.dot;
  ctx.font = `700 18px ${FONT_BODY}`;
  ctx.fillText(`${lang === 'bn' ? bnDigits(pct) : pct}% ${lang === 'bn' ? 'চেখে দেখেছি' : 'Tasted'}`, scoreX, userCardY + 106);

  // 4. Center Bangladesh Map
  const mapY = 320;
  const mapBoxH = 920;
  const mapScale = mapBoxH / DISTRICTS_GEO.h;
  const mapBoxW = DISTRICTS_GEO.w * mapScale;
  const mapX = (width - mapBoxW) / 2 + 10;

  ctx.save();
  ctx.translate(mapX, mapY);
  ctx.scale(mapScale, mapScale);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  // Unselected districts
  for (const f of DISTRICTS_GEO.f) {
    if (selected.has(f.n)) continue;
    const path = new Path2D(f.d);
    ctx.fillStyle = theme.land;
    ctx.fill(path);
    ctx.strokeStyle = theme.stroke;
    ctx.lineWidth = 1.3 / mapScale;
    ctx.stroke(path);
  }

  // Selected districts
  const grad = ctx.createLinearGradient(0, 0, DISTRICTS_GEO.w, DISTRICTS_GEO.h);
  grad.addColorStop(0, theme.v1);
  grad.addColorStop(1, theme.v2);

  if (theme.glow && selected.size > 0) {
    ctx.save();
    ctx.shadowColor = theme.glow;
    ctx.shadowBlur = 24;
    for (const n of selected) {
      const f = DISTRICTS_GEO.f.find(x => x.n === n);
      if (f) ctx.fill(new Path2D(f.d));
    }
    ctx.restore();
  }

  for (const n of selected) {
    const f = DISTRICTS_GEO.f.find(x => x.n === n);
    if (f) {
      const path = new Path2D(f.d);
      ctx.fillStyle = grad;
      ctx.fill(path);
      ctx.strokeStyle = theme.vStroke;
      ctx.lineWidth = 1.5 / mapScale;
      ctx.stroke(path);
    }
  }

  // Centered dots & labels for visited districts
  for (const f of DISTRICTS_GEO.f) {
    if (!selected.has(f.n)) continue;
    const [cx, cy] = f.c;
    const info = foodMap.get(f.n);
    const name = lang === 'bn' ? (info?.nameBn || f.n) : (info?.nameEn || f.n);

    ctx.beginPath();
    ctx.arc(cx, cy, 4.5 / mapScale, 0, Math.PI * 2);
    ctx.fillStyle = theme.dot;
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.5 / mapScale;
    ctx.stroke();

    ctx.font = `700 ${14 / mapScale}px ${FONT_HEAD}`;
    ctx.textAlign = "center";
    ctx.lineWidth = 4 / mapScale;
    ctx.strokeStyle = theme.id === 'midnight' ? '#0b0f19' : '#ffffff';
    ctx.strokeText(name, cx, cy - 9 / mapScale);
    ctx.fillStyle = theme.id === 'midnight' ? '#ffffff' : theme.label;
    ctx.fillText(name, cx, cy - 9 / mapScale);
  }

  ctx.restore();

  // 5. Division Progress Pills at Bottom
  const footerY = 1290;
  const divisions = [
    { id: "Dhaka", bn: "ঢাকা", total: 13 },
    { id: "Chattogram", bn: "চট্টগ্রাম", total: 11 },
    { id: "Rajshahi", bn: "রাজশাহী", total: 8 },
    { id: "Khulna", bn: "খুলনা", total: 10 },
    { id: "Sylhet", bn: "সিলেট", total: 4 },
    { id: "Barishal", bn: "বরিশাল", total: 6 },
    { id: "Rangpur", bn: "রংপুর", total: 8 },
    { id: "Mymensingh", bn: "ময়মনসিংহ", total: 4 }
  ];

  ctx.fillStyle = theme.id === 'midnight' ? '#131b2e' : '#ffffff';
  roundRect(ctx, pad, footerY, width - (pad * 2), 170, 20);
  ctx.fill();
  ctx.strokeStyle = theme.id === 'midnight' ? '#24324f' : '#e6decb';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = theme.ink;
  ctx.font = `700 18px ${FONT_HEAD}`;
  ctx.textAlign = "left";
  ctx.fillText(lang === 'bn' ? "বিভাগভিত্তিক অর্জনের খতিয়ান:" : "Division Exploration Breakdown:", pad + 24, footerY + 36);

  const colW = (width - (pad * 2) - 48) / 4;
  divisions.forEach((div, idx) => {
    const row = Math.floor(idx / 4);
    const col = idx % 4;
    const x = pad + 24 + (col * colW);
    const y = footerY + 68 + (row * 46);

    const countInDiv = DISTRICTS_GEO.f.filter(f => f.dv === div.id && selected.has(f.n)).length;
    const divName = lang === 'bn' ? div.bn : div.id;

    ctx.fillStyle = theme.ink;
    ctx.font = `600 15px ${FONT_BODY}`;
    ctx.textAlign = "left";
    ctx.fillText(`${divName}:`, x, y);

    ctx.textAlign = "right";
    ctx.fillStyle = theme.dot;
    ctx.font = `700 15px ${FONT_BODY}`;
    const ratioStr = lang === 'bn' ? `${bnDigits(countInDiv)}/${bnDigits(div.total)}` : `${countInDiv}/${div.total}`;
    ctx.fillText(ratioStr, x + colW - 16, y);

    const barW = colW - 16;
    ctx.fillStyle = theme.id === 'midnight' ? '#1e293b' : '#ede5d4';
    roundRect(ctx, x, y + 6, barW, 6, 3);
    ctx.fill();

    if (countInDiv > 0) {
      ctx.fillStyle = topGrad;
      roundRect(ctx, x, y + 6, (countInDiv / div.total) * barW, 6, 3);
      ctx.fill();
    }
  });

  // 6. Bottom Signature & Stamp
  const bottomY = 1520;
  ctx.fillStyle = theme.muted;
  ctx.font = `500 16px ${FONT_BODY}`;
  ctx.textAlign = "left";
  const dateStr = new Date().toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  ctx.fillText(`KnowYourRoot · ${dateStr} · knowyourroot.bd`, pad, bottomY);

  const stampX = width - pad - 60;
  const stampY = bottomY - 14;
  ctx.save();
  ctx.translate(stampX, stampY);
  ctx.rotate(-0.08);
  ctx.strokeStyle = theme.dot;
  ctx.lineWidth = 2.5;
  roundRect(ctx, -75, -25, 150, 48, 10);
  ctx.stroke();

  ctx.fillStyle = theme.dot;
  ctx.font = `800 15px ${FONT_HEAD}`;
  ctx.textAlign = "center";
  ctx.fillText("✓ VERIFIED ROOTS", 0, 0);
  ctx.font = `700 11px ${FONT_BODY}`;
  ctx.fillText(lang === 'bn' ? "খাঁটি দেশীয় স্বাদ" : "AUTHENTIC HERITAGE", 0, 16);
  ctx.restore();

  return canvas;
}

export function triggerCelebrationConfetti() {
  confetti({
    particleCount: 80,
    spread: 80,
    origin: { y: 0.6 }
  });
}

export function generatePassportCard(userName, avatarImg, visitedSet, themeId, lang) {
  return downloadPassportImage({
    userName,
    avatarImg,
    selectedDistricts: visitedSet,
    themeId,
    lang
  });
}

export function downloadPassportImage(options = {}) {
  const canvas = generatePassportCanvas(options);
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

    // Trigger celebratory confetti
    triggerCelebrationConfetti();
  }, 'image/jpeg', 0.94);
}

