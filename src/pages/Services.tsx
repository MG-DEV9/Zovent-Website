import { Link } from 'react-router'
import { services } from '../data/services'

const D = "'Cormorant Garamond', Georgia, serif"
const B = "'Manrope', system-ui, sans-serif"
const Bp = "Georgia, 'Times New Roman', serif"
const RED = '#670626'

export default function Services() {
  return (
    <div style={{ backgroundColor: '#FAF8F2', color: '#1A0A0E', fontFamily: Bp }}>

      {/* ── HERO (solid colour, no image) ── */}
      <section
        className="relative flex flex-col justify-end px-6 lg:px-12"
        style={{ minHeight: '48vh', paddingTop: '68px', backgroundColor: RED }}
      >
        <div className="max-w-[1440px] mx-auto pb-16 w-full">
          <p className="text-[11px] tracking-[0.22em] uppercase mb-5" style={{ color: '#BAD797', fontFamily: B }}>[ SERVICES ]</p>
          <h1 className="font-black uppercase leading-none mb-6" style={{ fontFamily: D, fontSize: 'clamp(56px, 10vw, 128px)', color: '#FAF8F2' }}>
            WHAT WE DO.
          </h1>
          <p className="text-[15px] max-w-lg leading-relaxed" style={{ color: 'rgba(250,248,242,0.55)', fontFamily: Bp }}>
            Six integrated service lines. One dedicated team. Delivering corporate experiences across India and internationally.
          </p>
        </div>
      </section>

      {/* ── ALL SERVICES LIST ── */}
      <section className="px-6 lg:px-12 py-20">
        <div className="max-w-[1440px] mx-auto">
          <p className="text-[11px] tracking-[0.22em] uppercase mb-10" style={{ color: RED, fontFamily: B }}>[ ALL SERVICES ]</p>
          <div style={{ borderTop: '1px solid rgba(103,6,38,0.1)' }}>
            {services.map((s, i) => (
              <Link
                key={s.id}
                to={`/services/${s.id}`}
                className="group flex items-center justify-between py-7"
                style={{ borderBottom: '1px solid rgba(103,6,38,0.1)', backgroundColor: i % 2 === 0 ? '#FAF8F2' : '#bad7979f' }}
              >
                <div className="flex items-center gap-6 px-1">
                  <div className="hidden sm:block flex-shrink-0 overflow-hidden" style={{ width: '96px', height: '72px', backgroundColor: '#F2E6EA' }}>
                    <img
                      src={encodeURI(s.img)}
                      alt=""
                      className="w-full h-full object-cover opacity-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110"
                    />
                  </div>
                  <span className="text-[11px] flex-shrink-0" style={{ color: 'rgba(26,10,14,0.25)', fontFamily: B }}>{s.num} /</span>
                  <span className="font-black uppercase leading-none transition-colors" style={{ fontFamily: D, fontSize: 'clamp(24px, 3.5vw, 48px)', color: '#1A0A0E' }}>
                    {s.title}
                  </span>
                </div>
                <span className="transition-all text-2xl group-hover:translate-x-1 px-1" style={{ color: 'rgba(26,10,14,0.2)' }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
