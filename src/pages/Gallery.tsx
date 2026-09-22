import { useState, useEffect, type CSSProperties } from 'react'

const D = "'Cormorant Garamond', Georgia, serif"
const B = "'Manrope', system-ui, sans-serif"
const Bp = "Georgia, 'Times New Roman', serif"

const categories = ['ALL', 'CONFERENCES', 'MICE', 'OFFSITES', 'AWARDS', 'ACTIVATIONS', 'TRAVEL']

// aspect: controls card height in masonry — 'portrait' | 'landscape' | 'square'
const photos = [
  { img: '/assets/gallery/1.jpeg', title: 'Corporate Event', category: 'CONFERENCES', location: 'Gurugram', year: '2026', aspect: 'landscape' },
  { img: '/assets/gallery/2.jpeg', title: 'MICE Programme', category: 'MICE', location: 'Delhi', year: '2026', aspect: 'portrait' },
  { img: '/assets/gallery/3.jpeg', title: 'Brand Activation', category: 'ACTIVATIONS', location: 'Noida', year: '2026', aspect: 'square' },
  { img: '/assets/gallery/4.jpeg', title: 'Awards Gala', category: 'AWARDS', location: 'Gurugram', year: '2026', aspect: 'landscape' },
  { img: '/assets/gallery/5.jpeg', title: 'Leadership Offsite', category: 'OFFSITES', location: 'Goa', year: '2026', aspect: 'portrait' },
  { img: '/assets/gallery/6.jpeg', title: 'Corporate Travel', category: 'TRAVEL', location: 'Jaipur', year: '2026', aspect: 'landscape' },
  { img: '/assets/gallery/7.jpeg', title: 'Team Building Retreat', category: 'OFFSITES', location: 'Bengaluru', year: '2026', aspect: 'square' },
  { img: '/assets/gallery/8.jpeg', title: 'Product Launch Event', category: 'ACTIVATIONS', location: 'Delhi', year: '2026', aspect: 'portrait' },
  { img: '/assets/gallery/9.jpeg', title: 'Annual Conference', category: 'CONFERENCES', location: 'Gurugram', year: '2026', aspect: 'landscape' },
  { img: '/assets/gallery/10.jpeg', title: 'Recognition Ceremony', category: 'AWARDS', location: 'Hyderabad', year: '2026', aspect: 'portrait' },
  { img: '/assets/gallery/11.jpeg', title: 'Incentive Programme', category: 'MICE', location: 'Noida', year: '2026', aspect: 'square' },
]

const aspectStyle = (aspect: string): CSSProperties => {
  if (aspect === 'portrait') return { aspectRatio: '3/4' }
  if (aspect === 'square') return { aspectRatio: '1/1' }
  return { aspectRatio: '16/10' }
}

function useCols() {
  const [cols, setCols] = useState(3)
  useEffect(() => {
    const update = () => setCols(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return cols
}

export default function Gallery() {
  const [active, setActive] = useState('ALL')
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  const cols = useCols()
  const filtered = active === 'ALL' ? photos : photos.filter(p => p.category === active)

  return (
    <div style={{ backgroundColor: '#FAF8F2', color: '#1a0a0ecc', fontFamily: Bp }}>

      {/* ── HERO ── */}
      <section
        className="relative flex flex-col justify-end px-6 lg:px-12 overflow-hidden"
        style={{ minHeight: '52vh', paddingTop: '68px', borderBottom: '1px solid rgba(103,6,38,0.1)', backgroundColor: '#FAF8F2' }}
      >
        <img
          src="https://images.unsplash.com/photo-1547153760-18fc86324498?w=1800&h=900&fit=crop&auto=format"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.07 }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #FAF8F2 35%, rgba(250,248,242,0.85) 70%, rgba(250,248,242,0.6) 100%)' }} />
        <div className="relative z-10 max-w-[1440px] mx-auto pb-14 w-full">
          {/* Ghost project count */}
          <span
            className="absolute right-0 bottom-12 font-black leading-none select-none pointer-events-none hidden lg:block"
            style={{ fontFamily: D, fontSize: 'clamp(100px, 18vw, 240px)', color: 'rgba(103,6,38,0.06)', lineHeight: 1 }}
          >
            {filtered.length.toString().padStart(2, '0')}
          </span>

          <p className="text-[10px] tracking-[0.28em] uppercase mb-5" style={{ color: '#670626', fontFamily: B }}>
            [ OUR WORK ]
          </p>
          <h1
            className="font-black uppercase leading-none"
            style={{ fontFamily: D, fontSize: 'clamp(72px, 13vw, 180px)', letterSpacing: '-0.025em', color: '#350b16ff' }}
          >
            SELECTED<br />
            <span style={{ color: '#BAD797' }}>WORK.</span>
          </h1>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <div
        className="sticky top-[68px] z-30 px-6 lg:px-12"
        style={{ backgroundColor: 'rgba(250,248,242,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(103,6,38,0.1)' }}
      >
        <div className="max-w-[1440px] mx-auto flex items-center gap-6 lg:gap-8 py-4 overflow-x-auto">
          <span className="text-[9px] tracking-[0.22em] uppercase flex-shrink-0" style={{ color: '#670626', fontFamily: B }}>
            [ FILTER ]
          </span>
          <div className="w-px h-4 flex-shrink-0" style={{ backgroundColor: 'rgba(103,6,38,0.15)' }} />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="flex-shrink-0 pb-1 text-[10px] tracking-[0.18em] uppercase font-medium border-b-2 transition-all duration-200"
              style={{
                borderColor: active === cat ? '#670626' : 'transparent',
                color: active === cat ? '#670626' : 'rgba(26,10,14,0.35)',
                fontFamily: B,
                background: 'none',
              }}
            >
              {cat}
            </button>
          ))}
          <span
            className="ml-auto text-[9px] tracking-[0.15em] flex-shrink-0"
            style={{ color: 'rgba(26,10,14,0.25)', fontFamily: B }}
          >
            {filtered.length} {filtered.length === 1 ? 'PROJECT' : 'PROJECTS'}
          </span>
        </div>
      </div>

      {/* ── MASONRY GRID ── */}
      <section className="px-2 lg:px-3 pt-2 pb-20">
        <div style={{ columns: cols, columnGap: '2px' }}>
          {filtered.map((photo, i) => (
            <div
              key={`${photo.title}-${i}`}
              style={{ breakInside: 'avoid', marginBottom: '2px', display: 'block' }}
            >
              {/* Image block */}
              <div
                className="relative overflow-hidden"
                style={{ ...aspectStyle(photo.aspect), backgroundColor: '#F2E6EA' }}
                onClick={() => setLightbox(i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <img
                  src={photo.img}
                  alt={photo.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                  style={{
                    opacity: hovered === i ? 1 : 0.92,
                    transform: hovered === i ? 'scale(1.04)' : 'scale(1)',
                  }}
                />

                {/* Hover overlay — dim the image slightly and show "VIEW" */}
                <div
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-400"
                  style={{ opacity: hovered === i ? 1 : 0, backgroundColor: 'rgba(250,248,242,0.12)' }}
                >
                  <span
                    className="text-[9px] tracking-[0.3em] uppercase px-4 py-2"
                    style={{
                      fontFamily: B,
                      color: '#FAF8F2',
                      border: '1px solid rgba(250,248,242,0.4)',
                      backgroundColor: 'rgba(103,6,38,0.6)',
                    }}
                  >
                    [ VIEW ]
                  </span>
                </div>

              </div>

              {/* Text below image — layrmedia pattern */}
              <div
                className="px-1 pt-2.5 pb-5"
                style={{ backgroundColor: '#FAF8F2' }}
                onClick={() => setLightbox(i)}
              >
                <p
                  className="text-[9px] tracking-[0.2em] uppercase mb-1.5"
                  style={{ color: '#670626', fontFamily: B }}
                >
                  [ {photo.category} ] — {photo.location}
                </p>
                <h3
                  className="font-black uppercase leading-tight transition-colors duration-200"
                  style={{
                    fontFamily: D,
                    fontSize: 'clamp(15px, 2vw, 22px)',
                    color: hovered === i ? '#670626' : '#1A0A0E',
                  }}
                >
                  {photo.title}
                </h3>
                <p className="text-[10px] mt-1" style={{ color: 'rgba(26,10,14,0.3)', fontFamily: B }}>
                  {photo.year}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <p className="text-[10px] tracking-[0.24em] uppercase" style={{ color: 'rgba(26,10,14,0.25)', fontFamily: B }}>
              [ NO PROJECTS ]
            </p>
            <button
              onClick={() => setActive('ALL')}
              className="text-[11px] tracking-[0.18em] uppercase border px-5 py-2.5 transition-colors"
              style={{ borderColor: 'rgba(103,6,38,0.2)', color: 'rgba(26,10,14,0.5)', fontFamily: B, background: 'none' }}
            >
              View All
            </button>
          </div>
        )}
      </section>

      {/* ── "VIEW FULL GALLERY" CTA strip — layrmedia pattern ── */}
      <div
        className="flex items-center justify-center py-10"
        style={{ borderTop: '1px solid rgba(103,6,38,0.1)', backgroundColor: '#FAF8F2' }}
      >
        <button
          onClick={() => setActive('ALL')}
          className="cta-double text-[11px] font-semibold tracking-[0.2em] uppercase"
          style={{ fontFamily: B, background: 'none', border: 'none', color: '#1A0A0E' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#670626' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#1A0A0E' }}
        >
          <span>VIEW FULL GALLERY →</span>
          <span style={{ color: '#670626' }}>VIEW FULL GALLERY →</span>
        </button>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(26,10,14,0.95)' }}
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-6 right-8 transition-colors"
            style={{ fontFamily: B, fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(250,248,242,0.4)', background: 'none', border: 'none' }}
            onClick={() => setLightbox(null)}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#FAF8F2' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,248,242,0.4)' }}
          >
            [ CLOSE ] ×
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 text-4xl p-4 transition-colors"
            style={{ color: 'rgba(250,248,242,0.3)', background: 'none', border: 'none' }}
            onClick={e => { e.stopPropagation(); setLightbox(l => l !== null ? (l - 1 + filtered.length) % filtered.length : null) }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#FAF8F2' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,248,242,0.3)' }}
          >
            ‹
          </button>

          {/* Image */}
          <div className="max-w-5xl w-full px-16" onClick={e => e.stopPropagation()}>
            <div className="overflow-hidden" style={{ backgroundColor: '#1A0A0E' }}>
              <img
                src={filtered[lightbox].img}
                alt={filtered[lightbox].title}
                className="w-full max-h-[72vh] object-contain"
              />
            </div>
            <div className="mt-5 flex items-end justify-between gap-6">
              <div>
                <p className="text-[9px] tracking-[0.22em] uppercase mb-2" style={{ color: '#BAD797', fontFamily: B }}>
                  [ {filtered[lightbox].category} · {filtered[lightbox].location} · {filtered[lightbox].year} ]
                </p>
                <p className="font-black uppercase leading-none" style={{ fontFamily: D, fontSize: 'clamp(24px, 3.5vw, 48px)', color: '#FAF8F2' }}>
                  {filtered[lightbox].title}
                </p>
              </div>
              <p className="text-[10px] flex-shrink-0" style={{ color: 'rgba(250,248,242,0.25)', fontFamily: B }}>
                {lightbox + 1} / {filtered.length}
              </p>
            </div>
          </div>

          {/* Next */}
          <button
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 text-4xl p-4 transition-colors"
            style={{ color: 'rgba(250,248,242,0.3)', background: 'none', border: 'none' }}
            onClick={e => { e.stopPropagation(); setLightbox(l => l !== null ? (l + 1) % filtered.length : null) }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#FAF8F2' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,248,242,0.3)' }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}
