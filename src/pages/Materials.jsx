import React, { useState, useEffect } from 'react';
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
  Cpu,
  LayoutGrid,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import Diagram from '../components/Diagram';
import { getProgress, saveProgress } from '../utils/progress';
import '../styles/materials.css';

export default function Materials({ setActiveTab }) {
  const [currentSection, setCurrentSection] = useState(1);
  const [completedSections, setCompletedSections] = useState([1]);
  const [selectedInputDevice, setSelectedInputDevice] = useState('keyboard');
  const [selectedOutputDevice, setSelectedOutputDevice] = useState('monitor');

  const totalSections = 9;

  // Load progress on mount
  useEffect(() => {
    const p = getProgress();
    const done = p.materials?.completed || [1];
    if (!done.includes(1)) done.push(1);
    setCompletedSections(done);
  }, []);

  // Mark section completed
  const handleSectionChange = (sectionNum) => {
    if (sectionNum < 1 || sectionNum > totalSections) return;
    setCurrentSection(sectionNum);

    if (!completedSections.includes(sectionNum)) {
      const updated = [...completedSections, sectionNum];
      setCompletedSections(updated);

      const p = getProgress();
      const updatedProgress = {
        ...p,
        materials: {
          ...p.materials,
          completed: updated,
          lastRead: sectionNum,
        },
      };
      saveProgress(updatedProgress);
    }
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Section titles
  const sectionTitles = [
    '1. Apa itu Input dan Output?',
    '2. Perangkat Input',
    '3. Perangkat Output',
    '4. Mengapa I/O Perlu Dikelola?',
    '5. Manajemen Input/Output',
    '6. Peran Sistem Operasi dalam Manajemen I/O',
    '7. Alur Input',
    '8. Alur Output',
    '9. Contoh Permasalahan I/O',
  ];

  // Device data dictionaries
  const inputDevices = [
    {
      id: 'keyboard',
      name: 'Keyboard',
      icon: <Keyboard size={28} />,
      func: 'Digunakan untuk memasukkan huruf, angka, dan perintah teks ke dalam komputer.',
      example: 'Mengetik dokumen laporan tugas sekolah di Microsoft Word atau Google Docs.',
    },
    {
      id: 'mouse',
      name: 'Mouse',
      icon: <Mouse size={28} />,
      func: 'Digunakan untuk menggerakkan pointer kursor, memilih opsi, dan menjalankan perintah.',
      example: 'Mengklik tombol menu, menggeser file, atau menggambar di aplikasi pengolah grafis.',
    },
    {
      id: 'scanner',
      name: 'Scanner',
      icon: <HardDrive size={28} />,
      func: 'Digunakan untuk memasukkan foto, gambar, atau dokumen fisik ke dalam bentuk file digital.',
      example: 'Pindai lembar tugas fisik atau kartu identitas menjadi file PDF/JPEG.',
    },
    {
      id: 'microphone',
      name: 'Microphone',
      icon: <Mic size={28} />,
      func: 'Digunakan untuk memasukkan gelombang suara menjadi sinyal audio digital.',
      example: 'Merekam penjelasan tugas audio atau berbicara saat rapat online di Zoom/Google Meet.',
    },
  ];

  const outputDevices = [
    {
      id: 'monitor',
      name: 'Monitor',
      icon: <Monitor size={28} />,
      func: 'Menampilkan visual teks, gambar, video, dan antarmuka informasi dari komputer.',
      example: 'Melihat tampilan presentasi slide, menonton video pembelajaran, atau membaca artikel.',
    },
    {
      id: 'printer',
      name: 'Printer',
      icon: <Printer size={28} />,
      func: 'Menghasilkan dokumen informasi digital dalam bentuk fisik/cetakan di atas kertas.',
      example: 'Mencetak lembar soal latihan, sertifikat prestasi, atau makalah tugas.',
    },
    {
      id: 'speaker',
      name: 'Speaker',
      icon: <Volume2 size={28} />,
      func: 'Menghasilkan sinyal suara audio yang dapat didengar oleh pengguna.',
      example: 'Mendengarkan penjelasan materi berformat audio atau musik pengiring.',
    },
  ];

  return (
    <div className="materials-page animate-fade-in">
      {/* Header */}
      <div className="materials-header">
        <h1 className="materials-title">Materi Pembelajaran I/O</h1>
        <p className="materials-subtitle">
          Modul Microlearning Informatika Kelas X — Manajemen Sistem Input/Output
        </p>
      </div>

      {/* Progress Card & Section Tabs */}
      <div className="materials-progress-card">
        <div className="materials-progress-info">
          <span>Materi {currentSection} dari {totalSections}</span>
          <span>{Math.round((completedSections.length / totalSections) * 100)}% Selesai</span>
        </div>
        <ProgressBar
          value={completedSections.length}
          max={totalSections}
          showPercentage={false}
        />

        {/* Quick Navigation Tabs */}
        <div className="section-tabs-nav">
          {sectionTitles.map((title, idx) => {
            const secNum = idx + 1;
            const isDone = completedSections.includes(secNum);
            return (
              <button
                key={secNum}
                className={`section-tab-btn ${currentSection === secNum ? 'active' : ''} ${
                  isDone ? 'completed-tab' : ''
                }`}
                onClick={() => handleSectionChange(secNum)}
              >
                {isDone && <CheckCircle2 size={14} color={currentSection === secNum ? '#fff' : 'var(--success-green)'} />}
                <span>Sec {secNum}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section Content Card */}
      <div className="section-content-card">
        {/* SECTION 1 */}
        {currentSection === 1 && (
          <div className="animate-fade-in">
            <span className="section-badge">BAGIAN 1 DARI 9</span>
            <h2 className="section-heading">Apa itu Input dan Output?</h2>

            <p className="concept-text">
              Dalam sistem komputer, terjadi pertukaran informasi secara terus-menerus. Komputer membutuhkan perintah dari luar untuk bekerja, dan memberikan hasil pemrosesannya kembali kepada pengguna.
            </p>

            <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ backgroundColor: 'var(--light-blue)', padding: '1.25rem', borderRadius: 'var(--radius)', borderLeft: '4px solid var(--primary-blue)' }}>
                <h4 style={{ color: 'var(--primary-blue)', marginBottom: '0.3rem' }}>➡️ Input (Masukan)</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                  <strong>Input</strong> adalah data atau perintah yang dimasukkan pengguna atau lingkungan luar ke dalam sistem komputer untuk diproses.
                </p>
              </div>

              <div style={{ backgroundColor: '#f0fdf4', padding: '1.25rem', borderRadius: 'var(--radius)', borderLeft: '4px solid var(--success-green)' }}>
                <h4 style={{ color: 'var(--success-green)', marginBottom: '0.3rem' }}>⬅️ Output (Keluaran)</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                  <strong>Output</strong> adalah informasi atau hasil yang dikeluarkan oleh komputer setelah data diproses.
                </p>
              </div>
            </div>

            {/* Visual Comparison Box */}
            <h4 style={{ color: 'var(--dark-blue)', marginTop: '2rem', marginBottom: '0.75rem' }}>Visualisasi Alur Dasar</h4>
            <div className="comparison-grid">
              <div className="comparison-box input-box">
                <h4>INPUT 📥</h4>
                <p style={{ fontWeight: '700', color: 'var(--dark-blue)', marginBottom: '0.5rem' }}>
                  "Data masuk ke komputer"
                </p>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Contoh: Keyboard, Mouse, Microphone, Scanner
                </span>
              </div>

              <div className="comparison-box output-box">
                <h4>OUTPUT 📤</h4>
                <p style={{ fontWeight: '700', color: 'var(--dark-blue)', marginBottom: '0.5rem' }}>
                  "Informasi keluar dari komputer"
                </p>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Contoh: Monitor, Printer, Speaker
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2 */}
        {currentSection === 2 && (
          <div className="animate-fade-in">
            <span className="section-badge">BAGIAN 2 DARI 9</span>
            <h2 className="section-heading">Perangkat Input</h2>

            <p className="concept-text">
              Perangkat input berfungsi sebagai alat komunikasi pengguna untuk memberikan instruksi ke komputer. Klik salah satu perangkat di bawah ini untuk melihat fungsinya:
            </p>

            {/* Interactive Cards Grid */}
            <div className="device-grid">
              {inputDevices.map((dev) => (
                <div
                  key={dev.id}
                  className={`device-card ${selectedInputDevice === dev.id ? 'selected' : ''}`}
                  onClick={() => setSelectedInputDevice(dev.id)}
                >
                  <div className="device-icon-box">{dev.icon}</div>
                  <h4>{dev.name}</h4>
                </div>
              ))}
            </div>

            {/* Selected Detail Popup */}
            {selectedInputDevice && (
              <div className="device-detail-box animate-fade-in">
                {(() => {
                  const dev = inputDevices.find((d) => d.id === selectedInputDevice);
                  return (
                    <>
                      <h4 style={{ color: 'var(--dark-blue)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>{dev.name}</span>
                      </h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)', marginBottom: '0.75rem' }}>
                        <strong>Fungsi:</strong> {dev.func}
                      </p>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        💡 <strong>Contoh Penggunaan:</strong> {dev.example}
                      </p>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* SECTION 3 */}
        {currentSection === 3 && (
          <div className="animate-fade-in">
            <span className="section-badge">BAGIAN 3 DARI 9</span>
            <h2 className="section-heading">Perangkat Output</h2>

            <p className="concept-text">
              Perangkat output bertugas menyajikan hasil olahan data komputer agar dapat dipahami dan dimanfaatkan oleh manusia. Klik pada perangkat untuk mempelajari fungsinya:
            </p>

            {/* Interactive Device Grid */}
            <div className="device-grid">
              {outputDevices.map((dev) => (
                <div
                  key={dev.id}
                  className={`device-card ${selectedOutputDevice === dev.id ? 'selected' : ''}`}
                  onClick={() => setSelectedOutputDevice(dev.id)}
                >
                  <div className="device-icon-box">{dev.icon}</div>
                  <h4>{dev.name}</h4>
                </div>
              ))}
            </div>

            {/* Detail Box */}
            {selectedOutputDevice && (
              <div className="device-detail-box animate-fade-in" style={{ borderLeftColor: 'var(--success-green)' }}>
                {(() => {
                  const dev = outputDevices.find((d) => d.id === selectedOutputDevice);
                  return (
                    <>
                      <h4 style={{ color: 'var(--dark-blue)', marginBottom: '0.5rem' }}>
                        {dev.name}
                      </h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)', marginBottom: '0.75rem' }}>
                        <strong>Fungsi:</strong> {dev.func}
                      </p>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        💡 <strong>Contoh Penggunaan:</strong> {dev.example}
                      </p>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* SECTION 4 */}
        {currentSection === 4 && (
          <div className="animate-fade-in">
            <span className="section-badge">BAGIAN 4 DARI 9</span>
            <h2 className="section-heading">Mengapa I/O Perlu Dikelola?</h2>

            {/* School Analogy */}
            <div className="analogy-card">
              <div className="analogy-header">
                <School size={24} color="var(--primary-blue)" />
                <span>Analogi Sederhana: Komputer Seperti Sekolah</span>
              </div>
              <p style={{ color: 'var(--text-dark)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                "Bayangkan komputer seperti sebuah sekolah yang ramai. Ada ratusan siswa (perangkat & aplikasi) yang mengirim dan menerima informasi bersamaan. Tanpa adanya petugas lalu lintas atau kepala sekolah (<strong>Sistem Operasi</strong>), suasana akan kacau, sinyal bertabrakan, dan instruksi tidak akan sampai tepat waktu."
              </p>
            </div>

            <h4 style={{ color: 'var(--dark-blue)', margin: '1.5rem 0 0.75rem' }}>
              Dampak Tanpa Pengelolaan I/O:
            </h4>
            <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-dark)', lineHeight: '1.8' }}>
              <li>Perangkat keras tidak dapat berkomunikasi secara langsung dengan aplikasi.</li>
              <li>Data dari keyboard atau mouse bisa salah terkirim ke aplikasi yang salah.</li>
              <li>Aplikasi akan saling berebut menggunakan hardware (seperti printer) secara bersamaan hingga terjadi eror crash.</li>
            </ul>
          </div>
        )}

        {/* SECTION 5 */}
        {currentSection === 5 && (
          <div className="animate-fade-in">
            <span className="section-badge">BAGIAN 5 DARI 9</span>
            <h2 className="section-heading">Manajemen Input/Output</h2>

            <div style={{ backgroundColor: 'var(--light-blue)', padding: '1.5rem', borderRadius: 'var(--radius)', marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '1.05rem', color: 'var(--dark-blue)', fontWeight: '600', lineHeight: '1.6' }}>
                "Manajemen Input/Output adalah bagian dari sistem operasi yang membantu mengatur komunikasi antara aplikasi/proses dengan perangkat I/O."
              </p>
            </div>

            {/* Visual concept */}
            <h4 style={{ color: 'var(--dark-blue)', marginBottom: '1rem' }}>Struktur Komunikasi Dua Arah</h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)' }}>
                <h5 style={{ color: 'var(--primary-blue)', marginBottom: '0.5rem' }}>Alur Masukan (Input):</h5>
                <p style={{ fontWeight: '700', fontSize: '0.9rem' }}>
                  Perangkat I/O ➔ Sistem Operasi ➔ Aplikasi/Proses
                </p>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)' }}>
                <h5 style={{ color: 'var(--success-green)', marginBottom: '0.5rem' }}>Alur Keluaran (Output):</h5>
                <p style={{ fontWeight: '700', fontSize: '0.9rem' }}>
                  Aplikasi/Proses ➔ Sistem Operasi ➔ Perangkat I/O
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ padding: '0.85rem 1rem', background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                <strong>Perangkat I/O:</strong> Perangkat fisik yang digunakan untuk menerima masukan atau menghasilkan keluaran data.
              </div>
              <div style={{ padding: '0.85rem 1rem', background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                <strong>Sistem Operasi:</strong> Penerjemah dan pengatur penerimaan sinyal antrean (driver & buffer).
              </div>
              <div style={{ padding: '0.85rem 1rem', background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                <strong>Aplikasi/Proses:</strong> Program perangkat lunak yang mengolah data pengguna.
              </div>
            </div>
          </div>
        )}

        {/* SECTION 6 */}
        {currentSection === 6 && (
          <div className="animate-fade-in">
            <span className="section-badge">BAGIAN 6 DARI 9</span>
            <h2 className="section-heading">Peran Sistem Operasi dalam Manajemen I/O</h2>

            <p className="concept-text">
              Aplikasi seperti Word, WhatsApp, atau Browser <strong>tidak perlu mengontrol hardware secara langsung</strong>. Sistem operasi yang melakukan semua pekerjaan rumit tersebut di latar belakang.
            </p>

            <div style={{ display: 'grid', gap: '1.25rem' }}>
              <div style={{ background: '#eff6ff', padding: '1.25rem', borderRadius: 'var(--radius)', border: '1px solid #bfdbfe' }}>
                <h4 style={{ color: 'var(--primary-blue)', marginBottom: '0.5rem' }}>1. Ketika Pengguna Mengetik di Keyboard</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                  <strong>Keyboard ➔ Sistem Operasi ➔ Aplikasi</strong>
                  <br />
                  Sistem operasi menerima tombol ketikan fisik dari keyboard, memverifikasi driver, lalu meneruskannya ke aplikasi pengolah kata yang sedang aktif.
                </p>
              </div>

              <div style={{ background: '#f0fdf4', padding: '1.25rem', borderRadius: 'var(--radius)', border: '1px solid #bbf7d0' }}>
                <h4 style={{ color: 'var(--success-green)', marginBottom: '0.5rem' }}>2. Ketika Aplikasi Menampilkan Gambar</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                  <strong>Aplikasi ➔ Sistem Operasi ➔ Monitor</strong>
                  <br />
                  Aplikasi meminta data visual ditampilkan, kemudian sistem operasi mengirimkan instruksi ke kartu grafis dan monitor.
                </p>
              </div>
            </div>

            {/* Highlight Banner */}
            <div className="highlight-banner">
              "Sistem operasi berperan sebagai penghubung dan penerjemah utama antara aplikasi dan perangkat I/O."
            </div>
          </div>
        )}

        {/* SECTION 7 */}
        {currentSection === 7 && (
          <div className="animate-fade-in">
            <span className="section-badge">BAGIAN 7 DARI 9</span>
            <h2 className="section-heading">Alur Input (Masukan)</h2>

            <p className="concept-text">
              Mari amati alur konkret saat siswa memencet tombol huruf <strong>"A"</strong> pada Keyboard hingga muncul di aplikasi:
            </p>

            <Diagram
              mode="input"
              title="Alur Pengiriman Input Huruf 'A'"
              deviceLabel="⌨️ Keyboard"
              appLabel="📄 Aplikasi Pengolah Kata"
              sampleData="Huruf 'A'"
              customDetails={{
                device: {
                  title: '1. Keyboard (Perangkat Input)',
                  desc: 'Pengguna menekan tombol "A". Sinyal listrik fisik terdeteksi oleh sirkuit keyboard.',
                },
                os: {
                  title: '2. Sistem Operasi (Pengelola I/O)',
                  desc: 'Sistem operasi menangkap sinyal interrupt dari keyboard, menerjemahkan kode tombol (scancode "A"), dan memasukkannya ke antrean masukan.',
                },
                app: {
                  title: '3. Aplikasi (Pengolah Kata)',
                  desc: 'Aplikasi aktif menerima karakter "A" dari sistem operasi dan menampilkan huruf tersebut pada dokumen.',
                },
              }}
            />
          </div>
        )}

        {/* SECTION 8 */}
        {currentSection === 8 && (
          <div className="animate-fade-in">
            <span className="section-badge">BAGIAN 8 DARI 9</span>
            <h2 className="section-heading">Alur Output (Keluaran)</h2>

            <p className="concept-text">
              Mari amati alur saat aplikasi hendak menampilkan hasil informasi ke layar Monitor:
            </p>

            <Diagram
              mode="output"
              title="Alur Pengiriman Output Tampilan Visual"
              deviceLabel="🖥️ Monitor (Perangkat Output)"
              appLabel="📄 Aplikasi / Game"
              sampleData="Frame Gambar Visual"
              customDetails={{
                app: {
                  title: '1. Aplikasi / Game',
                  desc: 'Aplikasi menentukan teks atau gambar yang perlu ditampilkan kepada pengguna.',
                },
                os: {
                  title: '2. Sistem Operasi',
                  desc: 'Sistem operasi menerima data dari aplikasi, mengalokasikan memori grafis, dan memanggil driver monitor.',
                },
                device: {
                  title: '3. Monitor (Perangkat Output)',
                  desc: 'Monitor menerima sinyal sinar piksel dari sistem operasi dan menampilkan visual utuh ke layar.',
                },
              }}
            />
          </div>
        )}

        {/* SECTION 9 */}
        {currentSection === 9 && (
          <div className="animate-fade-in">
            <span className="section-badge">BAGIAN 9 DARI 9</span>
            <h2 className="section-heading">Contoh Permasalahan I/O</h2>

            <p className="concept-text">
              Dalam kehidupan sehari-hari, sistem I/O dapat mengalami gangguan. Berikut adalah contoh situasi permasalahan yang perlu dianalisis:
            </p>

            <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2rem' }}>
              {/* Problem 1 */}
              <div style={{ backgroundColor: '#fffbeb', border: '2px solid #fde68a', padding: '1.5rem', borderRadius: 'var(--radius)' }}>
                <h4 style={{ color: 'var(--warning-amber)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <HelpCircle size={20} />
                  <span>Studi Kasus 1: Ketikan Tidak Muncul</span>
                </h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)', marginBottom: '0.75rem' }}>
                  <em>"Rani mengetik menggunakan keyboard, tetapi karakter tidak muncul pada layar monitor."</em>
                </p>
                <div style={{ background: '#fff', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid #fef3c7', fontSize: '0.9rem' }}>
                  <strong>Komponen yang perlu dianalisis:</strong> Keyboard (apakah tersambung?), Sistem Operasi (driver terdeteksi?), Aplikasi (apakah jendela aktif diklik?), dan Monitor.
                </div>
              </div>

              {/* Problem 2 */}
              <div style={{ backgroundColor: '#fffbeb', border: '2px solid #fde68a', padding: '1.5rem', borderRadius: 'var(--radius)' }}>
                <h4 style={{ color: 'var(--warning-amber)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <HelpCircle size={20} />
                  <span>Studi Kasus 2: Dokumen Printer Tertahan</span>
                </h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)', marginBottom: '0.75rem' }}>
                  <em>"Printer terdeteksi oleh komputer, tetapi dokumen dari aplikasi tidak kunjung mencetak."</em>
                </p>
                <div style={{ background: '#fff', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid #fef3c7', fontSize: '0.9rem' }}>
                  <strong>Komponen yang perlu dianalisis:</strong> Antrean cetak (spooler) di Sistem Operasi, koneksi fisik printer, atau status kertas/tinta.
                </div>
              </div>
            </div>

            {/* Completion Card Banner */}
            <div className="completion-banner animate-fade-in">
              <Sparkles size={40} color="var(--success-green)" style={{ marginBottom: '0.5rem' }} />
              <h3>🎉 Materi Selesai!</h3>
              <p>
                Selamat! Kamu telah berhasil mempelajari seluruh 9 bagian materi dasar <strong>Manajemen Sistem Input/Output</strong>.
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

      {/* Navigation Buttons Footer */}
      <div className="materials-nav-footer">
        <Button
          variant="outline"
          disabled={currentSection === 1}
          icon={<ChevronLeft size={18} />}
          onClick={() => handleSectionChange(currentSection - 1)}
        >
          Sebelumnya
        </Button>

        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>
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
