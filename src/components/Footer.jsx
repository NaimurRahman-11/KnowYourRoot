import React from 'react';
import { Compass, Heart, MapPin, Award, ExternalLink, Code2 } from 'lucide-react';

export default function Footer({ lang, onOpenPassport }) {
  const isBn = lang === 'bn';

  return (
    <footer className="modern-footer">
      <div className="container">
        <div className="footer-main-grid">
          {/* Brand Col */}
          <div className="footer-brand-pane">
            <div className="footer-brand-logo">
              <div className="footer-logo-gem">
                <Compass size={20} />
              </div>
              <span className="footer-brand-text">KnowYourRoot</span>
            </div>
            <p className="footer-mission-statement">
              {isBn
                ? 'বাংলার ৬৪ জেলার সুপ্রাচীন খাদ্যাভ্যাস, জিআই সনদপ্রাপ্ত সম্পদ ও ভৌগোলিক সংস্কৃতির এক জীবন্ত ডিজিটাল কোষাগার।'
                : 'A living digital atlas honoring the indigenous gastronomy, centuries-old artisan traditions, and GI heritage across Bangladesh.'}
            </p>
            <div className="footer-social-strip">
              <a
                href="https://github.com/NaimurRahman-11/KnowYourRoot"
                target="_blank"
                rel="noreferrer"
                className="footer-link-chip"
              >
                <Code2 size={16} />
                <span>GitHub Repository</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>


          {/* Quick Links */}
          <div className="footer-col-nav">
            <h4 className="footer-col-title">{isBn ? 'ন্যাভিগেশন' : 'Navigation'}</h4>
            <ul className="footer-links-list">
              <li><a href="#mapSection">{isBn ? 'ইন্টারেক্টিভ মানচিত্র' : 'Interactive Atlas'}</a></li>
              <li><a href="#explorerSection">{isBn ? '৬৪ জেলার ঐতিহ্য' : 'Heritage Vault'}</a></li>
              <li><a href="#triviaSection">{isBn ? 'স্বাদ কুইজ চ্যালেঞ্জ' : 'Trivia Arena'}</a></li>
              <li><button type="button" className="footer-text-btn" onClick={onOpenPassport}>{isBn ? 'টেস্ট পাসপোর্ট' : 'Taste Passport'}</button></li>
            </ul>
          </div>

          {/* Iconic GI Heritage */}
          <div className="footer-col-nav">
            <h4 className="footer-col-title">{isBn ? 'স্বীকৃত জিআই ঐতিহ্য' : 'Iconic GI Delicacies'}</h4>
            <ul className="footer-links-list">
              <li><span>{isBn ? 'বগুড়ার মিষ্টি দই' : "Bogura's Misti Doi"}</span></li>
              <li><span>{isBn ? 'নাটোরের কাঁচাগোল্লা' : "Natore's Kachagolla"}</span></li>
              <li><span>{isBn ? 'কুমিল্লার রসমালাই' : "Cumilla's Roshomalai"}</span></li>
              <li><span>{isBn ? 'টাঙ্গাইলের পোড়াবাড়ির চমচম' : "Tangail's Chamcham"}</span></li>
              <li><span>{isBn ? 'সুন্দরবনের প্রাকৃতিক মধু' : "Sundarbans Wild Honey"}</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p className="footer-copy">
            © {new Date().getFullYear()} KnowYourRoot. {isBn ? 'বাংলাদেশি খাদ্য ও সংস্কৃতির পরম মমতায় নির্মিত।' : 'Crafted with cultural pride and reverence for Bangladesh.'}
          </p>
          <p className="footer-love-note">
            <span>{isBn ? 'আপনার শিকড় জানুন, বাংলার স্বাদ বাঁচিয়ে রাখুন' : 'Know Your Roots, Savor Bengal'}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
