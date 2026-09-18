import { Link } from 'react-router'

const D = "'Cormorant Garamond', Georgia, serif"
const L = "'Manrope', system-ui, sans-serif"

const navLinks = [
  { l: 'Home', h: '/' },
  { l: 'About', h: '/about' },
  { l: 'Services', h: '/services' },
  { l: 'Gallery', h: '/gallery' },
  { l: 'Blog', h: '/blog' },
  { l: 'Contact', h: '/contact' },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#24080fff', borderTop: '1px solid rgba(250,248,242,0.08)', fontFamily: L }}>

      {/* ── Top — massive wordmark + email CTA ── */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-20 pb-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
          {/* Left: brand + location */}
          <div>
            <Link to="/">
              <img
                src="/assets/logozv.png"
                alt="Zovent"
                style={{ height: 'clamp(56px, 8vw, 100px)', width: 'auto', objectFit: 'contain' }}
              />
            </Link>

          </div>

          {/* Right: email display link */}
          <div className="flex flex-col items-start lg:items-end gap-3">
            <p className="text-[9px] tracking-[0.24em] uppercase" style={{ color: '#BAD797', fontFamily: L }}>[ GET IN TOUCH ]</p>
            <a
              href="mailto:info@zovents.com"
              className="font-black uppercase leading-none transition-colors"
              style={{ fontFamily: D, fontSize: 'clamp(24px, 3.5vw, 48px)', color: '#FAF8F2', letterSpacing: '-0.01em' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#BAD797' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#FAF8F2' }}
            >
              info@zovents.com
            </a>
            <a
              href="tel:+918800753816"
              className="font-black uppercase leading-none transition-colors"
              style={{ fontFamily: 'times new roman', fontSize: 'clamp(24px, 3.5vw, 48px)', color: 'rgba(250,248,242,0.35)', letterSpacing: '-0.01em' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#BAD797' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(250, 248, 242, 0.97)' }}
            >
              +91-8800753816
            </a>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="h-px" style={{ backgroundColor: 'rgba(250,248,242,0.08)' }} />
      </div>

      {/* ── Mid — links grid ── */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 grid grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Nav */}
        <div>
          <p className="text-[9px] tracking-[0.22em] uppercase mb-5" style={{ color: '#BAD797' }}>[ NAVIGATE ]</p>
          <ul className="space-y-2.5">
            {navLinks.map(({ l, h }) => (
              <li key={h}>
                <Link
                  to={h}
                  className="text-[12px] tracking-wide transition-colors"
                  style={{ color: 'rgba(250,248,242,0.45)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#FAF8F2' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,248,242,0.45)' }}
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <p className="text-[9px] tracking-[0.22em] uppercase mb-5" style={{ color: '#BAD797' }}>[ SERVICES ]</p>
          <ul className="space-y-2.5">
            {['Corporate Conferences', 'MICE Events', 'Offsites & Team Building', 'Brand Activations', 'Award Ceremonies', 'Corporate Travel'].map(s => (
              <li key={s}>
                <Link
                  to="/services"
                  className="text-[12px] tracking-wide transition-colors"
                  style={{ color: 'rgba(250,248,242,0.45)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#FAF8F2' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,248,242,0.45)' }}
                >
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Offices */}
        <div>
          <p className="text-[9px] tracking-[0.22em] uppercase mb-5" style={{ color: '#BAD797' }}>[ OFFICES ]</p>
          <ul className="space-y-4 text-[12px]" style={{ color: 'rgba(250,248,242,0.45)' }}>
            {[
              ['GURUGRAM', 'Level 12, One BKC Tower'],
              ['KOLKATA', 'Suite 801, DLF Cyber City'],
              ['PUNE', '4th Floor, Prestige Tech Park'],
              // ['GURUGRAM', 'Level 12, One BKC Tower'],
              // ['KOLKATA', 'Suite 801, DLF Cyber City'],
              // ['PUNE', '4th Floor, Prestige Tech Park'],  
              //                       ].map(([city, addr]) => (           
            ].map(([city]) => (
              <li key={city}>
                <p className="text-[9px] tracking-[0.16em] uppercase mb-0.5" style={{ color: 'rgba(250, 248, 242, 0.5)' }}>{city}</p>
                {/* <p>{addr}</p> */}
              </li>
            ))}
          </ul>
        </div>

        {/* Social + CTA */}
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-[9px] tracking-[0.22em] uppercase mb-5" style={{ color: '#BAD797' }}>[ FOLLOW ]</p>
            <div className="flex gap-3">
              {[['Ig', 'Instagram'], ['In', 'LinkedIn'], ['Tw', 'Twitter']].map(([code, label]) => (
                <a
                  key={code}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center text-[10px] font-bold border transition-all"
                  style={{ borderColor: 'rgba(250,248,242,0.15)', color: 'rgba(250,248,242,0.4)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#BAD797'; (e.currentTarget as HTMLElement).style.color = '#BAD797' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(250,248,242,0.15)'; (e.currentTarget as HTMLElement).style.color = 'rgba(250,248,242,0.4)' }}
                >
                  {code}
                </a>
              ))}
            </div>
          </div>

          <Link
            to="/contact"
            className="inline-flex self-start items-center gap-2 px-5 py-3 text-[10px] tracking-[0.18em] font-semibold uppercase border transition-all"
            style={{ borderColor: 'rgba(250,248,242,0.2)', color: 'rgba(250,248,242,0.65)', fontFamily: L }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#BAD797'; (e.currentTarget as HTMLElement).style.color = '#BAD797' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(250,248,242,0.2)'; (e.currentTarget as HTMLElement).style.color = 'rgba(250,248,242,0.65)' }}
          >
            [ REQUEST A PROPOSAL ] →
          </Link>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="max-w-[1440px] mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ borderTop: '1px solid rgba(250,248,242,0.08)' }}
      >
        <p className="text-[10px] tracking-wide" style={{ color: 'rgba(250,248,242,0.2)', fontFamily: L }}>
          © {new Date().getFullYear()} ZOVENT Pvt. Ltd. All rights reserved.
        </p>
        <div className="flex gap-5 text-[10px] tracking-wide" style={{ color: 'rgba(250,248,242,0.2)' }}>
          <Link
            to="/privacy"
            className="transition-colors"
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,248,242,0.5)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,248,242,0.2)' }}
          >Privacy Policy</Link>
          <span style={{ color: 'rgba(250,248,242,0.1)' }}>|</span>
          <Link
            to="/terms"
            className="transition-colors"
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,248,242,0.5)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,248,242,0.2)' }}
          >Terms of Use</Link>
          <span style={{ color: 'rgba(250,248,242,0.1)' }}>|</span>
          <Link
            to="/refunds"
            className="transition-colors"
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,248,242,0.5)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,248,242,0.2)' }}
          >Refunds & Cancellations</Link>
        </div>
      </div>
    </footer>
  )
}
