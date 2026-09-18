import { Outlet, useLocation } from 'react-router'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CustomCursor from '../components/CustomCursor'
import Preloader from '../components/Preloader'
import WhatsAppFloat from '../components/WhatsAppFloat'

export default function Root() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(true)
  const [entered, setEntered] = useState(() => sessionStorage.getItem('zovent-entered') === '1')

  const handleEnter = () => {
    sessionStorage.setItem('zovent-entered', '1')
    setEntered(true)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setVisible(false)
    const t = requestAnimationFrame(() => setTimeout(() => setVisible(true), 20))
    return () => cancelAnimationFrame(t)
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
      {!entered && <Preloader onEnter={handleEnter} />}
      <CustomCursor />
      <WhatsAppFloat />
      <Header />
      <main className="flex-1 transition-opacity duration-300" style={{ opacity: visible ? 1 : 0 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
