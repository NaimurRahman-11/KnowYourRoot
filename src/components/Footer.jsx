import React from 'react';

export default function Footer({ lang }) {
  const isBn = lang === 'bn';

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <span className="logo-icon">🌿</span>
              <span className="logo-text">KnowYourRoot</span>
            </div>
            <p className="footer-tagline">
              {isBn
                ? 'বাংলার ৬৪ জেলার বিলুপ্তপ্রায় ঐতিহ্য, শতাব্দীপ্রাচীন স্বাদ ও ভৌগোলিক নির্দেশক (GI) পণ্যের এক জীবন্ত ডিজিটাল কোষাগার।'
                : 'A living digital tribute to the indigenous gastronomy, cultural heritage, and GI treasures across all 64 districts of Bangladesh.'}
            </p>
            <div className="social-links">
              <a href="https://github.com/NaimurRahman-11/KnowYourRoot" target="_blank" rel="noreferrer" className="social-chip">
                GitHub ↗
              </a>
              <a href="#map-section" className="social-chip">
                {isBn ? 'মানচিত্র' : 'Map'}
              </a>
              <a href="#explorer-section" className="social-chip">
                {isBn ? 'স্বাদভাণ্ডার' : 'Explorer'}
              </a>
              <a href="#trivia-section" className="social-chip">
                {isBn ? 'কুইজ' : 'Trivia'}
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">{isBn ? 'জনপ্রিয় স্বাদ' : 'Iconic Signatures'}</h4>
            <ul className="footer-links">
              <li><span>{isBn ? 'বগুড়ার মিষ্টি দই' : "Bogura's Misti Doi"}</span></li>
              <li><span>{isBn ? 'নাটোরের কাঁচাগোল্লা' : "Natore's Kachagolla"}</span></li>
              <li><span>{isBn ? 'পাবনার গাওয়া ঘি' : "Pabna's Gawa Ghee"}</span></li>
              <li><span>{isBn ? 'কুমিল্লার রসমালাই' : "Cumilla's Roshomalai"}</span></li>
              <li><span>{isBn ? 'মুক্তাগাছার মণ্ডা' : "Muktagacha's Monda"}</span></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">{isBn ? 'ভৌগোলিক নির্দেশক (GI)' : 'GI Recognition'}</h4>
            <ul className="footer-links">
              <li><span>{isBn ? 'টাঙ্গাইল শাড়ি ও পোড়াবাড়ির চমচম' : "Tangail Saree & Chamcham"}</span></li>
              <li><span>{isBn ? 'রাজশাহীর আম ও রেশম' : "Rajshahi Silk & Mangoes"}</span></li>
              <li><span>{isBn ? 'দিনাজপুরের কাটারিভোগ ও লিচু' : "Dinajpur Kataribhog & Litchi"}</span></li>
              <li><span>{isBn ? 'সুন্দরবনের প্রাকৃতিক মধু' : "Sundarbans Wild Forest Honey"}</span></li>
              <li><span>{isBn ? 'কিশোরগঞ্জের অষ্টগ্রাম পনির' : "Austagram Artisanal Cheese"}</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} KnowYourRoot. {isBn ? 'সকল অধিকার সংরক্ষিত। ভালোবাসা ও শ্রদ্ধায় তৈরি।' : 'All rights reserved. Crafted with deep cultural reverence.'}
          </p>
          <p className="footer-subtext">
            {isBn ? 'বাংলাদেশি খাদ্য ও সংস্কৃতির জয়গান।' : 'Celebrating the vibrant heart of Bangladesh.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
