import Header from '../components/Header'

export default function Roadmap() {
  return (
    <div className="bg-surface text-on-surface">
      <Header />

      <main className="pt-24 pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex justify-center items-center mb-stack-lg max-w-2xl mx-auto overflow-x-auto pb-2">
          {['Profil', 'Asesmen', 'Kesenjangan', 'Peta Jalan'].map((label, idx) => (
            <div key={idx} className="flex items-center">
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-label-sm ${
                  idx === 3 ? 'bg-primary text-on-primary shadow-[0_0_0_4px_#e9ddff]' : 'bg-primary text-on-primary'
                }`}>{idx + 1}</div>
                <span className={`text-label-sm font-label-sm ${idx === 3 ? 'text-primary font-bold' : 'text-outline'}`}>{label}</span>
              </div>
              {idx < 3 && <div className="h-[2px] w-8 md:w-16 bg-primary mx-2"></div>}
            </div>
          ))}
        </div>

        <section className="mb-stack-lg text-center">
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Peta Jalan Strategis Upskilling Anda</h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
            Berdasarkan target peran Anda sebagai <span className="text-primary font-bold">Senior Software Architect</span>, kami telah merancang rencana eksekusi tiga fase untuk menjembatani kesenjangan teknis dan kepemimpinan Anda.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-8">
            <div className="relative pl-8 md:pl-12">
              <div className="absolute left-4 md:left-6 top-0 bottom-0 w-1 roadmap-line rounded-full opacity-20"></div>

              <div className="mb-stack-lg relative">
                <div className="absolute -left-8 md:-left-12 mt-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10">
                  <span className="material-symbols-outlined text-on-primary text-sm">verified</span>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-2 mb-4">
                    <div>
                      <span className="text-label-sm font-label-sm text-primary-container bg-primary px-2 py-0.5 rounded uppercase tracking-wider">Fase 1</span>
                      <h3 className="font-headline-sm text-headline-sm mt-1 text-on-surface">Fundamental Sistem &amp; Dasar-dasar Terdistribusi</h3>
                    </div>
                    <span className="text-label-sm font-label-sm text-outline flex-shrink-0">Minggu 1-4</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 text-justify">
                    Perkuat pengetahuan dasar Anda tentang sistem terdistribusi dan pola microservices. Fokus pada pemisahan struktur monolitik dan penerapan gateway API yang kuat.
                  </p>
                  <div className="space-y-stack-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      <span className="font-label-md text-label-md text-on-surface">Keahlian yang Kurang: Pola Desain Berbasis Event</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      <span className="font-label-md text-label-md text-on-surface">Keahlian yang Kurang: Skalabilitas Database Ketersediaan Tinggi</span>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-surface-container-low rounded-lg border border-outline-variant flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">menu_book</span>
                      <div>
                        <p className="font-label-md text-label-md text-on-surface">Sumber Daya: Designing Data-Intensive Applications</p>
                        <p className="font-label-sm text-label-sm text-outline">Panduan Standar Industri (O'Reilly Media)</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-outline">chevron_right</span>
                  </div>
                </div>
              </div>

              <div className="mb-stack-lg relative">
                <div className="absolute -left-8 md:-left-12 mt-1 w-8 h-8 rounded-full bg-primary-container flex items-center justify-center z-10 ring-4 ring-surface">
                  <span className="material-symbols-outlined text-primary text-sm">rocket_launch</span>
                </div>
                <div className="bg-surface-container-lowest border border-primary/30 rounded-xl p-stack-md shadow-sm">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-2 mb-4">
                    <div>
                      <span className="text-label-sm font-label-sm text-primary-fixed-dim bg-on-primary-fixed-variant px-2 py-0.5 rounded uppercase tracking-wider">Fase 2</span>
                      <h3 className="font-headline-sm text-headline-sm mt-1 text-on-surface">Arsitektur Lanjutan &amp; Strategi Cloud</h3>
                    </div>
                    <span className="text-label-sm font-label-sm text-outline flex-shrink-0">Minggu 5-10</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 text-justify">
                    Kuasai strategi penerapan multi-cloud dan prinsip-prinsip site reliability engineering (SRE). Anda akan beralih dari "membangun komponen" ke "mengorkestrasi ekosistem" dengan persyaratan tanpa waktu henti.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-primary-container/10 text-primary px-3 py-1 rounded-full text-label-sm font-label-sm border border-primary/20">AWS Solutions Architect Professional</span>
                    <span className="bg-primary-container/10 text-primary px-3 py-1 rounded-full text-label-sm font-label-sm border border-primary/20">Kubernetes Security Specialist</span>
                  </div>
                  <div className="p-4 bg-primary-fixed/30 rounded-lg border border-primary-fixed-dim flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">school</span>
                      <div>
                        <p className="font-label-md text-label-md text-on-surface">Kursus: Cloud Native Infrastructure Patterns</p>
                        <p className="font-label-sm text-label-sm text-outline">Lokakarya yang dipimpin Ahli (A Cloud Guru)</p>
                      </div>
                    </div>
                    <button className="text-primary font-bold text-label-sm">DAFTAR SEKARANG</button>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-8 md:-left-12 mt-1 w-8 h-8 rounded-full bg-surface-container-highest border-2 border-outline-variant flex items-center justify-center z-10">
                  <span className="material-symbols-outlined text-outline text-sm">work</span>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-2 mb-4">
                    <div>
                      <span className="text-label-sm text-sm text-on-surface-variant bg-surface-container-highest px-2 py-0.5 rounded uppercase tracking-wider">Fase 3</span>
                      <h3 className="font-headline-sm text-headline-sm mt-1 text-on-surface">Kehadiran Eksekutif &amp; Kepemimpinan Teknis</h3>
                    </div>
                    <span className="text-label-sm font-label-sm text-outline flex-shrink-0">Minggu 11-14</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 text-justify">
                    Langkah terakhir berfokus pada menjembatani celah antara keunggulan teknis dan strategi bisnis. Pelajari cara mengomunikasikan risiko teknis kepada pemangku kepentingan C-suite dan mengelola tinjauan arsitektur lintas fungsi.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 p-2 rounded bg-surface-container-low">
                      <span className="material-symbols-outlined text-tertiary">groups</span>
                      <span className="font-label-sm text-label-sm">Mentoring Arsitek Junior</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded bg-surface-container-low">
                      <span className="material-symbols-outlined text-tertiary">bar_chart</span>
                      <span className="font-label-sm text-label-sm">Keputusan Teknologi Berbasis ROI</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-gutter mt-gutter lg:mt-0">
            <div className="bg-primary text-on-primary rounded-xl p-stack-md shadow-lg flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-4xl mb-2">picture_as_pdf</span>
              <h4 className="font-headline-sm text-headline-sm mb-2">Ekspor Strategi Anda</h4>
              <p className="font-body-sm text-body-sm opacity-90 mb-6 px-4 text-justify">Unduh peta jalan karier dan penilaian keahlian Anda dalam bentuk PDF resolusi tinggi yang dapat dicetak untuk dibagikan dengan manajer atau mentor Anda.</p>
              <button className="w-full bg-on-primary text-primary font-bold py-3 rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2">
                <span>Unduh Peta Jalan PDF</span>
                <span className="material-symbols-outlined text-sm">download</span>
              </button>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md">
              <h4 className="font-label-md text-label-md text-on-surface font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">lightbulb</span>
                Jalur Akselerasi
              </h4>
              <div className="grid grid-cols-1 gap-stack-sm">
                <div className="group border border-outline-variant hover:border-primary p-3 rounded-lg transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-label-sm text-label-sm text-primary mb-1">SERTIFIKASI GRATIS</p>
                      <h5 className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Pengantar Desain Sistem</h5>
                    </div>
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded">POPULER</span>
                  </div>
                </div>
                <div className="group border border-outline-variant hover:border-primary p-3 rounded-lg transition-colors cursor-pointer">
                  <p className="font-label-sm text-label-sm text-primary mb-1">LOKAKARYA GRATIS</p>
                  <h5 className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Anti-Pola Microservices</h5>
                </div>
                <div className="group border border-outline-variant hover:border-primary p-3 rounded-lg transition-colors cursor-pointer">
                  <p className="font-label-sm text-label-sm text-primary mb-1">JALUR PREMIUM</p>
                  <h5 className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Paket Kepemimpinan Senior</h5>
                </div>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden h-48 group">
              <img
                alt="Collaboration in modern office"
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj68aUcnWhHqMOT1rZGu8lAwh1hGpdygFc1_v4MvkdLaYW0uLBVusApYdIneLyWVhIQr-yAny0eWy8VjZzmAZWBEEywtPdvaQMb6Ql1XwzouxTzUHi25_aXb5EKuU6x7JW8_urrD-eZQv9FKB7Uklv4DvKPbV5fNJL8JM1uM9IClzQSPqDCBFwK2pqKtYVYvlAadDFPTXqnnsr2EpsOTj_eZgQyYPQPF2fFYkneiR51X9TATrHwBhmgy9tYR7RStAGIdWUAiRYnzY"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex flex-col justify-end p-4">
                <p className="text-on-primary font-bold text-label-md mb-1 italic">&quot;Jalur terpendek menuju puncak adalah iterasi yang berkelanjutan.&quot;</p>
                <p className="text-on-primary/80 text-label-sm">AI Mentor Karier</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      
    </div>
  )
}
