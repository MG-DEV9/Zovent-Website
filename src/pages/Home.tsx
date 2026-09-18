import { useState, useRef, useEffect, type ReactNode } from 'react'
import { Link } from 'react-router'
import { useReveal } from '../hooks/useReveal'
import { posts as blogPostsData } from '../data/blog'

const D = "'Cormorant Garamond', Georgia, serif"
const B = "'Manrope', system-ui, sans-serif"
const BODY = "Georgia, 'Times New Roman', serif"

const HERO_SLIDES = [
  { src: '/assets/Hero1.png', label: 'Corporate Conferences' },
  { src: '/assets/Hero2.png', label: 'MICE Programmes' },
  { src: '/assets/Hero3.png', label: 'Luxury Dinner' },
]

const EV1 = 'https://images.unsplash.com/photo-1785336872226-06bf32ebd7fd?w=700&h=500&fit=crop&auto=format'
const EV2 = 'https://images.unsplash.com/photo-1777265163251-68d680068d0c?w=700&h=500&fit=crop&auto=format'
const EV3 = 'https://images.unsplash.com/photo-1770140304066-6db58fe18543?w=700&h=500&fit=crop&auto=format'
const EV4 = 'https://images.unsplash.com/photo-1783314860827-c64547042e15?w=700&h=500&fit=crop&auto=format'
const EV5 = 'https://images.unsplash.com/photo-1770140304098-46700a5c45c8?w=700&h=500&fit=crop&auto=format'
const LOBBY = 'https://images.unsplash.com/photo-1742844552048-410dfdf7b3c7?w=900&h=700&fit=crop&auto=format'
const CITY = 'https://images.unsplash.com/photo-1770770155448-8461474b4e7a?w=900&h=700&fit=crop&auto=format'

const SVC_LABELS = ['CONFERENCES', 'MICE', 'OFFSITES', 'TEAM BUILDING', 'BRAND ACTIVATIONS', 'AWARD CEREMONIES', 'CORPORATE TRAVEL', 'INCENTIVE PROGRAMMES']
const MARQUEE_SVC = [...SVC_LABELS, ...SVC_LABELS]

const IMG_SRCS = [EV1, EV2, EV3, EV4, EV5, LOBBY, CITY, EV1] as const
const MARQUEE_IMG = [...IMG_SRCS, ...IMG_SRCS]

const CLIENT_LOGOS = [
  { src: '/assets/Zovent customer logo/ACCE.png', alt: 'ACCE' },
  { src: '/assets/Zovent customer logo/ATUMX.png', alt: 'ATUMX' },
  { src: '/assets/Zovent customer logo/Garnier.png', alt: 'Garnier' },
  { src: '/assets/Zovent customer logo/ISKON.png', alt: 'ISKON' },
  { src: '/assets/Zovent customer logo/Kotak.png', alt: 'Kotak' },
  { src: '/assets/Zovent customer logo/Mindgrove.png', alt: 'Mindgrove' },
  { src: '/assets/Zovent customer logo/NKDA.png', alt: 'NKDA' },
  { src: '/assets/Zovent customer logo/beva.png', alt: 'Beva' },
  { src: '/assets/Zovent customer logo/lic.png', alt: 'LIC' },
  { src: '/assets/Zovent customer logo/star health.png', alt: 'Star Health' },
  { src: '/assets/Zovent customer logo/suntory.png', alt: 'Suntory' },
]
const MARQUEE_CL = [...CLIENT_LOGOS, ...CLIENT_LOGOS]

const services = [
  { num: '01', title: 'CORPORATE CONFERENCES & MEETINGS', tag: 'CONFERENCES', href: '/services/conferences', img: '/assets/Services/Conferences.png', desc: 'From intimate boardroom meetings to large-scale corporate conferences, Zovent plans and manages every detail — from venue and technology to delegates, speakers and on-ground execution' },
  { num: '02', title: 'M.I.C.E', tag: 'MICE', href: '/services/mice', img: '/assets/Services/M.I.C.E. (1).png', desc: 'From high-impact corporate meetings and incentive trips to conferences and exhibitions, Zovent creates seamless MICE experiences designed around your brand, business goals and people. We manage every detail — from destination selection and travel logistics to event production, hospitality and on-ground execution — across India and international destinations.' },
  { num: '03', title: 'OFFSITES & TEAM BUILDING', tag: 'OFFSITES', href: '/services/offsites', img: '/assets/Services/Offsites.png', desc: 'Purposefully designed corporate offsites that bring teams together, spark fresh thinking and create experiences people actually remember. From leadership retreats and strategic offsites to team-building activities and experiential getaways, Zovent manages every detail from concept to execution.' },
  { num: '04', title: 'CREATE MOMENTS. BUILD BRAND', tag: 'ACTIVATIONS', href: '/services/activations', img: '/assets/Services/Brand activation.png', desc: 'Strategic brand activation experiences that turn attention into engagement and audiences into advocates. From product launches and experiential marketing events to corporate celebrations and immersive brand experiences, Zovent brings your brand to life through memorable moments.' },
  { num: '05', title: 'AWARD CEREMONIES & RECOGNITION', tag: 'AWARDS', href: '/services/awards', img: '/assets/Services/Award ceremonies.png', desc: 'We design recognition events that genuinely honour achievement — from annual sales award galas and gala dinners to employee appreciation dinners and leadership felicitations.' },
  { num: '06', title: 'CORPORATE & LUXURY TRAVEL', tag: 'TRAVEL', href: '/services/travel', img: '/assets/Services/Corporate Luxury Travel.png', desc: 'From seamless business travel to bespoke group getaways, Zovent manages every journey with precision, comfort and care. We curate corporate travel, incentive trips, luxury holidays and group travel experiences across India and international destinations — tailored around your people, purpose and preferences.' },
]

const stats = [
  { val: '200+', label: 'Events Delivered' },
  { val: '15+', label: 'Cities' },
  { val: '50+', label: 'Corporate Clients' },
  { val: '500+', label: 'Holiday Packages' },
]

const testimonials = [
  { quote: 'Zovent handled our 600-delegate annual conference flawlessly — from venue negotiations to on-ground logistics.', name: 'Ritika Sharma', title: 'Head of HR', co: 'Axis Financial Services' },
  { quote: 'The incentive trip they designed for our top performers was world-class. Our team is still talking about it six months later.', name: 'Vikram Nair', title: 'VP Sales', co: 'TechCore India' },
  { quote: 'Their attention to detail and enterprise-grade project management gave us complete confidence.', name: 'Ritesh Mehta', title: 'Director – Corporate Affairs', co: 'SteelMark Group' },
]

const blogPosts = blogPostsData.slice(0, 3).map(p => ({ slug: p.slug, cat: p.category, date: p.date, title: p.title, img: p.img }))

// ── Scroll-reveal wrapper ──────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useReveal(0.12) as React.RefObject<HTMLDivElement>
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// ── Doubled-hover CTA ─────────────────────────────────────────────────────
function CtaLink({ to, children }: { to: string; children: string }) {
  return (
    <Link to={to} className="cta-double text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ fontFamily: B }}>
      <span>{children} →</span>
      <span style={{ color: '#670626' }}>{children} →</span>
    </Link>
  )
}

export default function Home() {
  const [activeT, setActiveT] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  // Hero slider state
  const [heroIdx, setHeroIdx] = useState(0)
  const heroTimer = useRef<ReturnType<typeof setInterval> | null>(null)

  const goToHero = (idx: number) => {
    setHeroIdx((idx + HERO_SLIDES.length) % HERO_SLIDES.length)
  }

  useEffect(() => {
    heroTimer.current = setInterval(() => setHeroIdx(i => (i + 1) % HERO_SLIDES.length), 5000)
    return () => { if (heroTimer.current) clearInterval(heroTimer.current) }
  }, [])

  useEffect(() => {
    timer.current = setInterval(() => setActiveT(t => (t + 1) % testimonials.length), 5500)
    return () => { if (timer.current) clearInterval(timer.current) }
  }, [])

  return (
    <div style={{ backgroundColor: '#FAF8F2', fontFamily: B, color: '#1A0A0E' }}>

      {/* ── HERO SLIDER ──────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col justify-end overflow-hidden" style={{ minHeight: '100svh', backgroundColor: '#1A0A0E', color: '#FAF8F2' }}>

        {/* Slider images — crossfade */}
        {HERO_SLIDES.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.label}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: i === heroIdx ? 0.38 : 0,
              transform: i === heroIdx ? 'scale(1.04)' : 'scale(1.0)',
              transition: 'opacity 1.1s cubic-bezier(0.4,0,0.2,1), transform 3s ease',
              zIndex: 1,
            }}
          />
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #1A0A0E 12%, rgba(26,10,14,0.5) 55%, rgba(26,10,14,0.05) 100%)', zIndex: 2 }} />

        {/* Vertical label — left edge */}
        <div
          className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3"
          style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)', zIndex: 10 }}
        >
          <div className="w-px h-14" style={{ backgroundColor: 'rgba(250,248,242,0.12)' }} />
        </div>

        {/* Vertical label — right edge */}
        <div
          className="absolute right-6 top-1/2 hidden lg:flex flex-col items-center gap-3"
          style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%)', zIndex: 10 }}
        >
          <div className="w-px h-14" style={{ backgroundColor: 'rgba(250,248,242,0.12)' }} />
          <span className="text-[9px] tracking-[0.28em] uppercase" style={{ color: 'rgba(250,248,242,0.22)', fontFamily: B }}>
            [ Corporate Events ]
          </span>
        </div>

        {/* Prev / Next arrows */}
        <button
          aria-label="Previous slide"
          onClick={() => { goToHero(heroIdx - 1); if (heroTimer.current) clearInterval(heroTimer.current) }}
          className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all"
          style={{
            zIndex: 20, width: '44px', height: '44px',
            border: '1px solid rgba(250,248,242,0.2)',
            backgroundColor: 'rgba(26,10,14,0.45)',
            color: '#FAF8F2',
            backdropFilter: 'blur(6px)',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#670626'; (e.currentTarget as HTMLElement).style.borderColor = '#670626' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(26,10,14,0.45)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(250,248,242,0.2)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button
          aria-label="Next slide"
          onClick={() => { goToHero(heroIdx + 1); if (heroTimer.current) clearInterval(heroTimer.current) }}
          className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all"
          style={{
            zIndex: 20, width: '44px', height: '44px',
            border: '1px solid rgba(250,248,242,0.2)',
            backgroundColor: 'rgba(26,10,14,0.45)',
            color: '#FAF8F2',
            backdropFilter: 'blur(6px)',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#670626'; (e.currentTarget as HTMLElement).style.borderColor = '#670626' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(26,10,14,0.45)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(250,248,242,0.2)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>

        {/* Content */}
        <div className="relative w-full px-10 lg:px-20 pb-20 lg:pb-28" style={{ zIndex: 10, maxWidth: '1440px', margin: '0 auto' }}>

          {/* Active slide label */}
          <div className="mb-6 afu afu-1">
            {HERO_SLIDES.map((slide, i) => (
              <span
                key={slide.src}
                className="text-[10px] tracking-[0.28em] uppercase"
                style={{
                  fontFamily: B,
                  color: '#BAD797',
                  display: i === heroIdx ? 'inline' : 'none',
                }}
              >
                [ {slide.label} ]
              </span>
            ))}
          </div>

          {/* Headline */}
          <h1
            className="font-black uppercase leading-[0.85] mb-0 afu afu-2"
            style={{ fontFamily: D, fontSize: 'clamp(48px, 13.5vw, 120px)', letterSpacing: '-0.02em' }}
          >
            WE<br />
            TURN <span style={{ color: '#BAD797', fontStyle: 'italic' }}>IDEAS</span><br />
            INTO<br />
            <span style={{ WebkitTextStroke: '1px rgba(249, 249, 249, 1)' }}>EXPERIENCES.</span>
          </h1>

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mt-12 afu afu-3">
            <p className="text-[13px] leading-relaxed max-w-xs" style={{ color: 'rgba(250,248,242,0.48)', fontFamily: BODY }}>
              Full-spectrum corporate event management, MICE programmes, and luxury travel — across cities worldwide.
            </p>
            <div className="flex items-center gap-8">
              <Link
                to="/contact"
                className="px-8 py-3.5 text-[11px] tracking-[0.16em] uppercase font-semibold transition-all"
                style={{ backgroundColor: '#670626', color: '#FAF8F2', fontFamily: B }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#FAF8F2'; (e.currentTarget as HTMLElement).style.color = '#670626' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#670626'; (e.currentTarget as HTMLElement).style.color = '#FAF8F2' }}
              >
                Start a Project
              </Link>
              <CtaLink to="/services">View Services</CtaLink>
            </div>
          </div>
        </div>

        {/* Dot indicators + slide counter */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 afu afu-4" style={{ zIndex: 20 }}>
          <div className="flex items-center gap-2.5">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => { goToHero(i); if (heroTimer.current) clearInterval(heroTimer.current) }}
                style={{
                  width: i === heroIdx ? '28px' : '8px',
                  height: '2px',
                  backgroundColor: i === heroIdx ? '#670626' : 'rgba(250,248,242,0.3)',
                  transition: 'all 0.4s ease',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
          <div className="flex flex-col items-center gap-2" style={{ opacity: 0.28 }}>
            <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, transparent, #670626)' }} />
            <p className="text-[8px] tracking-[0.35em] uppercase" style={{ fontFamily: B, color: '#670626' }}>[ SCROLL ]</p>
          </div>
        </div>
      </section>

      {/* ── MARQUEE 1 — service labels ──────────────────────────────────────── */}
      <div className="overflow-hidden py-4 border-y" style={{ borderColor: 'rgba(186, 222, 191, 0.7)', backgroundColor: 'rgba(186, 215, 151, 1)' }}>
        <div className="marquee-track flex gap-10 whitespace-nowrap w-max">
          {MARQUEE_SVC.map((s, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="text-[15px] tracking-[0.22em] uppercase font-bold" style={{ color: 'rgba(58, 21, 21, 0.98)', fontFamily: B }}>{s}</span>
              <span style={{ color: '#48081eff', fontSize: '5px' }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-10 lg:px-20">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 lg:grid-cols-4">
          {stats.map(({ val, label }, i) => (
            <Reveal key={label} delay={i * 80}>
              <div
                className="py-10 flex flex-col"
                style={{ borderLeft: i > 0 ? '1px solid #BAD797' : undefined, paddingLeft: i > 0 ? '40px' : undefined }}
              >
                <span className="font-black leading-none mb-2" style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 'clamp(60px, 8vw, 108px)', color: '#3f0c19ff' }}>
                  {val}
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: '#670626', fontFamily: B }}>
                  {label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────────────────── */}
      <section style={{ borderTop: '1px solid rgba(103,6,38,0.1)' }}>
        {/* Header row */}
        <div className="px-10 lg:px-20 pt-20 pb-14 max-w-[1440px] mx-auto">
          <Reveal>
            <div className="flex items-center justify-between mb-12">
              <p className="text-[10px] tracking-[0.24em] uppercase" style={{ color: '#670626', fontFamily: B }}>[ SERVICES ]</p>
              <CtaLink to="/services">All Services</CtaLink>
            </div>
            <h2 className="font-black uppercase leading-none" style={{ fontFamily: D, fontSize: 'clamp(52px, 9vw, 120px)', letterSpacing: '-0.02em', color: '#3d0916ff' }}>
              WHAT WE DO.
            </h2>
          </Reveal>
        </div>

        {/* Alternating text rows — no imagery */}
        {services.map((s, idx) => {
          const imgRight = idx % 2 === 0
          return (
            <Link
              key={s.num}
              to={s.href}
              className="group block relative overflow-hidden"
              style={{ minHeight: '62vh', borderTop: '1px solid rgba(103,6,38,0.1)', backgroundColor: '#FAF8F2' }}
            >
              {/* Full-bleed service image panel */}
              <div
                className="absolute inset-y-0 transition-all duration-700"
                style={{ [imgRight ? 'right' : 'left']: 0, width: '55%', backgroundColor: '#F2E6EA' }}
              >
                <img
                  src={encodeURI(s.img)}
                  alt={s.title}
                  className="w-full h-full object-cover transition-all duration-700 opacity-70 group-hover:opacity-100 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-0"
                  style={{
                    background: imgRight
                      ? 'linear-gradient(to right, #FAF8F2 0%, #FAF8F2b3 25%, #FAF8F200 100%)'
                      : 'linear-gradient(to left, #FAF8F2 0%, #FAF8F2b3 25%, #FAF8F200 100%)',
                  }}
                />
              </div>

              {/* Ghost number watermark */}
              <span
                className="absolute select-none pointer-events-none font-black leading-none"
                style={{
                  fontFamily: D,
                  fontSize: 'clamp(140px, 18vw, 240px)',
                  color: 'rgba(26,10,14,0.04)',
                  lineHeight: 1,
                  [imgRight ? 'left' : 'right']: '5%',
                  bottom: '-0.1em',
                }}
              >
                {s.num}
              </span>

              {/* Text content */}
              <div
                className="relative z-10 flex flex-col justify-center px-10 lg:px-20 py-16"
                style={{
                  width: 'min(52%, 600px)',
                  marginLeft: imgRight ? 0 : 'auto',
                  marginRight: imgRight ? 'auto' : 0,
                  minHeight: '62vh',
                }}
              >
                <Reveal delay={idx * 30}>
                  <p className="text-[9px] tracking-[0.26em] uppercase mb-5" style={{ color: '#670626', fontFamily: B }}>
                    [ {s.tag} ]
                  </p>
                  <h3
                    className="font-black uppercase leading-none mb-6 transition-colors duration-300 group-hover:text-[#670626]"
                    style={{ fontFamily: D, fontSize: 'clamp(36px, 5.5vw, 80px)', letterSpacing: '-0.02em', color: '#390d18ff' }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed mb-10 max-w-xs" style={{ color: 'rgba(26,10,14,0.5)', fontFamily: BODY }}>
                    {s.desc}
                  </p>
                  <span
                    className="cta-double text-[11px] font-semibold tracking-[0.14em] uppercase self-start"
                    style={{ fontFamily: B }}
                  >
                    <span>View Service →</span>
                    <span style={{ color: '#670626' }}>View Service →</span>
                  </span>
                </Reveal>
              </div>

              {/* Cherry bottom accent line on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px transition-transform duration-700 origin-left scale-x-0 group-hover:scale-x-100"
                style={{ backgroundColor: '#670626' }}
              />
            </Link>
          )
        })}
      </section>

      {/* ── PROCESS TICKER ──────────────────────────────────────────────────── */}
      <div className="overflow-hidden py-5" style={{ backgroundColor: '#EFF5E2', borderTop: '1px solid rgba(103,6,38,0.1)', borderBottom: '1px solid rgba(103,6,38,0.1)' }}>
        {(() => {
          const steps = ['01 INITIAL BRIEF', '02 CONCEPT & STRATEGY', '03 VENUE & VENDOR SOURCING', '04 PRE-PRODUCTION', '05 ON-GROUND EXECUTION', '06 POST-EVENT REPORTING']
          const doubled = [...steps, ...steps]
          return (
            <div className="marquee-track flex gap-12 w-max whitespace-nowrap">
              {doubled.map((step, i) => (
                <span key={i} className="flex items-center gap-12 flex-shrink-0">
                  <span className="text-[15px] tracking-[0.2em] font-medium uppercase" style={{ color: 'rgba(69, 18, 30, 0.87)', fontFamily: B }}>{step}</span>
                  <span style={{ color: '#670626', fontSize: '4px' }}>◆</span>
                </span>
              ))}
            </div>
          )
        })()}
      </div>

      {/* ── IMAGE MARQUEE — forward ──────────────────────────────────────────── */}
      <section className="overflow-hidden py-5" style={{ backgroundColor: '#F2E6EA' }}>
        <div className="marquee-track flex gap-3 w-max">
          {MARQUEE_IMG.map((img, i) => (
            <div key={i} className="flex-shrink-0 overflow-hidden" style={{ width: '340px', height: '210px', backgroundColor: '#EFF5E2' }}>
              <img src={img} alt="" className="w-full h-full object-cover opacity-65 hover:opacity-100 transition-opacity duration-600" />
            </div>
          ))}
        </div>
      </section>

      {/* ── IMAGE MARQUEE — reverse ──────────────────────────────────────────── */}
      <section className="overflow-hidden py-3" style={{ backgroundColor: '#F2E6EA', borderBottom: '1px solid rgba(103,6,38,0.1)' }}>
        <div className="marquee-track-rev flex gap-3 w-max">
          {[...MARQUEE_IMG].reverse().map((img, i) => (
            <div key={i} className="flex-shrink-0 overflow-hidden" style={{ width: '260px', height: '160px', backgroundColor: '#EFF5E2' }}>
              <img src={img} alt="" className="w-full h-full object-cover opacity-45 hover:opacity-80 transition-opacity duration-600" />
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY ZOVENT ──────────────────────────────────────────────────────── */}
      <section className="grid lg:grid-cols-2 min-h-[640px]">
        <div className="relative overflow-hidden" style={{ minHeight: '380px', backgroundColor: '#F2E6EA' }}>
          <img src={CITY} alt="Corporate event" className="w-full h-full object-cover absolute inset-0" style={{ opacity: 0.55 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(115deg, transparent 50%, #F2E6EA 100%)' }} />
          {/* Overlaid label */}
          <div className="absolute bottom-8 left-8">
            <p className="text-[9px] tracking-[0.24em] uppercase" style={{ color: '#670626', fontFamily: B }}>[ 15+ CITIES. ONE STANDARD. ]</p>
          </div>
        </div>

        <div className="flex flex-col justify-center px-10 lg:px-16 py-20" style={{ backgroundColor: '#FAF8F2' }}>
          <Reveal>
            <p className="text-[10px] tracking-[0.24em] uppercase mb-8" style={{ color: '#670626', fontFamily: B }}>[ WHY ZOVENT ]</p>
            <h2 className="font-black uppercase leading-none mb-12" style={{ fontFamily: D, fontSize: 'clamp(38px, 5vw, 72px)', letterSpacing: '-0.01em', color: '#390f1aff' }}>
              VERSATILE IDEAS<br />SEAMLESS EXECUTION,<br />UNFORGETTABLE EXPERIENCES.
            </h2>
            <p className="text-[15px] uppercase mb-8" style={{ color: '#670626', fontFamily: B }}>Corporate Events · MICE · Corporate Travel · Holidays</p>
          </Reveal>

          <ul className="space-y-7 mb-12">
            {[
              [' End-to-End Event Management From the first brief to the final applause.'],
              ['Corporate Travel, Without the Hassle Flights, stays, transport and experiences—handled seamlessly..'],
              [' MICE & Destination Expertise Meetings, incentives, conferences and group experiences, wherever you go.'],
              ['Every Detail. Thoughtfully Managed. People, partners, logistics and contingencies—planned before they become problems..'],
            ].map(([title, desc], i) => (
              <Reveal key={title} delay={i * 60}>
                <li className="flex gap-5 items-start">
                  <span style={{ color: '#670626' }} className="flex-shrink-0 mt-1 text-[10px]">◆</span>
                  <div>
                    <p className="text-sm font-semibold mb-0.5" style={{ color: '#1A0A0E', fontFamily: B }}>{title}</p>
                    <p className="text-[12px]" style={{ color: 'rgba(26,10,14,0.5)', fontFamily: BODY }}>{desc}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
          <CtaLink to="/about">Our Story</CtaLink>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────────── */}
      <section className="py-28 px-10 lg:px-20" style={{ backgroundColor: '#FAF8F2', borderTop: '1px solid rgba(103,6,38,0.1)' }}>
        <div className="max-w-[1440px] mx-auto">
          <Reveal>
            <p className="text-[10px] tracking-[0.24em] uppercase mb-20" style={{ color: '#670626', fontFamily: B }}>
              [ testimonial / real clients / real results / real projects ]
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-5 gap-16 items-start">
            {/* Quote col */}
            <div className="lg:col-span-3 relative" style={{ minHeight: '280px' }}>
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="absolute inset-0 transition-all duration-700"
                  style={{ opacity: i === activeT ? 1 : 0, transform: i === activeT ? 'none' : 'translateY(12px)', pointerEvents: i === activeT ? 'auto' : 'none' }}
                >
                  <p className="font-black uppercase leading-[0.92] mb-10" style={{ fontFamily: D, fontSize: 'clamp(28px, 4vw, 58px)', letterSpacing: '-0.01em', color: '#320c15ff' }}>
                    "{t.quote}"
                  </p>
                  <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: '#670626', fontFamily: B }}>
                    [ {t.name} | {t.title} — {t.co} ]
                  </p>
                </div>
              ))}
            </div>

            {/* Right col */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-2">
                <div className="overflow-hidden" style={{ aspectRatio: '4/3', backgroundColor: '#EFF5E2' }}>
                  <img src={EV1} alt="" className="w-full h-full object-cover opacity-55" />
                </div>
                <div className="overflow-hidden" style={{ aspectRatio: '4/3', backgroundColor: '#EFF5E2' }}>
                  <img src={EV4} alt="" className="w-full h-full object-cover opacity-55" />
                </div>
              </div>
              <div className="flex gap-2.5 items-center">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setActiveT(i); if (timer.current) clearInterval(timer.current) }}
                    style={{ height: '2px', backgroundColor: i === activeT ? '#670626' : 'rgba(26,10,14,0.15)', width: i === activeT ? '32px' : '10px', transition: 'all 0.3s ease' }}
                  />
                ))}
              </div>
              {/* Stat */}
              <div className="mt-4 pt-6" style={{ borderTop: '1px solid rgba(103,6,38,0.1)' }}>
                <p className="font-black leading-none mb-1" style={{ fontFamily: D, fontSize: '72px', color: 'rgba(26,10,14,0.06)' }}>
                  98%
                </p>
                <p className="text-[10px] tracking-[0.2em] uppercase -mt-10 ml-1" style={{ color: 'rgba(26,10,14,0.4)', fontFamily: B }}>
                  client satisfaction rate
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENT MARQUEE ──────────────────────────────────────────────────── */}
      <section className="py-14 overflow-hidden border-y" style={{ backgroundColor: '#EFF5E2', borderColor: 'rgba(103, 6, 38, 0.68)' }}>
        <p className="text-[10px] tracking-[0.28em] uppercase text-center mb-8" style={{ color: 'rgba(59, 14, 26, 0.79)', fontFamily: B }}>
          {"[ CLIENTS WE'VE SERVED ]"}
        </p>
        <div className="overflow-hidden">
          <div className="marquee-track-rev flex items-center gap-16 w-max">
            {MARQUEE_CL.map((logo, i) => (
              <span key={i} className="flex items-center gap-16 flex-shrink-0">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  style={{
                    height: '56px',
                    width: 'auto',
                    objectFit: 'contain',
                    borderRadius: '8px',
                  }}
                />
                <span style={{ color: '#670626', fontSize: '4px' }}>◆</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ────────────────────────────────────────────────────────────── */}
      <section className="py-28 px-10 lg:px-20" style={{ borderTop: '1px solid rgba(103,6,38,0.1)' }}>
        <div className="max-w-[1440px] mx-auto">
          <Reveal>
            <div className="flex items-end justify-between mb-16">
              <div>
                <p className="text-[10px] tracking-[0.24em] uppercase mb-5" style={{ color: '#670626', fontFamily: B }}>[ INSIGHTS ]</p>
                <h2 className="font-black uppercase leading-none" style={{ fontFamily: D, fontSize: 'clamp(44px, 7vw, 96px)', letterSpacing: '-0.02em', color: '#2c0b13ff' }}>
                  FROM THE BLOG.
                </h2>
              </div>
              <CtaLink to="/blog">All Articles</CtaLink>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: 'rgba(103,6,38,0.1)' }}>
            {blogPosts.map((post, idx) => (
              <Reveal key={post.slug} delay={idx * 80}>
                <Link to={`/blog/${post.slug}`} className="group flex flex-col h-full" style={{ backgroundColor: '#FAF8F2' }}>
                  <div className="overflow-hidden" style={{ aspectRatio: '16/10', backgroundColor: '#F2E6EA' }}>
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover opacity-55 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" />
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: '#670626', fontFamily: B }}>[ {post.cat} ]</span>
                      <span className="text-[10px]" style={{ color: 'rgba(26,10,14,0.4)', fontFamily: B }}>{post.date}</span>
                    </div>
                    <h3 className="font-black uppercase leading-tight flex-1 group-hover:text-[#670626] transition-colors" style={{ fontFamily: D, fontSize: 'clamp(20px, 2.2vw, 30px)', color: '#1A0A0E' }}>
                      {post.title}
                    </h3>
                    <div className="mt-6 text-[10px] tracking-[0.16em] uppercase" style={{ color: 'rgba(26,10,14,0.4)', fontFamily: B }}>
                      Read Article →
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#670626', borderTop: '1px solid rgba(250,248,242,0.1)' }}>
        {/* Ghost ZOVENT watermark — far right */}
        <div className="absolute inset-0 flex items-end justify-end pointer-events-none select-none overflow-hidden" aria-hidden>
          <span
            className="font-black uppercase leading-none"
            style={{ fontFamily: D, fontSize: 'clamp(160px, 28vw, 400px)', color: 'rgba(250,248,242,0.05)', letterSpacing: '-0.04em', lineHeight: 0.85, marginRight: '-0.05em', marginBottom: '-0.1em' }}
          >
            ZOVENT.
          </span>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-10 lg:px-20 py-40">
          <Reveal>
            <p className="text-[10px] tracking-[0.28em] uppercase mb-10" style={{ color: '#FAF8F2', fontFamily: B }}>
              [ GOT A PROJECT? ]
            </p>
          </Reveal>
          <Reveal delay={60}>
            {/* Mixed-case layrmedia-style headline */}
            <h2 className="font-black leading-[0.88] mb-6" style={{ fontFamily: D, fontSize: 'clamp(52px, 10vw, 148px)', letterSpacing: '-0.025em', maxWidth: '1000px', color: '#FAF8F2' }}>
              Your next?{' '}
              <span style={{ WebkitTextStroke: '1px rgba(250,248,242,0.35)', color: 'transparent' }}>
                {"big moment"}
              </span>{' '}
              starts here.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-[14px] leading-relaxed mb-14 max-w-lg" style={{ color: 'rgba(250,248,242,0.55)', fontFamily: BODY }}>
              From the first brief to the final applause — Zovent handles every dimension so you can focus entirely on what matters.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-4 px-10 py-5 text-[11px] tracking-[0.2em] uppercase font-semibold transition-all"
                style={{ backgroundColor: '#FAF8F2', color: '#670626', fontFamily: B }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#FAF8F2' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#FAF8F2' }}
              >
                [ START A PROJECT ] →
              </Link>
              <a
                href="mailto:info@zovents.com"
                className="text-[13px] transition-colors"
                style={{ color: 'rgba(250,248,242,0.6)', fontFamily: B }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#FAF8F2' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,248,242,0.6)' }}
              >
                info@zovents.com →
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
