export type Service = {
  id: string
  num: string
  /** Short label used in nav lists / tabs */
  title: string
  /** SEO-style page heading + browser title */
  pageTitle: string
  /** Small uppercase tag shown above the heading */
  eyebrow: string
  /** Body copy, rendered as separate paragraphs */
  paragraphs: string[]
  /** Optional short keyword/tag list (awards, travel) */
  keywords?: string[]
  /** Bullet list of what's included */
  features: string[]
  /** Branded photo from /assets/Services */
  img: string
  /** Frequently asked questions, shown as an accordion */
  faqs: { q: string; a: string }[]
}

export const services: Service[] = [
  {
    id: 'conferences', num: '1',
    title: 'CORPORATE CONFERENCES & MEETINGS',
    pageTitle: 'Corporate Conferences & Meetings',
    eyebrow: 'CORPORATE EVENT ',
    img: '/assets/Services/Conferences.png',
    paragraphs: [
      'Zovent is a corporate event management company in India specialising in conferences, business meetings, leadership events, annual meets, dealer meets, seminars and large-scale corporate gatherings.',
      'Our end-to-end conference management services cover event planning, venue sourcing, hospitality, delegate management, audio-visual production, event branding, logistics and on-ground execution.',
      "Whether you're planning a corporate conference, business meeting, MICE event or multi-city corporate event, Zovent brings together strategy, creativity and flawless execution to create an experience that reflects your brand.",
    ],
    features: ['Venue Sourcing & Management: Premium hotels, convention centres and unique venues across India, matched to your event requirements', 'AV & Event Production: Professional audio-visual production, stage design, lighting, LED screens and technical support for seamless presentations and live events.', 'Speaker & Delegate Management: End-to-end coordination for speakers, VIPs, delegates, registrations, hospitality and attendee experience.', 'Conference Registration & On-Ground Support: Smooth registration, help desks, attendee coordination and dedicated event staff throughout your conference.', 'Budget & Vendor Management: Strategic budgeting, vendor sourcing and negotiations to maximise event value without compromising quality.', 'Post-Event Reporting & Analytics: Detailed reporting, feedback analysis and actionable insights to measure event performance and engagement.'],
    faqs: [
      { q: 'How far in advance should we book a corporate conference?', a: 'We recommend 8–12 weeks for domestic conferences and 12–16 weeks for large-scale or international events, to secure preferred venues and speaker availability.' },
      { q: 'Can you manage hybrid (in-person + virtual) conferences?', a: 'Yes — we handle livestreaming, virtual delegate platforms and hybrid AV setups alongside on-ground execution.' },
      { q: 'Do you handle venue sourcing across multiple cities?', a: "We work with a vetted network of convention centres and five-star venues across India, so multi-city or roadshow-style conferences are handled by one team." },
      { q: "What's included in your conference management fee?", a: 'Planning, vendor coordination, on-ground staffing and reporting are bundled; venue, catering and production costs are billed at actuals with full transparency.' },
      { q: 'Can you accommodate last-minute changes to delegate count?', a: 'Yes, within reason — our vendor contracts are built with flexibility for headcount shifts up to a few days before the event.' },
    ],
  },
  {
    id: 'mice', num: '2',
    title: 'MICE EVENTS',
    pageTitle: 'M.I.C.E.',
    eyebrow: 'END-TO-END MICE MANAGEMENT',
    img: '/assets/Services/M.I.C.E. (1).png',
    paragraphs: [
      'Zovent is a MICE event management company delivering end-to-end Meetings, Incentives, Conferences and Exhibitions solutions across India and international destinations.',
      'Our MICE services include corporate meetings, incentive travel, conference management, exhibition management, destination management, group travel, corporate hospitality, hotel bookings, flight coordination, ground transportation and event production.',
      "Whether you're planning a corporate incentive trip, international conference, dealer meet, leadership meeting, exhibition or corporate group tour, our team manages the complete experience — from planning and budgeting to travel, hospitality and on-ground execution.",
    ],
    features: ['Corporate Meetings & Conferences: End-to-end planning and execution for meetings, conferences, seminars and leadership events.', 'Incentive Travel & Group Trips: Curated incentive tours, employee rewards and group travel experiences built around your goals.', 'Destination Management (DMC): Local expertise, venues, activities, transportation and experiences across India and global destinations.', 'Exhibition & Trade Show Management: Exhibition planning, stall coordination, branding, logistics and on-ground event management.', 'Flights, Hotels & Ground Logistics: Group air travel, accommodation, transfers, transportation and complete travel coordination.', 'Experiential Programme Design: Themed experiences, team activities, entertainment and customised itineraries that make your programme memorable.'],
    faqs: [
      { q: "What's the difference between MICE and a regular corporate event?", a: 'MICE specifically covers Meetings, Incentives, Conferences and Exhibitions — programmes tied to business objectives like sales performance, partner relations or industry visibility, often involving travel and multi-day logistics.' },
      { q: 'Do you manage international MICE programmes?', a: 'Yes — we handle destination selection, visas, group flights and on-ground DMC coordination for MICE programmes across Asia, the Middle East and Europe.' },
      { q: 'How do you price a MICE programme?', a: 'Pricing is based on delegate count, destination, duration and inclusions (stay, transfers, activities). We provide a detailed per-delegate cost breakdown before confirmation.' },
      { q: 'Can you handle group sizes of 500+?', a: "Yes — we've managed MICE groups from 20 to 2,000+ delegates, with dedicated on-ground teams scaled to group size." },
      { q: 'What information do you need from us to start planning?', a: 'Just your objective, target dates, approximate delegate count and budget range — we take it from there.' },
    ],
  },
  {
    id: 'offsites', num: '3',
    title: 'OFFSITES & TEAM BUILDING',
    pageTitle: 'Corporate Offsites & Team Building',
    eyebrow: 'RETREAT. REFLECT. RECONNECT.',
    img: '/assets/Services/Offsites.png',
    paragraphs: [
      'Plan memorable corporate offsites, team-building activities, leadership retreats and corporate team outings with Zovent. End-to-end planning across India and international destinations.',
      'Looking for a corporate offsite partner in India? Zovent plans and executes customised corporate retreats, team-building programmes, leadership offsites and employee engagement experiences across India and international destinations. From destination selection and accommodation to activities, entertainment, food & beverage and on-ground logistics, our team takes care of every detail.',
    ],
    features: ['Corporate Offsite Planning: End-to-end planning for productive, engaging and memorable corporate offsites.', 'Leadership Retreats & Strategic Offsites: Thoughtfully curated retreats designed for leadership alignment, strategy and meaningful conversations', 'Team-Building Activities: Creative team-building experiences that encourage collaboration, connection and a little healthy competition.', 'Corporate Team Outings: From adventure getaways to relaxed resort escapes, we create team outings that everyone looks forward to.', 'Wellness & Experiential Programmes: Mindful, immersive experiences designed to refresh teams and boost employee engagement.', 'Resort & Destination Sourcing: Handpicked resorts, hotels and destinations that match your team, objectives and budget.', 'F&B, Travel & Logistics Management: Flights, transfers, accommodation, meals, activities and on-ground coordination — all handled seamlessly.'],
    faqs: [
      { q: 'How long should a typical corporate offsite run?', a: 'Most offsites run 2–3 days. Shorter 1-day formats work well for quarterly check-ins; longer 4–5 day formats suit annual leadership retreats.' },
      { q: 'Can you tailor offsites for fully remote teams?', a: 'Yes — we design offsites specifically to help distributed teams build in-person rapport, with a strong focus on structured connection activities.' },
      { q: 'Do you provide facilitators for strategy sessions?', a: 'We can bring in experienced external facilitators for leadership offsites where objective, structured discussion is important.' },
      { q: "What's a realistic budget range for a team offsite?", a: "It varies widely by destination and group size — from a modest per-person cost for a nearby hill-station retreat to a significantly higher spend for premium international offsites. We'll model options against your budget." },
      { q: 'Can offsites include both work sessions and leisure time?', a: 'Absolutely — most of our offsite itineraries deliberately balance focused work blocks with team-building and downtime.' },
    ],
  },
  {
    id: 'activations', num: '4',
    title: 'BRAND ACTIVATIONS',
    pageTitle: 'Brand Activation ',
    eyebrow: 'YOUR BRAND DESERVES MORE THAN AN EVENT. IT DESERVES AN EXPERIENCE.',
    img: '/assets/Services/Brand activation.png',
    paragraphs: [
      'Zovent is a brand activation and experiential marketing agency creating product launches, corporate events, pop-ups and immersive brand experiences across India and international destinations.',
      "At Zovent, we create brand activation events, experiential marketing campaigns and corporate experiences that make people stop, engage and remember. Whether you're launching a new product, celebrating a milestone or creating a consumer-facing brand experience, we combine creative ideas with flawless event execution to deliver experiences that move people and strengthen your brand.",
    ],
    features: ['Product Launches & Brand Events: Create anticipation and impact with professionally managed product launches, unveilings and brand reveal events', 'Experiential Marketing: Design immersive brand experiences that encourage audiences to interact, connect and engage with your brand.', 'Corporate Brand Events: From milestone celebrations to annual events, we create experiences that bring your brand, people and story together.', 'Pop-Up Brand Experiences: Take your brand beyond traditional spaces with creative pop-ups, installations and interactive experiences.', 'Press & Media Events: From media previews to influencer events, we manage the experience, production and guest journey from start to finish.', 'Experiential Brand Activations: Build meaningful audience connections through interactive concepts, entertainment, technology and creative storytelling'],
    faqs: [
      { q: 'What is the typical timeline for a brand activation?', a: 'Depending on scale, 4–10 weeks from concept to execution — larger multi-city activations need more lead time for permits and logistics.' },
      { q: 'Can you handle influencer or media components?', a: 'Yes — we coordinate media previews, influencer invites and content capture alongside the core activation.' },
      { q: 'Do you design the creative concept or just execute it?', a: "Both — our team can develop the creative concept from scratch, or execute against a concept your internal or agency team has already designed." },
      { q: 'Can activations run across multiple cities simultaneously?', a: "Yes — we've run synchronised multi-city activations with central creative direction and local execution teams." },
      { q: 'How do you measure activation success?', a: 'We track footfall, engagement, media reach and post-event sentiment depending on your objectives, and share a wrap report.' },
    ],
  },
  {
    id: 'awards', num: '5',
    title: 'AWARD CEREMONIES & RECOGNITION',
    pageTitle: 'Award Ceremonies & Recognition',
    eyebrow: 'CELEBRATE EXCELLENCE WITH DISTINCTION',
    img: '/assets/Services/Award ceremonies.png',
    paragraphs: [
      'Celebrations of achievement, thoughtfully designed and flawlessly executed — from elegant award ceremonies and gala dinners to corporate recognition and milestone events.',
    ],
    keywords: ['Award Ceremony Management', 'Corporate Award Ceremonies', 'Awards Night Management', 'Corporate Recognition Events', 'Employee Recognition Events', 'Gala Dinner Management', 'Corporate Awards', 'Employee Appreciation Events', 'Leadership Recognition Events', 'Trophy Design', 'Award Event Management'],
    features: ['Gala Dinner & Awards Night Management: End-to-end planning and execution of sophisticated corporate award nights and gala dinners.', 'Trophy Design & Fabrication: Custom awards, trophies and recognition pieces designed to reflect your brand and occasion.', 'Host & Entertainment Booking: Professional hosts, performers and entertainment curated to elevate the guest experience.', 'Award Category & Programme Consulting: Strategic support for award categories, nomination formats and a seamless event programme.', 'Nomination & Shortlisting Platforms: Efficient digital solutions to manage nominations, entries, judging and shortlisting.', 'Video Production & Highlight Reels: Powerful award films, winner AVs and event highlight videos that capture the moments worth remembering.'],
    faqs: [
      { q: 'How many guests can you accommodate for an award night?', a: "We've delivered award ceremonies from intimate 50-guest dinners to 1,000+ guest galas." },
      { q: 'Do you help design the award categories and nomination process?', a: 'Yes — we offer consulting on award categories, and can set up a digital nomination and judging platform.' },
      { q: 'Can you produce video content for the ceremony?', a: 'Yes — winner AVs, highlight reels and opening films are part of our standard production offering.' },
      { q: 'How far in advance should we start planning an awards night?', a: '8-10 weeks is typical, allowing time for venue booking, trophy fabrication and content production.' },
      { q: 'Do you handle entertainment and hosting?', a: 'Yes — we curate and book hosts, performers and entertainment suited to your audience and tone.' },
    ],
  },
  {
    id: 'travel', num: '6',
    title: 'CORPORATE  TRAVEL & HOLIDAYS ',
    pageTitle: 'Corporate Travel  & Holidays',
    eyebrow: 'TRAVEL THAT WORKS AROUND YOU.',
    img: '/assets/Services/Corporate Luxury Travel.png',
    paragraphs: ['From seamless business travel to bespoke group getaways, Zovent manages every journey with precision, comfort and care. We curate corporate travel, incentive trips, luxury holidays and group travel experiences across India and international destinations — tailored around your people, purpose and preferences.',],
    keywords: ['CUSTOM ITINERARIES', 'GROUP TRAVEL', 'SOLO TRAVEL', 'PAX TRIPS', 'INCENTIVE TRAVEL', 'BUSINESS TRAVEL'],
    features: ['Corporate Travel Management (CTM): End-to-end business travel solutions including flights, hotels, transfers, travel coordination and traveller support.', 'Group & Incentive Travel: Reward your teams with thoughtfully planned incentive trips and group travel experiences designed around your goals.', 'Luxury Hotels, Villas & Resorts: Access carefully selected premium hotels, luxury resorts and private villas for business and leisure travel.', 'International Holiday Packages: Curated international travel packages with customised itineraries, stays, experiences and seamless logistics.', 'Visa & Travel Documentation Assistance: Support with visa processing, documentation and essential travel requirements for international journeys.', '24/7 In-Trip Support: Reliable on-ground assistance throughout the journey, helping travellers stay comfortable and connected'],
    faqs: [
      { q: 'Do you handle both domestic and international corporate travel?', a: 'Yes — from routine domestic business trips to international incentive programmes and luxury group travel.' },
      { q: 'Can you manage visa processing for international trips?', a: 'Yes, we assist with visa documentation and processing as part of our international travel coordination.' },
      { q: 'Is 24/7 support available during trips?', a: 'Yes — our team provides round-the-clock in-trip support for group and individual travellers.' },
      { q: 'Can you build custom itineraries for small groups or individuals?', a: 'Yes — alongside group travel management, we design fully custom itineraries for solo and small-group trips.' },
      { q: 'How do you handle last-minute travel changes?', a: 'Our travel desk handles rebookings, cancellations and itinerary changes directly with airline and hotel partners to minimise disruption.' },
    ],
  },
]
