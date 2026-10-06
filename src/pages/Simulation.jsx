import React, { useState } from 'react';
import Card from '../components/Card';
import { simulationOptions } from '../data/simulationData';
import { playSound } from '../utils/audio';
import '../styles/simulation.css';

export default function Simulation({ isMuted = false }) {
  const [inputDevice, setInputDevice] = useState(null);
  const [outputDevice, setOutputDevice] = useState(null);

  const [flowChecked, setFlowChecked] = useState(false);
  const [flowResult, setFlowResult] = useState(null);

  const inputOptions = simulationOptions.filter(
    (item) => item.type === 'input'
  );

  const outputOptions = simulationOptions.filter(
    (item) => item.type === 'output'
  );

  /*
   * =========================================
   * NAMA PERANGKAT
   * =========================================
   *
   * Input Keyboard -> Keyboard
   * Output Printer -> Printer
   */
  const getDeviceName = (device) => {
    if (!device) return '';

    return device.name
      .replace(/^Input\s+/i, '')
      .replace(/^Output\s+/i, '');
  };


  /*
   * =========================================
   * SUARA PERANGKAT
   * =========================================
   *
   * Saat perangkat dipilih, yang dibacakan
   * hanya nama perangkatnya.
   */
  const speakDevice = (device) => {
    if (isMuted || !device) return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const speech = new SpeechSynthesisUtterance(
        getDeviceName(device)
      );

      speech.lang = 'id-ID';
      speech.rate = 0.9;
      speech.pitch = 1;

      window.speechSynthesis.speak(speech);
    }
  };


  /*
   * =========================================
   * PILIH INPUT
   * =========================================
   */
  const handleInputSelect = (device) => {
    setInputDevice(device);

    // Reset hasil sebelumnya
    setOutputDevice(null);
    setFlowChecked(false);
    setFlowResult(null);

    speakDevice(device);
    playSound('click', isMuted);
  };


  /*
   * =========================================
   * PILIH OUTPUT
   * =========================================
   */
  const handleOutputSelect = (device) => {
    if (!inputDevice) return;

    setOutputDevice(device);

    // Reset hasil check
    setFlowChecked(false);
    setFlowResult(null);

    speakDevice(device);
    playSound('click', isMuted);
  };


  /*
   * =========================================
   * CEK PASANGAN INPUT + OUTPUT
   * =========================================
   *
   * Pasangan yang benar:
   *
   * Keyboard   -> Monitor
   * Mouse      -> Monitor
   * Microphone -> Speaker
   */
  const correctConnections = {
    keyboard: 'monitor',
    mouse: 'monitor',
    microphone: 'speaker',
  };


  /*
   * =========================================
   * CHECK ALUR
   * =========================================
   */
  const handleCheckFlow = () => {
    if (!inputDevice || !outputDevice) return;

    const correctOutput =
      correctConnections[inputDevice.id];

    const isCorrect =
      correctOutput === outputDevice.id;

    setFlowChecked(true);

    if (isCorrect) {
      setFlowResult('correct');

      playSound('correct', isMuted);
    } else {
      setFlowResult('wrong');

      playSound('incorrect', isMuted);
    }
  };


  /*
   * =========================================
   * RESET SIMULASI
   * =========================================
   */
  const resetSimulation = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    setInputDevice(null);
    setOutputDevice(null);
    setFlowChecked(false);
    setFlowResult(null);
  };


  return (
    <div className="simulation-page container animate-fade-in">

      {/* =====================================
          HEADER
      ====================================== */}
      <div className="simulation-header">

        <h1>
          ⚡ Simulasi I/O Interaktif
        </h1>

        <p>
          Simulasikan bagaimana data dikirim dari perangkat
          input, dikelola oleh Sistem Operasi, hingga diterima
          oleh perangkat output.
        </p>

      </div>


      {/* =====================================
          LANGKAH 1
      ====================================== */}
      <Card title="⌨️ Langkah 1 — Pilih Perangkat Input">

        <p className="simulation-description">
          Pilih perangkat yang digunakan untuk memasukkan
          data ke dalam komputer.
        </p>


        <div className="simulation-device-grid">

          {inputOptions.map((device) => (

            <button
              key={device.id}
              className={`simulation-device ${
                inputDevice?.id === device.id
                  ? 'selected'
                  : ''
              }`}
              onClick={() => handleInputSelect(device)}
            >

              <span className="simulation-device-icon">
                {device.icon}
              </span>

              <strong>
                {device.name}
              </strong>

              <small>
                Perangkat Input
              </small>

              {inputDevice?.id === device.id && (

                <span className="simulation-selected">
                  ✓ Dipilih
                </span>

              )}

            </button>

          ))}

        </div>


        {inputDevice && (

          <div className="simulation-selection-feedback">

            🔊 Kamu memilih{' '}

            <strong>
              {getDeviceName(inputDevice)}
            </strong>

          </div>

        )}

      </Card>


      {/* =====================================
          LANGKAH 2
      ====================================== */}
      <Card title="🖥️ Langkah 2 — Pilih Perangkat Output">

        <p className="simulation-description">
          Pilih perangkat yang akan menerima atau
          menampilkan hasil dari data yang diproses.
        </p>


        {!inputDevice && (

          <div className="simulation-warning">
            💡 Pilih perangkat input terlebih dahulu.
          </div>

        )}


        <div className="simulation-device-grid">

          {outputOptions.map((device) => (

            <button
              key={device.id}
              className={`simulation-device ${
                outputDevice?.id === device.id
                  ? 'selected'
                  : ''
              }`}
              onClick={() => handleOutputSelect(device)}
              disabled={!inputDevice}
            >

              <span className="simulation-device-icon">
                {device.icon}
              </span>

              <strong>
                {device.name}
              </strong>

              <small>
                Perangkat Output
              </small>

              {outputDevice?.id === device.id && (

                <span className="simulation-selected">
                  ✓ Dipilih
                </span>

              )}

            </button>

          ))}

        </div>


        {outputDevice && (

          <div className="simulation-selection-feedback">

            🔊 Kamu memilih{' '}

            <strong>
              {getDeviceName(outputDevice)}
            </strong>

          </div>

        )}

      </Card>


      {/* =====================================
          LANGKAH 3
      ====================================== */}
      <Card title="🔄 Langkah 3 — Alur Komunikasi I/O">

        {!inputDevice || !outputDevice ? (

          <div className="simulation-empty-flow">

            <div className="simulation-empty-icon">
              🔄
            </div>

            <h3>
              Alur belum siap
            </h3>

            <p>
              Pilih perangkat input dan output terlebih
              dahulu untuk melihat alur komunikasi I/O.
            </p>

          </div>

        ) : (

          <>

            <p className="simulation-description">
              Perhatikan alur komunikasi antara perangkat
              input, Sistem Operasi, dan perangkat output.
              Setelah yakin, tekan tombol{' '}
              <strong>Check Alur</strong>.
            </p>


            {/* =================================
                ALUR
            ================================== */}

            <div
              className={`simulation-flow ${
                flowChecked
                  ? flowResult === 'correct'
                    ? 'flow-correct'
                    : 'flow-wrong'
                  : ''
              }`}
            >

              {/* INPUT */}

              <div className="simulation-flow-node active">

                <div className="simulation-flow-icon">
                  {inputDevice.icon}
                </div>

                <span className="simulation-flow-label">
                  INPUT
                </span>

                <strong>
                  {getDeviceName(inputDevice)}
                </strong>

              </div>


              {/* ARROW */}

              <div className="simulation-flow-arrow">
                →
              </div>


              {/* SISTEM OPERASI */}

              <div className="simulation-flow-node simulation-os">

                <div className="simulation-flow-icon">
                  ⚙️
                </div>

                <span className="simulation-flow-label">
                  SISTEM OPERASI
                </span>

                <strong>
                  Mengelola Data
                </strong>

              </div>


              {/* ARROW */}

              <div className="simulation-flow-arrow">
                →
              </div>


              {/* OUTPUT */}

              <div className="simulation-flow-node active">

                <div className="simulation-flow-icon">
                  {outputDevice.icon}
                </div>

                <span className="simulation-flow-label">
                  OUTPUT
                </span>

                <strong>
                  {getDeviceName(outputDevice)}
                </strong>

              </div>

            </div>


            {/* =================================
                CHECK BUTTON
            ================================== */}

            {!flowChecked && (

              <div className="simulation-check-wrapper">

                <button
                  className="simulation-check-button"
                  onClick={handleCheckFlow}
                >
                  ✓ Check Alur
                </button>

              </div>

            )}


            {/* =================================
                HASIL BENAR
            ================================== */}

            {flowChecked &&
              flowResult === 'correct' && (

                <div className="simulation-result simulation-result-correct">

                  <div className="simulation-result-icon">
                    ✓
                  </div>

                  <div>

                    <strong>
                      Benar! 🎉
                    </strong>

                    <p>
                      Alur komunikasi sudah tepat.
                      Data dari{' '}
                      <strong>
                        {getDeviceName(inputDevice)}
                      </strong>{' '}
                      dikelola oleh Sistem Operasi
                      sebelum diteruskan ke{' '}
                      <strong>
                        {getDeviceName(outputDevice)}
                      </strong>.
                    </p>

                  </div>

                </div>

              )}


            {/* =================================
                HASIL SALAH
            ================================== */}

            {flowChecked &&
              flowResult === 'wrong' && (

                <div className="simulation-result simulation-result-wrong">

                  <div className="simulation-result-icon">
                    😭
                  </div>

                  <div>

                    <strong>
                      Ups, belum tepat!
                    </strong>

                    <p>
                      Pasangan perangkat belum tepat.
                      Coba perhatikan fungsi masing-masing
                      perangkat input dan output.
                    </p>

                  </div>

                </div>

              )}

          </>

        )}

      </Card>


      {/* =====================================
          RESET
      ====================================== */}

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