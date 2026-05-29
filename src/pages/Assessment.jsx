import { useState } from 'react'
import Header from '../components/Header'

const initialSkills = [
  { name: 'React', selected: false },
  { name: 'TypeScript', selected: true },
  { name: 'Node.js', selected: false },
  { name: 'Python', selected: false },
  { name: 'Excel (Lanjutan)', selected: true },
  { name: 'SQL', selected: false },
  { name: 'AWS', selected: false },
  { name: 'Public Speaking', selected: true },
  { name: 'Penguasaan Agile', selected: false },
  { name: 'Manajemen Krisis', selected: false },
  { name: 'Penulisan Teknis', selected: true },
]

const questions = [
  {
    id: 'q1',
    text: '1. Anda sedang memimpin proyek lintas fungsi dan pemangku kepentingan senior meminta perubahan fitur utama tiga hari sebelum rilis produksi. Bagaimana Anda mengelola konflik teknis dan profesional ini?',
    options: [
      'Hentikan rilis segera untuk menyertakan perubahan tersebut, guna memastikan kepuasan maksimal pemangku kepentingan.',
      'Negosiasikan tanggal rilis V1.1 sambil mempertahankan tenggat waktu produksi saat ini untuk inti MVP.',
      'Tolak permintaan secara formal dengan alasan utang teknis dan batasan sprint yang kaku.',
    ],
  },
  {
    id: 'q2',
    text: '2. Seorang pengembang junior di tim Anda secara konsisten menyerahkan kode yang memenuhi persyaratan tetapi kurang memiliki performa yang optimal. Apa pendekatan pedagogis utama Anda?',
    options: [
      'Tulis ulang logikanya sendiri untuk menunjukkan arsitektur "Standar Emas" melalui perbandingan kode (diffs).',
      'Terapkan aturan linting yang ketat dan tolok ukur performa yang memblokir permintaan penggabungan (merge request) secara otomatis.',
      'Lakukan sesi berpasangan (pairing) 1:1 yang berfokus pada efisiensi algoritmik dan penalaran sistemik.',
    ],
  },
  {
    id: 'q3',
    text: '3. Saat berhadapan dengan sistem warisan (legacy) yang rapuh tetapi berfungsi, bagaimana Anda memprioritaskan peta jalan untuk modernisasi infrastruktur?',
    options: [
      'Refaktorisasi inkremental yang berfokus pada modul yang paling rentan terlebih dahulu (Strangler Pattern).',
      'Lobi untuk penulisan ulang total dari awal (greenfield) untuk menghilangkan utang teknis dalam satu fase.',
    ],
  },
  {
    id: 'q4',
    text: '4. Anggaran departemen Anda dipotong sebesar 15%. Anda harus memutuskan antara mengurangi lisensi perangkat lunak untuk alat canggih atau menunda retret pelatihan tim yang telah direncanakan.',
    options: [
      'Kurangi biaya alat; modal manusia dan kohesi tim adalah pendorong utama kecepatan (velocity) jangka panjang.',
      'Tunda pelatihan; perangkat lunak khusus sangat penting untuk menjaga presisi dalam hasil kerja.',
    ],
  },
  {
    id: 'q5',
    text: '5. Terjadi gangguan layanan (downtime) kritis di lingkungan produksi karena kesalahan konfigurasi pihak ketiga. Langkah taktis apa yang pertama kali Anda instruksikan pada tim?',
    options: [
      'Lakukan isolasi sistem dan terapkan rencana penanggulangan bencana (disaster recovery) formal untuk memulihkan status stabil terakhir.',
      'Hubungi tim dukungan pihak ketiga secara agresif dan tunggu arahan perbaikan dari mereka untuk menghindari tumpang tindih regulasi.',
      'Langsung bangun patch perbaikan baru secara paralel langsung di server produksi demi memangkas waktu tunggu pengguna.',
    ],
  },
  {
    id: 'q6',
    text: '6. Bagaimana pendekatan Anda dalam mengadopsi tumpukan teknologi (tech stack) baru yang sedang tren di pasar ke dalam proyek internal perusahaan?',
    options: [
      'Adopsi langsung pada proyek utama agar perusahaan tidak tertinggal secara teknologi dan meningkatkan daya tarik rekrutmen.',
      'Lakukan eksperimen skala kecil (Proof of Concept) pada layanan non-kritis sebelum memutuskan migrasi bertahap.',
      'Batasi adopsi teknologi baru secara ketat; standarisasi tumpukan teknologi lama yang stabil jauh lebih aman untuk bisnis jangka panjang.',
    ],
  },
  {
    id: 'q7',
    text: '7. Tim Anda terjebak dalam perdebatan tanpa akhir mengenai dua arsitektur teknis yang berbeda. Kedua opsi memiliki kelebihan yang seimbang. Tindakan apa yang Anda ambil?',
    options: [
      'Ambil keputusan sepihak berdasarkan preferensi pribadi Anda untuk menjaga linimasa sprint tetap berjalan.',
      'Tentukan matriks penilaian objektif (skalabilitas, biaya, waktu) dan lakukan pemungutan suara berbasis data teknis.',
      'Serahkan keputusan sepenuhnya kepada manajemen atas agar tim tidak merasa ada kubu yang disudutkan.',
    ],
  },
  {
    id: 'q8',
    text: '8. Sebuah produk baru yang dirilis tim Anda mengalami lonjakan pengguna sebesar 500% dalam semalam, menyebabkan beban server mendekati batas maksimal. Apa prioritas rekayasa Anda?',
    options: [
      'Terapkan pembatasan laju lalu lintas (rate limiting) atau pemangkasan fitur non-esensial segera demi menjaga sistem inti tetap menyala.',
      'Lakukan migrasi pangkalan data secara penuh saat itu juga ke penyedia cloud yang memiliki arsitektur auto-scaling lebih baik.',
      'Biarkan sistem berjalan apa adanya sembari memantau, dan siapkan skema pengembalian dana jika terjadi kegagalan transaksi.',
    ],
  },
  {
    id: 'q9',
    text: '9. Dalam tinjauan pasca-proyek (retrospektif), ditemukan bahwa salah satu metrik utama performa produk gagal dicapai akibat miskomunikasi antar divisi. Bagaimana Anda menyikapinya?',
    options: [
      'Identifikasi individu yang bertanggung jawab atas miskomunikasi tersebut untuk diberikan evaluasi kerja formal.',
      'Fokus pada perbaikan alur komunikasi sistemik dan dokumentasi API/kontrak data antar tim agar celah kesalahan tertutup.',
      'Sesuaikan kembali metrik keberhasilan di masa lalu agar performa tim terlihat tetap memenuhi target di mata manajemen eksekutif.',
    ],
  },
  {
    id: 'q10',
    text: '10. Manajemen meminta tim Anda untuk mengintegrasikan fitur kecerdasan buatan (AI/LLM) ke dalam sistem manajemen inti dalam waktu dua minggu, padahal tim belum memiliki keahlian khusus di bidang tersebut. Apa langkah strategis Anda?',
    options: [
      'Tolak tugas tersebut hingga perusahaan merekrut ilmuwan data atau insinyur AI khusus yang berpengalaman.',
      'Gunakan API pihak ketiga yang siap pakai (out-of-the-box) untuk membuat integrasi cepat berbasis MVP sembari melatih tim secara paralel.',
      'Minta perpanjangan waktu enam bulan untuk memberikan ruang bagi tim mempelajari dasar-dasar pembelajaran mesin dari nol.',
    ],
  },
]

export default function Assessment() {
  const [answers, setAnswers] = useState({})
  const [skills, setSkills] = useState(initialSkills)

  function handleAnswer(questionId, optionIndex) {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }))
  }

  function toggleSkill(index) {
    setSkills(prev => prev.map((s, i) => i === index ? { ...s, selected: !s.selected } : s))
  }

  const totalQuestions = questions.length
  const answeredCount = Object.keys(answers).length
  const progressPercent = (answeredCount / totalQuestions) * 100
  const selectedSkills = skills.filter(s => s.selected).length

  return (
    <div className="bg-surface text-on-surface">
      <Header />

      <main className="pt-24 pb-stack-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop min-h-screen flex flex-col">
        <div className="mb-stack-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2 mb-stack-sm">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-[#0f172a]">Asesmen Pakar Interaktif</h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2 text-justify">Analisis pola respons profesional Anda dan inventarisasi perangkat teknis Anda.</p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">Langkah 2 dari 4</span>
              <div className="font-headline-sm text-headline-sm text-[#0f172a]">{progressPercent.toFixed(0)}% Selesai</div>
            </div>
          </div>
          <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-700 ease-in-out" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter flex-grow">
          <div className="md:col-span-8 space-y-stack-lg">
            <section className="space-y-stack-md">
              <div className="flex items-center gap-2 mb-stack-sm">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                <h2 className="font-headline-sm text-headline-sm text-[#0f172a]">Analisis Situasional</h2>
              </div>

              {questions.map((q) => (
                <div key={q.id} className="bg-white border border-slate-200 p-stack-md rounded-lg shadow-sm">
                  <p className="font-body-md text-body-md text-[#0f172a] mb-stack-md text-justify">{q.text}</p>
                  <div className="grid grid-cols-1 gap-stack-sm">
                    {q.options.map((opt, optIdx) => (
                      <label key={optIdx} className="flex items-start p-stack-sm border border-slate-200 rounded-lg cursor-pointer hover:border-primary transition-colors group">
                        <input
                          type="radio"
                          name={q.id}
                          className="w-4 h-4 text-primary border-slate-300 focus:ring-primary mt-1 flex-shrink-0"
                          checked={answers[q.id] === optIdx}
                          onChange={() => handleAnswer(q.id, optIdx)}
                        />
                        <span className="ml-stack-md font-body-sm text-body-sm text-on-surface-variant group-hover:text-[#0f172a] text-justify">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            <section className="space-y-stack-md">
              <div className="flex items-center gap-2 mb-stack-sm">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
                <h2 className="font-headline-sm text-headline-sm text-[#0f172a]">Inventarisasi Keahlian</h2>
              </div>
              <div className="bg-white border border-slate-200 p-stack-md rounded-lg shadow-sm">
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-stack-md text-justify">Pilih kompetensi inti Anda untuk mengkalibrasi mesin pemetaan pakar.</p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, idx) => (
                    <button
                      key={idx}
                      onClick={() => toggleSkill(idx)}
                      className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-all ${
                        skill.selected
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-600'
                          : 'border border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
                      }`}
                    >
                      {skill.name}
                    </button>
                  ))}
                  <div className="relative flex-grow min-w-[150px]">
                    <input className="w-full h-[36px] bg-slate-50 border border-slate-200 rounded-full px-4 font-mono text-label-sm focus:border-primary focus:ring-0 outline-none" placeholder="misal, `Arsitek Sistem Senior`" type="text" />
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="md:col-span-4 h-fit md:sticky md:top-24 space-y-stack-md">
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
              <div className="bg-slate-50 p-stack-md border-b border-slate-200">
                <h3 className="font-headline-sm text-headline-sm text-[#0f172a]">Ringkasan Asesmen</h3>
              </div>
              <div className="p-stack-md space-y-stack-md">
                <div className="space-y-stack-sm">
                  <div className="flex justify-between text-label-sm font-label-sm">
                    <span className="text-on-surface-variant">Penalaran Strategis</span>
                    <span className="text-[#0f172a]">85%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[85%]"></div>
                  </div>
                </div>
                <div className="space-y-stack-sm">
                  <div className="flex justify-between text-label-sm font-label-sm">
                    <span className="text-on-surface-variant">Nuansa Kepemimpinan</span>
                    <span className="text-[#0f172a]">62%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[62%]"></div>
                  </div>
                </div>
                <div className="space-y-stack-sm">
                  <div className="flex justify-between text-label-sm font-label-sm">
                    <span className="text-on-surface-variant">Kedalaman Teknis</span>
                    <span className="text-[#0f172a]">94%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[94%]"></div>
                  </div>
                </div>
                <hr className="border-slate-100" />
                <div className="grid grid-cols-2 gap-stack-md">
                  <div className="text-center p-stack-sm bg-slate-50 rounded-lg">
                    <div className="text-headline-sm font-headline-sm text-primary">{String(answeredCount).padStart(2, '0')}</div>
                    <div className="text-label-sm font-label-sm text-on-surface-variant">Respon</div>
                  </div>
                  <div className="text-center p-stack-sm bg-slate-50 rounded-lg">
                    <div className="text-headline-sm font-headline-sm text-primary">{String(selectedSkills).padStart(2, '0')}</div>
                    <div className="text-label-sm font-label-sm text-on-surface-variant">Keahlian</div>
                  </div>
                </div>
                <div className="p-stack-sm bg-primary-fixed rounded-lg border border-primary/10">
                  <p className="font-body-sm text-body-sm text-on-primary-fixed-variant leading-relaxed text-justify">
                    <span className="font-bold">Wawasan:</span> Profil Anda saat ini menunjukkan kecenderungan kuat ke arah <span className="font-bold">Lead Engineering</span> dengan presisi teknis yang tinggi.
                  </p>
                </div>
              </div>
            </div>
            <button className="w-full bg-[#4f46e5] text-white py-4 rounded-lg font-headline-sm text-headline-sm hover:bg-[#4338ca] shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2">
              Simpan &amp; Lanjutkan
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <p className="text-center font-label-sm text-label-sm text-on-surface-variant">Langkah Berikutnya: Analisis Kesenjangan Karier</p>
          </aside>
        </div>
      </main>
    </div>
  )
}