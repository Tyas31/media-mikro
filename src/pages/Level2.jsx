import React, { useMemo, useState } from 'react';
import Card from '../components/Card';
import { level2Data } from '../data/gameLevel2';
import { playSound } from '../utils/audio';
import '../styles/game.css';

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function getDeviceIcon(device) {
  const icons = {
    Keyboard: '⌨️',
    Mouse: '🖱️',
    Microphone: '🎤',
    Scanner: '📄',
    Webcam: '📷',
    Monitor: '🖥️',
    Printer: '🖨️',
    Speaker: '🔊',
    Headphone: '🎧',
    Projector: '📽️',
  };

  return icons[device] || '💻';
}

export default function Level2({ setActiveTab }) {
  const [round, setRound] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [wrong, setWrong] = useState(false);
  const [finished, setFinished] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Mengambil 6 perangkat secara acak dari 10 perangkat
  const currentData = useMemo(() => {
    return shuffleArray(level2Data).slice(0, 6);
  }, [round]);

  // Data soal yang sedang dimainkan
  const currentQuestion = currentData[questionIndex];

  // Membuat 4 pilihan jawaban untuk soal saat ini
  const answerOptions = useMemo(() => {
    if (!currentQuestion) return [];

    const wrongAnswers = shuffleArray(
      level2Data.filter(
        (item) => item.id !== currentQuestion.id
      )
    )
      .slice(0, 3)
      .map((item) => item.function);

    return shuffleArray([
      currentQuestion.function,
      ...wrongAnswers,
    ]);
  }, [currentQuestion]);

  const handleAnswer = (answer) => {
    if (!currentQuestion || selectedAnswer || gameOver) {
      return;
    }

    setSelectedAnswer(answer);

    const isCorrect = answer === currentQuestion.function;

    if (isCorrect) {
      playSound('correct');

      setWrong(false);
      setScore((prev) => prev + 100);

      setTimeout(() => {
        if (questionIndex + 1 >= currentData.length) {
          setFinished(true);
        } else {
          setQuestionIndex((prev) => prev + 1);
          setSelectedAnswer(null);
          setWrong(false);
        }
      }, 700);
    } else {
      playSound('incorrect');

      setWrong(true);

      const newLives = lives - 1;
      setLives(newLives);

      if (newLives <= 0) {
        setTimeout(() => {
          setGameOver(true);
        }, 700);
      } else {
        setTimeout(() => {
          setSelectedAnswer(null);
          setWrong(false);
        }, 900);
      }
    }
  };

  const nextRound = () => {
    setRound((prev) => prev + 1);
    setQuestionIndex(0);
    setLives(3);
    setScore(0);
    setSelectedAnswer(null);
    setWrong(false);
    setFinished(false);
    setGameOver(false);
  };

  const goToLevel3 = () => {
    setActiveTab('level3');
  };

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="game-page container animate-fade-in">

      {/* HEADER */}
      <div className="game-header">
        <h1>🎮 Level 2 — Misi Fungsi Perangkat</h1>

        <p>
          Pahami fungsi setiap perangkat dan pilih jawaban
          yang paling tepat.
        </p>
      </div>

      <Card title="🧠 Tantangan Fungsi I/O">

        {/* STATUS GAME */}
        <div className="level2-status">

          <div className="level2-status-item">
            <span className="status-label">Soal</span>

            <strong>
              {finished
                ? currentData.length
                : questionIndex + 1}
              /{currentData.length}
            </strong>
          </div>

          <div className="level2-status-item">
            <span className="status-label">Kesempatan</span>

            <strong>
              {'❤️'.repeat(lives)}
              {'🖤'.repeat(3 - lives)}
            </strong>
          </div>

          <div className="level2-status-item">
            <span className="status-label">Skor</span>

            <strong>⭐ {score}</strong>
          </div>

        </div>

        {/* INSTRUKSI */}
        <div className="game-instruction">
          <span>2</span>

          Baca perangkat yang ditampilkan, lalu pilih fungsi
          yang paling tepat.
        </div>

        {/* GAME */}
        {!finished && !gameOver && (
          <div className="level2-quiz">

            {/* PERANGKAT */}
            <div className="level2-device-card">

              <div className="level2-device-icon">
                {getDeviceIcon(currentQuestion.device)}
              </div>

              <div className="level2-device-info">

                <span className="level2-question-label">
                  PERANGKAT
                </span>

                <h2>
                  {currentQuestion.device}
                </h2>

                <p>
                  Apa fungsi utama perangkat ini dalam
                  sistem komputer?
                </p>

              </div>

            </div>

            {/* PILIHAN */}
            <div className="level2-answer-section">

              <h3>
                Pilih jawaban yang paling tepat:
              </h3>

              <div className="level2-options">

                {answerOptions.map((answer, index) => {

                  const isCorrect =
                    answer === currentQuestion.function;

                  const isSelected =
                    selectedAnswer === answer;

                  let optionClass = 'level2-option';

                  if (isSelected && isCorrect) {
                    optionClass += ' option-correct';
                  }

                  if (isSelected && !isCorrect) {
                    optionClass += ' option-wrong';
                  }

                  return (
                    <button
                      key={`${answer}-${index}`}
                      className={optionClass}
                      onClick={() => handleAnswer(answer)}
                      disabled={selectedAnswer !== null}
                    >

                      <span className="option-number">
                        {String.fromCharCode(65 + index)}
                      </span>

                      <span className="option-text">
                        {answer}
                      </span>

                      {isSelected && isCorrect && (
                        <span className="option-icon">
                          ✓
                        </span>
                      )}

                      {isSelected && !isCorrect && (
                        <span className="option-icon">
                          ✕
                        </span>
                      )}

                    </button>
                  );
                })}

              </div>

            </div>

          </div>
        )}

        {/* FEEDBACK SALAH */}
        {wrong && !gameOver && (
          <div className="game-feedback wrong">
            ❌ Jawaban belum tepat. Kesempatanmu berkurang.
            Coba lebih teliti!
          </div>
        )}

        {/* GAME OVER */}
        {gameOver && (
          <div className="level2-result">

            <div className="level2-result-icon">
              💔
            </div>

            <h2>
              Kesempatanmu Habis!
            </h2>

            <p>
              Jangan menyerah. Coba lagi dan pahami fungsi
              setiap perangkat sebelum menjawab.
            </p>

            <div className="level2-final-score">
              Skor kamu
              <strong>
                ⭐ {score}
              </strong>
            </div>

            <button
              className="reset-game"
              onClick={nextRound}
            >
              🔄 Coba Lagi
            </button>

          </div>
        )}

        {/* SELESAI */}
        {finished && (
          <div className="level2-result">

            <div className="level2-result-icon">
              🎉
            </div>

            <h2>
              Misi Berhasil!
            </h2>

            <p>
              Kamu berhasil memahami fungsi perangkat I/O
              dengan baik.
            </p>

            <div className="level2-final-score">
              Skor akhir
              <strong>
                ⭐ {score}
              </strong>
            </div>

            <div className="game-actions">

              <button
                className="reset-game"
                onClick={nextRound}
              >
                🔄 Main Lagi
              </button>

              <button
                className="next-level"
                onClick={goToLevel3}
              >
                Level 3 →
              </button>

            </div>

          </div>
        )}

      </Card>

    </div>
  );
}