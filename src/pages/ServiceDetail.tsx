import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { services } from '../data/services'

const D  = "'Cormorant Garamond', Georgia, serif"
const B  = "'Manrope', system-ui, sans-serif"
const Bp = "Georgia, 'Times New Roman', serif"
const RED = '#670626'

function FaqItem({ q, a, num, open, onToggle }: { q: string; a: string; num: string; open: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(103,6,38,0.12)' }}>
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-5 py-6 text-left"
      >
        <span className="text-[12px] shrink-0 pt-1" style={{ color: 'rgba(26,10,14,0.3)', fontFamily: B }}>{num}</span>
        <span
          className="flex-1 font-black uppercase leading-snug transition-colors"
          style={{ fontFamily: D, fontSize: 'clamp(18px, 2.2vw, 26px)', color: open ? RED : '#1A0A0E' }}
        >
          {q}
        </span>
        <span
          className="shrink-0 flex items-center justify-center w-7 h-7 text-lg transition-transform duration-300"
          style={{ color: RED, transform: open ? 'rotate(45deg)' : 'none' }}
        >
          
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '240px' : '0px' }}
      >
        <p className="pb-6 pl-9 pr-10 text-[14px] leading-relaxed" style={{ color: 'rgba(26,10,14,0.6)', fontFamily: Bp }}>
          {a}
        </p>
      </div>
    </div>
  )
}

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>()
  const svc = services.find(s => s.id === id)
  const [openFaq, setOpenFaq] = useState<number>(0)

  useEffect(() => { window.scrollTo({ top: 0 }); setOpenFaq(0) }, [id])

  if (!svc) return <Navigate to="/services" replace />

  const others = services.filter(s => s.id !== svc.id)

  return (
    <div style={{ backgroundColor: '#FAF8F2', color: '#1A0A0E', fontFamily: Bp }}>

      {/* ── TOP: content + image ── */}
      <section className="px-6 lg:px-12" style={{ paddingTop: '108px' }}>
        <div className="max-w-[1440px] mx-auto pb-20">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase mb-8"
            style={{ color: 'rgba(26,10,14,0.4)', fontFamily: B }}
          >
            ← ALL SERVICES
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* LEFT: copy */}
            <div>
              <p className="text-[11px] tracking-[0.18em] uppercase mb-5" style={{ color: RED, fontFamily: B }}>
                [ {svc.eyebrow} ]
              </p>
              <h1
                className="font-black uppercase leading-[0.95] mb-8"
                style={{ fontFamily: D, fontSize: 'clamp(38px, 5.5vw, 68px)', color: '#1A0A0E' }}
              >
                {svc.pageTitle}
              </h1>

              {svc.paragraphs.map((p, i) => (
                <p key={i} className="text-[15px] leading-relaxed mb-5 max-w-lg" style={{ color: 'rgba(26,10,14,0.6)', fontFamily: Bp }}>
                  {p}
                </p>
              ))}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 my-8">
                {svc.features.map(f => (
                  <div key={f} className="flex gap-3 items-start">
                    <span className="shrink-0 text-xs mt-1" style={{ color: RED }}>◆</span>
                    <span className="text-[13px] leading-relaxed" style={{ color: 'rgba(26,10,14,0.65)', fontFamily: Bp }}>{f}</span>
                  </div>
                ))}
              </div>

              {svc.keywords && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {svc.keywords.map(k => (
                    <span
                      key={k}
                      className="px-3 py-1.5 text-[10px] tracking-widest uppercase border"
                      style={{ borderColor: 'rgba(103,6,38,0.2)', color: RED, fontFamily: B }}
                    >
                      {k}
                    </span>
                  ))}
                </div>
              )}

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

            {/* RIGHT: image */}
            <div className="overflow-hidden" style={{ aspectRatio: '4/3', backgroundColor: '#F2E6EA' }}>
              <img
                src={encodeURI(svc.img)}
                alt={svc.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6 lg:px-12" style={{ backgroundColor: '#F2E6EA', borderTop: '1px solid rgba(103,6,38,0.1)' }}>
        <div className="max-w-225 mx-auto">
          <p className="text-[11px] tracking-[0.22em] uppercase mb-4" style={{ color: RED, fontFamily: B }}>[ FAQ ]</p>
          <h2 className="font-black uppercase leading-none mb-10" style={{ fontFamily: D, fontSize: 'clamp(30px, 4vw, 52px)', color: '#1A0A0E' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ borderTop: '1px solid rgba(103,6,38,0.12)' }}>
            {svc.faqs.map((f, i) => (
              <FaqItem
                key={i}
                num={String(i + 1).padStart(2, '0')}
                q={f.q}
                a={f.a}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>

      

    </div>
  )
}
