import type { ReactNode } from 'react'
import { useParams, Link } from 'react-router'
import { getPost, getRelated, type ContentBlock } from '../data/blog'

const D = "'Cormorant Garamond', Georgia, serif"
const L = "'Manrope', system-ui, sans-serif"
const B = "Georgia, 'Times New Roman', serif"

const P_STYLE = { color: 'rgba(26,10,14,0.55)' } as const

/** Renders **bold**, *italic* and [text](url) markdown segments within a line of text. */
function renderInline(text: string): ReactNode {
  const parts: ReactNode[] = []
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\)/g
  let last = 0
  let match: RegExpExecArray | null
  let key = 0

  while ((match = re.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index))
    if (match[1] !== undefined) {
      parts.push(<strong key={key++} style={{ color: '#1A0A0E' }}>{match[1]}</strong>)
    } else if (match[2] !== undefined) {
      parts.push(<em key={key++}>{match[2]}</em>)
    } else if (match[3] !== undefined) {
      const to = match[4]
      parts.push(
        to.startsWith('/')
          ? <Link key={key++} to={to} style={{ color: '#670626', textDecoration: 'underline' }}>{match[3]}</Link>
          : <a key={key++} href={to} target="_blank" rel="noopener noreferrer" style={{ color: '#670626', textDecoration: 'underline' }}>{match[3]}</a>,
      )
    }
    last = re.lastIndex
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 key={i} className="font-black uppercase mt-14 mb-5" style={{ fontFamily: D, fontSize: 'clamp(26px, 3.2vw, 44px)', color: '#1A0A0E' }}>
          {block.text}
        </h2>
      )
    case 'h3':
      return (
        <h3 key={i} className="font-black uppercase mt-10 mb-3" style={{ fontFamily: D, fontSize: 'clamp(20px, 2.4vw, 28px)', color: '#670626' }}>
          {block.text}
        </h3>
      )
    case 'p':
      return <p key={i} className="text-[15px] leading-8" style={P_STYLE}>{renderInline(block.text)}</p>
    case 'ul':
      return (
        <ul key={i} className="space-y-3 my-6">
          {block.items.map((item, j) => (
            <li key={j} className="flex gap-3 items-start text-[14px] leading-7" style={P_STYLE}>
              <span className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full" style={{ backgroundColor: '#670626' }} />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol key={i} className="space-y-3 my-6">
          {block.items.map((item, j) => (
            <li key={j} className="flex gap-3 items-start text-[14px] leading-7" style={P_STYLE}>
              <span className="flex-shrink-0 font-semibold" style={{ color: '#670626', fontFamily: L, fontSize: '12px' }}>{String(j + 1).padStart(2, '0')}</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      )
    case 'table':
      return (
        <div key={i} className="my-8 overflow-x-auto">
          <table className="w-full text-left text-[13px]" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(103,6,38,0.25)' }}>
                {block.headers.map((h, j) => (
                  <th key={j} className="py-3 pr-6 uppercase tracking-[0.1em]" style={{ fontFamily: L, fontSize: '10px', color: '#670626' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, j) => (
                <tr key={j} style={{ borderBottom: '1px solid rgba(103,6,38,0.1)' }}>
                  {row.map((cell, k) => (
                    <td key={k} className="py-3 pr-6" style={P_STYLE}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'cta':
      return (
        <p key={i} className="text-[15px] leading-8 mt-10 italic" style={{ ...P_STYLE, borderTop: '1px solid rgba(103,6,38,0.1)', paddingTop: '2rem' }}>
          {renderInline(block.text)}
        </p>
      )
  }
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPost(slug) : undefined

  if (!post) return (
    <div className="min-h-screen flex items-center justify-center" style={{ paddingTop: '68px', backgroundColor: '#FAF8F2', fontFamily: B }}>
      <div className="text-center">
        <h1 className="font-black uppercase text-4xl mb-6" style={{ fontFamily: D, color: '#1A0A0E' }}>Article Not Found</h1>
        <Link to="/blog" className="text-[11px] tracking-[0.15em] uppercase" style={{ color: '#670626' }}>← Back to Blog</Link>
      </div>
    </div>
  )

  const related = getRelated(post)

  return (
    <div style={{ backgroundColor: '#FAF8F2', color: '#1A0A0E', fontFamily: B }}>

      {/* Hero image */}
      <div style={{ paddingTop: '68px', backgroundColor: '#F2E6EA' }}>
        <div style={{ aspectRatio: '21/8', maxHeight: '560px', overflow: 'hidden' }}>
          <img src={post.img} alt={post.title} className="w-full h-full object-cover opacity-60" />
        </div>
      </div>

      {/* Article */}
      <article className="py-16 px-6 lg:px-12">
        <div className="max-w-2xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase mb-8" style={{ color: 'rgba(26,10,14,0.3)', fontFamily: L }}>
            <Link to="/blog" className="hover:text-[#670626] transition-colors">Blog</Link>
            <span>/</span>
            <span style={{ color: '#670626' }}>{post.category}</span>
          </div>

          <span className="text-[10px] tracking-[0.18em] uppercase px-3 py-1 inline-block mb-6" style={{ border: '1px solid rgba(103,6,38,0.3)', color: '#670626', fontFamily: L }}>
            [ {post.category} ]
          </span>

          <h1 className="font-black uppercase leading-tight mb-8" style={{ fontFamily: D, fontSize: 'clamp(36px, 5vw, 72px)', color: '#1A0A0E' }}>
            {post.title}
          </h1>

          <div
            className="flex items-center gap-4 text-[11px] mb-14 pb-10"
            style={{ color: 'rgba(26,10,14,0.35)', borderBottom: '1px solid rgba(103,6,38,0.1)', fontFamily: L }}
          >
            <span className="font-semibold" style={{ color: 'rgba(26,10,14,0.6)' }}>{post.author}</span>
            <span>·</span><span>{post.date}</span>
            <span>·</span><span>{post.readTime} read</span>
          </div>

          <div>
            {post.content.map((block, i) => renderBlock(block, i))}
          </div>

          {/* Author */}
          <div
            className="mt-16 p-6 flex gap-4 items-start"
            style={{ backgroundColor: '#F2E6EA', border: '1px solid rgba(103,6,38,0.1)' }}
          >
            <div className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center font-black text-lg" style={{ backgroundColor: '#670626', color: '#FAF8F2', fontFamily: D }}>
              {post.author[0]}
            </div>
            <div>
              <p className="font-semibold text-sm mb-1" style={{ fontFamily: L, color: '#1A0A0E' }}>{post.author}</p>
              <p className="text-[12px]" style={{ color: 'rgba(26,10,14,0.4)' }}>Senior Event Strategist at Zovent with 10+ years designing large-scale corporate events and MICE programmes across Asia.</p>
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 px-6 lg:px-12" style={{ borderTop: '1px solid rgba(103,6,38,0.1)', backgroundColor: '#EFF5E2' }}>
          <div className="max-w-2xl mx-auto">
            <p className="text-[11px] tracking-[0.22em] uppercase mb-10" style={{ color: '#670626', fontFamily: L }}>[ RELATED ARTICLES ]</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map(r => (
                <Link key={r.slug} to={`/blog/${r.slug}`} className="group flex flex-col">
                  <div className="overflow-hidden mb-4" style={{ aspectRatio: '16/9', backgroundColor: '#F2E6EA' }}>
                    <img src={r.img} alt={r.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
                  </div>
                  <span className="text-[9px] tracking-[0.18em] uppercase mb-2" style={{ color: '#670626', fontFamily: L }}>[ {r.category} ]</span>
                  <h3 className="font-black uppercase leading-tight group-hover:text-[#670626] transition-colors" style={{ fontFamily: D, fontSize: '22px', color: '#1A0A0E' }}>{r.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
