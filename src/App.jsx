import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import DistrictPicker from './components/DistrictPicker.jsx';
import MapStage from './components/MapStage.jsx';
import Explorer from './components/Explorer.jsx';
import Trivia from './components/Trivia.jsx';
import Footer from './components/Footer.jsx';
import DistrictModal from './components/DistrictModal.jsx';
import { TRANSLATIONS } from './data/translations.js';
import { DISTRICTS_GEO } from './data/districts-geo.js';

// Default starter tasted districts for visual delight on first load
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

  // Sync state to localStorage
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

  return (
    <div className="app-root">
      <Navbar lang={lang} onToggleLang={handleToggleLang} t={t} />

      <main>
        <Hero t={t} />

        <section id="mapSection" className="map-stage-section">
          <div className="container">
            <div className="map-stage-layout">
              <DistrictPicker
                selected={selected}
                onToggle={handleToggleDistrict}
                onSelectAll={handleSelectAll}
                onClearAll={handleClearAll}
                lang={lang}
                t={t}
              />
              <MapStage
                selected={selected}
                onToggleDistrict={handleToggleDistrict}
                userName={userName}
                setUserName={setUserName}
                avatarImg={avatarImg}
                setAvatarImg={setAvatarImg}
                themeId={themeId}
                setThemeId={setThemeId}
                lang={lang}
                t={t}
              />
            </div>
          </div>
        </section>

        <section id="explorerSection">
          <Explorer
            selected={selected}
            onToggleDistrict={handleToggleDistrict}
            lang={lang}
            onOpenModal={handleOpenModal}
          />
        </section>

        <section id="triviaSection">
          <Trivia lang={lang} />
        </section>
      </main>

      <Footer lang={lang} />

      <DistrictModal
        district={modalDistrict}
        isOpen={Boolean(modalDistrict)}
        onClose={handleCloseModal}
        isTasted={modalDistrict ? selected.has(modalDistrict.id) : false}
        onToggleTasted={handleToggleDistrict}
        lang={lang}
      />
    </div>
  );
}
