import React, { useState } from 'react';
import { ArrowDown, HardDrive, Cpu, LayoutGrid, Play, Keyboard, Monitor, Printer, Mouse, Mic } from 'lucide-react';
import Button from './Button';

export default function Diagram({
  mode = 'input', // 'input' | 'output'
  title = '',
  deviceLabel = '',
  appLabel = '',
  sampleData = 'Data A',
  customDetails = null,
}) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [animatingStep, setAnimatingStep] = useState(null); // 1, 2, 3 or null
  const [isAnimating, setIsAnimating] = useState(false);

  const defaultDeviceLabel = deviceLabel || (mode === 'input' ? 'Perangkat Input (Keyboard/Mouse)' : 'Perangkat Output (Monitor/Printer)');
  const defaultAppLabel = appLabel || 'Aplikasi / Proses';

  const nodeDetails = customDetails || {
    device: {
      title: mode === 'input' ? 'Perangkat Input (Hardware)' : 'Perangkat Output (Hardware)',
      desc: mode === 'input'
        ? 'Memasukkan data atau perintah dari pengguna/luar ke komputer (seperti mengetik di Keyboard atau mengklik Mouse).'
        : 'Menampilkan atau menghasilkan hasil pemrosesan informasi dari komputer (seperti gambar di Monitor atau suara di Speaker).',
    },
    os: {
      title: 'Sistem Operasi (OS Management)',
      desc: 'Menerima, mendeteksi, dan mengatur penerjemahan sinyal/antrean komunikasi antara hardware dan aplikasi.',
    },
    app: {
      title: 'Aplikasi / Proses',
      desc: mode === 'input'
        ? 'Program yang menerima data input dari Sistem Operasi untuk digunakan (seperti aplikasi Text Editor atau Browser).'
        : 'Program yang menentukan informasi apa yang perlu dikirimkan dan ditampilkan ke perangkat output.',
    },
  };

  const handleRunAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAnimatingStep(1);
    setSelectedNode(mode === 'input' ? 'device' : 'app');

    setTimeout(() => {
      setAnimatingStep(2);
      setSelectedNode('os');
    }, 1000);

    setTimeout(() => {
      setAnimatingStep(3);
      setSelectedNode(mode === 'input' ? 'app' : 'device');
    }, 2000);

    setTimeout(() => {
      setAnimatingStep(null);
      setIsAnimating(false);
    }, 3200);
  };

  // Node order
  // Input: 1: device, 2: os, 3: app
  // Output: 1: app, 2: os, 3: device
  const getNodeKey = (stepNum) => {
    if (mode === 'input') {
      if (stepNum === 1) return 'device';
      if (stepNum === 2) return 'os';
      return 'app';
    } else {
      if (stepNum === 1) return 'app';
      if (stepNum === 2) return 'os';
      return 'device';
    }
  };

  const isNodeActive = (nodeKey) => {
    if (animatingStep !== null) {
      return getNodeKey(animatingStep) === nodeKey;
    }
    return selectedNode === nodeKey;
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--white)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius)',
        padding: '2rem 1.5rem',
        boxShadow: 'var(--shadow-md)',
        maxWidth: '100%',
        overflowX: 'hidden',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.3rem', color: 'var(--dark-blue)', marginBottom: '0.4rem' }}>
          {title || `Diagram Alur Komunikasi ${mode === 'input' ? 'INPUT' : 'OUTPUT'}`}
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Klik pada setiap komponen di bawah atau tekan <strong>"▶ Lihat Alur"</strong> untuk melihat pergerakan sinyal
        </p>
      </div>

      {/* Control Action */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <Button
          variant={isAnimating ? 'secondary' : 'primary'}
          size="sm"
          icon={<Play size={16} />}
          onClick={handleRunAnimation}
          disabled={isAnimating}
        >
          {isAnimating ? 'Memproses Alur Data...' : '▶ Lihat Alur'}
        </Button>
      </div>

      {/* Visual Animation Status Tag */}
      {animatingStep !== null && (
        <div
          className="animate-fade-in"
          style={{
            textAlign: 'center',
            marginBottom: '1rem',
            padding: '0.4rem 1rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--light-blue)',
            color: 'var(--primary-blue)',
            fontWeight: '700',
            fontSize: '0.85rem',
            display: 'inline-block',
            width: '100%',
            maxWidth: '360px',
            margin: '0 auto 1.25rem',
          }}
        >
          ✨ Sinyal "{sampleData}" berpindah ke: Step {animatingStep} - {
            nodeDetails[getNodeKey(animatingStep)]?.title
          }
        </div>
      )}

      {/* Vertical Flow Diagram Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
          maxWidth: '440px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {mode === 'input' ? (
          <>
            {/* 1. Device (Input) */}
            <button
              type="button"
              onClick={() => setSelectedNode('device')}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                borderRadius: '14px',
                backgroundColor: isNodeActive('device') ? 'var(--primary-blue)' : 'var(--light-blue)',
                color: isNodeActive('device') ? 'var(--white)' : 'var(--dark-blue)',
                border: `2px solid ${isNodeActive('device') ? 'var(--primary-blue)' : 'var(--border-color)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: isNodeActive('device') ? '0 6px 18px rgba(37, 99, 235, 0.3)' : 'none',
              }}
            >
              <HardDrive size={20} />
              <span>{defaultDeviceLabel}</span>
            </button>

            <ArrowDown
              size={24}
              color={animatingStep === 1 || animatingStep === 2 ? 'var(--primary-blue)' : '#94a3b8'}
              style={{
                transition: 'all 0.3s ease',
                transform: animatingStep === 1 ? 'scale(1.3)' : 'scale(1)',
              }}
            />

            {/* 2. OS */}
            <button
              type="button"
              onClick={() => setSelectedNode('os')}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                borderRadius: '14px',
                backgroundColor: isNodeActive('os') ? 'var(--primary-blue)' : 'var(--light-blue)',
                color: isNodeActive('os') ? 'var(--white)' : 'var(--dark-blue)',
                border: `2px solid ${isNodeActive('os') ? 'var(--primary-blue)' : 'var(--border-color)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: isNodeActive('os') ? '0 6px 18px rgba(37, 99, 235, 0.3)' : 'none',
              }}
            >
              <Cpu size={20} />
              <span>Sistem Operasi</span>
            </button>

            <ArrowDown
              size={24}
              color={animatingStep === 2 || animatingStep === 3 ? 'var(--primary-blue)' : '#94a3b8'}
              style={{
                transition: 'all 0.3s ease',
                transform: animatingStep === 2 ? 'scale(1.3)' : 'scale(1)',
              }}
            />

            {/* 3. Application */}
            <button
              type="button"
              onClick={() => setSelectedNode('app')}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                borderRadius: '14px',
                backgroundColor: isNodeActive('app') ? 'var(--primary-blue)' : 'var(--light-blue)',
                color: isNodeActive('app') ? 'var(--white)' : 'var(--dark-blue)',
                border: `2px solid ${isNodeActive('app') ? 'var(--primary-blue)' : 'var(--border-color)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: isNodeActive('app') ? '0 6px 18px rgba(37, 99, 235, 0.3)' : 'none',
              }}
            >
              <LayoutGrid size={20} />
              <span>{defaultAppLabel}</span>
            </button>
          </>
        ) : (
          <>
            {/* Output Flow */}
            {/* 1. Application */}
            <button
              type="button"
              onClick={() => setSelectedNode('app')}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                borderRadius: '14px',
                backgroundColor: isNodeActive('app') ? 'var(--primary-blue)' : 'var(--light-blue)',
                color: isNodeActive('app') ? 'var(--white)' : 'var(--dark-blue)',
                border: `2px solid ${isNodeActive('app') ? 'var(--primary-blue)' : 'var(--border-color)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: isNodeActive('app') ? '0 6px 18px rgba(37, 99, 235, 0.3)' : 'none',
              }}
            >
              <LayoutGrid size={20} />
              <span>{defaultAppLabel}</span>
            </button>

            <ArrowDown
              size={24}
              color={animatingStep === 1 || animatingStep === 2 ? 'var(--primary-blue)' : '#94a3b8'}
              style={{
                transition: 'all 0.3s ease',
                transform: animatingStep === 1 ? 'scale(1.3)' : 'scale(1)',
              }}
            />

            {/* 2. OS */}
            <button
              type="button"
              onClick={() => setSelectedNode('os')}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                borderRadius: '14px',
                backgroundColor: isNodeActive('os') ? 'var(--primary-blue)' : 'var(--light-blue)',
                color: isNodeActive('os') ? 'var(--white)' : 'var(--dark-blue)',
                border: `2px solid ${isNodeActive('os') ? 'var(--primary-blue)' : 'var(--border-color)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: isNodeActive('os') ? '0 6px 18px rgba(37, 99, 235, 0.3)' : 'none',
              }}
            >
              <Cpu size={20} />
              <span>Sistem Operasi</span>
            </button>

            <ArrowDown
              size={24}
              color={animatingStep === 2 || animatingStep === 3 ? 'var(--primary-blue)' : '#94a3b8'}
              style={{
                transition: 'all 0.3s ease',
                transform: animatingStep === 2 ? 'scale(1.3)' : 'scale(1)',
              }}
            />

            {/* 3. Device (Output) */}
            <button
              type="button"
              onClick={() => setSelectedNode('device')}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                borderRadius: '14px',
                backgroundColor: isNodeActive('device') ? 'var(--primary-blue)' : 'var(--light-blue)',
                color: isNodeActive('device') ? 'var(--white)' : 'var(--dark-blue)',
                border: `2px solid ${isNodeActive('device') ? 'var(--primary-blue)' : 'var(--border-color)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: isNodeActive('device') ? '0 6px 18px rgba(37, 99, 235, 0.3)' : 'none',
              }}
            >
              <HardDrive size={20} />
              <span>{defaultDeviceLabel}</span>
            </button>
          </>
        )}
      </div>

      {/* Click Explanation Detail Box */}
      {selectedNode && (
        <div
          className="animate-fade-in"
          style={{
            marginTop: '1.5rem',
            padding: '1.25rem',
            backgroundColor: 'var(--light-blue)',
            borderRadius: 'var(--radius)',
            borderLeft: '4px solid var(--primary-blue)',
          }}
        >
          <h4 style={{ color: 'var(--dark-blue)', marginBottom: '0.4rem', fontSize: '1.05rem' }}>
            {nodeDetails[selectedNode]?.title}
          </h4>
          <p style={{ color: 'var(--text-dark)', fontSize: '0.95rem', lineHeight: '1.6' }}>
            {nodeDetails[selectedNode]?.desc}
          </p>
        </div>
      )}
    </div>
  );
}
