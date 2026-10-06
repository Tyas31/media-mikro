import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Materials from './pages/Materials';
import Game from './pages/Game';
import Level2 from './pages/Level2';
import Level3 from './pages/Level3';
import Simulation from './pages/Simulation';
import Troubleshooter from './pages/Troubleshooter';
import Evaluation from './pages/Evaluation';
import Results from './pages/Results';

import { getProgress, saveProgress, resetProgress } from './utils/progress';
import { playSound } from './utils/audio';

import './styles/global.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [progress, setProgressState] = useState(() => getProgress());
  const [isMuted, setIsMuted] = useState(() => progress.audioMuted || false);

  // Sync audio mute preference with state and progress
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    const updated = { ...progress, audioMuted: nextMuted };
    setProgressState(updated);
    saveProgress(updated);
    if (!nextMuted) {
      playSound('click', false);
    }
  };

  // Nav handler with optional click sound
  const handleTabChange = (tabId) => {
    playSound('navigate', isMuted);

    // Ambil progress terbaru sebelum pindah halaman
    const latestProgress = getProgress();
    setProgressState(latestProgress);

    setActiveTab(tabId);
  };

  const handleResetProgress = () => {
    playSound('click', isMuted);
    const resetData = resetProgress();
    setProgressState(resetData);
    setIsMuted(false);
  };

const renderContent = () => {
  switch (activeTab) {
    case 'materials':
      return <Materials setActiveTab={handleTabChange} />;

    case 'game':
      return <Game setActiveTab={handleTabChange} />;

    case 'level2':
      return <Level2 setActiveTab={handleTabChange} />;

    case 'level3':
    return (
      <Level3
        setActiveTab={handleTabChange}
        isMuted={isMuted}
      />
    );

    case 'simulation':
      return <Simulation />;

    case 'troubleshooter':
      return <Troubleshooter />;

    case 'evaluation':
      return <Evaluation />;

    case 'results':
      return <Results progress={progress} />;

    case 'home':
    default:
      return (
        <Home
          setActiveTab={handleTabChange}
          progress={progress}
          onResetProgress={handleResetProgress}
        />
      );
    };
  };

  return (
    <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      <main style={{ flex: 1, paddingTop: '1rem' }}>
        {renderContent()}
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border-color)',
          backgroundColor: 'var(--white)',
          padding: '1.5rem 0',
          marginTop: 'auto',
          textAlign: 'center',
          fontSize: '0.875rem',
          color: 'var(--text-muted)',
        }}
      >
        <div className="container">
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} Media Pembelajaran Interaktif Manajemen I/O Sistem Operasi — Informatika SMA/SMK Kelas X
          </p>
        </div>
      </footer>
    </div>
  );
}
