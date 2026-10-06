/**
 * Evaluates performance category based on percentage
 * 90–100 = Sangat Baik
 * 80–89  = Baik
 * 70–79  = Cukup
 * <70    = Perlu Belajar Lagi
 */
export const getPerformanceCategory = (score) => {
  if (score >= 90) {
    return {
      label: 'Sangat Baik',
      color: '#10b981',
      badgeClass: 'category-excellent',
      description: 'Luar biasa! Kamu telah menguasai manajemen I/O dengan sangat baik.',
    };
  } else if (score >= 80) {
    return {
      label: 'Baik',
      color: '#2563eb',
      badgeClass: 'category-good',
      description: 'Bagus sekali! Pemahamanmu tentang alur dan konsep I/O sudah solid.',
    };
  } else if (score >= 70) {
    return {
      label: 'Cukup',
      color: '#f59e0b',
      badgeClass: 'category-fair',
      description: 'Pemahamanmu cukup baik, namun masih ada beberapa konsep yang perlu dipelajari lagi.',
    };
  } else {
    return {
      label: 'Perlu Belajar Lagi',
      color: '#ef4444',
      badgeClass: 'category-needs-work',
      description: 'Jangan berkecil hati! Pelajari kembali materi dan tingkatkan latihanmu.',
    };
  }
};

/**
 * Generates personalized learning recommendation based on weak areas
 */
export const getRecommendation = (progress) => {
  const { game, simulation, troubleshooter, evaluation } = progress;

  const gameScore = game?.score || 0;
  const isSimDone = simulation?.isCompleted;
  const troubleScore = troubleshooter?.score || 0;
  const evalScore = evaluation?.highScore || evaluation?.lastScore || 0;

  if (!isSimDone) {
    return 'Coba buka menu Simulasi I/O untuk melihat animasi bagaimana data bergerak dari perangkat ke aplikasi melalui sistem operasi.';
  }

  if (gameScore < 70) {
    return 'Skor Game alur I/O kamu masih perlu ditingkatkan. Buka kembali materi Alur Input & Output, lalu coba Game lagi.';
  }

  if (troubleScore < 70) {
    return 'Skor troubleshooting kamu masih rendah. Coba kembali ke materi Alur I/O dan pelajari analisis permasalahan I/O.';
  }

  if (evalScore < 80) {
    return 'Untuk menyempurnakan pemahaman evaluasi, pelajari ulang peran Sistem Operasi dalam mengelola antrean dan driver I/O.';
  }

  return 'Hebat! Kamu sudah mencapai performa optimal di semua modul pembelajaran I/O.';
};
