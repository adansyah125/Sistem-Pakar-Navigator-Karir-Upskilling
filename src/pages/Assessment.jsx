import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { apiGet, apiPost } from '../api'

export default function Assessment() {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([])
  const [skills, setSkills] = useState([])
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (!userId) {
      navigate('/')
      return
    }
    Promise.all([
      apiGet(`/questions?date=${new Date().toISOString().split('T')[0]}`),
      apiGet('/questions/skills'),
    ])
      .then(([qData, sData]) => {
        setQuestions(qData)
        setSkills(sData.map(s => ({ ...s, selected: false })))
      })
      .catch(err => alert('Gagal memuat asesmen: ' + err.message))
      .finally(() => setLoading(false))
  }, [navigate])

  function handleAnswer(questionId, optionIndex) {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }))
  }

  function toggleSkill(index) {
    setSkills(prev => prev.map((s, i) => i === index ? { ...s, selected: !s.selected } : s))
  }

  async function handleSubmit() {
    const userId = localStorage.getItem('userId')
    if (!userId) return

    const answeredCount = Object.keys(answers).length
    if (answeredCount < questions.length) {
      alert(`Silakan jawab semua pertanyaan (${answeredCount}/${questions.length} terjawab)`)
      return
    }

    setSubmitting(true)
    try {
      const answerList = questions.map(q => ({
        question_id: q.id,
        selected_option_id: q.options[answers[q.id]]?.id,
      }))

      const selectedSkills = skills.map(s => ({
        skill_id: s.id,
        is_selected: s.selected,
      }))

      const result = await apiPost('/assessment/submit', {
        user_id: parseInt(userId),
        answers: answerList,
        selected_skills: selectedSkills,
      })

      localStorage.setItem('diagnosisData', JSON.stringify(result))
      navigate('/diagnosis')
    } catch (err) {
      alert('Gagal mengirim asesmen: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-surface text-on-surface min-h-screen flex items-center justify-center">
        <p className="font-body-lg">Memuat asesmen...</p>
      </div>
    )
  }

  const totalQuestions = questions.length
  const answeredCount = Object.keys(answers).length
  const progressPercent = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0
  const selectedSkillsCount = skills.filter(s => s.selected).length

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
                  <p className="font-body-md text-body-md text-[#0f172a] mb-stack-md text-justify">{q.question_text}</p>
                  <div className="grid grid-cols-1 gap-stack-sm">
                    {q.options.map((opt, optIdx) => (
                      <label key={opt.id || optIdx} className="flex items-start p-stack-sm border border-slate-200 rounded-lg cursor-pointer hover:border-primary transition-colors group">
                        <input
                          type="radio"
                          name={`q_${q.id}`}
                          className="w-4 h-4 text-primary border-slate-300 focus:ring-primary mt-1 flex-shrink-0"
                          checked={answers[q.id] === optIdx}
                          onChange={() => handleAnswer(q.id, optIdx)}
                        />
                        <span className="ml-stack-md font-body-sm text-body-sm text-on-surface-variant group-hover:text-[#0f172a] text-justify">{opt.option_text}</span>
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
                      key={skill.id}
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
                <div className="grid grid-cols-2 gap-stack-md">
                  <div className="text-center p-stack-sm bg-slate-50 rounded-lg">
                    <div className="text-headline-sm font-headline-sm text-primary">{String(answeredCount).padStart(2, '0')}</div>
                    <div className="text-label-sm font-label-sm text-on-surface-variant">Respon</div>
                  </div>
                  <div className="text-center p-stack-sm bg-slate-50 rounded-lg">
                    <div className="text-headline-sm font-headline-sm text-primary">{String(selectedSkillsCount).padStart(2, '0')}</div>
                    <div className="text-label-sm font-label-sm text-on-surface-variant">Keahlian</div>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-[#4f46e5] text-white py-4 rounded-lg font-headline-sm text-headline-sm hover:bg-[#4338ca] shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? 'Memproses...' : 'Simpan & Lanjutkan'}
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <p className="text-center font-label-sm text-label-sm text-on-surface-variant">Langkah Berikutnya: Analisis Kesenjangan Karier</p>
          </aside>
        </div>
      </main>
    </div>
  )
}
