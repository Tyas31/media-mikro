
export const troubleshootingCases = [
  {
    id: 1,
    icon: '⌨️',
    title: 'Ke Mana Perginya Ketikan Rani?',
    problem:
      'Rani sedang mengerjakan tugas menggunakan aplikasi pengolah kata. Ia menekan tombol pada keyboard, tetapi huruf yang diketik tidak muncul pada monitor. Aplikasi pengolah kata masih terbuka dan berjalan normal (tidak freeze).',

    stages: [
      {
        question:
          'Berdasarkan kasus Rani, komponen atau bagian mana saja yang perlu diperiksa untuk menemukan kemungkinan penyebab masalah?',

        options: [
          'Keyboard saja karena pasti keyboard rusak.',
          'Monitor saja karena huruf tidak terlihat.',
          'Keyboard, Sistem Operasi, Aplikasi/Proses, dan Monitor.',
          'Printer dan speaker karena keduanya termasuk perangkat I/O.',
        ],

        correctIndex: 2,

        hint:
          'Jangan langsung menyimpulkan bahwa satu perangkat pasti rusak. Telusuri alur komunikasi I/O mulai dari keyboard, Sistem Operasi, aplikasi pengolah kata, hingga monitor. Aplikasi yang masih berjalan normal belum tentu menjamin seluruh alur I/O berfungsi.',

        explanation:
          'Keempat komponen perlu dipertimbangkan karena ketikan harus diterima dari keyboard, diteruskan melalui Sistem Operasi ke aplikasi, lalu hasilnya ditampilkan pada monitor. Pemeriksaan bertahap diperlukan untuk menemukan bagian yang mungkin mengalami gangguan.',
      },
      {
        question:
          'Jika kelompokmu harus menentukan kemungkinan lokasi gangguan, tindakan apa yang paling tepat?',

        options: [
          'Langsung mengganti keyboard tanpa pemeriksaan.',
          'Memeriksa setiap bagian alur I/O dan mencari titik ketika data tidak diteruskan.',
          'Menginstal ulang Sistem Operasi tanpa pemeriksaan.',
          'Menyimpulkan bahwa monitor rusak karena huruf tidak terlihat.',
        ],

        correctIndex: 1,

        hint:
          'Gunakan alur komunikasi yang telah disusun di LKPD. Periksa perangkat dan koneksinya, pastikan aplikasi menerima input, lalu periksa apakah hasilnya dapat ditampilkan pada monitor.',

        explanation:
          'Gangguan belum dapat dipastikan hanya dari gejalanya. Pemeriksaan bertahap membantu kelompok menemukan kemungkinan lokasi masalah berdasarkan bukti, bukan sekadar menebak komponen yang rusak.',
      },
      {
        question:
          'Setelah menemukan bagian yang diduga bermasalah, apa yang sebaiknya dilakukan?',

        options: [
          'Menentukan langkah penanganan sesuai hasil pemeriksaan dan menguji kembali alur I/O.',
          'Mengganti semua perangkat komputer sekaligus.',
          'Mengabaikan masalah karena aplikasi masih terbuka.',
          'Langsung menyimpulkan bahwa semua komponen mengalami kerusakan.',
        ],

        correctIndex: 0,

        hint:
          'Pilih penanganan sesuai hasil pemeriksaan. Misalnya, periksa koneksi keyboard, pastikan aplikasi aktif, atau periksa pengaturan perangkat jika ditemukan indikasi masalah pada bagian tersebut.',

        explanation:
          'Solusi harus disesuaikan dengan kemungkinan penyebab yang ditemukan. Setelah penanganan dilakukan, uji kembali apakah ketikan dapat diterima aplikasi dan ditampilkan pada monitor.',
      },
    ],
  },

  {
    id: 2,
    icon: '🖱️',
    title: 'Mouse Tidak Bergerak',
    problem:
      'Budi menggerakkan mouse, tetapi pointer tidak bergerak di layar. Mouse terlihat menyala ketika dihubungkan ke komputer.',

    stages: [
      {
        question:
          'Apa yang sebaiknya diperiksa terlebih dahulu untuk menelusuri penyebab masalah?',

        options: [
          'Koneksi mouse dan kondisi perangkat input.',
          'Kertas yang ada di printer.',
          'Speaker komputer.',
          'Warna latar belakang monitor.',
        ],

        correctIndex: 0,

        hint:
          'Mouse menyala belum tentu berarti seluruh fungsinya berjalan normal. Periksa koneksi dan kondisi perangkat terlebih dahulu.',

        explanation:
          'Pemeriksaan awal dilakukan pada perangkat yang menunjukkan gejala. Jika koneksi dan kondisi mouse baik tetapi pointer tetap tidak bergerak, pemeriksaan dapat dilanjutkan pada pengaturan atau pengenalan perangkat oleh Sistem Operasi.',
      },
    ],
  },

  {
    id: 3,
    icon: '🖨️',
    title: 'Printer Tidak Mencetak',
    problem:
      'Sinta menekan tombol Print, tetapi dokumen tidak keluar dari printer meskipun printer menyala.',

    stages: [
      {
        question:
          'Bagian mana saja yang masuk akal untuk diperiksa?',

        options: [
          'Keyboard saja.',
          'Printer, koneksi, pengaturan cetak, dan pengelolaan antrean oleh Sistem Operasi.',
          'Mouse saja.',
          'Speaker komputer saja.',

        ],

        correctIndex: 1,

        hint:
          'Printer menyala tidak selalu berarti proses pencetakan berjalan. Periksa koneksi, kondisi printer, pengaturan cetak, dan kemungkinan dokumen masih tertahan dalam antrean.',

        explanation:
          'Perintah cetak berasal dari aplikasi dan diteruskan melalui pengelolaan I/O menuju printer. Gangguan dapat terjadi pada koneksi, pengaturan, antrean cetak, atau perangkat itu sendiri.',
      },
    ],
  },

  {
    id: 4,
    icon: '🔊',
    title: 'Speaker Tidak Mengeluarkan Suara',
    problem:
      'Andi memutar video di komputer. Video tetap berjalan, tetapi tidak terdengar suara dari speaker.',

    stages: [
      {
        question:
          'Apa yang sebaiknya diperiksa untuk menelusuri penyebab masalah?',

        options: [
          'Keyboard dan printer.',
          'Mouse dan kertas printer.',
          'Speaker, pengaturan volume, dan pengaturan audio Sistem Operasi.',
          'Scanner dan keyboard.',

        ],

        correctIndex: 2,

        hint:
          'Video yang berjalan tidak menjamin keluaran audio berfungsi. Periksa speaker, volume, dan pengaturan audio komputer.',

        explanation:
          'Aplikasi dapat terus memutar video meskipun suara tidak terdengar. Pemeriksaan dilakukan pada perangkat output audio dan pengaturan yang mengatur keluaran suara.',
      },
    ],
  },
];
