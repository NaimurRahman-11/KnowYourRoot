import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, MapPin, Award, Globe, BookOpen } from 'lucide-react';

export default function Navbar({ lang, onToggleLang, t, tastedCount, onOpenPassport }) {
  const [scrolled, setScrolled] = useState(false);
  const isBn = lang === 'bn';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`modern-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav-content">
        <a href="#" className="brand-badge">
          <div className="brand-logo-gem">
            <Compass className="brand-icon" size={22} />
          </div>
          <div className="brand-text-group">
            <span className="brand-name">KnowYourRoot</span>
            <span className="brand-sub">{isBn ? 'আপনার শিকড়কে জানুন' : 'Heritage Atlas'}</span>
          </div>
        </a>

        <nav className="nav-menu" aria-label="Main Navigation">
          <a href="#mapSection" className="nav-menu-link">
            <MapPin size={16} />
            <span>{isBn ? 'স্বাদ মানচিত্র' : 'Taste Map'}</span>
          </a>
          <a href="#explorerSection" className="nav-menu-link">
            <BookOpen size={16} />
            <span>{isBn ? 'ঐতিহ্য কোষ' : 'Heritage Vault'}</span>
          </a>
          <a href="#triviaSection" className="nav-menu-link">
            <Sparkles size={16} />
            <span>{isBn ? 'কুইজ চ্যালেঞ্জ' : 'Roots Trivia'}</span>
          </a>
        </nav>

        <div className="nav-actions">
          {/* Quick Passport CTA button in navbar */}
          <button
            type="button"
            className="nav-passport-btn"
            onClick={onOpenPassport}
            title={isBn ? 'টেস্ট পাসপোর্ট খুলুন' : 'Open Taste Passport'}
          >
            <Award size={16} />
            <span className="passport-btn-text">
              {isBn ? 'পাসপোর্ট' : 'Passport'}
            </span>
            <span className="passport-counter-pill">{tastedCount}/64</span>
          </button>

          {/* Bilingual Toggle */}
          <button
            type="button"
            className="lang-switcher-btn"
            onClick={onToggleLang}
            title={t.langSwitchTitle || "Switch Language"}
            aria-label="Toggle language"
          >
            <Globe size={15} />
            <span className="lang-code">{isBn ? 'বাং' : 'EN'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
