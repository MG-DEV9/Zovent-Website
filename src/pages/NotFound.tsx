import { Link } from 'react-router'

const D = "'Cormorant Garamond', Georgia, serif"
const L = "'Manrope', system-ui, sans-serif"
const B = "Georgia, 'Times New Roman', serif"

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ paddingTop: '68px', backgroundColor: '#FAF8F2', fontFamily: B }}
    >
      <p
        className="font-black leading-none mb-4"
        style={{
          fontFamily: D,
          fontSize: 'clamp(120px, 20vw, 240px)',
          color: 'transparent',
          WebkitTextStroke: '2px rgba(103,6,38,0.12)',
        }}
      >
        404
      </p>
      <h1 className="font-black uppercase -mt-20 mb-6" style={{ fontFamily: D, fontSize: 'clamp(40px, 6vw, 80px)', color: '#1A0A0E' }}>
        PAGE NOT FOUND.
      </h1>
      <p className="text-[14px] mb-10 max-w-sm" style={{ color: 'rgba(26,10,14,0.4)' }}>
        This page doesn't exist or may have been moved.
      </p>
      <div className="flex gap-4">
        <Link
          to="/"
          className="px-8 py-3.5 text-[11px] tracking-[0.15em] uppercase font-semibold transition-all"
          style={{ backgroundColor: '#670626', color: '#FAF8F2', fontFamily: L }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#1A0A0E' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#670626' }}
        >
          [ HOME ]
        </Link>
        <Link
          to="/contact"
          className="px-8 py-3.5 text-[11px] tracking-[0.15em] uppercase font-semibold border transition-all"
          style={{ borderColor: 'rgba(103,6,38,0.2)', color: '#670626', fontFamily: L }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#670626'; (e.currentTarget as HTMLElement).style.color = '#1A0A0E' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(103,6,38,0.2)'; (e.currentTarget as HTMLElement).style.color = '#670626' }}
        >
          [ CONTACT ]
        </Link>
      </div>
    </div>
  )
}
