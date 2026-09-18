import { useParams, Link } from 'react-router'

const D = "'Cormorant Garamond', Georgia, serif"
const L = "'Manrope', system-ui, sans-serif"
const B = "Georgia, 'Times New Roman', serif"

const posts: Record<string, { title: string; author: string; date: string; category: string; readTime: string; img: string; content: string[]; relatedSlugs: string[] }> = {
  'conference-trends-2025': {
    title: '7 Trends Reshaping Corporate Conferences in 2025',
    author: 'Priya Mehta', date: 'July 28, 2025', category: 'EVENT PLANNING', readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1472146936668-d987bf0a6e38?w=1400&h=600&fit=crop&auto=format',
    content: [
      'The corporate conference landscape has shifted more in the last five years than in the preceding twenty. What event managers and HR leaders once treated as formulaic — book a hotel ballroom, arrange catering, invite a keynote — no longer satisfies the expectations of attendees who have spent years in back-to-back video calls and have very little patience for passive, poorly designed experiences.',
      '**01 / Intentional Hybrid by Design, Not by Compromise\n\nThe early hybrid events of 2020-21 were largely compromises — a room full of people watching other people on a screen. In 2025, the best hybrid conferences treat remote and in-person audiences as distinct but parallel experiences, each designed specifically for how that audience will engage.',
      '**02 / The End of the Plenary-Heavy Format\n\nAttendee data consistently shows that long plenary sessions generate the lowest engagement scores of any session format. Leading conferences are moving to shorter, more varied formats: 20-minute talks, panel rotations, workshop pods, and structured networking intervals.',
      '**03 / Sustainability as Non-Negotiable\n\nDecarbonisation commitments at the corporate level are flowing downstream into event briefs. Clients are now asking for carbon accounting on events as standard, choosing venues with renewable energy, and eliminating single-use branding materials.',
      '**04 / AI-Powered Matchmaking and Personalisation\n\nThe most valuable thing a conference can do for an attendee is connect them with the right people. AI-powered networking tools are moving from pilot to standard, particularly for conferences of 500+ delegates.',
      '**05 / Wellness as Infrastructure\n\nConference wellness has evolved beyond a yoga session at 7am. Programme designers are now treating rest, movement, and nutritional quality as infrastructure requirements — alongside AV and Wi-Fi.',
      '**06 / Venue as Experience, Not Container\n\nThe era of the anonymous hotel ballroom as the default conference venue is fading. Clients are choosing venues that add intrinsic value to the event narrative — heritage buildings, cultural institutions, and outdoor amphitheatres.',
      '**07 / Measurement Beyond Headcount\n\nConference success metrics are maturing. Beyond registration numbers and satisfaction scores, forward-thinking organisations are tracking knowledge retention, behaviour change metrics, and business pipeline generated during structured networking sessions.',
    ],
    relatedSlugs: ['hybrid-event-tech-stack', 'incentive-travel-roi'],
  },
  'incentive-travel-roi': {
    title: 'Why Incentive Travel Still Delivers the Highest ROI',
    author: 'Rohit Sinha', date: 'June 14, 2025', category: 'CORPORATE CULTURE', readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1770140304098-46700a5c45c8?w=1400&h=600&fit=crop&auto=format',
    content: [
      'Every year, the debate resurfaces: is it more cost-effective to give high performers a cash bonus or to send them on an incentive trip? The data consistently points in one direction — and it\'s not the one most CFOs expect.',
      '**The Trophy Value Effect\n\nCash is fungible. It enters a bank account and disappears into rent or groceries within days. An exceptional travel experience, by contrast, creates what motivation researchers call "trophy value" — a memory that continues to pay emotional dividends long after the trip ends.',
      '**Social Currency and Status Signalling\n\nTop performers want to be seen as top performers. A trip to the Amalfi Coast or a private dinner in a Singapore rooftop restaurant carries social currency that a bonus transfer does not. The ability to tell the story amplifies the perceived value of the reward significantly.',
      '**Retention Impact\n\nStudies by the Incentive Research Foundation show that organisations with structured incentive travel programmes experience 40% lower voluntary turnover among qualifying employees compared to control groups receiving equivalent cash awards.',
      '**Designing for Maximum Impact\n\nThe ROI of an incentive programme is directly correlated with the quality of its design. Programmes that include achievement milestones, peer nomination components, and personalised travel experiences consistently outperform those with a simple "hit the number, win the trip" structure.',
    ],
    relatedSlugs: ['conference-trends-2025', 'southeast-asia-corporate-travel'],
  },
  'southeast-asia-corporate-travel': {
    title: 'Southeast Asia for Corporate Groups: A Planning Guide',
    author: 'Rohit Sinha', date: 'May 30, 2025', category: 'TRAVEL', readTime: '8 min read',
    img: 'https://images.unsplash.com/photo-1770770155448-8461474b4e7a?w=1400&h=600&fit=crop&auto=format',
    content: [
      'Southeast Asia remains the most cost-efficient region in the world for premium corporate group travel — offering five-star infrastructure, exceptional cuisine, and extraordinary cultural experiences at price points that significantly undercut comparable European destinations.',
      '**Singapore: The Anchor City\n\nFor most Indian corporate groups, Singapore serves as the natural anchor — excellent air connectivity, world-class conference infrastructure, a stable regulatory environment, and a sophisticated F&B scene.',
      '**Bangkok: Value and Spectacle\n\nBangkok offers a remarkable combination of value and visual impact. The Chao Phraya riverfront, the Grand Palace, and the city\'s extraordinary restaurant scene deliver experiences that feel genuinely premium at a fraction of Singapore prices.',
      '**Bali: Retreat and Renewal\n\nBali has matured significantly as a corporate retreat destination. The Ubud and Seminyak resort corridors offer purpose-built conference facilities and exceptional team-building activities that work well for offsites of 20-150 people.',
      '**Logistics and Timing\n\nThe optimal window for Southeast Asian group travel is October through February. Group air from Indian metros is most efficient via Singapore as a hub, with regional connectivity handled on SilkAir, Bangkok Airways, or AirAsia.',
    ],
    relatedSlugs: ['incentive-travel-roi', 'goa-corporate-retreats'],
  },
}

const relatedMeta: Record<string, { title: string; img: string; category: string }> = {
  'conference-trends-2025': { title: '7 Trends Reshaping Corporate Conferences in 2025', img: 'https://images.unsplash.com/photo-1472146936668-d987bf0a6e38?w=400&h=250&fit=crop&auto=format', category: 'EVENT PLANNING' },
  'incentive-travel-roi': { title: 'Why Incentive Travel Still Delivers the Highest ROI', img: 'https://images.unsplash.com/photo-1770140304098-46700a5c45c8?w=400&h=250&fit=crop&auto=format', category: 'CORPORATE CULTURE' },
  'hybrid-event-tech-stack': { title: 'Building the Right Tech Stack for Hybrid Events', img: 'https://images.unsplash.com/photo-1785336872226-06bf32ebd7fd?w=400&h=250&fit=crop&auto=format', category: 'EVENT PLANNING' },
  'southeast-asia-corporate-travel': { title: 'Southeast Asia for Corporate Groups', img: 'https://images.unsplash.com/photo-1770770155448-8461474b4e7a?w=400&h=250&fit=crop&auto=format', category: 'TRAVEL' },
  'goa-corporate-retreats': { title: 'Goa Beyond the Beach', img: 'https://images.unsplash.com/photo-1742844552048-410dfdf7b3c7?w=400&h=250&fit=crop&auto=format', category: 'TRAVEL' },
}

function renderParagraph(text: string, i: number) {
  if (text.startsWith('**')) {
    const [bold, ...rest] = text.split('\n')
    return (
      <div key={i} className="mt-12">
        <h3 className="font-black uppercase mb-4" style={{ fontFamily: D, fontSize: 'clamp(24px, 3vw, 40px)', color: '#1A0A0E' }}>
          {bold.replace(/\*\*/g, '')}
        </h3>
        <p className="text-[15px] leading-8" style={{ color: 'rgba(26,10,14,0.55)' }}>{rest.join('\n')}</p>
      </div>
    )
  }
  return <p key={i} className="text-[15px] leading-8" style={{ color: 'rgba(26,10,14,0.55)' }}>{text}</p>
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? posts[slug] : null

  if (!post) return (
    <div className="min-h-screen flex items-center justify-center" style={{ paddingTop: '68px', backgroundColor: '#FAF8F2', fontFamily: B }}>
      <div className="text-center">
        <h1 className="font-black uppercase text-4xl mb-6" style={{ fontFamily: D, color: '#1A0A0E' }}>Article Not Found</h1>
        <Link to="/blog" className="text-[11px] tracking-[0.15em] uppercase" style={{ color: '#670626' }}>← Back to Blog</Link>
      </div>
    </div>
  )

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
            <span>·</span><span>{post.readTime}</span>
          </div>

          <div className="space-y-6">
            {post.content.map((para, i) => renderParagraph(para, i))}
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
      {post.relatedSlugs.length > 0 && (
        <section className="py-16 px-6 lg:px-12" style={{ borderTop: '1px solid rgba(103,6,38,0.1)', backgroundColor: '#EFF5E2' }}>
          <div className="max-w-2xl mx-auto">
            <p className="text-[11px] tracking-[0.22em] uppercase mb-10" style={{ color: '#670626', fontFamily: L }}>[ RELATED ARTICLES ]</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {post.relatedSlugs.map(s => {
                const meta = relatedMeta[s]; if (!meta) return null
                return (
                  <Link key={s} to={`/blog/${s}`} className="group flex flex-col">
                    <div className="overflow-hidden mb-4" style={{ aspectRatio: '16/9', backgroundColor: '#F2E6EA' }}>
                      <img src={meta.img} alt={meta.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
                    </div>
                    <span className="text-[9px] tracking-[0.18em] uppercase mb-2" style={{ color: '#670626', fontFamily: L }}>[ {meta.category} ]</span>
                    <h3 className="font-black uppercase leading-tight group-hover:text-[#670626] transition-colors" style={{ fontFamily: D, fontSize: '22px', color: '#1A0A0E' }}>{meta.title}</h3>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
