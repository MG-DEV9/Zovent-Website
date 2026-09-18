import { type ReactNode } from 'react'
import { Link } from 'react-router'
import { useReveal } from '../hooks/useReveal'

const D = "'Cormorant Garamond', Georgia, serif"
const B = "'Manrope', system-ui, sans-serif"
const BODY = "Georgia, 'Times New Roman', serif"

const HERO = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1800&h=900&fit=crop&auto=format'
const HERO_BG = 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1800&h=900&fit=crop&auto=format'
const IMG_A = 'https://images.unsplash.com/photo-1770770155448-8461474b4e7a?w=900&h=700&fit=crop&auto=format'
const IMG_B = 'https://images.unsplash.com/photo-1785336872226-06bf32ebd7fd?w=700&h=500&fit=crop&auto=format'
const IMG_C = 'https://images.unsplash.com/photo-1777265163251-68d680068d0c?w=700&h=500&fit=crop&auto=format'

const cities = [
  'Gurugram', 'Delhi', 'Noida', 'Mumbai', 'Bengaluru',
  'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Goa', 'Jaipur', 'Kochi', 'Odisha',
]

const values = [
  {
    num: '01', title: 'PRECISION',
    body: 'Every detail, every timeline, every contingency — planned before it becomes a problem.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="15" stroke="#670626" strokeWidth="1.2" />
        <circle cx="18" cy="18" r="2.5" fill="#670626" />
        <line x1="18" y1="3" x2="18" y2="9" stroke="#670626" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="18" y1="27" x2="18" y2="33" stroke="#670626" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="3" y1="18" x2="9" y2="18" stroke="#670626" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="27" y1="18" x2="33" y2="18" stroke="#670626" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '02', title: 'CREATIVITY',
    body: 'We think beyond the obvious to design experiences that feel fresh, relevant, and memorable.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 4 L22 14 L33 14 L24 21 L27 32 L18 25 L9 32 L12 21 L3 14 L14 14 Z" stroke="#670626" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    num: '03', title: 'INTEGRITY',
    body: 'Transparent communication, honest budgets, and delivery on every promise we make.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 4 L30 9 L30 20 C30 26.5 24.5 31.5 18 33 C11.5 31.5 6 26.5 6 20 L6 9 Z" stroke="#670626" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
        <polyline points="12,18 16,22 24,14" stroke="#670626" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: '04', title: 'IMPACT',
    body: 'We measure success by the impression we leave — on brands, on teams, on audiences.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polyline points="4,28 12,18 18,22 26,10 32,14" stroke="#670626" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="14" r="2" fill="#670626" />
      </svg>
    ),
  },
]

const process = [
  { n: '01', label: 'BRIEF & STRATEGY', detail: 'We start by listening deeply before designing anything.' },
  { n: '02', label: 'CONCEPT & CURATION', detail: 'Venues, themes, experiences — tailored to your brand and goals.' },
  { n: '03', label: 'PRE-PRODUCTION', detail: 'Logistics, partners, timelines — locked in before the event begins.' },
  { n: '04', label: 'ON-GROUND EXECUTION', detail: 'Our team manages every moving part so you can focus on your people.' },
  { n: '05', label: 'POST-EVENT INSIGHT', detail: 'We measure, report, and refine — ready for the next one.' },
]

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useReveal(0.1) as React.RefObject<HTMLDivElement>
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

export default function About() {
  return (
    <div style={{ backgroundColor: '#FAF8F2', color: '#1A0A0E', fontFamily: B }}>

      {/* ── HERO — short, cherry, bottom-aligned ───────────────────── */}
      <section
        className="relative flex flex-col justify-end px-10 lg:px-20 overflow-hidden"
        style={{ minHeight: '55vh', paddingTop: '68px', backgroundColor: '#670626', borderBottom: '1px solid rgba(103,6,38,0.1)' }}
      >
        <img
          src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=1800&h=900&fit=crop&auto=format"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.18, mixBlendMode: 'luminosity' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #670626 30%, rgba(103,6,38,0.7) 65%, rgba(103,6,38,0.3) 100%)' }} />
        <div className="relative z-10 max-w-[1440px] mx-auto pb-16 w-full">
          <p
            className="text-[11px] tracking-[0.22em] uppercase mb-5"
            style={{ color: 'rgba(186,215,151,0.75)', fontFamily: B }}
          >
            [ ABOUT ZOVENT ]
          </p>
          <h1
            className="font-black uppercase leading-none"
            style={{ fontFamily: D, fontSize: 'clamp(48px, 9vw, 120px)', color: '#FAF8F2', letterSpacing: '-0.02em' }}
          >
            SMART THINKING.<br />
            SEAMLESS EXECUTION.<br />
            <div style={{ color: 'rgba(186,215,151,0.75)' }}>
              MEMORABLE EXPERIENCES.
            </div>
          </h1>
        </div>
      </section>

      {/* ── MANIFESTO TICKER ─────────────────────────────────────────────── */}
      <div
        className="overflow-hidden py-5"
        style={{ backgroundColor: '#BAD797', borderTop: '1px solid rgba(250,248,242,0.1)' }}
      >
        <div className="marquee-track flex gap-12 w-max whitespace-nowrap">
          {[...Array(3)].flatMap(() =>
            ['SMART THINKING', 'SEAMLESS EXECUTION', 'MEMORABLE EXPERIENCES', 'REAL IMPACT'].map((t, i) => (
              <span key={`${t}-${i}`} className="flex items-center gap-12 flex-shrink-0">
                <span className="text-[15px] tracking-[0.22em] uppercase font-medium" style={{ color: '#670626', fontFamily: B }}>{t}</span>
                <span style={{ color: '#670626', fontSize: '10px' }}>◆</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── STORY — asymmetric numbered layout ───────────────────────────── */}
      <section className="py-0" style={{ borderBottom: '1px solid rgba(103,6,38,0.1)' }}>
        <div className="grid lg:grid-cols-2" style={{ minHeight: '680px' }}>
          <div className="relative overflow-hidden" style={{ minHeight: '480px', backgroundColor: '#F2E6EA' }}>
            <img src={IMG_A} alt="Zovent story" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.7 }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 55%, #FAF8F2 100%)' }} />
            <span
              className="absolute font-black leading-none select-none pointer-events-none"
              style={{ fontFamily: D, fontSize: 'clamp(120px, 18vw, 220px)', color: 'rgba(250,248,242,0.12)', bottom: '-0.05em', left: '-0.02em', lineHeight: 1 }}
            >

            </span>
          </div>
          <div className="flex flex-col justify-center px-10 lg:px-20 py-24" style={{ backgroundColor: '#FAF8F2' }}>
            <Reveal>
              <p className="text-[10px] tracking-[0.28em] uppercase mb-10" style={{ color: '#670626', fontFamily: B }}>
                [ OUR STORY ]
              </p>
              <h2
                className="font-black uppercase leading-none mb-12"
                style={{ fontFamily: D, fontSize: 'clamp(38px, 5vw, 68px)', letterSpacing: '-0.02em', color: '#3c111cff' }}
              >
                ANYONE CAN<br />ORGANISE AN<br />EVENT.
                <span style={{ color: '#BAD797', display: 'block' }}>
                  WE CREATE THE<br />ONE THEY KEEP<br />TALKING ABOUT.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <div className="space-y-5 text-[18px] leading-relaxed" style={{ color: 'rgba(74, 11, 27, 0.92)', fontFamily: BODY, maxWidth: '480px' }}>
                <p>At ZOVENT, we turn briefs into experiences people remember. From high-impact corporate events to carefully curated MICE programmes, we believe every detail has a role to play.</p>
                <p>The venue matters. The welcome matters. The last goodbye matters too — because when everything comes together, an event becomes more than an event. It becomes a feeling.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY — dark full-width quote ───────────────────────────── */}
      <section
        className="relative overflow-hidden py-40 px-10 lg:px-20"
        style={{ backgroundColor: '#1A0A0E' }}
      >
        <span
          className="absolute font-black uppercase leading-none select-none pointer-events-none"
          aria-hidden
          style={{ fontFamily: D, fontSize: 'clamp(100px, 22vw, 320px)', color: 'rgba(250,248,242,0.03)', letterSpacing: '-0.04em', right: '-0.03em', bottom: '-0.1em', lineHeight: 0.85 }}
        >
          IDEAS
        </span>
        <div className="max-w-[1440px] mx-auto">
          <Reveal>
            <p className="text-[10px] tracking-[0.28em] uppercase mb-14" style={{ color: '#BAD797', fontFamily: B }}>[ OUR MISSION ]</p>
          </Reveal>
          <Reveal delay={60}>
            <blockquote
              className="font-black italic leading-[0.88]"
              style={{ fontFamily: D, fontSize: 'clamp(40px, 7vw, 100px)', letterSpacing: '-0.02em', color: '#FAF8F2', maxWidth: '1200px' }}
            >
              "To turn big ideas into{' '}
              <span style={{ color: '#BAD797' }}>experiences that move people,</span>{' '}
              elevate brands, and deliver real impact."
            </blockquote>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-20 flex items-center gap-6">
              <div className="w-12 h-px" style={{ backgroundColor: '#670626' }} />
              <p className="text-[10px] tracking-[0.22em] uppercase" style={{ color: 'rgba(250,248,242,0.25)', fontFamily: B }}>Zovent</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── VALUES — horizontal cards ─────────────────────────────────────── */}
      <section className="py-28 px-10 lg:px-20" style={{ backgroundColor: '#FAF8F2', borderTop: '1px solid rgba(103,6,38,0.08)' }}>
        <div className="max-w-[1440px] mx-auto">
          <Reveal>
            <div className="flex items-end justify-between mb-20" style={{ borderBottom: '1px solid rgba(103,6,38,0.1)', paddingBottom: '32px' }}>
              <p className="text-[10px] tracking-[0.28em] uppercase" style={{ color: '#670626', fontFamily: B }}>[ WHAT DRIVES US ]</p>
              <h2 className="font-black uppercase leading-none" style={{ fontFamily: D, fontSize: 'clamp(36px, 5vw, 72px)', letterSpacing: '-0.02em', color: '#1A0A0E' }}>OUR VALUES.</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0" style={{ borderLeft: '1px solid rgba(103,6,38,0.1)' }}>
            {values.map(({ num, title, body, icon }, i) => (
              <Reveal key={num} delay={i * 70}>
                <div
                  className="group relative p-10 flex flex-col overflow-hidden transition-colors duration-300"
                  style={{ borderRight: '1px solid rgba(103,6,38,0.1)', borderBottom: '1px solid rgba(103,6,38,0.1)', minHeight: '340px' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#F2E6EA' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
                >
                  {/* Decorative corner arc */}
                  <svg
                    className="absolute top-0 right-0 opacity-[0.04] transition-opacity duration-300 group-hover:opacity-[0.08]"
                    width="120" height="120" viewBox="0 0 120 120" fill="none"
                    aria-hidden
                  >
                    <circle cx="120" cy="0" r="90" stroke="#670626" strokeWidth="1" />
                    <circle cx="120" cy="0" r="60" stroke="#670626" strokeWidth="1" />
                  </svg>

                  {/* Icon */}
                  <div
                    className="w-14 h-14 flex items-center justify-center mb-auto transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: 'rgba(103,6,38,0.06)', borderRadius: '2px' }}
                  >
                    {icon}
                  </div>

                  <div className="mt-12">
                    <div className="w-6 h-px mb-6" style={{ backgroundColor: '#670626' }} />
                    <h3 className="font-black uppercase mb-4" style={{ fontFamily: D, fontSize: 'clamp(22px, 2.5vw, 34px)', color: '#1A0A0E' }}>{title}</h3>
                    <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(26,10,14,0.45)', fontFamily: BODY }}>{body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK — vertical timeline ──────────────────────────────── */}
      <section className="py-28 px-10 lg:px-20" style={{ backgroundColor: '#EFF5E2', borderTop: '1px solid rgba(103,6,38,0.1)' }}>
        <div className="max-w-[900px] mx-auto">
          <Reveal>
            <p className="text-[10px] tracking-[0.28em] uppercase mb-4" style={{ color: '#670626', fontFamily: B }}>[ HOW WE WORK ]</p>
            <h2 className="font-black uppercase leading-none mb-20" style={{ fontFamily: D, fontSize: 'clamp(40px, 6vw, 80px)', letterSpacing: '-0.02em', color: '#1A0A0E' }}>
              PROCESS<br />THAT<br />DELIVERS.
            </h2>
          </Reveal>
          <div className="relative">
            <div className="absolute left-5 top-2 bottom-2 w-px" style={{ backgroundColor: 'rgba(103,6,38,0.15)' }} />
            <div className="space-y-0">
              {process.map(({ n, label, detail }, i) => (
                <Reveal key={n} delay={i * 70}>
                  <div className="flex gap-10 py-10" style={{ borderBottom: i < process.length - 1 ? '1px solid rgba(103,6,38,0.1)' : undefined }}>
                    <div className="flex-shrink-0 relative z-10">
                      <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: '#670626' }}>
                        <span className="text-[9px] font-black tracking-wider" style={{ color: '#FAF8F2', fontFamily: B }}>{n}</span>
                      </div>
                    </div>
                    <div className="pt-1">
                      <h3 className="font-black uppercase mb-2" style={{ fontFamily: B, fontSize: 'clamp(13px, 1.5vw, 15px)', letterSpacing: '0.1em', color: '#1A0A0E' }}>{label}</h3>
                      <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(26,10,14,0.45)', fontFamily: BODY }}>{detail}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CITIES — dark split ───────────────────────────────────────────── */}
      <section className="grid lg:grid-cols-2" style={{ borderTop: '1px solid rgba(103,6,38,0.1)' }}>
        <div className="relative overflow-hidden" style={{ minHeight: '560px', backgroundColor: '#1A0A0E' }}>
          <img src={IMG_B} alt="Events" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.4 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(26,10,14,0.6) 0%, rgba(26,10,14,0) 70%)' }} />
          <div className="absolute inset-0 flex flex-col justify-end p-12">
            <img src={IMG_C} alt="Events 2" className="w-48 h-32 object-cover mb-6 opacity-70" style={{ border: '1px solid rgba(250,248,242,0.1)' }} />
            <p className="text-[9px] tracking-[0.24em] uppercase" style={{ color: '#BAD797', fontFamily: B }}>[ PAN-INDIA PRESENCE ]</p>
          </div>
        </div>
        <div className="flex flex-col justify-center px-10 lg:px-16 py-20" style={{ backgroundColor: '#1A0A0E' }}>
          <Reveal>
            <p className="text-[10px] tracking-[0.28em] uppercase mb-6" style={{ color: '#BAD797', fontFamily: B }}>[  OUR REACH ]</p>
            <h2 className="font-black uppercase leading-none mb-14" style={{ fontFamily: "Times New Roman", fontSize: 'clamp(40px, 5vw, 72px)', letterSpacing: '-0.02em', color: '#FAF8F2' }}>
              15+ CITIES.<br />
              <span style={{ color: '#BAD797' }}>ONE STANDARD.</span>
            </h2>
          </Reveal>
          <Reveal delay={60}>
            <div className="flex flex-wrap gap-2">
              {cities.map(city => (
                <span
                  key={city}
                  className="px-3 py-1.5 text-[10px] tracking-[0.12em] uppercase border transition-all duration-200"
                  style={{ borderColor: 'rgba(250,248,242,0.12)', color: 'rgba(250,248,242,0.45)', fontFamily: B }}
                  onMouseEnter={e => {
                    ; (e.currentTarget as HTMLElement).style.borderColor = '#670626'
                      ; (e.currentTarget as HTMLElement).style.color = '#FAF8F2'
                  }}
                  onMouseLeave={e => {
                    ; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(250,248,242,0.12)'
                      ; (e.currentTarget as HTMLElement).style.color = 'rgba(250,248,242,0.45)'
                  }}
                >
                  {city}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>



    </div>
  )
}
