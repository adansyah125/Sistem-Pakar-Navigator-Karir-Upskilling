import Header from '../components/Header'

export default function Diagnosis() {
  return (
    <div className="bg-background text-on-surface antialiased">
      <Header />

      <main className="pt-24 pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="mb-stack-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-stack-md">
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Diagnosis Kesenjangan Keahlian</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-4 flex flex-col gap-gutter">
            <div className="bg-surface border border-outline-variant p-stack-md flex flex-col gap-stack-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-stack-sm bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-tighter">Direkomendasikan</div>
              <span className="text-primary font-label-sm text-label-sm">REKOMENDASI UTAMA</span>
              <div className="flex items-center gap-stack-sm">
                <span className="material-symbols-outlined text-[48px] text-primary">analytics</span>
                <h2 className="font-headline-md text-headline-md text-on-surface">#1 Data Analyst</h2>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-justify">Berdasarkan kemahiran Anda saat ini dalam Python dan pemodelan statistik, transisi Anda ke peran Senior Data Analyst sangat dioptimalkan.</p>
            </div>
            <div className="bg-surface border border-outline-variant p-stack-md">
              <h3 className="font-label-md text-label-md text-on-surface uppercase mb-stack-md">Inferensi Sistem</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-justify leading-relaxed">
                Algoritma Career Navigator mengidentifikasi sinergi yang tinggi antara latar belakang teknik Anda saat ini dan peran analitis target. Kekuatan inti Anda terletak pada manipulasi data (SQL/Pandas), yang memenuhi 90% dari persyaratan teknis industri. Kesenjangan yang teridentifikasi terutama terlokalisasi pada visualisasi kecerdasan bisnis dan kerangka pemodelan prediktif. Mengatasi modul spesifik ini akan meningkatkan profil Anda ke kompetensi tingkat atas dalam lanskap pasar saat ini.
              </p>
            </div>
            <div className="relative h-48 border border-outline-variant overflow-hidden group">
              <img
                alt="Analytics Dashboard"
                className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3ksZZEGP5DScyjpL_WMpuHF1sfwDwaN7VQpurWGwUoGqWMZ8QlDwfb1ZsWAPdLWD6eDLPJSmMCb8D-sFe_Q6McAubw0TLk6M3a1zI-u9ROMftpwTrYrpjQS0MJf4iii-x_YVzPzU7T2feEbhAN0_Z60y5g3b4WsENczlFlSfSdAKx_xsd9MjpjQQAiK3x1bqrosO_iWmgSEd4EHPwTtb0dCY9gLiHFnvhwh0VAI1Mj337RZ5YZANDFhmFRBTf8udRcc4Fw4pSqIs"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-gutter mt-gutter lg:mt-0">
            <div className="bg-surface border border-outline-variant">
              <div className="p-stack-md border-b border-outline-variant flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Perbandingan Penyelarasan Pasar</h3>
                <div className="flex items-center gap-stack-sm">
                  <span className="w-3 h-3 rounded-full bg-[#10B981]"></span>
                  <span className="text-label-sm font-label-sm text-on-surface-variant">Saat Ini</span>
                  <span className="w-3 h-3 rounded-full bg-[#E11D48] ml-stack-md"></span>
                  <span className="text-label-sm font-label-sm text-on-surface-variant">Dibutuhkan</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-outline-variant h-full">
                <div className="p-stack-md bg-surface-bright/50">
                  <h4 className="font-label-md text-label-md text-on-surface mb-stack-lg flex items-center gap-stack-sm">
                    <span className="material-symbols-outlined text-[18px] text-[#10B981]">check_circle</span>
                    Keahlian Anda Saat Ini
                  </h4>
                  <div className="flex flex-wrap gap-stack-sm">
                    <span className="px-stack-sm py-1 bg-[#ECFDF5] text-[#059669] border border-[#10B981]/30 font-label-sm text-label-sm">Python (Lanjutan)</span>
                    <span className="px-stack-sm py-1 bg-[#ECFDF5] text-[#059669] border border-[#10B981]/30 font-label-sm text-label-sm">Query SQL</span>
                    <span className="px-stack-sm py-1 bg-[#ECFDF5] text-[#059669] border border-[#10B981]/30 font-label-sm text-label-sm">Alur Kerja Git</span>
                    <span className="px-stack-sm py-1 bg-[#ECFDF5] text-[#059669] border border-[#10B981]/30 font-label-sm text-label-sm">Pemecahan Masalah</span>
                    <span className="px-stack-sm py-1 bg-[#ECFDF5] text-[#059669] border border-[#10B981]/30 font-label-sm text-label-sm">Pandas &amp; NumPy</span>
                  </div>
                </div>
                <div className="p-stack-md flex flex-col items-center justify-center bg-surface-container-low/30 relative">
                  <div className="skill-grid-pattern absolute inset-0 opacity-10"></div>
                  <div className="relative z-10 text-center">
                    <div className="text-[48px] md:text-[64px] font-bold text-primary tracking-tighter leading-none">72%</div>
                    <div className="font-label-md text-label-md text-on-surface-variant mt-stack-sm">Indeks Kesesuaian</div>
                    <div className="mt-stack-lg w-full bg-outline-variant h-1 rounded-full overflow-hidden">
                      <div className="bg-primary h-full transition-all duration-1000" style={{ width: '72%' }}></div>
                    </div>
                    <p className="mt-stack-md font-body-sm text-body-sm text-on-surface-variant italic">Korelasi Tinggi</p>
                  </div>
                </div>
                <div className="p-stack-md bg-surface-bright/50">
                  <h4 className="font-label-md text-label-md text-on-surface mb-stack-lg flex items-center gap-stack-sm">
                    <span className="material-symbols-outlined text-[18px] text-[#E11D48]">warning</span>
                    Persyaratan yang Kurang
                  </h4>
                  <div className="flex flex-wrap gap-stack-sm">
                    <span className="px-stack-sm py-1 bg-[#FFF1F2] text-[#E11D48] border border-[#E11D48]/30 font-label-sm text-label-sm">Tableau / PowerBI</span>
                    <span className="px-stack-sm py-1 bg-[#FFF1F2] text-[#E11D48] border border-[#E11D48]/30 font-label-sm text-label-sm">Metode A/B Testing</span>
                    <span className="px-stack-sm py-1 bg-[#f1f5f9] text-[#64748b] border border-[#cbd5e1] font-label-sm text-label-sm">Pipa Data ETL</span>
                    <span className="px-stack-sm py-1 bg-[#f1f5f9] text-[#64748b] border border-[#cbd5e1] font-label-sm text-label-sm">Scikit-Learn</span>
                  </div>
                  <div className="mt-stack-lg border-t border-outline-variant/30 pt-stack-md">
                    <span className="text-label-sm font-label-sm text-on-surface-variant">Fokus yang direkomendasikan:</span>
                    <p className="text-body-sm font-body-sm text-primary mt-1">Visualisasi Data &amp; Eksperimentasi</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between p-stack-lg bg-surface border border-outline-variant mt-stack-md gap-4">
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface">Siap untuk menutup kesenjangan?</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Kami telah menyusun jalur pembelajaran pribadi untuk mencapai kesiapan 100% dalam 12 minggu.</p>
              </div>
              <a href='/roadmap' className="w-full md:w-auto mt-stack-md md:mt-0 px-stack-lg py-3 bg-[#4F46E5] text-white font-label-md text-label-md rounded-[4px] hover:bg-[#4338CA] transition-all transform hover:scale-[1.02] active:scale-95 shadow-sm flex-shrink-0">
                Lihat Roadmap Belajar
              </a>
            </div>
          </div>
        </div>
      </main>

      
    </div>
  )
}
