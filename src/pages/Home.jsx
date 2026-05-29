import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  const [activeState, setActiveState] = useState('landing')

  function showState(stateName) {
    setActiveState(stateName)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <Header />

      <main className="mt-16 min-h-[calc(100vh-140px)] px-margin-mobile md:px-margin-desktop py-stack-lg max-w-container-max mx-auto w-full">
        {/* LANDING SECTION */}
        <section className={activeState === 'landing' ? 'space-y-stack-lg' : 'hidden'}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center min-h-[614px]">
            <div className="space-y-stack-md">
              <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight leading-tight">Navigasi Karier Masa Depan Anda.</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant text-justify">Gunakan sistem pakar kami untuk memetakan potensi profesional Anda dengan presisi matematis. Kami menganalisis ribuan titik data industri untuk memberikan jalur karier yang paling sesuai dengan profil psikometrik dan teknis Anda.</p>
              <div className="grid grid-cols-3 gap-stack-md pt-stack-md">
                <div className="text-center p-stack-md bg-surface-container-low rounded-lg border border-outline-variant">
                  <div className="font-headline-md text-headline-md text-primary">15+</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant">Industries Mapped</div>
                </div>
                <div className="text-center p-stack-md bg-surface-container-low rounded-lg border border-outline-variant">
                  <div className="font-headline-md text-headline-md text-primary">500+</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant">Skills Diagnosed</div>
                </div>
                <div className="text-center p-stack-md bg-surface-container-low rounded-lg border border-outline-variant">
                  <div className="font-headline-md text-headline-md text-primary">92%</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant">Success Rate</div>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-stack-lg border border-outline-variant shadow-sm rounded-lg mt-stack-lg lg:mt-0">
              <h2 className="font-headline-sm text-headline-sm text-on-surface mb-stack-md">Onboarding Profil</h2>
              <form className="space-y-stack-md" onSubmit={(e) => { e.preventDefault(); showState('assessment'); }}>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-2">Nama Lengkap</label>
                  <input className="w-full bg-surface border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-2 font-mono text-body-md" placeholder="e.g., Senior Systems Architect" required type="text" />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-2">Pendidikan Terakhir</label>
                  <select className="w-full bg-surface border border-outline-variant focus:border-primary rounded-lg px-4 py-2 text-body-md">
                    <option>Sarjana (S1)</option>
                    <option>Magister (S2)</option>
                    <option>Diploma</option>
                    <option>SMK</option>
                    <option>Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-2">Jurusan</label>
                  <input className="w-full bg-surface border border-outline-variant focus:border-primary rounded-lg px-4 py-2 font-mono text-body-md" placeholder="e.g., Computer Science" required type="text" />
                </div>
                <a className="w-full bg-primary text-on-primary font-label-md py-3 rounded hover:bg-opacity-90 transition-all flex justify-center items-center gap-2" href="/profile-selection">
                  Mulai Karier <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </form>
            </div>
          </div>
          <div className="w-full h-48 md:h-64 rounded-xl overflow-hidden relative">
            <img
              alt="Corporate Office"
              className="w-full h-full object-cover grayscale opacity-20"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAotSIzAbk2_C47geNYaK1cBNbp0tETfOGU7UceGOUgIahyrPsj_6_EH3ZLD5OxDJ2IuvRquPr07Bzc8NgbmCYy8zApA9--u393AitdsCC6XMO71bI4biaVCDfcRTiAs1Ex_hHTPpc90B6NnhLusZszPuPG7EfFDb57AE5UDkHlpYxwLLhrDxRxUXLjMXU0bJRXZ8J8cvRuB4K2kadD_wv2ZaiU0b3ePbJRoRGn8kPVt6zZ9Zwtcau936h0f9ti_tLDazjI6cAnoLs"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
          </div>
        </section>      
      </main>

        <Footer />
      
    </div>
  )
}
