// Data troubleshooting cases for Stage 5 Troubleshooter

export const troubleshootingCases = [
  {
    id: 1,
    icon: '⌨️',
    title: 'Keyboard Tidak Merespons',
    problem:
      'Rani dapat mengetik menggunakan keyboard di Notepad, tetapi karakter tidak muncul saat mengetik di aplikasi ujian online.',

    stages: [
      {
        question:
          'Komponen mana saja yang perlu dianalisis untuk menemukan penyebab masalah?',

        options: [
          'Hanya fisik keyboard',
          'Hanya layar monitor',
          'Keyboard, Sistem Operasi, dan Aplikasi Ujian',
          'Hanya kabel printer',
        ],

        correctIndex: 2,

        hint:
          'Keyboard berfungsi normal di Notepad. Artinya perangkat input secara fisik kemungkinan tidak bermasalah. Analisis perlu dilanjutkan pada Sistem Operasi dan aplikasi ujian.',
      },
    ],
  },

  {
    id: 2,
    icon: '🖱️',
    title: 'Mouse Tidak Bergerak',
    problem:
      'Budi menggerakkan mouse, tetapi pointer tidak bergerak di layar. Mouse terlihat menyala ketika dicolokkan ke komputer.',

    stages: [
      {
        question:
          'Apa yang sebaiknya diperiksa terlebih dahulu untuk menemukan penyebab masalah?',

        options: [
          'Mouse dan koneksinya',
          'Printer',
          'Speaker',
          'Kertas printer',
        ],

        correctIndex: 0,

        hint:
          'Mouse menyala tetapi pointer tidak bergerak. Periksa koneksi mouse dan perangkat input terlebih dahulu sebelum menganalisis komponen lainnya.',
      },
    ],
  },

  {
    id: 3,
    icon: '🖨️',
    title: 'Printer Tidak Mencetak',
    problem:
      'Sinta sudah menekan tombol Print, tetapi dokumen tidak keluar dari printer meskipun printer menyala.',

    stages: [
      {
        question:
          'Komponen apa yang perlu diperiksa untuk menemukan penyebab masalah?',

        options: [
          'Keyboard saja',
          'Printer, koneksi, dan sistem operasi',
          'Mouse saja',
          'Speaker komputer',
        ],

        correctIndex: 1,

        hint:
          'Printer menyala tetapi tidak mencetak. Periksa perangkat printer, koneksi, serta pengelolaan perangkat oleh Sistem Operasi.',
      },
    ],
  },

  {
    id: 4,
    icon: '🔊',
    title: 'Speaker Tidak Mengeluarkan Suara',
    problem:
      'Andi memutar video di komputer, tetapi tidak terdengar suara dari speaker. Video tetap berjalan seperti biasa.',

    stages: [
      {
        question:
          'Apa yang sebaiknya diperiksa untuk menemukan penyebab masalah?',

        options: [
          'Keyboard dan printer',
          'Mouse dan monitor',
          'Speaker, volume, dan pengaturan audio Sistem Operasi',
          'Kertas printer',
        ],

        correctIndex: 2,

        hint:
          'Video berjalan tetapi tidak ada suara. Periksa speaker, volume, dan pengaturan audio yang dikelola oleh Sistem Operasi.',
      },
    ],
  },
];