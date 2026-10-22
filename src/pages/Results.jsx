
import React from 'react';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import {
  getPerformanceCategory,
  getRecommendation,
} from '../utils/scoring';
import '../styles/results.css';

export default function Results({ progress }) {
  const game = progress?.game || {};
  const simulation = progress?.simulation || {};
  const troubleshooter = progress?.troubleshooter || {};
  const evaluation = progress?.evaluation || {};

  const gameScore = Number(game.score) || 0;
  const troubleScore = Number(troubleshooter.score) || 0;
  const evalScore = Number(evaluation.highScore) || 0;

  const hasGame = (Number(game.completedCases) || 0) > 0;
  const hasSimulation = Boolean(simulation.isCompleted);
  const hasTroubleshooter =
    (Number(troubleshooter.completedCases) || 0) > 0;
  const hasEvaluation = (Number(evaluation.attempts) || 0) > 0;

  // Hanya nilai dari modul yang memiliki skor yang dihitung.
  // Simulasi ditampilkan sebagai status penyelesaian.
  const scores = [];

  if (hasGame) {
    scores.push(gameScore);
  }

  if (hasTroubleshooter) {
    scores.push(troubleScore);
  }

  if (hasEvaluation) {
    scores.push(evalScore);
  }

  const averageScore = scores.length
    ? Math.round(
        scores.reduce((total, score) => total + score, 0) /
          scores.length
      )
    : 0;

  const category = getPerformanceCategory(averageScore);
  const recommendation = getRecommendation(progress || {});

  const modules = [
    {
      name: 'Game I/O',
      completed: hasGame,
      score: gameScore,
      description: 'Latihan mengenali perangkat input dan output.',
    },
    {
      name: 'Simulasi I/O',
      completed: hasSimulation,
      score: null,
      description: 'Latihan memahami alur komunikasi perangkat.',
    },
    {
      name: 'Troubleshooting',
      completed: hasTroubleshooter,
      score: troubleScore,
      description: 'Latihan menganalisis masalah perangkat.',
    },
    {
      name: 'Evaluasi',
      completed: hasEvaluation,
      score: evalScore,
      description: 'Tes pemahaman materi manajemen I/O.',
    },
  ];

  const completedModules = modules.filter(
    (module) => module.completed
  ).length;

  return (
    <div className="results-page container animate-fade-in">
      <div className="page-header">
        <h1>Hasil Belajarku</h1>
        <p>
          Lihat perkembangan belajarmu dalam materi Manajemen
          Sistem Input/Output.
        </p>
      </div>

      <Card className="results-summary">
        <div className="results-summary-content">
          <h2>Ringkasan Pembelajaran</h2>

          <p>
            Kamu sudah menyelesaikan {completedModules} dari{' '}
            {modules.length} modul pembelajaran.
          </p>

          <ProgressBar
            progress={(completedModules / modules.length) * 100}
          />

          <p>
            {completedModules === modules.length
              ? 'Hebat! Semua modul sudah kamu selesaikan.'
              : 'Terus lanjutkan pembelajaranmu sampai semua modul selesai.'}
          </p>
        </div>
      </Card>

      <section className="results-section">
        <h2>Nilai Pembelajaran</h2>

        {scores.length > 0 ? (
          <Card className="results-score-card">
            <div className="results-score">
              <span className="results-score-value">
                {averageScore}
              </span>
              <span className="results-score-label">
                Rata-rata Nilai
              </span>
            </div>

            <div
              className="results-category"
              style={{ color: category.color }}
            >
              {category.label}
            </div>

            <p>
              Nilai dihitung dari modul yang sudah memiliki hasil
              penilaian. Penyelesaian simulasi ditampilkan terpisah.
            </p>
          </Card>
        ) : (
          <Card>
            <h3>Belum Ada Hasil Penilaian</h3>
            <p>
              Selesaikan Game I/O, Troubleshooting, atau Evaluasi
              untuk melihat nilai pembelajaranmu di sini.
            </p>
          </Card>
        )}
      </section>

      <section className="results-section">
        <h2>Perkembangan Setiap Modul</h2>

        <div className="results-modules">
          {modules.map((module) => (
            <Card key={module.name} className="results-module-card">
              <div className="results-module-header">
                <h3>{module.name}</h3>

                <span
                  className={`results-status ${
                    module.completed ? 'completed' : 'incomplete'
                  }`}
                >
                  {module.completed ? 'Selesai' : 'Belum selesai'}
                </span>
              </div>

              <p>{module.description}</p>

              {module.score !== null && module.completed && (
                <p className="results-module-score">
                  Nilai: <strong>{module.score}</strong>
                </p>
              )}

              {module.name === 'Simulasi I/O' && (
                <p>
                  {module.completed
                    ? 'Semua skenario simulasi telah diselesaikan.'
                    : 'Selesaikan semua skenario simulasi untuk menandai modul ini selesai.'}
                </p>
              )}
            </Card>
          ))}
        </div>
      </section>

      <section className="results-section">
        <h2>Rekomendasi Belajar</h2>

        <Card className="results-recommendation">
          <p>{recommendation}</p>
        </Card>
      </section>
    </div>
  );
}
