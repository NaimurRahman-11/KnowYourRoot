import React from 'react';

export default function Navbar({ lang, onToggleLang, t }) {
  return (
    <header className="site-nav">
      <div className="container">
        <nav className="nav-inner" aria-label="Main Navigation">
          <a href="#" className="brand-logo" aria-label="KnowYourRoot Home">
            <span className="logo-badge">🌱</span>
            <span>KnowYourRoot</span>
          </a>

          <div className="nav-links">
            <a href="#mapSection" className="nav-link">{t.navMap}</a>
            <a href="#explorerSection" className="nav-link">{t.navExplorer}</a>
            <a href="#triviaSection" className="nav-link">{t.navTrivia}</a>
            <a href="#mapSection" className="nav-link">{t.navPassport}</a>
          </div>

          <div className="nav-actions">
            <button
              type="button"
              className="btn-lang-toggle"
              onClick={onToggleLang}
              title={t.langSwitchTitle}
              aria-label="Toggle language"
            >
              <span className="lang-icon">🌐</span>
              <span className="lang-cur">{lang === 'bn' ? 'বাং' : 'EN'}</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
