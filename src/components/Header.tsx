import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'

const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT', href: '/about' },
  { label: 'SERVICES', href: '/services' },
  { label: 'BLOG', href: '/blog' },
  { label: 'GALLERY', href: '/gallery' },
  { label: 'CONTACT', href: '/contact' },
  { label: 'PAYMENT', href: '/payment' },
]

const serviceLinks = [
  { label: 'Corporate Conferences', id: 'conferences' },
  { label: 'MICE Events', id: 'mice' },
  { label: 'Offsites & Team Building', id: 'offsites' },
  { label: 'Brand Activations', id: 'activations' },
  { label: 'Award Ceremonies', id: 'awards' },
  { label: 'Corporate Travel', id: 'travel' },
]

function isActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/'
  return pathname.startsWith(href)
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [soundOn, setSoundOn] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname, location.hash])

  const D = "'Cormorant Garamond', Georgia, serif"
  const L = "'Manrope', system-ui, sans-serif"

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled || menuOpen ? 'rgba(250,248,242,0.97)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(103,6,38,0.1)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div
          className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between"
          style={{ height: '68px' }}
        >
          {/* Logo */}
          <Link to="/" className="z-10 flex items-center">
            <img
              src="/assets/logozv.png"
              alt="Zovent"
              style={{ height: '44px', width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          {/* Desktop links — center */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                className="text-[11px] tracking-[0.18em] font-medium uppercase transition-colors"
                style={{
                  fontFamily: L,
                  color: isActive(href, location.pathname) ? '#670626' : 'rgba(247, 243, 246, 1)',
                }}
              // onMouseEnter={e => { if (!isActive(href, location.pathname)) (e.currentTarget as HTMLElement).style.color = '#1A0A0E' }}
              // onMouseLeave={e => { if (!isActive(href, location.pathname)) (e.currentTarget as HTMLElement).style.color = 'rgba(26,10,22,0.55)' }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-5 z-10">
            {/* <button
              onClick={() => setSoundOn(v => !v)}
              className="hidden lg:block text-[9px] tracking-[0.22em] uppercase transition-colors"
              style={{ fontFamily: L, color: soundOn ? '#670626' : 'rgba(26,10,22,0.3)', background: 'none', border: 'none', cursor: 'none' }}
            >
              [ SOUND: {soundOn ? 'ON' : 'OFF'} ]
            </button> */}
            <Link
              to="/contact"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2 text-[11px] tracking-[0.15em] font-semibold uppercase border transition-all"
              style={{ borderColor: 'rgba(103,6,38,0.3)', color: '#1A0A0E', fontFamily: L }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#670626'; (e.currentTarget as HTMLElement).style.color = '#670626' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(103,6,38,0.3)'; (e.currentTarget as HTMLElement).style.color = '#1A0A0E' }}
            >
              [ START A PROJECT ]
            </Link>

            <button
              className="lg:hidden flex flex-col gap-[5px] p-1.5"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Menu"
            >
              <span
                className="block w-5 h-px transition-all origin-center"
                style={{ backgroundColor: '#1A0A0E', transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none' }}
              />
              <span
                className="block w-5 h-px transition-all"
                style={{ backgroundColor: '#1A0A0E', opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block w-5 h-px transition-all origin-center"
                style={{ backgroundColor: '#1A0A0E', transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div
        className="fixed inset-0 z-40 flex flex-col justify-between px-6 py-8 transition-all duration-500 lg:hidden"
        style={{
          backgroundColor: '#FAF8F2',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          paddingTop: '88px',
        }}
      >
        <nav className="flex flex-col gap-1">
          {navLinks.map(({ label, href }, i) => (
            <Link
              key={href}
              to={href}
              className="block py-4 text-5xl font-black uppercase tracking-wider transition-colors"
              style={{
                fontFamily: D,
                color: isActive(href, location.pathname) ? '#670626' : '#1A0A0E',
                borderBottom: '1px solid rgba(103,6,38,0.1)',
                transitionDelay: menuOpen ? `${i * 40}ms` : '0ms',
              }}
            >
              [ {label} ]
            </Link>
          ))}
        </nav>

        {/* Mobile service sub-links */}
        <div className="flex flex-wrap gap-3 mt-6">
          {serviceLinks.map(s => (
            <Link
              key={s.id}
              to={`/services#${s.id}`}
              className="text-[10px] tracking-[0.15em] uppercase py-1 px-3 border"
              style={{ borderColor: 'rgba(103,6,38,0.15)', color: 'rgba(26,10,22,0.45)', fontFamily: L }}
            >
              {s.label}
            </Link>
          ))}
        </div>

        <div className="mt-6">
          <Link
            to="/contact"
            className="block text-center py-4 text-sm font-semibold tracking-[0.15em] uppercase"
            style={{ backgroundColor: '#670626', color: '#FAF8F2', fontFamily: L }}
          >
            [ START A PROJECT ]
          </Link>
        </div>
      </div>
    </>
  )
}
