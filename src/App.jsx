import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import MapStage from './components/MapStage.jsx';
import Explorer from './components/Explorer.jsx';
import Trivia from './components/Trivia.jsx';
import Footer from './components/Footer.jsx';
import DistrictModal from './components/DistrictModal.jsx';
import PassportModal from './components/PassportModal.jsx';
import { TRANSLATIONS } from './data/translations.js';
import { DISTRICTS_GEO } from './data/districts-geo.js';

// Starter tasted set for immediate visual vibrancy
const DEFAULT_TASTED = ["BOGURA", "NATORE", "PABNA", "CUMILLA", "CHATTOGRAM", "SYLHET"];

export default function App() {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('kyr_lang') || 'bn';
  });

  const [selected, setSelected] = useState(() => {
    try {
      const saved = localStorage.getItem('kyr_visited_districts');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return new Set(parsed);
        }
      }
    } catch (e) {
      console.warn("Could not parse saved districts:", e);
    }
    return new Set(DEFAULT_TASTED);
  });

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('kyr_user_name') || (lang === 'bn' ? 'পথিক' : 'Traveler');
  });

  const [avatarImg, setAvatarImg] = useState(() => {
    return localStorage.getItem('kyr_avatar') || null;
  });

  const [themeId, setThemeId] = useState(() => {
    return localStorage.getItem('kyr_theme') || 'emerald';
  });

  const [modalDistrict, setModalDistrict] = useState(null);
  const [isPassportOpen, setIsPassportOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('kyr_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('kyr_visited_districts', JSON.stringify(Array.from(selected)));
  }, [selected]);

  useEffect(() => {
    localStorage.setItem('kyr_user_name', userName);
  }, [userName]);

  useEffect(() => {
    if (avatarImg) {
      try {
        localStorage.setItem('kyr_avatar', avatarImg);
      } catch (e) {
        console.warn("Avatar too large for localStorage quota");
      }
    } else {
      localStorage.removeItem('kyr_avatar');
    }
  }, [avatarImg]);

  useEffect(() => {
    localStorage.setItem('kyr_theme', themeId);
  }, [themeId]);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.bn;

  const handleToggleLang = () => {
    const nextLang = lang === 'bn' ? 'en' : 'bn';
    setLang(nextLang);
    if (userName === 'পথিক' && nextLang === 'en') setUserName('Traveler');
    if (userName === 'Traveler' && nextLang === 'bn') setUserName('পথিক');
  };

  const handleToggleDistrict = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    const all = new Set(DISTRICTS_GEO.f.map((f) => f.n));
    setSelected(all);
  };

  const handleClearAll = () => {
    setSelected(new Set());
  };

  const handleOpenModal = (district) => {
    setModalDistrict(district);
  };

  const handleCloseModal = () => {
    setModalDistrict(null);
  };

  const handleOpenPassport = () => {
    setIsPassportOpen(true);
  };

  const handleClosePassport = () => {
    setIsPassportOpen(false);
  };

  return (
    <div className="app-root-shell">
      {/* Sleek Modern Navigation */}
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        t={t}
        tastedCount={selected.size}
        onOpenPassport={handleOpenPassport}
      />

      <main>
        {/* Luminous Hero */}
        <Hero
          lang={lang}
          tastedCount={selected.size}
          onOpenPassport={handleOpenPassport}
        />

        {/* The Centerpiece: Living Vector SVG Map Stage */}
        <MapStage
          selected={selected}
          onToggleDistrict={handleToggleDistrict}
          onSelectAll={handleSelectAll}
          onClearAll={handleClearAll}
          lang={lang}
          onOpenDetails={handleOpenModal}
          onOpenPassport={handleOpenPassport}
        />

        {/* Bento Grid Regional Delicacies Explorer */}
        <Explorer
          selected={selected}
          onToggleDistrict={handleToggleDistrict}
          lang={lang}
          onOpenModal={handleOpenModal}
        />

        {/* Gamified Roots Trivia Arena */}
        <Trivia lang={lang} />
      </main>

      {/* Modern Footer */}
      <Footer lang={lang} onOpenPassport={handleOpenPassport} />

      {/* Detailed Heritage Lore Modal */}
      <DistrictModal
        district={modalDistrict}
        isOpen={Boolean(modalDistrict)}
        onClose={handleCloseModal}
        isTasted={modalDistrict ? selected.has(modalDistrict.id) : false}
        onToggleTasted={handleToggleDistrict}
        lang={lang}
      />

      {/* Dedicated Luxury Taste Passport Modal */}
      <PassportModal
        isOpen={isPassportOpen}
        onClose={handleClosePassport}
        selected={selected}
        userName={userName}
        setUserName={setUserName}
        avatarImg={avatarImg}
        setAvatarImg={setAvatarImg}
        themeId={themeId}
        setThemeId={setThemeId}
        lang={lang}
      />
    </div>
  );
}
