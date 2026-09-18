import { type ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

const D = "'Cormorant Garamond', Georgia, serif"
const B = "'Manrope', system-ui, sans-serif"
const BODY = "Georgia, 'Times New Roman', serif"

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useReveal(0.1) as React.RefObject<HTMLDivElement>
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

export default function Privacy() {
  return (
    <div style={{ backgroundColor: '#FAF8F2', color: '#1A0A0E', fontFamily: B }}>
      {/* ── HERO ───────────────────── */}
      <section
        className="relative flex flex-col justify-end px-10 lg:px-20 overflow-hidden"
        style={{ minHeight: '40vh', paddingTop: '68px', backgroundColor: '#670626', borderBottom: '1px solid rgba(103,6,38,0.1)' }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #670626 30%, rgba(103,6,38,0.7) 65%, rgba(103,6,38,0.3) 100%)' }} />
        
        <div className="relative z-10 max-w-[1440px] mx-auto w-full pb-16">
          <Reveal delay={100}>
            <p className="text-[10px] tracking-[0.28em] uppercase mb-6" style={{ color: '#BAD797', fontFamily: B }}>
              [ LEGAL ]
            </p>
          </Reveal>
          <Reveal delay={200}>
            <h1 className="font-black uppercase leading-none" style={{ fontFamily: D, fontSize: 'clamp(48px, 8vw, 120px)', letterSpacing: '-0.02em', color: '#FAF8F2' }}>
              PRIVACY POLICY.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ── CONTENT ─────────────────────────────────────── */}
      <section className="py-24 px-10 lg:px-20">
        <div className="max-w-[800px] mx-auto">
          <Reveal>
            <p className="text-[16px] leading-relaxed mb-12" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
              At Zovent, we value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and secure your data.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-12">
              <h2 className="text-[20px] font-black uppercase mb-4" style={{ fontFamily: D, color: '#670626' }}>
                1. Information We Collect
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-[15px] leading-relaxed" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                <li><strong>Personal Information:</strong> Name, email address, phone number, and payment details.</li>
                <li><strong>Usage Data:</strong> Information about your interactions with our website.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-12">
              <h2 className="text-[20px] font-black uppercase mb-4" style={{ fontFamily: D, color: '#670626' }}>
                2. How We Use Your Information
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-[15px] leading-relaxed" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                <li>To process bookings and payments.</li>
                <li>To communicate updates and promotional offers.</li>
                <li>To improve our website and services.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-12">
              <h2 className="text-[20px] font-black uppercase mb-4" style={{ fontFamily: D, color: '#670626' }}>
                3. Data Sharing
              </h2>
              <p className="text-[15px] leading-relaxed mb-3" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                We do not sell or rent your personal information. However, we may share it with:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[15px] leading-relaxed" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                <li>Trusted third-party service providers to process bookings.</li>
                <li>Legal authorities if required by law.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-12">
              <h2 className="text-[20px] font-black uppercase mb-4" style={{ fontFamily: D, color: '#670626' }}>
                4. Data Security
              </h2>
              <p className="text-[15px] leading-relaxed" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                We implement robust security measures to protect your data from unauthorized access, alteration, or disclosure.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-12">
              <h2 className="text-[20px] font-black uppercase mb-4" style={{ fontFamily: D, color: '#670626' }}>
                5. Cookies
              </h2>
              <p className="text-[15px] leading-relaxed" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                Our website uses cookies to enhance your browsing experience. You can adjust your browser settings to disable cookies if preferred.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-12">
              <h2 className="text-[20px] font-black uppercase mb-4" style={{ fontFamily: D, color: '#670626' }}>
                6. Your Rights
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-[15px] leading-relaxed" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                <li><strong>Access:</strong> Request a copy of the personal information we hold.</li>
                <li><strong>Correction:</strong> Update or correct inaccuracies in your data.</li>
                <li><strong>Deletion:</strong> Request the deletion of your data, subject to legal obligations.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-12">
              <h2 className="text-[20px] font-black uppercase mb-4" style={{ fontFamily: D, color: '#670626' }}>
                7. Changes to This Policy
              </h2>
              <p className="text-[15px] leading-relaxed" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                We reserve the right to update this policy. Significant changes will be notified on our website.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-12">
              <h2 className="text-[20px] font-black uppercase mb-4" style={{ fontFamily: D, color: '#670626' }}>
                8. Contact Us
              </h2>
              <p className="text-[15px] leading-relaxed mb-4" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                If you have questions about this policy or how your data is handled, please contact us at:
              </p>
              <div className="space-y-1">
                <p className="text-[15px]" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                  <strong>Email:</strong> <a href="mailto:info@zovents.com" className="hover:text-[#670626] transition-colors">info@zovents.com</a>
                </p>
                <p className="text-[15px]" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                  <strong>Phone:</strong> <a href="tel:+917980067782" className="hover:text-[#670626] transition-colors">+91 7980067782</a>
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="text-[15px] italic leading-relaxed mt-16" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.5)' }}>
              By using our website, you consent to the terms outlined in this Privacy Policy.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
