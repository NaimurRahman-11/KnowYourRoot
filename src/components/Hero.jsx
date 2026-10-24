import React from 'react';
import { Compass, Sparkles, Award, Map, ArrowDown, ChevronRight } from 'lucide-react';

export default function Hero({ lang, tastedCount, onOpenPassport }) {
  const isBn = lang === 'bn';

  const floatingDelicacies = [
    { name: isBn ? "বগুড়ার মিষ্টি দই" : "Bogura Curd", icon: "🍮", loc: isBn ? "বগুড়া" : "Bogura", tag: "GI" },
    { name: isBn ? "নাটোরের কাঁচাগোল্লা" : "Natore Kachagolla", icon: "🥟", loc: isBn ? "নাটোর" : "Natore", tag: "GI" },
    { name: isBn ? "পাবনার গাওয়া ঘি" : "Pabna Gawa Ghee", icon: "🧈", loc: isBn ? "পাবনা" : "Pabna", tag: "বাথান" },
    { name: isBn ? "কুমিল্লার রসমালাই" : "Cumilla Roshomalai", icon: "🥣", loc: isBn ? "কুমিল্লা" : "Cumilla", tag: "GI" },
    { name: isBn ? "চট্টগ্রামের মেজবানি" : "Ctg Mezbani", icon: "🥩", loc: isBn ? "চট্টগ্রাম" : "Chattogram", tag: "ঐতিহ্য" },
  ];

  return (
    <section className="modern-hero">
      <div className="hero-mesh-background" aria-hidden="true">
        <div className="mesh-orb orb-emerald"></div>
        <div className="mesh-orb orb-gold"></div>
        <div className="mesh-orb orb-teal"></div>
      </div>

      <div className="container hero-inner">
        {/* Top Floating Pill */}
        <div className="hero-pill-badge">
          <Sparkles size={14} className="pill-sparkle" />
          <span>
            {isBn 
              ? '৬৪ জেলা · ৮ বিভাগ · শতাব্দীপ্রাচীন ঐতিহ্যবাহী স্বাদ ও সংস্কৃতি' 
              : '64 Districts · 8 Divisions · Authentic Heritage & Cultural Odysseys'}
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="hero-main-title">
          {isBn ? (
            <>
              স্বাদ আর ঐতিহ্যে <span className="highlight-gradient">আপনার শিকড়</span> কতটুকু জানা?
            </>
          ) : (
            <>
              Map Your Roots Across <span className="highlight-gradient">64 Districts</span> of Delicacies
            </>
          )}
        </h1>

        <p className="hero-lead-text">
          {isBn
            ? 'বগুড়ার পোড়ামাটির সরায় পাতা দই থেকে পাবনার চারণভূমির সুবাসিত ঘি, নাটোরের রাজকীয় কাঁচাগোল্লা থেকে কুমিল্লার আদি মাতৃভাণ্ডার—বাংলার প্রতিটি মাটির রয়েছে শতবর্ষের অনন্য স্বাদ। ইন্টারঅ্যাক্টিভ মানচিত্রে আপনার পদচিহ্ন রাঙিয়ে তুলে নিন আপনার ব্যক্তিগত ডিজিটাল টেস্ট পাসপোর্ট।'
            : 'From porous clay pots of Bogura sweet curd to pastoral churned ghee of Pabna and royal courts of Natore—rediscover the culinary treasures and GI legacies of Bangladesh. Pin your discoveries and mint your personalized heritage passport.'}
        </p>

        {/* Hero Actions */}
        <div className="hero-cta-group">
          <a href="#mapSection" className="btn-hero-primary">
            <Map size={18} />
            <span>{isBn ? 'ইন্টারেক্টিভ মানচিত্র খুলুন' : 'Explore Interactive Map'}</span>
            <ChevronRight size={16} />
          </a>
          <button type="button" className="btn-hero-secondary" onClick={onOpenPassport}>
            <Award size={18} />
            <span>{isBn ? 'টেস্ট পাসপোর্ট দেখুন' : 'View Taste Passport'}</span>
            <span className="btn-counter-badge">{tastedCount}/64</span>
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="hero-stats-strip">
          <div className="stat-item">
            <span className="stat-val">৬৪</span>
            <span className="stat-desc">{isBn ? 'অনন্য জেলা' : 'Historic Districts'}</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-val">৮</span>
            <span className="stat-desc">{isBn ? 'বিভাগীয় সংস্কৃতি' : 'Divisions'}</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-val">১৫+</span>
            <span className="stat-desc">{isBn ? 'স্বীকৃত জিআই পণ্য' : 'GI Heritage Certified'}</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-val">১০০+</span>
            <span className="stat-desc">{isBn ? 'শতবর্ষের আদি রেসিপি' : 'Century-old Delicacies'}</span>
          </div>
        </div>

        {/* Floating Delicacy Strip */}
        <div className="delicacies-marquee-wrapper">
          <div className="delicacies-marquee">
            {floatingDelicacies.map((item, idx) => (
              <a href="#mapSection" key={idx} className="marquee-chip">
                <span className="chip-emoji">{item.icon}</span>
                <span className="chip-name">{item.name}</span>
                <span className="chip-loc">{item.loc}</span>
                <span className="chip-tag">{item.tag}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
