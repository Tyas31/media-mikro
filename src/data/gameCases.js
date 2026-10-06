// Data game cases for Stage 3 Game
export const gameCases = [
  {
    id: 1,
    title: 'Pengetikan Teks',
    device: 'Keyboard',
    deviceType: 'input',
    targetApp: 'Pengolah Kata',
    correctSequence: ['Keyboard', 'Sistem Operasi', 'Pengolah Kata'],
    description: 'Bagaimana karakter yang diketik pengguna sampai ke aplikasi pengolah kata?'
  },
  {
    id: 2,
    title: 'Navigasi Kursor',
    device: 'Mouse',
    deviceType: 'input',
    targetApp: 'Peramban Web',
    correctSequence: ['Mouse', 'Sistem Operasi', 'Peramban Web'],
    description: 'Bagaimana pergerakan mouse diterjemahkan hingga kursor bergerak di browser?'
  },
  {
    id: 3,
    title: 'Merekam Suara',
    device: 'Microphone',
    deviceType: 'input',
    targetApp: 'Perekam Suara',
    correctSequence: ['Microphone', 'Sistem Operasi', 'Perekam Suara'],
    description: 'Bagaimana suara yang masuk melalui microphone dapat diterima aplikasi?'
  },
  {
    id: 4,
    title: 'Menampilkan Teks',
    device: 'Monitor',
    deviceType: 'output',
    targetApp: 'Pengolah Kata',
    correctSequence: ['Pengolah Kata', 'Sistem Operasi', 'Monitor'],
    description: 'Bagaimana teks dari aplikasi dapat ditampilkan pada monitor?'
  },
  {
    id: 5,
    title: 'Mencetak Dokumen',
    device: 'Printer',
    deviceType: 'output',
    targetApp: 'Pengolah Kata',
    correctSequence: ['Pengolah Kata', 'Sistem Operasi', 'Printer'],
    description: 'Bagaimana dokumen dari aplikasi dapat dikirim ke printer?'
  },
  {
    id: 6,
    title: 'Memutar Suara',
    device: 'Speaker',
    deviceType: 'output',
    targetApp: 'Pemutar Musik',
    correctSequence: ['Pemutar Musik', 'Sistem Operasi', 'Speaker'],
    description: 'Bagaimana suara dari aplikasi dapat dikeluarkan melalui speaker?'
  }
];