
import React, { useState } from 'react';
import Card from '../components/Card';
import { playSound } from '../utils/audio';
import '../styles/simulation.css';

const scenarios = [
  {
    id: 'typing',
    icon: '⌨️',
    title: 'Mengetik Dokumen',
    description:
      'Rani menekan tombol keyboard untuk mengetik tugas pada aplikasi pengolah kata.',
    input: 'Keyboard',
    inputIcon: '⌨️',
    app: 'Aplikasi pengolah kata',
    output: 'Monitor',
    outputIcon: '🖥️',
    steps: [
      {
        title: 'Keyboard menerima input',
        description:
          'Saat Rani menekan tombol, keyboard menghasilkan data input berupa tombol yang ditekan.',
      },
      {
        title: 'Sistem Operasi mengelola input',
        description:
          'Sistem Operasi membantu mengelola komunikasi perangkat input dengan aplikasi melalui mekanisme I/O.',
      },
      {
        title: 'Aplikasi memproses input',
        description:
          'Aplikasi pengolah kata menerima input dan menentukan bagaimana karakter ditampilkan dalam dokumen.',
      },
      {
        title: 'Hasil ditampilkan pada monitor',
        description:
          'Aplikasi memperbarui tampilan dokumen. Sistem grafis dan Sistem Operasi membantu menyajikan hasilnya pada monitor.',
      },
    ],
    flow: [
      { label: 'Keyboard', icon: '⌨️', type: 'device' },
      { label: 'Sistem Operasi', icon: '⚙️', type: 'os' },
      { label: 'Aplikasi Pengolah Kata', icon: '📝', type: 'app' },
      { label: 'Monitor', icon: '🖥️', type: 'device' },
    ],
  },
  {
    id: 'printing',
    icon: '🖨️',
    title: 'Mencetak Dokumen',
    description:
      'Sinta menekan tombol Print untuk mencetak tugas dari aplikasi pengolah kata.',
    input: 'Aplikasi pengolah kata',
    inputIcon: '📝',
    app: 'Layanan pencetakan',
    output: 'Printer',
    outputIcon: '🖨️',
    steps: [
      {
        title: 'Aplikasi mengirim perintah cetak',
        description:
          'Sinta memilih perintah Print pada aplikasi pengolah kata.',
      },
      {
        title: 'Sistem Operasi mengelola proses cetak',
        description:
          'Sistem Operasi dan layanan pencetakan membantu mengelola pekerjaan cetak, termasuk antrean jika digunakan.',
      },
      {
        title: 'Data diteruskan ke printer',
        description:
          'Pekerjaan cetak dikirim melalui koneksi yang tersedia menuju printer.',
      },
      {
        title: 'Printer menghasilkan cetakan',
        description:
          'Printer memproses pekerjaan cetak dan menghasilkan dokumen fisik jika perangkat siap dan tidak mengalami gangguan.',
      },
    ],
    flow: [
      { label: 'Aplikasi', icon: '📝', type: 'app' },
      { label: 'Sistem Operasi', icon: '⚙️', type: 'os' },
      { label: 'Printer', icon: '🖨️', type: 'device' },
    ],
  },
  {
    id: 'audio',
    icon: '🔊',
    title: 'Memutar Suara',
    description:
      'Andi memutar video dan mendengarkan suaranya melalui speaker komputer.',
    input: 'Aplikasi pemutar media',
    inputIcon: '🎬',
    app: 'Aplikasi pemutar media',
    output: 'Speaker',
    outputIcon: '🔊',
    steps: [
      {
        title: 'Aplikasi memproses media',
        description:
          'Aplikasi pemutar media membaca dan memproses data audio dari video.',
      },
      {
        title: 'Sistem Operasi mengelola keluaran audio',
        description:
          'Sistem Operasi membantu mengatur keluaran audio dan komunikasi dengan perangkat audio.',
      },
      {
        title: 'Speaker mengeluarkan suara',
        description:
          'Data audio dikirim melalui perangkat audio yang tersedia untuk menghasilkan suara dari speaker.',
      },
    ],
    flow: [
      { label: 'Aplikasi Pemutar Media', icon: '🎬', type: 'app' },
      { label: 'Sistem Operasi', icon: '⚙️', type: 'os' },
      { label: 'Speaker', icon: '🔊', type: 'device' },
    ],
  },
];

export default function Simulation({ isMuted = false }) {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const scenario = scenarios.find(
    (item) => item.id === selectedScenario
  );

  const step = scenario?.steps[currentStep];

  const speak = (text) => {
    if (isMuted || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'id-ID';
    speech.rate = 0.9;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  };

  const chooseScenario = (id) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    setSelectedScenario(id);
    setCurrentStep(0);
    playSound('click', isMuted);
  };

  const nextStep = () => {
    if (!scenario || currentStep >= scenario.steps.length - 1) return;

    setCurrentStep((previous) => previous + 1);
    playSound('click', isMuted);
  };

  const previousStep = () => {
    if (currentStep <= 0) return;

    setCurrentStep((previous) => previous - 1);
    playSound('click', isMuted);
  };

  const resetSimulation = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    setSelectedScenario(null);
    setCurrentStep(0);
  };

  return (
    <div className="simulation-page container animate-fade-in">
      <div className="simulation-header">
        <h1>⚡ Simulasi I/O Interaktif</h1>
        <p>
          Pelajari bagaimana Sistem Operasi membantu mengelola
          komunikasi antara perangkat dan aplikasi melalui
          contoh kegiatan sehari-hari.
        </p>
      </div>

      <Card title="📚 Pilih Skenario">
        <p className="simulation-description">
          Pilih salah satu kegiatan berikut untuk melihat
          tahapan komunikasi Input/Output.
        </p>

        <div className="simulation-device-grid">
          {scenarios.map((item) => (
            <button
              key={item.id}
              className={`simulation-device ${
                selectedScenario === item.id ? 'selected' : ''
              }`}
              onClick={() => chooseScenario(item.id)}
            >
              <span className="simulation-device-icon">
                {item.icon}
              </span>

              <strong>{item.title}</strong>

              <small>Simulasi I/O</small>

              {selectedScenario === item.id && (
                <span className="simulation-selected">
                  ✓ Dipilih
                </span>
              )}
            </button>
          ))}
        </div>
      </Card>

      {!scenario ? (
        <Card title="🔄 Alur Komunikasi I/O">
          <div className="simulation-empty-flow">
            <div className="simulation-empty-icon">💡</div>
            <h3>Siap untuk belajar?</h3>
            <p>
              Pilih skenario di atas untuk melihat alur,
              memahami peran Sistem Operasi, dan mempelajari
              fungsi setiap komponen.
            </p>
          </div>
        </Card>
      ) : (
        <>
          <Card title={`${scenario.icon} ${scenario.title}`}>
            <p className="simulation-description">
              {scenario.description}
            </p>

            <div className="simulation-flow">
              {scenario.flow.map((node, index) => (
                <React.Fragment key={`${scenario.id}-${node.label}`}>
                  <div
                    className={`simulation-flow-node ${
                      node.type === 'os'
                        ? 'simulation-os'
                        : 'active'
                    } ${
                      currentStep >= index
                        ? 'simulation-node-reached'
                        : ''
                    }`}
                  >
                    <div className="simulation-flow-icon">
                      {node.icon}
                    </div>

                    <span className="simulation-flow-label">
                      {node.type === 'os'
                        ? 'SISTEM OPERASI'
                        : node.type === 'app'
                        ? 'APLIKASI'
                        : 'PERANGKAT'}
                    </span>

                    <strong>{node.label}</strong>
                  </div>

                  {index < scenario.flow.length - 1 && (
                    <div
                      className="simulation-flow-arrow"
                      key={`arrow-${scenario.id}-${index}`}
                    >
                      →
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <p className="simulation-description">
              Diagram menunjukkan alur konseptual. Detail
              komunikasi perangkat dapat berbeda sesuai
              sistem dan aplikasi yang digunakan.
            </p>
          </Card>

          <Card title="🔍 Pelajari Tahap demi Tahap">
            <div className="case-heading">
              <div className="case-icon">
                {scenario.icon}
              </div>

              <div>
                <span>
                  TAHAP {currentStep + 1} DARI{' '}
                  {scenario.steps.length}
                </span>
                <h2>{step.title}</h2>
              </div>
            </div>

            <p className="simulation-description">
              {step.description}
            </p>

            <div
              style={{
                width: '100%',
                height: '8px',
                background: '#e5e7eb',
                borderRadius: '999px',
                overflow: 'hidden',
                margin: '1rem 0',
              }}
            >
              <div
                style={{
                  width: `${
                    ((currentStep + 1) / scenario.steps.length) * 100
                  }%`,
                  height: '100%',
                  background: '#2563eb',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>

            <div className="simulation-actions">
              <button
                className="simulation-reset-button"
                onClick={previousStep}
                disabled={currentStep === 0}
              >
                ← Sebelumnya
              </button>

              <button
                className="simulation-check-button"
                onClick={() => speak(step.description)}
              >
                🔊 Dengarkan
              </button>

              {currentStep < scenario.steps.length - 1 ? (
                <button
                  className="simulation-check-button"
                  onClick={nextStep}
                >
                  Tahap Berikutnya →
                </button>
              ) : (
                <button
                  className="simulation-check-button"
                  onClick={resetSimulation}
                >
                  ✓ Selesai — Coba Lagi
                </button>
              )}
            </div>
          </Card>
        </>
      )}

      <div className="simulation-actions">
        <button
          className="simulation-reset-button"
          onClick={resetSimulation}
        >
          🔄 Ulangi Simulasi
        </button>
      </div>
    </div>
  );
}
