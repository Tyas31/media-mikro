import React from 'react';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import { getPerformanceCategory, getRecommendation } from '../utils/scoring';
import '../styles/results.css';

export default function Results({ progress }) {
  const gameScore = progress?.game?.score || 0;
  const isSimDone = progress?.simulation?.isCompleted;
  const troubleScore = progress?.troubleshooter?.score || 0;
  const evalScore = progress?.evaluation?.highScore || 0;

  const avgScore = Math.round((gameScore + (isSimDone ? 100 : 0) + troubleScore + evalScore) / 4);
  const category = getPerformanceCategory(avgScore);
  const recommendation = getRecommendation(progress || {});

  return (
    <div className="results-page container animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--dark-blue)' }}>Hasil Belajarmu</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Ringkasan pencapaian dan rekomendasi belajar mandiri.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <Card title="📊 Progress & Skor Modul">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <ProgressBar label="Game I/O" value={gameScore} max={100} />
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                <span>Simulasi</span>
                <span style={{ color: isSimDone ? 'var(--success-green)' : 'var(--text-muted)' }}>
                  {isSimDone ? '✓ Selesai' : 'Belum Dicoba'}
                </span>
              </div>
            </div>
            <ProgressBar label="Troubleshooter" value={troubleScore} max={100} />
            <ProgressBar label="Evaluasi" value={evalScore} max={100} />
          </div>
        </Card>

        <Card title="🏆 Performa Keseluruhan">
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div
              style={{
                display: 'inline-block',
                padding: '0.5rem 1.5rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: `${category.color}15`,
                color: category.color,
                fontWeight: '800',
                fontSize: '1.25rem',
                marginBottom: '1rem',
                border: `2px solid ${category.color}`,
              }}
            >
              {category.label} ({avgScore}%)
            </div>
            <p style={{ color: 'var(--text-dark)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              {category.description}
            </p>

            <div
              style={{
                backgroundColor: 'var(--light-blue)',
                padding: '1rem',
                borderRadius: 'var(--radius)',
                textAlign: 'left',
                borderLeft: '4px solid var(--primary-blue)',
              }}
            >
              <h4 style={{ color: 'var(--dark-blue)', marginBottom: '0.3rem', fontSize: '0.95rem' }}>
                💡 Rekomendasi Belajar:
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>{recommendation}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
