import React from 'react';

export default function Card({
  children,
  title,
  subtitle,
  icon,
  className = '',
  onClick,
  hoverable = false,
  style = {},
}) {
  return (
    <div
      onClick={onClick}
      className={`ui-card ${hoverable ? 'hoverable' : ''} ${className}`}
      style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius)',
        padding: '1.75rem',
        boxShadow: 'var(--shadow-md)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {(title || icon) && (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
          {icon && (
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                backgroundColor: 'var(--light-blue)',
                color: 'var(--primary-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {icon}
            </div>
          )}
          <div>
            {title && <h3 style={{ fontSize: '1.25rem', color: 'var(--dark-blue)', margin: 0 }}>{title}</h3>}
            {subtitle && <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{subtitle}</p>}
          </div>
        </div>
      )}
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}
