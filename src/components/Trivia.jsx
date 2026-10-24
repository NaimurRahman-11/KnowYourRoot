import React, { useState } from 'react';
import { triggerCelebrationConfetti } from '../utils/passportCard.js';
import { Sparkles, Award, RotateCcw, CheckCircle2, XCircle, ArrowRight, Lightbulb } from 'lucide-react';

export const TRIVIA_QUESTIONS = [
  {
    qBn: "পোড়ামাটির সরায় পাতা ঐতিহ্যবাহী মিষ্টি দই কোন জেলার বিশ্বখ্যাত পরিচয়?",
    qEn: "Fermented sweet curd set in porous earthen pots is the signature pride of which district?",
    optsBn: ["বগুড়া", "পাবনা", "নাটোর", "সিরাজগঞ্জ"],
    optsEn: ["Bogura", "Pabna", "Natore", "Sirajganj"],
    ans: 0,
    factBn: "বগুড়ার নবাব পরিবারের পৃষ্ঠপোষকতায় শুরু হওয়া এই দই রানী দ্বিতীয় এলিজাবেথকেও উপহার হিসেবে লন্ডনে পাঠানো হয়েছিল।",
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
    optsBn: ["নাটোর", "কুমিল্লা", "टाঙ্গাইল", "যশোর"],
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
    if (selectedOpt !== null) return;
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
    <section id="triviaSection" className="modern-trivia-section">
      <div className="container">
        {/* Head */}
        <div className="section-head text-center">
          <div className="section-pill">
            <Sparkles size={15} />
            <span>{isBn ? 'স্বাদের বুদ্ধিমত্তা পরীক্ষা' : 'Roots Trivia Challenge'}</span>
          </div>
          <h2 className="atlas-main-title">
            {isBn ? (
              <>
                বাংলার খাঁটি স্বাদ আপনি <span className="text-glow">কতটা চেনেন?</span>
              </>
            ) : (
              <>
                How Deep Are Your <span className="text-glow">Culinary Roots?</span>
              </>
            )}
          </h2>
          <p className="atlas-sub-title">
            {isBn
              ? '৫টি নির্বাচিত ঐতিহ্যবাহী প্রশ্নের উত্তর দিয়ে যাচাই করুন আপনার শেকড়ের জ্ঞান!'
              : 'Answer 5 curated regional culinary questions and earn your Roots Connoisseur title.'}
          </p>
        </div>

        <div className="trivia-arena-wrapper">
          {!isFinished ? (
            <div className="trivia-glass-card">
              {/* Question Progress Header */}
              <div className="trivia-card-top-bar">
                <span className="step-counter-tag">
                  {isBn ? `প্রশ্ন ${currentIdx + 1} / ${total}` : `Question ${currentIdx + 1} of ${total}`}
                </span>
                <span className="current-score-tag">
                  {isBn ? `স্কোর: ${score}` : `Score: ${score}`}
                </span>
              </div>

              {/* Progress Line */}
              <div className="trivia-progress-track">
                <div
                  className="trivia-progress-bar"
                  style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <h3 className="trivia-question-prompt">
                {isBn ? currentQ.qBn : currentQ.qEn}
              </h3>

              {/* Options */}
              <div className="trivia-answers-grid">
                {(isBn ? currentQ.optsBn : currentQ.optsEn).map((opt, idx) => {
                  let optStateClass = "";
                  let IconComponent = null;

                  if (selectedOpt !== null) {
                    if (idx === currentQ.ans) {
                      optStateClass = "correct-choice";
                      IconComponent = CheckCircle2;
                    } else if (idx === selectedOpt) {
                      optStateClass = "wrong-choice";
                      IconComponent = XCircle;
                    } else {
                      optStateClass = "muted-choice";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      className={`trivia-option-card ${optStateClass}`}
                      onClick={() => handleSelectOption(idx)}
                      disabled={selectedOpt !== null}
                    >
                      <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                      <span className="option-text-val">{opt}</span>
                      {IconComponent && <IconComponent size={20} className="option-feedback-icon" />}
                    </button>
                  );
                })}
              </div>

              {/* Did you know Fact Box */}
              {selectedOpt !== null && (
                <div className="trivia-lore-box">
                  <Lightbulb size={22} className="lore-bulb-icon" />
                  <div className="lore-text-content">
                    <strong className="lore-heading">
                      {isBn ? 'আপনি কি জানেন?' : 'Heritage Lore Insight:'}
                    </strong>
                    <p>{isBn ? currentQ.factBn : currentQ.factEn}</p>
                  </div>
                </div>
              )}

              {/* Next Action */}
              {selectedOpt !== null && (
                <div className="trivia-advance-row">
                  <button type="button" className="btn-trivia-next" onClick={handleNext}>
                    <span>
                      {currentIdx + 1 < total
                        ? (isBn ? 'পরবর্তী প্রশ্ন' : 'Next Question')
                        : (isBn ? 'ফলাফল দেখুন' : 'Show My Score')}
                    </span>
                    <ArrowRight size={17} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="trivia-celebration-card text-center">
              <div className="celebration-trophy-ring">
                <Award size={48} className="trophy-gold-icon" />
              </div>

              <h3 className="celebration-heading">
                {isBn ? 'চ্যালেঞ্জ সম্পন্ন!' : 'Trivia Conquered!'}
              </h3>
              <p className="celebration-score-lead">
                {isBn
                  ? `আপনি ৫ টির মধ্যে ${score} টি সঠিক উত্তর দিয়েছেন!`
                  : `You got ${score} out of ${total} correct answers!`}
              </p>

              <div className="connoisseur-badge-wrap">
                {score === 5 && (
                  <div className="connoisseur-badge gold">
                    👑 {isBn ? 'খাঁটি রসনাবিদ ও ঐতিহ্য পণ্ডিত' : 'Grand Master Culinary Connoisseur'}
                  </div>
                )}
                {score >= 3 && score < 5 && (
                  <div className="connoisseur-badge silver">
                    🌟 {isBn ? 'অভিজ্ঞ ঐতিহ্য পর্যটক' : 'Seasoned Heritage Explorer'}
                  </div>
                )}
                {score < 3 && (
                  <div className="connoisseur-badge bronze">
                    🌱 {isBn ? 'আঞ্চলিক স্বাদের কৌতূহলী শিক্ষানবিস' : 'Curious Culinary Apprentice'}
                  </div>
                )}
              </div>

              <div className="celebration-actions-row">
                <button type="button" className="btn-trivia-retry" onClick={handleRestart}>
                  <RotateCcw size={17} />
                  <span>{isBn ? 'পুনরায় খেলুন' : 'Try Again'}</span>
                </button>
                <a href="#mapSection" className="btn-trivia-to-map">
                  <span>{isBn ? 'মানচিত্রে ফিরে যান' : 'Back to Atlas'}</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
