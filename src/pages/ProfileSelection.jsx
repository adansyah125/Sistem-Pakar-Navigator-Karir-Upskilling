import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { apiGet } from '../api'

export default function ProfileSelection() {
  const navigate = useNavigate()
  const [roles, setRoles] = useState([])
  const [selectedRole, setSelectedRole] = useState(null)
  const [educationField, setEducationField] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (!userId) {
      navigate('/')
      return
    }
    apiGet('/roles')
      .then(data => setRoles(data))
      .catch(err => alert('Gagal memuat data: ' + err.message))
      .finally(() => setLoading(false))
  }, [navigate])

  function selectRole(index) {
    setSelectedRole(index)
  }

  const isFormValid = selectedRole !== null && educationField !== ''

  function handleContinue() {
    if (!isFormValid) return
    localStorage.setItem('roleId', String(roles[selectedRole].id))
    navigate('/loading')
  }

  if (loading) {
    return (
      <div className="bg-surface text-on-surface min-h-screen flex items-center justify-center">
        <p className="font-body-lg">Memuat data...</p>
      </div>
    )
  }

  return (
    <div className="bg-surface text-on-surface font-body-md flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-24 pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <div className="max-w-4xl mx-auto">
          <section className="mb-stack-lg space-y-stack-sm">
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Personalisasi Jalur Karier</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Sesuaikan instrumen asesmen dengan target profesional dan latar belakang pendidikan Anda.</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="md:col-span-12">
              <div className="flex items-center gap-stack-sm mb-stack-md">
                <span className="material-symbols-outlined text-primary">target</span>
                <h2 className="font-headline-sm text-headline-sm">Target Pekerjaan</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-stack-md">
                {roles.map((role, index) => (
                  <button
                    key={role.id}
                    onClick={() => selectRole(index)}
                    className={`flex flex-col p-stack-md border rounded-lg transition-all-custom text-left hover:border-primary group ${
                      selectedRole === index
                        ? 'active-selection border-primary'
                        : 'border-outline-variant bg-surface'
                    }`}
                  >
                    <span className="font-label-sm text-label-sm text-primary mb-2">{role.category}</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface">{role.title}</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">{role.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-12 mt-stack-lg">
              <div className="flex items-center gap-stack-sm mb-stack-md">
                <span className="material-symbols-outlined text-primary">school</span>
                <h2 className="font-headline-sm text-headline-sm">Latar Belakang Pendidikan</h2>
              </div>
              <div className="bg-surface border border-outline-variant rounded-lg p-stack-lg grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
                <div className="space-y-stack-md">
                  <label className="font-label-md text-label-md text-on-surface-variant block">Pilih Bidang Studi Utama</label>
                  <div className="relative">
                    <select
                      className="w-full h-12 bg-surface border border-outline rounded px-4 text-on-surface appearance-none focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer"
                      value={educationField}
                      onChange={(e) => setEducationField(e.target.value)}
                    >
                      <option disabled value="">Pilih Program Studi</option>
                      <option value="ti">Teknik Informatika</option>
                      <option value="sd">Sains Data</option>
                      <option value="mb">Manajemen Bisnis</option>
                      <option value="dkv">Desain Komunikasi Visual</option>
                      <option value="tin">Teknik Industri</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
                  </div>
                </div>
                <div className="flex flex-col justify-end">
                  <div className="p-stack-md bg-surface-container-lowest border border-outline-variant rounded-lg flex items-start gap-stack-sm">
                    <span className="material-symbols-outlined text-primary mt-1">info</span>
                    <div>
                      <span className="font-label-sm text-label-sm text-on-surface font-bold">Catatan Sistem</span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Data pendidikan akan digunakan untuk memetakan Skill Gap yang relevan dengan target karier Anda.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-12 mt-stack-lg">
              <div className="bg-inverse-surface text-inverse-on-surface p-stack-lg rounded-xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 overflow-hidden relative">
                <div className="relative z-10">
                  <h3 className="font-headline-sm text-headline-sm mb-2">Kalkulasi Presisi</h3>
                  <p className="font-body-md text-body-md opacity-80 max-w-md">
                    Algoritma kami akan memproses data Anda untuk menyusun roadmap pengembangan kompetensi berbasis standar industri global.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 relative z-10 w-full lg:w-auto">
                  <div className="px-4 py-2 border border-outline rounded-full bg-white/10 backdrop-blur-md font-label-md text-label-md text-center">Expert Mentorship</div>
                  <div className="px-4 py-2 border border-outline rounded-full bg-white/10 backdrop-blur-md font-label-md text-label-md text-center">Skill Assessment</div>
                  <div className="px-4 py-2 border border-outline rounded-full bg-white/10 backdrop-blur-md font-label-md text-label-md text-center">Job Matching</div>
                </div>
                <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-primary opacity-20 rounded-full blur-3xl pointer-events-none"></div>
              </div>
            </div>
          </div>

          <div className="mt-stack-lg flex flex-col items-center gap-stack-md pb-stack-lg">
            <button
              onClick={handleContinue}
              disabled={!isFormValid}
              className={`w-full md:w-80 h-12 bg-primary text-on-primary rounded font-label-md text-label-md font-bold shadow-sm hover:brightness-110 active:opacity-80 transition-all-custom flex items-center justify-center gap-stack-sm ${
                !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Lanjutkan ke Asesmen
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Proses ini memakan waktu sekitar 10-15 menit.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
