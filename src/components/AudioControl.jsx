import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioControl({ isMuted, onToggleMute }) {
  return (
    <button
      onClick={onToggleMute}
      className={`audio-control-btn ${isMuted ? 'muted' : ''}`}
      title={isMuted ? 'Aktifkan Suara' : 'Matikan Suara'}
      aria-label={isMuted ? 'Aktifkan Suara' : 'Matikan Suara'}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.4rem',
        padding: '0.5rem 0.8rem',
        borderRadius: '12px',
        backgroundColor: isMuted ? 'var(--error-light)' : 'var(--light-blue)',
        color: isMuted ? 'var(--error-red)' : 'var(--primary-blue)',
        border: `1px solid ${isMuted ? '#fca5a5' : 'var(--border-color)'}`,
        fontWeight: '600',
        fontSize: '0.85rem',
        transition: 'all 0.2s ease',
      }}
    >
      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      <span>{isMuted ? 'Mute' : 'Audio On'}</span>
    </button>
  );
}
