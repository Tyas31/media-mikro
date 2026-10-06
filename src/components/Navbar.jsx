import React, { useState } from 'react';
import { Cpu, Menu, X, BookOpen, Gamepad2, PlayCircle, Wrench, GraduationCap, Award, Home } from 'lucide-react';
import AudioControl from './AudioControl';
import '../styles/navbar.css';

export default function Navbar({ activeTab, setActiveTab, isMuted, onToggleMute }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Beranda', icon: <Home size={18} /> },
    { id: 'materials', label: 'Materi', icon: <BookOpen size={18} /> },
    { id: 'game', label: 'Game', icon: <Gamepad2 size={18} /> },
    { id: 'simulation', label: 'Simulasi', icon: <PlayCircle size={18} /> },
    { id: 'troubleshooter', label: 'Troubleshooter', icon: <Wrench size={18} /> },
    { id: 'evaluation', label: 'Evaluasi', icon: <GraduationCap size={18} /> },
    { id: 'results', label: 'Hasil Belajar', icon: <Award size={18} /> },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand */}
        <div className="navbar-brand" onClick={() => handleNavClick('home')}>
          <div className="brand-icon">
            <Cpu size={24} />
          </div>
          <div>
            <div style={{ lineHeight: 1.1 }}>Manajemen I/O</div>
            <span className="brand-tag">Informatika Kelas X</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav>
          <ul className="navbar-nav">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`nav-item-btn ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Controls */}
        <div className="navbar-actions">
          <AudioControl isMuted={isMuted} onToggleMute={onToggleMute} />

          {/* Mobile Menu Button */}
          <button
            className="mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu open">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`mobile-nav-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {item.icon}
                <span>{item.label}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
