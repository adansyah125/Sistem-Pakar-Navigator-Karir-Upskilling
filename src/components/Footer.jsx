import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant/60 bg-surface pt-16 pb-8 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        
        {/* TOP SECTION: GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col items-start gap-3">
            <div className="text-headline-sm font-extrabold text-primary tracking-tight">
              Career<span className="text-on-surface">Navigator</span>
            </div>
            <p className="text-body-sm font-medium text-on-surface-variant max-w-sm leading-relaxed">
              Sistem pakar pemetaan profesional untuk membantu Anda menemukan, merencanakan, dan menavigasi jalur karier masa depan dengan akurat.
            </p>
          </div>

          {/* Links Columns (Right Side) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 md:justify-items-end">
            
            {/* Column 1: Fitur */}
            <div className="flex flex-col gap-3.5">
              <span className="text-label-md font-bold text-on-surface tracking-wider uppercase opacity-80">Eksplorasi</span>
              <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                <li><Link to="/diagnosis" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors duration-200 no-underline">Diagnosis Karier</Link></li>
                <li><Link to="/roadmap" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors duration-200 no-underline">Peta Jalan (Roadmap)</Link></li>
                <li><a href="#" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors duration-200 no-underline">Metodologi</a></li>
              </ul>
            </div>

            {/* Column 2: Resources */}
            <div className="flex flex-col gap-3.5">
              <span className="text-label-md font-bold text-on-surface tracking-wider uppercase opacity-80">Sumber Daya</span>
              <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                <li><a href="#" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors duration-200 no-underline">Dokumentasi</a></li>
                <li><a href="#" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors duration-200 no-underline">Pusat Bantuan</a></li>
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div className="flex flex-col gap-3.5 col-span-2 sm:col-span-1">
              <span className="text-label-md font-bold text-on-surface tracking-wider uppercase opacity-80">Kebijakan</span>
              <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                <li><a href="#" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors duration-200 no-underline">Kebijakan Privasi</a></li>
                <li><a href="#" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors duration-200 no-underline">Syarat & Ketentuan</a></li>
              </ul>
            </div>

          </div>
        </div>

        {/* BOTTOM SECTION: COPYRIGHT */}
        <div className="border-t border-outline-variant/40 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="m-auto text-sm font-normal text-on-surface-variant/80 text-center sm:text-center">
            &copy; {new Date().getFullYear()} Career Navigator. Professional Mapping Expert System.
          </p>
          
        </div>

      </div>
    </footer>
  )
}