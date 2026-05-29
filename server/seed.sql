-- ============================================================
-- Sistem Pakar Karir - Seed Data
-- ============================================================

CREATE DATABASE IF NOT EXISTS sistem_pakar;
USE sistem_pakar;

-- --- USERS ---
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama_lengkap VARCHAR(255) NOT NULL,
  jenjang VARCHAR(100) NOT NULL,
  jurusan VARCHAR(255) NOT NULL,
  session_id VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- CAREER ROLES ---
CREATE TABLE IF NOT EXISTS career_roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100) DEFAULT 'work',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- SKILLS ---
CREATE TABLE IF NOT EXISTS skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) DEFAULT NULL,
  description TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- ROLE SKILLS ---
CREATE TABLE IF NOT EXISTS role_skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role_id INT NOT NULL,
  skill_id INT NOT NULL,
  weight INT DEFAULT 50 COMMENT 'Importance 0-100',
  FOREIGN KEY (role_id) REFERENCES career_roles(id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- QUESTIONS ---
CREATE TABLE IF NOT EXISTS questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_text TEXT NOT NULL,
  order_num INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- QUESTION OPTIONS ---
CREATE TABLE IF NOT EXISTS question_options (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_id INT NOT NULL,
  option_text TEXT NOT NULL,
  skill_weights JSON DEFAULT NULL COMMENT '{"skill_id": points}',
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- DAILY QUESTIONS ---
CREATE TABLE IF NOT EXISTS daily_questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_id INT NOT NULL,
  date DATE NOT NULL,
  is_active TINYINT(1) DEFAULT 1,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
  UNIQUE KEY unique_daily (question_id, date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- USER ANSWERS ---
CREATE TABLE IF NOT EXISTS user_answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  question_id INT NOT NULL,
  selected_option_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
  FOREIGN KEY (selected_option_id) REFERENCES question_options(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- USER SKILLS ---
CREATE TABLE IF NOT EXISTS user_skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  skill_id INT NOT NULL,
  is_selected TINYINT(1) DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- ASSESSMENT RESULTS ---
CREATE TABLE IF NOT EXISTS assessment_results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  role_match JSON DEFAULT NULL COMMENT '[{"role_id":1,"match_pct":85,"skill_gaps":[]}]',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- ROADMAPS ---
CREATE TABLE IF NOT EXISTS roadmaps (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role_id INT NOT NULL,
  phase INT NOT NULL COMMENT '1,2,3',
  week_range VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  FOREIGN KEY (role_id) REFERENCES career_roles(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- ROADMAP RESOURCES ---
CREATE TABLE IF NOT EXISTS roadmap_resources (
  id INT AUTO_INCREMENT PRIMARY KEY,
  roadmap_id INT NOT NULL,
  type VARCHAR(50) DEFAULT 'resource' COMMENT 'book, course, article, video',
  title VARCHAR(255) NOT NULL,
  description TEXT,
  url VARCHAR(500) DEFAULT NULL,
  FOREIGN KEY (roadmap_id) REFERENCES roadmaps(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- ROADMAP GAPS ---
CREATE TABLE IF NOT EXISTS roadmap_gaps (
  id INT AUTO_INCREMENT PRIMARY KEY,
  roadmap_id INT NOT NULL,
  description TEXT NOT NULL,
  FOREIGN KEY (roadmap_id) REFERENCES roadmaps(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- SEED DATA
-- ============================================================

-- CAREER ROLES
INSERT INTO career_roles (id, category, title, description, icon) VALUES
(1, 'ENGINEERING', 'Software Engineer', 'Fokus pada arsitektur sistem dan skalabilitas perangkat lunak.', 'code'),
(2, 'PRODUCT', 'Product Manager', 'Menyelaraskan kebutuhan bisnis, teknologi, dan pengguna.', 'assignment'),
(3, 'DATA', 'Data Scientist', 'Analisis prediktif dan pemodelan statistik tingkat lanjut.', 'analytics'),
(4, 'DESIGN', 'UI/UX Designer', 'Membangun pengalaman visual dan fungsional yang intuitif.', 'palette'),
(5, 'BUSINESS', 'Business Analyst', 'Optimasi proses bisnis melalui wawasan berbasis data.', 'business_center');

-- SKILLS
INSERT INTO skills (id, name, category, description) VALUES
(1, 'React', 'Frontend', 'Library JavaScript untuk membangun antarmuka pengguna.'),
(2, 'TypeScript', 'Language', 'Superset JavaScript dengan tipe statis.'),
(3, 'Node.js', 'Backend', 'Runtime JavaScript untuk server-side.'),
(4, 'Python', 'Language', 'Bahasa pemrograman serbaguna untuk web, data, dan AI.'),
(5, 'SQL', 'Database', 'Bahasa query untuk manajemen basis data relasional.'),
(6, 'AWS', 'Cloud', 'Layanan cloud computing Amazon Web Services.'),
(7, 'Excel', 'Analytics', 'Spreadsheet untuk analisis data dan pelaporan.'),
(8, 'Public Speaking', 'Soft Skill', 'Kemampuan berbicara di depan umum dan presentasi.'),
(9, 'Agile', 'Methodology', 'Pendekatan manajemen proyek iteratif dan adaptif.'),
(10, 'Communication', 'Soft Skill', 'Kemampuan komunikasi verbal dan tulisan.'),
(11, 'Problem Solving', 'Soft Skill', 'Kemampuan memecahkan masalah secara sistematis.'),
(12, 'Analytical', 'Soft Skill', 'Kemampuan berpikir analitis dan kritis.'),
(13, 'Leadership', 'Soft Skill', 'Kemampuan memimpin dan mengelola tim.'),
(14, 'Design', 'Design', 'Kemampuan desain visual dan prototyping.'),
(15, 'Statistical', 'Data', 'Pengetahuan statistik dan pemodelan matematis.');

-- ROLE SKILLS (weight 0-100)
INSERT INTO role_skills (role_id, skill_id, weight) VALUES
-- Software Engineer: React(90), TypeScript(80), Node.js(85), SQL(70), AWS(75), Problem Solving(85), Agile(60)
(1, 1, 90), (1, 2, 80), (1, 3, 85), (1, 5, 70), (1, 6, 75), (1, 11, 85), (1, 9, 60),
-- Product Manager: Communication(90), Leadership(85), Agile(80), Public Speaking(70), Analytical(75), Excel(60), Problem Solving(65)
(2, 10, 90), (2, 13, 85), (2, 9, 80), (2, 8, 70), (2, 12, 75), (2, 7, 60), (2, 11, 65),
-- Data Scientist: Python(95), SQL(85), Statistical(90), Analytical(85), AWS(60), Excel(65), Communication(60)
(3, 4, 95), (3, 5, 85), (3, 15, 90), (3, 12, 85), (3, 6, 60), (3, 7, 65), (3, 10, 60),
-- UI/UX Designer: Design(95), React(70), TypeScript(60), Communication(80), Problem Solving(70), Analytical(65), Leadership(55)
(4, 14, 95), (4, 1, 70), (4, 2, 60), (4, 10, 80), (4, 11, 70), (4, 12, 65), (4, 13, 55),
-- Business Analyst: Analytical(90), Communication(85), Excel(85), SQL(80), Problem Solving(75), Public Speaking(65), Agile(60)
(5, 12, 90), (5, 10, 85), (5, 7, 85), (5, 5, 80), (5, 11, 75), (5, 8, 65), (5, 9, 60);

-- QUESTIONS (12 general IT & skill assessment)
INSERT INTO questions (id, question_text, order_num) VALUES
(1, 'Anda sedang memimpin proyek lintas fungsi dan pemangku kepentingan senior meminta perubahan fitur utama tiga hari sebelum rilis produksi. Bagaimana Anda mengelola konflik teknis dan profesional ini?', 1),
(2, 'Seorang pengembang junior di tim Anda secara konsisten menyerahkan kode yang memenuhi persyaratan tetapi kurang memiliki performa yang optimal. Apa pendekatan utama Anda?', 2),
(3, 'Saat berhadapan dengan sistem warisan (legacy) yang rapuh tetapi berfungsi, bagaimana Anda memprioritaskan peta jalan untuk modernisasi?', 3),
(4, 'Anggaran departemen Anda dipotong sebesar 15%. Anda harus memutuskan antara mengurangi lisensi perangkat lunak atau menunda pelatihan tim.', 4),
(5, 'Terjadi gangguan layanan (downtime) kritis di lingkungan produksi karena kesalahan konfigurasi pihak ketiga. Langkah taktis apa yang pertama Anda instruksikan?', 5),
(6, 'Bagaimana pendekatan Anda dalam mengadopsi tumpukan teknologi (tech stack) baru yang sedang tren di pasar ke dalam proyek internal perusahaan?', 6),
(7, 'Tim Anda terjebak dalam perdebatan tanpa akhir mengenai dua arsitektur teknis. Kedua opsi memiliki kelebihan seimbang. Tindakan Anda?', 7),
(8, 'Produk baru yang dirilis tim Anda mengalami lonjakan pengguna 500% dalam semalam, beban server mendekati batas. Prioritas rekayasa Anda?', 8),
(9, 'Dalam retrospektif, ditemukan metrik utama gagal akibat miskomunikasi antar divisi. Bagaimana Anda menyikapinya?', 9),
(10, 'Manajemen meminta integrasi fitur AI/LLM ke sistem inti dalam 2 minggu, padahal tim belum ahli. Langkah strategis Anda?', 10),
(11, 'Seorang klien meminta dashboard analitik real-time dengan data dari 5 sumber berbeda. Bagaimana Anda merancang solusinya?', 11),
(12, 'Tim Anda akan memilih framework baru untuk produk next-gen. Bagaimana proses pengambilan keputusan yang Anda gunakan?', 12);

-- QUESTION OPTIONS with skill_weights (JSON: {"skill_id": points})
INSERT INTO question_options (id, question_id, option_text, skill_weights) VALUES
-- Q1
(1, 1, 'Hentikan rilis untuk menyertakan perubahan tersebut, demi kepuasan pemangku kepentingan.', '{"10": 2, "13": 3, "9": 1}'),
(2, 1, 'Negosiasikan rilis V1.1 sambil mempertahankan tenggat produksi untuk MVP inti.', '{"10": 3, "11": 3, "9": 3, "13": 2}'),
(3, 1, 'Tolak permintaan secara formal dengan alasan utang teknis dan batasan sprint.', '{"12": 2, "11": 1, "9": 1}'),
-- Q2
(4, 2, 'Tulis ulang logikanya sendiri untuk menunjukkan arsitektur standar melalui perbandingan kode.', '{"13": 2, "10": 1}'),
(5, 2, 'Terapkan aturan linting ketat dan tolok ukur performa yang memblokir merge request otomatis.', '{"1": 2, "2": 2, "11": 2}'),
(6, 2, 'Lakukan sesi pairing 1:1 fokus pada efisiensi algoritmik dan penalaran sistemik.', '{"13": 3, "10": 3, "11": 2}'),
-- Q3
(7, 3, 'Refaktorisasi inkremental dengan Strangler Pattern pada modul paling rentan.', '{"1": 3, "3": 3, "11": 3, "12": 2}'),
(8, 3, 'Lobi untuk penulisan ulang total (greenfield) untuk hilangkan utang teknis.', '{"13": 2, "10": 2}'),
-- Q4
(9, 4, 'Kurangi biaya alat; modal manusia dan kohesi tim adalah prioritas.', '{"13": 3, "10": 2, "8": 1}'),
(10, 4, 'Tunda pelatihan; perangkat lunak khusus penting untuk presisi hasil kerja.', '{"12": 2, "7": 2, "5": 2}'),
-- Q5
(11, 5, 'Isolasi sistem dan terapkan rencana disaster recovery untuk pulihkan status stabil.', '{"11": 3, "6": 3, "3": 3}'),
(12, 5, 'Hubungi tim dukungan pihak ketiga dan tunggu arahan perbaikan.', '{"10": 2}'),
(13, 5, 'Bangun patch perbaikan baru langsung di server produksi demi memangkas waktu tunggu.', '{"1": 2, "3": 2, "11": 2}'),
-- Q6
(14, 6, 'Adopsi langsung pada proyek utama agar perusahaan tidak tertinggal teknologi.', '{"13": 2, "1": 2}'),
(15, 6, 'Eksperimen skala kecil (PoC) pada layanan non-kritis sebelum migrasi bertahap.', '{"12": 3, "11": 3, "9": 2}'),
(16, 6, 'Batasi adopsi teknologi baru; standarisasi tumpukan lama lebih aman untuk bisnis.', '{"12": 1}'),
-- Q7
(17, 7, 'Ambil keputusan sepihak berdasarkan preferensi pribadi untuk menjaga linimasa.', '{"13": 2}'),
(18, 7, 'Tentukan matriks penilaian objektif (skalabilitas, biaya, waktu) dan voting berbasis data.', '{"12": 3, "13": 3, "10": 2, "11": 2}'),
(19, 7, 'Serahkan keputusan ke manajemen atas agar tidak ada kubu yang disudutkan.', '{"10": 1}'),
-- Q8
(20, 8, 'Terapkan rate limiting atau matikan fitur non-esensial untuk jaga sistem inti.', '{"11": 3, "6": 2, "3": 2}'),
(21, 8, 'Migrasi database penuh ke cloud dengan auto-scaling yang lebih baik.', '{"6": 3, "5": 2, "12": 2}'),
(22, 8, 'Biarkan sistem berjalan sambil pantau, siapkan skema pengembalian dana jika gagal.', '{"11": 1}'),
-- Q9
(23, 9, 'Identifikasi individu yang bertanggung jawab untuk evaluasi kerja formal.', '{"13": 2}'),
(24, 9, 'Fokus pada perbaikan alur komunikasi sistemik dan dokumentasi API antar tim.', '{"10": 3, "9": 2, "13": 2}'),
(25, 9, 'Sesuaikan metrik keberhasilan agar performa tim terlihat tetap mencapai target.', '{}'),
-- Q10
(26, 10, 'Tolak tugas hingga perusahaan rekrut ilmuwan data atau insinyur AI khusus.', '{"13": 1}'),
(27, 10, 'Gunakan API pihak ketiga untuk MVP cepat sambil latih tim secara paralel.', '{"11": 3, "4": 2, "9": 2, "13": 2}'),
(28, 10, 'Minta perpanjangan 6 bulan untuk tim mempelajari dasar ML dari nol.', '{"12": 1, "4": 1}'),
-- Q11
(29, 11, 'Gunakan solusi ETL terintegrasi dengan visualization layer real-time dari satu vendor.', '{"5": 2, "7": 2, "11": 2}'),
(30, 11, 'Desain arsitektur data lake dengan pipeline streaming dan dashboard kustom.', '{"4": 3, "5": 3, "6": 2, "12": 3, "14": 1}'),
(31, 11, 'Buat spreadsheet manual yang diperbarui setiap minggu dari kelima sumber data.', '{"7": 1}'),
-- Q12
(32, 12, 'Pilih framework paling populer di GitHub agar mudah rekrut dan dapat dukungan komunitas.', '{"1": 2, "3": 2}'),
(33, 12, 'Buat proof of concept dengan 3 framework kandidat, evaluasi via matriks teknis dan bisnis.', '{"12": 3, "11": 3, "9": 2}'),
(34, 12, 'Gunakan framework yang sudah digunakan tim sebelumnya untuk konsistensi dan mengurangi biaya belajar.', '{"13": 2, "10": 1}');

-- ROADMAPS (3 phases per role)
-- Software Engineer (role_id=1)
INSERT INTO roadmaps (id, role_id, phase, week_range, title, description) VALUES
(1, 1, 1, 'Minggu 1-4', 'Fundamental Sistem & Dasar-dasar Web', 'Perkuat dasar-dasar pengembangan web modern. Fokus pada React, TypeScript, dan arsitektur komponen.'),
(2, 1, 2, 'Minggu 5-10', 'Backend & Cloud Architecture', 'Kuasai Node.js, SQL, dan deployment AWS. Bangun API RESTful dan kelola database relasional.'),
(3, 1, 3, 'Minggu 11-14', 'Skalabilitas & Kepemimpinan Teknis', 'Pelajari pola arsitektur sistem terdistribusi, CI/CD, dan mentoring teknis untuk tim.');

-- Product Manager (role_id=2)
INSERT INTO roadmaps (id, role_id, phase, week_range, title, description) VALUES
(4, 2, 1, 'Minggu 1-4', 'Dasar-dasar Manajemen Produk', 'Pelajari siklus hidup produk, user research, dan pembuatan roadmap prioritas berbasis data.'),
(5, 2, 2, 'Minggu 5-10', 'Analitik & Kepemimpinan Lintas Fungsi', 'Kuasai analisis data produk, A/B testing, dan komunikasi stakeholder tingkat eksekutif.'),
(6, 2, 3, 'Minggu 11-14', 'Strategi Produk & Inovasi', 'Fokus pada strategi go-to-market, pricing, dan kepemimpinan produk tingkat direktur.');

-- Data Scientist (role_id=3)
INSERT INTO roadmaps (id, role_id, phase, week_range, title, description) VALUES
(7, 3, 1, 'Minggu 1-4', 'Fundamentals Data Science', 'Python untuk data analysis, SQL lanjutan, dan dasar-dasar statistik inferensial.'),
(8, 3, 2, 'Minggu 5-10', 'Machine Learning & Eksperimentasi', 'Pelajari supervised/unsupervised learning, feature engineering, dan evaluasi model.'),
(9, 3, 3, 'Minggu 11-14', 'MLOps & Deployment', 'Deploy model ke production, pipeline data otomatis, dan komunikasi insight ke stakeholder.');

-- UI/UX Designer (role_id=4)
INSERT INTO roadmaps (id, role_id, phase, week_range, title, description) VALUES
(10, 4, 1, 'Minggu 1-4', 'Dasar-dasar Desain Visual', 'Fundamental color theory, typography, layout, dan penguasaan Figma/Adobe XD.'),
(11, 4, 2, 'Minggu 5-10', 'Design Thinking & User Research', 'Pelajari metode user research, wireframing, prototyping, dan usability testing.'),
(12, 4, 3, 'Minggu 11-14', 'Desain Sistem & Kolaborasi Teknis', 'Bangun design system, kolaborasi dengan engineer, dan portfolio presentation.');

-- Business Analyst (role_id=5)
INSERT INTO roadmaps (id, role_id, phase, week_range, title, description) VALUES
(13, 5, 1, 'Minggu 1-4', 'Analisis Bisnis & Tools', 'Excel lanjutan, SQL untuk analisis, dan dokumentasi requirement teknis.'),
(14, 5, 2, 'Minggu 5-10', 'Business Intelligence & Visualisasi', 'Kuasai Tableau/PowerBI, dashboard KPI, dan analisis proses bisnis dengan BPMN.'),
(15, 5, 3, 'Minggu 11-14', 'Konsultasi & Manajemen Stakeholder', 'Teknik presentasi eksekutif, cost-benefit analysis, dan change management.');

-- ROADMAP RESOURCES
-- SE (1-3)
INSERT INTO roadmap_resources (roadmap_id, type, title, description, url) VALUES
(1, 'course', 'React Official Tutorial', 'Pelajari React dari dokumen resmi.', 'https://react.dev'),
(1, 'book', 'Learning TypeScript', 'Panduan TypeScript komprehensif untuk pemula hingga mahir.', NULL),
(2, 'course', 'Node.js Design Patterns', 'Pola desain untuk aplikasi Node.js skala besar.', NULL),
(2, 'book', 'Database Design for Mere Mortals', 'Panduan desain database relasional yang praktis.', NULL),
(3, 'course', 'AWS Certified Solutions Architect', 'Persiapan sertifikasi arsitek AWS.', 'https://aws.amazon.com/certification/'),
(3, 'article', 'System Design Interview Guide', 'Panduan pola desain sistem terdistribusi.', NULL);

-- PM (4-6)
INSERT INTO roadmap_resources (roadmap_id, type, title, description, url) VALUES
(4, 'book', 'Inspired by Marty Cagan', 'Buku fundamental tentang manajemen produk modern.', NULL),
(4, 'course', 'Product Management 101', 'Kursus pengantar manajemen produk.', NULL),
(5, 'course', 'Product Analytics', 'Analisis data produk dengan Amplitude/Mixpanel.', NULL),
(6, 'book', 'Escaping the Build Trap', 'Strategi produk untuk pertumbuhan berkelanjutan.', NULL);

-- DS (7-9)
INSERT INTO roadmap_resources (roadmap_id, type, title, description, url) VALUES
(7, 'course', 'Python for Data Science', 'Kursus Python untuk analisis data dan visualisasi.', NULL),
(7, 'book', 'Naked Statistics', 'Buku statistik yang mudah dipahami untuk pemula.', NULL),
(8, 'course', 'Machine Learning by Andrew Ng', 'Kursus ML paling populer di Coursera.', 'https://coursera.org/learn/machine-learning'),
(9, 'book', 'Designing Machine Learning Systems', 'Panduan arsitektur sistem ML di production.', NULL);

-- UI/UX (10-12)
INSERT INTO roadmap_resources (roadmap_id, type, title, description, url) VALUES
(10, 'course', 'Figma 101', 'Kursus dasar Figma untuk desain antarmuka.', 'https://figma.com'),
(10, 'book', 'Don''t Make Me Think', 'Buku klasik tentang usability dan desain web.', NULL),
(11, 'course', 'Google UX Design Certificate', 'Sertifikat desain UX dari Google.', NULL),
(12, 'article', 'Design Systems 101', 'Panduan membangun design system yang skalabel.', NULL);

-- BA (13-15)
INSERT INTO roadmap_resources (roadmap_id, type, title, description, url) VALUES
(13, 'course', 'Excel Skills for Business', 'Kursus Excel tingkat mahir untuk analisis bisnis.', NULL),
(13, 'course', 'SQL for Data Analysis', 'SQL untuk analisis data bisnis dan reporting.', NULL),
(14, 'course', 'Tableau Public Tutorial', 'Visualisasi data interaktif dengan Tableau.', 'https://tableau.com'),
(15, 'book', 'Business Analysis Body of Knowledge', 'Panduan standar internasional untuk Business Analyst.', NULL);

-- ROADMAP GAPS
-- SE
INSERT INTO roadmap_gaps (roadmap_id, description) VALUES
(1, 'Pola desain basis data dan normalisasi'),
(1, 'Arsitektur komponen React yang scalable'),
(2, 'API Gateway dan microservices patterns'),
(2, 'Database indexing dan query optimization'),
(3, 'Strategi caching dan CDN'),
(3, 'Kepemimpinan teknis dan code review');
-- PM
INSERT INTO roadmap_gaps (roadmap_id, description) VALUES
(4, 'User story mapping dan prioritization framework'),
(4, 'Market research dan competitive analysis'),
(5, 'Product metrics dan OKR tracking'),
(5, 'Stakeholder management dan executive communication'),
(6, 'Strategic roadmapping dan portfolio management');
-- DS
INSERT INTO roadmap_gaps (roadmap_id, description) VALUES
(7, 'Data wrangling dan exploratory data analysis'),
(7, 'Probability dan statistical inference'),
(8, 'Model validation dan hyperparameter tuning'),
(8, 'Feature engineering dan selection'),
(9, 'Model deployment dan monitoring'),
(9, 'Data pipeline orchestration');
-- UI/UX
INSERT INTO roadmap_gaps (roadmap_id, description) VALUES
(10, 'Color theory dan visual hierarchy'),
(10, 'Responsive design principles'),
(11, 'User interview dan usability testing'),
(11, 'Information architecture'),
(12, 'Design system documentation'),
(12, 'Developer handoff dan asset management');
-- BA
INSERT INTO roadmap_gaps (roadmap_id, description) VALUES
(13, 'Business process modeling (BPMN)'),
(13, 'Requirements elicitation techniques'),
(14, 'Dashboard design dan KPI definition'),
(14, 'Data storytelling dan executive summary'),
(15, 'Cost-benefit dan ROI analysis'),
(15, 'Change management frameworks');
