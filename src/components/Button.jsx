import React from 'react';

export default function Button({
  children,
  onClick,
  variant = 'primary', // primary | secondary | outline | success | danger
  size = 'md', // sm | md | lg
  disabled = false,
  fullWidth = false,
  icon = null,
  type = 'button',
  className = '',
  ...props
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: 'var(--light-blue)',
          color: 'var(--primary-blue)',
          border: '1px solid var(--border-color)',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--dark-blue)',
          border: '2px solid var(--border-color)',
        };
      case 'success':
        return {
          backgroundColor: 'var(--success-green)',
          color: 'var(--white)',
          border: 'none',
          boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)',
        };
      case 'danger':
        return {
          backgroundColor: 'var(--error-red)',
          color: 'var(--white)',
          border: 'none',
        };
      case 'primary':
      default:
        return {
          backgroundColor: 'var(--primary-blue)',
          color: 'var(--white)',
          border: 'none',
          boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { padding: '0.4rem 0.85rem', fontSize: '0.875rem' };
      case 'lg':
        return { padding: '0.85rem 1.75rem', fontSize: '1.1rem' };
      case 'md':
      default:
        return { padding: '0.65rem 1.25rem', fontSize: '1rem' };
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`custom-button ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        borderRadius: 'var(--radius)',
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        width: fullWidth ? '100%' : 'auto',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        ...getVariantStyles(),
        ...getSizeStyles(),
      }}
      {...props}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
