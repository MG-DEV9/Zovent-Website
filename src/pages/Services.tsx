import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router'

const D = "'Cormorant Garamond', Georgia, serif"
const B = "'Manrope', system-ui, sans-serif"
const Bp = "Georgia, 'Times New Roman', serif"

const SVC_BG = 'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=1800&h=900&fit=crop&auto=format'

const services = [
  {
    id: 'conferences', num: '01',
    title: 'CORPORATE CONFERENCES\n& MEETINGS',
    tagline: 'WHERE IDEAS MEET STRATEGY',
    img: 'https://images.unsplash.com/photo-1785336872226-06bf32ebd7fd?w=900&h=600&fit=crop&auto=format',
    desc: 'Whether it’s a leadership meeting, annual conference, dealer meet or a multi-city corporate gathering, Zovent delivers end-to-end conference and meeting management designed around your objectives. From venue sourcing and event production to delegate management, hospitality and on-ground coordination, our team ensures your corporate event runs seamlessly from the first brief to the final wrap.',
    features: ['Venue Sourcing & Management: Premium hotels, convention centres and unique venues across India, matched to your event requirements', 'AV & Event Production: Professional audio-visual production, stage design, lighting, LED screens and technical support for seamless presentations and live events.', 'Speaker & Delegate Management: End-to-end coordination for speakers, VIPs, delegates, registrations, hospitality and attendee experience.', ' Conference Registration & On-Ground Support: Smooth registration, help desks, attendee coordination and dedicated event staff throughout your conference.', 'Budget & Vendor Management: Strategic budgeting, vendor sourcing and negotiations to maximise event value without compromising quality.', 'Post-Event Reporting & Analytics: Detailed reporting, feedback analysis and actionable insights to measure event performance and engagement.'],
  },
  {
    id: 'mice', num: '02',
    title: 'MICE EVENTS',
    tagline: 'MEETINGS · INCENTIVES · CONFERENCES · EXHIBITIONS',
    img: 'https://images.unsplash.com/photo-1770770155448-8461474b4e7a?w=900&h=600&fit=crop&auto=format',
    desc: 'Our MICE division delivers comprehensive programmes across all four pillars — from international incentive trips to global exhibition management and product launches.',
    features: ['Corporate Meetings & Conferences: End-to-end planning and execution for meetings, conferences, seminars and leadership events.', 'Incentive Travel & Group Trips: Curated incentive tours, employee rewards and group travel experiences built around your goals.', 'Destination Management (DMC): Local expertise, venues, activities, transportation and experiences across India and global destinations.', 'Exhibition & Trade Show Management: Exhibition planning, stall coordination, branding, logistics and on-ground event management.', 'Flights, Hotels & Ground Logistics: Group air travel, accommodation, transfers, transportation and complete travel coordination.', 'Experiential Programme Design: Themed experiences, team activities, entertainment and customised itineraries that make your programme memorable.'],
  },
  {
    id: 'offsites', num: '03',
    title: 'OFFSITES &\nTEAM BUILDING',
    tagline: 'RETREAT. REFLECT. RECONNECT.',
    img: 'https://images.unsplash.com/photo-1472146936668-d987bf0a6e38?w=900&h=600&fit=crop&auto=format',
    desc: "Purposefully designed offsite programmes that combine strategic sessions with curated team experiences. We believe the best team-building happens when nobody realises it's happening.",
    features: ['Corporate Offsite Planning: End-to-end planning for productive, engaging and memorable corporate offsites.', 'Leadership Retreats & Strategic Offsites: Thoughtfully curated retreats designed for leadership alignment, strategy and meaningful conversations', 'Team-Building Activities: Creative team-building experiences that encourage collaboration, connection and a little healthy competition.', 'Corporate Team Outings: From adventure getaways to relaxed resort escapes, we create team outings that everyone looks forward to.', 'Wellness & Experiential Programmes: Mindful, immersive experiences designed to refresh teams and boost employee engagement.', ' Resort & Destination Sourcing: Handpicked resorts, hotels and destinations that match your team, objectives and budget.', 'F&B, Travel & Logistics Management: Flights, transfers, accommodation, meals, activities and on-ground coordination — all handled seamlessly.'],
  },
  {
    id: 'activations', num: '04',
    title: 'BRAND\nACTIVATIONS',
    tagline: 'CREATE MOMENTS. BUILD BRAND.',
    img: 'https://images.unsplash.com/photo-1783314860827-c64547042e15?w=900&h=600&fit=crop&auto=format',
    desc: 'Strategic brand activation events that build awareness, engage audiences, and drive measurable business outcomes. We bridge the gap between live experience and campaign objectives.',
    features: ['Product Launches & Brand Events: Create anticipation and impact with professionally managed product launches, unveilings and brand reveal events', 'Experiential Marketing: Design immersive brand experiences that encourage audiences to interact, connect and engage with your brand.', 'Corporate Brand Events: From milestone celebrations to annual events, we create experiences that bring your brand, people and story together.', 'Pop-Up Brand Experiences: Take your brand beyond traditional spaces with creative pop-ups, installations and interactive experiences.', ' Press & Media Events: From media previews to influencer events, we manage the experience, production and guest journey from start to finish.', 'Experiential Brand Activations: Build meaningful audience connections through interactive concepts, entertainment, technology and creative storytelling'],
  },
  {
    id: 'awards', num: '05',
    title: 'AWARD CEREMONIES\n& RECOGNITION',
    tagline: 'CELEBRATE EXCELLENCE WITH DISTINCTION',
    img: 'https://images.unsplash.com/photo-1770140304066-6db58fe18543?w=900&h=600&fit=crop&auto=format',
    desc: 'We design recognition events that genuinely honour achievement — from annual sales award galas to employee appreciation dinners and leadership felicitations.',
    features: ['Gala Dinner & Awards Night Management End-to-end planning and execution of sophisticated corporate award nights and gala dinners.', 'Trophy Design & Fabrication Custom awards, trophies and recognition pieces designed to reflect your brand and occasion.', 'Host & Entertainment Booking Professional hosts, performers and entertainment curated to elevate the guest experience.', 'Award Category & Programme Consulting Strategic support for award categories, nomination formats and a seamless event programme.', 'Nomination & Shortlisting Platforms Efficient digital solutions to manage nominations, entries, judging and shortlisting.', 'Video Production & Highlight Reels Powerful award films, winner AVs and event highlight videos that capture the moments worth remembering.'],
  },
  {
    id: 'travel', num: '06',
    title: 'CORPORATE &\nLUXURY TRAVEL',
    tagline: 'EVERY JOURNEY, PERFECTED.',
    img: 'https://images.unsplash.com/photo-1742844552048-410dfdf7b3c7?w=900&h=600&fit=crop&auto=format',
    desc: 'Zovent Travel handles the full spectrum of corporate travel — from routine business travel management to bespoke luxury group itineraries across Asia, Europe, and beyond.',
    features: [' Corporate Travel Management (CTM) End-to-end business travel solutions including flights, hotels, transfers, travel coordination and traveller support.', 'Group & Incentive Travel Reward your teams with thoughtfully planned incentive trips and group travel experiences designed around your goals.', 'Luxury Hotels, Villas & Resorts Access carefully selected premium hotels, luxury resorts and private villas for business and leisure travel.', 'International Holiday Packages Curated international travel packages with customised itineraries, stays, experiences and seamless logistics.', 'Visa & Travel Documentation Assistance Support with visa processing, documentation and essential travel requirements for international journeys.', '24/7 In-Trip Support Reliable on-ground assistance throughout the journey, helping travellers stay comfortable and connected'],
  },
]

export default function Services() {
  const [active, setActive] = useState('conferences')
  const location = useLocation()

  useEffect(() => {
    const hash = location.hash.replace('#', '')
    if (hash && services.find(s => s.id === hash)) {
      setActive(hash)
      requestAnimationFrame(() => {
        setTimeout(() => document.getElementById('detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
      })
    }
  }, [location.hash])

  const svc = services.find(s => s.id === active)!

  return (
    <div style={{ backgroundColor: '#FAF8F2', color: '#1A0A0E', fontFamily: Bp }}>

      {/* ── HERO ── */}
      <section
        className="relative flex flex-col justify-end px-6 lg:px-12 overflow-hidden"
        style={{ minHeight: '60vh', paddingTop: '68px', backgroundColor: '#670626', borderBottom: '1px solid rgba(250,248,242,0.08)' }}
      >
        <img
          src={SVC_BG}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.2, mixBlendMode: 'luminosity' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #670626 25%, rgba(103,6,38,0.65) 65%, rgba(103,6,38,0.35) 100%)' }} />
        <div className="relative z-10 max-w-[1440px] mx-auto pb-16 w-full">
          <p className="text-[11px] tracking-[0.22em] uppercase mb-5" style={{ color: '#BAD797', fontFamily: B }}>[ SERVICES ]</p>
          <h1 className="font-black uppercase leading-none mb-6" style={{ fontFamily: D, fontSize: 'clamp(56px, 10vw, 128px)', color: '#FAF8F2' }}>
            WHAT WE DO.
          </h1>
          <p className="text-[15px] max-w-lg leading-relaxed" style={{ color: 'rgba(250,248,242,0.55)', fontFamily: Bp }}>
            Six integrated service lines. One dedicated team. Delivering corporate experiences across India and internationally.
          </p>
        </div>
      </section>

      {/* ── SERVICE TABS ── */}
      <div style={{ backgroundColor: '#FAF8F2', borderBottom: '1px solid rgba(103,6,38,0.1)' }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex overflow-x-auto">
          {services.map(s => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className="flex-shrink-0 px-0 mr-8 py-5 text-[10px] tracking-[0.18em] uppercase font-medium border-b-2 transition-all"
              style={{
                borderColor: active === s.id ? '#670626' : 'transparent',
                color: active === s.id ? '#670626' : 'rgba(26,10,14,0.4)',
                fontFamily: B,
                background: 'none',
              }}
            >
              {s.num} / {s.id.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* ── ACTIVE DETAIL ── */}
      <section id="detail" className="py-20 px-6 lg:px-12" style={{ backgroundColor: '#FAF8F2' }}>
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[11px] tracking-[0.18em] uppercase mb-5" style={{ color: '#670626', fontFamily: B }}>
              [ {svc.tagline} ]
            </p>
            <h2
              className="font-black uppercase leading-none mb-8"
              style={{ fontFamily: D, fontSize: 'clamp(40px, 5vw, 80px)', color: '#1A0A0E' }}
            >
              {svc.title.replace('\n', ' ')}
            </h2>
            <p className="text-[14px] leading-relaxed mb-10" style={{ color: 'rgba(26,10,14,0.55)', fontFamily: Bp }}>{svc.desc}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {svc.features.map(f => (
                <div key={f} className="flex gap-3 items-start">
                  <span className="flex-shrink-0 text-xs mt-0.5" style={{ color: '#670626' }}>◆</span>
                  <span className="text-[13px]" style={{ color: 'rgba(26,10,14,0.65)', fontFamily: Bp }}>{f}</span>
                </div>
              ))}
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-7 py-3.5 text-[11px] tracking-[0.15em] uppercase font-semibold border transition-all"
              style={{ borderColor: 'rgba(103,6,38,0.25)', color: '#1A0A0E', fontFamily: B }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#670626'; (e.currentTarget as HTMLElement).style.borderColor = '#670626'; (e.currentTarget as HTMLElement).style.color = '#FAF8F2' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(103,6,38,0.25)'; (e.currentTarget as HTMLElement).style.color = '#1A0A0E' }}
            >
              [ ENQUIRE ] →
            </Link>
          </div>

          <div className="overflow-hidden" style={{ aspectRatio: '4/3', backgroundColor: '#F2E6EA' }}>
            <img src={svc.img} alt={svc.title} className="w-full h-full object-cover opacity-80" />
          </div>
        </div>
      </section>

      {/* ── ALL SERVICES LIST ── */}
      <section
        className="px-6 lg:px-12 pb-20"
        style={{ borderTop: '1px solid rgba(103,6,38,0.1)', backgroundColor: '#FAF8F2' }}
      >
        <div className="max-w-[1440px] mx-auto pt-16">
          <p className="text-[11px] tracking-[0.22em] uppercase mb-10" style={{ color: '#670626', fontFamily: B }}>[ ALL SERVICES ]</p>
          <div style={{ borderTop: '1px solid rgba(103,6,38,0.1)' }}>
            {services.map((s, i) => (
              <button
                key={s.id}
                onClick={() => { setActive(s.id); document.getElementById('detail')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="group w-full flex items-center justify-between py-7 text-left transition-all"
                style={{ borderBottom: '1px solid rgba(103,6,38,0.1)', backgroundColor: i % 2 === 0 ? '#FAF8F2' : '#bad7979f' }}
              >
                <div className="flex items-center gap-8">
                  <span className="text-[11px] flex-shrink-0" style={{ color: 'rgba(26,10,14,0.25)', fontFamily: B }}>{s.num} /</span>
                  <span
                    className="font-black uppercase leading-none transition-colors"
                    style={{ fontFamily: D, fontSize: 'clamp(24px, 3.5vw, 48px)', color: active === s.id ? '#670626' : '#1A0A0E' }}
                  >
                    {s.title.replace('\n', ' ')}
                  </span>
                </div>
                <span className="transition-all text-2xl group-hover:translate-x-1" style={{ color: active === s.id ? '#670626' : 'rgba(26,10,14,0.2)' }}>→</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
