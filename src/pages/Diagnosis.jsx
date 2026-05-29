import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { apiGet } from '../api'

export default function Diagnosis() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    const stored = localStorage.getItem('diagnosisData')

    if (!userId) {
      navigate('/')
      return
    }

    if (stored) {
      const parsed = JSON.parse(stored)
      setData(parsed)
      setLoading(false)
      return
    }

    apiGet(`/assessment/diagnosis/${userId}`)
      .then(result => {
        setData(result)
        localStorage.setItem('diagnosisData', JSON.stringify(result))
      })
      .catch(err => alert('Gagal memuat diagnosis: ' + err.message))
      .finally(() => setLoading(false))
  }, [navigate])

  function handleRoadmap(roleId) {
    localStorage.setItem('roadmapRoleId', String(roleId))
    navigate('/roadmap')
  }

  if (loading) {
    return (
      <div className="bg-surface text-on-surface min-h-screen flex items-center justify-center">
        <p className="font-body-lg">Memuat hasil diagnosis...</p>
      </div>
    )
  }

  if (!data || !data.topRole) {
    return (
      <div className="bg-surface text-on-surface min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-body-lg mb-4">Belum ada hasil diagnosis. Silakan lakukan asesmen terlebih dahulu.</p>
          <button onClick={() => navigate('/assessment')} className="bg-primary text-on-primary px-6 py-2 rounded font-label-md">
            Mulai Asesmen
          </button>
        </div>
      </div>
    )
  }

  const top = data.topRole

  return (
    <div className="bg-background text-on-surface antialiased">
      <Header />

      <main className="pt-24 pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="mb-stack-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Diagnosis Kesenjangan Keahlian</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-4 flex flex-col gap-gutter">
            <div className="bg-surface border border-outline-variant p-stack-md flex flex-col gap-stack-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-stack-sm bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-tighter">Direkomendasikan</div>
              <span className="text-primary font-label-sm text-label-sm">REKOMENDASI UTAMA</span>
              <div className="flex items-center gap-stack-sm">
                <span className="material-symbols-outlined text-[48px] text-primary">analytics</span>
                <h2 className="font-headline-md text-headline-md text-on-surface">#1 {top.roleTitle}</h2>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-justify">
                Berdasarkan analisis sistem pakar, profil Anda paling sesuai dengan peran {top.roleTitle} dengan indeks kecocokan {top.matchPct}%.
              </p>
            </div>
            <div className="bg-surface border border-outline-variant p-stack-md">
              <h3 className="font-label-md text-label-md text-on-surface uppercase mb-stack-md">Inferensi Sistem</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-justify leading-relaxed">
                Algoritma Career Navigator mengidentifikasi sinergi antara latar belakang Anda dan persyaratan target. 
                Kekuatan inti Anda teridentifikasi melalui analisis jawaban situasional dan inventarisasi keahlian.
                {top.matchPct >= 70
                  ? ` Kecocokan tinggi dengan ${top.roleTitle} menunjukkan keselarasan kompetensi yang baik.`
                  : top.matchPct >= 50
                    ? ` Kecocokan moderat dengan ${top.roleTitle} - beberapa area pengembangan masih diperlukan.`
                    : ` Disarankan untuk mengembangkan kompetensi inti agar lebih kompetitif untuk peran ${top.roleTitle}.`}
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-gutter mt-gutter lg:mt-0">
            <div className="bg-surface border border-outline-variant">
              <div className="p-stack-md border-b border-outline-variant flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Perbandingan Penyelarasan Pasar</h3>
                <div className="flex items-center gap-stack-sm">
                  <span className="w-3 h-3 rounded-full bg-[#10B981]"></span>
                  <span className="text-label-sm font-label-sm text-on-surface-variant">Kekuatan</span>
                  <span className="w-3 h-3 rounded-full bg-[#E11D48] ml-stack-md"></span>
                  <span className="text-label-sm font-label-sm text-on-surface-variant">Kesenjangan</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-outline-variant h-full">
                <div className="p-stack-md bg-surface-bright/50">
                  <h4 className="font-label-md text-label-md text-on-surface mb-stack-lg flex items-center gap-stack-sm">
                    <span className="material-symbols-outlined text-[18px] text-[#10B981]">check_circle</span>
                    Kekuatan Anda
                  </h4>
                  <div className="flex flex-wrap gap-stack-sm">
                    {top.strengths && top.strengths.length > 0 ? (
                      top.strengths.map((s, i) => (
                        <span key={i} className="px-stack-sm py-1 bg-[#ECFDF5] text-[#059669] border border-[#10B981]/30 font-label-sm text-label-sm">{s.skillName}</span>
                      ))
                    ) : (
                      <span className="text-body-sm text-on-surface-variant">Belum teridentifikasi</span>
                    )}
                  </div>
                </div>
                <div className="p-stack-md flex flex-col items-center justify-center bg-surface-container-low/30 relative">
                  <div className="relative z-10 text-center">
                    <div className="text-[48px] md:text-[64px] font-bold text-primary tracking-tighter leading-none">{top.matchPct}%</div>
                    <div className="font-label-md text-label-md text-on-surface-variant mt-stack-sm">Indeks Kesesuaian</div>
                    <div className="mt-stack-lg w-full bg-outline-variant h-1 rounded-full overflow-hidden">
                      <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${top.matchPct}%` }}></div>
                    </div>
                    <p className="mt-stack-md font-body-sm text-body-sm text-on-surface-variant italic">
                      {top.matchPct >= 70 ? 'Korelasi Tinggi' : top.matchPct >= 50 ? 'Korelasi Sedang' : 'Korelasi Rendah'}
                    </p>
                  </div>
                </div>
                <div className="p-stack-md bg-surface-bright/50">
                  <h4 className="font-label-md text-label-md text-on-surface mb-stack-lg flex items-center gap-stack-sm">
                    <span className="material-symbols-outlined text-[18px] text-[#E11D48]">warning</span>
                    Kesenjangan Skill
                  </h4>
                  <div className="flex flex-wrap gap-stack-sm">
                    {top.skillGaps && top.skillGaps.length > 0 ? (
                      top.skillGaps.map((g, i) => (
                        <span key={i} className={`px-stack-sm py-1 font-label-sm text-label-sm border rounded ${
                          g.type === 'irrelevant'
                            ? 'bg-orange-50 text-orange-600 border-orange-300'
                            : 'bg-[#FFF1F2] text-[#E11D48] border-[#E11D48]/30'
                        }`}>
                          {g.skillName}
                          {g.type === 'irrelevant' && ' (tidak relevan)'}
                        </span>
                      ))
                    ) : (
                      <span className="text-body-sm text-on-surface-variant">Tidak ada kesenjangan signifikan</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {data.roleMatches && data.roleMatches.length > 1 && (
              <div className="bg-surface border border-outline-variant p-stack-md">
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-stack-md">Semua Role</h3>
                <div className="space-y-stack-sm">
                  {data.roleMatches.map((rm, idx) => (
                    <div key={rm.roleId} className="flex items-center justify-between p-stack-sm bg-surface-container-low rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="font-label-md text-label-md text-on-surface-variant">#{idx + 1}</span>
                        <span className="font-label-md text-label-md text-on-surface">{rm.roleTitle}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-outline-variant h-2 rounded-full overflow-hidden">
                          <div className="bg-primary h-full" style={{ width: `${rm.matchPct}%` }}></div>
                        </div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant w-8 text-right">{rm.matchPct}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col md:flex-row items-center justify-between p-stack-lg bg-surface border border-outline-variant mt-stack-md gap-4">
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface">Siap untuk menutup kesenjangan?</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Kami telah menyusun jalur pembelajaran pribadi untuk mencapai kesiapan optimal.</p>
              </div>
              <button
                onClick={() => handleRoadmap(top.roleId)}
                className="w-full md:w-auto mt-stack-md md:mt-0 px-stack-lg py-3 bg-[#4F46E5] text-white font-label-md text-label-md rounded-[4px] hover:bg-[#4338CA] transition-all transform hover:scale-[1.02] active:scale-95 shadow-sm flex-shrink-0"
              >
                Lihat Roadmap Belajar
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
