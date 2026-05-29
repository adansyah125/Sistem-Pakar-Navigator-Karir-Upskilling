import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoadingAssessment() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const [logs, setLogs] = useState([])
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    const steps = [
      { msg: 'Menghubungi sistem pakar karier...', pct: 15 },
      { msg: 'Mengunduh skenario asesmen harian...', pct: 35 },
      { msg: 'Menyusun matriks kompetensi...', pct: 55 },
      { msg: 'Mengkalibrasi mesin inferensi...', pct: 75 },
      { msg: 'Sistem siap. Mengarahkan ke asesmen...', pct: 100 },
    ]

    let i = 0
    const interval = setInterval(() => {
      if (!mountedRef.current) return
      if (i < steps.length) {
        const step = steps[i]
        if (!step) return
        setLogs(prev => [...prev, step.msg])
        setProgress(step.pct)
        i++
      } else {
        clearInterval(interval)
      }
    }, 700)

    const timer = setTimeout(() => {
      if (mountedRef.current) {
        navigate('/assessment')
      }
    }, 4000)

    return () => {
      mountedRef.current = false
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [navigate])

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col items-center justify-center px-margin-mobile">
      <div className="max-w-md w-full space-y-stack-lg">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <h1 className="font-headline-md text-headline-md">Mempersiapkan Asesmen</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">Sistem sedang menyusun skenario khusus untuk Anda.</p>
        </div>

        <div className="bg-surface-container-low rounded-lg p-stack-md space-y-stack-sm">
          {logs.map((log, idx) => (
            <div key={idx} className="flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant">
              <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></span>
              <span>{log}</span>
            </div>
          ))}
          {progress < 100 && (
            <div className="flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant animate-pulse">
              <span className="w-1.5 h-1.5 bg-outline rounded-full flex-shrink-0"></span>
              <span>Memproses...</span>
            </div>
          )}
        </div>

        <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}
