import { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'

export default function LoadingAssessment() {
  const [progress, setProgress] = useState(0)
  const [logState, setLogState] = useState([
    { text: 'Memuat basis data kompetensi...', status: 'pending' },
    { text: 'Menyusun skenario situasi kerja...', status: 'pending' },
    { text: 'Menyiapkan matriks penilaian...', status: 'pending' },
  ])
  const [engineStatus, setEngineStatus] = useState('INITIALIZING')
  const [syncStatus, setSyncStatus] = useState('0%')
  const [showCta, setShowCta] = useState(false)
  const [completed, setCompleted] = useState(false)
  const progressRef = useRef(0)

  useEffect(() => {
    const duration = 3500
    const intervalTime = 30
    const step = 100 / (duration / intervalTime)

    const interval = setInterval(() => {
      progressRef.current += step
      const rounded = Math.floor(progressRef.current)

      if (progressRef.current >= 100) {
        progressRef.current = 100
        setProgress(100)
        clearInterval(interval)
        setCompleted(true)
        setEngineStatus('OPTIMAL')
        setSyncStatus('100%')
        setTimeout(() => setShowCta(true), 100)
        return
      }

      setProgress(rounded)
      setSyncStatus(`${rounded}%`)

      setLogState(prev => {
        const next = [...prev]
        const mileStones = [30, 60, 90]

        mileStones.forEach((ms, idx) => {
          const prevMs = idx === 0 ? 0 : mileStones[idx - 1]
          if (rounded > prevMs && rounded <= ms && next[idx].status === 'pending') {
            next[idx] = { ...next[idx], status: 'processing' }
          }
          if (rounded >= ms && next[idx].status === 'processing') {
            next[idx] = { ...next[idx], status: 'completed' }
          }
        })

        return next
      })
    }, intervalTime)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24 pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto w-full">
        <section className="flex flex-col items-center text-center mb-stack-lg">
          <h1 className="text-headline-lg text-on-surface mb-stack-sm">Asesmen Siap Dimulai</h1>
          <p className="text-body-md text-on-surface-variant max-w-2xl leading-relaxed">
            Sistem sedang melakukan kalibrasi instrumen asesmen interaktif berdasarkan profil profesional Anda. Proses ini melibatkan penyelarasan parameter penilaian dengan standar industri terkini untuk memastikan akurasi pemetaan kompetensi dan proyeksi jalur karier Anda secara presisi.
          </p>
        </section>

        <section className="relative mb-stack-lg flex flex-col items-center">
          <div className="w-full h-56 md:h-64 border border-outline-variant rounded-lg expert-grid relative overflow-hidden bg-white flex items-center justify-center">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-ping"></div>
              <div className="absolute inset-4 border-2 border-primary/40 rounded-full"></div>
              <div className="absolute inset-8 border border-primary/60 rounded-full"></div>
              <div className="z-10 bg-white p-4 rounded-lg border border-primary shadow-sm">
                <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
              </div>
              <div className="absolute w-full h-1 bg-gradient-to-b from-transparent via-primary/30 to-transparent top-0 left-0 scan-line"></div>
            </div>
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm border border-outline-variant px-4 py-2 rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-label-md text-primary font-bold min-w-[40px] text-right">{progress}%</span>
                <div className="w-24 md:w-32 h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-300 ease-out ${completed ? 'bg-emerald-500' : 'bg-primary'}`} style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white border border-outline-variant p-stack-md rounded-lg mb-stack-lg shadow-sm">
          <h3 className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-stack-md border-b border-outline-variant pb-2">System Initialization Log</h3>
          <div className="space-y-stack-md">
            {logState.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-stack-md">
                  <span
                    className={`material-symbols-outlined icon-status ${
                      item.status === 'completed' ? 'text-emerald-600' : item.status === 'processing' ? 'text-primary animate-spin-fast' : 'text-outline-variant'
                    }`}
                    style={item.status === 'completed' ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    {item.status === 'completed' ? 'check_circle' : 'sync'}
                  </span>
                  <span className="text-body-md text-on-surface">{item.text}</span>
                </div>
                <span
                  className={`text-label-sm font-bold ${
                    item.status === 'completed' ? 'text-emerald-600' : item.status === 'processing' ? 'text-primary' : 'text-on-surface-variant'
                  }`}
                >
                  {item.status === 'completed' ? 'COMPLETED' : item.status === 'processing' ? 'PROCESSING' : 'PENDING'}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className={`flex justify-center mb-stack-lg transition-all duration-500 ${showCta ? 'opacity-100 pointer-events-auto fade-in-up' : 'opacity-0 pointer-events-none'}`}>
          <a href="/assessment" className="bg-primary text-on-primary px-12 py-3.5 rounded-full text-label-md font-semibold hover:bg-indigo-700 transition-all shadow-md active:scale-95">
            Mulai Sekarang
          </a>
        </div>

        <section className="grid grid-cols-2 gap-stack-md">
          <div className="border border-outline-variant p-stack-md rounded-lg flex flex-col items-center justify-center bg-white shadow-sm">
            <span className="text-label-sm text-on-surface-variant uppercase mb-1">Engine Status</span>
            <span className={`text-label-md font-bold ${completed ? 'text-emerald-600' : 'text-primary'}`}>{engineStatus}</span>
          </div>
          <div className="border border-outline-variant p-stack-md rounded-lg flex flex-col items-center justify-center bg-white shadow-sm">
            <span className="text-label-sm text-on-surface-variant uppercase mb-1">Data Sync</span>
            <span className="text-label-md text-primary font-bold">{syncStatus}</span>
          </div>
        </section>
      </main>

     
    </div>
  )
}
