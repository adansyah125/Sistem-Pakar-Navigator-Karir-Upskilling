-- ============================================================
-- Sistem Pakar Karir - Full Schema + Seed Data
-- ============================================================

DROP DATABASE IF EXISTS sistem_pakar_karir;
CREATE DATABASE sistem_pakar_karir;
USE sistem_pakar_karir;

-- --- USERS ---
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama_lengkap VARCHAR(255) NOT NULL,
  jenjang VARCHAR(100) NOT NULL,
  jurusan VARCHAR(255) NOT NULL,
  session_id VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- CAREER ROLES ---
CREATE TABLE career_roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100) DEFAULT 'work',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- SKILLS ---
CREATE TABLE skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) DEFAULT NULL,
  description TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- ROLE SKILLS ---
CREATE TABLE role_skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role_id INT NOT NULL,
  skill_id INT NOT NULL,
  weight INT DEFAULT 50,
  FOREIGN KEY (role_id) REFERENCES career_roles(id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- QUESTIONS ---
CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_text TEXT NOT NULL,
  order_num INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- QUESTION OPTIONS ---
CREATE TABLE question_options (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_id INT NOT NULL,
  option_text TEXT NOT NULL,
  skill_weights JSON DEFAULT NULL,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- DAILY QUESTIONS ---
CREATE TABLE daily_questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_id INT NOT NULL,
  date DATE NOT NULL,
  is_active TINYINT(1) DEFAULT 1,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
  UNIQUE KEY unique_daily (question_id, date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- USER ANSWERS ---
CREATE TABLE user_answers (
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
CREATE TABLE user_skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  skill_id INT NOT NULL,
  is_selected TINYINT(1) DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- ASSESSMENT RESULTS ---
CREATE TABLE assessment_results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  role_match JSON DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- ROADMAPS ---
CREATE TABLE roadmaps (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role_id INT NOT NULL,
  phase INT NOT NULL,
  week_range VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  FOREIGN KEY (role_id) REFERENCES career_roles(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- ROADMAP RESOURCES ---
CREATE TABLE roadmap_resources (
  id INT AUTO_INCREMENT PRIMARY KEY,
  roadmap_id INT NOT NULL,
  type VARCHAR(50) DEFAULT 'resource',
  title VARCHAR(255) NOT NULL,
  description TEXT,
  url VARCHAR(500) DEFAULT NULL,
  FOREIGN KEY (roadmap_id) REFERENCES roadmaps(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- ROADMAP GAPS ---
CREATE TABLE roadmap_gaps (
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
(1, 'ENGINEERING', 'Software Engineer', 'Fokus pada pengembangan perangkat lunak, arsitektur sistem, dan skalabilitas.', 'code'),
(2, 'PRODUCT', 'Product Manager', 'Menyelaraskan kebutuhan bisnis, teknologi, dan pengguna.', 'assignment'),
(3, 'DATA', 'Data Scientist', 'Analisis prediktif dan pemodelan statistik tingkat lanjut.', 'analytics'),
(4, 'DESIGN', 'UI/UX Designer', 'Membangun pengalaman visual dan fungsional yang intuitif.', 'palette'),
(5, 'BUSINESS', 'Business Analyst', 'Optimasi proses bisnis melalui wawasan berbasis data.', 'business_center');

-- ============================================================
-- SKILLS (30 skills, 6 per role)
-- ============================================================

-- Software Engineering (1-6)
INSERT INTO skills (id, name, category, description) VALUES
(1, 'Bahasa Pemrograman (JS/TS, Python, Java, Go, C++)', 'Engineering', 'Kemampuan menulis kode dalam berbagai bahasa pemrograman.'),
(2, 'Struktur Data & Algoritma', 'Engineering', 'Pemahaman fundamental tentang struktur data dan algoritma.'),
(3, 'Database Management (SQL & NoSQL)', 'Engineering', 'Pengelolaan database relasional dan non-relasional.'),
(4, 'Version Control (Git, GitHub/GitLab)', 'Engineering', 'Pengelolaan kode dengan version control system.'),
(5, 'System Architecture & API Design (REST, GraphQL, Microservices)', 'Engineering', 'Perancangan arsitektur sistem dan API.'),
(6, 'DevOps & Cloud Computing (Docker, AWS/GCP/Azure, CI/CD)', 'Engineering', 'Deployment, cloud infrastructure, dan CI/CD pipeline.');

-- UI/UX Design (7-12)
INSERT INTO skills (id, name, category, description) VALUES
(7, 'Desain Visual (Tipografi, Teori Warna, Layout)', 'Design', 'Fundamental desain visual dan komposisi.'),
(8, 'Design Tools (Figma, Adobe XD, Sketch)', 'Design', 'Penguasaan tools desain antarmuka.'),
(9, 'UX Research & Usability Testing', 'Design', 'Metode riset pengguna dan pengujian usability.'),
(10, 'Wireframing & Prototyping', 'Design', 'Pembuatan wireframe dan prototipe interaktif.'),
(11, 'Information Architecture', 'Design', 'Struktur dan organisasi informasi pada produk digital.'),
(12, 'Design System & Component Library', 'Design', 'Pengembangan sistem desain yang skalabel dan konsisten.');

-- Product Manager (13-18)
INSERT INTO skills (id, name, category, description) VALUES
(13, 'Product Roadmap & Strategy', 'Product', 'Perencanaan strategis dan roadmap produk.'),
(14, 'Market & Competitor Analysis', 'Product', 'Analisis pasar dan kompetitor untuk pengambilan keputusan.'),
(15, 'Product Analytics Tools (Mixpanel, Amplitude, Google Analytics)', 'Product', 'Penggunaan tools analitik untuk mengukur performa produk.'),
(16, 'Prioritization Frameworks (RICE, MoSCoW)', 'Product', 'Framework prioritisasi fitur dan inisiatif produk.'),
(17, 'Agile/Scrum & Project Management (Jira, Trello)', 'Product', 'Metodologi agile/scrum dan tools manajemen proyek.'),
(18, 'Basic Data Querying (SQL dasar)', 'Product', 'Kemampuan dasar SQL untuk pengambilan keputusan berbasis data.');

-- Data Scientist (19-24)
INSERT INTO skills (id, name, category, description) VALUES
(19, 'Bahasa Pemrograman Data (Python, R)', 'Data', 'Bahasa pemrograman untuk analisis data dan machine learning.'),
(20, 'Library Data Science (Pandas, NumPy, Scikit-Learn, TensorFlow, PyTorch)', 'Data', 'Library dan framework untuk data science dan deep learning.'),
(21, 'Matematika & Statistika Lanjutan', 'Data', 'Aljabar linear, kalkulus, probabilitas untuk pemodelan data.'),
(22, 'Algoritma Machine Learning & Deep Learning', 'Data', 'Implementasi algoritma ML/DL untuk prediksi dan klasifikasi.'),
(23, 'Advanced SQL & Data Warehousing (BigQuery, Snowflake)', 'Data', 'SQL lanjutan dan data warehouse untuk analisis big data.'),
(24, 'Big Data Tools (Spark, Hadoop)', 'Data', 'Tools pemrosesan data skala besar dengan Spark dan Hadoop.');

-- Business Analyst (25-30)
INSERT INTO skills (id, name, category, description) VALUES
(25, 'Data Visualization & BI Tools (Tableau, Power BI, Looker Studio)', 'Business', 'Visualisasi data dan business intelligence.'),
(26, 'Advanced Excel / Google Sheets', 'Business', 'Pivot table, macro/VBA, financial modeling.'),
(27, 'SQL (Querying & Data Extraction)', 'Business', 'Query SQL untuk ekstraksi dan analisis data bisnis.'),
(28, 'Business Process Mapping & BPMN', 'Business', 'Pemetaan proses bisnis menggunakan BPMN.'),
(29, 'Requirement Gathering & Documentation (BRD/FRD)', 'Business', 'Teknik penggalian kebutuhan dan dokumentasi teknis.'),
(30, 'Statistika Bisnis & Forecasting', 'Business', 'Analisis statistik dan peramalan untuk bisnis.');

-- ============================================================
-- ROLE SKILLS (6 skills per role, weight 0-100)
-- ============================================================
-- Software Engineer (role_id=1): skills 1-6
INSERT INTO role_skills (role_id, skill_id, weight) VALUES
(1, 1, 95), (1, 2, 90), (1, 3, 80), (1, 4, 75), (1, 5, 85), (1, 6, 80);

-- Product Manager (role_id=2): skills 13-18
INSERT INTO role_skills (role_id, skill_id, weight) VALUES
(2, 13, 95), (2, 14, 85), (2, 15, 80), (2, 16, 80), (2, 17, 90), (2, 18, 70);

-- Data Scientist (role_id=3): skills 19-24
INSERT INTO role_skills (role_id, skill_id, weight) VALUES
(3, 19, 95), (3, 20, 95), (3, 21, 90), (3, 22, 90), (3, 23, 80), (3, 24, 75);

-- UI/UX Designer (role_id=4): skills 7-12
INSERT INTO role_skills (role_id, skill_id, weight) VALUES
(4, 7, 95), (4, 8, 90), (4, 9, 85), (4, 10, 85), (4, 11, 75), (4, 12, 80);

-- Business Analyst (role_id=5): skills 25-30
INSERT INTO role_skills (role_id, skill_id, weight) VALUES
(5, 25, 90), (5, 26, 85), (5, 27, 85), (5, 28, 80), (5, 29, 85), (5, 30, 80);

-- ============================================================
-- QUESTIONS (12 general IT & skill assessment)
-- ============================================================
INSERT INTO questions (id, question_text, order_num) VALUES
(1, 'Anda sedang memimpin proyek lintas fungsi dan pemangku kepentingan senior meminta perubahan fitur utama tiga hari sebelum rilis produksi. Bagaimana Anda mengelola konflik teknis dan profesional ini?', 1),
(2, 'Seorang pengembang junior di tim Anda secara konsisten menyerahkan kode yang memenuhi persyaratan tetapi kurang optimal. Apa pendekatan utama Anda?', 2),
(3, 'Saat berhadapan dengan sistem warisan (legacy) yang rapuh tetapi berfungsi, bagaimana Anda memprioritaskan modernisasi?', 3),
(4, 'Anggaran departemen dipotong 15%. Anda harus memilih antara mengurangi lisensi perangkat lunak atau menunda pelatihan tim.', 4),
(5, 'Terjadi downtime kritis di production karena kesalahan konfigurasi pihak ketiga. Langkah taktis pertama Anda?', 5),
(6, 'Bagaimana pendekatan Anda dalam mengadopsi tech stack baru yang sedang tren ke dalam proyek internal?', 6),
(7, 'Tim Anda deadlock dalam perdebatan dua arsitektur teknis dengan kelebihan seimbang. Tindakan Anda?', 7),
(8, 'Produk baru mengalami lonjakan pengguna 500% dalam semalam, server mendekati batas. Prioritas Anda?', 8),
(9, 'Dalam retrospektif, metrik utama gagal akibat miskomunikasi antar divisi. Bagaimana Anda menyikapinya?', 9),
(10, 'Manajemen minta integrasi AI/LLM ke sistem inti dalam 2 minggu, tim belum ahli. Langkah strategis?', 10),
(11, 'Klien minta dashboard analitik real-time dari 5 sumber data berbeda. Bagaimana Anda merancang solusinya?', 11),
(12, 'Tim akan memilih framework baru untuk produk next-gen. Proses pengambilan keputusan Anda?', 12);

-- ============================================================
-- QUESTION OPTIONS with skill_weights (mapped to new skill IDs)
-- Setiap option memberikan poin ke skill dari role yang berbeda
-- untuk membedakan kecenderungan user
-- ============================================================
INSERT INTO question_options (id, question_id, option_text, skill_weights) VALUES
-- Q1: Project leadership (PM focus)
(1, 1, 'Hentikan rilis untuk menyertakan perubahan, demi kepuasan stakeholder.', '{"13": 3, "15": 2, "17": 2}'),
(2, 1, 'Negosiasikan rilis V1.1 sambil pertahankan tenggat MVP inti.', '{"13": 3, "16": 3, "17": 3, "5": 2}'),
(3, 1, 'Tolak permintaan formal dengan alasan utang teknis dan batasan sprint.', '{"5": 2, "17": 1, "2": 1}'),

-- Q2: Junior dev performance (SE focus)
(4, 2, 'Tulis ulang logika sendiri untuk tunjukkan standar melalui code diff.', '{"1": 2, "4": 1, "13": 2}'),
(5, 2, 'Terapkan aturan linting dan tolok ukur performa yang memblokir merge request.', '{"1": 2, "2": 2, "6": 2}'),
(6, 2, 'Lakukan pairing 1:1 fokus efisiensi algoritmik dan penalaran sistemik.', '{"1": 2, "2": 3, "13": 3}'),

-- Q3: Legacy system (SE & Architecture focus)
(7, 3, 'Refaktorisasi inkremental dengan Strangler Pattern pada modul rentan.', '{"1": 3, "5": 3, "6": 3, "2": 2}'),
(8, 3, 'Lobi untuk rewrite total (greenfield) untuk hilangkan utang teknis.', '{"5": 2, "13": 2}'),

-- Q4: Budget decision (PM & BA focus)
(9, 4, 'Kurangi biaya alat; modal manusia dan kohesi tim adalah prioritas.', '{"13": 3, "29": 2, "28": 1}'),
(10, 4, 'Tunda pelatihan; software khusus penting untuk presisi hasil kerja.', '{"26": 2, "27": 2, "25": 2}'),

-- Q5: Production downtime (SE & DevOps focus)
(11, 5, 'Isolasi sistem dan terapkan disaster recovery untuk pulihkan status stabil.', '{"2": 3, "5": 3, "6": 3}'),
(12, 5, 'Hubungi tim dukungan pihak ketiga dan tunggu arahan perbaikan.', '{"28": 2}'),
(13, 5, 'Bangun patch langsung di server produksi demi memangkas waktu tunggu.', '{"1": 2, "5": 2, "6": 2}'),

-- Q6: Tech stack adoption (SE & PM focus)
(14, 6, 'Adopsi langsung pada proyek utama agar tidak tertinggal teknologi.', '{"1": 2, "13": 2}'),
(15, 6, 'Eksperimen skala kecil (PoC) sebelum migrasi bertahap.', '{"2": 2, "5": 3, "16": 2}'),
(16, 6, 'Batasi adopsi; standarisasi tumpukan lama lebih aman.', '{"5": 1}'),

-- Q7: Architecture debate (SE & PM focus)
(17, 7, 'Ambil keputusan sepihak untuk menjaga linimasa.', '{"13": 2}'),
(18, 7, 'Buat matriks penilaian objektif dan voting berbasis data.', '{"2": 2, "5": 3, "16": 3, "13": 2}'),
(19, 7, 'Serahkan ke manajemen atas agar tidak ada yang disudutkan.', '{"17": 1}'),

-- Q8: Traffic spike (SE & DevOps focus)
(20, 8, 'Terapkan rate limiting atau matikan fitur non-esensial.', '{"2": 3, "5": 2, "6": 3}'),
(21, 8, 'Migrasi database ke cloud dengan auto-scaling.', '{"5": 2, "6": 3, "19": 1}'),
(22, 8, 'Biarkan berjalan sambil pantau, siapkan pengembalian dana.', '{"2": 1}'),

-- Q9: Retrospective (PM & BA focus)
(23, 9, 'Identifikasi individu bertanggung jawab untuk evaluasi formal.', '{"13": 2}'),
(24, 9, 'Fokus perbaikan alur komunikasi sistemik dan dokumentasi.', '{"17": 3, "28": 3, "29": 2}'),
(25, 9, 'Sesuaikan metrik agar performa tim terlihat mencapai target.', '{}'),

-- Q10: AI integration (DS & SE focus)
(26, 10, 'Tolak tugas hingga rekrut ilmuwan data khusus.', '{"19": 1}'),
(27, 10, 'Gunakan API pihak ketiga untuk MVP sambil latih tim.', '{"1": 2, "19": 2, "20": 2, "22": 2}'),
(28, 10, 'Minta perpanjangan 6 bulan untuk pelajari ML dari nol.', '{"19": 1, "21": 1}'),

-- Q11: Real-time dashboard (DS & BA focus)
(29, 11, 'Gunakan solusi ETL terintegrasi dari satu vendor.', '{"23": 2, "25": 2, "27": 2}'),
(30, 11, 'Desain data lake dengan pipeline streaming dan dashboard kustom.', '{"19": 2, "20": 2, "24": 2, "25": 3, "7": 1}'),
(31, 11, 'Buat spreadsheet manual diperbarui mingguan.', '{"26": 1}'),

(32, 12, 'Pilih framework paling populer di GitHub.', '{"1": 2, "4": 2}'),
(33, 12, 'Buat PoC dengan 3 kandidat, evaluasi via matriks teknis dan bisnis.', '{"2": 2, "5": 3, "16": 3}'),
(34, 12, 'Gunakan framework yang sudah dipakai tim sebelumnya.', '{"13": 2, "17": 1}');

-- ============================================================
-- ROADMAPS (3 phases per role)
-- ============================================================

-- Software Engineer (role_id=1)
INSERT INTO roadmaps (id, role_id, phase, week_range, title, description) VALUES
(1, 1, 1, 'Minggu 1-4', 'Fundamental Pemrograman & Tools', 'Perkuat dasar bahasa pemrograman, struktur data, algoritma, dan version control.'),
(2, 1, 2, 'Minggu 5-10', 'Database & System Architecture', 'Kuasai database management, API design, arsitektur microservices.'),
(3, 1, 3, 'Minggu 11-14', 'DevOps & Cloud Deployment', 'CI/CD pipeline, Docker, cloud deployment, dan monitoring.');

-- Product Manager (role_id=2)
INSERT INTO roadmaps (id, role_id, phase, week_range, title, description) VALUES
(4, 2, 1, 'Minggu 1-4', 'Fundamental Manajemen Produk', 'Roadmap strategy, market analysis, dan prioritization frameworks.'),
(5, 2, 2, 'Minggu 5-10', 'Product Analytics & Execution', 'Analytics tools, agile/scrum, dan project management.'),
(6, 2, 3, 'Minggu 11-14', 'Data-Driven Decision Making', 'SQL dasar dan pengambilan keputusan berbasis data.');

-- Data Scientist (role_id=3)
INSERT INTO roadmaps (id, role_id, phase, week_range, title, description) VALUES
(7, 3, 1, 'Minggu 1-4', 'Fundamental Data Science', 'Python/R, library data science, dan matematika statistik.'),
(8, 3, 2, 'Minggu 5-10', 'Machine Learning & Big Data', 'Algoritma ML/DL, advanced SQL, dan Big Data tools.'),
(9, 3, 3, 'Minggu 11-14', 'Production ML & Data Warehousing', 'MLOps, BigQuery/Snowflake, dan deployment model ke production.');

-- UI/UX Designer (role_id=4)
INSERT INTO roadmaps (id, role_id, phase, week_range, title, description) VALUES
(10, 4, 1, 'Minggu 1-4', 'Fundamental Desain & Tools', 'Desain visual, Figma/Adobe XD, wireframing, dan prototyping.'),
(11, 4, 2, 'Minggu 5-10', 'UX Research & Information Architecture', 'User research, usability testing, dan information architecture.'),
(12, 4, 3, 'Minggu 11-14', 'Design System & Portfolio', 'Design system, component library, dan portfolio presentation.');

-- Business Analyst (role_id=5)
INSERT INTO roadmaps (id, role_id, phase, week_range, title, description) VALUES
(13, 5, 1, 'Minggu 1-4', 'Fundamental Analisis Bisnis', 'Excel lanjutan, SQL dasar, dan business process mapping.'),
(14, 5, 2, 'Minggu 5-10', 'BI Tools & Dokumentasi', 'Tableau/PowerBI, requirement gathering, BRD/FRD.'),
(15, 5, 3, 'Minggu 11-14', 'Statistika & Forecasting', 'Statistika bisnis, forecasting, dan executive presentation.');

-- ============================================================
-- ROADMAP RESOURCES
-- ============================================================
INSERT INTO roadmap_resources (roadmap_id, type, title, description, url) VALUES
-- SE Phase 1
(1, 'course', 'JavaScript/TypeScript Fundamentals', 'Kursus dasar bahasa pemrograman untuk web.', NULL),
(1, 'book', 'Cracking the Coding Interview', 'Panduan struktur data dan algoritma.', NULL),
-- SE Phase 2
(2, 'course', 'Database Design & SQL', 'Kursus perancangan database dan SQL.', NULL),
(2, 'book', 'Designing Data-Intensive Applications', 'Panduan arsitektur sistem modern.', NULL),
-- SE Phase 3
(3, 'course', 'Docker & Kubernetes', 'Kursus container orchestration.', 'https://docker.com'),
(3, 'course', 'AWS Certified Solutions Architect', 'Persiapan sertifikasi AWS.', 'https://aws.amazon.com'),
-- PM Phase 1
(4, 'book', 'Inspired by Marty Cagan', 'Buku fundamental manajemen produk.', NULL),
(4, 'course', 'Product Management 101', 'Kursus pengantar manajemen produk.', NULL),
-- PM Phase 2
(5, 'course', 'Product Analytics with Mixpanel', 'Kursus analitik produk.', NULL),
(5, 'course', 'Agile & Scrum Masterclass', 'Kursus metodologi agile/scrum.', NULL),
-- PM Phase 3
(6, 'course', 'SQL for Product Managers', 'SQL dasar untuk pengambilan keputusan produk.', NULL),
-- DS Phase 1
(7, 'course', 'Python for Data Science', 'Kursus Python untuk data science.', NULL),
(7, 'book', 'Naked Statistics', 'Buku statistik yang mudah dipahami.', NULL),
-- DS Phase 2
(8, 'course', 'Machine Learning by Andrew Ng', 'Kursus ML paling populer.', 'https://coursera.org'),
(8, 'course', 'Deep Learning Specialization', 'Kursus deep learning lanjutan.', NULL),
-- DS Phase 3
(9, 'book', 'Designing ML Systems', 'Panduan arsitektur ML production.', NULL),
(9, 'course', 'Apache Spark & Big Data', 'Kursus big data processing.', NULL),
-- UX Phase 1
(10, 'course', 'Figma 101', 'Kursus dasar Figma.', 'https://figma.com'),
(10, 'book', "Don't Make Me Think", 'Buku klasik usability.', NULL),
-- UX Phase 2
(11, 'course', 'Google UX Design Certificate', 'Sertifikat UX dari Google.', NULL),
(11, 'book', 'The Design of Everyday Things', 'Buku fundamental UX.', NULL),
-- UX Phase 3
(12, 'article', 'Design Systems 101', 'Panduan membangun design system.', NULL),
-- BA Phase 1
(13, 'course', 'Excel Skills for Business', 'Kursus Excel tingkat mahir.', NULL),
(13, 'course', 'SQL for Data Analysis', 'SQL untuk analisis bisnis.', NULL),
-- BA Phase 2
(14, 'course', 'Tableau Public Tutorial', 'Visualisasi data dengan Tableau.', 'https://tableau.com'),
(14, 'course', 'Business Analysis Fundamentals', 'Kursus dasar business analysis.', NULL),
-- BA Phase 3
(15, 'book', 'Business Analysis Body of Knowledge', 'Standar internasional untuk BA.', NULL);

-- ============================================================
-- ROADMAP GAPS
-- ============================================================
-- SE
INSERT INTO roadmap_gaps (roadmap_id, description) VALUES
(1, 'Fundamental algoritma dan struktur data'),
(1, 'Penguasaan bahasa pemrograman inti'),
(2, 'Perancangan database dan optimalisasi query'),
(2, 'Arsitektur REST/GraphQL API'),
(3, 'CI/CD pipeline dan containerization'),
(3, 'Cloud infrastructure (AWS/GCP/Azure)');
-- PM
INSERT INTO roadmap_gaps (roadmap_id, description) VALUES
(4, 'Pembuatan product roadmap dan OKR'),
(4, 'Analisis kompetitor dan market research'),
(5, 'Product metrics dan A/B testing'),
(5, 'Manajemen sprint dan backlog prioritization'),
(6, 'SQL untuk data produk dan reporting');
-- DS
INSERT INTO roadmap_gaps (roadmap_id, description) VALUES
(7, 'Data wrangling dan exploratory analysis'),
(7, 'Probabilitas dan statistical inference'),
(8, 'Feature engineering dan model evaluation'),
(8, 'Big data processing dengan Spark'),
(9, 'Model deployment dan monitoring'),
(9, 'Data pipeline orchestration');
-- UX
INSERT INTO roadmap_gaps (roadmap_id, description) VALUES
(10, 'Color theory dan typography'),
(10, 'Responsive dan adaptive design'),
(11, 'User interview dan usability testing'),
(11, 'User flow dan journey mapping'),
(12, 'Design token dan component documentation'),
(12, 'Developer handoff dan asset management');
-- BA
INSERT INTO roadmap_gaps (roadmap_id, description) VALUES
(13, 'Pivot table dan data modeling di Excel'),
(13, 'Business process modeling dengan BPMN'),
(14, 'Dashboard design dan storytelling'),
(14, 'Dokumentasi BRD/FRD yang komprehensif'),
(15, 'Financial modeling dan cost-benefit analysis'),
(15, 'Forecasting dan trend analysis');
