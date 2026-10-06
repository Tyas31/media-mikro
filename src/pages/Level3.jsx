import React, { useEffect, useMemo, useState } from 'react';
import Card from '../components/Card';
import { level3Data } from '../data/gameLevel3';
import {
  playSound,
  startGameMusic,
  stopGameMusic,
} from '../utils/audio';
import '../styles/game.css';

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function sequenceToText(sequence) {
  return sequence.join('  →  ');
}

export default function Level3({
  setActiveTab,
  isMuted = false,
}) {
  const [round, setRound] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [wrong, setWrong] = useState(false);

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Mengambil 5 kasus secara acak dari data Level 3
  const currentCases = useMemo(() => {
    return shuffleArray(level3Data).slice(0, 5);
  }, [round]);

  const currentCase = currentCases[questionIndex];

  // Membuat 3 pilihan alur:
  // 1 benar + 2 pengecoh
  const sequenceOptions = useMemo(() => {
    if (!currentCase) return [];

    const wrongSequences = shuffleArray(
      level3Data.filter(
        (item) => item.id !== currentCase.id
      )
    )
      .slice(0, 2)
      .map((item) => item.sequence);

    return shuffleArray([
      currentCase.sequence,
      ...wrongSequences,
    ]);
  }, [currentCase]);

  // Mulai / hentikan soundtrack
  useEffect(() => {
    if (started && !finished && !gameOver && !isMuted) {
      startGameMusic();
    } else {
      stopGameMusic();
    }

    return () => {
      stopGameMusic();
    };
  }, [started, finished, gameOver, isMuted]);

  const handleStartGame = () => {
    playSound('click', isMuted);

    setStarted(true);
    setQuestionIndex(0);
    setLives(3);
    setScore(0);
    setSelectedAnswer(null);
    setWrong(false);
    setFinished(false);
    setGameOver(false);
  };

  const handleAnswer = (answer) => {
    if (
      !currentCase ||
      selectedAnswer ||
      gameOver ||
      finished
    ) {
      return;
    }

    setSelectedAnswer(answer);

    const isCorrect =
      JSON.stringify(answer) ===
      JSON.stringify(currentCase.sequence);

    if (isCorrect) {
      playSound('correct', isMuted);

      setWrong(false);
      setScore((prev) => prev + 20);

      setTimeout(() => {
        if (questionIndex + 1 >= currentCases.length) {
          stopGameMusic();
          setFinished(true);
        } else {
          setQuestionIndex((prev) => prev + 1);
          setSelectedAnswer(null);
          setWrong(false);
        }
      }, 800);
    } else {
      playSound('incorrect', isMuted);

      setWrong(true);

      const newLives = lives - 1;
      setLives(newLives);

      if (newLives <= 0) {
        setTimeout(() => {
          stopGameMusic();
          setGameOver(true);
        }, 800);
      } else {
        setTimeout(() => {
          setSelectedAnswer(null);
          setWrong(false);
        }, 900);
      }
    }
  };

  const nextRound = () => {
    stopGameMusic();

    setRound((prev) => prev + 1);
    setQuestionIndex(0);
    setLives(3);
    setScore(0);
    setSelectedAnswer(null);
    setWrong(false);
    setStarted(false);
    setFinished(false);
    setGameOver(false);
  };

  const goToHome = () => {
    stopGameMusic();
    setActiveTab('home');
  };

  const isExcellent = score >= 80;

  /*
   * Tampilan awal sebelum game dimulai
   */
  if (!started) {
    return (
      <div className="game-page container animate-fade-in">

        <div className="game-header">
          <h1>🎮 Level 3 — I/O Mission</h1>

          <p>
            Pecahkan kasus dan tentukan alur komunikasi
            I/O yang paling tepat.
          </p>
        </div>

        <Card title="🏆 Final Challenge">

          <div className="level3-start">

            <div className="level3-start-icon">
              🧠
            </div>

            <h2>
              Siap Menghadapi Tantangan Terakhir?
            </h2>

            <p>
              Kamu akan menghadapi <strong>5 kasus acak</strong>.
              Setiap kasus memiliki beberapa pilihan alur
              komunikasi I/O.
            </p>

            <div className="level3-rules">

              <div className="level3-rule">
                <span>❤️</span>
                <div>
                  <strong>3 Kesempatan</strong>
                  <small>
                    Jangan sampai semuanya habis.
                  </small>
                </div>
              </div>

              <div className="level3-rule">
                <span>⭐</span>
                <div>
                  <strong>100 Poin</strong>
                  <small>
                    Setiap jawaban benar bernilai 20 poin.
                  </small>
                </div>
              </div>

              <div className="level3-rule">
                <span>🎉</span>
                <div>
                  <strong>80+ = Luar Biasa!</strong>
                  <small>
                    Dapatkan skor memuaskan untuk membuka
                    perayaan kemenangan.
                  </small>
                </div>
              </div>

            </div>

            <button
              className="level3-start-button"
              onClick={handleStartGame}
            >
              🚀 Mulai Tantangan
            </button>

          </div>

        </Card>

      </div>
    );
  }

  /*
   * GAME OVER
   */
  if (gameOver) {
    return (
      <div className="game-page container animate-fade-in">

        <Card title="💔 Tantangan Selesai">

          <div className="level3-result">

            <div className="level3-result-icon">
              😵
            </div>

            <h2>
              Kesempatanmu Habis!
            </h2>

            <p>
              Jangan menyerah. Coba lagi dan perhatikan
              hubungan antara perangkat, sistem operasi,
              dan aplikasi.
            </p>

            <div className="level3-final-score">
              <span>Skor kamu</span>
              <strong>
                {score} / 100
              </strong>
            </div>

            <div className="game-actions">

              <button
                className="reset-game"
                onClick={nextRound}
              >
                🔄 Coba Lagi
              </button>

              <button
                className="next-level"
                onClick={goToHome}
              >
                ← Beranda
              </button>

            </div>

          </div>

        </Card>

      </div>
    );
  }

  /*
   * GAME SELESAI
   */
  if (finished) {
    return (
      <div className="game-page container animate-fade-in">

        {/* ================================
            PARTY POPPER CELEBRATION
            Muncul hanya jika skor 80+
        ================================= */}

        {isExcellent && (
          <>
            <style>{`
              .level3-celebration {
                position: fixed;
                inset: 0;
                pointer-events: none;
                overflow: hidden;
                z-index: 999;
              }

              /* =========================
                 PARTY POPPER KIRI & KANAN
              ========================== */

              .party-popper {
                position: absolute;
                bottom: 22%;
                width: 85px;
                height: 85px;
                z-index: 5;
                transform-origin: center;
              }

              .party-popper-left {
                left: 15px;
                transform: rotate(-28deg);
                animation: popper-left 0.7s ease-out forwards;
              }

              .party-popper-right {
                right: 15px;
                transform: rotate(28deg) scaleX(-1);
                animation: popper-right 0.7s ease-out forwards;
              }

              .party-popper-body {
                position: absolute;
                width: 65px;
                height: 45px;
                left: 10px;
                top: 20px;
                border-radius: 8px 30px 30px 8px;
                background: linear-gradient(
                  135deg,
                  #ff5c8a,
                  #ff9f43
                );
                box-shadow:
                  0 8px 18px rgba(0, 0, 0, 0.18);
              }

              .party-popper-body::before {
                content: '';
                position: absolute;
                width: 15px;
                height: 15px;
                left: 7px;
                top: 15px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.35);
              }

              .party-popper-opening {
                position: absolute;
                width: 28px;
                height: 28px;
                right: -7px;
                top: 28px;
                border-radius: 50%;
                background: #7b61ff;
                border: 4px solid #ffffff;
                box-shadow: 0 3px 8px rgba(0, 0, 0, 0.18);
              }

              .party-popper-ribbon {
                position: absolute;
                width: 48px;
                height: 8px;
                left: 17px;
                top: 14px;
                border-radius: 10px;
                background: #ffffff;
                opacity: 0.8;
              }

              @keyframes popper-left {
                0% {
                  transform: rotate(-28deg) scale(0.7);
                  opacity: 0;
                }

                100% {
                  transform: rotate(-28deg) scale(1);
                  opacity: 1;
                }
              }

              @keyframes popper-right {
                0% {
                  transform: rotate(28deg) scaleX(-1) scale(0.7);
                  opacity: 0;
                }

                100% {
                  transform: rotate(28deg) scaleX(-1) scale(1);
                  opacity: 1;
                }
              }

              /* =========================
                 CONFETTI
              ========================== */

              .celebration-confetti {
                position: absolute;
                inset: 0;
                overflow: hidden;
              }

              .celebration-piece {
                position: absolute;
                top: 0;
                left: var(--start-x);
                width: var(--size);
                height: calc(var(--size) * 1.8);
                border-radius: 2px;
                background: var(--piece-color);
                opacity: 0;
                transform: translate(0, 0) rotate(0deg);
                animation:
                  confetti-burst var(--duration) cubic-bezier(.2,.8,.3,1)
                  var(--delay) forwards;
              }

              .celebration-piece:nth-child(3n) {
                border-radius: 50%;
                height: var(--size);
              }

              .celebration-piece:nth-child(4n) {
                transform: rotate(45deg);
              }

              @keyframes confetti-burst {
                0% {
                  opacity: 0;
                  transform:
                    translate(
                      var(--origin-x),
                      var(--origin-y)
                    )
                    rotate(0deg)
                    scale(0.4);
                }

                12% {
                  opacity: 1;
                }

                35% {
                  transform:
                    translate(
                      var(--burst-x),
                      var(--burst-y)
                    )
                    rotate(180deg)
                    scale(1);
                }

                65% {
                  opacity: 1;
                  transform:
                    translate(
                      var(--fall-x),
                      55vh
                    )
                    rotate(420deg);
                }

                100% {
                  opacity: 0;
                  transform:
                    translate(
                      var(--fall-x),
                      110vh
                    )
                    rotate(720deg);
                }
              }

              /* =========================
                 CELEBRATION TEXT
              ========================== */

              .level3-celebration-message {
                position: absolute;
                top: 13%;
                left: 50%;
                transform: translateX(-50%);
                z-index: 4;
                text-align: center;
                white-space: nowrap;
                animation: celebration-message 0.8s
                  cubic-bezier(.17,.89,.32,1.28) forwards;
              }

              .level3-celebration-message h1 {
                margin: 0;
                font-size: clamp(2rem, 5vw, 4rem);
                font-weight: 900;
                color: var(--dark-blue);
                text-shadow:
                  0 4px 0 rgba(255, 255, 255, 0.9),
                  0 8px 20px rgba(0, 0, 0, 0.12);
              }

              .level3-celebration-message p {
                margin: 8px 0 0;
                font-size: 1rem;
                font-weight: 700;
                color: var(--text-dark);
              }

              @keyframes celebration-message {
                0% {
                  opacity: 0;
                  transform:
                    translateX(-50%)
                    translateY(-30px)
                    scale(0.7);
                }

                70% {
                  transform:
                    translateX(-50%)
                    translateY(5px)
                    scale(1.05);
                }

                100% {
                  opacity: 1;
                  transform:
                    translateX(-50%)
                    translateY(0)
                    scale(1);
                }
              }

              /* Supaya celebration tidak terlalu mengganggu
                 isi kartu hasil */
              .level3-result-celebration {
                position: relative;
                z-index: 2;
              }

              @media (max-width: 600px) {
                .party-popper {
                  width: 65px;
                  height: 65px;
                  bottom: 18%;
                }

                .party-popper-left {
                  left: -8px;
                }

                .party-popper-right {
                  right: -8px;
                }

                .party-popper-body {
                  width: 50px;
                  height: 35px;
                }

                .party-popper-opening {
                  width: 22px;
                  height: 22px;
                  top: 25px;
                }

                .level3-celebration-message {
                  top: 10%;
                  white-space: normal;
                  width: 90%;
                }
              }
            `}</style>

            <div className="level3-celebration">

              {/* PESAN */}
              <div className="level3-celebration-message">
                <h1>🎉 Luar Biasa! 🎉</h1>
                <p>
                  Kamu berhasil menyelesaikan Final Challenge!
                </p>
              </div>

              {/* PARTY POPPER KIRI */}
              <div className="party-popper party-popper-left">
                <div className="party-popper-body">
                  <div className="party-popper-ribbon" />
                </div>

                <div className="party-popper-opening" />
              </div>

              {/* PARTY POPPER KANAN */}
              <div className="party-popper party-popper-right">
                <div className="party-popper-body">
                  <div className="party-popper-ribbon" />
                </div>

                <div className="party-popper-opening" />
              </div>

              {/* CONFETTI */}
              <div className="celebration-confetti">

                {Array.from({ length: 50 }).map((_, index) => {
                  const fromLeft = index % 2 === 0;

                  const colors = [
                    '#ff5c8a',
                    '#ffcf4a',
                    '#7b61ff',
                    '#36cfc9',
                    '#ff8a4c',
                    '#5c8dff',
                  ];

                  const startX = fromLeft
                    ? `${8 + (index % 5) * 2}%`
                    : `${92 - (index % 5) * 2}%`;

                  const originX = fromLeft
                    ? `${index % 6 * 8}px`
                    : `-${index % 6 * 8}px`;

                  const burstX = fromLeft
                    ? `${40 + (index % 5) * 4}vw`
                    : `-${40 + (index % 5) * 4}vw`;

                  const fallX = fromLeft
                    ? `${25 + (index % 7) * 5}vw`
                    : `-${25 + (index % 7) * 5}vw`;

                  return (
                    <span
                      key={index}
                      className="celebration-piece"
                      style={{
                        '--start-x': startX,
                        '--origin-x': originX,
                        '--origin-y': '22vh',
                        '--burst-x': burstX,
                        '--burst-y': `${8 + (index % 5) * 5}vh`,
                        '--fall-x': fallX,
                        '--size': `${6 + (index % 5)}px`,
                        '--piece-color':
                          colors[index % colors.length],
                        '--duration':
                          `${3.5 + (index % 5) * 0.35}s`,
                        '--delay':
                          `${(index % 10) * 0.04}s`,
                      }}
                    />
                  );
                })}

              </div>
            </div>
          </>
        )}

        <Card title="🏆 Hasil Tantangan">

          <div className="level3-result level3-result-celebration">

            <div className="level3-result-icon">
              {isExcellent ? '🎉' : '👏'}
            </div>

            <h2>
              {isExcellent
                ? 'Luar Biasa!'
                : 'Tantangan Selesai!'}
            </h2>

            <p>
              {isExcellent
                ? 'Kamu berhasil memahami alur komunikasi I/O dengan sangat baik!'
                : 'Kamu sudah menyelesaikan semua tantangan. Terus tingkatkan pemahamanmu!'}
            </p>

            <div className="level3-final-score">
              <span>Skor Akhir</span>

              <strong>
                {score} / 100
              </strong>
            </div>

            <div className="level3-score-message">
              {score >= 80 &&
                '🏆 Pemahamanmu sangat baik!'}
              {score >= 60 &&
                score < 80 &&
                '👏 Bagus! Sedikit lagi menuju skor maksimal.'}
              {score < 60 &&
                '💪 Jangan berhenti belajar. Coba lagi untuk meningkatkan skor.'}
            </div>

            <div className="game-actions">

              <button
                className="reset-game"
                onClick={nextRound}
              >
                🔄 Tantangan Baru
              </button>

              <button
                className="next-level"
                onClick={goToHome}
              >
                ✓ Selesai
              </button>

            </div>

          </div>

        </Card>

      </div>
    );
  }

  return (
    <div className="game-page container animate-fade-in">

      {/* HEADER */}
      <div className="game-header">
        <h1>🎮 Level 3 — I/O Mission</h1>

        <p>
          Analisis kasus dan tentukan alur komunikasi I/O
          yang paling tepat.
        </p>
      </div>

      <Card title="🧠 Pecahkan Kasus I/O">

        {/* STATUS */}
        <div className="level3-status">

          <div className="level3-status-item">
            <span>Kasus</span>

            <strong>
              {questionIndex + 1}
              <small> / {currentCases.length}</small>
            </strong>
          </div>

          <div className="level3-status-item">
            <span>Kesempatan</span>

            <strong>
              {'❤️'.repeat(lives)}
              {'🖤'.repeat(3 - lives)}
            </strong>
          </div>

          <div className="level3-status-item">
            <span>Skor</span>

            <strong>
              ⭐ {score}
            </strong>
          </div>

        </div>

        {/* PROGRESS */}
        <div className="level3-progress">

          <div
            className="level3-progress-bar"
            style={{
              width: `${
                ((questionIndex + 1) /
                  currentCases.length) *
                100
              }%`,
            }}
          />

        </div>

        {/* INSTRUKSI */}
        <div className="game-instruction">
          <span>3</span>

          Baca kasus dengan teliti, kemudian pilih alur I/O
          yang paling sesuai.
        </div>

        {/* KASUS */}
        <div className="level3-case-card">

          <div className="level3-case-number">
            Kasus {questionIndex + 1}
          </div>

          <h2>
            {currentCase.title}
          </h2>

          <p>
            {currentCase.description}
          </p>

          <div className="level3-question">
            💡 Alur komunikasi I/O manakah yang paling tepat?
          </div>

        </div>

        {/* PILIHAN ALUR */}
        <div className="level3-options">

          {sequenceOptions.map(
            (sequence, index) => {

              const isSelected =
                selectedAnswer &&
                JSON.stringify(selectedAnswer) ===
                  JSON.stringify(sequence);

              const isCorrect =
                JSON.stringify(sequence) ===
                JSON.stringify(currentCase.sequence);

              let optionClass =
                'level3-option';

              if (
                isSelected &&
                isCorrect
              ) {
                optionClass +=
                  ' level3-option-correct';
              }

              if (
                isSelected &&
                !isCorrect
              ) {
                optionClass +=
                  ' level3-option-wrong';
              }

              return (
                <button
                  key={`${currentCase.id}-${index}`}
                  className={optionClass}
                  onClick={() =>
                    handleAnswer(sequence)
                  }
                  disabled={
                    selectedAnswer !== null
                  }
                >

                  <div className="level3-option-header">

                    <span className="level3-option-number">
                      {String.fromCharCode(
                        65 + index
                      )}
                    </span>

                    <span>
                      Pilihan Alur {index + 1}
                    </span>

                  </div>

                  <div className="level3-sequence">

                    {sequence.map(
                      (step, stepIndex) => (
                        <React.Fragment
                          key={`${step}-${stepIndex}`}
                        >

                          <span className="level3-sequence-step">
                            {step}
                          </span>

                          {stepIndex <
                            sequence.length - 1 && (
                            <span className="level3-arrow">
                              →
                            </span>
                          )}

                        </React.Fragment>
                      )
                    )}

                  </div>

                  {isSelected && isCorrect && (
                    <span className="level3-answer-icon">
                      ✓
                    </span>
                  )}

                  {isSelected && !isCorrect && (
                    <span className="level3-answer-icon">
                      ✕
                    </span>
                  )}

                </button>
              );
            }
          )}

        </div>

        {/* FEEDBACK */}
        {wrong && (
          <div className="game-feedback wrong">
            ❌ Alur belum tepat. Perhatikan dari mana data
            berasal, bagaimana sistem operasi mengelolanya,
            dan ke mana data tersebut dikirim.
          </div>
        )}

      </Card>

    </div>
  );
}