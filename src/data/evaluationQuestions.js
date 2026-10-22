
export const evaluationQuestions = [
  {
    id: 1,
    question: 'Apa yang dimaksud dengan perangkat input?',
    options: [
      'Perangkat untuk menampilkan hasil pengolahan data',
      'Perangkat untuk memasukkan data ke komputer',
      'Perangkat untuk menyimpan sistem operasi',
      'Perangkat untuk menghubungkan komputer ke internet',
    ],
    correctAnswer: 1,
    explanation:
      'Perangkat input digunakan untuk memasukkan data atau instruksi ke komputer, misalnya keyboard, mouse, dan mikrofon.',
  },
  {
    id: 2,
    question: 'Manakah yang termasuk perangkat input?',
    options: ['Monitor', 'Speaker', 'Keyboard', 'Printer'],
    correctAnswer: 2,
    explanation:
      'Keyboard merupakan perangkat input karena digunakan untuk memasukkan karakter dan perintah ke komputer.',
  },
  {
    id: 3,
    question: 'Apa fungsi utama keyboard dalam sistem komputer?',
    options: [
      'Menghasilkan suara',
      'Memasukkan karakter dan perintah',
      'Menampilkan gambar',
      'Mencetak dokumen',
    ],
    correctAnswer: 1,
    explanation:
      'Keyboard mengirimkan input berupa tombol yang ditekan agar dapat diproses oleh sistem dan aplikasi.',
  },
  {
    id: 4,
    question: 'Perangkat yang digunakan untuk menggerakkan pointer pada layar adalah...',
    options: ['Mouse', 'Printer', 'Speaker', 'Monitor'],
    correctAnswer: 0,
    explanation:
      'Mouse merupakan perangkat input yang digunakan untuk menggerakkan pointer dan memberikan perintah melalui klik.',
  },
  {
    id: 5,
    question: 'Apa yang dimaksud dengan perangkat output?',
    options: [
      'Perangkat untuk memasukkan data',
      'Perangkat untuk mengolah data',
      'Perangkat untuk menyajikan hasil pengolahan data',
      'Perangkat untuk menyimpan data sementara',
    ],
    correctAnswer: 2,
    explanation:
      'Perangkat output menyajikan hasil pemrosesan komputer, misalnya melalui tampilan monitor, cetakan printer, atau suara speaker.',
  },
  {
    id: 6,
    question: 'Manakah yang termasuk perangkat output?',
    options: ['Keyboard', 'Mouse', 'Mikrofon', 'Monitor'],
    correctAnswer: 3,
    explanation:
      'Monitor merupakan perangkat output karena menampilkan informasi visual dari komputer.',
  },
  {
    id: 7,
    question: 'Dalam manajemen I/O, Sistem Operasi berfungsi untuk...',
    options: [
      'Mengelola komunikasi antara perangkat I/O dan sistem atau aplikasi',
      'Menggantikan semua perangkat keras',
      'Membuat komputer tidak membutuhkan memori',
      'Menghapus semua data dari perangkat I/O',
    ],
    correctAnswer: 0,
    explanation:
      'Sistem Operasi membantu mengelola komunikasi dan penggunaan perangkat I/O agar dapat digunakan oleh aplikasi.',
  },
  {
    id: 8,
    question: 'Apa tujuan pengelolaan perangkat I/O oleh Sistem Operasi?',
    options: [
      'Agar penggunaan perangkat dapat dikelola secara teratur dan efisien',
      'Agar komputer tidak membutuhkan CPU',
      'Agar semua perangkat bekerja tanpa Sistem Operasi',
      'Agar perangkat input berubah menjadi perangkat output',
    ],
    correctAnswer: 0,
    explanation:
      'Pengelolaan I/O membantu sistem mengatur penggunaan perangkat, menangani permintaan, dan mengoordinasikan komunikasi dengan perangkat.',
  },
  {
    id: 9,
    question:
      'Rani mengetik huruf pada keyboard. Setelah input diterima, aplikasi pengolah kata memproses ketikan tersebut. Perangkat apa yang menampilkan hasilnya?',
    options: ['Mikrofon', 'Printer', 'Monitor', 'Mouse'],
    correctAnswer: 2,
    explanation:
      'Monitor menampilkan hasil ketikan. Secara konseptual, alurnya melibatkan keyboard, Sistem Operasi, aplikasi, dan sistem tampilan.',
  },
  {
    id: 10,
    question:
      'Rani menekan tombol keyboard, tetapi huruf tidak muncul di monitor. Aplikasi pengolah kata masih berjalan normal. Apa tindakan yang paling tepat?',
    options: [
      'Langsung mengganti monitor',
      'Memeriksa keyboard, koneksi, dan alur komunikasi I/O secara bertahap',
      'Langsung menghapus Sistem Operasi',
      'Mengganti speaker',
    ],
    correctAnswer: 1,
    explanation:
      'Gejala tersebut belum membuktikan komponen tertentu rusak. Pemeriksaan bertahap diperlukan untuk menemukan kemungkinan gangguan pada perangkat, Sistem Operasi, aplikasi, atau jalur tampilan.',
  },
  {
    id: 11,
    question:
      'Ketika Sinta mencetak dokumen, printer menyala tetapi kertas tidak keluar. Bagian mana yang masuk akal untuk diperiksa?',
    options: [
      'Keyboard saja',
      'Koneksi printer, antrean cetak, pengaturan, dan kondisi printer',
      'Speaker saja',
      'Warna latar belakang monitor saja',
    ],
    correctAnswer: 1,
    explanation:
      'Printer yang menyala belum tentu siap mencetak. Periksa koneksi, antrean pekerjaan, pengaturan pencetakan, dan kondisi perangkat.',
  },
  {
    id: 12,
    question:
      'Saat video diputar, gambar bergerak tetapi tidak terdengar suara. Apa yang sebaiknya diperiksa?',
    options: [
      'Keyboard dan printer',
      'Mouse dan scanner',
      'Speaker, volume, dan pengaturan audio Sistem Operasi',
      'Kertas dan tinta printer',
    ],
    correctAnswer: 2,
    explanation:
      'Masalah keluaran audio dapat berkaitan dengan speaker, volume, perangkat keluaran yang dipilih, atau pengaturan audio Sistem Operasi.',
  },
];
