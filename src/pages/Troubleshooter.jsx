import React, { useState } from 'react';
import { troubleshootingCases } from '../data/troubleshootingCases.js';
import { playSound } from '../utils/audio';
import '../styles/troubleshooter.css';

export default function Troubleshooter() {
  const [currentCase, setCurrentCase] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const caseData = troubleshootingCases[currentCase];
  const stages = caseData?.stages || [];
  const question = stages[currentStage];

  const totalQuestions = troubleshootingCases.reduce(
    (total, item) => total + item.stages.length,
    0
  );

  const finalScore =
    totalQuestions > 0
      ? Math.round((score / totalQuestions) * 100)
      : 0;

  const completedBefore =
    troubleshootingCases
      .slice(0, currentCase)
      .reduce((total, item) => total + item.stages.length, 0) +
    currentStage;

  const handleAnswer = (index) => {
    if (showResult || !question) return;

    setSelectedAnswer(index);
    setShowResult(true);

    if (index === question.correctIndex) {
      setScore((previous) => previous + 1);
      playSound('correct');
    } else {
      playSound('incorrect');
    }
  };

  const handleNext = () => {
    if (currentStage + 1 < stages.length) {
      setCurrentStage((previous) => previous + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      return;
    }

    if (currentCase + 1 < troubleshootingCases.length) {
      setCurrentCase((previous) => previous + 1);
      setCurrentStage(0);
      setSelectedAnswer(null);
      setShowResult(false);
      return;
    }

    setFinished(true);
  };

  const handleRestart = () => {
    setCurrentCase(0);
    setCurrentStage(0);
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

          <h2>Semua Latihan Selesai!</h2>

          <p>
            Kamu telah menyelesaikan latihan analisis masalah
            manajemen Input/Output.
          </p>

          <div className="final-score">
            <span>Skor Kamu</span>
            <strong>{finalScore} / 100</strong>
            <p>
              {score} dari {totalQuestions} soal dijawab dengan benar.
            </p>
          </div>

          <div className="final-message">
            {finalScore === 100
              ? '🔥 Hebat! Semua jawabanmu benar.'
              : finalScore >= 70
              ? '👍 Bagus! Kamu sudah memahami sebagian besar konsep I/O.'
              : '💪 Tetap semangat! Pelajari kembali materi I/O dan coba lagi.'}
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

  if (!caseData || !question || totalQuestions === 0) {
    return (
      <div className="troubleshooter-page">
        <p>
          Data kasus belum tersedia. Periksa file
          TroubleshootingCases.js.
        </p>
      </div>
    );
  }

  const isCorrect =
    selectedAnswer !== null &&
    selectedAnswer === question.correctIndex;

  const completedQuestions = completedBefore + (showResult ? 1 : 0);

  const progress = Math.min(
    (completedQuestions / totalQuestions) * 100,
    100
  );

  return (
    <div className="troubleshooter-page">
      <div className="troubleshooter-header">
        <div className="troubleshooter-header-icon">🔧</div>

        <div>
          <h1>I/O Troubleshooter</h1>
          <p>
            Telusuri alur komunikasi I/O dan analisis kemungkinan
            penyebab gangguan.
          </p>
        </div>
      </div>

      <div className="troubleshooter-progress">
        <div className="case-progress">
          <span>Studi Kasus</span>
          <strong>
            {currentCase + 1}
            <small> / {troubleshootingCases.length}</small>
          </strong>
          <p>
            Tahap {currentStage + 1} dari {stages.length}
          </p>
        </div>

        <div className="troubleshooter-point">
          ⭐ {score} benar
        </div>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
          Progres latihan: {completedQuestions} dari {totalQuestions} soal
        </p>

        <div
          style={{
            width: '100%',
            height: '8px',
            background: '#e5e7eb',
            borderRadius: '999px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: '#2563eb',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>

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

      <section className="troubleshooter-question">
        <div className="question-heading">
          <div className="question-icon">💡</div>

          <div>
            <span>TAHAP {currentStage + 1}: ANALISIS</span>
            <h2>{question.question}</h2>
          </div>
        </div>

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

                <span className="option-text">{option}</span>

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
                {isCorrect ? 'Jawabanmu benar!' : 'Belum tepat!'}
              </strong>

              <p>
                {isCorrect
                  ? question.explanation ||
                    'Jawabanmu sesuai dengan konsep manajemen I/O.'
                  : question.hint ||
                    question.explanation ||
                    'Coba pelajari kembali materi manajemen I/O.'}
              </p>
            </div>
          </div>
        )}

        {showResult && (
          <div className="troubleshooter-actions">
            <button className="next-button" onClick={handleNext}>
              {currentStage + 1 < stages.length
                ? '➡️ Tahap Berikutnya'
                : currentCase + 1 < troubleshootingCases.length
                ? '➡️ Kasus Berikutnya'
                : '🏆 Lihat Hasil'}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
