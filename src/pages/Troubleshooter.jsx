import React, { useState } from 'react';
import { troubleshootingCases } from '../data/TroubleshootingCases';
import { playSound } from '../utils/audio';
import '../styles/troubleshooter.css';

export default function Troubleshooter() {
  const [currentCase, setCurrentCase] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const caseData = troubleshootingCases[currentCase];
  const question = caseData?.stages?.[0];

  const handleAnswer = (index) => {
    if (showResult) return;

    setSelectedAnswer(index);
    setShowResult(true);

    if (index === question.correctIndex) {
      setScore((prev) => prev + 25);
      playSound('correct');
    } else {
      playSound('incorrect');
    }
  };

  const handleNextCase = () => {
    if (currentCase + 1 >= troubleshootingCases.length) {
      setFinished(true);
      return;
    }

    setCurrentCase((prev) => prev + 1);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleRestart = () => {
    setCurrentCase(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="troubleshooter-page">
        <div className="troubleshooter-final">
          <div className="final-icon">🏆</div>

          <h2>Semua Kasus Selesai!</h2>

          <p>
            Kamu sudah menyelesaikan semua studi kasus troubleshooting I/O.
          </p>

          <div className="final-score">
            <span>Skor Kamu</span>
            <strong>
              {score} / {troubleshootingCases.length * 25}
            </strong>
          </div>

          <div className="final-message">
            {score === troubleshootingCases.length * 25
              ? '🔥 Sempurna! Kamu sangat memahami cara menganalisis masalah I/O.'
              : score >= 50
              ? '👍 Bagus! Terus latih kemampuanmu dalam menganalisis masalah I/O.'
              : '💪 Jangan menyerah! Coba pelajari kembali materi manajemen I/O.'}
          </div>

          <button
            className="troubleshooter-restart"
            onClick={handleRestart}
          >
            🔄 Mulai Lagi
          </button>
        </div>
      </div>
    );
  }

  const isCorrect =
    selectedAnswer !== null &&
    selectedAnswer === question.correctIndex;

  return (
    <div className="troubleshooter-page">
      
      {/* HEADER */}
      <div className="troubleshooter-header">
        <div className="troubleshooter-header-icon">
          🔧
        </div>

        <div>
          <h1>I/O Troubleshooter</h1>
          <p>
            Jadilah teknisi dan cari tahu penyebab masalah pada perangkat I/O.
          </p>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="troubleshooter-progress">
        <div className="case-progress">
          <span>Studi Kasus</span>
          <strong>
            {currentCase + 1}
            <small> / {troubleshootingCases.length}</small>
          </strong>
        </div>

        <div className="troubleshooter-point">
          ⭐ {score} poin
        </div>
      </div>

      {/* CASE */}
      <section className="troubleshooter-case">

        <div className="case-heading">
          <div className="case-icon">
            {caseData.icon || '🛠️'}
          </div>

          <div>
            <span>STUDI KASUS {currentCase + 1}</span>
            <h2>{caseData.title}</h2>
          </div>
        </div>

        <div className="case-problem">
          <span className="problem-icon">⚠️</span>
          <p>{caseData.problem}</p>
        </div>

      </section>

      {/* QUESTION */}
      <section className="troubleshooter-question">

        <div className="question-heading">
          <div className="question-icon">
            💡
          </div>

          <div>
            <span>ANALISIS</span>
            <h2>{question.question}</h2>
          </div>
        </div>

        {/* OPTIONS */}
        <div className="troubleshooter-options">

          {question.options.map((option, index) => {

            let optionClass = '';

            if (showResult) {
              if (index === question.correctIndex) {
                optionClass = 'correct';
              } else if (index === selectedAnswer) {
                optionClass = 'wrong';
              }
            }

            return (
              <button
                key={index}
                className={`troubleshooter-option ${optionClass}`}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>

                <span className="option-text">
                  {option}
                </span>

                {showResult &&
                  index === question.correctIndex && (
                    <span className="option-status">✓</span>
                  )}

                {showResult &&
                  index === selectedAnswer &&
                  index !== question.correctIndex && (
                    <span className="option-status">✕</span>
                  )}
              </button>
            );
          })}

        </div>

        {/* FEEDBACK */}
        {showResult && (
          <div
            className={`troubleshooter-feedback ${
              isCorrect ? 'success' : 'error'
            }`}
          >
            <div className="feedback-icon">
              {isCorrect ? '🎉' : '💡'}
            </div>

            <div className="feedback-content">
              <strong>
                {isCorrect
                  ? 'Jawabanmu benar!'
                  : 'Belum tepat!'}
              </strong>

              <p>
                {isCorrect
                  ? 'Analisis kamu sudah tepat. Kamu berhasil menemukan komponen yang perlu diperiksa.'
                  : question.hint}
              </p>
            </div>
          </div>
        )}

        {/* NEXT */}
        {showResult && (
          <div className="troubleshooter-actions">
            <button
              className="next-button"
              onClick={handleNextCase}
            >
              {currentCase + 1 >= troubleshootingCases.length
                ? '🏆 Lihat Hasil'
                : '➡️ Kasus Berikutnya'}
            </button>
          </div>
        )}

      </section>

    </div>
  );
}