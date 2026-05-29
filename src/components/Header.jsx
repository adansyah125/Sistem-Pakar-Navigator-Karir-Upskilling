import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react' // Menggunakan lucide-react untuk ikon yang lebih modern

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/diagnosis', label: 'Diagnosis' },
  { path: '/profile-selection', label: 'Profile Selection' },
  { path: '/roadmap', label: 'Roadmap' },
]

export default function Header({ transparent }) {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out border-b ${
        transparent
          ? 'bg-transparent border-transparent py-3'
          : 'bg-surface/80 backdrop-blur-md border-outline-variant/60 shadow-sm py-1'
      }`}
    >
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-14 max-w-container-max mx-auto">
        
        {/* LOGO */}
        <Link 
          to="/" 
          className="text-headline-sm font-headline-sm font-extrabold text-primary no-underline tracking-tight transition-transform duration-200 active:scale-95" 
          onClick={() => setMenuOpen(false)}
        >
          Career<span className="text-on-surface">Navigator</span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-label-md font-medium transition-colors duration-300 no-underline py-2 group ${
                  isActive ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {item.label}
                {/* Efek Garis Bawah Mengalir */}
                <span 
                  className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ease-in-out ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            )
          })}
        </nav>

        {/* TOMBOL CTA (KHAS COMPANY PROFILE) */}
        <div className="flex items-center gap-4">
          

          {/* HAMBURGER BUTTON (MOBILE) */}
          <button
            className="md:hidden flex items-center justify-center text-on-surface cursor-pointer p-2 rounded-xl hover:bg-on-surface/5 transition-colors duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {/* Animasi Ikon Berganti Sesuai State */}
            <div className="relative w-6 h-6 transition-transform duration-300 transform rotate-0">
              {menuOpen ? (
                <X className="w-6 h-6 absolute top-0 left-0 transition-all duration-300 opacity-100 rotate-90" />
              ) : (
                <Menu className="w-6 h-6 absolute top-0 left-0 transition-all duration-300 opacity-100 rotate-0" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN (ANIMASI SLIDE DOWN + FADE IN) */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-surface/95 backdrop-blur-lg border-b border-outline-variant shadow-xl transition-all duration-300 ease-in-out origin-top ${
          menuOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-margin-mobile py-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 text-label-md font-medium no-underline rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'text-primary font-bold bg-primary/10' 
                    : 'text-on-surface-variant hover:bg-on-surface/5 hover:text-on-surface'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
         
        </div>
      </div>
    </header>
  )
}