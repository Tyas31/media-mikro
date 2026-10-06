import React, { useMemo, useState } from 'react';
import Card from '../components/Card';
import { playSound } from '../utils/audio';
import '../styles/game.css';

const gameData = [
  { id: 1, left: 'Keyboard', right: 'Perangkat Input' },
  { id: 2, left: 'Mouse', right: 'Perangkat Input' },
  { id: 3, left: 'Microphone', right: 'Perangkat Input' },
  { id: 4, left: 'Monitor', right: 'Perangkat Output' },
  { id: 5, left: 'Printer', right: 'Perangkat Output' },
  { id: 6, left: 'Speaker', right: 'Perangkat Output' },
  { id: 7, left: 'Scanner', right: 'Perangkat Input' },
  { id: 8, left: 'Projector', right: 'Perangkat Output' },
];

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function Game({ setActiveTab, isMuted = false }) {
  const [round, setRound] = useState(0);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches, setMatches] = useState([]);
  const [wrong, setWrong] = useState(false);

  const currentData = useMemo(() => {
    return shuffleArray(gameData).slice(0, 4);
  }, [round]);

  const shuffledData = useMemo(() => {
    return shuffleArray(currentData);
  }, [currentData]);

  // =========================
  // PILIH PERANGKAT KIRI
  // =========================
  const handleLeftClick = (item) => {
    if (matches.some((match) => match.leftId === item.id)) {
      return;
    }

    setSelectedLeft(item);
    setWrong(false);

    playSound('click', isMuted);
  };

  // =========================
  // PILIH JAWABAN KANAN
  // =========================
  const handleRightClick = (item) => {
    if (!selectedLeft) {
      return;
    }

    if (matches.some((match) => match.rightId === item.id)) {
      return;
    }

    const isCorrect = selectedLeft.right === item.right;

    // =========================
    // JAWABAN BENAR
    // =========================
    if (isCorrect) {
      const newMatches = [
        ...matches,
        {
          leftId: selectedLeft.id,
          rightId: item.id,
        },
      ];

      setMatches(newMatches);
      setSelectedLeft(null);
      setWrong(false);

      // SUARA BENAR
      playSound('correct', isMuted);

      // Kalau semua selesai
      if (newMatches.length === currentData.length) {
        setTimeout(() => {
          playSound('finish', isMuted);
        }, 250);
      }
    }

    // =========================
    // JAWABAN SALAH
    // =========================
    else {
      setWrong(true);

      // SUARA SALAH
      playSound('incorrect', isMuted);
    }
  };

  // =========================
  // ULANGI GAME
  // =========================
  const resetGame = () => {
    setRound((prev) => prev + 1);
    setSelectedLeft(null);
    setMatches([]);
    setWrong(false);

    playSound('click', isMuted);
  };

  const isFinished = matches.length === currentData.length;

  // =========================
  // KE LEVEL 2
  // =========================
  const goToLevel2 = () => {
    playSound('click', isMuted);

    setActiveTab('level2');
  };

  return (
    <div className="game-page container animate-fade-in">

      <div className="game-header">
        <h1>🎮 Level 1 — Kenali Perangkat I/O</h1>

        <p>
          Hubungkan setiap perangkat dengan jenis perangkat yang tepat.
        </p>
      </div>

      <Card title="🔗 Hubungkan Pasangan yang Tepat">

        <div className="game-instruction">
          <span>1</span>

          Pilih perangkat di sebelah kiri, lalu pilih jenis perangkat
          yang sesuai di sebelah kanan.
        </div>

        <div className="matching-area">

          {/* =========================
              KOLOM KIRI
          ========================= */}
          <div className="matching-column">

            <h3>Perangkat I/O</h3>

            {currentData.map((item) => {

              const matched = matches.some(
                (match) => match.leftId === item.id
              );

              const selected =
                selectedLeft?.id === item.id;

              return (
                <button
                  key={item.id}
                  className={`match-item
                    ${selected ? 'selected' : ''}
                    ${matched ? 'matched' : ''}
                  `}
                  onClick={() => handleLeftClick(item)}
                  disabled={matched}
                >
                  {item.left}

                  {matched && (
                    <span>✓</span>
                  )}
                </button>
              );
            })}

          </div>

          {/* =========================
              GARIS TENGAH
          ========================= */}
          <div className="matching-lines">

            {currentData.map((item) => {

              const matched = matches.some(
                (match) => match.leftId === item.id
              );

              return (
                <div
                  key={item.id}
                  className={`line ${
                    matched ? 'line-active' : ''
                  }`}
                />
              );
            })}

          </div>

          {/* =========================
              KOLOM KANAN
          ========================= */}
          <div className="matching-column">

            <h3>Jenis Perangkat</h3>

            {shuffledData.map((item) => {

              const matched = matches.some(
                (match) => match.rightId === item.id
              );

              return (
                <button
                  key={item.id}
                  className={`match-item ${
                    matched ? 'matched' : ''
                  }`}
                  onClick={() => handleRightClick(item)}
                  disabled={matched}
                >
                  {item.right}

                  {matched && (
                    <span>✓</span>
                  )}
                </button>
              );
            })}

          </div>

        </div>

        {/* =========================
            FEEDBACK SALAH
        ========================= */}
        {wrong && (
          <div className="game-feedback wrong">
            ❌ Belum tepat. Coba cari jenis perangkat yang sesuai.
          </div>
        )}

        {/* =========================
            FEEDBACK SELESAI
        ========================= */}
        {isFinished && (
          <div className="game-feedback correct">
            🎉 Hebat! Semua perangkat berhasil dihubungkan dengan jenisnya.
          </div>
        )}

        {/* =========================
            BUTTON
        ========================= */}
        <div className="game-actions">

          <button
            className="reset-game"
            onClick={resetGame}
          >
            🔄 Ulangi Game
          </button>

          {isFinished && (
            <button
              className="next-level"
              onClick={goToLevel2}
            >
              Lanjut Level 2 →
            </button>
          )}

        </div>

      </Card>

    </div>
  );
}