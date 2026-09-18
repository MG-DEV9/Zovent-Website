import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { services } from '../data/services'

const D  = "'Cormorant Garamond', Georgia, serif"
const B  = "'Manrope', system-ui, sans-serif"
const Bp = "Georgia, 'Times New Roman', serif"
const RED = '#670626'

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>()
  const svc = services.find(s => s.id === id)

  useEffect(() => { window.scrollTo({ top: 0 }) }, [id])

  if (!svc) return <Navigate to="/services" replace />

  const others = services.filter(s => s.id !== svc.id)

  return (
    <div style={{ backgroundColor: '#FAF8F2', color: '#1A0A0E', fontFamily: Bp }}>

      {/* ── HERO ── */}
      <section
        className="relative flex flex-col justify-end px-6 lg:px-12 overflow-hidden"
        style={{ minHeight: '52vh', paddingTop: '68px', backgroundColor: RED }}
      >
        <img
          src={encodeURI(svc.img)}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.35, mixBlendMode: 'luminosity' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #670626 30%, rgba(103,6,38,0.7) 65%, rgba(103,6,38,0.35) 100%)' }} />
        <div className="relative z-10 max-w-[1440px] mx-auto pb-14 w-full">
          <Link
            to="/services"
            className="inline-block text-[10px] tracking-[0.22em] uppercase mb-6"
            style={{ color: '#BAD797', fontFamily: B }}
          >
            ← [ ALL SERVICES ]
          </Link>
          <p className="text-[11px] tracking-[0.22em] uppercase mb-4" style={{ color: '#BAD797', fontFamily: B }}>
            {svc.num} / {svc.title}
          </p>
          <h1 className="font-black uppercase leading-none" style={{ fontFamily: D, fontSize: 'clamp(36px, 6.5vw, 84px)', color: '#FAF8F2' }}>
            {svc.pageTitle}
          </h1>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[900px] mx-auto">
          <p className="text-[11px] tracking-[0.18em] uppercase mb-6" style={{ color: RED, fontFamily: B }}>
            [ {svc.eyebrow} ]
          </p>

          {svc.paragraphs.map((p, i) => (
            <p key={i} className="text-[15px] leading-relaxed mb-5" style={{ color: 'rgba(26,10,14,0.65)', fontFamily: Bp }}>
              {p}
            </p>
          ))}

          {svc.keywords && (
            <div className="flex flex-wrap gap-2 mt-2 mb-10">
              {svc.keywords.map(k => (
                <span
                  key={k}
                  className="px-3 py-1.5 text-[10px] tracking-[0.1em] uppercase border"
                  style={{ borderColor: 'rgba(103,6,38,0.2)', color: RED, fontFamily: B }}
                >
                  {k}
                </span>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 mb-12" style={{ borderTop: '1px solid rgba(103,6,38,0.1)', paddingTop: '2.5rem' }}>
            {svc.features.map(f => (
              <div key={f} className="flex gap-3 items-start">
                <span className="flex-shrink-0 text-xs mt-0.5" style={{ color: RED }}>◆</span>
                <span className="text-[13px]" style={{ color: 'rgba(26,10,14,0.65)', fontFamily: Bp }}>{f}</span>
              </div>
            ))}
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-7 py-3.5 text-[11px] tracking-[0.15em] uppercase font-semibold border transition-all"
            style={{ borderColor: 'rgba(103,6,38,0.25)', color: '#1A0A0E', fontFamily: B }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = RED; (e.currentTarget as HTMLElement).style.borderColor = RED; (e.currentTarget as HTMLElement).style.color = '#FAF8F2' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(103,6,38,0.25)'; (e.currentTarget as HTMLElement).style.color = '#1A0A0E' }}
          >
            [ ENQUIRE ] →
          </Link>
        </div>
      </section>

      {/* ── OTHER SERVICES ── */}
      <section className="px-6 lg:px-12 pb-20" style={{ borderTop: '1px solid rgba(103,6,38,0.1)' }}>
        <div className="max-w-[1440px] mx-auto pt-16">
          <p className="text-[11px] tracking-[0.22em] uppercase mb-10" style={{ color: RED, fontFamily: B }}>[ EXPLORE OTHER SERVICES ]</p>
          <div style={{ borderTop: '1px solid rgba(103,6,38,0.1)' }}>
            {others.map((s, i) => (
              <Link
                key={s.id}
                to={`/services/${s.id}`}
                className="group flex items-center justify-between py-7"
                style={{ borderBottom: '1px solid rgba(103,6,38,0.1)', backgroundColor: i % 2 === 0 ? '#FAF8F2' : '#bad7979f' }}
              >
                <div className="flex items-center gap-6 px-1">
                  <div className="hidden sm:block flex-shrink-0 overflow-hidden" style={{ width: '84px', height: '64px', backgroundColor: '#F2E6EA' }}>
                    <img
                      src={encodeURI(s.img)}
                      alt=""
                      className="w-full h-full object-cover opacity-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110"
                    />
                  </div>
                  <span className="text-[11px] flex-shrink-0" style={{ color: 'rgba(26,10,14,0.25)', fontFamily: B }}>{s.num} /</span>
                  <span className="font-black uppercase leading-none" style={{ fontFamily: D, fontSize: 'clamp(22px, 3.2vw, 42px)', color: '#1A0A0E' }}>
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
