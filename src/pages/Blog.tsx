import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { posts as allPosts } from '../data/blog'

const D = "'Cormorant Garamond', Georgia, serif"
const L = "'Manrope', system-ui, sans-serif"
const B = "Georgia, 'Times New Roman', serif"

const BLOG_BG = 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1800&h=900&fit=crop&auto=format'

export default function Blog() {
  const categories = useMemo(() => ['ALL', ...Array.from(new Set(allPosts.map(p => p.category)))], [])
  const [activeCat, setActiveCat] = useState('ALL')
  const filtered = activeCat === 'ALL' ? allPosts : allPosts.filter(p => p.category === activeCat)
  const featured = filtered.find(p => p.featured) || filtered[0]
  const rest = filtered.filter(p => p !== featured)

  return (
    <div style={{ backgroundColor: '#FAF8F2', color: '#1A0A0E', fontFamily: B }}>

      {/* ── HERO ── */}
      <section
        className="relative flex flex-col justify-end px-6 lg:px-12 overflow-hidden"
        style={{ minHeight: '55vh', paddingTop: '68px', backgroundColor: '#670626', borderBottom: '1px solid rgba(103,6,38,0.1)' }}
      >
        <img
          src={BLOG_BG}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.15, mixBlendMode: 'luminosity' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #670626 30%, rgba(103,6,38,0.72) 65%, rgba(103,6,38,0.3) 100%)' }} />
        <div className="relative z-10 max-w-360 mx-auto pb-16 w-full">
          <p className="text-[11px] tracking-[0.22em] uppercase mb-5" style={{ color: 'rgba(250,248,242,0.7)', fontFamily: L }}>[ INSIGHTS &amp; IDEAS ]</p>
          <h1 className="font-black uppercase leading-none" style={{ fontFamily: D, fontSize: 'clamp(56px, 10vw, 128px)', color: '#FAF8F2' }}>
            THE BLOG.
          </h1>
        </div>
      </section>

      {/* ── FILTER ── */}
      <div style={{ backgroundColor: '#F2E6EA', borderBottom: '1px solid rgba(103,6,38,0.1)' }}>
        <div className="max-w-360 mx-auto px-6 lg:px-12 flex overflow-x-auto gap-8 py-5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className="shrink-0 text-[10px] tracking-[0.18em] uppercase font-medium border-b-2 pb-1 transition-all"
              style={{ borderColor: activeCat === cat ? '#670626' : 'transparent', color: activeCat === cat ? '#670626' : 'rgba(26,10,14,0.4)', fontFamily: L, background: 'none' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── FEATURED ── */}
      {featured && (
        <section className="py-16 px-6 lg:px-12" style={{ borderBottom: '1px solid rgba(103,6,38,0.1)' }}>
          <div className="max-w-360 mx-auto">
            <Link to={`/blog/${featured.slug}`} className="group grid lg:grid-cols-2 gap-10 items-center">
              <div className="overflow-hidden" style={{ aspectRatio: '16/10', backgroundColor: '#F2E6EA' }}>
                <img src={featured.img} alt={featured.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              </div>
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[10px] tracking-[0.18em] uppercase" style={{ color: '#670626', fontFamily: L }}>[ {featured.category} ]</span>
                  <span className="text-[10px]" style={{ color: 'rgba(26,10,14,0.3)', fontFamily: L }}>{featured.readTime} read</span>
                </div>
                <h2
                  className="font-black uppercase leading-tight mb-6 group-hover:text-[#670626] transition-colors"
                  style={{ fontFamily: D, fontSize: 'clamp(32px, 4vw, 60px)', color: '#1A0A0E' }}
                >
                  {featured.title}
                </h2>
                <p className="text-[14px] leading-relaxed mb-8" style={{ color: 'rgba(26,10,14,0.55)' }}>{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-[11px]" style={{ color: 'rgba(26,10,14,0.35)', fontFamily: L }}>
                  <span className="font-semibold" style={{ color: 'rgba(26,10,14,0.7)' }}>{featured.author}</span>
                  <span>·</span>
                  <span>{featured.date}</span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── GRID ── */}
      {rest.length > 0 && (
        <section className="py-16 px-6 lg:px-12">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: 'rgba(103,6,38,0.1)' }}>
            {rest.map(post => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="group flex flex-col" style={{ backgroundColor: '#FAF8F2' }}>
                <div className="overflow-hidden" style={{ aspectRatio: '16/10', backgroundColor: '#F2E6EA' }}>
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[9px] tracking-[0.18em] uppercase" style={{ color: '#670626', fontFamily: L }}>[ {post.category} ]</span>
                  </div>
                  <h3
                    className="font-black uppercase leading-tight flex-1 group-hover:text-[#670626] transition-colors"
                    style={{ fontFamily: D, fontSize: 'clamp(22px, 2.5vw, 34px)', color: '#1A0A0E' }}
                  >
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between mt-6 text-[10px]" style={{ color: 'rgba(26,10,14,0.3)', fontFamily: L }}>
                    <span>{post.author} · {post.date}</span>
                    <span className="group-hover:text-[#670626] transition-colors">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
