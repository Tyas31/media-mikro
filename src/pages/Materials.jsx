
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  Mouse,
  Mic,
  Monitor,
  Printer,
  Volume2,
  ChevronLeft,
  ChevronRight,
  School,
  CheckCircle2,
  ArrowRight,
  HardDrive,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import Diagram from '../components/Diagram';
import { getProgress, saveProgress } from '../utils/progress';
import '../styles/materials.css';

const inputDevices = [
  {
    id: 'keyboard',
    name: 'Keyboard',
    icon: <Keyboard size={28} />,
    func: 'Memasukkan huruf, angka, simbol, dan perintah ke komputer.',
    example: 'Mengetik tugas menggunakan aplikasi pengolah kata.',
  },
  {
    id: 'mouse',
    name: 'Mouse',
    icon: <Mouse size={28} />,
    func: 'Menggerakkan pointer, memilih menu, dan menjalankan perintah.',
    example: 'Mengklik tombol atau memilih file.',
  },
  {
    id: 'scanner',
    name: 'Scanner',
    icon: <HardDrive size={28} />,
    func: 'Mengubah dokumen atau gambar fisik menjadi data digital.',
    example: 'Memindai lembar tugas menjadi file digital.',
  },
  {
    id: 'microphone',
    name: 'Microphone',
    icon: <Mic size={28} />,
    func: 'Memasukkan suara ke komputer.',
    example: 'Berbicara saat rapat daring atau merekam suara.',
  },
];

const outputDevices = [
  {
    id: 'monitor',
    name: 'Monitor',
    icon: <Monitor size={28} />,
    func: 'Menampilkan teks, gambar, video, dan informasi visual.',
    example: 'Melihat dokumen yang sedang diketik.',
  },
  {
    id: 'printer',
    name: 'Printer',
    icon: <Printer size={28} />,
    func: 'Menghasilkan keluaran berupa cetakan fisik di atas kertas.',
    example: 'Mencetak laporan atau lembar tugas.',
  },
  {
    id: 'speaker',
    name: 'Speaker',
    icon: <Volume2 size={28} />,
    func: 'Menghasilkan keluaran berupa suara.',
    example: 'Mendengarkan audio atau suara video pembelajaran.',
  },
];

const sectionTitles = [
  '1. Apa itu Input dan Output?',
  '2. Perangkat Input',
  '3. Perangkat Output',
  '4. Mengapa I/O Perlu Dikelola?',
  '5. Manajemen Input/Output',
  '6. Peran Sistem Operasi',
  '7. Alur Input',
  '8. Alur Output',
  '9. Contoh Permasalahan I/O',
];

export default function Materials({ setActiveTab }) {
  const [currentSection, setCurrentSection] = useState(1);
  const [completedSections, setCompletedSections] = useState([1]);
  const [selectedInputDevice, setSelectedInputDevice] = useState('keyboard');
  const [selectedOutputDevice, setSelectedOutputDevice] = useState('monitor');

  const totalSections = sectionTitles.length;

  useEffect(() => {
    const progress = getProgress() || {};
    const saved = progress.materials?.completed || [];
    const completed = [...new Set([1, ...saved])];

    setCompletedSections(completed);

    if (!saved.includes(1)) {
      saveProgress({
        ...progress,
        materials: {
          ...progress.materials,
          completed,
          lastRead: progress.materials?.lastRead || 1,
        },
      });
    }

    if (
      progress.materials?.lastRead >= 1 &&
      progress.materials?.lastRead <= totalSections
    ) {
      setCurrentSection(progress.materials.lastRead);
    }
  }, []);

  const handleSectionChange = (sectionNum) => {
    if (sectionNum < 1 || sectionNum > totalSections) return;

    setCurrentSection(sectionNum);

    const completed = [...new Set([...completedSections, sectionNum])];
    setCompletedSections(completed);

    const progress = getProgress() || {};

    saveProgress({
      ...progress,
      materials: {
        ...progress.materials,
        completed,
        lastRead: sectionNum,
      },
    });

    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const renderDeviceDetails = (device) => (
    <div className="device-detail-box animate-fade-in">
      <h4 style={{ color: 'var(--dark-blue)', marginBottom: '0.5rem' }}>
        {device.name}
      </h4>
      <p style={{ color: 'var(--text-dark)', marginBottom: '0.75rem' }}>
        <strong>Fungsi:</strong> {device.func}
      </p>
      <p style={{ color: 'var(--text-muted)' }}>
        💡 <strong>Contoh penggunaan:</strong> {device.example}
      </p>
    </div>
  );

  return (
    <div className="materials-page animate-fade-in">
      <div className="materials-header">
        <h1 className="materials-title">Materi Pembelajaran I/O</h1>
        <p className="materials-subtitle">
          Informatika Kelas X — Manajemen Sistem Input/Output
        </p>
      </div>

      <div className="materials-progress-card">
        <div className="materials-progress-info">
          <span>
            Materi {currentSection} dari {totalSections}
          </span>
          <span>
            {Math.round(
              (completedSections.length / totalSections) * 100
            )}
            % Selesai
          </span>
        </div>

        <ProgressBar
          value={completedSections.length}
          max={totalSections}
          showPercentage={false}
        />

        <div className="section-tabs-nav">
          {sectionTitles.map((title, index) => {
            const number = index + 1;
            const isDone = completedSections.includes(number);

            return (
              <button
                key={number}
                className={`section-tab-btn ${
                  currentSection === number ? 'active' : ''
                } ${isDone ? 'completed-tab' : ''}`}
                onClick={() => handleSectionChange(number)}
                title={title}
              >
                {isDone && (
                  <CheckCircle2
                    size={14}
                    color={
                      currentSection === number
                        ? '#fff'
                        : 'var(--success-green)'
                    }
                  />
                )}
                <span>Bagian {number}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="section-content-card">
        {currentSection === 1 && (
          <div className="animate-fade-in">
            <span className="section-badge">BAGIAN 1 DARI 9</span>
            <h2 className="section-heading">Apa itu Input dan Output?</h2>

            <h3 style={{ margin: '1.5rem 0 0.75rem' }}>
              🎬 Video Pembelajaran: Mengenal Input dan Output
            </h3>
            <p style={{ marginBottom: '1rem' }}>
              Simak video berikut untuk mengenal cara komputer menerima
              masukan dan menghasilkan keluaran.
            </p>

            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9',
                overflow: 'hidden',
                borderRadius: '12px',
                backgroundColor: '#f1f5f9',
                marginBottom: '1.5rem',
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/NkoS2JXaBuM?si=ZKfQVCuD6X5-yGhi"
                title="Video Pembelajaran Input dan Output"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  border: 0,
                }}
                allowFullScreen
              />
            </div>

            <p className="concept-text">
              Komputer berinteraksi dengan pengguna melalui proses input
              dan output. Data atau perintah dimasukkan ke komputer,
              diproses oleh sistem, kemudian hasilnya dapat ditampilkan
              atau dikeluarkan melalui perangkat tertentu.
            </p>

            <div
              style={{
                display: 'grid',
                gap: '1.25rem',
                marginBottom: '1.5rem',
              }}
            >
              <div
                style={{
                  backgroundColor: 'var(--light-blue)',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius)',
                  borderLeft: '4px solid var(--primary-blue)',
                }}
              >
                <h4 style={{ color: 'var(--primary-blue)' }}>
                  ➡️ Input (Masukan)
                </h4>
                <p>
                  Input adalah data atau perintah yang dimasukkan ke
                  komputer untuk diproses. Contohnya, menekan tombol
                  keyboard untuk mengetik huruf.
                </p>
              </div>

              <div
                style={{
                  backgroundColor: '#f0fdf4',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius)',
                  borderLeft: '4px solid var(--success-green)',
                }}
              >
                <h4 style={{ color: 'var(--success-green)' }}>
                  ⬅️ Output (Keluaran)
                </h4>
                <p>
                  Output adalah hasil yang dikeluarkan komputer setelah
                  data diproses. Contohnya, huruf yang diketik muncul
                  pada layar monitor.
                </p>
              </div>
            </div>

            <h4 style={{ color: 'var(--dark-blue)', marginBottom: '0.75rem' }}>
              Contoh Perangkat Input dan Output
            </h4>

            <div className="comparison-grid">
              <div className="comparison-box input-box">
                <h4>INPUT 📥</h4>
                <p>Data masuk ke komputer.</p>
                <span>Keyboard, Mouse, Microphone, Scanner</span>
              </div>

              <div className="comparison-box output-box">
                <h4>OUTPUT 📤</h4>
                <p>Hasil komputer disampaikan kepada pengguna.</p>
                <span>Monitor, Printer, Speaker</span>
              </div>
            </div>
          </div>
        )}

        {currentSection === 2 && (
          <div className="animate-fade-in">
            <span className="section-badge">BAGIAN 2 DARI 9</span>
            <h2 className="section-heading">Perangkat Input</h2>
            <p className="concept-text">
              Perangkat input digunakan untuk memasukkan data atau
              perintah ke komputer. Pilih setiap perangkat untuk
              melihat fungsi dan contoh penggunaannya.
            </p>

            <div className="device-grid">
              {inputDevices.map((device) => (
                <button
                  type="button"
                  key={device.id}
                  className={`device-card ${
                    selectedInputDevice === device.id ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedInputDevice(device.id)}
                  aria-pressed={selectedInputDevice === device.id}
                >
                  <div className="device-icon-box">{device.icon}</div>
                  <h4>{device.name}</h4>
                </button>
              ))}
            </div>

            {renderDeviceDetails(
              inputDevices.find(
                (device) => device.id === selectedInputDevice
              ) || inputDevices[0]
            )}
          </div>
        )}

        {currentSection === 3 && (
          <div className="animate-fade-in">
            <span className="section-badge">BAGIAN 3 DARI 9</span>
            <h2 className="section-heading">Perangkat Output</h2>
            <p className="concept-text">
              Perangkat output menyampaikan hasil pemrosesan komputer
              kepada pengguna. Hasilnya dapat berupa tampilan visual,
              cetakan, atau suara. Pilih perangkat untuk mempelajarinya.
            </p>

            <div className="device-grid">
              {outputDevices.map((device) => (
                <button
                  type="button"
                  key={device.id}
                  className={`device-card ${
                    selectedOutputDevice === device.id ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedOutputDevice(device.id)}
                  aria-pressed={selectedOutputDevice === device.id}
                >
                  <div className="device-icon-box">{device.icon}</div>
                  <h4>{device.name}</h4>
                </button>
              ))}
            </div>

            {renderDeviceDetails(
              outputDevices.find(
                (device) => device.id === selectedOutputDevice
              ) || outputDevices[0]
            )}
          </div>
        )}

        {currentSection === 4 && (
          <div className="animate-fade-in">
            <span className="section-badge">BAGIAN 4 DARI 9</span>
            <h2 className="section-heading">Mengapa I/O Perlu Dikelola?</h2>

            <div className="analogy-card">
              <div className="analogy-header">
                <School size={24} color="var(--primary-blue)" />
                <span>Analogi Sederhana: Komputer Seperti Sekolah</span>
              </div>
              <p style={{ color: 'var(--text-dark)', lineHeight: '1.7' }}>
                Bayangkan sebuah sekolah yang memiliki banyak siswa
                dan guru. Agar kegiatan berjalan teratur, diperlukan
                pengaturan komunikasi dan penggunaan fasilitas.
                Komputer juga membutuhkan pengelolaan agar aplikasi
                dapat berkomunikasi dengan perangkat input dan output
                secara teratur.
              </p>
            </div>

            <h4 style={{ color: 'var(--dark-blue)', margin: '1.5rem 0 0.75rem' }}>
              Apa yang perlu dikelola?
            </h4>
            <ul
              style={{
                paddingLeft: '1.25rem',
                color: 'var(--text-dark)',
                lineHeight: '1.8',
              }}
            >
              <li>Komunikasi antara aplikasi dan perangkat.</li>
              <li>Pengiriman data dari perangkat input ke aplikasi.</li>
              <li>Pengiriman hasil dari aplikasi ke perangkat output.</li>
              <li>Penggunaan perangkat agar tidak terjadi konflik.</li>
            </ul>

            <div className="highlight-banner">
              Sistem operasi membantu mengatur komunikasi antara
              perangkat keras dan aplikasi.
            </div>
          </div>
        )}

        {currentSection === 5 && (
          <div className="animate-fade-in">
            <span className="section-badge">BAGIAN 5 DARI 9</span>
            <h2 className="section-heading">Manajemen Input/Output</h2>

            <div
              style={{
                backgroundColor: 'var(--light-blue)',
                padding: '1.5rem',
                borderRadius: 'var(--radius)',
                marginBottom: '1.5rem',
              }}
            >
              <p
                style={{
                  color: 'var(--dark-blue)',
                  fontWeight: '600',
                  lineHeight: '1.7',
                }}
              >
                Manajemen Input/Output adalah pengelolaan komunikasi
                dan penggunaan perangkat input/output oleh sistem
                operasi agar data dapat berpindah antara perangkat
                keras dan aplikasi.
              </p>
            </div>

            <h4 style={{ color: 'var(--dark-blue)', marginBottom: '1rem' }}>
              Dua Alur Komunikasi I/O
            </h4>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem',
              }}
            >
              <div
                style={{
                  background: '#f8fafc',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <h5 style={{ color: 'var(--primary-blue)' }}>
                  Alur Input
                </h5>
                <p style={{ fontWeight: '700', lineHeight: '1.7' }}>
                  Perangkat Input → Sistem Operasi → Aplikasi
                </p>
                <p>
                  Contoh: tombol keyboard ditekan, lalu huruf diterima
                  oleh aplikasi pengolah kata.
                </p>
              </div>

              <div
                style={{
                  background: '#f8fafc',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <h5 style={{ color: 'var(--success-green)' }}>
                  Alur Output
                </h5>
                <p style={{ fontWeight: '700', lineHeight: '1.7' }}>
                  Aplikasi → Sistem Operasi → Perangkat Output
                </p>
                <p>
                  Contoh: aplikasi meminta tampilan dokumen diperbarui,
                  lalu hasilnya terlihat pada monitor.
                </p>
              </div>
            </div>

            <h4 style={{ color: 'var(--dark-blue)', marginBottom: '0.75rem' }}>
              Peran Setiap Komponen
            </h4>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div className="device-detail-box">
                <strong>1. Perangkat I/O</strong>
                <p>
                  Menerima data dari pengguna atau menyampaikan hasil
                  komputer kepada pengguna.
                </p>
              </div>
              <div className="device-detail-box">
                <strong>2. Sistem Operasi</strong>
                <p>
                  Mengatur komunikasi antara perangkat keras dan
                  aplikasi serta membantu penggunaan perangkat.
                </p>
              </div>
              <div className="device-detail-box">
                <strong>3. Aplikasi</strong>
                <p>
                  Menggunakan input untuk menjalankan fungsi program
                  dan menghasilkan informasi yang perlu ditampilkan.
                </p>
              </div>
            </div>
          </div>
        )}

        {currentSection === 6 && (
          <div className="animate-fade-in">
            <span className="section-badge">BAGIAN 6 DARI 9</span>
            <h2 className="section-heading">
              Peran Sistem Operasi dalam Manajemen I/O
            </h2>

            <p className="concept-text">
              Sistem operasi menjadi penghubung antara aplikasi dan
              perangkat keras. Dengan bantuan sistem operasi, aplikasi
              dapat menggunakan perangkat tanpa harus mengatur seluruh
              cara kerja perangkat tersebut secara langsung.
            </p>

            <div style={{ display: 'grid', gap: '1.25rem' }}>
              <div
                style={{
                  background: '#eff6ff',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius)',
                  border: '1px solid #bfdbfe',
                }}
              >
                <h4 style={{ color: 'var(--primary-blue)', marginBottom: '0.5rem' }}>
                  1. Saat Pengguna Mengetik
                </h4>
                <p>
                  <strong>Keyboard → Sistem Operasi → Aplikasi</strong>
                </p>
                <p>
                  Sistem operasi membantu menerima informasi dari
                  keyboard dan meneruskannya ke aplikasi yang sedang
                  digunakan.
                </p>
              </div>

              <div
                style={{
                  background: '#f0fdf4',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius)',
                  border: '1px solid #bbf7d0',
                }}
              >
                <h4 style={{ color: 'var(--success-green)', marginBottom: '0.5rem' }}>
                  2. Saat Aplikasi Menampilkan Dokumen
                </h4>
                <p>
                  <strong>Aplikasi → Sistem Operasi → Monitor</strong>
                </p>
                <p>
                  Aplikasi menghasilkan informasi yang akan ditampilkan.
                  Sistem operasi membantu mengatur penyampaian informasi
                  tersebut sehingga hasilnya dapat terlihat di monitor.
                </p>
              </div>
            </div>

            <div className="highlight-banner">
              Sistem operasi membantu aplikasi berkomunikasi dengan
              perangkat input dan output.
            </div>
          </div>
        )}

        {currentSection === 7 && (
          <div className="animate-fade-in">
            <span className="section-badge">BAGIAN 7 DARI 9</span>
            <h2 className="section-heading">Alur Input (Masukan)</h2>

            <p className="concept-text">
              Amati perjalanan huruf saat pengguna menekan tombol
              keyboard hingga huruf diterima oleh aplikasi pengolah kata.
            </p>

            <Diagram
              mode="input"
              title="Alur Input Huruf A"
              deviceLabel="⌨️ Keyboard"
              appLabel="📄 Aplikasi Pengolah Kata"
              sampleData="Huruf A"
              customDetails={{
                device: {
                  title: '1. Keyboard (Perangkat Input)',
                  desc: 'Pengguna menekan tombol huruf A untuk memasukkan data ke komputer.',
                },
                os: {
                  title: '2. Sistem Operasi',
                  desc: 'Sistem operasi membantu menerima informasi dari keyboard dan meneruskannya ke aplikasi yang aktif.',
                },
                app: {
                  title: '3. Aplikasi Pengolah Kata',
                  desc: 'Aplikasi menerima input dan memprosesnya sebagai karakter yang akan ditampilkan pada dokumen.',
                },
              }}
            />

            <div className="device-detail-box" style={{ marginTop: '1.5rem' }}>
              <strong>Hubungkan dengan LKPD</strong>
              <p>
                Tuliskan urutan perjalanan data dari keyboard ke aplikasi.
                Jelaskan peran sistem operasi di dalam alur tersebut.
              </p>
            </div>
          </div>
        )}

        {currentSection === 8 && (
          <div className="animate-fade-in">
            <span className="section-badge">BAGIAN 8 DARI 9</span>
            <h2 className="section-heading">Alur Output (Keluaran)</h2>

            <p className="concept-text">
              Setelah aplikasi memproses input, hasilnya dapat ditampilkan
              kepada pengguna. Amati alur penyampaian informasi dari
              aplikasi menuju monitor.
            </p>

            <Diagram
              mode="output"
              title="Alur Output Tampilan Visual"
              deviceLabel="🖥️ Monitor"
              appLabel="📄 Aplikasi"
              sampleData="Teks pada dokumen"
              customDetails={{
                app: {
                  title: '1. Aplikasi',
                  desc: 'Aplikasi menentukan teks, gambar, atau informasi yang perlu ditampilkan.',
                },
                os: {
                  title: '2. Sistem Operasi',
                  desc: 'Sistem operasi membantu mengatur penyampaian informasi visual menuju perangkat output.',
                },
                device: {
                  title: '3. Monitor',
                  desc: 'Monitor menampilkan informasi visual agar dapat dilihat pengguna.',
                },
              }}
            />

            <div className="device-detail-box" style={{ marginTop: '1.5rem' }}>
              <strong>Hubungkan dengan LKPD</strong>
              <p>
                Jelaskan mengapa monitor termasuk perangkat output
                dan bagaimana sistem operasi membantu aplikasi
                menampilkan informasi.
              </p>
            </div>
          </div>
        )}

        {currentSection === 9 && (
          <div className="animate-fade-in">
            <span className="section-badge">BAGIAN 9 DARI 9</span>
            <h2 className="section-heading">Contoh Permasalahan I/O</h2>

            <p className="concept-text">
              Gangguan I/O dapat terjadi pada perangkat, sistem operasi,
              aplikasi, atau proses penyampaian output. Periksa alurnya
              sebelum menentukan kemungkinan penyebab.
            </p>

            <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2rem' }}>
              <div
                style={{
                  backgroundColor: '#fffbeb',
                  border: '2px solid #fde68a',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius)',
                }}
              >
                <h4
                  style={{
                    color: 'var(--warning-amber)',
                    marginBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <HelpCircle size={20} />
                  Studi Kasus 1: Ketikan Tidak Muncul
                </h4>

                <p style={{ marginBottom: '0.75rem' }}>
                  <em>
                    Rani mengetik menggunakan keyboard, tetapi huruf
                    yang ditekan tidak muncul pada dokumen, padahal
                    aplikasi pengolah kata masih terbuka.
                  </em>
                </p>

                <div
                  style={{
                    background: '#fff',
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid #fef3c7',
                  }}
                >
                  <strong>Hal yang perlu diperiksa:</strong>
                  <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                    <li>Apakah keyboard terhubung dan berfungsi?</li>
                    <li>Apakah aplikasi pengolah kata sedang aktif?</li>
                    <li>Apakah sistem operasi mengenali keyboard?</li>
                    <li>Apakah informasi dapat diteruskan sampai ke tampilan monitor?</li>
                  </ul>
                </div>

                <p style={{ marginTop: '0.75rem' }}>
                  <strong>Tugas:</strong> Tuliskan kemungkinan penyebab,
                  komponen yang perlu diperiksa, alasanmu, dan solusi
                  yang sesuai pada LKPD.
                </p>
              </div>

              <div
                style={{
                  backgroundColor: '#fffbeb',
                  border: '2px solid #fde68a',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius)',
                }}
              >
                <h4
                  style={{
                    color: 'var(--warning-amber)',
                    marginBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <HelpCircle size={20} />
                  Studi Kasus 2: Dokumen Tidak Tercetak
                </h4>

                <p style={{ marginBottom: '0.75rem' }}>
                  <em>
                    Printer terdeteksi oleh komputer, tetapi dokumen
                    yang dikirim dari aplikasi tidak kunjung dicetak.
                  </em>
                </p>

                <div
                  style={{
                    background: '#fff',
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid #fef3c7',
                  }}
                >
                  <strong>Hal yang perlu diperiksa:</strong>
                  <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                    <li>Apakah printer memiliki kertas dan tinta?</li>
                    <li>Apakah koneksi printer berfungsi?</li>
                    <li>Apakah ada dokumen yang tertahan dalam antrean cetak?</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="completion-banner animate-fade-in">
              <Sparkles
                size={40}
                color="var(--success-green)"
                style={{ marginBottom: '0.5rem' }}
              />
              <h3>🎉 Materi Selesai!</h3>
              <p>
                Kamu telah mempelajari perangkat input dan output,
                peran sistem operasi, alur komunikasi I/O, serta contoh
                gangguan yang dapat dianalisis.
              </p>
              <p style={{ margin: '0.75rem 0 1rem' }}>
                Sebelum melanjutkan, pastikan hasil pengamatan dan
                analisismu sudah dicatat pada LKPD.
              </p>
              <Button
                variant="success"
                size="lg"
                icon={<ArrowRight size={20} />}
                onClick={() => setActiveTab('game')}
              >
                Mulai Latihan Game
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="materials-nav-footer">
        <Button
          variant="outline"
          disabled={currentSection === 1}
          icon={<ChevronLeft size={18} />}
          onClick={() => handleSectionChange(currentSection - 1)}
        >
          Sebelumnya
        </Button>

        <span
          style={{
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            fontWeight: '600',
          }}
        >
          {currentSection} / {totalSections}
        </span>

        <Button
          variant="primary"
          disabled={currentSection === totalSections}
          onClick={() => handleSectionChange(currentSection + 1)}
        >
          <span>Berikutnya</span>
          <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  );
}
