import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { apiGet } from '../api'

export default function Roadmap() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const roleId = localStorage.getItem('roadmapRoleId')

    if (!roleId) {
      navigate('/diagnosis')
      return
    }

    apiGet(`/roadmap/${roleId}`)
      .then(result => setData(result))
      .catch(err => alert('Gagal memuat roadmap: ' + err.message))
      .finally(() => setLoading(false))
  }, [navigate])

  if (loading) {
    return (
      <div className="bg-surface text-on-surface min-h-screen flex items-center justify-center">
        <p className="font-body-lg">Memuat roadmap...</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="bg-surface text-on-surface min-h-screen flex items-center justify-center">
        <p className="font-body-lg">Roadmap tidak ditemukan.</p>
      </div>
    )
  }

  const { role, phases } = data

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
            Berdasarkan target peran sebagai <span className="text-primary font-bold">{role.title}</span>, kami telah merancang rencana eksekusi tiga fase untuk menjembatani kesenjangan kompetensi Anda.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-8">
            <div className="relative pl-8 md:pl-12">
              <div className="absolute left-4 md:left-6 top-0 bottom-0 w-1 roadmap-line rounded-full opacity-20"></div>

              {phases.map((phase, idx) => (
                <div key={phase.id} className={`${idx < phases.length - 1 ? 'mb-stack-lg' : ''} relative`}>
                  <div className="absolute -left-8 md:-left-12 mt-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10">
                    <span className="material-symbols-outlined text-on-primary text-sm">{idx === 0 ? 'verified' : idx === 1 ? 'rocket_launch' : 'work'}</span>
                  </div>
                  <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-2 mb-4">
                      <div>
                        <span className="text-label-sm font-label-sm text-primary-container bg-primary px-2 py-0.5 rounded uppercase tracking-wider">Fase {phase.phase}</span>
                        <h3 className="font-headline-sm text-headline-sm mt-1 text-on-surface">{phase.title}</h3>
                      </div>
                      <span className="text-label-sm font-label-sm text-outline flex-shrink-0">{phase.week_range}</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 text-justify">{phase.description}</p>

                    {phase.gaps && phase.gaps.length > 0 && (
                      <div className="space-y-stack-sm mb-4">
                        {phase.gaps.map(gap => (
                          <div key={gap.id} className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                            <span className="font-label-md text-label-md text-on-surface">{gap.description}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {phase.resources && phase.resources.map(res => (
                      <div key={res.id} className="mt-4 p-4 bg-surface-container-low rounded-lg border border-outline-variant flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary">
                            {res.type === 'book' ? 'menu_book' : res.type === 'course' ? 'school' : 'article'}
                          </span>
                          <div>
                            <p className="font-label-md text-label-md text-on-surface">
                              {res.type.toUpperCase()}: {res.title}
                            </p>
                            <p className="font-label-sm text-label-sm text-outline">{res.description}</p>
                          </div>
                        </div>
                        {res.url && (
                          <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-primary font-bold text-label-sm flex-shrink-0">
                            BUKA
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
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
          </div>
        </div>
      </main>
    </div>
  )
}
