import React, { useMemo, useState } from 'react';
import { evaluationQuestions } from '../data/evaluationQuestions';
import { playSound } from '../utils/audio';
import '../styles/evaluation.css';

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function Evaluation() {
  const questions = useMemo(
    () => shuffleArray(evaluationQuestions).slice(0, 10),
    []
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = (index) => {
    if (showResult) return;

    setSelectedAnswer(index);
    setShowResult(true);

    if (index === question.correctAnswer) {
      setScore((prev) => prev + 10);
      playSound('correct');
    } else {
      playSound('incorrect');
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 >= questions.length) {
      setFinished(true);
      playSound('finish');
      return;
    }

    setCurrentQuestion((prev) => prev + 1);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleRestart = () => {
    window.location.reload();
  };

  if (finished) {
    return (
      <div className="evaluation-page container animate-fade-in">
        <div className="evaluation-final">
          <div className="evaluation-final-icon">🏆</div>

          <h1>Evaluasi Selesai!</h1>

          <p>
            Kamu telah menyelesaikan 10 soal evaluasi pembelajaran.
          </p>

          <div className="evaluation-final-score">
            <span>Skor Kamu</span>
            <strong>{score} / 100</strong>
          </div>

          <div className="evaluation-final-message">
            {score >= 80
              ? '🔥 Sangat bagus! Kamu sudah memahami materi manajemen I/O dengan baik.'
              : score >= 60
              ? '👍 Bagus! Tingkatkan lagi pemahamanmu dengan mempelajari kembali materi.'
              : '💪 Jangan menyerah! Yuk pelajari kembali materi manajemen I/O.'}
          </div>

          <button
            className="evaluation-restart"
            onClick={handleRestart}
          >
            🔄 Ulangi Evaluasi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="evaluation-page container animate-fade-in">

      {/* HEADER */}
      <div className="evaluation-header">
        <div className="evaluation-header-icon">
          📝
        </div>

        <div>
          <h1>Evaluasi Pembelajaran</h1>
          <p>
            Uji pemahamanmu tentang manajemen sistem I/O melalui 10 soal pilihan ganda.
          </p>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="evaluation-progress">
        <div>
          <span>Soal</span>
          <strong>
            {currentQuestion + 1}
            <small> / {questions.length}</small>
          </strong>
        </div>

        <div className="evaluation-score">
          ⭐ {score} poin
        </div>
      </div>

      {/* QUESTION */}
      <section className="evaluation-card">

        <div className="evaluation-question-heading">
          <div className="question-number">
            {currentQuestion + 1}
          </div>

          <div>
            <span>PERTANYAAN</span>
            <h2>{question.question}</h2>
          </div>
        </div>

        {/* OPTIONS */}
        <div className="evaluation-options">
          {question.options.map((option, index) => {
            let optionClass = '';

            if (showResult) {
              if (index === question.correctAnswer) {
                optionClass = 'correct';
              } else if (index === selectedAnswer) {
                optionClass = 'wrong';
              }
            }

            return (
              <button
                key={index}
                className={`evaluation-option ${optionClass}`}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
              >
                <span className="evaluation-option-letter">
                  {String.fromCharCode(65 + index)}
                </span>

                <span className="evaluation-option-text">
                  {option}
                </span>

                {showResult &&
                  index === question.correctAnswer && (
                    <span className="evaluation-option-status">
                      ✓
                    </span>
                  )}

                {showResult &&
                  index === selectedAnswer &&
                  index !== question.correctAnswer && (
                    <span className="evaluation-option-status">
                      ✕
                    </span>
                  )}
              </button>
            );
          })}
        </div>

        {/* FEEDBACK */}
        {showResult && (
          <div
            className={`evaluation-feedback ${
              selectedAnswer === question.correctAnswer
                ? 'success'
                : 'error'
            }`}
          >
            <div className="evaluation-feedback-icon">
              {selectedAnswer === question.correctAnswer
                ? '🎉'
                : '💡'}
            </div>

            <div>
              <strong>
                {selectedAnswer === question.correctAnswer
                  ? 'Jawabanmu benar!'
                  : 'Jawabanmu belum tepat!'}
              </strong>

              <p>
                {selectedAnswer === question.correctAnswer
                  ? 'Bagus! Kamu memahami konsep yang ditanyakan.'
                  : `Jawaban yang benar adalah ${String.fromCharCode(
                      65 + question.correctAnswer
                    )}.`}
              </p>
            </div>
          </div>
        )}

        {/* NEXT */}
        {showResult && (
          <div className="evaluation-action">
            <button
              className="evaluation-next"
              onClick={handleNext}
            >
              {currentQuestion + 1 >= questions.length
                ? '🏆 Lihat Hasil'
                : '➡️ Soal Berikutnya'}
            </button>
          </div>
        )}

      </section>
    </div>
  );
}