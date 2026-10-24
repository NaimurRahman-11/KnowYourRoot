import React from 'react';

export default function Hero({ t }) {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-art-card">
          <div className="hero-pill">
            {t.heroBadge}
          </div>

          <h1
            className="hero-title"
            dangerouslySetInnerHTML={{ __html: t.heroHeading }}
          />

          <p className="hero-subtitle">
            {t.heroDesc}
          </p>

          <div className="hero-actions">
            <a href="#mapSection" className="btn-cta-primary">
              {t.heroCtaStart}
            </a>
            <a href="#explorerSection" className="btn-cta-secondary">
              {t.heroCtaExplore}
            </a>
          </div>

          <div className="hero-steps">
            <div className="hero-step" dangerouslySetInnerHTML={{ __html: t.step1 }} />
            <div className="hero-step" dangerouslySetInnerHTML={{ __html: t.step2 }} />
            <div className="hero-step" dangerouslySetInnerHTML={{ __html: t.step3 }} />
          </div>

          {/* Scenic Bangladesh Landscape Silhouette */}
          <svg className="hero-scene" viewBox="0 0 1100 120" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
            <path d="M0,120 C150,85 280,105 450,70 C600,105 780,60 920,80 C1020,95 1060,110 1100,120 L1100,120 L0,120 Z" fill="#e8f3ed" opacity="0.6"/>
            <path d="M0,120 C180,95 320,115 500,85 C660,115 820,78 980,100 C1050,110 1080,115 1100,120 Z" fill="#d0ebd9" opacity="0.8"/>
            <g transform="translate(620, 82) scale(0.65)">
              <path d="M-40,15 C-25,26 25,26 40,15 C28,21 -28,21 -40,15 Z" fill="#5c3826"/>
              <path d="M0,15 L0,-24 L18,-6 Z" fill="#fff5ea" stroke="#d5b895" stroke-width="1.2"/>
              <circle cx="-12" cy="11" r="3" fill="#8d5b3d"/>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
