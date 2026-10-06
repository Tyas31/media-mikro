import React, { useState } from 'react';
import { BookOpen, Gamepad2, Wrench, ArrowRight, RotateCcw, CheckCircle2, Circle } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import '../styles/home.css';

export default function Home({ setActiveTab, progress, onResetProgress }) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const steps = [
    { id: 'materials', label: 'Materi', key: 'materials' },
    { id: 'game', label: 'Game', key: 'game' },
    { id: 'simulation', label: 'Simulasi', key: 'simulation' },
    { id: 'troubleshooter', label: 'Troubleshooter', key: 'troubleshooter' },
    { id: 'evaluation', label: 'Evaluasi', key: 'evaluation' },
  ];

  const checkIsCompleted = (key) => {
    if (!progress) return false;
    if (key === 'materials') return (progress.materials?.completed?.length || 0) > 0;
    if (key === 'game') return (progress.game?.completedCases || 0) > 0;
    if (key === 'simulation') return progress.simulation?.isCompleted;
    if (key === 'troubleshooter') return (progress.troubleshooter?.completedCases || 0) > 0;
    if (key === 'evaluation') return (progress.evaluation?.attempts || 0) > 0;
    return false;
  };

  const handleResetClick = () => {
    onResetProgress();
    setShowResetConfirm(false);
  };

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-badge">
            <span>✨ Media Pembelajaran Informatika SMA/SMK Kelas X</span>
          </div>
          <h1 className="hero-title">Manajemen Sistem Input/Output</h1>
          <h2 className="hero-subtitle">Bagaimana komputer menerima input dan menghasilkan output?</h2>
          <p className="hero-description">
            Pelajari bagaimana perangkat input, sistem operasi, aplikasi, dan perangkat output saling berkomunikasi.
          </p>
          <div className="hero-actions">
            <Button
              size="lg"
              variant="primary"
              icon={<ArrowRight size={20} />}
              onClick={() => setActiveTab('materials')}
            >
              Mulai Belajar
            </Button>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Pilih Mode Pembelajaran</h2>
            <p className="section-subtitle">
              Pilih aktivitas di bawah ini untuk memulai eksplorasi manajemen I/O
            </p>
          </div>

          <div className="features-grid">
            {/* Card 1 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <BookOpen size={28} />
              </div>
              <div>
                <h3>📚 Pelajari</h3>
                <p>Memahami konsep manajemen input/output dan peran sistem operasi.</p>
              </div>
              <Button
                variant="secondary"
                fullWidth
                onClick={() => setActiveTab('materials')}
              >
                Pelajari Materi
              </Button>
            </div>

            {/* Card 2 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Gamepad2 size={28} />
              </div>
              <div>
                <h3>🎮 Berlatih</h3>
                <p>Menghubungkan dan menyusun alur I/O melalui permainan interaktif.</p>
              </div>
              <Button
                variant="secondary"
                fullWidth
                onClick={() => setActiveTab('game')}
              >
                Mulai Game
              </Button>
            </div>

            {/* Card 3 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Wrench size={28} />
              </div>
              <div>
                <h3>🔧 Pecahkan Masalah</h3>
                <p>Menganalisis dan mencari solusi ketika perangkat I/O mengalami masalah.</p>
              </div>
              <Button
                variant="secondary"
                fullWidth
                onClick={() => setActiveTab('troubleshooter')}
              >
                Coba Troubleshooter
              </Button>
            </div>
          </div>

          {/* Learning Progress Section */}
          <div className="progress-section">
            <div className="progress-header">
              <h3 className="progress-title">Progress Belajar Anda</h3>
              <Button
                variant="outline"
                size="sm"
                icon={<RotateCcw size={16} />}
                onClick={() => setShowResetConfirm(true)}
              >
                Reset Progress
              </Button>
            </div>

            {/* Path visualization */}
            <div className="learning-path">
              {steps.map((step, idx) => {
                const completed = checkIsCompleted(step.key);
                return (
                  <React.Fragment key={step.id}>
                    <div
                      className={`path-step ${completed ? 'completed' : ''}`}
                      onClick={() => setActiveTab(step.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="step-circle">
                        {completed ? <CheckCircle2 size={20} /> : idx + 1}
                      </div>
                      <span className="step-label">{step.label}</span>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className={`path-connector ${completed ? 'completed' : ''}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Confirmation Modal for Reset Progress */}
      {showResetConfirm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--white)',
              borderRadius: 'var(--radius)',
              padding: '2rem',
              maxWidth: '440px',
              width: '100%',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <h3 style={{ color: 'var(--dark-blue)', marginBottom: '0.75rem' }}>Konfirmasi Reset</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Apakah Anda yakin ingin menghapus semua catatan progress belajar dan skor latihan? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <Button variant="outline" onClick={() => setShowResetConfirm(false)}>
                Batal
              </Button>
              <Button variant="danger" onClick={handleResetClick}>
                Ya, Reset Progress
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
