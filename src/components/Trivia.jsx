import React, { useState } from 'react';
import { triggerCelebrationConfetti } from '../utils/passportCard.js';

export const TRIVIA_QUESTIONS = [
  {
    qBn: "পোড়ামাটির সরায় পাতা ঐতিহ্যবাহী মিষ্টি দই কোন জেলার বিশ্বখ্যাত পরিচয়?",
    qEn: "Fermented sweet curd set in porous earthen pots is the signature pride of which district?",
    optsBn: ["বগুড়া", "পাবনা", "নাটোর", "সিরাজগঞ্জ"],
    optsEn: ["Bogura", "Pabna", "Natore", "Sirajganj"],
    ans: 0,
    factBn: "বগুড়ার নবাব পরিবারের পৃষ্ঠপোষকতায় শুরু হওয়া এই দই রানী দ্বিতীয় এলিজাবেথকেও উপহার হিসেবে পাঠানো হয়েছিল।",
    factEn: "Bogura's yogurt gained royal acclaim under the local Nawabs and was even sent to Queen Elizabeth II in London."
  },
  {
    qBn: "বাথান অঞ্চলের দেশি গাভীর দুধ থেকে জ্বাল দেওয়া বিখ্যাত খাঁটি গাওয়া ঘি কোন জেলার ঐতিহ্য?",
    qEn: "Pure aromatic golden bhat-ghee simmered from grazing cattle butter belongs to which district?",
    optsBn: ["পাবনা", "খুলনা", "নোয়াখালী", "কুষ্টিয়া"],
    optsEn: ["Pabna", "Khulna", "Noakhali", "Kushtia"],
    ans: 0,
    factBn: "পাবনার ভাঙ্গুড়া ও চাটমোহরের চারণভূমির শতবর্ষপ্রাচীন বাথান থেকেই উৎপন্ন হয় এই সুবাসিত গাওয়া ঘি।",
    factEn: "Pabna's fertile river basins provide natural lush grazing for cows yielding superior aromatic ghee."
  },
  {
    qBn: "১৭৫৭ সালে রানী ভবানীর দরবারের কারিগরদের হাতে উদ্ভাবিত বিখ্যাত 'কাঁচাগোল্লা' কোন জেলার?",
    qEn: "Invented around 1757 for Maharani Bhabani's royal court, which district is home to 'Kachagolla'?",
    optsBn: ["নাটোর", "কুমিল্লা", "টাঙ্গাইল", "যশোর"],
    optsEn: ["Natore", "Cumilla", "Tangail", "Jashore"],
    ans: 0,
    factBn: "নাটোরের মাধব বণিকের মিষ্টির দোকানে এখনো শত বছরের প্রাচীন প্রণালীতে খাঁটি কাঁচাগোল্লা তৈরি হয়।",
    factEn: "Natore's Kachagolla is made of pure fresh chhana gently rolled with light sugar syrup and cardamom."
  },
  {
    qBn: "১৯০১ সালে প্রতিষ্ঠিত মনোহরপুরের আদি 'মাতৃভাণ্ডার'-এর রসমালাই কোন জেলায় অবস্থিত?",
    qEn: "The legendary 'Matri Bhandar' (est. 1901) famous for mouthwatering Roshomalai is in which district?",
    optsBn: ["কুমিল্লা", "ফরিদপুর", "ব্রাহ্মণবাড়িয়া", "চাঁদপুর"],
    optsEn: ["Cumilla", "Faridpur", "Brahmanbaria", "Chandpur"],
    ans: 0,
    factBn: "কুমিল্লার রসমালাই জাতীয় ভৌগোলিক নির্দেশক (GI) সনদপ্রাপ্ত বাংলাদেশের অন্যতম শীর্ষ মিষ্টান্ন।",
    factEn: "Cumilla's Matri Bhandar Roshomalai features tiny chhana dumplings steeped in slow-simmered cardamom cream."
  },
  {
    qBn: "গাঢ় মসলাদার তেলে ভুনা সুস্বাদু 'কালা ভুনা' ও 'মেজবানি মাংস' কোন অঞ্চলের প্রধান ঐতিহ্য?",
    qEn: "Mahogany-roasted 'Kala Bhuna' and slow-simmered 'Mezbani Beef' are legendary signatures of which region?",
    optsBn: ["চট্টগ্রাম", "সিলেট", "রাজশাহী", "ঢাকা"],
    optsEn: ["Chattogram", "Sylhet", "Rajshahi", "Dhaka"],
    ans: 0,
    factBn: "১৮ রকমের ভাজা মসলা ও খাঁটি সরিষার তেলে ঘণ্টার পর ঘণ্টা কষিয়ে চট্টগ্রামের ঐতিহ্যবাহী কালা ভুনা প্রস্তুত হয়।",
    factEn: "Chattogram's Kala Bhuna is slowly roasted in a brass wok with 18 toasted spices until deeply caramelized."
  }
];

export default function Trivia({ lang }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const isBn = lang === 'bn';
  const total = TRIVIA_QUESTIONS.length;
  const currentQ = TRIVIA_QUESTIONS[currentIdx];

  const handleSelectOption = (index) => {
    if (selectedOpt !== null) return; // already answered
    setSelectedOpt(index);
    if (index === currentQ.ans) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < total) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
    } else {
      setIsFinished(true);
      triggerCelebrationConfetti();
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <section id="trivia-section" className="trivia-section">
      <div className="container">
        <div className="section-head text-center">
          <span className="badge-pill">
            {isBn ? 'স্বাদের কুইজ ও বুদ্ধিমত্তা' : 'Food & Heritage Trivia'}
          </span>
          <h2 className="section-title">
            {isBn ? 'বাংলাদেশের ঐতিহ্যবাহী স্বাদ আপনি কতটা চেনেন?' : 'How Deep Are Your Roots in Bengali Delicacies?'}
          </h2>
          <p className="section-subtitle">
            {isBn
              ? '৫টি নির্বাচিত আঞ্চলিক প্রশ্নের উত্তর দিয়ে যাচাই করুন আপনার ঐতিহ্য জ্ঞানের দৌড়!'
              : 'Test your knowledge across 5 heritage questions and earn your Culinary Connoisseur badge.'}
          </p>
        </div>

        <div className="trivia-card-container">
          {!isFinished ? (
            <div className="trivia-card">
              {/* Progress & Meta Header */}
              <div className="trivia-header-row">
                <span className="trivia-step-badge">
                  {isBn ? `প্রশ্ন ${currentIdx + 1} / ${total}` : `Question ${currentIdx + 1} of ${total}`}
                </span>
                <span className="trivia-score-preview">
                  {isBn ? `স্কোর: ${score}` : `Score: ${score}`}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="trivia-progress-bar">
                <div
                  className="trivia-progress-fill"
                  style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <h3 className="trivia-question-text">
                {isBn ? currentQ.qBn : currentQ.qEn}
              </h3>

              {/* Options */}
              <div className="trivia-options-grid">
                {(isBn ? currentQ.optsBn : currentQ.optsEn).map((opt, idx) => {
                  let optClass = "trivia-opt-btn";
                  if (selectedOpt !== null) {
                    if (idx === currentQ.ans) {
                      optClass += " correct";
                    } else if (idx === selectedOpt) {
                      optClass += " wrong";
                    } else {
                      optClass += " disabled";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      className={optClass}
                      onClick={() => handleSelectOption(idx)}
                      disabled={selectedOpt !== null}
                    >
                      <span className="opt-letter">{String.fromCharCode(65 + idx)}</span>
                      <span className="opt-text">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Did you know / Fact Box */}
              {selectedOpt !== null && (
                <div className="trivia-fact-box">
                  <span className="fact-icon">💡</span>
                  <div className="fact-content">
                    <strong>{isBn ? 'আপনি কি জানেন?' : 'Heritage Fact:'}</strong>
                    <p>{isBn ? currentQ.factBn : currentQ.factEn}</p>
                  </div>
                </div>
              )}

              {/* Next Button */}
              {selectedOpt !== null && (
                <div className="trivia-next-action">
                  <button className="btn-primary btn-large" onClick={handleNext}>
                    {currentIdx + 1 < total
                      ? (isBn ? 'পরবর্তী প্রশ্ন ➔' : 'Next Question ➔')
                      : (isBn ? 'ফলাফল দেখুন 🎉' : 'View Results 🎉')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="trivia-result-card text-center">
              <div className="result-trophy">🏆</div>
              <h3 className="result-title">
                {isBn ? 'অভিনন্দন! কুইজ সমাপ্ত' : 'Challenge Complete!'}
              </h3>
              <p className="result-score-line">
                {isBn
                  ? `আপনি ৫ টির মধ্যে ${score} টি সঠিক উত্তর দিয়েছেন!`
                  : `You scored ${score} out of ${total}!`}
              </p>

              <div className="result-badge-display">
                {score === 5 && (
                  <div className="badge-level gold">
                    <span>👑 {isBn ? 'খাঁটি রসনাবিদ ও ঐতিহ্যপ্রেমী' : 'Master Culinary Connoisseur'}</span>
                  </div>
                )}
                {score >= 3 && score < 5 && (
                  <div className="badge-level silver">
                    <span>🌟 {isBn ? 'অভিজ্ঞ ঐতিহ্য সন্ধানী' : 'Seasoned Heritage Explorer'}</span>
                  </div>
                )}
                {score < 3 && (
                  <div className="badge-level bronze">
                    <span>🌱 {isBn ? 'আঞ্চলিক স্বাদের নতুন পথিক' : 'Curious Culinary Apprentice'}</span>
                  </div>
                )}
              </div>

              <div className="result-actions">
                <button className="btn-primary" onClick={handleRestart}>
                  🔄 {isBn ? 'পুনরায় কুইজ দিন' : 'Play Again'}
                </button>
                <a href="#map-section" className="btn-secondary">
                  🗺️ {isBn ? 'মানচিত্রে ফিরে যান' : 'Back to Heritage Map'}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
