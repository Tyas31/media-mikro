// =========================================================
// AUDIO UTILITY
// Menggunakan Web Audio API
// Tidak membutuhkan file audio eksternal
// =========================================================

let audioCtx = null;

let musicTimer = null;
let musicPlaying = false;


// =========================================================
// MEMBUAT / MENGAKTIFKAN AUDIO CONTEXT
// =========================================================

const getAudioContext = async () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    if (!audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        window.webkitAudioContext;

      if (!AudioContextClass) {
        console.warn(
          'Web Audio API tidak didukung browser.'
        );

        return null;
      }

      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      await audioCtx.resume();
    }

    return audioCtx;

  } catch (error) {
    console.warn(
      'Audio Context gagal dijalankan:',
      error
    );

    return null;
  }
};


// =========================================================
// FUNGSI UTAMA AUDIO
// =========================================================

export const playSound = async (
  type = 'click',
  isMuted = false
) => {

  if (isMuted) {
    return;
  }

  try {

    const ctx = await getAudioContext();

    if (!ctx) {
      return;
    }

    const now = ctx.currentTime;


    // =====================================================
    // SUARA BENAR
    // =====================================================

    if (type === 'correct') {

      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = 'sine';

      oscillator.frequency.setValueAtTime(
        523.25,
        now
      );

      oscillator.frequency.exponentialRampToValueAtTime(
        659.25,
        now + 0.1
      );

      oscillator.frequency.exponentialRampToValueAtTime(
        783.99,
        now + 0.2
      );

      gain.gain.setValueAtTime(
        0.18,
        now
      );

      gain.gain.exponentialRampToValueAtTime(
        0.01,
        now + 0.4
      );

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.start(now);
      oscillator.stop(now + 0.4);

      return;
    }


    // =====================================================
    // SUARA SALAH
    // =====================================================

    if (type === 'incorrect') {

      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = 'triangle';

      oscillator.frequency.setValueAtTime(
        260,
        now
      );

      oscillator.frequency.exponentialRampToValueAtTime(
        180,
        now + 0.15
      );

      gain.gain.setValueAtTime(
        0.2,
        now
      );

      gain.gain.exponentialRampToValueAtTime(
        0.01,
        now + 0.3
      );

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.start(now);
      oscillator.stop(now + 0.3);

      return;
    }


    // =====================================================
    // SUARA KLIK
    // =====================================================

    if (type === 'click') {

      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = 'sine';

      oscillator.frequency.setValueAtTime(
        500,
        now
      );

      oscillator.frequency.exponentialRampToValueAtTime(
        250,
        now + 0.06
      );

      gain.gain.setValueAtTime(
        0.1,
        now
      );

      gain.gain.exponentialRampToValueAtTime(
        0.01,
        now + 0.06
      );

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.start(now);
      oscillator.stop(now + 0.06);

      return;
    }


    // =====================================================
    // SUARA PINDAH HALAMAN
    // =====================================================

    if (type === 'navigate') {

      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = 'sine';

      // Nada naik seperti efek transition
      oscillator.frequency.setValueAtTime(
        330,
        now
      );

      oscillator.frequency.exponentialRampToValueAtTime(
        660,
        now + 0.12
      );

      gain.gain.setValueAtTime(
        0.07,
        now
      );

      gain.gain.exponentialRampToValueAtTime(
        0.01,
        now + 0.18
      );

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.start(now);
      oscillator.stop(now + 0.18);

      return;
    }


    // =====================================================
    // SUARA SELESAI
    // =====================================================

    if (type === 'finish') {

      const notes = [
        {
          frequency: 523.25,
          start: 0,
          duration: 0.15,
        },
        {
          frequency: 659.25,
          start: 0.15,
          duration: 0.15,
        },
        {
          frequency: 783.99,
          start: 0.3,
          duration: 0.15,
        },
        {
          frequency: 1046.5,
          start: 0.45,
          duration: 0.4,
        },
      ];

      notes.forEach((note) => {

        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();

        const startTime =
          now + note.start;

        const endTime =
          startTime + note.duration;

        oscillator.type = 'sine';

        oscillator.frequency.setValueAtTime(
          note.frequency,
          startTime
        );

        gain.gain.setValueAtTime(
          0.18,
          startTime
        );

        gain.gain.exponentialRampToValueAtTime(
          0.01,
          endTime
        );

        oscillator.connect(gain);
        gain.connect(ctx.destination);

        oscillator.start(startTime);
        oscillator.stop(endTime);
      });

      return;
    }

  } catch (error) {

    console.warn(
      'Audio playback gagal:',
      error
    );

  }
};


// =========================================================
// BACKGROUND MUSIC UNTUK LEVEL 3
// =========================================================

export const startGameMusic = async () => {

  if (musicPlaying) {
    return;
  }

  try {

    const ctx = await getAudioContext();

    if (!ctx) {
      return;
    }

    musicPlaying = true;

    const melody = [
      261.63, // C4
      329.63, // E4
      392.00, // G4
      329.63, // E4
      293.66, // D4
      349.23, // F4
      440.00, // A4
      349.23, // F4
    ];

    let noteIndex = 0;

    const playMusicNote = () => {

      if (!musicPlaying) {
        return;
      }

      try {

        const now = ctx.currentTime;

        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();

        oscillator.type = 'sine';

        oscillator.frequency.setValueAtTime(
          melody[noteIndex],
          now
        );

        gain.gain.setValueAtTime(
          0,
          now
        );

        gain.gain.linearRampToValueAtTime(
          0.035,
          now + 0.03
        );

        gain.gain.exponentialRampToValueAtTime(
          0.001,
          now + 0.35
        );

        oscillator.connect(gain);
        gain.connect(ctx.destination);

        oscillator.start(now);
        oscillator.stop(now + 0.4);

        noteIndex =
          (noteIndex + 1) % melody.length;

      } catch (error) {

        console.warn(
          'Game music gagal dimainkan:',
          error
        );

      }
    };

    playMusicNote();

    musicTimer = setInterval(
      playMusicNote,
      400
    );

  } catch (error) {

    musicPlaying = false;

    console.warn(
      'Game music gagal dijalankan:',
      error
    );

  }
};


// =========================================================
// MENGHENTIKAN BACKGROUND MUSIC
// =========================================================

export const stopGameMusic = () => {

  musicPlaying = false;

  if (musicTimer) {

    clearInterval(musicTimer);

    musicTimer = null;
  }
};