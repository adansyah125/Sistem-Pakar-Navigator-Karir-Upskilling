import Header from './Header'
import Footer from './Footer'

export default function Layout({ children, className = '' }) {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <Header />
      <main className={`flex-grow pt-16 ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
