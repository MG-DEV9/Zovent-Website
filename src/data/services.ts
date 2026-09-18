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
}

export const services: Service[] = [
  {
    id: 'conferences', num: '01',
    title: 'CORPORATE CONFERENCES & MEETINGS',
    pageTitle: 'Corporate Conferences & Meetings',
    eyebrow: 'CORPORATE EVENT & CONFERENCE MANAGEMENT',
    img: '/assets/Services/Conferences.png',
    paragraphs: [
      'Zovent is a corporate event management company in India specialising in conferences, business meetings, leadership events, annual meets, dealer meets, seminars and large-scale corporate gatherings.',
      'Our end-to-end conference management services cover event planning, venue sourcing, hospitality, delegate management, audio-visual production, event branding, logistics and on-ground execution.',
      "Whether you're planning a corporate conference, business meeting, MICE event or multi-city corporate event, Zovent brings together strategy, creativity and flawless execution to create an experience that reflects your brand.",
    ],
    features: ['Venue Sourcing & Management: Premium hotels, convention centres and unique venues across India, matched to your event requirements', 'AV & Event Production: Professional audio-visual production, stage design, lighting, LED screens and technical support for seamless presentations and live events.', 'Speaker & Delegate Management: End-to-end coordination for speakers, VIPs, delegates, registrations, hospitality and attendee experience.', 'Conference Registration & On-Ground Support: Smooth registration, help desks, attendee coordination and dedicated event staff throughout your conference.', 'Budget & Vendor Management: Strategic budgeting, vendor sourcing and negotiations to maximise event value without compromising quality.', 'Post-Event Reporting & Analytics: Detailed reporting, feedback analysis and actionable insights to measure event performance and engagement.'],
  },
  {
    id: 'mice', num: '02',
    title: 'MICE EVENTS',
    pageTitle: 'MICE Event Management Company in India | Corporate MICE',
    eyebrow: 'END-TO-END MICE MANAGEMENT',
    img: '/assets/Services/M.I.C.E. (1).png',
    paragraphs: [
      'Zovent is a MICE event management company delivering end-to-end Meetings, Incentives, Conferences and Exhibitions solutions across India and international destinations.',
      'Our MICE services include corporate meetings, incentive travel, conference management, exhibition management, destination management, group travel, corporate hospitality, hotel bookings, flight coordination, ground transportation and event production.',
      "Whether you're planning a corporate incentive trip, international conference, dealer meet, leadership meeting, exhibition or corporate group tour, our team manages the complete experience — from planning and budgeting to travel, hospitality and on-ground execution.",
    ],
    features: ['Corporate Meetings & Conferences: End-to-end planning and execution for meetings, conferences, seminars and leadership events.', 'Incentive Travel & Group Trips: Curated incentive tours, employee rewards and group travel experiences built around your goals.', 'Destination Management (DMC): Local expertise, venues, activities, transportation and experiences across India and global destinations.', 'Exhibition & Trade Show Management: Exhibition planning, stall coordination, branding, logistics and on-ground event management.', 'Flights, Hotels & Ground Logistics: Group air travel, accommodation, transfers, transportation and complete travel coordination.', 'Experiential Programme Design: Themed experiences, team activities, entertainment and customised itineraries that make your programme memorable.'],
  },
  {
    id: 'offsites', num: '03',
    title: 'OFFSITES & TEAM BUILDING',
    pageTitle: 'Corporate Offsites & Team Building',
    eyebrow: 'RETREAT. REFLECT. RECONNECT.',
    img: '/assets/Services/Offsites.png',
    paragraphs: [
      'Plan memorable corporate offsites, team-building activities, leadership retreats and corporate team outings with Zovent. End-to-end planning across India and international destinations.',
      'Looking for a corporate offsite partner in India? Zovent plans and executes customised corporate retreats, team-building programmes, leadership offsites and employee engagement experiences across India and international destinations. From destination selection and accommodation to activities, entertainment, food & beverage and on-ground logistics, our team takes care of every detail.',
    ],
    features: ['Corporate Offsite Planning: End-to-end planning for productive, engaging and memorable corporate offsites.', 'Leadership Retreats & Strategic Offsites: Thoughtfully curated retreats designed for leadership alignment, strategy and meaningful conversations', 'Team-Building Activities: Creative team-building experiences that encourage collaboration, connection and a little healthy competition.', 'Corporate Team Outings: From adventure getaways to relaxed resort escapes, we create team outings that everyone looks forward to.', 'Wellness & Experiential Programmes: Mindful, immersive experiences designed to refresh teams and boost employee engagement.', 'Resort & Destination Sourcing: Handpicked resorts, hotels and destinations that match your team, objectives and budget.', 'F&B, Travel & Logistics Management: Flights, transfers, accommodation, meals, activities and on-ground coordination — all handled seamlessly.'],
  },
  {
    id: 'activations', num: '04',
    title: 'BRAND ACTIVATIONS',
    pageTitle: 'Brand Activation Agency in India | Experiential Marketing',
    eyebrow: 'YOUR BRAND DESERVES MORE THAN AN EVENT. IT DESERVES AN EXPERIENCE.',
    img: '/assets/Services/Brand activation.png',
    paragraphs: [
      'Zovent is a brand activation and experiential marketing agency creating product launches, corporate events, pop-ups and immersive brand experiences across India and international destinations.',
      "At Zovent, we create brand activation events, experiential marketing campaigns and corporate experiences that make people stop, engage and remember. Whether you're launching a new product, celebrating a milestone or creating a consumer-facing brand experience, we combine creative ideas with flawless event execution to deliver experiences that move people and strengthen your brand.",
    ],
    features: ['Product Launches & Brand Events: Create anticipation and impact with professionally managed product launches, unveilings and brand reveal events', 'Experiential Marketing: Design immersive brand experiences that encourage audiences to interact, connect and engage with your brand.', 'Corporate Brand Events: From milestone celebrations to annual events, we create experiences that bring your brand, people and story together.', 'Pop-Up Brand Experiences: Take your brand beyond traditional spaces with creative pop-ups, installations and interactive experiences.', 'Press & Media Events: From media previews to influencer events, we manage the experience, production and guest journey from start to finish.', 'Experiential Brand Activations: Build meaningful audience connections through interactive concepts, entertainment, technology and creative storytelling'],
  },
  {
    id: 'awards', num: '05',
    title: 'AWARD CEREMONIES & RECOGNITION',
    pageTitle: 'Award Ceremonies & Recognition',
    eyebrow: 'CELEBRATE EXCELLENCE WITH DISTINCTION',
    img: '/assets/Services/Award ceremonies.png',
    paragraphs: [
      'We design recognition events that genuinely honour achievement — from annual sales award galas to employee appreciation dinners and leadership felicitations.',
    ],
    keywords: ['Award Ceremony Management', 'Corporate Award Ceremonies', 'Awards Night Management', 'Corporate Recognition Events', 'Employee Recognition Events', 'Gala Dinner Management', 'Corporate Awards', 'Employee Appreciation Events', 'Leadership Recognition Events', 'Trophy Design', 'Award Event Management'],
    features: ['Gala Dinner & Awards Night Management: End-to-end planning and execution of sophisticated corporate award nights and gala dinners.', 'Trophy Design & Fabrication: Custom awards, trophies and recognition pieces designed to reflect your brand and occasion.', 'Host & Entertainment Booking: Professional hosts, performers and entertainment curated to elevate the guest experience.', 'Award Category & Programme Consulting: Strategic support for award categories, nomination formats and a seamless event programme.', 'Nomination & Shortlisting Platforms: Efficient digital solutions to manage nominations, entries, judging and shortlisting.', 'Video Production & Highlight Reels: Powerful award films, winner AVs and event highlight videos that capture the moments worth remembering.'],
  },
  {
    id: 'travel', num: '06',
    title: 'CORPORATE & LUXURY TRAVEL',
    pageTitle: 'Corporate Travel Management & Luxury Travel',
    eyebrow: 'TRAVEL THAT WORKS AROUND YOU.',
    img: '/assets/Services/Corporate Luxury Travel.png',
    paragraphs: [
      "Whether it's a corporate business trip, incentive travel programme, group holiday or luxury escape, we take care of the details so you can focus on the journey.",
    ],
    keywords: ['CUSTOM ITINERARIES', 'GROUP TRAVEL', 'SOLO TRAVEL', 'PAX TRIPS', 'INCENTIVE TRAVEL', 'BUSINESS TRAVEL'],
    features: ['Corporate Travel Management (CTM): End-to-end business travel solutions including flights, hotels, transfers, travel coordination and traveller support.', 'Group & Incentive Travel: Reward your teams with thoughtfully planned incentive trips and group travel experiences designed around your goals.', 'Luxury Hotels, Villas & Resorts: Access carefully selected premium hotels, luxury resorts and private villas for business and leisure travel.', 'International Holiday Packages: Curated international travel packages with customised itineraries, stays, experiences and seamless logistics.', 'Visa & Travel Documentation Assistance: Support with visa processing, documentation and essential travel requirements for international journeys.', '24/7 In-Trip Support: Reliable on-ground assistance throughout the journey, helping travellers stay comfortable and connected'],
  },
]
