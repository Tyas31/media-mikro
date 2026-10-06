import React from 'react';

export default function ProgressBar({ value = 0, max = 100, label = '', showPercentage = true, color = 'var(--primary-blue)' }) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div style={{ width: '100%' }}>
      {(label || showPercentage) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-dark)' }}>
          {label && <span>{label}</span>}
          {showPercentage && <span>{percentage}%</span>}
        </div>
      )}
      <div
        style={{
          width: '100%',
          height: '10px',
          backgroundColor: 'var(--light-blue)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: color,
            borderRadius: 'var(--radius-full)',
            transition: 'width 0.4s ease-out',
          }}
        />
      </div>
    </div>
  );
}
