import { DISTRICTS_GEO } from './data/districts-geo.js';
import { FOOD_CULTURE_DATA } from './data/food-culture-data.js';

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

export class MapRenderer {
  constructor(canvasEl, tooltipEl, options = {}) {
    this.canvas = canvasEl;
    this.ctx = canvasEl.getContext('2d');
    this.tooltip = tooltipEl;
    this.selected = new Set(options.selected || []);
    this.themeId = options.themeId || "emerald";
    this.showLabels = options.showLabels !== false;
    this.lang = options.lang || "bn";
    this.hoveredDistrict = null;
    this.onToggle = options.onToggle || (() => {});
    
    // Quick food lookup map
    this.foodMap = new Map();
    FOOD_CULTURE_DATA.forEach(d => this.foodMap.set(d.id, d));
    
    // Pre-cache Path2D objects
    this.paths = new Map();
    DISTRICTS_GEO.f.forEach(f => {
      this.paths.set(f.n, new Path2D(f.d));
    });
    
    // Map dimensions and coordinate bounds
    this.geoWidth = DISTRICTS_GEO.w || 600;
    this.geoHeight = DISTRICTS_GEO.h || 872;
    
    this.setupEvents();
    this.resize();
  }

  getTheme() {
    return THEMES.find(t => t.id === this.themeId) || THEMES[0];
  }

  resize() {
    const parent = this.canvas.parentElement;
    if (!parent) return;
    
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const rect = parent.getBoundingClientRect();
    const width = rect.width || 600;
    // Keep aspect ratio
    const height = (width / this.geoWidth) * this.geoHeight;
    
    this.canvas.width = Math.round(width * dpr);
    this.canvas.height = Math.round(height * dpr);
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    
    this.dpr = dpr;
    this.width = width;
    this.height = height;
    this.scale = width / this.geoWidth;
    
    this.render();
  }

  setupEvents() {
    window.addEventListener('resize', () => {
      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(() => this.resize(), 150);
    });

    const getCoord = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const x = (clientX - rect.left) / this.scale;
      const y = (clientY - rect.top) / this.scale;
      return { x, y, clientX, clientY };
    };

    const handlePointerMove = (e) => {
      const { x, y, clientX, clientY } = getCoord(e);
      let hit = null;

      // Hit-test against pre-computed Path2D objects
      for (const f of DISTRICTS_GEO.f) {
        const path = this.paths.get(f.n);
        if (path && this.ctx.isPointInPath(path, x * this.scale * this.dpr, y * this.scale * this.dpr)) {
          hit = f;
          break;
        }
      }

      if (hit !== this.hoveredDistrict) {
        this.hoveredDistrict = hit;
        this.canvas.style.cursor = hit ? 'pointer' : 'default';
        this.render();
      }

      if (hit && this.tooltip) {
        const info = this.foodMap.get(hit.n);
        const name = this.lang === 'bn' ? (info?.nameBn || hit.n) : (info?.nameEn || hit.n);
        const divName = this.lang === 'bn' ? (info?.divisionBn + ' বিভাগ') : (info?.divisionEn + ' Div');
        const foodName = this.lang === 'bn' ? info?.primaryFood?.nameBn : info?.primaryFood?.nameEn;
        const isTasted = this.selected.has(hit.n);
        
        this.tooltip.innerHTML = `
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
              ? (this.lang === 'bn' ? '✓ চেখে দেখেছি' : '✓ Explored & Tasted') 
              : (this.lang === 'bn' ? '+ তালিকায় যোগ করতে ক্লিক করুন' : '+ Tap to Mark Tasted')}
          </div>
        `;
        
        const parentRect = this.canvas.parentElement.getBoundingClientRect();
        const tooltipX = clientX - parentRect.left;
        const tooltipY = clientY - parentRect.top;
        
        this.tooltip.style.left = `${tooltipX}px`;
        this.tooltip.style.top = `${tooltipY}px`;
        this.tooltip.classList.add('visible');
      } else if (this.tooltip) {
        this.tooltip.classList.remove('visible');
      }
    };

    this.canvas.addEventListener('mousemove', handlePointerMove);
    this.canvas.addEventListener('mouseleave', () => {
      this.hoveredDistrict = null;
      if (this.tooltip) this.tooltip.classList.remove('visible');
      this.render();
    });

    const handleTap = (e) => {
      const { x, y } = getCoord(e);
      for (const f of DISTRICTS_GEO.f) {
        const path = this.paths.get(f.n);
        if (path && this.ctx.isPointInPath(path, x * this.scale * this.dpr, y * this.scale * this.dpr)) {
          this.toggleDistrict(f.n);
          break;
        }
      }
    };

    this.canvas.addEventListener('click', handleTap);
  }

  toggleDistrict(districtId) {
    if (this.selected.has(districtId)) {
      this.selected.delete(districtId);
    } else {
      this.selected.add(districtId);
    }
    this.render();
    this.onToggle(districtId, this.selected.has(districtId), this.selected);
  }

  setTheme(themeId) {
    this.themeId = themeId;
    this.render();
  }

  setSelected(selectedSet) {
    this.selected = new Set(selectedSet);
    this.render();
  }

  setShowLabels(show) {
    this.showLabels = show;
    this.render();
  }

  setLang(lang) {
    this.lang = lang;
    this.render();
  }

  render() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t = this.getTheme();
    const scale = this.scale * this.dpr;

    ctx.save();
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Apply scale for coordinate system
    ctx.scale(scale, scale);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    // 1. Draw unselected districts first
    for (const f of DISTRICTS_GEO.f) {
      if (this.selected.has(f.n)) continue;
      const path = this.paths.get(f.n);
      const isHovered = this.hoveredDistrict && this.hoveredDistrict.n === f.n;

      ctx.fillStyle = isHovered ? (t.id === 'midnight' ? '#334155' : '#f0e6d6') : t.land;
      ctx.fill(path);
      ctx.strokeStyle = t.stroke;
      ctx.lineWidth = 1.1;
      ctx.stroke(path);
    }

    // 2. Prepare Gradient for selected districts
    const grad = ctx.createLinearGradient(0, 0, this.geoWidth, this.geoHeight);
    grad.addColorStop(0, t.v1);
    grad.addColorStop(1, t.v2);

    // Glow effect for midnight theme
    if (t.glow && this.selected.size > 0) {
      ctx.save();
      ctx.shadowColor = t.glow;
      ctx.shadowBlur = 18 * this.dpr;
      for (const n of this.selected) {
        const path = this.paths.get(n);
        if (path) {
          ctx.fillStyle = grad;
          ctx.fill(path);
        }
      }
      ctx.restore();
    }

    // 3. Draw Selected (Tasted/Explored) Districts
    for (const n of this.selected) {
      const path = this.paths.get(n);
      if (!path) continue;
      const isHovered = this.hoveredDistrict && this.hoveredDistrict.n === n;

      ctx.fillStyle = grad;
      ctx.fill(path);
      ctx.strokeStyle = isHovered ? t.dot : t.vStroke;
      ctx.lineWidth = isHovered ? 2.2 : 1.2;
      ctx.stroke(path);
    }

    // 4. Draw Center Indicator Dots and District Names if enabled
    if (this.showLabels) {
      const fontName = '"Hind Siliguri", "Noto Sans Bengali", system-ui, sans-serif';
      ctx.font = `600 10.5px ${fontName}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const f of DISTRICTS_GEO.f) {
        const isSelected = this.selected.has(f.n);
        const isHovered = this.hoveredDistrict && this.hoveredDistrict.n === f.n;
        const [cx, cy] = f.c;
        const info = this.foodMap.get(f.n);
        const labelText = this.lang === 'bn' ? (info?.nameBn || f.n) : (info?.nameEn || f.n);

        // Draw dot for selected or hovered
        if (isSelected || isHovered) {
          ctx.beginPath();
          ctx.arc(cx, cy, isHovered ? 4.5 : 3.2, 0, Math.PI * 2);
          ctx.fillStyle = isHovered ? "#ffeb3b" : t.dot;
          ctx.fill();
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Label text with crisp halo outline
          ctx.lineWidth = 3.5;
          ctx.strokeStyle = isSelected ? (t.id === 'midnight' ? '#0b0f19' : '#ffffff') : t.halo;
          ctx.strokeText(labelText, cx, cy - 8.5);

          ctx.fillStyle = isSelected ? (t.id === 'midnight' ? '#ffffff' : t.label) : (t.id === 'midnight' ? '#94a3b8' : '#334155');
          ctx.fillText(labelText, cx, cy - 8.5);
        }
      }
    }

    ctx.restore();
  }
}
