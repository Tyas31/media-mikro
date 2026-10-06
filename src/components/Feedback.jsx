import React from 'react';
import { CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import Button from './Button';

export default function Feedback({
  isCorrect = null, // true | false | null
  message = '',
  hint = '',
  onRetry = null,
  showHintBtn = false,
  onToggleHint = null,
  showHint = false,
}) {
  if (isCorrect === null) return null;

  return (
    <div
      className="animate-fade-in"
      style={{
        marginTop: '1.5rem',
        padding: '1.25rem 1.5rem',
        borderRadius: 'var(--radius)',
        backgroundColor: isCorrect ? 'var(--success-light)' : 'var(--error-light)',
        border: `1px solid ${isCorrect ? '#a7f3d0' : '#fca5a5'}`,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {isCorrect ? (
          <CheckCircle2 size={24} color="var(--success-green)" />
        ) : (
          <AlertCircle size={24} color="var(--error-red)" />
        )}
        <div style={{ flex: 1 }}>
          <h4 style={{ color: isCorrect ? 'var(--success-green)' : 'var(--error-red)', margin: 0 }}>
            {isCorrect ? 'Benar!' : 'Belum Tepat'}
          </h4>
          <p style={{ color: 'var(--text-dark)', fontSize: '0.95rem', marginTop: '0.2rem' }}>
            {message}
          </p>
        </div>
      </div>

      {/* Optional Hint Section */}
      {!isCorrect && hint && showHint && (
        <div
          style={{
            backgroundColor: 'var(--white)',
            padding: '0.85rem 1rem',
            borderRadius: 'var(--radius-sm)',
            borderLeft: '4px solid var(--warning-amber)',
            fontSize: '0.9rem',
            color: 'var(--text-dark)',
            marginTop: '0.25rem',
          }}
        >
          <strong>💡 Petunjuk:</strong> {hint}
        </div>
      )}

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
        {!isCorrect && onRetry && (
          <Button variant="secondary" size="sm" onClick={onRetry}>
            Coba Lagi
          </Button>
        )}
        {!isCorrect && hint && showHintBtn && (
          <Button variant="outline" size="sm" icon={<HelpCircle size={16} />} onClick={onToggleHint}>
            {showHint ? 'Sembunyikan Petunjuk' : 'Lihat Petunjuk'}
          </Button>
        )}
      </div>
    </div>
  );
}
