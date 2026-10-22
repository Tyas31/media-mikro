
import React, { useMemo, useState } from 'react';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import { evaluationQuestions } from '../data/evaluationQuestions';
import { playSound } from '../utils/audio';
import { getProgress, saveProgress } from '../utils/progress';
import { getPerformanceCategory } from '../utils/scoring';
import '../styles/evaluation.css';

const shuffleArray = (array) => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

const createQuiz = () => {
  const selectedQuestions = shuffleArray(evaluationQuestions).slice(
    0,
    Math.min(10, evaluationQuestions.length)
  );

  return selectedQuestions.map((question) => {
    const options = question.options || [];
    const correctAnswer = question.correctAnswer;

    const shuffledOptions = shuffleArray(
      options.map((option, index) => ({
        option,
        isCorrect:
          index === correctAnswer ||
          option === correctAnswer,
      }))
    );

    return {
      ...question,
      options: shuffledOptions.map((item) => item.option),
      correctAnswer: shuffledOptions.findIndex(
        (item) => item.isCorrect
      ),
    };
  });
};

export default function Evaluation() {
  const questions = useMemo(() => createQuiz(), []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(null);

  const question = questions[currentQuestion];
  const totalQuestions = questions.length;

  const handleAnswer = (index) => {
    if (showResult || finished) return;

    setSelectedAnswer(index);
    setShowResult(true);

    const isCorrect = index === question.correctAnswer;

    if (isCorrect) {
      setScore((previousScore) => previousScore + 1);
      playSound('correct');
    } else {
      playSound('wrong');
    }
  };

  const handleNext = () => {
    if (!showResult) return;

    if (currentQuestion + 1 < totalQuestions) {
      setCurrentQuestion((previous) => previous + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      return;
    }

    const calculatedScore = Math.round(
      (score / totalQuestions) * 100
    );

    const progress = getProgress();
    const previousEvaluation = progress.evaluation || {};
    const category = getPerformanceCategory(calculatedScore);

    const updatedProgress = {
      ...progress,
      evaluation: {
        ...previousEvaluation,
        attempts: (previousEvaluation.attempts || 0) + 1,
        lastScore: calculatedScore,
        highScore: Math.max(
          previousEvaluation.highScore || 0,
          calculatedScore
        ),
        lastCategory: category.label,
      },
    };

    saveProgress(updatedProgress);

    setFinalScore(calculatedScore);
    setFinished(true);
    playSound('finish');
  };

  const handleRestart = () => {
    window.location.reload();
  };

  if (!totalQuestions) {
    return (
      <div className="evaluation-page container">
        <Card>
          <h2>Soal Belum Tersedia</h2>
          <p>Silakan periksa kembali data evaluationQuestions.js.</p>
        </Card>
      </div>
    );
  }

  if (finished) {
    const category = getPerformanceCategory(finalScore);

    return (
      <div className="evaluation-page container animate-fade-in">
        <div className="page-header">
          <h1>Evaluasi Selesai!</h1>
          <p>Kamu sudah menyelesaikan seluruh soal evaluasi.</p>
        </div>

        <Card className="evaluation-result-card">
          <div className="evaluation-final-score">
            <span className="evaluation-score-number">
              {finalScore}
            </span>
            <span className="evaluation-score-label">
              dari 100 poin
            </span>
          </div>

          <h2 style={{ color: category.color }}>
            {category.label}
          </h2>

          <p>
            Kamu menjawab {score} dari {totalQuestions} soal
            dengan benar.
          </p>

          <ProgressBar progress={finalScore} />

          <p>
            {finalScore >= 80
              ? 'Bagus! Kamu sudah memahami sebagian besar materi manajemen sistem input/output.'
              : 'Jangan menyerah! Pelajari kembali materi, lalu coba evaluasi lagi.'}
          </p>

          <div className="evaluation-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleRestart}
            >
              Ulangi Evaluasi
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="evaluation-page container animate-fade-in">
      <div className="page-header">
        <h1>Evaluasi Pembelajaran</h1>
        <p>
          Uji pemahamanmu tentang manajemen sistem input/output.
        </p>
      </div>

      <Card className="evaluation-card">
        <div className="evaluation-progress">
          <span>
            Soal {currentQuestion + 1} dari {totalQuestions}
          </span>

          <span>
            Benar: {score}
          </span>
        </div>

        <ProgressBar
          progress={((currentQuestion + 1) / totalQuestions) * 100}
        />

        <div className="evaluation-question">
          <h2>{question.question}</h2>

          <div className="evaluation-options">
            {question.options.map((option, index) => {
              let optionClass = 'evaluation-option';

              if (showResult && index === question.correctAnswer) {
                optionClass += ' correct';
              } else if (
                showResult &&
                index === selectedAnswer &&
                index !== question.correctAnswer
              ) {
                optionClass += ' incorrect';
              } else if (selectedAnswer === index) {
                optionClass += ' selected';
              }

              return (
                <button
                  key={`${currentQuestion}-${index}`}
                  type="button"
                  className={optionClass}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {showResult && (
            <div
              className={`evaluation-feedback ${
                selectedAnswer === question.correctAnswer
                  ? 'feedback-correct'
                  : 'feedback-incorrect'
              }`}
            >
              <h3>
                {selectedAnswer === question.correctAnswer
                  ? 'Jawaban benar!'
                  : 'Belum tepat!'}
              </h3>

              <p>
                {question.explanation ||
                  (selectedAnswer === question.correctAnswer
                    ? 'Bagus, jawabanmu sudah tepat.'
                    : `Jawaban yang benar adalah: ${
                        question.options[question.correctAnswer]
                      }.`)}
              </p>
            </div>
          )}
        </div>

        <div className="evaluation-actions">
          {!showResult ? (
            <p className="evaluation-instruction">
              Pilih satu jawaban untuk melanjutkan.
            </p>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleNext}
            >
              {currentQuestion + 1 === totalQuestions
                ? 'Lihat Hasil'
                : 'Soal Berikutnya'}
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}
