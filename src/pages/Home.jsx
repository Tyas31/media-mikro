
import React, { useState } from 'react';
import {
  BookOpen,
  Gamepad2,
  Wrench,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import Button from '../components/Button';
import '../styles/home.css';

export default function Home({
  setActiveTab,
  progress,
  onResetProgress,
}) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const steps = [
    { id: 'materials', label: 'Materi', key: 'materials' },
    { id: 'game', label: 'Game', key: 'game' },
    { id: 'simulation', label: 'Simulasi', key: 'simulation' },
    {
      id: 'troubleshooter',
      label: 'Troubleshooter',
      key: 'troubleshooter',
    },
    { id: 'evaluation', label: 'Evaluasi', key: 'evaluation' },
  ];

  const checkIsCompleted = (key) => {
    if (!progress) return false;

    if (key === 'materials') {
      return (progress.materials?.completed?.length || 0) > 0;
    }

    if (key === 'game') {
      return (progress.game?.completedCases || 0) > 0;
    }

    if (key === 'simulation') {
      return Boolean(progress.simulation?.isCompleted);
    }

    if (key === 'troubleshooter') {
      return (progress.troubleshooter?.completedCases || 0) > 0;
    }

    if (key === 'evaluation') {
      return (progress.evaluation?.attempts || 0) > 0;
    }

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
            <span>
              ✨ Media Pembelajaran Informatika SMA/SMK Kelas X
            </span>
          </div>

          <h1 className="hero-title">
            Manajemen Sistem Input/Output
          </h1>

          <h2 className="hero-subtitle">
            Bagaimana komputer menerima input dan menghasilkan output?
          </h2>

          <p className="hero-description">
            Pelajari bagaimana perangkat input, sistem operasi,
            aplikasi, dan perangkat output saling berkomunikasi
            dalam sebuah sistem komputer.
          </p>

          {/* Kasus Pemantik */}
          <div className="home-case-prompt">
            <strong>
              🔎 Kasus Pemantik: Huruf Rani Tidak Muncul
            </strong>

            <p>
              Rani sedang mengetik tugas menggunakan keyboard.
              Namun, huruf yang ditekan tidak muncul pada dokumen,
              padahal aplikasi pengolah kata masih terbuka.
            </p>

            <p>
              Menurutmu, apa yang mungkin menyebabkan masalah
              tersebut? Apakah masalahnya ada pada keyboard,
              sistem operasi, aplikasi, atau perangkat output?
            </p>

            <p>
              Amati materi dan alur komunikasi I/O pada website ini.
              Catat informasi penting, hasil analisis, dan solusi
              yang kamu temukan pada LKPD cetak.
            </p>
          </div>

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

      {/* Pilihan Aktivitas */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Pilih Aktivitas Pembelajaran
            </h2>

            <p className="section-subtitle">
              Pelajari konsepnya, berlatih, lalu gunakan
              pemahamanmu untuk menganalisis masalah I/O.
            </p>
          </div>

          <div className="features-grid">
            {/* Materi */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <BookOpen size={28} />
              </div>

              <div>
                <h3>📚 Pelajari Materi</h3>
                <p>
                  Kenali perangkat input dan output, fungsi
                  manajemen I/O, serta peran sistem operasi
                  dalam menghubungkan perangkat dengan aplikasi.
                </p>
              </div>

              <Button
                variant="secondary"
                fullWidth
                onClick={() => setActiveTab('materials')}
              >
                Pelajari Materi
              </Button>
            </div>

            {/* Game */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Gamepad2 size={28} />
              </div>

              <div>
                <h3>🎮 Berlatih</h3>
                <p>
                  Latih pemahamanmu dengan mengenali perangkat,
                  mencocokkan fungsi, dan memahami alur komunikasi
                  input/output.
                </p>
              </div>

              <Button
                variant="secondary"
                fullWidth
                onClick={() => setActiveTab('game')}
              >
                Mulai Game
              </Button>
            </div>

            {/* Troubleshooter */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Wrench size={28} />
              </div>

              <div>
                <h3>🔧 Pecahkan Masalah</h3>
                <p>
                  Analisis kasus gangguan perangkat I/O,
                  tentukan bagian yang perlu diperiksa,
                  dan usulkan solusi berdasarkan alur I/O.
                </p>
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

          {/* Progress Belajar */}
          <div className="progress-section">
            <div className="progress-header">
              <h3 className="progress-title">
                Progress Belajar Anda
              </h3>

              <Button
                variant="outline"
                size="sm"
                icon={<RotateCcw size={16} />}
                onClick={() => setShowResetConfirm(true)}
              >
                Reset Progress
              </Button>
            </div>

            <div className="learning-path">
              {steps.map((step, idx) => {
                const completed = checkIsCompleted(step.key);

                return (
                  <React.Fragment key={step.id}>
                    <div
                      className={`path-step ${
                        completed ? 'completed' : ''
                      }`}
                      onClick={() => setActiveTab(step.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="step-circle">
                        {completed ? (
                          <CheckCircle2 size={20} />
                        ) : (
                          idx + 1
                        )}
                      </div>

                      <span className="step-label">
                        {step.label}
                      </span>
                    </div>

                    {idx < steps.length - 1 && (
                      <div
                        className={`path-connector ${
                          completed ? 'completed' : ''
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Konfirmasi Reset Progress */}
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
            <h3
              style={{
                color: 'var(--dark-blue)',
                marginBottom: '0.75rem',
              }}
            >
              Konfirmasi Reset
            </h3>

            <p
              style={{
                color: 'var(--text-muted)',
                marginBottom: '1.5rem',
              }}
            >
              Apakah kamu yakin ingin menghapus semua catatan
              progress belajar dan skor latihan? Tindakan ini
              tidak dapat dibatalkan.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                variant="outline"
                onClick={() => setShowResetConfirm(false)}
              >
                Batal
              </Button>

              <Button
                variant="danger"
                onClick={handleResetClick}
              >
                Ya, Reset Progress
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}